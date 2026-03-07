import {
  BarChart2,
  FileInput,
  FileText,
  Layers,
  Lock,
  Minimize2,
  RotateCw,
  TrendingUp,
} from "lucide-react";
import type { ToolId } from "../App";
import { useAnalytics } from "../hooks/useAnalytics";

interface AnalyticsPageProps {
  onNavigateToDashboard: () => void;
}

interface ToolStat {
  label: string;
  icon: React.ElementType;
  toolId: ToolId;
}

const TOOL_STATS: ToolStat[] = [
  { label: "Merge PDFs", icon: Layers, toolId: "merge" },
  { label: "Split PDFs", icon: FileText, toolId: "split" },
  { label: "Compress PDFs", icon: Minimize2, toolId: "compress" },
  { label: "Protect PDFs", icon: Lock, toolId: "password-protect" },
  { label: "Rotate PDFs", icon: RotateCw, toolId: "rotate" },
  { label: "Convert PDFs", icon: FileInput, toolId: "pdf-converter" },
  { label: "Add Watermark", icon: FileText, toolId: "add-watermark" },
  {
    label: "Add Page Numbers",
    icon: FileText,
    toolId: "add-page-numbers",
  },
  { label: "Word to PDF", icon: FileInput, toolId: "word-to-pdf" },
  { label: "Excel to PDF", icon: FileInput, toolId: "excel-to-pdf" },
  { label: "Image to PDF", icon: FileInput, toolId: "image-to-pdf" },
  { label: "PDF to Word", icon: FileText, toolId: "pdf-to-word" },
];

export default function AnalyticsPage({
  onNavigateToDashboard,
}: AnalyticsPageProps) {
  const { getAnalytics } = useAnalytics();
  const analytics = getAnalytics();

  const toolsUsedCount = Object.keys(analytics.byTool).length;

  const toolStatsWithCounts = TOOL_STATS.map((stat) => ({
    ...stat,
    count: analytics.byTool[stat.toolId] ?? 0,
  }));

  const maxCount = Math.max(...toolStatsWithCounts.map((s) => s.count), 1);

  const isEmpty = analytics.totalOperations === 0;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden bg-gradient-to-b from-blue-50/80 to-white dark:from-transparent dark:to-transparent dark:bg-[#0a0a0a]">
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.25 0.08 250 / 60%) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-blue-50 dark:bg-[#1e3a5f]">
            <BarChart2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
            Analytics
          </h1>
          <p className="text-base text-gray-500 dark:text-white/60 max-w-md mx-auto leading-relaxed">
            Track your PDF tool usage and activity over time.
          </p>
        </div>
      </section>

      {/* Stats overview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              label: "Total Operations",
              value: String(analytics.totalOperations),
              icon: TrendingUp,
            },
            {
              label: "Files Processed",
              value: String(analytics.filesProcessed),
              icon: FileText,
            },
            {
              label: "Tools Used",
              value: String(toolsUsedCount),
              icon: BarChart2,
            },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-start p-6 rounded-xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/[0.08]"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-blue-50 dark:bg-[#1e3a5f]">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                {value}
              </span>
              <span className="text-sm text-gray-500 dark:text-white/50">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Per-tool breakdown */}
        {!isEmpty && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
              Usage by Tool
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {toolStatsWithCounts.map(({ label, icon: Icon, count }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/[0.08]"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 dark:bg-[#1e3a5f]">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-800 dark:text-white/90 truncate">
                        {label}
                      </span>
                      <span className="text-sm font-bold text-gray-500 dark:text-white/50 ml-2">
                        {count}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500 dark:bg-blue-400 transition-all duration-500"
                        style={{
                          width: `${maxCount > 0 ? (count / maxCount) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state message — only shown when no activity yet */}
        {isEmpty && (
          <div
            data-ocid="analytics.empty_state"
            className="flex flex-col items-center justify-center py-12 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111111] text-center px-6"
          >
            <BarChart2 className="w-10 h-10 text-gray-300 dark:text-white/20 mb-4" />
            <p className="text-gray-500 dark:text-white/50 text-base mb-1 font-medium">
              No activity yet
            </p>
            <p className="text-gray-400 dark:text-white/30 text-sm mb-6">
              Analytics data will appear here as you use PDF tools.
            </p>
            <button
              type="button"
              onClick={onNavigateToDashboard}
              data-ocid="analytics.primary_button"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm shadow-md shadow-blue-600/20"
            >
              Start Using Tools
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
