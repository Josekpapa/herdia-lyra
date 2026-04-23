---
version: "2.2.0"
last_updated: "2026-04-19"
changelog:
  - "2.2.0: Section 10 adds conditional Visual match test row when Track A bundles exist. @ui-healer skill is the enforcement tool."
  - "2.1.0: Added Step 5 Track A bundle + Step 9 landing page (incl. Track A/B/Hybrid) ingestion. Section 7 UI Contract now references Claude Design bundles as visual source of truth when Step 5 Track A or Step 9 Track A was used. Preflight detects bundles automatically."
  - "2.0.0: AI-native PRD generation with 13 structured sections, BDD scenarios, and agentic implementation notes."
description: "Step 11: PRD Generation → implementation-ready feature PRDs that autonomous AI agents can execute overnight with zero clarification needed"
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
  - --feature-id
  - --batch
---

# /step-11-prd-generation — Implementation-Ready Feature PRDs

**On start, announce:** "Running Step 11: PRD Generation. I'll write implementation-ready PRDs for each Step 10 feature marked 'PRD Required: Yes' — detailed enough that an autonomous agent can execute overnight with zero clarification."

<goal>
You are the Feature PRD Lead. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Import Validation & PRD Target Selection | Confirmed feature list from Step 10 |
| B | PRD Framing | Metadata, environment contract, problem/outcome, scope |
| C | Feature Vertical Slice | Stories, BDD scenarios, data/API/UI/state contracts |
| D | Security, Testing & Rollout | Auth/ownership, acceptance criteria, deployment notes |
| E | Agentic Notes, Status & Hardening | File paths, agent instructions, $holes pass, status sync |

Required Outputs:
- `docs/prds/F[N]-[FEATURE-NAME].md` (one per PRD-eligible feature)
- SigmaHQ kanban board updates (when configured) OR `docs/prds/.prd-status.json` (fallback)

Quality gate: 95+/100 on verification schema.

**Core principle:** These PRDs are consumed by AI coding agents, not read in conference rooms. Every section must be structured, testable, and explicit. "If you didn't write it down, the AI will guess — and it will guess confidently."

**The overnight test:** A well-written Step 11 PRD should be executable by an autonomous agent (Claude Code, Codex, Night Watch, Coco) with zero clarification needed. If the agent would need to ask a question, the PRD is incomplete.
</goal>

---

## Step Boundary

- **Step 11 owns:** one implementation PRD per shaped feature, feature-level problem/value/scope, environment/data contract, user stories + BDD scenarios, functional requirements, per-feature data/API/UI/state contracts, security/auth/ownership, testing/acceptance, rollout notes, agentic implementation notes.
- **Step 11 does NOT own:** architecture rationale (Step 2), implementation blueprint (Step 8), feature eligibility (Step 10), runtime scaffolding (Step 14).
- **Do NOT** re-decide architecture or reshape features. Import upstream decisions and make them executable.

---

## AI-Native PRD Principles

### Structure Beats Prose
When 20 agents implement the same feature, structured specs produce agreement. Prose specs produce different "reasonable" assumptions. Use tables, predicates, code blocks — not paragraphs.

### Predictable Section Headings
Use numbered sections (Section 0, 1, 2...) so agents can reference "per Section 5" when implementing. Consistent headings across all PRDs enable agent tooling.

### BDD Scenarios Are Machine-Executable
Write Given-When-Then scenarios that are:
- **Declarative** — describe what should happen, not how
- **Bounded** — each scenario tests ONE behavior path
- **Independent** — no scenario depends on another's outcome
- **Specific** — observable states AI can validate, not vague assertions

```gherkin
# ✅ Machine-executable
Given a registered user with verified email
When they submit the login form with valid credentials
Then they are redirected to the dashboard
And the session cookie is set with httpOnly flag

# ❌ Too vague for AI
Given the user is set up
When they log in
Then it should work
```

### Negative Requirements Are Mandatory
Every PRD must include explicit "Do NOT" items — things the agent should avoid building. Without these, agents build unwanted features confidently.

### File Paths Are Required
The agentic notes section must name specific files to create or modify. Agents without file path guidance create random file structures.

---

## PRD Section Set

Every `docs/prds/F[N]-[FEATURE-NAME].md` must include:

### Section 0: Shape Metadata
Import directly from Step 10 — do NOT reshape:
- Feature ID, appetite (S/M/L), priority (P0/P1/P2)
- PRD Required basis, dependencies, vertical-slice note
- Sequencing position, rabbit holes / open risks

