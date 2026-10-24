// Campus Events – JavaScript
// Step 14: the event data comes from the server instead of an array in this file.
// Start the server with: node server.js

let events = [];

// Loads the events from the server
async function loadEvents() {
  const response = await fetch("/api/events");
  const data = await response.json();
  return data;
}

// Returns all events of a category – or all events for an empty category
function filterByCategory(list, category) {
  if (category === "") {
    return list;
  }
  return list.filter((event) => event.category === category);
}

// The event cards on the page – still written by hand in index.html
const cards = document.querySelectorAll(".event-card");
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

categorySelect.addEventListener("change", (event) => {
  showCategory(event.target.value);
});

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showCategory(categorySelect.value);
});

// Step 14: load the data and show it in the console
async function init() {
  console.log("1: before loading");
  events = await loadEvents();
  console.log(`3: ${events.length} events loaded from the server`);
}

init();
console.log("2: after calling init()");
