# Vercel Services proposal — Brutalist-Forge

Status: **review only**. These changes do not merge, link a different repository to a Vercel project, or deploy.

## Services and public routing

| Name | Root | Type | Public path |
| --- | --- | --- | --- |
| `app` | `.` | Vite static React app | `/` and all unmatched paths |
| `mockup-sandbox` | `artifacts/mockup-sandbox` | Vite static React preview gallery | **none; internal** |

The main app outputs `dist/public` (from the root Vite config). The root `npm run build` also bundles an Express server into `dist/index.cjs`; the `app` service deliberately uses `npx vite build` instead, because this phase deploys the Vite frontend only. The Express scaffold (`server/index.ts`) listens on a port, and `server/routes.ts` currently registers no API endpoints. It is **not deployed** by this change. A real API would need a separately validated Vercel service/runtime or Functions entrypoint and its routing contract.

The sandbox builds to its own `dist`. Its Vite config previously required `PORT` and `BASE_PATH` unconditionally, even during a build. Both now have defaults (5173 and /) so a Vercel build does not require Replit-specific variables. Existing explicit environment values still win.

Each Vite service has a local SPA fallback to `/index.html`. The public catch-all targets only `app`.

## Bindings

**None.** Review of the app, existing Express route scaffold, React query client, sandbox entrypoint, and Vite configs did not identify a server-side request from one defined service to another. Both defined services are static browser applications. Browser-to-service requests do not use Vercel runtime service bindings, so inventing `MOCKUP_SANDBOX_URL` on the static `app` would not work. If a server-side caller is added later, declare its binding on that caller and read the Vercel-injected URL at function runtime; do not set the injected variable manually.

## Prerequisite: correct linked repository

As inspected November 20, 2026, the Vercel project named `brutalist-forge` on team `melodicbloom` links to `qt314wink/Brutalist-Forge-Blog`, while this branch belongs to `qt314wink/Brutalist-Forge`. Confirm whether to re-link the existing project or create a distinct project before deploying. No Vercel project changes are included.

## Pending confirmations

1. Service names `app` and `mockup-sandbox`.
2. Whether the sandbox should remain internal, be publicly exposed under e.g. `/mockups`, or have its own subdomain.
3. Whether any server-side service will need to call another (currently no bindings).
4. Which GitHub repo the Vercel `brutalist-forge` project should deploy from.
5. Whether the Express API will be a separate deployment service in a later change.

Do **not** expose the sandbox under a prefix without also updating the Vite `base` (via a build-time value or an explicit configuration default), preview routes, and service routing, then testing static assets and deep links. Vercel service bindings do not resolve at build time.

## Verification checklist (not run against Vercel)

- Root: `npm ci && npx vite build` produces `dist/public/index.html`.
- Sandbox: `cd artifacts/mockup-sandbox && npm ci && npm run build` produces `dist/index.html` without `PORT` or `BASE_PATH`.
- `vercel dev --local`: verify root page, root SPA deep link and assets, and that `/mockups` is **not** routed to the sandbox while internal.
- After repository link confirmation: use a preview deployment to verify both service builds, output directories and any desired additional route.
- Run `npm run check` and `npm run typecheck` independently; these may reveal pre-existing type issues unrelated to Vercel routing.
