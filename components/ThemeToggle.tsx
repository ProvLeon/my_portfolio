"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden="true" />; // Placeholder for layout shift
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-background/50 hover:bg-foreground/5 hover:border-border transition-all duration-300 z-50"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center text-muted group-hover:text-foreground transition-colors">
        <FiSun className={`absolute w-full h-full transition-all duration-500 ease-in-out ${theme === 'dark' ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'}`} />
        <FiMoon className={`absolute w-full h-full transition-all duration-500 ease-in-out ${theme === 'light' ? 'scale-0 opacity-0 -rotate-90' : 'scale-100 opacity-100 rotate-0'}`} />
      </div>
    </button>
  );
}
