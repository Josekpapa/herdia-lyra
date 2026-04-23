# PRD — F12 · Mortar · Blueprint · Interface shell (Batch 9, step 2)

**Status:** shipped (batch 9 step 2) · **Sigma:** Steps 7–8–11 (states, integration stub, PRD)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Atlas:** `mortar` / `blueprint` — was sequence focus when batch **9** and `INTERFACE_DEV_SEQUENCE_INDEX === 1`; superseded by **`mortar/permit`** at index **2**, then batch **10**

## Problem

Blueprint is the **drawing set + RFI** surface for Mortar: revisions, coordination, and permit-ready packages must not read like a generic construction dashboard — they must match **sets + threads** semantics (active sets, open RFIs, sheet cadence, clash zones).

## Goals

1. **Parity** — Metrics + rows match `PREVIEWS["mortar/blueprint"]`.
2. **Differentiation** — Sets strip + RFI queue (not foyer rails or permit filings).
3. **Landing alignment** — Matter copy uses `blueprintFlavor` / `blueprintFlavorEs` (drawing-set narrative, not default Mortar site story).
4. **i18n** — `iface.blueprint.*` in `shell.ts` (en / es / de).
5. **Services** — Catalog + integration spec document preview hooks ([mortar-blueprint.md](../integrations/mortar-blueprint.md)).

## Acceptance

- [x] **Custom shell** — `BlueprintInterface.astro` in `interface/batch9/`.
- [x] **Preview** — `interfaceBatches.ts` → `PREVIEWS["mortar/blueprint"]`.
- [x] **Copy** — `holdingFlavor.ts` / `holdingFlavorEs.ts` → `blueprintFlavor` branch.
- [x] **a11y** — Regions / labels on shell (sets strip vs RFI rail).
- [x] **Integration spec** — `docs/lyra/integrations/mortar-blueprint.md` + README index.
- [x] **Catalog** — `OFFER_OVERRIDES["mortar/blueprint"]` for explicit preview targets + deploy hint.

## Interface states (Sigma step 7)

| State | Behavior |
|-------|----------|
| **Happy path** | Metrics + three rows with ok / warn / neutral tones per `PREVIEWS`. |
| **Empty** | Not simulated until API; static preview only. |
| **Error** | Deferred until Gateway; footer keeps `surface` contract. |

## Verification

1. Read Blueprint landing hero + steps aloud against **BlueprintInterface** labels.
2. Diff `PREVIEWS["mortar/blueprint"]` vs list rows in the shell.
3. Keyboard pass on `/mortar/blueprint#iface-mortar-blueprint`.

## When this ships

Done — index **`2`** · **`mortar/permit`** ([F13](./F13-mortar-permit-interface.md)); then roll to batch **10** / index **0** (**`mortar/crew`**).
