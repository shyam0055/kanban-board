// Import React and the useOutletContext hook from React Router to get data from the parent layout.
import React from "react";
import { useOutletContext } from "react-router-dom";

// The Dashboard component, which displays an overview of tasks.
const Dashboard = () => {
  // Retrieve the 'tasks' array from the parent Layout component.
  const { tasks } = useOutletContext();

  // Filter tasks into different categories based on their progress status.
  const todoTasks = tasks.filter((task) => task.progress === "To Do");
  const inProgressTasks = tasks.filter(
    (task) => task.progress === "In Progress",
  );
  const completedTasks = tasks.filter((task) => task.progress === "Completed");

  // Calculate the percentage of completed tasks.
  const percentage =
    tasks.length === 0
      ? 0
      : ((completedTasks.length / tasks.length) * 100).toFixed(0);

  // Helper function to get the appropriate color classes for the task status badge.
  const getStatusColor = (progress) => {
    switch (progress) {
      case "To Do":
        return "text-[var(--color-subtext)] bg-[var(--color-subtext)]/10";

      case "In Progress":
        return "text-[var(--color-warning)] bg-[var(--color-warning)]/10";

      case "Completed":
        return "text-[var(--color-success)] bg-[var(--color-success)]/10";

      default:
        return "text-blue-500 bg-blue-500/10";
    }
  };

  // Helper function to get the appropriate color class for the progress bar.
  const getProgressBarColor = (percentage) => {
    const p = Number(percentage);
    const baseClasses = "h-3 rounded-full transition-all duration-300";
    if (p === 100) {
      return `bg-green-600 ${baseClasses}`; // 100%: Dark Green
    }
    if (p >= 70) {
      return `bg-green-500 ${baseClasses}`; // 70% - 99%: Green
    }
    if (p >= 40) {
      return `bg-yellow-500 ${baseClasses}`; // 40% - 69%: Yellow
    }
    if (p > 0) {
      return `bg-red-500 ${baseClasses}`; // 1% - 39%: Red
    }
    return `bg-gray-300 ${baseClasses}`; // 0%: Gray
  };
  return (
    <div className="flex flex-col gap-8 p-8    font-sans">
      <div>
        {/* Dashboard header */}
        <h1 className="text-2xl font-bold text-[var(--color-heading)] tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-[var(--color-subtext)] text-sm mt-1">
          Here is a summary of your projects and recent tasks.
        </p>
      </div>

      {/* A grid of statistical cards showing task counts. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overdue"
          value={todoTasks.length}
          color="text-red-500"
        />
        <StatCard
          title="In Progress"
          value={inProgressTasks.length}
          color="text-yellow-500"
        />
        <StatCard
          title="Completed"
          value={completedTasks.length}
          color="text-green-500"
        />
      </div>

      {/* Main content area with a task list and a progress summary. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: A list of all recent tasks. */}
        <div className="lg:col-span-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-[var(--shadow-sm)] overflow-hidden">
          <div className="px-6 py-5 border-b border-[var(--color-border)]">
            <h2 className="font-semibold text-[var(--color-heading)]">
              Recent Tasks
            </h2>
          </div>
          {/* Renders a TaskItem for each task in the 'tasks' array. */}
          <div className="divide-y  divide-[var(--color-border)]">
            {tasks.map((item) => {
              return (
                <TaskItem
                  key={item.id}
                  title={item.task}
                  project={item.details}
                  status={item.progress}
                  statusColor={getStatusColor(item.progress)}
                />
              );
            })}
          </div>
        </div>

        {/* Right Panel: Shows the overall project progress. */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-[var(--shadow-sm)] p-6 flex flex-col">
          <h2 className="font-semibold text-[var(--color-heading)] mb-6">
            Overall Progress
          </h2>
          <div className="flex-1 flex flex-col justify-center gap-4 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text)] font-medium">
                Completion Rate
              </span>
              <span className="text-[var(--color-primary)] font-bold">
                {percentage}%
              </span>
            </div>
            {/* Progress bar visual. */}
            <div className="w-full bg-[var(--color-surface3)] rounded-full h-3 overflow-hidden">
              <div
                className={getProgressBarColor(percentage)}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-[var(--color-subtext)] text-xs text-center mt-2">
              {completedTasks.length} of {tasks.length} tasks completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// A reusable component for displaying a single statistic card.
const StatCard = ({ title, value, color }) => (
  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-[var(--shadow-sm)] flex flex-col gap-2 transition-transform hover:-translate-y-1">
    <span className="text-[var(--color-subtext)] text-sm font-medium">
      {title}
    </span>
    <span className={`text-4xl font-bold ${color}`}>{value}</span>
  </div>
);

// A reusable component for displaying a single task item in a list.
const TaskItem = ({ title, project, status, statusColor }) => (
  <div className="px-6 py-4 flex items-center justify-between hover:bg-[var(--color-surface2)] transition-colors">
    <div className="flex flex-col gap-1">
      <span className="font-medium text-[var(--color-text)] text-sm">
        {title}
      </span>
      <span className="text-[var(--color-subtext)] text-xs">{project}</span>
    </div>
    {/* The status badge with a dynamic color. */}
    <div
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}
    >
      {status}
    </div>
  </div>
);

export default Dashboard;
