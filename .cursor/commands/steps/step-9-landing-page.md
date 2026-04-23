---
version: "2.1.0"
last_updated: "2026-04-19"
changelog:
  - "2.1.0: Added Track A (Claude Design visual-first) / Track B (templates, current behavior, default) / Hybrid (Claude Design → template seed) branch at Phase D. Mirrors the Step 5 Track pattern. Default remains Track B — existing template selection order is preserved."
  - "2.0.0: Landing page strategy + avatar/diary empathy engine + template mapping."
description: "Step 9: Landing Page → LANDING-PAGE.md — conversion-focused page strategy, copy system, avatar/diary empathy engine, and Track A/B/Hybrid implementation paths"
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
  - --page-type
  - --avatars-only
  - --template-only
---

# /step-9-landing-page — Landing Page Strategy, Copy & Template Mapping

**On start, announce:** "Running Step 9: Landing Page. I'll turn the offer and product story into a landing page that converts — using avatar empathy, conversion psychology, and the Design DNA."

**Note:** Step 9 is optional. Skip when the product doesn't need a marketing/conversion page yet.

<goal>
You are the Landing Page Strategy Lead. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Import Context & Page Type | Offer inputs + page type + audience |
| B | Customer Research & Empathy Engine | Avatar + diary entries + research sources |
| C | Page Strategy & Copy System | Message hierarchy, hero, proof, objections, CTA |
| D | Template Selection & Visual Generation | Template mapping + optional direct HTML/shadcn scaffolding |
| E | Output, Hardening & Handoff | LANDING-PAGE.md + implementation handoff |

Required Outputs:
- `docs/landing-page/LANDING-PAGE.md`
- `docs/avatars/PROBLEM-AWARE-AVATAR.md`
- `docs/avatars/DIARY-ENTRIES.md`
- `docs/research/LANDING-SOURCES.md`

Conditional: `docs/landing-page/TEMPLATE-MAPPING.md`, `docs/landing-page/CTA-VARIANTS.md`

Quality gate: 95+/100 on verification schema.

**Core rule:** The page has one dominant goal. Every section either builds belief or removes an objection. Nothing else belongs on the page.
</goal>

---

## Trigger

**Run after Step 8 (Technical Spec) is approved, OR skip if the product doesn't need a marketing/conversion page.** Step 9 is optional. It consumes Step 1.5 (offer architecture) and Step 6 (design system) outputs.

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
  --title "Step 9: Landing Page" \
  --body "Page strategy, avatar research, copy system, template mapping" \
  --status doing --priority medium --tag "step-9,landing-page" \
  --json
