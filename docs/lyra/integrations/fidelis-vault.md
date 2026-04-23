# Integration spec · `fidelis/vault`

**SKU:** Vault — documents with chain-of-custody.  
**Catalog:** GA · surfaces: REST, webhooks in/out, OAuth/SSO, MCP tool (search/summarize under policy).

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Upload, version, custody events, legal hold flags |
| Webhook inbound | DMS / email ingest, e-sign completion callbacks |
| Webhook outbound | Filing, matter, ledger hooks on custody changes |
| OAuth / SSO | Firm SSO; document-level ACLs |
| MCP tool | Scoped retrieval + citation (no raw exfil without policy match) |

## Auth

- Same org model as Ledger; additional **`vault:read`**, **`vault:write`**, **`vault:legal_hold`**.
- MCP: short-lived tool tokens bound to session + matter id.

## Webhooks (outbound)

| Event | When | Idempotency |
|-------|------|-------------|
| `vault.document.ingested` | New blob registered | `document_id` + `version` + `event_id` |
| `vault.custody.transfer` | Chain-of-custody step | `custody_event_id` |
| `vault.legal_hold.applied` | Hold placed/removed | `hold_id` + `event_id` |

Signing: same HMAC contract as Ledger.

## Webhooks (inbound)

- E-sign / DMS: verify provider JWT or mTLS per connector registry.
- **Idempotency-Key** on all posts that create documents or versions.

## REST (representative)

- `POST /v1/orgs/{org}/vault/documents` — create + presigned upload URL.
- `GET /v1/orgs/{org}/vault/documents/{id}/custody` — custody timeline.

## GA checklist

- [ ] Virus scan / content policy hooks documented
- [ ] MCP allowlist + audit log for every tool call
- [ ] Export / portability API for offboarding
