/**
 * Reserved for a future Hub-only integration (e.g. partner pipeline).
 * Not wired — do not connect to external CRM until explicitly requested.
 */
export const hubCrmConfig = {
  baseUrl:
    typeof import.meta.env.PUBLIC_HUB_CRM_URL === "string"
      ? import.meta.env.PUBLIC_HUB_CRM_URL
      : "",
  scope: "hub-only" as const,
};

/** Always false until you deliberately add a CRM and set PUBLIC_HUB_CRM_URL. */
export function isHubCrmConfigured(): boolean {
  return hubCrmConfig.baseUrl.length > 0;
}
