import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle,
  Download,
  Hash,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import {
  downloadBytes,
  ensurePdfLibLoaded,
  getPDFLib,
} from "../../lib/pdfUtils";
import FileUploadZone from "../shared/FileUploadZone";

interface UploadedFile {
  file: File;
  id: string;
}

type Position = "bottom-center" | "bottom-right" | "bottom-left" | "top-center";
type FontSize = "small" | "medium" | "large";

const POSITION_LABELS: Record<Position, string> = {
  "bottom-center": "Bottom Center",
  "bottom-right": "Bottom Right",
  "bottom-left": "Bottom Left",
  "top-center": "Top Center",
};

const FONT_SIZE_MAP: Record<FontSize, number> = {
  small: 10,
  medium: 12,
  large: 14,
};

export default function AddPageNumbersTool() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startNumber, setStartNumber] = useState(1);
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);
  const [resultFileName, setResultFileName] = useState("");

  const handleProcess = async () => {
    if (uploadedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setDone(false);
    setResultBytes(null);

    try {
      const file = uploadedFiles[0].file;
      await ensurePdfLibLoaded();
      const PDFLib = getPDFLib();

      setProgress("Loading PDF…");
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
      });

      const pages = pdfDoc.getPages();
      const numPages = pages.length;
      const pt = FONT_SIZE_MAP[fontSize];
      const margin = 28;

      setProgress("Embedding font…");
      // Use standard font - embedFont via window global
      // Access PDFLib StandardFonts enum
      const helvetica = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

      for (let i = 0; i < numPages; i++) {
        setProgress(`Adding page number ${i + 1} of ${numPages}…`);
        const page = pages[i];
        const { width, height } = page.getSize();
        const pageNum = i + startNumber;
        const text = String(pageNum);

        // Approximate text width: each char ≈ 0.5 * fontSize points
        const textWidth = text.length * pt * 0.5;

        let x: number;
        let y: number;

        switch (position) {
          case "bottom-center":
            x = (width - textWidth) / 2;
            y = margin;
            break;
          case "bottom-right":
            x = width - textWidth - margin;
            y = margin;
            break;
          case "bottom-left":
            x = margin;
            y = margin;
            break;
          case "top-center":
            x = (width - textWidth) / 2;
            y = height - margin;
            break;
          default:
            x = (width - textWidth) / 2;
            y = margin;
        }

        page.drawText(text, {
          x,
          y,
          size: pt,
          font: helvetica,
          color: PDFLib.rgb(0.3, 0.3, 0.3),
        });
      }

      setProgress("Saving PDF…");
      const outputBytes = await pdfDoc.save();
      const outName = `${file.name.replace(/\.pdf$/i, "")}_numbered.pdf`;
      setResultBytes(outputBytes);
      setResultFileName(outName);
      setDone(true);
      setProgress("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to add page numbers. Please try again.";
      setError(msg);
      setProgress("");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBytes) return;
    downloadBytes(resultBytes, resultFileName);
  };

  const handleReset = () => {
    setUploadedFiles([]);
    setDone(false);
    setResultBytes(null);
    setResultFileName("");
    setError(null);
    setProgress("");
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center">
            <Hash className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Add Page Numbers</h2>
            <p className="text-sm text-vault-muted">
              Stamp page numbers onto every page of your PDF.
            </p>
          </div>
        </div>

        <FileUploadZone
          accept=".pdf,application/pdf"
          multiple={false}
          files={uploadedFiles}
          onFilesChange={setUploadedFiles}
          label="Drop your PDF here or click to browse"
          hint="Single PDF file only"
        />
      </div>

      {/* Options */}
      {uploadedFiles.length > 0 && !done && (
        <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border space-y-5">
          {/* Position */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Number Position
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(POSITION_LABELS) as Position[]).map((pos) => (
                <button
                  type="button"
                  key={pos}
                  data-ocid={`add-page-numbers.${pos}.toggle`}
                  onClick={() => setPosition(pos)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all text-left ${
                    position === pos
                      ? "bg-vault-blue text-white border-vault-blue"
                      : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"
                  }`}
                >
                  {POSITION_LABELS[pos]}
                </button>
              ))}
            </div>
          </div>

          {/* Starting number */}
          <div className="space-y-2">
            <Label
              htmlFor="start-number"
              className="text-sm font-medium text-foreground"
            >
              Starting Page Number
            </Label>
            <Input
              id="start-number"
              data-ocid="add-page-numbers.input"
              type="number"
              min={1}
              max={9999}
              value={startNumber}
              onChange={(e) =>
                setStartNumber(
                  Math.max(1, Number.parseInt(e.target.value, 10) || 1),
                )
              }
              className="bg-vault-hover border-vault-border text-foreground w-32"
            />
          </div>

          {/* Font size */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Font Size
            </Label>
            <div className="flex gap-2">
              {(["small", "medium", "large"] as FontSize[]).map((sz) => (
                <button
                  type="button"
                  key={sz}
                  data-ocid={`add-page-numbers.${sz}.toggle`}
                  onClick={() => setFontSize(sz)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all capitalize ${
                    fontSize === sz
                      ? "bg-vault-blue text-white border-vault-blue"
                      : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"
                  }`}
                >
                  {sz} ({FONT_SIZE_MAP[sz]}pt)
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress */}
      {isProcessing && (
        <div
          data-ocid="add-page-numbers.loading_state"
          className="flex items-center gap-2 p-4 rounded-xl bg-vault-surface border border-vault-border text-sm text-foreground"
        >
          <Loader2 className="w-4 h-4 animate-spin text-vault-blue shrink-0" />
          {progress}
        </div>
      )}

      {/* Process Button */}
      {!done && (
        <Button
          data-ocid="add-page-numbers.primary_button"
          onClick={handleProcess}
          disabled={uploadedFiles.length === 0 || isProcessing}
          className="w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {progress || "Processing…"}
            </>
          ) : (
            <>
              <Hash className="w-4 h-4" />
              Add Page Numbers
            </>
          )}
        </Button>
      )}

      {/* Error */}
      {error && (
        <div
          data-ocid="add-page-numbers.error_state"
          className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive"
        >
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Success */}
      {done && resultBytes && (
        <div
          data-ocid="add-page-numbers.success_state"
          className="rounded-xl border border-border bg-card p-5 space-y-4"
        >
          <div className="flex items-center gap-2 text-green-500 font-semibold">
            <CheckCircle className="h-5 w-5" />
            Page numbers added successfully!
          </div>

          <div className="rounded-lg bg-muted/40 p-3 flex items-center gap-3">
            <Hash className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-sm text-foreground truncate">
              {resultFileName}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              data-ocid="add-page-numbers.save_button"
              onClick={handleDownload}
              className="flex-1 bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold gap-2"
              size="lg"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button
              data-ocid="add-page-numbers.secondary_button"
              onClick={handleReset}
              variant="outline"
              className="border-vault-border text-vault-muted hover:text-foreground"
              size="lg"
            >
              Process Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
