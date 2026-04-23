---
version: "5.0.0"
last_updated: "2026-04-19"
changelog:
  - "5.0.0: Added Track A (Claude Design visual validation) / Track B (direct scaffolding) branch. Track B preserves existing HTML/shadcn/text wireframe generation. Track A adds per-flow Claude Design prompts + human visual iteration loop + bundle ingestion. Both tracks converge on per-flow scaffolding PRDs. Step 6 optionally inherits tokens from Track A bundles."
  - "4.0.0: Reframed Step 5 around canonical per-flow prototype PRDs with direct HTML screen generation."
description: "Step 5: Wireframe Prototypes → per-flow prototype PRDs via Track A (Claude Design visual validation) or Track B (direct HTML scaffolding)"
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
  - --platform
  - --flow
  - --track
  - --visual-validate
  - --wireframe-tool
---

# /step-5-wireframe-prototypes — Per-Flow Prototype PRD Generation

**On start, announce:** "Running Step 5: Wireframe Prototypes. I'll ask whether to use Track A (Claude Design visual validation) or Track B (direct scaffolding), then generate buildable prototype PRDs for each flow."

<goal>
You are the Prototype Specification Lead. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Import Step 3/4 + Select Track | Coverage target, UI profile, track selection (A or B) |
| B | Flow Planning & Coverage | Tracker initialized, flow order confirmed |
| C | Track-Specific Generation | **Track A:** Claude Design prompts → human iterates → bundles imported → scaffolding PRDs reference bundles. **Track B:** Direct HTML/shadcn/text wireframes + scaffolding PRDs. |
| D | Prototype Handoff & Summary | PRD-SUMMARY.md + Step 11 implications + track metadata |
| E | Zero Omission Verification & Hardening | Certificate + final approval |

Final Outputs (both tracks):
- `docs/prds/flows/[NN]-[flow-slug]/FLOW-[ID].md` (one scaffolding PRD per flow)
- `docs/prds/flows/WIREFRAME-TRACKER.md`
- `docs/prds/flows/PRD-SUMMARY.md`
- `docs/prds/flows/ZERO-OMISSION-CERTIFICATE.md`

Track-specific outputs:
- **Track A:** `docs/prds/flows/[NN]-[flow-slug]/CLAUDE-DESIGN-PROMPT.md` + `docs/prds/flows/[NN]-[flow-slug]/claude-design/` (imported bundle)
- **Track B:** `docs/prds/flows/[NN]-[flow-slug]/screens/[screen-id].html` (generated wireframes)

Quality gate: 95+/100 on verification schema.

**Core rule:** Every Step 4 screen must be covered regardless of track. If gap > 0, Step 5 fails.

**Prototype scope:** Build to learn, not to ship. The scaffolding PRD spec produced here is what Claude Code will use to scaffold the real frontend in Step 11. Step 11 hardens it to production.
</goal>

---

## Step Boundary

- **Step 5 owns:** track selection, per-flow prototype PRDs, wireframe artifacts (HTML in Track B or Claude Design bundles in Track A), UI profile compliance, interaction behavior, prototype data register, backend preview, prototype acceptance criteria, omission reconciliation against Step 4.
- **Step 5 does NOT own:** environment setup (Step 0), design tokens (Step 6), full state catalog (Step 7), technical blueprint (Step 8), production data/auth logic (Step 11).
- **Do NOT** write production backend specs. Do NOT create full schemas or RLS policies. Preview backend intent only.

---

## Track Selection — When to Use Each

### Track A — Claude Design Visual Validation (OPT-IN)

**Use when:**
- A non-technical stakeholder (founder, PM, client) will iterate visually before scaffolding starts
- The project has a public-facing landing page or marketing surface
- Visual direction is uncertain and needs rapid iteration with adjustment knobs
- The user has passed `--visual-validate` or `--track=A`, or project mode is `custom-project` with a landing page in scope

**What it is:**
Claude Design is Anthropic's visual design tool (launched April 2026, Pro/Max/Team/Enterprise). Users drag `.md` prompts into Claude Design, iterate visually with inline comments + adjustment knobs, then export an implementation bundle (components + design tokens + copy + interaction notes). No MCP/CLI exists — the human is the bridge between terminal and Claude Design browser.

