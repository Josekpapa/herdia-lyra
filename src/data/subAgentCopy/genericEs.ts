import type { Agent, Holding } from "../atlas";
import type { SubAgentCopy } from "./types";
import { flagshipName } from "./types";

function tiersForEs(h: Holding, agent: Agent): SubAgentCopy["tiers"] {
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
      name: page ? `PÁGINA · ${agent.name}` : `Entrada · ${agent.name}`,
      price: page?.price ?? chapter.price,
      note: page?.for ?? chapter.for,
    },
    {
      name: `CAPÍTULO · con ${fn}`,
      price: chapter.price,
      note: chapter.for,
      recommended: true,
    },
    {
      name: `VOLUMEN · programa / cartera`,
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

function draftSubAgentCopyOverridesEs(
  holding: Holding,
  agent: Agent,
  fn: string,
  integrations: string[],
): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} está en la hoja de ruta dentro de ${holding.name}. ${holding.thesis} Esta página fija el trabajo a realizar antes de Passport, shells de interfaz y SKUs vendibles — el orden sigue Hub · interface batches.`,
    pricingSub: `La gramática de tier coincide con LYRA; los SKUs permanecen en roadmap hasta promover el agente a live. Los precios son orientativos para planificación y socios de diseño.`,
    terminalTitle: `Escena roadmap · ${agent.name}.`,
    terminalSub: "Primero la narrativa en Atlas; el terminal operador llega cuando el agente entra en la secuencia interface-dev.",
    terminalBody: `$ lyra ${agent.slug} status --holding ${holding.slug}

┌─ ${holding.name.toUpperCase()} · ${agent.name.toUpperCase()} ─────────────────
│ Tier .......... ${agent.tier}
│ Passport ...... pendiente (roadmap)
│ Atlas ......... borrador
└──────────────────────────────────────────────────

  cola .......... no aprovisionada

  // vista roadmap`,
    stats: [
      { label: "Atlas", value: "Roadmap" },
      { label: "Piso de tier", value: agent.tier },
      { label: "Vertical", value: holding.vertical.split(" · ")[0] ?? holding.vertical },
      { label: "Holding", value: holding.code },
    ],
    ctaBody: `Damos forma a ${agent.name} con socios de diseño mientras sigue en roadmap — co-autoría de flujos antes de GA, junto a ${fn}.`,
    integrations: [...integrations],
  };
}

