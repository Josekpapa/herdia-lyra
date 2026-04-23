/**
 * Interface + landing development is shipped three agents at a time.
 * Batch 1 is hand-picked (onboarding · ops · stamp); remaining live agents
 * follow atlas order in groups of three (minus any excluded holdings).
 */
import { HOLDINGS } from "./atlas";
import { getOffer } from "./serviceCatalog";

/**
 * Holdings omitted from interface-dev batching — e.g. LORE ships as a separate
 * contractor/education app; atlas pages stay live but do not advance the LYRA shell sequence.
 */
export const INTERFACE_DEV_EXCLUDED_HOLDING_SLUGS: readonly string[] = ["lore"];

export type InterfacePreview = {
  headline: string;
  sub: string;
  metrics: { label: string; value: string }[];
  rows: { key: string; value: string; tone?: "neutral" | "ok" | "warn" }[];
};

/** Hub / UI work tracks this batch; bump when a batch’s three steps are complete. */
export const ACTIVE_INTERFACE_DEV_BATCH = 11;

const BATCH_1_SLUGS = ["fidelis/intake", "tide/ops", "seal/stamp"] as const;

/** Fixed dev order for batch 1: 1 → 2 → 3 maps to `INTERFACE_DEV_SEQUENCE_INDEX` 0 → 1 → 2. */
export const BATCH_1_DEV_STEPS = [
  { step: 1 as const, slug: "fidelis/intake" as const, short: "Intake" },
  { step: 2 as const, slug: "tide/ops" as const, short: "Ops" },
  { step: 3 as const, slug: "seal/stamp" as const, short: "Stamp" },
] as const;

/** Batch 2: first Tide depth trio after Batch 1 slugs are removed from the live queue. */
export const BATCH_2_DEV_STEPS = [
  { step: 1 as const, slug: "tide/concierge" as const, short: "Concierge" },
  { step: 2 as const, slug: "tide/revenue" as const, short: "Revenue" },
  { step: 3 as const, slug: "tide/housekeeping" as const, short: "HK" },
] as const;

