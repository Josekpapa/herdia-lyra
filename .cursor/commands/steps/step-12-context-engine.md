---
version: "7.2.0"
last_updated: "2026-04-19"
changelog:
  - "7.2.0: Generated AGENTS.md and CLAUDE.md.example must include a Design Artifacts section when Step 5 / Step 9 produced bundles or HTML wireframes. Runtime agents get bundle paths as visual source of truth."
  - "7.1.0: Research patches — file-level separation (no inline markers), global vs project architecture, budget constraints, guidance vs enforcement table"
  - "7.0.0: Full DNA treatment — HARD-GATE, AskUserQuestion, 95/100 gate, $holes, anti-slop, SigmaHQ sync, Agent DNA vs Skills concept"
  - "6.0.0: Rebuilt around native Codex and Claude Code surfaces"
description: "Step 12: Context Engine — synthesize methodology into native runtime surfaces for Codex and Claude Code"
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

# /step-12-context-engine — Runtime-Native Context Engine

**On start, announce:** "Running Step 12: Context Engine. I'll synthesize everything from Steps 0-11 into native runtime surfaces for Codex and Claude Code — AGENTS.md, CLAUDE.md.example, settings, and config."

**Mission**
Synthesize everything learned through Step 11 into the real runtime-native surfaces for Codex and Claude Code. Step 12 owns instruction synthesis and runtime-config alignment. Step 13 supplies authored skills and agents. Step 14 owns helper tools, manifests, memory, and coordinator-first runtime scaffolding.

**Runtime-native policy**
- Codex native surfaces: `/AGENTS.md`, `/.codex/config.toml`, `/.agents/skills/`, `/.codex/skills/` (compatibility adapter only)
- Claude Code native surfaces: `/CLAUDE.md.example` (tracked source for local `CLAUDE.md`), `/.claude/settings.json`, `/.claude/hooks/`, `/.claude/agents/`
- Claude Code generated: `/.claude/rules/step12-methodology.md` (Step 12 output, regenerable)
- Migration inputs only: `/.sigma/rules/`, `/.codex/rules/` (legacy — absorb or retire)
- Step 14 owns: `/.sigma/tools/`, `/.sigma/runtime/`, `/.sigma/memory/`

**Single-agent rule**
This step must run in the primary session. Do not split Step 12 into subagents. If multiple perspectives are useful, simulate them inside the same response with labeled sections.

<goal>
You are the Runtime Context Architect. Execute ALL phases (A through E) in order.

CRITICAL:
- Do NOT skip any phase. Do NOT combine phases.
- If Step 0 reports `research_mode = blocked`, stop and ask user to repair environment.
- Each phase ends with a HARD-GATE — halt and wait for user approval.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Native Surface Detection & Context Import | Confirmed runtime surfaces + migration inputs |
| B | Runtime Context Plan | File-level separation plan for all native surfaces |
| C | Codex + Claude Context Synthesis | Step 12 generated files: AGENTS.md section + .claude/rules/step12-methodology.md |
| D | Runtime Config Alignment + SigmaHQ Wiring | .claude/settings.json, .codex/config.toml, SigmaHQ sync |
| E | Verification & Handoff | Step 12 report, $holes pass, Step 13/14 handoff |

Required Outputs:
- `/AGENTS.md` (Step 12 methodology section, clearly labeled)
- `/.claude/rules/step12-methodology.md` (regenerable methodology, @-imported by CLAUDE.md)
- `/CLAUDE.md.example` (hand-written project context — Step 12 does NOT overwrite)
- `/.claude/settings.json`
- `/.codex/config.toml`

Quality gate: 95+/100 on verification schema.

**Core principle:** Runtime surfaces are consumed by AI agents, not read in meetings. Every instruction must be structured, unambiguous, and action-oriented.

Checkpoint slice rule:
- present only the current phase slice at each checkpoint
- summarize `What was decided`, `What changed`, and `What remains open`
- end with a clear approval or revision question for that slice only
</goal>

---

## Step Boundary

Step 12 OWNS:
- AGENTS.md Step 12 methodology section
- .claude/rules/step12-methodology.md (regenerable, @-imported by CLAUDE.md)
- .claude/settings.json project-level runtime keys
- .codex/config.toml repo-level runtime keys

Step 12 IMPORTS from Steps 0-11:
- MASTER_PRD, architecture, design system, technical spec, feature breakdown, PRD status

