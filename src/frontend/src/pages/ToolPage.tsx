import { Button } from "@/components/ui/button";
import { ArrowLeft, BookmarkPlus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ToolId } from "../App";
import AddPageNumbersTool from "../components/tools/AddPageNumbersTool";
import AddWatermarkTool from "../components/tools/AddWatermarkTool";
import CompressPDFTool from "../components/tools/CompressPDFTool";
import ExcelToPDFTool from "../components/tools/ExcelToPDFTool";
import ImageToPDFTool from "../components/tools/ImageToPDFTool";
import MergePDFTool from "../components/tools/MergePDFTool";
import PDFConverterTool from "../components/tools/PDFConverterTool";
import PDFToWordTool from "../components/tools/PDFToWordTool";
import PasswordProtectPDFTool from "../components/tools/PasswordProtectPDFTool";
import RotatePDFTool from "../components/tools/RotatePDFTool";
import SplitPDFTool from "../components/tools/SplitPDFTool";
import WordToPDFTool from "../components/tools/WordToPDFTool";

interface ToolMeta {
  title: string;
  description: string;
}

const toolMeta: Record<ToolId, ToolMeta> = {
  merge: {
    title: "Merge PDF",
    description:
      "Combine multiple PDF files into a single document instantly. Perfect for merging reports, contracts, and presentations without losing formatting.",
  },
  split: {
    title: "Split PDF",
    description:
      "Extract specific pages or split a PDF into multiple separate files. Choose exactly which pages to detach or how many pages per file.",
  },
  compress: {
    title: "Compress PDF",
    description:
      "Reduce PDF file size for faster sharing and uploading. Maintains readable quality while significantly shrinking the file.",
  },
  "image-to-pdf": {
    title: "Image to PDF",
    description:
      "Convert JPG, PNG, and other image formats into a professional PDF document. Combine multiple images into one PDF in seconds.",
  },
  "pdf-to-word": {
    title: "PDF to Word",
    description:
      "Convert your PDF into an editable Word document. Extracts text content so you can edit and reformat it freely.",
  },
  "word-to-pdf": {
    title: "Word to PDF",
    description:
      "Turn Word documents into universally compatible PDF files. Preserves formatting and layout across all devices.",
  },
  "excel-to-pdf": {
    title: "Excel to PDF",
    description:
      "Convert Excel spreadsheets into clean, printable PDF files. Ideal for sharing data without requiring Excel on the recipient's device.",
  },
  rotate: {
    title: "Rotate PDF",
    description:
      "Fix the orientation of PDF pages in seconds. Rotate individual pages or the entire document to portrait or landscape.",
  },
  "password-protect": {
    title: "Password Protect PDF",
    description:
      "Add a password to your PDF to prevent unauthorized access. Keep sensitive documents secure with encryption.",
  },
  "pdf-converter": {
    title: "PDF Converter",
    description:
      "Convert your PDF to Excel spreadsheet or export pages as JPG or PNG images. One tool, multiple output formats.",
  },
  "add-page-numbers": {
    title: "Add Page Numbers",
    description:
      "Automatically stamp page numbers onto your PDF. Choose position (top/bottom, left/center/right) and starting number.",
  },
  "add-watermark": {
    title: "Add Watermark",
    description:
      "Overlay custom text watermarks on your PDF pages. Mark documents as Confidential, Draft, or any text you choose.",
  },
};

const SESSION_KEY = "pdfvaulty_save_prompt_shown";

interface ToolPageProps {
  toolId: ToolId;
  onBack: () => void;
  isAuthenticated?: boolean;
  onRequestLogin?: () => void;
}

export default function ToolPage({
  toolId,
  onBack,
  isAuthenticated = false,
  onRequestLogin,
}: ToolPageProps) {
  const meta = toolMeta[toolId];

  // One-time save banner state
  const [bannerVisible, setBannerVisible] = useState(false);
  const toolAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${meta.title} – PDF Vaulty`;
    return () => {
      document.title = "PDF Vaulty – Your Secure PDF Toolkit";
    };
  }, [meta.title]);

  // Listen for any download action inside the tool area
  const handleToolAreaClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isAuthenticated) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;

      const target = e.target as HTMLElement;

      // Walk up to 5 ancestor levels to find a download button or anchor
      let el: HTMLElement | null = target;
      for (let i = 0; i < 5; i++) {
        if (!el) break;
        const tag = el.tagName.toLowerCase();
        const text = el.textContent?.toLowerCase() ?? "";
        const hasDownload = el.hasAttribute("download");
        const isDownloadLink = tag === "a" && hasDownload;
        const isDownloadButton =
          (tag === "button" || tag === "a") &&
          (text.includes("download") || text.includes("save"));

        if (isDownloadLink || isDownloadButton) {
          // Small delay so the download starts before banner appears
          setTimeout(() => setBannerVisible(true), 400);
          break;
        }
        el = el.parentElement;
      }
    },
    [isAuthenticated],
  );

  const dismissBanner = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setBannerVisible(false);
  }, []);

  const handleLoginClick = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setBannerVisible(false);
    onRequestLogin?.();
  }, [onRequestLogin]);

  const renderTool = () => {
    switch (toolId) {
      case "merge":
        return <MergePDFTool />;
      case "split":
        return <SplitPDFTool />;
      case "compress":
        return <CompressPDFTool />;
      case "image-to-pdf":
        return <ImageToPDFTool />;
      case "pdf-to-word":
        return <PDFToWordTool />;
      case "word-to-pdf":
        return <WordToPDFTool />;
      case "excel-to-pdf":
        return <ExcelToPDFTool />;
      case "rotate":
        return <RotatePDFTool />;
      case "password-protect":
        return <PasswordProtectPDFTool />;
      case "pdf-converter":
        return <PDFConverterTool />;
      case "add-page-numbers":
        return <AddPageNumbersTool />;
      case "add-watermark":
        return <AddWatermarkTool />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          data-ocid="tool.back.button"
          className="text-vault-muted hover:text-foreground hover:bg-vault-hover gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="h-5 w-px bg-vault-border" />
        <h1 className="text-xl font-bold text-foreground">{meta.title}</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-8 max-w-2xl leading-relaxed">
        {meta.description}
      </p>

      {/* Tool area — listens for download actions to trigger one-time banner */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: click capture on container, not an interactive element */}
      <div ref={toolAreaRef} onClick={handleToolAreaClick}>
        {renderTool()}
      </div>

      {/* One-time "Save to My Files" recommendation banner */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            key="save-banner"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            data-ocid="tool.save_banner.card"
            className="mt-6 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/30 backdrop-blur-sm px-4 py-3.5 flex items-start gap-3 shadow-sm"
            aria-live="polite"
          >
            {/* Icon */}
            <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <BookmarkPlus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>

            {/* Text + action */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 leading-snug">
                Want to keep this file?
              </p>
              <p className="text-sm text-blue-700/80 dark:text-blue-300/70 mt-0.5 leading-snug">
                Log in to save your converted files to{" "}
                <span className="font-medium">My Files</span> and access them
                anytime.
              </p>
              <Button
                size="sm"
                onClick={handleLoginClick}
                data-ocid="tool.save_banner.primary_button"
                className="mt-2.5 h-7 px-3 text-xs bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white border-0 shadow-none"
              >
                Log in to save files
              </Button>
            </div>

            {/* Dismiss */}
            <button
              type="button"
              onClick={dismissBanner}
              data-ocid="tool.save_banner.close_button"
              aria-label="Dismiss recommendation"
              className="shrink-0 mt-0.5 p-1 rounded-md text-blue-400 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
