---
version: "1.1.0"
last_updated: "2026-04-19"
changelog:
  - "1.1.0: Preflight detects Step 5 Track A bundles / Track B HTML wireframes as visual source for the frontend blueprint."
  - "1.0.0: Implementation blueprint converting architecture, flows, design system, and states into engineering-ready contracts."
description: "Step 8: Technical Spec → TECHNICAL-SPEC.md — implementation blueprint converting architecture, flows, design system, and states into engineering-ready contracts"
allowed-tools:
  - mcp__exa__web_search_exa
  - mcp__exa__get_code_context_exa
  - mcp__ref__ref_search_documentation
  - mcp__ref__ref_read_url
  - mcp__firecrawl__firecrawl_search
  - mcp__supabase__search_docs
  - WebSearch
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
parameters:
  - --depth
  - --api
  - --schema
---

# /step-8-technical-spec — Technical Specification & Implementation Blueprint

**On start, announce:** "Running Step 8: Technical Spec. I'll convert architecture, prototype flows, design system, and state behavior into an engineering blueprint that agents can build from."

<goal>
You are the Implementation Blueprint Architect. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Import All Prior Decisions | Locked preconditions from Steps 2-7 |
| B | Implementation Architecture | Module boundaries, runtime model, shared contracts |
| C | Frontend + Backend Blueprint | Route structure, component strategy, service patterns, API contracts, data model |
| D | Security, Testing & Operations | Auth rules, test strategy, deployment, state implementation |
| E | Output, Hardening & Handoff | TECHNICAL-SPEC.md + conditional artifacts + Step 11 handoff |

Required Output: `docs/technical/TECHNICAL-SPEC.md`

Conditional (only when project requires them):
- `docs/api/OPENAPI-SPEC.yaml` — when custom HTTP API surface exists
- `docs/database/SCHEMA-COMPLETE.sql` — when custom schema extensions exist

Quality gate: 95+/100 on verification schema.

**Core rule:** If engineers or coding agents would still have to guess, the section is not complete.

**AI-native output rule:** TECHNICAL-SPEC.md is the primary input for Step 11 PRD generation. Every section must be structured (tables, predicates, code blocks) — not narrative prose. Agents will parse this to generate implementation PRDs.
</goal>

---

## Trigger

**Run after Step 7 (Interface States) is approved.** Step 8 imports decisions from Steps 2-7. If Step 7 STATE-SPEC.md is missing, stop and inform the user.

---

## SigmaHQ Integration (Conditional)

> If `~/.commandboard/` exists AND `kanban-md` is on PATH, integrate task tracking. Otherwise skip — the step works without it.

**Detection:**
```bash
if [[ -d ~/.commandboard && $(command -v kanban-md) ]]; then
  SIGMAHQ_ENABLED=true
  WORKSPACE=$(detect-workspace)  # from CLAUDE.md workspace table
fi
```

**If SIGMAHQ_ENABLED — create tracking task on step start:**
```bash
kanban-md create --dir "$WORKSPACE" \
  --title "Step 8: Technical Spec" \
  --body "Implementation blueprint: modules, frontend/backend, API, security, testing" \
  --status doing --priority high --tag "step-8,technical-spec" \
  --json
```

**Phase transitions (if SIGMAHQ_ENABLED):**
- After Phase C approval (frontend + backend + contracts):
  ```bash
  kanban-md create --dir "$WORKSPACE" \
    --title "Step 8: Blueprint defined" \
    --body "Frontend/backend patterns, API contracts, data model complete" \
    --status done --priority high --tag "step-8,blueprint"
  ```

**On step completion (if SIGMAHQ_ENABLED):**
```bash
TASK_ID=$(kanban-md list --dir "$WORKSPACE" --status doing --tag "step-8" --json | jq -r '.[0].id')
kanban-md move --dir "$WORKSPACE" "$TASK_ID" done
```

If SigmaHQ is not configured, skip all kanban-md commands — file-based artifacts remain the sole handoff mechanism.

