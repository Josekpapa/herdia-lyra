---
version: "1.1.0"
last_updated: "2026-04-19"
changelog:
  - "1.1.0: Preflight detects Step 5 Track A bundles and Track B HTML wireframes. When bundles contain interaction notes (Track A), use them as state-behavior source material alongside Step 5 flow PRDs."
  - "1.0.0: Full state catalog, recovery, announcements, focus behavior, accessibility."
description: "Step 7: Interface States → STATE-SPEC.md — full state catalog, recovery logic, announcements, focus behavior, and accessibility for every screen"
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
  - --depth
  - --mobile
---

# /step-7-interface-states — Interface States, Recovery & State Accessibility

**On start, announce:** "Running Step 7: Interface States. I'll define how every screen behaves when reality happens — loading, errors, empty data, permissions, offline, and recovery."

<goal>
You are the State Architecture Lead. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Import Context & State Surface Inventory | Stateful surfaces identified + system rules imported |
| B | Universal State Model & Per-Flow Coverage | State taxonomy + per-screen state mapping |
| C | Recovery Patterns & Accessibility | Recovery rules + announcements + focus management |
| D | Cross-Feature Patterns & State Transitions | Shared patterns + transition rules |
| E | Output, Hardening & Handoff | STATE-SPEC.md + Step 8 handoff |

Required Output: `docs/states/STATE-SPEC.md`

Optional (when justified): `docs/states/MICRO-INTERACTIONS.md`, `docs/states/MOBILE-STATES.md`, `docs/states/ACCESSIBILITY-STATES.md`

Quality gate: 95+/100 on verification schema.

**Core rule:** If Step 7 is weak, the app can be technically correct and still feel broken. Every screen must have its states defined.

**AI-native output rule:** STATE-SPEC.md is consumed by AI agents in Steps 8 and 11. State definitions must be structured as tables/matrices — not prose descriptions.
</goal>

---

## Trigger

**Run after Step 6 (Design System) is approved.** Step 7 requires Step 6 design tokens and system rules to define state behavior that inherits from the design system. If Step 6 outputs are missing, stop and inform the user.

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
  --title "Step 7: Interface States" \
  --body "State taxonomy, per-flow coverage, recovery patterns, accessibility" \
  --status doing --priority high --tag "step-7,interface-states" \
  --json
```

**Phase transitions (if SIGMAHQ_ENABLED):**
- After Phase B approval (state model + per-flow coverage):
  ```bash
  kanban-md create --dir "$WORKSPACE" \
    --title "Step 7: State model mapped" \
    --body "Universal taxonomy defined, per-screen state matrices complete" \
    --status done --priority high --tag "step-7,state-model"
  ```
- After Phase C approval (recovery + accessibility):
  ```bash
  kanban-md create --dir "$WORKSPACE" \
    --title "Step 7: Recovery & a11y rules" \
    --body "Recovery patterns, ARIA announcements, focus management defined" \
    --status done --priority medium --tag "step-7,accessibility"
  ```

**On step completion (if SIGMAHQ_ENABLED):**
```bash
TASK_ID=$(kanban-md list --dir "$WORKSPACE" --status doing --tag "step-7" --json | jq -r '.[0].id')
kanban-md move --dir "$WORKSPACE" "$TASK_ID" done
```

If SigmaHQ is not configured, skip all kanban-md commands — file-based artifacts remain the sole handoff mechanism.

---

## Step Boundary

- **Step 7 owns:** universal state taxonomy, per-flow/per-screen state coverage, first-user vs seeded-demo vs populated vs unauthorized behavior, recovery patterns, state microcopy expectations, announcements, focus behavior, cross-feature state patterns.
- **Step 7 does NOT own:** motion system (Step 6), design tokens (Step 6), animation library choices (Step 8), implementation patterns (Step 8), stack-specific state management (Step 8).
- **Do NOT** redefine the motion system or prescribe implementation libraries. Define BEHAVIOR, not implementation.

Step relationship: Step 5 shows prototype screens → Step 6 defines system rules → **Step 7 defines every real-world state those screens can enter** → Step 8 implements.

---

## State Principles

### States Are Product Behavior, Not Edge Cases
Every state answers:
- What the user believes is happening
- What the system is actually doing
- What the user can do next
- How the user recovers if something goes wrong

### Make Invalid States Unrepresentable
Model states as discriminated unions, not boolean flags. Don't allow `isLoading=true AND hasError=true` — use explicit state families: `idle | loading | success | error`.

```typescript
// ❌ Boolean flags allow impossible states
{ isLoading: true, isError: true, data: "x" }

// ✅ Discriminated union — each state has only relevant data
type State =
  | { type: "idle" }
  | { type: "loading"; startedAt: number }
  | { type: "success"; data: T }
  | { type: "error"; error: Error; retryCount: number }
