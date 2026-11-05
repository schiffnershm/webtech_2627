// GET /api/events – all events, or only one category with ?category=outdoor
import { loadEvents, waitIfRequested } from "@/lib/events";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  await waitIfRequested(url);

  const events = await loadEvents();
  const category = url.searchParams.get("category");
  const result = category
    ? events.filter((event) => event.category === category)
    : events;

  return Response.json(result);
}