Step 12 does NOT OWN:
- .sigma/tools/, .sigma/runtime/, .sigma/memory/ (Step 14)
- src/skills/, src/agents/ (Step 13)
- Skill/agent runtime adapters (Step 13)

---

## Phase A — Native Surface Detection & Context Import

### Upstream Requirements

| Artifact | Source Step | Required |
|----------|-----------|----------|
| `docs/specs/MASTER_PRD.md` | Step 1 | **Yes** — project identity and outcomes |
| `docs/architecture/ARCHITECTURE.md` | Step 2 | **Yes** — architecture decisions |
| `docs/design/DESIGN-SYSTEM.md` | Step 6 | **Yes** — design system for skill/agent alignment |
| `docs/technical/TECHNICAL-SPEC.md` | Step 8 | **Yes** — technical contracts |
| `docs/implementation/FEATURE-BREAKDOWN.md` | Step 10 | **Yes** — feature scope for context |
| `docs/prds/F*-*.md` or `.prd-status.json` | Step 11 | **Yes** — PRD status for runtime wiring |

**Fallback:** If core upstream artifacts (MASTER_PRD, ARCHITECTURE, TECHNICAL-SPEC) are missing, halt and notify: "Step 12 requires upstream artifacts from Steps 1-11. Run missing steps first." If optional artifacts are missing, note gaps in the runtime context plan and label affected sections.

Read these sources if they exist:
- `AGENTS.md`, `CLAUDE.md.example`
- `docs/specs/MASTER_PRD.md`, `docs/specs/OFFER_ARCHITECTURE.md`
- `docs/architecture/ARCHITECTURE.md`, `docs/design/DESIGN-SYSTEM.md`
- `docs/states/STATE-SPEC.md`, `docs/technical/TECHNICAL-SPEC.md`
- `docs/implementation/FEATURE-BREAKDOWN.md`, `docs/prds/.prd-status.json`
- `src/skills/`, `src/agents/`, `.agents/skills/`, `.codex/skills/` (compatibility only)
- `.claude/agents/`, `.claude/hooks/`

Detect native runtime surfaces: `AGENTS.md`, `CLAUDE.md.example`, `.claude/settings.json`, `.codex/config.toml`

Read migration inputs only if they exist and still contain useful project-specific guidance: `.sigma/rules/`, `.claude/rules/`, `.codex/rules/`. Do **not** treat migration inputs as active outputs.

<HARD-GATE>
Do NOT proceed to Phase B until user approves surface detection.
Use AskUserQuestion: "Native surfaces detected. Approve runtime context plan scope?"
Options: [Approve — plan file-level separation, Revise — adjust surface list, Skip migration inputs]
</HARD-GATE>

---

## Phase B — Runtime Context Plan

**Goal:** Decide what must be synthesized into each native runtime surface before writing anything.

### Required planning decisions
- what Codex must learn from the project at startup
- what Claude Code must learn from the project at startup
- which instructions belong in human-readable instruction files versus runtime config files
- which runtime settings are project-level and safe to commit
- what content from legacy rule folders should be absorbed or retired
- what Step 14 must still own after Step 12 finishes

### File-Level Separation Policy (replaces inline markers)

Neither Claude Code nor Codex supports inline managed-section markers. Step 12 uses file-level separation instead:

**Claude Code:**
- Generate `.claude/rules/step12-methodology.md` — regenerable methodology rules
- Root `CLAUDE.md` uses `@.claude/rules/step12-methodology.md` to import
- Hand-written project content stays in CLAUDE.md itself, untouched by regeneration
- Path-scoped rules use `.claude/rules/*.md` with `paths:` frontmatter for per-layer instructions

**Codex:**
- Generate methodology content as a section in `AGENTS.md` (clearly labeled)
- Document `AGENTS.override.md` for local overrides that should NOT be committed
- Skills in `.agents/skills/` are separate files, naturally regenerable

This means Step 12 can be re-run safely — it only overwrites its own generated files, never hand-written content.

### Agent DNA vs Skills Concept

The generated files must distinguish:
- **DNA** (embedded methodology): anti-slop rules, verification gates, HARD-GATE patterns, coordinator-first policy — baked into AGENTS.md and CLAUDE.md.example
- **Skills** (project-specific frameworks): stack-profile references, MCP tool bindings, platform patterns — loaded per project from `docs/stack-profile.json`

DNA is immutable across projects. Skills change per project. Do NOT mix them in generated files.