/** Spanish base before `holdingFlavorEs` merge. */
export function buildBaseSubAgentCopyEs(holding: Holding, agent: Agent): SubAgentCopy {
  const fn = flagshipName(holding);
  const integrations = INTEGRATION_PRESETS[holding.slug] ?? INTEGRATION_PRESETS.tide;

  const base: SubAgentCopy = {
    heroItalic: agent.blurb,
    heroLede: `${agent.name} es el asiento especialista dentro de ${holding.name}. ${holding.thesis} El flagship (${fn}) es el paraguas: este agente es el flujo que compran los clientes cuando el problema merece margen, roadmap e historia de onboarding propios.`,
    whyTitle: `Por qué ${agent.name} es un producto propio`,
    whyH2: "Profundidad que se vende sola.",
    whyP1: `${holding.name} gana cuando los operadores pueden comprar el trabajo exacto. ${agent.name} lleva esa historia sin esconderse en una diapositiva genérica de “plataforma”.`,
    whyP2: `Esta landing existe para que finanzas y compras sepan qué pagan — y para que ${fn} siga siendo el flagship, no un comodín.`,
    replaceKicker: `Qué sustituye ${agent.name}`,
    replaceH2: "El stack antes de la red.",
    replaceSub: `Lo que los equipos usan antes de que ${agent.name} enrute trabajo por Passport y la gramática de ${holding.name}.`,
    before: [
      "Herramientas sueltas sin identidad ni memoria compartida",
      "Playbooks en slides · no en ejecución",
      "Entregas que pierden contexto entre equipos",
      "Ningún sitio para responder “¿qué pasó la vez pasada?”",
      "Precios que castigan cuando crece el uso",
    ],
    after: [
      `Una identidad Passport en los agentes de ${holding.name}`,
      `Runbooks de ${agent.name} con auditoría y aprobaciones`,
      "Carriles de memoria que respetan consentimiento y límites verticales",
      `Escaladas que conocen el contexto de ${fn}`,
      "Gramática de tier alineada con el resto de LYRA",
    ],
    howH2: "Capturar · Razonar · Entregar · Revisar.",
    steps: [
      {
        label: "01 · Capturar",
        text: `Ingerir lo que ${agent.name} necesita — documentos, IDs, calendarios, eventos — una sola vez.`,
      },
      {
        label: "02 · Razonar",
        text: `Aplicar política y playbooks de ${holding.name}; mostrar excepciones antes de que sean incidentes.`,
      },
      {
        label: "03 · Entregar",
        text: `Producir el artefacto que esperan los operadores: filing, mensaje, sello, ticket, brief — en voz.`,
      },
      {
        label: "04 · Revisar",
        text: "Medir tiempo de ciclo, retrabajo y resultados; alimentar Memory para la siguiente pasada.",
      },
    ],
    terminalTitle: `Escena en vivo · ${agent.name}.`,
    terminalSub: "Vista estática — el terminal de producción llega con el primer socio de diseño.",
    terminalBody: `$ lyra ${agent.slug} status --holding ${holding.slug}

┌─ ${holding.name.toUpperCase()} · ${agent.name.toUpperCase()} ─────────────────
│ Tier .......... ${agent.tier}
│ Passport ...... vinculado
│ Memory lane ... ${holding.vertical.split(" · ")[0] ?? holding.vertical}
└──────────────────────────────────────────────────

  last_run ...... OK
  queue ......... 0 bloqueando

  // vista estática`,
    useH2: `Un equipo ${holding.persona.split("·")[0]?.trim() ?? "operativo"}, a las doce semanas.`,
    useSub: "Compuesto anónimo · forma representativa.",
    useBlocks: [
      {
        label: "00 · Antes",
        text: `El trabajo vivía en tres herramientas; ${agent.name} era el proyecto paralelo de todos.`,
      },
      {
        label: "01 · Piloto",
        text: "Primer flujo de punta a punta en Passport · menos excepciones · tiempo de ciclo visible.",
      },
      {
        label: "02 · Escala",
        text: `Segunda unidad de negocio · ${fn} sigue siendo la lectura tranquila — ${agent.name} manda en el trabajo.`,
      },
    ],
    pricingH2: "Solo · bundle · programa.",
    pricingSub: `PÁGINA para un carril enfocado · CAPÍTULO con ${fn} · VOLUMEN cuando el programa cruza entidades o jurisdicciones.`,
    tiers: tiersForEs(holding, agent),
    intH2: "Integraciones · trae tu stack.",
    intSub: "Los nombres son orientativos; las instalaciones reales siguen tus acuerdos.",
    integrations: [...integrations],
    ctaH2: `Socios de diseño · cohorte ${agent.name}.`,
    ctaBody: `Co-configuramos los primeros runbooks, aprobaciones y carriles de Memory con tu equipo — junto a ${fn}.`,
    designPartnerLine: `${holding.name} · ${holding.persona} · pista de socio de diseño LYRA`,
    stats: [
      { label: "Piso de tier", value: agent.tier },
      { label: "Vertical", value: holding.vertical.split(" · ")[0] ?? holding.vertical },
      { label: "Persona", value: holding.persona.split("·")[0]?.trim() ?? "—" },
      { label: "Holding", value: holding.code },
    ],
  };

  if (agent.status === "draft") {
    return { ...base, ...draftSubAgentCopyOverridesEs(holding, agent, fn, integrations) };
  }
  return base;
}
