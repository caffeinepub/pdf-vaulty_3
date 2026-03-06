import {
  FileInput,
  FileText,
  Layers,
  Lock,
  Minimize2,
  RotateCw,
  Shield,
  Zap,
} from "lucide-react";
import { useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPage() {
  const { login, isLoggingIn } = useInternetIdentity();
  const { t } = useLanguage();

  const tools = useMemo(
    () => [
      {
        icon: Layers,
        label: t("tool.merge.label"),
        description: t("tool.merge.desc"),
      },
      {
        icon: FileText,
        label: t("tool.split.label"),
        description: t("tool.split.desc"),
      },
      {
        icon: Minimize2,
        label: t("tool.compress.label"),
        description: t("tool.compress.desc"),
      },
      {
        icon: Lock,
        label: t("tool.protect.label"),
        description: t("tool.protect.desc"),
      },
      {
        icon: RotateCw,
        label: t("tool.rotate.label"),
        description: t("tool.rotate.desc"),
      },
      {
        icon: FileInput,
        label: t("tool.imageToPdf.label"),
        description: t("tool.imageToPdf.desc"),
      },
    ],
    [t],
  );

  const scrollToTools = () => {
    document
      .getElementById("login-tools-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden bg-gradient-to-b from-blue-50/80 to-white dark:from-transparent dark:to-transparent dark:bg-[#0a0a0a]">
        {/* Radial blue glow — dark mode only */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.25 0.08 250 / 60%) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
            {t("login.title").split("PDF Vaulty").length > 1 ? (
              <>
                {t("login.title").split("PDF Vaulty")[0]}
                <span className="text-blue-600 dark:text-blue-400">
                  PDF Vaulty
                </span>
                {t("login.title").split("PDF Vaulty")[1]}
              </>
            ) : (
              t("login.title")
            )}
          </h1>
          <p className="text-lg text-gray-500 dark:text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
            {t("login.subtitle")}
          </p>
          <button
            type="button"
            onClick={scrollToTools}
            data-ocid="login.primary_button"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-base shadow-md shadow-blue-600/20"
          >
            {t("hero.cta")}
          </button>
        </div>
      </section>

      {/* Tools Section */}
      <section
        id="login-tools-section"
        className="px-4 sm:px-6 lg:px-8 pb-16 max-w-4xl mx-auto"
      >
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("tools.heading")}
          </h2>
          <p className="text-blue-600 dark:text-white/50 text-base">
            {t("tools.subheading")}
          </p>
        </div>

        {/* 2-column tool grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map(({ icon: Icon, label, description }) => (
            <button
              type="button"
              key={label}
              onClick={login}
              disabled={isLoggingIn}
              className="group flex flex-col items-start p-6 rounded-xl text-left transition-all duration-200 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/[0.08] hover:border-blue-300 dark:hover:border-white/20 hover:shadow-md disabled:opacity-60"
            >
              {/* Icon box */}
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-blue-50 dark:bg-[#1e3a5f]">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1.5">
                {label}
              </h3>
              <p className="text-sm text-gray-500 dark:text-white/50 leading-snug">
                {description}
              </p>
            </button>
          ))}
        </div>

        {/* Login CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 dark:text-white/50 text-sm mb-4">
            {t("login.cta")}
          </p>
          <button
            type="button"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="login.submit_button"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-base shadow-md shadow-blue-600/20 disabled:opacity-50"
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <title>Loading</title>
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                {t("nav.loggingIn")}
              </span>
            ) : (
              t("login.button")
            )}
          </button>
        </div>
      </section>

      {/* Why Use PDF Vaulty strip */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-[#111111]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {/* Easy to Use */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]">
              <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                {t("feature.easy.title")}
              </h3>
              <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">
                {t("feature.easy.desc")}
              </p>
            </div>
          </div>

          {/* Secure & Private */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent">
              <Shield className="w-7 h-7 text-gray-400 dark:text-white/40" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                {t("feature.secure.title")}
              </h3>
              <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">
                {t("feature.secure.desc")}
              </p>
            </div>
          </div>

          {/* Powerful Tools */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]">
              <Zap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                {t("feature.powerful.title")}
              </h3>
              <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">
                {t("feature.powerful.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
