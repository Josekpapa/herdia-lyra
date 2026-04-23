---
version: "2.2.0"
last_updated: "2026-04-19"
changelog:
  - "2.2.0: runtime.manifest.json now includes optional designArtifacts field surfacing Claude Design bundle paths (Step 5 Track A, Step 9 Track A/Hybrid) and HTML wireframe paths (Track B) to runtime agents."
  - "2.1.0: Research patches — worktree isolation, hybrid dispatch, orchestration patterns, graph intelligence gates, 3-layer memory, progressive tool discovery"
  - "2.0.0: Full DNA treatment — HARD-GATE, AskUserQuestion, 95/100 gate, $holes, anti-slop, SigmaHQ as live dispatch system, coordinator-first kanban policy"
  - "1.2.0: Clarified tracked vs live Claude runtime files"
  - "1.1.0: Updated Step 14 to consume native Step 12 runtime surfaces and take ownership of .sigma/tools/ helper infrastructure"
  - "1.0.0: Introduced Step 14 as the runtime bootstrap layer for coordinator policy, graph intelligence, memory, and active Codex/Claude runtime overlays"
description: "Step 14: Agent Runtime Bootstrap — wire runtime context, skills/agents, and SigmaHQ dispatch into a live coordinator-first agent operating layer"
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
  - --graph-source
---

# /step-14-agent-runtime-bootstrap — Agent Runtime Bootstrap

**On start, announce:** "Running Step 14: Agent Runtime Bootstrap. I'll wire the runtime context from Step 12 and the skill/agent layer from Step 13 into a live coordinator-first operating model — with SigmaHQ as the dispatch system when configured."

<goal>
You are the Agent Runtime Architect. Execute ALL phases (A through E) in order.

CRITICAL:
- Do NOT skip any phase. Do NOT combine phases.
- Each phase ends with a HARD-GATE — halt and wait for user approval.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Runtime Inputs & Graph Source Detection | Step 12/13 outputs confirmed, graph engine detected, SigmaHQ state loaded |
| B | Runtime Architecture Plan | Coordinator policy, helper tools, memory, graph, SigmaHQ dispatch policy |
| C | Canonical Runtime Spec + Local Scaffold | docs/specs/AGENT-RUNTIME.md, .sigma/runtime/, .sigma/memory/, .sigma/tools/ |
| D | Platform Runtime Wiring + SigmaHQ Dispatch | Codex/Claude wiring aligned, SigmaHQ as live dispatch |
| E | Verification & Handoff | $holes pass, final report, launch readiness |

Required Outputs:
- `docs/specs/AGENT-RUNTIME.md`
- `.sigma/runtime/runtime.manifest.json`
- `.sigma/runtime/graph.config.json`
- `.sigma/runtime/delegation-policy.json`
- `.sigma/memory/project/README.md`
- `.sigma/memory/local/.gitkeep`
- `.sigma/memory/agents/` (per-agent-type memory)
- `.sigma/tools/` (lint.sh, test.sh, build.sh, typecheck.sh)

Quality gate: 95+/100 on verification schema.

Checkpoint slice rule:
- present only the current phase slice at each checkpoint
- summarize `What was decided`, `What changed`, and `What remains open`
- end with a clear approval or revision question for that slice only
</goal>

---

## Step Boundary

Step 14 OWNS:
- docs/specs/AGENT-RUNTIME.md (canonical runtime spec)
- .sigma/runtime/ (manifest, graph config, delegation policy)
- .sigma/memory/ (project + local memory scaffolds)
- .sigma/tools/ (helper tool infrastructure)
- SigmaHQ dispatch policy (when configured)

Step 14 IMPORTS:
- Step 12 native runtime surfaces (AGENTS.md, CLAUDE.md.example, settings, config)
- Step 13 authored skills/agents and runtime adapters
- Step 13 SigmaHQ agent assignments (when configured)
- Graph engine source (detected or configured)

