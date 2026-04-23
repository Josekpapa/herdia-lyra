---
version: "4.1.0"
last_updated: "2026-03-20"
changelog:
  - "4.1.0: Research patches — skill benchmarking evals, Agent Skills spec frontmatter, Codex TOML agents, 500-line limit, skill composition rules, description optimization"
  - "4.0.0: Full DNA treatment — HARD-GATE, AskUserQuestion, 95/100 gate, $holes, anti-slop, SigmaHQ agent assignment, Agent DNA vs Skills classification, TDD-for-skills"
  - "3.0.0: Rebuilt around category-based authored skill bundles"
description: "Step 13: Skillpack Generator — author project skills and agents, generate runtime adapters, assign agents to engineering tickets"
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
  - AskUserQuestion
  - mcp__exa__web_search_exa
  - mcp__ref__ref_search_documentation
parameters:
  - --force
---

# /step-13-skillpack-generator — Skillpack Generator

**On start, announce:** "Running Step 13: Skillpack Generator. I'll author project-specific skills and agents, generate runtime adapters for Claude Code and Codex, and assign agents to engineering tickets on the kanban board."

**Canonical-first policy**
- Authored skills live in `src/skills/<category>/<skill>/SKILL.md`
- Authored agents live in `src/agents/<category>/<agent>.md`
- Runtime adapters are secondary outputs:
  - Claude Code skills: `.claude/skills/<skill>/SKILL.md`
  - Claude Code agents: `.claude/agents/<agent>.md`
  - Codex official skills: `.agents/skills/<skill>/SKILL.md`
  - Codex compatibility adapter: `.codex/skills/<skill>/SKILL.md`
- Archived legacy modules are not part of the active Step 13 contract

<goal>
You are the Skillpack Architect. Execute ALL phases (A through E) in order.

CRITICAL:
- Do NOT skip any phase. Do NOT combine phases.
- Each phase ends with a HARD-GATE — halt and wait for user approval.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Context Import & Skill/Agent Inventory | Current authored bundles, runtime adapters, and engineering tickets loaded |
| B | Skill/Agent Plan with DNA Classification | Category map, DNA vs Skills classification, TDD plan |
| C | Authored Source + Runtime Adapter Generation | src/skills/, src/agents/, .claude/skills/, .claude/agents/, .agents/skills/ |
| D | SigmaHQ Agent Assignment | Engineering tickets mapped to agents, batch confirmation |
| E | Verification & Handoff | Index updates, $holes pass, Step 14 handoff |

Required Outputs:
- `src/skills/<category>/<skill>/SKILL.md` (authored source)
- `src/agents/<category>/<agent>.md` (authored source)
- `.claude/skills/`, `.claude/agents/` (Claude Code adapters)
- `.agents/skills/` (Codex adapters)
- `.sigma/indexes/skills-index.json`, `.sigma/indexes/agents-index.json`

Quality gate: 95+/100 on verification schema.

Checkpoint slice rule:
- present only the current phase slice at each checkpoint
- summarize `What was decided`, `What changed`, and `What remains open`
- end with a clear approval or revision question for that slice only
</goal>

---

## Step Boundary

Step 13 OWNS:
- src/skills/ and src/agents/ (canonical authored source)
- Runtime adapters: .claude/skills/, .claude/agents/, .agents/skills/, .codex/skills/ (compatibility only)
- .sigma/indexes/skills-index.json, .sigma/indexes/agents-index.json

Step 13 IMPORTS:
- Step 12 runtime surfaces (AGENTS.md, CLAUDE.md.example) for adapter alignment
- Step 11 PRDs for skill domain mapping
- Step 10 feature breakdown for agent scope decisions
- SigmaHQ engineering tickets (from Step 11) for agent assignment

Step 13 does NOT OWN:
- AGENTS.md, CLAUDE.md.example (Step 12)
- .sigma/runtime/, .sigma/tools/, .sigma/memory/ (Step 14)
- Archived legacy skill modules

