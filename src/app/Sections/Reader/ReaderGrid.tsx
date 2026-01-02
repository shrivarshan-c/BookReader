"use client";

import { TocPanel } from "./TocPanel"
import { EpubReader } from "./EpubReader";

import { MusicPanel } from "./MusicPanel"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const ReaderGrid = ({
  epubReader
}: {
  epubReader: React.ReactNode
}) => {
    const [showToc, setShowToc] = useState(true)
    const [showMusic, setShowMusic] = useState(true)
    const [showEpubCustomizer, setShowEpubCustomizer] = useState(true)
    
    const gridColumns = 'grid-cols-[auto_minmax(0,1fr)_auto]'
    
    return (
        <motion.div
          layout
          className={`
            grid grid-cols-[auto_minmax(0,1fr)_auto]
    flex-1 h-full
    px-1 py-2 gap-8
          `}>
            <motion.section 
              layout
              className="overflow-y-auto">
              <TocPanel isOpen={showToc} setIsOpen={setShowToc} />
            </motion.section>

            <motion.section layout className="overflow-y-auto">
              {epubReader}
            </motion.section>

            <motion.section 
              layout 
              className="overflow-y-auto">
              <MusicPanel isOpen={showMusic} setIsOpen={setShowMusic} />
            </motion.section>
        </motion.div>
    )
}