Step 14 does NOT OWN:
- AGENTS.md, CLAUDE.md.example (Step 12 managed sections)
- src/skills/, src/agents/ (Step 13 authored source)
- .claude/skills/, .agents/skills/ (Step 13 runtime adapters)

---

## Phase A — Runtime Inputs & Graph Source Detection

**Goal:** Confirm all upstream inputs exist and detect the graph engine and SigmaHQ state.

### Read tracked sources (if they exist)
- `AGENTS.md`
- `CLAUDE.md.example`
- `.claude/settings.json`
- `.codex/config.toml`
- `docs/specs/MASTER_PRD.md`
- `docs/technical/TECHNICAL-SPEC.md`
- `docs/design/DESIGN-SYSTEM.md`
- `docs/states/STATE-SPEC.md`
- `docs/specs/AGENT-RUNTIME.md`
- `src/skills/`
- `src/agents/`

### Read live local Claude runtime files (only when they exist)
- `CLAUDE.md`
- `CLAUDE.local.md`

### Detect active runtimes
- `.claude/`
- `.codex/`

### Detect graph-engine source (in order)
1. Explicit `--graph-source` parameter
2. `SIGMA_GRAPH_ENGINE_SOURCE` env var
3. Project-local config in `.sigma/runtime/graph.config.json`
4. Developer-local authorized source paths

Do not expose external engine branding in Sigma-facing outputs. Treat any authorized external codebase as implementation input, not public naming.

### SigmaHQ Dispatch State (when configured)

If `runtime-baseline.json` shows `sigmahq.configured: true`:
- Read the kanban board for engineering tickets with agent assignments (from Step 13)
   ```bash
   kanban-md list --dir {sigmahq.workspace} --status todo --json
   ```
   Filter for tickets with non-empty assignee field to build the dispatch queue.
- Load the dispatch queue: tickets in `todo` status with an assigned agent
- This becomes the work queue for the coordinator runtime

<HARD-GATE>
Do NOT proceed to Phase B until user approves runtime inputs.
Use AskUserQuestion: "Runtime inputs detected. Approve architecture planning scope?"
Options: [Approve — plan runtime architecture, Revise — adjust inputs, Check graph engine]
</HARD-GATE>

---

## Phase B — Runtime Architecture Plan

**Goal:** Decide how the live runtime will behave before writing any files.

### Required decisions
- Coordinator-only top-level behavior
- Worker / reviewer / tester role split
- Graph-provider routing
- Project memory vs local memory behavior
- Tracked runtime sources versus generated local runtime state
- Helper-tool strategy under `.sigma/tools/`
- Codex runtime wiring against `AGENTS.md`, `.codex/config.toml`, and `.agents/skills/`
- Claude Code runtime wiring against `CLAUDE.md.example`, local `CLAUDE.md` / `CLAUDE.local.md`, `.claude/settings.json`, `.claude/skills/`, `.claude/hooks/`, and `.claude/agents/`

### Worktree Isolation Policy

Implementation agents MUST run in isolated git worktrees by default:
- Each task gets its own worktree (via Claude Code `isolation: worktree` or Codex sandbox)
- Prevents file conflicts when agents work in parallel
- Results are reviewed like PRs before merging back to the main branch
- Only review/exploration agents share the main worktree (read-only operations)

The delegation policy must encode which agent roles get worktree isolation:
| Agent Role | Isolation | Reason |
|------------|-----------|--------|
| Coordinator | Main worktree | Needs to read current state, dispatch work |
| Implementation worker | Isolated worktree | Prevents file conflicts with parallel agents |
| Devil's Advocate reviewer | Main worktree (read-only) | Reviews diffs, doesn't modify files |
| Gap Analyst | Main worktree (read-only) | Verifies coverage, doesn't modify files |
| Explorer | Main worktree (read-only) | Research only |

