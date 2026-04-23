# PRD — F1 · Fidelis · Intake · Interface shell (Batch 1, step 1)

**Status:** draft · **Owner:** interface wave  
**Sigma mapping:** Step 11 implementation PRD (brownfield)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md) (Batch 1 vs 2, acceptance rollup)  
**Atlas:** `fidelis` / `intake` — `getSequenceFocusKey()` when `ACTIVE_INTERFACE_DEV_BATCH === 1` and `INTERFACE_DEV_SEQUENCE_INDEX === 0`

## Problem

Intake is the **first** Batch 1 interface. The dev shell must read as **credible clinical onboarding**: pipeline rail, entity truth, doc gate, promote semantics — aligned with `holdingFlavor.ts` (`fidelisIntake`) and the static ASCII story on the landing.

## Goals

1. **Parity** — On-page copy, steps (Collect → Verify → Vault → Open), and metrics match the narrative in `subAgentCopy` (no contradictions).
2. **Credibility** — Interface block feels “desk real” on desktop and mobile; states are readable (active step, blockers, stamped vs pending docs).
3. **Traceability** — File touch list below is complete for the next engineer; Hub/API work stays explicitly out of scope unless a follow-up PRD.

## Batch contrast (why Intake is not Ops)

- **Intake** is **entity onboarding**: pipeline steps come from `**copy.steps`** (same labels as landing “How it works”); truth is **promote / Vault / Ledger** coherence.
- **Ops** (F2) is **property triage**: generic Tide steps stay on the **landing**; the shell uses **Hot / Floor / Night** lanes, not the four flavor steps.
- **Stamp** (F3) is **attestation**: vertical pipeline (KYC → witness → stamp → vault), official Seal register.

## Non-goals (this PRD)

- Live Gateway / Postgres / auth (**stub only**).
- Hub CRM (`crm.ts` stub) — deferred per Atlas rule.
- Dynamic data from backend (preview may stay static; document the hook point).

## Current implementation (anchor)


| Area                   | Path                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Page                   | `src/pages/fidelis/intake.astro`                                                                                         |
| Layout + panel         | `SubAgentProduct.astro`, `SubAgentInterfacePanel.astro` (passes `**copy`** into the panel)                               |
| Batch UI               | `interface/batch1/IntakeInterface.astro` — **pipeline rail** built from `**copy.steps`** (same labels as “How it works”) |
| Preview metrics / rows | `interfaceBatches.ts` → `PREVIEWS["fidelis/intake"]`                                                                     |
| Copy                   | `subAgentCopy/holdingFlavor.ts` → `fidelisIntake`, `generic.ts`, `agentOverrides.ts`                                     |
| i18n                   | `src/i18n/shell.ts` → `iface.intake.*` keys; labels use `data-shell-i18n`                                                |


## User-visible acceptance criteria

- **Pipeline** — Four steps from `**copy.steps`**; exactly one **active** state; done vs next visually distinct (emerald / accent pattern).
- **Entity card** — Name, EIN pattern, nexus line, and badges (**Promote ready** / **blocker**) consistent with preview story (**Aurora HoldCo LLC** aligns with `PREVIEWS` rows).
- **Doc gate** — List reflects “stamped” vs “pending”; explainer copy links **NY payroll** pending item to **blocker** badge (`iface.intake.blockerExplain`).
- **Metrics** — The three tiles are driven from `InterfacePreview.metrics` for `fidelis/intake` (Open intakes, Median time, Verify SLA).
- **i18n** — Intake shell labels use `iface.intake.*` in `shell.ts` (en / es / de) + `data-shell-i18n` on Pipeline, SLA, entity, badges, Vault/Ledger/Documents, doc statuses.
- **a11y** — Panel section id `iface-fidelis-intake` (see `SubAgentInterfacePanel`); entity `**h3`** under page `**h2**`; badges `aria-describedby` doc note; documents list `aria-label`.
- **Responsive** — `min-w-0` / truncation on doc rows and grid columns to avoid horizontal clip on narrow viewports.

## Interface states (Sigma step 7 lite)


| State                                | Behavior                                                                           |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| **Happy path**                       | As designed: Vault active, one pending doc, promote-ready + blocker badges.        |
| **Empty queue** (optional follow-up) | If we add props later: copy for “no open intakes” — out of scope unless timeboxed. |
| **Error**                            | Not simulated until API exists; leave `// static preview` contract in flavor text. |


## Technical notes

- **Single source for steps:** Implemented — `railStepsFromCopy(copy)` in `IntakeInterface.astro` parses `01 · Collect` style labels from `copy.steps`.
- **API hook:** Placeholder line in generic fallback references `GET /api/hub/surface?...` — Intake batch component should remain consistent with that contract when wired.

## Verification (before closing PRD)

1. Read `fidelisIntake` terminal + steps aloud against **IntakeInterface** UI.
2. Diff `PREVIEWS["fidelis/intake"]` rows vs queue list in generic `SubAgentInterfacePanel` path (batch 1 uses custom component — ensure mental model matches Batch 1 story).
3. Lighthouse / keyboard pass on `/fidelis/intake#iface-fidelis-intake`.

## When this ships

1. Set `INTERFACE_DEV_SEQUENCE_INDEX` to `1` (next: **tide/ops**) per `interfaceBatches.ts`.
2. Narrative log in Obsidian `Batch log` / `Build log` (optional but recommended).
3. Open `**F2-tide-ops-interface.md`** for Ops (Batch 1 step 2).