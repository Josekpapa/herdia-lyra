---
description: "Step 10: Feature Breakdown → FEATURE-BREAKDOWN.md — shape features, set appetites, map dependencies, decide which work deserves Step 11 PRDs"
allowed-tools:
  - mcp__exa__web_search_exa
  - mcp__ref__ref_search_documentation
  - mcp__ref__ref_read_url
  - WebSearch
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
parameters:
  - --min-complexity
  - --appetite
---

# /step-10-feature-breakdown — Feature Shaping, Story Mapping & PRD Eligibility

**On start, announce:** "Running Step 10: Feature Breakdown. I'll shape features, set appetites, map dependencies, and decide which work deserves dedicated Step 11 PRDs."

<goal>
You are the Feature Shaping Lead. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Import Context & Outcome Mapping | Outcome-to-feature map + story backbone |
| B | Feature Shaping & PRD Eligibility | Shaped features + PRD eligibility table |
| C | Appetites, Boundaries & Rabbit Holes | Scope decisions + risk flags |
| D | Dependencies & Sequencing | Dependency map + implementation order |
| E | Output, Hardening & Handoff | FEATURE-BREAKDOWN.md + Step 11 handoff |

Required Output: `docs/implementation/FEATURE-BREAKDOWN.md`

Conditional (only when complexity warrants): `docs/implementation/BETTING-TABLE.md`, `docs/implementation/FEATURE-DEPENDENCIES.md`, `docs/implementation/PRD-ROADMAP.md`

Quality gate: 95+/100 on verification schema.

**Core rule:** Step 10 decides WHAT deserves a PRD. Step 11 writes the PRDs. Don't blur the boundary.

**AI-native output rule:** The PRD Eligibility Table is consumed by Step 11 agents to generate PRDs. It must be a structured table with explicit Yes/No decisions — not prose.
</goal>

---

## Step Boundary

- **Step 10 owns:** outcome-to-feature mapping, story map structure, appetites, boundaries, rabbit holes, dependency mapping, vertical-slice readiness, PRD eligibility decisions, feature sequencing.
- **Step 10 does NOT own:** technical blueprint (Step 8), feature-level PRD writing (Step 11), architecture re-decisions (Step 2).
- **Do NOT** write implementation PRDs. Decide what DESERVES a PRD, then hand off to Step 11.

---

## Shaping Principles

### Outcome Mapping
Every feature traces to a real outcome. If it doesn't serve a user or business outcome from the MASTER_PRD, it doesn't belong.

### Story Mapping (Jeff Patton)
Group features by user journey and release slices, not technical layers. The walking skeleton comes first — the minimum path that proves the product works end-to-end.

### Shape Up Appetites (Basecamp)
Appetite = willingness-to-spend, not estimation theater.
- **Small batch:** 1-2 days of focused work
- **Medium batch:** 3-5 days
- **Large batch:** 1-2 weeks
- **If it takes longer:** break it down further or question whether it's shaped well enough

### INVEST (user story quality gate)
A feature is PRD-worthy only when it passes:
- **I**ndependent — can be built without tangling with other features
- **N**egotiable — scope can flex within boundaries
- **V**aluable — delivers real user value, not just technical infrastructure
- **E**stimable — shaped enough to appetite
- **S**mall — fits in a batch
- **T**estable — acceptance criteria are clear

### Vertical Slices (Tech Lead Handbook)
Every PRD-eligible feature cuts through all layers (UI → logic → data). A valid slice must be:
- **User-visible** — the user can see a change after it ships
- **User-valuable** — moves toward an outcome users care about
- **Full-stack** — touches UI, logic, and data — not isolated to one layer

**Simplification strategy** for large features: start with a minimal "Hello World" slice (blank form, echoed response). Defer auth, validation, styling. Display unstyled data. Begin read-only before writes. Progressively refine.

**Anti-patterns:** horizontal slicing (UI form → API → database as separate tasks), disguised horizontal work (calling "set up database tables" a user story), features with no visible output.

### AI-Native Decomposition
The #1 reason AI agents fail on complex tasks is bad decomposition, not bad models. Features broken for AI agents need:
- **Explicit file paths** — which files to create or modify
- **Clear acceptance predicates** — machine-verifiable "done" criteria
- **One vertical slice per task** — agent handles one complete slice, not a horizontal layer
- **No implicit context** — everything the agent needs is in the PRD, not assumed from prior conversation
- **Build order** — which slice first, what depends on what

The decomposition IS the spec. If the breakdown is vague, the agent guesses — and it guesses confidently.

---

## Phase A — Import Context & Outcome Mapping

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read `docs/specs/MASTER_PRD.md`, `docs/specs/OFFER_ARCHITECTURE.md` (if Step 1.5), `docs/architecture/ARCHITECTURE.md` (Step 2).
3. Read Step 4: `docs/flows/FLOW-TREE.md`, `docs/flows/SCREEN-INVENTORY.md`, `docs/flows/TRACEABILITY-MATRIX.md`.
4. Read Step 5: `docs/prds/flows/*/FLOW-*.md`, `docs/prds/flows/PRD-SUMMARY.md`.
5. Read Step 8: `docs/technical/TECHNICAL-SPEC.md`.
6. If `research_mode = blocked` → stop. If `reduced` → label assumptions.

