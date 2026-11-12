import { loadEvents } from "@/lib/events";
import EventList from "@/components/EventList";

// Render the page on every request – so changes in data/events.json show up right away
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await loadEvents();

  return (
    <main>
      <h1>Upcoming events</h1>
      <p>Find out what student clubs are planning and sign up for the events you like.</p>
      <EventList events={events} />
    </main>
  );
}
