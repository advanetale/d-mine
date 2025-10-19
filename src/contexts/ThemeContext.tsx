"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Получаем уже установленную тему из DOM (установленную inline скриптом)
    const currentTheme = document.documentElement.getAttribute(
      "data-theme"
    ) as Theme;
    let initialTheme: Theme;

    if (currentTheme && (currentTheme === "light" || currentTheme === "dark")) {
      // Используем уже установленную тему
      initialTheme = currentTheme;
    } else {
      // Fallback: проверяем localStorage
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        initialTheme = savedTheme;
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        // Если нет сохраненной темы, используем системную
        initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        document.documentElement.setAttribute("data-theme", initialTheme);
      }
    }

    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Применяем тему к документу только после инициализации
    if (isInitialized) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