const PREVIEWS: Record<string, InterfacePreview> = {
  "fidelis/intake": {
    headline: "Intake desk",
    sub: "New entities staged for Vault hash + Ledger opening balances.",
    metrics: [
      { label: "Open intakes", value: "3" },
      { label: "Median time", value: "18 min" },
      { label: "Verify SLA", value: "<24h" },
    ],
    rows: [
      { key: "Aurora HoldCo LLC", value: "Promote → Ledger ready", tone: "ok" },
      { key: "Formation · DE", value: "Vault V-9921 · stamped", tone: "ok" },
      { key: "Payroll · NY reg", value: "Portal · awaiting signer", tone: "warn" },
    ],
  },
  "tide/ops": {
    headline: "Ops floor",
    sub: "Tickets, incidents, and the morning standup brief — one queue per property.",
    metrics: [
      { label: "Active tickets", value: "14" },
      { label: "P1", value: "2" },
      { label: "Standup", value: "06:30 local" },
    ],
    rows: [
      { key: "HK-412 · AC leak", value: "Engineering onsite · ETA 40m", tone: "warn" },
      { key: "Guest recovery · Rm 308", value: "Comp issued · GM notified", tone: "ok" },
      { key: "Night audit variance", value: "$42 · investigating", tone: "neutral" },
    ],
  },
  "seal/stamp": {
    headline: "Stamp queue",
    sub: "KYC → witness routing → hash → Vault handoff.",
    metrics: [
      { label: "Queue", value: "6" },
      { label: "Avg stamp", value: "94s" },
      { label: "Jurisdictions", value: "50+" },
    ],
    rows: [
      { key: "S-20118 · mutual NDA", value: "KYC pass · ready", tone: "ok" },
      { key: "Witness · CA remote", value: "Scheduled · 14:10 PT", tone: "neutral" },
      { key: "Chain target", value: "Fidelis Vault M-2046", tone: "ok" },
    ],
  },
  "tide/concierge": {
    headline: "Guest threads",
    sub: "Every channel, one voice — SLA by tier, handoff to humans when trust breaks.",
    metrics: [
      { label: "Open threads", value: "28" },
      { label: "Median first reply", value: "2m 14s" },
      { label: "CSAT (7d)", value: "4.7" },
    ],
    rows: [
      { key: "Rm 412 · WhatsApp", value: "Late checkout · offer sent", tone: "ok" },
      { key: "VIP · email", value: "Awaiting GM approval · SLA 15m", tone: "warn" },
      { key: "OTA · booking amend", value: "Synced to PMS · audit trail on", tone: "neutral" },
    ],
  },
  "tide/revenue": {
    headline: "Revenue desk",
    sub: "Rate, pace, pickup — one read per property with variance callouts.",
    metrics: [
      { label: "RevPAR vs STLY", value: "+1.1%" },
      { label: "Pace (30d)", value: "102%" },
      { label: "Pickup tonight", value: "78%" },
    ],
    rows: [
      { key: "Comp set · ADR", value: "$18 under leader · watch", tone: "warn" },
      { key: "Group block · wedding", value: "BAR held · release 14d", tone: "ok" },
      { key: "OTA parity", value: "Clean · last scan 06:12", tone: "ok" },
    ],
  },
  "tide/housekeeping": {
    headline: "Housekeeping board",
    sub: "Room status, linen, timing — engineering handoffs visible to ops.",
    metrics: [
      { label: "Rooms dirty", value: "37" },
      { label: "Turns before 3pm", value: "12" },
      { label: "VIP touches", value: "4" },
    ],
    rows: [
      { key: "412 · checkout", value: "Inspect · maintenance flag", tone: "warn" },
      { key: "308 · stayover", value: "DNM · guest in room", tone: "neutral" },
      { key: "Linens · truck 2", value: "On property · 11:20", tone: "ok" },
    ],
  },
  "tide/guestbook": {
    headline: "Guest memory",
    sub: "Every guest, every stay — preferences and recovery hooks without spreadsheet chaos.",
    metrics: [
      { label: "Profiles synced", value: "1,204" },
      { label: "VIP tags", value: "86" },
      { label: "Stays (30d)", value: "412" },
    ],
    rows: [
      { key: "M.Ruiz · repeat", value: "Anniversary Oct 12 · notes merged", tone: "ok" },
      { key: "OTA profile drift", value: "Merge queue · 2 conflicts", tone: "warn" },
      { key: "GDPR export · Rm 201", value: "Pack ready · link 24h", tone: "neutral" },
    ],
  },
  "tide/scout": {
    headline: "Channel lab",
    sub: "Quiet experiments on inventory and lift — guardrailed, reversible, measured.",
    metrics: [
      { label: "Active tests", value: "4" },
      { label: "Lift vs control", value: "+2.4%" },
      { label: "Channels watched", value: "11" },
    ],
    rows: [
      { key: "Exp · OTA flash", value: "Day 6/14 · within band", tone: "ok" },
      { key: "Metasearch bid", value: "Paused · parity breach", tone: "warn" },
      { key: "Direct · package", value: "Holdout clean", tone: "neutral" },
    ],
  },
  "fidelis/ledger": {
    headline: "Ledger desk",
    sub: "Books that read and write — close-ready entities with Vault receipts threaded through.",
    metrics: [
      { label: "Entities in close", value: "12" },
      { label: "Unmatched", value: "4" },
      { label: "Receipt gap", value: "3" },
    ],
    rows: [
      { key: "Aurora HoldCo · Sep", value: "Trial balance balanced · filing queued", tone: "ok" },
      { key: "Stripe payouts · week 38", value: "2 lines need memo", tone: "warn" },
      { key: "Vault · Q3 pack", value: "All docs chained", tone: "neutral" },
    ],
  },
  "fidelis/vault": {
    headline: "Vault room",
    sub: "Every document, chain-of-custody — stamped, hashed, and queryable without digging through email.",
    metrics: [
      { label: "Objects indexed", value: "2,841" },
      { label: "Pending attest", value: "5" },
      { label: "Retention holds", value: "2" },
    ],
    rows: [
      { key: "M-2046 · formation pack", value: "Chain complete · Ledger linked", tone: "ok" },
      { key: "Apostille · CA corp", value: "Awaiting Seal witness", tone: "warn" },
      { key: "Export · counsel review", value: "ZIP ready · 48h link", tone: "neutral" },
    ],
  },
  "fidelis/filing": {
    headline: "Filing runway",
    sub: "Deadline to filed — extensions, estimates, and jurisdiction routing in one lane.",
    metrics: [
      { label: "Due (14d)", value: "7" },
      { label: "Filed (30d)", value: "23" },
      { label: "At risk", value: "1" },
    ],
    rows: [
      { key: "1120-S · Aurora HoldCo", value: "Extension on file · pay voucher OK", tone: "ok" },
      { key: "DE franchise · Q3", value: "Portal outage · manual queue", tone: "warn" },
      { key: "Payroll · NY-45", value: "Scheduled · auto-remit", tone: "neutral" },
    ],
  },
  "fidelis/counsel": {
    headline: "Counsel desk",
    sub: "The advisor on staff — memos, elections, and board-ready language without calendar Tetris.",
    metrics: [
      { label: "Open matters", value: "9" },
      { label: "Partner review", value: "2" },
      { label: "SLA (biz days)", value: "<3" },
    ],
    rows: [
      { key: "83(b) · founder grant", value: "Draft ready · signature pack", tone: "ok" },
      { key: "SAFE conversion memo", value: "Blocked on cap table CSV", tone: "warn" },
      { key: "Board consent · subsidiary", value: "Circulating · Docusign", tone: "neutral" },
    ],
  },
  "fidelis/audit": {
    headline: "Audit read",
    sub: "The read-through, on demand — variance, control gaps, and board-ready findings in one pass.",
    metrics: [
      { label: "Entities in scope", value: "6" },
      { label: "Open findings", value: "4" },
      { label: "Sign-off due", value: "11d" },
    ],
    rows: [
      { key: "Aurora HoldCo · Q3", value: "Materiality mapped · 2 PBCs open", tone: "ok" },
      { key: "Interco eliminations", value: "Mismatch · $12k · needs Ledger tie-out", tone: "warn" },
      { key: "Vault evidence pack", value: "Auto-stitched · v3", tone: "neutral" },
    ],
  },
  "helios/portfolio": {
    headline: "Portfolio tower",
    sub: "All accounts, one read — liquidity, private, and retirement sleeves with drift callouts.",
    metrics: [
      { label: "Household AUM", value: "$27.4M" },
      { label: "Sleeves off-policy", value: "2" },
      { label: "Cash drag", value: "0.4%" },
    ],
    rows: [
      { key: "Public · US growth", value: "Within band · rebalance not needed", tone: "ok" },
      { key: "Private · Fund IV", value: "Capital call due · wire pending", tone: "warn" },
      { key: "Trust · distribution", value: "Window open · $140k eligible", tone: "neutral" },
    ],
  },
  "helios/ledger-w": {
    headline: "Wealth ledger",
    sub: "Wealth-side books, audit-clean — ties to Fidelis entities without double entry hell.",
    metrics: [
      { label: "Entities linked", value: "8" },
      { label: "Recs open", value: "3" },
      { label: "Last close", value: "Sep 30" },
    ],
    rows: [
      { key: "HoldCo · management fees", value: "Accrued · matches counsel memo", tone: "ok" },
      { key: "GRAT · mark-to-model", value: "Awaiting valuation refresh", tone: "warn" },
      { key: "Distribution accrual", value: "Posted · Trust minute ref T-118", tone: "neutral" },
    ],
  },
  "helios/trust": {
    headline: "Trust administration",
    sub: "Distributions, minutes, minutes — who gets what, when, with a paper trail the IRS can read.",
    metrics: [
      { label: "Active trusts", value: "4" },
      { label: "Distributions (90d)", value: "6" },
      { label: "Minute gaps", value: "1" },
    ],
    rows: [
      { key: "Trust-A · Q3 distribution", value: "Window open · $140k eligible", tone: "ok" },
      { key: "Trust-B · Crummey", value: "Notice due · 8d", tone: "warn" },
      { key: "Corporate trustee packet", value: "Vault synced · v2", tone: "neutral" },
    ],
  },
  "helios/estate": {
    headline: "Estate map",
    sub: "Every asset, every heir — liquidity, illiquid, and cross-border in one generational read.",
    metrics: [
      { label: "Assets mapped", value: "127" },
      { label: "Heir profiles", value: "14" },
      { label: "Stale valuations", value: "3" },
    ],
    rows: [
      { key: "Private co · HoldCo", value: "409A refresh scheduled", tone: "ok" },
      { key: "RE · ski house", value: "Title exception · counsel loop", tone: "warn" },
      { key: "Art · collection", value: "Appraisal on file", tone: "neutral" },
    ],
  },
  "helios/family-office": {
    headline: "Family office layer",
    sub: "The admin layer — calendar, vendors, and household ops without a 7-figure bench.",
    metrics: [
      { label: "Households", value: "3" },
      { label: "Open tasks", value: "11" },
      { label: "Vendor SLAs", value: "6" },
    ],
    rows: [
      { key: "Aviation · Q4 slot", value: "Hold · deposit cleared", tone: "ok" },
      { key: "Property tax · appeal", value: "Awaiting county response", tone: "warn" },
      { key: "Staff payroll", value: "Biweekly · auto", tone: "neutral" },
    ],
  },
  "helios/yield": {
    headline: "Yield desk",
    sub: "Where the cash actually is — sweep targets, idle balances, and drag callouts across sleeves.",
    metrics: [
      { label: "Cash & equiv", value: "$2.1M" },
      { label: "Weighted yield (7d)", value: "4.92%" },
      { label: "Sweeps pending", value: "2" },
    ],
    rows: [
      { key: "Operating · Mercury", value: "Auto-sweep · T-Bill ladder", tone: "ok" },
      { key: "Trust cash · idle", value: "$180k · above policy 6d", tone: "warn" },
      { key: "MMF · tier-1", value: "Within risk band", tone: "neutral" },
    ],
  },
  "alder/intake": {
    headline: "Kairos intake",
    sub: "Biomarkers, history, baseline — one structured pass before Protocol owns the cadence.",
    metrics: [
      { label: "Households onboarding", value: "5" },
      { label: "Labs ordered", value: "12" },
      { label: "Median complete", value: "6d" },
    ],
    rows: [
      { key: "Household K-0007", value: "Baseline drawn · Quest scheduled", tone: "ok" },
      { key: "Minor-A · consent", value: "Parent signature pending", tone: "warn" },
      { key: "Wearable link", value: "Oura synced", tone: "neutral" },
    ],
  },
  "alder/protocol": {
    headline: "Protocol loop",
    sub: "The plan — adjusted weekly. Evidence-first deltas without the spreadsheet spiral.",
    metrics: [
      { label: "Active protocols", value: "28" },
      { label: "Adjustments (7d)", value: "9" },
      { label: "At-risk streaks", value: "2" },
    ],
    rows: [
      { key: "ApoB protocol · tier-2", value: "On track · statin tolerance OK", tone: "ok" },
      { key: "Sleep debt · founder", value: "Intervention suggested", tone: "warn" },
      { key: "VO2 block · month 3", value: "Deload week", tone: "neutral" },
    ],
  },
  "alder/labs": {
    headline: "Labs rail",
    sub: "Order, read, remember — every draw tied to Protocol targets and Vault retention.",
    metrics: [
      { label: "Orders (30d)", value: "34" },
      { label: "Results ingested", value: "31" },
      { label: "Flagged outliers", value: "2" },
    ],
    rows: [
      { key: "Lipid panel · K-0007", value: "In range vs last · ApoB 82", tone: "ok" },
      { key: "HbA1c · repeat", value: "Fasting protocol not met", tone: "warn" },
      { key: "Thyroid · annual", value: "Scheduled · Thu 08:30", tone: "neutral" },
    ],
  },
  "alder/cadence": {
    headline: "Cadence board",
    sub: "The streaks that actually matter — sleep, training, supplements, and clinic touchpoints.",
    metrics: [
      { label: "Active streaks", value: "18" },
      { label: "Broken (7d)", value: "1" },
      { label: "Longest run", value: "94d" },
    ],
    rows: [
      { key: "Sleep · 7h+ target", value: "12/14 nights", tone: "ok" },
      { key: "Zone-2 · 3×/wk", value: "Missed · travel block", tone: "warn" },
      { key: "Omega-3 · daily", value: "Clean", tone: "neutral" },
    ],
  },
  "alder/concierge-m": {
    headline: "Concierge medicine",
    sub: "Book the doctor, the flight, the meal — household logistics without the group chat.",
    metrics: [
      { label: "Open bookings", value: "7" },
      { label: "SLA breaches", value: "0" },
      { label: "Households", value: "6" },
    ],
    rows: [
      { key: "Cardiology · Dr. N", value: "Confirmed · Mar 12", tone: "ok" },
      { key: "Imaging · SF", value: "Hold · insurance auth", tone: "warn" },
      { key: "Private chef · Fri", value: "Menu sent", tone: "neutral" },
    ],
  },
  "alder/atria": {
    headline: "Kairos foyer",
    sub: "Foyer — the guided entry to Kairos. One front door before Intake, Protocol, and Labs fan out.",
    metrics: [
      { label: "Guided sessions", value: "142" },
      { label: "Completion to Intake", value: "89%" },
      { label: "Drop-off (7d)", value: "3" },
    ],
    rows: [
      { key: "Household K-0007", value: "Foyer complete → Intake unlocked", tone: "ok" },
      { key: "Corporate pilot · 12 seats", value: "NDA gate · pending", tone: "warn" },
      { key: "Locale · EN/ES", value: "Grammar route on", tone: "neutral" },
    ],
  },
  "mortar/blueprint": {
    headline: "Blueprint stack",
    sub: "Drawings that read back to you — revisions, RFI threads, and permit-ready sets in one rail.",
    metrics: [
      { label: "Active sets", value: "8" },
      { label: "Open RFIs", value: "5" },
      { label: "Sheets due (7d)", value: "14" },
    ],
    rows: [
      { key: "P-0042 · Level 3", value: "Issued for permit · v4", tone: "ok" },
      { key: "MEP coordination", value: "Clash · 3 zones", tone: "warn" },
      { key: "Archive · ASI-12", value: "Vault linked", tone: "neutral" },
    ],
  },
  "mortar/permit": {
    headline: "Permit filings",
    sub: "Every filing, every agency — deadlines, inspectors, and conditions without the spreadsheet.",
    metrics: [
      { label: "Jurisdictions", value: "4" },
      { label: "In review", value: "3" },
      { label: "Issued (YTD)", value: "11" },
    ],
    rows: [
      { key: "Building · City of Austin", value: "Plan check · week 2/4", tone: "ok" },
      { key: "Fire · variance", value: "Hearing Mar 3", tone: "warn" },
      { key: "TCO target", value: "Aug 14", tone: "neutral" },
    ],
  },
  "mortar/crew": {
    headline: "Crew roster",
    sub: "Who's on site, why, when — subs, gates, and safety briefs tied to the day’s scope.",
    metrics: [
      { label: "On site today", value: "47" },
      { label: "Sub tiers", value: "9" },
      { label: "Near-miss (30d)", value: "0" },
    ],
    rows: [
      { key: "Concrete · Pod A", value: "Pour 06:00 · weather OK", tone: "ok" },
      { key: "Electrical · mezz", value: "Hold · lift conflict", tone: "warn" },
      { key: "Safety stand-down", value: "Completed · sign-in 100%", tone: "neutral" },
    ],
  },
  "mortar/site": {
    headline: "Site daily",
    sub: "The daily — photos, notes, delays. The superintendent’s read without forty WhatsApp groups.",
    metrics: [
      { label: "Photo sets (7d)", value: "28" },
      { label: "Open delays", value: "2" },
      { label: "Rain days (YTD)", value: "4" },
    ],
    rows: [
      { key: "Day 127 · weather", value: "Clear · crane swing 14:00", tone: "ok" },
      { key: "Laydown · logistics", value: "Truck 4 late · 55m", tone: "warn" },
      { key: "Owner walk", value: "Fri 09:00", tone: "neutral" },
    ],
  },
  "mortar/ledger-c": {
    headline: "Construction ledger",
    sub: "Draws, liens, change orders — money movement the GC can defend in one pass.",
    metrics: [
      { label: "Draw #", value: "4" },
      { label: "Retainage held", value: "$420k" },
      { label: "Open COs", value: "3" },
    ],
    rows: [
      { key: "Draw #4 · submitted", value: "Lender review · 4d", tone: "ok" },
      { key: "CO-018 · steel", value: "Awaiting architect sign", tone: "warn" },
      { key: "Lien waiver · tier-2", value: "On file", tone: "neutral" },
    ],
  },
  "mortar/punch": {
    headline: "Punch close-out",
    sub: "Close-out, bracketed — owner list, warranty clock, and handoff packet readiness.",
    metrics: [
      { label: "Open punch", value: "38" },
      { label: "Warranty starts", value: "12" },
      { label: "Substantial", value: "Target 42d" },
    ],
    rows: [
      { key: "Level 2 · paint", value: "Rework scheduled", tone: "warn" },
      { key: "MEP startup", value: "Signed off", tone: "ok" },
      { key: "O&M binders", value: "Draft v2", tone: "neutral" },
    ],
  },
  "lex/matter": {
    headline: "Matter desk",
    sub: "Open, scope, price, ship — the matter is the product; the terminal is the docket.",
    metrics: [
      { label: "Open matters", value: "24" },
      { label: "Avg cycle", value: "18d" },
      { label: "Write-off risk", value: "1" },
    ],
    rows: [
      { key: "M-2046 · NDA", value: "Flat fee $1,800 · in flight", tone: "ok" },
      { key: "M-2051 · lease", value: "Scope creep · partner review", tone: "warn" },
      { key: "Conflict check", value: "Clear", tone: "neutral" },
    ],
  },
  "lex/brief": {
    headline: "Brief studio",
    sub: "Draft in the house voice — playbooks, clauses, and partner-ready memos without version chaos.",
    metrics: [
      { label: "Drafts (7d)", value: "16" },
      { label: "Partner queue", value: "3" },
      { label: "Client turnaround SLA", value: "<48h" },
    ],
    rows: [
      { key: "Memo · SAFE conversion", value: "V3 · ready for send", tone: "ok" },
      { key: "Demand letter · vendor", value: "Tone review", tone: "warn" },
      { key: "Style profile", value: "Docket · locked", tone: "neutral" },
    ],
  },
};

