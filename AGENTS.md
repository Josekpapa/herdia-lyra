# LYRA + Sigma Protocol

This repository uses **Sigma Protocol** for structured product and engineering workflow, and **LYRA Atlas** (see `.cursor/rules/lyra-atlas.mdc`) for product data, page patterns, and ship policy.

**Claude / handoff:** read `**CLAUDE.md`** at repo root for current interface focus, Vercel `**LYRA_MP_***` deferral, and MCP limits. **Lyra doc index:** `docs/lyra/README.md`.

## Handoff · ops Claude cannot finish in sandbox

These need **your Vercel account**, **CLI login**, or a **non-sandbox** agent:

1. `**LYRA_MP_*` env vars** — one per GA SKU; full list in `docs/lyra/runbooks/vercel-ga-env.md` and `docs/lyra/ECOSYSTEM-SERVICES-MODEL.md`. Without them, catalog rows still work but `marketplaceListingId` stays empty until env is set.
2. **MCP** — if the Vercel MCP server does not expose env/project tools, use the dashboard or `vercel env add` / `vercel env pull` (see runbook).
3. **Deploy / promote** — only when the user explicitly asks (Atlas rule).

Keep this section accurate when you add GA keys (`OFFER_OVERRIDES` + `scripts/write-deploy-manifest.mjs` + runbook table).

## LYRA (this product)

- Canonical structure and routes: `src/data/atlas.ts`.
- Sub-agent landings, bundles, batches: follow patterns documented in the LYRA Atlas rule and `interfaceBatches.ts`.
- Deploy to Vercel only when explicitly requested.
- Hub CRM integration is deferred; `src/lib/hub/crm.ts` is a stub.
- **Service / marketplace posture** (GTM phase, SKU mode, integration targets for every agent): `src/data/serviceCatalog.ts`, operator UI `/hub/services`, JSON `/api/hub/service-catalog`. Playbook: `docs/lyra/ECOSYSTEM-SERVICES-MODEL.md`.

### Developing sub-agents (sub-services) with Sigma

**End-to-end playbook (landing + interface + services + UX):** `**docs/lyra/PRODUCT-SHIP-LOOP.md**`.

Brownfield loop for **Matter landings** + **interface shells**:

1. Read `**docs/lyra/SIGMA-SUB-AGENT-WORKFLOW.md`** and `**docs/lyra/INTERFACE-BATCHES.md**` — batch table, PRD links, acceptance rollup.
2. **Current build focus** — `getSequenceFocusKey()` + `**getDevStepsForBatch()`** in `src/data/interfaceBatches.ts` (`**INTERFACE-BATCHES.md**` mirrors code). `**INTERFACE_DEV_EXCLUDED_HOLDING_SLUGS**` excludes `**lore**` from batch chunking (education → separate contractor app). **As of last doc pass:** Batch **11**, index **1** → `**lex/matter**`; batch **10** in `**batch10/**`, **Punch** in `**batch11/**`. **Roadmap (draft)** agents: Matter landings + `/hub/drafts`; promote to `live` when ready. **GA SKUs** outside the active batch still get an interface panel via `**getInterfacePreviewForProduct()`** (synthetic preview from catalog).
3. **PRDs** — Batch 1: `**F1`–`F3`**; later batches: see INTERFACE-BATCHES and `**docs/lyra/prds/**`.
4. In Cursor, use slash commands for deep gates when needed (e.g. `**step-8-technical-spec**` before real API work, `**step-7-interface-states**` for UX, `**step-verify**` before ship).

## Sigma workflow in Cursor

Invoke methodology steps from the command palette / slash commands. Files live under `.cursor/commands/steps/` (e.g. `step-1-ideation.md` → use the matching slash command).


| Phase    | Steps                | Main artifacts                                                                |
| -------- | -------------------- | ----------------------------------------------------------------------------- |
| Planning | 0–4 (+ optional 1.5) | env checklist, `docs/specs/MASTER_PRD.md`, architecture, UX, flow tree        |
| Design   | 5–8                  | wireframes, design system, state spec, technical spec                         |
| Build    | 9–11                 | landing (optional), feature breakdown, PRDs under `docs/prds/`                |
| Ship     | 12–14                | context files (`AGENTS.md`, etc.), skill packs, agent runtime under `.sigma/` |


After **Step 5**, upstream Sigma uses `sigma prd-json --mode prototype` → `.sigma/backlogs/prototype/prd.json`. After **Step 11**, `sigma prd-json --mode implementation` → `.sigma/backlogs/implementation/prd.json`. Optional: `sigma prd-orchestrate` for `.sigma/orchestration/`*. These require the **Sigma CLI** when you install it from the official project releases.

**Brownfield** (repo already exists): prefer `map-codebase`, `discuss-phase`, and `plan` skills from the Sigma skill library when you need codebase maps and phase briefs before deep steps.

## Sigma skills (Codex format → Cursor)

Keep a local clone of the Sigma Protocol repo and point tooling at it (example path: `~/Downloads/sigma-protocol-main` or a git clone).

Skills are authored as `.codex/skills/<skill-name>/SKILL.md` in that clone. To use them as **Cursor agent skills**, copy or symlink each wanted skill into your user skills directory:

`~/.cursor/skills-cursor/<skill-name>/SKILL.md`

Useful starters for this Next.js app (adjust to taste):

- `architecture-patterns`, `monorepo-architecture`, `api-design-principles`
- `react-performance`, `systematic-debugging`, `verification`
- `pr-review`, `step-verify`, `quality-gates`
- `owasp-web-security`, `saas-security-patterns` (when touching auth or data)

For marketing or growth work, browse `.codex/skills/` in the Sigma repo by name.

## Conflicts and precedence

1. **LYRA Atlas** wins for product copy, `atlas.ts` structure, batch sequencing, and deploy policy.
2. **Sigma steps** win for methodology order, PRD gates, and verification rubrics when you explicitly run a step command.
3. Step prompts may reference MCP tools you have not enabled; use available tools (Read, Grep, terminal, browser MCP, etc.) and keep outputs in the paths the step specifies.

## Re-installing or updating step commands

From this repo:

```bash
./scripts/refresh-sigma-steps.sh
# or: SIGMA_PROTOCOL_ROOT=~/src/sigma-protocol ./scripts/refresh-sigma-steps.sh
# or: ./scripts/refresh-sigma-steps.sh /path/to/sigma-protocol
```

This runs the upstream installer with `--force` and renames extensionless step files to `.md` under `.cursor/commands/steps/`.

## Obsidian mirror (departments + skills)

Regenerate department pages and one note per Sigma skill into the vault:

```bash
python3 ~/herdia-lyra/scripts/generate-sigma-obsidian.py
```

Optional: `SIGMA_ROOT` and `OBSIDIAN_SIGMA_DIR`. Output defaults to `~/obsidian-brain/03-Resources/Frameworks/Sigma Protocol/`. Entry note: `~/obsidian-brain/03-Resources/Frameworks/Sigma Protocol.md`.