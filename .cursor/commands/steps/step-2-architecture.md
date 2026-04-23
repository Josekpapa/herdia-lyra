---
description: "Step 2: Architecture → ARCHITECTURE.md — system design with C4, ADR, quality attributes, trust boundaries, and AI-native output formatting for downstream agent consumption"
allowed-tools:
  - mcp__exa__web_search_exa
  - mcp__exa__get_code_context_exa
  - mcp__ref__ref_search_documentation
  - mcp__ref__ref_read_url
  - mcp__firecrawl__firecrawl_search
  - WebSearch
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
parameters:
  - --research-depth
  - --architecture-profile
---

# /step-2-architecture — Deep Architecture Decisions and System Boundaries

**On start, announce:** "Running Step 2: Architecture. I'll walk you through 5 phases — importing context, identifying drivers, evaluating options, designing the target architecture, and producing the canonical ARCHITECTURE.md."

<goal>
You are the Architecture Lead. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Import Context & Select Profile | Locked architecture profile + imported decisions |
| B | Architecture Drivers | Constraints, quality attributes, integration pressure |
| C | Options & Tradeoffs | 2-3 viable directions + ADR summary |
| D | Target Architecture | C4 views, boundaries, deployment, trust model |
| E | Output, Hardening & Handoff | ARCHITECTURE.md with Step 8/14 handoffs |

Final Output: `docs/architecture/ARCHITECTURE.md` (+ optional `docs/architecture/adrs/ADR-*.md`)

Quality gate: 95+/100 on verification schema.

**AI-native output rule:** ARCHITECTURE.md is consumed by AI agents in Steps 8, 10, 11, and 14. Every section must be structured (bullet points, tables, predicates) — not narrative prose. Agents cannot ask follow-up questions, so zero ambiguity.
</goal>

---

## Step Boundary

- **Trigger:** Run after Step 1 (or Step 1.5 if monetized). Requires `docs/specs/MASTER_PRD.md` and optionally `docs/specs/OFFER_ARCHITECTURE.md`.
- **Step 2 owns:** architecture drivers, profile, options, chosen structure, C4 views, domain/data boundaries, integrations, trust boundaries, quality attribute scenarios, ADR summary, handoffs.
- **Step 2 does NOT own:** full API specs, full schema packs, security runbooks, infrastructure runbooks, runtime scaffolding → **Step 8** and **Step 14**.
- **Do NOT** write implementation-level detail. Do NOT create runtime files. Do NOT absorb Step 8 or Step 14 work.
- **Fallback:** If MASTER_PRD.md is missing, prompt user to run Step 1 first. If Step 1.5 was expected but skipped, note monetization gaps as open risks.

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

**If SIGMAHQ_ENABLED — create tracking task at Phase A start:**
```bash
kanban-md create --dir "$WORKSPACE" \
  --title "Step 2: Architecture Design in progress" \
  --body "Phases A-E: context import, drivers, options, target architecture, hardening" \
  --status doing --priority high --tag "step-2,architecture"
```

**If SIGMAHQ_ENABLED — on direction lock (Phase C approved):**
```bash
TASK_ID=$(kanban-md list --dir "$WORKSPACE" --status doing --tag "step-2" --json | jq -r '.[0].id')
kanban-md create --dir "$WORKSPACE" \
  --title "Step 2: Architecture direction locked" \
  --body "Profile: {profile}, Style: {style}. Target design in progress." \
  --status done --priority medium --tag "step-2,architecture,milestone"
```

**If SIGMAHQ_ENABLED — on ARCHITECTURE.md completion (Phase E):**
```bash
kanban-md move --dir "$WORKSPACE" "$TASK_ID" done
```

If SigmaHQ is not configured, skip — file-based artifacts remain the sole handoff mechanism.

---

## Architecture Profile (select exactly one)

| Profile | When | Optimize for |
|---------|------|-------------|
| `bootstrap` | Early product, small team, fastest safe path | Clarity, low ops overhead, changeability. Prefer modular monolith unless evidence justifies more. |
| `growth` | Meaningful traffic, paid users, expanding team | Modularity, observability, evolution. Clear service boundaries without premature fragmentation. |
| `regulated` | Compliance, auditability, data handling drive the architecture | Traceability, trust boundaries, security controls, operational discipline. |
| `scale-critical` | Exceptional throughput, reliability, or global distribution | Capacity, isolation, resilience, failure containment. Justify with real signals — don't claim casually. |

---

## Multi-Layer Architecture Model

Reason through the system in layers, not just boxes and arrows:

