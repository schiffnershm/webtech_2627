// GET /api/broken – always answers with 500, to practice error handling
export function GET(): Response {
  return Response.json({ error: "Something went wrong on the server" }, { status: 500 });
}
