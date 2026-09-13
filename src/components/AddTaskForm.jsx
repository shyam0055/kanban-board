/**
 * @file AddTaskForm.jsx
 * @description A form for adding a new task to a column.
 */
import React, { useState } from "react";
import Button from "./Button";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const textareaStyle = {
  width: "100%",
  minHeight: "60px",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box", // Ensures padding doesn't affect width
  fontFamily: "sans-serif",
  resize: "vertical",
};

const actionsStyle = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

export default function AddTaskForm({ onAddTask, onCancel }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle(""); // Reset the form
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <textarea
        style={textareaStyle}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title for this card..."
        autoFocus
      />
      <div style={actionsStyle}>
        <Button>Add card</Button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "0 8px",
          }}
        >
          &times;
        </button>
      </div>
    </form>
  );
}
