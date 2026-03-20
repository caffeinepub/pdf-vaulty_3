import {
  ArrowRightLeft,
  ChevronDown,
  Crop,
  FileCheck,
  FileInput,
  FileText,
  Hash,
  Layers,
  Lock,
  Minimize2,
  RotateCw,
  Shield,
  Stamp,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ToolId } from "../App";
import OnboardingTour from "../components/OnboardingTour";
import { useLanguage } from "../contexts/LanguageContext";

interface Tool {
  id: ToolId;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

interface DashboardProps {
  onSelectTool: (id: ToolId) => void;
  userName?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export default function Dashboard({ onSelectTool }: DashboardProps) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tools: Tool[] = useMemo(
    () => [
      {
        id: "merge",
        icon: Layers,
        label: t("tool.merge.label"),
        description: t("tool.merge.desc"),
      },
      {
        id: "split",
        icon: FileText,
        label: t("tool.split.label"),
        description: t("tool.split.desc"),
      },
      {
        id: "compress",
        icon: Minimize2,
        label: t("tool.compress.label"),
        description: t("tool.compress.desc"),
      },
      {
        id: "password-protect",
        icon: Lock,
        label: t("tool.protect.label"),
        description: t("tool.protect.desc"),
      },
      {
        id: "rotate",
        icon: RotateCw,
        label: t("tool.rotate.label"),
        description: t("tool.rotate.desc"),
      },
      {
        id: "image-to-pdf",
        icon: FileInput,
        label: t("tool.imageToPdf.label"),
        description: t("tool.imageToPdf.desc"),
      },
      {
        id: "pdf-converter",
        icon: ArrowRightLeft,
        label: t("tool.converter.label"),
        description: t("tool.converter.desc"),
      },
      {
        id: "add-page-numbers",
        icon: Hash,
        label: t("tool.pageNumbers.label"),
        description: t("tool.pageNumbers.desc"),
      },
      {
        id: "add-watermark",
        icon: Stamp,
        label: t("tool.watermark.label"),
        description: t("tool.watermark.desc"),
      },
      {
        id: "crop-pdf",
        icon: Crop,
        label: t("tool.crop.label"),
        description: t("tool.crop.desc"),
      },
      {
        id: "flatten-pdf",
        icon: FileCheck,
        label: t("tool.flatten.label"),
        description: t("tool.flatten.desc"),
      },
    ],
    [t],
  );

  const faqItems: FaqItem[] = useMemo(
    () => [
      {
        question: t("faq.q1"),
        answer: t("faq.a1"),
      },
      {
        question: t("faq.q2"),
        answer: t("faq.a2"),
      },
      {
        question: t("faq.q3"),
        answer: t("faq.a3"),
      },
      {
        question: t("faq.q4"),
        answer: t("faq.a4"),
      },
      {
        question: t("faq.q5"),
        answer: t("faq.a5"),
      },
      {
        question: t("faq.q6"),
        answer: t("faq.a6"),
      },
      {
        question: t("faq.q7"),
        answer: t("faq.a7"),
      },
      {
        question: t("faq.q8"),
        answer: t("faq.a8"),
      },
    ],
    [t],
  );

  const scrollToTools = () => {
    document
      .getElementById("tools-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden bg-white dark:bg-[#0a0a0a]">
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
            {t("hero.title").split("PDF Vaulty").length > 1 ? (
              <>
                {t("hero.title").split("PDF Vaulty")[0]}
                <span className="text-blue-600 dark:text-blue-400">
                  PDF Vaulty
                </span>
                {t("hero.title").split("PDF Vaulty")[1]}
              </>
            ) : (
              t("hero.title")
            )}
          </h1>
          <p className="text-lg text-gray-500 dark:text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <button
            type="button"
            onClick={scrollToTools}
            data-ocid="dashboard.primary_button"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-base shadow-md shadow-blue-600/20"
          >
            {t("hero.cta")}
          </button>
        </div>
      </section>

      {/* Tools Section */}
      <section
        id="tools-section"
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
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-ocid="dashboard.tools.list"
        >
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <button
                type="button"
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                data-ocid={`dashboard.tools.item.${idx + 1}`}
                className="group flex flex-col items-start p-6 rounded-xl text-left transition-all duration-200 bg-white dark:bg-[#1a1a2e] border-2 border-black dark:border-white/[0.08] hover:border-gray-700 dark:hover:border-white/20 hover:shadow-md shadow-sm dark:shadow-none min-h-[140px] overflow-hidden"
              >
                {/* Icon box */}
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-blue-50 dark:bg-[#1e3a5f]">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1.5 leading-tight w-full">
                  {tool.label}
                </h3>
                <p className="text-sm text-gray-500 dark:text-white/50 leading-snug line-clamp-2">
                  {tool.description}
                </p>
              </button>
            );
          })}
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

      {/* FAQ Section */}
      <section
        className="py-16 px-4 bg-white dark:bg-[#0a0a0a]"
        data-ocid="dashboard.faq.section"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t("faq.heading")}
            </h2>
            <p className="text-gray-500 dark:text-white/50 text-base">
              {t("faq.subheading")}
            </p>
          </div>

          <div
            className="divide-y divide-gray-200 dark:divide-white/[0.08]"
            data-ocid="dashboard.faq.list"
          >
            {faqItems.map((item, idx) => (
              <div
                key={item.question}
                data-ocid={`dashboard.faq.item.${idx + 1}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  data-ocid={`dashboard.faq.toggle.${idx + 1}`}
                  className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-semibold text-gray-900 dark:text-white text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 dark:text-white/40 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="pb-5">
                    <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding tour — shown only to first-time visitors */}
      <OnboardingTour />
    </div>
  );
}
