import { r as reactExports, j as jsxRuntimeExports, L as Label, I as Input, B as Button } from "./index-BqLb9sp7.js";
import { e as ensurePdfLibLoaded, g as getPDFLib, d as downloadBytes } from "./pdfUtils-D5wj6PeM.js";
import { F as FileUploadZone } from "./FileUploadZone-nXJPNJnK.js";
import { H as Hash } from "./hash-CmGKLa22.js";
import { L as LoaderCircle } from "./loader-circle-DsOTiNR8.js";
import { C as CircleAlert } from "./circle-alert-DBUA9gsX.js";
import { C as CircleCheckBig } from "./circle-check-big-CGTAptI3.js";
import { D as Download } from "./download-DVe00XQW.js";
import "./upload-DjDbhMBM.js";
const POSITION_LABELS = {
  "bottom-center": "Bottom Center",
  "bottom-right": "Bottom Right",
  "bottom-left": "Bottom Left",
  "top-center": "Top Center"
};
const FONT_SIZE_MAP = {
  small: 10,
  medium: 12,
  large: 14
};
function AddPageNumbersTool() {
  const [uploadedFiles, setUploadedFiles] = reactExports.useState([]);
  const [position, setPosition] = reactExports.useState("bottom-center");
  const [startNumber, setStartNumber] = reactExports.useState(1);
  const [fontSize, setFontSize] = reactExports.useState("medium");
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [done, setDone] = reactExports.useState(false);
  const [resultBytes, setResultBytes] = reactExports.useState(null);
  const [resultFileName, setResultFileName] = reactExports.useState("");
  const handleProcess = async () => {
    if (uploadedFiles.length === 0) return;
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
        ignoreEncryption: true
      });
      const pages = pdfDoc.getPages();
      const numPages = pages.length;
      const pt = FONT_SIZE_MAP[fontSize];
      const margin = 28;
      setProgress("Embedding font…");
      const helvetica = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
      for (let i = 0; i < numPages; i++) {
        setProgress(`Adding page number ${i + 1} of ${numPages}…`);
        const page = pages[i];
        const { width, height } = page.getSize();
        const pageNum = i + startNumber;
        const text = String(pageNum);
        const textWidth = text.length * pt * 0.5;
        let x;
        let y;
        switch (position) {
          case "bottom-center":
            x = (width - textWidth) / 2;
            y = margin;
            break;
          case "bottom-right":
            x = width - textWidth - margin;
            y = margin;
            break;
          case "bottom-left":
            x = margin;
            y = margin;
            break;
          case "top-center":
            x = (width - textWidth) / 2;
            y = height - margin;
            break;
          default:
            x = (width - textWidth) / 2;
            y = margin;
        }
        page.drawText(text, {
          x,
          y,
          size: pt,
          font: helvetica,
          color: PDFLib.rgb(0.3, 0.3, 0.3)
        });
      }
      setProgress("Saving PDF…");
      const outputBytes = await pdfDoc.save();
      const outName = `${file.name.replace(/\.pdf$/i, "")}_numbered.pdf`;
      setResultBytes(outputBytes);
      setResultFileName(outName);
      setDone(true);
      setProgress("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to add page numbers. Please try again.";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-5 h-5 text-sky-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Add Page Numbers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted", children: "Stamp page numbers onto every page of your PDF." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileUploadZone,
        {
          accept: ".pdf,application/pdf",
          multiple: false,
          files: uploadedFiles,
          onFilesChange: setUploadedFiles,
          label: "Drop your PDF here or click to browse",
          hint: "Single PDF file only"
        }
      )
    ] }),
    uploadedFiles.length > 0 && !done && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground", children: "Number Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: Object.keys(POSITION_LABELS).map((pos) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `add-page-numbers.${pos}.toggle`,
            onClick: () => setPosition(pos),
            className: `py-2.5 px-3 rounded-xl text-sm font-medium border transition-all text-left ${position === pos ? "bg-vault-blue text-white border-vault-blue" : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"}`,
            children: POSITION_LABELS[pos]
          },
          pos
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "start-number",
            className: "text-sm font-medium text-foreground",
            children: "Starting Page Number"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "start-number",
            "data-ocid": "add-page-numbers.input",
            type: "number",
            min: 1,
            max: 9999,
            value: startNumber,
            onChange: (e) => setStartNumber(
              Math.max(1, Number.parseInt(e.target.value, 10) || 1)
            ),
            className: "bg-vault-hover border-vault-border text-foreground w-32"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground", children: "Font Size" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["small", "medium", "large"].map((sz) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `add-page-numbers.${sz}.toggle`,
            onClick: () => setFontSize(sz),
            className: `flex-1 py-2 rounded-xl text-sm font-medium border transition-all capitalize ${fontSize === sz ? "bg-vault-blue text-white border-vault-blue" : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"}`,
            children: [
              sz,
              " (",
              FONT_SIZE_MAP[sz],
              "pt)"
            ]
          },
          sz
        )) })
      ] })
    ] }),
    isProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "add-page-numbers.loading_state",
        className: "flex items-center gap-2 p-4 rounded-xl bg-vault-surface border border-vault-border text-sm text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-vault-blue shrink-0" }),
          progress
        ]
      }
    ),
    !done && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        "data-ocid": "add-page-numbers.primary_button",
        onClick: handleProcess,
        disabled: uploadedFiles.length === 0 || isProcessing,
        className: "w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2",
        size: "lg",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          progress || "Processing…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-4 h-4" }),
          "Add Page Numbers"
        ] })
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "add-page-numbers.error_state",
        className: "flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: error })
        ]
      }
    ),
    done && resultBytes && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "add-page-numbers.success_state",
        className: "rounded-xl border border-border bg-card p-5 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-500 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5" }),
            "Page numbers added successfully!"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-3 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-4 h-4 text-sky-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate", children: resultFileName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "add-page-numbers.save_button",
                onClick: handleDownload,
                className: "flex-1 bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold gap-2",
                size: "lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  "Download PDF"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "add-page-numbers.secondary_button",
                onClick: handleReset,
                variant: "outline",
                className: "border-vault-border text-vault-muted hover:text-foreground",
                size: "lg",
                children: "Process Another"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  AddPageNumbersTool as default
};
