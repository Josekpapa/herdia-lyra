# Integration spec · `tide/revenue`

**SKU:** Revenue — rate, pace, pickup.  
**Catalog:** GA · surfaces: REST, inbound/outbound webhooks, OAuth/SSO, event stream.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Comp sets, BAR, group blocks, OTA parity scans |
| Webhook inbound | RMS / PMS rate pushes, parity crawler callbacks |
| Webhook outbound | Alerts to Ops / Concierge when variance thresholds breach |
| OAuth / SSO | Property / brand org scoping |
| Event stream | Optional feed for revenue dashboards |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `revenue.variance.breach` | `alert_id` + `event_id` |
| `revenue.parity.dirty` | `scan_id` + `event_id` |

## GA checklist

- [ ] OpenAPI for KPI read + alert subscription
- [ ] Document comp-set source registry per property
