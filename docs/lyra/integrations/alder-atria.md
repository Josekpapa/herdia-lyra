# Integration spec · `alder/atria`

**SKU:** Atria — Kairos foyer · guided entry before Intake.  
**Catalog:** **Preview** (live agent) — surfaces below are design targets for Gateway / Hub; not GA until promoted in `OFFER_OVERRIDES` + `LYRA_MP_*` if listed.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Foyer session state, completion %, locale route, pilot seat caps |
| Webhook outbound | Intake unlock, Concierge-M when human handoff requested |
| OAuth / SSO | Household / corporate pilot identity |
| Event stream | Optional analytics on drop-off and completion funnel |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `alder.atria.session.completed` | `household_id` + `session_id` |
| `alder.atria.intake.unlocked` | `household_id` + `event_id` |

## Preview checklist

- [ ] Foyer session schema documented (gates: NDA, locale, pilot)
- [ ] Idempotency keys match Hub `surface` stub evolution
