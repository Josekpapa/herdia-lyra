# Integration spec · `fidelis/ledger`

**SKU:** Ledger — books, read and write.  
**Catalog:** `OFFER_OVERRIDES` GA · surfaces: REST, inbound/outbound webhooks, OAuth/SSO, event stream.

## Surfaces


| Surface          | Use                                                        |
| ---------------- | ---------------------------------------------------------- |
| REST             | CRUD on ledger views, period close, reconciliation exports |
| Webhook inbound  | ERP / bank / payroll connectors posting transactions       |
| Webhook outbound | Notify counsel, filing, vault on material ledger events    |
| OAuth / SSO      | Firm SSO; scoped tokens per org                            |
| Event stream     | Optional: audit-grade append-only feed for partners        |


## Auth

- **Model:** OAuth 2.0 client credentials + authorization code for interactive; org-bound tokens.
- **Scopes:** `ledger:read`, `ledger:write`, `ledger:admin` (operator).
- **SSO:** SAML/OIDC mapping to `org_id`; deny cross-org reads by default.

## Webhooks (outbound)


| Event                      | When             | Payload idempotency         |
| -------------------------- | ---------------- | --------------------------- |
| `ledger.entry.created`     | New posted entry | `event_id` UUID; dedupe 24h |
| `ledger.period.closed`     | Period locked    | `period_id` + `event_id`    |
| `ledger.material_variance` | Threshold breach | `variance_id` + `event_id`  |


**Delivery:** HTTPS POST, `X-LYRA-Signature` HMAC-SHA256 over raw body + timestamp; reject >5m skew.

## Webhooks (inbound)

- **Idempotency:** `Idempotency-Key` header required; 24h replay window.
- **Validation:** JSON schema per connector type; reject unknown `source` without registration.

## REST (representative)

- `GET /v1/orgs/{org}/ledger/entries` — paginated, filter by period.
- `POST /v1/orgs/{org}/ledger/entries` — create draft; `commit` transition via `POST .../commit`.

## Idempotency & consistency

- All mutating APIs accept `Idempotency-Key`.
- Ledger commits are **monotonic** per org; failed commits return conflict with `current_revision`.

## GA checklist (Step 11)

- OpenAPI published + example collections
- Webhook signing secret rotation documented
- Rate limits + 429 contract per tier
- Runbook: connector onboarding, revoke tokens, replay DLQ