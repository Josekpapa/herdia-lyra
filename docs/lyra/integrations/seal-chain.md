# Integration spec · `seal/chain`

**SKU:** Chain — chain-of-custody, forever.  
**Catalog:** GA · surfaces: REST, outbound webhooks, event stream, OAuth/SSO.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Custody graph, verify integrity, export proofs |
| Webhook outbound | Archival, compliance monitors on integrity events |
| Event stream | Append-only custody feed for regulators / partners |
| OAuth / SSO | Same firm model as Stamp |

## Auth

- Scopes: `chain:read`, `chain:verify`, `chain:export` (time-bounded).

## Webhooks (outbound)

| Event | When | Idempotency |
|-------|------|-------------|
| `chain.node.appended` | New custody node | `node_id` + `event_id` |
| `chain.integrity.alert` | Verification failure | `alert_id` |

## Verification API

- `GET /v1/proofs/{root}` — Merkle / signed root metadata (exact crypto TBD in implementation PRD).

## GA checklist

- [ ] Proof format versioned + published schema
- [ ] Cold archive handoff spec (S3/Glacier or partner vault)
- [ ] SLAs for stream lag and verification latency
