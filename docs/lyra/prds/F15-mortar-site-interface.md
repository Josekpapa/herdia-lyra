# PRD — F15 · Mortar · Site · Interface shell (Batch 10, step 2)

**Status:** shipped (batch 10 step 2) · **Sigma:** Steps 7–8–11 (states, integration stub, PRD)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Atlas:** `mortar` / `site` — was sequence focus when batch **10** and `INTERFACE_DEV_SEQUENCE_INDEX === 1`; superseded by **`mortar/ledger-c`** at index **`2`**

## Problem

Site is the **superintendent’s daily** for Mortar: photos, delays, and weather must not read like a generic construction dashboard — they must match **daily pulse + day rail** semantics (`PREVIEWS["mortar/site"]`).

## Goals

1. **Parity** — Metrics + rows match `PREVIEWS["mortar/site"]`.
2. **Differentiation** — Daily strip + weather & logistics rail (not crew roster or ledger).
3. **Landing alignment** — Matter copy uses `siteFlavor` / `siteFlavorEs` (field narrative, not default Mortar story).
4. **i18n** — `iface.site.*` in `shell.ts` (en / es / de).
5. **Services** — Catalog + integration spec document preview hooks ([mortar-site.md](../integrations/mortar-site.md)).

## Acceptance

- [x] **Custom shell** — `SiteInterface.astro` in `interface/batch10/`.
- [x] **Preview** — `interfaceBatches.ts` → `PREVIEWS["mortar/site"]`.
- [x] **Copy** — `holdingFlavor.ts` / `holdingFlavorEs.ts` → `siteFlavor` branch.
- [x] **a11y** — Regions / labels on shell (daily pulse vs day rail).
- [x] **Integration spec** — `docs/lyra/integrations/mortar-site.md` + README index.
- [x] **Catalog** — `OFFER_OVERRIDES["mortar/site"]` for explicit preview targets + deploy hint.

## Interface states (Sigma step 7)

| State | Behavior |
|-------|----------|
| **Happy path** | Metrics + three rows with ok / warn / neutral tones per `PREVIEWS`. |
| **Empty** | Not simulated until API; static preview only. |
| **Error** | Deferred until Gateway; footer keeps `surface` contract. |

## Verification

1. Read Site landing hero + steps aloud against **SiteInterface** labels.
2. Diff `PREVIEWS["mortar/site"]` vs list rows in the shell.
3. Keyboard pass on `/mortar/site#iface-mortar-site`.

## When this ships

Done — index **`2`** · **`mortar/ledger-c`** ([F16](./F16-mortar-ledger-c-interface.md)).
