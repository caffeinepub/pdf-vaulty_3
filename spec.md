# PDF Vaulty

## Current State
PDF Vaulty is a full-stack PDF toolkit running on the Internet Computer. It has 9 tools:
- Merge PDF, Split PDF, Compress PDF, Image to PDF, PDF to Word, Word to PDF, Excel to PDF, Rotate PDF, Password Protect PDF

The `ToolId` union type in `App.tsx` lists those tools. `Dashboard.tsx` renders a card grid of tools. `ToolPage.tsx` routes to the correct tool component. The backend (`main.mo`) manages user profiles and per-user file storage.

Tools that are NOT yet present:
- PDF to Excel
- PDF to Image (JPG/PNG)
- Add Page Numbers to PDF
- Add Watermark to PDF

## Requested Changes (Diff)

### Add
- `PDFToExcelTool.tsx` — allows user to upload a PDF and download a simulated Excel (.xlsx) output using the SheetJS (`xlsx`) library, converting text extracted from the PDF into a spreadsheet
- `PDFToImageTool.tsx` — allows user to upload a PDF, choose output format (JPG or PNG), and download each page as an image using PDF.js (pdfjs-dist) to render each page to a canvas, then export as the chosen image format
- `AddPageNumbersTool.tsx` — allows user to upload a PDF, choose position (bottom-center, bottom-right, bottom-left, top-center), choose starting number, and download the PDF with page numbers stamped using pdf-lib
- `AddWatermarkTool.tsx` — allows user to upload a PDF, enter watermark text, choose opacity (low/medium/high), choose position (diagonal/center/top), and download the watermarked PDF using pdf-lib

Four new ToolId values: `'pdf-to-excel'`, `'pdf-to-image'`, `'add-page-numbers'`, `'add-watermark'`

### Modify
- `App.tsx` — add the four new ToolId values to the union type
- `Dashboard.tsx` — add four new tool cards in the grid for PDF to Excel, PDF to Image, Add Page Numbers, Add Watermark
- `ToolPage.tsx` — import and route to the four new tool components; add entries to toolTitles

### Remove
- Nothing removed

## Implementation Plan
1. Create `PDFToExcelTool.tsx` using pdfjs-dist for text extraction and SheetJS (xlsx) for generating the Excel file
2. Create `PDFToImageTool.tsx` using pdfjs-dist to render PDF pages to canvas and export as JPG/PNG
3. Create `AddPageNumbersTool.tsx` using pdf-lib to stamp page numbers at a chosen position on each page
4. Create `AddWatermarkTool.tsx` using pdf-lib to stamp diagonal/centered/top watermark text with configurable opacity
5. Update `App.tsx` ToolId type with the 4 new values
6. Update `Dashboard.tsx` with 4 new tool cards
7. Update `ToolPage.tsx` to import and route to the 4 new components
8. Ensure pdfjs-dist, pdf-lib, and xlsx packages are already available (they should be from prior builds) — add to package.json if needed
