import { r as reactExports } from "./index-BJasp0fK.js";
const WORKER_TIMEOUT_MS = 3e4;
const PDF_LIB_CDN = "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js";
function buildWorkerScript() {
  return `
self.importScripts("${PDF_LIB_CDN}");

const { PDFDocument, degrees } = self.PDFLib;

async function handleMerge(fileBuffers) {
  const mergedPdf = await PDFDocument.create();
  for (const buffer of fileBuffers) {
    const pdf = await PDFDocument.load(buffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    for (const page of copiedPages) mergedPdf.addPage(page);
  }
  return new Uint8Array(await mergedPdf.save());
}

async function handleCompress(fileBuffer) {
  const pdfDoc = await PDFDocument.load(fileBuffer);
  pdfDoc.setTitle(""); pdfDoc.setAuthor(""); pdfDoc.setSubject("");
  pdfDoc.setKeywords([]); pdfDoc.setCreator(""); pdfDoc.setProducer("");
  return new Uint8Array(await pdfDoc.save({ useObjectStreams: true }));
}

async function handleRotate(fileBuffer, angle) {
  const pdfDoc = await PDFDocument.load(fileBuffer);
  for (const page of pdfDoc.getPages()) {
    const cur = page.getRotation().angle;
    page.setRotation(degrees((cur + angle) % 360));
  }
  return new Uint8Array(await pdfDoc.save());
}

async function handleCrop(fileBuffer, margins) {
  const pdfDoc = await PDFDocument.load(fileBuffer);
  const mmToPt = mm => mm * 2.83465;
  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize();
    const t = mmToPt(margins.top), r = mmToPt(margins.right),
          b = mmToPt(margins.bottom), l = mmToPt(margins.left);
    if (typeof page.setMediaBox === 'function')
      page.setMediaBox(l, b, Math.max(1, width - l - r), Math.max(1, height - t - b));
    if (typeof page.setCropBox === 'function')
      page.setCropBox(l, b, Math.max(1, width - l - r), Math.max(1, height - t - b));
  }
  return new Uint8Array(await pdfDoc.save());
}

async function handleFlatten(fileBuffer) {
  const pdfDoc = await PDFDocument.load(fileBuffer, { ignoreEncryption: true });
  if (typeof pdfDoc.getForm === 'function') {
    const form = pdfDoc.getForm();
    for (const field of form.getFields()) field.enableReadOnly();
    form.flatten();
  }
  return new Uint8Array(await pdfDoc.save());
}

self.onmessage = async (event) => {
  const { type, payload } = event.data;
  try {
    let result;
    if (type === 'merge') result = await handleMerge(payload.fileBuffers);
    else if (type === 'compress') result = await handleCompress(payload.fileBuffer);
    else if (type === 'rotate') result = await handleRotate(payload.fileBuffer, payload.angle);
    else if (type === 'crop') result = await handleCrop(payload.fileBuffer, payload.margins);
    else if (type === 'flatten') result = await handleFlatten(payload.fileBuffer);
    else throw new Error('Unknown type: ' + type);
    self.postMessage({ success: true, result });
  } catch (err) {
    self.postMessage({ success: false, error: err.message || String(err) });
  }
};
`;
}
let workerBlobUrl = null;
function getWorkerBlobUrl() {
  if (!workerBlobUrl) {
    const blob = new Blob([buildWorkerScript()], {
      type: "application/javascript"
    });
    workerBlobUrl = URL.createObjectURL(blob);
  }
  return workerBlobUrl;
}
function usePdfWorker() {
  const workerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    try {
      workerRef.current = new Worker(getWorkerBlobUrl());
    } catch {
      workerRef.current = null;
    }
    return () => {
      var _a;
      (_a = workerRef.current) == null ? void 0 : _a.terminate();
      workerRef.current = null;
    };
  }, []);
  const processInWorker = reactExports.useCallback(
    (type, payload) => {
      return new Promise((resolve, reject) => {
        const worker = workerRef.current;
        if (!worker) {
          reject(new Error("Worker not available"));
          return;
        }
        const timer = setTimeout(() => {
          reject(new Error("Worker timed out"));
        }, WORKER_TIMEOUT_MS);
        const handleMessage = (event) => {
          clearTimeout(timer);
          worker.removeEventListener("message", handleMessage);
          worker.removeEventListener("error", handleError);
          if (event.data.success) {
            resolve(event.data.result);
          } else {
            reject(new Error(event.data.error));
          }
        };
        const handleError = (err) => {
          clearTimeout(timer);
          worker.removeEventListener("message", handleMessage);
          worker.removeEventListener("error", handleError);
          reject(new Error(err.message));
        };
        worker.addEventListener("message", handleMessage);
        worker.addEventListener("error", handleError);
        worker.postMessage({ type, payload });
      });
    },
    []
  );
  return { processInWorker };
}
export {
  usePdfWorker as u
};
