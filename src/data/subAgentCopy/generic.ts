import type { Agent, Holding } from "../atlas";
import { holdingFlavor } from "./holdingFlavor";
import type { SubAgentCopy } from "./types";
import { flagshipName } from "./types";

function tiersFor(h: Holding, agent: Agent): SubAgentCopy["tiers"] {
  const byTier = Object.fromEntries(h.pricing.map((x) => [x.tier, x])) as Record<
    string,
    { price: string; for: string }
  >;
  const page = byTier.PAGE;
  const chapter = byTier.CHAPTER ?? h.pricing[0];
  const volume = byTier.VOLUME ?? byTier.ATLAS ?? h.pricing[h.pricing.length - 1];
  const fn = flagshipName(h);
  return [
    {
      name: page ? `PAGE · ${agent.name}` : `Entry · ${agent.name}`,
      price: page?.price ?? chapter.price,
      note: page?.for ?? chapter.for,
    },
    {
      name: `CHAPTER · with ${fn}`,
      price: chapter.price,
      note: chapter.for,
      recommended: true,
    },
    {
      name: `VOLUME · program / portfolio`,
      price: volume.price,
      note: volume.for,
    },
  ];
}

const INTEGRATION_PRESETS: Record<string, string[]> = {
  tide: ["Mews", "Cloudbeds", "Opera", "WhatsApp Business", "Stripe", "Twilio", "Slack", "Google Workspace", "Notion", "Snowflake", "Metabase", "Zapier"],
  lore: ["Canvas", "Google Classroom", "Zoom", "Slack", "Notion", "HubSpot", "Stripe", "Intercom", "Airtable", "Make", "Anthropic", "OpenAI"],
  fidelis: ["Plaid", "Stripe", "Mercury", "Brex", "Ramp", "QuickBooks", "DocuSign", "Clio", "Slack", "Google Workspace", "Snowflake", "Zapier"],
  helios: ["Addepar", "Black Diamond", "Carta", "Plaid", "Stripe", "DocuSign", "Slack", "Mercury", "Fidelity", "Schwab", "Snowflake", "Zapier"],
  alder: ["Quest", "Labcorp", "Function Health", "Oura", "Whoop", "Apple Health", "Cronometer", "Telehealth", "Slack", "Google Calendar", "Notion", "Zapier"],
  mortar: ["Procore", "Autodesk", "Plangrid", "DocuSign", "Slack", "Twilio", "Mercury", "Stripe", "Google Workspace", "Airtable", "Snowflake", "Zapier"],
  lex: ["Clio", "iManage", "NetDocuments", "DocuSign", "Outlook", "LawPay", "Stripe", "Slack", "Google Workspace", "Ironclad", "Zapier", "OpenAI"],
  seal: ["DocuSign", "Notarize", "Stripe", "Twilio", "Slack", "Google Workspace", "AWS KMS", "Vault", "Snowflake", "Zapier", "Okta", "OpenAI"],
};

