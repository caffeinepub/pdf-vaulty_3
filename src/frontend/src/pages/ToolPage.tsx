import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
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

interface ToolPageProps {
  toolId: ToolId;
  onBack: () => void;
}

export default function ToolPage({ toolId, onBack }: ToolPageProps) {
  const meta = toolMeta[toolId];

  useEffect(() => {
    document.title = `${meta.title} – PDF Vaulty`;
    return () => {
      document.title = "PDF Vaulty – Your Secure PDF Toolkit";
    };
  }, [meta.title]);

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
      {renderTool()}
    </div>
  );
}
