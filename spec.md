# PDF Vaulty

## Current State
The Analytics page exists as a separate route with 3 stats: Total Operations, Files Processed, Tools Used + per-tool breakdown. The Profile page has its own stats (Files Stored, Storage Used, Total Operations) + per-tool breakdown but is missing Files Processed and Tools Used. The desktop nav Header shows both an Analytics button and a Profile button. The mobile nav already correctly shows only Home, My Files, Profile.

## Requested Changes (Diff)

### Add
- "Files Processed" stat card to Profile page
- "Tools Used" stat card to Profile page

### Modify
- Header.tsx: remove `onNavigateAnalytics` prop and Analytics nav button from desktop nav
- App.tsx: remove `"analytics"` from AppView type, remove AnalyticsPage lazy import, remove analytics case from renderContent, remove `onNavigateAnalytics` prop from Header usage

### Remove
- AnalyticsPage.tsx (standalone page, now fully merged into Profile)

## Implementation Plan
1. Update ProfilePage.tsx to include Files Processed and Tools Used stats (sourced from merged analytics)
2. Update Header.tsx to remove Analytics button and its prop
3. Update App.tsx to remove analytics route and AnalyticsPage
4. Delete AnalyticsPage.tsx
