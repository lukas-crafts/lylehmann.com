import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [nodeProfilingIntegration()],
	tracesSampleRate: 1.0,
	profileSessionSampleRate: 1.0,
	profileLifecycle: "trace",
});

// Beispiel für einen profilierten Span:
Sentry.startSpan(
	{
		name: "My Span",
	},
	() => {
		// Hier wird der Code profiliert
		// Beispiel: Simuliere eine Server-Operation
		for (let i = 0; i < 1000000; i++) {
			Math.sqrt(i);
		}
	},
);
