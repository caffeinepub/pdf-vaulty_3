# PDF Vaulty

## Current State
- Full-stack PDF toolkit with 12 tools: Merge, Split, Compress, Image to PDF, PDF to Word, Word to PDF, Excel to PDF, Rotate, Password Protect, PDF Converter, Add Page Numbers, Add Watermark
- Multi-language support (EN, AR, FR, ES, HI, PT) with RTL for Arabic
- Internet Identity login with per-user private file storage (My Files)
- Dark/light theme toggle
- Analytics page exists but shows hardcoded zeros — no real tracking
- Header shows hardcoded "1 views" text — never updates
- Orphaned tool files in components/tools/: PDFToExcelTool.tsx, PDFToImageTool.tsx, PowerPointToPDFTool.tsx (never imported or used)
- Analytics and My Files nav buttons are disabled for guests with no explanation tooltip
- ToolPage already has one-time save banner logic and login gate removed from the app router — but the App.tsx router previously had an issue forcing login; currently the code looks correct (only myFiles/analytics redirect to login)
- Performance is sub-optimal: mobile ~63, desktop ~64 due to render-blocking and large bundles
- All pages are already lazy-loaded via React.lazy in App.tsx
- Backend has real file storage (saveFile, getMyFiles, deleteFile) but no analytics tracking endpoints

## Requested Changes (Diff)

### Add
- Real analytics tracking: use localStorage to persist per-user tool usage counts (totalOperations, filesProcessed, toolsUsed map keyed by toolId) — since backend has no analytics endpoint, use localStorage with a custom hook `useAnalytics`
- `useAnalytics` hook: exports `trackToolUse(toolId)` and `getAnalytics()` functions, reads/writes from localStorage key `pdfvaulty_analytics`
- Wire `trackToolUse` into ToolPage so every time a tool download completes (or tool is used), it records the event
- AnalyticsPage: read real data from `useAnalytics` hook and display live counts
- Tooltip wrapper on disabled Analytics and My Files nav buttons: show "Login required" tooltip on hover for guest users
- Performance: move tool component imports in ToolPage.tsx from static imports to dynamic `React.lazy` imports inside `renderTool()`, so each PDF tool only loads when opened

### Modify
- Header.tsx: remove the hardcoded "1 views" / Eye icon block entirely (lines 155–158)
- ToolPage.tsx: replace 12 static tool imports at the top with lazy dynamic imports; pass `trackToolUse` call into tool download events
- AnalyticsPage.tsx: replace all hardcoded `0` values with real data from `useAnalytics` hook
- Header.tsx: wrap disabled Analytics and My Files buttons with a tooltip that says "Login required to access"

### Remove
- `frontend/src/components/tools/PDFToExcelTool.tsx` — orphaned, never used
- `frontend/src/components/tools/PDFToImageTool.tsx` — orphaned, never used
- `frontend/src/components/tools/PowerPointToPDFTool.tsx` — orphaned, never used

## Implementation Plan
1. Create `frontend/src/hooks/useAnalytics.ts` — localStorage-based analytics hook with `trackToolUse(toolId)` and `getAnalytics()` returning `{ totalOperations, filesProcessed, byTool: Record<ToolId, number> }`
2. Update `ToolPage.tsx`:
   - Replace 12 static tool imports with React.lazy dynamic imports (each tool loads only when needed)
   - Accept optional `onToolUsed?: (toolId: ToolId) => void` prop or call `trackToolUse` directly on download detection
3. Update `App.tsx`: pass `trackToolUse` from `useAnalytics` down to `ToolPage` via prop
4. Update `AnalyticsPage.tsx`: call `getAnalytics()` from hook, show real counts in stat cards and per-tool breakdown bars
5. Update `Header.tsx`:
   - Remove hardcoded "1 views" Eye icon block
   - Wrap disabled Analytics and My Files buttons with a Tooltip component showing "Login required"
6. Delete orphaned files: PDFToExcelTool.tsx, PDFToImageTool.tsx, PowerPointToPDFTool.tsx
7. Validate: typecheck, lint, build