---

## Step Boundary

- **Step 8 owns:** implementation blueprint, frontend/backend patterns, API contract strategy, data model, auth/security rules, testing strategy, delivery expectations, state implementation rules, Step 11 handoff.
- **Step 8 does NOT own:** architecture decisions (Step 2), design system (Step 6), state taxonomy/recovery design (Step 7), feature-level PRDs (Step 11).
- **Do NOT** re-decide architecture. Convert decisions into implementation guidance.

Step relationship: Step 2 (architecture) → Step 5 (prototype flows) → Step 6 (design system) → Step 7 (state behavior) → **Step 8 (implementation blueprint)** → Step 11 (feature PRDs).

---

## Implementation Principles

### Structure Beats Prose
When 20 agents implement the same feature, the ones with structured specs agree on behavior. The ones with prose specs each make different "reasonable" assumptions. Make decisions explicit, machine-readable, and verifiable.

### Clarity Beats Cleverness (Ousterhout)
If the spec leaves room for guessing, it's not done. Implementation guidance must be specific enough that an agent builds correctly on the first pass.

### API-First / Contract-First
Where the project exposes or consumes HTTP APIs, the contract is explicit BEFORE implementation. Auth, error contracts, versioning, and request/response shapes are defined — not discovered during coding.

### Conditional Outputs, Not Mandatory Doc Packs
Generate OpenAPI and SQL schema ONLY when the project has custom API surfaces or database entities. Don't create empty boilerplate artifacts.

---

## Phase A — Import All Prior Decisions

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read all prior step outputs:
   - `.sigma/runtime-baseline.json` (Step 0)
   - `docs/specs/MASTER_PRD.md` (Step 1)
   - `docs/specs/OFFER_ARCHITECTURE.md` + `docs/specs/pricing-config.json` (Step 1.5, if applicable)
   - `docs/architecture/ARCHITECTURE.md` (Step 2)
   - `docs/prds/flows/*/FLOW-*.md` + `docs/prds/flows/PRD-SUMMARY.md` (Step 5)
   - `docs/design/DESIGN-SYSTEM.md` + `docs/tokens/design-tokens.json` (Step 6)
   - `docs/states/STATE-SPEC.md` (Step 7)
3. **Detect Step 5 track (for frontend blueprint):**
   - If `docs/prds/flows/*/claude-design/` bundles exist (Track A) → frontend blueprint references bundles as visual/component source of truth. Scaffold decisions should preserve bundle component boundaries where possible.
   - If `docs/prds/flows/*/screens/*.html` exist (Track B) → use HTML wireframes as visual spec reference.
4. Read `.sigma/boilerplate.json` and `docs/stack-profile.json` if present.
5. If `research_mode = blocked` → stop. If `reduced` → label assumptions.

### Document imported decisions

| Source | Key Decisions Imported | Open Questions |
|--------|----------------------|----------------|
| Step 2 | Architecture style, profile, boundaries, deployment | |
| Step 5 | Flow behavior, screen count, prototype data register, **visual source** (Track A bundles at `docs/prds/flows/*/claude-design/` OR Track B HTML at `docs/prds/flows/*/screens/*.html`) | |
| Step 6 | Token architecture, component families, motion tokens | |
| Step 7 | State taxonomy, recovery patterns, a11y rules, focus management | |
| Stack profile | Framework, database, hosting, auth provider | |

### Sequential Decisions

**Decision 1: Custom API surface**
Use AskUserQuestion: "Does this project have a custom HTTP API surface that needs an OpenAPI spec?"
Options: [Yes — generate OPENAPI-SPEC.yaml, No — no custom API surface, Already defined in Step 2 architecture]

**Decision 2: Custom schema**
Use AskUserQuestion: "Does this project have custom database entities that need a schema spec?"
Options: [Yes — generate SCHEMA-COMPLETE.sql, No — using inherited/managed schema, Already defined in Step 2 architecture]

