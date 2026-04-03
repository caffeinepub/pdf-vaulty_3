import { c as createLucideIcon, u as useLanguage, a as useInternetIdentity, h as useGetCallerUserProfile, b as useGetMyFiles, i as useGetMyAnalytics, F as FileText, j as jsxRuntimeExports, U as User } from "./index-IHpCzH5x.js";
import { u as useSyncAnalytics, a as useAnalytics } from "./useAnalytics-ByOU9UHz.js";
import { f as formatBytes } from "./pdfUtils-D5wj6PeM.js";
import { L as Layers, M as Minimize2, F as FileInput } from "./minimize-2-BdcDqG5q.js";
import { L as Lock } from "./lock-vsPyGA1_.js";
import { R as RotateCw } from "./rotate-cw-CNyMYe90.js";
import { H as Hash } from "./hash-DGuaTlTz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
];
const HardDrive = createLucideIcon("hard-drive", __iconNode);
const TOOL_STATS = [
  { labelKey: "tool.merge.label", icon: Layers, toolId: "merge" },
  { labelKey: "tool.split.label", icon: FileText, toolId: "split" },
  { labelKey: "tool.compress.label", icon: Minimize2, toolId: "compress" },
  { labelKey: "tool.protect.label", icon: Lock, toolId: "password-protect" },
  { labelKey: "tool.rotate.label", icon: RotateCw, toolId: "rotate" },
  {
    labelKey: "tool.converter.label",
    icon: FileInput,
    toolId: "pdf-converter"
  },
  { labelKey: "tool.watermark.label", icon: FileText, toolId: "add-watermark" },
  {
    labelKey: "tool.pageNumbers.label",
    icon: FileText,
    toolId: "add-page-numbers"
  },
  { labelKey: "tool.imageToPdf.label", icon: FileInput, toolId: "word-to-pdf" },
  {
    labelKey: "tool.imageToPdf.label",
    icon: FileInput,
    toolId: "excel-to-pdf"
  },
  {
    labelKey: "tool.imageToPdf.label",
    icon: FileInput,
    toolId: "image-to-pdf"
  },
  { labelKey: "tool.merge.label", icon: FileText, toolId: "pdf-to-word" }
];
function ProfilePage({
  onNavigateToDashboard
}) {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: files, isLoading: filesLoading } = useGetMyFiles();
  const { data: analytics, isLoading: analyticsLoading } = useGetMyAnalytics();
  const { getMergedAnalytics } = useSyncAnalytics();
  useAnalytics();
  const isLoading = profileLoading || filesLoading || analyticsLoading;
  const principal = (identity == null ? void 0 : identity.getPrincipal().toText()) ?? "—";
  const shortPrincipal = principal.length > 20 ? `${principal.slice(0, 10)}...${principal.slice(-10)}` : principal;
  const totalStorageBytes = (files == null ? void 0 : files.reduce((acc, f) => acc + Number(f.size), 0)) ?? 0;
  const totalOps = analytics ? Number(analytics.totalOperations) : 0;
  const mergedAnalytics = getMergedAnalytics();
  const toolStatsWithCounts = TOOL_STATS.map((stat) => ({
    ...stat,
    count: mergedAnalytics.byTool[stat.toolId] ?? 0
  }));
  const maxCount = Math.max(...toolStatsWithCounts.map((s) => s.count), 1);
  const hasToolUsage = mergedAnalytics.totalOperations > 0;
  const stats = [
    {
      icon: FileText,
      label: t("profile.filesStored"),
      value: (files == null ? void 0 : files.length) ?? 0,
      ocid: "profile.files.card"
    },
    {
      icon: HardDrive,
      label: t("profile.storageUsed"),
      value: formatBytes(totalStorageBytes),
      ocid: "profile.storage.card"
    },
    {
      icon: Hash,
      label: t("profile.totalOperations"),
      value: totalOps,
      ocid: "profile.operations.card"
    }
  ];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "profile.loading_state",
        className: "flex items-center justify-center min-h-[60vh]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white dark:bg-[#0a0a0a]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none hidden dark:block",
          style: {
            background: "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.25 0.08 250 / 60%) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-blue-600 to-purple-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-10 h-10 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight", children: (profile == null ? void 0 : profile.name) ?? t("profile.yourProfile") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 dark:text-white/30 font-mono", children: shortPrincipal })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8", children: stats.map((stat) => {
        const Icon = stat.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": stat.ocid,
            className: "flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111111] text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black text-gray-900 dark:text-white", children: stat.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-white/40 mt-0.5", children: stat.label })
              ] })
            ]
          },
          stat.label
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "profile.tool.section",
          className: "rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111111] overflow-hidden mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-gray-100 dark:border-white/[0.06] flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 text-blue-600 dark:text-blue-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-gray-900 dark:text-white", children: t("profile.toolUsage") })
            ] }),
            hasToolUsage ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 grid grid-cols-1 sm:grid-cols-2 gap-3", children: toolStatsWithCounts.map(
              ({ labelKey, icon: Icon, toolId, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-blue-600 dark:text-blue-400" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-gray-800 dark:text-white/90 truncate", children: t(labelKey) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-gray-500 dark:text-white/50 ml-2 shrink-0", children: count })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                toolId
              )
            ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "profile.tool.empty_state",
                className: "px-5 py-8 text-center",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 dark:text-white/30", children: t("profile.toolEmpty") })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111111] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-gray-900 dark:text-white", children: t("profile.accountDetails") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-gray-100 dark:divide-white/[0.04]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-white/50", children: t("profile.displayName") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: (profile == null ? void 0 : profile.name) ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between px-5 py-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-white/50 flex-shrink-0", children: t("profile.principalId") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-gray-700 dark:text-white/70 break-all text-right", children: principal })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-white/50", children: t("profile.authProvider") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: t("profile.internetIdentity") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onNavigateToDashboard,
          "data-ocid": "profile.secondary_button",
          className: "text-sm text-blue-600 dark:text-blue-400 hover:underline",
          children: t("profile.backToDashboard")
        }
      ) })
    ] })
  ] });
}
export {
  ProfilePage as default
};
