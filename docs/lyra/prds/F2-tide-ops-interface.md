# PRD — F2 · Tide · Ops · Interface shell (Batch 1, step 2)

**Status:** draft · **Sigma:** Step 11 (brownfield)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Sequence:** Enable after F1 ships — set `INTERFACE_DEV_SEQUENCE_INDEX` to `1` (focus `tide/ops`).

## Problem

Ops is the **property triage floor** for Tide: GM strip, pulse metrics, Hot / Floor / Night columns. The shell must feel like **one hotel’s morning** — aligned with `tideFlavor` + Ops-specific narrative in `interfaceBatches` preview rows.

## Goals

1. **Parity** — Pulse metrics match `PREVIEWS["tide/ops"]`; triage stories align with preview **rows** (HK-412, guest recovery, night audit).
2. **Voice** — Cinematic Tide register; property name + standup brief read as **product**, not lorem.
3. **Traceability** — Ops uses **generic** `tideFlavor` steps (Ingest → Align → Execute → Learn) on the landing; triage UI is **ops-lane specific** — PRD documents that split so copy editors don’t “fix” the triage to match the four generic steps.

## Anchor paths

| Area | Path |
|------|------|
| Page | `src/pages/tide/ops.astro` |
| UI | `OpsInterface.astro` |
| Preview | `interfaceBatches.ts` → `tide/ops` |
| Copy | `holdingFlavor.ts` → `tideFlavor` |

## Acceptance criteria

- [x] **Header strip** — Property identity + standup brief consistent with Batch 1 story (Harbor Inn / SF / 94 keys OK as static hero until dynamic data).
- [x] **Pulse** — Three metrics from `InterfacePreview.metrics` (Active tickets, P1, Standup).
- [x] **Triage** — Three columns; at least one **warn** lane (Hot) with amber affordance; ticket IDs monospace.
- [x] **Queue honesty** — Footer references `GET /api/hub/surface?...` same pattern as Intake.
- [x] **i18n** — `iface.ops.*` in `shell.ts` (en / es / de) + `data-shell-i18n` on PROPERTY, Standup brief, Pulse, Triage, lane titles (Hot / Floor / Night).
- [x] **a11y** — Panel section id `iface-tide-ops`; semantic labels on pulse/triage; structure ready for future interactive cards.
- [x] **Responsive** — `min-w-0` on grids and columns; triage stacks at `lg` breakpoint.

## Batch contrast

Ops is **not** Intake: do not force `copy.steps` into the triage grid. Batch 2 (`tide/concierge`, `tide/revenue`, `tide/housekeeping`) will need **new** PRDs and optional `PREVIEWS`; reuse this Ops shell pattern only where the story fits.

## Non-goals

- Live PMS / ticketing integrations.
- Real-time standup generation.

## When this ships

Set `INTERFACE_DEV_SEQUENCE_INDEX` to `2` (next: **seal/stamp**). Open **F3** execution.
