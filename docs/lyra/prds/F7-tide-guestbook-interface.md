# PRD — F7 · Tide · Guestbook · Interface shell (Batch 3, step 1)

**Status:** shipped (custom shell) · **Sigma:** Step 11  
**Batch doc:** [INTERFACE-BATCHES.md](../INTERFACE-BATCHES.md)

## Goals

1. **Parity** — Metrics + rows match `PREVIEWS["tide/guestbook"]`.
2. **Differentiation** — Profile / VIP strip + merge & recovery queue (not Concierge threads).
3. **i18n** — `iface.guestbook.*` in `shell.ts`.

## Acceptance

- [x] **Custom shell** — `GuestbookInterface.astro` in `interface/batch3/`.
- [x] **Preview** — `interfaceBatches.ts` `PREVIEWS`.
- [x] **i18n** — en / es / de.
- [x] **Surface** — footer `GET /api/hub/surface?holding=tide&agent=guestbook`.

## When this ships

After Guestbook slice: set `INTERFACE_DEV_SEQUENCE_INDEX` to **`1`** (**`tide/scout`**). Next steps: index **`2`** → **`fidelis/ledger`**; then index **`0`**, `ACTIVE_INTERFACE_DEV_BATCH` **`4`**.
