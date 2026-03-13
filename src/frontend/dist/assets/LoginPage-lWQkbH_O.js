import { b as useInternetIdentity, a as useLanguage, r as reactExports, F as FileText, j as jsxRuntimeExports } from "./index-COyrWJ9Y.js";
import { L as Layers, M as Minimize2, F as FileInput } from "./minimize-2-CJj6GnGT.js";
import { L as Lock } from "./lock-Cpidj_Tb.js";
import { R as RotateCw } from "./rotate-cw-CpstMXXB.js";
import { S as Shield } from "./shield-CiPL3TUL.js";
import { Z as Zap } from "./zap-JChhQ4Zt.js";
function LoginPage() {
  const { login, isLoggingIn } = useInternetIdentity();
  const { t } = useLanguage();
  const tools = reactExports.useMemo(
    () => [
      {
        icon: Layers,
        label: t("tool.merge.label"),
        description: t("tool.merge.desc")
      },
      {
        icon: FileText,
        label: t("tool.split.label"),
        description: t("tool.split.desc")
      },
      {
        icon: Minimize2,
        label: t("tool.compress.label"),
        description: t("tool.compress.desc")
      },
      {
        icon: Lock,
        label: t("tool.protect.label"),
        description: t("tool.protect.desc")
      },
      {
        icon: RotateCw,
        label: t("tool.rotate.label"),
        description: t("tool.rotate.desc")
      },
      {
        icon: FileInput,
        label: t("tool.imageToPdf.label"),
        description: t("tool.imageToPdf.desc")
      }
    ],
    [t]
  );
  const scrollToTools = () => {
    var _a;
    (_a = document.getElementById("login-tools-section")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white dark:bg-[#0a0a0a]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden bg-gradient-to-b from-blue-50/80 to-white dark:from-transparent dark:to-transparent dark:bg-[#0a0a0a]", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-5 leading-tight tracking-tight", children: t("login.title").split("PDF Vaulty").length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          t("login.title").split("PDF Vaulty")[0],
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600 dark:text-blue-400", children: "PDF Vaulty" }),
          t("login.title").split("PDF Vaulty")[1]
        ] }) : t("login.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-500 dark:text-white/60 mb-8 max-w-xl mx-auto leading-relaxed", children: t("login.subtitle") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: scrollToTools,
            "data-ocid": "login.primary_button",
            className: "px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-base shadow-md shadow-blue-600/20",
            children: t("hero.cta")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: "login-tools-section",
        className: "px-4 sm:px-6 lg:px-8 pb-16 max-w-4xl mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: t("tools.heading") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-600 dark:text-white/50 text-base", children: t("tools.subheading") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: tools.map(({ icon: Icon, label, description }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: login,
              disabled: isLoggingIn,
              className: "group flex flex-col items-start p-6 rounded-xl text-left transition-all duration-200 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/[0.08] hover:border-blue-300 dark:hover:border-white/20 hover:shadow-md disabled:opacity-60",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 dark:text-white text-lg mb-1.5", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-white/50 leading-snug", children: description })
              ]
            },
            label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-white/50 text-sm mb-4", children: t("login.cta") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: login,
                disabled: isLoggingIn,
                "data-ocid": "login.submit_button",
                className: "px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-base shadow-md shadow-blue-600/20 disabled:opacity-50",
                children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      className: "animate-spin h-4 w-4",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Loading" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            className: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            strokeWidth: "4"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            className: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8v8H4z"
                          }
                        )
                      ]
                    }
                  ),
                  t("nav.loggingIn")
                ] }) : t("login.button")
              }
            )
          ] })
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
    ] }) })
  ] });
}
export {
  LoginPage as default
};
