# Claude / Codex handoff — herdia-lyra

Read **`AGENTS.md`** first for Sigma × LYRA workflow and precedence.

## Product state (code)

- **Atlas:** `src/data/atlas.ts` — holdings, agents, bundles, Core rails.
- **Interface dev focus:** `src/data/interfaceBatches.ts` — `getSequenceFocusKey()`, `getDevStepsForBatch()`, `ACTIVE_INTERFACE_DEV_BATCH`, `INTERFACE_DEV_SEQUENCE_INDEX`, **`INTERFACE_DEV_EXCLUDED_HOLDING_SLUGS`** (`lore` omitted — education ships as a separate app). **As of last update:** Batch **9**, index **0** → **`alder/atria`**. Batches **7–8** shells: `interface/batch7/` (Yield, Kairos Intake, Protocol), `interface/batch8/` (Labs, Cadence, Concierge-M). Next: index **`1`** (**`mortar/blueprint`**), **`2`** (**`mortar/permit`**), then **`0`** + batch **`10`** (**`mortar/crew`**, **`mortar/site`**, **`mortar/ledger-c`**). **GA panels:** `getInterfacePreviewForProduct()`; batch rail only when the page agent is in the active batch’s slug list.
- **Commercial / GA:** `src/data/serviceCatalog.ts` (`OFFER_OVERRIDES`, `getGeneralAvailabilityKeys()`). Integration specs: `docs/lyra/integrations/`.
- **Hub console:** `/hub` (overview), `/hub/ecosystem` (Atlas × catalog × interface-batch matrix + Sigma protocol strip), `/hub/services`, `/hub/batches` — shared sub-nav `HubConsoleNav`.
- **Hub APIs:** `/api/hub/health` (rails + CRM flag), `/api/hub/surface`, `/api/hub/service-catalog`, `/api/hub/queue-preview` (stub queue for generic interface shells).

## Leave for a human or authenticated Claude session (not sandbox agents)

1. **Vercel environment variables — `LYRA_MP_*`**  
   Full table: **`docs/lyra/runbooks/vercel-ga-env.md`** and **`docs/lyra/ECOSYSTEM-SERVICES-MODEL.md`**.  
   Sandbox / headless agents cannot set project secrets; use **Vercel dashboard** or **`vercel env add`** after `vercel login` + `vercel link`.

2. **MCP**  
   Available MCP servers vary by Cursor project config. If **Vercel MCP** only exposes auth or no env tools, treat marketplace/env work as **CLI or dashboard**, not MCP.

3. **Deploy**  
   Policy: deploy to Vercel only when the user explicitly asks (`lyra-atlas` rule). **`npm run build`** already runs `write-deploy-manifest.mjs` before `astro build`.

## Doc index (LYRA)

- **`docs/lyra/README.md`** — map of Lyra docs.
- **`docs/lyra/SIGMA-SUB-AGENT-WORKFLOW.md`** — brownfield interface loop.
- **`docs/lyra/ECOSYSTEM-SERVICES-MODEL.md`** — catalog, manifest, `LYRA_MP_*` table.

## Obsidian (optional mirror)

- LYRA vault: `~/obsidian-brain/01-Projects/Active/LYRA/` — **Batch log**, system map.  
- Sigma maps: `python3 scripts/generate-sigma-obsidian.py` (see `AGENTS.md`).
