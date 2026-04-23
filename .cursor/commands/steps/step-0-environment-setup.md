---
description: "Step 0: Sigma Bootloader — detect project mode, validate runtime + research stack, create minimal baseline, persist state"
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
  - --runtime
  - --mode
  - --skip-validation
  - --reduced-research
---

# /step-0-environment-setup — Sigma Bootloader

**On start, announce:** "Running Step 0: Environment Bootloader. I'll walk you through 5 phases with approval gates before Step 1 can begin."

<goal>
You are the Sigma Bootloader Engineer. Execute ALL phases (A through E) in order.
Do NOT skip any phase. Do NOT combine phases.
Each phase ends with a HARD-GATE — halt, present results, and use AskUserQuestion for approval before proceeding.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Detect project mode + validate runtime | Mode + runtime status |
| B | Validate research stack | `full` / `reduced` / `blocked` research mode |
| C | Validate stack integrations | Integration findings |
| D | Create minimal baseline | Shared directories |
| E | Persist state | `ENVIRONMENT-SETUP.md` + `runtime-baseline.json` |

Quality gate: 95+/100 on verification schema. Step 1 blocked until pass.
</goal>

---

## Phase A — Mode Detection & Runtime Health

**Goal:** Detect the project mode, select the active runtime, validate it.

### Preflight (auto, no user interaction)

1. Run `date +"%Y-%m-%d"` for timestamps.
2. Detect repo root.
3. Load existing `docs/ops/ENVIRONMENT-SETUP.md` and `.sigma/runtime-baseline.json` if present.
4. Check for: `.sigma/boilerplate.json`, `docs/stack-profile.json`, `.claude/`, `.codex/`, `docs/ops/CODEBASE-MAP.md`.
5. Detect OS and shell.

### Mode detection (pick exactly one)

**`protocol-dev`** — The Sigma authoring repo itself.
Requires ALL of: `steps/` + `templates/steps/` + at least one of `packages/sigma-protocol-core/` or `src/module.yaml`.
Do not infer from generic folders like `ops/` or `dev/`.

**`boilerplate-project`** — `.sigma/boilerplate.json` exists and this is NOT the Sigma authoring repo.
Boilerplate metadata is source of truth for stack integrations.

**`custom-project`** — Neither condition above.
If the repo has meaningful code but no codebase map, recommend `sigma map-codebase` before deeper planning.

### Runtime selection (infer, don't ask unless ambiguous)

1. If `.sigma/runtime-baseline.json` has `runtime_selection` and that runtime surface still exists → use it.
2. Else inspect `AGENTS.md`, `.codex/config.toml`, `.claude/` settings for clear runtime signal.
3. If only `.claude/` exists → `claude-code`. If only `.codex/` → `codex`.
4. If ambiguous → ask user: Claude Code / Codex / Both.

### Runtime validation

**Claude Code** (if selected): `claude --version`, `claude auth status --text`, `.claude/` surface present, no secrets in committed config.

**Codex** (if selected): `codex --version`, `.codex/config.toml` exists, no deprecated `approval_policy = "on-failure"`, no secrets in committed config.

Produce a runtime status summary: runtime, version, config health, auth state, pass/warn/fail, action needed.

**Blocking:** If the selected runtime is missing or broken, Step 1 is blocked.

<HARD-GATE>
Do NOT proceed to Phase B until user approves.
Use AskUserQuestion: "Mode detection and runtime health complete. Approve?"
Options: [Approve — proceed to research stack, Revise — something needs fixing]
</HARD-GATE>

---

## Phase B — Research Stack

**Goal:** Classify research capability as `full`, `reduced`, or `blocked`.

### Research mode rules

| Mode | Requirements |
|------|-------------|
| `full` | Exa configured + Firecrawl configured + at least one docs/code-context source |
| `reduced` | User explicitly accepts missing Exa/Firecrawl; at least one research path exists |
| `blocked` | No viable research path — Step 1 blocked |

