# LYRA ecosystem — from Atlas agent to sellable service

**Claude handoff:** Marketplace env vars and operator steps that need dashboard/CLI: **`CLAUDE.md`** (repo root) and **`runbooks/vercel-ga-env.md`**.

This is the operating model for turning **every sub-agent** (49 **live** + 24 **draft** in `atlas.ts` today) into **proper services**: things we can price, list, hook to partners, and eventually expose in a **marketplace** layer — without replacing `atlas.ts` as the structural source of truth.

## Three layers (mental model)

| Layer | Audience | Role |
|--------|-----------|------|
| **Atlas** | Buyers, founders, GCs | Discovery — landings, Matter pages, terminal narrative |
| **Hub** | Operators, agency, partners | Deployment — batches, service catalog, API stubs, runbooks |
| **Marketplace / integrations** (evolving) | ISVs, stacks, Vercel-style listings | Distribution — OAuth apps, webhooks, MCP tools, embeds, SKU sync |

Agents stay defined in **`src/data/atlas.ts`**. Commercial and hook posture lives in **`src/data/serviceCatalog.ts`** and surfaces at **`/hub/services`** and **`/api/hub/service-catalog`**.

## What we store per agent (`AgentServiceOffer`)

- **`key`** — `holdingSlug/agentSlug` (stable id).
- **`atlasStatus`** — `live` | `draft` (copied from Atlas).
- **`gtmPhase`** — `roadmap` | `preview` | `general_availability`
  - Default: **draft → roadmap**, **live → preview**.
- **`skuMode`** — `none` | `bundle_only` | `standalone` | `both`
  - Default: **draft → none** (roadmap only), **live → both** (Atlas retail + bundles).
- **`integrationTargets`** — e.g. `rest`, `webhook_outbound`, `oauth_sso`, `mcp_tool`, `embed_widget`, `event_stream` — what we **certify or build** for partner hooks.
- **`partnerStackTags`** — coarse filters from **`HOLDING_SERVICE_DEFAULTS`** (per holding) plus blurb heuristics; refine per agent.
- **`linkedBundleSlugs`** — derived from `BUNDLES[].includes` text match on agent / holding / flagship names.
- **`marketplaceListingId`** — optional id when the SKU is listed (e.g. Vercel Marketplace); `null` until published.
- **`deploymentHint`** — optional operator note (region, cell, “pending”); not infra truth yet.

**Holding defaults:** edit **`HOLDING_SERVICE_DEFAULTS`** in `serviceCatalog.ts` for shared `partnerStackTags` and optional extra `integrationTargets` merged into live agents.

**Overrides:** edit **`OFFER_OVERRIDES`** when a specific agent goes **GA**, changes SKU rules, needs a fixed integration list, or gets a **`marketplaceListingId`** / **`deploymentHint`**.

## Default rules (today)

1. **Live agents** — Treat as **preview** SKUs: sell standalone + in bundles; target **REST + outbound webhooks**; vertical-specific extras (e.g. hospitality → SSO + inbound webhooks).
2. **Draft agents** — **Roadmap**: `skuMode: none` until you explicitly promote. To run a **waitlist / design-partner** SKU on a draft, set override `skuMode: "bundle_only"` or `"standalone"` and keep `gtmPhase: "roadmap"` or move to `preview`.
3. **Bundles** — Already in `atlas.ts` (`BUNDLES`); catalog **links** offers to bundle slugs for packaging math — not a second pricing source.

## Rollout checklist (repeat per agent)

Use this for **each** live + draft row when you “make it a proper service”:

1. **Atlas** — Name, blurb, tier, status accurate; landing exists or is queued.
2. **Service row** — In `serviceCatalog.ts`, add/adjust **`OFFER_OVERRIDES`** for `gtmPhase`, `skuMode`, `integrationTargets`, `partnerStackTags`.
3. **Hooks spec** — Document inbound/outbound events, auth model, and idempotency (Sigma Step 8–style): `docs/lyra/integrations/` (see `README.md` index).
4. **API surface** — **`/api/hub/surface?holding=&agent=`** merges the **`AgentServiceOffer`** for that key; extend with real deploy metadata when Gateway is ready. Keep **`service-catalog`** JSON as the marketplace sync contract.
5. **Marketplace** — Prefer **environment** listing ids so secrets stay out of git: `LYRA_MP_<HOLDING>_<AGENT>` (see `catalogListingEnvVarName()` in `serviceCatalog.ts`). Example: `fidelis/ledger` → `LYRA_MP_FIDELIS_LEDGER`. Optionally commit a non-secret id in **`OFFER_OVERRIDES`** if the listing id is public.
6. **Obsidian** — Mirror narrative in LYRA System / Batch log when you ship.

## CI · deploy manifest (surface `stub: false`)

**`npm run build`** runs `node scripts/write-deploy-manifest.mjs` first, then **`astro build`**. That bakes **`src/data/deploy-manifest.json`** (per GA key: **`lastDeploy`**, **`revision`** from `GITHUB_SHA` / `VERCEL_GIT_COMMIT_SHA` / `local`) into the server bundle so **`GET /api/hub/surface`** returns **`stub: false`** in production without extra dashboard steps. GitHub Actions keeps an explicit manifest step before build for clarity; behavior matches local + Vercel.

