"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 border border-[#333333] flex items-center justify-center opacity-60 ${className}`}>
        <Sun className="w-4 h-4 text-bronto-yellow" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-9 h-9 border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bronto-yellow ${
        isDark
          ? "border-[#333333] hover:border-bronto-yellow bg-[#1A1A1A] text-bronto-yellow"
          : "border-[#D0D4DC] hover:border-[#B59300] bg-white text-[#111111] shadow-sm"
      } ${className}`}
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-bronto-yellow transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#111111] transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
};

