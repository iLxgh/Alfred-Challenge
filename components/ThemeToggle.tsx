"use client";

import { Sun, Moon } from "lucide-react";
import useThemeStore from "../store/useThemeStore";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="dark:bg-white/5 bg-black/5 backdrop-blur-xl border-2 dark:border-white/20 border-black/20 p-4 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] rounded-[3.5rem] fixed bottom-4 right-4 cursor-pointer transition-colors duration-700 dark:hover:bg-white/20 hover:bg-black/20 dark:text-black text-white z-50"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="w-6 h-6 text-yellow-500" />
      ) : (
        <Moon className="w-6 h-6 text-blue-600" />
      )}
    </button>
  );
}
