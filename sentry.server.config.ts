// Sentry-Konfiguration erfolgt jetzt direkt in src/sentry.server.ts

export default {
	dsn: process.env.SENTRY_DSN,
	tracesSampleRate: 1.0,
	profileSessionSampleRate: 1.0,
	profileLifecycle: "trace",
	integrations: ["nodeProfilingIntegration"],
};