```

**Phase transitions (if SIGMAHQ_ENABLED):**
- After Phase B approval (avatar + diary + research):
  ```bash
  kanban-md create --dir "$WORKSPACE" \
    --title "Step 9: Avatar & empathy engine" \
    --body "Problem-aware avatar, diary entries, landing sources complete" \
    --status done --priority high --tag "step-9,avatar"
  ```
- After Phase C approval (page strategy + copy):
  ```bash
  kanban-md create --dir "$WORKSPACE" \
    --title "Step 9: Copy system" \
    --body "Message hierarchy, hero strategy, CTA strategy, objection handling defined" \
    --status done --priority high --tag "step-9,copy"
  ```
- After Phase D approval (template + visuals):
  ```bash
  kanban-md create --dir "$WORKSPACE" \
    --title "Step 9: Template mapped" \
    --body "Template selected, visual direction set, anti-slop applied" \
    --status done --priority medium --tag "step-9,template"
  ```

**On step completion (if SIGMAHQ_ENABLED):**
```bash
TASK_ID=$(kanban-md list --dir "$WORKSPACE" --status doing --tag "step-9" --json | jq -r '.[0].id')
kanban-md move --dir "$WORKSPACE" "$TASK_ID" done
```

If SigmaHQ is not configured, skip all kanban-md commands — file-based artifacts remain the sole handoff mechanism.

---

## Step Boundary

- **Step 9 owns:** landing page strategy, message hierarchy, conversion copy, above-the-fold clarity, avatar/diary empathy engine, social proof strategy, objection handling, CTA system, template selection, implementation handoff.
- **Step 9 does NOT own:** pricing/offer architecture (Step 1.5), product UI (Steps 3-8), boilerplate setup (Step 0).
- **Do NOT** re-litigate pricing, COGS, or offer architecture. Consume Step 1.5 outputs.

---

## Conversion Principles

### MECLABS Conversion Formula
`C = 4M + 3V + 2(I-F) - 2A`
- **M (Motivation):** How badly does the visitor want this? (highest weight)
- **V (Value Proposition):** Why should they choose you over alternatives?
- **I (Incentive):** What pushes them to act now?
- **F (Friction):** What makes it hard? (forms, confusion, steps)
- **A (Anxiety):** What scares them? (trust, risk, commitment)

### Above-the-Fold 5-Second Rule
The visitor must understand three things in under 5 seconds:
1. What this is (value proposition)
2. Why it matters to them (relevance)
3. What to do next (CTA)

In 2026, this also affects AI discovery — ChatGPT, Perplexity, and Google AI Overviews scan above-fold structure to generate summaries of your product.

### Message Match
The headline must reinforce the promise that brought the visitor. If the traffic source says "50% faster project management," the hero must say the same thing — not a clever rewrite.

### One Page, One Dominant Action
- One primary CTA (what you want most visitors to do)
- One optional supporting CTA (lower commitment alternative)
- No competing navigation, no sidebar distractions, no feature tours

### Avatars & Diaries Are the Empathy Engine
They are required because they sharpen every word on the page:
- What the visitor already believes
- What they fear
- What they want fast
- What objections must be handled on-page
- What language feels human vs corporate

---

## Phase A — Import Context & Page Type

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read `docs/specs/MASTER_PRD.md`, `docs/specs/OFFER_ARCHITECTURE.md` (if Step 1.5 ran), `docs/specs/pricing-config.json` (if applicable).
3. Read `docs/design/UI-PROFILE.md`, `docs/design/ui-profile.json`, `docs/design/DESIGN-SYSTEM.md`.
4. Read `.sigma/runtime-baseline.json` for tool availability (shadcn, `/clone` skill).
5. If `research_mode = blocked` → stop. If `reduced` → label assumptions.

### Asset generation check

Check `.sigma/runtime-baseline.json` and environment for:
- `GOOGLE_API_KEY` or `GEMINI_API_KEY` → enables Nano Banana Pro 2 image generation (hero images, product mockups, illustrations, social proof visuals)
- If key exists → record in runtime baseline as `"asset_generation": { "nano_banana": true, "model": "nano-banana-2" }`
- If key missing → note that hero images and custom visuals must be sourced manually or via stock

When Nano Banana Pro 2 is available, Step 9 can generate:
- Hero section visuals (product screenshots, lifestyle imagery, abstract brand art)
- Social proof imagery (before/after visuals, data visualizations)
- OG images / social preview cards (1200x630)
- Favicon and app icon concepts
- Background textures and patterns matching the Design DNA

Use the `$media-generation` skill for the actual generation. Apply frontend aesthetics DNA — generated images must match the Design DNA archetype, not default to generic AI stock art.

### Sequential Decisions

**Decision 1: Page type**
Use AskUserQuestion: "What type of landing page?"
Options: [Product marketing page (SaaS/app), Waitlist / coming soon, Demo / signup / free trial, Course / coaching sales page, Portfolio / services page, Other]

**Decision 2: Primary conversion action**
Use AskUserQuestion: "What's the one thing you want visitors to do?"
Options: [Sign up / start free trial, Join waitlist, Book a demo/call, Buy now / enroll, Download / get access, Other]

**Decision 3: Traffic source**
Use AskUserQuestion: "Where is traffic coming from?"
Options: [Organic search / SEO, Paid ads (Google/Meta), Social media / content, Email list, Product Hunt / launch, Cold outreach, Multiple sources]

<HARD-GATE>
Do NOT proceed to Phase B until user approves page type + action + audience.
Use AskUserQuestion: "Page type and primary action locked. Approve?"
Options: [Approve — build avatar and research, Revise page type, Change primary action]
</HARD-GATE>

---

## Phase B — Customer Research & Empathy Engine

### Research (directive queries)

1. Search `"[product domain] landing page examples 2026"` — find competitor pages
2. Search `"[target user] frustration [problem domain]"` — find real user language
3. Search `"[product category] objections buying concerns"` — find objection patterns
4. If high-ticket: Search `"[price range] [category] sales page conversion"` — find comparable offers

### Create `/docs/avatars/PROBLEM-AWARE-AVATAR.md`

| Dimension | Answer |
|-----------|--------|
| Problem awareness level | [Unaware / Problem-aware / Solution-aware / Product-aware / Most-aware] |
| Desired outcome | [specific transformation] |
| Current workaround | [what they do today] |
| Top 3 objections | [what stops them from buying] |
| Buying triggers | [what pushes them to act] |
| Proof sensitivity | [what type of proof they trust — data, testimonials, case studies, authority] |
| Language register | [technical, casual, aspirational, urgent] |

### Create `/docs/avatars/DIARY-ENTRIES.md`

Write 3-5 first-person diary entries capturing:
- Frustration moments (in the avatar's own voice)
- Moments of hesitation before buying
- What they wish existed
- Emotional vocabulary that informs headlines and objection copy

### Create `/docs/research/LANDING-SOURCES.md`

Document: competitor pages analyzed, proof sources found, objection patterns identified, language patterns extracted.

<HARD-GATE>
Do NOT proceed to Phase C until user approves avatar + diary + research.
Use AskUserQuestion: "Avatar and diary entries complete. Approve?"
Options: [Approve — write page strategy, Deepen avatar research, Adjust target audience]
</HARD-GATE>

---

## Phase C — Page Strategy & Copy System

### Define in `LANDING-PAGE.md`:

**Offer Translation:** What Step 1.5 decided, translated into page language. What transformation are we selling? What's the value equation score?

**Message Hierarchy:** What must be communicated, in what order:
1. Above the fold — value prop + CTA (5-second rule)
2. Proof block — social proof that reduces the #1 objection
3. Features/benefits — tied to the avatar's desired outcome, not feature lists
4. Objection handling — each section answers a real objection from the avatar
5. Risk reversal — guarantee, trial, money-back, conditional
6. Final CTA — reinforced with urgency or scarcity (only if real)

**Hero Strategy:**
- Headline: names the outcome, not the product
- Subheadline: explains how or why it's different
- CTA: outcome-based copy (not "Get Started" — use "Start [doing the thing they want]")
- Visual: product screenshot, demo video, or social proof number

**Social Proof Strategy:** What type matches the avatar's proof sensitivity:
- Data points (users, revenue impact, time saved)
- Testimonials (specific, attributed, outcome-focused)
- Logos (only if recognizable to the target audience)
- Case studies (before/after with numbers)

**Objection Handling:** Map each avatar objection → page section that neutralizes it.

**CTA Strategy:**
- Primary CTA copy (outcome-based, not generic)
- Supporting CTA (lower commitment — "Watch demo", "See pricing")
- CTA placement (above fold, after proof, after objections, sticky mobile)
- If testing variants: mark `CTA Variant Artifact: Yes` → create `CTA-VARIANTS.md`

**Mobile Conversion Rules:**
- CTA visible without scrolling on mobile (500-600px viewport)
- Form friction minimized (3 fields max for first conversion)
- Touch targets 44px minimum
- No horizontal scroll

<HARD-GATE>
Do NOT proceed to Phase D until user approves page strategy.
Use AskUserQuestion: "Page strategy and copy system complete. Approve?"
Options: [Approve — select template and generate visuals, Revise message hierarchy, Adjust CTA strategy]
</HARD-GATE>

---

## Phase D — Track Selection & Visual Generation

Step 9 supports three implementation paths. Pick one based on who iterates on the visuals and what kind of starting point the team wants.

### Track Comparison

| Path | Visual iterator | Starting point | Best for |
|------|----------------|---------------|----------|
| **Track A — Claude Design visual-first** | Human (in Claude Design browser, with sliders + inline comments) | Blank canvas → bundle | Client projects, founder review, when visual direction is uncertain |
| **Track B — Template/direct** (DEFAULT) | AI agent (from strategy + Design DNA) | shadcn block / boilerplate shell / repo template / direct HTML | Fast implementation, stack-native output, when Design DNA is clear |
| **Hybrid (A → B)** | Human in Claude Design, then agent applies to template | Claude Design bundle seeds a template's visual layer | Want Claude Design's polished visual direction AND a template's production-ready code scaffold |

**Default = Track B.** Track A is opt-in when `--visual-validate` flag is present, the page is high-stakes (founder reviewing, client project, paid launch), or the user picks it explicitly.

### Decision: Track Selection

Use AskUserQuestion: "How should we build this landing page?"
Options:
- **Track B — Templates/direct (default, fastest):** AI generates from strategy + Design DNA. shadcn blocks, boilerplate shell, repo template, or direct HTML.
- **Track A — Claude Design visual-first:** Generate a Claude Design prompt, pause while you iterate visually in the browser with stakeholders, export bundle, implement from bundle.
- **Hybrid — Claude Design → Template:** Iterate visually in Claude Design first (like Track A), export the bundle, then apply the bundle's visual direction to a template scaffold (shadcn block, boilerplate, or repo template). Combines polished visual direction with stack-native code.

Auto-default behavior:
- If `--visual-validate` or `--track=A` flag present → Track A
- If `--track=hybrid` present → Hybrid
- If `--track=B` present or accepted default → Track B

---

### Track A — Claude Design Visual-First

#### A.1 — Generate Claude Design Prompt for the landing page

Write `docs/landing-page/CLAUDE-DESIGN-PROMPT.md`:

```markdown
# Claude Design Prompt — Landing Page

