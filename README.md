# Fidelis

> Tax AI for the advisor's chair.

Fidelis is an opinionated tax copilot built for licensed financial advisors.
Every number is produced by a deterministic tool. Every claim is tied to a
source. When it doesn't know, it says so.

It ships as a base agent you can drop into an advisor platform, plus a set
of advisor-facing surfaces (scenarios, document intake, PDF memos, audit log)
built on the same tools.

**LYRA Atlas** (holdings, Hub, Passport network, service catalog) lives in the same repo. **`AGENTS.md`** and **`CLAUDE.md`** describe Sigma workflow, current interface batch focus, and **handoff tasks** (e.g. Vercel `LYRA_MP_*` env vars) that sandbox agents cannot complete. **`docs/lyra/README.md`** indexes Lyra-specific docs.

**Monolith, not micro-frontends:** Marea (Herdia × Lyra hospitality surface),
Fidelis (tax intelligence), agent, residency tracker, scenarios, and APIs all
ship from this Astro app — **one repository** and **one deployable unit**. The
tracker and agent share trip data via *Journal → client* on `/agent` or the
tracker’s *Agent workspace* card.

This repo is the canonical place to merge **`Josekpapa/herdia-lyra`** (formerly
a static `index.html` only): Marea is served from **`/marea.html`**, Fidelis
editorial from **`/fidelis`**, and **`/`** redirects to Marea. Connect Vercel
to this repository and use **`npm run build`** (runs the Hub deploy manifest writer, then `astro build` — see `package.json`).

---

## Product surfaces

| Route            | What it is                                                                             |
| ---------------- | -------------------------------------------------------------------------------------- |
| `/`              | Redirects to **`/marea.html`** (Herdia × Lyra · Marea).                                |
| `/marea.html`    | Full-screen Marea experience (travel / partner / onboarding). Portal CTAs: tax → `/agent`, travel partner → `/tracker` (interim). |
| `/fidelis`       | Fidelis editorial landing (chapters, tools, motion).                                   |
| `/agent`         | The AI workspace: per-client chat, tool calls, citations, usage, drafts.               |
| `/scenarios`     | Side-by-side tax scenarios (Roth vs. no-Roth, NY vs. FL, S-corp vs. Sole-prop).        |
| `/intake`        | Document intake — W-2 / 1099 / 1040 vision parse, diff, and merge into client profile. |
| `/tracker`       | Residency day-tracker: 183-rule, US SPT, state domicile.                               |
| `/memo/[id]`     | Branded, print-ready PDF memo of any conversation.                                     |
| `/audit`         | Firm-scoped compliance log: every turn, tokens, tool latency, cost.                    |
| `/login`, `/signup`, `/team` | Multi-tenant auth (opt-in via `FIDELIS_AUTH=1`).                           |
| `/hub`, `/hub/services`, `/hub/batches` | LYRA operator console, service catalog JSON, interface batch roadmap. |
| `/passport`, `/core/*`      | Passport identity + Core rails (Memory, Grammar, Gateway, Billing).      |

### Under the hood

- **Agent** — Groq (`llama-3.3-70b-versatile`) or OpenAI (`gpt-4o-mini`) with
  streaming NDJSON, up to five tool rounds per turn, `include_usage` token
  accounting. Provider picked automatically: `GROQ_API_KEY` wins if set,
  otherwise falls back to `OPENAI_API_KEY`.
- **Tools** — Ten deterministic TypeScript calculators (federal brackets,
  state tax, AMT, NIIT, QBI, SE, residency/SPT, LTCG, Roth ladder, entity
  comparison). Zod-validated args.
- **RAG** — `text-embedding-3-small` over an in-repo knowledge base of
  IRS/state-tax snippets (OpenAI only). Groq has no embeddings endpoint,
  so the knowledge base auto-falls-back to keyword search when running on
  Groq — the agent still cites sources.
- **Vision intake** — Groq (`llama-4-scout-17b`) or OpenAI (`gpt-4o-mini`)
  structured extraction on uploaded forms.
- **Persistence** — `localStorage` for advisor clients & conversations
  (server-light MVP); SQLite + scrypt for auth.
- **Stack** — Astro 6 (SSR) · React 19 · Tailwind 4 · TypeScript · Zod.

