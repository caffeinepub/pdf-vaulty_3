# Specification

## Summary
**Goal:** Add a "High Compression" mode to the Compress PDF tool, giving users a choice between Standard and High compression levels.

**Planned changes:**
- Add two selectable compression level options to the Compress PDF tool UI: "Standard" (existing behavior) and "High"
- When "High" is selected, apply more aggressive image downsampling (max 72 DPI equivalent, JPEG quality 0.4–0.5), strip all PDF metadata fields, and save with `useObjectStreams: true`
- Apply `useObjectStreams: true` to Standard mode as well
- Display the selected compression level label in the UI
- After processing, show original file size, compressed file size, and percentage reduction
- If the compressed file is not smaller than the original, show a message informing the user the file could not be reduced further
- Ensure the Download button is available after processing for both compression levels
- Ensure UI works correctly in both dark and light modes

**User-visible outcome:** Users can now choose between Standard and High compression when compressing a PDF. After processing, they see a before/after file size comparison and percentage reduction, and can download the compressed file regardless of which mode was selected.
