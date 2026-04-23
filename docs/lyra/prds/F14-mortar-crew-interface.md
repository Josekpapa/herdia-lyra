# PRD — F14 · Mortar · Crew · Interface shell (Batch 10, step 1)

**Status:** shipped (batch 10 step 1) · **Sigma:** Steps 7–8–11 (states, integration stub, PRD)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Atlas:** `mortar` / `crew` — was sequence focus when batch **10** and `INTERFACE_DEV_SEQUENCE_INDEX === 0`; superseded by **`mortar/site`** at index **`1`**

## Problem

Crew is the **roster + gates** surface for Mortar: headcount, sub tiers, and safety posture must not read like a generic construction dashboard — they must match **roster pulse + trades & gates** semantics (`PREVIEWS["mortar/crew"]`).

## Goals

1. **Parity** — Metrics + rows match `PREVIEWS["mortar/crew"]`.
2. **Differentiation** — Roster strip + trades/gates rail (not site daily or ledger).
3. **Landing alignment** — Matter copy uses `crewFlavor` / `crewFlavorEs` (field accountability narrative, not default Mortar story).
4. **i18n** — `iface.crew.*` in `shell.ts` (en / es / de).
5. **Services** — Catalog + integration spec document preview hooks ([mortar-crew.md](../integrations/mortar-crew.md)).

## Acceptance

- [x] **Custom shell** — `CrewInterface.astro` in `interface/batch10/`.
- [x] **Preview** — `interfaceBatches.ts` → `PREVIEWS["mortar/crew"]`.
- [x] **Copy** — `holdingFlavor.ts` / `holdingFlavorEs.ts` → `crewFlavor` branch.
- [x] **a11y** — Regions / labels on shell (roster pulse vs trades & gates).
- [x] **Integration spec** — `docs/lyra/integrations/mortar-crew.md` + README index.
- [x] **Catalog** — `OFFER_OVERRIDES["mortar/crew"]` for explicit preview targets + deploy hint.

## Interface states (Sigma step 7)

| State | Behavior |
|-------|----------|
| **Happy path** | Metrics + three rows with ok / warn / neutral tones per `PREVIEWS`. |
| **Empty** | Not simulated until API; static preview only. |
| **Error** | Deferred until Gateway; footer keeps `surface` contract. |

## Verification

1. Read Crew landing hero + steps aloud against **CrewInterface** labels.
2. Diff `PREVIEWS["mortar/crew"]` vs list rows in the shell.
3. Keyboard pass on `/mortar/crew#iface-mortar-crew`.

## When this ships

Done — index **`1`** · **`mortar/site`** ([F15](./F15-mortar-site-interface.md)).
