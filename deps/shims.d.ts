// Consolidated Type Shims for lylehmann.com

// --- Node.js Core Modules ---
declare module "node:path" {
  export function resolve(...pathSegments: string[]): string;
  export function join(...pathSegments: string[]): string;
  export function dirname(p: string): string;
  const path: {
    resolve: typeof resolve;
    join: typeof join;
    dirname: typeof dirname;
  };
  export default path;
}

declare module "node:url" {
  export function fileURLToPath(url: string | URL): string;
}

declare var process: {
  env: Record<string, string | undefined>;
  cwd(): string;
};

declare var __dirname: string;

// Support for non-prefixed imports
declare module "path" {
  export function resolve(...pathSegments: string[]): string;
  export function join(...pathSegments: string[]): string;
  export function dirname(p: string): string;
}
declare module "url" {
  export function fileURLToPath(url: string | URL): string;
}

// --- Astro Core ---
declare module "astro/config" {
  export function defineConfig(config: any): any;
}

declare module "astro" {
  export interface AstroIntegration {
    name: string;
    hooks?: any;
  }
}

declare module "astro/client" {
  // Empty shim for client types to avoid duplication with .astro/types.d.ts
}

// --- Vitest ---
declare module "vitest" {
  const vitest: any;
  export default vitest;
}

// --- Integrations ---
declare module "@astrojs/vercel" {
  const adapter: () => any;
  export default adapter;
}

declare module "lodash.merge" {
  const merge: <T, U>(target: T, source: U) => T & U;
  export default merge;
}

declare module "html-escaper" {
  export function escape(str: string): string;
  export function unescape(str: string): string;
}

// Generic integration shim for others
declare module "deps/integration-shim.ts" {
  const integration: () => any;
  export default integration;
}
