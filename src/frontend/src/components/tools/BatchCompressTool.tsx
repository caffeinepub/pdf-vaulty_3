import FileUploadZone from "@/components/shared/FileUploadZone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ensureJSZipLoaded,
  ensurePdfLibLoaded,
  ensurePdfjsLoaded,
  formatBytes,
  getPDFLib,
} from "@/lib/pdfUtils";
import {
  AlertCircle,
  Archive,
  CheckCircle,
  Clock,
  Loader2,
  Package,
} from "lucide-react";
import { useState } from "react";

interface UploadedFile {
  file: File;
  id: string;
}

type FileStatus = "pending" | "processing" | "done" | "error";

interface FileResult {
  id: string;
  fileName: string;
  originalSize: number;
  compressedSize?: number;
  compressedBytes?: Uint8Array;
  status: FileStatus;
  errorMsg?: string;
}

async function compressSinglePDF(file: File): Promise<Uint8Array> {
  await ensurePdfLibLoaded();
  await ensurePdfjsLoaded();

  const PDFLib = getPDFLib();
  const pdfjsLib = window.pdfjsLib as PdfjsLib;

  const scale = 0.85;
  const jpegQuality = 0.7;

  const originalBytes = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjsLib.getDocument({ data: originalBytes.slice() });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;

  const newPdf = await PDFLib.PDFDocument.create();

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvasWidth = Math.floor(viewport.width);
    const canvasHeight = Math.floor(viewport.height);
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");
    await page.render({ canvasContext: ctx, viewport }).promise;
    const jpegDataUrl = canvas.toDataURL("image/jpeg", jpegQuality);
    const base64Data = jpegDataUrl.split(",")[1];
    const jpegBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    const jpegImage = await newPdf.embedJpg(jpegBytes);
    const newPage = newPdf.addPage([canvasWidth, canvasHeight]);
    newPage.drawImage(jpegImage, {
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
    });
  }

  newPdf.setTitle("");
  newPdf.setAuthor("");
  newPdf.setSubject("");
  newPdf.setKeywords([]);
  newPdf.setCreator("");
  newPdf.setProducer("");

  return newPdf.save({ useObjectStreams: true });
}

