/**
 * LYRA // ATLAS — single source of truth for the ecosystem.
 * Every page, card, and catalog tile reads from here.
 *
 * Structure: parent (LYRA) → 8 holdings → flagship → agents (live + draft).
 * Add a new holding? Add it here. Every page picks it up.
 */

export type Tier = "INDEX" | "PAGE" | "CHAPTER" | "VOLUME" | "ATLAS";

export type Agent = {
  slug: string;       // url-safe
  name: string;       // display name
  blurb: string;      // one-line product promise
  status: "live" | "draft";
  tier: Tier;         // lowest tier that unlocks it
};

export type Holding = {
  code: string;           // "01" etc — for the terminal vibe
  slug: string;           // url path: /tide, /fidelis, etc.
  name: string;           // "TIDE"
  tagline: string;        // "hospitality operating layer"
  vertical: string;       // "hospitality"
  thesis: string;         // one-sentence product thesis
  flagship: {
    name: string;         // "Marea"
    slug: string;         // /tide/marea
    blurb: string;
    externalHtml?: string; // e.g. "/marea.html" for Tide/Marea demo
  } | null;               // Fidelis has no sub-flagship
  voice: {
    palette: string[];    // 3 hex swatches — informs visuals later
    tone: string;         // "cinematic · coastal · warm"
    metaphor: string;     // the one-liner identity metaphor
  };
  model: string;          // business model one-liner
  pricing: { tier: Tier; price: string; for: string }[];
  sell: string;           // how we sell it
  firstRevenue: string;   // year-1 floor narrative
  agents: Agent[];
  rituals: string[];      // 3 canonical rituals
  persona: string;        // north-star buyer (from P1–P7 roster)
};

export type Bundle = {
  slug: string;
  name: string;
  includes: string[];     // agent or flagship names
  tier: Tier;
  price: string;
};

/* --------------------------------------------------------------------- */
/* HOLDINGS                                                              */
/* --------------------------------------------------------------------- */

