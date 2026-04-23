# Integration spec · `tide/scout`

**SKU:** Scout — new channels, new inventory, quietly.  
**Catalog:** GA · surfaces: REST, inbound/outbound webhooks, OAuth/SSO, event stream.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Channel experiments, inventory experiments, lift readouts |
| Webhook inbound | Channel manager / OTA feed callbacks |
| Webhook outbound | Revenue + Ops when experiment crosses guardrails |
| OAuth / SSO | Brand / portfolio scoping |
| Event stream | Optional feed for portfolio BI |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `scout.experiment.status` | `experiment_id` + `event_id` |
| `scout.inventory.delta` | `channel_id` + `batch_id` + `event_id` |

## GA checklist

- [ ] Experiment schema (control / variant / KPI) in OpenAPI
- [ ] Document rate limits for partner channel callbacks
