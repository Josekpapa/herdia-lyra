---
description: "Step 1: Ideation → MASTER_PRD — interactive product discovery with Hormozi Value Equation, JTBD, Design Tree interview, and HITL gates"
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
---

# /step-1-ideation — Discovery-First PRD Bootstrapping

**On start, announce:** "Running Step 1: Product Discovery. I'll walk you through 5 phases with approval gates. No files are written until Phase D."

<goal>
You are the Product Discovery Lead. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Interactive Discovery Interview | Locked decisions on problem, user, outcome, scope |
| B | Evidence-Backed Research | Market analysis + evidence register |
| C | Lightweight Feasibility Preview | Data/integration/risk preview |
| D | Specification Development | MASTER_PRD.md draft |
| E | Review, Hardening & Handoff | Finalized docs + Step 1.5 trigger |

Final Outputs: `docs/specs/MASTER_PRD.md`, `docs/stack-profile.json`, `docs/research/market-analysis-{PROJECT}.md`, `docs/prds/.prd-status.json`

Quality gate: 95+/100 on verification schema.
</goal>

---

## Step Boundary

- **Trigger:** Run after Step 0 completes. Requires `.sigma/runtime-baseline.json` from Step 0.
- **Step 1 owns:** problem discovery, target users, evidence, scope, success criteria, assumptions, risks, feasibility preview.
- **Step 1 does NOT own:** pricing, guarantees, offer stacking, monetization architecture → **Step 1.5**.
- **Trigger Step 1.5** when the product is monetized or requires pricing/credits/subscriptions before architecture.
- **Fallback:** If Step 0 data is missing, prompt user to run Step 0 first or continue with defaults and label all stack assumptions.

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
  --title "Step 1: Product Discovery in progress" \
  --body "Phases A-E: interview, research, feasibility, PRD, hardening" \
  --status doing --priority high --tag "step-1,ideation"
```

**If SIGMAHQ_ENABLED — on MASTER_PRD.md completion (Phase D):**
```bash
TASK_ID=$(kanban-md list --dir "$WORKSPACE" --status doing --tag "step-1" --json | jq -r '.[0].id')
kanban-md move --dir "$WORKSPACE" "$TASK_ID" done
kanban-md create --dir "$WORKSPACE" \
  --title "Step 1: MASTER_PRD.md complete" \
  --body "Ideation output ready for Step 1.5 or Step 2" \
  --status done --priority high --tag "step-1,ideation,milestone"
