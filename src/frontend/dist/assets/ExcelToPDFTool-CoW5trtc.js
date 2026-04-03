import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, f as ue } from "./index-IHpCzH5x.js";
import { A as Alert, I as Info, a as AlertDescription } from "./alert-6jurCUmY.js";
import { b as ensureXLSXLoaded, c as ensureJsPDFLoaded, h as getXLSX, i as getJsPDF } from "./pdfUtils-D5wj6PeM.js";
import { F as FileUploadZone } from "./FileUploadZone-Ccoo04hN.js";
import { D as Download } from "./download-DgVGQUnf.js";
import "./upload-DhY97ycc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
const FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode);
function ExcelToPDFTool() {
  const [files, setFiles] = reactExports.useState([]);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const handleConvert = async () => {
    if (files.length === 0) {
      ue.error("Please upload an Excel file.");
      return;
    }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();
      await ensureXLSXLoaded();
      await ensureJsPDFLoaded();
      const XLSX = getXLSX();
      const workbook = XLSX.read(ab, { type: "array" });
      const JsPDF = getJsPDF();
      const doc = new JsPDF({
        unit: "mm",
        format: "a4",
        orientation: "landscape"
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      let isFirstSheet = true;
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          defval: ""
        });
        if (data.length === 0) continue;
        if (!isFirstSheet) doc.addPage();
        isFirstSheet = false;
        let y = margin + 8;
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.text(`Sheet: ${sheetName}`, margin, y);
        y += 8;
        const headers = (data[0] || []).map(String);
        const rows = data.slice(1).map((row) => row.map(String));
        const colCount = Math.max(headers.length, 1);
        const colWidth = Math.min(40, (pageWidth - margin * 2) / colCount);
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setFillColor(245, 158, 11);
        doc.rect(margin, y - 4, pageWidth - margin * 2, 7, "F");
        doc.setTextColor(30, 30, 30);
        headers.forEach((h, i) => {
          const x = margin + i * colWidth;
          if (x + colWidth <= pageWidth - margin) {
            doc.text(String(h).substring(0, 15), x + 1, y);
          }
        });
        doc.setTextColor(220, 220, 220);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        rows.forEach((row, rowIdx) => {
          if (y > pageHeight - margin) {
            doc.addPage();
            y = margin + 8;
          }
          if (rowIdx % 2 === 0) {
            doc.setFillColor(40, 40, 45);
            doc.rect(margin, y - 4, pageWidth - margin * 2, 6, "F");
          }
          row.forEach((cell, i) => {
            const x = margin + i * colWidth;
            if (x + colWidth <= pageWidth - margin) {
              doc.text(String(cell).substring(0, 18), x + 1, y);
            }
          });
          y += 6;
        });
      }
      doc.save(files[0].file.name.replace(/\.(xlsx|xls)$/i, ".pdf"));
      ue.success("Excel converted to PDF!");
    } catch (err) {
      ue.error(
        "Failed to convert Excel to PDF. Please ensure the file is a valid Excel spreadsheet."
      );
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "w-5 h-5 text-emerald-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Excel to PDF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted", children: "Convert Excel spreadsheets to PDF format." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { className: "mb-4 bg-vault-hover border-vault-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-vault-amber" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-vault-muted text-sm", children: "Spreadsheet data is rendered as a table in the PDF. Charts and complex formatting may not be preserved." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileUploadZone,
        {
          accept: ".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
          files,
          onFilesChange: setFiles,
          label: "Drop an Excel file here or click to browse",
          hint: "Supports .xlsx and .xls files"
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
  ExcelToPDFTool as default
};
