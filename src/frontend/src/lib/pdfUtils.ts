/**
 * PDF utility helpers.
 * All PDF library instances are created inside functions to ensure
 * proper initialization before any PDF operations are called.
 *
 * Libraries (pdf-lib, jspdf, xlsx, pdf.js, jszip) are loaded lazily via CDN
 * only when a tool is first used, avoiding render-blocking on page load.
 */

// ─── Dynamic script loader ────────────────────────────────────────────────────

const loadedScripts = new Set<string>();

function loadScript(src: string): Promise<void> {
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

// ─── Lazy library loaders ─────────────────────────────────────────────────────

export async function ensurePdfLibLoaded(): Promise<void> {
  if (window.PDFLib) return;
  await loadScript("https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js");
}

export async function ensureJsPDFLoaded(): Promise<void> {
  if (window.jspdf) return;
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  );
}

export async function ensureXLSXLoaded(): Promise<void> {
  if (window.XLSX) return;
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
  );
}

export async function ensurePdfjsLoaded(): Promise<void> {
  if (window.pdfjsLib) return;
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  );
  // Set worker after library loads
  const pdfjs = window.pdfjsLib as PdfjsLib | undefined;
  if (pdfjs && !pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }
}

export async function ensureJSZipLoaded(): Promise<void> {
  if (window.JSZip) return;
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  );
}

// ─── Synchronous accessors (call after ensuring library is loaded) ────────────

/**
 * Returns the PDFLib global. Call ensurePdfLibLoaded() first.
 */
export function getPDFLib(): typeof PDFLib {
  if (!window.PDFLib) {
    throw new Error(
      "pdf-lib is not loaded. Please check your internet connection and reload the page.",
    );
  }
  return window.PDFLib;
}

/**
 * Returns the jsPDF constructor. Call ensureJsPDFLoaded() first.
 */
export function getJsPDF(): typeof jspdf.jsPDF {
  const lib = window.jspdf;
  if (!lib || !lib.jsPDF) {
    throw new Error(
      "jsPDF is not loaded. Please check your internet connection and reload the page.",
    );
  }
  return lib.jsPDF;
}

/**
 * Returns the XLSX global. Call ensureXLSXLoaded() first.
 */
export function getXLSX(): typeof XLSXLib {
  if (!window.XLSX) {
    throw new Error(
      "XLSX is not loaded. Please check your internet connection and reload the page.",
    );
  }
  return window.XLSX;
}

/**
 * Converts a Uint8Array to a Blob and triggers a browser download.
 * Uses ArrayBuffer cast to avoid SharedArrayBuffer type issues.
 */
export function downloadBytes(
  bytes: Uint8Array,
  filename: string,
  mimeType = "application/pdf",
): void {
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Converts a Blob to a download link and triggers download.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Formats bytes into a human-readable string.
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
