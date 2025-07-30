const BASE_URL =
  process.env.REACT_APP_NOTES_API_URL ||
  "http://localhost:5000/notes"; // Ensure to set REACT_APP_NOTES_API_URL

/**
 * Helper for fetch with JSON, throws on HTTP error.
 */
async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: {
      ...opts.headers,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchNotes() {
  /** List all notes */
  return fetchJSON(BASE_URL, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function createNote() {
  /** Create a new blank note */
  return fetchJSON(BASE_URL, {
    method: "POST",
    body: JSON.stringify({ title: "Untitled", content: "" }),
  });
}

// PUBLIC_INTERFACE
export async function updateNote(id, updates) {
  /** Update note by id */
  return fetchJSON(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete note by id */
  return fetchJSON(`${BASE_URL}/${id}`, { method: "DELETE" });
}
