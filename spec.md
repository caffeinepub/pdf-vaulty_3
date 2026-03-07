# PDF Vaulty

## Current State
The app requires users to log in before accessing anything. `App.tsx` renders `<LoginPage />` for all unauthenticated users (lines 82–88), blocking access to the dashboard and all PDF tools. The app's own copy says login is only needed for "My Files", but the code enforces login universally. There is no guest-friendly flow.

## Requested Changes (Diff)

### Add
- A one-time "Save to My Files" banner/toast shown to guest users **after** a PDF conversion completes — displayed only once per browser session (stored in `sessionStorage`). The banner invites the user to log in to save their file, with a login button. It never appears again during the same session, even if they use multiple tools.

### Modify
- `App.tsx`: Remove the login gate. Unauthenticated users should see the Dashboard and can use all tools freely. Only navigating to "My Files" or "Analytics" should redirect to the login page.
- `App.tsx`: Pass `isAuthenticated` down to `ToolPage` so tools can trigger the one-time save recommendation after conversion.
- `ToolPage.tsx`: Accept `isAuthenticated` and an `onRequestLogin` callback prop. After a successful conversion (download), show the one-time save recommendation banner if the user is not authenticated and the session flag has not been set.
- The `LoginPage` remains accessible for direct navigation but is no longer shown as a full-page gate on first load.

### Remove
- Nothing is removed from existing features. The login page remains as a reachable page (when user clicks Login from header or is redirected from My Files).

## Implementation Plan
1. In `App.tsx`, change `renderContent()` so unauthenticated users see the `Dashboard` (not `LoginPage`). Only redirect to `LoginPage` when `activeView === "myFiles"` or `"analytics"` and user is not authenticated.
2. Pass `isAuthenticated` and a `handleRequestLogin` callback (which sets `activeView` to a login state or triggers `login()`) into `ToolPage`.
3. In `ToolPage.tsx`, after a tool signals conversion complete, check: is guest? has the session flag `pdfvaulty_save_prompt_shown` been set in `sessionStorage`? If not, display a dismissible inline banner prompting login, then set the flag so it never shows again this session.
4. The banner should be subtle — a small card below the download button, not a modal. It should have a "Log in to save" button and an "X" dismiss. Once dismissed or after login is initiated, set the sessionStorage flag.
