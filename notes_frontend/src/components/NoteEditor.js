import React, { useState, useEffect } from "react";

/**
 * Main pane for viewing and editing a note
 */
// PUBLIC_INTERFACE
function NoteEditor({ note, onSave, onDelete }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || "");
  const [editing, setEditing] = useState(false);

  // Update local state on note prop change (e.g. selecting a different note)
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content || "");
    setEditing(false);
  }, [note.id]);

  // Save handler
  const handleSave = () => {
    if (title.trim() === "") return;
    onSave({ title, content });
    setEditing(false);
  };

  // Handle keyboard shortcut for save (cmd+enter or ctrl+enter)
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <section className="note-editor">
      <input
        className="note-title-input"
        type="text"
        value={title}
        placeholder="Untitled"
        onChange={(e) => {
          setTitle(e.target.value);
          setEditing(true);
        }}
        onKeyDown={handleKeyDown}
        aria-label="Note title"
      />
      <textarea
        className="note-content-input"
        value={content}
        placeholder="Your note content…"
        onChange={(e) => {
          setContent(e.target.value);
          setEditing(true);
        }}
        onKeyDown={handleKeyDown}
        aria-label="Note content"
      />
      <div className="note-editor-actions">
        <button
          className="btn-primary"
          disabled={!editing}
          onClick={handleSave}
        >
          Save
        </button>
        <button className="btn-delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </section>
  );
}

export default NoteEditor;
