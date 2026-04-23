import type { Agent, Holding } from "../atlas";
import type { SubAgentCopy } from "./types";
import { flagshipName } from "./types";

/** Spanish vertical flavor — merge on top of `buildBaseSubAgentCopyEs`. */
export function holdingFlavorEs(holding: Holding, agent: Agent): Partial<SubAgentCopy> {
  const fn = flagshipName(holding);
  const slug = `${holding.slug}/${agent.slug}`;

  if (slug === "fidelis/intake") {
    return fidelisIntakeEs(agent, fn);
  }

  switch (holding.slug) {
    case "tide":
      return tideFlavorEs(agent, fn);
    case "lore":
      return loreFlavorEs(agent, fn);
    case "fidelis":
      return fidelisFlavorEs(agent, fn);
    case "helios":
      return heliosFlavorEs(agent, fn);
    case "alder":
      return alderFlavorEs(agent, fn);
    case "mortar":
      return mortarFlavorEs(agent, fn);
    case "lex":
      return lexFlavorEs(agent, fn);
    case "seal":
      return sealFlavorEs(agent, fn);
    default:
      return {};
  }
}

function tideFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es cómo ${fn} sigue operativo — no solo visible. ${agent.name} lleva el trabajo frente al huésped y al GM en el registro cinematográfico de Tide: la voz de la propiedad, la lectura matutina, el bucle de recuperación.`,
    whyH2: "Los operadores compran carriles, no logos.",
    whyP1:
      "Tide gana cuando cada entrada y cada entrega de turno tiene dueño en software. Este agente es ese dueño en su carril — con precio y onboarding como producto.",
    replaceH2: "Canales sin coreografía.",
    replaceSub: "Lo que un hotel de diseño usa antes de que memoria de huésped y disciplina de ingresos vivan en un terminal.",
    before: [
      "Señal de huésped dispersa en OTA, inbox, WhatsApp",
      "Standup del GM sin cola compartida",
      "Historia RevPAR divorciada de recuperación de servicio",
      "La voz de marca varía por turno",
      "Sin registro de experimentos para apuestas de crecimiento",
    ],
    after: [
      "Hilos enrutan con gramática de propiedad",
      "Brief de standup desde cola operativa viva",
      "Recuperación ligada al contexto de ingresos",
      "Voz fijada al kit de marca",
      "Registro listo para Scout cuando aplique",
    ],
    howH2: "Sentir huésped + dueño · decidir · actuar · medir.",
    steps: [
      { label: "01 · Ingerir", text: `Capturar eventos, mensajes, datos PMS que ${agent.name} necesita — una vez estructurados.` },
      { label: "02 · Alinear", text: "Alinear a voz de propiedad, SLA y prioridades del GM esta semana." },
      { label: "03 · Ejecutar", text: "Entregar el artefacto al huésped o interno — ticket, mensaje, tarifa, tablero." },
      { label: "04 · Aprender", text: "Alimentar resultados a Guestbook, Revenue y Scout sin doble captura." },
    ],
    terminalTitle: `Pulso de propiedad · ${agent.name}.`,
    useH2: "Un GM costero, una temporada media.",
  };
}

function loreFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es el carril académico dentro de Muse — donde la verdad de cohorte, memoria del syllabus y carga docente se encuentran. ${agent.name} responde al trabajo que los educadores venden: resultados por alumno, no otro login de LMS.`,
    whyH2: "Los programas venden resultados · los agentes venden prueba.",
    replaceH2: "Courseware sin verdad de cohorte.",
    replaceSub: "Lo que las residencias usan antes de que tutor, path y alumni sean un solo registro.",
    before: [
      "Syllabus en Notion · cohorte en Slack",
      "Horas de oficina como DMs",
      "Sin señal compartida de riesgo del alumno",
      "Alumni tratados como lista · no red",
    ],
    after: [
      "Memoria Muse une tutor, path, lab, desk",
      "Tablero de cohorte muestra riesgo sin teatro de vigilancia",
      "Dossier sigue siendo el archivo de referencia",
      "Alumni con consentimiento para mentoría",
    ],
    howH2: "Admitir contexto · enseñar · evidencia · bucle alumni.",
    steps: [
      { label: "01 · Contexto", text: "Traer alumno, syllabus y estado de cohorte desde el grafo Muse." },
      { label: "02 · Enseñar", text: `Ejecutar el trabajo de ${agent.name} con política de idioma + accesibilidad.` },
      { label: "03 · Evidencia", text: "Capturar artefactos, feedback y riesgos con consentimiento." },
      { label: "04 · Alumni", text: "Enrutar victorias a alumni y cohortes futuras sin spam." },
    ],
    terminalTitle: `Verdad de cohorte · ${agent.name}.`,
    useH2: "Una residencia founder · un syllabus.",
  };
}

function fidelisFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es infraestructura de asesoría — libros, declaraciones y consejo comparten un grafo de entidades bajo ${fn}. ${agent.name} es el asiento que finanzas y operadores reconocen en la factura.`,
    whyH2: "Las entidades se multiplican · la atención no.",
    replaceH2: "Cierre de mes sin columna vertebral.",
    replaceSub: "Lo que los fundadores multi-entidad usan antes de que Ledger, Vault y Filing discutan la verdad.",
    before: [
      "Cierre en QuickBooks · archivos en Drive",
      "Declaraciones rastreadas por email",
      "Briefings de consejo rehechos desde cero",
      "Sin cadena entre documento y diario",
    ],
    after: [
      "Un Passport · entidades enlazadas",
      "Hash de Vault alineado con asiento en Ledger",
      "Calendario de filing desde el mismo plan",
      "Consejo lee el mes en que cierran los libros",
    ],
    howH2: "Verdad de entidad · política · artefacto · auditoría.",
    steps: [
      { label: "01 · Alcance", text: "Identificar entidades, nexo y plazos que tocan este flujo." },
      { label: "02 · Clasificar", text: "Mapear documentos y movimiento de dinero al plan + política." },
      { label: "03 · Producir", text: "Generar filing, diario o brief de consejo — versionado." },
      { label: "04 · Defender", text: "Archivar con racional para auditoría y el mes siguiente." },
    ],
    terminalTitle: `Lectura de mesa · ${agent.name}.`,
    useH2: "Un fundador con tres entidades · un cierre.",
  };
}

function fidelisIntakeEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `Intake es la puerta de entrada de cada entidad que añades a Fidelis — cap table, EIN, propietarios, pistas de nexo y los documentos que hacen honesto a Ledger desde el día uno. ${fn} es el sistema; Intake es el onboarding de un solo paso que evita “arreglamos los libros después”.`,
    whyH2: "Basura entra · caro para siempre.",
    whyP1:
      "La mayoría incorpora entidades por cadenas de email en PDF. Intake convierte el onboarding en datos estructurados — para que Vault, Ledger y Filing discutan los mismos hechos.",
    replaceH2: "Cadenas de email · no onboarding.",
    replaceSub: "Lo que envían los fundadores antes de que exista un grafo limpio.",
    before: [
      "Datos de entidad en hilos reenviados",
      "EIN y dirección inconsistentes entre herramientas",
      "Capturas de cap table en lugar de verdad",
      "Nadie dueño de “listo para cierre”",
    ],
    after: [
      "Intake estructurado con validación",
      "Propietarios · firmantes · partes relacionadas enlazados",
      "Documentos en Vault con hash + etiquetas",
      "Ledger abre con balances iniciales preparados",
    ],
    howH2: "Recopilar · verificar · vault · abrir libros.",
    steps: [
      { label: "01 · Recopilar", text: "Cuestionario de entidad, carga de cap table, IDs — un solo flujo." },
      { label: "02 · Verificar", text: "Cruzar EIN, dirección y firmante con política; marcar conflictos." },
      { label: "03 · Vault", text: "Encadenar documentos con retención; cola de revisión de consejo si hace falta." },
      { label: "04 · Abrir", text: "Promover balances iniciales y plan a Ledger con auditoría." },
    ],
    terminalTitle: "Nueva entidad · cola de intake.",
    terminalSub: "Lo que ve el desk cuando un fundador añade HoldCo #3.",
    terminalBody: `$ lyra intake open --entity NEW-ENTITY-07

┌─ Intake ─────────────────────────────────────
│ Name .......... Aurora Labs HoldCo LLC
│ EIN ........... 84-XXXXXXX (verificado)
│ Nexus ......... CA · DE · (nómina remota NY)
│ Owners ........ 2  ·  cap table v3 cargada
└──────────────────────────────────────────────

