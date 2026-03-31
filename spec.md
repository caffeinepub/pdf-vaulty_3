# PDF Vaulty

## Current State
Dashboard.tsx has two separate rendering paths:
- **Mobile** (`sm:hidden`): category tabs (All, Edit, Convert, Protect, Optimize) using `mobileTab` state
- **Desktop** (`hidden sm:block`): static category sections with heading labels and no tab switching

Both share the same tool data and pinned/search logic.

## Requested Changes (Diff)

### Add
- Desktop now also renders the same tab bar (All, Edit, Convert, Protect, Optimize) above the tool grid
- Desktop tab bar uses the same pill button style as mobile

### Modify
- Unify `mobileTab` state into a single `activeTab` state shared by both mobile and desktop
- Unify `mobileTabTools` into `activeTabTools` used by both
- Remove the separate `sm:hidden` / `hidden sm:block` split for the tab+grid section; both use the same tab UI
- Desktop grid stays 2-column (`grid-cols-2`); mobile grid stays 1-column (`grid-cols-1 sm:grid-cols-2`)
- Replace the desktop static category section headings with the unified tab navigation

### Remove
- The separate `hidden sm:block` desktop block with category section headings
- The separate `sm:hidden` mobile block (merged into a single unified block)

## Implementation Plan
1. Rename `mobileTab` → `activeTab`, `setMobileTab` → `setActiveTab`
2. Rename `mobileTabTools` → `activeTabTools`
3. Replace the dual mobile/desktop rendering blocks with a single unified block that shows:
   - The tab bar (All, Edit, Convert, Protect, Optimize) on both mobile and desktop
   - A tool grid below it: `grid-cols-1 sm:grid-cols-2` (mobile 1-col, desktop 2-col)
4. Keep search results, pinned tools section, session history, hero, FAQ, and all other sections unchanged
5. The tab bar itself: same pill button style, horizontal scroll on mobile, wraps or fits inline on desktop
