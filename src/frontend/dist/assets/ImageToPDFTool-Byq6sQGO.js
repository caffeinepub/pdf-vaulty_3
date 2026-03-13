import { r as reactExports, j as jsxRuntimeExports, B as Button, g as ue } from "./index-COyrWJ9Y.js";
import { c as ensureJsPDFLoaded, i as getJsPDF } from "./pdfUtils-D5wj6PeM.js";
import { I as Image$1, F as FileUploadZone } from "./FileUploadZone-BgDDFWhV.js";
import { D as Download } from "./download-HKl_yiDe.js";
import "./upload-C-E5ZMq5.js";
function ImageToPDFTool() {
  const [files, setFiles] = reactExports.useState([]);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const getImageDimensions = (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.src = dataUrl;
    });
  };
  const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a;
        return resolve((_a = e.target) == null ? void 0 : _a.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const handleConvert = async () => {
    if (files.length === 0) {
      ue.error("Please upload at least one image.");
      return;
    }
    setIsProcessing(true);
    try {
      await ensureJsPDFLoaded();
      const JsPDF = getJsPDF();
      const doc = new JsPDF({ unit: "px", hotfixes: ["px_scaling"] });
      let isFirstPage = true;
      for (const { file } of files) {
        const dataUrl = await readFileAsDataUrl(file);
        const { width, height } = await getImageDimensions(dataUrl);
        const format = file.type === "image/png" ? "PNG" : "JPEG";
        if (!isFirstPage) {
          doc.addPage([width, height]);
        } else {
          doc.internal.pageSize.width = width;
          doc.internal.pageSize.height = height;
          isFirstPage = false;
        }
        doc.addImage(dataUrl, format, 0, 0, width, height);
      }
      doc.save("images.pdf");
      ue.success("Images converted to PDF!");
    } catch (err) {
      ue.error("Failed to convert images to PDF.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-pink-400/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "w-5 h-5 text-pink-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Image to PDF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted", children: "Convert JPG and PNG images to a PDF document." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileUploadZone,
        {
          accept: "image/jpeg,image/png,image/jpg",
          multiple: true,
          files,
          onFilesChange: setFiles,
          label: "Drop image files here or click to browse",
          hint: "Supports JPG and PNG • Multiple images allowed"
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
export {
  ImageToPDFTool as default
};
