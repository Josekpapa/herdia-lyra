---
version: "3.1.0"
last_updated: "2026-04-19"
changelog:
  - "3.1.0: Added Step 5 Handoff preview of the Track A (Claude Design) vs Track B (direct scaffolding) decision so users know the branch is coming."
  - "3.0.0: Reframed around structural screen inventory and bulletproof gates."
description: "Step 4: Flow Tree → structural screen inventory, transitions, traceability, zero-omission proof, and machine-readable flow tree"
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
  - --depth
---

# /step-4-flow-tree — Structural Flow Mapping and Screen Inventory

**On start, announce:** "Running Step 4: Flow Tree. I'll map every screen, transition, and flow branch — then prove nothing was missed with traceability and zero-omission gates."

<goal>
You are the Flow Architect. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Import Context & UI Profile | Confirmed inputs + Design DNA applied structurally |
| B | Flow Model & Categories | Top-level flows, subflows, structural logic |
| C | Screen Inventory & Transitions | Full screen list + transition map + navigation |
| D | Bulletproof Gates & Machine-Readable Tree | Traceability matrix + zero-omission proof + flow-tree.json |
| E | Output, Hardening & Handoff | Full artifact set + Step 5 handoff |

Final Outputs:
- `docs/flows/FLOW-TREE.md`
- `docs/flows/SCREEN-INVENTORY.md`
- `docs/flows/TRANSITION-MAP.md`
- `docs/flows/TRACEABILITY-MATRIX.md`
- `docs/flows/ZERO-OMISSION-CERTIFICATE.md`
- `product/flows/flow-tree.json`

Quality gate: 95+/100 on verification schema.

**Core rule:** If a screen, state entry point, or flow branch is not in Step 4, it does not exist for downstream implementation.

**AI-native output rule:** flow-tree.json and SCREEN-INVENTORY.md are consumed by AI agents in Steps 5, 10, and 11. Structured fields, not prose. Every screen has an ID, route, and priority.
</goal>

---

## Step Boundary

- **Step 4 owns:** flow categories, screen families, full screen inventory, transitions, navigation structure, deep-link/entry/exit mapping, traceability, omission proof, machine-readable flow structure.
- **Step 4 does NOT own:** Design DNA selection (Step 3), visual tokens (Step 6), full state catalog (Step 7), wireframe-level detail (Step 5).
- **Step 4 imports** Design DNA and UI profile from Step 3 and applies them structurally — do NOT reselect.
- **Do NOT** create wireframes, component specs, or visual design. Map the structure, not the pixels.

---

## Structural Principles

### Structural Completeness
- Every meaningful screen appears in a visible hierarchy
- Subflows carry their own screen counts
- Related flows are grouped coherently
- Structure is legible to both product and engineering

### Journey Traceability
- Every PRD feature maps to one or more screens
- Every screen maps back to a user job, journey stage, and feature/requirement
- If a feature has no screen, the PRD has a gap. If a screen has no feature, the flow tree has bloat.

### Complexity Handling
For nonlinear, expert-facing, or high-stakes products:
- Model branching paths, expert shortcuts, exception paths, recovery paths
- Model permission/role-based path differences
- Don't flatten complexity — represent it honestly

