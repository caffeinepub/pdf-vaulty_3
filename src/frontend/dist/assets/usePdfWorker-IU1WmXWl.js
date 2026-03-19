import{r as f}from"./index-C6rBwYFg.js";const u=3e4,p="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js";function m(){return`
self.importScripts("${p}");

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
`}let i=null;function g(){if(!i){const t=new Blob([m()],{type:"application/javascript"});i=URL.createObjectURL(t)}return i}function D(){const t=f.useRef(null);return f.useEffect(()=>{try{t.current=new Worker(g())}catch{t.current=null}return()=>{var o;(o=t.current)==null||o.terminate(),t.current=null}},[]),{processInWorker:f.useCallback((o,l)=>new Promise((d,a)=>{const e=t.current;if(!e){a(new Error("Worker not available"));return}const c=setTimeout(()=>{a(new Error("Worker timed out"))},u),n=r=>{clearTimeout(c),e.removeEventListener("message",n),e.removeEventListener("error",s),r.data.success?d(r.data.result):a(new Error(r.data.error))},s=r=>{clearTimeout(c),e.removeEventListener("message",n),e.removeEventListener("error",s),a(new Error(r.message))};e.addEventListener("message",n),e.addEventListener("error",s),e.postMessage({type:o,payload:l})}),[])}}export{D as u};
