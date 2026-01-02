"use client";

import { createContext, useContext, useState } from "react";
import { themeList } from "@/data/ThemeList";

export type ThemeKey = keyof typeof themeList;

type ThemeContextType = {
  themeKey: ThemeKey;
  theme: (typeof themeList)[ThemeKey];
  setTheme: (key: ThemeKey) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProviders = ({ children }: { children: React.ReactNode }) => {
  const [themeKey, setThemeKey] = useState<ThemeKey>(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("reader-theme") as ThemeKey | null;
    return stored && themeList[stored] ? stored : "light";
  });

  const setTheme = (key: ThemeKey) => {
    setThemeKey(key);
    localStorage.setItem("reader-theme", key);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeKey,
        theme: themeList[themeKey],
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
