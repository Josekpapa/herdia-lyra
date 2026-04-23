# PRD — F9 · LORE / education · Deferred from LYRA interface sequence

**Status:** deferred · **Sigma:** n/a (separate product track)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)

## Decision

The **education / LORE** vertical is **not** part of the main LYRA interface-dev batch sequence. It will ship as a **standalone app** for **special contractors**; atlas and catalog may still list LORE agents for the directory, but **`INTERFACE_DEV_EXCLUDED_HOLDING_SLUGS`** in `interfaceBatches.ts` omits them from `INTERFACE_DEV_BATCHES`.

## Implications

- No `lore/*` slug appears in Hub batch rails driven by `getDevStepsForBatch()`.
- Sub-agent pages under `/lore/*` still render; interface panel uses **`getInterfacePreviewForProduct()`** (synthetic GA preview when not in a dev batch).
- Remotion may keep a **`lore/tutor`** (or other) backdrop variant for on-site polish; that is **not** a commitment to sequence F7–F9-style shells in this repo.

## If LORE returns to this repo later

Remove `lore` from `INTERFACE_DEV_EXCLUDED_HOLDING_SLUGS`, re-run the batch mental model in `buildBatches()`, restore rich `PREVIEWS` and any custom shells, then log in Obsidian **Batch log**.
