# Integration spec · `mortar/site`

**SKU:** Site — daily pulse · photos, delays, weather & logistics rail.  
**Catalog:** **Preview** (live agent) — surfaces below are design targets for Gateway / Hub; not GA until promoted in `OFFER_OVERRIDES` + `LYRA_MP_*` if listed.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Photo set cadence, open delays, weather / rain counters, day rows (crane, laydown, owner events) |
| Webhook inbound | Drone / camera ingest, weather service hooks |
| Webhook outbound | Crew holds when logistics slip; Ledger-C narrative attachments for draws |
| OAuth / SSO | Super, PE, owner rep roles |
| Event stream | Optional analytics on delay aging and photo coverage |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `mortar.site.daily.published` | `project_id` + `day_id` + `revision` |
| `mortar.site.delay.opened` | `project_id` + `delay_id` + `event_id` |

## Preview checklist

- [ ] Day + delay schema documented (reason codes vs owner-facing summary)
- [ ] Idempotency keys match Hub `surface` stub evolution
