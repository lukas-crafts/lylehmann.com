import * as Sentry from "@sentry/browser";

export const initSentry = () => {
  const SENTRY_DSN = import.meta.env.PUBLIC_SENTRY_DSN || "https://8b57e87cb872bb5986980f35e78830e1@o4509649548935168.ingest.de.sentry.io/4509649551097936";
  const SITE = import.meta.env.SITE || "https://lylehmann.com";

  if (SENTRY_DSN) {
    Sentry.init({
      dsn: SENTRY_DSN,
      integrations: [
        Sentry.browserTracingIntegration(),
      ],
      tracesSampleRate: 1.0,
      tracePropagationTargets: ["localhost", new RegExp(`^${SITE}/api`)],
    });
  }
};
