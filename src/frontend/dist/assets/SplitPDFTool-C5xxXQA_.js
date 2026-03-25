import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, F as FileText, L as Label, I as Input, B as Button, f as ue } from "./index-mB_N17VN.js";
import { e as ensurePdfLibLoaded, g as getPDFLib, d as downloadBytes } from "./pdfUtils-D5wj6PeM.js";
import { F as FileUploadZone } from "./FileUploadZone-BcJ7y0L6.js";
import { C as CircleAlert } from "./circle-alert-C8u3JRau.js";
import { D as Download } from "./download-C8tyKrmn.js";
import "./upload-BxoM4j9D.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
];
const Scissors = createLucideIcon("scissors", __iconNode);
function SplitPDFTool() {
  const [files, setFiles] = reactExports.useState([]);
  const [pageCount, setPageCount] = reactExports.useState(null);
  const [splitMode, setSplitMode] = reactExports.useState("all");
  const [rangeStart, setRangeStart] = reactExports.useState("1");
  const [rangeEnd, setRangeEnd] = reactExports.useState("1");
  const [specificPages, setSpecificPages] = reactExports.useState("");
  const [specificPagesError, setSpecificPagesError] = reactExports.useState("");
  const [pagesPerChunk, setPagesPerChunk] = reactExports.useState("1");
  const [pagesPerChunkError, setPagesPerChunkError] = reactExports.useState("");
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const handleFileChange = async (newFiles) => {
    setFiles(newFiles);
    setPageCount(null);
    setSpecificPagesError("");
    setPagesPerChunkError("");
    if (newFiles.length > 0) {
      try {
        const ab = await newFiles[0].file.arrayBuffer();
        await ensurePdfLibLoaded();
        const { PDFDocument } = getPDFLib();
        const pdf = await PDFDocument.load(ab);
        const count = pdf.getPageCount();
        setPageCount(count);
        setRangeEnd(String(count));
      } catch {
        ue.error(
          "Could not read PDF. Please ensure it is a valid PDF file."
        );
      }
    }
  };
  const parseSpecificPages = () => {
    if (!specificPages.trim()) {
      setSpecificPagesError("Please enter at least one page number.");
      return null;
    }
    const parts = specificPages.split(",").map((s) => s.trim()).filter(Boolean);
    const nums = [];
    for (const part of parts) {
      const n = Number.parseInt(part, 10);
      if (Number.isNaN(n) || String(n) !== part) {
        setSpecificPagesError(`"${part}" is not a valid page number.`);
        return null;
      }
      if (n < 1 || pageCount !== null && n > pageCount) {
        setSpecificPagesError(`Page ${n} is out of range (1–${pageCount}).`);
        return null;
      }
      nums.push(n);
    }
    const unique = [...new Set(nums)];
    setSpecificPagesError("");
    return unique;
  };
  const validatePagesPerChunk = () => {
    const n = Number.parseInt(pagesPerChunk, 10);
    if (Number.isNaN(n) || n < 1) {
      setPagesPerChunkError("Pages per split must be at least 1.");
      return null;
    }
    if (pageCount !== null && n >= pageCount) {
      setPagesPerChunkError(
        `Pages per split must be less than total pages (${pageCount}).`
      );
      return null;
    }
    setPagesPerChunkError("");
    return n;
  };
  const handleSplit = async () => {
    if (files.length === 0) {
      ue.error("Please upload a PDF file.");
      return;
    }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();
      await ensurePdfLibLoaded();
      const { PDFDocument } = getPDFLib();
      const srcPdf = await PDFDocument.load(ab);
      const total = srcPdf.getPageCount();
      if (splitMode === "all") {
        for (let i = 0; i < total; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(srcPdf, [i]);
          newPdf.addPage(page);
          const bytes = await newPdf.save();
          downloadBytes(new Uint8Array(bytes), `page-${i + 1}.pdf`);
        }
        ue.success(`Split into ${total} pages!`);
      } else if (splitMode === "range") {
        const start = Math.max(1, Number.parseInt(rangeStart)) - 1;
        const end = Math.min(total, Number.parseInt(rangeEnd)) - 1;
        if (start > end) {
          ue.error("Invalid page range.");
          return;
        }
        const newPdf = await PDFDocument.create();
        const indices = Array.from(
          { length: end - start + 1 },
          (_, i) => start + i
        );
        const pages = await newPdf.copyPages(srcPdf, indices);
        for (const p of pages) {
          newPdf.addPage(p);
        }
        const bytes = await newPdf.save();
        downloadBytes(
          new Uint8Array(bytes),
          `pages-${start + 1}-to-${end + 1}.pdf`
        );
        ue.success("Range extracted successfully!");
      } else if (splitMode === "specific") {
        const pageNums = parseSpecificPages();
        if (!pageNums) {
          setIsProcessing(false);
          return;
        }
        const newPdf = await PDFDocument.create();
        const indices = pageNums.map((n) => n - 1);
        const pages = await newPdf.copyPages(srcPdf, indices);
        for (const p of pages) {
          newPdf.addPage(p);
        }
        const bytes = await newPdf.save();
        const label = pageNums.join("-");
        downloadBytes(
          new Uint8Array(bytes),
          `split_specific_pages_${label}.pdf`
        );
        ue.success(`Extracted ${pageNums.length} specific page(s)!`);
      } else if (splitMode === "count") {
        const chunkSize = validatePagesPerChunk();
        if (!chunkSize) {
          setIsProcessing(false);
          return;
        }
        const chunkCount = Math.ceil(total / chunkSize);
        for (let c = 0; c < chunkCount; c++) {
          const startIdx = c * chunkSize;
          const endIdx = Math.min(startIdx + chunkSize - 1, total - 1);
          const indices = Array.from(
            { length: endIdx - startIdx + 1 },
            (_, i) => startIdx + i
          );
          const newPdf = await PDFDocument.create();
          const pages = await newPdf.copyPages(srcPdf, indices);
          for (const p of pages) {
            newPdf.addPage(p);
          }
          const bytes = await newPdf.save();
          downloadBytes(
            new Uint8Array(bytes),
            `split_pages_${startIdx + 1}-${endIdx + 1}.pdf`
          );
        }
        ue.success(
          `Split into ${chunkCount} chunk(s) of up to ${chunkSize} page(s)!`
        );
      }
    } catch (err) {
      ue.error("Failed to split PDF.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  const modeButton = (mode, label) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => setSplitMode(mode),
      className: `flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${splitMode === mode ? "bg-vault-amber text-vault-bg border-vault-amber" : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-amber/50"}`,
      children: label
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-5 h-5 text-purple-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Split PDF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted", children: "Extract pages or split into individual files." })
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
    files.length > 0 && pageCount !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Split Options" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:flex sm:gap-3", children: [
        modeButton("all", "All Pages"),
        modeButton("range", "Page Range"),
        modeButton("specific", "Specific Pages"),
        modeButton("count", "By Page Count")
      ] }),
      splitMode === "range" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-vault-muted text-xs", children: "From page" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              max: pageCount,
              value: rangeStart,
              onChange: (e) => setRangeStart(e.target.value),
              className: "bg-vault-hover border-vault-border text-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-vault-muted mt-5", children: "–" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-vault-muted text-xs", children: "To page" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              max: pageCount,
              value: rangeEnd,
              onChange: (e) => setRangeEnd(e.target.value),
              className: "bg-vault-hover border-vault-border text-foreground"
            }
          )
        ] })
      ] }),
      splitMode === "specific" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-vault-muted text-xs", children: [
          "Enter page numbers separated by commas (1–",
          pageCount,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "text",
            placeholder: "e.g. 1, 3, 5",
            value: specificPages,
            onChange: (e) => {
              setSpecificPages(e.target.value);
              setSpecificPagesError("");
            },
            className: "bg-vault-hover border-vault-border text-foreground"
          }
        ),
        specificPagesError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-red-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 flex-shrink-0" }),
          specificPagesError
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-vault-muted", children: "A single PDF containing only the specified pages will be downloaded." })
      ] }),
      splitMode === "count" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-vault-muted text-xs", children: [
          "Pages per split (total: ",
          pageCount,
          " pages)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 1,
            max: pageCount - 1,
            value: pagesPerChunk,
            onChange: (e) => {
              setPagesPerChunk(e.target.value);
              setPagesPerChunkError("");
            },
            className: "bg-vault-hover border-vault-border text-foreground"
          }
        ),
        pagesPerChunkError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-red-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 flex-shrink-0" }),
          pagesPerChunkError
        ] }),
        !pagesPerChunkError && pagesPerChunk && Number.parseInt(pagesPerChunk) >= 1 && Number.parseInt(pagesPerChunk) < pageCount && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-vault-muted", children: [
          "Will create",
          " ",
          Math.ceil(pageCount / Number.parseInt(pagesPerChunk)),
          " ",
          "file(s) — each with up to ",
          pagesPerChunk,
          " page(s)."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleSplit,
        disabled: files.length === 0 || isProcessing,
        className: "w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" }),
          " ",
          "Splitting..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          " Split & Download"
        ] })
      }
    )
  ] });
}
export {
  SplitPDFTool as default
};
