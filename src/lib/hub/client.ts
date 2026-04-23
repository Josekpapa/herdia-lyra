/**
 * Browser helpers for Hub-scoped API stubs (no CRM).
 */
export async function fetchHubHealth(): Promise<unknown> {
  const r = await fetch("/api/hub/health");
  if (!r.ok) throw new Error(`Hub health ${r.status}`);
  return r.json();
}

export async function fetchHubSurface(holding: string, agent: string): Promise<unknown> {
  const q = new URLSearchParams({ holding, agent });
  const r = await fetch(`/api/hub/surface?${q}`);
  if (!r.ok) throw new Error(`Hub surface ${r.status}`);
  return r.json();
}