/** Shared English base before vertical `holdingFlavor` merge. */
export function buildBaseSubAgentCopy(holding: Holding, agent: Agent): SubAgentCopy {
  const fn = flagshipName(holding);
  const integrations = INTEGRATION_PRESETS[holding.slug] ?? INTEGRATION_PRESETS.tide;

  const base: SubAgentCopy = {
    heroItalic: agent.blurb,
    heroLede: `${agent.name} is the specialist seat inside ${holding.name}. ${holding.thesis} The flagship (${fn}) is the umbrella — this agent is the workflow customers buy when this problem deserves its own margin, roadmap, and onboarding story.`,
    whyTitle: `Why ${agent.name} is its own product`,
    whyH2: "Depth you can sell on its own.",
    whyP1: `${holding.name} wins when operators can buy the exact job-to-be-done. ${agent.name} carries that story without hiding inside a generic "platform" slide.`,
    whyP2: `This landing exists so finance and procurement can say what they're paying for — and so ${fn} stays the flagship, not a catch-all.`,
    replaceKicker: `What ${agent.name} replaces`,
    replaceH2: "The stack before the network.",
    replaceSub: `What teams run before ${agent.name} routes work through Passport and ${holding.name}'s grammar.`,
    before: [
      "Point tools that don't share identity or memory",
      "Playbooks living in slides · not in execution",
      "Handoffs that drop context between teams",
      "No single place to answer 'what happened last time?'",
      "Pricing that punishes you for growing usage",
    ],
    after: [
      `One Passport identity across ${holding.name} agents`,
      `${agent.name} runbooks with audit trail + approvals`,
      "Memory lanes that respect consent and vertical boundaries",
      `Escalation paths that know ${fn} context`,
      "Tier grammar that matches the rest of LYRA",
    ],
    howH2: "Capture · Reason · Ship · Review.",
    steps: [
      {
        label: "01 · Capture",
        text: `Ingest the facts ${agent.name} needs — documents, IDs, schedules, structured events — once.`,
      },
      {
        label: "02 · Reason",
        text: `Apply ${holding.name} policy + playbooks; surface exceptions before they become incidents.`,
      },
      {
        label: "03 · Ship",
        text: `Produce the artifact operators expect: filing, message, stamp, ticket, brief — in voice.`,
      },
      {
        label: "04 · Review",
        text: "Measure cycle time, rework, and outcomes; feed Memory for the next pass.",
      },
    ],
    terminalTitle: `Live scene · ${agent.name}.`,
    terminalSub: "Static preview — production terminal ships with the first design partner.",
    terminalBody: `$ lyra ${agent.slug} status --holding ${holding.slug}

┌─ ${holding.name.toUpperCase()} · ${agent.name.toUpperCase()} ─────────────────
│ Tier .......... ${agent.tier}
│ Passport ...... linked
│ Memory lane ... ${holding.vertical.split(" · ")[0] ?? holding.vertical}
└──────────────────────────────────────────────────

  last_run ...... OK
  queue ......... 0 blocking

  // static preview`,
    useH2: `A ${holding.persona.split("·")[0]?.trim() ?? "operator"} team, twelve weeks in.`,
    useSub: "Anonymized composite · representative shape.",
    useBlocks: [
      {
        label: "00 · Before",
        text: `Work happened across three tools; ${agent.name} was everyone's side project.`,
      },
      {
        label: "01 · Pilot",
        text: "First workflow end-to-end in Passport · exceptions down · cycle time visible.",
      },
      {
        label: "02 · Scale",
        text: `Expanded to second business unit · ${fn} stayed the calm read — ${agent.name} owned the job.`,
      },
    ],
    pricingH2: "Standalone · bundled · program.",
    pricingSub: `PAGE for a focused lane · CHAPTER with ${fn} · VOLUME when the program spans entities or jurisdictions.`,
    tiers: tiersFor(holding, agent),
    intH2: "Integrations · bring your stack.",
    intSub: "Names are representative; live installs follow your existing agreements.",
    integrations: [...integrations],
    ctaH2: `Design partners · ${agent.name} cohort.`,
    ctaBody: `We co-configure the first runbooks, approvals, and Memory lanes with your team — alongside ${fn}.`,
    designPartnerLine: `${holding.name} · ${holding.persona} · LYRA design partner track`,
    stats: [
      { label: "Tier floor", value: agent.tier },
      { label: "Vertical", value: holding.vertical.split(" · ")[0] ?? holding.vertical },
      { label: "Persona", value: holding.persona.split("·")[0]?.trim() ?? "—" },
      { label: "Holding", value: holding.code },
    ],
  };

  if (agent.status === "draft") {
    return { ...base, ...draftSubAgentCopyOverrides(holding, agent, fn, integrations) };
  }
  return base;
}

/** Roadmap agents: copy tuned for Atlas draft status (SKU + shell ship later). */
function draftSubAgentCopyOverrides(
  holding: Holding,
  agent: Agent,
  fn: string,
  integrations: string[],
): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} is on the roadmap inside ${holding.name}. ${holding.thesis} This page locks the job-to-be-done before Passport wiring, interface shells, and sellable SKUs — ship order follows Hub · interface batches.`,
    pricingSub: `Tier grammar matches the rest of LYRA; SKUs stay in roadmap until this agent is promoted to live. Pricing is indicative for planning and design-partner scoping.`,
    terminalTitle: `Roadmap scene · ${agent.name}.`,
    terminalSub: "Atlas narrative ships first; the operator shell attaches when this agent enters the interface-dev sequence.",
    terminalBody: `$ lyra ${agent.slug} status --holding ${holding.slug}

┌─ ${holding.name.toUpperCase()} · ${agent.name.toUpperCase()} ─────────────────
│ Tier .......... ${agent.tier}
│ Passport ...... pending (roadmap)
│ Atlas ......... draft
└──────────────────────────────────────────────────

  queue ......... not provisioned

  // roadmap preview`,
    stats: [
      { label: "Atlas", value: "Roadmap" },
      { label: "Tier floor", value: agent.tier },
      { label: "Vertical", value: holding.vertical.split(" · ")[0] ?? holding.vertical },
      { label: "Holding", value: holding.code },
    ],
    ctaBody: `We're shaping ${agent.name} with design partners while it stays in roadmap — co-author flows before GA, alongside ${fn}.`,
    integrations: [...integrations],
  };
}

export function buildGenericSubAgentCopy(holding: Holding, agent: Agent): SubAgentCopy {
  return { ...buildBaseSubAgentCopy(holding, agent), ...holdingFlavor(holding, agent) };
}
