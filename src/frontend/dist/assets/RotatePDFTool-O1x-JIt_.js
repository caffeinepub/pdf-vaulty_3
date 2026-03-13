import { r as reactExports, j as jsxRuntimeExports, F as FileText, B as Button, g as ue } from "./index-B4iaYbj_.js";
import { e as ensurePdfLibLoaded, g as getPDFLib, d as downloadBytes } from "./pdfUtils-D5wj6PeM.js";
import { F as FileUploadZone } from "./FileUploadZone-C-9MCbou.js";
import { R as RotateCw } from "./rotate-cw--ZO9Tkf4.js";
import { D as Download } from "./download-DB2vi-_n.js";
import "./upload-TM74lQ_b.js";
const ROTATION_OPTIONS = [
  { label: "90° Clockwise", value: 90 },
  { label: "180°", value: 180 },
  { label: "270° Clockwise", value: 270 }
];
function RotatePDFTool() {
  const [files, setFiles] = reactExports.useState([]);
  const [rotation, setRotation] = reactExports.useState(90);
  const [pageCount, setPageCount] = reactExports.useState(null);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const handleFileChange = async (newFiles) => {
    setFiles(newFiles);
    setPageCount(null);
    if (newFiles.length > 0) {
      try {
        const ab = await newFiles[0].file.arrayBuffer();
        await ensurePdfLibLoaded();
        const { PDFDocument } = getPDFLib();
        const pdf = await PDFDocument.load(ab);
        setPageCount(pdf.getPageCount());
      } catch {
        ue.error("Could not read PDF.");
      }
    }
  };
  const handleRotate = async () => {
    if (files.length === 0) {
      ue.error("Please upload a PDF file.");
      return;
    }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();
      await ensurePdfLibLoaded();
      const { PDFDocument, degrees } = getPDFLib();
      const pdfDoc = await PDFDocument.load(ab);
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        const currentRotation = page.getRotation().angle;
        const newRotation = (currentRotation + rotation) % 360;
        page.setRotation(degrees(newRotation));
      }
      const rotatedBytes = await pdfDoc.save();
      downloadBytes(
        new Uint8Array(rotatedBytes),
        `rotated-${files[0].file.name}`
      );
      ue.success("PDF rotated successfully!");
    } catch (err) {
      ue.error("Failed to rotate PDF.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-5 h-5 text-orange-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Rotate PDF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted", children: "Rotate all pages by a chosen angle." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileUploadZone,
        {
          accept: "application/pdf",
          files,
          onFilesChange: handleFileChange,
          label: "Drop a PDF file here or click to browse",
          hint: "Single PDF file only"
        }
      ),
      pageCount !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 p-3 rounded-xl bg-vault-hover border border-vault-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-vault-amber" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground font-medium", children: [
          pageCount,
          " pages detected"
        ] })
      ] })
    ] }),
    files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Rotation Angle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ROTATION_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setRotation(opt.value),
          className: `flex-1 py-3 rounded-xl text-sm font-medium border transition-colors flex flex-col items-center gap-1 ${rotation === opt.value ? "bg-vault-amber text-vault-bg border-vault-amber" : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-amber/50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RotateCw,
              {
                className: `w-4 h-4 ${rotation === opt.value ? "" : "text-vault-muted"}`,
                style: { transform: `rotate(${opt.value}deg)` }
              }
            ),
            opt.label
          ]
        },
        opt.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleRotate,
        disabled: files.length === 0 || isProcessing,
        className: "w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" }),
          " ",
          "Rotating..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          " Rotate & Download"
        ] })
      }
    )
  ] });
}
export {
  RotatePDFTool as default
};