1. **Experience** — web, mobile, admin, partner, CLI, API consumers
2. **Application** — routes, controllers, orchestration, workflows, use cases
3. **Domain** — entities, aggregates, bounded contexts, business rules
4. **Data** — databases, ledgers, caches, queues, search, files, analytics sinks
5. **Infrastructure** — hosting, compute, networking, secrets, CI/CD, observability
6. **Agentic Overlay** — review loops, generated rules, runtime coordination, Step 14 implications

If a decision in one layer creates consequences in another, document the dependency.

---

## Framework Library

Use to drive decisions. Skip frameworks that don't apply. Each must end in a decision, not commentary.

### Fowler — Evolutionary Architecture
- Shared architectural understanding over rigid blueprints
- Enable safe evolution — resist big-design-up-front theater
- Align architecture to real system drivers, not hypothetical scale

### Clean Architecture / Dependency Direction
- Dependencies point inward (domain knows nothing about delivery)
- Separable use-case logic, framework independence where it matters
- Don't apply dogmatically — monoliths with clean boundaries beat over-abstracted services

### Evans — DDD & Bounded Contexts
- Ubiquitous language per bounded context
- Aggregate boundaries define consistency lines
- Separate core domain from supporting domains and generic infrastructure
- Only apply when domain complexity justifies it — don't DDD a CRUD app

### Ousterhout — Complexity Reduction
- Deep modules over shallow, over-exposed interfaces
- Information hiding, cognitive load reduction
- If a decision adds complexity without solving a real problem, reject it

### Simon Brown — C4 Model
- **Required:** System Context + Containers
- **Optional:** Components (only when a container has enough internal complexity)
- Do NOT create component diagrams just because C4 has them

### ADR Discipline
Each major decision records: context, decision, consequences, alternatives considered.
If 3+ major decisions are substantial, create separate `docs/architecture/adrs/ADR-*.md` files.

### Quality Attribute Scenarios
For each quality attribute, write as machine-verifiable predicates:
- **Stimulus:** [what triggers the scenario]
- **Environment:** [under what conditions]
- **Response:** [measurable expected outcome]
- **Architectural implication:** [what this forces]

Address at minimum: performance, reliability, security, maintainability, observability, cost/operational simplicity.

### Threat Modeling & Trust Boundaries
- Identity boundaries, data sensitivity boundaries, external system boundaries
- Privileged/internal-only surfaces
- Monetization abuse paths when Step 1.5 is in play
- Rate limiting and quota enforcement at trust boundary crossings

---

## Phase A — Import Context & Select Profile

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read `.sigma/runtime-baseline.json`, `docs/specs/MASTER_PRD.md`, `docs/stack-profile.json`.
3. Read `.sigma/boilerplate.json` if present — document extensions vs inherited baseline.
4. Read `docs/specs/OFFER_ARCHITECTURE.md` and `docs/specs/pricing-config.json` if Step 1.5 was run.
5. If `research_mode = blocked` → stop. If `reduced` → continue with assumption labels.

### Sequential Decisions

**Decision 1: Architecture Profile**
Use AskUserQuestion: "What architecture profile fits this product?"
Options: [Bootstrap — fastest safe path, Growth — modularity + observability, Regulated — compliance-first, Scale-critical — exceptional throughput/reliability]

**Decision 2: Monorepo vs Polyrepo** (if not already decided)
Use AskUserQuestion: "Repository structure?"
Options: [Monorepo (Turborepo/pnpm workspaces), Polyrepo (separate repos), Already decided in Step 1]

**Decision 3: Primary Stack Confirmation**
Present stack from `stack-profile.json`. Use AskUserQuestion: "Confirm or change the primary stack?"
Options: [Confirm stack as-is, Change frontend, Change backend, Change database, Full stack discussion needed]

**Decision 4: Component Library** (if stack includes React/Next.js/Vite)
Use AskUserQuestion: "Use shadcn/ui as the component library?"
Options: [Yes — install shadcn/ui with preset (Recommended for React), Yes — but I have a custom registry, No — using a different component library, Not applicable — not a React project]

If yes and shadcn MCP is available (from Step 0 `design_tools`):
- Run `shadcn init` (or `shadcn init --preset [code]` if a preset is already chosen)
- Record in `stack-profile.json`: `"componentLibrary": "shadcn/ui"`
- This unlocks theme preset mapping in Step 3, block scaffolding in Step 5, and preset export in Step 6

### Import Summary Table

| Source | Key Decisions Imported | Open Questions |
|--------|----------------------|----------------|
| Step 0 | runtime, research mode | |
| Step 1 | users, scope, P0 features, build order | |
| Step 1.5 | pricing model, entitlements, billing | |
| stack-profile | framework, database, hosting | |