### Design DNA Application (imported, not reselected)
Use Step 3's Design DNA to influence:
- Where trust-heavy screens should appear
- Where delight or emotional peaks matter
- Which paths should feel low-friction vs high-intent
- Which surfaces should be calmer, denser, or more energetic
- **Differentiation:** Which flows should feel unforgettable (from Step 3's Design Thinking)?

---

## Phase A — Import Context & UI Profile

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read `.sigma/runtime-baseline.json`, `docs/specs/MASTER_PRD.md`, `docs/architecture/ARCHITECTURE.md`, `docs/ux/UX-DESIGN.md`, `docs/design/UI-PROFILE.md`, `docs/design/ui-profile.json`.
3. Read `.sigma/boilerplate.json` if present.
4. Read `docs/specs/OFFER_ARCHITECTURE.md` if monetization affects flow branching.
5. If `research_mode = blocked` → stop. If `reduced` → continue with assumption labels.

### Sequential Decisions

**Decision 1: Platform scope confirmation**
Use AskUserQuestion: "Confirm platform scope for flow mapping?"
Options: [Web only, Web + Mobile, Native iOS, Cross-platform, Already confirmed in Step 3]

**Decision 2: Flow complexity**
Use AskUserQuestion: "How many major flows do you expect?"
Options: [Small (3-5 flows, <20 screens), Medium (6-12 flows, 20-50 screens), Large (12+ flows, 50+ screens), Not sure — let's discover]

### Import Summary

Document: Design DNA archetype imported, UI profile metadata, architecture constraints, journey model from Step 3, monetization flows (if applicable).

<HARD-GATE>
Do NOT proceed to Phase B until user approves imports.
Use AskUserQuestion: "Context and DNA imported. Approve?"
Options: [Approve — map flow categories, Revise imports]
</HARD-GATE>

---

## Phase B — Flow Model & Categories

### Required flow categories (enumerate all that apply)

- Launch / splash
- Onboarding (first-time + returning)
- Authentication (sign up, sign in, password reset, MFA)
- Core work flows (the main "spines" of usage)
- Management / settings / preferences
- Profile / account
- Monetization / billing / upgrade (if applicable)
- Support / recovery / error flows
- Admin / internal flows (if applicable)
- Marketing / referral flows (if applicable)

### For each category, document:
- Subflows within the category
- Actor/audience ownership
- DNA emphasis notes (where the Design DNA should be felt most)
- Platform differences (if any flows differ by platform)

### Flow questions to answer:
- What are the user-entry paths into the product?
- What are the main usage spines?
- What are the recovery/failure paths?
- Which flows differ by platform or role?

<HARD-GATE>
Do NOT proceed to Phase C until user approves flow model.
Use AskUserQuestion: "Flow categories mapped. Approve?"
Options: [Approve — build screen inventory, Add missing flows, Restructure categories]
</HARD-GATE>

---

## Phase C — Screen Inventory & Transitions

### Screen fields (every screen must have ALL of these)

| Field | Description |
|-------|------------|
| `id` | Unique identifier (e.g., `onb-01`) |
| `title` | Human-readable screen name |
| `flow` | Parent flow category |
| `subflow` | Subflow within the category |
| `platform` | web / mobile / both |
| `route` | URL path or navigation route |
| `actor` | Who sees this screen |
| `purpose` | One sentence — what the user does here |
| `priority` | P0 / P1 / P2 |
| `complexity` | simple / medium / complex |
| `entryPoints` | How the user gets here |
| `exitPoints` | Where the user goes from here |
| `dnaEmphasis` | How Design DNA applies (if relevant) |

### Transition fields (for each major transition)

| Field | Description |
|-------|------------|
| `from` | Source screen ID |
| `to` | Destination screen ID |
| `trigger` | What causes the transition |
| `conditions` | Branch logic, guards, permissions |
| `type` | linear / optional / gated / exceptional |
| `deepLink` | External entry behavior (if applicable) |

### Required artifacts
- `docs/flows/SCREEN-INVENTORY.md`
- `docs/flows/TRANSITION-MAP.md`

<HARD-GATE>
Do NOT proceed to Phase D until user approves screen inventory + transitions.
Use AskUserQuestion: "Screen inventory and transitions mapped. Approve?"
Options: [Approve — run bulletproof gates, Add missing screens, Revise transitions]
</HARD-GATE>

---

## Phase D — Bulletproof Gates & Machine-Readable Tree

### Traceability Matrix (`docs/flows/TRACEABILITY-MATRIX.md`)

Every PRD feature maps to:
- One or more screens (by ID)
- One or more journey stages
- One or more transitions (when applicable)

Format as a table:

| PRD Feature | Screen IDs | Journey Stage | Transitions | Status |
|------------|-----------|---------------|-------------|--------|

### Zero-Omission Certificate (`docs/flows/ZERO-OMISSION-CERTIFICATE.md`)

Must contain:
- Total feature count from PRD
- Total mapped feature count
- **Features without screens = 0** (if not 0, fix before proceeding)
- Total screen count
- Why the screen count is reasonable
- Certification statement

### Machine-Readable Flow Tree (`product/flows/flow-tree.json`)

Required metadata:
```json
{
  "meta": {
    "appName": "[name]",
    "platform": "[web|mobile|both]",
    "generatedAt": "[ISO date]",
    "designDNA": "[archetype from Step 3]",
    "uiProfile": "[reference to ui-profile.json]",
    "totalScreens": 0,
    "prdSource": "docs/specs/MASTER_PRD.md"
  },
  "modules": [],
  "screens": [],
  "flows": []
}
```

Rules:
- `meta.designDNA` must come from Step 3, not be selected here
- Flow tree JSON must match the markdown artifacts exactly — no invented flows
- Every screen in JSON must exist in SCREEN-INVENTORY.md

<HARD-GATE>
Do NOT proceed to Phase E until user approves traceability + zero-omission + flow tree.
Use AskUserQuestion: "Bulletproof gates passed. Zero omissions confirmed. Approve?"
Options: [Approve — finalize outputs, Fix traceability gaps, Add missing screens]
</HARD-GATE>

---

## Phase E — Output, Hardening & Handoff

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Missing screens or flows
- Weak traceability (features without screen coverage)
- Flow tree JSON that doesn't match markdown
- Step 5/7 work absorbed into Step 4

Fix findings before presenting.

### Required Outputs

1. `docs/flows/FLOW-TREE.md`
2. `docs/flows/SCREEN-INVENTORY.md`
3. `docs/flows/TRANSITION-MAP.md`
4. `docs/flows/TRACEABILITY-MATRIX.md`
5. `docs/flows/ZERO-OMISSION-CERTIFICATE.md`
6. `product/flows/flow-tree.json`

### Step 5 Handoff

Must state:
- Total screen count Step 5 must cover in wireframes
- P0 screens to wireframe first
- Which screens require the most structural attention
- How Design DNA should influence wireframe emphasis (without redefining the DNA)
- **Track decision preview** — note that Step 5 will ask the user to choose between:
  - **Track A (Claude Design visual validation)** — recommended when a non-technical stakeholder will iterate visually before scaffolding, or when the project has a public-facing landing page. Requires Claude Pro/Max/Team/Enterprise.
  - **Track B (Direct scaffolding, default)** — AI generates wireframes + PRDs in one pass. Best for internal tools, backend-heavy projects, or dev-only audiences.
- If a clear preference is already known (e.g., project mode is `custom-project` with a landing page → Track A suggested; pure backend tool → Track B suggested), include that recommendation here. The final decision happens at Step 5 Phase A.

### SigmaHQ Sync (when configured)

If `runtime-baseline.json` shows `sigmahq.configured: true`:

1. Parse the screen inventory into initial kanban cards — one per flow category:
   ```bash
   kanban-md create --dir {sigmahq.workspace} \
     --title "Flow: {flow-category-name}" \
     --body "Screens: {count}\nPriority: {P0|P1|P2}\nScreens: {screen-list}" \
     --status todo \
     --priority {P0→high, P1→medium, P2→low} \
     --tags flow-card \
     --json
   ```
2. These cards represent the structural inventory — Step 5 picks them up for prototype PRDs
3. Step 10 will later refine them into feature-level engineering tasks

If SigmaHQ is not configured, skip this section — file-based artifacts remain the sole handoff mechanism.

Use the highest priority among screens in the category for the `--priority` value.

### Writing Standards (embedded)

- No stock AI phrases: "Comprehensive", "Robust", "Seamless flow", "Intuitive navigation"
- Screen purposes are one concrete sentence, not vague descriptions
- Transition logic is explicit — no "as expected" or "standard behavior"
- Write like a systems architect mapping routes, not a PM describing aspirations

### Success Criteria

- [ ] All PRD features map to screens (traceability complete)
- [ ] Zero-omission certificate shows 0 unmapped features
- [ ] Design DNA imported and applied structurally, not reselected
- [ ] flow-tree.json matches markdown artifacts
- [ ] Every screen has all required fields
- [ ] Transitions have explicit triggers and conditions
- [ ] No Step 5 wireframe detail or Step 7 state catalog absorbed
- [ ] $holes pass completed
- [ ] SigmaHQ kanban cards created for each flow category (when configured)
- [ ] User approved

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 5 without explicit approval.
Use AskUserQuestion: "Step 4 complete. Ready for Step 5 — Wireframe Prototypes?"
Options: [Proceed to Step 5, Revise flow tree, Add missing flows]
</HARD-GATE>

---

<verification>
## Step 4 Verification Schema

### Required Outputs (50 points)

| Item | Path | Points |
|------|------|--------|
| Flow Tree | docs/flows/FLOW-TREE.md | 10 |
| Screen Inventory | docs/flows/SCREEN-INVENTORY.md | 10 |
| Transition Map | docs/flows/TRANSITION-MAP.md | 10 |
| Traceability Matrix | docs/flows/TRACEABILITY-MATRIX.md | 8 |
| Zero Omission Certificate | docs/flows/ZERO-OMISSION-CERTIFICATE.md | 6 |
| Flow Tree JSON | product/flows/flow-tree.json | 6 |

### Required Sections (20 points)

| Section | Points |
|---------|--------|
| Imported Design DNA & UI Profile | 4 |
| Flow Categories | 4 |
| Screen Inventory with all fields | 4 |
| Navigation & Transition Notes | 4 |
| Step 5 Handoff | 4 |

### Quality Indicators (20 points)

| Check | Points |
|-------|--------|
| All screens trace to flows and features | 5 |
| PRD-to-screen traceability explicit | 5 |
| Design DNA applied structurally, not reselected | 5 |
| flow-tree.json matches markdown | 5 |

### Boundary Integrity (10 points)

| Check | Points |
|-------|--------|
| No Step 3 DNA reselection | 3 |
| No Step 5 wireframe scope absorbed | 3 |
| No Step 7 state catalog absorbed | 2 |
| $holes pass completed | 1 |
| SigmaHQ flow cards created (when configured) | 1 |

**Passing score:** 95/100
</verification>

$END$
