
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// This script simulates what's happening in src/utils/images.ts
// but we just want to see how glob would work if we could run it.
// Since we can't run import.meta.glob in a simple script easily without vite,
// let's just look at the filesystem and the compiled chunks in dist/.prerender if any.

console.log("Project Root:", projectRoot);

// Let's check the contents of src/utils/images.ts to see the glob again
const imagesTs = fs.readFileSync(path.join(projectRoot, 'src/utils/images.ts'), 'utf8');
console.log("Glob used in images.ts:", imagesTs.match(/import\.meta\.glob\(.*?\)/s)?.[0]);
