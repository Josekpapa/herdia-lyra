# Integration spec · `lore/path`

**SKU:** Path — learning path generator and milestones.  
**Catalog:** GA · surfaces: REST, webhooks, OAuth/SSO, event stream.

## Surfaces

| Surface | Use |
|---------|-----|
| REST | Path versions, milestones, dependencies |
| Webhook inbound | Curriculum / outcome framework updates |
| Webhook outbound | Tutor + Cohort when path revision ships |
| OAuth / SSO | Program-scoped access |
| Event stream | Optional analytics on completion velocity |

## Webhooks (outbound)

| Event | Idempotency |
|-------|-------------|
| `lore.path.published` | `path_id` + `version` + `event_id` |
| `lore.path.milestone.met` | `learner_id` + `milestone_id` + `event_id` |

## GA checklist

- [ ] Path schema in OpenAPI (nodes, edges, rubrics)
- [ ] Idempotency for bulk cohort assigns
