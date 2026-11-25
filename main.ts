// The Most Boring Object, Reviewed in One Line
// Entry program: writes one review of a doorstop to /output/entry.txt.
// Node 22, standard library only, no network, no Chrome.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry below is exactly 124 characters on one line (measured 2026-11-25);
// the gate allows 1-200 characters, so it passes with room to spare.
const REVIEW =
  "One star. The doorstop has held this door open for six years without a single thank-you. Its reward: kicked into the corner.";

const LIMITS = { minChars: 1, maxChars: 200, maxLines: 1 };

function checkReview(text) {
  const problems = [];
  if (text.length < LIMITS.minChars || text.length > LIMITS.maxChars) {
    problems.push(`length ${text.length} outside ${LIMITS.minChars}-${LIMITS.maxChars}`);
  }
  if (text.trim().length === 0) problems.push("blank");
  if (text.split("\n").length > LIMITS.maxLines) problems.push("more than one line");
  return problems;
}

function main() {
  const faults = checkReview(REVIEW);
  if (faults.length > 0) {
    console.error("review failed gate:", faults.join("; "));
    process.exit(1);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
  console.log(`wrote entry.txt (${REVIEW.length} chars)`);
}

main();