### Minimum native outputs to plan
- `AGENTS.md` Step 12 methodology section (clearly labeled, regenerable)
- `.claude/rules/step12-methodology.md` (regenerable methodology, @-imported by CLAUDE.md)
- `CLAUDE.md.example` hand-written project context (Step 12 does NOT overwrite this)
- `.claude/settings.json` project-level runtime keys
- `.codex/config.toml` repo-level runtime keys

<HARD-GATE>
Do NOT proceed to Phase C until user approves the runtime context plan.
Use AskUserQuestion: "Runtime context plan ready. Approve file-level separation layout?"
Options: [Approve — write generated files, Revise — adjust plan, Show DNA vs Skills split]
</HARD-GATE>

---

## Phase C — Codex + Claude Context Synthesis

**Goal:** Synthesize the project's runtime context into both `AGENTS.md` and `CLAUDE.md.example`.

### Global vs Project Architecture

The runtime instruction layer has two tiers:

**Global `~/.claude/CLAUDE.md` (DNA — governance for ALL projects):**
- Sigma methodology (the 14-step framework)
- SigmaHQ integration (plan → team → kanban-md → dispatch → review)
- The execution loop: implement → PR review → gap analysis → commit
- Sub-agent orchestration patterns (coordinator-first, skill assignment)
- Anti-slop rules, quality gates, cross-model review
- This is the HOW of work — immutable across projects

**Project `./CLAUDE.md` (context — THIS specific project):**
- Project identity, architecture, stack decisions
- Key file paths and conventions
- Project-specific rules and constraints
- Step 12 manages: `.claude/rules/step12-methodology.md` (imported via @-import)
- Must stay under 200 lines (>200 lines = 71% rule compliance vs 92% under 200)

