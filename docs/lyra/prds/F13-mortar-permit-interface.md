# PRD — F13 · Mortar · Permit · Interface shell (Batch 9, step 3)

**Status:** shipped (batch 9 step 3) · **Sigma:** Steps 7–8–11 (states, integration stub, PRD)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Atlas:** `mortar` / `permit` — was sequence focus when batch **9** and `INTERFACE_DEV_SEQUENCE_INDEX === 2`; batch **9** complete → **`ACTIVE_INTERFACE_DEV_BATCH === 10`**, index **`0`** (**`mortar/crew`**)

## Problem

Permit is the **filings + agency** surface for Mortar: jurisdictions, plan check, variances, and TCO targets must not read like a generic construction dashboard — they must match **filing overview + agency queue** semantics (`PREVIEWS["mortar/permit"]`).

## Goals

1. **Parity** — Metrics + rows match `PREVIEWS["mortar/permit"]`.
2. **Differentiation** — Filing strip + agency queue (not drawing sets or crew roster).
3. **Landing alignment** — Matter copy uses `permitFlavor` / `permitFlavorEs` (jurisdiction / filing narrative, not default Mortar site story).
4. **i18n** — `iface.permit.*` in `shell.ts` (en / es / de).
5. **Services** — Catalog + integration spec document preview hooks ([mortar-permit.md](../integrations/mortar-permit.md)).

## Acceptance

- [x] **Custom shell** — `PermitInterface.astro` in `interface/batch9/`.
- [x] **Preview** — `interfaceBatches.ts` → `PREVIEWS["mortar/permit"]`.
- [x] **Copy** — `holdingFlavor.ts` / `holdingFlavorEs.ts` → `permitFlavor` branch.
- [x] **a11y** — Regions / labels on shell (filing overview vs agency queue).
- [x] **Integration spec** — `docs/lyra/integrations/mortar-permit.md` + README index.
- [x] **Catalog** — `OFFER_OVERRIDES["mortar/permit"]` for explicit preview targets + deploy hint.

## Interface states (Sigma step 7)

| State | Behavior |
|-------|----------|
| **Happy path** | Metrics + three rows with ok / warn / neutral tones per `PREVIEWS`. |
| **Empty** | Not simulated until API; static preview only. |
| **Error** | Deferred until Gateway; footer keeps `surface` contract. |

## Verification

1. Read Permit landing hero + steps aloud against **PermitInterface** labels.
2. Diff `PREVIEWS["mortar/permit"]` vs list rows in the shell.
3. Keyboard pass on `/mortar/permit#iface-mortar-permit`.

## When this ships

Roll to **`ACTIVE_INTERFACE_DEV_BATCH === 10`** and **`INTERFACE_DEV_SEQUENCE_INDEX === 0`** — first slot **`mortar/crew`**. Crew PRD: [F14](./F14-mortar-crew-interface.md).
