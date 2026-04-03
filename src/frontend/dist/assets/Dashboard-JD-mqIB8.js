import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, B as Button, u as useLanguage, F as FileText } from "./index-IHpCzH5x.js";
import { A as AnimatePresence, m as motion } from "./proxy-DkM8l6H3.js";
import { L as Layers, M as Minimize2, F as FileInput } from "./minimize-2-BdcDqG5q.js";
import { L as Lock } from "./lock-vsPyGA1_.js";
import { R as RotateCw } from "./rotate-cw-CNyMYe90.js";
import { A as ArrowRightLeft } from "./arrow-right-left-DGBoiC4C.js";
import { H as Hash } from "./hash-DGuaTlTz.js";
import { S as Stamp } from "./stamp-BaqW1Wey.js";
import { F as FileCheck } from "./file-check-CYOW4qtD.js";
import { F as FileSearch } from "./file-search-DrSxJ1Xe.js";
import { F as FilePen } from "./file-pen-Dary90HZ.js";
import { P as Package, C as Clock } from "./package-ownyDvuz.js";
import { S as Search, T as Trash2 } from "./trash-2-CBCaiofi.js";
import { S as Shield } from "./shield-T_u8tI9Q.js";
import { Z as Zap } from "./zap-BEXJCpZs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 2v14a2 2 0 0 0 2 2h14", key: "ron5a4" }],
  ["path", { d: "M18 22V8a2 2 0 0 0-2-2H2", key: "7s9ehn" }]
];
const Crop = createLucideIcon("crop", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const STORAGE_KEY = "pdfvaulty_onboarding_done";
const steps = [
  {
    key: "pick",
    title: "Pick a tool",
    description: "Choose any PDF tool from the grid to get started instantly.",
    emoji: "🛠️"
  },
  {
    key: "languages",
    title: "8 languages",
    description: "PDF Vaulty works in English, Arabic, French, Spanish, Hindi, Portuguese, Marathi, and Bengali.",
    emoji: "🌐"
  },
  {
    key: "save",
    title: "Save your work",
    description: "Log in to save processed PDFs to My Files and access them anytime.",
    emoji: "💾"
  }
];
function OnboardingTour() {
  const [visible, setVisible] = reactExports.useState(false);
  const [step, setStep] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);
  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };
  const next = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));
  const current = steps[step];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.aside,
    {
      initial: { opacity: 0, y: 20, scale: 0.96 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 16, scale: 0.95 },
      transition: { duration: 0.28, ease: "easeOut" },
      "data-ocid": "onboarding.dialog",
      "aria-label": "Quick start guide",
      className: "fixed bottom-6 right-4 sm:right-6 z-50 w-72 sm:w-80 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a2e] shadow-xl shadow-black/10 dark:shadow-black/40 p-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: dismiss,
            "data-ocid": "onboarding.close_button",
            "aria-label": "Close onboarding",
            className: "absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-white/40 dark:hover:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 mb-4", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-5 bg-blue-600 dark:bg-blue-400" : "w-1.5 bg-gray-200 dark:bg-white/20"}`
          },
          s.key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 12 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -12 },
            transition: { duration: 0.18 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-2", children: current.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-gray-900 dark:text-white mb-1", children: current.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-white/55 leading-relaxed", children: current.description })
            ]
          },
          current.key
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-white/[0.07]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: prev,
              "data-ocid": "onboarding.pagination_prev",
              disabled: step === 0,
              className: "text-sm text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60 disabled:opacity-0 disabled:pointer-events-none transition-all",
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: next,
              "data-ocid": step === steps.length - 1 ? "onboarding.confirm_button" : "onboarding.pagination_next",
              className: "h-7 px-4 text-xs bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white border-0",
              children: step === steps.length - 1 ? "Got it" : "Next"
            }
          )
        ] })
      ]
    },
    "onboarding"
  ) });
}
const PINNED_TOOLS_KEY = "pdfvaulty_pinned_tools";
const SESSION_HISTORY_KEY = "pdfvaulty_session_history";
function getPinnedTools() {
  try {
    const raw = localStorage.getItem(PINNED_TOOLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function togglePinnedTool(id) {
  const pinned = getPinnedTools();
  const idx = pinned.indexOf(id);
  const updated = idx >= 0 ? pinned.filter((t) => t !== id) : [...pinned, id];
  localStorage.setItem(PINNED_TOOLS_KEY, JSON.stringify(updated));
  return updated;
}
function getSessionHistory() {
  try {
    const raw = sessionStorage.getItem(SESSION_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function formatRelativeTime(timestamp) {
  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1e3);
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  return `${diffHr}h ago`;
}
function SessionHistory() {
  const { t } = useLanguage();
  const [history, setHistory] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setHistory(getSessionHistory());
    const interval = setInterval(() => {
      setHistory(getSessionHistory());
    }, 2e3);
    return () => clearInterval(interval);
  }, []);
  const handleClear = () => {
    try {
      sessionStorage.removeItem(SESSION_HISTORY_KEY);
    } catch {
    }
    setHistory([]);
  };
  if (history.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", "data-ocid": "dashboard.history.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-gray-400 dark:text-white/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30", children: t("history.heading") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleClear,
          "data-ocid": "dashboard.history.delete_button",
          className: "flex items-center gap-1 text-xs text-gray-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
            t("history.clear")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "dashboard.history.list", children: history.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `dashboard.history.item.${idx + 1}`,
        className: "flex items-center justify-between px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-white/[0.05]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700 dark:text-white/70 font-medium", children: entry.toolLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400 dark:text-white/30", children: formatRelativeTime(entry.timestamp) })
        ]
      },
      `${entry.toolId}-${entry.timestamp}`
    )) })
  ] });
}
const TABS = ["All", "Edit", "Convert", "Protect", "Optimize"];
function Dashboard({ onSelectTool }) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [pinnedToolIds, setPinnedToolIds] = reactExports.useState([]);
  const [activeTab, setActiveTab] = reactExports.useState("All");
  reactExports.useEffect(() => {
    setPinnedToolIds(getPinnedTools());
  }, []);
  const handleSelectTool = (id) => {
    onSelectTool(id);
  };
  const handleTogglePin = (id) => {
    const updated = togglePinnedTool(id);
    setPinnedToolIds(updated);
  };
  const allTools = reactExports.useMemo(
    () => [
      {
        id: "merge",
        icon: Layers,
        label: t("tool.merge.label"),
        description: t("tool.merge.desc"),
        category: "Edit"
      },
      {
        id: "split",
        icon: FileText,
        label: t("tool.split.label"),
        description: t("tool.split.desc"),
        category: "Edit"
      },
      {
        id: "compress",
        icon: Minimize2,
        label: t("tool.compress.label"),
        description: t("tool.compress.desc"),
        category: "Optimize"
      },
      {
        id: "password-protect",
        icon: Lock,
        label: t("tool.protect.label"),
        description: t("tool.protect.desc"),
        category: "Protect"
      },
      {
        id: "rotate",
        icon: RotateCw,
        label: t("tool.rotate.label"),
        description: t("tool.rotate.desc"),
        category: "Edit"
      },
      {
        id: "image-to-pdf",
        icon: FileInput,
        label: t("tool.imageToPdf.label"),
        description: t("tool.imageToPdf.desc"),
        category: "Convert"
      },
      {
        id: "pdf-converter",
        icon: ArrowRightLeft,
        label: t("tool.converter.label"),
        description: t("tool.converter.desc"),
        category: "Convert"
      },
      {
        id: "add-page-numbers",
        icon: Hash,
        label: t("tool.pageNumbers.label"),
        description: t("tool.pageNumbers.desc"),
        category: "Edit"
      },
      {
        id: "add-watermark",
        icon: Stamp,
        label: t("tool.watermark.label"),
        description: t("tool.watermark.desc"),
        category: "Edit"
      },
      {
        id: "crop-pdf",
        icon: Crop,
        label: t("tool.crop.label"),
        description: t("tool.crop.desc"),
        category: "Edit"
      },
      {
        id: "flatten-pdf",
        icon: FileCheck,
        label: t("tool.flatten.label"),
        description: t("tool.flatten.desc"),
        category: "Protect"
      },
      {
        id: "extract-text",
        icon: FileSearch,
        label: t("tool.extractText.label"),
        description: t("tool.extractText.desc"),
        category: "Convert"
      },
      {
        id: "edit-metadata",
        icon: FilePen,
        label: t("tool.editMetadata.label") || "Edit PDF Metadata",
        description: t("tool.editMetadata.desc") || "View and edit embedded metadata fields like title, author, subject, and keywords.",
        category: "Edit"
      },
      {
        id: "batch-compress",
        icon: Package,
        label: t("tool.batchCompress.label") || "Batch Compress",
        description: t("tool.batchCompress.desc") || "Compress multiple PDFs at once and download them all as a ZIP file.",
        category: "Optimize"
      }
    ],
    [t]
  );
  reactExports.useMemo(
    () => [
      {
        label: "Edit",
        tools: allTools.filter((tool) => tool.category === "Edit")
      },
      {
        label: "Convert",
        tools: allTools.filter((tool) => tool.category === "Convert")
      },
      {
        label: "Protect",
        tools: allTools.filter((tool) => tool.category === "Protect")
      },
      {
        label: "Optimize",
        tools: allTools.filter((tool) => tool.category === "Optimize")
      }
    ],
    [allTools]
  );
  const filteredTools = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return allTools.filter(
      (tool) => tool.label.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q)
    );
  }, [allTools, search]);
  const pinnedTools = reactExports.useMemo(
    () => pinnedToolIds.map((id) => allTools.find((tool) => tool.id === id)).filter(Boolean),
    [pinnedToolIds, allTools]
  );
  const activeTabTools = reactExports.useMemo(() => {
    if (activeTab === "All") return allTools;
    return allTools.filter((tool) => tool.category === activeTab);
  }, [allTools, activeTab]);
  const faqItems = reactExports.useMemo(
    () => [
      { question: t("faq.q1"), answer: t("faq.a1") },
      { question: t("faq.q2"), answer: t("faq.a2") },
      { question: t("faq.q3"), answer: t("faq.a3") },
      { question: t("faq.q4"), answer: t("faq.a4") },
      { question: t("faq.q5"), answer: t("faq.a5") },
      { question: t("faq.q6"), answer: t("faq.a6") },
      { question: t("faq.q7"), answer: t("faq.a7") },
      { question: t("faq.q8"), answer: t("faq.a8") }
    ],
    [t]
  );
  const scrollToTools = () => {
    var _a;
    (_a = document.getElementById("tools-section")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  const toggleFaq = (idx) => {
    setOpenFaq((prev) => prev === idx ? null : idx);
  };
  const ToolCard = ({
    tool,
    isPinned,
    onTogglePin
  }) => {
    const Icon = tool.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative h-[180px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleSelectTool(tool.id),
          className: "flex flex-col items-start p-6 rounded-xl text-left transition-all duration-200 bg-white dark:bg-[#1a1a2e] border-2 border-black dark:border-white/[0.08] hover:border-gray-700 dark:hover:border-white/20 hover:shadow-md shadow-sm dark:shadow-none w-full h-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 dark:text-white text-base mb-1 leading-tight w-full pr-6", children: tool.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-white/50 leading-snug line-clamp-2", children: tool.description })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onTogglePin(tool.id),
          "aria-label": isPinned ? "Unpin tool" : "Pin tool",
          "data-ocid": "dashboard.tools.toggle",
          className: `absolute top-2 right-2 z-10 p-1 rounded-md transition-opacity ${isPinned ? "opacity-100" : "opacity-0 group-hover:opacity-100"} hover:bg-gray-100 dark:hover:bg-white/10`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: `w-4 h-4 transition-colors ${isPinned ? "fill-yellow-400 text-yellow-400" : "text-gray-400 dark:text-white/40"}`
            }
          )
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white dark:bg-[#0a0a0a]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden bg-white dark:bg-[#0a0a0a]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none hidden dark:block",
          style: {
            background: "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.25 0.08 250 / 60%) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-5 leading-tight tracking-tight", children: t("hero.title").split("PDF Vaulty").length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          t("hero.title").split("PDF Vaulty")[0],
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600 dark:text-blue-400", children: "PDF Vaulty" }),
          t("hero.title").split("PDF Vaulty")[1]
        ] }) : t("hero.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-500 dark:text-white/60 mb-8 max-w-xl mx-auto leading-relaxed", children: t("hero.subtitle") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: scrollToTools,
            "data-ocid": "dashboard.primary_button",
            className: "px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-base shadow-md shadow-blue-600/20",
            children: t("hero.cta")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: "tools-section",
        className: "px-4 sm:px-6 lg:px-8 pb-16 max-w-4xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: t("tools.heading") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-600 dark:text-white/50 text-base", children: t("tools.subheading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/40 pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search tools...",
                "data-ocid": "dashboard.search_input",
                className: "w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              }
            )
          ] }),
          search && (filteredTools.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-gray-400 dark:text-white/30", children: [
            "No tools found for “",
            search,
            "”"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
              "data-ocid": "dashboard.tools.list",
              children: filteredTools.map((tool, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": `dashboard.tools.item.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ToolCard,
                    {
                      tool,
                      isPinned: pinnedToolIds.includes(tool.id),
                      onTogglePin: handleTogglePin
                    }
                  )
                },
                tool.id
              ))
            }
          )),
          !search && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            pinnedTools.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3", children: "Pinned" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: pinnedTools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToolCard,
                {
                  tool,
                  isPinned: true,
                  onTogglePin: handleTogglePin
                },
                tool.id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex gap-1 mb-6 overflow-x-auto scrollbar-hide pb-1",
                  "data-ocid": "dashboard.tools.tab",
                  children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveTab(tab),
                      "data-ocid": "dashboard.tools.tab",
                      className: `flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/20"}`,
                      children: tab
                    },
                    tab
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                  "data-ocid": "dashboard.tools.list",
                  children: activeTabTools.map((tool, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      "data-ocid": `dashboard.tools.item.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ToolCard,
                        {
                          tool,
                          isPinned: pinnedToolIds.includes(tool.id),
                          onTogglePin: handleTogglePin
                        }
                      )
                    },
                    tool.id
                  ))
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SessionHistory, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-gray-50 dark:bg-[#111111]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-7 h-7 text-blue-600 dark:text-blue-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 dark:text-white text-lg mb-1", children: t("feature.easy.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-white/50 text-sm leading-relaxed", children: t("feature.easy.desc") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-7 h-7 text-gray-400 dark:text-white/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 dark:text-white text-lg mb-1", children: t("feature.secure.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-white/50 text-sm leading-relaxed", children: t("feature.secure.desc") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-7 h-7 text-blue-600 dark:text-blue-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 dark:text-white text-lg mb-1", children: t("feature.powerful.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-white/50 text-sm leading-relaxed", children: t("feature.powerful.desc") })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 px-4 bg-white dark:bg-[#0a0a0a]",
        "data-ocid": "dashboard.faq.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: t("faq.heading") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-white/50 text-base", children: t("faq.subheading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "divide-y divide-gray-200 dark:divide-white/[0.08]",
              "data-ocid": "dashboard.faq.list",
              children: faqItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `dashboard.faq.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => toggleFaq(idx),
                        "data-ocid": `dashboard.faq.toggle.${idx + 1}`,
                        className: "w-full flex items-center justify-between py-5 text-left gap-4 group",
                        "aria-expanded": openFaq === idx,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900 dark:text-white text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: item.question }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ChevronDown,
                            {
                              className: `w-5 h-5 flex-shrink-0 text-gray-400 dark:text-white/40 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`
                            }
                          )
                        ]
                      }
                    ),
                    openFaq === idx && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-white/60 text-sm leading-relaxed", children: item.answer }) })
                  ]
                },
                item.question
              ))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OnboardingTour, {})
  ] });
}
export {
  Dashboard as default
};
