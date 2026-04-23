---
version: "2.1.0"
last_updated: "2026-04-19"
changelog:
  - "2.1.0: Added Claude Design bundle token-seeding path when Step 5 Track A was used. Bundles at docs/prds/flows/*/claude-design/ are the starting seed for primitives + component tokens rather than starting from scratch."
  - "2.0.0: Reframed around three-layer token architecture, themes, and cross-platform export."
description: "Step 6: Design System → DESIGN-SYSTEM.md + design-tokens.json — convert Design DNA into reusable token system, component styling, theming, and cross-platform export"
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
  - --theme
  - --density
  - --platforms
---

# /step-6-design-system — Design System & Token Architecture

**On start, announce:** "Running Step 6: Design System. I'll turn the Design DNA from Step 3 and prototype patterns from Step 5 into a reusable token system, component styling logic, and cross-platform export strategy."

<goal>
You are the Design Systems Architect. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Import Context & Pattern Audit | Repeated patterns + system scope |
| B | System Principles, Token Architecture & Themes | Principles + token layers + theme model |
| C | Foundations & Component Styling | Color, type, spacing, shape, icons + component families |
| D | Motion, Accessibility & Platform Export | Motion tokens, a11y rules, export strategy |
| E | Output, Hardening & Handoff | DESIGN-SYSTEM.md + design-tokens.json |

Required Outputs:
- `docs/design/DESIGN-SYSTEM.md`
- `docs/tokens/design-tokens.json`

Optional (when justified): `docs/tokens/css-variables.css`, `docs/tokens/react-native-tokens.ts`, `docs/tokens/swiftui-tokens.swift`, `docs/components/COMPONENT-LIBRARY.md`, `docs/design/MOTION.md`

Conditional: When `stack-profile.json` includes `"componentLibrary": "shadcn/ui"`, also output a **shadcn preset code** using `registry:base` format. This distributes the entire design system (colors, themes, icons, fonts, radius) as one portable payload that can be applied via `shadcn init --preset [code]`.

Quality gate: 95+/100 on verification schema.

**AI-native output rule:** design-tokens.json is consumed by AI agents in Steps 7, 8, and 11. It must be machine-readable, role-based, and standards-aligned (W3C DTCG format).
</goal>

---

## Trigger

**Run after Step 5 (Wireframe Prototypes) is approved.** Step 6 requires Step 5 flow PRDs to audit repeated patterns. If Step 5 outputs are missing, stop and inform the user.

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
  --title "Step 6: Design System" \
  --body "Token architecture, foundations, component styling, export strategy" \
  --status doing --priority high --tag "step-6,design-system" \
  --json
