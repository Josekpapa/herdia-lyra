# PRD — F3 · Seal · Stamp · Interface shell (Batch 1, step 3)

**Status:** draft · **Sigma:** Step 11 (brownfield)  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)  
**Sequence:** Enable after F2 ships — set `INTERFACE_DEV_SEQUENCE_INDEX` to `2` (focus `seal/stamp`).

## Problem

Stamp is the **attestation lane**: KYC → witness → hash → Vault handoff. The shell must match **Seal** gold/official register and align with `sealFlavor` steps (Identify · Witness · Stamp · Prove) and `PREVIEWS["seal/stamp"]`.

## Goals

1. **Parity** — Throughput metrics + queue rows match preview; stamp card (S-20118, mutual NDA) matches Batch log / Attest narrative.
2. **Pipeline** — Vertical pipeline visually distinct from Intake rail but same interaction grammar (done / active / next).
3. **Chain story** — Hash + Vault route visible; jurisdiction + witness window state matches **warn/neutral/ok** language from preview.

## Anchor paths

| Area | Path |
|------|------|
| Page | `src/pages/seal/stamp.astro` |
| UI | `StampInterface.astro` |
| Preview | `interfaceBatches.ts` → `seal/stamp` |
| Copy | `holdingFlavor.ts` → `sealFlavor` |

## Acceptance criteria

- [x] **Throughput** — Metrics from preview (Queue, Avg stamp, Jurisdictions).
- [x] **Pipeline** — Four stages; one **active** (Witness); detail lines match preview row semantics where applicable.
- [x] **Stamp request card** — ID, title, hash target, Vault route, jurisdiction, witness window.
- [x] **Queue** — `preview.rows` with tones ok / warn / neutral.
- [x] **Optional:** Pipeline **labels** come from **`copy.steps`** via `railStepsFromCopy` in `StampInterface.astro` (Identify · Witness · Stamp · Prove — locale follows landing copy).
- [x] **i18n** — `iface.stamp.*` in `shell.ts` (en / es / de) + `data-shell-i18n` on Throughput, Pipeline, stages, stamp card kicker, `dl` terms, Queue header, SEAL badge.
- [x] **a11y** — Panel section id `iface-seal-stamp`; stamp card **`h3`** under page **`h2`**; readable `dl` terms.
- [x] **Responsive** — `min-w-0` on grid; columns stack on small viewports.

## Batch contrast

Stamp is **attestation**, not hospitality ops: pipeline semantics are **KYC → witness → stamp → vault**. Batch 2 Tide agents use a different metaphor; only reuse layout grammar (done / active / next).

## Non-goals

- Live KYC vendors or witness scheduling APIs.

## When this ships

Set `INTERFACE_DEV_SEQUENCE_INDEX` to `0` and `ACTIVE_INTERFACE_DEV_BATCH` to `2` (start Batch 2) per `interfaceBatches.ts`. Log in Obsidian **Build log** / **Batch log**.
