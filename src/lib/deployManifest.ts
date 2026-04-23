/**
 * Per-agent deploy metadata for `/api/hub/surface` and ops.
 *
 * Primary source: `src/data/deploy-manifest.json` (CI can overwrite before `astro build`).
 * Optional runtime overlay: `LYRA_DEPLOY_MANIFEST_JSON` (object keyed by `holding/agent`).
 * Global fallback for all keys: `LYRA_LAST_DEPLOY_AT`, `LYRA_DEPLOY_REVISION`.
 */
import manifestJson from "../data/deploy-manifest.json";

export type DeployManifestEntry = {
  lastDeploy?: string;
  revision?: string;
  url?: string;
};

export type DeployManifest = Record<string, DeployManifestEntry>;

function parseEnvOverlay(): DeployManifest {
  const raw = process.env.LYRA_DEPLOY_MANIFEST_JSON?.trim();
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as DeployManifest;
    }
  } catch {
    /* ignore */
  }
  return {};
}

export function loadDeployManifest(): DeployManifest {
  const base = (manifestJson as DeployManifest) ?? {};
  const overlay = parseEnvOverlay();
  return { ...base, ...overlay };
}

export function getDeployRow(manifest: DeployManifest, key: string | null): DeployManifestEntry | undefined {
  if (!key) return undefined;
  return manifest[key];
}