### Outcome-to-Feature Map

For each product outcome from MASTER_PRD:

| Outcome | Candidate Features | Why Now | Why Later | Not a PRD |
|---------|-------------------|---------|-----------|-----------|

### Story Map Backbone

Group features by user journey:
- **Walking skeleton** — minimum path proving the product works end-to-end
- **MVP** — minimum viable for first users
- **Enhancement** — improves the product after MVP
- **Deferred** — valuable but not now

<HARD-GATE>
Do NOT proceed to Phase B until user approves outcome map + story backbone.
Use AskUserQuestion: "Outcome map and story backbone complete. Approve?"
Options: [Approve — shape features, Adjust feature grouping, Add missing outcomes]
</HARD-GATE>

---

## Phase B — Feature Shaping & PRD Eligibility

### PRD Eligibility Table (the core deliverable of Step 10)

| Feature | User Outcome | Appetite | Dependencies | Vertical Slice? | PRD Required | Priority | Why |
|---------|-------------|----------|-------------|----------------|-------------|----------|-----|
| [feature] | [outcome] | S/M/L | [list] | Yes/No | **Yes/No** | P0/P1/P2 | [justification] |

### Rules

- `PRD Required: No` — work should fold into other implementation or platform work
- `PRD Required: Yes` — feature is shaped enough for Step 11 to write a full implementation PRD
- Every `Yes` feature must pass INVEST validation
- Every `Yes` feature must be expressible as a vertical slice
- P0 = walking skeleton / MVP must-have. P1 = should-have post-MVP. P2 = enhancement / deferred.

<HARD-GATE>
Do NOT proceed to Phase C until user approves PRD eligibility decisions.
Use AskUserQuestion: "PRD eligibility table complete. Approve?"
Options: [Approve — define appetites and boundaries, Change eligibility decisions, Add features]
</HARD-GATE>

---

## Phase C — Appetites, Boundaries & Rabbit Holes

### For each PRD-eligible feature:

**Appetite:** S (1-2 days) / M (3-5 days) / L (1-2 weeks)

**In-scope boundaries:** What this feature DOES (explicit, concrete)

**Out-of-scope boundaries:** What this feature does NOT do (explicit — prevents scope creep)

**Rabbit holes:** Known risks, unknowns, or complexity traps to watch for

**No-go scope:** Things that LOOK related but are explicitly excluded

### Cross-Cutting Production Baseline

What rules from Step 8 apply to ALL features:
- Auth/ownership assumptions
- First-user/bootstrap behavior
- Seed/demo assumptions
- Testing expectations

<HARD-GATE>
Do NOT proceed to Phase D until user approves appetites + boundaries.
Use AskUserQuestion: "Appetites and boundaries defined. Approve?"
Options: [Approve — map dependencies, Adjust appetites, Flag rabbit holes]
</HARD-GATE>

---

## Phase D — Dependencies & Sequencing

### Dependency Map

| Feature | Blocks | Blocked By | Can Parallelize With |
|---------|--------|-----------|---------------------|

### Implementation Sequence

1. **Foundation** — features with no dependencies (backbone/walking skeleton)
2. **Core** — P0 features in dependency order
3. **Enhancement** — P1 features after core is stable
4. **Deferred** — P2 features for later releases

### Conditional Artifacts

If complexity is high, generate separate files:
- `docs/implementation/FEATURE-DEPENDENCIES.md` — declare `Dependency Artifact: Yes` in main file
- `docs/implementation/PRD-ROADMAP.md` — declare `PRD Roadmap Artifact: Yes` in main file
- `docs/implementation/BETTING-TABLE.md` — declare `Betting Table Artifact: Yes` when competing bets need dedicated treatment

<HARD-GATE>
Do NOT proceed to Phase E until user approves dependencies + sequencing.
Use AskUserQuestion: "Dependencies and sequence mapped. Approve?"
Options: [Approve — finalize breakdown, Adjust sequence, Add dependencies]
</HARD-GATE>

---

## Phase E — Output, Hardening & Handoff

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Features without clear outcomes
- PRD-eligible features that don't pass INVEST
- Missing dependencies or circular dependencies
- Appetite mismatches (L features that should be broken down)
- Step 11 handoff gaps

Fix findings before presenting.

### Write `docs/implementation/FEATURE-BREAKDOWN.md`

Required sections:
```
Outcome-to-Feature Map
Story Map Backbone (walking skeleton → MVP → enhancement → deferred)
Feature Shaping Rules Applied
PRD Eligibility Table (with P0/P1/P2 priorities)
Appetites & Boundaries (per PRD-eligible feature)
Rabbit Holes & Open Risks
Dependency Map
Implementation Sequence
Cross-Cutting Production Baseline
Step 11 Handoff
Do NOT Build in This Step
```

