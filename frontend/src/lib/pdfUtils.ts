/**
 * PDF utility helpers.
 * All PDF library instances are created inside functions to ensure
 * proper initialization before any PDF operations are called.
 *
 * Libraries (pdf-lib, jspdf, xlsx) are loaded via CDN in index.html
 * and accessed through window globals.
 */

/**
 * Returns the PDFLib global (loaded via CDN).
 * Throws a clear error if the library hasn't loaded yet.
 */
export function getPDFLib(): typeof PDFLib {
  if (!window.PDFLib) {
    throw new Error('pdf-lib is not loaded. Please check your internet connection and reload the page.');
  }
  return window.PDFLib;
}

/**
 * Returns the jsPDF constructor (loaded via CDN).
 * Throws a clear error if the library hasn't loaded yet.
 */
export function getJsPDF(): typeof jspdf.jsPDF {
  const lib = window.jspdf;
  if (!lib || !lib.jsPDF) {
    throw new Error('jsPDF is not loaded. Please check your internet connection and reload the page.');
  }
  return lib.jsPDF;
}

/**
 * Returns the XLSX global (loaded via CDN).
 * Throws a clear error if the library hasn't loaded yet.
 */
export function getXLSX(): typeof XLSXLib {
  if (!window.XLSX) {
    throw new Error('XLSX is not loaded. Please check your internet connection and reload the page.');
  }
  return window.XLSX;
}

/**
 * Converts a Uint8Array to a Blob and triggers a browser download.
 * Uses ArrayBuffer cast to avoid SharedArrayBuffer type issues.
 */
export function downloadBytes(bytes: Uint8Array, filename: string, mimeType = 'application/pdf'): void {
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
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
  const a = document.createElement('a');
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
