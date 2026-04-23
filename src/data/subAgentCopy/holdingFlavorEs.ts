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

function atriaFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es el vestíbulo de Kairos: una sola entrada guiada antes de que se abran Ingreso, Protocolo y Labs. La evidencia importa, pero la primera sesión es confianza: NDAs, idioma, cupos piloto y un traspaso claro cuando alguien está realmente dentro del programa.`,
    whyH2: "La primera sesión define la curva de confianza.",
    whyP1: `Los hoteles no dejan al huésped en el lobby; la longevidad no debería dejar hogares a mitad de registro. ${agent.name} ordena consentimiento, idioma y reglas piloto para que Kairos se sienta como recepción, no como formulario infinito.`,
    whyP2: `Ingreso es biomarcadores y línea base; ${agent.name} es el umbral — finanzas y clínica ven cuándo un hogar está "adentro" versus explorando.`,
    replaceH2: "Onboarding confeti · traspasos muertos.",
    replaceSub: "Lo que los equipos usan antes de que entrada guiada, idioma y desbloqueo de ingreso compartan un carril.",
    before: [
      "Formulario de alta · luego silencio",
      "NDA piloto perdido en hilos de email",
      "Solo inglés cuando mitad del hogar prefiere español",
    ],
    after: [
      "Vestíbulo completo → Ingreso desbloqueado",
      "Pilotos corporativos con cupos visibles",
      "Ruta de gramática activa antes de preguntas sensibles",
    ],
    howH2: "Bienvenida · barrera · ruta · desbloqueo.",
    steps: [
      { label: "01 · Bienvenida", text: "Hogar o piloto corporativo — quién entra a Kairos." },
      { label: "02 · Barrera", text: "NDA · consentimiento · idioma antes de lo clínico." },
      { label: "03 · Ruta", text: "Gramática y tono; escalada humana si se rompe la confianza." },
      { label: "04 · Desbloqueo", text: "Traspaso a Ingreso con auditoría; las rachas viven en Cadence." },
    ],
    terminalTitle: `Mesa del vestíbulo · ${agent.name}.`,
    terminalSub: "Vista estática — el vestíbulo de producción llega con la primera cohorte de socios de diseño.",
    terminalBody: `$ lyra ${agent.slug} foyer --holding alder

┌─ KAIROS · VESTÍBULO ────────────────────────────────────
│ Sesión ........ guiada
│ Idioma ........ EN · ES listo
│ Bloqueo ingreso hasta vestíbulo completo
└────────────────────────────────────────────────────────

  cupos_piloto .. 12 / 12 tomados
  nda ........... 1 pendiente

  // vista estática`,
    useH2: "Hogar K-0007 · piloto corporativo · doce plazas.",
    useBlocks: [
      {
        label: "00 · Antes",
        text: "Los hogares abandonaban tras la página dos; los pilotos no tenían una sola fuente de verdad del NDA.",
      },
      {
        label: "01 · Piloto",
        text: "Tasa de finalización del vestíbulo visible; Ingreso solo con barreras en verde.",
      },
      {
        label: "02 · Escala",
        text: `${fn} sigue siendo la lectura clínica — ${agent.name} mantiene el umbral disciplinado al multiplicar programas.`,
      },
    ],
  };
}

function alderFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  if (agent.slug === "atria") return atriaFlavorEs(agent, fn);
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

function blueprintFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es el conjunto de planos como sistema de registro — no un bucket de PDFs. Revisiones, hilos de RFI y planos listos para permiso viven en un carril para que MEP, arquitecto y GC citen la misma versión e incidencia.`,
    whyH2: "Las obras mueren cuando los planos no coinciden.",
    whyP1: `Los RFI viven en el correo mientras el set avanza en Procore; plan check pide v4 y obra sigue imprimiendo v2. ${agent.name} mantiene identidad del set, hilos abiertos y linaje de archivo lo bastante apretado para estados de pago y TCO.`,
    whyP2: `${fn} sigue siendo el dinero en movimiento; ${agent.name} es la capa semántica — qué se emitió, qué está en choque, qué quedó en la bóveda.`,
    replaceH2: "Planos sin columna vertebral.",
    replaceSub: "Lo que los equipos usan antes de que revisiones, RFI y paquetes de permiso compartan un ID de set.",
    before: [
      "ASIs en un drive · RFIs en otro",
      "Coordinación con tres fechas de plano",
      "Paquetes de archivo que no coinciden con el set del prestamista",
    ],
    after: [
      "Sets activos + RFI abiertos en una lectura",
      "Filas de choque y coordinación atadas a zonas",
      "Emitido para permiso trazable a ASIs en bóveda",
    ],
    howH2: "Emitir · hilvanar · coordinar · archivar.",
    steps: [
      { label: "01 · Emitir", text: "Hojas para permiso, licitación y obra con sellos de revisión explícitos." },
      { label: "02 · Hilvanar", text: "Cola RFI / submittal con responsable y enlace al plano." },
      { label: "03 · Coordinar", text: "Superposiciones MEP / estructura — estado de choque por zona, no por rumor." },
      { label: "04 · Archivar", text: "ASI + CO en bóveda; los draws citan los mismos IDs de revisión + CO." },
    ],
    terminalTitle: `Mesa de planos · ${agent.name}.`,
    terminalSub: "Vista estática — sincronía de set en vivo llega con Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} sets --holding mortar

┌─ MORTAR · BLUEPRINT ───────────────────────────────────
│ Sets activos .... 8
│ RFI abiertos .... 5
│ Hojas 7d ........ 14
└────────────────────────────────────────────────────────

  P-0042 · L3 ..... emitido · v4
  MEP ............. choque · 3 zonas
  ASI-12 .......... bóveda enlazada

  // vista estática`,
    useH2: "Núcleo y casc hotelero · ocho sets activos · MEP en revisión.",
    useBlocks: [
      {
        label: "00 · Antes",
        text: "Permiso y obra citaban fechas de plano distintas; los RFI se duplicaban entre bandejas.",
      },
      {
        label: "01 · Piloto",
        text: "Un carril para sets + hilos; filas de choque visibles junto a paquetes emitidos.",
      },
      {
        label: "02 · Escala",
        text: `${fn} sigue siendo la columna del dinero — ${agent.name} mantiene el mundo construido alineado cuando crecen jurisdicciones y oficios.`,
      },
    ],
  };
}

function permitFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es la capa de jurisdicción — cada trámite, inspector y condición en un solo reloj. Blueprint puede estar perfecto; ${agent.name} es cómo el trabajo se vuelve legal para construir y para cerrar.`,
    whyH2: "Plan check no corre en tu hoja de cálculo.",
    whyP1: `Obra, bomberos, salud y servicios quieren paquetes distintos; las excepciones y el TCO se escapan cuando nadie dueña la línea de tiempo cruzada. ${agent.name} sigue estado de revisión, audiencias y condiciones para que supers y dueños vean la ruta crítica real.`,
    whyP2: `${fn} sigue firmando el dinero; ${agent.name} firma los portones — permisos emitidos, correcciones abiertas y handoff a inspección.`,
    replaceH2: "Agencias sin una sola cola.",
    replaceSub: "Lo que los equipos usan antes de que jurisdicciones, revisiones y objetivos TCO compartan un carril de trámite.",
    before: [
      "Estado de plan check en tres bandejas",
      "Fecha de excepción de bomberos solo en cabeza del gestor",
      "TCO en diapositiva, sin atar a correcciones abiertas",
    ],
    after: [
      "Jurisdicciones + en revisión en una lectura",
      "Filas de agencia con semana / audiencia / hold",
      "Emitidos YTD junto a la fecha objetivo viva",
    ],
    howH2: "Presentar · seguir · audiencia · cerrar.",
    steps: [
      { label: "01 · Presentar", text: "Paquete por jurisdicción desde revisión Blueprint + IDs de CO." },
      { label: "02 · Seguir", text: "Semanas de plan check, reenvíos y correcciones con responsable." },
      { label: "03 · Audiencia", text: "Excepciones y apelaciones — fecha, junta, resultado en el carril." },
      { label: "04 · Cerrar", text: "Objetivos TCO / CO atados a condiciones abiertas + estado de obra." },
    ],
    terminalTitle: `Mesa de permisos · ${agent.name}.`,
    terminalSub: "Vista estática — sincronía de trámites en vivo llega con Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} filings --holding mortar

┌─ MORTAR · PERMIT ──────────────────────────────────────
│ Jurisdicciones . 4
│ En revisión .... 3
│ Emitidos YTD ... 11
└────────────────────────────────────────────────────────

  Obra · ATX ..... plan check · sem 2/4
  Bomberos · var. . audiencia · 3 mar
  Objetivo TCO .... 14 ago

  // vista estática`,
    useH2: "Reestructuración hotel · cuatro agencias · ruta TCO a la vista.",
    useBlocks: [
      {
        label: "00 · Antes",
        text: "Obra y dueño se enteraron de la audiencia de bomberos el día anterior.",
      },
      {
        label: "01 · Piloto",
        text: "Cola de agencias visible junto a jurisdicciones y emitidos YTD; fila TCO neutral hasta limpiar condiciones.",
      },
      {
        label: "02 · Escala",
        text: `${fn} sigue siendo la columna comercial — ${agent.name} mantiene honestos los portones del lado público cuando el portafolio crece.`,
      },
    ],
  };
}

function crewFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es quién puede estar en la losa hoy — subcontratas, accesos y briefs de seguridad atados al alcance real. Los permisos dicen que puedes construir; ${agent.name} dice quién está en la pluma y quién firmó el JHA.`,
    whyH2: "Cabeza de obra sin responsabilidad es solo gentío.",
    whyP1: `Los GC pierden horas conciliando cuerpos con chapas y reportes de casi-accidentes. ${agent.name} mantiene conteo, nivel y stand-down junto a los oficios que importan para el vaciado o la puesta en servicio de hoy.`,
    whyP2: `${fn} sigue cerrando el dinero; ${agent.name} cierra el acceso — quién estuvo en obra, bajo qué sub, con qué estado de orientación.`,
    replaceH2: "Conteo por WhatsApp · firma en papel.",
    replaceSub: "Lo que los supers usan antes de que roster, niveles y eventos de seguridad compartan un reloj de proyecto.",
    before: [
      "Totales de cuadrilla mal hasta que pelea nómina",
      "Conflictos de pluma descubiertos en el daily",
      "Asistencia a stand-down en álbum de fotos",
    ],
    after: [
      "En obra + niveles de sub en un pulso",
      "Filas de oficio con semántica ok / hold / completo",
      "Casi-accidentes y stand-down en el mismo carril",
    ],
    howH2: "Acceso · brief · desplegar · conciliar.",
    steps: [
      { label: "01 · Acceso", text: "Chapas, orientación y geocerca por nivel de oficio." },
      { label: "02 · Brief", text: "JHA + charlas de herramienta — firma atada a alcance y ventana horaria." },
      { label: "03 · Desplegar", text: "Quién en qué zona; holds si hay conflicto de grúa o pluma." },
      { label: "04 · Conciliar", text: "Conteo y horas para Ledger-C sin segunda hoja de cálculo." },
    ],
    terminalTitle: `Mesa de cuadrilla · ${agent.name}.`,
    terminalSub: "Vista estática — sincronía de tiempo y accesos en vivo llega con Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} roster --holding mortar

┌─ MORTAR · CREW ────────────────────────────────────────
│ En obra hoy .... 47
│ Niveles sub .... 9
│ Casi-acc 30d ... 0
└────────────────────────────────────────────────────────

  Hormigón · Pod A . vaciado 06:00 · clima OK
  Elec · mezz ....... hold · conflicto pluma
  Stand-down seg. ... completo · firma 100%

  // vista estática`,
    useH2: "Día de vaciado · 47 personas · nueve niveles · racha sin casi-accidentes.",
    useBlocks: [
      {
        label: "00 · Antes",
        text: "El dueño pidió cabeza de obra; el super mandó tres números distintos antes del almuerzo.",
      },
      {
        label: "01 · Piloto",
        text: "Pulso de roster junto a filas de oficio; hold eléctrico visible antes de la llamada al vaciado.",
      },
      {
        label: "02 · Escala",
        text: `${fn} sigue siendo la columna comercial — ${agent.name} mantiene honesta la verdad de campo cuando el portafolio apila obras concurrentes.`,
      },
    ],
  };
}

function siteFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es el diario del superintendente — fotos, retrasos y clima en una lectura, no en cuarenta hilos. Crew dice quién está en losa; ${agent.name} dice qué le hizo el día a la ruta crítica.`,
    whyH2: "Si el diario vive en el chat, la obra vive en el rumor.",
    whyP1: `Dueños y prestamistas piden verdad a distinta altura; los supers se ahogan en notas de voz. ${agent.name} mantiene sets de fotos, retrasos abiertos y días de lluvia junto a las filas que explican plumas, laydown y visitas del dueño.`,
    whyP2: `${fn} sigue siendo los draws; ${agent.name} es la narrativa — qué pasó en obra, con evidencia, antes de que el dinero discuta.`,
    replaceH2: "Carretes de fotos · contexto perdido.",
    replaceSub: "Lo que los líderes de campo usan antes de que fotos, retrasos y visitas compartan un ID de día.",
    before: [
      "Parte meteorológico en un grupo · fotos en otro",
      "Retrasos de camión descubiertos en la OAC semanal",
      "Visita del dueño flotando en un calendario",
    ],
    after: [
      "Cadencia de fotos + retrasos abiertos en un pulso",
      "Filas logísticas con tono ok / aviso / neutral",
      "Lluvia y riesgo meteorológico visible junto a plumas",
    ],
    howH2: "Capturar · clasificar · escalar · publicar.",
    steps: [
      { label: "01 · Capturar", text: "Sets de fotos georreferenciados atados a zona y oficio." },
      { label: "02 · Clasificar", text: "Motivos de retraso, códigos de clima y responsable en el carril." },
      { label: "03 · Escalar", text: "Conflictos de pluma y laydown visibles antes de la ventana de vaciado." },
      { label: "04 · Publicar", text: "Postura de export diario para dueño + prestamista sin reformatear." },
    ],
    terminalTitle: `Diario de obra · ${agent.name}.`,
    terminalSub: "Vista estática — sincronía del log de campo en vivo llega con Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} daily --holding mortar

┌─ MORTAR · SITE ────────────────────────────────────────
│ Fotos 7d ....... 28
│ Retrasos abiertos 2
│ Días lluvia YTD  4
└────────────────────────────────────────────────────────

  Día 127 · clima .. despejado · grúa 14:00
  Laydown · log .... camión 4 tarde · 55m
  Visita dueño ..... vie 09:00

  // vista estática`,
    useH2: "Día 127 · pluma fijada · dos retrasos rastreados.",
    useBlocks: [
      {
        label: "00 · Antes",
        text: "El super reescribió el diario tres veces — dueño, prestamista y PM recibieron historias distintas.",
      },
      {
        label: "01 · Piloto",
        text: "Pulso junto al carril del día; aviso logístico visible antes de la llamada de pluma.",
      },
      {
        label: "02 · Escala",
        text: `${fn} sigue siendo la columna comercial — ${agent.name} mantiene la narrativa de campo consistente entre proyectos concurrentes.`,
      },
    ],
  };
}

function ledgerCFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es el dinero de obra con recibos — draws, retención, órdenes de cambio y postura de grava en un solo paso. Site cuenta la historia; ${agent.name} le dice al banco por qué el paquete es defendible.`,
    whyH2: "Los prestamistas no compran sensaciones · compran paquetes.",
    whyP1: `Los CO se frenan por la firma equivocada; faltan gravámenes por nivel; la retención se despega del GMP. ${agent.name} mantiene número de draw, dólares retenidos y CO abiertos junto a filas de revisión del prestamista, firma del arquitecto y estado del waiver.`,
    whyP2: `${fn} sigue siendo la columna del programa; ${agent.name} es la capa de verdad comercial que dueños y prestamistas pueden auditar.`,
    replaceH2: "Draws sin cadena.",
    replaceSub: "Lo que los GC usan antes de que draws, CO y waivers compartan un ID de libro mayor.",
    before: [
      "Carpetas de CO que no coinciden con el pay app",
      "Gravámenes perseguidos la semana del desembolso",
      "Retención solo en el cuaderno del PM",
    ],
    after: [
      "Ciclo de draw + retención + CO abiertos en un pulso",
      "Filas de cola para prestamista, arquitecto y waiver",
      "Paquete cita los mismos IDs de revisión + CO que Blueprint",
    ],
    howH2: "Presentar · certificar · retener · liberar.",
    steps: [
      { label: "01 · Presentar", text: "Estado de pago atado a evidencia de Site y calendario de CO aprobados." },
      { label: "02 · Certificar", text: "Ventanas de revisión prestamista + dueño con antigüedad explícita." },
      { label: "03 · Retener", text: "Política de retención codificada — sin holds sorpresa en el giro." },
      { label: "04 · Liberar", text: "Waivers por niveles y postura de grava antes del siguiente draw." },
    ],
    terminalTitle: `Ledger de obra · ${agent.name}.`,
    terminalSub: "Vista estática — sincronía de draws en vivo llega con Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} draws --holding mortar

┌─ MORTAR · LEDGER-C ────────────────────────────────────
│ Draw # ........ 4
│ Retención ..... $420k
│ CO abiertos ... 3
└────────────────────────────────────────────────────────

  Draw #4 ......... rev. prestamista · 4d
  CO-018 · acero .. pendiente firma arq.
  Waiver nivel 2 .. en archivo

  // vista estática`,
    useH2: "Draw 4 en revisión · tres CO abiertos · waivers limpios hasta nivel 2.",
    useBlocks: [
      {
        label: "00 · Antes",
        text: "El prestamista pidió el log de CO; el equipo lo rearmó desde email en un fin de semana.",
      },
      {
        label: "01 · Piloto",
        text: "Postura de draw junto a filas de CO y waiver; hold de arquitecto visible antes de la llamada de fondos.",
      },
      {
        label: "02 · Escala",
        text: `${fn} mantiene alineados los programas de portafolio — ${agent.name} hace que el movimiento de dinero sea demostrable obra por obra.`,
      },
    ],
  };
}

function punchFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  return {
    heroLede: `${agent.name} es el acabado acotado — punch del dueño, reloj de garantía y preparación de O&M sin perder el hilo tras lo sustancial. Ledger-C te financió; ${agent.name} te saca limpio.`,
    whyH2: "El cierre es un producto · no un estado de ánimo.",
    whyP1: `Retrabajo de pintura, puesta en marcha MEP y borradores de carpetas viven en bandejas distintas hasta que alguien pierde el TCO. ${agent.name} mantiene punch abierto, inicios de garantía y objetivo sustancial junto a filas que leen como la última milla del super.`,
    whyP2: `${fn} cerró el dinero; ${agent.name} cierra el edificio — sistemas firmados, lista del dueño con tendencia, paquete de entrega versionado.`,
    replaceH2: "Punch lists en capturas.",
    replaceSub: "Lo que los equipos usan antes de que punch, garantía y entrega compartan un carril de cierre.",
    before: [
      "Ítems de visita del dueño repartidos en tres apps",
      "Fechas de inicio de garantía discutidas tras la mudanza",
      "O&M enviados como zip sin índice",
    ],
    after: [
      "Punch abierto + garantía + sustancial en un pulso",
      "Filas de oficio/sistema con aviso / ok / neutral",
      "Artefactos de entrega versionados junto a firmas de puesta en marcha",
    ],
    howH2: "Listar · verificar · arrancar · empastar.",
    steps: [
      { label: "01 · Listar", text: "Punch del dueño con fotos, oficio responsable y ventana de vencimiento." },
      { label: "02 · Verificar", text: "Retrabajo programado vs completo; sin holds silenciosos antes de lo sustancial." },
      { label: "03 · Arrancar", text: "Firmas MEP / vida útil con nombres, fechas y excepciones." },
      { label: "04 · Empastar", text: "O&M, garantías y as-built empaquetados para dueño + facilities." },
    ],
    terminalTitle: `Mesa de cierre · ${agent.name}.`,
    terminalSub: "Vista estática — sincronía de punch en vivo llega con Mortar Gateway.",
    terminalBody: `$ lyra ${agent.slug} closeout --holding mortar

┌─ MORTAR · PUNCH ───────────────────────────────────────
│ Punch abierto . 38
│ Inicios gar. .. 12
│ Sustancial .... obj. 42d
└────────────────────────────────────────────────────────

  L2 · pintura .... retrabajo programado
  Arranque MEP .... firmado
  Carpetas O&M .... borrador v2

  // vista estática`,
    useH2: "Treinta y ocho abiertos · doce relojes de garantía · sustancial a la vista.",
    useBlocks: [
      {
        label: "00 · Antes",
        text: "Facilities abrió el primer ticket y el GC no encontraba el PDF de puesta en marcha.",
      },
      {
        label: "01 · Piloto",
        text: "Pulso de cierre junto al carril de sistemas; aviso de pintura antes de la visita del dueño.",
      },
      {
        label: "02 · Escala",
        text: `${fn} mantiene honestos los draws — ${agent.name} disciplina la entrega en un portafolio de acabados.`,
      },
    ],
  };
}

function mortarFlavorEs(agent: Agent, fn: string): Partial<SubAgentCopy> {
  if (agent.slug === "blueprint") return blueprintFlavorEs(agent, fn);
  if (agent.slug === "permit") return permitFlavorEs(agent, fn);
  if (agent.slug === "crew") return crewFlavorEs(agent, fn);
  if (agent.slug === "site") return siteFlavorEs(agent, fn);
  if (agent.slug === "ledger-c") return ledgerCFlavorEs(agent, fn);
  if (agent.slug === "punch") return punchFlavorEs(agent, fn);
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
