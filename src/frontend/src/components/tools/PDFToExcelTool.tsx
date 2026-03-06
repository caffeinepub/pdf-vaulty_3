import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  Download,
  Info,
  Loader2,
  Table2,
} from "lucide-react";
import { useState } from "react";
import {
  downloadBlob,
  ensurePdfjsLoaded,
  ensureXLSXLoaded,
  getXLSX,
} from "../../lib/pdfUtils";
import FileUploadZone from "../shared/FileUploadZone";

interface UploadedFile {
  file: File;
  id: string;
}

function extractTextLinesFromPage(rawText: string): string[] {
  const lines: string[] = [];
  // Extract text from BT...ET blocks
  const btEtRegex = /BT([\s\S]*?)ET/g;
  let match = btEtRegex.exec(rawText);
  while (match !== null) {
    const block = match[1];
    const strRegex = /\(([^)]*)\)/g;
    let strMatch = strRegex.exec(block);
    while (strMatch !== null) {
      const decoded = strMatch[1]
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r")
        .replace(/\\t/g, "\t")
        .replace(/\\\\/g, "\\")
        .replace(/\\\(/g, "(")
        .replace(/\\\)/g, ")");
      const trimmed = decoded.trim();
      if (trimmed) lines.push(trimmed);
      strMatch = strRegex.exec(block);
    }
    match = btEtRegex.exec(rawText);
  }
  return lines;
}

export default function PDFToExcelTool() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultFileName, setResultFileName] = useState("");

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setDone(false);
    setResultBlob(null);

    try {
      const file = uploadedFiles[0].file;
      await ensureXLSXLoaded();
      await ensurePdfjsLoaded();
      const XLSX = getXLSX();
      const pdfjsLib = window.pdfjsLib as PdfjsLib;

      setProgress("Loading PDF…");
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      // Use raw byte extraction (pdf.js text extraction via canvas is too complex;
      // we use the proven byte-level text extraction used in PDFToWord)
      setProgress("Extracting text content…");
      const rawText = new TextDecoder("latin1").decode(bytes);
      const allRows: string[][] = [];

      // Also try pdfjs for better text extraction
      let pdfjsSucceeded = false;
      try {
        const loadingTask = pdfjsLib.getDocument({ data: bytes.slice() });
        const pdfDoc = await loadingTask.promise;
        const numPages = pdfDoc.numPages;

        allRows.push(["Page", "Text Content"]);

        for (let i = 1; i <= numPages; i++) {
          setProgress(`Extracting page ${i} of ${numPages}…`);
          const page = await pdfDoc.getPage(i);
          // Use viewport rendering to canvas and extract text via getTextContent if available
          // pdfjs page object may have getTextContent
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pageAny = page as any;
          if (typeof pageAny.getTextContent === "function") {
            const textContent = await pageAny.getTextContent();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const items: any[] = textContent.items || [];
            // Group items by approximate Y position to form rows
            const yGroups: Map<number, string[]> = new Map();
            for (const item of items) {
              if (item.str?.trim()) {
                const yKey = Math.round((item.transform?.[5] ?? 0) / 5) * 5;
                if (!yGroups.has(yKey)) yGroups.set(yKey, []);
                yGroups.get(yKey)!.push(item.str);
              }
            }
            // Sort by Y descending (top of page first)
            const sortedYs = Array.from(yGroups.keys()).sort((a, b) => b - a);
            for (const y of sortedYs) {
              const lineText = yGroups.get(y)!.join(" ").trim();
              if (lineText) {
                allRows.push([`Page ${i}`, lineText]);
              }
            }
            pdfjsSucceeded = true;
          }
        }
      } catch {
        pdfjsSucceeded = false;
      }

      if (!pdfjsSucceeded) {
        // Fallback: raw byte extraction
        setProgress("Extracting text (fallback)…");
        const lines = extractTextLinesFromPage(rawText);
        allRows.push(["Line", "Text Content"]);
        lines.forEach((line, idx) => {
          allRows.push([String(idx + 1), line]);
        });
      }

      if (allRows.length <= 1) {
        allRows.push(["1", "No extractable text found in this PDF."]);
      }

      setProgress("Building Excel file…");
      const ws = XLSX.utils.aoa_to_sheet(allRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "PDF Content");

      // Generate as binary string then blob
      // Use XLSX write method - need to access via global
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const xlsxAny = window.XLSX as any;
      const wbout: ArrayBuffer = xlsxAny.write(wb, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([wbout], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const outName = `${file.name.replace(/\.pdf$/i, "")}.xlsx`;
      setResultBlob(blob);
      setResultFileName(outName);
      setDone(true);
      setProgress("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Conversion failed. Please try again.";
      setError(msg);
      setProgress("");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    downloadBlob(resultBlob, resultFileName);
  };

  const handleReset = () => {
    setUploadedFiles([]);
    setDone(false);
    setResultBlob(null);
    setResultFileName("");
    setError(null);
    setProgress("");
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
            <Table2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">PDF to Excel</h2>
            <p className="text-sm text-vault-muted">
              Extract text from your PDF into an Excel spreadsheet.
            </p>
          </div>
        </div>

        <Alert className="mb-4 bg-vault-hover border-vault-border">
          <Info className="w-4 h-4 text-vault-amber" />
          <AlertDescription className="text-vault-muted text-sm">
            Text content is extracted and organized by page into rows. Charts,
            images, and complex formatting are not preserved in the Excel
            output.
          </AlertDescription>
        </Alert>

        <FileUploadZone
          accept=".pdf,application/pdf"
          multiple={false}
          files={uploadedFiles}
          onFilesChange={setUploadedFiles}
          label="Drop your PDF here or click to browse"
          hint="Single PDF file only"
        />
      </div>

      {/* Convert Button */}
      {!done && (
        <Button
          data-ocid="pdf-to-excel.primary_button"
          onClick={handleConvert}
          disabled={uploadedFiles.length === 0 || isProcessing}
          className="w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {progress || "Converting…"}
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Convert to Excel
            </>
          )}
        </Button>
      )}

      {/* Error */}
      {error && (
        <div
          data-ocid="pdf-to-excel.error_state"
          className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive"
        >
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Success */}
      {done && resultBlob && (
        <div
          data-ocid="pdf-to-excel.success_state"
          className="rounded-xl border border-border bg-card p-5 space-y-4"
        >
          <div className="flex items-center gap-2 text-green-500 font-semibold">
            <CheckCircle className="h-5 w-5" />
            Conversion complete!
          </div>

          <div className="rounded-lg bg-muted/40 p-3 flex items-center gap-3">
            <Table2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-sm text-foreground truncate">
              {resultFileName}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              data-ocid="pdf-to-excel.save_button"
              onClick={handleDownload}
              className="flex-1 bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold gap-2"
              size="lg"
            >
              <Download className="w-4 h-4" />
              Download Excel
            </Button>
            <Button
              data-ocid="pdf-to-excel.secondary_button"
              onClick={handleReset}
              variant="outline"
              className="border-vault-border text-vault-muted hover:text-foreground"
              size="lg"
            >
              Convert Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
