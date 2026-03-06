# PDF Vaulty

## Current State
The app has 9 PDF tools, multi-language support (6 languages), private file storage per user, FAQ, dark/light theme, and Internet Identity login. The main performance bottleneck is 5 large CDN scripts in `index.html` that load synchronously, blocking all page rendering for ~4000ms on mobile (PageSpeed score ~39 mobile, ~63 desktop). Vite is also configured with `minify: false`.

## Requested Changes (Diff)

### Add
- Dynamic loading of PDF libraries (pdf-lib, jsPDF, pdf.js, JSZip, xlsx) inside each tool component only when the tool is actually opened/used -- not on initial page load.
- Utility module `src/utils/loadLibs.ts` with lazy-loader functions for each CDN library.

### Modify
- `index.html`: Remove all 5 synchronous CDN `<script>` tags (pdf-lib, jsPDF, xlsx, pdf.js, JSZip) and the pdf.js worker inline script. Keep only preconnect hints, structured data, and the Vite entry point.
- `vite.config.js`: Enable minification (`minify: 'esbuild'`), enable CSS code splitting, add rollup manual chunks to split vendor bundles.
- `ToolPage.tsx`: Use the lazy-loader utility to load required libraries on tool open.

### Remove
- Synchronous CDN script tags from `index.html` that cause render-blocking.

## Implementation Plan
1. Update `vite.config.js`: set `minify: 'esbuild'`, add `cssCodeSplit: true`, add rollupOptions with `output.manualChunks` to split React, ICP agent, and tool logic into separate chunks.
2. Create `src/utils/loadLibs.ts`: async functions that dynamically inject CDN scripts only when called, with caching so each library only loads once.
3. Update `index.html`: Remove all CDN `<script>` tags. Keep preconnect/dns-prefetch hints and structured data.
4. Update `ToolPage.tsx` (or the individual tool components): call `loadPdfLib()`, `loadJsPDF()`, `loadPdfJs()`, `loadJSZip()`, `loadXlsx()` as needed at the start of each operation, awaiting them before processing.
