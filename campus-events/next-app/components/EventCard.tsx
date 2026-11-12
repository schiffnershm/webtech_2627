import type { CampusEvent } from "@/lib/events";
import CategoryBadge from "@/components/CategoryBadge";

interface EventCardProps {
  event: CampusEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="event-card">
      <h2>{event.title}</h2>
      <p className="event-meta">
        <time dateTime={event.date}>{event.dateLabel}</time> · {event.location}
      </p>
      <p>
        <CategoryBadge label={event.categoryLabel} />
      </p>
      <p>{event.teaser}</p>
      <p>
        <a className="button" href={`/events/${event.id}.html`}>
          View details
        </a>
      </p>
    </article>
  );
}
