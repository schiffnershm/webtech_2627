// Campus Events – JavaScript
// Step 11: the event data as an array of objects, filtered in the console.
// Nothing changes on the page yet – that comes with the DOM in step 12.

const events = [
  {
    id: "photo-walk",
    title: "Photo Walk Through the Old Town",
    category: "photography",
    date: "2026-10-24T15:00",
    location: "Marienplatz",
    spots: 20,
    spotsLeft: 8,
  },
  {
    id: "hiking-trip",
    title: "Day Hike to the Herzogstand",
    category: "outdoor",
    date: "2026-11-07T08:00",
    location: "Munich Central Station",
    spots: 15,
    spotsLeft: 3,
  },
];

// Returns all events of a category – or all events for an empty category
function filterByCategory(list, category) {
  if (category === "") {
    return list;
  }
  return list.filter((event) => event.category === category);
}

// Builds a short text for the console
function describe(event) {
  return `${event.title} – ${event.spotsLeft} of ${event.spots} spots left`;
}

console.log(`Campus Events: ${events.length} events loaded`);

for (const event of filterByCategory(events, "outdoor")) {
  console.log(describe(event));
}
