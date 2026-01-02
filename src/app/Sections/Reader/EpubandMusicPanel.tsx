"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  IconChevronDown,
  IconChevronUp,
  IconChevronRight,
  IconMinus,
  IconPlus,
  IconSettings2,
  IconCaretLeft,
  IconCaretRight,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useEpub } from "@/providers/EpubContext";
import { fontList } from "@/data/FontList";
import { themeList } from "@/data/ThemeList";

import { ThemeKey,useTheme } from "@/providers/ThemeContext";
import { useFontSize } from "@/providers/fontSizeContext";
import { useLineHeight } from "@/providers/LineHeightContext";
import { useFontName } from "@/providers/FontNameContext";
import { useTheme as useNextTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";


/* ---------------- animation variants ---------------- */

const settingsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const settingsItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const dropdown = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
};

/* ---------------- component ---------------- */

export const EpubAndMusicPanel = () => {
  const { RenditionRef, currentPage, totalPages } = useEpub();

  const [isOpen, setIsOpen] = useState(true);
  const [isSetting, setIsSetting] = useState(false);

  const [isFontOpen, setIsFontOpen] = useState(false);
  const [isLineHeight, setIsLineHeight] = useState(false);
  const [isFontFamily, setIsFontFamily] = useState(false);
  const [isThemes, setIsThemes] = useState(false);

  const {fontSize, setFontSize} = useFontSize();
  const {lineHeight, setLineHeight: setLineHeightValue} = useLineHeight();
  const {fontName: fontFamily, setFontName: setFontFamilyValue} = useFontName();
  const {themeKey,setTheme}= useTheme();
  const { theme: appTheme, setTheme: setAppTheme } = useNextTheme();

  /* -------- keyboard navigation -------- */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") RenditionRef.current?.next();
      if (e.key === "ArrowLeft") RenditionRef.current?.prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [RenditionRef]);

  return (
    <motion.div
      layout
      className="relative w-full max-w-7xl mx-auto border-t bg-white dark:bg-surface dark:border-border dark:text-foreground"
      animate={{ height: isOpen ? 64 : 28 }}
      transition={{ duration: 0.3 }}
    >
      {/* MAIN BAR */}
      <div className="relative flex items-center h-full px-4">
        {/* LEFT — SETTINGS */}
        <div className="flex items-center gap-2">
          <IconSettings2 />
          <Button size="icon" onClick={() => setIsSetting(!isSetting)}>
            <IconChevronRight />
          </Button>

          <AnimatePresence>
            {isSetting && (
              <motion.div
                layout
                variants={settingsContainer}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex items-center gap-3"
              >
                {/* Font Size */}
                <motion.div variants={settingsItem} className="relative flex items-center gap-1">
                  <h3 className="text-sm">Font Size</h3>
                  <Button size="icon" onClick={() => setIsFontOpen(!isFontOpen)}>
                    {isFontOpen ? <IconChevronDown /> : <IconChevronUp />}
                  </Button>

                  <AnimatePresence>
                    {isFontOpen && (
                      <motion.div
                        variants={dropdown}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute bottom-full left-0 mb-2 bg-white dark:bg-surface-2 border dark:border-border rounded-lg shadow p-2 z-30"
                      >
                        <div className="flex items-center gap-2">
                          <Button onClick={() => setFontSize(v => Math.max(12, v - 2))}>
                            <IconMinus />
                          </Button>
                          <span className="w-8 text-center">{fontSize}</span>
                          <Button onClick={() => setFontSize(v => Math.min(32, v + 2))}>
                            <IconPlus />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Line Height */}
                <motion.div variants={settingsItem} className="relative flex items-center gap-1">
                  <h3 className="text-sm">Line Height</h3>
                  <Button size="icon" onClick={() => setIsLineHeight(!isLineHeight)}>
                    {isLineHeight ? <IconChevronDown /> : <IconChevronUp />}
                  </Button>

                  <AnimatePresence>
                    {isLineHeight && (
                      <motion.div
                        variants={dropdown}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute bottom-full left-0 mb-2 bg-white dark:bg-surface-2 border dark:border-border rounded-lg shadow p-2 z-30"
                      >
                        <div className="flex items-center gap-2">
                          <Button onClick={() => setLineHeightValue(v => Math.max(1.2, v - 0.2))}>
                            <IconMinus />
                          </Button>
                          <span>{lineHeight.toFixed(1)}</span>
                          <Button onClick={() => setLineHeightValue(v => Math.min(2.4, v + 0.2))}>
                            <IconPlus />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Font Family */}
                <motion.div variants={settingsItem} className="relative flex items-center gap-1">
                  <h3 className="text-sm">Font</h3>
                  <Button size="icon" onClick={() => setIsFontFamily(!isFontFamily)}>
                    {isFontFamily ? <IconChevronDown /> : <IconChevronUp />}
                  </Button>

                  <AnimatePresence>
                    {isFontFamily && (
                      <motion.div
                        variants={dropdown}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute bottom-full left-0 mb-2 bg-white dark:bg-surface-2 border dark:border-border rounded-lg shadow p-2 max-h-60 overflow-y-auto z-30"
                      >
                        {fontList.map(f => (
                          <button
                            key={f.name}
                            onClick={() => setFontFamilyValue(f.name)}
                            className={`block w-full px-3 py-2 text-left rounded ${
                              fontFamily === f.name
                                ? "bg-gray-200 text-black"
                                : "hover:bg-gray-100 hover:text-black"
                            }`}
                            style={{ fontFamily: f.name }}
                          >
                            {f.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Themes */}
                <motion.div variants={settingsItem} className="relative flex items-center gap-1">
                  <h3 className="text-sm">Themes</h3>
                  <Button size="icon" onClick={() => setIsThemes(!isThemes)}>
                    {isThemes ? <IconChevronDown /> : <IconChevronUp />}
                  </Button>

                  <AnimatePresence>
                    {isThemes && (
                   <motion.div
                   variants={dropdown}
                   initial="hidden"
                   animate="visible"
                   exit="exit"
                   className="absolute bottom-full left-0 mb-2 bg-white  dark:bg-surface-2 border dark:border-border rounded-lg shadow p-2 z-30"
                 >
                   {Object.entries(themeList).map(([key, t]) => (
                     <button
                       key={key}
                       onClick={() => setTheme(key as ThemeKey)}
                       className={`flex items-center gap-2 px-3 py-2 rounded w-full ${
                         themeKey === key
                           ? "bg-gray-200 text-black"
                           : "hover:bg-gray-600"
                       }`}
                     >
                       <span
                         className="w-4 h-4 rounded-full border"
                         style={{ background: t.background }}
                       />
                       {t.name}
                     </button>
                   ))}
                 </motion.div>
                 
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
  {/* CENTER — ALWAYS CENTERED */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
          <button onClick={() => RenditionRef.current?.prev()}>
            <IconCaretLeft size={22} />
          </button>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm">{currentPage} / {totalPages}</p>
            <div className="w-32 h-1.5 bg-gray-200 dark:bg-surface-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black dark:bg-accent-cyan transition-all duration-300"
                style={{ width: `${totalPages > 0 ? (currentPage / totalPages) * 100 : 0}%` }}
              />
            </div>
          </div>
          <button onClick={() => RenditionRef.current?.next()}>
            <IconCaretRight size={22} />
          </button>
        </div>
      </div>

      {/* COLLAPSE BUTTON */}
      <button
        className="absolute right-2 top-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IconChevronDown /> : <IconChevronUp />}
      </button>

      {/* DARK MODE TOGGLE */}
      <div className="absolute right-12 top-2">
        <AnimatedThemeToggler duration={600} />
      </div>
      
    </motion.div>
  );
};
