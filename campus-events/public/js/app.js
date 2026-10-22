// Campus Events – JavaScript
// Step 11: the event data as an array of objects, filtered in the console.
// Step 12: find the event cards on the page and read their category.
// Step 13: the category filter works on the page.

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

// Step 12: the event cards on the page
const cards = document.querySelectorAll(".event-card");

console.log(`${cards.length} event cards on the page`);

for (const card of cards) {
  const title = card.querySelector("h2").textContent;
  console.log(`${card.dataset.category}: ${title}`);
}

// Step 13: the category filter
const filterForm = document.querySelector(".filter-form");
const categorySelect = document.querySelector("#category");
const emptyMessage = document.querySelector(".empty-state");

// Shows only the cards of a category – or all cards for an empty category
function showCategory(category) {
  let visibleCount = 0;

  for (const card of cards) {
    const matches = category === "" || card.dataset.category === category;
    card.hidden = !matches;
    if (matches) {
      visibleCount++;
    }
  }

  emptyMessage.hidden = visibleCount > 0;
}

// Filter as soon as a category is selected
categorySelect.addEventListener("change", (event) => {
  showCategory(event.target.value);
});

// The button still works – but without reloading the page
filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showCategory(categorySelect.value);
});
