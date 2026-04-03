# PDF Vaulty

## Current State
- 15 tools across 4 categories (Edit, Convert, Protect, Optimize)
- All tools single-file: one PDF in, one PDF out
- ToolId type in App.tsx: merge, split, compress, image-to-pdf, pdf-to-word, word-to-pdf, excel-to-pdf, rotate, password-protect, pdf-converter, add-page-numbers, add-watermark, crop-pdf, flatten-pdf, extract-text
- Dashboard.tsx has tabs (All, Edit, Convert, Protect, Optimize), pinned tools, search, session history
- ToolPage.tsx handles tool rendering with share, size warning, save banner
- pdf-lib available (src/frontend/src/types/pdf-lib.d.ts)
- JSZip available (src/frontend/src/types/jszip.d.ts)

## Requested Changes (Diff)

### Add
1. PDF Metadata Editor tool (PDFMetadataTool.tsx) - ToolId: edit-metadata, category: Edit
2. Batch Compress tool (BatchCompressTool.tsx) - ToolId: batch-compress, category: Optimize

### Modify
1. App.tsx - Add edit-metadata and batch-compress to ToolId union
2. Dashboard.tsx - Add both tools to allTools array
3. ToolPage.tsx - Add lazy imports, toolMeta, faqSchema, renderTool switch cases

### Remove
- Nothing

## Implementation Plan
1. Create PDFMetadataTool.tsx - reads/edits PDF metadata fields, downloads updated PDF
2. Create BatchCompressTool.tsx - multi-file upload, per-file status, ZIP download
3. Update App.tsx ToolId
4. Update Dashboard.tsx allTools
5. Update ToolPage.tsx
