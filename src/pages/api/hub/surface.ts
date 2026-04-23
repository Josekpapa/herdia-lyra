import type { APIRoute } from "astro";
import { getOffer } from "../../../data/serviceCatalog";
import { getDeployRow, loadDeployManifest } from "../../../lib/deployManifest";

export const prerender = false;

/**
 * Per-agent surface: catalog offer + deploy metadata.
 * Query: ?holding=tide&agent=ops
 *
 * Deploy: `src/data/deploy-manifest.json` (CI before build), optional `LYRA_DEPLOY_MANIFEST_JSON`,
 * or globals `LYRA_LAST_DEPLOY_AT` / `LYRA_DEPLOY_REVISION`.
 */
export const GET: APIRoute = ({ url }) => {
  const holding = (url.searchParams.get("holding") ?? "").trim();
  const agent = (url.searchParams.get("agent") ?? "").trim();
  const key =
    holding && agent ? `${holding}/${agent}`.replace(/^\/+|\/+$/g, "").toLowerCase() : null;

  const offer = key ? getOffer(key) : undefined;
  const manifest = loadDeployManifest();
  const row = getDeployRow(manifest, key);

  const globalLast = process.env.LYRA_LAST_DEPLOY_AT?.trim() || null;
  const globalRev = process.env.LYRA_DEPLOY_REVISION?.trim() || null;

  const lastDeploy = row?.lastDeploy ?? globalLast;
  const revision = row?.revision ?? globalRev;
  const deployUrl = row?.url ?? null;

  const hasDeploySignal = !!(lastDeploy || revision);
  const stub = !hasDeploySignal;

  const deploy =
    lastDeploy || revision || deployUrl
      ? { lastDeploy, revision: revision ?? null, url: deployUrl }
      : null;

  let statusLine: string;
  if (offer && hasDeploySignal) {
    statusLine = `catalog · ${offer.gtmPhase} · ${offer.skuMode} · deploy ${lastDeploy ?? revision ?? "ok"}`;
  } else if (offer) {
    statusLine = `catalog · ${offer.gtmPhase} · ${offer.skuMode} — set deploy manifest or LYRA_LAST_DEPLOY_AT`;
  } else if (key) {
    statusLine = hasDeploySignal
      ? "registry · no catalog row for key"
      : "registry · no catalog row — pass valid holding & agent";
  } else {
    statusLine = "registry · pass holding & agent for offer + deploy merge";
  }

  return new Response(
    JSON.stringify({
      ok: true,
      stub,
      key,
      offer: offer ?? null,
      deploy,
      statusLine,
      lastDeploy,
      notes: stub
        ? "Populate src/data/deploy-manifest.json (or LYRA_LAST_DEPLOY_AT / LYRA_DEPLOY_MANIFEST_JSON) so operators see deploy signal. Gateway + Memory wiring remains separate."
        : "Deploy metadata present. Connect Gateway + Memory when workflow routes are live.",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
