import Image from "next/image";
import { Navbar } from "./Sections/Navbar";
import { Hero } from "./Sections/Hero";
import { Features } from "./Sections/Features";
import { MostPopular } from "./Sections/MostPopular";
import { Quote1 } from "./Sections/Quote1";
import { Button } from "@/components/ui/NeoBrutalismButton";
import { AnimePopular } from "./Animepopular";
import { Explorebutton } from "./Explorebutton";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <MostPopular />
      <Quote1/>
      <Explorebutton/>
     

     
    

    </>
  );
}
