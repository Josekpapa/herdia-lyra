# Integration spec · `mortar/permit`

**SKU:** Permit — filings + agency queue across jurisdictions.  
**Catalog:** **Preview** (live agent) — surfaces below are design targets for Gateway / Hub; not GA until promoted in `OFFER_OVERRIDES` + `LYRA_MP_*` if listed.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Jurisdictions, items in review, issued counts, agency rows (plan check, hearings, targets) |
| Webhook inbound | Portal / expeditor status updates, inspection outcomes |
| Webhook outbound | Blueprint revision triggers resubmit; Site / Ledger-C when TCO conditions clear |
| OAuth / SSO | GC, owner, expeditor roles |
| Event stream | Optional analytics on review aging and hearing slip |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `mortar.permit.filing.status_changed` | `project_id` + `filing_id` + `event_id` |
| `mortar.permit.tco.target_updated` | `project_id` + `target_id` + `revision` |

## Preview checklist

- [ ] Filing + jurisdiction schema documented (plan check week model vs hearing vs hold)
- [ ] Idempotency keys match Hub `surface` stub evolution