export default function BatchCompressTool() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [results, setResults] = useState<FileResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allDone, setAllDone] = useState(false);

  const handleFilesChange = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    setResults([]);
    setAllDone(false);
    setError(null);
  };

  const handleCompressAll = async () => {
    if (uploadedFiles.length === 0) return;

    setIsRunning(true);
    setAllDone(false);
    setError(null);

    // Initialize results as pending
    const initialResults: FileResult[] = uploadedFiles.map((uf) => ({
      id: uf.id,
      fileName: `${uf.file.name.replace(/\.pdf$/i, "")}_compressed.pdf`,
      originalSize: uf.file.size,
      status: "pending",
    }));
    setResults(initialResults);

    const updatedResults = [...initialResults];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const uf = uploadedFiles[i];

      // Set to processing
      updatedResults[i] = { ...updatedResults[i], status: "processing" };
      setResults([...updatedResults]);

      try {
        const compressedBytes = await compressSinglePDF(uf.file);
        updatedResults[i] = {
          ...updatedResults[i],
          status: "done",
          compressedBytes,
          compressedSize: compressedBytes.length,
        };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Compression failed";
        updatedResults[i] = {
          ...updatedResults[i],
          status: "error",
          errorMsg: msg,
        };
      }

      setResults([...updatedResults]);
    }

    setIsRunning(false);
    setAllDone(true);
  };

  const handleDownloadZip = async () => {
    const doneResults = results.filter(
      (r) => r.status === "done" && r.compressedBytes,
    );
    if (doneResults.length === 0) return;

    try {
      await ensureJSZipLoaded();
      const zip = new window.JSZip();

      for (const result of doneResults) {
        if (result.compressedBytes) {
          zip.file(result.fileName, result.compressedBytes);
        }
      }

      const blob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "compressed_pdfs.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create ZIP.";
      setError(msg);
    }
  };

  const doneCount = results.filter((r) => r.status === "done").length;
  const errorCount = results.filter((r) => r.status === "error").length;
  const progressPercent =
    results.length > 0
      ? Math.round(
          (results.filter((r) => r.status !== "pending").length /
            results.length) *
            100,
        )
      : 0;

  return (
    <div className="space-y-6">
      <FileUploadZone
        accept=".pdf"
        multiple={true}
        maxFiles={10}
        files={uploadedFiles}
        onFilesChange={handleFilesChange}
        label="Drop up to 10 PDF files here or click to browse"
        hint="Supports multiple PDF files (max 10)"
      />

      {uploadedFiles.length > 0 && results.length === 0 && (
        <Button
          onClick={handleCompressAll}
          disabled={isRunning}
          className="w-full"
          size="lg"
          data-ocid="batch_compress.primary_button"
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Compressing...
            </>
          ) : (
            <>
              <Package className="mr-2 h-4 w-4" />
              Compress All ({uploadedFiles.length}{" "}
              {uploadedFiles.length === 1 ? "file" : "files"})
            </>
          )}
        </Button>
      )}

      {error && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive"
          data-ocid="batch_compress.error_state"
        >
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          {/* Progress bar while running */}
          {isRunning && (
            <div className="space-y-2" data-ocid="batch_compress.loading_state">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Compressing files...</span>
                <span>{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          )}

          {/* File list */}
          <div className="space-y-2" data-ocid="batch_compress.list">
            {results.map((result, idx) => (
              <div
                key={result.id}
                data-ocid={`batch_compress.item.${idx + 1}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/50"
              >
                {/* Status icon */}
                <div className="shrink-0">
                  {result.status === "pending" && (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                  {result.status === "processing" && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                  {result.status === "done" && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {result.status === "error" && (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {uploadedFiles[idx]?.file.name ?? result.fileName}
                  </p>
                  {result.status === "done" &&
                    result.compressedSize !== undefined && (
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(result.originalSize)} →{" "}
                        <span className="text-green-500 font-medium">
                          {formatBytes(result.compressedSize)}
                        </span>{" "}
                        <span className="text-muted-foreground">
                          (
                          {result.compressedSize < result.originalSize
                            ? `-${Math.round(
                                ((result.originalSize - result.compressedSize) /
                                  result.originalSize) *
                                  100,
                              )}%`
                            : "no reduction"}
                          )
                        </span>
                      </p>
                    )}
                  {result.status === "error" && (
                    <p className="text-xs text-destructive">
                      {result.errorMsg}
                    </p>
                  )}
                  {(result.status === "pending" ||
                    result.status === "processing") && (
                    <p className="text-xs text-muted-foreground">
                      {result.status === "processing"
                        ? "Compressing..."
                        : "Waiting..."}
                    </p>
                  )}
                </div>

                {/* Size badge */}
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatBytes(result.originalSize)}
                </span>
              </div>
            ))}
          </div>

          {/* Summary + Download ZIP */}
          {allDone && (
            <div
              className="space-y-3 pt-2"
              data-ocid="batch_compress.success_state"
            >
              <div className="flex items-center gap-2 text-sm">
                {errorCount === 0 ? (
                  <span className="flex items-center gap-1.5 text-green-500 font-semibold">
                    <CheckCircle className="h-4 w-4" />
                    All {doneCount} files compressed successfully!
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
                    <AlertCircle className="h-4 w-4" />
                    {doneCount} compressed, {errorCount} failed
                  </span>
                )}
              </div>

              {doneCount > 0 && (
                <Button
                  onClick={handleDownloadZip}
                  className="w-full gap-2"
                  size="lg"
                  data-ocid="batch_compress.download_button"
                >
                  <Archive className="h-4 w-4" />
                  Download All as ZIP ({doneCount}{" "}
                  {doneCount === 1 ? "file" : "files"})
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => {
                  setUploadedFiles([]);
                  setResults([]);
                  setAllDone(false);
                  setError(null);
                }}
                className="w-full"
                size="sm"
                data-ocid="batch_compress.secondary_button"
              >
                Compress more files
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
