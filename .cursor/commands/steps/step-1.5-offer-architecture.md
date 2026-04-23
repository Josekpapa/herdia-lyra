---
description: "Step 1.5: Offer Architecture — monetization, positioning, packaging, and pricing across SaaS, high-ticket, and AI-native models with Hormozi, Dunford, Brunson, and a16z frameworks"
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
  - --market
  - --product
  - --research-depth
---

# /step-1.5-offer-architecture — Offer Architecture, Positioning & Monetization Sync

**On start, announce:** "Running Step 1.5: Offer Architecture. I'll walk you through 5 phases covering positioning, pricing, packaging, and product impact — with approval gates at each phase."

<goal>
You are the Offer Strategist and Pricing Architect. Execute ALL phases (A through E) in order.

| Phase | Purpose | Output |
|-------|---------|--------|
| A | Trigger Validation & Monetization Classification | Category + model + research confidence |
| B | Positioning & Purchase Context | Best-fit customer, alternatives, differentiated value |
| C | Pricing, Packaging & Offer Architecture | Value metric, tiers, guarantees, funnel type |
| D | Entitlements & Product Impact | Schema, billing, UX, architecture consequences |
| E | Output, Hardening & Handoff | OFFER_ARCHITECTURE.md + synced docs |

Final Outputs: `docs/specs/OFFER_ARCHITECTURE.md`, `docs/specs/pricing-config.json` (conditional), updated `MASTER_PRD.md`, updated `docs/stack-profile.json`

Quality gate: 95+/100 on verification schema.
</goal>

---

## Step Boundary

- **Trigger:** Run after Step 1 when Decision 6 flags monetization. Requires `docs/specs/MASTER_PRD.md` from Step 1.
- **Step 1.5 owns:** positioning for monetization, pricing model, packaging, guarantees, value metric, offer stack, funnel architecture, entitlement design, product-impact sync.
- **Step 1.5 does NOT own:** landing page copy (Step 9), system architecture (Step 2), implementation-ready entitlement wiring (Step 8/11), brand voice (marketing skills), sales scripts.
- **Do NOT** design full landing page messaging. Do NOT implement billing integration. Do NOT write UX flows — those belong to later steps.
- **Fallback:** If MASTER_PRD.md is missing or Decision 6 is absent, prompt user to run Step 1 first or provide monetization intent directly.

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
  --title "Step 1.5: Offer Architecture in progress" \
  --body "Phases A-E: classification, positioning, pricing, entitlements, hardening" \
  --status doing --priority high --tag "step-1.5,offer-architecture"
```

**If SIGMAHQ_ENABLED — create per-tier tasks after Phase C (pricing locked):**
```bash
for TIER in starter pro enterprise; do
  kanban-md create --dir "$WORKSPACE" \
    --title "Step 1.5: Tier — $TIER defined" \
    --body "Pricing, entitlements, and packaging locked for $TIER tier" \
    --status done --priority medium --tag "step-1.5,offer-architecture,tier"
