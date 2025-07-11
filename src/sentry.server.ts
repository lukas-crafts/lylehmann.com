import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
	dsn: "https://8b57e87cb872bb5986980f35e78830e1@o4509649548935168.ingest.de.sentry.io/4509649551097936",
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
