import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  AlertCircle,
  CheckCircle,
  Download,
  Image,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import {
  downloadBlob,
  ensureJSZipLoaded,
  ensurePdfjsLoaded,
} from "../../lib/pdfUtils";
import FileUploadZone from "../shared/FileUploadZone";

interface UploadedFile {
  file: File;
  id: string;
}

type ImageFormat = "jpeg" | "png";

export default function PDFToImageTool() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [format, setFormat] = useState<ImageFormat>("jpeg");
  const [quality, setQuality] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [progressPct, setProgressPct] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [resultBlobs, setResultBlobs] = useState<
    { name: string; blob: Blob }[]
  >([]);
  const [resultZipBlob, setResultZipBlob] = useState<Blob | null>(null);
  const [resultZipName, setResultZipName] = useState("");

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setDone(false);
    setResultBlobs([]);
    setResultZipBlob(null);
    setProgressPct(0);

    try {
      const file = uploadedFiles[0].file;
      await ensurePdfjsLoaded();
      await ensureJSZipLoaded();
      const pdfjsLib = window.pdfjsLib as PdfjsLib;

      setProgress("Loading PDF…");
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const loadingTask = pdfjsLib.getDocument({ data: bytes.slice() });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;

      const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
      const ext = format === "jpeg" ? "jpg" : "png";
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
            format === "jpeg" ? qualityDecimal : undefined,
          );
        });

        const pageName =
          numPages === 1 ? `${baseName}.${ext}` : `page-${i}.${ext}`;
        pageBlobs.push({ name: pageName, blob });
      }

      setProgressPct(100);

      if (numPages === 1) {
        setResultBlobs(pageBlobs);
        setDone(true);
        setProgress("");
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
        setDone(true);
        setProgress("");
      }
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

  const handleDownloadSingle = () => {
    if (resultBlobs.length === 1) {
      downloadBlob(resultBlobs[0].blob, resultBlobs[0].name);
    }
  };

  const handleDownloadZip = () => {
    if (resultZipBlob) {
      downloadBlob(resultZipBlob, resultZipName);
    }
  };

  const handleReset = () => {
    setUploadedFiles([]);
    setDone(false);
    setResultBlobs([]);
    setResultZipBlob(null);
    setResultZipName("");
    setError(null);
    setProgress("");
    setProgressPct(0);
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="p-5 rounded-2xl bg-vault-surface border border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-violet-400/10 flex items-center justify-center">
            <Image className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">PDF to Image</h2>
            <p className="text-sm text-vault-muted">
              Export every PDF page as a high-quality image file.
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
          {/* Format selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Output Format
            </Label>
            <div className="flex gap-3">
              {(["jpeg", "png"] as ImageFormat[]).map((fmt) => (
                <button
                  type="button"
                  key={fmt}
                  data-ocid={`pdf-to-image.${fmt === "jpeg" ? "toggle" : "secondary_button"}`}
                  onClick={() => setFormat(fmt)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    format === fmt
                      ? "bg-vault-blue text-white border-vault-blue"
                      : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Quality slider (JPEG only) */}
          {format === "jpeg" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-foreground">
                  Quality
                </Label>
                <span className="text-sm font-bold text-vault-blue">
                  {quality}%
                </span>
              </div>
              <Slider
                data-ocid="pdf-to-image.toggle"
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
        </div>
      )}

      {/* Progress */}
      {isProcessing && (
        <div
          data-ocid="pdf-to-image.loading_state"
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

      {/* Convert Button */}
      {!done && (
        <Button
          data-ocid="pdf-to-image.primary_button"
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
              <Image className="w-4 h-4" />
              Convert to {format.toUpperCase()}
            </>
          )}
        </Button>
      )}

      {/* Error */}
      {error && (
        <div
          data-ocid="pdf-to-image.error_state"
          className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive"
        >
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Success */}
      {done && (
        <div
          data-ocid="pdf-to-image.success_state"
          className="rounded-xl border border-border bg-card p-5 space-y-4"
        >
          <div className="flex items-center gap-2 text-green-500 font-semibold">
            <CheckCircle className="h-5 w-5" />
            Conversion complete!
          </div>

          <div className="rounded-lg bg-muted/40 p-3 flex items-center gap-3">
            <Image className="w-4 h-4 text-violet-400 shrink-0" />
            <span className="text-sm text-foreground truncate">
              {resultZipBlob ? resultZipName : resultBlobs[0]?.name}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              data-ocid="pdf-to-image.save_button"
              onClick={resultZipBlob ? handleDownloadZip : handleDownloadSingle}
              className="flex-1 bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold gap-2"
              size="lg"
            >
              <Download className="w-4 h-4" />
              {resultZipBlob
                ? "Download ZIP"
                : `Download ${format.toUpperCase()}`}
            </Button>
            <Button
              data-ocid="pdf-to-image.secondary_button"
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
