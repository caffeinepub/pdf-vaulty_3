# PDF Vaulty

## Current State
- Full PDF toolkit with 14 tools, categorized dashboard, search, pinned tools
- LanguageContext already lazy-loads non-English files (Task 3 already done)
- ToolPage has share, file size warning, save banner, analytics tracking on download

## Requested Changes (Diff)

### Add
- PDF Text Extractor tool (id: extract-text): upload PDF, extract all readable text using pdfjs-dist, copy to clipboard
- Session download history panel: on dashboard, shows last 5 tools used this session (sessionStorage), above FAQ

### Modify
- App.tsx: add "extract-text" to ToolId
- Dashboard.tsx: add extract-text to Convert category; add SessionHistory panel above FAQ
- ToolPage.tsx: add lazy import + case + meta + faq for extract-text; write session history entry on download
- en.ts: add tool.extractText.label, tool.extractText.desc, history.heading keys

### Remove
- Nothing

## Implementation Plan
1. Create ExtractTextTool.tsx
2. Update App.tsx - add to ToolId
3. Update ToolPage.tsx - add tool case + session history write
4. Update Dashboard.tsx - add to Convert category + history panel
5. Update en.ts - add translation keys
