import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  return (
    <div className="flex flex-col gap-2 px-4 py-4">
      <Link
        to="/dashboard"
        onClick={onClose}
        className="block px-4 py-3 text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)] hover:scale-105 hover:-rotate-3 transition-all rounded-xl font-bold text-sm shadow-sm"
      >
        🏠 Dashboard
      </Link>
      <Link
        to="/kanban"
        onClick={onClose}
        className="block px-4 py-3 text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface2)] hover:scale-105 hover:rotate-3 transition-all rounded-xl font-bold text-sm shadow-sm"
      >
        📋 Kanban
      </Link>
    </div>
  );
};

export default Sidebar;
