# PRD — F17 · Mortar · Punch · Interface shell (Batch 11, step 1)

**Status:** shipped (batch 11 step 1) · **Sigma:** Steps 7–8–11 (states, integration stub, PRD)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Atlas:** `mortar` / `punch` — was sequence focus when batch **11** and `INTERFACE_DEV_SEQUENCE_INDEX === 0`; superseded by **`lex/matter`** at index **`1`**

## Problem

Punch is the **close-out + handoff** surface for Mortar: owner list, warranty clock, and O&M readiness must not read like a generic construction dashboard — they must match **close-out pulse + systems & handoff** semantics (`PREVIEWS["mortar/punch"]`).

## Goals

1. **Parity** — Metrics + rows match `PREVIEWS["mortar/punch"]`.
2. **Differentiation** — Close-out strip + handoff rail (not ledger draws or site daily).
3. **Landing alignment** — Matter copy uses `punchFlavor` / `punchFlavorEs` (finish-line narrative, not default Mortar story).
4. **i18n** — `iface.punch.*` in `shell.ts` (en / es / de).
5. **Services** — Catalog + integration spec document preview hooks ([mortar-punch.md](../integrations/mortar-punch.md)).

## Acceptance

- [x] **Custom shell** — `PunchInterface.astro` in `interface/batch11/`.
- [x] **Preview** — `interfaceBatches.ts` → `PREVIEWS["mortar/punch"]`.
- [x] **Copy** — `holdingFlavor.ts` / `holdingFlavorEs.ts` → `punchFlavor` branch.
- [x] **a11y** — Regions / labels on shell (close-out pulse vs systems & handoff).
- [x] **Integration spec** — `docs/lyra/integrations/mortar-punch.md` + README index.
- [x] **Catalog** — `OFFER_OVERRIDES["mortar/punch"]` for explicit preview targets + deploy hint.

## Interface states (Sigma step 7)

| State | Behavior |
|-------|----------|
| **Happy path** | Metrics + three rows with ok / warn / neutral tones per `PREVIEWS`. |
| **Empty** | Not simulated until API; static preview only. |
| **Error** | Deferred until Gateway; footer keeps `surface` contract. |

## Verification

1. Read Punch landing hero + steps aloud against **PunchInterface** labels.
2. Diff `PREVIEWS["mortar/punch"]` vs list rows in the shell.
3. Keyboard pass on `/mortar/punch#iface-mortar-punch`.

## When this ships

Done — index **`1`** · **`lex/matter`** (open **F18** or next id for Matter).
