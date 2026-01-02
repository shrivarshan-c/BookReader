"use client";

import { Button } from "@/components/ui/NeoBrutalismButton";
import {
  HeroSvg2,
  HeroSvg4,
  HeroSvg3,
} from "../../../public/animations/HeroGif1";
import Image from "next/image";
import Book from "../../../public/book.jpeg";
import Book2 from "../../../public/book2.jpeg";
import HeadPhone from "../../../public/headphones2.jpeg";
import Women from "../../../public/women.jpeg";
export const Hero = () => {
  return (
    <div className="min-h-screen h-screen flex flex-col lg:flex-row justify-center w-[90%] mx-auto border-4 rounded-tl-4xl mt-10 rounded-br-4xl shadow-shadow bg-background">
      <div className="w-full lg:w-[52%] h-full flex justify-center flex-col p-4 md:p-8 gap-4 md:gap-8 relative">
        <div className="relative max-w-3xl min-h-[200px] md:min-h-[300px] w-full overflow-visible">
          {/* Top Floating Images - Hidden on mobile */}
          <div className="hidden md:block absolute -top-22 left-2 rounded-full opacity-70 z-10">
            <Image
              src={Book}
              alt="book"
              width={64}
              height={64}
              className="object-cover -rotate-24"
            />
          </div>
          <div className="hidden md:block absolute -top-20 -right-6 rounded-lg z-10">
            <Image
              src={Women}
              alt="man"
              width={82}
              height={82}
              className="object-cover rotate-24 rounded-lg"
            />
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-18 flex items-center flex-wrap">
            Explore{" "}
            <span className="ml-1 bg-accent-lightRed rounded-2xl px-2 border-b-2 border-br-2">
              Pages{" "}
            </span>{" "}
            <span className="hidden md:inline">
              <HeroSvg3 />
            </span>
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-18 flex items-center flex-wrap">
            {" "}
            While Listening to{" "}
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-18 flex items-center flex-wrap">
            <span className="shadow-lg border-b-2 bg-accent-lightGreen rounded-2xl border-br-2 px-2">
              Music{" "}
            </span>
            <span className="inline-flex items-center ml-2">
              <HeroSvg2 />
            </span>
          </h1>
        </div>
        <p className="text-lg md:text-xl font-inter max-w-3xl">
          Read books while music keeps you focused. Immerse yourself in
          captivating stories and enhance your reading experience with the
          perfect soundtrack.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 relative">
          {/* Bottom Floating Images - Hidden on mobile */}
          <div className="hidden md:block absolute -bottom-26 left-64 rounded-full opacity-90 z-10">
            <Image
              src={HeadPhone}
              alt="man"
              width={82}
              height={82}
              className="object-cover rotate-24 rounded-lg"
            />
          </div>
          <div className="hidden md:block absolute -bottom-12 right-14 rounded-xl opacity-65 z-10">
            <Image
              src={Book2}
              alt="book"
              width={74}
              height={74}
              className="object-cover rotate-24"
            />
          </div>
          <Button variant="neutral" className="w-full sm:w-28">
            ReadNow
          </Button>
          <Button variant="neutral" className="w-full sm:w-28">
            Explore
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-[48%] h-80 md:h-112 lg:h-full border-t-4 lg:border-t-0 lg:border-l-4 flex items-center justify-center py-4 md:py-8 lg:py-0">
        <div className="lg:animate-[bounce_4s_ease-in-out_infinite] lg:transform lg:transition-transform duration-1000">
          <HeroSvg4 />
        </div>
      </div>
    </div>
  );
};
