import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${isLight ? "light-toggle" : "dark-toggle"}`}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      <FontAwesomeIcon icon={isLight ? faMoon : faSun} className="theme-icon" />
      <span className="theme-label">{isLight ? "Dark" : "Light"} Mode</span>

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
          margin-left: 10px;
          margin-right: 10px;
        }

        .dark-toggle {
          background-color: #2c3e50;
          color: #f0f0f0;
        }

        .dark-toggle:hover {
          background-color: #3a4b5c;
          color: #ffffff;
        }

        .light-toggle {
          background-color: #e0e0e0;
          color: #333;
        }

        .light-toggle:hover {
          background-color: #d0d0d0;
          color: #222;
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
