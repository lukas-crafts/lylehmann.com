import { defineSentryConfig } from "@sentry/astro/config";

export default defineSentryConfig({
	dsn: process.env.SENTRY_DSN, // DSN aus Umgebungsvariable
	tracesSampleRate: 1.0, // Optional: Performance Monitoring
	// Weitere Optionen nach Bedarf
});
