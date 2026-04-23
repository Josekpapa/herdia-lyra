# PRD — F8 · Tide · Scout · Interface shell (Batch 3, step 2)

**Status:** shipped (custom shell) · **Sigma:** Step 11  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)

## Goals

1. **Parity** — Match `PREVIEWS["tide/scout"]` (KPI strip + experiment rows).
2. **Contrast** — Lab / lift read, not Guestbook profiles or Tutor cohorts.
3. **i18n** — `iface.scout.*`.

## Acceptance

- [x] **Custom shell** — `ScoutInterface.astro`.
- [x] **Preview** — `PREVIEWS`.
- [x] **i18n** — en / es / de.
- [x] **Surface** — `/api/hub/surface?holding=tide&agent=scout`.

## When this ships

Bump `INTERFACE_DEV_SEQUENCE_INDEX` to `2` (**`fidelis/ledger`**).
