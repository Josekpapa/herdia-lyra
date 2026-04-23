# Integration spec · `mortar/ledger-c`

**SKU:** Ledger-C — construction draws · retainage · COs · lien / waiver posture.  
**Catalog:** **Preview** (live agent) — surfaces below are design targets for Gateway / Hub; not GA until promoted in `OFFER_OVERRIDES` + `LYRA_MP_*` if listed.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Draw cycle, retainage held, open CO list, pay-app rows (lender, architect, waiver) |
| Webhook inbound | Lender portal status, e-signature completion |
| Webhook outbound | Site narrative attach to draw; Punch when CO blocks close-out |
| OAuth / SSO | GC, owner rep, lender read-only roles |
| Event stream | Optional analytics on draw aging and waiver gaps |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `mortar.ledger_c.draw.submitted` | `project_id` + `draw_id` + `revision` |
| `mortar.ledger_c.co.status_changed` | `project_id` + `co_id` + `event_id` |

## Preview checklist

- [ ] Draw + CO schema documented (GMP line tie, retainage policy id)
- [ ] Idempotency keys match Hub `surface` stub evolution
