---
version: "5.0.0"
last_updated: "2026-03-23"
changelog:
  - "5.0.0: Unified Sprint Factory — single command for post-Step-14 execution with kanban-driven sprints, parallel dispatch, gap analysis rounds, PR review gates, and branch strategy"
  - "4.0.0: Added Active Task Memory for loop resume support"
  - "3.0.0: Added Grade 4 Agentic Layer with auto-fix"
description: "Sprint Execution Factory — pulls sprints from kanban, plans in detail, dispatches parallel agents, runs gap analysis rounds until clean, commits through PR review gates, merges to dev, and loops to next sprint. THE single command that runs after Steps 0-14 are complete."
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Agent
  - TeamCreate
  - TaskCreate
  - TaskUpdate
  - TaskList
  - SendMessage
  - AskUserQuestion
  - Skill
  - WebSearch
  - WebFetch
parameters:
  - --wave
  - --sprint-size
  - --auto-merge
  - --branch-target
  - --skip-research
  - --dry-run
---

# @dev-loop — Sprint Execution Factory

**The single command that turns your kanban board into shipped code.**

After Steps 0-14 produce all planning artifacts (PRDs, specs, agents, skills, kanban tasks), this command takes over. It reads your kanban, plans sprints, dispatches parallel agents, validates through gap analysis rounds, and merges through PR review gates — on repeat until the backlog is empty.

## When to Use

Run this AFTER Step 14 (Agent Runtime Bootstrap) is complete. All PRDs must be in your kanban board (`kanban-md`). Your project must have:
- `CLAUDE.md` with project context
- `AGENTS.md` with agent definitions
- `.sigma/` directory with runtime config
- Kanban board populated with PRDs/tasks
- Git repo initialized with `dev` branch

## Usage

```bash
@dev-loop                                    # Start from next unblocked sprint
@dev-loop --wave=2                           # Start from specific wave
@dev-loop --sprint-size=3                    # Override sprint size (default: 3-5, auto-sized)
@dev-loop --branch-target=main               # Override merge target (default: dev)
@dev-loop --skip-research                    # Skip pre-implementation research
@dev-loop --dry-run                          # Plan sprints without executing
```

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--wave` | Start from specific wave number | Next unblocked wave |
| `--sprint-size` | Force sprint size (overrides auto-sizing) | Auto (3-5 based on PRD complexity) |
| `--auto-merge` | Merge without waiting for manual PR approval | `false` |
| `--branch-target` | Branch to merge PRs into | `dev` |
| `--skip-research` | Skip Exa/Ref research phase | `false` |
| `--dry-run` | Plan sprints and show what would happen, don't execute | `false` |

---

## The Loop

```
┌─────────────────────────────────────────────────────┐
│                  SPRINT EXECUTION FACTORY            │
│                                                      │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐       │
│  │ 1. PLAN  │───>│ 2. RECON │───>│ 3. BUILD │       │
│  │  Sprint  │    │ Research │    │ Dispatch │       │
│  └──────────┘    └──────────┘    └──────────┘       │
│       │                               │              │
│       │         ┌──────────┐          │              │
│       │         │ 4. GATE  │<─────────┘              │
│       │         │ Gap Loop │                         │
│       │         └──────────┘                         │
│       │              │                               │
│       │         ┌──────────┐    ┌──────────┐        │
│       │         │ 5. SHIP  │───>│ 6. REVIEW│        │
│       │         │  Commit  │    │ PR Gate  │        │
│       │         └──────────┘    └──────────┘        │
│       │                               │              │
│       │         ┌──────────┐          │              │
│       └─────────│ 7. MERGE │<─────────┘              │
│                 │  + Next  │                         │
│                 └──────────┘                         │
└─────────────────────────────────────────────────────┘
```

---

## Phase 1: Sprint Planning

<goal>
You are the Sprint Execution Factory coordinator. You NEVER implement code directly. You plan, dispatch, review, and merge.

### 1.1 Read Kanban State

Read the kanban board to understand current state:
```bash
kanban-md list --dir {workspace}
```

Detect the workspace from CWD using the mapping in global CLAUDE.md.

### 1.2 Select Sprint PRDs

Select the next batch of unblocked PRDs from the current wave:
- Default sprint size: 3-5 PRDs
- **Auto-sizing rule**: Read each candidate PRD. If a PRD has >15 acceptance criteria OR >8 API endpoints OR >20 files to create, it counts as 2-3 slots. One massive PRD can be a solo sprint.
- Respect wave dependencies: all wave N PRDs must complete before wave N+1
- Respect inter-PRD dependencies within a wave (blockedBy relationships)

Present the sprint plan to the user:
```
Sprint 2a — Wave 2 (3 PRDs)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[1] F07 — User Dashboard (8 AC, ~12 files)
[2] F08 — Settings Panel (5 AC, ~8 files)
[3] F09 — Notification System (6 AC, ~10 files)

