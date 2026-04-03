import { Button } from "@/components/ui/button";
import { ArrowLeft, BookmarkPlus, Share2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import type { ToolId } from "../App";
import PDFErrorBoundary from "../components/PDFErrorBoundary";
import { useAnalytics } from "../hooks/useAnalytics";

const AddPageNumbersTool = lazy(
  () => import("../components/tools/AddPageNumbersTool"),
);
const AddWatermarkTool = lazy(
  () => import("../components/tools/AddWatermarkTool"),
);
const CompressPDFTool = lazy(
  () => import("../components/tools/CompressPDFTool"),
);
const ExcelToPDFTool = lazy(() => import("../components/tools/ExcelToPDFTool"));
const ExtractTextTool = lazy(
  () => import("../components/tools/ExtractTextTool"),
);
const ImageToPDFTool = lazy(() => import("../components/tools/ImageToPDFTool"));
const MergePDFTool = lazy(() => import("../components/tools/MergePDFTool"));
const PDFConverterTool = lazy(
  () => import("../components/tools/PDFConverterTool"),
);
const PDFToWordTool = lazy(() => import("../components/tools/PDFToWordTool"));
const PasswordProtectPDFTool = lazy(
  () => import("../components/tools/PasswordProtectPDFTool"),
);
const RotatePDFTool = lazy(() => import("../components/tools/RotatePDFTool"));
const SplitPDFTool = lazy(() => import("../components/tools/SplitPDFTool"));
const WordToPDFTool = lazy(() => import("../components/tools/WordToPDFTool"));
const CropPDFTool = lazy(() => import("../components/tools/CropPDFTool"));
const FlattenPDFTool = lazy(() => import("../components/tools/FlattenPDFTool"));
const PDFMetadataTool = lazy(
  () => import("../components/tools/PDFMetadataTool"),
);
const BatchCompressTool = lazy(
  () => import("../components/tools/BatchCompressTool"),
);

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
  "crop-pdf": {
    title: "Crop PDF",
    description:
      "Trim and adjust page margins on every page of your PDF. Remove unwanted whitespace or narrow the visible area precisely.",
  },
  "flatten-pdf": {
    title: "Flatten PDF Forms",
    description:
      "Convert interactive form fields into static, non-editable content. Useful for archiving completed forms.",
  },
  "extract-text": {
    title: "Extract PDF Text",
    description:
      "Extract all readable text from a PDF file. Copy it to your clipboard or download as a .txt file.",
  },
  "edit-metadata": {
    title: "Edit PDF Metadata",
    description:
      "View and edit the embedded metadata of any PDF file — including title, author, subject, and keywords. Useful for organizing documents and improving searchability.",
  },
  "batch-compress": {
    title: "Batch Compress PDF",
    description:
      "Compress multiple PDF files at once and download them all in a single ZIP archive. Perfect for processing large batches of documents quickly.",
  },
};

