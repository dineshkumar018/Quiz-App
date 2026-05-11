// src/components/AppFooter.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content">
      <aside>
        <p className="textarea-lg opacity-70">
          © {new Date().getFullYear()} WSA Quiz APP. All rights reserved.
        </p>
      </aside>
    </footer>
  );
}