**Workflow:** Step 5 generates per-flow Claude Design prompts → human opens Claude Design, drags prompts folder in → iterates with stakeholders → exports bundle per flow → commits bundles back to repo → Step 5 resumes, generates scaffolding PRDs that reference the bundles as the visual source of truth.

### Track B — Direct Scaffolding (DEFAULT)

**Use when:**
- Internal tool, CLI, backend service, or dev-facing product with no non-technical stakeholder review
- Visual direction is clear from Step 3's UI Profile and Design DNA
- User wants to move fast from Step 4 straight to scaffolding
- User has passed `--track=B` or accepted the default

**What it is:**
Step 5 generates HTML wireframes directly (current behavior). Scaffolding PRDs embed wireframe references. Claude Code consumes PRDs in Step 11 to scaffold the real frontend.

### Track Comparison

| Dimension | Track A (Claude Design) | Track B (Direct) |
|-----------|------------------------|------------------|
| Iterator | Human (sliders + inline comments) | AI agent (from PRD spec) |
| Stakeholder friction | Low — non-dev can drive | Medium — must read/review diff |
| Speed per visual tweak | Seconds (live adjustment knob) | Minutes (regenerate code) |
| Output fidelity to stack | Medium (HTML bundle) | High (real HTML/CSS with project conventions) |
| Round-trip time | Adds 15-30 min per flow (human-in-the-loop) | Continuous, no pause |
| Best for | Client projects, founder-review products, landing pages | Internal tools, backend-heavy projects, dev-only audiences |

### Switching Tracks Mid-Step

If after Phase A a user realizes Track B is wrong (stakeholder wants visual review) or Track A is wrong (no one to drive Claude Design), re-run Phase A. Don't try to retrofit — tracks produce different artifact shapes.

---

## Prototype Principles (Both Tracks)

### Prototype as Learning Device
- Validates flow, clarity, interaction quality — not production readiness
- Uses `mock`, `seeded-demo`, or limited `real` data paths (documented in Prototype Data Register)
- Step 11 replaces prototype-only behavior with production contracts

### Behavior Documentation Over Pixels
Each flow PRD answers:
- What the user sees
- What the user can do
- What feedback appears
- What happens when data is missing, loading, or invalid
- What assumptions the prototype is making

### Realistic Content Discipline
- Use realistic labels, messages, CTA copy, representative data
- No "Lorem ipsum" or "Placeholder text here"
- Prototype must be evaluatable honestly, not just structurally

---

## Phase A — Import Step 3/4 + Select Track

### Upstream Requirements

| Artifact | Source Step | Required |
|----------|-----------|----------|
| `docs/flows/FLOW-TREE.md` | Step 4 | **Yes** — flow list drives all coverage |
| `docs/flows/SCREEN-INVENTORY.md` | Step 4 | **Yes** — screen count is the zero-gap baseline |
| `docs/flows/TRANSITION-MAP.md` | Step 4 | **Yes** — navigation behavior |
| `docs/flows/TRACEABILITY-MATRIX.md` | Step 4 | **Yes** — outcome tracing |
| `docs/ux/UX-DESIGN.md` | Step 3 | **Yes** — Design DNA source |
| `docs/design/UI-PROFILE.md` | Step 3 | **Yes** — UI profile guardrails |
| `docs/design/ui-profile.json` | Step 3 | **Yes** — machine-readable UI profile |
| `docs/specs/OFFER_ARCHITECTURE.md` | Step 1.5 | Conditional — only if monetization affects flows |

**Fallback:** If any required artifact is missing, halt and notify the user: "Step 5 requires [artifact] from Step [N]. Run Step [N] first or provide the artifact." Do NOT invent flows or screens — all coverage derives from Step 4.

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read `.sigma/runtime-baseline.json`, `docs/ux/UX-DESIGN.md`, `docs/design/UI-PROFILE.md`, `docs/design/ui-profile.json`.
3. Read `docs/flows/FLOW-TREE.md`, `docs/flows/SCREEN-INVENTORY.md`, `docs/flows/TRANSITION-MAP.md`, `docs/flows/TRACEABILITY-MATRIX.md`.
4. Read `docs/specs/OFFER_ARCHITECTURE.md` if monetization affects prototype flows.
5. Read `docs/stack-profile.json` to detect `--new-project` mode and target tech stack (Next.js, Expo, SwiftUI, etc.).
6. If any required upstream artifact is missing → halt per fallback rule above.
7. If `research_mode = blocked` → stop. If `reduced` → label assumptions.

