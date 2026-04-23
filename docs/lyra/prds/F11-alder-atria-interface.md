# PRD — F11 · Alder · Atria · Interface shell (Batch 9, step 1)

**Status:** shipped (batch 9 step 1) · **Sigma:** Steps 7–8–11 (states, integration stub, PRD)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Atlas:** `alder` / `atria` — was sequence focus when batch **9** and `INTERFACE_DEV_SEQUENCE_INDEX === 0`; superseded by `**mortar/blueprint`** at index **1**

## Problem

Atria is the **foyer** for Kairos: guided entry, gates, and household rail before Intake unlocks. The dev shell must not read like a generic health dashboard — it must match **foyer** semantics (completion, NDA, locale, handoff).

## Goals

1. **Parity** — Metrics + rows match `PREVIEWS["alder/atria"]`.
2. **Differentiation** — Guided path strip + household rail (not Labs orders or Cadence streaks).
3. **Landing alignment** — Matter copy uses `atriaFlavor` / `atriaFlavorEs` (foyer narrative, not default Alder labs story).
4. **i18n** — `iface.atria.*` in `shell.ts` (en / es / de).
5. **Services** — Catalog + integration spec document preview hooks ([alder-atria.md](../integrations/alder-atria.md)).

## Acceptance

- **Custom shell** — `AtriaInterface.astro` in `interface/batch9/`.
- **Preview** — `interfaceBatches.ts` → `PREVIEWS["alder/atria"]`.
- **Copy** — `holdingFlavor.ts` / `holdingFlavorEs.ts` → `atriaFlavor` branch.
- **a11y** — Regions / labels on shell (guided path vs household rail).
- **Integration spec** — `docs/lyra/integrations/alder-atria.md` + README index.
- **Catalog** — `OFFER_OVERRIDES["alder/atria"]` for explicit preview targets + deploy hint.

## Interface states (Sigma step 7)


| State          | Behavior                                                            |
| -------------- | ------------------------------------------------------------------- |
| **Happy path** | Metrics + three rows with ok / warn / neutral tones per `PREVIEWS`. |
| **Empty**      | Not simulated until API; static preview only.                       |
| **Error**      | Deferred until Gateway; footer keeps `surface` contract.            |


## Verification

1. Read Atria landing hero + steps aloud against **AtriaInterface** labels.
2. Diff `PREVIEWS["alder/atria"]` vs list rows in the shell.
3. Keyboard pass on `/alder/atria#iface-alder-atria`.

## When this ships

Done — index `**1`** · `**mortar/blueprint**` ([F12](./F12-mortar-blueprint-interface.md)).