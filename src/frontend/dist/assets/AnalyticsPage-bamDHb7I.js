import { c as createLucideIcon, u as useGetMyAnalytics, F as FileText, j as jsxRuntimeExports } from "./index-COyrWJ9Y.js";
import { u as useSyncAnalytics, a as useAnalytics } from "./useAnalytics-CuP1ww-U.js";
import { L as Layers, M as Minimize2, F as FileInput } from "./minimize-2-CJj6GnGT.js";
import { L as Lock } from "./lock-Cpidj_Tb.js";
import { R as RotateCw } from "./rotate-cw-CpstMXXB.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-BNC_S9N_.js";
import { L as LoaderCircle } from "./loader-circle-CwJ6veYx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const TOOL_STATS = [
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
    toolId: "add-page-numbers"
  },
  { label: "Word to PDF", icon: FileInput, toolId: "word-to-pdf" },
  { label: "Excel to PDF", icon: FileInput, toolId: "excel-to-pdf" },
  { label: "Image to PDF", icon: FileInput, toolId: "image-to-pdf" },
  { label: "PDF to Word", icon: FileText, toolId: "pdf-to-word" }
];
function AnalyticsPage({
  onNavigateToDashboard
}) {
  useSyncAnalytics();
  useAnalytics();
  const { getMergedAnalytics } = useSyncAnalytics();
  const { isLoading: backendLoading } = useGetMyAnalytics();
  const analytics = getMergedAnalytics();
  const toolsUsedCount = Object.keys(analytics.byTool).length;
  const toolStatsWithCounts = TOOL_STATS.map((stat) => ({
    ...stat,
    count: analytics.byTool[stat.toolId] ?? 0
  }));
  const maxCount = Math.max(...toolStatsWithCounts.map((s) => s.count), 1);
  const isEmpty = analytics.totalOperations === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white dark:bg-[#0a0a0a]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden bg-gradient-to-b from-blue-50/80 to-white dark:from-transparent dark:to-transparent dark:bg-[#0a0a0a]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none hidden dark:block",
          style: {
            background: "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.25 0.08 250 / 60%) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-8 h-8 text-blue-600 dark:text-blue-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight", children: "Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-gray-500 dark:text-white/60 max-w-md mx-auto leading-relaxed", children: "Track your PDF tool usage and activity — synced across all your devices." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      backendLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "analytics.loading_state",
          className: "flex items-center gap-2 text-sm text-blue-500 dark:text-blue-400 mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Syncing analytics from cloud…" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10", children: [
        {
          label: "Total Operations",
          value: String(analytics.totalOperations),
          icon: TrendingUp
        },
        {
          label: "Files Processed",
          value: String(analytics.filesProcessed),
          icon: FileText
        },
        {
          label: "Tools Used",
          value: String(toolsUsedCount),
          icon: ChartNoAxesColumn
        }
      ].map(({ label, value, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-start p-6 rounded-xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/[0.08]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-black text-gray-900 dark:text-white mb-1", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-white/50", children: label })
          ]
        },
        label
      )) }),
      !isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-5", children: "Usage by Tool" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: toolStatsWithCounts.map(({ label, icon: Icon, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/[0.08]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-800 dark:text-white/90 truncate", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-gray-500 dark:text-white/50 ml-2", children: count })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full bg-blue-500 dark:bg-blue-400 transition-all duration-500",
                    style: {
                      width: `${maxCount > 0 ? count / maxCount * 100 : 0}%`
                    }
                  }
                ) })
              ] })
            ]
          },
          label
        )) })
      ] }),
      isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "analytics.empty_state",
          className: "flex flex-col items-center justify-center py-12 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111111] text-center px-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-10 h-10 text-gray-300 dark:text-white/20 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-white/50 text-base mb-1 font-medium", children: "No activity yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 dark:text-white/30 text-sm mb-6", children: "Analytics data will appear here as you use PDF tools." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onNavigateToDashboard,
                "data-ocid": "analytics.primary_button",
                className: "px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm shadow-md shadow-blue-600/20",
                children: "Start Using Tools"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  AnalyticsPage as default
};
