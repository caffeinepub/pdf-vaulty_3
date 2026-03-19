# PDF Vaulty

## Current State
- Hindi translation file has a typo: `myfiles.noFiles` says "koi fail upload" (fail) instead of "koi file upload" (file)
- `vite.config.js` has `minify: false` — all JS/CSS is shipped uncompressed, causing slow load times
- Language files are already lazy-loaded per-language in LanguageContext.tsx (task 3 is already implemented)
- No rollupOptions / manualChunks configured for vendor splitting
- PDF library imports are inline in each tool component (pdf-lib, pdfjs-dist, etc.) — loaded on main thread

## Requested Changes (Diff)

### Add
- `src/frontend/src/workers/pdf.worker.ts` — a Web Worker that handles heavy PDF operations (merge, split, compress, rotate, crop, flatten) off the main thread using pdf-lib
- `rollupOptions.output.manualChunks` in vite.config.js to split pdf-lib and pdfjs-dist into separate cached vendor chunks

### Modify
- `src/frontend/src/i18n/lang/hi.ts` — fix `myfiles.noFiles` typo: "fail" → "file"
- `src/frontend/vite.config.js` — set `minify: 'esbuild'` (was `false`), add manualChunks for pdf-lib and pdfjs-dist vendor splitting
- Heavy PDF tool components — offload pdf-lib operations to the Web Worker where feasible (MergePDFTool, SplitPDFTool, CompressPDFTool, RotatePDFTool, CropPDFTool, FlattenPDFTool)

### Remove
- Nothing

## Implementation Plan
1. Fix the single-word typo in `hi.ts` (`myfiles.noFiles`)
2. Enable minification in `vite.config.js` and add manualChunks for vendor splitting
3. Create `src/frontend/src/workers/pdf.worker.ts` that accepts messages for each PDF operation (merge, split, compress, rotate, crop, flatten) and posts back the result Uint8Array
4. Update the 6 heavy tool components to post operations to the worker instead of running pdf-lib on the main thread; keep a graceful fallback if the worker fails
5. Keep pdfjs-dist (PDF.js) inline in the tools that use it for rendering previews — only offload pdf-lib write operations to the worker
