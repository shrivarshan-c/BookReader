"use client";

import { createContext, useContext, useRef, useState } from "react";
import { Rendition, NavItem } from "epubjs";

type EpubContextType = {
  RenditionRef: React.RefObject<Rendition | null>;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  toc: NavItem[];
  setToc: (toc: NavItem[]) => void;
};

const EpubContext = createContext<EpubContextType | null>(null);

export const EpubProvider = ({ children }: { children: React.ReactNode }) => {
  const RenditionRef = useRef<Rendition | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [toc, setToc] = useState<NavItem[]>([]);

  return (
    <EpubContext.Provider value={{ RenditionRef, currentPage, totalPages, setCurrentPage, setTotalPages, toc, setToc }}>
      {children}
    </EpubContext.Provider>
  );
};

export const useEpub = () => {
  const context = useContext(EpubContext);
  if (!context) {
    throw new Error("useEpub must be used inside EpubProvider");
  }
  return context;
};