```

This is the implementation pattern Step 8 should enforce. Step 7 defines WHICH states exist; this principle ensures agents model them correctly.

### Optimistic UI Pattern
For actions where 99% succeed (likes, saves, toggles), show success instantly and sync in background:
- Store previous state before optimistic update
- On failure: full rollback (revert to previous), partial rollback (revert failed items), or merge with server response
- Always provide a visible error recovery path when rollback occurs

### Empty States Drive Activation (NN/g)
Empty states are onboarding opportunities, not dead ends:
- **Communicate system status** — "No records" is only valid if the system finished loading. Don't show "No records" while still fetching.
- **Provide learning cues** — "Star your favorites to list them here" teaches functionality in context
- **Offer direct pathways** — Action buttons and documentation links, not just explanatory text

### Accessibility Is Now Legally Mandatory (2026)
- **EAA enforced** since June 2025 — fines up to €500K for non-compliance in EU
- **ADA Title II** deadline: April 2026 for entities with 50K+ population
- This is not optional guidance — it's a legal requirement that affects state design

### Distinguish Unavailable States Clearly
These are NOT the same — don't blur them:

| State | Why the user can't act | Can they recover? | Next best action |
|-------|----------------------|-------------------|-----------------|
| **Disabled** | Precondition not met | Yes — complete precondition | Show what's needed |
| **Read-only** | Viewing without edit rights | No — by design | Navigate to editable context |
| **Locked** | Feature or resource locked | Maybe — upgrade, wait, or request | Show unlock path |
| **Unauthorized** | No permission | Yes — sign in or request access | Auth flow or contact admin |
| **Unavailable** | Feature doesn't exist yet or is down | No — system limitation | Communicate timeline or alternative |
| **Offline** | No network | Yes — when connection returns | Queue actions, show cached data |

### State Changes Should Reduce Uncertainty
- Loading should reassure (skeleton > spinner for structured content)
- Empty states should guide (explain what belongs here + next action)
- Errors should calm and recover (what happened + what to do)
- Success should confirm and direct (what worked + what's next)

---

## Phase A — Import Context & State Surface Inventory

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read Step 5 flow PRDs: `docs/prds/flows/*/FLOW-*.md`, `docs/prds/flows/PRD-SUMMARY.md`.
3. **Detect Step 5 track visual artifacts:**
   - If `docs/prds/flows/*/claude-design/` bundles exist (Track A), read bundle interaction notes — these describe approved state behavior from stakeholder iteration. Use as source material for per-flow state mapping.
   - If `docs/prds/flows/*/screens/*.html` HTML wireframes exist (Track B), read state markup in the HTML (e.g., `data-state`, class variations, dark mode media queries) to verify every state from Step 5 is represented.
4. Read Step 6: `docs/design/DESIGN-SYSTEM.md`, `docs/tokens/design-tokens.json`.
5. Read `.sigma/runtime-baseline.json`. If `research_mode = blocked` → stop.

### Classify state-heavy surfaces

Scan all Step 5 flow PRDs and categorize:
- **Data surfaces** — lists, dashboards, tables, feeds (need: empty, loading, error, populated)
- **Form surfaces** — inputs, creation flows (need: validation, submission, success, error)
- **Destructive actions** — delete, cancel, revoke (need: confirmation, success, undo)
- **Permission-gated** — auth-required, role-based, paywall (need: unauthorized, locked, upgrade)
- **Offline-sensitive** — real-time data, sync-dependent (need: offline, stale, reconnection)

### Production Data Coverage Model

For authenticated or data-bearing surfaces, MUST define all of:
- `seeded-demo` — what a demo account sees
- `first-real-user-empty` — what a brand-new real account sees (first action, bootstrap CTA)
- `existing-user-populated` — normal usage state
- `unauthorized` — what happens without proper auth
- `loading` — what shows while data loads
- `error` — what shows when data fetch fails

If no authenticated surfaces exist, state: "No authenticated/data-bearing surfaces in scope."

<HARD-GATE>
Do NOT proceed to Phase B until user approves state surface inventory.
Use AskUserQuestion: "State surfaces classified. Approve?"
Options: [Approve — define state model, Add more surfaces, Reclassify]
</HARD-GATE>

---

## Phase B — Universal State Model & Per-Flow Coverage

### Universal State Taxonomy

Define the core state families for this product:

| State | User Interpretation | System Reality | Visual Intent | Recovery | Announcement |
|-------|-------------------|---------------|---------------|----------|--------------|
| Empty | Nothing here yet | No data exists | Guide to first action | Create first item | None |
| Loading | Working on it | Fetching data | Skeleton / progress | Wait | Polite status |
| Success | It worked | Action completed | Confirm + next step | None needed | Polite status |
| Error | Something broke | Request failed | Explain + retry | Retry / go back / contact support | Assertive alert |
| Partial | Some things worked | Partial data/failure | Show what works + flag what failed | Retry failed parts | Polite status |
| Offline | No connection | Network unavailable | Show cached + queue actions | Reconnect | Polite status |
| Unauthorized | Can't access this | Auth required | Sign-in prompt | Authenticate | None |
| Locked/Upgrade | Need higher tier | Entitlement check failed | Show upgrade path | Upgrade or contact sales | None |
| Read-only | Can view, can't edit | Permission level | Subtle indicator | Navigate to editable context | None |

### Per-Flow State Coverage

For each flow from Step 5, map every screen to its applicable states:

| Screen ID | Empty | Loading | Success | Error | Auth | Locked | Offline | Notes |
|-----------|-------|---------|---------|-------|------|--------|---------|-------|
| [id] | [behavior] | [behavior] | [behavior] | [behavior] | [behavior] | [behavior] | [behavior] | |

For each cell, define: what the user sees, what they can do, what microcopy appears.

<HARD-GATE>
Do NOT proceed to Phase C until user approves state model + per-flow coverage.
Use AskUserQuestion: "State model and per-flow coverage mapped. Approve?"
Options: [Approve — define recovery and accessibility, Add states for more screens, Revise state model]
</HARD-GATE>

---

## Phase C — Recovery Patterns & Accessibility

### Cross-Feature Recovery Rules

| Scenario | What Happens | What's Announced | Where Focus Goes | User's Next Action |
|----------|-------------|-----------------|-----------------|-------------------|
| Network failure | Show error + cached data if available | Assertive: "Connection lost" | Retry button | Retry or wait |
| Validation failure | Inline error on field | Assertive: field-specific error | First invalid field | Fix and resubmit |
| Permission failure | Auth prompt or upgrade card | None (visual only) | Sign-in / upgrade CTA | Authenticate or upgrade |
| Offline mode | Show cached data + offline badge | Polite: "You're offline" | No change | Queue actions, wait |
| Empty → first value | Onboarding CTA or guided action | None | Primary CTA | Create first item |
| Destructive confirmation | Modal with explicit confirm | Polite: "Are you sure?" | Confirm button | Confirm or cancel |
| Save/submit success | Toast or inline confirmation | Polite: "Saved" | Next logical action | Continue workflow |

### Accessibility & Announcement Rules

**Announcements (ARIA live regions):**
- `role="status"` (polite) — loading completion, save success, non-critical updates
- `role="alert"` (assertive) — errors, validation failures, destructive consequences
- `aria-busy="true"` on containers during data updates — signals screen readers to delay announcing changes
- `aria-disabled="true"` on buttons during submission + change accessible name to "Submitting..."
- Skeleton screens: apply `aria-hidden="true"` (they're visual-only) and announce via separate live region
- Do NOT announce every state change — skip announcements for sub-second operations
- Do NOT announce in-progress loading unless the operation takes >2 seconds

**Focus Management:**
- After state change → focus moves to the most relevant next action
- After modal/overlay close → focus returns to the element that opened it
- After error → focus moves to the first invalid field or error summary
- After destructive action → focus moves to the item's former context
- Do NOT trap focus unless in a modal/dialog

**Large Text & Scaling:**
- State layouts must survive 200% text zoom (WCAG 2.2 AA)
- Empty state illustrations/icons should not push content off-screen at large text sizes

<HARD-GATE>
Do NOT proceed to Phase D until user approves recovery + accessibility.
Use AskUserQuestion: "Recovery patterns and accessibility rules defined. Approve?"
Options: [Approve — finalize cross-feature patterns, Strengthen recovery rules, Add more a11y rules]
</HARD-GATE>

---

## Phase D — Cross-Feature Patterns & State Transitions

### Shared Patterns (apply across all flows)

Document reusable patterns that appear in multiple flows:
- **Skeleton loading** — use for structured content (lists, cards, tables). Spinners only for indeterminate short waits. Progress bars for uploads/multi-step processes with known duration.
- **Toast/notification** — success (auto-dismiss 3-5s), info (auto-dismiss), warning (persist until dismissed), error (persist + action). Use Sonner if shadcn/ui.
- **Confirmation** — required for destructive actions (delete, cancel, revoke) and large scope changes. Never for routine saves.
- **Retry** — auto-retry (1-3 attempts with exponential backoff) for network errors. Manual retry button for persistent failures. "Try again later" only when the service is genuinely down.
- **Optimistic update** — show success instantly for high-confidence actions (likes, toggles, saves). Store previous state → update UI → fire API → rollback on failure. React 19: use `useOptimistic` hook.
- **Stale-while-revalidate** — show cached/stale data immediately, refresh in background, update when fresh data arrives. Never show full loading state when stale data exists.
- **Error boundary** — wrap independent UI sections so one component failure doesn't crash the entire app. Show fallback UI for the affected section only. Log error for debugging.
- **Offline queue** — when offline, queue write actions locally, sync when connection returns, show pending indicator on queued items.

### State Transition Rules

For critical transitions, define:

| From | To | Trigger | Animation Intent | Announcement |
|------|-----|---------|-----------------|--------------|
| Loading | Success | Data received | Fade in content | Polite: "Loaded" |
| Loading | Error | Request failed | Shake or error reveal | Assertive: error message |
| Empty | Populated | First item created | Entrance animation | Polite: "First [item] created" |

Animation intent is documented here. Animation implementation is Step 8's job.

<HARD-GATE>
Do NOT proceed to Phase E until user approves cross-feature patterns.
Use AskUserQuestion: "Cross-feature patterns defined. Approve?"
Options: [Approve — write STATE-SPEC.md, Add more patterns, Revise transitions]
</HARD-GATE>

---

## Phase E — Output, Hardening & Handoff

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Screens from Step 5 without state coverage
- Missing recovery paths for critical user flows
- Weak announcement/focus rules
- State behavior that contradicts Step 6 system rules
- Step 8 implementation detail absorbed into Step 7

Fix findings before presenting.

### Write `docs/states/STATE-SPEC.md`

Required sections:
```
State Model (universal taxonomy table)
Production Data Coverage Model
Flow & Screen State Coverage (per-flow state matrices)
Recovery Patterns (cross-feature table)
Accessibility & Announcement Rules
Focus Management
Cross-Feature Patterns
State Transitions (animation intent)
Step 8 Handoff — what engineering must implement
Do NOT Build in This Step
```

### Step 8 Handoff must include:
- Stateful screens needing implementation attention
- State-specific accessibility requirements (ARIA roles, focus traps)
- Announcement rules to implement
- Focus restoration rules
- Permission/locked/offline handling requirements
- Which transitions depend on Step 6 motion tokens
- Which patterns need engineering decisions (retry logic, caching, optimistic updates)

### Writing Standards (embedded)

- No stock AI phrases: "Graceful degradation", "Smooth transitions", "Delightful experience"
- State descriptions are concrete: "Show error message + retry button" not "handle the error gracefully"
- Microcopy is realistic, not placeholder: "Couldn't load your projects. Check your connection and try again." not "An error occurred."
- Recovery actions are specific: "Retry button re-fetches the failed request" not "the user can try again"

### Success Criteria

- [ ] Universal state taxonomy defined
- [ ] Production data coverage model applied (or explicitly not applicable)
- [ ] Per-flow state coverage matches Step 5 screens
- [ ] Recovery patterns are concrete with next actions
- [ ] Accessibility announcements use proper ARIA patterns
- [ ] Focus management rules are explicit
- [ ] Unavailable states are distinguished (disabled/read-only/locked/unauthorized/offline)
- [ ] State behavior inherits Step 6 system rules
- [ ] Step 8 handoff explicit
- [ ] $holes pass completed
- [ ] SigmaHQ kanban cards created (when configured)
- [ ] User approved

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 8 without explicit approval.
Use AskUserQuestion: "Step 7 complete. Ready for Step 8 — Technical Spec?"
Options: [Proceed to Step 8, Revise state spec, Add more state coverage]
</HARD-GATE>

---

<verification>
## Step 7 Verification Schema

### Required Outputs (25 points)

| Item | Path | Points |
|------|------|--------|
| State Specification | docs/states/STATE-SPEC.md | 25 |

### Required Sections (35 points)

| Section | Points |
|---------|--------|
| State Model (universal taxonomy) | 5 |
| Production Data Coverage Model | 5 |
| Flow & Screen State Coverage (per-flow matrices) | 8 |
| Recovery Patterns (cross-feature) | 5 |
| Accessibility & Announcement Rules | 5 |
| Focus Management | 4 |
| Cross-Feature Patterns | 3 |

### Quality Indicators (30 points)

| Check | Points |
|-------|--------|
| Empty states are contextual with next-action CTAs | 5 |
| Loading uses skeleton-first for structured content | 4 |
| Errors explain what happened + what to do next | 5 |
| Unavailable states are distinct (disabled/read-only/locked/unauthorized/offline) | 5 |
| Announcements use proper ARIA roles (status vs alert) | 4 |
| Focus management is explicit for state transitions | 4 |
| Microcopy is realistic, not placeholder | 3 |

### Handoff & Boundary (10 points)

| Check | Points |
|-------|--------|
| Step 8 handoff explicit | 4 |
| No Step 6 motion system redefined | 2 |
| No Step 8 implementation detail absorbed | 2 |
| $holes pass completed | 2 |
| SigmaHQ kanban cards created (when configured) | 1 |

**Passing score:** 95/100
</verification>

$END$