done
```

**If SIGMAHQ_ENABLED — on OFFER_ARCHITECTURE.md completion (Phase E):**
```bash
TASK_ID=$(kanban-md list --dir "$WORKSPACE" --status doing --tag "step-1.5" --json | jq -r '.[0].id')
kanban-md move --dir "$WORKSPACE" "$TASK_ID" done
```

If SigmaHQ is not configured, skip — file-based artifacts remain the sole handoff mechanism.

---

## Monetization Categories

Step 1.5 covers three categories. Phase A determines which apply.

| Category | Models | Price Range | Conversion Mechanism |
|----------|--------|-------------|---------------------|
| **SaaS / Digital Product** | Subscription, usage-based, seat-based, freemium, hybrid, one-time | $0-$500/mo | Self-serve checkout, trial, free tier |
| **High-Ticket** | Coaching, courses, consulting, masterminds, done-for-you, workshops | $997-$50K+ | Webinar, VSL + application, discovery call, value ladder |
| **AI-Native** | Outcome-based, action/workflow credits, premium AI seats, hybrid base+usage | Variable | Credits, per-resolution, metered usage |

Products can span multiple categories (e.g., SaaS platform + high-ticket consulting tier).

---

## Framework Library

Use the frameworks that match the monetization category. Skip frameworks that don't apply — don't pad.

### Hormozi Value Equation (all categories)

Value = (Dream Outcome x Perceived Likelihood) / (Time Delay x Effort & Sacrifice)

- Dream Outcome vague → offer is vague.
- Perceived Likelihood weak → needs proof, case studies, or guarantee.
- Time Delay long → compress time-to-first-value.
- Effort & Sacrifice high → simplify onboarding or remove switching costs.

### Hormozi Grand Slam Offer (all categories)

An offer so good people feel stupid saying no. Components:
- **Dream outcome** — the transformation, not the deliverable
- **Value stack** — pile value until price feels absurd
- **Guarantee / risk reversal** — remove buyer's risk entirely
- **Scarcity** — only when real and defensible (do NOT invent fake scarcity)
- **Urgency** — only when real (cohort close, limited seats, launch window)
- **Bonuses** — solve objections or compress time-to-value, not pad the offer

### April Dunford Positioning (all categories — 2nd edition, Feb 2026)

**Four pre-decisions (resolve BEFORE positioning):**
1. **Positioning readiness** — is the product/offer mature enough to position deliberately?
2. **Audience type** — customer positioning (not investor, not employee)
3. **Scope** — positioning a single product, company, suite, or hybrid?
4. **Deal champion** — who creates shortlists, coordinates stakeholders, recommends?

**Five positioning components:**
1. Competitive alternatives (what they'd do without you)
2. Differentiated capabilities (what you do that alternatives can't)
3. Differentiated value (what customers get because of those capabilities)
4. Best-fit customers (who cares most about that value)
5. Market category (frame that makes your value easiest to understand)

### JTBD / Bob Moesta Purchase Context (all categories)

- What struggling moment triggered the search?
- What would the buyer do if this product/offer didn't exist?
- What forces push them to switch vs. stay?
- What are they hiring and firing?
- What clues indicate willingness to pay?

### Russell Brunson Value Ladder (high-ticket + hybrid)

Five tiers of progressive commitment:
1. **Free** — lead magnet (checklist, training, tool) — $0
2. **Front-end** — tripwire / self-liquidating offer — $7-$97
3. **Core** — main offer (course, membership, SaaS) — $100-$997
4. **Back-end** — premium (coaching, consulting, done-for-you) — $1K-$10K
5. **Peak** — transformative (mastermind, retainer, enterprise) — $10K+

Rule: Each tier reveals the natural next step. Limit choices to 3 max per stage.

### Stack Slide Method (high-ticket)

Six components stacked to build belief progressively:
1. **Opportunity Switch Masterclass** — reframes their belief about the problem
2. **Asset Pack** — tangible tools (templates, dashboards, scripts) that save time immediately
3. **Case Study Breakdowns** — real before/after with specific metrics
4. **Feedback / Community Layer** — accountability, async audits, group support
5. **"Mini Coach" Tool** — calculator, AI tool, or decision flow that scales guidance
6. **Urgent Exclusive Bonus** — time-limited, VIP-only (must be real, not manufactured)

Rule: Each element kills a specific objection. If it doesn't kill an objection or increase certainty, cut it.

### a16z Packaging Models (SaaS + AI-native)

| Model | When to use |
|-------|-------------|
| **Core** | All customers want it, it drives adoption, AI is mission-critical to value prop |
| **Upgrade Tier** | Nice-to-have upsell for most, enhances but doesn't fundamentally change product |
| **Add-On** | Significant value for a small set of power users willing to pay premium |

Warning: AI features that started as premium add-ons have become table stakes (Notion, Salesforce). Don't over-gate what buyers now expect as baseline.

### Chargebee Pricing Archetypes (AI-native — March 2026)

Select based on the **Autonomy-Attribution-Predictability Triangle:**

| Model | Best for | Core logic |
|-------|----------|------------|
| **Outcome-based** | Quantifiable, standardized results | Charge per resolved issue, meeting booked, task completed |
| **Action/Workflow-based** | Multi-step, variable-effort tasks | Credits abstracting heterogeneous actions (Clay burn table, N8N per-workflow) |
| **Hybrid** | Unpredictable workloads | Fixed base fee + usage overage tail |

Selection axes:
- **Value attribution** — how clearly does output tie to customer outcomes?
- **Execution autonomy** — does the agent solve problems without human-in-loop?
- **Workload predictability** — is effort consistent or highly spiky?

### High-Ticket Funnel Types (high-ticket)

| Funnel | Price Range | Structure |
|--------|-------------|-----------|
| **Ascension** | $7-$49 entry → backend | Low-cost entry → bumps/upsells → nurture to high-ticket |
| **Webinar** | $1K-$4K | 1-2 hour presentation → credit card close |
| **VSL + Application** | $5K+ | Video sales letter → application → qualification call → closer |

---

## Phase A — Trigger Validation & Monetization Classification

### Preflight (auto)

1. Run `date +"%Y-%m-%d"`.
2. Read `.sigma/runtime-baseline.json`, `docs/specs/MASTER_PRD.md`, `docs/stack-profile.json`.
3. Read `docs/specs/OFFER_ARCHITECTURE.md` if it already exists.
4. Extract the Step 1 monetization trigger decision (Decision 6).
5. If `research_mode = blocked` → stop. If `reduced` → continue with assumption labels.

### Monetization Classification (sequential decisions)

**Decision 1: Confirm Step 1.5 is needed**
Use AskUserQuestion: "Step 1 flagged monetization. Confirm Step 1.5 should run?"
Options: [Yes — design the offer architecture, Skip — monetization is out of scope for now]

**Decision 2: Monetization category**
Use AskUserQuestion: "What type of monetization?"
Options: [SaaS / Digital Product (subscriptions, usage, freemium), High-Ticket (coaching, courses, consulting, $997+), AI-Native (outcome-based, credits, per-resolution), Hybrid — multiple categories, Other]

**Decision 3: Pricing model**
Based on category, use AskUserQuestion:

If SaaS: Options: [Subscription (monthly/annual), Usage-based (per-unit, per-call), Seat-based, Freemium + paid tiers, Hybrid (base + usage), One-time purchase, Other]

If High-Ticket: Options: [Course / membership ($97-$997), Coaching program ($1K-$5K), Consulting / done-for-you ($5K-$25K), Mastermind / retainer ($10K+), Value ladder (multiple tiers), Other]

If AI-Native: Options: [Outcome-based (per-resolution), Action/workflow credits, Premium AI seats (2-3x), Hybrid base + usage tail, Other]

**Decision 4: Structured monetization needed?**
Use AskUserQuestion: "Does pricing need machine-readable representation (pricing-config.json)?"
Options: [Yes — multiple tiers with distinct entitlements, credits, usage metering, Yes — credit/token system, No — simple pricing, single tier, or high-ticket (no config needed), Not sure — decide after Phase C]

Lock all 4 decisions.

<HARD-GATE>
Do NOT proceed to Phase B until user approves classification.
Use AskUserQuestion: "Monetization classification locked. Approve?"
Options: [Approve — proceed to positioning, Revise — change classification]
</HARD-GATE>

---

## Phase B — Positioning & Purchase Context

### Dunford Pre-Decisions (resolve before positioning)

Use AskUserQuestion for each:

1. **Positioning readiness:** "Is the offer mature enough to position deliberately, or should we draft a positioning thesis to validate?"
2. **Scope:** "Are we positioning a single product, a company, a product suite, or a specific offer tier?"
3. **Deal champion:** "Who is the person who creates shortlists and recommends — what's their role?"

### Research (directive queries based on locked decisions)

1. Search `"[product domain] [category] alternatives competitors 2025 2026"` — find what buyers use today
2. Search `"[primary user] [problem] pricing willingness to pay"` — find WTP signals
3. Search `"[category] pricing benchmarks [price range]"` — find market norms
4. If high-ticket: Search `"[domain] coaching program course pricing conversion"` — find comparable offers

### Required Positioning Sections

Complete these using Dunford + JTBD:

1. **Best-Fit Customer** — who gets the most value, their context, maturity, urgency
2. **Competitive Alternatives** — direct, indirect, status quo, internal workaround
3. **Differentiated Capabilities** — what's meaningfully different (not just technically)
4. **Differentiated Value** — time saved, money made, risk reduced, status gained
5. **Purchase Context** — struggling moment, switching forces, objections, WTP clues
6. **Market Category / Positioning Frame** — the frame that makes your value easiest to buy

<HARD-GATE>
Do NOT proceed to Phase C until user approves positioning.
Use AskUserQuestion: "Positioning complete. Approve?"
Options: [Approve — proceed to pricing architecture, Revise positioning, Research deeper on a specific area]
</HARD-GATE>

---

## Phase C — Pricing, Packaging & Offer Architecture

Branch based on monetization category from Phase A.

### If SaaS / Digital Product

**Required decisions:**
1. **Value metric** — what usage or outcome proxy aligns with customer value? Why is this better than feature gating?
2. **Packaging** (a16z model) — Core / Upgrade Tier / Add-On? What's in each?
3. **Tier design** — what's unlocked, expanded, or metered at each level?
4. **Upgrade path** — starter → pro → team (or equivalent). Expansion logic, overages, trials, downgrades.
5. **Guarantee / risk reversal** — free trial, money-back, SLA, or none? Why?

### If High-Ticket

**Required decisions:**
1. **Value ladder position** — where does this offer sit? (front-end, core, back-end, peak)
2. **Stack Slide components** — which 6 elements? Each must kill a specific objection.
3. **Funnel type** — Ascension, Webinar, or VSL + Application? Why?
4. **Price anchor** — total value of stack vs. price charged. 10x value rule.
5. **Guarantee** — conditional ("do the work, get the result"), unconditional (refund window), or performance-based?
6. **Scarcity / urgency** — cohort close date, limited seats, enrollment window? Must be real.

### If AI-Native

**Required decisions:**
1. **Pricing archetype** (Chargebee triangle) — Outcome-based, Action/Workflow, or Hybrid?
2. **Value attribution** — how clearly does output tie to customer outcomes?
3. **Cost structure** — LLM/infra COGS per request? Margin constraints?
4. **Credit/metering design** — credit burn table, resolution counting, or usage tiers?
5. **Soft caps and alerts** — how do you prevent bill shock?
6. **Guarantee** — SLA, resolution rate guarantee, or satisfaction-based?

### For all categories

Apply Hormozi Value Equation:
- Score Dream Outcome, Perceived Likelihood, Time Delay, Effort & Sacrifice
- If any quadrant scores weak, the offer must address it (stronger guarantee, faster onboarding, simpler workflow)

Apply Grand Slam Offer check:
- Is the value stack so good the price feels absurd?
- Does the guarantee remove buyer risk entirely?
- Would someone feel stupid saying no?

<HARD-GATE>
Do NOT proceed to Phase D until user approves pricing architecture.
Use AskUserQuestion: "Pricing and offer architecture complete. Approve?"
Options: [Approve — map product impact, Revise pricing, Adjust packaging/tiers]
</HARD-GATE>

---

## Phase D — Entitlements & Product Impact

Translate pricing decisions into product, data, billing, and UX consequences.

### If SaaS / AI-Native — map these implications:

**Schema:** subscriptions, plan membership, credits, seats, quotas, overages, ledgers, usage records
**Billing:** payment provider, plan changes, trial/grace handling, renewal/cancellation
**Entitlements:** what's capped, gated, metered, unlocked per tier
**Product UX:** pricing page, upgrade prompts, usage dashboard, limit states, paywall behavior
**Architecture sync:** what Step 2 must absorb, what Step 8/11 must implement

### If High-Ticket — map these implications:

**Funnel infrastructure:** landing page (Step 9), application form, booking system, email sequences
**Delivery platform:** course hosting, community platform, coaching call scheduling
**Payment:** one-time vs payment plans, deposit + balance, high-ticket payment processor
**Content delivery:** module structure, drip schedule, bonus access gating
**Architecture sync:** what Step 2 must absorb (may be minimal for info products)

### pricing-config.json (conditional — SaaS/AI-native only)

Create only when structured monetization needs machine-readable representation.

```json
{
  "$schema": "pricing-config-v1",
  "model": "hybrid",
  "value_metric": "resolution",
  "tiers": {
    "starter": {
      "monthly_price": 29,
      "annual_price": 290,
      "entitlements": { "resolutions_monthly": 100, "team_members": 1, "ai_features": "core" }
    },
    "pro": {
      "monthly_price": 99,
      "annual_price": 990,
      "entitlements": { "resolutions_monthly": 1000, "team_members": 5, "ai_features": "all" }
    }
  },
  "overages": { "enabled": true, "rate_per_unit": 0.10, "unit": "resolution" },
  "trial": { "days": 14, "requires_payment_method": false },
  "guarantee": { "type": "money-back", "window_days": 30 }
}
```

Do NOT create pricing-config.json for high-ticket offers. Use the OFFER_ARCHITECTURE.md narrative sections instead.

<HARD-GATE>
Do NOT proceed to Phase E until user approves product impact mapping.
Use AskUserQuestion: "Product impact mapped. Approve?"
Options: [Approve — write final documents, Revise entitlements, Adjust architecture impact]
</HARD-GATE>

---

## Phase E — Output, Hardening & Handoff

### Mandatory: Run $holes

Before final checkpoint, invoke `$holes` to find:
- Weak positioning or unsupported pricing claims
- Missing entitlement rules or undefined edge cases
- Contradictions between OFFER_ARCHITECTURE.md and MASTER_PRD.md
- Pricing that doesn't pass the Hormozi "feel stupid saying no" test

Fix findings before presenting for approval.

### Write `docs/specs/OFFER_ARCHITECTURE.md`

```markdown
# [Project Name] — Offer Architecture

