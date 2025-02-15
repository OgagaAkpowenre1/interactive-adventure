import React, { createContext, useState, useContext } from "react";
import { lightTheme, darkTheme } from "../styles/themes";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const mode = theme
  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme: theme === "light" ? lightTheme : darkTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
