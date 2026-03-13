import { r as reactExports, j as jsxRuntimeExports, F as FileText, B as Button, g as ue } from "./index-COyrWJ9Y.js";
import { A as Alert, I as Info, a as AlertDescription } from "./alert-BG1zEBws.js";
import { c as ensureJsPDFLoaded, i as getJsPDF } from "./pdfUtils-D5wj6PeM.js";
import { F as FileUploadZone } from "./FileUploadZone-BgDDFWhV.js";
import { D as Download } from "./download-HKl_yiDe.js";
import "./upload-C-E5ZMq5.js";
function WordToPDFTool() {
  const [files, setFiles] = reactExports.useState([]);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const handleConvert = async () => {
    if (files.length === 0) {
      ue.error("Please upload a .docx file.");
      return;
    }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();
      const text = await extractTextFromDocx(ab);
      await ensureJsPDFLoaded();
      const JsPDF = getJsPDF();
      const doc = new JsPDF({ unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      const lineHeight = 7;
      let y = margin;
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      const title = files[0].file.name.replace(/\.(docx|doc)$/i, "");
      doc.text(title, margin, y);
      y += lineHeight * 2;
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const paragraphs = text.split("\n").filter((p) => p.trim());
      for (const para of paragraphs) {
        const lines = doc.splitTextToSize(para, maxWidth);
        for (const line of lines) {
          if (y > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += lineHeight;
        }
        y += lineHeight * 0.5;
      }
      doc.save(files[0].file.name.replace(/\.(docx|doc)$/i, ".pdf"));
      ue.success("Word document converted to PDF!");
    } catch (err) {
      ue.error("Failed to convert Word to PDF.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-indigo-400/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-indigo-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Word to PDF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted", children: "Convert .docx files to PDF format." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { className: "mb-4 bg-vault-hover border-vault-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-vault-amber" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-vault-muted text-sm", children: "Text content is extracted and formatted into a PDF. Complex formatting, images, and tables may not be fully preserved." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileUploadZone,
        {
          accept: ".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          files,
          onFilesChange: setFiles,
          label: "Drop a .docx file here or click to browse",
          hint: "Supports .docx and .doc files"
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
async function extractTextFromDocx(arrayBuffer) {
  try {
    const uint8 = new Uint8Array(arrayBuffer);
    const xmlContent = extractFileFromZip(uint8, "word/document.xml");
    if (!xmlContent) {
      return "Could not read document content. Please ensure this is a valid .docx file.";
    }
    const text = xmlContent.replace(/<w:br[^>]*\/>/g, "\n").replace(/<\/w:p>/g, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\n{3,}/g, "\n\n").trim();
    return text || "No text content found in this document.";
  } catch {
    return "Could not parse this document format.";
  }
}
function extractFileFromZip(data, targetPath) {
  try {
    let offset = 0;
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    while (offset < data.length - 4) {
      const signature = view.getUint32(offset, true);
      if (signature !== 67324752) {
        offset++;
        continue;
      }
      const compressionMethod = view.getUint16(offset + 8, true);
      const compressedSize = view.getUint32(offset + 18, true);
      const fileNameLength = view.getUint16(offset + 26, true);
      const extraFieldLength = view.getUint16(offset + 28, true);
      const fileNameBytes = data.slice(
        offset + 30,
        offset + 30 + fileNameLength
      );
      const fileName = new TextDecoder("utf-8").decode(fileNameBytes);
      const dataOffset = offset + 30 + fileNameLength + extraFieldLength;
      const compressedData = data.slice(
        dataOffset,
        dataOffset + compressedSize
      );
      if (fileName === targetPath) {
        if (compressionMethod === 0) {
          return new TextDecoder("utf-8").decode(compressedData);
        }
        if (compressionMethod === 8) {
          return decompressDeflate(compressedData);
        }
        return null;
      }
      offset = dataOffset + compressedSize;
    }
    return null;
  } catch {
    return null;
  }
}
function decompressDeflate(compressed) {
  try {
    const raw = new TextDecoder("latin1").decode(compressed);
    const xmlStart = raw.indexOf("<?xml");
    const xmlAlt = raw.indexOf("<w:document");
    const start = xmlStart >= 0 ? xmlStart : xmlAlt >= 0 ? xmlAlt : -1;
    if (start >= 0) return raw.substring(start);
    return raw;
  } catch {
    return null;
  }
}
export {
  WordToPDFTool as default
};