<HARD-GATE>
Do NOT proceed to Phase B until user approves imported decisions.
Use AskUserQuestion: "All prior decisions imported. Approve?"
Options: [Approve — design implementation architecture, Revisit a prior step, Adjust API/schema decisions]
</HARD-GATE>

---

## Phase B — Implementation Architecture

### Define the implementation shape (not re-deciding Step 2 — converting it)

**Runtime model:** How the system runs (monolith, serverless, service mesh, edge functions)

**Module boundaries:**
| Module | Responsibility | Dependencies | Boundary Type |
|--------|---------------|-------------|---------------|

**Shared contracts:** Types, interfaces, and schemas shared across modules

**Frontend/backend boundary:** Where the split happens, how they communicate

**External service boundaries:** How each integration connects (SDK, REST, webhook, queue)

### Research (directive queries)

1. Search `"[framework from stack-profile] implementation patterns 2026"` — current framework patterns
2. Search `"[database] schema design [domain] best practices"` — data modeling
3. If API: Search `"[framework] API route design REST 2026"` — API patterns

<HARD-GATE>
Do NOT proceed to Phase C until user approves implementation architecture.
Use AskUserQuestion: "Implementation architecture defined. Approve?"
Options: [Approve — build frontend + backend blueprint, Adjust module boundaries, Revisit architecture]
</HARD-GATE>

---

## Phase C — Frontend + Backend Blueprint

### Frontend Implementation Blueprint

**Route/page structure:**
| Route | Page/Screen | Component Strategy | Step 5 Flow Reference |
|-------|-----------|-------------------|----------------------|

**Component composition:** How Step 6 tokens and component families are consumed in code

**State implementation:** How Step 7 states are rendered (skeleton, error boundary, empty state components)

**Accessibility implementation:** How Step 7 announcement rules become ARIA attributes, focus traps, keyboard handlers

**Design system consumption:** How design-tokens.json maps to CSS variables / Tailwind theme / component props

### Backend & Service Blueprint

**API paradigm decision:**
| Paradigm | Best For | When to Use |
|----------|---------|-------------|
| **Server Actions** | Next.js internal mutations, forms | Default for full-stack Next.js — no API route boilerplate |
| **tRPC** | Full-stack TypeScript monorepos | When types must cross client/server without codegen |
| **REST** | Public APIs, mobile clients, non-TS consumers | Universal default for external-facing APIs |
| **GraphQL** | Complex data graphs, multiple consumers with different needs | Only when clients genuinely need different data shapes |

**Safe Action Pattern** (when using Server Actions):
Every Server Action is a public HTTP POST endpoint. Production pattern:
1. Authenticate → 2. Parse → 3. Validate (Zod) → 4. Authorize → 5. Mutate
Use composable middleware (`next-safe-action` or equivalent). Never run business logic before auth + validation.

**Domain/service patterns:**
| Service/Action | Domain | Input Schema | Output Shape | Auth Level | Side Effects |
|---------------|--------|-------------|-------------|-----------|-------------|

**Validation architecture:**
- Schema validation is SERVER-SIDE with Zod (or equivalent). Client validation is UX only.
- Shared schemas between client and server (import from `lib/validators/`)
- `safeParse` → return field-level errors, not throw

**Error contract (standardized across all endpoints):**
```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; errors?: Record<string, string[]> }
```

**Background jobs:** When needed — what triggers, what they do, retry (exponential backoff), failure/dead-letter behavior

**Integration patterns:** For each external service — SDK, error handling, retry, circuit breaker

### API Contract Strategy (if Decision 1 = Yes)

**Route/resource strategy:**
| Method | Path | Purpose | Auth | Request Schema | Response Schema |
|--------|------|---------|------|---------------|----------------|

**Auth rules:** How auth is enforced per route (JWT, session, API key, public)

**Error contract:** Standardized error shape (see above) across all endpoints

**Versioning:** Strategy for breaking changes (URL versioning, header versioning, none)

**Cache strategy:** `revalidatePath` vs `revalidateTag` vs time-based cache. Document per-route.

