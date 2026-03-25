import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "astro";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  console.log("Starting programmatic build...");
  await build({
    root: __dirname,
    outDir: path.join(__dirname, "dist_new"),
    cacheDir: path.join(__dirname, "astro_cache_new"),
    logLevel: "info",
  });
  console.log("Build completed successfully!");
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1);
}
