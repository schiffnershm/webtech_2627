// Campus Events – a small server for the course.
// It delivers the files in public/ and the event data as JSON.
// For now, just run it with: node server.js
// We look inside this file in lecture 6.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORT = 3000;
const PUBLIC_DIR = join(import.meta.dirname, "public");
const DATA_FILE = join(import.meta.dirname, "data", "events.json");

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": CONTENT_TYPES[".json"] });
  response.end(JSON.stringify(data, null, 2));
}

// The data is read on every request – changes to events.json show up after a reload
async function loadEvents() {
  const text = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(text);
}

// GET /api/events, GET /api/events/:id – and /api/broken to practice error handling
async function handleApi(request, url, response) {
  if (request.method !== "GET") {
    sendJson(response, 405, { error: "This API is read-only" });
    return;
  }

  if (url.pathname === "/api/broken") {
    sendJson(response, 500, { error: "Something went wrong on the server" });
    return;
  }

  const events = await loadEvents();

  if (url.pathname === "/api/events") {
    sendJson(response, 200, events);
    return;
  }

  const match = url.pathname.match(/^\/api\/events\/([\w-]+)$/);
  if (match) {
    const event = events.find((item) => item.id === match[1]);
    if (event) {
      sendJson(response, 200, event);
    } else {
      sendJson(response, 404, { error: "Event not found" });
    }
    return;
  }

  sendJson(response, 404, { error: "Unknown API route" });
}

// Everything else: a file from public/
async function serveFile(url, response) {
  const path = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = normalize(join(PUBLIC_DIR, path));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  try {
    const content = await readFile(filePath);
    const type = CONTENT_TYPES[extname(filePath)] ?? "application/octet-stream";
    response.writeHead(200, { "Content-Type": type });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  console.log(`${request.method} ${url.pathname}${url.search}`);

  // ?delay=2000 makes the server wait two seconds – to see the loading state
  const delay = Number(url.searchParams.get("delay") ?? 0);
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, Math.min(delay, 10000)));
  }

  try {
    if (url.pathname.startsWith("/api/")) {
      await handleApi(request, url, response);
    } else {
      await serveFile(url, response);
    }
  } catch (error) {
    // For example invalid JSON in events.json: answer with 500 instead of crashing
    console.error(error);
    sendJson(response, 500, { error: "Internal server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Campus Events is running at http://localhost:${PORT}`);
});
