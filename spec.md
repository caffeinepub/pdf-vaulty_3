# PDF Vaulty

## Current State
- 9 PDF tools on dashboard (merge, split, compress, password-protect, rotate, image-to-pdf, pdf-converter, add-page-numbers, add-watermark)
- My Files page: upload, view, rename, search, delete files — no file sharing
- No user profile page
- No crop PDF or flatten PDF forms tools
- Backend has: saveFile, getMyFiles, deleteFile, renameFile, getCallerUserProfile, saveAnalytics, getMyAnalytics
- App.tsx ToolId union does not include crop or flatten

## Requested Changes (Diff)

### Add
- **Crop PDF tool** (`CropPDFTool.tsx`): frontend-only tool, lets user define crop margins (top/bottom/left/right in mm) and applies to all pages using pdf-lib
- **Flatten PDF Forms tool** (`FlattenPDFTool.tsx`): frontend-only tool, uses pdf-lib to flatten all form fields (making them non-editable)
- **Profile page** (`ProfilePage.tsx`): shows username, principal ID, total files stored, total storage used (sum of file sizes), and total operations from analytics
- **File sharing** in MyFilesPage: per-file share button that opens a small dialog letting user choose Public (copy direct URL) or Private (note: files are stored on blob storage with a direct URL — sharing is done by copying the blob's getDirectURL())
- New ToolIds: `"crop-pdf"` and `"flatten-pdf"` added to App.tsx union and routing
- New `AppView`: `"profile"` added to App.tsx
- Navigation: add Profile link in Header for authenticated users

### Modify
- `App.tsx`: add `crop-pdf` and `flatten-pdf` to ToolId union; add `profile` to AppView; lazy-load ProfilePage; add navigation handler; pass profile nav to Header
- `Dashboard.tsx`: add crop PDF and flatten PDF form tool cards
- `Header.tsx`: add Profile nav item for authenticated users
- `MyFilesPage.tsx`: add share button per file row that copies blob direct URL with a public/private note

### Remove
- Nothing removed

## Implementation Plan
1. Add `CropPDFTool.tsx` — file upload, crop margin inputs (top/right/bottom/left in mm), apply with pdf-lib, download result
2. Add `FlattenPDFTool.tsx` — file upload, flatten all AcroForm fields with pdf-lib, download result
3. Add `ProfilePage.tsx` — query getCallerUserProfile, getMyFiles, getMyAnalytics; display name, principal, file count, total storage, total operations
4. Update `App.tsx` — add new ToolIds, profile view, lazy imports, handlers
5. Update `Dashboard.tsx` — add crop and flatten tool cards
6. Update `Header.tsx` — add Profile nav button for authenticated users
7. Update `MyFilesPage.tsx` — add share icon per file, clicking it copies the blob getDirectURL() to clipboard with a toast confirmation
