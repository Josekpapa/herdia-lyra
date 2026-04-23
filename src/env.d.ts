/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    user?: {
      id: string;
      orgId: string;
      email: string;
      name: string;
      role: "admin" | "member";
      createdAt: number;
    };
    org?: {
      id: string;
      name: string;
      createdAt: number;
    };
    authEnabled?: boolean;
  }
}

interface ImportMetaEnv {
  readonly OPENAI_API_KEY?: string;
  readonly OPENAI_MODEL?: string;
  readonly FIDELIS_AUTH?: string;
  /** Optional JSON overlay for deploy manifest (server). */
  readonly LYRA_DEPLOY_MANIFEST_JSON?: string;
  readonly LYRA_LAST_DEPLOY_AT?: string;
  readonly LYRA_DEPLOY_REVISION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