Generate `docs/api/OPENAPI-SPEC.yaml` from these decisions.

### Data Model & Persistence Strategy (if Decision 2 = Yes)

**Entity definitions:**
| Entity | Fields | Relationships | Constraints | Indexes |
|--------|--------|--------------|-------------|---------|

**Persistence patterns:** ORM/query builder, migration strategy, seed data approach

**Security:** Row-level security, data access patterns, sensitive field handling

Generate `docs/database/SCHEMA-COMPLETE.sql` from these decisions.

<HARD-GATE>
Do NOT proceed to Phase D until user approves frontend + backend + contracts.
Use AskUserQuestion: "Frontend, backend, and contract blueprints complete. Approve?"
Options: [Approve — define security and testing, Revise frontend patterns, Adjust API contracts, Revise data model]
</HARD-GATE>

---

## Phase D — Security, Testing & Operations

### Security & Auth Implementation Rules

- Auth provider and flow (OAuth, email/password, MFA, API keys)
- Secret/key handling (env vars, vault, never in committed files)
- Request validation patterns (Zod, Valibot, custom)
- Permission enforcement (middleware, RLS, role checks)
- Rate limiting strategy
- CORS configuration
- Monetization/entitlement enforcement (if Step 1.5)

### State Implementation Rules (from Step 7)

How each state family becomes code:
- Empty → component with CTA + illustration
- Loading → skeleton component matching layout
- Error → error boundary + retry mechanism
- Offline → service worker / cache-first + queue
- Permission/locked → middleware guard + UI fallback

### Testing Strategy (2026 Stack: Vitest + Playwright)

| Test Type | Framework | Coverage Target | What It Validates |
|-----------|-----------|----------------|------------------|
| Unit | **Vitest** (5-10x faster than Jest, Vite-native) | Core business logic | Pure functions, validators, transformers, state transitions |
| Component | **Vitest Browser Mode** + Testing Library | Component behavior in real browser | Renders, interactions, state changes (catches 20% of APIs jsdom misses) |
| Integration | **Vitest** + test DB | API contracts + data flow | Server Actions, tRPC procedures, database queries |
| E2E | **Playwright** (replaced Cypress — less flaky, multi-browser) | Critical user journeys | Full flow from UI to database |
| Accessibility | **axe-core** + **Playwright** | WCAG 2.2 AA compliance (legally mandatory 2026) | Contrast, focus, ARIA, keyboard |
| State verification | **Vitest Browser Mode** | Step 7 state coverage | Empty, loading, error, recovery, permission states |

**Server Action testing pattern:**
```typescript
// Mock auth, test as pure functions
vi.mock("@/lib/auth", () => ({ getSession: vi.fn() }));
it("rejects unauthenticated", async () => {
  vi.mocked(getSession).mockResolvedValue(null);
  const result = await createPost(null, formData);
  expect(result.success).toBe(false);
});
```

**Coverage merging:** Combine unit + component + E2E coverage into single report. Use V8 provider for consistent coverage across test types.

### Delivery & Operations

- Deployment strategy (Vercel, Render, Docker, etc.)
- Environment parity (dev/staging/production)
- CI/CD expectations (what runs on PR, what runs on merge)
- Monitoring/observability (error tracking, performance, uptime)
- Rollback strategy

<HARD-GATE>
Do NOT proceed to Phase E until user approves security + testing + ops.
Use AskUserQuestion: "Security, testing, and operations defined. Approve?"
Options: [Approve — write final spec, Strengthen security rules, Adjust testing strategy]
</HARD-GATE>

---

## Phase E — Output, Hardening & Handoff

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Implementation guidance that leaves room for guessing
- Missing API contracts or undefined error shapes
- Security gaps (missing auth on routes, no rate limiting)
- State implementation rules that don't match Step 7
- Step 11 handoff that's vague or incomplete

Fix findings before presenting.

### Write `docs/technical/TECHNICAL-SPEC.md`

