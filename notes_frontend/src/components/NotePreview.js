import React from "react";

/**
 * Renders a single note preview in the sidebar
 */
// PUBLIC_INTERFACE
function NotePreview({ note, selected, onClick, onDelete }) {
  return (
    <div
      className={`note-preview ${selected ? "selected" : ""}`}
      tabIndex={0}
      onClick={onClick}
      aria-current={selected ? "page" : undefined}
    >
      <div className="note-preview-title" title={note.title}>
        {note.title || "Untitled"}
      </div>
      <button
        className="note-preview-delete"
        aria-label="Delete this note"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        tabIndex={-1}
        title="Delete note"
      >
        🗑
      </button>
    </div>
  );
}

export default NotePreview;