### Provider priority

- **Web research:** Exa → Firecrawl → runtime web search (reduced-mode only)
- **Documentation:** Ref MCP or equivalent
- **Code context:** Exa code context or equivalent

### Design & component tools (detect availability)

Check and record these in `runtime-baseline.json` under `design_tools`:
- **shadcn MCP** — component library, blocks, themes, presets. Check: `shadcn` MCP server configured. If available → enables component browsing, theme preset selection, and block scaffolding in Steps 3-9.
- **`/clone` skill** — design DNA extraction from reference sites/screenshots. Check: `/clone` skill exists in `.claude/skills/` or global skills. If available → enables reference-driven wireframe generation in Step 5 by extracting colors, typography, spacing, and layout patterns from existing designs.

These are development tools, not stack decisions. The stack (React, Next.js, etc.) is decided in Steps 1-2. But knowing these tools are available shapes what later steps can do.

**Wireframe generation:** Step 5 generates wireframes as self-contained HTML files directly — no external SDK required. The AI agent produces production-quality HTML/CSS screens inline. When `/clone` is available, it extracts design DNA from reference sites to feed into the HTML generation as design constraints.

### RTK (Token Optimizer) — Recommended

RTK compresses CLI output by 60-90% before it enters the AI context window. Saves tokens, extends sessions, reduces costs.

**Check:** `rtk --version`
**Install:** `brew install rtk && rtk init --global`
**What it does:** Transparently rewrites bash commands (git, npm, grep, etc.) through a PreToolUse hook. Zero changes to your workflow — just smaller context consumption.
**Skip if:** You don't care about token optimization or prefer raw output.

Record RTK availability in `runtime-baseline.json` under `token_optimizer: { rtk: true/false, version: "..." }`.

### If Exa, Firecrawl, or design tools are missing

Recommend installing them. Explain the value (1-2 sentences). Walk through setup only after user approval. Never write API keys into committed files — instruct user to store in local env.

Produce a tool summary: category, preferred provider, actual provider, configured status, action needed. Include both research tools AND design tools in the summary.

<HARD-GATE>
Do NOT proceed to Phase C until user approves.
Use AskUserQuestion: "Research stack validated. Approve research mode?"
Options: [Approve — proceed to stack integrations, Install missing tools first, Continue in reduced mode]
</HARD-GATE>

---

## Phase C — Stack Integrations

**Goal:** Validate stack integrations implied by the project. Do not ask about stacks the project doesn't use.

### If `boilerplate-project`

Read `.sigma/boilerplate.json` then `docs/stack-profile.json`. Infer integrations from boilerplate metadata. Do NOT ask generic questions the boilerplate already answers.

Known mappings:
- `nextjs-saas` → Supabase, Stripe, Vercel
- `nextjs-ai` → Convex
- `expo-mobile` → Supabase, RevenueCat, Expo
- `nextjs-portable` → Drizzle/Postgres
- `tanstack-saas` → Supabase

### If `custom-project`

Use `docs/stack-profile.json` if it exists. Else scan for obvious markers: `supabase/`, `convex/`, `docker-compose.yml`, `vercel.json`, Expo config. If stack is unclear, defer to Step 2.

Stack integrations are recommended, not blocking, unless the project clearly depends on them for basic operation.

<HARD-GATE>
Do NOT proceed to Phase D until user approves.
Use AskUserQuestion: "Stack integration review complete. Approve?"
Options: [Approve — create baseline directories, Revise — need to add/remove integrations]
</HARD-GATE>

### SigmaHQ / CommandBoard Detection

Check if `~/.commandboard/` exists and has a matching project workspace.

Detection logic:
1. Check `~/.commandboard/workspaces/` for a directory matching the project name or CWD
2. If found, record in stack integration notes
3. If not found, note that SigmaHQ is not configured — steps will use file-based status tracking only

This is detection only — no directories are created. Steps 4, 5, 10, 11, 13, and 14 use this to decide whether to sync progress to the kanban board.

