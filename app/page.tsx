import type { Metadata } from "next";
import dynamic from "next/dynamic";

import Hero from "@/components/Hero/Hero";
import About from "@/components/About";


const Journey = dynamic(() => import("@/components/Journey"));
const Projects = dynamic(() => import("@/components/Projects"));
const Contact = dynamic(() => import("@/components/Contact"));

export const metadata: Metadata = {
  title: "Emmanuel Okantah Lomotey | Lead Product Designer & Engineer",
  description: "Senior Product Designer & Engineer specializing in high-end web experiences, system architecture, and production UI/UX.",
};

export default function Home() {
  return (
    <main className="mx-auto w-full relative z-10">
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Contact />
    </main>
  );
}

