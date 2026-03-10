# PDF Vaulty

## Current State

- Full-stack PDF toolkit on Internet Computer with Motoko backend and React/TypeScript frontend.
- 12 PDF tools, all lazy-loaded per tool component.
- Authentication via Internet Identity; tools accessible to guests; My Files and Analytics require login.
- Backend supports: saveFile (with ExternalBlob actual bytes), getMyFiles, deleteFile, renameFile, saveAnalytics, getMyAnalytics.
- Frontend: lazy lang loading (only active language loaded), analytics synced to backend, file delete/rename/search/viewer all present in MyFilesPage.
- Save-to-My-Files one-time guest banner present in ToolPage.
- Mobile bottom nav with lock icons for guests.
- Tooltips on disabled nav buttons.
- `vite.config.js` has `minify: false` — JS/CSS shipped completely uncompressed (critical performance bug).
- No manual chunk splitting in vite config.
- Layout shifts detected (CLS 0.132) from tool cards on Dashboard.
- No structured data (JSON-LD) on individual tool pages.
- No per-tool processing/loading indicator while PDF operation is in progress.
- Speed Index 9.3s mobile, TBT 1200ms mobile.

## Requested Changes (Diff)

### Add
- JSON-LD structured data (SoftwareApplication schema) on each tool page for better SEO rich results.
- Processing/loading overlay or spinner in ToolPage while a tool is actively processing a PDF (listen for a processing state from tool context or show a subtle indicator).
- Preconnect resource hints in index.html for blob.caffeine.ai and identity.internetcomputer.org.
- Manual chunk splitting in vite.config.js to separate vendor libraries into cacheable chunks.

### Modify
- `vite.config.js`: change `minify: false` to `minify: 'esbuild'` and add `cssMinify: true` (CRITICAL — biggest single performance win).
- `vite.config.js`: add `build.rollupOptions.output.manualChunks` to split pdf-lib, pdfjs, jspdf, xlsx, jszip into separate vendor chunks.
- `Dashboard.tsx`: add explicit `height` constraint to tool card grid items to reduce layout shift (ensure icon boxes and card content have fixed/explicit dimensions).
- `ToolPage.tsx`: inject JSON-LD `<script type="application/ld+json">` into document head dynamically per tool.
- `index.html`: add `<link rel="preconnect">` for key external domains.

### Remove
- Nothing removed.

## Implementation Plan

1. **vite.config.js** — Enable `minify: 'esbuild'`, `cssMinify: true`, add manualChunks splitting pdf-lib/pdfjs-dist/jspdf/xlsx/jszip into `vendor-pdf` chunk and react/react-dom/tanstack into `vendor-react` chunk.
2. **index.html** — Add `<link rel="preconnect" href="https://blob.caffeine.ai">` and `<link rel="preconnect" href="https://identity.internetcomputer.org">`.
3. **ToolPage.tsx** — On tool mount, inject a `<script type="application/ld+json">` tag into `<head>` with SoftwareApplication schema per tool (name, description, applicationCategory: "UtilityApplication"). Remove on unmount.
4. **Dashboard.tsx** — Add `will-change: auto` and explicit `min-h` with `h-full` to tool cards; ensure icon boxes use `w-12 h-12 flex-shrink-0` consistently to prevent layout shift.
5. **ToolPage.tsx** — Expose a `ProcessingContext` or use a simpler approach: add a `data-processing` attribute wrapper that tools can signal; alternatively add a subtle fixed bottom toast-style indicator when file operations are underway (detect via click + timeout pattern similar to existing download detection).
