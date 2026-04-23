# PRD — F10 · Fidelis · Ledger · Interface shell (Batch 3, step 3)

**Status:** shipped (custom shell) · **Sigma:** Step 11  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)

## Goals

1. **Parity** — Metrics + rows match `PREVIEWS["fidelis/ledger"]`.
2. **Voice** — Clinical Fidelis register; close strip + reconcile queue (not Tide shells).
3. **i18n** — `iface.ledger.*` in `shell.ts`.

## Acceptance

- [x] **Custom shell** — `LedgerInterface.astro` in `interface/batch3/`.
- [x] **Preview** — `PREVIEWS`.
- [x] **i18n** — en / es / de.
- [x] **Surface** — `GET /api/hub/surface?holding=fidelis&agent=ledger`.
- [x] **Remotion** — `fidelis/ledger` backdrop tokens.

## When this ships

Set `INTERFACE_DEV_SEQUENCE_INDEX` to **`0`** and `ACTIVE_INTERFACE_DEV_BATCH` to **`4`** (Vault → Filing → Counsel). Log in Obsidian **Batch log**.
