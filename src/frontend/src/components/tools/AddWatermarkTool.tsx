import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle,
  Download,
  Loader2,
  Stamp,
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

type Opacity = "low" | "medium" | "high";
type WatermarkPosition = "diagonal" | "center" | "top";
type WatermarkColor = "gray" | "red" | "blue";

const OPACITY_MAP: Record<Opacity, number> = {
  low: 0.15,
  medium: 0.3,
  high: 0.5,
};

const COLOR_MAP: Record<WatermarkColor, [number, number, number]> = {
  gray: [0.5, 0.5, 0.5],
  red: [0.8, 0.1, 0.1],
  blue: [0.1, 0.25, 0.75],
};

const COLOR_LABELS: Record<WatermarkColor, string> = {
  gray: "Gray",
  red: "Red",
  blue: "Blue",
};

const POSITION_LABELS: Record<WatermarkPosition, string> = {
  diagonal: "Diagonal Center",
  center: "Centered Horizontal",
  top: "Top",
};

export default function AddWatermarkTool() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [watermarkText, setWatermarkText] = useState("");
  const [opacity, setOpacity] = useState<Opacity>("medium");
  const [position, setPosition] = useState<WatermarkPosition>("diagonal");
  const [color, setColor] = useState<WatermarkColor>("gray");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);
  const [resultFileName, setResultFileName] = useState("");

  const handleProcess = async () => {
    if (uploadedFiles.length === 0) return;
    const text = watermarkText.trim() || "CONFIDENTIAL";

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

      setProgress("Embedding font…");
      const helveticaFont = await pdfDoc.embedFont(
        PDFLib.StandardFonts.Helvetica,
      );

      const pages = pdfDoc.getPages();
      const numPages = pages.length;
      const [r, g, b] = COLOR_MAP[color];
      const opacityVal = OPACITY_MAP[opacity];

      for (let i = 0; i < numPages; i++) {
        setProgress(`Watermarking page ${i + 1} of ${numPages}…`);
        const page = pages[i];
        const { width, height } = page.getSize();

        let fontSize: number;
        let angle: number;
        let x: number;
        let y: number;

        // Estimate text width (approximate)
        const approxCharWidth = 0.55; // fraction of fontSize

        switch (position) {
          case "diagonal": {
            fontSize = 60;
            angle = 45;
            const textWidth = text.length * fontSize * approxCharWidth;
            // Center the text diagonally
            x = (width - textWidth * Math.cos((45 * Math.PI) / 180)) / 2;
            y = (height - textWidth * Math.sin((45 * Math.PI) / 180)) / 2;
            break;
          }
          case "center": {
            fontSize = 48;
            angle = 0;
            const textWidth = text.length * fontSize * approxCharWidth;
            x = (width - textWidth) / 2;
            y = height / 2;
            break;
          }
          case "top": {
            fontSize = 48;
            angle = 0;
            const textWidth = text.length * fontSize * approxCharWidth;
            x = (width - textWidth) / 2;
            y = height - 80;
            break;
          }
          default: {
            fontSize = 60;
            angle = 45;
            x = width / 4;
            y = height / 4;
          }
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font: helveticaFont,
          color: PDFLib.rgb(r, g, b),
          rotate: PDFLib.degrees(angle),
          opacity: opacityVal,
        });
      }

      setProgress("Saving PDF…");
      const outputBytes = await pdfDoc.save();
      const outName = `${file.name.replace(/\.pdf$/i, "")}_watermarked.pdf`;
      setResultBytes(outputBytes);
      setResultFileName(outName);
      setDone(true);
      setProgress("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to add watermark. Please try again.";
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
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
            <Stamp className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Add Watermark</h2>
            <p className="text-sm text-vault-muted">
              Overlay custom watermark text on every page of your PDF.
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
          {/* Watermark text */}
          <div className="space-y-2">
            <Label
              htmlFor="watermark-text"
              className="text-sm font-medium text-foreground"
            >
              Watermark Text
            </Label>
            <Input
              id="watermark-text"
              data-ocid="add-watermark.input"
              type="text"
              placeholder="CONFIDENTIAL"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              maxLength={40}
              className="bg-vault-hover border-vault-border text-foreground"
            />
            <p className="text-xs text-vault-muted">
              Leave empty to use "CONFIDENTIAL"
            </p>
          </div>

          {/* Position */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Position
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(Object.keys(POSITION_LABELS) as WatermarkPosition[]).map(
                (pos) => (
                  <button
                    type="button"
                    key={pos}
                    data-ocid={`add-watermark.${pos}.toggle`}
                    onClick={() => setPosition(pos)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
                      position === pos
                        ? "bg-vault-blue text-white border-vault-blue"
                        : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"
                    }`}
                  >
                    {POSITION_LABELS[pos]}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Opacity */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Opacity
            </Label>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as Opacity[]).map((op) => (
                <button
                  type="button"
                  key={op}
                  data-ocid={`add-watermark.${op}.toggle`}
                  onClick={() => setOpacity(op)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all capitalize ${
                    opacity === op
                      ? "bg-vault-blue text-white border-vault-blue"
                      : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"
                  }`}
                >
                  {op} ({Math.round(OPACITY_MAP[op] * 100)}%)
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Color</Label>
            <div className="flex gap-2">
              {(["gray", "red", "blue"] as WatermarkColor[]).map((c) => (
                <button
                  type="button"
                  key={c}
                  data-ocid={`add-watermark.${c}.toggle`}
                  onClick={() => setColor(c)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                    color === c
                      ? "bg-vault-blue text-white border-vault-blue"
                      : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <span
                      className="inline-block w-3 h-3 rounded-full border border-current/30"
                      style={{
                        backgroundColor:
                          c === "gray"
                            ? "rgb(128,128,128)"
                            : c === "red"
                              ? "rgb(204,26,26)"
                              : "rgb(26,64,191)",
                      }}
                    />
                    {COLOR_LABELS[c]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress */}
      {isProcessing && (
        <div
          data-ocid="add-watermark.loading_state"
          className="flex items-center gap-2 p-4 rounded-xl bg-vault-surface border border-vault-border text-sm text-foreground"
        >
          <Loader2 className="w-4 h-4 animate-spin text-vault-blue shrink-0" />
          {progress}
        </div>
      )}

      {/* Process Button */}
      {!done && (
        <Button
          data-ocid="add-watermark.primary_button"
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
              <Stamp className="w-4 h-4" />
              Add Watermark
            </>
          )}
        </Button>
      )}

      {/* Error */}
      {error && (
        <div
          data-ocid="add-watermark.error_state"
          className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive"
        >
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Success */}
      {done && resultBytes && (
        <div
          data-ocid="add-watermark.success_state"
          className="rounded-xl border border-border bg-card p-5 space-y-4"
        >
          <div className="flex items-center gap-2 text-green-500 font-semibold">
            <CheckCircle className="h-5 w-5" />
            Watermark added successfully!
          </div>

          <div className="rounded-lg bg-muted/40 p-3 flex items-center gap-3">
            <Stamp className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-sm text-foreground truncate">
              {resultFileName}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              data-ocid="add-watermark.save_button"
              onClick={handleDownload}
              className="flex-1 bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold gap-2"
              size="lg"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button
              data-ocid="add-watermark.secondary_button"
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
