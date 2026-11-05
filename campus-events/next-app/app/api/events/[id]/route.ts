// GET /api/events/photo-walk – one event, or 404
import { loadEvents, waitIfRequested } from "@/lib/events";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  await waitIfRequested(new URL(request.url));

  const { id } = await params;
  const events = await loadEvents();
  const event = events.find((item) => item.id === id);

  if (!event) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }
  return Response.json(event);
}
