# LYRA docs (Atlas · Hub · Sigma)

**Agents:** start with repo root **`AGENTS.md`** and **`CLAUDE.md`** (handoff + Vercel/MCP caveats).

| Doc | Purpose |
|-----|---------|
| [INTERFACE-BATCHES.md](./INTERFACE-BATCHES.md) | Interface dev batches, PRD links, current sequence defaults |
| [SIGMA-SUB-AGENT-WORKFLOW.md](./SIGMA-SUB-AGENT-WORKFLOW.md) | Sigma steps × sub-agent delivery |
| [ECOSYSTEM-SERVICES-MODEL.md](./ECOSYSTEM-SERVICES-MODEL.md) | Service catalog, deploy manifest, **`LYRA_MP_*`** table |
| [integrations/README.md](./integrations/README.md) | GA integration specs (Step 8 / 11) |
| [runbooks/vercel-ga-env.md](./runbooks/vercel-ga-env.md) | **Operator:** set all `LYRA_MP_*` on Vercel (not automatable from sandbox) |

## Deferred / explicit-only

- **Hub CRM** — `src/lib/hub/crm.ts`; set `PUBLIC_HUB_CRM_URL` only when wiring a real CRM.
- **Production deploy** — per Atlas rule, only when the user asks.

## Related code

| Path | Role |
|------|------|
| `src/data/atlas.ts` | Holdings, agents, Core, bundles |
| `src/data/interfaceBatches.ts` | Batch + sequence; `getDevStepsForBatch()`; `getInterfacePreviewForProduct()` |
| `src/data/serviceCatalog.ts` | GTM, `OFFER_OVERRIDES`, `getGeneralAvailabilityKeys()` |
| `scripts/write-deploy-manifest.mjs` | GA keys → `deploy-manifest.json` before build |
