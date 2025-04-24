import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <FontAwesomeIcon
        icon={theme === "light" ? faMoon : faSun}
        className="theme-icon"
      />
      <span className="theme-label">
        {theme === "light" ? "Dark" : "Light"} Mode
      </span>

      <style jsx>{`
        .theme-toggle-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-left: auto;
          margin-right: 12px;
        }

        /* Dark Theme Button Styles (when in light mode) */
        .light-theme .theme-toggle-btn {
          background-color: #e0e0e0;
          color: #333;
        }

        .light-theme .theme-toggle-btn:hover {
          background-color: #d0d0d0;
        }

        /* Light Theme Button Styles (when in dark mode) */
        .dark-theme .theme-toggle-btn {
          background-color: #333;
          color: #f0f0f0;
        }

        .dark-theme .theme-toggle-btn:hover {
          background-color: #444;
        }

        .theme-icon {
          font-size: 1rem;
        }

        /* Hide the label on small screens */
        @media (max-width: 768px) {
          .theme-label {
            display: none;
          }

          .theme-toggle-btn {
            padding: 8px;
          }
        }
      `}</style>
    </button>
  );
};

export default ThemeToggle;
