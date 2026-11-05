// The event data – read from data/events.json on every request
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export interface CampusEvent {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  date: string;
  dateLabel: string;
  location: string;
  teaser: string;
  spots: number;
  spotsLeft: number;
}

export async function loadEvents(): Promise<CampusEvent[]> {
  const text = await readFile(join(process.cwd(), "data", "events.json"), "utf-8");
  return JSON.parse(text);
}

// ?delay=2000 makes the API wait two seconds – to see the loading state
export async function waitIfRequested(url: URL): Promise<void> {
  const delay = Number(url.searchParams.get("delay") ?? 0);
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, Math.min(delay, 10000)));
  }
}
