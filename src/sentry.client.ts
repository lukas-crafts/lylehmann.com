import * as Sentry from "@sentry/browser";

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		Sentry.browserTracingIntegration(),
		Sentry.browserProfilingIntegration(),
	],
	tracesSampleRate: 1.0,
	profilesSampleRate: 1.0,
	tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
});
