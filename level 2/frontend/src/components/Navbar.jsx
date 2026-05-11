import React from "react";
import { Link } from "react-router-dom";

/**
 * Navbar variants and their actions:
 * - signup:  [Login]
 * - login:   [Signup]
 * - question:[Logout]
 * - result:  [Restart, Logout]
 *
 * Props:
 * - variant: "signup" | "login" | "question" | "result"
 */
export default function Navbar({ variant = "signup" }) {
  // Map variant to action buttons
  const actionsByVariant = {
    signup: [{ label: "Login", to: "/login", style: "btn-neutral" }],
    login: [{ label: "Signup", to: "/signup", style: "btn-primary" }],
    question: [{ label: "Logout", to: "/logout", style: "btn-error" }],
    result: [
      { label: "Restart", to: "/questions", style: "btn-warning" },
      { label: "Logout", to: "/logout", style: "btn-error" },
    ],
  };

  const actions = actionsByVariant[variant] ?? actionsByVariant.signup;

  return (
    <header className="navbar bg-base-200 shadow-sm h-20">
      {/* Left: Brand */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-2xl normal-case">
          WSA Quiz APP
        </Link>
      </div>

      {/* Right: Contextual actions based on page */}
      <div className="navbar-end gap-2">
        {actions.map(({ label, to, style }, idx) => (
          <Link key={idx} to={to} className={`btn btn-md ${style}`}>
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
