import type { APIRoute } from "astro";
import { isHubCrmConfigured } from "../../../lib/hub/crm";

export const prerender = false;

/** Hub scope health + core rail readiness (stubs until Gateway / Memory / CRM ship). */
export const GET: APIRoute = () => {
  const crmOn = isHubCrmConfigured();
  return new Response(
    JSON.stringify({
      ok: true,
      scope: "hub",
      service: "lyra-hub",
      version: "0.1.0-stub",
      crm: crmOn ? "configured" : "deferred",
      rails: {
        passport: { mode: "routes", note: "/login · /join — wire IdP when SSO hardens" },
        memory: { mode: "stub", note: "Graph not exposed on Hub yet" },
        grammar: { mode: "live", note: "Copy + i18n in product; engine API TBD" },
        gateway: { mode: "partial", note: "LLM routes exist; unified Gateway contract TBD" },
        billing: { mode: "stub", note: "Tier grammar in atlas; invoicing integration TBD" },
      },
      feeds: {
        queuePreview: "/api/hub/queue-preview",
        surface: "/api/hub/surface",
        serviceCatalog: "/api/hub/service-catalog",
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
