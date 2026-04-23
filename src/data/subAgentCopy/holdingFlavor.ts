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

function alderFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
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

function mortarFlavor(agent: Agent, fn: string): Partial<SubAgentCopy> {
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
