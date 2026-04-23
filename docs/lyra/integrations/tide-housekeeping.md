# Integration spec · `tide/housekeeping`

**SKU:** Housekeeping — room status, linen, timing.  
**Catalog:** GA · surfaces: REST, inbound/outbound webhooks, OAuth/SSO.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Room state, assignments, linen orders, VIP flags |
| Webhook inbound | PMS room status, engineering work-order completion |
| Webhook outbound | Ops floor + Concierge when turns slip or maintenance blocks |
| OAuth / SSO | Property staff roles |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `hk.turn.at_risk` | `room_id` + `event_id` |
| `hk.maintenance.block` | `work_order_id` + `event_id` |

## GA checklist

- [ ] PMS room-status field mapping
- [ ] SLA for “turn before 3pm” alerts
