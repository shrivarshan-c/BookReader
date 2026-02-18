"use client";
import Image from "next/image";
import Laptop from "../../../public/laptop.png";
import { useState, useEffect } from "react";
import {
  HeroSvg5,
  HeroSvg6,
  HeroSvg7,
  HeroSvg8,
} from "../../../public/animations/HeroGif1";

import Lanyard from "@/components/Lanyard";
export const Features = () => {
  return (
    <div className="min-h-screen mt-8 md:mt-14 p-4 md:p-8">
      <h2 className="text-2xl md:text-4xl font-bold text-center px-4 md:px-16 mb-6 md:mb-12">
        Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-auto md:grid-rows-3 gap-4 md:gap-8 max-w-7xl mx-auto">
        <div className="sm:col-span-2 md:row-span-2 bg-accent-lightGreen shadow-shadow rounded-2xl p-4 md:p-6 min-h-[300px] md:min-h-[400px] flex flex-col gap-4">
          <span className="font-bold not-first-of-type:text-2xl md:text-4xl">
            Immursive Reader
          </span>
          <ul>
            <li>Clean typography</li>
            <li>No Distraction</li>
            <div className="flex items-center justify-center p-4 md:p-6">
              <Image
                src={Laptop}
                alt="laptop"
                width={800}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </ul>
        </div>
        <div className="bg-accent-lightPurple shadow-shadow rounded-2xl p-4 md:p-6 min-h-[160px] md:min-h-[190px] flex flex-col gap-4">
          <HeroSvg8 />
          <span className="text-lg md:text-xl font-bold">NeoBrutalism</span>
          <p className="text-base md:text-lg">
            Bold. Unapologetic. A fresh take on digital reading.
          </p>
        </div>
        <div className="bg-accent-lightOrange rounded-2xl p-4 md:p-6 min-h-[300px] md:min-h-[400px] flex flex-col sm:col-span-2 md:col-span-1 md:row-span-3 shadow-shadow gap-6 md:gap-8 relative">
          <span className="font-bold text-xl  md:text-2xl font-bold">
            FIND YOUR GENRE
          </span>
          <p>Stories for every mood. From fiction to philosophy.</p>

        <div className="w-full h-full"><Lanyard/></div>
        </div>
        <div className="bg-accent-lightYellow shadow-shadow rounded-2xl p-4 md:p-6 min-h-[160px] md:min-h-[190px] flex flex-col gap-4">
          <span className="text-lg md:text-xl font-bold">
            Personalized Experience
          </span>
          <p>Customize your reading settings. Make it yours.</p>
          <HeroSvg7 />
        </div>
        <div className="sm:col-span-2 bg-accent-lightViolet shadow-shadow rounded-2xl p-4 md:p-6 min-h-[160px] md:min-h-[190px] flex flex-col gap-4">
          <span className="font-bold text-2xl md:text-4xl">
            Read with Music
          </span>
          <p>Pages flow while music plays. Stay focused. Stay present.</p>

          <div className="flex relative items-center">
            {" "}
            <HeroSvg6 /> <HeroSvg5 />
          </div>
        </div>
        <div className="bg-accent-lightRed shadow-shadow rounded-2xl p-4 md:p-6 min-h-[160px] md:min-h-[190px] flex flex-col gap-4">
          <span className="font-bold text-lg md:text-xl">Your Library</span>
          <p>All your books in one place.</p>
        </div>
      </div>
    </div>
  );
};
