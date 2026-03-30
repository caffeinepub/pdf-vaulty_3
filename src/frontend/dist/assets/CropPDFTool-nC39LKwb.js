import { r as reactExports, j as jsxRuntimeExports } from "./index-BJasp0fK.js";
import { u as usePdfWorker } from "./usePdfWorker-9l-VBcL7.js";
import { e as ensurePdfLibLoaded, g as getPDFLib } from "./pdfUtils-D5wj6PeM.js";
import { U as Upload } from "./upload-CVLwgPVY.js";
import { L as LoaderCircle } from "./loader-circle-ZOqPHYR5.js";
function CropPDFTool() {
  const [file, setFile] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [margins, setMargins] = reactExports.useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });
  const fileInputRef = reactExports.useRef(null);
  const { processInWorker } = usePdfWorker();
  const handleDrop = reactExports.useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if ((dropped == null ? void 0 : dropped.type) === "application/pdf") setFile(dropped);
  }, []);
  const handleFileChange = (e) => {
    var _a;
    const f = (_a = e.target.files) == null ? void 0 : _a[0];
    if (f) setFile(f);
  };
  const handleCrop = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const fileBuffer = await file.arrayBuffer();
      let out;
      try {
        out = await processInWorker("crop", { fileBuffer, margins });
      } catch {
        await ensurePdfLibLoaded();
        const { PDFDocument } = getPDFLib();
        const bytes = new Uint8Array(fileBuffer);
        const pdfDoc = await PDFDocument.load(bytes);
        const pages = pdfDoc.getPages();
        const mmToPt = (mm) => mm * 2.83465;
        for (const page of pages) {
          const { width, height } = page.getSize();
          const top = mmToPt(margins.top);
          const right = mmToPt(margins.right);
          const bottom = mmToPt(margins.bottom);
          const left = mmToPt(margins.left);
          const newX = left;
          const newY = bottom;
          const newWidth = Math.max(1, width - left - right);
          const newHeight = Math.max(1, height - top - bottom);
          const p = page;
          if (typeof p.setMediaBox === "function")
            p.setMediaBox(newX, newY, newWidth, newHeight);
          if (typeof p.setCropBox === "function")
            p.setCropBox(newX, newY, newWidth, newHeight);
        }
        out = new Uint8Array(await pdfDoc.save());
      }
      const blob = new Blob([out.buffer], {
        type: "application/pdf"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_cropped.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  const MarginInput = ({
    label,
    field
  }) => {
    const id = `crop-margin-${field}`;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          htmlFor: id,
          className: "text-xs font-medium text-gray-500 dark:text-white/50",
          children: [
            label,
            " (mm)"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id,
          type: "number",
          min: "0",
          max: "200",
          value: margins[field],
          onChange: (e) => setMargins((prev) => ({ ...prev, [field]: Number(e.target.value) })),
          "data-ocid": `crop.${field}.input`,
          className: "w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onDrop: handleDrop,
        onClick: () => {
          var _a;
          return (_a = fileInputRef.current) == null ? void 0 : _a.click();
        },
        "data-ocid": "crop.dropzone",
        className: `relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors ${isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-gray-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-[#111]"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: ".pdf,application/pdf",
              className: "hidden",
              onChange: handleFileChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }) }),
          file ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: file.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 dark:text-white/40 mt-1", children: [
              (file.size / 1024).toFixed(1),
              " KB · Click to replace"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-700 dark:text-white/80", children: "Drop your PDF here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 dark:text-white/40 mt-1", children: "or click to browse" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MarginInput, { label: "Top", field: "top" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MarginInput, { label: "Right", field: "right" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MarginInput, { label: "Bottom", field: "bottom" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MarginInput, { label: "Left", field: "left" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleCrop,
        disabled: !file || isProcessing,
        "data-ocid": "crop.submit_button",
        className: "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          " Processing..."
        ] }) : "Crop & Download PDF"
      }
    )
  ] });
}
export {
  CropPDFTool as default
};
