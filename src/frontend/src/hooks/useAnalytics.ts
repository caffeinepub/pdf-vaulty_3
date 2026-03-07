import { useCallback } from "react";
import type { ToolId } from "../App";

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
