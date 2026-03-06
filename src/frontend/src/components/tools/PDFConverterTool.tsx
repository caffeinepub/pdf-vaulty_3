import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  AlertCircle,
  ArrowRightLeft,
  CheckCircle,
  Download,
  Image,
  Info,
  Loader2,
  Table2,
} from "lucide-react";
import { useState } from "react";
import {
  downloadBlob,
  ensureJSZipLoaded,
  ensurePdfjsLoaded,
  ensureXLSXLoaded,
  getXLSX,
} from "../../lib/pdfUtils";
import FileUploadZone from "../shared/FileUploadZone";

interface UploadedFile {
  file: File;
  id: string;
}

type ConvertFormat = "excel" | "jpg" | "png";

// ─── Excel extraction helpers (from PDFToExcelTool) ──────────────────────────

function extractTextLinesFromPage(rawText: string): string[] {
  const lines: string[] = [];
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

// ─── Component ───────────────────────────────────────────────────────────────

export default function PDFConverterTool() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [format, setFormat] = useState<ConvertFormat>("excel");
  const [quality, setQuality] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [progressPct, setProgressPct] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Excel result
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultFileName, setResultFileName] = useState("");

  // Image result
  const [resultBlobs, setResultBlobs] = useState<
    { name: string; blob: Blob }[]
  >([]);
  const [resultZipBlob, setResultZipBlob] = useState<Blob | null>(null);
  const [resultZipName, setResultZipName] = useState("");

  // ─── Convert to Excel ──────────────────────────────────────────────────────

  const handleConvertExcel = async (file: File) => {
    await ensureXLSXLoaded();
    await ensurePdfjsLoaded();
    const XLSX = getXLSX();
    const pdfjsLib = window.pdfjsLib as PdfjsLib;

    setProgress("Loading PDF…");
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    setProgress("Extracting text content…");
    const rawText = new TextDecoder("latin1").decode(bytes);
    const allRows: string[][] = [];

    let pdfjsSucceeded = false;
    try {
      const loadingTask = pdfjsLib.getDocument({ data: bytes.slice() });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;

      allRows.push(["Page", "Text Content"]);

      for (let i = 1; i <= numPages; i++) {
        setProgress(`Extracting page ${i} of ${numPages}…`);
        const page = await pdfDoc.getPage(i);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pageAny = page as any;
        if (typeof pageAny.getTextContent === "function") {
          const textContent = await pageAny.getTextContent();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const items: any[] = textContent.items || [];
          const yGroups: Map<number, string[]> = new Map();
          for (const item of items) {
            if (item.str?.trim()) {
              const yKey = Math.round((item.transform?.[5] ?? 0) / 5) * 5;
              if (!yGroups.has(yKey)) yGroups.set(yKey, []);
              yGroups.get(yKey)!.push(item.str);
            }
          }
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
  };

  // ─── Convert to Image ──────────────────────────────────────────────────────

  const handleConvertImage = async (file: File, fmt: "jpg" | "png") => {
    await ensurePdfjsLoaded();
    await ensureJSZipLoaded();
    const pdfjsLib = window.pdfjsLib as PdfjsLib;

    setProgress("Loading PDF…");
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    const loadingTask = pdfjsLib.getDocument({ data: bytes.slice() });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;

    const mimeType = fmt === "jpg" ? "image/jpeg" : "image/png";
    const ext = fmt === "jpg" ? "jpg" : "png";
    const qualityDecimal = quality / 100;
    const baseName = file.name.replace(/\.pdf$/i, "");

    const pageBlobs: { name: string; blob: Blob }[] = [];

    for (let i = 1; i <= numPages; i++) {
      setProgress(`Rendering page ${i} of ${numPages}…`);
      setProgressPct(Math.round(((i - 1) / numPages) * 100));

      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      await page.render({ canvasContext: ctx, viewport }).promise;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to convert canvas to blob"));
          },
          mimeType,
          fmt === "jpg" ? qualityDecimal : undefined,
        );
      });

      const pageName =
        numPages === 1 ? `${baseName}.${ext}` : `page-${i}.${ext}`;
      pageBlobs.push({ name: pageName, blob });
    }

    setProgressPct(100);

    if (numPages === 1) {
      setResultBlobs(pageBlobs);
    } else {
      setProgress("Creating ZIP archive…");
      const JSZip = window.JSZip as new () => JSZipNS.JSZip;
      const zip = new JSZip();
      for (const { name, blob } of pageBlobs) {
        zip.file(name, blob);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      setResultZipBlob(zipBlob);
      setResultZipName(`${baseName}-images.zip`);
    }
  };

  // ─── Main convert handler ──────────────────────────────────────────────────

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setDone(false);
    setResultBlob(null);
    setResultBlobs([]);
    setResultZipBlob(null);
    setProgressPct(0);

    try {
      const file = uploadedFiles[0].file;

      if (format === "excel") {
        await handleConvertExcel(file);
      } else {
        await handleConvertImage(file, format);
      }

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

  // ─── Download handlers ────────────────────────────────────────────────────

  const handleDownload = () => {
    if (format === "excel" && resultBlob) {
      downloadBlob(resultBlob, resultFileName);
    } else if (resultZipBlob) {
      downloadBlob(resultZipBlob, resultZipName);
    } else if (resultBlobs.length === 1) {
      downloadBlob(resultBlobs[0].blob, resultBlobs[0].name);
    }
  };

  const handleReset = () => {
    setUploadedFiles([]);
    setDone(false);
    setResultBlob(null);
    setResultFileName("");
    setResultBlobs([]);
    setResultZipBlob(null);
    setResultZipName("");
    setError(null);
    setProgress("");
    setProgressPct(0);
  };

  // ─── Derived labels ───────────────────────────────────────────────────────

  const formatLabels: Record<ConvertFormat, string> = {
    excel: "Excel",
    jpg: "JPG",
    png: "PNG",
  };

  const convertLabel = `Convert to ${formatLabels[format]}`;

  const downloadLabel = (() => {
    if (format === "excel") return "Download Excel";
    if (resultZipBlob) return "Download ZIP";
    return `Download ${formatLabels[format]}`;
  })();

  const resultName = (() => {
    if (format === "excel") return resultFileName;
    return resultZipBlob ? resultZipName : (resultBlobs[0]?.name ?? "");
  })();

  const resultIcon =
    format === "excel" ? (
      <Table2 className="w-4 h-4 text-emerald-400 shrink-0" />
    ) : (
      <Image className="w-4 h-4 text-violet-400 shrink-0" />
    );

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
            <ArrowRightLeft className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">PDF Converter</h2>
            <p className="text-sm text-vault-muted">
              Convert your PDF to an Excel spreadsheet or JPG / PNG images.
            </p>
          </div>
        </div>

        {/* Format toggle */}
        <div className="mb-5 space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Output Format
          </Label>
          <div className="flex gap-2">
            {(["excel", "jpg", "png"] as ConvertFormat[]).map((fmt) => (
              <button
                type="button"
                key={fmt}
                data-ocid="pdf-converter.toggle"
                onClick={() => {
                  setFormat(fmt);
                  setDone(false);
                  setError(null);
                }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  format === fmt
                    ? "bg-vault-blue text-white border-vault-blue"
                    : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"
                }`}
              >
                {fmt === "excel" ? "Excel" : fmt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Excel info alert */}
        {format === "excel" && (
          <Alert className="mb-4 bg-vault-hover border-vault-border">
            <Info className="w-4 h-4 text-vault-amber" />
            <AlertDescription className="text-vault-muted text-sm">
              Text content is extracted and organized by page into rows. Charts,
              images, and complex formatting are not preserved in the Excel
              output.
            </AlertDescription>
          </Alert>
        )}

        <FileUploadZone
          data-ocid="pdf-converter.dropzone"
          accept=".pdf,application/pdf"
          multiple={false}
          files={uploadedFiles}
          onFilesChange={setUploadedFiles}
          label="Drop your PDF here or click to browse"
          hint="Single PDF file only"
        />
      </div>

      {/* Quality slider — JPG only, shown when file is uploaded and not done */}
      {format === "jpg" && uploadedFiles.length > 0 && !done && (
        <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">
              Quality
            </Label>
            <span className="text-sm font-bold text-vault-blue">
              {quality}%
            </span>
          </div>
          <Slider
            min={50}
            max={100}
            step={5}
            value={[quality]}
            onValueChange={([v]) => setQuality(v)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-vault-muted">
            <span>Smaller file</span>
            <span>Best quality</span>
          </div>
        </div>
      )}

      {/* Progress */}
      {isProcessing && (
        <div
          data-ocid="pdf-converter.loading_state"
          className="rounded-xl border border-vault-border bg-vault-surface p-4 space-y-3"
        >
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Loader2 className="w-4 h-4 animate-spin text-vault-blue" />
            {progress}
          </div>
          {progressPct > 0 && (
            <div className="w-full bg-vault-hover rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-vault-blue rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Convert button */}
      {!done && (
        <Button
          data-ocid="pdf-converter.primary_button"
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
              {format === "excel" ? (
                <Table2 className="w-4 h-4" />
              ) : (
                <Image className="w-4 h-4" />
              )}
              {convertLabel}
            </>
          )}
        </Button>
      )}

      {/* Error */}
      {error && (
        <div
          data-ocid="pdf-converter.error_state"
          className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive"
        >
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Success */}
      {done && (
        <div
          data-ocid="pdf-converter.success_state"
          className="rounded-xl border border-border bg-card p-5 space-y-4"
        >
          <div className="flex items-center gap-2 text-green-500 font-semibold">
            <CheckCircle className="h-5 w-5" />
            Conversion complete!
          </div>

          <div className="rounded-lg bg-muted/40 p-3 flex items-center gap-3">
            {resultIcon}
            <span className="text-sm text-foreground truncate">
              {resultName}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              data-ocid="pdf-converter.save_button"
              onClick={handleDownload}
              className="flex-1 bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold gap-2"
              size="lg"
            >
              <Download className="w-4 h-4" />
              {downloadLabel}
            </Button>
            <Button
              data-ocid="pdf-converter.secondary_button"
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