---

## Phase A — Context Import & Skill/Agent Inventory

**Goal:** Load all current sources and identify what exists.

Read these sources if they exist:
- `AGENTS.md`
- `CLAUDE.md.example`
- `.claude/settings.json`
- `.codex/config.toml`
- `docs/specs/MASTER_PRD.md`
- `docs/design/DESIGN-SYSTEM.md`
- `docs/technical/TECHNICAL-SPEC.md`
- `docs/specs/AGENT-RUNTIME.md`
- `docs/prds/`
- `.sigma/indexes/skills-index.json`
- `.sigma/indexes/agents-index.json`

Detect current runtime surfaces:
- `.claude/skills/`
- `.claude/agents/`
- `.agents/skills/`
- `.codex/skills/` (compatibility only)

Read SigmaHQ engineering tickets if configured:

If `runtime-baseline.json` shows `sigmahq.configured: true`:
- Read the kanban board for engineering tickets (created by Step 11)
- These tickets will be assigned to agents in Phase D

Do not treat archived legacy modules as active Step 13 outputs.

<HARD-GATE>
Do NOT proceed to Phase B until user approves context scope.
Use AskUserQuestion: "Context loaded. Approve skill/agent planning scope?"
Options: [Approve scope, Adjust scope, Skip to specific phase]
</HARD-GATE>

---

## Phase B — Skill/Agent Plan with DNA Classification

**Goal:** Decide what the project-specific overlay layer must cover, classify DNA vs Skills, and define TDD baselines.

### Required categories
Use Sigma's supported categories when relevant:
- `steps`, `ops`, `audit`, `dev`, `deploy`
- `marketing`, `orchestration`, `platform`, `deprecated`

### Planning rules
- Reuse canonical authored source, not runtime adapter files, as the basis for new overlays.
- Skills should describe when to use them, what they read first, and what project-specific constraints override general guidance.
- Skills may include optional support files under `references/`, `scripts/`, or `assets/` when the runtime benefits from them.
- Agents should describe responsibility, scope boundaries, and handoff expectations.
- Agents should state whether they are coordinator, worker, reviewer, or tester surfaces for Step 14.
- Do not split numbered steps into hidden substeps or revive removed pseudo-step labels.

### Agent DNA vs Skills Classification

This maps to the global vs project architecture from Step 12:
- **DNA** lives in global agent definitions (`~/.claude/agents/`) — immutable methodology that applies to ALL projects
- **Skills** live in project directories (`.claude/skills/`, `.agents/skills/`) — project-specific knowledge loaded on demand
- Step 13 generates the PROJECT layer only — global DNA agents are maintained separately

Every authored skill and agent must be classified:

**DNA (embed in agent definition — immutable across projects):**
- Anti-slop writing rules
- Verification gates (95/100 threshold)
- HARD-GATE enforcement
- Coordinator-first delegation
- Gap analysis methodology

**Skills (invoke per project from stack-profile.json):**
- Framework patterns (React, Next.js, Supabase, etc.)
- MCP tool bindings
- Platform-specific conventions
- API integration patterns

Present the classification table for each planned skill/agent:

| Skill/Agent | Type | DNA Components | Tech Skills | Category |
|-------------|------|----------------|-------------|----------|

### TDD-for-Skills

Each authored skill follows the pressure-test cycle:
1. Define the skill's activation condition and expected behavior
2. Write a baseline scenario: "Given [context], when [skill invoked], then [expected output]"
3. Author the skill
4. Verify against the baseline scenario
5. Refactor — simplify without losing coverage

Skills that can't pass their own baseline scenario are not ready for runtime.

### Skill Quality Benchmarking

Each skill must produce an eval test suite alongside the skill itself. Generate `tests/eval.csv` in each skill directory:

