import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { ToolId } from "../App";
import AddPageNumbersTool from "../components/tools/AddPageNumbersTool";
import AddWatermarkTool from "../components/tools/AddWatermarkTool";
import CompressPDFTool from "../components/tools/CompressPDFTool";
import ExcelToPDFTool from "../components/tools/ExcelToPDFTool";
import ImageToPDFTool from "../components/tools/ImageToPDFTool";
import MergePDFTool from "../components/tools/MergePDFTool";
import PDFToExcelTool from "../components/tools/PDFToExcelTool";
import PDFToImageTool from "../components/tools/PDFToImageTool";
import PDFToWordTool from "../components/tools/PDFToWordTool";
import PasswordProtectPDFTool from "../components/tools/PasswordProtectPDFTool";
import RotatePDFTool from "../components/tools/RotatePDFTool";
import SplitPDFTool from "../components/tools/SplitPDFTool";
import WordToPDFTool from "../components/tools/WordToPDFTool";

const toolTitles: Record<ToolId, string> = {
  merge: "Merge PDF",
  split: "Split PDF",
  compress: "Compress PDF",
  "image-to-pdf": "Image to PDF",
  "pdf-to-word": "PDF to Word",
  "word-to-pdf": "Word to PDF",
  "excel-to-pdf": "Excel to PDF",
  rotate: "Rotate PDF",
  "password-protect": "Password Protect PDF",
  "pdf-to-excel": "PDF to Excel",
  "pdf-to-image": "PDF to Image",
  "add-page-numbers": "Add Page Numbers",
  "add-watermark": "Add Watermark",
};

interface ToolPageProps {
  toolId: ToolId;
  onBack: () => void;
}

export default function ToolPage({ toolId, onBack }: ToolPageProps) {
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
      case "pdf-to-excel":
        return <PDFToExcelTool />;
      case "pdf-to-image":
        return <PDFToImageTool />;
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
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-vault-muted hover:text-foreground hover:bg-vault-hover gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="h-5 w-px bg-vault-border" />
        <h1 className="text-xl font-bold text-foreground">
          {toolTitles[toolId]}
        </h1>
      </div>
      {renderTool()}
    </div>
  );
}