$ lyra intake docs --status

  ✓ Constitución · sellada  ·  Vault V-9921
  ✓ Resolución bancaria   ·  Vault V-9922
  ▲ Registro de nómina · pendiente portal estatal

$ lyra intake promote --to ledger

  → Balances iniciales preparados  ·  GL-2026-04-INT-07
  → Consejo notificado  ·  sin banderas

  // vista estática`,
    useH2: "Tres entidades en noventa días.",
    useSub: "Stack liderado por founder · anonimizado.",
    useBlocks: [
      { label: "00 · Antes", text: "Cada entidad incorporada por un asistente distinto de CPA · cuatro planes contables." },
      { label: "01 · Semana dos", text: "Segunda y tercera entidad reutilizan esquema de intake · Vault + Ledger alineados." },
      { label: "02 · Trimestre", text: "Tiempo de preparación de cierre −35% · consejo deja de rearmar briefs." },
    ],
    stats: [
      { label: "Tiempo típico", value: "~18 min" },
      { label: "Tipos de doc", value: "35+" },
      { label: "Enlace Vault", value: "nativo" },
      { label: "Objetivo", value: "P2" },
    ],
    ctaBody:
      "Migramos tus entidades existentes una vez — luego Intake es cómo cada nueva filial, blocker y LLC entra limpia al grafo.",
  };
}

function heliosFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es el carril patrimonial dentro de Helios — paciente, silencioso, generacional. ${fn} es la lectura del hogar; ${agent.name} es la superficie para fideicomisos, sucesiones, yield y family office que no pueden vivir en una nota al pie de hoja de cálculo.`,
    whyH2: "La riqueza es un grafo · no un PDF.",
    replaceH2: "Estados sin decisiones.",
    replaceSub: "Lo que los hogares usan antes de que distribuciones, actas y verdad de cartera compartan una línea de tiempo.",
    before: [
      "PDFs de custodio · sin grafo del hogar",
      "Términos de fideicomiso solo en carpetas de abogados",
      "Yield ocioso · nadie lo notó",
    ],
    after: [
      "IDs de hogar + entidad entre agentes",
      "Contexto de fideicomiso y sucesión junto a cartera",
      "Actas y distribuciones con citas",
    ],
    howH2: "Reunir verdad · modelar · aprobar · archivar.",
    steps: [
      { label: "01 · Reunir", text: "Traer cuentas, posiciones, docs de fideicomiso, beneficiarios — con consentimiento." },
      { label: "02 · Modelar", text: "Escenario vs política: liquidez, impuesto, límites sucesorios." },
      { label: "03 · Aprobar", text: "Enrutar a family office / consejo con paquete listo para Attest." },
      { label: "04 · Archivar", text: "Escribir en Memory + Vault con linaje para el próximo trimestre." },
    ],
    terminalTitle: `Ventana del hogar · ${agent.name}.`,
    useH2: "Un hogar líquido de $12M · dos fideicomisos.",
  };
}

function alderFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} está en el registro calmado de Kairos — evidencia primero, cadencia semanal. ${agent.name} es cómo el trabajo de longevidad se mantiene ligado a laboratorios, protocolos y rachas que importan para este hogar.`,
    whyH2: "La salud no es un dashboard · es un plan.",
    replaceH2: "Trackers sin historial clínico.",
    replaceSub: "Lo que los fundadores usan antes de biomarcadores, protocolos y cadencia en un grafo.",
    before: [
      "Labs en PDF · sin tendencia",
      "Suplementos por podcasts",
      "Protocolos del cónyuge totalmente separados",
    ],
    after: [
      "Tendencias por trimestres · alerta temprana",
      "Diferencias de protocolo semanales · con viajes",
      "Memoria del hogar con límites de privacidad",
    ],
    howH2: "Medir · planificar · acompañar · revisar.",
    steps: [
      { label: "01 · Medir", text: "Ingerir labs, wearables y check-ins subjetivos — estructurados." },
      { label: "02 · Planificar", text: "Alinear protocolo a metas y contraindicaciones; lenguaje claro." },
      { label: "03 · Acompañar", text: "Enrutar empujones a Cadence + Concierge-M cuando ayuda lo humano." },
      { label: "04 · Revisar", text: "Revisión trimestral de evidencia con auditoría para handoff médico." },
    ],
    terminalTitle: `Brief del hogar · ${agent.name}.`,
    useH2: "Dos adultos · un menor · doce semanas.",
  };
}

function mortarFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es verdad de obra — planos, agencias, cuadrillas, dailies. ${fn} es el libro mayor del proyecto; ${agent.name} es cómo superintendentes y dueños dejan de perder el hilo entre permiso y punch.`,
    whyH2: "Las obras pierden por las uniones.",
    replaceH2: "Grupos sin libro mayor.",
    replaceSub: "Lo que los trabajos usan antes de que RFI, estados de pago y notas de obra compartan ID de proyecto.",
    before: [
      "Hojas en un bucket · RFIs en email",
      "Conteos de cuadrilla mal tres días a la semana",
      "Prueba fotográfica sin atar a pay apps",
    ],
    after: [
      "Un código de proyecto entre agentes",
      "Site + Crew + Blueprint enlazados",
      "Paquetes de draw citan revisión + CO",
    ],
    howH2: "Planificar · obra · documentar · pagar.",
    steps: [
      { label: "01 · Planificar", text: "Sincronizar cronograma, permisos y ruta crítica con la obra real." },
      { label: "02 · Obra", text: "Capturar voz, foto y mano de obra con geocerca + rol." },
      { label: "03 · Documentar", text: "RFI/submittal con revisión ligada a Blueprint." },
      { label: "04 · Pagar", text: "Empaquetar para Ledger-C con postura de lien + waiver." },
    ],
    terminalTitle: `Obra · ${agent.name}.`,
    useH2: "Renovación de hotel · $8M GMP.",
  };
}

function lexFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es el carril de práctica dentro de Lex — preciso, lenguaje claro, adversarial cuando hace falta. ${fn} entrega matters; ${agent.name} es el flujo que compran los GC cuando el trabajo no es “solo otra pestaña”.`,
    whyH2: "Los matters son SKUs.",
    replaceH2: "Horas sin artefactos.",
    replaceSub: "Lo que los despachos usan antes de que intake, borradores y plazos compartan un grafo de matter.",
    before: [
      "Plazos solo en Outlook",
      "Biblioteca de cláusulas en Word",
      "Facturación desconectada del alcance",
    ],
    after: [
      "ID de matter en Brief + Clause + Calendar-L",
      "Conflicto + intake alimentan Docket",
      "Borradores con voz bloqueada",
    ],
    howH2: "Intake · borrador · revisión · presentación.",
    steps: [
      { label: "01 · Intake", text: "Hechos, partes y riesgos al socio correcto." },
      { label: "02 · Borrador", text: "Plantillas desde Clause; voz de la casa desde Grammar." },
      { label: "03 · Revisión", text: "Marcas con disciplina de versión; export seguro para cliente." },
      { label: "04 · Presentar", text: "Plazos de tribunal y servicio en Calendar-L; billing opcional." },
    ],
    terminalTitle: `Carril de matter · ${agent.name}.`,
    useH2: "Despacho boutique · 24 abogados.",
  };
}

function sealFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es el carril notarial — oficial, breve, confiable. ${fn} es el sello que sienten los clientes; ${agent.name} es cómo las firmas escalan testigos, cadena, apostilla y registro sin perder defensibilidad.`,
    whyH2: "La confianza es cadena + identidad.",
    replaceH2: "Sellos sin linaje.",
    replaceSub: "Lo que los cierres usan antes de que los handoffs a Lex y Mortar sean demostrables.",
    before: [
      "Sellos rastreados por email",
      "Testigos por teléfono eterno",
      "Paquetes transfronterizos rehechos cada vez",
    ],
    after: [
      "Sello + cadena + Vault en un flujo",
      "Consultas de registro para diligencia",
      "Ruta de apostilla por política de jurisdicción",
    ],
    howH2: "Identificar · testigo · sellar · probar.",
    steps: [
      { label: "01 · Identificar", text: "KYC / verificación de firmante según política." },
      { label: "02 · Testigo", text: "Programar testigo remoto o móvil · captura de evidencia." },
      { label: "03 · Sellar", text: "Sellar con timestamp + hash; enrutar a Vault." },
      { label: "04 · Probar", text: "Paquete de registro + apostilla para handoff transfronterizo." },
    ],
    terminalTitle: `Cola · ${agent.name}.`,
    useH2: "Firma regional · alto volumen recurrente.",
  };
}
