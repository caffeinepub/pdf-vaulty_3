import { k as useActor, i as useGetMyAnalytics, l as useSaveAnalytics, r as reactExports } from "./index-CV4MT_Ao.js";
const STORAGE_KEY = "pdfvaulty_analytics";
function readData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { totalOperations: 0, filesProcessed: 0, byTool: {} };
    return JSON.parse(raw);
  } catch {
    return { totalOperations: 0, filesProcessed: 0, byTool: {} };
  }
}
function writeData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
  }
}
function mergeAnalytics(local, backendByTool, backendTotal, backendFiles) {
  const mergedByTool = { ...local.byTool };
  for (const [toolId, count] of backendByTool) {
    const localCount = mergedByTool[toolId] ?? 0;
    const backendCount = Number(count);
    mergedByTool[toolId] = Math.max(localCount, backendCount);
  }
  return {
    totalOperations: Math.max(local.totalOperations, Number(backendTotal)),
    filesProcessed: Math.max(local.filesProcessed, Number(backendFiles)),
    byTool: mergedByTool
  };
}
function toBackendRecord(data) {
  return {
    byTool: Object.entries(data.byTool).map(([k, v]) => [k, BigInt(v ?? 0)]),
    totalOperations: BigInt(data.totalOperations),
    filesProcessed: BigInt(data.filesProcessed)
  };
}
function useAnalytics() {
  const trackToolUse = reactExports.useCallback((toolId) => {
    const data = readData();
    data.totalOperations += 1;
    data.filesProcessed += 1;
    data.byTool[toolId] = (data.byTool[toolId] ?? 0) + 1;
    writeData(data);
  }, []);
  const getAnalytics = reactExports.useCallback(() => {
    return readData();
  }, []);
  return { trackToolUse, getAnalytics };
}
function useSyncAnalytics() {
  const { actor } = useActor();
  const { data: backendRecord } = useGetMyAnalytics();
  const saveAnalytics = useSaveAnalytics();
  reactExports.useEffect(() => {
    if (!actor || !backendRecord) return;
    const local = readData();
    const merged = mergeAnalytics(
      local,
      backendRecord.byTool,
      backendRecord.totalOperations,
      backendRecord.filesProcessed
    );
    writeData(merged);
  }, [actor, backendRecord]);
  const trackToolUseWithSync = reactExports.useCallback(
    (toolId) => {
      const data = readData();
      data.totalOperations += 1;
      data.filesProcessed += 1;
      data.byTool[toolId] = (data.byTool[toolId] ?? 0) + 1;
      writeData(data);
      if (actor) {
        const record = toBackendRecord(data);
        saveAnalytics.mutate(record);
      }
    },
    [actor, saveAnalytics]
  );
  const getMergedAnalytics = reactExports.useCallback(() => {
    const local = readData();
    if (!backendRecord) return local;
    return mergeAnalytics(
      local,
      backendRecord.byTool,
      backendRecord.totalOperations,
      backendRecord.filesProcessed
    );
  }, [backendRecord]);
  return { trackToolUseWithSync, getMergedAnalytics };
}
export {
  useAnalytics as a,
  useSyncAnalytics as u
};