```

If SigmaHQ is not configured, skip — file-based artifacts remain the sole handoff mechanism.

---

## Discovery Frameworks

Use to sharpen the PRD. Skip any that don't apply — don't pad.

### Hormozi Value Equation

Value = (Dream Outcome x Perceived Likelihood) / (Time Delay x Effort & Sacrifice)

- Dream Outcome vague → product is vague.
- Perceived Likelihood weak → needs proof, onboarding, or narrower user.
- Time Delay long → define faster first-value moment.
- Effort & Sacrifice high → simplify workflow or reduce switching costs.

### Jobs-to-be-Done

For each core use case: functional/emotional/social job, trigger, current workaround, why it's unacceptable.

### Evidence Hierarchy

1. Direct customer/user quotes → 2. Observed behavior → 3. Market data → 4. Team inference.
Unverified claims must be labeled as assumptions.

### Scope Discipline

Every PRD defines: in scope, explicitly out of scope, deferred to Step 1.5 or Step 2. Vague scope = fake certainty = bad architecture.

---

## Phase A — Interactive Discovery Interview

### Preflight (auto, no user interaction)

1. Run `date +"%Y-%m-%d"`.
2. Read `.sigma/runtime-baseline.json` — extract runtime, research mode, boilerplate, stack integrations.
3. Read `.sigma/boilerplate.json` and `docs/stack-profile.json` if present.
4. Ensure `docs/specs/`, `docs/research/`, `docs/prds/` exist.
5. If `research_mode = blocked` → stop and tell user. If `reduced` → continue with assumption labels.
6. If boilerplate present → treat as implementation baseline, don't re-ask stack questions.

### Discovery Interview (sequential — one decision at a time)

Use the **Design Tree** pattern: resolve each decision before branching to the next.
Use **AskUserQuestion** where options can be predefined. For open-ended questions, ask directly.
Do NOT dump all questions at once. One question per turn. Lock the answer before moving on.

**Decision 1: The Idea**
Ask directly: "What are we building and why does it matter?"
Listen. Clarify if vague. Lock the core concept.

**Decision 2: The Problem**
Use AskUserQuestion: "What type of problem is this solving?"
Options: [Workflow is too slow/manual, Existing tools are fragmented, No good solution exists, Cost of current solution is too high, Other]
Then ask: "What happens if the user does nothing — what's the cost of inaction?"

**Decision 3: The User**
Use AskUserQuestion: "Who is the primary user?"
Options: [B2B teams, Solo professionals, Consumers, Developers/engineers, Internal team, Other]
Then ask: "How are they solving this today, and why is that unacceptable?"

**Decision 4: The Outcome**
Ask directly: "What's the concrete before/after transformation? What does the user's life look like after this works?"
Then ask: "What's the first moment of value — when do they know it's working?"

**Decision 5: Constraints & Scope**
Use AskUserQuestion: "What platforms must this support?"
Options: [Web only, Mobile only, Web + Mobile, Desktop, API/CLI, Other]
Then ask: "Any compliance, privacy, locked-in vendors, or timeline constraints?"

**Decision 6: Monetization Signal**
Use AskUserQuestion: "Is this product monetized?"
Options: [Yes — subscriptions/tiers/credits, Yes — one-time purchase, Not yet — explore later, No — internal/OSS/free, Other]
Lock the answer — this determines whether Step 1.5 runs.

### Decision Lock Summary

After all 6 decisions, present a summary table:

| Decision | Locked Answer |
|----------|---------------|
| Idea | [answer] |
| Problem | [answer] |
| Primary User | [answer] |
| Desired Outcome | [answer] |
| Platform / Constraints | [answer] |
| Monetization | [answer] |

<HARD-GATE>
Do NOT proceed to Phase B until the user approves the Decision Lock Summary.
Do NOT write any files before this gate.
Use AskUserQuestion: "Discovery direction locked. Approve and move to research?"
Options: [Approve — proceed to research, Revise — I want to change something]
</HARD-GATE>

---

## Phase B — Evidence-Backed Research

### Research Queries (directive — run these, don't improvise)

Based on locked decisions, construct and execute specific queries:

1. **Competitors:** Search `"[problem domain] alternatives 2025 2026"` — find direct competitors, substitutes, status quo workarounds
2. **User pain:** Search `"[primary user] [problem] frustration OR complaint OR review"` — find real user quotes and pain evidence
3. **Timing:** Search `"[domain] market trend 2026"` — find why this matters now
4. **Integration norms:** Search `"[platform] [domain] best practices stack"` — find what the market expects

Use Exa for semantic search, Firecrawl for scraping specific pages, WebSearch as fallback.

### Evidence Register (mandatory — build during research, not after)

```markdown
| Claim | Source | Date | Confidence | Scope Impact |
|-------|--------|------|------------|--------------|
| [Claim] | [URL/source] | [YYYY-MM-DD] | High/Med/Low | [What changed in PRD] |
```

If `research_mode = reduced`, state at the top what evidence tiers are missing.

### Market Analysis Output

Write `docs/research/market-analysis-{PROJECT}.md`:
1. Problem landscape
2. Existing solutions / competitors / substitutes
3. Key user pain evidence (with quotes where found)
4. Gaps or weaknesses in the market
5. Risks to differentiation
6. Sources with URLs

Write this as a sharp competitive brief — no filler. No "In today's rapidly evolving landscape." Start with what exists, what's broken, and what the gap is.

<HARD-GATE>
Do NOT proceed to Phase C until user approves research findings.
Use AskUserQuestion: "Research complete. How do you want to proceed?"
Options: [Approve research — move to feasibility, Pivot — the research changed my thinking, Dig deeper — I need more on a specific area]
</HARD-GATE>

---

## Phase C — Lightweight Feasibility Preview

Preview the technical shape without turning Step 1 into Step 2.

### Data Entity Preview

| Entity | Purpose | Relationships | Complexity |
|--------|---------|---------------|------------|
| users | [Purpose] | [Relations] | Standard |

### Integration Preview

| Service | Purpose | Required Now? | Risk |
|---------|---------|---------------|------|
| [Service] | [Reason] | Yes / Later | Low/Med/High |

### Risk Flags

Identify highest-impact delivery risks: data sensitivity, compliance, external dependencies, complex workflows, real-time/background requirements.

### Stack Profile Seed

Create or update `docs/stack-profile.json`. Preserve boilerplate decisions. Don't guess undecided fields.

```json
{
  "project_mode": "custom-project",
  "platform": "web",
  "frontend": "undecided",
  "backend": "undecided",
  "database": "undecided",
  "auth": "undecided",
  "payments": null,
  "hosting": "undecided"
}
```

<HARD-GATE>
Do NOT proceed to Phase D until user approves feasibility preview.
Use AskUserQuestion: "Feasibility preview complete. Approve?"
Options: [Approve — write the PRD, Flag concerns — need to discuss risks, Revise scope — feasibility changed my thinking]
</HARD-GATE>

---

## Phase D — Specification Development

Write `docs/specs/MASTER_PRD.md`. Reference the locked decisions from Phase A and evidence from Phase B directly — do not reinvent or contradict them.

```markdown
# [Project Name] - Product Requirements Document
**Version:** 1.0 | **Date:** {TODAY} | **Status:** Draft