### Minimum runtime files to plan
- `.sigma/runtime/runtime.manifest.json` (must include `sigmahq.workspace` when configured)
- `.sigma/runtime/graph.config.json`
- `.sigma/runtime/delegation-policy.json`
- `.sigma/memory/project/README.md`
- `.sigma/memory/local/.gitkeep`
- `.sigma/tools/lint.sh`
- `.sigma/tools/test.sh`
- `.sigma/tools/build.sh`
- `.sigma/tools/typecheck.sh` (when relevant)

### Required graph-provider capabilities
- `index`
- `status`
- `searchSemantic`
- `getSymbolContext`
- `getImpact`
- `getProcessTrace`
- `detectChanges`
- `graphQuery`
- `renameAssist`

### SigmaHQ Dispatch Policy (when configured)

When the kanban board is active, the coordinator uses **hybrid dispatch** (push + pull):

**Push mode** (coordinator assigns):
1. **Check board** — read tickets in `todo` status with assigned agents (from Step 13)
2. **Dispatch** — send ticket to designated agent with context and worktree
3. **Track** — monitor ticket status transitions

**Pull mode** (agent self-claims when idle):
4. When an agent finishes a task and has no assigned work, it checks the board for unassigned `todo` tickets matching its domain
5. Agent claims the ticket via `kanban-md edit --dir {workspace} {id} --claim {agent-name}`
   - If already claimed by another agent, skip and check the next unassigned `todo` ticket

**Priority ordering within dispatch:**
- P0 (critical/blocking) dispatched first
- P1 (this sprint) dispatched next
- P2 (backlog) dispatched when P0/P1 are clear
- Within a priority tier, vertical slices that flush unknowns go first

**Review gates after each ticket:**
6. **Review** — Devil's Advocate reviews completed work (cross-model via Codex when configured)
7. **Gap check** — Gap Analyst verifies coverage against acceptance criteria
8. **Close** — coordinator marks ticket `done` after review passes

**Task lifecycle state machine:**
```
todo → doing → review → done
  ↓              ↓
blocked        failed (with retry policy)
```

The runtime manifest must include the SigmaHQ workspace path when configured.

### Orchestration Pattern Selection

Step 14 combines three patterns from Microsoft's agent orchestration framework:

1. **Magentic pattern** — The coordinator dynamically builds and refines the task ledger (kanban board). It iterates, backtracks, and re-delegates as work reveals new requirements.
2. **Concurrent pattern** — Independent implementation tasks fan out to parallel agents (each in isolated worktrees). Results are gathered and merged.
3. **Maker-Checker pattern** — Every implementation goes through a review cycle (Devil's Advocate + Gap Analyst) with an iteration cap (max 3 rounds before escalation to user).

The delegation policy must specify iteration caps for review loops and stall detection thresholds.

<HARD-GATE>
Do NOT proceed to Phase C until user approves the architecture plan.
Use AskUserQuestion: "Runtime architecture planned. Approve spec and scaffold work?"
Options: [Approve — write spec and scaffold, Revise — adjust architecture, Review graph capabilities]
</HARD-GATE>

---

## Phase C — Canonical Runtime Spec + Local Scaffold

**Goal:** Write the runtime contract and create the local runtime files.

### Canonical spec: `docs/specs/AGENT-RUNTIME.md`

Required sections:
1. `## Normal Language Summary`
2. `## Why The Runtime Layer Exists`
3. `## Coordinator Policy`
4. `## Graph Provider Contract`
5. `## Memory Model`
6. `## Tracked Runtime Sources`
7. `## Generated Runtime State`
8. `## Helper Tool Contract`
9. `## Codex Runtime`
10. `## Claude Code Runtime`
11. `## SigmaHQ Dispatch` (when configured)
12. `## Verification Gates`
13. `## Fallback If Step 14 Is Deferred`

### Spec rules
- Keep Sigma naming in all public/runtime-facing language
- Mention authorized local graph-engine source only as an implementation input
- State that graph intelligence is local-first
- Make Augment optional semantic enrichment, not a baseline dependency
- State that `.sigma/runtime/*`, `.sigma/memory/*`, `.sigma/tools/*` are generated local state, not tracked source
- State that `CLAUDE.md.example` is the tracked source template — it does not prove the live file is aligned
- Treat `.sigma/tools/` as Step 14-owned helper infrastructure

### Local scaffold outputs
- `.sigma/runtime/runtime.manifest.json`
- `.sigma/runtime/graph.config.json`
- `.sigma/runtime/delegation-policy.json`
- `.sigma/memory/project/README.md`
- `.sigma/memory/local/.gitkeep`
- `.sigma/memory/agents/` (per-agent-type memory directories)
- `.sigma/tools/` helper scripts appropriate to the project

### Memory Hierarchy (3 layers)

| Layer | Path | Scope | Git Status | Index Limit |
|-------|------|-------|------------|-------------|
| Project memory | `.sigma/memory/project/` | Team-shared knowledge | Tracked | 200 lines |
| Local memory | `.sigma/memory/local/` | Per-developer private | Gitignored | No limit |
| Agent memory | `.sigma/memory/agents/<name>/` | Per-agent-type, cross-session | Gitignored | 200 lines |

- Project memory stores decisions, conventions, and learnings the whole team benefits from
- Local memory stores personal preferences, debug notes, and scratch context
- Agent memory lets specialized agents (e.g., sigma-frontend) accumulate domain-specific learnings across sessions
- All memory uses MEMORY.md as the index (200-line max) with topic files for detail
- Both Claude Code and Codex must be able to read from the same memory directory (plain markdown format)

### Scaffold rules
- Runtime manifest must match the runtime schema
- Runtime manifest must include SigmaHQ workspace path when configured
- Runtime manifest must include `designArtifacts` (optional) — see Design Artifacts Manifest Field below
- Delegation policy must enforce coordinator-first behavior
- Graph config must keep provider naming Sigma-facing even if the engine came from an external source
- Helper tools must be safe to run from repo root
- Helper tools must map to real verification/build concerns
- Project memory must be durable and human-readable

### Design Artifacts Manifest Field (optional, conditional)

When Step 5 and/or Step 9 produced bundles or HTML wireframes, include a `designArtifacts` object in `runtime.manifest.json` so runtime agents know where the approved visuals live. Only populate paths that actually exist on the filesystem.

```json
{
  "designArtifacts": {
    "flowBundles": ["docs/prds/flows/*/claude-design/"],
    "flowWireframes": ["docs/prds/flows/*/screens/"],
    "landingBundle": "docs/landing-page/claude-design/",
    "landingDirect": "docs/landing-page/landing-page.html"
  }
}
```

Rules:
- Use glob-style path patterns for flow-level artifacts (agents expand them at runtime)
- Single-string paths for landing-page artifacts (there's only ever one landing page per project)
- Omit the entire `designArtifacts` field when none of the artifacts exist (pure backend/CLI projects)
- Omit individual sub-keys when their track wasn't used (e.g., only `flowBundles` + `landingBundle` if both Track A, never Track B)

Runtime agents should check `designArtifacts` during Section 7 UI Contract implementation per Step 11 PRDs — the bundles/wireframes are the visual source of truth.
- Local memory must be private and safe to ignore
- Generated `.sigma/*` runtime state remains local working state, not repo-tracked source

### Tool Discovery (progressive disclosure)

`.sigma/tools/` follows the Agent Skills standard for discoverability:

```
.sigma/tools/
├── lint/
│   ├── SKILL.md      # name, description, when to run
│   └── scripts/
│       └── lint.sh
├── test/
│   ├── SKILL.md
│   └── scripts/
│       └── test.sh
├── build/
│   ├── SKILL.md
│   └── scripts/
│       └── build.sh
└── validate/
    ├── SKILL.md      # pre-commit validation
    └── scripts/
        └── validate.sh
```

At runtime startup, only tool descriptions are loaded (metadata-first). Full SKILL.md content loads when the tool is invoked. This minimizes context window consumption while keeping all tools discoverable.

### Graph Intelligence Gates (mandatory when graph engine is available)

The runtime must enforce these graph checks at specific points:

| Gate | When | What |
|------|------|------|
| `impact()` | Before any refactor or shared-code change | Assess blast radius; high-risk changes route to cross-model review |
| `detect_changes()` | Before every commit | Map diff to affected processes; flag unintended impacts |
| `query()` | Before delegating a task | Understand the scope and dependencies of the code being changed |
| `context()` | Before modifying any shared symbol | Get full 360-degree view of callers, callees, and process participation |

These gates are enforced in the delegation policy. Agents that skip graph checks on shared code trigger a review escalation.

<HARD-GATE>
Do NOT proceed to Phase D until user approves spec and scaffold.
Use AskUserQuestion: "Runtime spec and scaffold complete. Approve platform wiring?"
Options: [Approve — wire platform runtimes, Revise — adjust spec or scaffold, Review delegation policy]
</HARD-GATE>

---

## Phase D — Platform Runtime Wiring + SigmaHQ Dispatch

**Goal:** Align active runtimes to the coordinator-first contract and wire SigmaHQ dispatch.

### Claude Code requirements
- Runtime guidance distinguishes `CLAUDE.md.example` (tracked source template) from `CLAUDE.md` / `CLAUDE.local.md` (live runtime files)
- `.claude/skills/`, `.claude/settings.json`, `.claude/hooks/` align to the coordinator-first execution model
- Specialist agents and reviewers are clearly separated
- Helper-tool guidance points to `.sigma/tools/` when those scripts exist

### Codex requirements
- `AGENTS.md` and `.codex/config.toml` align to coordinator-first execution
- Skills under `.agents/skills/` are the main task-extension surface
- Helper-tool guidance points to `.sigma/tools/` when those scripts exist
- Optional `.codex/skills/` remains a compatibility adapter only
- Optional `.codex/rules/*.rules` remain separate repo policy files, not Step 14 outputs

### Wiring rules
- Do not invent additional numbered steps
- Do not make Step 14 depend on archived runtime history
- Preserve authored sources as the source of truth

### SigmaHQ as Live Dispatch System (when configured)

Wire the kanban board as the coordinator's work queue:

1. Add `sigma sigmahq-sync` to recognized runtime commands
2. The coordinator agent:
   - Reads the board at session start to load pending tickets
   - Dispatches work to assigned agents
   - Monitors ticket status for completion
   - Triggers Devil's Advocate + Gap Analyst as final gates
3. Worker agents:
   - Check board: `kanban-md list --dir {sigmahq.workspace} --assignee {agent-name} --status todo --json`
   - Mark `doing` when starting: `kanban-md move --dir {workspace} {id} doing`
   - Mark `done` when finished: `kanban-md move --dir {workspace} {id} done`
4. The board replaces ad-hoc task assignment — every piece of work has a ticket

When SigmaHQ is NOT configured:
- Coordinator uses ad-hoc task delegation (Claude Code TaskCreate or Codex task patterns)
- No persistent ticket tracking across sessions

<HARD-GATE>
Do NOT proceed to Phase E until user approves platform wiring and dispatch.
Use AskUserQuestion: "Platform wiring and dispatch system configured. Approve verification?"
Options: [Approve — run verification, Revise — adjust wiring, Review dispatch policy]
</HARD-GATE>

---

## Phase E — Verification & Handoff

**Goal:** Verify the live runtime layer is coherent, run $holes, and produce the final report.

### Required verification
- `docs/specs/AGENT-RUNTIME.md` exists and matches the step contract
- `.sigma/runtime/` exists and contains the planned manifest/config files
- `.sigma/memory/project/` exists
- `.sigma/memory/local/` exists
- `.sigma/tools/` exists and contains helper tools
- Codex and Claude runtime guidance point to native surfaces plus helper tooling
- The tracked-vs-live Claude runtime distinction is documented
- Generated `.sigma/*` state is described as generated-only
- No Sigma-facing output exposes external graph-engine branding

### Mandatory: Run $holes

Before the final checkpoint, invoke `$holes` to find:
- Runtime spec sections missing or contradictory
- Scaffold files that don't match the spec
- Graph provider capabilities not wired
- SigmaHQ dispatch policy gaps (when configured)
- Helper tools that don't map to real concerns
- Coordinator policy not enforced in delegation-policy.json

Fix findings before presenting.

### Writing Standards (embedded)

- No stock AI phrases: "Robust runtime", "Seamless orchestration", "Comprehensive bootstrap"
- Helper tools are concrete scripts, not vague "tool infrastructure"
- Coordinator policy is explicit: who does what, in what order, with what gates
- Memory model is specific: what's durable, what's private, what's gitignored
- Write like a platform engineer deploying an agent fleet, not a PM describing capabilities

### Final report must include
- Detected graph-engine source status
- Runtime files created or updated
- Memory scaffold created or updated
- Helper tools created or updated
- Platform runtime wiring updated or deferred
- SigmaHQ dispatch status (configured or skipped)
- Any remaining manual follow-up

<HARD-GATE>
FINAL GATE — Do NOT proceed to implementation or release workflows without explicit approval.
Use AskUserQuestion: "Step 14 complete. The agent runtime is bootstrapped. Ready to begin implementation?"
Options: [Begin implementation with SigmaHQ dispatch, Begin implementation without dispatch, Revise runtime configuration]
</HARD-GATE>

---

<verification>
## Step 14 Verification Schema

### Required Files (30 points)
| File | Path | Min Size | Points |
|------|------|----------|--------|
| Runtime Spec | docs/specs/AGENT-RUNTIME.md | 1KB | 8 |
| Runtime Manifest | .sigma/runtime/runtime.manifest.json | 200B | 6 |
| Graph Config | .sigma/runtime/graph.config.json | 200B | 4 |
| Delegation Policy | .sigma/runtime/delegation-policy.json | 200B | 4 |
| Project Memory | .sigma/memory/project/ | exists | 4 |
| Local Memory | .sigma/memory/local/ | exists | 1 |
| Agent Memory | .sigma/memory/agents/ | exists | 2 |
| Helper Tools | .sigma/tools/ | exists | 1 |

### Required Spec Sections (25 points)
| Section | Points |
|---------|--------|
| Coordinator Policy | 5 |
| Graph Provider Contract | 4 |
| Memory Model | 4 |
| Helper Tool Contract | 3 |
| Codex Runtime | 3 |
| Claude Code Runtime | 3 |
| SigmaHQ Dispatch (when configured) | 3 |

### Content Quality (20 points)
| Check | Points |
|-------|--------|
| Coordinator-first behavior documented | 5 |
| Native runtime surfaces documented | 5 |
| At least one helper tool exists | 5 |
| Graph capability contract preserved | 5 |

### DNA Compliance (15 points)
| Check | Points |
|-------|--------|
| Anti-slop rules embedded | 4 |
| SigmaHQ dispatch policy wired (when configured) | 5 |
| Worktree isolation policy documented | 3 |
| Runtime manifest includes sigmahq workspace (when configured) | 3 |

### Boundary Integrity (10 points)
| Check | Points |
|-------|--------|
| Step 12 native surfaces consumed (not rewritten) | 4 |
| .sigma/tools/ is Step 14-owned | 3 |
| $holes pass completed | 3 |

### Pass Threshold
95/100 minimum.
</verification>

$END$