const faqSchema: Record<ToolId, Array<{ q: string; a: string }>> = {
  merge: [
    {
      q: "How do I merge PDF files online?",
      a: "Upload your PDF files using the Merge PDF tool, arrange them in your preferred order, and click Download to get a single combined PDF.",
    },
    {
      q: "Is there a limit to how many PDFs I can merge?",
      a: "You can merge multiple PDF files at once. For best performance, keep total file size under 50MB.",
    },
    {
      q: "Will merging PDFs reduce quality?",
      a: "No. PDF Vaulty merges files without re-encoding content, so the original quality is preserved.",
    },
  ],
  split: [
    {
      q: "How do I split a PDF into separate pages?",
      a: "Upload your PDF, choose which pages to extract or how to split, then download the resulting files.",
    },
    {
      q: "Can I extract specific pages from a PDF?",
      a: "Yes. Use the Split PDF tool to select individual pages or page ranges to extract.",
    },
    {
      q: "Does splitting a PDF change the content?",
      a: "No. Splitting only separates pages; all text, images, and formatting remain unchanged.",
    },
  ],
  compress: [
    {
      q: "How much can I compress a PDF?",
      a: "Compression results vary by content, but typical PDFs can be reduced by 20–60% without noticeable quality loss.",
    },
    {
      q: "Does compressing a PDF affect text quality?",
      a: "Text quality is preserved. Compression primarily reduces embedded image sizes.",
    },
    {
      q: "Is the compressed PDF still readable?",
      a: "Yes. The Compress PDF tool maintains readability while shrinking the file for easier sharing.",
    },
  ],
  "image-to-pdf": [
    {
      q: "Which image formats can I convert to PDF?",
      a: "PDF Vaulty supports JPG, PNG, and other common image formats.",
    },
    {
      q: "Can I combine multiple images into one PDF?",
      a: "Yes. Upload multiple images and they will be combined into a single PDF document.",
    },
    {
      q: "Will the image quality be preserved?",
      a: "Images are embedded at their original resolution.",
    },
  ],
  "pdf-to-word": [
    {
      q: "Can I edit a PDF after converting to Word?",
      a: "Yes. Converting to Word produces an editable .docx file you can open in Microsoft Word or Google Docs.",
    },
    {
      q: "Does PDF to Word conversion preserve formatting?",
      a: "Basic formatting is preserved. Complex layouts may require minor adjustments after conversion.",
    },
    {
      q: "Is my PDF data safe during conversion?",
      a: "Yes. Processing happens in your browser; your files are never uploaded to external servers.",
    },
  ],
  "word-to-pdf": [
    {
      q: "How do I convert a Word document to PDF?",
      a: "Upload your .docx or .doc file and click Convert. Your PDF will be ready to download instantly.",
    },
    {
      q: "Does the Word to PDF converter preserve formatting?",
      a: "Yes. Fonts, images, tables, and layout are preserved in the output PDF.",
    },
    {
      q: "What Word file formats are supported?",
      a: "Both .docx and .doc formats are supported.",
    },
  ],
  "excel-to-pdf": [
    {
      q: "How do I convert an Excel spreadsheet to PDF?",
      a: "Upload your Excel file and click Convert. The tool generates a clean PDF preserving your data.",
    },
    {
      q: "Does the Excel to PDF tool support multiple sheets?",
      a: "All sheets in the workbook are included in the output PDF.",
    },
    {
      q: "Will my data be safe?",
      a: "Yes. Conversion is handled locally in your browser; data is not sent to any server.",
    },
  ],
  rotate: [
    {
      q: "How do I rotate pages in a PDF?",
      a: "Upload your PDF, select the rotation angle (90°, 180°, or 270°), and download the corrected file.",
    },
    {
      q: "Can I rotate individual pages or the whole document?",
      a: "You can rotate all pages at once or choose specific pages to rotate.",
    },
    {
      q: "Does rotating a PDF affect its content?",
      a: "No. Only the page orientation changes; all content remains intact.",
    },
  ],
  "password-protect": [
    {
      q: "How do I add a password to a PDF?",
      a: "Upload your PDF, set a password, and download the encrypted file. Anyone opening it will need to enter the password.",
    },
    {
      q: "Is password-protected PDF encryption strong?",
      a: "Yes. PDF Vaulty uses standard AES PDF encryption for password protection.",
    },
    {
      q: "Can I remove the password later?",
      a: "You would need the original password to unlock and remove protection from the file.",
    },
  ],
  "pdf-converter": [
    {
      q: "What formats can I convert a PDF to?",
      a: "Use the PDF Converter tool to convert PDFs to Excel spreadsheets or export pages as JPG or PNG images.",
    },
    {
      q: "Can I export all pages as images at once?",
      a: "Yes. The tool exports all pages as a ZIP archive of individual images.",
    },
    {
      q: "Will the Excel conversion include all my PDF data?",
      a: "The tool extracts tabular data from your PDF into an Excel-compatible format.",
    },
  ],
  "add-page-numbers": [
    {
      q: "How do I add page numbers to a PDF?",
      a: "Upload your PDF, choose the position and starting number, then download the numbered document.",
    },
    {
      q: "Can I choose where page numbers appear?",
      a: "Yes. You can place numbers at the top or bottom, and left, center, or right of each page.",
    },
    {
      q: "Does adding page numbers change the PDF layout?",
      a: "Page numbers are added as a small overlay; the rest of the content remains unchanged.",
    },
  ],
  "crop-pdf": [
    {
      q: "What does cropping a PDF do?",
      a: "Cropping removes visible margins from each page by adjusting the PDF's crop box. The original content is preserved; only the visible area changes.",
    },
    {
      q: "Will cropping reduce file size?",
      a: "Cropping adjusts the visible page area but does not remove underlying content, so file size remains similar.",
    },
  ],
  "flatten-pdf": [
    {
      q: "What does flattening a PDF mean?",
      a: "Flattening converts all interactive form fields (text inputs, checkboxes, signatures) into static content so they can no longer be edited.",
    },
    {
      q: "Is the appearance preserved after flattening?",
      a: "Yes. The visual appearance of the filled-in form is preserved exactly; only interactivity is removed.",
    },
  ],
  "add-watermark": [
    {
      q: "How do I add a watermark to a PDF?",
      a: "Upload your PDF, type your watermark text (e.g. Confidential), choose size and opacity, then download.",
    },
    {
      q: "Can I customize the watermark text?",
      a: "Yes. You can enter any text and adjust its size, opacity, and angle.",
    },
    {
      q: "Does the watermark affect the original content?",
      a: "The watermark is overlaid on top of existing content without altering it.",
    },
  ],
  "extract-text": [
    {
      q: "How do I extract text from a PDF?",
      a: "Upload your PDF to the Extract PDF Text tool. The tool reads all pages and extracts readable text, which you can copy to clipboard or download as a .txt file.",
    },
    {
      q: "Does text extraction work on scanned PDFs?",
      a: "Text extraction works on PDFs with embedded text layers. Scanned image-only PDFs will not return readable text — they would require OCR software.",
    },
  ],
  "edit-metadata": [
    {
      q: "What is PDF metadata?",
      a: "PDF metadata includes embedded fields like title, author, subject, and keywords. These fields help with document organization, searchability, and identification.",
    },
    {
      q: "Can I edit the metadata of any PDF?",
      a: "Yes. Upload any PDF to the Edit PDF Metadata tool, modify the fields, and download the updated file. Works on most standard PDFs.",
    },
    {
      q: "Does editing metadata change the PDF content?",
      a: "No. Only the metadata fields are updated; all pages, text, images, and formatting remain exactly the same.",
    },
  ],
  "batch-compress": [
    {
      q: "How many PDFs can I compress at once?",
      a: "You can upload and compress up to 10 PDF files at once using the Batch Compress tool.",
    },
    {
      q: "How do I download all compressed PDFs?",
      a: "After compression is complete, click the Download All as ZIP button to receive all compressed files in a single archive.",
    },
    {
      q: "What if one file fails to compress?",
      a: "If a single file fails, the others continue processing. Successfully compressed files are still included in the final ZIP download.",
    },
  ],
};