## Monetization Category
- **Category:** [SaaS / High-Ticket / AI-Native / Hybrid]
- **Model:** [Specific model from Phase A]
- **Research confidence:** [full / reduced]

## Best-Fit Customer & Purchase Context
- Best-fit customer: [specific persona]
- Struggling moment: [what triggered the search]
- Switching forces: [push/pull factors]
- Willingness-to-pay signals: [evidence or assumptions]
- Current alternatives: [what they'd do without this]

## Positioning Frame
- Competitive alternatives: [list]
- Differentiated capabilities: [what you do that alternatives can't]
- Differentiated value: [time saved, money made, risk reduced]
- Market category: [the frame that makes value easiest to understand]

## Pricing Model
- Model: [subscription / usage / outcome / high-ticket / hybrid]
- Value metric: [what proxy for customer value]
- Rationale: [why this model fits the customer and purchase context]

## Packaging / Tier Design
[Table of tiers with entitlements — or value ladder tiers for high-ticket]

## Value Stack (if high-ticket)
| Component | What It Is | Objection It Kills | Standalone Value |
|-----------|-----------|-------------------|-----------------|

## Guarantee / Risk Reversal
- Type: [money-back / conditional / SLA / performance-based]
- Why it works: [how it increases perceived likelihood]

## Scarcity / Urgency
- [Only real drivers — cohort close, limited seats, enrollment window. Do NOT invent fake scarcity.]

## Funnel Architecture (if high-ticket)
- Funnel type: [Ascension / Webinar / VSL + Application]
- Entry point → qualification → conversion mechanism

## Unit Economics
- COGS: [relevant cost notes — LLM inference, delivery, support]
- Margin constraints: [important assumptions]
- Price anchor: [total stack value vs. price charged]

## Product / Architecture Impact
- Schema consequences: [what data models change]
- Billing consequences: [payment provider, plan logic]
- Entitlement consequences: [what's gated, metered, capped]
- UX consequences: [pricing page, upgrade prompts, limits states]
- What Step 2 must inherit: [architecture requirements]
- What Step 8/11 must implement: [implementation requirements]

## Do NOT Build in This Step
- Landing page copy or full conversion messaging (Step 9)
- Billing integration implementation (Step 8/11)
- UX flows or wireframes (Step 3/5)
- Sales scripts or outbound sequences (marketing commands)

## Sync Summary
- MASTER_PRD sections updated: [list]
- stack-profile fields updated: [list]
- pricing-config.json created: [yes/no + why]
```

### Sync actions

- Update `MASTER_PRD.md` monetization section with locked pricing decisions
- Update `docs/stack-profile.json` with payments, pricing, entitlement fields
- Ensure no contradictions between narrative (OFFER_ARCHITECTURE.md) and machine-readable (pricing-config.json)

### Writing Standards (embedded — apply to ALL Step 1.5 outputs)

- No stock AI phrases: "Let's dive in", "Game-changing", "Seamless", "Robust", "Delve", "Navigate challenges"
- Start with decisions, not industry commentary
- Commit to pricing rationale — no "might work" / "could potentially" hedging
- No breathless enthusiasm about the offer — let the value stack speak
- Write like a pricing strategist with conviction, not a blog post about pricing

### Success Criteria

- [ ] Step 1 state and Decision 6 were read and used
- [ ] Monetization category and model explicitly classified
- [ ] Positioning is evidence-backed or clearly labeled assumptions
- [ ] Purchase context and deal champion are explicit
- [ ] Pricing model and value metric are justified
- [ ] Guarantee and risk reversal are designed (not placeholder)
- [ ] Product/architecture consequences are explicit
- [ ] pricing-config.json created only when structured monetization requires it
- [ ] MASTER_PRD.md synchronized
- [ ] stack-profile.json synchronized
- [ ] $holes pass completed
- [ ] User approved before Step 2
- [ ] SigmaHQ kanban tasks created per tier (when configured)

<HARD-GATE>
FINAL GATE — Do NOT proceed to Step 2 without explicit approval.
Use AskUserQuestion: "Step 1.5 complete. Ready for Step 2 — Architecture?"
Options: [Proceed to Step 2, Revise offer architecture, Run additional research]
</HARD-GATE>

---

<verification>
## Step 1.5 Verification Schema

### Required Files (24 points)

| File | Path | Requirement | Points |
|------|------|-------------|--------|
| Offer Architecture | docs/specs/OFFER_ARCHITECTURE.md | Required | 12 |
| MASTER_PRD sync | docs/specs/MASTER_PRD.md | Monetization section updated | 6 |
| Stack profile sync | docs/stack-profile.json | Pricing/payments state updated | 6 |

### Conditional Files (8 points)

| File | Path | Requirement | Points |
|------|------|-------------|--------|
| Pricing Config | docs/specs/pricing-config.json | Required only for structured SaaS/AI monetization | 8 |

### Content Quality (48 points)

| Check | Points |
|-------|--------|
| Competitive alternatives are explicit (Dunford) | 6 |
| Differentiated value is explicit (not just capabilities) | 6 |
| Purchase context with struggling moment and switching forces (JTBD) | 6 |
| Pricing model and rationale present | 6 |
| Value metric or packaging logic justified | 6 |
| Guarantee / risk reversal designed (not placeholder) | 6 |
| Value Equation assessment completed (Hormozi) | 4 |
| Product/entitlement consequences documented | 4 |
| Negative requirements ("Do NOT build") section present | 2 |
| Build order implications for Step 2 documented | 2 |

### Sync & Approval (20 points)

| Check | Points |
|-------|--------|
| MASTER_PRD and OFFER_ARCHITECTURE agree on monetization | 5 |
| stack-profile reflects pricing decisions | 5 |
| $holes pass completed | 5 |
| User approved final output | 5 |
| SigmaHQ kanban tasks created per tier (when configured) | 1 |

### Scoring

- **95+/100** = ready for Step 2
- **80-94** = revise before proceeding
- **<80** = incomplete
- If Step 1.5 is not required: report `Skipped (Not monetized)` — do not fail the workflow.
</verification>

$END$
