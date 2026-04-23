# Integration spec · `tide/guestbook`

**SKU:** Guestbook — every guest, every visit, forever.  
**Catalog:** GA · surfaces: REST, inbound/outbound webhooks, OAuth/SSO, event stream.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Guest profiles, stay history, preferences, loyalty tags |
| Webhook inbound | PMS / CRS guest merges, OTA profile sync |
| Webhook outbound | Concierge + Ops when VIP pattern or repeat-guest signal fires |
| OAuth / SSO | Property org + staff roles |
| Event stream | Optional analytics / CDP handoff |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `guestbook.profile.updated` | `guest_id` + `event_id` |
| `guestbook.stay.closed` | `stay_id` + `event_id` |

## GA checklist

- [ ] PMS guest id mapping + merge rules
- [ ] Retention / GDPR export contract documented for property
