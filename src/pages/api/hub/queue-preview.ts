import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Deterministic stub queue for interface shells until Gateway wires real workflows.
 * GET ?holding=tide&agent=revenue
 */
export const GET: APIRoute = ({ url }) => {
  const holding = (url.searchParams.get("holding") ?? "").trim().toLowerCase();
  const agent = (url.searchParams.get("agent") ?? "").trim().toLowerCase();
  const key = holding && agent ? `${holding}/${agent}` : null;

  if (!key) {
    return new Response(
      JSON.stringify({
        ok: false,
        stub: true,
        error: "pass holding and agent query params",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const rows = [
    { id: "q-1", label: `${key} · stub item A`, state: "open", tone: "neutral" as const },
    { id: "q-2", label: `${key} · stub item B`, state: "open", tone: "ok" as const },
    { id: "q-3", label: `${key} · stub item C`, state: "blocked", tone: "warn" as const },
  ];

  return new Response(
    JSON.stringify({
      ok: true,
      stub: true,
      key,
      generatedAt: new Date().toISOString(),
      rows,
      notes: "Replace with Gateway / Hub queue when workflows are live.",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