<HARD-GATE>
Do NOT proceed to Phase B until user approves profile + stack + imports.
Use AskUserQuestion: "Context imported, profile selected. Approve?"
Options: [Approve — identify architecture drivers, Change profile, Revisit stack decisions]
</HARD-GATE>

---

## Phase B — Architecture Drivers

### Required driver categories

Document each as: driver → why it matters → which layer(s) affected → what breaks if ignored.

1. **Functional drivers** — what the system must do (from MASTER_PRD P0 features)
2. **Quality attributes** — performance, reliability, security, observability targets
3. **Compliance / data constraints** — privacy, data residency, audit requirements
4. **Team / budget / timeline constraints** — what limits the architecture options
5. **Integration constraints** — external services, APIs, vendor lock-in risks
6. **Monetization constraints** — entitlements, billing, usage metering, credit systems (if Step 1.5)
7. **Agentic constraints** — review loops, generated rules, runtime coordination needs

### Architecture Pressure Questions (answer explicitly)

- What must scale first?
- What must remain simple first?
- What data must be protected differently?
- What integrations are hardest to replace?
- What product constraints push the architecture most?

If Step 1.5 exists:
- What monetization model changes the architecture?
- Do credits/quotas/seats create data model or API consequences?
- Do entitlements affect trust boundaries or abuse prevention?

### Research (directive queries)

1. Search `"[primary stack] [architecture pattern] best practices 2026"` — validate stack fit
2. Search `"[integration] API architecture patterns"` — for each critical integration
3. If regulated: Search `"[compliance framework] architecture requirements"` — compliance constraints

<HARD-GATE>
Do NOT proceed to Phase C until user approves drivers.
Use AskUserQuestion: "Architecture drivers mapped. Approve?"
Options: [Approve — evaluate architecture options, Add more drivers, Adjust priorities]
</HARD-GATE>

---

## Phase C — Options & Tradeoffs

Evaluate 2-3 realistic directions. Do NOT invent unrealistic options to pad.

### For each option, document:

| Dimension | Answer |
|-----------|--------|
| Architecture style | [modular monolith / service-oriented / serverless / event-driven / etc.] |
| Why it fits | [specific project reasons] |
| Why it may fail | [specific risks] |
| Operational cost | [hosting, DevOps complexity] |
| Team complexity | [learning curve, coordination overhead] |
| Evolution path | [how it grows with the product] |
| Profile fit | [bootstrap / growth / regulated / scale-critical] |

### ADR Summary

Record at least one ADR-style decision for:
- Architecture style decision
- Deployment/runtime shape decision
- Data/integration boundary decision

Format: Context → Decision → Consequences → Alternatives Considered

<HARD-GATE>
Do NOT proceed to Phase D until user approves chosen direction.
Use AskUserQuestion: "Architecture direction selected. Approve?"
Options: [Approve [chosen option] — design target architecture, Choose different option, Need more research]
</HARD-GATE>

---

## Phase D — Target Architecture

Design the chosen architecture deeply enough that Steps 8, 10, 11, and 14 inherit the right shape.

### Required sections (all must be present):

**1. Executive Architecture Summary**
- Chosen style, profile, dominant drivers, dominant tradeoffs (3-5 sentences max)

**2. C4 System Context**
- Users/actors, your system, external systems, primary trust boundaries
- Use text-based diagram notation (Mermaid or ASCII)

**3. C4 Containers**
- Frontend surfaces, backend/services, data stores, queues/caches/search, external integrations
- For each container: responsibility, technology, communication pattern

**4. Domain & Data Boundaries**
- Bounded contexts or logical domains with ownership lines
- Consistency boundaries, aggregate roots
- Data sensitivity tiers
- Entitlement/ledger/usage implications when monetized

**5. Integration Inventory**

| Integration | Purpose | Criticality | Failure Mode | Replacement Difficulty | Trust Implications |
|-------------|---------|-------------|-------------|----------------------|-------------------|

**6. Deployment & Runtime Topology**
- Hosting shape, scaling strategy, observability posture (matched to profile)

**7. Trust Boundaries & Threat Model**
- Ingress, auth/identity, privileged surfaces, sensitive data flows
- Abuse risks from monetization, quotas, public APIs

**8. Quality Attribute Scenarios**
Write as predicates:
```
WHEN [stimulus] UNDER [environment] THEN [measurable response] BECAUSE [architectural mechanism]
```

**9. Boundary Tier System** (Addy Osmani pattern — for downstream agents)
```
✅ ALWAYS: [safe actions requiring no approval — e.g., "read any file in src/"]
⚠️ ASK FIRST: [high-impact changes needing review — e.g., "modify auth middleware"]
🚫 NEVER: [hard stops — e.g., "never commit secrets", "never bypass rate limiting"]
```

