import React, { createContext, useState, useEffect } from "react";

// Create Theme Context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user previously selected a theme
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark"; // Default to dark theme if no preference is found
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme class to body element
  useEffect(() => {
    const body = document.body;

    // Remove any existing theme classes
    body.classList.remove("light-theme");

    // Only add light-theme class when in light mode
    // This keeps the original styling for dark mode
    if (theme === "light") {
      body.classList.add("light-theme");
    }

    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
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
