---
version: "3.2.0"
last_updated: "2026-04-19"
changelog:
  - "3.2.0: Added Claude Design compatibility guidance to the UI Profile section. UI-PROFILE.md and ui-profile.json are now explicitly shaped to be consumable by Claude Design's onboarding when Step 5 Track A is selected — no separate onboarding pack required."
  - "3.1.0: Added Design DNA ownership and archetype selection."
description: "Step 3: UX Design → UX-DESIGN.md + UI-PROFILE — experience goals, journeys, IA, interaction design, accessibility, Design DNA, and agentic UI patterns"
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
  - --ui-profile
---

# /step-3-ux-design — UX Strategy, Journeys, and Interaction Direction

**On start, announce:** "Running Step 3: UX Design. I'll walk you through 6 phases — importing context, defining experience goals, mapping journeys and IA, designing interactions and accessibility, selecting Design DNA, and producing UX-DESIGN.md + UI-PROFILE."

<goal>
You are the UX Strategy Lead. Execute ALL phases (A through F) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Import Context | Confirmed UX inputs + platform constraints |
| B | Experience Goals & UX Drivers | Goals, constraints, first-value strategy |
| C | Journey Model & Information Architecture | Journeys, IA, navigation, screen families |
| D | Interaction Design, Accessibility & Platform | Interaction rules, state intent, a11y, responsive strategy |
| E | Design DNA & UI Profile | UI-PROFILE.md + ui-profile.json |
| F | Output, Hardening & Handoff | UX-DESIGN.md with Step 4/6/7 handoffs |

Final Outputs: `docs/ux/UX-DESIGN.md`, `docs/design/UI-PROFILE.md`, `docs/design/ui-profile.json`

Quality gate: 95+/100 on verification schema.

**AI-native output rule:** UX-DESIGN.md and UI-PROFILE are consumed by AI agents in Steps 4, 5, 6, 7, and 9. Bullet points, tables, and structured JSON — not narrative prose. Zero ambiguity.
</goal>

---

## Step Boundary

- **Trigger:** Run after Step 2. Requires `docs/architecture/ARCHITECTURE.md` and `docs/specs/MASTER_PRD.md`.
- **Step 3 owns:** experience goals, journeys, IA, navigation logic, interaction principles, accessibility commitments, responsive/platform strategy, Design DNA selection, visual direction, UI profile.
- **Step 3 does NOT own:** complete screen inventory (Step 4), visual tokens and component styling (Step 6), exhaustive state-by-state specs (Step 7), landing page CRO (Step 9).
- **Do NOT** create final wireframes, component specs, or design token values. Define direction, not implementation.
- **Fallback:** If ARCHITECTURE.md is missing, prompt user to run Step 2 first. If MASTER_PRD.md is missing, prompt for Step 1.

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
  --title "Step 3: UX Design in progress" \
  --body "Phases A-F: context, goals, journeys, interaction, DNA, hardening" \
  --status doing --priority high --tag "step-3,ux-design"
```

**If SIGMAHQ_ENABLED — create per-journey tasks after Phase C (journeys locked):**
```bash
for JOURNEY in "{journey-names}"; do
  kanban-md create --dir "$WORKSPACE" \
    --title "Step 3: Journey — $JOURNEY mapped" \
    --body "User journey, IA, and screen families defined" \
    --status done --priority medium --tag "step-3,ux-design,journey"