export const HOLDINGS: Holding[] = [
  {
    code: "01",
    slug: "tide",
    name: "TIDE",
    tagline: "hospitality operating layer",
    vertical: "hospitality",
    thesis: "Your hotels run on spreadsheets and WhatsApp. Tide runs them on a network.",
    flagship: {
      name: "Marea",
      slug: "marea",
      blurb: "The terminal for design-forward hotel groups.",
      externalHtml: "/marea.html",
    },
    voice: {
      palette: ["#b8926a", "#4a6eb8", "#c8c4bc"],
      tone: "cinematic · coastal · warm",
      metaphor: "a concierge who never sleeps and never forgets",
    },
    model: "SaaS per-property + revenue share on upsells",
    pricing: [
      { tier: "PAGE",    price: "$149 / mo",   for: "single agent, personal use" },
      { tier: "CHAPTER", price: "$1,499 / mo", for: "one property, full stack" },
      { tier: "VOLUME",  price: "$4,990 / mo", for: "portfolio · +2% GRR uplift" },
    ],
    sell: "Design Hotels operators · 3–20 properties · second-generation owners",
    firstRevenue: "Shore Pack × 3 properties = $180k ARR baseline",
    persona: "P1 · The Design Hotelier",
    rituals: ["morning revenue call", "nightly occupancy sweep", "guest recovery"],
    agents: [
      { slug: "concierge",    name: "Concierge",    status: "live",  tier: "PAGE",    blurb: "Guest-facing voice across email, SMS, WhatsApp." },
      { slug: "revenue",      name: "Revenue",      status: "live",  tier: "CHAPTER", blurb: "Rate, pace, pickup — one terminal." },
      { slug: "ops",          name: "Ops",          status: "live",  tier: "CHAPTER", blurb: "Tickets, incidents, morning standup." },
      { slug: "housekeeping", name: "Housekeeping", status: "live",  tier: "CHAPTER", blurb: "Room status, linen, timing." },
      { slug: "guestbook",    name: "Guestbook",    status: "live",  tier: "PAGE",    blurb: "Every guest, every visit, forever." },
      { slug: "scout",        name: "Scout",        status: "live",  tier: "CHAPTER", blurb: "New channels, new inventory, quietly." },
      { slug: "front-desk",   name: "Front Desk",   status: "draft", tier: "PAGE",    blurb: "The welcome, at the speed of the guest." },
      { slug: "laundry",      name: "Laundry",      status: "draft", tier: "CHAPTER", blurb: "Par levels, vendors, losses." },
      { slug: "fnb",          name: "F&B",          status: "draft", tier: "CHAPTER", blurb: "Menu, cost, covers — in one read." },
    ],
  },
  {
    code: "02",
    slug: "lore",
    name: "LORE",
    tagline: "education operating layer",
    vertical: "education",
    thesis: "Every tutor, mentor, and course should leave a permanent record. Muse is it.",
    flagship: {
      name: "Muse",
      slug: "muse",
      blurb: "The terminal for founder academies, residencies, boutique schools.",
    },
    voice: {
      palette: ["#e8c99a", "#4a6eb8", "#d0c9b8"],
      tone: "scholarly · patient · generous",
      metaphor: "the private tutor who remembers every question you ever asked",
    },
    model: "per-seat SaaS + per-cohort revenue share",
    pricing: [
      { tier: "PAGE",    price: "$49 / mo",    for: "individual learner" },
      { tier: "CHAPTER", price: "$999 / mo",   for: "institution, one cohort" },
      { tier: "VOLUME",  price: "$9,990 / mo", for: "program with alumni + revshare" },
    ],
    sell: "design residencies · founder academies · boutique schools",
    firstRevenue: "1 residency + 2 academies = $120k ARR baseline",
    persona: "P6 · The Educator-Operator",
    rituals: ["weekly cohort check-in", "path audit", "alumni activation"],
    agents: [
      { slug: "tutor",       name: "Tutor",        status: "live",  tier: "PAGE",    blurb: "Q&A that knows your syllabus." },
      { slug: "path",        name: "Path",         status: "live",  tier: "PAGE",    blurb: "Learning path generator." },
      { slug: "lab",         name: "Lab",          status: "live",  tier: "CHAPTER", blurb: "Cohort workshops, captured." },
      { slug: "cohort",      name: "Cohort",       status: "live",  tier: "CHAPTER", blurb: "The living dashboard." },
      { slug: "dossier",     name: "Dossier",      status: "live",  tier: "CHAPTER", blurb: "Every learner's file." },
      { slug: "desk",        name: "Desk",         status: "live",  tier: "CHAPTER", blurb: "Office hours, async." },
      { slug: "admissions",  name: "Admissions",   status: "draft", tier: "CHAPTER", blurb: "Pipeline to placement." },
      { slug: "alumni",      name: "Alumni",       status: "draft", tier: "VOLUME",  blurb: "The network as an asset." },
      { slug: "chair",       name: "Chair",        status: "draft", tier: "VOLUME",  blurb: "Faculty ops, at the program level." },
    ],
  },
  {
    code: "03",
    slug: "fidelis",
    name: "FIDELIS",
    tagline: "advisory operating layer",
    vertical: "advisory · tax · filings",
    thesis: "Your CPA is a bottleneck. Fidelis is an operating system with a CPA on staff.",
    flagship: null,   // Fidelis = holding = flagship
    voice: {
      palette: ["#4a6eb8", "#c8c4bc", "#1e243a"],
      tone: "clinical · careful · confident",
      metaphor: "a ledger that reads back to you",
    },
    model: "retainer + per-filing + vault storage fee",
    pricing: [
      { tier: "CHAPTER", price: "$1,499 / mo", for: "single entity, monthly close" },
      { tier: "VOLUME",  price: "$4,990 / mo", for: "3+ entities, vault, filings" },
      { tier: "ATLAS",   price: "custom",      for: "multi-entity groups, family office" },
    ],
    sell: "founders with 2+ entities · hotel owners · RE holders",
    firstRevenue: "5 founder-group accounts = $90k ARR baseline",
    persona: "P2 · The Multi-Entity Founder",
    rituals: ["monthly close", "quarterly filing", "annual audit", "vault review"],
    agents: [
      { slug: "ledger",    name: "Ledger",    status: "live",  tier: "CHAPTER", blurb: "Books, read and write." },
      { slug: "vault",     name: "Vault",     status: "live",  tier: "CHAPTER", blurb: "Every document, chain-of-custody." },
      { slug: "filing",    name: "Filing",    status: "live",  tier: "CHAPTER", blurb: "Deadline to filed." },
      { slug: "counsel",   name: "Counsel",   status: "live",  tier: "CHAPTER", blurb: "The advisor on staff." },
      { slug: "intake",    name: "Intake",    status: "live",  tier: "PAGE",    blurb: "Onboard an entity in one pass." },
      { slug: "audit",     name: "Audit",     status: "live",  tier: "CHAPTER", blurb: "The read-through, on demand." },
      { slug: "treaty",    name: "Treaty",    status: "draft", tier: "VOLUME",  blurb: "Cross-border residency reasoning." },
      { slug: "receipt",   name: "Receipt",   status: "draft", tier: "PAGE",    blurb: "Mobile capture → categorized." },
      { slug: "risk",      name: "Risk",      status: "draft", tier: "VOLUME",  blurb: "The flags before the flags." },
    ],
  },
  {
    code: "04",
    slug: "helios",
    name: "HELIOS",
    tagline: "wealth operating layer",
    vertical: "wealth · trust · estate",
    thesis: "A family office in a browser tab — without the 7-figure team.",
    flagship: {
      name: "Crest",
      slug: "crest",
      blurb: "The portfolio, the trust, the distribution — one view.",
    },
    voice: {
      palette: ["#d4a574", "#1e243a", "#c8c4bc"],
      tone: "patient · quiet · generational",
      metaphor: "a portfolio manager who's read your will",
    },
    model: "AUM basis points (5–25 bps) + platform SaaS",
    pricing: [
      { tier: "CHAPTER", price: "$2,499 / mo",        for: "single household" },
      { tier: "VOLUME",  price: "$7,990 / mo + bps",  for: "multi-entity family" },
      { tier: "ATLAS",   price: "custom",             for: "family office, white label" },
    ],
    sell: "$5M–$50M net-worth founders who don't have a family office yet",
    firstRevenue: "3 family accounts at 15bps + SaaS = $150k ARR baseline",
    persona: "P2 · The Multi-Entity Founder (crossover)",
    rituals: ["weekly portfolio review", "quarterly trust statement", "annual estate"],
    agents: [
      { slug: "portfolio",     name: "Portfolio",    status: "live",  tier: "CHAPTER", blurb: "All accounts, one read." },
      { slug: "ledger-w",      name: "Ledger-W",     status: "live",  tier: "CHAPTER", blurb: "Wealth-side books, audit-clean." },
      { slug: "trust",         name: "Trust",        status: "live",  tier: "VOLUME",  blurb: "Distributions, minutes, minutes." },
      { slug: "estate",        name: "Estate",       status: "live",  tier: "VOLUME",  blurb: "Every asset, every heir." },
      { slug: "family-office", name: "Family Office", status: "live", tier: "VOLUME",  blurb: "The admin layer." },
      { slug: "yield",         name: "Yield",        status: "live",  tier: "CHAPTER", blurb: "Where the cash actually is." },
      { slug: "succession",    name: "Succession",   status: "draft", tier: "ATLAS",   blurb: "The handoff, rehearsed." },
      { slug: "philanthropy",  name: "Philanthropy", status: "draft", tier: "VOLUME",  blurb: "Giving as a portfolio." },
      { slug: "desk",          name: "Desk",         status: "draft", tier: "VOLUME",  blurb: "Concierge for the household." },
    ],
  },
  {
    code: "05",
    slug: "alder",
    name: "ALDER",
    tagline: "longevity operating layer",
    vertical: "longevity · health",
    thesis: "Your body is a portfolio. It deserves a portfolio manager.",
    flagship: {
      name: "Kairos",
      slug: "kairos",
      blurb: "Protocols, labs, cadence — one household, one plan.",
    },
    voice: {
      palette: ["#a7f3d0", "#4a6eb8", "#c8c4bc"],
      tone: "calm · evidence-first · patient",
      metaphor: "a physician who remembers every lab you ever drew",
    },
    model: "concierge membership + protocol marketplace revshare",
    pricing: [
      { tier: "PAGE",    price: "$199 / mo",    for: "individual" },
      { tier: "CHAPTER", price: "$1,999 / mo",  for: "household" },
      { tier: "VOLUME",  price: "$9,990 / yr",  for: "household + concierge tier" },
    ],
    sell: "wellness-forward founders · Helios crossover (longevity line item)",
    firstRevenue: "20 memberships = $48k ARR baseline",
    persona: "P5 · The Longevity Founder",
    rituals: ["weekly cadence check", "monthly protocol review", "quarterly labs"],
    agents: [
      { slug: "intake",       name: "Intake",        status: "live",  tier: "PAGE",    blurb: "Biomarkers, history, baseline." },
      { slug: "protocol",     name: "Protocol",      status: "live",  tier: "CHAPTER", blurb: "The plan — adjusted weekly." },
      { slug: "labs",         name: "Labs",          status: "live",  tier: "CHAPTER", blurb: "Order, read, remember." },
      { slug: "cadence",      name: "Cadence",       status: "live",  tier: "PAGE",    blurb: "The streaks that actually matter." },
      { slug: "concierge-m",  name: "Concierge-M",   status: "live",  tier: "VOLUME",  blurb: "Book the doctor, the flight, the meal." },
      { slug: "atria",        name: "Atria",         status: "live",  tier: "PAGE",    blurb: "Foyer — the guided entry to Kairos." },
      { slug: "telemetry",    name: "Telemetry",     status: "draft", tier: "VOLUME",  blurb: "Wearables, unified." },
      { slug: "mind",         name: "Mind",          status: "draft", tier: "CHAPTER", blurb: "Cognitive baseline, quiet." },
      { slug: "sleep",        name: "Sleep",         status: "draft", tier: "PAGE",    blurb: "The one metric most founders lie about." },
    ],
  },
  {
    code: "06",
    slug: "mortar",
    name: "MORTAR",
    tagline: "construction operating layer",
    vertical: "construction · development",
    thesis: "Every build has 40 WhatsApp groups. Raft replaces them with one ledger.",
    flagship: {
      name: "Raft",
      slug: "raft",
      blurb: "The ledger for the build — permit to close-out.",
    },
    voice: {
      palette: ["#8a6a26", "#1e243a", "#d6dbe8"],
      tone: "direct · tactical · on-site",
      metaphor: "the superintendent who never loses a thread",
    },
    model: "per-project SaaS + % of project value (0.5–1%)",
    pricing: [
      { tier: "CHAPTER", price: "$1,499 / mo / project", for: "active project" },
      { tier: "VOLUME",  price: "$7,990 / mo",           for: "portfolio · +0.75% of project" },
      { tier: "ATLAS",   price: "custom",                for: "developer-scale programs" },
    ],
    sell: "hotel renovations (via Marea) · ground-up devs · family-office RE arms",
    firstRevenue: "2 active projects × 0.75% on $8M = $120k baseline",
    persona: "P4 · The Builder-Developer",
    rituals: ["weekly site walk", "monthly draw", "permit cadence"],
    agents: [
      { slug: "blueprint", name: "Blueprint", status: "live",  tier: "CHAPTER", blurb: "Drawings that read back to you." },
      { slug: "permit",    name: "Permit",    status: "live",  tier: "CHAPTER", blurb: "Every filing, every agency." },
      { slug: "crew",      name: "Crew",      status: "live",  tier: "CHAPTER", blurb: "Who's on site, why, when." },
      { slug: "site",      name: "Site",      status: "live",  tier: "CHAPTER", blurb: "The daily — photos, notes, delays." },
      { slug: "ledger-c",  name: "Ledger-C",  status: "live",  tier: "CHAPTER", blurb: "Draws, liens, change orders." },
      { slug: "punch",     name: "Punch",     status: "live",  tier: "PAGE",    blurb: "Close-out, bracketed." },
      { slug: "vendor",    name: "Vendor",    status: "draft", tier: "VOLUME",  blurb: "Every bid, every contract." },
      { slug: "safety",    name: "Safety",    status: "draft", tier: "CHAPTER", blurb: "OSHA, incidents, training." },
      { slug: "close",     name: "Close",     status: "draft", tier: "VOLUME",  blurb: "The handoff packet." },
    ],
  },
  {
    code: "07",
    slug: "lex",
    name: "LEX",
    tagline: "legal operating layer",
    vertical: "law · corporate · M&A",
    thesis: "Your lawyer bills by the hour. Docket bills by the matter. You decide.",
    flagship: {
      name: "Docket",
      slug: "docket",
      blurb: "The matter is the product — price it, ship it, close it.",
    },
    voice: {
      palette: ["#c8c4bc", "#0a0d1a", "#4a6eb8"],
      tone: "precise · plain-language · adversarial when needed",
      metaphor: "general counsel, in a browser tab",
    },
    model: "per-matter SaaS + billable-hour passthrough",
    pricing: [
      { tier: "PAGE",    price: "$249 / mo",    for: "solo attorney" },
      { tier: "CHAPTER", price: "$1,999 / mo",  for: "boutique firm" },
      { tier: "VOLUME",  price: "$9,990 / mo",  for: "firm + fractional-GC program" },
    ],
    sell: "boutique firms (20–50 attys) · founders' fractional-GC needs",
    firstRevenue: "1 boutique firm + 10 fractional-GC founders = $96k ARR baseline",
    persona: "P3 · The Boutique GC",
    rituals: ["weekly matter triage", "monthly billing", "quarterly risk review"],
    agents: [
      { slug: "matter",       name: "Matter",       status: "live",  tier: "PAGE",    blurb: "Open, scope, price, ship." },
      { slug: "brief",        name: "Brief",        status: "live",  tier: "CHAPTER", blurb: "Draft in the house voice." },
      { slug: "clause",       name: "Clause",       status: "live",  tier: "CHAPTER", blurb: "Your clause library, alive." },
      { slug: "discovery",    name: "Discovery",    status: "live",  tier: "CHAPTER", blurb: "Docs in, answers out." },
      { slug: "calendar-l",   name: "Calendar-L",   status: "live",  tier: "CHAPTER", blurb: "Every deadline, every court." },
      { slug: "billing",      name: "Billing",      status: "live",  tier: "CHAPTER", blurb: "Billable hour, optional." },
      { slug: "conflict",     name: "Conflict",     status: "draft", tier: "CHAPTER", blurb: "Check before you ink." },
      { slug: "ip",           name: "IP",           status: "draft", tier: "VOLUME",  blurb: "Filings, deadlines, renewals." },
      { slug: "court",        name: "Court",        status: "draft", tier: "VOLUME",  blurb: "Calendar meets courthouse." },
    ],
  },
  {
    code: "08",
    slug: "seal",
    name: "SEAL",
    tagline: "notary operating layer",
    vertical: "notary · attestation",
    thesis: "Notary should be a button. Attest is the button.",
    flagship: {
      name: "Attest",
      slug: "attest",
      blurb: "Stamp, chain, vault — in 90 seconds.",
    },
    voice: {
      palette: ["#b8926a", "#0a0d1a", "#d6dbe8"],
      tone: "official · brief · trustworthy",
      metaphor: "the stamp that remembers where it's been",
    },
    model: "per-stamp transaction + SaaS for recurring firms",
    pricing: [
      { tier: "PAGE",    price: "$15–$45 / stamp", for: "one-off transactions" },
      { tier: "CHAPTER", price: "$499 / mo",       for: "firm with recurring volume" },
      { tier: "VOLUME",  price: "$2,499 / mo",     for: "multi-jurisdiction · apostille" },
    ],
    sell: "Docket & Raft pipeline first (captive) · then SMB cross-border",
    firstRevenue: "pipeline volume from Lex+Mortar = $40k ARR baseline",
    persona: "cross-cut · serves P3 and P4 primarily",
    rituals: ["daily queue", "weekly archive", "monthly compliance review"],
    agents: [
      { slug: "stamp",       name: "Stamp",        status: "live",  tier: "PAGE",    blurb: "The button." },
      { slug: "chain",       name: "Chain",        status: "live",  tier: "CHAPTER", blurb: "Chain-of-custody, forever." },
      { slug: "witness",     name: "Witness",      status: "live",  tier: "PAGE",    blurb: "Live witness, on demand." },
      { slug: "apostille",   name: "Apostille",    status: "live",  tier: "CHAPTER", blurb: "Cross-border attestation." },
      { slug: "registry",    name: "Registry",     status: "live",  tier: "CHAPTER", blurb: "Searchable, queryable." },
      { slug: "mobile",      name: "Mobile",       status: "live",  tier: "CHAPTER", blurb: "Notary on location." },
      { slug: "kyc",         name: "KYC",          status: "draft", tier: "CHAPTER", blurb: "Identity before stamp." },
      { slug: "archive",     name: "Archive",      status: "draft", tier: "VOLUME",  blurb: "Cold storage, decades." },
      { slug: "crossborder", name: "Crossborder",  status: "draft", tier: "VOLUME",  blurb: "Multi-jurisdiction routing." },
    ],
  },
];