### Sequential Decisions

**Decision 1: Track selection (NEW — this is the main branch point)**

Use AskUserQuestion: "Which Step 5 track should we use?"

Options:
- **Track B — Direct scaffolding (default, recommended for most projects):** AI generates wireframes + scaffolding PRDs in one pass. No human-in-the-loop visual iteration. Fastest path from Step 4 to Step 11.
- **Track A — Claude Design visual validation:** Generate per-flow Claude Design prompts, pause for human visual iteration in Claude Design browser, import bundles, then generate scaffolding PRDs. Best when a non-technical stakeholder will review visuals before scaffolding.
- **Explain the difference in detail** — show the Track Comparison table and Track Selection guidance, then re-ask.

**Auto-default behavior:**
- If `--track=A` or `--visual-validate` is present → skip the prompt, go Track A
- If `--track=B` is present → skip the prompt, go Track B
- If project has a landing page flow AND mode is `custom-project` → recommend Track A but still ask
- Otherwise → recommend Track B

**Decision 2: Wireframe approach (Track B only — skip in Track A)**

Use AskUserQuestion: "Which wireframe generation approach should we use?"
Options: [Direct HTML screens — AI-generated production-quality HTML/CSS (Recommended), shadcn blocks — start from pre-built component compositions (if shadcn/ui in stack), Text-only — PRD descriptions without visual wireframes]

**Decision 3: Flow priority (both tracks)**

