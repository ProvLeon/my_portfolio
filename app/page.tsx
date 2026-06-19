// app/page.tsx
import type { Metadata } from "next";

import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import Timeline from "@/components/TimeLine";
import CareerMilestones from "@/components/CareerMilestones";
import Accomplishments from "@/components/Accomplishments";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Emmanuel Okantah Lomotey | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function Home() {
  return (
    <main className="container px-4 mx-auto py-8">
      <section id="hero" className="min-h-screen flex items-center">
        <Hero />
      </section>

      <section id="projects" className="py-20">
        <Projects />
      </section>

      <section id="technologies" className="py-20 bg-background-light/5">
        <Technologies />
      </section>

      {/* Combined Journey Section */}
      <div className="relative overflow-hidden">
        {/* Shared Background Effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
        </div>

        <section id="timeline" className="py-20">
          <Timeline />
        </section>

        <section id="milestones" className="py-20">
          <CareerMilestones />
        </section>
      </div>

      <section id="accomplishments" className="py-20 bg-background-light/5">
        <Accomplishments />
      </section>

      <section id="contact" className="py-10 md:py-20">
        <Contact />
      </section>
    </main>
  );
}
