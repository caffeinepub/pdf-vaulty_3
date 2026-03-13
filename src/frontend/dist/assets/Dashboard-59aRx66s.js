import { c as createLucideIcon, a as useLanguage, r as reactExports, F as FileText, j as jsxRuntimeExports } from "./index-B4iaYbj_.js";
import { L as Layers, M as Minimize2, F as FileInput } from "./minimize-2-DHgSr4p1.js";
import { L as Lock } from "./lock-C5JR-RCX.js";
import { R as RotateCw } from "./rotate-cw--ZO9Tkf4.js";
import { A as ArrowRightLeft } from "./arrow-right-left-DZBdn_wf.js";
import { H as Hash } from "./hash-DVfGj9cy.js";
import { S as Stamp } from "./stamp-BIFvfK85.js";
import { F as FileCheck } from "./file-check-Lx_gDbze.js";
import { S as Shield } from "./shield-CKkmSgKU.js";
import { Z as Zap } from "./zap-DH0_roOY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 2v14a2 2 0 0 0 2 2h14", key: "ron5a4" }],
  ["path", { d: "M18 22V8a2 2 0 0 0-2-2H2", key: "7s9ehn" }]
];
const Crop = createLucideIcon("crop", __iconNode);
function Dashboard({ onSelectTool }) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const tools = reactExports.useMemo(
    () => [
      {
        id: "merge",
        icon: Layers,
        label: t("tool.merge.label"),
        description: t("tool.merge.desc")
      },
      {
        id: "split",
        icon: FileText,
        label: t("tool.split.label"),
        description: t("tool.split.desc")
      },
      {
        id: "compress",
        icon: Minimize2,
        label: t("tool.compress.label"),
        description: t("tool.compress.desc")
      },
      {
        id: "password-protect",
        icon: Lock,
        label: t("tool.protect.label"),
        description: t("tool.protect.desc")
      },
      {
        id: "rotate",
        icon: RotateCw,
        label: t("tool.rotate.label"),
        description: t("tool.rotate.desc")
      },
      {
        id: "image-to-pdf",
        icon: FileInput,
        label: t("tool.imageToPdf.label"),
        description: t("tool.imageToPdf.desc")
      },
      {
        id: "pdf-converter",
        icon: ArrowRightLeft,
        label: t("tool.converter.label"),
        description: t("tool.converter.desc")
      },
      {
        id: "add-page-numbers",
        icon: Hash,
        label: t("tool.pageNumbers.label"),
        description: t("tool.pageNumbers.desc")
      },
      {
        id: "add-watermark",
        icon: Stamp,
        label: t("tool.watermark.label"),
        description: t("tool.watermark.desc")
      },
      {
        id: "crop-pdf",
        icon: Crop,
        label: "Crop PDF",
        description: "Trim margins from every page of your PDF precisely."
      },
      {
        id: "flatten-pdf",
        icon: FileCheck,
        label: "Flatten PDF Forms",
        description: "Convert interactive form fields into static, non-editable content."
      }
    ],
    [t]
  );
  const faqItems = reactExports.useMemo(
    () => [
      {
        question: t("faq.q1"),
        answer: t("faq.a1")
      },
      {
        question: t("faq.q2"),
        answer: t("faq.a2")
      },
      {
        question: t("faq.q3"),
        answer: t("faq.a3")
      },
      {
        question: t("faq.q4"),
        answer: t("faq.a4")
      },
      {
        question: t("faq.q5"),
        answer: t("faq.a5")
      },
      {
        question: t("faq.q6"),
        answer: t("faq.a6")
      },
      {
        question: t("faq.q7"),
        answer: t("faq.a7")
      },
      {
        question: t("faq.q8"),
        answer: t("faq.a8")
      }
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: t("tools.heading") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-600 dark:text-white/50 text-base", children: t("tools.subheading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
              "data-ocid": "dashboard.tools.list",
              children: tools.map((tool, idx) => {
                const Icon = tool.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => onSelectTool(tool.id),
                    "data-ocid": `dashboard.tools.item.${idx + 1}`,
                    className: "group flex flex-col items-start p-6 rounded-xl text-left transition-all duration-200 bg-white dark:bg-[#1a1a2e] border-2 border-black dark:border-white/[0.08] hover:border-gray-700 dark:hover:border-white/20 hover:shadow-md shadow-sm dark:shadow-none min-h-[140px] overflow-hidden",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 dark:text-white text-lg mb-1.5 leading-tight w-full", children: tool.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-white/50 leading-snug line-clamp-2", children: tool.description })
                    ]
                  },
                  tool.id
                );
              })
            }
          )
        ]
      }
    ),
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
    )
  ] });
}
export {
  Dashboard as default
};