done
```

**If SIGMAHQ_ENABLED — on UX-DESIGN.md + UI-PROFILE completion (Phase F):**
```bash
TASK_ID=$(kanban-md list --dir "$WORKSPACE" --status doing --tag "step-3" --json | jq -r '.[0].id')
kanban-md move --dir "$WORKSPACE" "$TASK_ID" done
```

If SigmaHQ is not configured, skip — file-based artifacts remain the sole handoff mechanism.

---

## UX Framework Library

Use to drive decisions. Skip frameworks that don't apply. Each must end in a decision.

### Don Norman — Three Levels of Emotional Design
- **Visceral** — first impression, immediate trust
- **Behavioral** — usability, responsiveness, feedback quality
- **Reflective** — identity, pride, meaning, memory

Apply: define which level matters most for this product's competitive position.

### Journey-Centric Design (NN/g)
- Journeys are the organizing unit, not isolated screens
- Map cross-screen experiences end-to-end
- Identify where present-state friction threatens the desired future-state journey
- Define success moments, not just task completion

### Information Architecture (Baymard)
- Content and feature grouping by user mental model
- Navigation predictability — users should never feel lost
- Route and screen hierarchy that minimizes findability friction
- Search behavior when the product has enough depth to need it

### Complex Application UX (NN/g)
Apply when the product supports expert workflows, high-stakes tasks, or nonlinear flows:
- Research the work, not just the user label
- Support branching and nonlinear flows without overwhelming
- Layer complexity — progressive disclosure for depth

### Accessibility-First Design (WCAG 2.2 AA)
Not a later QA pass — part of the UX contract from Step 3:
- Keyboard behavior + focus management
- Touch targets (44px minimum)
- Reduced-motion support
- Screen reader semantic structure
- Contrast ratios (4.5:1 body text, 3:1 large text/UI components)
- Text alternatives for non-text content

### Agentic UI Patterns (Smashing Magazine, Feb 2026)
Apply when the product includes AI agent features:

| Pattern | Purpose | Key Component |
|---------|---------|---------------|
| **Intent Preview** | Show agent's plan before execution | Plain-language step list + approve/edit/manual options |
| **Autonomy Dial** | Progressive authorization per task type | Observe → Suggest → Confirm → Autonomous |
| **Explainable Rationale** | Justify autonomous actions | "Because you said X, I did Y" |
| **Confidence Signal** | Agent reveals certainty level | Visual confidence indicator (green/yellow/red) |
| **Action Audit & Undo** | Persistent log + reversibility | Timeline view with undo windows |
| **Escalation Pathway** | Agent asks rather than guesses | Clarification request, option presentation, human handoff |

### Platform-Specific Guidance
When platform differences matter, treat explicitly:
- Web, mobile web, native iOS (SwiftUI/HIG), native Android (Material 3), desktop
- For native Apple: apply Apple HIG where relevant
- For native Android: apply Material Design 3 where relevant

### Craft & Interaction Principles
Quality checks — not hype:
- Quality and consistency are strategic advantages
- Motion communicates, not decorates
- Users should feel in control
- The interface must not feel generic or randomly stylish
- Every aesthetic choice supports the product's purpose

---

## Design DNA Archetypes

Select one dominant archetype. This drives all downstream visual decisions.

| Archetype | Core Philosophy | Reference Products | Key Characteristics |
|-----------|----------------|-------------------|---------------------|
| **Professional/Craft** | Quality as strategy | Linear, Stripe, Figma, Vercel | Precision, polish, understated elegance |
| **Gamified/Engaging** | Make the mundane addictive | Duolingo, Superhuman | Rewards, streaks, progression, dopamine |
| **Wellbeing/Calming** | Mindful design | Headspace, Opal | Soft colors, gentle animations, breathing room |
| **Aggressive/High-Energy** | Create urgency | Sales apps, fitness apps | Bold colors, strong CTAs, momentum |
| **Delightful/Playful** | Spark joy | Notion, Arc Browser | Personality, whimsy, surprises |
| **Premium/Luxury** | Exclusivity | High-end fintech, VIP apps | Dark palettes, elevated restraint |
| **Social/Viral** | Sharing + connection | TikTok, Instagram | Share prompts, social proof, FOMO |
| **Health/Fitness** | Minimal friction, max results | Cal AI, Ladder | Photo-first, progress tracking, coaching |
| **Fintech/Trust** | Security meets usability | Cash App, Chime | Trust signals, confidence-building feedback |
| **Crypto/Trading** | Clarity at speed | Robinhood, Coinbase | Radical simplicity, real-time data |
| **Recovery/Transformation** | Deep personalization | Sobriety apps, QUITTR | Heavy personalization, quantified progress |
| **Open/Developer** | Transparent, infrastructure-like | Cal.com, OSS tools | Extensibility, visible system logic |

---

## Phase A — Import Context

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read `.sigma/runtime-baseline.json`, `docs/specs/MASTER_PRD.md`, `docs/stack-profile.json`, `docs/architecture/ARCHITECTURE.md`.
3. Read `.sigma/boilerplate.json` if present — document extensions vs inherited UX baseline.
4. Read `docs/specs/OFFER_ARCHITECTURE.md` if Step 1.5 ran (monetization affects onboarding, paywalls, upgrade UX).
5. If `research_mode = blocked` → stop. If `reduced` → continue with assumption labels.

### Sequential Decisions

**Decision 1: Platform scope**
Use AskUserQuestion: "What platforms does the UX need to cover?"
Options: [Web only, Web + Mobile web, Web + Native mobile (React Native/Expo), Native iOS (SwiftUI), Cross-platform (web + mobile + desktop), Other]

**Decision 2: Product complexity**
Use AskUserQuestion: "How complex is the core user workflow?"
Options: [Simple — linear task flow, Moderate — multi-step with branching, Complex — expert workflows with nonlinear flows, Dashboard/data-heavy — analytics and monitoring]

**Decision 3: Agentic features**
Use AskUserQuestion: "Does this product include AI agent features users interact with?"
Options: [Yes — agents perform tasks for the user, Partially — AI assists but user drives, No — traditional software, Not sure yet]

<HARD-GATE>
Do NOT proceed to Phase B until user approves context imports.
Use AskUserQuestion: "UX context imported. Approve?"
Options: [Approve — define experience goals, Revise platform scope, Adjust complexity assessment]
</HARD-GATE>

---

## Phase B — Experience Goals & UX Drivers

### Required goal categories

1. **First-value goals** — what must the user understand/do immediately?
2. **Trust goals** — where is trust risk highest?
3. **Usability goals** — where is cognitive load risk highest?
4. **Emotional goals** — what should the user feel at key moments?
5. **Accessibility goals** — what WCAG commitments from the start?
6. **Platform constraints** — what platform differences materially change UX?
7. **Architecture constraints** — what architecture decisions limit or shape UX?
8. **Monetization constraints** — onboarding, paywall, upgrade, quota states (if Step 1.5)

### Research (directive queries)

1. Search `"[product domain] UX best practices 2026"` — current UX patterns
2. Search `"[primary user role] workflow UX"` — how target users expect to work
3. If agentic: Search `"agentic AI UX patterns 2026"` — agent interaction design

<HARD-GATE>
Do NOT proceed to Phase C until user approves goals.
Use AskUserQuestion: "Experience goals and UX drivers defined. Approve?"
Options: [Approve — map journeys and IA, Adjust goals, Research deeper]
</HARD-GATE>

---

## Phase C — Journey Model & Information Architecture

### Core User Contexts
- Primary user contexts, secondary users
- Expert vs novice needs when relevant
- Key jobs and usage modes

### Journey Model
For each major journey:

| Journey | Trigger | Goal | Key Stages | Friction Points | Success Moment | Emotional Intent |
|---------|---------|------|------------|----------------|----------------|-----------------|

### Information Architecture
- Top-level navigation model (tabs, sidebar, command palette, etc.)
- Hierarchy and grouping logic
- How users find core actions and information

### Screen Families (not final screens — Step 4 owns the inventory)
- Acquisition / onboarding
- Core work surfaces
- Management / settings
- Monetization / upgrade / billing (if applicable)
- Support / empty / fallback patterns

<HARD-GATE>
Do NOT proceed to Phase D until user approves journeys + IA.
Use AskUserQuestion: "Journeys and IA mapped. Approve?"
Options: [Approve — design interactions and accessibility, Revise journeys, Adjust navigation model]
</HARD-GATE>

---

## Phase D — Interaction Design, Accessibility & Platform

### Interaction Principles
- Primary interaction patterns (click, swipe, drag, keyboard shortcuts)
- Navigation behavior (routing, breadcrumbs, back behavior)
- Input and confirmation expectations
- Feedback expectations (loading, success, error)
- Error recovery (inline, toast, modal, retry)
- Speed vs explanation tradeoffs per context

### State Intent (Step 7 formalizes — Step 3 sets the direction)
Define UX intent for: empty states, loading states, error states, success states, permission/lock states, upgrade/quota states (if monetized).

### Accessibility Commitments
- Keyboard + focus: [expectations]
- Touch targets: 44px minimum
- Motion: respect `prefers-reduced-motion`
- Screen readers: semantic HTML, ARIA where needed
- Contrast: WCAG 2.2 AA (4.5:1 body, 3:1 large/UI)
- Text alternatives: all non-text content

### Responsive & Platform Strategy
- What's consistent across platforms
- What differs by platform
- Mobile constraints (thumb zones, viewport, performance)
- Desktop/expert differences
- Native platform conventions (HIG, Material 3) when applicable

### Agentic Interaction Design (if Decision 3 = Yes/Partially)
Map which of the 6 agentic patterns apply:
- Intent Preview needed? Where?
- Autonomy Dial — what's the default authorization level?
- Confidence signals — where does the agent need to show certainty?
- Audit trail — what actions need logging and undo?
- Escalation — where must the agent ask rather than guess?

<HARD-GATE>
Do NOT proceed to Phase E until user approves.
Use AskUserQuestion: "Interaction design + accessibility defined. Approve?"
Options: [Approve — select Design DNA, Adjust interaction patterns, Strengthen accessibility commitments]
</HARD-GATE>

---

## Phase E — Design DNA & UI Profile

### Design Thinking (embedded from frontend-design skill — apply before DNA selection)

Before selecting an archetype, answer these:
- **Purpose:** What problem does this interface solve? Who uses it daily?
- **Tone:** Commit to a BOLD aesthetic direction. Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian.
- **Constraints:** Platform, framework, performance, accessibility requirements.
- **Differentiation:** What makes this UNFORGETTABLE? What's the one thing someone will remember about this interface?

The answers to these questions refine which DNA archetype fits and HOW it gets applied.

### Design DNA Selection

Use AskUserQuestion: "Which Design DNA archetype fits this product?"
Present the archetype table. Options: [Professional/Craft, Gamified/Engaging, Wellbeing/Calming, Aggressive/High-Energy, Delightful/Playful, Premium/Luxury, Other — describe]

Then document:
- Selected archetype + rationale
- What user emotion it reinforces
- Key reference products
- What visual patterns it favors
- What visual patterns it avoids
- How it affects onboarding, core surfaces, monetization surfaces, trust-heavy screens
- **Differentiation answer:** what makes this interface unforgettable (from Design Thinking above)

### shadcn Theme Preset Mapping (when shadcn/ui is in the stack)

If `stack-profile.json` includes `"componentLibrary": "shadcn/ui"`, map the selected DNA archetype to the closest shadcn theme preset:

| DNA Archetype | Recommended Presets |
|--------------|-------------------|
| Professional/Craft | modern-minimal, graphite, mono, vercel, clean-slate |
| Gamified/Engaging | bubblegum, candyland, retro-arcade |
| Wellbeing/Calming | sage-garden, pastel-dreams, nature, ocean-breeze |
| Aggressive/High-Energy | bold-tech, cyberpunk, doom-64 |
| Delightful/Playful | soft-pop, tangerine, kodama-grove |
| Premium/Luxury | elegant-luxury, darkmatter, midnight-bloom, cosmic-night |
| Fintech/Trust | supabase, claude, perpetuity |
| Open/Developer | vercel, mono, clean-slate |

Use AskUserQuestion: "Map to a shadcn theme preset?"
Options: [Use recommended preset, Browse all 42 presets, Custom theme — skip preset, Not using shadcn]

If a preset is selected, use the shadcn MCP `apply_theme` tool to preview it. Record in `ui-profile.json` as `"shadcnPreset": "[preset-id]"`.

### UI Profile

Define in `docs/design/UI-PROFILE.md`:
- Design DNA archetype + rationale
- Design personality summary + differentiation factor
- Density and spacing direction
- Motion intensity and purpose
- Contrast posture
- Typography direction (families, scale, weight strategy)
- Iconography direction
- Layout behavior (grid, sidebar, single-column, etc.)
- Spatial composition direction (asymmetry, overlap, grid-breaking, or structured grid)
- Component tone (sharp/rounded, bordered/borderless, etc.)
- Background and atmosphere direction (textures, gradients, depth, or clean/flat)
- Platform notes

### Frontend Aesthetics Standards (embedded from frontend-design skill + unslop — apply to ALL design outputs)

**Typography:**
- NEVER use generic fonts: Inter, Roboto, Arial, system fonts as defaults
- Choose distinctive, characterful font pairings. Pair a display font with a refined body font.
- NEVER converge on the same "safe" choices (e.g., Space Grotesk) across projects

**Color & Theme:**
- Dominant colors with sharp accents > timid, evenly-distributed palettes
- Use CSS variables for consistency
- Commit to a cohesive color story — don't scatter colors without hierarchy

**Motion:**
- One well-orchestrated page load with staggered reveals > scattered micro-interactions
- Motion communicates (state change, navigation, feedback), it does not decorate
- Respect `prefers-reduced-motion` always

**Spatial Composition:**
- Unexpected layouts are encouraged — asymmetry, overlap, diagonal flow, grid-breaking elements
- Generous negative space OR controlled density (pick one and commit)
- Do NOT default to centered-everything-in-a-max-width-column

**Backgrounds & Atmosphere:**
- Create atmosphere and depth, don't default to solid white/gray
- Gradient meshes, noise textures, geometric patterns, layered transparencies are all valid
- Match the atmosphere to the Design DNA — don't mix

**Anti-Slop Design Rules:**
- Do NOT default to: centered hero + proof strip + features + pricing + testimonials + CTA
- Do NOT use radial glows, blurred orbs, gradient text on H1, frosted glass cards as lazy polish
- Do NOT default devtools to dark+cyan, healthcare to cream+blue, enterprise to "Talk to Sales"
- Do NOT use "Trusted by...", "Get Started", "Simple honest pricing" as default copy
- Do NOT default pricing to three vertical cards with middle featured
- Do NOT hide thin content behind gradients, blur, shadows, and fade-up animation
- Do NOT swap one stock SaaS move for another stock SaaS move — break the pattern genuinely

**The rule:** Bold maximalism and refined minimalism both work. The key is intentionality, not intensity. Match implementation complexity to the aesthetic vision.

### Claude Design Compatibility (for Step 5 Track A)

`UI-PROFILE.md` and `ui-profile.json` are designed to be consumable by Claude Design's onboarding when Step 5 Track A is selected. Claude Design ingests codebase links, brand documents (PDF/DOCX/MD), and reference images to build an "internal visual language" (colors, typography, components, spacing).

To maximize compatibility:
- **`UI-PROFILE.md` must be self-contained** — Claude Design will read it as a brand brief. Do not rely on external references that only Sigma tools can resolve.
- **Include 3-5 concrete reference products** from the Design DNA archetype (Claude Design uses these to seed visual direction).
- **Anti-slop guardrails must be explicit** — Claude Design respects them when generating prototypes.
- **Typography families must be named exactly** as they appear in `ui-profile.json` (e.g., "Geist Sans", not "a sans-serif").
- **`ui-profile.json` is machine-readable** for Sigma's downstream steps; Claude Design will use the markdown version.

No additional onboarding pack is required — when Step 5 Track A runs, it will generate per-flow Claude Design prompts that embed the full UI Profile content inline.

### Machine-Readable: `docs/design/ui-profile.json`

```json
{
  "id": "[project-slug]",
  "name": "[Project Name]",
  "version": "1.0",
  "platform": "[web|mobile|both]",
  "designDNA": "[archetype]",
  "shadcnPreset": "[preset-id or null]",
  "dials": {
    "density": "[compact|comfortable|spacious]",
    "motion": "[minimal|moderate|expressive]",
    "contrast": "[standard|high|dark-mode-first]",
    "formality": "[casual|professional|premium]"
  },
  "typography": { "heading": "[family]", "body": "[family]", "mono": "[family]" },
  "layout": { "primary": "[sidebar|tabs|single-column|dashboard]", "responsive": "[mobile-first|desktop-first]" },
  "components": { "corners": "[sharp|rounded|pill]", "borders": "[visible|subtle|none]" },
  "motion": { "intensity": "[none|subtle|moderate|bold]", "purpose": "[feedback|delight|navigation]" },
  "guardrails": ["[list of anti-slop rules from above]"]
}
```

<HARD-GATE>
Do NOT proceed to Phase F until user approves Design DNA + UI Profile.
Use AskUserQuestion: "Design DNA and UI Profile defined. Approve?"
Options: [Approve — write final documents, Change archetype, Adjust UI profile dials]
</HARD-GATE>

---

## Phase F — Output, Hardening & Handoff

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Weak journeys or missing user contexts
- Shallow accessibility coverage
- Design DNA that contradicts UX goals
- Step 4/6/7 work improperly absorbed into Step 3
- Contradictions with ARCHITECTURE.md or MASTER_PRD

Fix findings before presenting.

### Write `docs/ux/UX-DESIGN.md`

Required sections:
```
Executive UX Summary
Imported Inputs & Assumptions
Experience Goals & Success Signals
UX Drivers & Constraints
Core User Contexts
Journey Model
Information Architecture
Screen Families & Intent
Interaction Principles
State Intent Summary
Accessibility Commitments
Responsive & Platform Strategy
Agentic Interaction Design (if applicable)
Design DNA Summary
UI Profile Summary
Step 4 Handoff — what Step 4 turns into the full screen inventory
Step 6 Handoff — what Step 6 turns into tokens, components, visual system
Step 7 Handoff — what Step 7 formalizes into full state coverage
Do NOT Build in This Step
Open Risks & Deferrals
```

### Writing Standards (embedded)

- No stock AI phrases: "Intuitive", "Seamless", "Delightful" (unless quantified), "User-friendly", "Clean and modern"
- Start with concrete UX decisions, not commentary about UX trends
- Commit to design direction — no "we might explore" hedging
- Write like a UX lead with conviction, not a design blog post
- Every journey traces to a user context and product goal
- State intent is concrete (what happens, not "it should feel nice")

### Success Criteria

- [ ] Experience goals are explicit and traceable
- [ ] Journeys and IA align with architecture constraints
- [ ] Accessibility commitments are concrete (numbers, not aspirations)
- [ ] Design DNA is explicit and usable by later steps
- [ ] UI Profile JSON is machine-parseable
- [ ] Anti-slop design guardrails present
- [ ] Agentic patterns mapped (if applicable)
- [ ] Step 4, 6, 7 handoffs explicit
- [ ] No Step 4/6/7 scope absorbed
- [ ] $holes pass completed
- [ ] User approved
- [ ] SigmaHQ kanban tasks created per journey (when configured)

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 4 without explicit approval.
Use AskUserQuestion: "Step 3 complete. Ready for Step 4 — Flow Tree?"
Options: [Proceed to Step 4, Revise UX design, Adjust Design DNA]
</HARD-GATE>

---

<verification>
## Step 3 Verification Schema

### Required Outputs (30 points)

| Item | Path | Points |
|------|------|--------|
| UX Document | docs/ux/UX-DESIGN.md | 14 |
| UI Profile Document | docs/design/UI-PROFILE.md | 8 |
| UI Profile JSON | docs/design/ui-profile.json | 8 |

### Required Sections (36 points)

| Section | Points |
|---------|--------|
| Experience Goals & Success Signals | 5 |
| Journey Model | 5 |
| Information Architecture | 5 |
| Design DNA Summary | 4 |
| Interaction Principles | 4 |
| Accessibility Commitments (concrete) | 5 |
| UI Profile Summary | 4 |
| Step 4 Handoff | 2 |
| Step 6 Handoff | 1 |
| Step 7 Handoff | 1 |

### Quality Indicators (24 points)

| Check | Points |
|-------|--------|
| Goals tied to user value and product decisions | 6 |
| IA and journeys align with architecture constraints | 6 |
| Accessibility commitments have numbers (44px, 4.5:1, etc.) | 6 |
| Design DNA and UI Profile usable by downstream agents | 4 |
| Anti-slop design guardrails present | 2 |

### Boundary Integrity (10 points)

| Check | Points |
|-------|--------|
| No Step 4 scope absorbed | 4 |
| No Step 6/7 scope absorbed | 4 |
| $holes pass completed | 2 |
| SigmaHQ kanban tasks created per journey (when configured) | 1 |

**Passing score:** 95/100
</verification>

$END$
