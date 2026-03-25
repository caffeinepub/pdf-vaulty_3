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
  Search,
  Shield,
  Stamp,
  Star,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ToolId } from "../App";
import OnboardingTour from "../components/OnboardingTour";
import { useLanguage } from "../contexts/LanguageContext";

const RECENT_TOOLS_KEY = "pdfvaulty_recent_tools";
const PINNED_TOOLS_KEY = "pdfvaulty_pinned_tools";
const MAX_RECENT = 3;

function getRecentTools(): ToolId[] {
  try {
    const raw = localStorage.getItem(RECENT_TOOLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecentTool(id: ToolId) {
  const recent = getRecentTools().filter((t) => t !== id);
  recent.unshift(id);
  localStorage.setItem(
    RECENT_TOOLS_KEY,
    JSON.stringify(recent.slice(0, MAX_RECENT)),
  );
}

function getPinnedTools(): ToolId[] {
  try {
    const raw = localStorage.getItem(PINNED_TOOLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function togglePinnedTool(id: ToolId): ToolId[] {
  const pinned = getPinnedTools();
  const idx = pinned.indexOf(id);
  const updated = idx >= 0 ? pinned.filter((t) => t !== id) : [...pinned, id];
  localStorage.setItem(PINNED_TOOLS_KEY, JSON.stringify(updated));
  return updated;
}

interface Tool {
  id: ToolId;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

interface ToolCategory {
  label: string;
  tools: Tool[];
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
  const [search, setSearch] = useState("");
  const [recentToolIds, setRecentToolIds] = useState<ToolId[]>([]);
  const [pinnedToolIds, setPinnedToolIds] = useState<ToolId[]>([]);

  useEffect(() => {
    setRecentToolIds(getRecentTools());
    setPinnedToolIds(getPinnedTools());
  }, []);

  const handleSelectTool = (id: ToolId) => {
    saveRecentTool(id);
    setRecentToolIds(getRecentTools());
    onSelectTool(id);
  };

  const handleTogglePin = (id: ToolId) => {
    const updated = togglePinnedTool(id);
    setPinnedToolIds(updated);
  };

  const allTools: Tool[] = useMemo(
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

  const categories: ToolCategory[] = useMemo(
    () => [
      {
        label: "Edit",
        tools: allTools.filter((t) =>
          [
            "merge",
            "split",
            "rotate",
            "crop-pdf",
            "add-page-numbers",
            "add-watermark",
          ].includes(t.id),
        ),
      },
      {
        label: "Convert",
        tools: allTools.filter((t) =>
          ["image-to-pdf", "pdf-converter"].includes(t.id),
        ),
      },
      {
        label: "Protect",
        tools: allTools.filter((t) =>
          ["password-protect", "flatten-pdf"].includes(t.id),
        ),
      },
      {
        label: "Optimize",
        tools: allTools.filter((t) => ["compress"].includes(t.id)),
      },
    ],
    [allTools],
  );

  const filteredTools = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return allTools.filter(
      (tool) =>
        tool.label.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q),
    );
  }, [allTools, search]);

  const recentTools = useMemo(
    () =>
      recentToolIds
        .map((id) => allTools.find((tool) => tool.id === id))
        .filter(Boolean) as Tool[],
    [recentToolIds, allTools],
  );

  const pinnedTools = useMemo(
    () =>
      pinnedToolIds
        .map((id) => allTools.find((tool) => tool.id === id))
        .filter(Boolean) as Tool[],
    [pinnedToolIds, allTools],
  );

  const faqItems: FaqItem[] = useMemo(
    () => [
      { question: t("faq.q1"), answer: t("faq.a1") },
      { question: t("faq.q2"), answer: t("faq.a2") },
      { question: t("faq.q3"), answer: t("faq.a3") },
      { question: t("faq.q4"), answer: t("faq.a4") },
      { question: t("faq.q5"), answer: t("faq.a5") },
      { question: t("faq.q6"), answer: t("faq.a6") },
      { question: t("faq.q7"), answer: t("faq.a7") },
      { question: t("faq.q8"), answer: t("faq.a8") },
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

  const ToolCard = ({
    tool,
    isPinned,
    onTogglePin,
  }: {
    tool: Tool;
    isPinned: boolean;
    onTogglePin: (id: ToolId) => void;
  }) => {
    const Icon = tool.icon;
    return (
      <div className="group relative h-[180px]">
        <button
          type="button"
          onClick={() => handleSelectTool(tool.id)}
          className="flex flex-col items-start p-6 rounded-xl text-left transition-all duration-200 bg-white dark:bg-[#1a1a2e] border-2 border-black dark:border-white/[0.08] hover:border-gray-700 dark:hover:border-white/20 hover:shadow-md shadow-sm dark:shadow-none w-full h-full"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-blue-50 dark:bg-[#1e3a5f]">
            <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 leading-tight w-full pr-6">
            {tool.label}
          </h3>
          <p className="text-sm text-gray-500 dark:text-white/50 leading-snug line-clamp-2">
            {tool.description}
          </p>
        </button>
        <button
          type="button"
          onClick={() => onTogglePin(tool.id)}
          aria-label={isPinned ? "Unpin tool" : "Pin tool"}
          data-ocid="dashboard.tools.toggle"
          className={`absolute top-2 right-2 z-10 p-1 rounded-md transition-opacity ${
            isPinned ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          } hover:bg-gray-100 dark:hover:bg-white/10`}
        >
          <Star
            className={`w-4 h-4 transition-colors ${
              isPinned
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400 dark:text-white/40"
            }`}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden bg-white dark:bg-[#0a0a0a]">
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
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("tools.heading")}
          </h2>
          <p className="text-blue-600 dark:text-white/50 text-base">
            {t("tools.subheading")}
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/40 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Search results */}
        {search &&
          (filteredTools.length === 0 ? (
            <div className="text-center py-16 text-gray-400 dark:text-white/30">
              No tools found for &ldquo;{search}&rdquo;
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              data-ocid="dashboard.tools.list"
            >
              {filteredTools.map((tool, idx) => (
                <div
                  key={tool.id}
                  data-ocid={`dashboard.tools.item.${idx + 1}`}
                >
                  <ToolCard
                    tool={tool}
                    isPinned={pinnedToolIds.includes(tool.id)}
                    onTogglePin={handleTogglePin}
                  />
                </div>
              ))}
            </div>
          ))}

        {/* Pinned Tools */}
        {!search && pinnedTools.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3">
              Pinned
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pinnedTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isPinned={true}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recently Used */}
        {!search && recentTools.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3">
              Recently Used
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isPinned={pinnedToolIds.includes(tool.id)}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          </div>
        )}

        {/* Categorized tools */}
        {!search && (
          <div className="space-y-10" data-ocid="dashboard.tools.list">
            {categories.map((category) => (
              <div key={category.label}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3">
                  {category.label}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.tools.map((tool, idx) => (
                    <div
                      key={tool.id}
                      data-ocid={`dashboard.tools.item.${idx + 1}`}
                    >
                      <ToolCard
                        tool={tool}
                        isPinned={pinnedToolIds.includes(tool.id)}
                        onTogglePin={handleTogglePin}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Use PDF Vaulty strip */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-[#111111]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
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

      <OnboardingTour />
    </div>
  );
}