```

**Phase transitions (if SIGMAHQ_ENABLED):**
- After Phase C approval (foundations defined):
  ```bash
  kanban-md create --dir "$WORKSPACE" \
    --title "Step 6: Design tokens defined" \
    --body "Color, typography, spacing, shape, motion tokens ready in design-tokens.json" \
    --status done --priority high --tag "step-6,tokens"
  ```
- After Phase D approval (motion + a11y + export):
  ```bash
  kanban-md create --dir "$WORKSPACE" \
    --title "Step 6: Component styling logic" \
    --body "Component families styled, motion system defined, a11y foundations set" \
    --status done --priority medium --tag "step-6,components"
  ```

**On step completion (if SIGMAHQ_ENABLED):**
```bash
TASK_ID=$(kanban-md list --dir "$WORKSPACE" --status doing --tag "step-6" --json | jq -r '.[0].id')
kanban-md move --dir "$WORKSPACE" "$TASK_ID" done
```

If SigmaHQ is not configured, skip all kanban-md commands — file-based artifacts remain the sole handoff mechanism.

---

## Step Boundary

- **Step 6 owns:** token architecture, themes, foundations (color, type, spacing, shape, elevation, icons), component styling logic, motion principles/tokens, accessibility foundations, cross-platform export intent.
- **Step 6 does NOT own:** Design DNA selection (Step 3), screen inventory (Step 4), full state catalog (Step 7), implementation patterns (Step 8).
- **Do NOT** create full component APIs, Storybook configs, or build tooling. Define the SYSTEM, not the implementation.

Step relationship: Step 3 chooses personality → Step 5 proves it in prototypes → **Step 6 turns repeated decisions into a reusable system** → Step 7 expands states → Step 8 implements.

---

## Design System Principles

### Dieter Rams — Less, But Better
- Token families exist for a reason — no bloat
- Components solve real UI problems, not style vanity
- Naming is understandable — role-based, not color-name-based
- The system ages well

### Token Architecture (three layers)
- **Primitives** — raw scales: color values (OKLCH), spacing increments, radius, elevation, type families, motion durations
- **Semantic tokens** — role-based: `text.primary`, `surface.raised`, `action.primary`, `feedback.success`
- **Component tokens** — component-level: `button.padding`, `card.shadow`, `input.border`

Rule: name tokens by ROLE, not raw value. `action.primary` not `blue-500`.

### Theme Model
Themes are collections of token values, not just light/dark toggle:
- Light / Dark (required for most products)
- High contrast (when accessibility profile demands it)
- Reduced motion (real system mode, not a margin note)
- Density mode: compact/cozy (only when product needs it)

### Cross-Platform Truth
- `design-tokens.json` is the source of truth
- CSS variables are one export
- React Native tokens are another export
- SwiftUI tokens are another export
- Do NOT let the CSS layer become the source of truth

---

## Phase A — Import Context & Pattern Audit

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read `.sigma/runtime-baseline.json`, `docs/ux/UX-DESIGN.md`, `docs/design/UI-PROFILE.md`, `docs/design/ui-profile.json`.
3. Read Step 5 flow PRDs: `docs/prds/flows/*/FLOW-*.md`, `docs/prds/flows/PRD-SUMMARY.md`.
4. **Detect Step 5 track used:** parse `PRD-SUMMARY.md` for track metadata, or inspect the filesystem:
   - If `docs/prds/flows/*/claude-design/` contains bundle content → **Track A was used** → load bundles for token seeding
   - If `docs/prds/flows/*/screens/*.html` contains HTML wireframes → **Track B was used** → extract patterns from HTML for token seeding
5. Read `.sigma/boilerplate.json` and `docs/stack-profile.json` if present.
6. If `research_mode = blocked` → stop. If `reduced` → label assumptions.

### Pattern Audit

Scan all Step 5 flow PRDs and identify repeated patterns:
- Button families (primary, secondary, ghost, destructive)
- Card families (content, action, stats, media)
- Form patterns (inputs, selects, toggles, validation)
- List/table patterns (data tables, list items, grids)
- Navigation structures (sidebar, tabs, breadcrumbs, command palette)
- Overlays (modals, drawers, sheets, popovers)
- Feedback (toasts, banners, alerts, empty/loading/error states)

Note where prototype screens are inconsistent — these need system normalization.

### Claude Design Bundle Ingestion (when Track A was used)

If the Preflight detected `docs/prds/flows/*/claude-design/` bundles, **ingest them as the primary seed** for the token system. Do not start from scratch — Claude Design already produced a coherent visual system the stakeholder approved, and starting over wastes their iteration work.

For each flow bundle:
1. Read the bundle contents (components, design tokens, copy, interaction notes — exact structure depends on Anthropic's export format)
2. Extract token values:
   - **Colors** → primary/accent/surface/text values (convert to OKLCH if in hex/rgb)
   - **Typography** → font families, size scale, weights actually used
   - **Spacing** → padding/gap/margin values that appear repeatedly across the bundle
   - **Radius** → corner radii actually applied to cards, buttons, inputs
   - **Elevation** → shadow patterns in the bundle
   - **Component styling** → button/input/card styling actually rendered
3. Reconcile across bundles:
   - If two bundles used slightly different values for the same role (e.g., `surface.raised` rendered at two different shades), choose one canonical value and document the deviation
   - Cross-check against Step 3's UI Profile — if bundles drifted from the profile, document the drift and decide whether to honor the bundle (stakeholder approved it) or snap back to the profile
4. Tag each extracted token with `"source": "claude-design-bundle"` in `design-tokens.json` metadata so downstream agents can trace origin

**Rule:** Claude Design bundles are the approved visual direction. Step 6's job is to formalize them into a reusable system, not to override them. Only override when bundles contradict accessibility requirements (contrast failures) or the published UI Profile's guardrails.

### HTML Wireframe Ingestion (when Track B was used)

If Track B was used, scan `docs/prds/flows/*/screens/*.html` for repeated inline styles and extract patterns. Same three-layer extraction (primitives → semantic → component), same OKLCH conversion, same role-based naming.

### Sequential Decisions

**Decision 1: Theme scope**
Use AskUserQuestion: "What themes does this system need?"
Options: [Light + Dark, Light only, Dark only, Light + Dark + High Contrast, Custom — describe]

**Decision 2: Platform targets**
Use AskUserQuestion: "What platforms will consume these tokens?"
Options: [Web only (CSS variables + Tailwind), Web + React Native, Web + SwiftUI, All platforms, Already decided in stack-profile]

<HARD-GATE>
Do NOT proceed to Phase B until user approves pattern audit + scope.
Use AskUserQuestion: "Pattern audit complete, system scope defined. Approve?"
Options: [Approve — define principles and token architecture, Adjust scope, Audit more patterns]
</HARD-GATE>

---

## Phase B — System Principles, Token Architecture & Themes

### Research (directive queries)

1. Search `"design tokens [stack from stack-profile] 2026 best practices"` — current token patterns
2. Search `"OKLCH color system design tokens"` — modern color format
3. If Tailwind: Search `"Tailwind v4 @theme directive CSS variables tokens"` — integration approach
4. If shadcn: Search `"shadcn/ui v4 design tokens OKLCH data-slot"` — component patterns

### System Principles (answer these explicitly)

- What should always feel consistent?
- What should flex by platform?
- What tradeoffs are intentional?
- What does the system optimize for first: trust / density / speed / premium feel / accessibility / clarity?

### Token Architecture Definition

Define the three layers with naming conventions:

```
primitives/
  color/     → oklch values in scales (50-950)
  spacing/   → 4px base scale (0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64)
  radius/    → none, sm, md, lg, xl, full
  elevation/ → shadow scales
  typography/→ families, sizes, weights, line-heights
  motion/    → durations, easing curves

semantic/
  surface/   → background, raised, overlay, sunken
  text/      → primary, secondary, muted, inverse
  border/    → default, strong, muted
  action/    → primary, secondary, destructive, ghost
  feedback/  → success, warning, error, info

components/
  button/    → padding, gap, font-size per size variant
  input/     → padding, border, focus-ring
  card/      → padding, shadow, radius
```

### Theme Structure

Define token overrides per theme. Each theme maps semantic tokens to different primitive values.

<HARD-GATE>
Do NOT proceed to Phase C until user approves principles + token architecture.
Use AskUserQuestion: "Token architecture and principles defined. Approve?"
Options: [Approve — define foundations, Adjust token naming, Change theme model]
</HARD-GATE>

---

## Phase C — Foundations & Component Styling

### Color System
- Use OKLCH for perceptually uniform scales: `oklch(lightness chroma hue)`
- Define 11-step scales (50, 100, 200...950) per hue
- Map to semantic roles (surface, text, action, feedback)
- Dominant color + sharp accent > timid, evenly-distributed palette (Design DNA rule)
- All pairings must meet WCAG 2.2 AA contrast (4.5:1 body, 3:1 large/UI)

### Typography System
- Define heading, body, and mono families from UI Profile
- NEVER use Inter, Roboto, Arial as defaults (frontend aesthetics DNA)
- Use distinctive, characterful pairings that match the Design DNA
- Size scale that accounts for readability and dynamic type scaling
- Weight strategy (regular, medium, semibold, bold — define which contexts use which)

### Spacing & Layout System
- Coherent scale based on 4px increments
- Density mode support when product needs compact views
- Document spacing tokens for padding, gap, margin contexts

### Shape, Radius, Border & Elevation
- Radius tokens matched to Design DNA (sharp = 0-2px, rounded = 6-12px, pill = full)
- Elevation/shadow reinforces hierarchy without visual noise
- Border tokens (width, style, color) for separation contexts

### Iconography
- Consistent stroke/fill logic and optical weight
- Icon sizing aligned to typography scale
- Source library reference (Lucide, Phosphor, SF Symbols, etc.)

### Component Styling Logic

For each repeated family from Phase A pattern audit:

| Component | Variants | Sizes | Density | States (style only) | Platform Notes |
|-----------|----------|-------|---------|---------------------|----------------|
| Button | primary, secondary, ghost, destructive | sm, md, lg | compact/cozy | default, hover, active, disabled, loading | |
| Input | text, select, textarea | sm, md, lg | compact/cozy | default, focus, error, disabled | |
| Card | content, action, stats | — | — | default, hover, selected | |

Define for each: purpose, token references, hierarchy rules, what stays stable vs. adapts by platform.

Do NOT create full component API docs — define styling logic only. Step 7 handles states. Step 8 handles implementation.

<HARD-GATE>
Do NOT proceed to Phase D until user approves foundations + component styling.
Use AskUserQuestion: "Foundations and component styling defined. Approve?"
Options: [Approve — define motion and accessibility, Adjust color system, Revise components]
</HARD-GATE>

---

## Phase D — Motion, Accessibility & Platform Export

### Motion System
- Duration tokens: instant (0ms), fast (100ms), normal (200ms), slow (300ms), slower (500ms)
- Easing tokens: ease-in, ease-out, ease-in-out, spring, bounce
- Stagger tokens: base (50ms), fast (30ms), slow (100ms)
- Motion roles: feedback, transition, entrance, exit, emphasis
- **Reduced-motion is a real system mode** — `prefers-reduced-motion` must be respected
- Motion communicates, it does not decorate (Design DNA rule)

### Accessibility Foundations (system-level)
- Color contrast: 4.5:1 body text, 3:1 large text / UI components (WCAG 2.2 AA)
- Focus visibility: explicit focus-ring tokens (width, offset, color)
- Touch targets: 44px minimum (system-enforced, not per-component)
- Typography scaling: system must survive 200% text zoom
- Reduced-motion: all motion tokens have a reduced-motion fallback

### Platform Export Strategy

| Platform | Export Format | Token Source |
|----------|-------------|-------------|
| Web | CSS custom properties (via Tailwind v4 `@theme` or standalone) | design-tokens.json |
| React Native | TypeScript token module | design-tokens.json |
| SwiftUI | Swift constants or asset catalog | design-tokens.json |

Rule: JSON is the truth. Platform exports are derived artifacts.

<HARD-GATE>
Do NOT proceed to Phase E until user approves motion + a11y + export strategy.
Use AskUserQuestion: "Motion, accessibility, and platform export defined. Approve?"
Options: [Approve — assemble final outputs, Adjust motion tokens, Strengthen accessibility rules]
</HARD-GATE>

---

## Phase E — Output, Hardening & Handoff

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Token bloat (families that exist without a reason)
- Missing accessibility constraints
- Inconsistency between design-tokens.json and DESIGN-SYSTEM.md
- Step 7/8 work absorbed into Step 6
- Design DNA contradictions

Fix findings before presenting.

### Write `docs/design/DESIGN-SYSTEM.md`

Required sections:
```
System Principles
Token Architecture (three layers explained)
Theme Model
Color System
Typography System
Spacing & Layout System
Shape, Radius, Border & Elevation
Iconography
Component Styling Logic
Motion System
Accessibility Foundations
Platform Export Strategy
shadcn Preset (when shadcn/ui is in the stack — export design system as a shareable preset code)
Step 7 Handoff — what Step 7 must expand into full state catalog
Step 8 Handoff — what Step 8 must implement
Do NOT Build in This Step
```

### Write `docs/tokens/design-tokens.json`

```json
{
  "$schema": "https://www.designtokens.org/TR/drafts/format/",
  "meta": { "name": "[project]", "version": "1.0.0", "sourceStep": "6", "uiProfile": "[id]", "updated": "[date]" },
  "primitives": { "color": {}, "spacing": {}, "radius": {}, "elevation": {}, "typography": {}, "motion": {} },
  "semantic": { "surface": {}, "text": {}, "border": {}, "action": {}, "feedback": {} },
  "components": { "button": {}, "input": {}, "card": {} },
  "themes": { "light": {}, "dark": {}, "reduced-motion": {} }
}
```

### Writing Standards (embedded)

- No stock AI phrases: "Cohesive", "Harmonious", "Pixel-perfect", "Consistent across"
- Token names are decisions, not descriptions — `action.primary` not `the main action color`
- System principles are concrete rules, not aspirational statements
- Write like a systems engineer defining a contract, not a designer writing a mood board

### Success Criteria

- [ ] Step 3 DNA and UI Profile imported
- [ ] Step 5 prototype patterns imported and normalized
- [ ] design-tokens.json is machine-readable and role-based
- [ ] Themes are explicit (not just light/dark toggle)
- [ ] Motion supports reduced-motion mode
- [ ] Typography uses distinctive fonts (not Inter/Roboto/Arial)
- [ ] Color meets WCAG 2.2 AA contrast requirements
- [ ] Accessibility expressed as system rules
- [ ] Component styling is reusable, not screen-specific
- [ ] Platform export intent is clear
- [ ] Step 7 and Step 8 handoffs explicit
- [ ] $holes pass completed
- [ ] SigmaHQ kanban cards created (when configured)
- [ ] User approved

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 7 without explicit approval.
Use AskUserQuestion: "Step 6 complete. Ready for Step 7 — Interface States?"
Options: [Proceed to Step 7, Revise design system, Adjust token architecture]
</HARD-GATE>

---

<verification>
## Step 6 Verification Schema

### Required Outputs (30 points)

| Item | Path | Points |
|------|------|--------|
| Design System Document | docs/design/DESIGN-SYSTEM.md | 18 |
| Design Tokens JSON | docs/tokens/design-tokens.json | 12 |

### Required Sections in DESIGN-SYSTEM.md (35 points)

| Section | Points |
|---------|--------|
| System Principles | 4 |
| Token Architecture (three layers) | 5 |
| Theme Model | 4 |
| Color System (OKLCH, role-based, contrast-checked) | 5 |
| Typography System (distinctive fonts, scaling) | 4 |
| Spacing & Layout System | 3 |
| Component Styling Logic | 4 |
| Motion System (with reduced-motion) | 3 |
| Accessibility Foundations | 3 |

### Quality Indicators (25 points)

| Check | Points |
|-------|--------|
| Tokens are role-based, not raw value dumps | 5 |
| Themes are explicit and complete | 4 |
| Typography uses distinctive fonts (not Inter/Roboto) | 4 |
| Color meets WCAG 2.2 AA contrast | 4 |
| Motion respects prefers-reduced-motion | 3 |
| design-tokens.json matches DESIGN-SYSTEM.md | 3 |
| Platform export strategy is clear | 2 |

### Handoff & Boundary (10 points)

| Check | Points |
|-------|--------|
| Step 7 handoff explicit | 3 |
| Step 8 handoff explicit | 3 |
| No Step 7/8 scope absorbed | 2 |
| $holes pass completed | 2 |
| SigmaHQ kanban cards created (when configured) | 1 |

**Passing score:** 95/100
</verification>

$END$
