"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEpub } from "@/providers/EpubContext";

export const TocPanel = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) => {
  const { toc, RenditionRef } = useEpub();

  const handleTocClick = (href: string) => {
    if (RenditionRef.current) {
      RenditionRef.current.display(href);
    }
  };

  return (
    <motion.div 
      className="relative h-full bg-white dark:bg-surface flex justify-center items-center"
      animate={{
        width: isOpen ? 240 : 40
      }}
      transition={{
        
        duration: 0.3,
        
        ease: "easeInOut"
      }}
    >
      <div className="absolute top-1 right-1 w-8 h-8 flex items-center justify-center rounded-sm bg-red-300 z-10">
        <Button 
          className="" 
          variant="default" 
          onClick={() => setIsOpen?.(!isOpen)}
        >
          {isOpen ? <IconChevronLeft size={20}/> : <IconChevronRight size={20}/>}
        </Button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full p-4 pt-12 overflow-y-auto"
        >
          <h2 className="text-lg font-semibold mb-4 dark:text-foreground">Table of Contents</h2>
          <div className="space-y-2">
            {toc.map((item, index) => (
              <button
                key={index}
                onClick={() => handleTocClick(item.href)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-surface-2 rounded transition-colors dark:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
