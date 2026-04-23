# Integration spec · `tide/ops`

**SKU:** Ops — tickets, incidents, standup.  
**Catalog:** GA · surfaces: REST, webhooks in/out, OAuth/SSO, event stream.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Tickets, incidents, shifts, SLA configs |
| Webhook inbound | PMS, messaging, IoT alerts → incidents |
| Webhook outbound | Escalations to concierge/revenue; partner paging |
| OAuth / SSO | Property / brand orgs; role claims map to RBAC |
| Event stream | Real-time board updates for embedded ops consoles |

## Auth

- **Org:** `property_id` or `brand_id` scoping; API keys for server-to-server integrations.
- **Scopes:** `ops:read`, `ops:write`, `ops:admin`.

## Webhooks (outbound)

| Event | When | Idempotency |
|-------|------|-------------|
| `ops.incident.opened` | P1/P2 created | `incident_id` + `event_id` |
| `ops.ticket.updated` | Status / assignee change | `ticket_id` + `sequence` |
| `ops.sla.breached` | SLA timer exceeded | `sla_breach_id` |

## Webhooks (inbound)

- Normalize external IDs → `external_ref`; dedupe on (`source`, `external_ref`) within 48h.

## REST (representative)

- `POST /v1/properties/{id}/incidents` — create from template.
- `PATCH /v1/tickets/{id}` — status transitions with validation graph.

## GA checklist

- [ ] PMS field mapping guide + sandbox fixtures
- [ ] Rate limits for high-volume sensor ingress
- [ ] On-call routing matrix documented for outbound webhooks