/* --------------------------------------------------------------------- */
/* BUNDLES                                                               */
/* --------------------------------------------------------------------- */

export const BUNDLES: Bundle[] = [
  { slug: "shore-pack",      name: "Shore Pack",      tier: "CHAPTER", price: "$1,499 / mo", includes: ["Marea Concierge", "Guestbook", "Scout"] },
  { slug: "tide-portfolio",  name: "Tide Portfolio",  tier: "VOLUME",  price: "$4,990 / mo", includes: ["All Marea", "Ops", "Revenue", "Housekeeping"] },
  { slug: "fidelis-desk",    name: "Fidelis Desk",    tier: "CHAPTER", price: "$1,499 / mo", includes: ["Ledger", "Vault", "Filing", "Counsel"] },
  { slug: "founder-pass",    name: "Founder Pass",    tier: "VOLUME",  price: "$4,990 / mo", includes: ["Ledger", "Portfolio", "Matter", "Intake"] },
  { slug: "life-letter",     name: "Life Letter",     tier: "VOLUME",  price: "$7,990 / mo", includes: ["Kairos", "Trust", "Vault"] },
  { slug: "network-pass",    name: "Network Pass",    tier: "ATLAS",   price: "custom",      includes: ["Passport", "One agent per holding"] },
  { slug: "property-pass",   name: "Property Pass",   tier: "VOLUME",  price: "$4,990 / mo", includes: ["Raft", "Attest", "Matter", "Ledger"] },
  { slug: "notary-desk",     name: "Notary Desk",     tier: "CHAPTER", price: "$499 / mo",   includes: ["Stamp", "Chain", "Apostille", "Registry"] },
  { slug: "lex-desk",        name: "Lex Desk",        tier: "CHAPTER", price: "$1,999 / mo", includes: ["Matter", "Brief", "Clause", "Calendar-L"] },
  { slug: "site-pack",       name: "Site Pack",       tier: "CHAPTER", price: "$1,499 / mo", includes: ["Blueprint", "Permit", "Site", "Crew"] },
];

