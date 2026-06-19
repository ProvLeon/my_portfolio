// app/page.tsx
import type { Metadata } from "next";

import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import Timeline from "@/components/TimeLine";
import Accomplishments from "@/components/Accomplishments";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Emmanuel Okantah Lomotey | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function Home() {
  return (
    <main className="mx-auto w-full">
      <section id="hero" className="w-full">
        <Hero />
      </section>

      <section id="projects" className="w-full">
        <Projects />
      </section>

      <section id="technologies" className="w-full">
        <Technologies />
      </section>

      <section id="timeline" className="w-full">
        <Timeline />
      </section>

      <section id="accomplishments" className="w-full">
        <Accomplishments />
      </section>

      <section id="contact" className="w-full">
        <Contact />
      </section>
    </main>
  );
}
