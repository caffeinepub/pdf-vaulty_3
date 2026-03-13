import { r as reactExports, j as jsxRuntimeExports, L as Label, I as Input, B as Button } from "./index-COyrWJ9Y.js";
import { e as ensurePdfLibLoaded, g as getPDFLib, d as downloadBytes } from "./pdfUtils-D5wj6PeM.js";
import { F as FileUploadZone } from "./FileUploadZone-BgDDFWhV.js";
import { S as Stamp } from "./stamp-DoU3Ht5C.js";
import { L as LoaderCircle } from "./loader-circle-CwJ6veYx.js";
import { C as CircleAlert } from "./circle-alert-CkqvW2d3.js";
import { C as CircleCheckBig } from "./circle-check-big-ClFwCQeW.js";
import { D as Download } from "./download-HKl_yiDe.js";
import "./upload-C-E5ZMq5.js";
const OPACITY_MAP = {
  low: 0.15,
  medium: 0.3,
  high: 0.5
};
const COLOR_MAP = {
  gray: [0.5, 0.5, 0.5],
  red: [0.8, 0.1, 0.1],
  blue: [0.1, 0.25, 0.75]
};
const COLOR_LABELS = {
  gray: "Gray",
  red: "Red",
  blue: "Blue"
};
const POSITION_LABELS = {
  diagonal: "Diagonal Center",
  center: "Centered Horizontal",
  top: "Top"
};
function AddWatermarkTool() {
  const [uploadedFiles, setUploadedFiles] = reactExports.useState([]);
  const [watermarkText, setWatermarkText] = reactExports.useState("");
  const [opacity, setOpacity] = reactExports.useState("medium");
  const [position, setPosition] = reactExports.useState("diagonal");
  const [color, setColor] = reactExports.useState("gray");
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [done, setDone] = reactExports.useState(false);
  const [resultBytes, setResultBytes] = reactExports.useState(null);
  const [resultFileName, setResultFileName] = reactExports.useState("");
  const handleProcess = async () => {
    if (uploadedFiles.length === 0) return;
    const text = watermarkText.trim() || "CONFIDENTIAL";
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
      setProgress("Embedding font…");
      const helveticaFont = await pdfDoc.embedFont(
        PDFLib.StandardFonts.Helvetica
      );
      const pages = pdfDoc.getPages();
      const numPages = pages.length;
      const [r, g, b] = COLOR_MAP[color];
      const opacityVal = OPACITY_MAP[opacity];
      for (let i = 0; i < numPages; i++) {
        setProgress(`Watermarking page ${i + 1} of ${numPages}…`);
        const page = pages[i];
        const { width, height } = page.getSize();
        let fontSize;
        let angle;
        let x;
        let y;
        const approxCharWidth = 0.55;
        switch (position) {
          case "diagonal": {
            fontSize = 60;
            angle = 45;
            const textWidth = text.length * fontSize * approxCharWidth;
            x = (width - textWidth * Math.cos(45 * Math.PI / 180)) / 2;
            y = (height - textWidth * Math.sin(45 * Math.PI / 180)) / 2;
            break;
          }
          case "center": {
            fontSize = 48;
            angle = 0;
            const textWidth = text.length * fontSize * approxCharWidth;
            x = (width - textWidth) / 2;
            y = height / 2;
            break;
          }
          case "top": {
            fontSize = 48;
            angle = 0;
            const textWidth = text.length * fontSize * approxCharWidth;
            x = (width - textWidth) / 2;
            y = height - 80;
            break;
          }
          default: {
            fontSize = 60;
            angle = 45;
            x = width / 4;
            y = height / 4;
          }
        }
        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font: helveticaFont,
          color: PDFLib.rgb(r, g, b),
          rotate: PDFLib.degrees(angle),
          opacity: opacityVal
        });
      }
      setProgress("Saving PDF…");
      const outputBytes = await pdfDoc.save();
      const outName = `${file.name.replace(/\.pdf$/i, "")}_watermarked.pdf`;
      setResultBytes(outputBytes);
      setResultFileName(outName);
      setDone(true);
      setProgress("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to add watermark. Please try again.";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stamp, { className: "w-5 h-5 text-amber-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Add Watermark" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted", children: "Overlay custom watermark text on every page of your PDF." })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "watermark-text",
            className: "text-sm font-medium text-foreground",
            children: "Watermark Text"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "watermark-text",
            "data-ocid": "add-watermark.input",
            type: "text",
            placeholder: "CONFIDENTIAL",
            value: watermarkText,
            onChange: (e) => setWatermarkText(e.target.value),
            maxLength: 40,
            className: "bg-vault-hover border-vault-border text-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-vault-muted", children: 'Leave empty to use "CONFIDENTIAL"' })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground", children: "Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2", children: Object.keys(POSITION_LABELS).map(
          (pos) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `add-watermark.${pos}.toggle`,
              onClick: () => setPosition(pos),
              className: `py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${position === pos ? "bg-vault-blue text-white border-vault-blue" : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"}`,
              children: POSITION_LABELS[pos]
            },
            pos
          )
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground", children: "Opacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["low", "medium", "high"].map((op) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `add-watermark.${op}.toggle`,
            onClick: () => setOpacity(op),
            className: `flex-1 py-2 rounded-xl text-sm font-medium border transition-all capitalize ${opacity === op ? "bg-vault-blue text-white border-vault-blue" : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"}`,
            children: [
              op,
              " (",
              Math.round(OPACITY_MAP[op] * 100),
              "%)"
            ]
          },
          op
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-foreground", children: "Color" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["gray", "red", "blue"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `add-watermark.${c}.toggle`,
            onClick: () => setColor(c),
            className: `flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${color === c ? "bg-vault-blue text-white border-vault-blue" : "bg-vault-hover text-vault-muted border-vault-border hover:border-vault-blue/50 hover:text-foreground"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-block w-3 h-3 rounded-full border border-current/30",
                  style: {
                    backgroundColor: c === "gray" ? "rgb(128,128,128)" : c === "red" ? "rgb(204,26,26)" : "rgb(26,64,191)"
                  }
                }
              ),
              COLOR_LABELS[c]
            ] })
          },
          c
        )) })
      ] })
    ] }),
    isProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "add-watermark.loading_state",
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
        "data-ocid": "add-watermark.primary_button",
        onClick: handleProcess,
        disabled: uploadedFiles.length === 0 || isProcessing,
        className: "w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2",
        size: "lg",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          progress || "Processing…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stamp, { className: "w-4 h-4" }),
          "Add Watermark"
        ] })
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "add-watermark.error_state",
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
        "data-ocid": "add-watermark.success_state",
        className: "rounded-xl border border-border bg-card p-5 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-500 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5" }),
            "Watermark added successfully!"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 p-3 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stamp, { className: "w-4 h-4 text-amber-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate", children: resultFileName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "add-watermark.save_button",
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
                "data-ocid": "add-watermark.secondary_button",
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
  AddWatermarkTool as default
};
