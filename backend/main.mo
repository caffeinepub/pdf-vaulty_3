import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User profile type and storage
  public type UserProfile = {
    name : Text;
  };
  let userProfiles = Map.empty<Principal, UserProfile>();

  // File record
  public type FileRecord = {
    id : Text;
    name : Text;
    size : Nat;
    uploadedAt : Int;
    blob : Storage.ExternalBlob;
  };

  let files = Map.empty<Principal, List.List<FileRecord>>();
  var nextId = 0;

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not AccessControl.isAdmin(accessControlState, caller) and caller != user) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func saveFile(name : Text, size : Nat, blob : Storage.ExternalBlob) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be signed in and authenticated to upload files");
    };

    let file : FileRecord = {
      id = nextId.toText();
      name;
      size;
      uploadedAt = Time.now();
      blob;
    };
    nextId += 1;

    let currentFiles = switch (files.get(caller)) {
      case (?list) { list };
      case (null) { List.empty<FileRecord>() };
    };

    currentFiles.add(file);
    files.add(caller, currentFiles);
  };

  public query ({ caller }) func getMyFiles() : async [FileRecord] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be signed in and authenticated to access your files");
    };

    switch (files.get(caller)) {
      case (?list) { list.toArray() };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func deleteFile(fileId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be signed in and authenticated to delete files");
    };

    switch (files.get(caller)) {
      case (?list) {
        let filteredFiles = list.filter(
          func(f) {
            f.id != fileId;
          }
        );
        if (filteredFiles.size() == list.size()) {
          Runtime.trap("File not found or does not belong to user");
        };
        files.add(caller, filteredFiles);
      };
      case (null) {
        Runtime.trap("File list does not exist for this user");
      };
    };
  };

  public query ({ caller }) func getFileIdsForUser(user : Principal) : async [Text] {
    if (not AccessControl.isAdmin(accessControlState, caller) and caller != user) {
      Runtime.trap("Unauthorized: You can only view your own file list");
    };

    switch (files.get(user)) {
      case (?list) { list.map(func(f) { f.id }).toArray() };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getFileById(fileId : Text) : async ?FileRecord {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be signed in and authenticated to get files by ID");
    };

    switch (files.get(caller)) {
      case (?list) {
        list.find(func(f) { f.id == fileId });
      };
      case (null) { null };
    };
  };
};

