"use client";

import { useTheme } from "@/contexts/ThemeContext";
import styles from "./ThemeToggle.module.scss";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Переключить на ${
        theme === "light" ? "темную" : "светлую"
      } тему`}
    >
      {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};
