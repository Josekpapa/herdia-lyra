# Integration spec · `tide/concierge`

**SKU:** Concierge — guest-facing voice across email, SMS, WhatsApp.  
**Catalog:** GA · surfaces: REST, webhooks in/out, OAuth/SSO.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Threads, templates, opt-in state, handoff to human |
| Webhook inbound | Channel adapters (Twilio, email ingress) |
| Webhook outbound | CRM / PMS profile sync, task creation |
| OAuth / SSO | Staff console; guests use channel identity, not SSO |

## Auth

- **Staff:** OAuth with `concierge:admin`.
- **Channel webhooks:** per-property signing secret; rotate independently.

## Webhooks (outbound)

| Event | When | Idempotency |
|-------|------|-------------|
| `concierge.thread.started` | New guest thread | `thread_id` + `event_id` |
| `concierge.message.inbound` | Guest message received | `message_id` |
| `concierge.handoff.requested` | AI → human | `handoff_id` |

## Compliance

- Opt-in / opt-out flags required on outbound sends; propagate `STOP` and regional quiet hours.

## REST (representative)

- `POST /v1/properties/{id}/threads/{thread}/messages` — agent or system send.
- `GET /v1/guests/{guest_id}/preferences` — channel + language.

## GA checklist

- [ ] Channel provider sandbox numbers + templates
- [ ] PII retention TTL per jurisdiction
- [ ] Load test for burst campaigns (check 429 + queue behavior)