## Executive Summary
[2-3 paragraphs: what, who, why now — derived from Decision Lock]

## Problem Statement
### The Problem
[From Decision 2 + research evidence]

### Why It Matters Now
[From Phase B timing research]

## Target Users
### Primary User
[From Decision 3 — role, context, behaviors, goals, frustrations]

### Secondary Users / Stakeholders
[Who else is affected]

## Jobs / Core Use Cases
| Job / Use Case | Current Friction | Desired Outcome |
|----------------|------------------|-----------------|

## Value Equation Assessment
- **Dream Outcome:** [From Decision 4]
- **Perceived Likelihood:** [What makes the outcome believable]
- **Time Delay:** [First moment of value from Decision 4]
- **Effort & Sacrifice:** [What friction must be removed]
- **Assessment:** [Score against the equation]

## Evidence Register
[From Phase B — copy or summarize]

## Product Scope
### In Scope (P0 — MVP must-ship)
[Committed scope from Decision Lock — bullet points, not prose]

### In Scope (P1 — should-have, post-MVP)
[Features that improve the product but aren't blocking launch]

### Out of Scope
[Explicit exclusions — these are product decisions, not optional notes]

### Do NOT Build
[Negative requirements — things the AI must explicitly avoid building. Examples: "Do NOT add social login before core auth works." "Do NOT build admin dashboard in v1."]

## Suggested File Structure
[Directory layout for the product — helps downstream agents organize code]
```
src/
  app/           # Routes and pages
  components/    # Shared UI components
  lib/           # Business logic, utilities, API clients
  types/         # TypeScript types and interfaces
docs/
  specs/         # PRDs and architecture docs
  research/      # Market analysis and evidence
```
[Adapt to the actual stack and platform from Decision 5]

## Build Order
[Explicit sequential phases — AI agents need this to avoid building everything at once]
1. **Foundation:** Auth, database schema, core data models
2. **Core features:** [P0 features in dependency order]
3. **Integration:** [External services, APIs]
4. **Polish:** [P1 features, UX refinement]

## Success Metrics
| Metric | Baseline | Target | Time Horizon |
|--------|----------|--------|--------------|

## Business Model / Monetization Trigger
- **Monetization in scope:** [From Decision 6]
- **If yes:** [Summary only — architecture deferred to Step 1.5]
- **If no:** [Why Step 1.5 can be skipped]

## Assumptions and Risks
| Assumption / Risk | Confidence | Impact | Mitigation |
|-------------------|------------|--------|------------|

## Open Questions
- [Question]

## Decision Table
| Decision | Status | Owner | Next Step |
|----------|--------|-------|-----------|

## Lightweight Feasibility Preview
[From Phase C — entity preview, integration preview, delivery risks]

## Step 1.5 Trigger Decision
- **Run Step 1.5 now?** [Yes / No]
- **Why:** [Signals from Decision 6 + research]
```

### Writing Rules

- Every claim traces to evidence register or is labeled assumption.
- Scope in/out decisions are product decisions, not optional notes.
- Do not invent pricing tiers. Do not turn this into architecture. Do not leave assumptions unlabeled.

### Writing Standards (embedded — apply to ALL Step 1 outputs)

- No stock AI phrases: "Let's dive in", "Here's the thing", "In today's landscape", "At its core", "Game-changing", "Seamless", "Robust", "Ecosystem", "Leverage", "Delve", "Navigate challenges", "Unlock potential"
- Start with the topic, not a sweeping industry statement that narrows down
- Do not end sections with grander restatement than the content warrants
- Commit to claims or don't make them — no "might/could potentially" hedging on every line
- No breathless enthusiasm — not everything is "fascinating", "remarkable", or "transformative"
- No rhetorical questions as section transitions
- No "Final thoughts" or "Key takeaways" section headers
- Do not use the structure: "[Broad claim]. But [complication]. Here's [resolution]."
- Write like a product leader with conviction, not a median of all writing on the internet

---

## Phase E — Review, Hardening & Handoff

### Mandatory: Run $holes

Before the final checkpoint, invoke `$holes` to find:
- Weak evidence or unsupported claims
- Vague scope or ambiguous requirements
- Missing assumptions or unaddressed risks
- Contradictions between sections

Fix findings before presenting for approval. If `$holes` is unavailable, manually review against the verification schema.

### Required Files

| File | Location |
|------|----------|
| MASTER_PRD.md | docs/specs/ |
| stack-profile.json | docs/ |
| market-analysis-{PROJECT}.md | docs/research/ |
| .prd-status.json | docs/prds/ |

### Success Criteria

- [ ] Step 0 state was read and used
- [ ] Problem is evidence-backed or labeled assumptions
- [ ] Target users are specific enough to act on
- [ ] Out-of-scope items are explicit
- [ ] Success metrics are measurable
- [ ] Risks and open questions documented
- [ ] Monetization only summarized, not over-designed
- [ ] Step 1.5 trigger decision is explicit
- [ ] $holes pass completed
- [ ] User approved the final PRD
- [ ] SigmaHQ kanban tasks created (when configured)

### Step 1.5 Trigger Rules

**Run Step 1.5** when: subscription/tiered/credits/usage monetization in scope, billing affects schema, free/premium entitlements matter, or offer packaging materially affects product definition.

**Skip Step 1.5** when: internal/OSS/not monetized, monetization undefined and shouldn't constrain architecture, pricing out of scope.

<HARD-GATE>
FINAL GATE — Do NOT proceed without explicit approval.
Use AskUserQuestion: "Step 1 complete. What's next?"
Options based on Decision 6:
- If monetized: [Proceed to Step 1.5 — Offer Architecture, Skip Step 1.5 — go to Step 2, Revise PRD]
- If not monetized: [Proceed to Step 2 — Architecture, Revise PRD]
</HARD-GATE>

---

<verification>
## Step 1 Verification Schema

### Required Files (20 points)

| File | Path | Min Size | Points |
|------|------|----------|--------|
| Master PRD | docs/specs/MASTER_PRD.md | 4KB | 6 |
| Stack Profile | docs/stack-profile.json | 200B | 4 |
| Market Analysis | docs/research/market-analysis-*.md | 1KB | 5 |
| PRD Status | docs/prds/.prd-status.json | 50B | 5 |

### Required Sections in MASTER_PRD.md (45 points)

| Section | Points |
|---------|--------|
| Executive Summary | 5 |
| Problem Statement | 6 |
| Target Users | 6 |
| Jobs / Core Use Cases | 5 |
| Value Equation Assessment | 5 |
| Evidence Register | 5 |
| Product Scope + Out of Scope | 5 |
| Success Metrics | 4 |
| Assumptions and Risks | 4 |

### Content Quality (25 points)

| Check | Points |
|-------|--------|
| Claims source-backed or labeled assumptions | 6 |
| At least one competitor/substitute analysis | 4 |
| Target users specific enough to act on | 4 |
| Success metrics are measurable | 4 |
| Step 1.5 trigger decision is explicit | 4 |
| Reduced research mode disclosed when applicable | 3 |

### Approval & Handoff (10 points)

| Check | Points |
|-------|--------|
| Research checkpoint approved | 5 |
| Final PRD approved (after $holes pass) | 5 |
| SigmaHQ kanban tasks created (when configured) | 1 |

**Passing score:** 95/100
</verification>

$END$
