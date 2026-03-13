import { c as createLucideIcon, b as useInternetIdentity, i as useGetCallerUserProfile, d as useGetMyFiles, u as useGetMyAnalytics, F as FileText, j as jsxRuntimeExports, U as User } from "./index-B4iaYbj_.js";
import { f as formatBytes } from "./pdfUtils-D5wj6PeM.js";
import { H as Hash } from "./hash-DVfGj9cy.js";
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
function ProfilePage({
  onNavigateToDashboard
}) {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: files, isLoading: filesLoading } = useGetMyFiles();
  const { data: analytics, isLoading: analyticsLoading } = useGetMyAnalytics();
  const isLoading = profileLoading || filesLoading || analyticsLoading;
  const principal = (identity == null ? void 0 : identity.getPrincipal().toText()) ?? "—";
  const shortPrincipal = principal.length > 20 ? `${principal.slice(0, 10)}...${principal.slice(-10)}` : principal;
  const totalStorageBytes = (files == null ? void 0 : files.reduce((acc, f) => acc + Number(f.size), 0)) ?? 0;
  const totalOps = analytics ? Number(analytics.totalOperations) : 0;
  const stats = [
    {
      icon: FileText,
      label: "Files Stored",
      value: (files == null ? void 0 : files.length) ?? 0,
      ocid: "profile.files.card"
    },
    {
      icon: HardDrive,
      label: "Storage Used",
      value: formatBytes(totalStorageBytes),
      ocid: "profile.storage.card"
    },
    {
      icon: Hash,
      label: "Total Operations",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight", children: (profile == null ? void 0 : profile.name) ?? "Your Profile" }),
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111111] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-gray-900 dark:text-white", children: "Account Details" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-gray-100 dark:divide-white/[0.04]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-white/50", children: "Display Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: (profile == null ? void 0 : profile.name) ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between px-5 py-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-white/50 flex-shrink-0", children: "Principal ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-gray-700 dark:text-white/70 break-all text-right", children: principal })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-white/50", children: "Auth Provider" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: "Internet Identity" })
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
          children: "← Back to Dashboard"
        }
      ) })
    ] })
  ] });
}
export {
  ProfilePage as default
};
