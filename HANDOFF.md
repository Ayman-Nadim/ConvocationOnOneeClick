# Project Handoff Notes — ConvocationOnOneeClick

_Last updated: 2026-07-20_

## What this project is

A French/Arabic legal-tech web app ("IDP Juridique") for a Moroccan real-estate
court expert (بوطيب سهام / Boutayeb Siham). Flow:

1. Import a scanned/PDF Moroccan court judgment ("arrêt").
2. AI (Google Gemini 2.5 Flash via OpenRouter) extracts parties, lawyers,
   tribunal, and case number from the document.
3. Generate one print-ready, Arabic RTL "convocation" (expert summons letter)
   per recipient — hence "One Click".

Bootstrapped/maintained via Lovable.dev (see `.lovable/project.json`).

## Tech stack

- TanStack Start (React 19 + TanStack Router/Query, file-based routing)
- Vite 7, TypeScript, Tailwind CSS v4
- shadcn/ui + Radix primitives
- Tiptap (rich text editor for templates)
- pdfjs-dist (PDF → image), html2pdf.js (PDF export)
- sonner (toasts)
- OpenRouter REST API called directly (model `google/gemini-2.5-flash`) —
  not via the `ai`/`openai` SDKs despite them being deps
- Not Electron. Runs as a Vite/Nitro server app. `bunfig.toml` present as an
  alternative runtime/package manager option.
- `package.json` name is still the generic scaffold name `tanstack_start_ts`.

## Key files

- `src/routes/index.tsx` — the whole single-page app flow: Landing → 3-step
  Stepper (Import/Analyze → Validate → Preview/Print).
- `src/components/ConvocationSheet.tsx` — the printable A4 convocation sheet
  (RTL, Amiri/Noto Naskh fonts). `ConvocationData` = `{nom_destinataire,
  adresse_destinataire, numero_dossier, date_decision, tribunal?}`. Also takes
  `bodyHtml` (rendered template HTML via `dangerouslySetInnerHTML`),
  `mission` (list of بند items), `sousTitre`, `pageNumber`/`totalPages`. Fixed
  A4 print sizing: 210mm×297mm, 18mm/20mm padding. This file has been the
  focus of the last two commits (header alignment, layout rework).
- `src/components/TemplateManager.tsx`, `src/lib/templates.ts` — CRUD for
  letter templates in `localStorage` (`convocation_templates_v1`),
  `{{placeholder}}` templating via `renderTemplate`.
- `src/components/RichTextEditor.tsx` — Tiptap editor for template body.
- `src/lib/extract.functions.ts` — server function `extractDocument` calling
  OpenRouter/Gemini with a structured-JSON prompt for Moroccan judgments.
- `src/lib/ai-gateway.server.ts`, `config.server.ts`, `error-capture.ts`,
  `error-page.ts`, `lovable-error-reporting.ts` — Lovable scaffolding/infra,
  mostly boilerplate, low priority for changes.
- `src/components/ui/*` — full shadcn/ui component set.
- `src/routes/routeTree.gen.ts` — **auto-generated, never hand-edit** (per
  `src/routes/README.md`). New pages must live under `src/routes/`.

## Run / build

- `npm run dev` → `vite dev`
- `npm run build` → `vite build`
- `npm run preview`
- `npm run lint` → `eslint .`
- format: `prettier --write .`
- `.env` holds `OPENROUTER_API_KEY` (not committed)

## Project state as of last check

- Git history is short: `4f9d2cf` Initial commit → `fa9e9b1` refactor
  ConvocationSheet layout/header alignment → `bb1c5b3` "Mise à jour" (151-line
  rework of ConvocationSheet + minor `index.tsx`/`styles.css` tweaks).
- Very early-stage, single contributor.
- Working tree was clean except `package-lock.json` showing as modified
  (untracked diff, likely a local `npm install` lockfile churn — no visible
  dependency version changes reviewed yet).
- No automated tests exist in the repo.
- No TODO comments found in source.
- No root `README.md` or `CLAUDE.md`. Only doc is
  `src/routes/README.md` (TanStack Start routing conventions).

## Open items / things to check next session

- Confirm whether the `package-lock.json` diff is intentional/safe to commit.
- No test suite — any future feature work should consider manual verification
  via `npm run dev` + browser (RTL/print layout is easy to visually regress).
- Consider renaming `package.json`'s `name` field away from the scaffold
  default `tanstack_start_ts` if that matters for deployment/branding.
