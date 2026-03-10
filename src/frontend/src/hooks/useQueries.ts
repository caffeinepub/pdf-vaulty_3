import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AnalyticsRecord, FileRecord, UserProfile } from "../backend";
import type { ExternalBlob } from "../backend";
import { useActor } from "./useActor";

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useGetMyFiles() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<FileRecord[]>({
    queryKey: ["myFiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyFiles();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveFile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      size,
      blob,
    }: {
      name: string;
      size: bigint;
      blob: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveFile(name, size, blob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myFiles"] });
    },
  });
}

export function useDeleteFile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileId: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteFile(fileId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myFiles"] });
    },
  });
}

export function useRenameFile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      fileId,
      newName,
    }: {
      fileId: string;
      newName: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.renameFile(fileId, newName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myFiles"] });
    },
  });
}

export function useGetMyAnalytics() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<AnalyticsRecord | null>({
    queryKey: ["myAnalytics"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyAnalytics();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveAnalytics() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (record: AnalyticsRecord) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveAnalytics(record);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAnalytics"] });
    },
  });
}
