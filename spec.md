# PDF Vaulty

## Current State
- App is live at Version 56 with full PDF toolkit, multi-language support (8 languages), lazy-loaded language files, dark/light theme, Internet Identity login, My Files, Profile page with analytics, PWA support
- `vite.config.js` has `minify: false` -- keeps reverting, needs to be fixed permanently
- No onboarding for first-time visitors -- they land on a tool grid with no guidance
- No error messages when PDF operations fail -- users see nothing when something goes wrong
- Language lazy-loading is already implemented in LanguageContext.tsx (only active language loads)

## Requested Changes (Diff)

### Add
- Onboarding tour component (`OnboardingTour.tsx`): shown once to first-time visitors using localStorage flag `pdfvaulty_onboarding_done`. Simple 3-step tooltip/overlay: Step 1 highlights the tool grid ("Pick a tool to get started"), Step 2 highlights the language switcher ("Works in 8 languages"), Step 3 highlights the login/My Files ("Save your files by logging in"). Dismiss button and a "Got it" final button. Non-blocking -- user can dismiss at any time.
- Error boundary component (`PDFErrorBoundary.tsx`): wraps the tool Suspense in ToolPage.tsx. Shows a friendly error card with the message "Something went wrong processing your PDF" and a "Try again" button that resets the error state. Also add a global error toast using the existing Toaster/sonner setup.

### Modify
- `vite.config.js`: set `minify: true` and add `rollupOptions.output.manualChunks` to split pdf-lib, pdfjs-dist, xlsx, jspdf, jszip into separate cached vendor chunks
- `ToolPage.tsx`: wrap `<Suspense>` around each tool render with the new `PDFErrorBoundary`
- `Dashboard.tsx`: render `<OnboardingTour />` component after the hero section (shown only to first-time visitors)
- `en.ts` (and all 7 other language files): add onboarding translation keys

### Remove
- Nothing

## Implementation Plan
1. Fix `vite.config.js` -- set minify to true, add manualChunks for vendor libraries
2. Create `OnboardingTour.tsx` -- 3-step first-time visitor guide, localStorage-gated, dismissable
3. Create `PDFErrorBoundary.tsx` -- React error boundary with friendly error card and reset button
4. Update `ToolPage.tsx` -- wrap tool render with PDFErrorBoundary
5. Update `Dashboard.tsx` -- include OnboardingTour
6. Add onboarding translation keys to `en.ts` and all 7 other language files