**10. Agentic Architecture Overlay**
- Where the agentic layer touches the system
- Architecture constraints from generated rules, skillpacks, orchestration
- What Step 14 must wire later
- If the product itself uses AI agents: which patterns apply (ReAct, Plan-Execute, Multi-Agent, Tool-Using)

**11. File Structure** (for downstream agent consumption)
```
[Suggested directory layout matching the architecture]
```

<HARD-GATE>
Do NOT proceed to Phase E until user approves target architecture.
Use AskUserQuestion: "Target architecture designed. Approve?"
Options: [Approve — write final document, Revise boundaries, Adjust deployment topology, Need more detail on a section]
</HARD-GATE>

---

## Phase E — Output, Hardening & Handoff

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Missing boundaries or weak trust model
- Shallow quality attribute scenarios
- Step 8/14 work improperly absorbed into Step 2
- Architecture decisions without documented tradeoffs
- Contradictions with MASTER_PRD or OFFER_ARCHITECTURE

Fix findings before presenting.

### Write `docs/architecture/ARCHITECTURE.md`

Required sections (in order):
```
Executive Architecture Summary
Architecture Profile
Imported Inputs & Assumptions
Architecture Drivers
Evaluated Options & Tradeoffs
Chosen Direction
ADR Summary
C4 System Context
C4 Containers
Domain & Data Boundaries
Integration Inventory
Deployment & Runtime Topology
Trust Boundaries & Threat Model
Quality Attribute Scenarios
Boundary Tier System (Always / Ask First / Never)
Agentic Architecture Overlay
Suggested File Structure
Step 8 Handoff — what implementation detail Step 8 must elaborate
Step 11 Implications — what architecture constraints PRDs must respect
Step 14 Handoff — what runtime Step 14 must wire
Do NOT Build in This Step — what was intentionally deferred
Open Risks & Deferrals
```

### Writing Standards (embedded)

- No stock AI phrases: "Robust", "Seamless", "Leverage", "Ecosystem", "Scalable" (unless quantified), "Best-in-class"
- Start with decisions, not industry commentary about architecture trends
- Commit to choices — no "we might consider" hedging
- Write like a principal engineer, not a architecture blog post
- Every claim traces to a driver, constraint, or ADR
- Diagrams in text notation (Mermaid preferred) — no placeholder boxes

### Success Criteria

- [ ] Architecture profile is explicit and justified
- [ ] Drivers are explicit and traceable to product decisions
- [ ] Options and rejected alternatives are documented with tradeoffs
- [ ] C4 context and container views present
- [ ] Trust boundaries documented
- [ ] Quality attribute scenarios as predicates
- [ ] Boundary tier system (Always/Ask/Never) present
- [ ] Step 8 handoff explicit
- [ ] Step 14 handoff explicit
- [ ] No Step 8/14 work absorbed into Step 2
- [ ] File structure suggested for downstream agents
- [ ] $holes pass completed
- [ ] User approved
- [ ] SigmaHQ kanban tasks created (when configured)

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 3 without explicit approval.
Use AskUserQuestion: "Step 2 complete. Ready for Step 3 — UX Design?"
Options: [Proceed to Step 3, Revise architecture, Run additional research]
</HARD-GATE>

---

<verification>
## Step 2 Verification Schema

### Required Outputs (30 points)

| Item | Path | Points |
|------|------|--------|
| Architecture Document | docs/architecture/ARCHITECTURE.md | 30 |

### Required Sections (40 points)

| Section | Points |
|---------|--------|
| Architecture Profile (justified) | 6 |
| Architecture Drivers (traceable) | 6 |
| Chosen Direction + Tradeoffs + Rejected Alternatives | 6 |
| ADR Summary | 4 |
| C4 System Context | 5 |
| C4 Containers | 5 |
| Trust Boundaries & Threat Model | 4 |
| Quality Attribute Scenarios (as predicates) | 4 |

### Handoff Integrity (20 points)

| Check | Points |
|-------|--------|
| Step 8 Handoff explicit | 7 |
| Step 14 Handoff explicit | 7 |
| No Step 8/14 scope absorbed | 3 |
| Boundary Tier System present | 3 |

### Quality Indicators (10 points)

| Check | Points |
|-------|--------|
| Profile fit justified with real signals | 3 |
| Monetization effects integrated (when Step 1.5 ran) | 3 |
| File structure suggested for downstream agents | 2 |
| $holes pass completed | 2 |
| SigmaHQ kanban tasks created (when configured) | 1 |

**Passing score:** 95/100
</verification>

$END$