```csv
id,should_trigger,prompt,expected_behavior
test-01,true,"explicit /skill-name invocation","Skill activates, produces expected output"
test-02,true,"implicit scenario matching description","Skill auto-triggers on domain match"
test-03,false,"similar but out-of-scope request","Skill does NOT activate (negative control)"
```

**Eval criteria (4 categories):**
- **Outcome** — did the skill produce the correct result?
- **Process** — did the skill invoke the right tools in the right order?
- **Style** — does the output follow anti-slop rules and project conventions?
- **Efficiency** — minimal redundant tool calls, no unnecessary file reads?

**Two grading methods:**
- **Deterministic graders:** shell scripts that check file system outcomes (files created, tests passing, etc.)
- **LLM rubric graders:** structured rubric evaluated by a second model for qualitative aspects

Minimum: 10 test prompts per skill (5 positive triggers, 3 implicit triggers, 2 negative controls).

<HARD-GATE>
Do NOT proceed to Phase C until user approves the skill/agent plan.
Use AskUserQuestion: "Skill/agent plan with DNA classification complete. Approve?"
Options: [Approve plan, Revise classification, Add/remove skills, Redo TDD baselines]
</HARD-GATE>

---

## Phase C — Authored Source + Runtime Adapter Generation

**Goal:** Write or update the canonical authored source bundles and generate runtime adapters.

### Authored skill requirements
Each authored skill bundle under `src/skills/<category>/<skill>/` must:
- contain `SKILL.md`
- point back to canonical project docs
- describe activation conditions clearly
- include project anchors and non-negotiables
- avoid runtime-specific assumptions unless explicitly necessary

### SKILL.md Frontmatter Schema (Agent Skills Standard)

Skills follow the universal Agent Skills specification (adopted by 26+ platforms):

```yaml
---
name: skill-name                    # Required: lowercase, hyphens, max 64 chars, matches directory name
description: "When and why to use"  # Critical: this IS the routing key — include positive AND negative triggers
argument-hint: "[issue-number]"     # Optional: autocomplete hint
disable-model-invocation: false     # Optional: prevent auto-triggering
user-invocable: true                # Optional: show in / menu
allowed-tools:                      # Optional: tools available without permission
  - Read
  - Grep
model: sonnet                       # Optional: model override
context: fork                       # Optional: run in forked subagent
agent: code-reviewer                # Optional: which subagent type
hooks: {}                           # Optional: lifecycle hooks scoped to skill
---
```

**Description best practices (this is the #1 quality lever):**
- Include positive triggers: "Creates React components with Tailwind CSS"
- Include negative triggers: "Do NOT use for Vue, Svelte, or vanilla CSS"
- Use directives, not information: "Always use X" works; "X is recommended" does not
- This is the ONLY field agents see before routing — if the skill doesn't trigger, fix the description first

**Size constraint:** SKILL.md must stay under 500 lines. Move detailed reference material to `references/` or `assets/` directories.

**String substitutions available:** `$ARGUMENTS`, `$1`-`$9`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_SESSION_ID}`

**Dynamic context:** Use `!`command`` syntax to run shell commands before content is sent to the agent.

### Authored agent requirements
Each agent under `src/agents/<category>/<agent>.md` must:
- define responsibility clearly
- avoid overlapping ownership without reason
- state expected inputs, outputs, and review boundaries
- state whether the agent is a coordinator, worker, reviewer, or tester in the Step 14 runtime

### Claude Code adapters
- `.claude/skills/<skill>/SKILL.md`
- `.claude/agents/<agent>.md`

### Codex adapters
- Official skills: `.agents/skills/<skill>/SKILL.md` (same format as Claude Code)
- Optional: `agents/openai.yaml` alongside each skill for Codex UI metadata
- Compatibility-only: `.codex/skills/<skill>/SKILL.md`
- Agent definitions: `.codex/agents/<agent>.toml` (TOML format, NOT markdown)

**Codex agent TOML schema:**
```toml
name = "agent-name"
description = "When to delegate to this agent"
developer_instructions = """
Agent DNA goes here — identity, behavioral directives, quality standards.
"""
model = "gpt-5.4"
sandbox_mode = "workspace-write"

