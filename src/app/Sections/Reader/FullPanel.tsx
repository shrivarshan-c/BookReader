import { EpubAndMusicPanel } from "./EpubandMusicPanel"
import { ReaderGrid } from "./ReaderGrid"


import { TocPanel } from "./TocPanel"
import { MusicPanel } from "./MusicPanel"
import { EpubReader } from "./EpubReader"

import {motion} from "motion/react";

export const FullPanel = ({ bookEpub }: { bookEpub: string }) => {
    return (
      <div className="w-full min-h-screen h-screen flex flex-col">
        
       
        <div className="flex-1 overflow-hidden pt-2">
          <ReaderGrid epubReader={<EpubReader bookEpub={bookEpub} />} />
        </div>
  
      
        <EpubAndMusicPanel />
  
      </div>
    );
  };
  