Required sections:
```
Executive Technical Summary
Imported Decisions & Preconditions
Implementation Architecture (module boundaries, runtime, shared contracts)
Frontend Implementation Blueprint
Backend & Service Blueprint
API Contract Strategy (explicit Yes/No + details if Yes)
Data Model & Persistence Strategy (explicit Yes/No + details if Yes)
Security & Auth Implementation Rules
State Implementation Rules (from Step 7)
Testing Strategy
Delivery & Operations Expectations
Step 11 Handoff
Do NOT Build in This Step
```

### Step 11 Handoff must explicitly state:

- What feature-level detail Step 11 must specify
- API contract decisions Step 11 PRDs must respect
- Schema decisions Step 11 must preserve
- Security patterns Step 11 must enforce
- State rules Step 11 must implement
- Testing requirements per feature PRD

### Writing Standards (embedded)

- No stock AI phrases: "Scalable", "Enterprise-grade", "Best-in-class", "Cutting-edge"
- Implementation guidance is specific: "Use Zod for request validation with shared schemas in `lib/validators/`" not "validate inputs appropriately"
- API contracts show actual shapes, not descriptions of shapes
- Data models show actual fields, not descriptions of what entities exist
- Write like a staff engineer handing a blueprint to the team, not a consultant writing a proposal

### Success Criteria

- [ ] All Steps 2-7 decisions imported and referenced
- [ ] Implementation architecture converts Step 2 decisions (doesn't re-decide)
- [ ] Frontend blueprint references Step 5 flows, Step 6 tokens, Step 7 states
- [ ] API Contract: explicit Yes/No with OpenAPI if Yes
- [ ] Schema: explicit Yes/No with SQL if Yes
- [ ] Security rules are implementation-specific (not "follow best practices")
- [ ] Testing strategy has concrete framework + coverage targets
- [ ] Step 11 handoff is explicit and actionable
- [ ] $holes pass completed
- [ ] SigmaHQ kanban cards created (when configured)
- [ ] User approved

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 9 or Step 10 without explicit approval.
Use AskUserQuestion: "Step 8 complete. What's next?"
Options: [Proceed to Step 9 — Landing Page (optional), Skip to Step 10 — Feature Breakdown, Revise technical spec]
</HARD-GATE>

---

<verification>
## Step 8 Verification Schema

### Required Outputs (30 points)

| Item | Path | Points |
|------|------|--------|
| Technical Spec | docs/technical/TECHNICAL-SPEC.md | 20 |
| OpenAPI Spec | docs/api/OPENAPI-SPEC.yaml | 5 (only when API = Yes) |
| Schema SQL | docs/database/SCHEMA-COMPLETE.sql | 5 (only when Schema = Yes) |

### Required Sections (35 points)

| Section | Points |
|---------|--------|
| Executive Technical Summary | 3 |
| Imported Decisions & Preconditions | 4 |
| Implementation Architecture | 5 |
| Frontend Implementation Blueprint | 5 |
| Backend & Service Blueprint | 5 |
| API Contract Strategy (explicit Yes/No) | 4 |
| Data Model Strategy (explicit Yes/No) | 4 |
| Security & Auth Rules | 3 |
| Testing Strategy | 2 |

### Quality Indicators (25 points)

| Check | Points |
|-------|--------|
| Implementation guidance specific enough — no guessing needed | 6 |
| API contracts show actual request/response shapes | 5 |
| Data models show actual fields and relationships | 5 |
| State implementation rules match Step 7 spec | 4 |
| Testing has concrete framework + coverage targets | 3 |
| Security rules are implementation-specific | 2 |

### Handoff & Boundary (10 points)

| Check | Points |
|-------|--------|
| Step 11 handoff explicit and actionable | 4 |
| No Step 2 architecture re-decided | 2 |
| No Step 7 state taxonomy re-defined | 2 |
| $holes pass completed | 2 |
| SigmaHQ kanban cards created (when configured) | 1 |

**Passing score:** 95/100
</verification>

$END$
