import type { Agent, Holding } from "../atlas";
import type { SubAgentCopy } from "./types";
import { flagshipName } from "./types";

/**
 * Vertical-specific copy layered on top of shared defaults (see generic.ts).
 * Merge wins on overlapping keys.
 */
export function holdingFlavor(holding: Holding, agent: Agent): Partial<SubAgentCopy> {
  const fn = flagshipName(holding);
  const slug = `${holding.slug}/${agent.slug}`;

  if (slug === "fidelis/intake") {
    return fidelisIntake(agent, fn);
  }

  switch (holding.slug) {
    case "tide":
      return tideFlavor(agent, fn);
    case "lore":
      return loreFlavor(agent, fn);
    case "fidelis":
      return fidelisFlavor(agent, fn);
    case "helios":
      return heliosFlavor(agent, fn);
    case "alder":
      return alderFlavor(agent, fn);
    case "mortar":
      return mortarFlavor(agent, fn);
    case "lex":
      return lexFlavor(agent, fn);
    case "seal":
      return sealFlavor(agent, fn);
    default:
      return {};
  }
}

function tideFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is how ${fn} stays operational — not just visible. ${agent.name} carries guest-facing and GM-facing work in Tide's cinematic register: the property's voice, the morning read, the recovery loop.`,
    whyH2: "Operators buy lanes, not logos.",
    whyP1:
      "Tide wins when every inbound and every shift handoff has a named owner in software. This agent is that owner for its lane — priced and onboarded like a product.",
    replaceH2: "Channels without choreography.",
    replaceSub: "What a design hotel runs before guest memory and revenue discipline live in one terminal.",
    before: [
      "Guest signal scattered across OTA, inbox, WhatsApp",
      "GM standup with no shared queue",
      "RevPAR story divorced from service recovery",
      "Brand voice drifts by shift",
      "No experiment log for growth bets",
    ],
    after: [
      "Threads route with property grammar",
      "Standup brief from live operational queue",
      "Recovery tied to revenue context",
      "Voice locked to brand kit",
      "Scout-ready experiment registry when relevant",
    ],
    howH2: "Sense guest + owner · decide · act · measure.",
    steps: [
      { label: "01 · Ingest", text: `Capture events, messages, PMS facts ${agent.name} needs — structured once.` },
      { label: "02 · Align", text: "Match to property voice, SLA, and GM priorities for this week." },
      { label: "03 · Execute", text: "Ship the guest or internal artifact — ticket, message, rate move, board update." },
      { label: "04 · Learn", text: "Feed outcomes to Guestbook, Revenue, and Scout without duplicate entry." },
    ],
    terminalTitle: `Property pulse · ${agent.name}.`,
    useH2: "A coastal GM, one shoulder season.",
  };
}

function loreFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is the scholarly lane inside Muse — where cohort truth, syllabus memory, and faculty load meet. ${agent.name} answers the job educators actually sell: outcomes per learner, not another LMS login.`,
    whyH2: "Programs sell outcomes · agents sell proof.",
    replaceH2: "Courseware without cohort truth.",
    replaceSub: "What residencies run before tutor Q&A, path, and alumni are one record.",
    before: [
      "Syllabus in Notion · cohort in Slack",
      "Office hours as DMs",
      "No shared learner risk signal",
      "Alumni treated as a list · not a network",
    ],
    after: [
      "Muse memory ties tutor, path, lab, desk",
      "Cohort board shows risk without surveillance theater",
      "Dossier stays the file of record",
      "Alumni consent-gated for mentorship",
    ],
    howH2: "Admit context · teach · evidence · alumni loop.",
    steps: [
      { label: "01 · Context", text: "Pull learner, syllabus, and cohort state from Muse graph." },
      { label: "02 · Teach", text: `Run ${agent.name}'s job with language policy + accessibility lanes.` },
      { label: "03 · Evidence", text: "Capture artifacts, feedback, and risk flags with consent." },
      { label: "04 · Alumni", text: "Route wins to alumni and future cohorts without spam." },
    ],
    terminalTitle: `Cohort truth · ${agent.name}.`,
    useH2: "A founder residency · one syllabus.",
  };
}

function fidelisFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is advisory infrastructure — books, filings, and counsel share one entity graph under ${fn}. ${agent.name} is the seat finance and operators recognize on the invoice.`,
    whyH2: "Entities multiply · attention doesn't.",
    replaceH2: "Close week without a spine.",
    replaceSub: "What multi-entity founders run before Ledger, Vault, and Filing argue about truth.",
    before: [
      "Close in QuickBooks · files in Drive",
      "Filings tracked in email",
      "Counsel briefings rebuilt from scratch",
      "No chain between document and journal",
    ],
    after: [
      "One Passport · entities linked",
      "Vault hash lines up with Ledger entry",
      "Filing calendar from the same chart",
      "Counsel reads the month the books close",
    ],
    howH2: "Entity truth · policy · artifact · audit.",
    steps: [
      { label: "01 · Scope", text: "Identify entities, nexus, and deadlines that touch this workflow." },
      { label: "02 · Classify", text: "Map documents and money movement to the chart + policy." },
      { label: "03 · Produce", text: "Generate filing, journal, or counsel brief — versioned." },
      { label: "04 · Defend", text: "Archive with rationale for audit and next month." },
    ],
    terminalTitle: `Desk read · ${agent.name}.`,
    useH2: "A three-entity founder · one close.",
  };
}

function fidelisIntake(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `Intake is the front door for every entity you add to Fidelis — cap table, EIN, owners, nexus hints, and the documents that make Ledger honest on day one. ${fn} is the system; Intake is the one-pass onboarding that stops "we'll fix the books later."`,
    whyH2: "Garbage in · expensive forever.",
    whyP1:
      "Most firms onboard entities via PDF email chains. Intake turns onboarding into structured data — so Vault, Ledger, and Filing argue about the same facts.",
    replaceH2: "Email chains · not onboarding.",
    replaceSub: "What founders send before a clean entity graph exists.",
    before: [
      "Entity details in forwarded threads",
      "EIN and address mismatches across tools",
      "Cap table screenshots instead of truth",
      "No single owner of 'ready for close'",
    ],
    after: [
      "Structured intake with validation",
      "Owners · signers · related parties linked",
      "Documents land in Vault with hash + tags",
      "Ledger opens with opening balances staged",
    ],
    howH2: "Collect · verify · vault · open books.",
    steps: [
      { label: "01 · Collect", text: "Entity questionnaire, cap table upload, ID docs — one flow." },
      { label: "02 · Verify", text: "Cross-check EIN, address, and signer against policy; flag conflicts." },
      { label: "03 · Vault", text: "Chain documents with retention; counsel review queue if needed." },
      { label: "04 · Open", text: "Promote opening balances and chart to Ledger with audit trail." },
    ],
    terminalTitle: "New entity · intake queue.",
    terminalSub: "What the desk sees when a founder adds HoldCo #3.",
    terminalBody: `$ lyra intake open --entity NEW-ENTITY-07

┌─ Intake ─────────────────────────────────────
│ Name .......... Aurora Labs HoldCo LLC
│ EIN ........... 84-XXXXXXX (verified)
│ Nexus ......... CA · DE · (remote payroll NY)
│ Owners ........ 2  ·  cap table v3 uploaded
└──────────────────────────────────────────────

$ lyra intake docs --status

  ✓ Formation · stamped  ·  Vault V-9921
  ✓ Banking resolution   ·  Vault V-9922
  ▲ Payroll registration · pending state portal

$ lyra intake promote --to ledger

  → Opening balances staged  ·  GL-2026-04-INT-07
  → Counsel notified  ·  no flags

  // static preview`,
    useH2: "Three entities in ninety days.",
    useSub: "Founder-led stack · anonymized.",
    useBlocks: [
      { label: "00 · Before", text: "Each entity onboarded by a different CPA assistant · four chart variants." },
      { label: "01 · Week two", text: "Second and third entities reuse intake schema · Vault + Ledger aligned." },
      { label: "02 · Quarter", text: "Close prep time −35% · counsel stops rebuilding entity briefs." },
    ],
    stats: [
      { label: "Typical time", value: "~18 min" },
      { label: "Doc types", value: "35+" },
      { label: "Vault link", value: "native" },
      { label: "Target", value: "P2" },
    ],
    ctaBody:
      "We migrate your existing entities once — then Intake is how every new subsidiary, blocker, and blocker LLC enters the graph cleanly.",
  };
}

function heliosFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is the wealth lane inside Helios — patient, quiet, generational. ${fn} is the household read; ${agent.name} is the specialist surface for trusts, estates, yield, and family-office work that can't stay in a spreadsheet footnote.`,
    whyH2: "Wealth is a graph · not a PDF.",
    replaceH2: "Statements without decisions.",
    replaceSub: "What households run before distributions, minutes, and portfolio truth share one timeline.",
    before: [
      "Custodian PDFs · no household graph",
      "Trust terms in attorney folders only",
      "Yield sitting idle · nobody noticed",
    ],
    after: [
      "Household + entity IDs across agents",
      "Trust + estate context next to portfolio",
      "Minutes and distributions with citations",
    ],
    howH2: "Gather truth · model · approve · archive.",
    steps: [
      { label: "01 · Gather", text: "Pull accounts, positions, trust docs, beneficiary lists — consent-gated." },
      { label: "02 · Model", text: "Run scenario vs policy: liquidity, tax, estate constraints." },
      { label: "03 · Approve", text: "Route to family office / counsel with Attest-ready package when needed." },
      { label: "04 · Archive", text: "Write to Memory + Vault with lineage for next quarter." },
    ],
    terminalTitle: `Household window · ${agent.name}.`,
    useH2: "A $12M liquid household · two trusts.",
  };
}

function atriaFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is Kairos's foyer — one guided front door before Intake, Protocol, and Labs fan out. Evidence still matters, but the first session is about trust: NDA gates, locale routing, pilot caps, and a clean handoff when someone is truly inside the program.`,
    whyH2: "The first session sets the trust curve.",
    whyP1: `Hotels do not drop guests in the lobby; longevity should not drop households mid-signup. ${agent.name} sequences consent, language, and corporate pilot rules so Kairos feels like a front desk — not a form dump.`,
    whyP2: `Intake owns biomarkers and baseline; ${agent.name} owns the threshold — finance and clinical both see when a household is "inside" versus browsing.`,
    replaceH2: "Confetti onboarding · dead handoffs.",
    replaceSub: "What teams run before guided entry, locale, and intake unlock share one rail.",
    before: [
      "Signup form · then silence",
      "Pilot NDA lost in email threads",
      "English-only when half the household prefers Spanish",
    ],
    after: [
      "Foyer completion → Intake unlocked",
      "Corporate pilots with seat caps visible",
      "Grammar route on before sensitive questions",
    ],
    howH2: "Welcome · gate · route · unlock.",
    steps: [
      { label: "01 · Welcome", text: "Household or corporate pilot context — who is entering Kairos." },
      { label: "02 · Gate", text: "NDA · consent · locale before clinical questions." },
      { label: "03 · Route", text: "Grammar and tone lock; human escalation when trust breaks." },
      { label: "04 · Unlock", text: "Hand off to Intake with audit trail; streaks belong in Cadence." },
    ],
    terminalTitle: `Foyer desk · ${agent.name}.`,
    terminalSub: "Static preview — production foyer ships with the first design partner cohort.",
    terminalBody: `$ lyra ${agent.slug} foyer --holding alder

┌─ KAIROS · FOYER ───────────────────────────────────────
│ Session ....... guided
│ Locale ........ EN · ES route ready
│ Intake lock ... until foyer complete
└────────────────────────────────────────────────────────

  pilot_seats ... 12 / 12 claimed
  nda_gate ..... 1 pending

  // static preview`,
    useH2: "Household K-0007 · corporate pilot · twelve seats.",
    useBlocks: [
      {
        label: "00 · Before",
        text: "Households abandoned the flow after page two; pilots had no single NDA source of truth.",
      },
      {
        label: "01 · Pilot",
        text: "Foyer completion rate visible; Intake opens only when gates are green.",
      },
      {
        label: "02 · Scale",
        text: `${fn} stays the clinical read — ${agent.name} keeps the threshold disciplined as programs multiply.`,
      },
    ],
  };
}

function alderFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  if (agent.slug === "atria") return atriaFlavor(agent, fn);
  return {
    heroLede: `${agent.name} sits in Kairos's calm register — evidence-first, weekly cadence. ${agent.name} is how longevity work stays tied to labs, protocols, and the streaks that actually matter for this household.`,
    whyH2: "Health isn't a dashboard · it's a plan.",
    replaceH2: "Trackers without a physician-grade record.",
    replaceSub: "What founders run before biomarkers, protocols, and cadence share one graph.",
    before: [
      "PDF labs · no trend",
      "Supplements from podcasts",
      "Spouse protocols completely separate",
    ],
    after: [
      "Trends across quarters · flagged early",
      "Protocol diffs weekly · travel-aware",
      "Household memory with privacy boundaries",
    ],
    howH2: "Measure · plan · coach · review.",
    steps: [
      { label: "01 · Measure", text: "Ingest labs, wearables, and subjective check-ins — structured." },
      { label: "02 · Plan", text: "Align protocol to goals and contraindications; plain language." },
      { label: "03 · Coach", text: "Route nudges to Cadence + Concierge-M when human touch helps." },
      { label: "04 · Review", text: "Quarterly evidence review with audit trail for MD handoff." },
    ],
    terminalTitle: `Household brief · ${agent.name}.`,
    useH2: "Two adults · one minor · twelve weeks.",
  };
}

function blueprintFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is the drawing set as system of record — not a bucket of PDFs. Revisions, RFI threads, and permit-ready sheets stay on one rail so MEP, architect, and GC all cite the same issue and version.`,
    whyH2: "Jobs die when sheets disagree.",
    whyP1: `RFIs live in email while the set moves in Procore; plan check asks for v4 and the field still prints v2. ${agent.name} keeps set identity, open threads, and archive lineage tight enough for pay apps and TCO.`,
    whyP2: `${fn} still owns money in motion; ${agent.name} is the semantic layer — what was issued, what is in clash, what landed in the vault.`,
    replaceH2: "Sheets without a spine.",
    replaceSub: "What teams run before revisions, RFIs, and permit packages share one set ID.",
    before: [
      "ASIs in one drive · RFIs in another",
      "Coordination meetings with three sheet dates",
      "Archive packets that do not match the lender set",
    ],
    after: [
      "Active sets + open RFIs in one read",
      "Clash and coordination rows tied to zones",
      "Issued-for-permit traces to vault ASIs",
    ],
    howH2: "Issue · thread · coordinate · archive.",
    steps: [
      { label: "01 · Issue", text: "Cut sheets for permit, bid, and field with explicit revision stamps." },
      { label: "02 · Thread", text: "RFI / submittal queue with ball-in-court and link to sheet." },
      { label: "03 · Coordinate", text: "MEP / structural overlays — clash status by zone, not by rumor." },
      { label: "04 · Archive", text: "ASI + CO land in vault; draw packages cite the same revision + CO IDs." },
    ],
    terminalTitle: `Drawing desk · ${agent.name}.`,
    terminalSub: "Static preview — live set sync ships with Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} sets --holding mortar

┌─ MORTAR · BLUEPRINT ───────────────────────────────────
│ Active sets ... 8
│ Open RFIs ...... 5
│ Sheets due 7d .. 14
└────────────────────────────────────────────────────────

  P-0042 · L3 ..... issued · v4
  MEP ............. clash · 3 zones
  ASI-12 .......... vault linked

  // static preview`,
    useH2: "Hotel core-and-shell · eight active sets · MEP in review.",
    useBlocks: [
      {
        label: "00 · Before",
        text: "Permit reviewer and superintendent referenced different sheet dates; RFIs duplicated across inboxes.",
      },
      {
        label: "01 · Pilot",
        text: "One rail for sets + threads; clash rows visible next to issued packages.",
      },
      {
        label: "02 · Scale",
        text: `${fn} stays the money spine — ${agent.name} keeps the built world aligned as jurisdictions and trades multiply.`,
      },
    ],
  };
}

function permitFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is the jurisdiction layer — every filing, inspector, and condition on one clock. Blueprint can be perfect; ${agent.name} is how the job actually gets legal to build and legal to close.`,
    whyH2: "Plan check does not run on your spreadsheet.",
    whyP1: `Building, fire, health, and utilities each want a different packet; variances and TCO targets slip when no one owns the cross-agency timeline. ${agent.name} tracks review state, hearings, and conditions so supers and owners see the real critical path.`,
    whyP2: `${fn} still signs the money; ${agent.name} signs the gates — issued permits, open corrections, and handoff to inspection.`,
    replaceH2: "Agencies without a single queue.",
    replaceSub: "What teams run before jurisdictions, reviews, and TCO targets share one filing rail.",
    before: [
      "Plan check status living in three inboxes",
      "Fire variance date known only to the expeditor",
      "TCO on a slide deck, not tied to open corrections",
    ],
    after: [
      "Jurisdictions + in-review counts in one read",
      "Agency rows with week / hearing / hold semantics",
      "YTD issued count next to the live target date",
    ],
    howH2: "File · track · hear · close.",
    steps: [
      { label: "01 · File", text: "Package per jurisdiction from Blueprint revision + CO IDs." },
      { label: "02 · Track", text: "Plan check weeks, resubmits, and corrections with owner." },
      { label: "03 · Hear", text: "Variances and appeals — date, board, outcome on the rail." },
      { label: "04 · Close", text: "TCO / CO targets tied to open agency conditions + field status." },
    ],
    terminalTitle: `Permit desk · ${agent.name}.`,
    terminalSub: "Static preview — live filing sync ships with Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} filings --holding mortar

┌─ MORTAR · PERMIT ──────────────────────────────────────
│ Jurisdictions .. 4
│ In review ...... 3
│ Issued YTD ..... 11
└────────────────────────────────────────────────────────

  Building · ATX .. plan check · wk 2/4
  Fire · variance . hearing · Mar 3
  TCO target ...... Aug 14

  // static preview`,
    useH2: "Hotel re-stack · four agencies · TCO path in view.",
    useBlocks: [
      {
        label: "00 · Before",
        text: "Superintendent and owner learned about fire variance the day before the hearing.",
      },
      {
        label: "01 · Pilot",
        text: "Agency queue visible next to jurisdictions and YTD issued; TCO row neutral until conditions clear.",
      },
      {
        label: "02 · Scale",
        text: `${fn} stays the commercial spine — ${agent.name} keeps public-side gates honest as portfolios add projects.`,
      },
    ],
  };
}

function crewFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is who is allowed on the slab today — subs, gates, and safety briefs tied to the actual scope. Permits say you may build; ${agent.name} says who is in the lift lane and who signed the JHA.`,
    whyH2: "Headcount without accountability is just crowding.",
    whyP1: `GCs lose hours reconciling badged bodies to pay apps and near-miss reports. ${agent.name} keeps headcount, tier, and stand-down completion next to the trade rows that matter for today's pour or energization.`,
    whyP2: `${fn} still closes the money; ${agent.name} closes the gate — who was on site, under which sub, with which orientation status.`,
    replaceH2: "WhatsApp headcount · paper sign-in.",
    replaceSub: "What supers run before roster, tiers, and safety events share one project clock.",
    before: [
      "Crew totals wrong until payroll argues",
      "Lift conflicts discovered at the daily",
      "Stand-down attendance in a photo album",
    ],
    after: [
      "On-site count + sub tiers in one pulse",
      "Trade rows with ok / hold / complete semantics",
      "Near-miss and stand-down stats on the same rail",
    ],
    howH2: "Gate · brief · deploy · reconcile.",
    steps: [
      { label: "01 · Gate", text: "Badging, orientation, and geofence rules per trade tier." },
      { label: "02 · Brief", text: "JHA + tool talks — sign-in tied to scope and time window." },
      { label: "03 · Deploy", text: "Who is in which zone; holds when crane or lift conflicts fire." },
      { label: "04 · Reconcile", text: "Headcount and hours posture for Ledger-C without a second spreadsheet." },
    ],
    terminalTitle: `Roster desk · ${agent.name}.`,
    terminalSub: "Static preview — live time-and-gates sync ships with Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} roster --holding mortar

