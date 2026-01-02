"use client";

import { createContext, useContext, useState } from "react";

type FontNameContextType = {
  fontName: string;
  setFontName: (font: string) => void;
};

const FontNameContext = createContext<FontNameContextType | null>(null);

export const FontNameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontName, setFontName] = useState<string>("Georgia"); // default font

  return (
    <FontNameContext.Provider value={{ fontName, setFontName }}>
      {children}
    </FontNameContext.Provider>
  );
};

export const useFontName = () => {
  const context = useContext(FontNameContext);
  if (!context) {
    throw new Error("useFontName must be used inside FontNameProvider");
  }
  return context;
};
