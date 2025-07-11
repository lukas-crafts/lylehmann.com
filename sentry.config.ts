// Sentry-Konfiguration erfolgt jetzt direkt in src/sentry.client.ts und src/sentry.server.ts

export default {
	dsn: process.env.SENTRY_DSN, // DSN aus Umgebungsvariable
	tracesSampleRate: 1.0, // Optional: Performance Monitoring
	// Weitere Optionen nach Bedarf
};