Use AskUserQuestion: "Which flows should we wireframe first?"
Options: [P0 flows first (recommended), All flows at once, Specific flow — I'll name it, Let me see the flow list first]

### Import Summary

Document: total screens from Step 4, flow categories, UI profile imported, Design DNA archetype, selected track, wireframe tool (if Track B).

<HARD-GATE>
Do NOT proceed to Phase B until user approves imports + track selection.
Use AskUserQuestion: "Context imported, track selected. Approve?"
Options: [Approve — plan flow coverage, Change track, Revise flow priority]
</HARD-GATE>

---

## Phase B — Flow Planning & Coverage

### Initialize Tracker

Create `docs/prds/flows/WIREFRAME-TRACKER.md`. Include a **Track** column.

| Flow | Slug | Screens | Track | Status | PRD Path | Bundle Path (Track A) |
|------|------|---------|-------|--------|----------|----------------------|
| [flow] | [flow-slug] | [count] | A or B | pending | docs/prds/flows/[NN]-[flow-slug]/FLOW-[ID].md | docs/prds/flows/[NN]-[flow-slug]/claude-design/ |

### Coverage Rules

- Derive flow list directly from Step 4 — do NOT invent new flows or screens
- Map each Step 4 screen to exactly one flow PRD owner
- If Step 4 is missing something, stop and send user back to Step 4
- Both tracks use the same flow list — track only affects *how* wireframes are produced

<HARD-GATE>
Do NOT proceed to Phase C until user approves flow plan.
Use AskUserQuestion: "Flow coverage planned. Approve order and begin generation?"
Options: [Approve — generate flow PRDs, Reorder flows, Go back to Step 4 — missing screens]
</HARD-GATE>

---

## Phase C — Track-Specific Generation

Execute **either** Phase C-A (Track A) **or** Phase C-B (Track B) based on Decision 1. Do not execute both.

---

### Phase C-A — Track A: Claude Design Visual Validation

Track A has three sub-phases: **C-A.1** generate prompts, **C-A.2** human iterates in Claude Design (HARD PAUSE), **C-A.3** import bundles + generate scaffolding PRDs.

#### C-A.1 — Generate Per-Flow Claude Design Prompts

For each flow, generate a Claude Design prompt file:

**Path:** `docs/prds/flows/[NN]-[flow-slug]/CLAUDE-DESIGN-PROMPT.md`

**Prompt structure (each file):**

```markdown
# Claude Design Prompt — [Flow Name]

**Usage:** Drag this file (or the entire flow folder) into Claude Design. Claude Design will generate interactive prototypes from this spec. Iterate visually with inline comments + adjustment knobs. When approved, click "Send to Claude Code" to export the implementation bundle back.

## Brand Context (imported from Step 3)

- **Product:** [name from MASTER_PRD.md]
- **Design DNA:** [archetype from ui-profile.json]
- **UI Profile summary:** [paste from UI-PROFILE.md — density, motion, contrast, formality]
- **Typography:** [families from ui-profile.json]
- **Layout primary:** [sidebar|tabs|single-column|dashboard]
- **Platform:** [web|mobile|both]
- **Anti-slop guardrails:** [paste the full anti-slop list from UI-PROFILE.md]

## Flow Context (imported from Step 4)

- **Flow ID:** [flow-id]
- **Flow category:** [category]
- **Actor:** [who uses this flow]
- **Priority:** [P0|P1|P2]
- **DNA emphasis for this flow:** [where the DNA should feel strongest in this specific flow]

## Screens to Design ([N] total)

For each screen in this flow (listed in dependency order — design the entry screen first):

### Screen 1: [screen ID and title]
- **Route:** [path]
- **Purpose:** [one concrete sentence]
- **Actor:** [who sees this]
- **Entry points:** [how user arrives]
- **Exit points:** [where user goes]
- **Key components needed:** [realistic list — nav, form, CTA, data table, etc.]
- **Interaction requirements:** [what user can do]
- **States to include:** default, loading, empty, error, success
- **DNA emphasis:** [how this screen should feel distinctive]
- **Realistic content requirements:** [what actual labels, data, copy to use — no placeholders]

### Screen 2: [...]
[repeat for each screen]

## Transitions Between Screens

[from SCREEN-INVENTORY.md + TRANSITION-MAP.md — document triggers, conditions, branch logic]

## Quality Guardrails (embed these in every screen)

- Respect the imported UI Profile exactly — no drift in density/motion/contrast
- Use realistic content — no "Lorem ipsum", no "Get Started", no "Trusted by..."
- Every screen must feel like it belongs to THIS product, not generic SaaS
- Dark mode support via prefers-color-scheme where relevant
- WCAG 2.2 AA contrast minimums (4.5:1 body, 3:1 large/UI)
- Touch targets ≥ 44px on mobile
- Anti-slop: no radial glows, frosted glass, gradient text on H1 as lazy polish
- Anti-slop: no centered-hero + proof-strip + features + pricing + testimonials default

## Expected Export

When you are satisfied with this flow's visuals, click "Send to Claude Code" in Claude Design. The bundle will contain:
- Component specifications + design tokens
- Copy + realistic content
- Interaction notes
- Per-screen HTML snapshots

I will import the bundle into `docs/prds/flows/[NN]-[flow-slug]/claude-design/` and generate the scaffolding PRD referencing it.
```

**Generation rules:**
- One prompt file per flow in Step 4
- Each prompt file is self-contained (Claude Design should not need to look elsewhere)
- Paste the full UI Profile and anti-slop guardrails — do not just reference them
- List screens in dependency order (entry screen first, downstream screens after)

#### C-A.2 — Human Iterates in Claude Design (HARD PAUSE)

After all Claude Design prompts are generated, halt and instruct the user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRACK A — HUMAN IN THE LOOP REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[N] Claude Design prompts generated at:
  docs/prds/flows/*/CLAUDE-DESIGN-PROMPT.md

YOUR TURN (cannot be automated — Claude Design has no MCP/CLI):

1. Open Claude Design in your browser (Pro/Max/Team/Enterprise required)
2. For each flow, create a new project and drag the flow's CLAUDE-DESIGN-PROMPT.md in
3. Iterate visually — use inline comments, adjustment knobs, stakeholder review
4. When approved, click "Send to Claude Code" → export bundle
5. Save each exported bundle to:
     docs/prds/flows/[NN]-[flow-slug]/claude-design/
   (unzip if compressed; directory should contain HTML/components/tokens/notes)
6. Commit the bundles to git

When all flows have bundles committed, reply to me with: "bundles ready"

I will then resume and generate the scaffolding PRDs that reference your approved visuals.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Use AskUserQuestion to poll: "Track A pause — have all Claude Design bundles been exported and committed?"
Options: [Yes, bundles are committed — resume with PRD generation, Not yet — keep waiting, Abandon Track A — switch to Track B for remaining flows]

Do not proceed until all flows under `docs/prds/flows/*/claude-design/` contain bundle content.

#### C-A.3 — Import Bundles + Generate Scaffolding PRDs

For each flow, verify the bundle exists, then generate the scaffolding PRD:

**Path:** `docs/prds/flows/[NN]-[flow-slug]/FLOW-[ID].md`

**PRD sections (Track A version):**

**1. Flow Metadata**
- Flow name, ID, category, actor, platform
- Screen count, priority, complexity
- **Track:** A
- **Claude Design bundle:** `docs/prds/flows/[NN]-[flow-slug]/claude-design/`

**2. UI Profile Compliance + Bundle Reconciliation**
- Imported profile ID and archetype
- **Bundle alignment check:** list any drift between Step 3's UI Profile and the Claude Design export (fonts swapped, colors shifted, spacing deviated). Flag drift for Step 6 to resolve.
- Anti-slop guardrails applied
- Where DNA emphasis is strongest in this flow

**3. Screen Sections (embedded — one per screen)**

For each screen:
- Screen ID, purpose, route
- **Visual source:** `docs/prds/flows/[NN]-[flow-slug]/claude-design/[bundle-subpath]` (point to the specific file in the bundle)
- Key components (inherit from bundle spec)
- Interaction notes (inherit from bundle notes + any Sigma-specific additions)
- Important states (prototype-level)
- Realistic content (inherit from bundle copy)

**4. Interaction Notes**
- Cross-reference bundle interaction notes
- Sigma-specific additions: navigation within flow, platform differences, error recovery

**5. Prototype Data Register** (Sigma-owned — Claude Design has no concept of this)

| Data Element | Display Mode | Demo Behavior | What Step 11 Must Replace |
|-------------|-------------|---------------|--------------------------|
| [element] | mock / seeded-demo / real | [description] | [production requirement] |

**6. Backend Preview** (Sigma-owned — prototype-scoped, NOT production spec)
- Entities touched
- Read/write intent
- Auth assumptions
- Integrations touched
- Security-sensitive actions flagged

**7. Prototype Acceptance Criteria**
- Specific, testable criteria for this flow
- Must include: "scaffolded UI matches the approved Claude Design bundle within UI Profile tolerances"

**8. Scaffolding Handoff (for Step 11)**
- Tech stack target (from `stack-profile.json`)
- Components to scaffold (inherit from bundle)
- Routes to create
- What Step 11 must harden (mocks → real, auth, data, etc.)

#### Per-flow checkpoint (Track A)

After each Track A flow PRD, present for review:

<HARD-GATE>
Use AskUserQuestion: "Flow [name] PRD generated from Claude Design bundle. Review?"
Options: [Approve — continue to next flow, Revise PRD — adjust Sigma-owned sections, Re-iterate in Claude Design — bundle needs more work]
</HARD-GATE>

---

### Phase C-B — Track B: Direct Scaffolding

Track B preserves the existing single-pass wireframe + PRD generation behavior.

#### Wireframe Generation Strategy

##### Primary: Direct HTML Screen Generation

Track B generates full HTML/CSS wireframe screens for every flow. Each screen is a self-contained HTML file that opens in a browser.

**Reference capture (optional):** If the user has reference sites or screenshots they want to match:
1. Invoke `/clone` — extracts design DNA (colors, typography, spacing, layout patterns) from the reference
2. Clone output feeds directly into the HTML generation as design constraints

**HTML generation rules:**
- One HTML file per screen: `docs/prds/flows/[NN]-[flow-slug]/screens/[screen-id].html`
- Self-contained (inline CSS, no external dependencies)
- Responsive (mobile-first, works at 375px and 1440px)
- Realistic content (no "Lorem ipsum" — use contextual placeholder text)
- All states represented (default, loading, empty, error, success)
- Dark mode support via `prefers-color-scheme` media query
- Interactive elements work (hover states, focus rings, transitions)
- Every screen matches the UI Profile from Step 3

**Generation process per screen:**
1. Read the screen specification from the flow PRD
2. If `/clone` output exists, apply extracted design DNA
3. Generate complete HTML with inline CSS
4. Include state variations as toggleable sections or separate files
5. Verify: open in browser, check all breakpoints

**Quality bar:**
- The HTML must look production-quality, not wireframe-gray
- Use the design system colors/typography from Step 3's UI Profile
- Include micro-interactions (hover, focus, active states)
- No generic AI aesthetics — every screen must feel intentional

**Why direct HTML:** The design IS the code. Output is HTML/CSS that downstream agents (Step 6, 8, 11) can read, modify, and implement directly. No external SDK, no API keys, no conversion step.

##### shadcn Blocks as Wireframe Seeds (when shadcn/ui is in the stack)

Check `stack-profile.json` for `"componentLibrary": "shadcn/ui"` and `runtime-baseline.json` for `shadcn_mcp: true`. If available:

1. Before generating each screen from scratch, check if a shadcn block matches the screen family:
   - Login/signup screens → `login-01` through `login-05`, `signup-01` through `signup-05`
   - Dashboard screens → `dashboard-01`
   - Sidebar navigation → `sidebar-01` through `sidebar-16`
2. Use shadcn MCP `get_block` to pull the block source code
3. Apply the selected shadcn theme preset from Step 3's `ui-profile.json`
4. Customize the block to match the screen's specific purpose and DNA emphasis
5. Use as the starting point — don't ship the default block as-is

##### Text-Only Mode (when visual wireframes are not needed)

If the user opts for text-only wireframes, skip HTML generation and document screen specifications as structured text descriptions in the flow PRD.

##### Wireframe Quality Rules

Apply the **frontend aesthetics DNA** to every wireframe:

**Typography:** NEVER use Inter, Roboto, Arial as defaults. Use distinctive, characterful pairings from the UI Profile.

**Spatial Composition:** Asymmetry, overlap, grid-breaking are encouraged. Don't center everything in a max-width column.

**Color:** Dominant colors with sharp accents. Commit to the Design DNA's color story.

**Motion intent:** Document where motion matters (page transitions, state changes, micro-interactions) — don't implement motion in wireframes, but specify the intent.

**Anti-slop design rules:**
- Do NOT default to: centered hero + proof strip + features + pricing + testimonials + CTA
- Do NOT use radial glows, frosted glass cards, gradient text on H1 as default polish
- Do NOT use "Trusted by...", "Get Started", "Simple honest pricing" as placeholder copy
- Use realistic content — real labels, real messages, representative data
- Every screen must feel like it belongs to THIS product, not a generic SaaS template

#### For each flow, generate the scaffolding PRD:

**Path:** `docs/prds/flows/[NN]-[flow-slug]/FLOW-[ID].md`

**PRD sections (Track B version):**

**1. Flow Metadata**
- Flow name, ID, category, actor, platform
- Screen count, priority, complexity
- **Track:** B

**2. UI Profile Compliance**
- Imported profile ID and archetype
- Density / motion / contrast / emphasis posture
- Anti-slop guardrails applied
- Where DNA emphasis is strongest in this flow

**3. Screen Sections (embedded — one per screen)**

For each screen:
- Screen ID, purpose, route
- **Wireframe:** direct HTML at `docs/prds/flows/[NN]-[flow-slug]/screens/[screen-id].html` (or shadcn block reference, or text description)
- Key components and their behavior
- Interaction notes (what user can do, what feedback appears)
- Important states (empty, loading, error, success — prototype-level)
- DNA emphasis notes
- Realistic content (actual labels, messages, data — not placeholders)

**4. Interaction Notes**
- Navigation behavior within the flow
- Transition animations intent (document, don't implement)
- Input/confirmation patterns
- Error recovery expectations

**5. Prototype Data Register**

| Data Element | Display Mode | Demo Behavior | What Step 11 Must Replace |
|-------------|-------------|---------------|--------------------------|
| [element] | mock / seeded-demo / real | [description] | [production requirement] |

**6. Backend Preview** (prototype-scoped — NOT production spec)
- Entities touched
- Read/write intent
- Auth assumptions
- Integrations touched
- Security-sensitive actions flagged

**7. Prototype Acceptance Criteria**
- Specific, testable criteria for this flow
- What "done" looks like for the prototype (not production)

**8. Scaffolding Handoff (for Step 11)**
- Tech stack target (from `stack-profile.json`)
- Components to scaffold
- Routes to create
- What Step 11 must harden

#### Per-flow checkpoint (Track B)

After each flow PRD (or batch of 2-3 small flows), present for review:

<HARD-GATE>
Use AskUserQuestion: "Flow [name] PRD + wireframes complete. Review?"
Options: [Approve — continue to next flow, Revise wireframes — adjust design, Revise PRD — adjust behavior/interactions]
</HARD-GATE>

---

### SigmaHQ Progress Update (both tracks)

If `runtime-baseline.json` shows `sigmahq.configured: true`:
- Discover flow card IDs: `kanban-md list --dir {sigmahq.workspace} --tags flow-card --json`
- Match the current flow by title pattern `Flow: {flow-category-name}`
- After each flow PRD is approved, update the matching card:
  ```bash
  kanban-md move --dir {sigmahq.workspace} {flow-card-id} doing
  ```
- When all screens in a flow category are covered:
  ```bash
  kanban-md move --dir {sigmahq.workspace} {flow-card-id} done
  ```

If SigmaHQ is not configured, skip these updates — file-based flow PRD artifacts in `docs/prds/flows/` remain the sole status tracking mechanism.

---

## Phase D — Prototype Handoff & Summary

### Write `docs/prds/flows/PRD-SUMMARY.md`

Must include:
- **Track used:** A or B (if mixed, list per-flow)
- Flow list with status
- Coverage summary (screens covered / total)
- Prototype data assumptions summary
- Backend preview summary
- **Step 11 hardening requirements:** which prototype shortcuts must be removed, which seeded-demo behavior stays staging-only, which entities/actions Step 11 must formalize
- **Step 6 design implications:**
  - **If Track A was used:** Step 6 should seed design tokens from Claude Design bundles at `docs/prds/flows/*/claude-design/` rather than from scratch. Document which tokens to extract (colors, typography, spacing, component styles).
  - **If Track B was used:** Step 6 should extract tokens from the generated HTML wireframes.

### SigmaHQ Board Summary (when configured)

If `runtime-baseline.json` shows `sigmahq.configured: true`:
- Discover all flow cards: `kanban-md list --dir {sigmahq.workspace} --tags flow-card --json`
- Verify all flow cards are marked `done`; list any still in `doing` or `todo`
- Create a summary card for the prototype milestone:
  ```bash
  kanban-md create --dir {sigmahq.workspace} \
    --title "Step 5: Prototype PRDs Complete (Track {A|B})" \
    --body "Flows covered: {count}\nScreens covered: {count}\nGap: 0\nTrack: {A|B}" \
    --status done \
    --priority high \
    --tags milestone,step-5 \
    --json
  ```

### Downstream Handoff

Step 5 produces artifacts consumed by later steps:

| Artifact | Consumed By |
|----------|-------------|
| `docs/prds/flows/*/FLOW-*.md` | Step 11 (production PRD hardening), Step 8 (technical spec alignment) |
| `docs/prds/flows/*/claude-design/` (Track A) | Step 6 (token seeding), Step 11 (visual spec source of truth) |
| `docs/prds/flows/*/screens/*.html` (Track B) | Step 6 (token extraction), Step 11 (visual spec source of truth) |
| `docs/prds/flows/PRD-SUMMARY.md` | Step 10 (feature breakdown input), Step 11 (hardening requirements) |
| `docs/prds/flows/WIREFRAME-TRACKER.md` | Step 6 (design token extraction targets) |
| `docs/prds/flows/ZERO-OMISSION-CERTIFICATE.md` | Step 10, Step 11 (coverage verification) |

<HARD-GATE>
Do NOT proceed to Phase E until user approves summary.
Use AskUserQuestion: "Prototype summary complete. Approve?"
Options: [Approve — verify zero omissions, Revise summary, Generate more flows]
</HARD-GATE>

---

## Phase E — Zero Omission Verification & Hardening

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Screens from Step 4 without prototype coverage
- Weak interaction notes or missing states
- Prototype data register gaps
- Backend preview overreach (production spec in Step 5)
- Anti-slop design violations in wireframes
- **Track A specific:** bundles missing, bundle alignment drift from UI Profile unresolved
- **Track B specific:** HTML screens missing, anti-slop violations in generated HTML

Fix findings before presenting.

### Write `docs/prds/flows/ZERO-OMISSION-CERTIFICATE.md`

Step 4 total screens - Step 5 covered screens = gap
- If gap > 0 → Step 5 fails
- If any Step 4 screen lacks a prototype owner → Step 5 fails
- **Track A:** every flow must have a bundle in `claude-design/` AND a scaffolding PRD
- **Track B:** every flow must have HTML screens in `screens/` AND a scaffolding PRD

### Writing Standards (embedded)

- No stock AI phrases in PRDs: "Intuitive", "Seamless", "User-friendly", "Clean and modern"
- Screen purposes are concrete actions, not vague feelings
- Interaction notes specify WHAT happens, not that it "should feel good"
- Realistic content in every wireframe — no "Lorem ipsum"
- Write like a product designer handing specs to an engineer

### Success Criteria

- [ ] Track selected and documented in every PRD + summary
- [ ] Per-flow prototype PRDs exist for all flows
- [ ] Step 4 screens reconcile to zero gap
- [ ] Track A: Claude Design bundles present for every flow, alignment drift resolved
- [ ] Track B: HTML wireframes present for every flow, follow Design DNA + anti-slop rules
- [ ] Prototype data register present where needed
- [ ] Backend preview stays prototype-scoped
- [ ] Realistic content used throughout
- [ ] Step 11 hardening expectations explicit
- [ ] Step 6 token-seeding path documented (bundle or HTML)
- [ ] $holes pass completed
- [ ] User approved

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 6 without explicit approval.
Use AskUserQuestion: "Step 5 complete. Ready for Step 6 — Design System?"
Options: [Proceed to Step 6, Revise wireframes, Generate additional flows]
</HARD-GATE>

---

<verification>
## Step 5 Verification Schema

### Required Outputs (40 points)

| Item | Path | Points |
|------|------|--------|
| Flow PRD Directory | docs/prds/flows/ | 8 |
| At least one Flow PRD | docs/prds/flows/*/FLOW-*.md | 10 |
| Wireframe Tracker (with Track column) | docs/prds/flows/WIREFRAME-TRACKER.md | 8 |
| PRD Summary (with Track metadata) | docs/prds/flows/PRD-SUMMARY.md | 8 |
| Zero Omission Certificate | docs/prds/flows/ZERO-OMISSION-CERTIFICATE.md | 6 |

### Track-Specific Artifacts (10 points)

| Track | Item | Path | Points |
|-------|------|------|--------|
| A | Claude Design prompts | docs/prds/flows/*/CLAUDE-DESIGN-PROMPT.md | 5 |
| A | Imported bundles | docs/prds/flows/*/claude-design/ | 5 |
| B | HTML wireframe screens | docs/prds/flows/*/screens/*.html | 5 |
| B | Wireframe quality (anti-slop check) | — | 5 |

(Score either row A or row B based on selected track — total 10 points per track.)

### Required Sections in Flow PRDs (25 points)

| Section | Points |
|---------|--------|
| Flow Metadata with Track field | 3 |
| UI Profile Compliance + DNA emphasis | 4 |
| Screen Sections with visual source | 4 |
| Interaction Notes (behavior, not just layout) | 4 |
| Prototype Data Register | 4 |
| Backend Preview (prototype-scoped) | 3 |
| Prototype Acceptance Criteria | 3 |

### Quality Indicators (15 points)

| Check | Points |
|-------|--------|
| Step 4 coverage reconciles to zero gap | 5 |
| Wireframes/bundles follow Design DNA + anti-slop rules | 4 |
| Realistic content used (no placeholder text) | 3 |
| Backend preview stays prototype-scoped (no production spec) | 3 |

### Boundary Integrity (10 points)

| Check | Points |
|-------|--------|
| No production backend spec in Step 5 | 3 |
| No design token system created (Step 6 owns that) | 3 |
| $holes pass completed | 3 |
| SigmaHQ flow cards updated (when configured) | 1 |

**Passing score:** 95/100
</verification>

$END$