---

## Local dev

Requires **Node.js 22.12+** (Astro 6; `engines` in `package.json` matches this).

```sh
npm install
cp .env.example .env
# edit .env and set GROQ_API_KEY (preferred) or OPENAI_API_KEY
npm run dev
```

Open <http://localhost:4321>.

Without an API key, everything still renders — `/api/chat` and `/api/intake`
return 503 with a clear message, and the knowledge base falls back to
keyword search.

### Optional: enable auth

```sh
FIDELIS_AUTH=1 npm run dev
```

Then visit `/signup` to create the first firm + admin user. User/session data
goes to `./data/fidelis.sqlite`.

---

## Deploy

### GitHub + Vercel (one production site)

1. Push this repo to GitHub (you already have a single codebase; no merging of
   separate repos required).
2. In [Vercel](https://vercel.com/new), **Import** that repository. Set **Build command** to **`npm run build`** (manifest + Astro). Output follows the Astro adapter defaults.
   The `engines.node` field in `package.json` selects **Node 22** on Vercel so
   it matches Astro’s requirement.
3. Add environment variables (see below), then deploy. Every route (`/`,
   `/agent`, `/tracker`, `/api/*`, …) is served from **one** project URL.

CLI alternative (link the local folder to a Vercel project, then deploy):

```sh
vercel link
vercel --prod
```

### Vercel (recommended for showcase)

The Astro config auto-detects Vercel via `process.env.VERCEL` and uses
`@astrojs/vercel` (serverless mode). No extra `vercel.json` needed.

```sh
vercel --prod
```

Required environment variables on Vercel (set exactly one key):

- `GROQ_API_KEY` — preferred. Enables chat, tool calling, vision intake.
  RAG falls back to keyword search (Groq has no embeddings endpoint).
- `OPENAI_API_KEY` — fallback. Enables the above **plus** true semantic RAG
  over the knowledge base.

**LYRA Hub / marketplace (optional, separate from LLM keys):**

- `LYRA_MP_<HOLDING>_<AGENT>` — Vercel Marketplace listing id per GA SKU. Table: `docs/lyra/runbooks/vercel-ga-env.md`.
- `PUBLIC_HUB_CRM_URL` — only if wiring Hub CRM (otherwise leave unset).
- `LYRA_LAST_DEPLOY_AT` / `LYRA_DEPLOY_REVISION` — optional global deploy fallback for `/api/hub/surface` if you bypass the baked manifest.

Optional (LLM):

- `LLM_MODEL` — override chat/tool model. Defaults: Groq →
  `llama-3.3-70b-versatile`, OpenAI → `gpt-4o-mini`.
- `LLM_VISION_MODEL` — override vision model for intake.
- `FIDELIS_AUTH` — leave unset (or `0`) on Vercel; SQLite is not persisted
  across serverless invocations.

### Self-hosted Node

```sh
npm run build
npm start    # node ./dist/server/entry.mjs
```

A standalone Node server binds to `HOST:PORT` (default `0.0.0.0:4321`).
Point your reverse proxy / container orchestrator at it.

---

## Repo layout

```
src/
├── components/        React + Astro UI (agent, intake, scenarios, memo, landing)
├── layouts/           Shared Astro layout (Dashboard)
├── lib/
│   ├── advisor/       Tools, RAG, audit, tax planning, embeddings
│   └── auth/          SQLite + session + password scaffolding
├── pages/             Routes: /, /agent, /scenarios, /intake, /tracker, /memo/[id], /audit, /login, /signup, /team
│   └── api/           /api/chat, /api/compute, /api/intake, /api/auth/*
├── middleware.ts      Optional auth gate (opt-in via FIDELIS_AUTH=1)
└── styles/global.css  Design tokens, Tailwind base, motion system
```

---

## Scripts

| Command         | Action                                       |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Dev server on <http://localhost:4321>        |
| `npm run build` | Production build to `./dist/`                |
| `npm start`     | Run built server (Node standalone)           |
| `npm run preview` | Preview the build (uses the active adapter) |

---

## Disclaimer

Fidelis is an educational / analytical tool built to run under advisor
supervision. Outputs are not tax, legal, or investment advice. Every number
must be verified against current IRS and state guidance before acting on it.
