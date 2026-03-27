import { Button } from "@/components/ui/button";
import { Check, Copy, Download, FileSearch, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { ensurePdfjsLoaded } from "../../lib/pdfUtils";

export default function ExtractTextTool() {
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractText = useCallback(async (file: File) => {
    setIsExtracting(true);
    setError(null);
    setExtractedText(null);
    try {
      await ensurePdfjsLoaded();
      const pdfjsLib = window.pdfjsLib;

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const textParts: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        // Cast to any to access getTextContent which is not in the type stub
        const content = await (
          page as unknown as {
            getTextContent: () => Promise<{ items: Array<{ str?: string }> }>;
          }
        ).getTextContent();
        const pageText = content.items
          .map((item) => item.str ?? "")
          .join(" ")
          .trim();
        if (pageText) textParts.push(pageText);
      }

      const result = textParts.join("\n\n");
      if (!result.trim()) {
        setError(
          "No readable text found in this PDF. It may be a scanned image.",
        );
      } else {
        setExtractedText(result);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to extract text. Make sure the file is a valid PDF.");
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".pdf")) {
        setError("Please upload a PDF file.");
        return;
      }
      extractText(file);
    },
    [extractText],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDropZoneKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const handleCopy = async () => {
    if (!extractedText) return;
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      toast.success("Text copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy text.");
    }
  };

  const handleDownload = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload area */}
      {!extractedText && !isExtracting && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handler provided via onKeyDown
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={handleDropZoneKeyDown}
          data-ocid="extract_text.dropzone"
          className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-12 flex flex-col items-center justify-center gap-4 text-center ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
              : "border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111] hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-950/10"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
            <FileSearch className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-base">
              Drop a PDF here or click to browse
            </p>
            <p className="text-sm text-gray-400 dark:text-white/40 mt-1">
              PDF files only
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="pointer-events-none"
            data-ocid="extract_text.upload_button"
          >
            <Upload className="w-4 h-4 mr-1.5" />
            Select PDF
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      )}

      {/* Extracting spinner */}
      {isExtracting && (
        <div
          data-ocid="extract_text.loading_state"
          className="flex flex-col items-center justify-center gap-3 py-16"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          <p className="text-sm text-gray-500 dark:text-white/50">
            Extracting text…
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          data-ocid="extract_text.error_state"
          className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 px-4 py-4"
        >
          <p className="text-sm text-red-700 dark:text-red-300 font-medium">
            {error}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => {
              setError(null);
              setExtractedText(null);
            }}
          >
            Try another file
          </Button>
        </div>
      )}

      {/* Extracted text result */}
      {extractedText && (
        <div className="space-y-4" data-ocid="extract_text.success_state">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm font-medium text-gray-700 dark:text-white/70">
              Extracted text ({extractedText.length.toLocaleString()}{" "}
              characters)
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                data-ocid="extract_text.secondary_button"
                className="gap-1.5"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>
              <Button
                size="sm"
                onClick={handleDownload}
                data-ocid="extract_text.primary_button"
                className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="w-3.5 h-3.5" />
                Download .txt
              </Button>
            </div>
          </div>
          <textarea
            readOnly
            value={extractedText}
            data-ocid="extract_text.textarea"
            className="w-full h-64 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111] text-gray-800 dark:text-white/80 text-sm p-4 resize-none font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setExtractedText(null);
              setError(null);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            Extract from another file
          </Button>
        </div>
      )}
    </div>
  );
}
