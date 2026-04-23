# PRD — F16 · Mortar · Ledger-C · Interface shell (Batch 10, step 3)

**Status:** shipped (batch 10 step 3) · **Sigma:** Steps 7–8–11 (states, integration stub, PRD)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Atlas:** `mortar` / `ledger-c` — was sequence focus when batch **10** and `INTERFACE_DEV_SEQUENCE_INDEX === 2`; batch **10** complete → **`ACTIVE_INTERFACE_DEV_BATCH === 11`**, index **`0`** (**`mortar/punch`**)

## Problem

Ledger-C is the **construction money** surface for Mortar: draws, retainage, and COs must not read like a generic dashboard — they must match **draw posture + COs & liens** semantics (`PREVIEWS["mortar/ledger-c"]`).

## Goals

1. **Parity** — Metrics + rows match `PREVIEWS["mortar/ledger-c"]`.
2. **Differentiation** — Draw strip + cash rail (not site daily or crew roster).
3. **Landing alignment** — Matter copy uses `ledgerCFlavor` / `ledgerCFlavorEs` (commercial package narrative, not default Mortar story).
4. **i18n** — `iface.ledgerC.*` in `shell.ts` (en / es / de).
5. **Services** — Catalog + integration spec document preview hooks ([mortar-ledger-c.md](../integrations/mortar-ledger-c.md)).

## Acceptance

- [x] **Custom shell** — `LedgerCInterface.astro` in `interface/batch10/`.
- [x] **Preview** — `interfaceBatches.ts` → `PREVIEWS["mortar/ledger-c"]`.
- [x] **Copy** — `holdingFlavor.ts` / `holdingFlavorEs.ts` → `ledgerCFlavor` branch.
- [x] **a11y** — Regions / labels on shell (draw posture vs COs & liens).
- [x] **Integration spec** — `docs/lyra/integrations/mortar-ledger-c.md` + README index.
- [x] **Catalog** — `OFFER_OVERRIDES["mortar/ledger-c"]` for explicit preview targets + deploy hint.

## Interface states (Sigma step 7)

| State | Behavior |
|-------|----------|
| **Happy path** | Metrics + three rows with ok / warn / neutral tones per `PREVIEWS`. |
| **Empty** | Not simulated until API; static preview only. |
| **Error** | Deferred until Gateway; footer keeps `surface` contract. |

## Verification

1. Read Ledger-C landing hero + steps aloud against **LedgerCInterface** labels.
2. Diff `PREVIEWS["mortar/ledger-c"]` vs list rows in the shell.
3. Keyboard pass on `/mortar/ledger-c#iface-mortar-ledger-c`.

## When this ships

Done — batch **11** / index **0** · **`mortar/punch`** ([F17](./F17-mortar-punch-interface.md)).
