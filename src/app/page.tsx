import Image from "next/image";
import { Navbar } from "./Sections/Navbar";
import { Hero } from "./Sections/Hero";
import { Features } from "./Sections/Features";
import { MostPopular } from "./Sections/MostPopular";
import { Quote1 } from "./Sections/Quote1";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <MostPopular />
      <Quote1/>
    </>
  );
}
