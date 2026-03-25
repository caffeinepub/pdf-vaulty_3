import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, f as ue } from "./index-mB_N17VN.js";
import { u as usePdfWorker } from "./usePdfWorker-CSzdqP0o.js";
import { e as ensurePdfLibLoaded, g as getPDFLib, d as downloadBytes } from "./pdfUtils-D5wj6PeM.js";
import { F as FileUploadZone } from "./FileUploadZone-BcJ7y0L6.js";
import { D as Download } from "./download-C8tyKrmn.js";
import "./upload-BxoM4j9D.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m8 6 4-4 4 4", key: "ybng9g" }],
  ["path", { d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22", key: "1hyw0i" }],
  ["path", { d: "m20 22-5-5", key: "1m27yz" }]
];
const Merge = createLucideIcon("merge", __iconNode);
function MergePDFTool() {
  const [files, setFiles] = reactExports.useState([]);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const { processInWorker } = usePdfWorker();
  const handleMerge = async () => {
    if (files.length < 2) {
      ue.error("Please upload at least 2 PDF files to merge.");
      return;
    }
    setIsProcessing(true);
    try {
      const fileBuffers = await Promise.all(
        files.map(({ file }) => file.arrayBuffer())
      );
      let mergedBytes;
      try {
        mergedBytes = await processInWorker("merge", { fileBuffers });
      } catch {
        await ensurePdfLibLoaded();
        const { PDFDocument } = getPDFLib();
        const mergedPdf = await PDFDocument.create();
        for (const buffer of fileBuffers) {
          const pdf = await PDFDocument.load(buffer);
          const copiedPages = await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
          );
          for (const page of copiedPages) {
            mergedPdf.addPage(page);
          }
        }
        mergedBytes = new Uint8Array(await mergedPdf.save());
      }
      downloadBytes(mergedBytes, "merged.pdf");
      ue.success("PDFs merged successfully!");
    } catch (err) {
      ue.error(
        "Failed to merge PDFs. Please ensure all files are valid PDFs."
      );
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Merge, { className: "w-5 h-5 text-blue-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Merge PDF Files" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted", children: "Combine multiple PDFs into one. Drag to reorder." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileUploadZone,
        {
          accept: "application/pdf",
          multiple: true,
          files,
          onFilesChange: setFiles,
          label: "Drop PDF files here or click to browse",
          hint: "Supports multiple PDF files • Drag to reorder"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleMerge,
        disabled: files.length < 2 || isProcessing,
        className: "w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" }),
          " ",
          "Merging..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          " Merge & Download"
        ] })
      }
    )
  ] });
}
export {
  MergePDFTool as default
};