const SESSION_KEY = "pdfvaulty_save_prompt_shown";
const SESSION_HISTORY_KEY = "pdfvaulty_session_history";
const LARGE_FILE_THRESHOLD_MB = 10;

const toolSpinner = (
  <div className="flex items-center justify-center py-16">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  </div>
);

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
  const { trackToolUse } = useAnalytics();

  const [bannerVisible, setBannerVisible] = useState(false);
  const [_isProcessing, setIsProcessing] = useState(false);
  const [sizeWarning, setSizeWarning] = useState<{
    visible: boolean;
    sizeMb: number;
  }>({ visible: false, sizeMb: 0 });

  const toolAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${meta.title} – PDF Vaulty`;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "tool-jsonld";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${meta.title} – PDF Vaulty`,
      description: meta.description,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    });
    document.head.appendChild(script);

    const faqItems = faqSchema[toolId];
    if (faqItems) {
      const faqScript = document.createElement("script");
      faqScript.type = "application/ld+json";
      faqScript.id = "tool-faq-jsonld";
      faqScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      });
      document.head.appendChild(faqScript);
    }

    return () => {
      document.title = "PDF Vaulty – Your Secure PDF Toolkit";
      document.getElementById("tool-jsonld")?.remove();
      document.getElementById("tool-faq-jsonld")?.remove();
    };
  }, [meta.title, meta.description, toolId]);

  useEffect(() => {
    const el = toolAreaRef.current;
    if (!el) return;
    const onFileChange = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" &&
        (target as HTMLInputElement).type === "file"
      ) {
        setIsProcessing(true);
        const input = target as HTMLInputElement;
        const files = input.files;
        if (files && files.length > 0) {
          let totalBytes = 0;
          for (let i = 0; i < files.length; i++) {
            totalBytes += files[i].size;
          }
          const totalMb = totalBytes / (1024 * 1024);
          if (totalMb > LARGE_FILE_THRESHOLD_MB) {
            setSizeWarning({
              visible: true,
              sizeMb: Math.round(totalMb * 10) / 10,
            });
          } else {
            setSizeWarning((prev) =>
              prev.visible ? { visible: false, sizeMb: 0 } : prev,
            );
          }
        }
      }
    };
    el.addEventListener("change", onFileChange, true);
    return () => el.removeEventListener("change", onFileChange, true);
  }, []);

  const handleShareTool = useCallback(() => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Tool link copied!");
        })
        .catch(() => {
          toast.error("Could not copy link");
        });
    } else {
      toast.error("Clipboard not available");
    }
  }, []);

  useEffect(() => {
    trackToolUse(toolId);

    // Session history
    try {
      const raw = sessionStorage.getItem(SESSION_HISTORY_KEY);
      const history = raw ? JSON.parse(raw) : [];
      const meta2 = toolMeta[toolId];
      const newEntry = {
        toolId,
        toolLabel: meta2?.title ?? toolId,
        timestamp: Date.now(),
      };
      const filtered = history.filter(
        (e: { toolId: string }) => e.toolId !== toolId,
      );
      sessionStorage.setItem(
        SESSION_HISTORY_KEY,
        JSON.stringify([newEntry, ...filtered].slice(0, 10)),
      );
    } catch {}
  }, [toolId, trackToolUse]);

  useEffect(() => {
    if (!isAuthenticated) {
      const shown = sessionStorage.getItem(SESSION_KEY);
      if (!shown) {
        const timer = setTimeout(() => {
          setBannerVisible(true);
          sessionStorage.setItem(SESSION_KEY, "1");
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated]);

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
      case "crop-pdf":
        return <CropPDFTool />;
      case "flatten-pdf":
        return <FlattenPDFTool />;
      case "extract-text":
        return <ExtractTextTool />;
      case "edit-metadata":
        return <PDFMetadataTool />;
      case "batch-compress":
        return <BatchCompressTool />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header row: back button + title + share button */}
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
        <h1 className="text-xl font-bold text-foreground flex-1">
          {meta.title}
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShareTool}
          data-ocid="tool.share.button"
          className="gap-1.5 text-xs text-vault-muted border-vault-border hover:text-foreground hover:border-foreground/30 hover:bg-vault-hover shrink-0"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed">
        {meta.description}
      </p>

      {/* Large file warning banner */}
      <AnimatePresence>
        {sizeWarning.visible && (
          <motion.div
            key="size-warning"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            data-ocid="tool.size_warning.card"
            className="mb-6 rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 flex items-start gap-3"
            aria-live="polite"
          >
            <span className="text-lg leading-none mt-0.5 shrink-0">⚠️</span>
            <p className="flex-1 text-sm text-amber-800 dark:text-amber-200 leading-snug">
              <span className="font-semibold">Large file detected</span> —{" "}
              {sizeWarning.sizeMb} MB. Processing may take a moment.
            </p>
            <button
              type="button"
              onClick={() => setSizeWarning({ visible: false, sizeMb: 0 })}
              className="shrink-0 text-amber-500 hover:text-amber-700 dark:hover:text-amber-300"
              aria-label="Dismiss warning"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tool area */}
      <div ref={toolAreaRef}>
        <PDFErrorBoundary>
          <Suspense fallback={toolSpinner}>{renderTool()}</Suspense>
        </PDFErrorBoundary>
      </div>

      {/* Save-to-my-files guest banner */}
      <AnimatePresence>
        {bannerVisible && !isAuthenticated && (
          <motion.div
            key="save-banner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            data-ocid="tool.save_banner.card"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm z-50 px-4"
          >
            <div className="rounded-2xl border border-blue-200 dark:border-blue-800/60 bg-white dark:bg-[#1a1a2e] shadow-xl shadow-blue-900/10 px-5 py-4 flex items-start gap-3">
              <BookmarkPlus className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white mb-0.5">
                  Save files to My Vault
                </p>
                <p className="text-xs text-gray-500 dark:text-white/50 leading-relaxed">
                  Sign in to save, revisit, and share your processed files from
                  any device.
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setBannerVisible(false);
                    onRequestLogin?.();
                  }}
                  data-ocid="tool.save_banner.primary_button"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setBannerVisible(false)}
                  data-ocid="tool.save_banner.close_button"
                  className="text-xs text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 text-center"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ section */}
      {faqSchema[toolId] && faqSchema[toolId].length > 0 && (
        <section
          className="mt-12 pt-8 border-t border-border"
          data-ocid="tool.faq.section"
          aria-label="Frequently asked questions"
        >
          <h2 className="text-lg font-bold text-foreground mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-0 divide-y divide-border">
            {faqSchema[toolId].map(({ q, a }, i) => (
              <details key={q} className="group" open={i === 0}>
                <summary
                  className="flex items-center justify-between py-4 cursor-pointer list-none gap-3"
                  data-ocid={`tool.faq.item.${i + 1}`}
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {q}
                  </span>
                  <span className="shrink-0 text-muted-foreground group-open:rotate-180 transition-transform duration-200">
                    ▾
                  </span>
                </summary>
                <p className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