Step 12 generates the PROJECT layer only. The global DNA layer is maintained separately (in the user's `~/.claude/CLAUDE.md`). Step 12 must NOT duplicate global methodology into the project file.

**Codex equivalent:**
- Global `~/.codex/AGENTS.md` = DNA governance
- Project `./AGENTS.md` = project context (32 KiB default limit via `project_doc_max_bytes`)
- `AGENTS.override.md` = local overrides (not committed)

### Codex section requirements
The Step 12 methodology section in `AGENTS.md` must:
- explain the active Step `0-14` contract plus conditional Step `1.5`
- identify Codex-native surfaces: `AGENTS.md`, `.codex/config.toml`, `.agents/skills/`, `.codex/skills/` (compatibility adapter only)
- point Step 13 outputs at `src/skills/<category>/<skill>/SKILL.md`, `src/agents/<category>/<agent>.md`, `.agents/skills/`, and `.codex/skills/` only as compatibility
- point Step 14 outputs at `.sigma/tools/`, `.sigma/runtime/`, and `.sigma/memory/`
- label `.codex/rules/*.rules` as optional execution-policy files, not Step 12 outputs
- avoid archived Cursor-first language and retired rule-mirror language

### Claude section requirements
Step 12 generates `.claude/rules/step12-methodology.md` (the regenerable methodology file). `CLAUDE.md.example` is hand-written project context that Step 12 does NOT overwrite. The generated methodology file must:
- identify Claude-native surfaces: `CLAUDE.md`, `.claude/settings.json`, `.claude/skills/`, `.claude/hooks/`, `.claude/agents/`
- point Step 13 outputs at `.claude/agents/` and authored sources in `src/agents/`
- point Step 14 outputs at `.sigma/tools/`, `.sigma/runtime/`, and `.sigma/memory/`
- document that `.claude/rules/` contains regenerable methodology (not hand-written rules)
- include an @-import instruction for CLAUDE.md to reference it

**Budget constraints:**
- Project CLAUDE.md: target under 200 lines. Beyond 200 lines, rule application drops from 92% to 71%.
- Project AGENTS.md: target under 32 KiB (Codex `project_doc_max_bytes` default).
- Push detailed methodology into `.claude/rules/step12-methodology.md` (no line limit) and @-import it.

**Do not rewrite CLAUDE.md.example wholesale.** Only generate the methodology file and update @-import references.

### Design Artifacts Section (include when Step 5 or Step 9 produced bundles/wireframes)

When generating `.claude/rules/step12-methodology.md` and updating `AGENTS.md`, include a **Design Artifacts** section whenever ANY of these paths exist in the project:
- `docs/prds/flows/*/claude-design/` (Step 5 Track A bundles)
- `docs/prds/flows/*/screens/*.html` (Step 5 Track B wireframes)
- `docs/landing-page/claude-design/` (Step 9 Track A or Hybrid bundles)
- `docs/landing-page/landing-page.html` (Step 9 Track B direct HTML)

**Section content to emit:**

```markdown
## Design Artifacts

Approved visual direction lives in these locations. Agents scaffolding UI should treat them as the visual source of truth.

### Flow-level (Step 5)
- Claude Design bundles (Track A): `docs/prds/flows/*/claude-design/`
- HTML wireframes (Track B): `docs/prds/flows/*/screens/*.html`

### Landing page (Step 9)
- Claude Design bundle (Track A/Hybrid): `docs/landing-page/claude-design/`
- Direct HTML (Track B): `docs/landing-page/landing-page.html`

### Detection
Check filesystem for which artifacts exist — this tells you which track was used upstream. Features in Step 11 PRDs reference these paths via their Section 7 "Visual source of truth".
```

Skip the section entirely when none of the paths exist — keep AGENTS.md lean under its 32 KiB budget.

<HARD-GATE>
Do NOT proceed to Phase D until user approves both generated outputs.
Use AskUserQuestion: "AGENTS.md methodology section and .claude/rules/step12-methodology.md written. Approve synthesis?"
Options: [Approve — align runtime config, Revise AGENTS.md, Revise step12-methodology.md]
</HARD-GATE>

---

## Phase D — Runtime Config Alignment + SigmaHQ Wiring

**Goal:** Align project-level runtime configuration files with the active workflow and wire SigmaHQ integration.

### `.claude/settings.json` requirements
Keep only project-level runtime concerns: hooks, permissions, MCP/runtime env settings. Do **not** use `.claude/settings.json` as a giant duplicate of `CLAUDE.md.example`.

### `.codex/config.toml` requirements
Keep only repo-level Codex runtime concerns: approval and sandbox policy, repo-level MCP server configuration, repo-level features needed by Sigma. Do **not** duplicate user-level defaults that belong in `~/.codex/config.toml`.

### Guidance vs Enforcement Separation

| Concern | Claude Code Surface | Codex Surface |
|---------|-------------------|---------------|
| Methodology & conventions (guidance) | CLAUDE.md + .claude/rules/ | AGENTS.md |
| Pipeline gates & permissions (enforcement) | .claude/settings.json hooks | .codex/config.toml approval_policy |
| Tool restrictions | .claude/settings.json allowedTools | .codex/config.toml sandbox_mode |
| MCP servers | .mcp.json | .codex/config.toml [mcp_servers] |
| Local overrides | .claude/settings.local.json | AGENTS.override.md |

Do NOT put enforcement rules in CLAUDE.md/AGENTS.md — they are advisory, not deterministic. Hooks and permissions in settings.json/config.toml ARE deterministic.

### Config alignment rules
- preserve user-chosen model/profile choices unless the repo requires a specific override
- patch only Sigma-owned repo-level keys or comments
- do not reintroduce Step 12 outputs under `.sigma/rules/`, `.claude/rules/`, or `.codex/rules/`

### SigmaHQ Sync Wiring (when configured)

If `runtime-baseline.json` shows `sigmahq.configured: true`:

1. Verify the kanban board has Step 11 outputs:
   ```bash
   kanban-md list --dir {sigmahq.workspace} --tags eng-task --json
   ```
2. Add `sigma sigmahq-sync` as a recognized runtime command in CLAUDE.md.example
3. Wire the SigmaHQ workspace path into `.claude/settings.json` env if applicable:
   ```json
   { "env": { "SIGMAHQ_WORKSPACE": "{sigmahq.workspace}" } }
   ```
4. Document the kanban-md integration for Steps 13-14 in the methodology file:
   - Step 13 reads `eng-task` tagged cards for agent assignment
   - Step 14 reads agent-assigned cards for dispatch
5. Create a Step 12 completion milestone card:
   ```bash
   kanban-md create --dir {sigmahq.workspace} \
     --title "Step 12: Context Engine Complete" \
     --body "Runtime surfaces: AGENTS.md, CLAUDE.md.example, settings.json, config.toml" \
     --status done \
     --priority high \
     --tags milestone,step-12 \
     --json
   ```

This enables Steps 13-14 to use the kanban board for agent assignment and dispatch.

If SigmaHQ is not configured, skip kanban wiring — file-based artifacts are the sole integration surface.

<HARD-GATE>
Do NOT proceed to Phase E until user approves runtime config and SigmaHQ wiring.
Use AskUserQuestion: "Runtime config aligned, SigmaHQ wiring complete. Approve?"
Options: [Approve — run verification, Revise settings.json, Revise config.toml, Adjust SigmaHQ wiring]
</HARD-GATE>

---

## Phase E — Verification & Handoff

**Goal:** Verify the runtime-native context layer is coherent and hand off to Step 13 and Step 14.

### Required verification
- `AGENTS.md` contains the Step 12 methodology section (clearly labeled)
- `.claude/rules/step12-methodology.md` exists and is regenerable
- `.claude/settings.json` contains project-level Sigma runtime keys
- `.codex/config.toml` contains repo-level Sigma runtime keys
- Step 12 no longer requires `.sigma/rules/`, `.claude/rules/`, or `.codex/rules/`
- any useful guidance in legacy rule folders is absorbed or explicitly retired

### Mandatory: Run $holes
Before final checkpoint, invoke `$holes` to find:
- Native surfaces missing from generated files
- Migration inputs not absorbed or explicitly retired
- Contradictions between AGENTS.md and CLAUDE.md.example
- Step 13/14 handoff gaps
- DNA vs Skills confusion in generated files

Fix findings before presenting.

### Writing Standards (embedded)
- No stock AI phrases: "Robust configuration", "Seamless integration", "Comprehensive setup"
- Instructions are specific commands, not descriptions of what should happen
- File paths are exact, not "the config file" or "the settings"
- Write like a systems engineer wiring a runtime, not a PM describing a vision

### Downstream Handoff

Step 12 produces artifacts consumed by later steps:

| Artifact | Consumed By | Purpose |
|----------|-------------|---------|
| `AGENTS.md` (Step 12 methodology section) | Step 13 (adapter alignment), Step 14 (runtime reference) |
| `.claude/rules/step12-methodology.md` | Step 13 (Claude Code adapter generation) |
| `.claude/settings.json` | Step 13 (skill/agent runtime config), Step 14 (hook wiring) |
| `.codex/config.toml` | Step 13 (Codex adapter generation), Step 14 (sandbox policy) |

### Final report must include
- native runtime surfaces updated
- migration inputs absorbed or ignored
- Step 13 references confirmed
- Step 14 follow-on work required for `.sigma/tools/`, runtime manifests, and memory scaffolds
- any manual follow-up required for local `CLAUDE.md` materialization

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 13 without explicit approval.
Use AskUserQuestion: "Step 12 complete. Ready for Step 13 — Skillpack Generator?"
Options: [Proceed to Step 13, Revise runtime surfaces, Review generated files]
</HARD-GATE>

---

<verification>
## Step 12 Verification Schema

### Required Files (35 points)
| File | Path | Min Size | Points |
|------|------|----------|--------|
| Codex Runtime Instructions | /AGENTS.md | 2KB | 10 |
| Claude Runtime Instructions | /CLAUDE.md.example | 2KB | 10 |
| Claude Project Settings | /.claude/settings.json | 500B | 8 |
| Codex Project Config | /.codex/config.toml | 500B | 7 |

### File-Level Separation (15 points)
| Check | Points |
|-------|--------|
| .claude/rules/step12-methodology.md exists (regenerable methodology) | 8 |
| CLAUDE.md @-imports step12-methodology.md or stays under 200 lines | 7 |

### Content Quality (25 points)
| Check | Points |
|-------|--------|
| Codex native surfaces documented in AGENTS.md | 7 |
| Claude native surfaces documented in CLAUDE.md.example | 7 |
| Claude settings contain runtime keys | 6 |
| Codex config contain runtime keys | 5 |

### DNA Compliance (15 points)
| Check | Points |
|-------|--------|
| DNA vs Skills separation in generated files | 5 |
| Anti-slop rules embedded (no stock AI phrases in outputs) | 5 |
| SigmaHQ sync documented when configured | 5 |

### Boundary Integrity (10 points)
| Check | Points |
|-------|--------|
| Native runtime first (no rule folders as active contract) | 4 |
| Step 14 handoff clean (.sigma/tools/ ownership documented) | 3 |
| $holes pass completed | 3 |

### Pass Threshold
95/100 minimum.
</verification>

$END$
