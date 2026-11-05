// Campus Events – checks data/events.json for missing or wrong fields.
// A small Node script, run with: npm run check

import { readFile } from "node:fs/promises";
import { join } from "node:path";

const DATA_FILE = join(import.meta.dirname, "..", "data", "events.json");

// Every event needs these fields – with these types
const REQUIRED_FIELDS = {
  id: "string",
  title: "string",
  category: "string",
  categoryLabel: "string",
  date: "string",
  dateLabel: "string",
  location: "string",
  teaser: "string",
  spots: "number",
  spotsLeft: "number",
};

// Returns a list of problems for one event – an empty list if everything is fine
function checkEvent(event) {
  const problems = [];

  for (const [field, type] of Object.entries(REQUIRED_FIELDS)) {
    if (typeof event[field] !== type) {
      problems.push(`${field} should be a ${type}`);
    }
  }

  if (event.spotsLeft > event.spots) {
    problems.push("spotsLeft is larger than spots");
  }

  return problems;
}

const text = await readFile(DATA_FILE, "utf-8");
const events = JSON.parse(text);

let problemCount = 0;

for (const event of events) {
  const problems = checkEvent(event);
  if (problems.length === 0) {
    console.log(`✓ ${event.id}`);
  } else {
    problemCount += problems.length;
    console.log(`✗ ${event.id ?? "(no id)"}`);
    for (const problem of problems) {
      console.log(`    ${problem}`);
    }
  }
}

const ids = events.map((event) => event.id);
if (new Set(ids).size !== ids.length) {
  problemCount++;
  console.log("✗ Some ids are used more than once");
}

if (problemCount > 0) {
  console.log(`${problemCount} problem(s) found`);
  process.exitCode = 1;
} else {
  console.log(`All ${events.length} events are fine`);
}
