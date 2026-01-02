"use client";
import { useEffect, useRef, useState } from 'react';
import  ePub from 'epubjs';

import { useEpub } from '@/providers/EpubContext';
import { useFontSize } from '@/providers/fontSizeContext';
import { useFontName } from '@/providers/FontNameContext';
import { useLineHeight } from '@/providers/LineHeightContext';
import { useTheme } from '@/providers/ThemeContext';


export const EpubReader = ({ bookEpub }: { bookEpub: string })=>{
    const viewerRef = useRef<HTMLDivElement>(null);

    const {RenditionRef, setCurrentPage, setTotalPages, setToc}= useEpub();

    const {fontSize} = useFontSize();

    const {fontName,setFontName} = useFontName();
    const {lineHeight} = useLineHeight();

    const {themeKey,theme} = useTheme();

    useEffect(() => {
        if (typeof window !== 'undefined' && viewerRef.current) {
         // Reset page numbers when switching books
         setCurrentPage(1);
         setTotalPages(0);
         setToc([]);
         
         const book = ePub(bookEpub);
       const rendition = book.renderTo(viewerRef.current, {
                width: "100%",
                height: "100%",
                flow: "paginated",
                allowScriptedContent: true
            });
            
            rendition.display();

            RenditionRef.current = rendition;
       
            book.loaded.navigation.then((nav: any) => {
                setToc(nav.toc);
            });

            book.ready.then(()=>{
              book.locations.generate(1000).then((locations: any) => {
                setTotalPages(locations.total || 0);
              });
            });

            rendition.on('relocated', (location: any) => {
                if (book.locations && book.locations.length() > 0) {
                    const currentLocation = book.locations.locationFromCfi(location.start.cfi);
                    setCurrentPage(currentLocation || 1);
                }
            });

            return () => {
                rendition.destroy();
            };
        }
    }, [bookEpub, setCurrentPage, setTotalPages, setToc, RenditionRef]);

    useEffect(() => {
        if (RenditionRef.current) {
            RenditionRef.current.themes.fontSize(`${fontSize}px`);
        }
    }, [fontSize, RenditionRef]);

    useEffect(() => {
        if (RenditionRef.current) {
            RenditionRef.current.themes.font(fontName);
        }
    }, [fontName, RenditionRef]);

    useEffect(() => {
        if (RenditionRef.current) {
            RenditionRef.current.themes.override('line-height', lineHeight.toString());
        }
    }, [lineHeight, RenditionRef]);

    useEffect(() => {
        if (RenditionRef.current) {
            RenditionRef.current.themes.override('color', theme.text);
            RenditionRef.current.themes.override('background', theme.background);
            RenditionRef.current.themes.override('::selection', `background: ${theme.selection}`);
        }
    }, [theme]);

 

    return(
      <div ref={viewerRef} style={{width: '100%', height: '100%', overflow: 'hidden'}} />
    )
    
}
