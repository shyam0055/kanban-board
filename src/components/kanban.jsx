// Import React hooks for state management and React Router's hook for accessing context.
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

// A helper function to determine the background color class based on task priority.
const getPriorityColor = (priority) => {
  // Returns a specific Tailwind CSS background color class based on the priority string.
  switch (priority) {
    case "High":
      return "bg-red-500";
    case "Medium":
      return "bg-yellow-500";
    case "Low":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

// A generic confirmation dialog component.
const ConfirmationDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-[var(--color-bg)]/80 backdrop-blur-sm flex justify-center items-center z-50 font-sans">
      <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-lg w-[90%] max-w-sm flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[var(--color-heading)]">
          Are you sure?
        </h3>
        <p className="text-sm text-[var(--color-subtext)]">
          This action cannot be undone. This will permanently delete the task.
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-[var(--color-border)] rounded-md text-sm font-medium hover:bg-[var(--color-surface2)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// A modal component to show and edit task details.
const TaskDetailsModal = ({ task, onClose, tasks, setTasks }) => {
  // State to manage the edited values within the modal.
  const [editedDetails, setEditedDetails] = useState(task.details);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  // Handles updating the task with the new details and priority.
  const handleUpdate = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id
        ? { ...t, details: editedDetails, priority: editedPriority }
        : t,
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    onClose(); // Close the modal after updating.
  };

  // Handles deleting the task.
  const handleDelete = () => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    onClose(); // Close the modal after deleting.
  };

  return (
    <div className="fixed inset-0 bg-[var(--color-bg)]/80 backdrop-blur-sm flex justify-center items-center z-50 font-sans">
      <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-lg w-[90%] max-w-lg flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-[var(--color-heading)]">
            {task.task}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-[var(--color-subtext)] hover:text-[var(--color-text)]"
          >
            &times;
          </button>
        </div>

        <p className="text-sm text-[var(--color-subtext)]">
          In column:{" "}
          <span className="font-medium text-[var(--color-text)]">
            {task.progress}
          </span>
        </p>

        <textarea
          value={editedDetails}
          onChange={(e) => setEditedDetails(e.target.value)}
          className="border border-[var(--color-border)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-[var(--color-surface2)] w-full"
          rows="4"
          placeholder="Task details"
        />

        <select
          value={editedPriority}
          onChange={(e) => setEditedPriority(e.target.value)}
          className="border border-[var(--color-border)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-[var(--color-surface2)] cursor-pointer"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <div className="flex justify-between items-center mt-4">
          {/* The original handleDelete is now passed to the parent to trigger the confirmation dialog */}
          <button
            // This onClick is now passed up from the parent component.
            // It will trigger the confirmation dialog.
            onClick={handleDelete}
            className="px-4 py-2 border border-red-500/50 text-red-500 rounded-md text-sm font-medium hover:bg-red-500/10 transition-colors"
          >
            Delete Task
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-md text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// The main Kanban board component.
const Kanban = () => {
  // State for the confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Retrieve the 'tasks' array passed from the parent Layout component via Outlet context.
  const { tasks, setTasks } = useOutletContext();
  const [draggedTask, setDraggedTask] = useState(null);
  const handleDragStart = (id) => {
    setDraggedTask(id);
    console.log(draggedTask);
  };
  const handleDrop = (newProgress) => {
    const updatedTasks = tasks.map((task) =>
      task.id === draggedTask ? { ...task, progress: newProgress } : task,
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setDraggedTask(null);
  };

  // Opens the confirmation dialog
  const requestDelete = (id) => {
    setTaskToDelete(id);
    setShowConfirmDialog(true);
  };

  // Performs the deletion after confirmation
  const handleConfirmDelete = () => {
    if (taskToDelete) {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      // If the main details modal is open for the deleted task, close it.
      if (selectedTask && selectedTask.id === taskToDelete) {
        setSelectedTask(null);
      }
    }
    setShowConfirmDialog(false);
    setTaskToDelete(null);
  };

  const KanbanCard = ({ item, handleDragStart, onCardClick }) => (
    <div
      onClick={() => onCardClick(item)}
      draggable
      onDragStart={() => handleDragStart(item.id)}
      className="flex cursor-grab active:cursor-grabbing justify-between p-4 rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface2)] shadow-sm hover:shadow-xl hover:-rotate-2 hover:scale-105 active:rotate-6 transition-all duration-300 select-none"
    >
      <div>
        {/* Displays the main task name. */}
        <h3 className="font-semibold text-[var(--color-text)]">{item.task}</h3>
        {/* Displays the task details. */}
        <p className="text-sm text-[var(--color-subtext)] mt-1 mb-3">
          {item.details}
        </p>
        <div className="flex items-center gap-2">
          <span
            // The colored dot indicating priority, using the helper function.
            className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)}`}
          ></span>
          <span className="text-xs font-medium text-[var(--color-subtext)]">
            {item.priority} Priority
          </span>
        </div>
      </div>
      <button
        className="p-2 h-10 w-10 text-xl flex justify-center items-center cursor-pointer hover:text-red-500 hover:bg-[var(--color-surface)] rounded-full hover:scale-125 transition-all"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the modal from opening
          requestDelete(item.id);
        }}
      >
        🗑️
      </button>
    </div>
  );

  // State to hold the current search query from the user.
  const [search, setSearch] = useState("");
  const [prio, setPrio] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  // Filters tasks based on the search query. It checks if the search term is present
  // in the task name, details, or progress status.
  // Note: This 'FilterTasks' variable is defined but not currently used in the JSX below.
  // The columns are currently populated from unfiltered lists.
  const FilterTasks = tasks.filter((task) => {
    const matchesSearch =
      task.task.toLowerCase().includes(search.toLowerCase()) ||
      task.details.toLowerCase().includes(search.toLowerCase()) ||
      task.progress.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = prio === "" || task.priority === prio;
    return matchesSearch && matchesPriority;
  });

  // Filter tasks into three separate lists based on their 'progress' status for each column.
  const todoTasks = FilterTasks.filter((task) => task.progress === "To Do");
  const inProgressTasks = FilterTasks.filter(
    (task) => task.progress === "In Progress",
  );
  const completedTasks = FilterTasks.filter(
    (task) => task.progress === "Completed",
  );
  return (
    <div className="h-[calc(100vh-65px)] flex flex-col w-full font-sans p-8 pt-4 gap-6">
      {/* Render the custom confirmation dialog when needed */}
      {showConfirmDialog && (
        <ConfirmationDialog
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}

      {/* Render the modal if a task is selected */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          tasks={tasks}
          setTasks={setTasks}
          // Pass the delete request function to the modal's delete button
          handleDelete={() => requestDelete(selectedTask.id)}
        />
      )}
      {/* Header section containing the title, search bar, and a filter dropdown. */}
      <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-[var(--color-heading)] tracking-tight">
          Kanban Board
        </h1>

        {/* Search input that updates the 'search' state on every change. */}
        <input
          type="text"
          placeholder="Search Tasks"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-full sm:w-1/3 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] px-4 py-2 text-sm rounded-full outline-none transition-colors text-[var(--color-text)] placeholder-[var(--color-subtext)]"
        />

        {/* A dropdown for filtering tasks by priority. Note: Its functionality is not yet implemented. */}
        <select
          value={prio}
          className="w-full sm:w-auto bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] rounded-md text-sm px-4 py-2 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors cursor-pointer"
          onChange={(e) => {
            setPrio(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Main content area with three columns for the Kanban board. */}
      <div className="flex flex-1 gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
        {/* "To-Do" column. */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("To Do")}
          className="w-[85%] sm:w-1/3 min-w-[300px] snap-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl flex flex-col shrink-0"
        >
          <div className="p-4 border-b border-[var(--color-border)]">
            <h2 className="font-semibold text-lg text-[var(--color-heading)] flex items-center gap-2">
              To-Do{" "}
              <span className="text-sm font-normal bg-[var(--color-surface3)] px-2 py-0.5 rounded-full">
                {todoTasks.length}
              </span>
            </h2>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-4">
            {/* Maps over the 'todoTasks' array and renders a KanbanCard for each task. */}
            {todoTasks.map((item) => (
              <KanbanCard
                key={item.id}
                item={item}
                handleDragStart={handleDragStart}
                onCardClick={setSelectedTask}
              />
            ))}
          </div>
        </div>

        {/* "In Progress" column. */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("In Progress")}
          className="w-[85%] sm:w-1/3 min-w-[300px] snap-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl flex flex-col shrink-0"
        >
          <div className="p-4 border-b border-[var(--color-border)]">
            <h2 className="font-semibold text-lg text-[var(--color-heading)] flex items-center gap-2">
              In Progress{" "}
              <span className="text-sm font-normal bg-[var(--color-surface3)] px-2 py-0.5 rounded-full">
                {inProgressTasks.length}
              </span>
            </h2>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-4">
            {/* Maps over the 'inProgressTasks' array and renders a KanbanCard for each task. */}
            {inProgressTasks.map((item) => (
              <KanbanCard
                key={item.id}
                item={item}
                handleDragStart={handleDragStart}
                onCardClick={setSelectedTask}
              />
            ))}
          </div>
        </div>

        {/* "Completed" column. */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("Completed")}
          className="w-[85%] sm:w-1/3 min-w-[300px] snap-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl flex flex-col shrink-0"
        >
          <div className="p-4 border-b border-[var(--color-border)]">
            <h2 className="font-semibold text-lg text-[var(--color-heading)] flex items-center gap-2">
              Completed{" "}
              <span className="text-sm font-normal bg-[var(--color-surface3)] px-2 py-0.5 rounded-full">
                {completedTasks.length}
              </span>
            </h2>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-4">
            {/* Maps over the 'completedTasks' array and renders a KanbanCard for each task. */}
            {completedTasks.map((item) => (
              <KanbanCard
                key={item.id}
                item={item}
                handleDragStart={handleDragStart}
                onCardClick={setSelectedTask}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
