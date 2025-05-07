import React, { createContext, useState, useEffect } from "react";

// Create Theme Context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user previously selected a theme
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");

    // Check if system prefers light mode
    if (!savedTheme) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        return "light";
      }
    }

    return savedTheme || "dark"; // Default to dark theme if no preference is found
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme class to document element for complete coverage
  useEffect(() => {
    // Apply to both document element and body for complete coverage
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.body.classList.remove("light-theme", "dark-theme");

    // Add appropriate theme class
    document.documentElement.classList.add(`${theme}-theme`);
    document.body.classList.add(`${theme}-theme`);

    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);

    // Set meta theme-color for browser UI
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "light" ? "#f8f9fa" : "#242424"
      );
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