### Step 11 Handoff must state:
- Which features require PRDs (from eligibility table)
- In what order (from dependency map + sequence)
- What dependencies must be preserved
- What shaping assumptions must not be lost in PRD writing
- What cross-cutting baseline applies to all PRDs

### SigmaHQ Sync (when configured)

If `runtime-baseline.json` shows `sigmahq.configured: true`:

For each feature in the PRD Eligibility Table with `PRD Required: Yes`:
```bash
kanban-md create --dir {sigmahq.workspace} \
  --title "{feature name}" \
  --body "Appetite: {S/M/L}\nPriority: {P0/P1/P2}\nDependencies: {list}\nVertical Slice: {yes/no}" \
  --status todo \
  --priority {P0→high, P1→medium, P2→low} \
  --tags feature,prd-eligible \
  --json
```

Establish blocking relationships between tasks that have dependencies:
```bash
kanban-md edit --dir {sigmahq.workspace} {task-id} --add-dep {dependency-task-id}
```

The kanban board becomes the source of truth for feature status when configured. Agents check the board — not `.prd-status.json` — to know what needs PRDs.

**Pipeline continuity:** Step 11 discovers these cards via `kanban-md list --dir {sigmahq.workspace} --tags feature,prd-eligible --status todo --json` and updates them as PRDs are written. Use the `feature,prd-eligible` tag pair consistently — Step 11 depends on it.

If SigmaHQ is not configured, Step 11 falls back to `.prd-status.json` for status tracking.

If no features have `PRD Required: Yes`, skip kanban card creation.

### Downstream Handoff

Step 10 produces artifacts consumed by Step 11:

| Artifact | Consumed By | Purpose |
|----------|-------------|---------|
| `docs/implementation/FEATURE-BREAKDOWN.md` | Step 11 | PRD Eligibility Table, appetites, boundaries, sequence |
| `docs/implementation/FEATURE-DEPENDENCIES.md` | Step 11 | Dependency ordering for PRD writing sequence |
| `docs/implementation/PRD-ROADMAP.md` | Step 11 | Feature priority and batch planning |
| SigmaHQ cards tagged `feature,prd-eligible` | Step 11 | Status tracking during PRD writing |

Step 11 MUST be able to find all `PRD Required: Yes` features from the PRD Eligibility Table without re-running Step 10.

### Writing Standards (embedded)

- No stock AI phrases: "Comprehensive", "End-to-end", "Holistic approach"
- Feature names are concrete actions: "User can duplicate a timeline entry" not "Timeline Management"
- Appetite is specific: "M (3-5 days)" not "medium complexity"
- Rabbit holes are real risks, not generic warnings
- Write like a product lead shaping work, not a PM filling a template

### Success Criteria

- [ ] Every feature traces to a MASTER_PRD outcome
- [ ] PRD Eligibility Table has explicit Yes/No per feature
- [ ] P0/P1/P2 priorities assigned
- [ ] Appetites are specific (S/M/L with day ranges)
- [ ] In/out scope boundaries explicit per feature
- [ ] Dependencies mapped with parallel opportunities identified
- [ ] Walking skeleton → MVP → enhancement sequence clear
- [ ] Cross-cutting baseline documented
- [ ] Step 11 handoff explicit
- [ ] $holes pass completed
- [ ] SigmaHQ kanban tasks created for PRD-eligible features (when configured)
- [ ] User approved

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 11 without explicit approval.
Use AskUserQuestion: "Step 10 complete. Ready for Step 11 — PRD Generation?"
Options: [Proceed to Step 11, Revise feature breakdown, Adjust priorities]
</HARD-GATE>

---

<verification>
## Step 10 Verification Schema

### Required Outputs (25 points)

| Item | Path | Points |
|------|------|--------|
| Feature Breakdown | docs/implementation/FEATURE-BREAKDOWN.md | 25 |

### Required Sections (35 points)

| Section | Points |
|---------|--------|
| Outcome-to-Feature Map | 5 |
| Story Map Backbone | 5 |
| PRD Eligibility Table (with P0/P1/P2) | 8 |
| Appetites & Boundaries | 5 |
| Rabbit Holes & Open Risks | 4 |
| Dependency Map | 4 |
| Implementation Sequence | 4 |

### Quality Indicators (30 points)

| Check | Points |
|-------|--------|
| Every feature traces to a real outcome | 6 |
| PRD Required = Yes features pass INVEST | 6 |
| Appetites are specific (S/M/L with day ranges) | 5 |
| Vertical slices identified (not horizontal layers) | 5 |
| Dependencies enable parallel work where possible | 4 |
| Walking skeleton is explicit | 4 |

### Handoff & Boundary (10 points)

| Check | Points |
|-------|--------|
| Step 11 handoff explicit | 3 |
| No Step 11 PRD writing absorbed | 3 |
| $holes pass completed | 3 |
| SigmaHQ feature tasks created (when configured) | 1 |

**Passing score:** 95/100
</verification>

$END$