### SigmaHQ Operations Reference (for downstream steps)

When SigmaHQ is configured, these patterns apply to all kanban-md operations in Steps 4-14:

**Reading the workspace path:**
```bash
# Read from runtime-baseline.json
sigmahq_workspace=$(jq -r '.sigmahq.workspace' .sigma/runtime-baseline.json)
```

**Listing tasks to discover IDs:**
```bash
kanban-md list --dir {sigmahq.workspace} --json                    # all tasks
kanban-md list --dir {sigmahq.workspace} --status todo --json      # pending tasks
kanban-md list --dir {sigmahq.workspace} --tags flow-card --json   # Step 4 flow cards
kanban-md list --dir {sigmahq.workspace} --tags feature --json     # Step 10 feature cards
kanban-md list --dir {sigmahq.workspace} --tags eng-task --json    # Step 11 engineering tasks
```

**Capturing IDs from create:**
```bash
# Use --json on create to capture the returned task ID
kanban-md create --dir {workspace} --title "..." --json  # Returns JSON with "id" field
```

**Card tagging convention:**
- Step 4 flow cards: `--tags flow-card`
- Step 10 feature cards: `--tags feature,prd-eligible`
- Step 11 engineering tasks: `--tags eng-task`
- Always use tags to distinguish card types when querying the board

**Error handling:** If any kanban-md command fails, log the error and continue with file-based tracking. Do not block the step's primary work on kanban sync failures.

**Workspace path format:** Absolute path without trailing slash, pointing to a directory containing `config.yml` (e.g., `~/.commandboard/workspaces/products/my-project`).

---

## Phase D — Minimal Baseline

**Goal:** Create only the shared directories that Step 0 owns. Nothing else.

### Create if missing

- `docs/ops/`, `docs/prds/`, `docs/analysis/`
- `.sigma/backlogs/prototype/`, `.sigma/backlogs/implementation/`
- `.sigma/orchestration/`

### Create CONTEXT.md from template
If `CONTEXT.md` does not exist at the project root:
1. Copy from `docs/templates/CONTEXT.md` (in the Sigma Protocol repo) or use the embedded template structure
2. Fill in the Project Metadata section with detected values (project name, runtime, current date)
3. Leave the Decision Log, Assumptions, and Open Questions sections empty — downstream steps populate them

This file is the project's living decision log. Agents update it as they make architectural and integration decisions throughout Steps 1-13.

### Do NOT create

- Downstream docs subdirectories
- Protocol authoring surfaces in normal app projects
- Step-specific outputs (those belong to later steps)
- Step 12/14 runtime surfaces (`.sigma/tools/`, `.sigma/runtime/`, etc.)

If `protocol-dev` mode: validate protocol authoring surfaces exist, but do not create or rewrite them.

<HARD-GATE>
Do NOT proceed to Phase E until user approves.
Use AskUserQuestion: "Baseline directories created. Approve?"
Options: [Approve — persist state files, Revise — adjust baseline]
</HARD-GATE>

---

## Phase E — Persist State

**Goal:** Write durable human + machine state before Step 1.

### Write `docs/ops/ENVIRONMENT-SETUP.md`

Required sections: Step 0 Mode, Runtime Selection & Health, Research Mode, Stack Integration Recommendations, Minimal Baseline Status, Install/Repair Actions, Blocking Issues, Next Steps.

### Write `.sigma/runtime-baseline.json`

```json
{
  "$schema": "https://sigma-protocol.dev/schemas/runtime-baseline.schema.json",
  "mode": "custom-project",
  "runtime_selection": "claude-code",
  "runtime_status": { "selected": ["claude-code"], "healthy": true },
  "research_mode": "full",
  "research_tools": { "web_research": {}, "documentation_lookup": {}, "code_context_lookup": {}, "recommended": ["exa", "firecrawl"] },
  "design_tools": { "shadcn_mcp": false, "clone_skill": false },
  "sigmahq": { "configured": false, "workspace": null },
  "boilerplate": null,
  "stack_integrations": [],
  "blocking_issues": [],
  "generated_at": "2026-03-19T00:00:00Z"
}
```