[[skills.config]]
path = ".agents/skills/my-skill/SKILL.md"
enabled = true
```

The `developer_instructions` field is the DNA equivalent of Claude Code's agent markdown body.
The `skills.config` array is how Codex wires skills to agents (equivalent to Claude's `skills:` frontmatter).

### Adapter rules
- Runtime adapters must preserve authored meaning.
- Runtime adapters may adapt layout or metadata to match platform expectations.
- Runtime adapters must not become the new source of truth.
- `.codex/skills/` must be labeled as a compatibility adapter whenever it is mentioned.
- Archived legacy module generation is out of scope for the active workflow.

### Skill composition rules
- Skills do NOT reference other skills — they are independent atoms
- Composition happens ONLY at the agent level through the `skills:` frontmatter (Claude) or `skills.config` array (Codex)
- The agent is the composer, the skill is the atom
- An agent's `skills:` field injects full skill content at startup — no discovery needed

<HARD-GATE>
Do NOT proceed to Phase D until user approves authored source and adapters.
Use AskUserQuestion: "Authored source and runtime adapters generated. Approve?"
Options: [Approve all, Revise skills, Revise agents, Revise adapters]
</HARD-GATE>

---

## Phase D — SigmaHQ Agent Assignment

**Goal:** Map engineering tickets from the kanban board to the agents just created.

### When SigmaHQ is configured

1. Read all engineering tickets from the kanban board:
   ```bash
   kanban-md list --dir {sigmahq.workspace} --tags eng-task --status todo --json
   ```
2. Auto-map each ticket to an agent based on domain:
   - Frontend tickets (*.tsx, *.css, UI, components) → sigma-frontend
   - Backend tickets (API, database, auth, middleware) → sigma-backend
   - Design tickets (tokens, themes, styles) → sigma-design-systems
   - Testing tickets (tests, QA, verification) → sigma-qa
   - Security tickets (auth, RBAC, encryption) → sigma-security
   - Ops tickets (CI/CD, deploy, infra) → sigma-ops
   - Custom domain agents (from Step 13 authored agents) → matching agent

**Mapping signal priority:** Use the `Agent:` field from the ticket body (set by Step 11) as the primary assignment. Fall back to domain auto-mapping by file extensions in the `Files:` field when no agent is suggested.

**Priority mapping (consistent with Step 10):** P0 → `high`, P1 → `medium`, P2 → `low`. Inherit the priority from the parent feature card — do NOT re-assess priority at the ticket level.

3. Present the FULL mapping table for batch confirmation:

| Ticket ID | Title | Domain | Assigned Agent |
|-----------|-------|--------|----------------|

<HARD-GATE>
Do NOT proceed to Phase E until user approves agent assignments.
Use AskUserQuestion: "Agent assignment mapping complete. Review and approve?"
Options: [Approve all assignments, Override specific assignments, Re-map with different agents]
</HARD-GATE>

4. On approval, update the kanban board:
   ```bash
   kanban-md edit --dir {sigmahq.workspace} {task-id} --assignee "{agent-name}"
   ```

### When SigmaHQ is NOT configured

Skip this phase — agent assignment happens manually or via Step 14 coordinator policy.
Document which agents WOULD be assigned to which domains for future reference.

---

## Phase E — Verification & Handoff

**Goal:** Verify authored source, runtime adapters, and indexes are coherent, then hand off to Step 14.

### Index & Invoke Metadata

Update machine-readable indexes under `.sigma/indexes/` so each generated skill or agent records:
- canonical source path
- generated runtime adapter paths
- category
- status (`active`, `deprecated`, or `archived`)

If invoke metadata exists, update it from authored source rather than runtime adapter files.

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Skills without clear activation conditions
- Agents with overlapping ownership
- DNA vs Skills misclassification
- Missing runtime adapters
- Engineering tickets without agent assignments (when SigmaHQ configured)
- TDD baseline scenarios that don't pass

Fix findings before presenting.

### Writing Standards (embedded)

- No stock AI phrases in skill/agent definitions: "Comprehensive", "Robust", "Seamless"
- Activation conditions are specific: "When user runs /deploy" not "deployment-related tasks"
- Agent responsibilities are concrete actions, not vague domains
- Write like a platform engineer authoring SDK docs, not a PM describing capabilities

### Required verification
- `src/skills/` exists and contains bundle-style authored source
- `src/agents/` exists and contains category-based authored source
- `.claude/skills/` and `.claude/agents/` exist for runtime use
- `.agents/skills/` exists for Codex runtime use
- `.sigma/indexes/skills-index.json` and `.sigma/indexes/agents-index.json` reflect authored source paths and real generated adapter paths
- no active Step 13 requirement depends on archived legacy skill modules
- generated coordinator and worker surfaces are explicit enough for Step 14 runtime wiring

### Downstream Handoff

Step 13 produces artifacts consumed by Step 14:

| Artifact | Consumed By | Purpose |
|----------|-------------|---------|
| `src/skills/<category>/<skill>/SKILL.md` | Step 14 | Canonical skill source for runtime loading |
| `src/agents/<category>/<agent>.md` | Step 14 | Agent definitions with coordinator/worker/reviewer roles |
| `.claude/skills/`, `.claude/agents/` | Step 14 | Claude Code runtime adapters for dispatch |
| `.agents/skills/` | Step 14 | Codex runtime adapters for dispatch |
| `.sigma/indexes/skills-index.json` | Step 14 | Skill discovery and binding |
| `.sigma/indexes/agents-index.json` | Step 14 | Agent roster for coordinator wiring |
| SigmaHQ cards with `--assignee` set | Step 14 | Agent-to-ticket mapping for dispatch |

Step 14 MUST find coordinator vs worker vs reviewer classifications in `agents-index.json` to wire the runtime correctly.

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 14 without explicit approval.
Use AskUserQuestion: "Step 13 complete. Ready for Step 14 — Agent Runtime Bootstrap?"
Options: [Proceed to Step 14, Revise skills/agents, Adjust agent assignments]
</HARD-GATE>

---

<verification>
## Step 13 Verification Schema

### Required Outputs (30 points)
| Item | Path | Points |
|------|------|--------|
| Authored Skills | src/skills/ | 8 |
| Authored Agents | src/agents/ | 8 |
| Claude Skills Adapters | .claude/skills/ | 5 |
| Claude Agents Adapters | .claude/agents/ | 4 |
| Codex Skills Adapters | .agents/skills/ | 5 |

### Metadata & Indexes (20 points)
| Check | Points |
|-------|--------|
| At least 1 authored skill bundle | 5 |
| At least 1 authored agent | 5 |
| skills-index.json records canonical source | 5 |
| agents-index.json records canonical source | 5 |

### DNA Compliance (25 points)
| Check | Points |
|-------|--------|
| DNA vs Skills classification documented per skill/agent | 8 |
| Eval test suite (eval.csv) with 10+ test prompts per skill | 7 |
| Anti-slop rules embedded in skill definitions | 5 |
| SigmaHQ agent assignments completed (when configured) | 5 |

### Quality Indicators (15 points)
| Check | Points |
|-------|--------|
| Skills index records Claude + Codex adapter paths | 5 |
| Agents have clear coordinator/worker/reviewer roles | 5 |
| No active dependency on archived legacy modules | 5 |

### Boundary Integrity (10 points)
| Check | Points |
|-------|--------|
| Canonical source first (src/ is truth) | 4 |
| Step 14 handoff explicit | 3 |
| $holes pass completed | 3 |

### Pass Threshold
95/100 minimum.
</verification>

$END$
