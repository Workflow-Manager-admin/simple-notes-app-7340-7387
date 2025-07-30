import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";
import AuthBanner from "./components/AuthBanner";
import { fetchNotes, createNote, updateNote, deleteNote } from "./api/notesApi";

// PUBLIC_INTERFACE
function App() {
  /**
   * Root component provides the modern minimal notes UI with sidebar, responsive design, light theme, CRUD/search.
   */
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // For auth - OPTIONAL, stubs future expansion
  const [user, setUser] = useState(null);

  // On mount, fetch all notes
  useEffect(() => {
    setLoading(true);
    fetchNotes()
      .then((data) => {
        setNotes(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => setGlobalError("Error loading notes"))
      .finally(() => setLoading(false));
  }, []);

  // Handles note select from sidebar
  const handleSelect = (id) => setSelectedId(id);

  // Handles new note creation
  const handleCreateNote = async () => {
    setLoading(true);
    try {
      const newNote = await createNote();
      const all = [newNote, ...notes];
      setNotes(all);
      setSelectedId(newNote.id);
    } catch (e) {
      setGlobalError("Could not create note");
    }
    setLoading(false);
  };

  // Handles note update/save
  const handleUpdateNote = async (noteUpdates) => {
    setLoading(true);
    try {
      const updated = await updateNote(selectedId, noteUpdates);
      setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
    } catch (e) {
      setGlobalError("Could not save changes");
    }
    setLoading(false);
  };

  // Handles note deletion
  const handleDeleteNote = async (id) => {
    if (!window.confirm("Really delete this note?")) return;
    setLoading(true);
    try {
      await deleteNote(id);
      const nextList = notes.filter((n) => n.id !== id);
      setNotes(nextList);
      setSelectedId(nextList.length > 0 ? nextList[0].id : null);
    } catch (e) {
      setGlobalError("Could not delete note");
    }
    setLoading(false);
  };

  // Search notes by title/body
  const filteredNotes = notes.filter((n) => {
    const s = search.trim().toLowerCase();
    if (!s) return true;
    return (
      n.title.toLowerCase().includes(s) ||
      (n.content && n.content.toLowerCase().includes(s))
    );
  });

  const selectedNote = notes.find((n) => n.id === selectedId);

  return (
    <div className="main-app-root">
      <AuthBanner user={user} />
      {globalError && (
        <div className="global-error">{globalError}</div>
      )}
      <div className="layout">
        <Sidebar
          notes={filteredNotes}
          onSelect={handleSelect}
          selectedId={selectedId}
          onCreate={handleCreateNote}
          onDelete={handleDeleteNote}
          search={search}
          setSearch={setSearch}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="main-pane">
          {loading ? (
            <div className="loading-spinner">Loading…</div>
          ) : selectedNote ? (
            <NoteEditor
              key={selectedNote.id}
              note={selectedNote}
              onSave={handleUpdateNote}
              onDelete={() => handleDeleteNote(selectedNote.id)}
            />
          ) : (
            <div className="empty-state">
              {notes.length === 0
                ? "No notes. Create your first note!"
                : "Select a note from the sidebar."}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