/* --------------------------------------------------------------------- */
/* TIER GRAMMAR                                                          */
/* --------------------------------------------------------------------- */

export const TIER_GRAMMAR: { tier: Tier; monthly: string; annual: string; for: string }[] = [
  { tier: "INDEX",   monthly: "$0",           annual: "$0",              for: "read-only · the directory" },
  { tier: "PAGE",    monthly: "$49–$249",     annual: "$490–$2,490",     for: "one agent · personal use" },
  { tier: "CHAPTER", monthly: "$499–$2,499",  annual: "$4,990–$24,990",  for: "one holding's stack" },
  { tier: "VOLUME",  monthly: "$2,499+",      annual: "$24,990+",        for: "cross-holding bundles" },
  { tier: "ATLAS",   monthly: "custom",       annual: "custom",          for: "full network · invite-only" },
];

/* --------------------------------------------------------------------- */
/* CORE PLUMBING                                                         */
/* --------------------------------------------------------------------- */

export const CORE = [
  { name: "Passport", slug: "passport", blurb: "Single sign-on · one identity across all 53 agents." },
  { name: "Memory",   slug: "memory",   blurb: "Graph · shared context, consent-gated." },
  { name: "Grammar",  slug: "grammar",  blurb: "Voice engine · trilingual · per-holding tone." },
  { name: "Gateway",  slug: "gateway",  blurb: "API · model routing · observability · fallbacks." },
  { name: "Billing",  slug: "billing",  blurb: "One invoice · revenue routes to LYRA parent." },
];