### Writing Standards (embedded — apply to ENVIRONMENT-SETUP.md)

- No stock AI phrases: "Let's dive in", "Here's the thing", "In today's landscape", "At its core", "Robust", "Seamless", "Leverage", "Delve"
- Start with facts, not sweeping statements about the state of the industry
- Commit to findings or flag as uncertain — no "might/could potentially" hedging on every line
- No breathless enthusiasm — a runtime check is not "fascinating" or "transformative"
- No "Final thoughts" or "Key takeaways" headers
- Write like a concise engineering report, not a blog post

### Step 1 gate

Step 1 can proceed only when: selected runtime(s) healthy or accepted with warnings, research mode is not `blocked`, minimal baseline exists, blocking issues documented.

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 1 without explicit approval.
Use AskUserQuestion: "Step 0 complete. Ready for Step 1?"
Options: [Proceed to Step 1 — Ideation, Fix issues first, Review reports]
</HARD-GATE>

---

<verification>
## Step 0 Verification Schema

### Required Files (30 points)

| File | Path | Min Size | Points |
|------|------|----------|--------|
| Environment Report | docs/ops/ENVIRONMENT-SETUP.md | 1KB | 10 |
| Runtime Baseline | .sigma/runtime-baseline.json | 200B | 10 |
| Ops Directory | docs/ops/ | exists | 2 |
| PRD Directory | docs/prds/ | exists | 2 |
| Analysis Directory | docs/analysis/ | exists | 2 |
| Prototype Backlog Dir | .sigma/backlogs/prototype/ | exists | 1 |
| Implementation Backlog Dir | .sigma/backlogs/implementation/ | exists | 1 |
| Orchestration Dir | .sigma/orchestration/ | exists | 1 |
| Decision Log | CONTEXT.md | exists | 1 |

### Required Sections (25 points)

| Section | Must Exist In | Points |
|---------|---------------|--------|
| Step 0 Mode | ENVIRONMENT-SETUP.md | 3 |
| Runtime Selection & Health | ENVIRONMENT-SETUP.md | 4 |
| Research Mode | ENVIRONMENT-SETUP.md | 4 |
| Stack Integration Recommendations | ENVIRONMENT-SETUP.md | 4 |
| Minimal Baseline Status | ENVIRONMENT-SETUP.md | 3 |
| Install / Repair Actions | ENVIRONMENT-SETUP.md | 3 |
| Blocking Issues | ENVIRONMENT-SETUP.md | 2 |
| Next Steps | ENVIRONMENT-SETUP.md | 2 |

### Runtime & Research Contract (25 points)

| Check | Points |
|-------|--------|
| Runtime selection recorded in baseline JSON | 5 |
| Research mode recorded in baseline JSON | 5 |
| Step 0 mode recorded in baseline JSON | 5 |
| Exa + Firecrawl recommendation documented | 4 |
| Integration findings recorded or deferred explicitly | 4 |
| SigmaHQ detection recorded in baseline JSON | 2 |

### Mode-Specific Quality (20 points)

| Check | Points |
|-------|--------|
| Valid mode in baseline JSON (`protocol-dev` / `boilerplate-project` / `custom-project`) | 5 |
| Valid runtime in baseline JSON (`claude-code` / `codex` / `both`) | 5 |
| Valid research mode in baseline JSON (`full` / `reduced` / `blocked`) | 4 |
| Exa or Firecrawl mentioned in ENVIRONMENT-SETUP.md | 4 |
| SigmaHQ workspace path recorded when configured | 2 |

### Pass Threshold
95/100 minimum. Any `blocked` research mode or missing selected runtime is a hard blocker regardless of score.
</verification>

$END$
