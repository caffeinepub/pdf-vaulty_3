# PDF Vaulty

## Current State
The app has two separate tools on the dashboard:
- **PDF to Excel** (`pdf-to-excel`) — converts PDF text content to an XLSX spreadsheet
- **PDF to Image** (`pdf-to-image`) — exports PDF pages as JPG or PNG images

Each has its own card on the dashboard and its own route/ToolId.

## Requested Changes (Diff)

### Add
- New combined tool component `PDFConverterTool.tsx` that merges PDF to Excel and PDF to Image into one tool
- A format selector toggle at the top: "Excel", "JPG", "PNG"
- Based on selection, run the corresponding conversion logic
- New ToolId `pdf-converter` in App.tsx

### Modify
- `Dashboard.tsx` — replace the two separate cards (PDF to Excel, PDF to Image) with a single "PDF Converter" card
- `ToolPage.tsx` — add case for `pdf-converter` → render `PDFConverterTool`, remove separate cases for `pdf-to-excel` and `pdf-to-image`
- `App.tsx` — remove `pdf-to-excel` and `pdf-to-image` from ToolId union type, add `pdf-converter`

### Remove
- Remove `PDFToExcelTool.tsx` and `PDFToImageTool.tsx` component files (logic merged into new combined tool)
- Remove `pdf-to-excel` and `pdf-to-image` tool entries from dashboard and routing

## Implementation Plan
1. Create `src/frontend/src/components/tools/PDFConverterTool.tsx` combining both tools with a 3-way format toggle (Excel / JPG / PNG)
2. Update `App.tsx` ToolId type — remove `pdf-to-excel`, `pdf-to-image`, add `pdf-converter`
3. Update `Dashboard.tsx` — replace two tool entries with one `pdf-converter` entry
4. Update `ToolPage.tsx` — add `pdf-converter` case, remove `pdf-to-excel` and `pdf-to-image` cases and imports
