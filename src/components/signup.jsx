// Import React hooks for state management and React Router hooks for navigation.
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// The Signup component.
const Signup = () => {
  // State for the name, email, and password input fields.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hook from React Router to programmatically navigate to other routes.
  const navigate = useNavigate();

  // Function to handle the signup logic when the form is submitted.
  const handleSignup = (e) => {
    e.preventDefault();
    // Create a user object from the form state.
    const user = {
      name,
      email,
      password,
    };
    // Save the new user object to localStorage. This will overwrite any existing user.
    localStorage.setItem("user", JSON.stringify(user));
    // After signing up, automatically navigate the user to the login page.
    navigate("/login");
  };

  return (
    <div>
      <div className="bg-[var(--color-bg)] min-h-screen w-full flex items-center justify-center p-4 font-sans text-[var(--color-text)]">
        {/* Main container for the signup form card */}
        <div className="bg-[var(--color-surface)] shadow-[var(--shadow-modal)] max-w-4xl w-full min-h-[550px] rounded-2xl flex flex-col md:flex-row overflow-hidden border border-[var(--color-border)]">
          {/* Left Panel - Contains a welcome message and a link to the login page. */}
          <div className="bg-[var(--color-surface2)] text-[var(--color-text)] w-full md:w-2/5 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-[var(--color-primary-glow)] rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-[var(--color-primary-glow)] rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex justify-center content-center rounded-md px-8 py-2 font-semibold tracking-widest text-sm text-[var(--color-subtext)] border border-[var(--color-border)] w-max mx-auto">
                Kanban Board
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 h-full text-center relative z-10 py-10 md:py-0">
              <h1 className="text-3xl font-bold tracking-tight text-[var(--color-heading)]">
                Welcome Back!
              </h1>
              <p className="text-[var(--color-subtext)] text-sm leading-relaxed px-4">
                To keep connected with us please login with your personal
                information
              </p>
              {/* Link to navigate to the login page. */}
              <Link
                to="/login"
                className="inline-flex justify-center items-center bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[var(--color-primary-hover)] transition-colors py-3 px-8 rounded-full w-40 font-semibold cursor-pointer mt-4 shadow-[var(--shadow-sm)] text-sm"
              >
                Log In
              </Link>
            </div>
          </div>

          {/* Right Panel - Contains the actual signup form. */}
          <div className="bg-[var(--color-surface)] w-full md:w-3/5 p-8 sm:p-10 flex flex-col justify-center items-center gap-6 relative">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-heading)] text-center tracking-tight">
              Create Account
            </h1>
            <div className="flex gap-4">
              {/* Placeholder social login buttons. */}
              <button className="h-10 w-10 border border-[var(--color-border)] bg-[var(--color-surface2)] rounded-full flex items-center justify-center text-[var(--color-subtext)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] hover:border-[var(--color-primary)] transition-colors cursor-pointer shadow-[var(--shadow-sm)]">
                f
              </button>
              <button className="h-10 w-10 border border-[var(--color-border)] bg-[var(--color-surface2)] rounded-full flex items-center justify-center text-[var(--color-subtext)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] hover:border-[var(--color-primary)] transition-colors cursor-pointer shadow-[var(--shadow-sm)]">
                g+
              </button>
              <button className="h-10 w-10 border border-[var(--color-border)] bg-[var(--color-surface2)] rounded-full flex items-center justify-center text-[var(--color-subtext)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] hover:border-[var(--color-primary)] transition-colors cursor-pointer shadow-[var(--shadow-sm)]">
                in
              </button>
            </div>
            <span className="text-[var(--color-subtext)] text-sm text-center">
              or use your email for registration
            </span>
            <div className="w-full sm:w-3/4 flex flex-col">
              {/* The form element which calls handleSignup on submission. */}
              <form
                onSubmit={handleSignup}
                className="flex flex-col gap-5 items-center w-full"
              >
                <input
                  // Name input field
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 w-full rounded-md bg-[var(--color-surface3)] px-4 border border-[var(--color-border)] focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)] text-[var(--color-text)] placeholder-[var(--color-placeholder)] outline-none transition-colors text-sm"
                  required
                />
                <input
                  // Email input field
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-md bg-[var(--color-surface3)] px-4 border border-[var(--color-border)] focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)] text-[var(--color-text)] placeholder-[var(--color-placeholder)] outline-none transition-colors text-sm"
                  required
                />
                <input
                  // Password input field
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-md bg-[var(--color-surface3)] px-4 border border-[var(--color-border)] focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)] text-[var(--color-text)] placeholder-[var(--color-placeholder)] outline-none transition-colors text-sm"
                  required
                />
                <button
                  // Submit button for the form.
                  type="submit"
                  className="inline-flex justify-center items-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] py-3 px-8 rounded-full w-40 font-medium cursor-pointer transition-colors mt-2 shadow-[var(--shadow-sm)] text-sm"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
