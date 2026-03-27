import { r as reactExports, j as jsxRuntimeExports, B as Button, f as ue } from "./index-BqLb9sp7.js";
import { a as ensurePdfjsLoaded } from "./pdfUtils-D5wj6PeM.js";
import { F as FileSearch } from "./file-search-CBDfz1VC.js";
import { U as Upload } from "./upload-DjDbhMBM.js";
import { C as Check, a as Copy } from "./copy-DMgNuxM3.js";
import { D as Download } from "./download-DVe00XQW.js";
function ExtractTextTool() {
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [isExtracting, setIsExtracting] = reactExports.useState(false);
  const [extractedText, setExtractedText] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const extractText = reactExports.useCallback(async (file) => {
    setIsExtracting(true);
    setError(null);
    setExtractedText(null);
    try {
      await ensurePdfjsLoaded();
      const pdfjsLib = window.pdfjsLib;
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const textParts = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str ?? "").join(" ").trim();
        if (pageText) textParts.push(pageText);
      }
      const result = textParts.join("\n\n");
      if (!result.trim()) {
        setError(
          "No readable text found in this PDF. It may be a scanned image."
        );
      } else {
        setExtractedText(result);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to extract text. Make sure the file is a valid PDF.");
    } finally {
      setIsExtracting(false);
    }
  }, []);
  const handleFileSelect = reactExports.useCallback(
    (file) => {
      if (!file.name.toLowerCase().endsWith(".pdf")) {
        setError("Please upload a PDF file.");
        return;
      }
      extractText(file);
    },
    [extractText]
  );
  const handleInputChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) handleFileSelect(file);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };
  const handleDropZoneKeyDown = (e) => {
    var _a;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      (_a = fileInputRef.current) == null ? void 0 : _a.click();
    }
  };
  const handleCopy = async () => {
    if (!extractedText) return;
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      ue.success("Text copied to clipboard!");
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      ue.error("Could not copy text.");
    }
  };
  const handleDownload = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    !extractedText && !isExtracting && // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handler provided via onKeyDown
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
        onKeyDown: handleDropZoneKeyDown,
        "data-ocid": "extract_text.dropzone",
        className: `cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-12 flex flex-col items-center justify-center gap-4 text-center ${isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111] hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-950/10"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSearch, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900 dark:text-white text-base", children: "Drop a PDF here or click to browse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 dark:text-white/40 mt-1", children: "PDF files only" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "pointer-events-none",
              "data-ocid": "extract_text.upload_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-1.5" }),
                "Select PDF"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: ".pdf",
              className: "hidden",
              onChange: handleInputChange
            }
          )
        ]
      }
    ),
    isExtracting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "extract_text.loading_state",
        className: "flex flex-col items-center justify-center gap-3 py-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-white/50", children: "Extracting text…" })
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "extract_text.error_state",
        className: "rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 px-4 py-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700 dark:text-red-300 font-medium", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "mt-3",
              onClick: () => {
                setError(null);
                setExtractedText(null);
              },
              children: "Try another file"
            }
          )
        ]
      }
    ),
    extractedText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "extract_text.success_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-gray-700 dark:text-white/70", children: [
          "Extracted text (",
          extractedText.length.toLocaleString(),
          " ",
          "characters)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: handleCopy,
              "data-ocid": "extract_text.secondary_button",
              className: "gap-1.5",
              children: [
                copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                copied ? "Copied!" : "Copy to Clipboard"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: handleDownload,
              "data-ocid": "extract_text.primary_button",
              className: "gap-1.5 bg-blue-600 hover:bg-blue-700 text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                "Download .txt"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          readOnly: true,
          value: extractedText,
          "data-ocid": "extract_text.textarea",
          className: "w-full h-64 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111] text-gray-800 dark:text-white/80 text-sm p-4 resize-none font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => {
            setExtractedText(null);
            setError(null);
          },
          className: "text-gray-400 hover:text-gray-600",
          children: "Extract from another file"
        }
      )
    ] })
  ] });
}
export {
  ExtractTextTool as default
};
