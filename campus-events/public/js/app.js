// Campus Events – JavaScript
// Step 14: the event data comes from the server instead of an array in this file.
// Step 15: the cards are created from the data, and the filter works with the data.
// Start the server with: node server.js

let events = [];

const eventList = document.querySelector(".event-list");
const filterForm = document.querySelector(".filter-form");
const categorySelect = document.querySelector("#category");
const emptyMessage = document.querySelector(".empty-state");

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

// Creates the card for one event – with textContent, never innerHTML
function createCard(event) {
  const card = document.createElement("article");
  card.className = "event-card";

  const title = document.createElement("h2");
  title.textContent = event.title;

  const meta = document.createElement("p");
  meta.className = "event-meta";
  const time = document.createElement("time");
  time.dateTime = event.date;
  time.textContent = event.dateLabel;
  meta.append(time, ` · ${event.location}`);

  const badgeLine = document.createElement("p");
  const badge = document.createElement("span");
  badge.className = "category-badge";
  badge.textContent = event.categoryLabel;
  badgeLine.append(badge);

  const teaser = document.createElement("p");
  teaser.textContent = event.teaser;

  const linkLine = document.createElement("p");
  const link = document.createElement("a");
  link.className = "button";
  link.href = `events/${event.id}.html`;
  link.textContent = "View details";
  linkLine.append(link);

  card.append(title, meta, badgeLine, teaser, linkLine);
  return card;
}

// Replaces all cards on the page with the cards for the given events
function renderEvents(list) {
  const cards = list.map((event) => createCard(event));
  eventList.replaceChildren(...cards);
  emptyMessage.hidden = list.length > 0;
}

// The filter now works with the data: filter the array, then render again
function showCategory(category) {
  renderEvents(filterByCategory(events, category));
}

categorySelect.addEventListener("change", (event) => {
  showCategory(event.target.value);
});

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showCategory(categorySelect.value);
});

async function init() {
  events = await loadEvents();
  renderEvents(events);
}

init();
