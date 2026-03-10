import { useCallback, useEffect } from "react";
import type { ToolId } from "../App";
import { useActor } from "./useActor";
import { useGetMyAnalytics, useSaveAnalytics } from "./useQueries";

const STORAGE_KEY = "pdfvaulty_analytics";

interface AnalyticsData {
  totalOperations: number;
  filesProcessed: number;
  byTool: Partial<Record<ToolId, number>>;
}

function readData(): AnalyticsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { totalOperations: 0, filesProcessed: 0, byTool: {} };
    return JSON.parse(raw) as AnalyticsData;
  } catch {
    return { totalOperations: 0, filesProcessed: 0, byTool: {} };
  }
}

function writeData(data: AnalyticsData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors (e.g. private browsing quota)
  }
}

/**
 * Merge local analytics with backend analytics.
 * Takes the max of scalar counters, unions byTool counts (sum).
 */
function mergeAnalytics(
  local: AnalyticsData,
  backendByTool: Array<[string, bigint]>,
  backendTotal: bigint,
  backendFiles: bigint,
): AnalyticsData {
  const mergedByTool: Partial<Record<ToolId, number>> = { ...local.byTool };

  for (const [toolId, count] of backendByTool) {
    const localCount = mergedByTool[toolId as ToolId] ?? 0;
    const backendCount = Number(count);
    mergedByTool[toolId as ToolId] = Math.max(localCount, backendCount);
  }

  return {
    totalOperations: Math.max(local.totalOperations, Number(backendTotal)),
    filesProcessed: Math.max(local.filesProcessed, Number(backendFiles)),
    byTool: mergedByTool,
  };
}

/**
 * Convert local AnalyticsData to backend AnalyticsRecord format.
 */
function toBackendRecord(data: AnalyticsData): {
  byTool: Array<[string, bigint]>;
  totalOperations: bigint;
  filesProcessed: bigint;
} {
  return {
    byTool: Object.entries(data.byTool).map(([k, v]) => [k, BigInt(v ?? 0)]),
    totalOperations: BigInt(data.totalOperations),
    filesProcessed: BigInt(data.filesProcessed),
  };
}

export function useAnalytics() {
  const trackToolUse = useCallback((toolId: ToolId) => {
    const data = readData();
    data.totalOperations += 1;
    data.filesProcessed += 1;
    data.byTool[toolId] = (data.byTool[toolId] ?? 0) + 1;
    writeData(data);
  }, []);

  const getAnalytics = useCallback((): AnalyticsData => {
    return readData();
  }, []);

  return { trackToolUse, getAnalytics };
}

/**
 * useSyncAnalytics — call once in AnalyticsPage (or App) when authenticated.
 * - On mount, loads backend analytics and merges with localStorage.
 * - Exposes trackToolUseWithSync that also persists to backend.
 */
export function useSyncAnalytics() {
  const { actor } = useActor();
  const { data: backendRecord } = useGetMyAnalytics();
  const saveAnalytics = useSaveAnalytics();

  // On mount, merge backend data into localStorage
  useEffect(() => {
    if (!actor || !backendRecord) return;

    const local = readData();
    const merged = mergeAnalytics(
      local,
      backendRecord.byTool,
      backendRecord.totalOperations,
      backendRecord.filesProcessed,
    );
    writeData(merged);
  }, [actor, backendRecord]);

  const trackToolUseWithSync = useCallback(
    (toolId: ToolId) => {
      const data = readData();
      data.totalOperations += 1;
      data.filesProcessed += 1;
      data.byTool[toolId] = (data.byTool[toolId] ?? 0) + 1;
      writeData(data);

      // Sync to backend if actor is available (fire-and-forget)
      if (actor) {
        const record = toBackendRecord(data);
        saveAnalytics.mutate(record);
      }
    },
    [actor, saveAnalytics],
  );

  const getMergedAnalytics = useCallback((): AnalyticsData => {
    const local = readData();
    if (!backendRecord) return local;
    return mergeAnalytics(
      local,
      backendRecord.byTool,
      backendRecord.totalOperations,
      backendRecord.filesProcessed,
    );
  }, [backendRecord]);

  return { trackToolUseWithSync, getMergedAnalytics };
}
