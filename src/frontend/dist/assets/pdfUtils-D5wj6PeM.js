const loadedScripts = /* @__PURE__ */ new Set();
function loadScript(src) {
  if (loadedScripts.has(src)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      loadedScripts.add(src);
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      loadedScripts.add(src);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}
async function ensurePdfLibLoaded() {
  if (window.PDFLib) return;
  await loadScript("https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js");
}
async function ensureJsPDFLoaded() {
  if (window.jspdf) return;
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
  );
}
async function ensureXLSXLoaded() {
  if (window.XLSX) return;
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
  );
}
async function ensurePdfjsLoaded() {
  if (window.pdfjsLib) return;
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
  );
  const pdfjs = window.pdfjsLib;
  if (pdfjs && !pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }
}
async function ensureJSZipLoaded() {
  if (window.JSZip) return;
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
  );
}
function getPDFLib() {
  if (!window.PDFLib) {
    throw new Error(
      "pdf-lib is not loaded. Please check your internet connection and reload the page."
    );
  }
  return window.PDFLib;
}
function getJsPDF() {
  const lib = window.jspdf;
  if (!lib || !lib.jsPDF) {
    throw new Error(
      "jsPDF is not loaded. Please check your internet connection and reload the page."
    );
  }
  return lib.jsPDF;
}
function getXLSX() {
  if (!window.XLSX) {
    throw new Error(
      "XLSX is not loaded. Please check your internet connection and reload the page."
    );
  }
  return window.XLSX;
}
function downloadBytes(bytes, filename, mimeType = "application/pdf") {
  const blob = new Blob([bytes.buffer], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
export {
  ensurePdfjsLoaded as a,
  ensureXLSXLoaded as b,
  ensureJsPDFLoaded as c,
  downloadBytes as d,
  ensurePdfLibLoaded as e,
  formatBytes as f,
  getPDFLib as g,
  getXLSX as h,
  getJsPDF as i,
  downloadBlob as j,
  ensureJSZipLoaded as k
};