/* --------------------------------------------------------------------- */
/* PERSONAS — the 7 we build against                                     */
/* --------------------------------------------------------------------- */

export const PERSONAS = [
  { code: "P1", name: "The Design Hotelier",     holding: "TIDE",    entry: "Shore Pack · $18k/yr",       ltv3y: "$240k" },
  { code: "P2", name: "The Multi-Entity Founder", holding: "FIDELIS × CREST", entry: "Founder Pass · $60k/yr", ltv3y: "$360k+" },
  { code: "P3", name: "The Boutique GC",         holding: "LEX",     entry: "Lex Desk · $24k/yr",         ltv3y: "$200k" },
  { code: "P4", name: "The Builder-Developer",   holding: "MORTAR",  entry: "Site Pack · $18k/yr + 0.75%", ltv3y: "$500k+" },
  { code: "P5", name: "The Longevity Founder",   holding: "ALDER",   entry: "Kairos · $2.4k/yr household", ltv3y: "$30k+" },
  { code: "P6", name: "The Educator-Operator",   holding: "LORE",    entry: "Muse institution · $12k/yr", ltv3y: "$60k+" },
  { code: "P7", name: "The Fractional GC",       holding: "LEX × FIDELIS", entry: "Docket solo · $3k/yr",  ltv3y: "$30k+" },
];

/* --------------------------------------------------------------------- */
/* HELPERS                                                               */
/* --------------------------------------------------------------------- */

export function getHolding(slug: string): Holding | undefined {
  return HOLDINGS.find((h) => h.slug === slug);
}

export function totalLiveAgents(): number {
  return HOLDINGS.reduce((sum, h) => sum + h.agents.filter((a) => a.status === "live").length, 0);
}

export function totalDraftAgents(): number {
  return HOLDINGS.reduce((sum, h) => sum + h.agents.filter((a) => a.status === "draft").length, 0);
}
