// app/page.tsx
import type { Metadata } from "next";
// import dynamic from "next/dynamic";
// import PageTransition from "@/components/PageTransition";
// import FloatingNav from "@/components/FloatingNav";
// import GradientCursor from "@/components/GradientCursor";

// Dynamic imports
// const FloatingElements = dynamic(
//   () => import("@/components/Hero/FloatingElements").then((mod) => mod.default),
//   { ssr: true }, // Change to false since it uses client-side features
// );
// const Hero = dynamic(() => import("@/components/Hero/Hero"), { ssr: true });
// const Projects = dynamic(() => import("@/components/Projects"), { ssr: true });
// const Technologies = dynamic(() => import("@/components/Technologies"), {
//   ssr: true,
// });
// const Timeline = dynamic(() => import("@/components/TimeLine"), { ssr: true });
// const Accomplishments = dynamic(() => import("@/components/Accomplishments"), {
//   ssr: true,
// });
// const Header = dynamic(() => import("@/components/Header"), { ssr: true });
// const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Emmanuel Okantah Lomotey | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function Home() {
  return (
    // <PageTransition>
    //   <main className="min-h-screen">
    //     <GradientCursor />
    //     <Header />
    //     <FloatingNav />

    //     {/* Main content with smooth scroll sections */}
    //     <div className="container px-4 mx-auto py-8 ">
    //       {/* Increased spacing between sections */}
    //       <section id="hero" className="section-padding">
    //         <Hero />
    //       </section>
    //       {/* <FloatingElements /> */}

    //       <section id="projects" className="section-padding">
    //         <Projects />
    //       </section>

    //       <section
    //         id="technologies"
    //         className="section-padding bg-background-light/5"
    //       >
    //         <Technologies />
    //       </section>

    //       <section id="timeline" className="section-padding">
    //         <Timeline />
    //       </section>

    //       <section
    //         id="accomplishments"
    //         className="section-padding bg-background-light/5"
    //       >
    //         <Accomplishments />
    //       </section>
    //     </div>

    //     <Footer />
    //   </main>
    // </PageTransition>
    <Layout />
  );
}
