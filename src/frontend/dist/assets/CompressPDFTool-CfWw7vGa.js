import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-B4iaYbj_.js";
import { F as FileUploadZone } from "./FileUploadZone-C-9MCbou.js";
import { f as formatBytes, e as ensurePdfLibLoaded, a as ensurePdfjsLoaded, g as getPDFLib } from "./pdfUtils-D5wj6PeM.js";
import { L as LoaderCircle } from "./loader-circle-Ctv80KCo.js";
import { C as CircleAlert } from "./circle-alert-Cwl8jZkJ.js";
import { C as CircleCheckBig } from "./circle-check-big-CRdrdBay.js";
import { D as Download } from "./download-DB2vi-_n.js";
import "./upload-TM74lQ_b.js";
async function compressPDFCanvas(file) {
  await ensurePdfLibLoaded();
  await ensurePdfjsLoaded();
  const PDFLib = getPDFLib();
  const pdfjsLib = window.pdfjsLib;
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
      height: canvasHeight
    });
  }
  newPdf.setTitle("");
  newPdf.setAuthor("");
  newPdf.setSubject("");
  newPdf.setKeywords([]);
  newPdf.setCreator("");
  newPdf.setProducer("");
  const compressedBytes = await newPdf.save({ useObjectStreams: true });
  return {
    originalSize: originalBytes.length,
    compressedSize: compressedBytes.length,
    compressedBytes,
    fileName: `${file.name.replace(/\.pdf$/i, "")}_compressed.pdf`
  };
}
function CompressPDFTool() {
  const [uploadedFiles, setUploadedFiles] = reactExports.useState([]);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [progress, setProgress] = reactExports.useState("");
  const handleCompress = async () => {
    if (uploadedFiles.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress("Rendering pages and compressing...");
    try {
      const res = await compressPDFCanvas(uploadedFiles[0].file);
      setResult(res);
      setProgress("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Compression failed";
      setError(msg);
      setProgress("");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.compressedBytes.buffer], {
      type: "application/pdf"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };
  const percentSaved = result && result.originalSize > 0 ? Math.round(
    (result.originalSize - result.compressedSize) / result.originalSize * 100
  ) : 0;
  const couldNotReduce = result !== null && result.compressedSize >= result.originalSize;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FileUploadZone,
      {
        accept: ".pdf",
        multiple: false,
        files: uploadedFiles,
        onFilesChange: setUploadedFiles,
        label: "Drop your PDF here or click to browse",
        hint: "Supports PDF files"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleCompress,
        disabled: uploadedFiles.length === 0 || isProcessing,
        className: "w-full",
        size: "lg",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          progress || "Compressing..."
        ] }) : "Compress PDF"
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: error })
    ] }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-500 font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5" }),
          "Compression complete!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30", children: "Standard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Original" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: formatBytes(result.originalSize) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Saved" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-bold text-lg ${percentSaved > 0 ? "text-green-500" : "text-muted-foreground"}`,
              children: percentSaved > 0 ? `${percentSaved}%` : "0%"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Compressed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: formatBytes(result.compressedSize) })
        ] })
      ] }),
      couldNotReduce && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
        "The file could not be reduced further. The PDF may already be optimized."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleDownload, className: "w-full", size: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
        "Download Compressed PDF"
      ] })
    ] })
  ] });
}
export {
  CompressPDFTool as default
};
