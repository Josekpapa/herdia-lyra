# Integration spec · `lore/tutor`

**SKU:** Tutor — Q&A grounded in syllabus / cohort materials.  
**Catalog:** GA · surfaces: REST, webhooks, OAuth/SSO, MCP tool.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Sessions, citations, tutor handoff to Path / Lab |
| Webhook inbound | LMS enrollment, syllabus updates |
| Webhook outbound | Cohort + Desk when at-risk pattern fires |
| OAuth / SSO | Institution + learner roles |
| MCP tool | Optional retrieval tool for institutional MCP hosts |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `lore.tutor.session.closed` | `session_id` + `event_id` |
| `lore.tutor.at_risk` | `learner_id` + `event_id` |

## GA checklist

- [ ] LMS roster id mapping
- [ ] Content retention / FERPA posture documented
