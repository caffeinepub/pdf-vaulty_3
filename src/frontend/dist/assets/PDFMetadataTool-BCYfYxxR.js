import { r as reactExports, j as jsxRuntimeExports, L as Label, I as Input, B as Button } from "./index-IHpCzH5x.js";
import { F as FileUploadZone } from "./FileUploadZone-Ccoo04hN.js";
import { f as formatBytes, e as ensurePdfLibLoaded, g as getPDFLib } from "./pdfUtils-D5wj6PeM.js";
import { L as LoaderCircle } from "./loader-circle-CfULriSo.js";
import { C as CircleAlert } from "./circle-alert-hVkTVtCE.js";
import { F as FilePen } from "./file-pen-Dary90HZ.js";
import { C as CircleCheckBig } from "./circle-check-big-CmYIaIm-.js";
import { D as Download } from "./download-DgVGQUnf.js";
import "./upload-DhY97ycc.js";
function PDFMetadataTool() {
  const [uploadedFiles, setUploadedFiles] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(false);
  const [metadata, setMetadata] = reactExports.useState(null);
  const [outputBytes, setOutputBytes] = reactExports.useState(null);
  const [outputName, setOutputName] = reactExports.useState("");
  const handleFilesChange = async (files) => {
    var _a;
    setUploadedFiles(files);
    setMetadata(null);
    setError(null);
    setSuccess(false);
    setOutputBytes(null);
    if (files.length === 0) return;
    setIsLoading(true);
    try {
      await ensurePdfLibLoaded();
      const PDFLib = getPDFLib();
      const arrayBuffer = await files[0].file.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true
      });
      let title = "";
      let author = "";
      let subject = "";
      let keywords = "";
      try {
        const context = pdfDoc.context;
        const indirectObjects = context.enumerateIndirectObjects();
        for (const [, obj] of indirectObjects) {
          const objStr = ((_a = obj == null ? void 0 : obj.toString) == null ? void 0 : _a.call(obj)) ?? "";
          if (objStr.includes("/Title") || objStr.includes("/Author") || objStr.includes("/Subject") || objStr.includes("/Keywords")) {
            const extractVal = (key) => {
              const regex = new RegExp(`/${key}\\s*\\(([^)]*)\\)`, "s");
              const m = objStr.match(regex);
              return m ? m[1].replace(/\\n/g, "\n").trim() : "";
            };
            title = extractVal("Title");
            author = extractVal("Author");
            subject = extractVal("Subject");
            keywords = extractVal("Keywords");
            break;
          }
        }
      } catch {
      }
      setMetadata({ title, author, subject, keywords });
      setOutputName(`${files[0].file.name.replace(/\.pdf$/i, "")}_updated.pdf`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not read PDF metadata.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSave = async () => {
    if (!metadata || uploadedFiles.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setSuccess(false);
    try {
      await ensurePdfLibLoaded();
      const PDFLib = getPDFLib();
      const arrayBuffer = await uploadedFiles[0].file.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true
      });
      pdfDoc.setTitle(metadata.title);
      pdfDoc.setAuthor(metadata.author);
      pdfDoc.setSubject(metadata.subject);
      pdfDoc.setKeywords(
        metadata.keywords.split(",").map((k) => k.trim()).filter(Boolean)
      );
      pdfDoc.setModificationDate(/* @__PURE__ */ new Date());
      const bytes = await pdfDoc.save();
      setOutputBytes(bytes);
      setSuccess(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update metadata.";
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDownload = () => {
    if (!outputBytes) return;
    const blob = new Blob([outputBytes.buffer], {
      type: "application/pdf"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputName;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FileUploadZone,
      {
        accept: ".pdf",
        multiple: false,
        files: uploadedFiles,
        onFilesChange: handleFilesChange,
        label: "Drop your PDF here or click to browse",
        hint: "Supports PDF files"
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 p-4 rounded-xl bg-muted/40 border border-border",
        "data-ocid": "metadata.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Reading metadata..." })
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive",
        "data-ocid": "metadata.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: error })
        ]
      }
    ),
    metadata && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilePen, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Edit Metadata Fields" }),
        uploadedFiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: formatBytes(uploadedFiles[0].file.size) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "meta-title",
              className: "text-xs font-medium text-muted-foreground",
              children: "Title"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "meta-title",
              "data-ocid": "metadata.title.input",
              value: metadata.title,
              onChange: (e) => setMetadata(
                (prev) => prev ? { ...prev, title: e.target.value } : prev
              ),
              placeholder: "Document title",
              className: "bg-background"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "meta-author",
              className: "text-xs font-medium text-muted-foreground",
              children: "Author"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "meta-author",
              "data-ocid": "metadata.author.input",
              value: metadata.author,
              onChange: (e) => setMetadata(
                (prev) => prev ? { ...prev, author: e.target.value } : prev
              ),
              placeholder: "Author name",
              className: "bg-background"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "meta-subject",
              className: "text-xs font-medium text-muted-foreground",
              children: "Subject"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "meta-subject",
              "data-ocid": "metadata.subject.input",
              value: metadata.subject,
              onChange: (e) => setMetadata(
                (prev) => prev ? { ...prev, subject: e.target.value } : prev
              ),
              placeholder: "Document subject",
              className: "bg-background"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "meta-keywords",
              className: "text-xs font-medium text-muted-foreground",
              children: [
                "Keywords",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "(comma-separated)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "meta-keywords",
              "data-ocid": "metadata.keywords.input",
              value: metadata.keywords,
              onChange: (e) => setMetadata(
                (prev) => prev ? { ...prev, keywords: e.target.value } : prev
              ),
              placeholder: "keyword1, keyword2, keyword3",
              className: "bg-background"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleSave,
          disabled: isProcessing,
          className: "w-full",
          size: "lg",
          "data-ocid": "metadata.submit_button",
          children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Saving metadata..."
          ] }) : "Save Metadata"
        }
      )
    ] }),
    success && outputBytes && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border bg-card p-5 space-y-4",
        "data-ocid": "metadata.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-500 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5" }),
            "Metadata updated successfully!"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "The PDF metadata has been updated. Download the file below." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleDownload,
              className: "w-full gap-2",
              size: "lg",
              "data-ocid": "metadata.download.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                "Download Updated PDF"
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  PDFMetadataTool as default
};
