# Integration spec · `lore/lab`

**SKU:** Lab — cohort workshops, recordings, artifacts.  
**Catalog:** GA · surfaces: REST, webhooks, OAuth/SSO, embed widget.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Sessions, recordings metadata, artifact manifests |
| Webhook inbound | Video provider / calendar completion |
| Webhook outbound | Dossier + Cohort digest hooks |
| OAuth / SSO | Facilitator vs learner roles |
| Embed widget | Optional in-LMS lab player |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `lore.lab.session.ended` | `session_id` + `event_id` |
| `lore.lab.artifact.ready` | `artifact_id` + `event_id` |

## GA checklist

- [ ] Recording retention policy per institution
- [ ] Embed CSP / domain allowlist
