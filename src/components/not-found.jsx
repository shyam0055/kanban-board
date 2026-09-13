// Import React and the Link component for navigation.
import React from "react";
import { Link } from "react-router-dom";

// The NotFound component is displayed for any route that doesn't match.
const NotFound = () => {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen w-full flex flex-col items-center justify-center font-sans overflow-hidden relative z-0">
      {/* Decorative animated background elements for visual appeal. */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-[var(--color-primary-glow)] rounded-full filter blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-1/4 w-80 h-80 bg-[var(--color-primary-glow)] rounded-full filter blur-[120px] animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="relative flex flex-col items-center group">
        {/* The main "404" text. */}
        <h1 className="text-9xl font-extrabold tracking-tight text-[var(--color-primary)] mb-2 drop-shadow-[var(--shadow-glow)] transition-transform duration-700 group-hover:scale-110">
          404
        </h1>
      </div>

      {/* A user-friendly message explaining the error. */}
      <p className="text-xl sm:text-2xl mb-10 text-[var(--color-subtext)] font-bold tracking-wide text-center px-4 relative z-10 transition-colors duration-300 hover:text-[var(--color-text)] drop-shadow-sm">
        Oops! We couldn't find the page you're looking for.
      </p>

      {/* A link that navigates the user back to the homepage. */}
      <Link
        to="/"
        className="relative z-10 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] py-3.5 px-10 rounded-full font-bold shadow-[var(--shadow-glow)] transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-105 text-sm uppercase tracking-wider"
      >
        Take Me Home
      </Link>
    </div>
  );
};

export default NotFound;
