'use client';
import { books } from "@/data/MostPopularBook"
import { IconBook } from "@tabler/icons-react"
import Image from "next/image"
import {cn} from '../../provider/tailwindCss';
import { useEffect, useRef, useState } from 'react';

export const MostPopular = ()=>{
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        let scrollInterval: NodeJS.Timeout;

        const startScroll = () => {
            scrollInterval = setInterval(() => {
                if (scrollContainer && !isPaused) {
                    scrollContainer.scrollLeft += 1;
                    
                
                    if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth)) {
                        scrollContainer.scrollLeft = 0;
                    }
                }
            }, 30);
        };

        startScroll();

        return () => {
            if (scrollInterval) {
                clearInterval(scrollInterval);
            }
        };
    }, [isPaused]);

    return(
        <div className="min-h-screen flex justify-center mt-8 md:mt-14 p-4 md:p-8 ">
            <div className="w-[90%] h-180 bg-secondary-background border-2 brutal-hover p-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-lightGreen">
                        <IconBook width={30} height={30} color="black"/>
                    </div>  
                    <h2 className="text-3xl border-b-[3px] border-b-accent-lightGreen pb-1 w-fit">Most Popular Books</h2>
                </div>

                <div 
                    ref={scrollRef}
                    className="mt-6 p-2 flex-1 flex overflow-auto overflow-x-scroll no-scrollbar no-scrollbar gap-6"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {[...books, ...books].map((book,index)=>{
                        return(
                            <CardComponents 
                                key={index}
                                id={book.id}
                                cover={book.cover}
                                title={book.title}
                                author={book.author}
                                description={book.description}
                                genre={book.genre}
                                borderColor={book.borderColor}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export const CardComponents = (
    {id,
      cover,
      title,
      author,
        description,
        genre,
        className,
        borderColor

        
    }:{id:string,
        cover:string,
        title:string,
        author:string,
        description:string,
        genre:string
        className?:string,
        borderColor:string
    }
)=>{

    return(
        <a className={cn(`group relative min-w-[200px] sm:min-w-[280px] md:min-w-[320px] aspect-[2/3] brutal-hover snap-start overflow-hidden    p-2 transform-gpu transition-all duration-300 hover:scale-103 rotate-0 ${borderColor}`,className)} href={`/library/${id}`}>
            <div className="relative w-full h-full overflow-hidden rounded-sm border-2 border-border z-0">
                <Image
                    alt="Book Cover" 
                    loading="lazy" 
                    
                    className="object-cover transition-all duration-300 scale-100 hover:bg-black" 
                    style={{position:'absolute', height:'100%', width:'100%', left:0, top:0, right:0, bottom:0, color:'transparent'}} 
                    src={cover}
                    width={100}
                    height={100}
                />
               
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="absolute inset-0 flex flex-col justify-end transition-all duration-300 opacity-0 group-hover:opacity-100 z-20">
                    <div className="p-3 sm:p-4 w-full">
                        <div className="transform transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white drop-shadow-lg mb-2">
                              {title}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/80 mb-2">by {author}</p>
                            <p className="text-xs text-white/70 mb-3 line-clamp-2">{description}</p>
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-sm border border-white/30">
                                    <span className="text-xs font-semibold text-white">READ NOW</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
            <div className={`absolute top-0 -left-3 w-fit h-8 px-3 bg-accent-lightRed border-2 border-border shadow-shadow flex items-center justify-center transform transition-all duration-300 scale-90 rounded-4xl`}>
                <span className="text-xs font-bold text-black max-w-sm">{genre}</span>
            </div>
        </a>
    )
}
