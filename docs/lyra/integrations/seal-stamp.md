# Integration spec · `seal/stamp`

**SKU:** Stamp — the notary action.  
**Catalog:** GA · surfaces: REST, outbound webhooks, embed widget, OAuth/SSO.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Create session, apply stamp, finalize journal entry |
| Webhook outbound | Firm systems, Lex/Mortar handoffs on completion |
| Embed widget | Host-initiated stamp flow in partner sites |
| OAuth / SSO | Firm users; signers may use step-up OTP |

## Auth

- **Firm API:** OAuth + `stamp:create`, `stamp:read`.
- **Embed:** origin-scoped publishable keys + short-lived session tokens.

## Webhooks (outbound)

| Event | When | Idempotency |
|-------|------|-------------|
| `seal.stamp.completed` | Stamp applied + journal sealed | `stamp_id` + `event_id` |
| `seal.session.cancelled` | User or policy abort | `session_id` + `reason_code` |

## Embed

- PostMessage API for `height`, `done`, `error`; CSP allowlist documented per partner.

## REST (representative)

- `POST /v1/firms/{firm}/sessions` — start stamp session.
- `POST /v1/sessions/{id}/stamp` — finalize (idempotent on `Idempotency-Key`).

## GA checklist

- [ ] Jurisdiction matrix (which stamp types per region)
- [ ] Widget CSP snippet + npm package version pin
- [ ] Fraud review queue hooks for anomalous velocity
