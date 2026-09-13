/**
 * @file Column.jsx
 * @description A component that represents a single column on the Kanban board.
 * It displays a title and a list of tasks within that column.
 */
import React, { useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";

// Basic styling for the column. You can move this to a separate CSS file.
const columnStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#F1F2F4", // A slightly updated background color-
  borderRadius: "8px",
  width: "300px",
  margin: "0 8px",
  padding: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  maxHeight: "calc(100vh - 120px)", // Prevents columns from being too tall
  flexShrink: 0,
};

const titleStyle = {
  padding: "0 8px",
  fontWeight: "bold",
  fontSize: "1.1em",
  marginBottom: "16px",
};

const taskListStyle = {
  minHeight: "20px",
  flexGrow: 1,
  overflowY: "auto",
  // Hides the scrollbar for a cleaner look
  scrollbarWidth: "none", // For Firefox
  "&::-webkit-scrollbar": {
    display: "none", // For Chrome, Safari, and Opera
  },
  msOverflowStyle: "none", // For IE and Edge
};

const addCardButtonStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "8px",
  border: "none",
  borderRadius: "4px",
  textAlign: "left",
  cursor: "pointer",
  backgroundColor: "transparent", // Keep it subtle
  color: "#5E6C84",
  transition: "background-color 0.2s ease",
};

export default function Column({ title, tasks = [], onCardClick, onAddTask }) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <div style={columnStyle}>
      <h2 style={titleStyle}>{title}</h2>
      {/* This style tag is necessary to hide the scrollbar in Webkit-based browsers like Chrome and Safari. */}
      <style>
        {`
          .task-list::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div style={taskListStyle} className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onClick={() => onCardClick(task.id)}
          />
        ))}
      </div>
      {isAddingTask ? (
        <AddTaskForm
          onAddTask={(taskTitle) => {
            onAddTask(taskTitle);
            setIsAddingTask(false);
          }}
          onCancel={() => setIsAddingTask(false)}
        />
      ) : (
        <button
          style={addCardButtonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#091E420F")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          onClick={() => setIsAddingTask(true)}
        >
          + Add a card
        </button>
      )}
    </div>
  );
}