Keep **`GA_KEYS`** in `scripts/write-deploy-manifest.mjs` aligned with **`general_availability`** rows in **`OFFER_OVERRIDES`**.

The committed **`src/data/deploy-manifest.json`** may stay **`{}`**; the build script overwrites it immediately before **`astro build`** bundles it. After a local build, reset the file if you do not want the diff (`git checkout -- src/data/deploy-manifest.json`).

**Env-only alternative (optional):** set **`LYRA_LAST_DEPLOY_AT`** (ISO timestamp) and **`LYRA_DEPLOY_REVISION`** (short SHA) on the Vercel project — `surface` falls back to these when a per-key manifest row is empty. **`LYRA_DEPLOY_MANIFEST_JSON`** can override or extend the file at runtime.

## Vercel · `LYRA_MP_*` (GA marketplace listing ids)

Set one variable per **GA** SKU (values = your Vercel Marketplace listing ids). Names come from `catalogListingEnvVarName()` in `serviceCatalog.ts` (`holding/agent` → uppercase, non-alphanumerics → `_`).

| Catalog key | Environment variable |
|-------------|----------------------|
| `fidelis/ledger` | `LYRA_MP_FIDELIS_LEDGER` |
| `fidelis/vault` | `LYRA_MP_FIDELIS_VAULT` |
| `tide/ops` | `LYRA_MP_TIDE_OPS` |
| `tide/concierge` | `LYRA_MP_TIDE_CONCIERGE` |
| `tide/revenue` | `LYRA_MP_TIDE_REVENUE` |
| `tide/housekeeping` | `LYRA_MP_TIDE_HOUSEKEEPING` |
| `tide/guestbook` | `LYRA_MP_TIDE_GUESTBOOK` |
| `tide/scout` | `LYRA_MP_TIDE_SCOUT` |
| `lore/tutor` | `LYRA_MP_LORE_TUTOR` |
| `lore/path` | `LYRA_MP_LORE_PATH` |
| `lore/lab` | `LYRA_MP_LORE_LAB` |
| `seal/stamp` | `LYRA_MP_SEAL_STAMP` |
| `seal/chain` | `LYRA_MP_SEAL_CHAIN` |

**CLI (Production):** `vercel env add LYRA_MP_TIDE_REVENUE production` (repeat per key). See also `.env.example`.

**Sigma / ship:** treat this checklist as **Step 8–style** operator contract — GA SKUs should not ship “naked” in prod without listing ids or a documented exception.

**Saved procedure:** [runbooks/vercel-ga-env.md](./runbooks/vercel-ga-env.md).

## Ops sync (CRM, spreadsheets, internal tools)

Treat **`/api/hub/service-catalog`** as the **machine-readable** catalog. Poll or pull on a schedule (e.g. every 15–60 minutes) into your ops system; use **`?format=stats`** for rollups only.

```bash
# Full catalog (default filters optional: ?status=live&holding=tide)
curl -sS "${ORIGIN:-https://your-domain}/api/hub/service-catalog" | jq .

# Rollup counts
curl -sS "${ORIGIN:-https://your-domain}/api/hub/service-catalog?format=stats" | jq .
```

**Per-agent deploy line:** `GET /api/hub/surface?holding=fidelis&agent=ledger` returns **`offer`** + **`deploy`** when **`src/data/deploy-manifest.json`** (or **`LYRA_DEPLOY_MANIFEST_JSON`**) and/or **`LYRA_LAST_DEPLOY_AT`** / **`LYRA_DEPLOY_REVISION`** are set. CI should write the manifest (or env) on each production deploy so **`stub`** becomes **`false`**.

**Integration specs** for current GA SKUs: `docs/lyra/integrations/`.

## Sigma alignment

- **Step 1.5 / offer** — Use when locking **price bands** and tiers per SKU.
- **Step 8** — Technical spec for **webhooks, OAuth, MCP**.
- **Step 11** — PRD per agent for **hook completeness** before GA.
- **Brownfield** — `docs/lyra/SIGMA-SUB-AGENT-WORKFLOW.md` for interface wave; this doc for **commercial + integration** wave.

## Counts

Regenerate from code anytime:

```bash
curl -s "${ORIGIN:-http://localhost:4321}/api/hub/service-catalog?format=stats"
```

## Related paths

| Path | Purpose |
|------|---------|
| `src/data/atlas.ts` | Holdings, agents, bundles |
| `src/data/serviceCatalog.ts` | GTM + SKU + integration targets |
| `/hub/services` | Human-readable catalog |
| `/api/hub/service-catalog` | JSON contract (`catalogVersion: lyra-service-catalog-v1`) for operators / marketplace sync |
| `/api/hub/surface` | Catalog **`offer`** + **`deploy`** when manifest/env provides deploy signal |
| `docs/lyra/integrations/` | Step 8 / 11 hook specs for GA SKUs |
| `src/data/deploy-manifest.json` | Per-key **`lastDeploy`** / **`revision`** (CI can overwrite before build) |