Estimated complexity: MEDIUM
Sprint branch: {project}-dev-sprint-2a

Proceed? (Y/n)
```

### 1.3 Detail Plan Each PRD

For each PRD in the sprint:
1. Read the full PRD file (`docs/prds/F{NN}-*.md`)
2. Extract: BDD scenarios, API contracts, acceptance criteria, screens/components
3. Map files to create/modify with EXACT paths
4. Assign to specialist agent (from Step 13 agents or protocol agents)
5. Define file ownership boundaries — NO two agents touch the same file
6. Identify shared dependencies (e.g., shared types, utils) — assign to first agent, others wait

Output: Detailed sprint plan with task assignments and file boundaries.
</goal>

---

## Phase 2: Pre-Implementation Research

For EACH PRD in the sprint (skip if `--skip-research`):

1. **Exa MCP** — search for latest patterns, library versions, security advisories relevant to the PRD
2. **Ref MCP** — check framework documentation for APIs being used
3. **Project specs** — read Architecture, Tech Spec, Design System docs for project-specific patterns

Research findings feed into worker task context. No separate research files.

Skip research for purely mechanical PRDs (CRUD, config, boilerplate).

---

## Phase 3: Team Dispatch

### 3.1 Create Team
Create a team for this sprint (one team per sprint, reuse if exists):
```
TeamCreate: sprint-{wave}{letter} (e.g., sprint-2a)
```

### 3.2 Mandatory Team Members

Every sprint team MUST include these two agents regardless of team size. They come installed with Sigma Protocol:

| Agent | Role | When | Why |
|-------|------|------|-----|
| `sigma-devils-advocate` | Adversarial post-implementation review | After all implementation tasks complete | Finds what builders missed — assumptions, edge cases, fragile patterns |
| `sigma-qa` | Acceptance criteria verification + regression check | After devil's advocate completes | Validates every AC has evidence, catches regressions |

**Execution order within the sprint:**
1. Implementation agents work in parallel (Phase 3.3)
2. `sigma-devils-advocate` reviews ALL sprint output (blocked until implementation done)
3. `sigma-qa` validates acceptance criteria (blocked until devil's advocate done)
4. Coordinator reviews reports and decides pass/fail before Phase 4

These agents run on EVERY sprint — even when codex cross-model review is also available. They are complementary, not redundant. Devil's Advocate challenges the design. QA validates the requirements. Codex catches cross-model blind spots.

### 3.3 Spawn Implementation Workers
Spawn specialist agents per task assignment from Phase 1:
- Each worker receives: PRD excerpt, file boundaries, research context, acceptance criteria
- Workers follow TDD discipline: failing test → code → refactor → commit
- Non-blocked tasks dispatch in parallel
- Dependent tasks wait for blockers to complete

### 3.4 Monitor
- Idle >30s without results = probe the agent
- 2 consecutive failures on same task = reassign to different agent or escalate
- Agent sends completion report with files changed, tests added, criteria evidence

### 3.5 File Ownership
File ownership is SACRED. Two agents must NEVER edit the same file. If a shared file needs changes from multiple PRDs, assign it to ONE agent and have others wait or use a different approach.

---

## Phase 4: Gap Analysis Gate

After ALL sprint tasks complete, run the quality gate loop.

### 4.1 Run `@audit:gap-analysis`
Invoke the gap analysis command on all files changed in this sprint.

### 4.2 Cross-Model Review (bonus layer, if available)

Devil's Advocate and QA already ran in Phase 3. Cross-model review is an ADDITIONAL layer that catches same-model blind spots.

```bash
# Check for codex
which codex >/dev/null 2>&1
```

**If codex is installed:**
```bash
codex exec -m gpt-5.4 -s read-only --skip-git-repo-check "Review this sprint's changes adversarially. Find bugs, security issues, missing edge cases, type errors. Files changed: [list]. Sprint PRDs: [list]. Be harsh."
```

**If codex is NOT installed:**
No action needed — Devil's Advocate and QA already provide the review layer. Cross-model is a bonus, not a requirement.

### 4.3 Round Loop (EXIT: 2 consecutive clean rounds)

```
Round N:
  a. Run gap analysis on sprint files
  b. Run cross-model or protocol review
  c. Compile findings

  IF findings related to sprint PRDs:
    → Fix them
    → Increment N
    → Go to (a)

  IF findings UNRELATED to sprint PRDs:
    → Create new kanban tasks for each finding:
      kanban-md create --dir {workspace} --title "Fix: {description}" --status todo --priority medium
    → Do NOT fix them in this sprint
    → These findings do NOT count against the clean round

  IF zero sprint-related findings AND previous round was also clean:
    → EXIT loop (PASS — 2 consecutive clean rounds)

  IF zero sprint-related findings BUT previous round had findings:
    → Run one more round to confirm (need 2 consecutive)
