import * as Sentry from "@sentry/browser";

const SENTRY_DSN = import.meta.env.PUBLIC_SENTRY_DSN;
const SITE = import.meta.env.SITE || "https://lylehmann.com";

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.browserProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", new RegExp(`^${SITE}/api`)],
    profilesSampleRate: 1.0,
  });
}