┌─ MORTAR · CREW ────────────────────────────────────────
│ On site today .. 47
│ Sub tiers ...... 9
│ Near-miss 30d .. 0
└────────────────────────────────────────────────────────

  Concrete · Pod A . pour 06:00 · wx OK
  Elec · mezz ....... hold · lift conflict
  Safety stand-down . complete · sign-in 100%

  // static preview`,
    useH2: "Core pour day · 47 bodies · nine tiers · zero near-miss streak.",
    useBlocks: [
      {
        label: "00 · Before",
        text: "Owner asked for headcount; superintendent texted three different numbers before lunch.",
      },
      {
        label: "01 · Pilot",
        text: "Roster pulse next to trade rows; electrical hold visible before the pour call.",
      },
      {
        label: "02 · Scale",
        text: `${fn} stays the commercial spine — ${agent.name} keeps field truth honest when portfolios stack concurrent jobs.`,
      },
    ],
  };
}

function siteFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is the superintendent's daily — photos, delays, and weather in one read, not forty threads. Crew says who is on slab; ${agent.name} says what the day actually did to the critical path.`,
    whyH2: "If the daily lives in chat, the job lives in rumor.",
    whyP1: `Owners and lenders ask for truth at different altitudes; supers drown in voice notes. ${agent.name} keeps photo sets, open delays, and rain days next to the rows that explain crane swings, laydown, and owner walks.`,
    whyP2: `${fn} still owns draws; ${agent.name} owns the narrative — what happened on site, with receipts, before money argues about it.`,
    replaceH2: "Camera rolls · lost context.",
    replaceSub: "What field leaders run before photos, delays, and visits share one day ID.",
    before: [
      "Weather call in one group · photos in another",
      "Truck delays discovered at the weekly OAC",
      "Owner walk time floating in someone's calendar",
    ],
    after: [
      "Photo cadence + open delays in one pulse",
      "Logistics rows with ok / warn / neutral tone",
      "Rain and weather risk visible next to swing plans",
    ],
    howH2: "Capture · classify · escalate · publish.",
    steps: [
      { label: "01 · Capture", text: "Geo-tagged photo sets tied to zone and trade." },
      { label: "02 · Classify", text: "Delay reasons, weather codes, and responsible party on the rail." },
      { label: "03 · Escalate", text: "Lift conflicts and laydown issues surface before the pour window." },
      { label: "04 · Publish", text: "Daily export posture for owner + lender without reformatting." },
    ],
    terminalTitle: `Site daily · ${agent.name}.`,
    terminalSub: "Static preview — live field log sync ships with Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} daily --holding mortar

┌─ MORTAR · SITE ────────────────────────────────────────
│ Photo sets 7d .. 28
│ Open delays .... 2
│ Rain days YTD .. 4
└────────────────────────────────────────────────────────

  Day 127 · wx ..... clear · crane 14:00
  Laydown · log .... truck 4 late · 55m
  Owner walk ....... Fri 09:00

  // static preview`,
    useH2: "Day 127 · crane swing locked · two delays tracked.",
    useBlocks: [
      {
        label: "00 · Before",
        text: "Superintendent retyped the daily three times — owner, lender, and PM each got a different story.",
      },
      {
        label: "01 · Pilot",
        text: "Pulse next to day rail; logistics warn visible before the swing call.",
      },
      {
        label: "02 · Scale",
        text: `${fn} stays the commercial spine — ${agent.name} keeps field narrative consistent across concurrent projects.`,
      },
    ],
  };
}

function ledgerCFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is construction money with receipts — draws, retainage, change orders, and lien posture in one pass. Site tells the story; ${agent.name} tells the bank why the package is defensible.`,
    whyH2: "Lenders do not buy vibes · they buy packages.",
    whyP1: `COs stall on the wrong signature; waivers miss a tier; retainage math drifts from the GMP. ${agent.name} keeps draw number, held dollars, and open CO count next to rows that show lender review, architect sign, and waiver file state.`,
    whyP2: `${fn} is still the program spine; ${agent.name} is the commercial truth layer owners and lenders can audit.`,
    replaceH2: "Draws without a chain.",
    replaceSub: "What GCs run before draws, COs, and waivers share one ledger ID.",
    before: [
      "CO folders that do not match the pay app",
      "Lien waivers chased the week of funding",
      "Retainage tracked only in the PM's notebook",
    ],
    after: [
      "Draw cycle + retainage + open COs in one pulse",
      "Queue rows for lender, architect, and waiver status",
      "Package cites the same revision + CO IDs as Blueprint",
    ],
    howH2: "Submit · certify · withhold · release.",
    steps: [
      { label: "01 · Submit", text: "Pay app tied to Site evidence and approved CO schedule." },
      { label: "02 · Certify", text: "Lender + owner review windows with explicit aging." },
      { label: "03 · Withhold", text: "Retainage policy encoded — no surprise holds at wire." },
      { label: "04 · Release", text: "Tiered waivers and lien posture before next draw drops." },
    ],
    terminalTitle: `Construction ledger · ${agent.name}.`,
    terminalSub: "Static preview — live draw sync ships with Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} draws --holding mortar

┌─ MORTAR · LEDGER-C ────────────────────────────────────
│ Draw # ........ 4
│ Retainage ..... $420k
│ Open COs ...... 3
└────────────────────────────────────────────────────────

  Draw #4 ......... lender review · 4d
  CO-018 · steel .. awaiting architect sign
  Lien waiver t2 .. on file

  // static preview`,
    useH2: "Draw 4 in review · three COs open · waivers clean through tier-2.",
    useBlocks: [
      {
        label: "00 · Before",
        text: "Lender asked for the CO log; the team rebuilt it from email over a weekend.",
      },
      {
        label: "01 · Pilot",
        text: "Draw posture next to CO and waiver rows; architect hold visible before funding call.",
      },
      {
        label: "02 · Scale",
        text: `${fn} keeps portfolio programs aligned — ${agent.name} keeps money movement provable job by job.`,
      },
    ],
  };
}

function punchFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is the bracketed finish — owner punch, warranty clock, and O&M readiness without losing the thread after substantial. Ledger-C got you funded; ${agent.name} gets you out clean.`,
    whyH2: "Close-out is a product · not a mood.",
    whyP1: `Paint rework, MEP startup, and binder drafts live in different inboxes until someone misses TCO. ${agent.name} keeps open punch, warranty starts, and substantial target next to rows that read like a superintendent's last mile.`,
    whyP2: `${fn} closed the money; ${agent.name} closes the building — systems signed off, owner list trending, handoff packet versioned.`,
    replaceH2: "Punch lists in screenshots.",
    replaceSub: "What teams run before punch, warranty, and handoff share one close-out rail.",
    before: [
      "Owner walk items scattered across three apps",
      "Warranty start dates argued after move-in",
      "O&M binders shipping as a zip with no index",
    ],
    after: [
      "Open punch + warranty + substantial target in one pulse",
      "Trade/system rows with warn / ok / neutral",
      "Handoff artifacts versioned next to startup sign-offs",
    ],
    howH2: "List · verify · startup · bind.",
    steps: [
      { label: "01 · List", text: "Owner punch with photos, responsible trade, and due window." },
      { label: "02 · Verify", text: "Rework scheduled vs complete; no silent holds before substantial." },
      { label: "03 · Startup", text: "MEP / life-safety sign-offs with names, dates, and exceptions." },
      { label: "04 · Bind", text: "O&M, warranties, and as-builts packaged for owner + facilities." },
    ],
    terminalTitle: `Close-out desk · ${agent.name}.`,
    terminalSub: "Static preview — live punch sync ships with Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} closeout --holding mortar

┌─ MORTAR · PUNCH ───────────────────────────────────────
│ Open punch .... 38
│ Warranty starts 12
│ Substantial ... target 42d
└────────────────────────────────────────────────────────

  L2 · paint ....... rework scheduled
  MEP startup ...... signed off
  O&M binders ...... draft v2

  // static preview`,
    useH2: "Thirty-eight open · twelve warranty clocks · substantial in sight.",
    useBlocks: [
      {
        label: "00 · Before",
        text: "Facilities opened the first ticket and the GC could not find the startup PDF.",
      },
      {
        label: "01 · Pilot",
        text: "Close-out pulse next to systems rail; paint rework warns before owner walk.",
      },
      {
        label: "02 · Scale",
        text: `${fn} keeps draws honest — ${agent.name} keeps handoff disciplined across a portfolio of finishes.`,
      },
    ],
  };
}

function mortarFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  if (agent.slug === "blueprint") return blueprintFlavor(agent, fn);
  if (agent.slug === "permit") return permitFlavor(agent, fn);
  if (agent.slug === "crew") return crewFlavor(agent, fn);
  if (agent.slug === "site") return siteFlavor(agent, fn);
  if (agent.slug === "ledger-c") return ledgerCFlavor(agent, fn);
  if (agent.slug === "punch") return punchFlavor(agent, fn);
  return {
    heroLede: `${agent.name} is on-site truth — drawings, agencies, crews, dailies. ${fn} is the project ledger; ${agent.name} is how superintendents and owners stop losing the thread between permit and punch.`,
    whyH2: "Builds leak in the seams.",
    replaceH2: "Groups without a ledger.",
    replaceSub: "What jobs run before RFIs, draws, and site notes share a project ID.",
    before: [
      "Sheets in one bucket · RFIs in email",
      "Crew counts wrong three days a week",
      "Photo proof not tied to pay apps",
    ],
    after: [
      "One project code across agents",
      "Site + Crew + Blueprint linked",
      "Draw packages cite revision + CO",
    ],
    howH2: "Plan · field · document · pay.",
    steps: [
      { label: "01 · Plan", text: "Sync schedule, permits, and critical path to site reality." },
      { label: "02 · Field", text: "Capture voice, photo, and labor with geofence + role." },
      { label: "03 · Document", text: "RFI/submittal with revision tie to Blueprint." },
      { label: "04 · Pay", text: "Package for Ledger-C with lien + waiver posture." },
    ],
    terminalTitle: `Job site · ${agent.name}.`,
    useH2: "Hotel renovation · $8M GMP.",
  };
}

function lexFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is the practice lane inside Lex — precise, plain-language, adversarial when needed. ${fn} ships matters; ${agent.name} is the workflow GCs buy when this job isn't "just another tab."`,
    whyH2: "Matters are SKUs.",
    replaceH2: "Hours without artifacts.",
    replaceSub: "What firms run before intake, drafts, and deadlines share one matter graph.",
    before: [
      "Deadlines in Outlook only",
      "Clause library in Word",
      "Billing disconnected from scope",
    ],
    after: [
      "Matter ID across Brief + Clause + Calendar-L",
      "Conflict + intake feed Docket",
      "Voice-locked drafts",
    ],
    howH2: "Intake · draft · review · file.",
    steps: [
      { label: "01 · Intake", text: "Facts, parties, and risk flags routed to the right partner path." },
      { label: "02 · Draft", text: "Templates from Clause; house voice from Grammar." },
      { label: "03 · Review", text: "Redlines with version discipline; client-safe exports." },
      { label: "04 · File", text: "Court + service deadlines on Calendar-L; billing hooks optional." },
    ],
    terminalTitle: `Matter lane · ${agent.name}.`,
    useH2: "Boutique firm · 24 attorneys.",
  };
}

function sealFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is the notary lane — official, brief, trustworthy. ${fn} is the stamp customers feel; ${agent.name} is how firms scale witnesses, chain, apostille, and registry without losing defensibility.`,
    whyH2: "Trust is chain + identity.",
    replaceH2: "Stamps without lineage.",
    replaceSub: "What closings run before Lex and Mortar handoffs are provable.",
    before: [
      "Stamps tracked in email",
      "Witness scheduling by phone tag",
      "Cross-border packets rebuilt every time",
    ],
    after: [
      "Stamp + chain + Vault in one flow",
      "Registry queries for diligence",
      "Apostille routing by jurisdiction policy",
    ],
    howH2: "Identify · witness · stamp · prove.",
    steps: [
      { label: "01 · Identify", text: "KYC / signer verification per jurisdiction policy." },
      { label: "02 · Witness", text: "Schedule remote or mobile witness · evidence capture." },
      { label: "03 · Stamp", text: "Seal with timestamp + hash; route to Vault." },
      { label: "04 · Prove", text: "Registry + apostille package for cross-border handoff." },
    ],
    terminalTitle: `Queue · ${agent.name}.`,
    useH2: "Regional firm · high recurring volume.",
  };
}
