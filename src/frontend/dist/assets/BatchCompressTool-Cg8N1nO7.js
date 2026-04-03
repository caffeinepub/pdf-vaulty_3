import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as createContextScope, P as Primitive, t as cn, B as Button } from "./index-IHpCzH5x.js";
import { F as FileUploadZone } from "./FileUploadZone-Ccoo04hN.js";
import { f as formatBytes, k as ensureJSZipLoaded, e as ensurePdfLibLoaded, a as ensurePdfjsLoaded, g as getPDFLib } from "./pdfUtils-D5wj6PeM.js";
import { L as LoaderCircle } from "./loader-circle-CfULriSo.js";
import { P as Package, C as Clock } from "./package-ownyDvuz.js";
import { C as CircleAlert } from "./circle-alert-hVkTVtCE.js";
import { C as CircleCheckBig } from "./circle-check-big-CmYIaIm-.js";
import "./upload-DhY97ycc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
];
const Archive = createLucideIcon("archive", __iconNode);
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
async function compressSinglePDF(file) {
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
  return newPdf.save({ useObjectStreams: true });
}
function BatchCompressTool() {
  const [uploadedFiles, setUploadedFiles] = reactExports.useState([]);
  const [results, setResults] = reactExports.useState([]);
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [allDone, setAllDone] = reactExports.useState(false);
  const handleFilesChange = (files) => {
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
    const initialResults = uploadedFiles.map((uf) => ({
      id: uf.id,
      fileName: `${uf.file.name.replace(/\.pdf$/i, "")}_compressed.pdf`,
      originalSize: uf.file.size,
      status: "pending"
    }));
    setResults(initialResults);
    const updatedResults = [...initialResults];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const uf = uploadedFiles[i];
      updatedResults[i] = { ...updatedResults[i], status: "processing" };
      setResults([...updatedResults]);
      try {
        const compressedBytes = await compressSinglePDF(uf.file);
        updatedResults[i] = {
          ...updatedResults[i],
          status: "done",
          compressedBytes,
          compressedSize: compressedBytes.length
        };
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Compression failed";
        updatedResults[i] = {
          ...updatedResults[i],
          status: "error",
          errorMsg: msg
        };
      }
      setResults([...updatedResults]);
    }
    setIsRunning(false);
    setAllDone(true);
  };
  const handleDownloadZip = async () => {
    const doneResults = results.filter(
      (r) => r.status === "done" && r.compressedBytes
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
        compressionOptions: { level: 6 }
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "compressed_pdfs.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create ZIP.";
      setError(msg);
    }
  };
  const doneCount = results.filter((r) => r.status === "done").length;
  const errorCount = results.filter((r) => r.status === "error").length;
  const progressPercent = results.length > 0 ? Math.round(
    results.filter((r) => r.status !== "pending").length / results.length * 100
  ) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FileUploadZone,
      {
        accept: ".pdf",
        multiple: true,
        maxFiles: 10,
        files: uploadedFiles,
        onFilesChange: handleFilesChange,
        label: "Drop up to 10 PDF files here or click to browse",
        hint: "Supports multiple PDF files (max 10)"
      }
    ),
    uploadedFiles.length > 0 && results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleCompressAll,
        disabled: isRunning,
        className: "w-full",
        size: "lg",
        "data-ocid": "batch_compress.primary_button",
        children: isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Compressing..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mr-2 h-4 w-4" }),
          "Compress All (",
          uploadedFiles.length,
          " ",
          uploadedFiles.length === 1 ? "file" : "files",
          ")"
        ] })
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive",
        "data-ocid": "batch_compress.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: error })
        ]
      }
    ),
    results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 space-y-4", children: [
      isRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "batch_compress.loading_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Compressing files..." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            progressPercent,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progressPercent, className: "h-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "batch_compress.list", children: results.map((result, idx) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `batch_compress.item.${idx + 1}`,
            className: "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0", children: [
                result.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
                result.status === "processing" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
                result.status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-500" }),
                result.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-destructive" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: ((_a = uploadedFiles[idx]) == null ? void 0 : _a.file.name) ?? result.fileName }),
                result.status === "done" && result.compressedSize !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  formatBytes(result.originalSize),
                  " →",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500 font-medium", children: formatBytes(result.compressedSize) }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "(",
                    result.compressedSize < result.originalSize ? `-${Math.round(
                      (result.originalSize - result.compressedSize) / result.originalSize * 100
                    )}%` : "no reduction",
                    ")"
                  ] })
                ] }),
                result.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: result.errorMsg }),
                (result.status === "pending" || result.status === "processing") && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: result.status === "processing" ? "Compressing..." : "Waiting..." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs text-muted-foreground", children: formatBytes(result.originalSize) })
            ]
          },
          result.id
        );
      }) }),
      allDone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "space-y-3 pt-2",
          "data-ocid": "batch_compress.success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-sm", children: errorCount === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-green-500 font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }),
              "All ",
              doneCount,
              " files compressed successfully!"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-amber-500 font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
              doneCount,
              " compressed, ",
              errorCount,
              " failed"
            ] }) }),
            doneCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleDownloadZip,
                className: "w-full gap-2",
                size: "lg",
                "data-ocid": "batch_compress.download_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-4 w-4" }),
                  "Download All as ZIP (",
                  doneCount,
                  " ",
                  doneCount === 1 ? "file" : "files",
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setUploadedFiles([]);
                  setResults([]);
                  setAllDone(false);
                  setError(null);
                },
                className: "w-full",
                size: "sm",
                "data-ocid": "batch_compress.secondary_button",
                children: "Compress more files"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  BatchCompressTool as default
};
