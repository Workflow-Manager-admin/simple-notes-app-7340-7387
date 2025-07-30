import React from "react";

/**
 * Authentication banner (for future expansion, currently stub)
 * Shows user status, sign in/out controls (disabled)
 */
// PUBLIC_INTERFACE
function AuthBanner({ user }) {
  return (
    <header className="auth-banner">
      {user ? (
        <span>
          Hello, {user.username}{" "}
          <button className="btn-link" disabled>
            Sign out
          </button>
        </span>
      ) : (
        <span>
          <button className="btn-link" disabled>
            Sign in
          </button>
        </span>
      )}
      <span className="auth-banner-beta">[Optional: User auth coming soon]</span>
    </header>
  );
}

export default AuthBanner;
