# PRD — F4 · Tide · Concierge · Interface shell (Batch 2, step 1)

**Status:** draft · **Sigma:** Step 11 (brownfield)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Sequence:** Start when Batch 1 is complete — set `ACTIVE_INTERFACE_DEV_BATCH` to `2` and `INTERFACE_DEV_SEQUENCE_INDEX` to `0` (focus `tide/concierge`).

## Problem

Concierge is **guest-facing comms** across channels. The dev shell should read as **thread + SLA + handoff**, not property triage (Ops) or rate desks (Revenue).

## Goals

1. **Parity** — Metrics and queue rows match `PREVIEWS["tide/concierge"]` in `interfaceBatches.ts`.
2. **Differentiation** — UI pattern distinct from Ops (`Hot/Floor/Night`) and Revenue (pace/RevPAR); prefer **thread list + priority strip** when you add `ConciergeInterface.astro`.
3. **Traceability** — Link to `subAgentCopy` / `tideFlavor`; document channel labels (WhatsApp, email, OTA).

## Anchor paths

| Area | Path |
|------|------|
| Page | `src/pages/tide/concierge.astro` |
| Preview | `interfaceBatches.ts` → `tide/concierge` |
| Copy | `holdingFlavor.ts` → `tideFlavor` |

## Acceptance criteria

- [x] **Custom shell** — `ConciergeInterface.astro` under `interface/batch2/` (thread list + SLA strip from `preview`).
- [x] **Preview** — Three metrics + three queue rows with tones aligned to `PREVIEWS`.
- [x] **i18n** — `iface.concierge.*` in `shell.ts` (en/es/de).
- [x] **Surface line** — Footer `GET /api/hub/surface?holding=tide&agent=concierge`.
- [x] **a11y / responsive** — `aria-label` on thread list; responsive flex rows.

## When this ships

Set `INTERFACE_DEV_SEQUENCE_INDEX` to `1` (next: **tide/revenue**). Open **F5**.
