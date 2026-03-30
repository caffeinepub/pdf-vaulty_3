# PDF Vaulty

## Current State
Version 66 is live. The app has a header with logo, language switcher, and theme toggle. Individual tool pages have a "Share this tool" button, but there is no way to share the overall app from the main dashboard.

## Requested Changes (Diff)

### Add
- A "Share" button in the header (visible to all users, guests and logged-in)
- Clicking it triggers the Web Share API on mobile (native share sheet for WhatsApp, Messages, etc.) with a fallback to copying the link on desktop
- Share content: title "PDF Vaulty", text "Free PDF tools that work in your browser", url "https://pdfvaulty-dqb.caffeine.xyz"

### Modify
- Header.tsx: add the share button next to the existing controls

### Remove
- Nothing

## Implementation Plan
1. Add a share button icon (Share2 from lucide-react) to Header.tsx
2. On click: if `navigator.share` is available, call it with title/text/url; otherwise copy the URL to clipboard and show a brief toast
3. Button visible to all users
