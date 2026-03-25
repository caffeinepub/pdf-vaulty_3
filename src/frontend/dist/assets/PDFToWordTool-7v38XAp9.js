import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, f as ue } from "./index-mB_N17VN.js";
import { A as Alert, I as Info, a as AlertDescription } from "./alert-CQY7ZOyX.js";
import { j as downloadBlob } from "./pdfUtils-D5wj6PeM.js";
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
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M9 13v-1h6v1", key: "1bb014" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "M11 18h2", key: "12mj7e" }]
];
const FileType = createLucideIcon("file-type", __iconNode);
function PDFToWordTool() {
  const [files, setFiles] = reactExports.useState([]);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const handleConvert = async () => {
    if (files.length === 0) {
      ue.error("Please upload a PDF file.");
      return;
    }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();
      const bytes = new Uint8Array(ab);
      const text = extractTextFromPDF(bytes);
      const rtfContent = generateRTF(text, files[0].file.name);
      const blob = new Blob([rtfContent], { type: "application/rtf" });
      downloadBlob(blob, files[0].file.name.replace(".pdf", ".rtf"));
      ue.success("PDF converted to Word-compatible format!");
    } catch (err) {
      ue.error("Failed to convert PDF to Word.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileType, { className: "w-5 h-5 text-sky-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "PDF to Word" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted", children: "Convert PDF to an editable Word-compatible document." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { className: "mb-4 bg-vault-hover border-vault-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-vault-amber" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-vault-muted text-sm", children: "Client-side conversion extracts text content. Complex layouts and images may not be preserved. Output is in RTF format, openable in Microsoft Word and LibreOffice." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileUploadZone,
        {
          accept: "application/pdf",
          files,
          onFilesChange: setFiles,
          label: "Drop a PDF file here or click to browse",
          hint: "Single PDF file only"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleConvert,
        disabled: files.length === 0 || isProcessing,
        className: "w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" }),
          " ",
          "Converting..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          " Convert & Download"
        ] })
      }
    )
  ] });
}
function extractTextFromPDF(bytes) {
  try {
    const str = new TextDecoder("latin1").decode(bytes);
    const textParts = [];
    const btEtRegex = /BT([\s\S]*?)ET/g;
    let match = btEtRegex.exec(str);
    while (match !== null) {
      const block = match[1];
      const strRegex = /\(([^)]*)\)/g;
      let strMatch = strRegex.exec(block);
      while (strMatch !== null) {
        const decoded = strMatch[1].replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "	").replace(/\\\\/g, "\\").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
        if (decoded.trim()) textParts.push(decoded);
        strMatch = strRegex.exec(block);
      }
      match = btEtRegex.exec(str);
    }
    return textParts.join(" ") || "No extractable text found in this PDF.";
  } catch {
    return "Could not extract text from this PDF.";
  }
}
function generateRTF(text, filename) {
  const escaped = text.replace(/\\/g, "\\\\").replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/\n/g, "\\par\n");
  return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}}
{\\info{\\title ${filename}}}
\\f0\\fs24
${escaped}
}`;
}
export {
  PDFToWordTool as default
};
