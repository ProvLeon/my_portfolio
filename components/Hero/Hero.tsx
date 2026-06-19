"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full text-white overflow-hidden flex flex-col justify-center">
      
      {/* Top Header */}
      <header className="absolute top-0 left-0 right-0 h-32 flex items-center justify-between px-12 md:px-24 z-20">
        <div className="font-medium tracking-wide text-sm">
          EMMANUEL OKANTAH LOMOTEY
        </div>
        <nav className="hidden md:flex items-center gap-12 text-xs font-medium tracking-[0.2em] uppercase">
          <a href="#projects" className="text-white/60 hover:text-white transition-colors duration-500">Projects</a>
          <a href="#experience" className="text-white/60 hover:text-white transition-colors duration-500">Experience</a>
          <a href="#contact" className="text-white/60 hover:text-white transition-colors duration-500">Contact</a>
        </nav>
      </header>

      {/* Main Typography */}
      <div className={`px-12 md:px-24 z-10 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-[5rem] md:text-[10rem] lg:text-[12rem] font-medium leading-[0.85] tracking-tight mb-8 max-w-7xl">
          Digital <br />
          <span className="text-white/50 italic font-light ml-12 md:ml-32">Architect</span>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between max-w-7xl mt-24 gap-12">
          <p className="text-lg md:text-xl text-white/60 max-w-md font-light leading-relaxed">
            Crafting immersive, high-performance web experiences through strategic design and elite engineering.
          </p>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">
            Based in Accra, Ghana <br />
            Available globally
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-12 left-12 md:left-24 flex items-center gap-4 transition-all duration-1000 delay-500 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-10 h-[1px] bg-white/30 overflow-hidden">
          <div className="w-full h-full bg-white animate-[slide_2s_ease-in-out_infinite]" />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-white/60">Scroll</span>
      </div>

    </section>
  );
}
