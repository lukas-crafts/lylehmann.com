#!/usr/bin/env node

const { execSync } = require("child_process");

const RUNS = 10;
const TEST_COMMAND = "npx vitest run";

const testResults = {};
let hasFlaky = false;

for (let i = 0; i < RUNS; i++) {
  try {
    const output = execSync(TEST_COMMAND, { encoding: "utf-8" });
    const matches = output.matchAll(/\s*✓\s+([\w\-/().: ]+)/g);
    for (const match of matches) {
      const testName = match[1].trim();
      testResults[testName] = testResults[testName] || [];
      testResults[testName].push("pass");
    }
    const failMatches = output.matchAll(/\s*✗\s+([\w\-/().: ]+)/g);
    for (const match of failMatches) {
      const testName = match[1].trim();
      testResults[testName] = testResults[testName] || [];
      testResults[testName].push("fail");
    }
  } catch (e) {
    const output = e.stdout ? e.stdout.toString() : "";
    const failMatches = output.matchAll(/\s*✗\s+([\w\-/().: ]+)/g);
    for (const match of failMatches) {
      const testName = match[1].trim();
      testResults[testName] = testResults[testName] || [];
      testResults[testName].push("fail");
    }
    // Also collect passes if any
    const passMatches = output.matchAll(/\s*✓\s+([\w\-/().: ]+)/g);
    for (const match of passMatches) {
      const testName = match[1].trim();
      testResults[testName] = testResults[testName] || [];
      testResults[testName].push("pass");
    }
  }
}

console.log("Flaky Test Report:");
for (const [test, results] of Object.entries(testResults)) {
  const unique = new Set(results);
  if (unique.size > 1) {
    hasFlaky = true;
    console.log(`❗ Flaky: ${test} (${results.join(", ")})`);
  }
}
if (!hasFlaky) {
  console.log("✅ No flaky tests detected.");
}
process.exit(hasFlaky ? 1 : 0);
