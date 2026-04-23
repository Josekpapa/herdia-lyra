# Integration spec · `mortar/blueprint`

**SKU:** Blueprint — drawing set + RFI / coordination rail.  
**Catalog:** **Preview** (live agent) — surfaces below are design targets for Gateway / Hub; not GA until promoted in `OFFER_OVERRIDES` + `LYRA_MP_*` if listed.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Active sets, RFI queue, sheet due dates, clash / zone status |
| Webhook inbound | Plan room events (revision publish, external RFI) |
| Webhook outbound | Permit agent handoff, ledger tie for draw packages |
| OAuth / SSO | GC / owner / design team identity |
| Event stream | Optional analytics on RFI aging and revision churn |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `mortar.blueprint.set.issued` | `project_id` + `set_id` + `revision` |
| `mortar.blueprint.rfi.status_changed` | `project_id` + `rfi_id` + `event_id` |

## Preview checklist

- [ ] Set + revision schema documented (permit vs IFB vs IFI)
- [ ] Idempotency keys match Hub `surface` stub evolution
