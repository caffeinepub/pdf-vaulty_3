# Specification

## Summary
**Goal:** Remove the PowerPoint to PDF tool from the application entirely.

**Planned changes:**
- Delete or disable the `PowerPointToPDFTool.tsx` component
- Remove the PowerPoint to PDF tool card from the dashboard tool grid (`Dashboard.tsx` and `LoginPage.tsx`)
- Remove its route/case from `ToolPage.tsx`
- Remove any remaining references to it in navigation, analytics, or other files

**User-visible outcome:** The PowerPoint to PDF tool no longer appears on the dashboard or login page, and navigating to its route no longer renders the tool. All other tools continue to work normally.
