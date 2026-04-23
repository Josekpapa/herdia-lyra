/**
 * Marketing copy for `/bundles/[slug]` pages (beyond the three hand-built landings).
 */

export type BundleIncludeCard = { label: string; href: string; blurb: string };

export type BundleLandingCopy = {
  accent: string;
  kickerSuffix: string;
  heroItalic: string;
  heroLede: string;
  holdingTag: string;
  floorStory: string;
  personaLine: string;
  tierNote: string;
  whatsTitle: string;
  whatsSub: string;
  includes: BundleIncludeCard[];
  beforeTitle: string;
  beforeItems: string[];
  afterLabel: string;
  afterItems: string[];
  receiptTitle: string;
  receiptSub: string;
  receiptLines: string[];
  ctaKicker: string;
  ctaTitle: string;
  ctaBody: string;
  backHref: string;
  backLabel: string;
  flagshipHref: string;
  flagshipLabel: string;
};

const C: Record<string, BundleLandingCopy> = {
  "tide-portfolio": {
    accent: "#b8926a",
    kickerSuffix: "01.portfolio",
    heroItalic: "Full stack · one portfolio · one invoice.",
    heroLede:
      "Tide Portfolio is the VOLUME bundle for operators who run multiple design-forward properties and need Marea-class ops everywhere — not a demo in one hotel and spreadsheets in the rest.",
    holdingTag: "TIDE",
    floorStory: "~$60k ARR · 3+ properties",
    personaLine: "P1 · multi-property",
    tierNote: "VOLUME · portfolio GRR story",
    whatsTitle: "Four rails · one Passport.",
    whatsSub:
      "All Marea means flagship terminal + Ops + Revenue + Housekeeping wired to the same guest and owner identity.",
    includes: [
      { label: "Marea (full stack)", href: "/tide/marea", blurb: "Terminal + voice + ops surface per property" },
      { label: "Ops", href: "/tide/ops", blurb: "Tickets, incidents, standup" },
      { label: "Revenue", href: "/tide/revenue", blurb: "Pace, pickup, channel mix" },
      { label: "Housekeeping", href: "/tide/housekeeping", blurb: "Turns, par, VIP timing" },
    ],
    beforeTitle: "Portfolio without a platform.",
    beforeItems: [
      "Each property runs a different stack depth",
      "Owners can't compare RevPAR apples-to-apples",
      "Ops tickets in four inboxes",
      "Brand voice drifts property to property",
    ],
    afterLabel: "After · Tide Portfolio",
    afterItems: [
      "One Passport · properties as sites under one org",
      "Cross-property benchmarks in one read",
      "Ops + Revenue + HK on shared rails",
      "Grammar locked to brand kit",
    ],
    receiptTitle: "What shows up on the invoice.",
    receiptSub: "One VOLUME line · agents roll under portfolio scope.",
    receiptLines: [
      "TIDE · Tide Portfolio (VOLUME)",
      "  └ Marea stack · per property IDs",
      "  └ Ops · Revenue · Housekeeping",
      "Passport · portfolio org",
    ],
    ctaKicker: "Tide",
    ctaTitle: "Start with three properties — prove GRR uplift.",
    ctaBody:
      "We wire portfolio org, then migrate property two and three without re-buying the story.",
    backHref: "/tide",
    backLabel: "Back to Tide",
    flagshipHref: "/tide/marea",
    flagshipLabel: "See Marea",
  },
  "fidelis-desk": {
    accent: "#4a6eb8",
    kickerSuffix: "03.desk",
    heroItalic: "Books · vault · filings · counsel — one desk.",
    heroLede:
      "Fidelis Desk is the CHAPTER bundle for founders who need the advisory OS without assembling agents à la carte. Ledger, Vault, Filing, and Counsel share one entity graph.",
    holdingTag: "FIDELIS",
    floorStory: "~$18k ARR · single org",
    personaLine: "P2 · multi-entity founder",
    tierNote: "CHAPTER · one stack",
    whatsTitle: "Four agents · one close.",
    whatsSub: "Everything that touches tax, paper, and advice routes through the same desk — not four vendors.",
    includes: [
      { label: "Ledger", href: "/fidelis/ledger", blurb: "Books that read and write" },
      { label: "Vault", href: "/fidelis/vault", blurb: "Chain-of-custody docs" },
      { label: "Filing", href: "/fidelis/filing", blurb: "Deadline to filed" },
      { label: "Counsel", href: "/fidelis/counsel", blurb: "Advisor on staff" },
    ],
    beforeTitle: "The founder tax stack, fragmented.",
    beforeItems: [
      "QuickBooks + Drive + attorney email",
      "Filings tracked in spreadsheets",
      "No vault that matches the ledger",
      "Counsel briefings rebuilt every quarter",
    ],
    afterLabel: "After · Fidelis Desk",
    afterItems: [
      "Ledger ↔ Vault hash chain",
      "Filing deadlines from the same entity list",
      "Counsel reads the same month the books close",
      "One CHAPTER invoice",
    ],
    receiptTitle: "Invoice shape.",
    receiptSub: "CHAPTER bundle · entity-scoped.",
    receiptLines: [
      "FIDELIS · Fidelis Desk (CHAPTER)",
      "  └ Ledger · Vault · Filing · Counsel",
      "Passport · entity graph",
    ],
    ctaKicker: "Fidelis",
    ctaTitle: "Month-one close with counsel in the loop.",
    ctaBody: "We import entities, wire Vault ingest, and align filing calendar before first close.",
    backHref: "/fidelis",
    backLabel: "Back to Fidelis",
    flagshipHref: "/fidelis/ledger",
    flagshipLabel: "See Ledger",
  },
  "life-letter": {
    accent: "#a7f3d0",
    kickerSuffix: "04.life",
    heroItalic: "Health · trust · vault — one letter of intent.",
    heroLede:
      "Life Letter crosses Alder, Helios, and Fidelis: Kairos for the body, Trust for distributions, Vault for the files that survive you. One VOLUME story for founders who won't silo longevity from wealth.",
    holdingTag: "CROSS · ALDER × HELIOS × FIDELIS",
    floorStory: "~$96k ARR · household + entities",
    personaLine: "P2 × P5 crossover",
    tierNote: "VOLUME · cross-holding",
    whatsTitle: "Three agents · one narrative.",
    whatsSub: "The bundle your estate attorney and longevity MD both recognize — because it's one Passport.",
    includes: [
      { label: "Kairos", href: "/alder/kairos", blurb: "Protocols, labs, cadence" },
      { label: "Trust", href: "/helios/trust", blurb: "Distributions, minutes" },
      { label: "Vault", href: "/fidelis/vault", blurb: "Documents, chain, query" },
    ],
    beforeTitle: "Three plans · zero shared truth.",
    beforeItems: [
      "Longevity stack separate from wealth stack",
      "Trust counsel without document graph",
      "Vault full · Trust blind",
    ],
    afterLabel: "After · Life Letter",
    afterItems: [
      "Kairos events can flag Trust distribution reviews",
      "Vault holds instruments Trust cites",
      "One invoice · cross-holding bundle",
    ],
    receiptTitle: "Receipt.",
    receiptSub: "VOLUME · cross-holding bundle line.",
    receiptLines: [
      "LYRA · Life Letter (VOLUME)",
      "  └ Kairos · Trust · Vault",
      "Passport · household + entities",
    ],
    ctaKicker: "Network",
    ctaTitle: "Household + entities in one pass.",
    ctaBody: "Design partners get a joint onboarding: Kairos intake, Trust graph, Vault ingest in parallel.",
    backHref: "/atlas",
    backLabel: "Atlas",
    flagshipHref: "/alder/kairos",
    flagshipLabel: "See Kairos",
  },
  "network-pass": {
    accent: "#4a6eb8",
    kickerSuffix: "00.network",
    heroItalic: "One Passport · one agent per holding · full network.",
    heroLede:
      "Network Pass is ATLAS tier — invite-only. You get Passport identity across the network plus a production seat in each holding to learn how LYRA feels before you standardize your portfolio on one vertical.",
    holdingTag: "LYRA",
    floorStory: "Custom · enterprise",
    personaLine: "LP · strategic partner",
    tierNote: "ATLAS · invite-only",
    whatsTitle: "Catalog access · depth limit per holding.",
    whatsSub:
      "Not every agent at once — one serious lane per holding so teams learn grammar without boiling the ocean.",
    includes: [
      { label: "Passport", href: "/passport", blurb: "SSO · one identity" },
      { label: "Atlas catalog", href: "/atlas", blurb: "All holdings · agents · tiers" },
    ],
    beforeTitle: "Pilot without a spine.",
    beforeItems: [
      "Twenty POCs · twenty logins",
      "No shared billing or identity",
      "Can't compare holding fit",
    ],
    afterLabel: "After · Network Pass",
    afterItems: [
      "One Passport across pilots",
      "Structured exposure: one agent family per holding",
      "Path to VOLUME bundles with data",
    ],
    receiptTitle: "Commercial.",
    receiptSub: "Custom statement of work — ATLAS desk.",
    receiptLines: [
      "LYRA · Network Pass (ATLAS)",
      "  └ Passport · per-holding pilot seats",
      "  └ Success + solutions alignment",
    ],
    ctaKicker: "LYRA",
    ctaTitle: "Invite-only · start with a network map.",
    ctaBody: "We co-write the pilot grid: which holdings, which agents, which success metrics over 90 days.",
    backHref: "/agency",
    backLabel: "Agency",
    flagshipHref: "/atlas",
    flagshipLabel: "Open Atlas",
  },
  "notary-desk": {
    accent: "#b8926a",
    kickerSuffix: "08.notary",
    heroItalic: "Stamp · chain · apostille · registry.",
    heroLede:
      "Notary Desk is the CHAPTER bundle for firms that live in Lex and Mortar pipelines — high recurring stamp volume, cross-border, with registry search that holds up in diligence.",
    holdingTag: "SEAL",
    floorStory: "~$6k ARR · small firm",
    personaLine: "P3 · P4 cross-cut",
    tierNote: "CHAPTER · firm stack",
    whatsTitle: "Four agents · one queue.",
    whatsSub: "Everything after draft and before filing lives here — the notary layer Attest points to.",
    includes: [
      { label: "Stamp", href: "/seal/stamp", blurb: "The button" },
      { label: "Chain", href: "/seal/chain", blurb: "Custody forever" },
      { label: "Apostille", href: "/seal/apostille", blurb: "Cross-border" },
      { label: "Registry", href: "/seal/registry", blurb: "Searchable proof" },
    ],
    beforeTitle: "Notary as side quest.",
    beforeItems: [
      "Stamps in five tools",
      "Chain of custody in email",
      "Apostille as a vendor hunt",
    ],
    afterLabel: "After · Notary Desk",
    afterItems: [
      "Single queue · SLA by jurisdiction",
      "Chain native to Vault handoff",
      "Registry queries for closings",
    ],
    receiptTitle: "Receipt.",
    receiptSub: "CHAPTER · firm monthly.",
    receiptLines: [
      "SEAL · Notary Desk (CHAPTER)",
      "  └ Stamp · Chain · Apostille · Registry",
      "Passport · firm org",
    ],
    ctaKicker: "Seal",
    ctaTitle: "Pilot with one firm · one jurisdiction.",
    ctaBody: "We wire stamp routing, witness paths, and registry export templates in week one.",
    backHref: "/seal",
    backLabel: "Back to Seal",
    flagshipHref: "/seal/attest",
    flagshipLabel: "See Attest",
  },
  "lex-desk": {
    accent: "#c8c4bc",
    kickerSuffix: "07.lexdesk",
    heroItalic: "Matter · Brief · Clause · Calendar — firm OS.",
    heroLede:
      "Lex Desk is the CHAPTER bundle for boutiques shipping matters on Docket: intake through Matter, drafts through Brief, language through Clause, deadlines through Calendar-L — without buying the whole firm twice.",
    holdingTag: "LEX",
    floorStory: "~$24k ARR · boutique",
    personaLine: "P3 · Boutique GC",
    tierNote: "CHAPTER · firm stack",
    whatsTitle: "Four agents · one matter graph.",
    whatsSub: "The bundle behind Lex's flagship narrative — priced as a desk, not four SKUs.",
    includes: [
      { label: "Matter", href: "/lex/matter", blurb: "Intake → scope → Docket" },
      { label: "Brief", href: "/lex/brief", blurb: "House voice drafts" },
      { label: "Clause", href: "/lex/clause", blurb: "Living clause library" },
      { label: "Calendar-L", href: "/lex/calendar-l", blurb: "Deadlines + court" },
    ],
    beforeTitle: "Matters without a desk.",
    beforeItems: [
      "Matter in one tool · deadlines in another",
      "Clause library in Word",
      "Brief templates stale",
    ],
    afterLabel: "After · Lex Desk",
    afterItems: [
      "Matter opens with Clause attached",
      "Brief pulls from Clause + Calendar-L",
      "One CHAPTER invoice",
    ],
    receiptTitle: "Receipt.",
    receiptSub: "CHAPTER · firm monthly.",
    receiptLines: [
      "LEX · Lex Desk (CHAPTER)",
      "  └ Matter · Brief · Clause · Calendar-L",
      "Passport · firm org",
    ],
    ctaKicker: "Lex",
    ctaTitle: "Pilot with one firm · one practice group.",
    ctaBody: "We migrate clause libraries, wire conflict + intake, and tune Brief voice in week one.",
    backHref: "/lex",
    backLabel: "Back to Lex",
    flagshipHref: "/lex/docket",
    flagshipLabel: "See Docket",
  },
  "site-pack": {
    accent: "#c3942d",
    kickerSuffix: "06.site",
    heroItalic: "Drawings · permits · site · crew — site truth.",
    heroLede:
      "Site Pack is the CHAPTER bundle for active jobs: Blueprint for sheets, Permit for agencies, Site for dailies, Crew for labor — the Mortar spine Property Pass points to without paying for the whole developer program on day one.",
    holdingTag: "MORTAR",
    floorStory: "~$18k ARR + % of project",
    personaLine: "P4 · Builder-developer",
    tierNote: "CHAPTER · per project",
    whatsTitle: "Four agents · one project ID.",
    whatsSub: "Everything that happens on site rolls up to the same Raft project code.",
    includes: [
      { label: "Blueprint", href: "/mortar/blueprint", blurb: "Sheets · RFIs · versions" },
      { label: "Permit", href: "/mortar/permit", blurb: "Agencies · filings" },
      { label: "Site", href: "/mortar/site", blurb: "Daily · photos · delays" },
      { label: "Crew", href: "/mortar/crew", blurb: "Who's on site" },
    ],
    beforeTitle: "Site without a spine.",
    beforeItems: [
      "Drawings in Bluebeam · permits in email",
      "Daily in WhatsApp · crew in Excel",
    ],
    afterLabel: "After · Site Pack",
    afterItems: [
      "One project ID across Blueprint → Site",
      "Permit milestones tied to drawings",
      "Crew + Site feed the same standup",
    ],
    receiptTitle: "Receipt.",
    receiptSub: "CHAPTER · per active project.",
    receiptLines: [
      "MORTAR · Site Pack (CHAPTER)",
      "  └ Blueprint · Permit · Site · Crew",
      "Passport · project + GC",
    ],
    ctaKicker: "Mortar",
    ctaTitle: "Start one job — expand to portfolio.",
    ctaBody: "We stand up project codes, drawing ingest, and crew boards before week-two walk.",
    backHref: "/mortar",
    backLabel: "Back to Mortar",
    flagshipHref: "/mortar/raft",
    flagshipLabel: "See Raft",
  },
};

export const DYNAMIC_BUNDLE_SLUGS = Object.keys(C) as (keyof typeof C)[];

export function getBundleLandingCopy(slug: string): BundleLandingCopy | undefined {
  return C[slug];
}
