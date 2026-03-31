import { r as reactExports, j as jsxRuntimeExports } from "./index-CV4MT_Ao.js";
import { u as usePdfWorker } from "./usePdfWorker-29_Z_OKy.js";
import { e as ensurePdfLibLoaded, g as getPDFLib } from "./pdfUtils-D5wj6PeM.js";
import { U as Upload } from "./upload-Dzl-U34T.js";
import { F as FileCheck } from "./file-check-hx6DXFTH.js";
import { L as LoaderCircle } from "./loader-circle-Cs_py_2K.js";
function FlattenPDFTool() {
  const [file, setFile] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
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
  const handleFlatten = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const fileBuffer = await file.arrayBuffer();
      let out;
      try {
        out = await processInWorker("flatten", { fileBuffer });
      } catch {
        await ensurePdfLibLoaded();
        const { PDFDocument } = getPDFLib();
        const bytes = new Uint8Array(fileBuffer);
        const pdfDoc = await PDFDocument.load(
          bytes,
          { ignoreEncryption: true }
        );
        const doc = pdfDoc;
        if (typeof doc.getForm === "function") {
          const form = doc.getForm();
          const fields = form.getFields();
          for (const field of fields) {
            field.enableReadOnly();
          }
          form.flatten();
        }
        out = new Uint8Array(await pdfDoc.save());
      }
      const blob = new Blob([out.buffer], {
        type: "application/pdf"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_flattened.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
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
        "data-ocid": "flatten.dropzone",
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-700 dark:text-blue-300 leading-relaxed", children: "Flattening converts all interactive form fields (text boxes, checkboxes, dropdowns) into static, non-editable content. The visual appearance is preserved." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleFlatten,
        disabled: !file || isProcessing,
        "data-ocid": "flatten.submit_button",
        className: "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          " Processing..."
        ] }) : "Flatten PDF Forms"
      }
    )
  ] });
}
export {
  FlattenPDFTool as default
};
