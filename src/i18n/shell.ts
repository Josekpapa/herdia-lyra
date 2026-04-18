export type LyraLocale = "en" | "es" | "de";

export const LYRA_LOCALE_STORAGE_KEY = "lyra.locale";

/** Flat keys for [data-shell-i18n] across Layout + Fidelis chrome */
export const shellLabels: Record<
  LyraLocale,
  Record<string, string>
> = {
  en: {
    "nav.marea": "Marea",
    "nav.fidelis": "Fidelis",
    "nav.agent": "Agent",
    "nav.scenarios": "Scenarios",
    "nav.intake": "Intake",
    "nav.tracker": "Tracker",
    "nav.audit": "Audit",
    "nav.team": "Team",
    "cta.launch": "Launch agent",
    "cta.signin": "Sign in",
    "cta.signout": "Sign out",
    "strip.line":
      "Travel & tax in one stack — Marea, Fidelis, and tools share this session.",
    "footer.kicker": "Disclosure",
    "footer.disclosure":
      "Fidelis is informational. Residency rules depend on treaties, ties, and facts the tool doesn't know about. Consult a qualified tax professional before making decisions.",
    "footer.built": "Built with Astro · Groq",
    "footer.copy": "Fidelis",
    "landing.tagline.gold": "FIDELIS",
    "landing.tagline.lyra": "LYRA",
    "landing.tagline.rest": "·",
    "landing.tagline.em": "Same rigor. More room.",
    "landing.hud.ch": "CH ·",
    "landing.hud.of": "/ 05",
    "landing.hud.depth": "SCROLL DEPTH",
    "landing.hud.hint": "↑↓ NAVIGATE · / → AGENT",
  },
  es: {
    "nav.marea": "Marea",
    "nav.fidelis": "Fidelis",
    "nav.agent": "Agente",
    "nav.scenarios": "Escenarios",
    "nav.intake": "Ingreso",
    "nav.tracker": "Residencia",
    "nav.audit": "Auditoría",
    "nav.team": "Equipo",
    "cta.launch": "Abrir agente",
    "cta.signin": "Entrar",
    "cta.signout": "Salir",
    "strip.line":
      "Viajes e impuestos en una sola capa — Marea, Fidelis y herramientas comparten esta sesión.",
    "footer.kicker": "Aviso",
    "footer.disclosure":
      "Fidelis es informativo. Las reglas de residencia dependen de tratados, vínculos y hechos que la herramienta desconoce. Consulte a un profesional fiscal antes de decidir.",
    "footer.built": "Hecho con Astro · Groq",
    "footer.copy": "Fidelis",
    "landing.tagline.gold": "FIDELIS",
    "landing.tagline.lyra": "LYRA",
    "landing.tagline.rest": "·",
    "landing.tagline.em": "Mismo rigor. Más espacio.",
    "landing.hud.ch": "CAP ·",
    "landing.hud.of": "/ 05",
    "landing.hud.depth": "PROFUNDIDAD",
    "landing.hud.hint": "↑↓ NAVEGAR · / → AGENTE",
  },
  de: {
    "nav.marea": "Marea",
    "nav.fidelis": "Fidelis",
    "nav.agent": "Agent",
    "nav.scenarios": "Szenarien",
    "nav.intake": "Eingang",
    "nav.tracker": "Aufenthalt",
    "nav.audit": "Audit",
    "nav.team": "Team",
    "cta.launch": "Agent starten",
    "cta.signin": "Anmelden",
    "cta.signout": "Abmelden",
    "strip.line":
      "Reisen & Steuern in einem Stack — Marea, Fidelis und Tools teilen diese Session.",
    "footer.kicker": "Hinweis",
    "footer.disclosure":
      "Fidelis dient der Information. Aufenthaltsregeln hängen von Verträgen, Verbindungen und Fakten ab, die das Tool nicht kennt. Ziehen Sie einen Steuerberater hinzu, bevor Sie entscheiden.",
    "footer.built": "Erstellt mit Astro · Groq",
    "footer.copy": "Fidelis",
    "landing.tagline.gold": "FIDELIS",
    "landing.tagline.lyra": "LYRA",
    "landing.tagline.rest": "·",
    "landing.tagline.em": "Gleiche Strenge. Mehr Raum.",
    "landing.hud.ch": "KAP ·",
    "landing.hud.of": "/ 05",
    "landing.hud.depth": "SCROLL-TIEFE",
    "landing.hud.hint": "↑↓ NAVIGIEREN · / → AGENT",
  },
};
