import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./sidebar";

// The main Layout component that wraps the entire application UI.
const Layout = () => {
  // State for each field in the "Create New Task" form.
  const [task, settask] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("");
  const [progress, setProgress] = useState("");
  const [date, setDate] = useState("");

  // State to control the visibility of the "Create New Task" modal form.
  const [openForm, setOpenForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State to hold all tasks. It initializes from localStorage to persist tasks across sessions.
  // If 'tasks' isn't in localStorage, it defaults to an empty array.
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });


  // This effect listens for changes to localStorage from other browser tabs.
  // If the 'tasks' item changes, it updates the component's state to keep the UI in sync.
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Check if the change happened on the 'tasks' key.
      if (e.key === "tasks") {
        setTasks(JSON.parse(e.newValue) || []);
      }
    };

    // Add the event listener when the component mounts.
    window.addEventListener("storage", handleStorageChange);

    // Cleanup: Remove the event listener when the component unmounts to prevent memory leaks.
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handles the submission of the "Create New Task" form.
  const creatTask = (e) => {
    e.preventDefault();
    // Create a new task object with a unique ID and the form data.
    const newtask = {
      id: Date.now(),
      task,
      details,
      priority,
      progress,
      date,
    };
    // Create an updated list of tasks by adding the new one.
    const updateTasks = [...tasks, newtask];

    // Update the component's state with the new list.
    setTasks(updateTasks);
    // Save the updated list to localStorage to persist it.
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
    // Close the form and reset all form fields.
    setOpenForm(false);
    settask("");
    setDetails("");
    setPriority("");
    setProgress("");
    setDate("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] font-sans ">
      {/* The modal form, which is rendered conditionally based on 'openForm' state */}
      {openForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
          {/* The form container */}
          <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] w-[90%] max-w-lg md:w-1/2 shadow-lg">
            <form
              onSubmit={creatTask}
              className="flex flex-col gap-4 text-[var(--color-text)]"
            >
              <h2 className="text-xl font-bold mb-2 text-[var(--color-heading)]">
                Create New Task
              </h2>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[var(--color-subtext)]">
                  Task Name
                </label>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => settask(e.target.value)}
                  className="border border-[var(--color-border)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-[var(--color-surface2)]"
                  placeholder="Enter task name"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[var(--color-subtext)]">
                  Details
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="border border-[var(--color-border)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-[var(--color-surface2)]"
                  placeholder="Enter task details"
                  rows="3"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[var(--color-subtext)]">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="border border-[var(--color-border)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-[var(--color-surface2)] cursor-pointer"
                  required
                >
                  <option value="">Select priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[var(--color-subtext)]">
                  Progress
                </label>
                <select
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  className="border border-[var(--color-border)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-[var(--color-surface2)] cursor-pointer"
                  required
                >
                  <option value="">Select progress</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[var(--color-subtext)]">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-[var(--color-border)] rounded-md px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-[var(--color-surface2)]"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpenForm(false)}
                  className="px-4 py-2 border border-[var(--color-border)] rounded-md text-sm font-medium hover:bg-[var(--color-surface2)] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-md text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors shadow-sm cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Top navigation bar */}
      <nav className="bg-[var(--color-bg)] text-[var(--color-heading)] border-b border-[var(--color-border)] px-4 md:px-10 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-all">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 -ml-2 rounded-md hover:bg-[var(--color-surface2)] transition-colors cursor-pointer text-[var(--color-text)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="font-extrabold text-xl md:text-2xl tracking-tight hover:rotate-2 hover:scale-110 cursor-pointer transition-transform duration-300 select-none">
            ✨ Project Manager 
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
         
          {/* Button to open the "Create New Task" modal */}
          <button
            onClick={() => setOpenForm(true)}
            className="px-5 py-2.5 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-full text-sm font-bold hover:shadow-xl hover:-translate-y-1 hover:rotate-3 active:scale-95 transition-all shadow-md"
          >
            + New Task 
          </button>
        </div>
      </nav>
      {/* Main content area below the navigation bar */}
      <div className="flex w-full flex-1 overflow-hidden relative">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
        
        {/* Sidebar on the left */}
        <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 bg-[var(--color-surface)] w-64 border-r border-[var(--color-border)] flex flex-col flex-shrink-0 h-[calc(100vh-73px)] md:h-auto mt-[73px] md:mt-0`}>
          <div className="flex-1 overflow-y-auto">
            <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
        {/* Main content panel on the right */}
        <div className="bg-[var(--color-bg)] flex-1 overflow-y-auto">
          {/* Renders the component for the current route (e.g., Dashboard, Kanban). It passes 'tasks' and 'setTasks' down as context. */}
          <Outlet context={{ tasks, setTasks }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
