# Specification

## Summary
**Goal:** Add private per-user PDF file storage to PDF Vaulty, allowing authenticated users to upload, list, and delete their own PDF files stored on the backend canister.

**Planned changes:**
- Define a `FileRecord` type (id, name, size, uploadedAt, data) in `backend/main.mo`
- Add a `HashMap` keyed by `Principal` to store each user's list of `FileRecord` objects
- Add `saveFile` update function that appends a file to the caller's file list with a unique ID; rejects anonymous callers
- Add `getMyFiles` query function that returns the caller's file list; rejects anonymous callers
- Add `deleteFile` update function that removes a file by ID from the caller's list; rejects anonymous callers
- Replace the placeholder `MyFilesPage` with a functional page that:
  - Fetches and displays the user's files (name, size, upload date) on mount
  - Includes an upload button to pick a PDF file and call `saveFile`
  - Includes a per-file delete button that calls `deleteFile`
  - Shows a loading spinner while fetching and an empty-state message when no files exist

**User-visible outcome:** Authenticated users can navigate to the My Files page, upload PDF files, see their stored files listed with name, size, and date, and delete individual files. Each user's files are private and only accessible to them.
