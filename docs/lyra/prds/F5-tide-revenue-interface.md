# PRD — F5 · Tide · Revenue · Interface shell (Batch 2, step 2)

**Status:** draft · **Sigma:** Step 11 (brownfield)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Sequence:** After F4 — `INTERFACE_DEV_SEQUENCE_INDEX === 1` → `tide/revenue`.

## Problem

Revenue is **rate, pace, pickup** in one terminal read. Shell should emphasize **variance vs comp** and **group/OTA hygiene**, not guest threads.

## Goals

1. **Parity** — Match `PREVIEWS["tide/revenue"]` (RevPAR, pace, pickup + three rows).
2. **Voice** — Tide cinematic register; numbers **tabular** and scannable.
3. **Contrast** — Clearly not Concierge (threads) or Housekeeping (room board).

## Anchor paths

| Area | Path |
|------|------|
| Page | `src/pages/tide/revenue.astro` |
| Preview | `interfaceBatches.ts` → `tide/revenue` |

## Acceptance criteria

- [x] **Custom shell** — `RevenueInterface.astro` (KPI strip + alerts list from `preview`).
- [x] **Preview fidelity** — Metrics labels and row copy consistent with `PREVIEWS`.
- [x] **i18n** — `iface.revenue.*` in `shell.ts`.
- [x] **Surface line** — `/api/hub/surface?holding=tide&agent=revenue`.
- [x] **a11y / responsive** — KPI grid stacks; monospace row keys.

## When this ships

Set `INTERFACE_DEV_SEQUENCE_INDEX` to `2` (next: **tide/housekeeping**). Open **F6**.