**Usage:** Drag this file into Claude Design. Iterate visually with stakeholders using inline comments + adjustment knobs. When approved, click "Send to Claude Code" to export the implementation bundle back.

## Brand Context (from Step 3)
[paste UI Profile summary — density, motion, contrast, typography, color story]
[paste anti-slop guardrails in full]

## Page Strategy (from Phase C)
- Page type: [from Decision 1]
- Primary conversion action: [from Decision 2]
- Traffic source: [from Decision 3]
- Message hierarchy (in order): [list from Phase C]

## Hero Strategy
- Headline: [outcome-based, not product-name]
- Subheadline: [explains how/why different]
- Primary CTA copy: [outcome-based, not "Get Started"]
- Visual intent: [product screenshot / demo video / social proof number]

## Sections (in order)
1. Hero (above-fold, 5-second test)
2. [proof block — specific proof type from Phase C Social Proof Strategy]
3. [feature/benefit block — tied to avatar's desired outcome]
4. [objection handling — map each avatar objection to a section]
5. [risk reversal — guarantee, trial, money-back]
6. [final CTA — reinforced if urgency/scarcity is real]

## Avatar Context (from Phase B)
- Problem awareness level: [from avatar]
- Top 3 objections: [from avatar]
- Language register: [from avatar]
- Emotional vocabulary (from diary entries): [paste key phrases]

## Anti-Slop Guardrails
[paste all design + copy anti-slop rules from Phase D below]

## Expected Export
When approved, click "Send to Claude Code" to export the bundle. I will:
- Save the bundle to `docs/landing-page/claude-design/`
- Generate `LANDING-PAGE.md` with the bundle as visual source of truth
- (If switching to Hybrid) apply the bundle's visual direction to a chosen template
```

#### A.2 — Hard pause for human iteration

Halt and instruct the user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRACK A — HUMAN IN THE LOOP REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Claude Design prompt generated at:
  docs/landing-page/CLAUDE-DESIGN-PROMPT.md

YOUR TURN (Claude Design has no MCP/CLI):

1. Open Claude Design in your browser (Pro/Max/Team/Enterprise required)
2. Create a new project and drag CLAUDE-DESIGN-PROMPT.md in
3. Iterate visually — sliders, inline comments, stakeholder review
4. When approved, click "Send to Claude Code" → export bundle
5. Save the exported bundle to:
     docs/landing-page/claude-design/
   (unzip if compressed; directory should contain HTML/components/tokens/copy)
6. Commit the bundle to git

Reply "bundle ready" when done. I will resume and generate the landing page PRD.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Use AskUserQuestion: "Track A pause — has the Claude Design bundle been exported and committed?"
Options: [Yes — resume with PRD generation, Not yet — keep waiting, Switch to Hybrid — use bundle as template seed, Abandon Track A — switch to Track B]

Do not proceed until `docs/landing-page/claude-design/` contains bundle content.

#### A.3 — Implement from bundle

Generate `LANDING-PAGE.md` referencing the bundle as the visual source of truth. Section "Template Mapping" becomes "Bundle Mapping" — map each bundle component to production file paths for Step 11 to scaffold.

---

### Track B — Template/Direct (DEFAULT — current behavior)

#### Template selection order

1. **shadcn blocks** (if shadcn/ui is in the stack) — login, signup, and landing page blocks as starting scaffolds
2. **Product boilerplate marketing shell** (if the boilerplate includes one)
3. **Repo templates** from `templates/landing-page-templates/`
4. **Direct HTML generation** — AI agent generates a self-contained HTML landing page from the strategy + Design DNA
5. **Custom implementation** — only if none of the above fit

Use AskUserQuestion: "Which template approach?"
Options: [shadcn blocks + customize, Boilerplate marketing shell, Direct HTML — generate from strategy, Repo template, Custom build]

#### If using Direct HTML Generation

Generate a self-contained HTML landing page file from the page strategy:

1. If the user has reference sites or screenshots → invoke `/clone` to extract design DNA first
2. Generate complete HTML with inline CSS: page type + Design DNA + hero strategy + section order + CTA copy + mobile rules
3. Save to `docs/landing-page/landing-page.html`
4. Review against anti-slop rules — iterate until the page feels intentional
5. Responsive: must work at 375px (mobile) and 1440px (desktop)
6. All interactive elements work (hover states, focus rings, form validation feedback)
7. Dark mode support via `prefers-color-scheme` media query

The HTML file is self-contained (no external dependencies), opens in any browser, and serves as both the visual reference and the implementation starting point.

---

### Hybrid — Claude Design → Template Seed

Run Track A phases A.1 and A.2 first (generate prompt, human iterates, export bundle to `docs/landing-page/claude-design/`).

Then:

#### H.1 — Select a template to seed

Use AskUserQuestion: "Which template should we apply the Claude Design visual direction to?"
Options: [shadcn landing block + adapt visual tokens from bundle, Boilerplate marketing shell + override theme with bundle tokens, Repo template from templates/landing-page-templates/ + re-skin to match bundle, Direct HTML — use bundle as reference and generate fresh]

#### H.2 — Apply bundle to template

For the chosen template:
1. Extract the bundle's design tokens (colors, typography, spacing, radius, shadows)
2. Extract the bundle's component visual treatments (button styles, card styles, hero treatment)
3. Override the template's default styling with the bundle's tokens
4. Preserve the template's structure (routing, component hierarchy, data flow) — only the visual layer changes
5. Hand-edit sections where bundle layout differs from template layout — prefer the bundle's approved direction
6. Document which sections came from template vs which were reworked from bundle

This is the "best of both worlds" path: stakeholder-approved visual direction from Claude Design + production-ready code scaffold from the template.

#### H.3 — Document the Hybrid output

In `LANDING-PAGE.md`, include both:
- Template mapping (which template, which sections map directly)
- Bundle influence map (which bundle decisions were applied to the template — tokens, typography, hero treatment, etc.)

---

### Asset Generation with Nano Banana Pro 2 (when Google API key available, all tracks)

Use AskUserQuestion: "Generate landing page visual assets with AI?"
Options: [Yes — generate hero image + OG card + supporting visuals, Hero image only, OG/social preview card only, No — I'll provide my own assets]

If yes, for each asset:
1. Construct prompt from: Design DNA aesthetic + page purpose + brand context
2. Generate via Gemini API (Nano Banana Pro 2) using `$media-generation` skill
3. Review against Design DNA guardrails — reject if it looks like generic AI stock art
4. Save to `docs/landing-page/assets/`
5. Reference in LANDING-PAGE.md hero/visual sections

### Template mapping

If using blocks, templates, or shells, create `docs/landing-page/TEMPLATE-MAPPING.md`:
- Chosen template/shell + why it fits
- Section-by-section mapping (which sections map directly, which need custom work)
- Which shadcn components/blocks are being used

### Anti-Slop Design & Copy Standards (HEAVILY apply here)

**Design:**
- Do NOT default to: centered hero + proof strip + features + pricing + testimonials + CTA (break this exact pattern)
- Do NOT use radial glows, blurred orbs, gradient text on H1, frosted glass cards
- Do NOT default devtools to dark+cyan, healthcare to cream+blue
- Do NOT use generic stock imagery — use product screenshots, real data, or illustrations that match DNA
- Spatial composition matters — asymmetry, overlap, grid-breaking are encouraged

**Copy:**
- Do NOT use: "Trusted by...", "Loved by...", "Built for..."
- Do NOT use: "Get Started", "Start Free Trial", "Book a Demo" as defaults — write outcome-based CTAs
- Do NOT use: "Simple, honest pricing", "Plans that scale", "Everything you need"
- Do NOT use: "Ready to [verb]?" as the closing CTA headline
- Do NOT use: "In today's [adjective] landscape..." anywhere on the page
- Do NOT use: "Game-changing", "Revolutionary", "Best-in-class", "Cutting-edge"
- Write like someone who sells things for a living, not a committee that describes features

<HARD-GATE>
Do NOT proceed to Phase E until user approves template selection + visual direction.
Use AskUserQuestion: "Template and visual direction set. Approve?"
Options: [Approve — finalize landing page, Revise template choice, Regenerate visuals]
</HARD-GATE>

---

## Phase E — Output, Hardening & Handoff

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Above-the-fold confusion (fails 5-second test)
- Objections from avatar not handled on page
- Generic copy that could be about any product
- Anti-slop violations (stock phrases, default layouts)
- Message hierarchy that buries the CTA
- Mobile conversion rules missing

Fix findings before presenting.

### Write `docs/landing-page/LANDING-PAGE.md`

Required sections:
```
Page Type & Primary Action
Offer Translation (from Step 1.5)
Message Hierarchy
Hero Strategy (headline, subheadline, CTA, visual)
Social Proof Strategy
Objection Handling (mapped from avatar)
CTA Strategy + Mobile Placement
Mobile Conversion Rules
Track Used (A / B / Hybrid) — with bundle path if Track A or Hybrid
Template Mapping (Track B and Hybrid only)
Bundle Mapping (Track A and Hybrid only — component → production file path)
Anti-Slop Guardrails Applied
Implementation Handoff
Do NOT Build in This Step
```

### Implementation Handoff must state:
- **Track used** (A / B / Hybrid) and where its artifacts live (`docs/landing-page/claude-design/` for A/Hybrid, `docs/landing-page/landing-page.html` for B)
- Chosen template strategy (Track B and Hybrid) OR bundle-driven approach (Track A)
- What copy must not drift during implementation
- Mobile constraints that are non-negotiable
- Which sections come from templates vs custom vs bundle
- For Hybrid: which bundle decisions were applied to the template (tokens, typography, hero treatment, section layouts) vs preserved from template (structure, routing, data flow)
- Design DNA emphasis for the page

### Writing Standards (embedded)

- No stock AI phrases in copy: see anti-slop copy rules above
- Headlines name the outcome, not the product category
- Every proof element reduces a real objection (not decorative)
- CTA copy is specific: "Start tracking your portfolio" not "Get Started"
- Write like a direct-response copywriter, not a brand guidelines document

### Success Criteria

- [ ] Avatar and diary entries inform the page (not decorative)
- [ ] Above-the-fold passes 5-second test (value + relevance + CTA)
- [ ] Message hierarchy is specific to THIS product
- [ ] Social proof reduces real objections from avatar
- [ ] CTA is outcome-based, not generic
- [ ] Mobile CTA visible without scrolling
- [ ] Anti-slop design + copy rules applied
- [ ] Step 1.5 consumed, not re-litigated
- [ ] Template strategy recorded
- [ ] $holes pass completed
- [ ] SigmaHQ kanban cards created (when configured)
- [ ] User approved

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 10 without explicit approval.
Use AskUserQuestion: "Step 9 complete. Ready for Step 10 — Feature Breakdown?"
Options: [Proceed to Step 10, Revise landing page, Skip Step 9 — not needed]
</HARD-GATE>

---

<verification>
## Step 9 Verification Schema

### Required Outputs (30 points)

| Item | Path | Points |
|------|------|--------|
| Landing Page Strategy | docs/landing-page/LANDING-PAGE.md | 12 |
| Problem-Aware Avatar | docs/avatars/PROBLEM-AWARE-AVATAR.md | 6 |
| Diary Entries | docs/avatars/DIARY-ENTRIES.md | 6 |
| Landing Sources | docs/research/LANDING-SOURCES.md | 6 |

### Required Sections in LANDING-PAGE.md (35 points)

| Section | Points |
|---------|--------|
| Offer Translation | 4 |
| Message Hierarchy | 5 |
| Hero Strategy (headline + CTA + visual) | 6 |
| Social Proof Strategy | 5 |
| Objection Handling | 5 |
| CTA Strategy + Mobile Placement | 5 |
| Template Mapping | 3 |
| Implementation Handoff | 2 |

### Quality Indicators (25 points)

| Check | Points |
|-------|--------|
| Above-the-fold passes 5-second test | 5 |
| Avatar objections mapped to page sections | 5 |
| CTA copy is outcome-based (not "Get Started") | 5 |
| Anti-slop design rules applied (no stock layouts) | 5 |
| Anti-slop copy rules applied (no stock phrases) | 5 |

### Boundary Integrity (10 points)

| Check | Points |
|-------|--------|
| Step 1.5 consumed, not re-litigated | 3 |
| Mobile conversion rules explicit | 3 |
| Template follows selection order | 2 |
| $holes pass completed | 2 |
| SigmaHQ kanban cards created (when configured) | 1 |

**Passing score:** 95/100
</verification>

$END$
