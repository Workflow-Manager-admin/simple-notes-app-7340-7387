import React from "react";
import NotePreview from "./NotePreview";

/**
 * Sidebar navigation component for notes
 */
// PUBLIC_INTERFACE
function Sidebar({
  notes,
  onSelect,
  selectedId,
  onCreate,
  onDelete,
  search,
  setSearch,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <aside
      className={`sidebar-nav${sidebarOpen ? "" : " closed"}`}
      aria-label="Notes list"
    >
      <div className="sidebar-header">
        <span className="sidebar-title">Notes</span>
        <button
          className="btn-primary"
          onClick={onCreate}
          aria-label="Create new note"
        >
          +
        </button>
        <button
          className="sidebar-toggle"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "⟨" : "⟩"}
        </button>
      </div>
      <input
        type="text"
        className="sidebar-search"
        placeholder="Search…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search notes"
      />
      <nav className="sidebar-list">
        {notes.length === 0 && (
          <div className="sidebar-empty">No notes found.</div>
        )}
        {notes.map((note) => (
          <NotePreview
            key={note.id}
            note={note}
            selected={note.id === selectedId}
            onClick={() => onSelect(note.id)}
            onDelete={() => onDelete(note.id)}
          />
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
