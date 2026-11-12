import type { CampusEvent } from "@/lib/events";
import EventCard from "@/components/EventCard";

interface EventListProps {
  events: CampusEvent[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return <p className="empty-state">No events yet.</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