```

Minimum 2 rounds. No maximum — loop until clean or escalate to user after 5 rounds.

---

## Phase 5: Commit

### 5.1 Pipeline Gates
Before committing, run pipeline gates:
- Anti-slop scan (if configured)
- Type checking (`tsc --noEmit` or equivalent)
- Lint (`npm run lint` or equivalent)
- Tests (`npm test` or equivalent)

### 5.2 Stage and Commit
```bash
git add [specific files from sprint]
git commit -m "feat(wave-{N}): sprint {N}{a} — {summary of PRDs implemented}

PRDs: {F07, F08, F09}
Acceptance criteria: {count} passed
Gap analysis: {rounds} rounds, clean

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

### 5.3 Update Status
- Update `.prd-status.json` for completed PRDs
- Update kanban: `kanban-md move --dir {workspace} {id} done`

---

## Phase 6: PR Review Gate

### 6.1 Push Sprint Branch
```bash
git push -u origin {project}-dev-sprint-{wave}{letter}
```

### 6.2 Create PR
```bash
gh pr create --base {branch-target} --title "Sprint {wave}{letter}: {summary}" --body "..."
```

PR body includes:
- Sprint summary (which PRDs, what was built)
- Acceptance criteria evidence table
- Gap analysis results (rounds, findings fixed)
- Files changed count

### 6.3 Greptile Review (if available)

Check if Greptile MCP is available. If yes:

```
Trigger Greptile review on PR via MCP
Wait for review completion
```

**Review gate:**
- Zero critical issues + zero high issues = PASS
- Any critical OR high issue = FIX LOOP:
  1. Fix the issues locally
  2. Commit + push to same branch
  3. Re-trigger Greptile review
  4. Repeat until passing

**If Greptile is NOT available:**
- Gap analysis rounds are the quality gate (already passed in Phase 4)
- Create PR without automated review
- Note in PR body: "Manual review recommended — no automated PR review configured"

### 6.4 Merge
Once review passes (or if no review tool available):
- If `--auto-merge`: merge automatically
- If not: present PR URL to user, wait for confirmation

```bash
gh pr merge {pr-number} --squash --delete-branch
```

---

## Phase 7: Next Sprint

### 7.1 Wave Gate Check
If all PRDs in the current wave are done:
- Verify ALL wave PRDs pass (check `.prd-status.json`)
- If all pass: advance to next wave
- If any failed: flag to user, do not advance

### 7.2 Loop
- Read kanban for next batch of unblocked PRDs
- Start next sprint letter (2a → 2b → 2c... or advance to wave 3a)
- Loop back to Phase 1

### 7.3 Completion
When ALL kanban tasks are done and ALL waves are complete:
```
Sprint Factory Complete
━━━━━━━━━━━━━━━━━━━━━━━
Waves completed: {N}
Sprints executed: {count}
PRDs implemented: {count}
Total gap analysis rounds: {count}
Total commits: {count}
```

---

## First-Run Setup

On first invocation, ask setup questions and store in `.sigma/config.json`:

1. **Branch target**: "What branch should sprints merge into?" (default: `dev`)
2. **PR review tool**: Auto-detect Greptile availability
3. **Cross-model review**: Auto-detect codex availability
4. **Private/public split**: "Will this repo have a separate public release? (Y/n)" → if yes, store sanitization rules

---

## Branching Model

```
main (production — deploy-ready)
  └── dev (staging — integration testing)
        └── {project}-dev-sprint-{wave}{letter} (sprint work)
              → merges to dev when sprint passes all gates
                  → dev merges to main via release PR
```

- Sprint branches are created per sprint, deleted after merge
- `dev` branch must exist before first sprint (create if missing)
- Merges to `main` are manual release events, not automated by dev-loop

---

## Session Resume

If a session ends mid-sprint:
1. Write checkpoint to `.sigma/memory/active_task.md`:
   - Current sprint (wave + letter)
   - PRDs in progress vs completed
   - Current phase (planning, building, reviewing)
   - Files changed so far
2. On next `@dev-loop` invocation:
   - Read `.sigma/memory/active_task.md`
   - Resume from last checkpoint
   - Do NOT restart completed phases

---

## Failure Handling

| Scenario | Action |
|----------|--------|
| Agent fails 2x on same task | Reassign to different agent or escalate to user |
| Gap analysis stuck after 5 rounds | Pause, show remaining issues, ask user for direction |
| PR review failing after 3 fix cycles | Pause, show Greptile comments, ask user for direction |
| Build/lint/type errors | Fix before committing, include in gap analysis |
| Wave gate fails (missing PRDs) | Show which PRDs are incomplete, do not advance |

---

## Related Commands

| Command | Role in Sprint Factory |
|---------|----------------------|
| `@audit:gap-analysis` | Quality gate — runs within Phase 4 |
| `@orchestrate` | Terminal spawner — used internally for parallel dispatch |
| `@continue` | Resume interrupted work — reads active task memory |
| `@status` | Show sprint progress across waves |
| `@audit:holes` | Pre-implementation check — used during planning |

$END$