### Section 0.5: Environment & Data Mode Contract
Every PRD must make clear:
- Local vs staging vs production behavior
- Mock-to-real replacement rules (what's fake in prototype → what's real in production)
- First real user behavior (what a brand-new account sees)
- Ownership and visibility constraints (who can see/edit what)
- Demo/seed policy (what seed data exists, what doesn't)

### Section 1: Problem & Outcome
- User problem (specific, not generic)
- Desired outcome (measurable transformation)
- Business or user value (why this feature exists now)
- Value Equation check: does this increase Dream Outcome or Perceived Likelihood, or decrease Time Delay or Effort?

### Section 2: Scope, Boundaries & Dependencies
- **In scope** (P0 items — must ship)
- **Out of scope** (explicit exclusions)
- **Do NOT build** (negative requirements — things agent must avoid)
- Upstream dependencies inherited from Step 8
- Reusable contracts inherited from prior steps

### Section 3: User Stories & BDD Scenarios
- Key user stories (As a [role], I want [action], so that [benefit])
- Happy-path BDD scenarios (Given-When-Then)
- Edge-case scenarios
- Error/recovery scenarios
- Each scenario = one behavior path, machine-executable

### Section 4: Functional Requirements
Structured as a requirements table:

| Req ID | Description | Priority | Acceptance Predicate |
|--------|------------|----------|---------------------|
| F1 | [requirement] | P0 | [testable predicate] |

### Section 5: Data Model & Persistence Delta
- New entities/tables/fields this feature adds
- Relationships and constraints
- Migration requirements
- Indexes needed
- What changes vs what's inherited from Step 8 schema

### Section 6: API / Server Action / Integration Contract
- New endpoints or Server Actions this feature requires
- Request/response shapes (TypeScript types or JSON examples)
- Auth requirements per action
- Error contract (using the standard ActionResult shape from Step 8)
- External integrations triggered

### Section 7: UI & Component Contract
- Screens/routes this feature touches (reference Step 4 screen IDs)
- **Visual source of truth:**
  - If Step 5 Track A: `docs/prds/flows/[NN]-[flow-slug]/claude-design/[specific-path]` — Claude Design bundle is the approved visual direction. Scaffold must match within UI Profile tolerances.
  - If Step 5 Track B: `docs/prds/flows/[NN]-[flow-slug]/screens/[screen-id].html` — HTML wireframe is the visual spec.
  - If landing page feature: reference `docs/landing-page/claude-design/` (Track A/Hybrid) or `docs/landing-page/landing-page.html` (Track B).
- New components needed (reference Step 6 component families + bundle components when available)
- shadcn components used (if applicable — reference specific components by name)
- Layout behavior (responsive rules, DNA emphasis)
- Realistic content examples — inherit from bundle copy (Track A) or wireframe content (Track B). Do NOT re-author realistic content; preserve what was approved upstream.

### Section 8: State & Recovery Contract
- States this feature introduces (reference Step 7 state taxonomy)
- Loading, error, empty, success behavior per screen
- Optimistic update patterns (if applicable)
- Recovery paths for each failure mode
- Announcement/focus rules (from Step 7)

### Section 9: Security, Auth & Ownership
- Auth rules for this feature
- Authorization/ownership (who can create/read/update/delete)
- RLS or data-ownership rules
- Permission handling (what unauthorized users see)
- Sensitive actions requiring confirmation

### Section 10: Testing & Acceptance
Concrete, testable criteria:

| Test Type | What to Test | Expected Result |
|-----------|-------------|-----------------|
| Unit | [function/validator] | [predicate] |
| Integration | [API/action] | [predicate] |
| E2E | [user journey] | [predicate] |
| Accessibility | [a11y check] | [predicate] |
| **Visual match (Track A only)** | **Rendered scaffold vs Claude Design bundle** | **≤ 5% pixel deviation via `@ui-healer` OR structural match (component tree + token values align)** |

**Visual-match conditional rule:** include the Visual match row **only when** the feature's flow has `docs/prds/flows/[NN]-[flow-slug]/claude-design/` bundle content (Step 5 Track A was used) OR the feature touches the landing page and `docs/landing-page/claude-design/` exists. Skip this row entirely for Track B / backend-only features — no bundle means no visual spec to match against.

BDD scenarios from Section 3 should be directly convertible to test cases.

### Section 11: Rollout, Metrics & Risks
- Feature flag strategy (if applicable)
- Rollout plan (all-at-once, staged, percentage)
- Success metrics (what to measure post-launch)
- Risks and mitigations

### Section 12: Agentic Implementation Notes
This is what makes the PRD AI-executable:
- **File paths** — specific files to create or modify
- **Implementation order** — which files first, what depends on what
- **Key contracts** — upstream contracts that must NOT be violated
- **Conditional artifacts** — what to inspect before coding
- **Testing command** — exact command to verify (e.g., `vitest run src/features/[feature]/`)
- **Do NOT** — explicit agent constraints

---

## Phase A — Import Validation & PRD Target Selection

### Upstream Requirements

| Artifact | Source Step | Required |
|----------|-----------|----------|
| `docs/implementation/FEATURE-BREAKDOWN.md` | Step 10 | **Yes** — PRD Eligibility Table is the sole input |
| `docs/implementation/FEATURE-DEPENDENCIES.md` | Step 10 | Conditional — only if declared in FEATURE-BREAKDOWN.md |
| `docs/implementation/PRD-ROADMAP.md` | Step 10 | Conditional — only if declared in FEATURE-BREAKDOWN.md |
| `docs/technical/TECHNICAL-SPEC.md` | Step 8 | **Yes** — contracts, schema, API shapes |
| `docs/design/DESIGN-SYSTEM.md` | Step 6 | **Yes** — component families, tokens |
| `docs/states/STATE-SPEC.md` | Step 7 | **Yes** — state taxonomy |
| `docs/prds/flows/*/FLOW-*.md` | Step 5 | **Yes** — prototype PRDs for hardening |
| `docs/prds/flows/*/claude-design/` | Step 5 Track A | Conditional — present when Step 5 used Track A (Claude Design visual validation). When present, this is the **visual source of truth** for UI Contract sections. |
| `docs/prds/flows/*/screens/*.html` | Step 5 Track B | Conditional — present when Step 5 used Track B (direct HTML wireframes). When present, reference as visual spec. |
| `docs/landing-page/LANDING-PAGE.md` | Step 9 | Conditional — present when product has a landing page. Features that touch the landing page must reconcile with this. |
| `docs/landing-page/claude-design/` | Step 9 Track A / Hybrid | Conditional — present when Step 9 used Track A or Hybrid. Landing page feature PRDs reference this bundle as visual source. |
| `docs/landing-page/landing-page.html` | Step 9 Track B | Conditional — present when Step 9 used direct HTML. Reference as visual spec. |

**Fallback:** If `FEATURE-BREAKDOWN.md` is missing, halt and notify the user: "Step 11 requires the PRD Eligibility Table from Step 10. Run Step 10 first." If other upstream artifacts are missing, note the gap in each PRD's Section 0 and label affected sections as assumptions.

### Track Detection

During Preflight, detect which Step 5 track was used:
- If `docs/prds/flows/*/claude-design/` contains bundle content → **Step 5 Track A** was used
- If `docs/prds/flows/*/screens/*.html` contains HTML wireframes → **Step 5 Track B** was used
- If a feature touches the landing page and `docs/landing-page/claude-design/` exists → **Step 9 Track A or Hybrid** was used
- Record detected tracks in each PRD's Section 0 so downstream agents know where to look for visual source of truth.

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read `docs/implementation/FEATURE-BREAKDOWN.md` (Step 10) — if missing, halt per fallback rule above.
3. Read Step 10 support artifacts if declared (`FEATURE-DEPENDENCIES.md`, `PRD-ROADMAP.md`).
4. Read `docs/technical/TECHNICAL-SPEC.md` (Step 8), `docs/design/DESIGN-SYSTEM.md` (Step 6), `docs/states/STATE-SPEC.md` (Step 7).
5. Read Step 5 flow PRDs: `docs/prds/flows/*/FLOW-*.md`.
6. **Detect Step 5 track:** inspect `docs/prds/flows/*/claude-design/` (Track A bundles) and `docs/prds/flows/*/screens/*.html` (Track B wireframes). Record which track each flow used.
7. **Detect Step 9 outputs if present:** read `docs/landing-page/LANDING-PAGE.md`, `docs/landing-page/claude-design/` (Track A/Hybrid bundles), `docs/landing-page/landing-page.html` (Track B). If landing page is in scope, features that touch it must reference these artifacts.
8. If `research_mode = blocked` → stop. If `reduced` → label assumptions.

### SigmaHQ Status Tracker Detection

If `runtime-baseline.json` shows `sigmahq.configured: true`:
- Read the kanban board for PRD-eligible feature tasks (created by Step 10)
- Discover feature task IDs: `kanban-md list --dir {sigmahq.workspace} --tags feature --status todo --json`
- Match tasks by title to the PRD Eligibility Table features
- These become the status tracker — update cards as PRDs are written
- `.prd-status.json` is not required when the kanban board is active

If SigmaHQ is not configured:
- `.prd-status.json` remains the primary status tracker (legacy behavior)

### Confirm PRD targets

From Step 10's PRD Eligibility Table, list all features with `PRD Required: Yes`:

| Feature | Priority | Appetite | Dependencies | Status |
|---------|----------|----------|-------------|--------|
| [feature] | P0/P1/P2 | S/M/L | [deps] | pending |

Use AskUserQuestion: "These features need PRDs. Which should I write first?"
Options: [Write P0 features first (recommended), Write all in sequence order, Pick specific feature, Write all at once]

<HARD-GATE>
Do NOT proceed to Phase B until user approves PRD target list.
Use AskUserQuestion: "PRD targets confirmed. Approve?"
Options: [Approve — start writing PRDs, Adjust feature list, Go back to Step 10]
</HARD-GATE>

---

## Phase B — PRD Framing (per feature)

For each PRD-eligible feature, write these sections first:
- **Section 0: Shape Metadata** — import directly from Step 10's PRD Eligibility Table (feature ID, appetite, priority, dependencies, rabbit holes). Do NOT reshape.
- **Section 0.5: Environment & Data Contract** — define local/staging/production behavior, mock-to-real rules, first-user behavior, ownership constraints.
- **Section 1: Problem & Outcome** — user problem, desired outcome, value equation check.
- **Section 2: Scope, Boundaries & Dependencies** — in-scope P0 items, explicit exclusions, "Do NOT build" list, upstream dependencies from Step 8.

## Phase C — Feature Vertical Slice (per feature)

Write the implementation contracts:
- **Section 3: User Stories & BDD Scenarios** — happy-path, edge-case, and error/recovery scenarios. Each scenario = one behavior path, machine-executable Given-When-Then.
- **Section 4: Functional Requirements** — structured requirements table with testable acceptance predicates.
- **Section 5: Data Model Delta** — new entities, relationships, migrations, indexes.
- **Section 6: API / Server Action Contract** — endpoints, request/response shapes, auth per action, error contract.
- **Section 7: UI & Component Contract** — screens, components, layout behavior, realistic content.
- **Section 8: State & Recovery Contract** — states introduced, loading/error/empty/success behavior, recovery paths.

## Phase D — Security, Testing & Rollout (per feature)

Write the hardening sections:
- **Section 9: Security, Auth & Ownership** — auth rules, authorization/ownership, RLS, permission handling.
- **Section 10: Testing & Acceptance** — unit/integration/E2E/accessibility test table with testable predicates.
- **Section 11: Rollout, Metrics & Risks** — feature flag strategy, rollout plan, success metrics, risk mitigations.
- **Section 12: Agentic Implementation Notes** — file paths, implementation order, key contracts, testing command, explicit "Do NOT" constraints.

### Per-feature checkpoint

After completing each PRD (Sections 0-12):

<HARD-GATE>
Use AskUserQuestion: "PRD for [feature name] complete. Review?"
Options: [Approve — continue to next feature, Revise — adjust this PRD, Skip — defer this feature]
</HARD-GATE>

---

## Phase E — Agentic Notes, Status & Hardening

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` for each PRD to find:
- Sections with vague requirements an agent would need to clarify
- Missing BDD scenarios for edge cases
- File paths missing from agentic notes
- Acceptance criteria that aren't machine-verifiable
- Contradictions with Step 8 blueprint

Fix findings before presenting.

### Update PRD Status

**When SigmaHQ is configured (primary):**

As each PRD is written:
```bash
kanban-md move --dir {sigmahq.workspace} {feature-task-id} doing   # when PRD writing starts
```

When a PRD is approved:
```bash
kanban-md move --dir {sigmahq.workspace} {feature-task-id} done    # when PRD is approved
```

After all PRDs are complete, parse each PRD into engineering sub-tasks:
```bash
# For each PRD section that represents implementation work:
kanban-md create --dir {sigmahq.workspace} \
  --title "{PRD-ID}: {section name}" \
  --body "Acceptance: {criteria}\nFiles: {file paths}\nAgent: {suggested assignment}" \
  --status todo \
  --tags eng-task \
  --priority {inherited from parent feature} \
  --json
```

Discover feature task IDs from the board: `kanban-md list --dir {sigmahq.workspace} --tags feature --json`. Match by feature name.

This creates the engineering ticket layer that Steps 13-14 consume for agent assignment and dispatch.

**Pipeline continuity:** Step 13 discovers these engineering sub-tasks via `kanban-md list --dir {sigmahq.workspace} --tags eng-task --status todo --json`. Use the `eng-task` tag consistently — Step 13 depends on it for agent assignment.

**When SigmaHQ is NOT configured (fallback):**

Update `docs/prds/.prd-status.json`:
```json
{
  "features": [
    {
      "id": "F1",
      "name": "[feature]",
      "file": "docs/prds/F1-[feature].md",
      "status": "draft",
      "approved": false,
      "priority": "P0",
      "appetite": "M",
      "dependencies": [],
      "approvedAt": null
    }
  ]
}
```

Set `approved: true` only after HITL approval at the final checkpoint.

### The Overnight Test

Before marking any PRD complete, ask: "Could an autonomous agent execute this PRD overnight with zero clarification?" If the answer is no — the PRD needs more specificity.

### Writing Standards (embedded)

- No stock AI phrases: "Comprehensive", "Robust", "Seamless integration", "End-to-end"
- Requirements are specific predicates, not descriptions: "Response time < 200ms" not "should be fast"
- BDD scenarios use concrete values: "Given user with email 'test@example.com'" not "Given a user"
- File paths are exact: `src/features/auth/login.ts` not "the login module"
- Write like a staff engineer handing a spec to an autonomous agent, not a PM writing a feature brief

### Success Criteria

- [ ] One PRD per Step 10 PRD-eligible feature
- [ ] All 13 sections present in each PRD (0-12)
- [ ] BDD scenarios are machine-executable (Given-When-Then, one behavior per scenario)
- [ ] Acceptance criteria are testable predicates
- [ ] Negative requirements ("Do NOT") present
- [ ] File paths in agentic notes
- [ ] Environment/data contract explicit
- [ ] Step 8 contracts inherited, not duplicated
- [ ] SigmaHQ kanban updated with PRD status + engineering sub-tasks (when configured), OR .prd-status.json updated (fallback)
- [ ] $holes pass completed per PRD
- [ ] User approved each PRD

### Downstream Handoff

Step 11 produces artifacts consumed by later steps:

| Artifact | Consumed By | Purpose |
|----------|-------------|---------|
| `docs/prds/F[N]-[FEATURE-NAME].md` | Step 12 (context synthesis), Step 13 (skill domain mapping), Step 14 (agent dispatch) |
| SigmaHQ cards tagged `eng-task` | Step 13 (agent assignment) |
| `.prd-status.json` (fallback) | Step 12, Step 13 (when SigmaHQ not configured) |

<HARD-GATE>
FINAL GATE — Do NOT proceed to backlog conversion or Step 12 without explicit approval.
Use AskUserQuestion: "All Step 11 PRDs complete. Ready to proceed?"
Options: [Proceed to Step 12 — Context Engine, Run sigma prd-json for backlog conversion, Revise PRDs]
</HARD-GATE>

---

<verification>
## Step 11 Verification Schema

### Required Outputs (25 points)

| Item | Path | Points |
|------|------|--------|
| At least one feature PRD | docs/prds/F*-*.md | 15 |
| PRD Status | SigmaHQ kanban (when configured) OR docs/prds/.prd-status.json | 10 |

### Required Sections per PRD (40 points)

| Section | Points |
|---------|--------|
| Section 0: Shape Metadata | 3 |
| Section 0.5: Environment & Data Contract | 4 |
| Section 1: Problem & Outcome | 3 |
| Section 2: Scope + Do NOT Build | 4 |
| Section 3: User Stories + BDD Scenarios | 5 |
| Section 4: Functional Requirements (table) | 3 |
| Section 5: Data Model Delta | 3 |
| Section 6: API/Action Contract | 4 |
| Section 7: UI & Component Contract | 3 |
| Section 8: State & Recovery Contract | 3 |
| Section 10: Testing & Acceptance (predicates) | 3 |
| Section 12: Agentic Notes (file paths) | 2 |

### Quality Indicators (25 points)

| Check | Points |
|-------|--------|
| BDD scenarios are machine-executable (concrete Given-When-Then) | 6 |
| Acceptance criteria are testable predicates | 5 |
| Negative requirements ("Do NOT") present | 4 |
| File paths in agentic implementation notes | 4 |
| PRD passes "overnight test" — zero clarification needed | 4 |
| Upstream decisions inherited, not duplicated | 2 |

### Handoff & Boundary (10 points)

| Check | Points |
|-------|--------|
| PRD status updated (SigmaHQ kanban or .prd-status.json) with approval flag | 3 |
| Step 8 contracts respected | 3 |
| Step 10 shaping preserved | 2 |
| $holes pass completed per PRD | 2 |

**Passing score:** 95/100
</verification>

$END$
