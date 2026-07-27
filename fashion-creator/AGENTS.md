<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Scope of this project

Frontend-first build of the "Fashion Creator" AI fashion content commerce
platform, driven by the spec docs in `../패션크리에이터/` (architecture docs
in `FashionCreator-Architecture/`, task specs in `task-001-fashion-creator-foundation.md`
through `task-010-fashion-creator-marketplace/`). Task-001 through Task-010
(all sub-tasks) are implemented as a Phase 1 DEMO prototype — no real AI
generation, payments, escrow, auth, or backend yet (see `src/lib/app-mode.ts`
and each feature's "DEMO"/"예시" labeling). State that would normally live in
a database persists client-side via `src/lib/local-store.ts`
(localStorage + `useSyncExternalStore`), used by `model-store.ts`,
`studio-store.ts`, `content-store.ts`, `cart-store.ts`, `commerce-events.ts`,
and `marketplace-store.ts`. See the task docs before adding a feature so
scope matches what's specified.
