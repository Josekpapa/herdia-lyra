# PRD — F6 · Tide · Housekeeping · Interface shell (Batch 2, step 3)

**Status:** draft · **Sigma:** Step 11 (brownfield)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Sequence:** After F5 — `INTERFACE_DEV_SEQUENCE_INDEX === 2` → `tide/housekeeping`.

## Problem

Housekeeping is **room state, linen, timing** with tight coupling to **engineering / ops**. Shell should feel like a **live board**, not a revenue desk.

## Goals

1. **Parity** — Match `PREVIEWS["tide/housekeeping"]` (dirty count, turns, VIP + three rows).
2. **Ops linkage** — At least one row suggests **maintenance / ops** handoff (warn tone) consistent with preview.
3. **Contrast** — Not Concierge threads or Revenue KPIs.

## Anchor paths

| Area | Path |
|------|------|
| Page | `src/pages/tide/housekeeping.astro` |
| Preview | `interfaceBatches.ts` → `tide/housekeeping` |

## Acceptance criteria

- [x] **Custom shell** — `HousekeepingInterface.astro` (board + floor queue from `preview`).
- [x] **Preview fidelity** — Row semantics match `PREVIEWS`.
- [x] **i18n** — `iface.hk.*` in `shell.ts` (short prefix for housekeeping labels).
- [x] **Surface line** — `/api/hub/surface?holding=tide&agent=housekeeping`.
- [x] **a11y / responsive** — `aria-label` on room queue; responsive grid.

## When this ships

Set `INTERFACE_DEV_SEQUENCE_INDEX` to `0` and `ACTIVE_INTERFACE_DEV_BATCH` to `3` (next atlas chunk in `interfaceBatches.ts`). Log in Obsidian **Batch log**.
