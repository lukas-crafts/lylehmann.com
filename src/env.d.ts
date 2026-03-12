/// <reference path="../.astro/types.d.ts" />
// Reference removed to satisfy IDE shim

interface ImportMetaEnv {
  readonly PUBLIC_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
