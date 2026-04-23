# Integration spec · `mortar/crew`

**SKU:** Crew — roster pulse · trades & gates on site.  
**Catalog:** **Preview** (live agent) — surfaces below are design targets for Gateway / Hub; not GA until promoted in `OFFER_OVERRIDES` + `LYRA_MP_*` if listed.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Headcount, sub tiers, near-miss / safety counters, trade rows (ok / hold / complete) |
| Webhook inbound | Access control / badging systems, time-clock vendors |
| Webhook outbound | Site daily when holds clear; Ledger-C when hours packages need reconciliation |
| OAuth / SSO | Super, sub foreman, safety officer roles |
| Event stream | Optional analytics on gate violations and stand-down completion |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `mortar.crew.roster.snapshot` | `project_id` + `window_start` + `window_end` |
| `mortar.crew.safety.stand_down_completed` | `project_id` + `event_id` |

## Preview checklist

- [ ] Roster + trade row schema documented (hold reasons vs complete)
- [ ] Idempotency keys match Hub `surface` stub evolution
