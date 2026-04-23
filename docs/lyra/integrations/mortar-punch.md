# Integration spec · `mortar/punch`

**SKU:** Punch — close-out pulse · owner punch · warranty · O&M / handoff rail.  
**Catalog:** **Preview** (live agent) — surfaces below are design targets for Gateway / Hub; not GA until promoted in `OFFER_OVERRIDES` + `LYRA_MP_*` if listed.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Open punch count, warranty starts, substantial target, trade/system rows |
| Webhook inbound | Owner portal comments, commissioning sign-off tools |
| Webhook outbound | Lex handoff when warranty disputes need counsel; Seal when attestations required |
| OAuth / SSO | GC, owner rep, commissioning agent roles |
| Event stream | Optional analytics on punch aging and binder completeness |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `mortar.punch.item.completed` | `project_id` + `punch_item_id` + `revision` |
| `mortar.punch.handoff.package_published` | `project_id` + `package_id` + `version` |

## Preview checklist

- [ ] Punch + handoff package schema documented (owner vs internal items)
- [ ] Idempotency keys match Hub `surface` stub evolution