function liveAgentKeysForInterfaceDev(): string[] {
  const skip = new Set(INTERFACE_DEV_EXCLUDED_HOLDING_SLUGS);
  const keys: string[] = [];
  for (const h of HOLDINGS) {
    if (skip.has(h.slug)) continue;
    for (const a of h.agents) {
      if (a.status === "live") keys.push(`${h.slug}/${a.slug}`);
    }
  }
  return keys;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function buildBatches(): { id: number; title: string; slugs: string[] }[] {
  const used = new Set<string>(BATCH_1_SLUGS);
  const batches: { id: number; title: string; slugs: string[] }[] = [
    {
      id: 1,
      title: "Onboarding · ops floor · stamp queue",
      slugs: [...BATCH_1_SLUGS],
    },
  ];

  const rest = liveAgentKeysForInterfaceDev().filter((k) => !used.has(k));
  let id = 2;
  for (const slugs of chunk(rest, 3)) {
    const title =
      id === 2
        ? "Guest threads · revenue desk · housekeeping board"
        : id === 3
          ? "Guest memory · channel lab · ledger read"
          : id === 4
            ? "Vault chain · filing runway · counsel desk"
            : id === 5
              ? "Audit read · portfolio tower · wealth ledger"
              : id === 6
                ? "Trust administration · estate map · family office"
                : id === 7
                  ? "Yield sweep · Kairos intake · protocol loop"
                  : id === 8
                    ? "Labs rail · cadence streaks · concierge medicine"
                    : id === 9
                      ? "Kairos foyer · blueprint stack · permit filings"
                      : id === 10
                        ? "Crew roster · site daily · construction ledger"
                        : id === 11
                          ? "Punch close-out · matter desk · brief studio"
                          : `Batch ${id}`;
    batches.push({
      id,
      title,
      slugs,
    });
    id += 1;
  }
  return batches;
}

export const INTERFACE_DEV_BATCHES = buildBatches();

/** Interface-dev batch that contains `holdingSlug/agentSlug`, or null if none (e.g. excluded holdings). */
export function getBatchIdForAgentKey(agentKey: string): number | null {
  for (const b of INTERFACE_DEV_BATCHES) {
    if (b.slugs.includes(agentKey)) return b.id;
  }
  return null;
}

/** True when this key is one of the three slugs in the currently active dev batch. */
export function isAgentKeyInActiveInterfaceBatch(agentKey: string): boolean {
  const batch = INTERFACE_DEV_BATCHES.find((b) => b.id === ACTIVE_INTERFACE_DEV_BATCH);
  return batch?.slugs.includes(agentKey) ?? false;
}

function shortLabelForAgentSlug(agentSlug: string): string {
  if (agentSlug === "housekeeping") return "HK";
  if (agentSlug === "ledger-w") return "Ledger-W";
  if (agentSlug === "family-office") return "Fam Office";
  if (agentSlug === "concierge-m") return "Concierge M";
  if (agentSlug === "ledger-c") return "Ledger-C";
  return agentSlug
    .split("-")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** Steps 1–3 for any batch (batch 1–2 use fixed shorts; 3+ derived from `INTERFACE_DEV_BATCHES`). */
export function getDevStepsForBatch(batchId: number): { step: 1 | 2 | 3; slug: string; short: string }[] {
  if (batchId === 1) {
    return BATCH_1_DEV_STEPS.map((s) => ({ step: s.step, slug: s.slug, short: s.short }));
  }
  if (batchId === 2) {
    return BATCH_2_DEV_STEPS.map((s) => ({ step: s.step, slug: s.slug, short: s.short }));
  }
  const b = INTERFACE_DEV_BATCHES.find((x) => x.id === batchId);
  if (!b?.slugs.length) return [];
  return b.slugs.map((slug, i) => {
    const agentSlug = slug.split("/")[1] ?? "";
    return { step: (i + 1) as 1 | 2 | 3, slug, short: shortLabelForAgentSlug(agentSlug) };
  });
}

/**
 * Split **all** interface batches into three waves (~equal thirds). Work wave 1, then 2, then 3.
 */
export function getInterfaceDevWaves(): {
  id: 1 | 2 | 3;
  title: string;
  batches: { id: number; title: string; slugs: string[] }[];
}[] {
  const all = INTERFACE_DEV_BATCHES;
  const n = all.length;
  const first = Math.ceil(n / 3);
  const remainder = n - first;
  const second = remainder <= 0 ? 0 : Math.ceil(remainder / 2);
  const w1 = all.slice(0, first);
  const w2 = all.slice(first, first + second);
  const w3 = all.slice(first + second);
  return [
    { id: 1, title: "Wave 1 · first third of batches", batches: w1 },
    { id: 2, title: "Wave 2 · middle third", batches: w2 },
    { id: 3, title: "Wave 3 · final third", batches: w3 },
  ];
}

export function waveContainingBatchId(batchId: number) {
  return getInterfaceDevWaves().find((w) => w.batches.some((b) => b.id === batchId));
}

/**
 * Within `ACTIVE_INTERFACE_DEV_BATCH`, build **one** agent at a time: 0 → first slug, 1 → second, 2 → third.
 * When those three are done, set to `0` and bump `ACTIVE_INTERFACE_DEV_BATCH`.
 */
export const INTERFACE_DEV_SEQUENCE_INDEX = 1;

/** Human step 1–3 for the active batch slot (index 0 → step 1). */
export function getSequenceHumanStep(): 1 | 2 | 3 {
  const s = INTERFACE_DEV_SEQUENCE_INDEX + 1;
  return Math.min(3, Math.max(1, s)) as 1 | 2 | 3;
}

export function getSequenceFocusKey(): string | undefined {
  const batch = INTERFACE_DEV_BATCHES.find((b) => b.id === ACTIVE_INTERFACE_DEV_BATCH);
  const slug = batch?.slugs[INTERFACE_DEV_SEQUENCE_INDEX];
  return slug;
}

export function isSequenceFocus(holdingSlug: string, agentSlug: string): boolean {
  return getSequenceFocusKey() === `${holdingSlug}/${agentSlug}`;
}

export function getInterfacePreview(holdingSlug: string, agentSlug: string): InterfacePreview | undefined {
  const key = `${holdingSlug}/${agentSlug}`;
  const batch = INTERFACE_DEV_BATCHES.find((b) => b.id === ACTIVE_INTERFACE_DEV_BATCH);
  if (!batch?.slugs.includes(key)) return undefined;
  return PREVIEWS[key];
}

function syntheticGaPreview(key: string): InterfacePreview | undefined {
  const offer = getOffer(key);
  if (!offer || offer.atlasStatus !== "live" || offer.gtmPhase !== "general_availability") return undefined;
  const targets = offer.integrationTargets.slice(0, 4).join(", ") || "—";
  return {
    headline: `${offer.agentName} · operator shell`,
    sub: offer.agentBlurb,
    metrics: [
      { label: "GTM", value: "GA" },
      { label: "SKU", value: offer.skuMode },
      { label: "Tier", value: offer.tier },
    ],
    rows: [
      {
        key: "Deploy hint",
        value: offer.deploymentHint ?? "pending",
        tone: "neutral",
      },
      { key: "Integration targets", value: targets, tone: "ok" },
      { key: "Catalog", value: offer.key, tone: "neutral" },
    ],
  };
}

/**
 * Preview for the interface panel: rich `PREVIEWS` when the agent is in the **active** dev batch,
 * otherwise a **synthetic** shell for any **GA** live SKU so Hub-facing agents still show the panel.
 */
export function getInterfacePreviewForProduct(holdingSlug: string, agentSlug: string): InterfacePreview | undefined {
  const keyed = getInterfacePreview(holdingSlug, agentSlug);
  if (keyed) return keyed;
  return syntheticGaPreview(`${holdingSlug}/${agentSlug}`);
}
