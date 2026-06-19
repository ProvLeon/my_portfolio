"use client";

import { useEffect, useState } from "react";

// SVG Sketch Line Component
const VerticalLine = ({ className = "", delayClass = "" }: { className?: string; delayClass?: string }) => (
  <svg className={`absolute w-px h-full ${className}`} preserveAspectRatio="none">
    <line x1="0" y1="0" x2="0" y2="100%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className={`sketch-line ${delayClass}`} />
  </svg>
);

const HorizontalLine = ({ className = "", delayClass = "" }: { className?: string; delayClass?: string }) => (
  <svg className={`absolute h-px w-full ${className}`} preserveAspectRatio="none">
    <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className={`sketch-line ${delayClass}`} />
  </svg>
);

const CrossNode = ({ className = "" }: { className?: string }) => (
  <div className={`absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${className}`}>
    <div className="w-[1px] h-full bg-white/30" />
    <div className="w-full h-[1px] bg-white/30 absolute" />
  </div>
);

export default function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }) + ":" + now.getMilliseconds().toString().padStart(3, '0'));
    };
    const interval = setInterval(updateTime, 47);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col">
      
      {/* Grid Lines - Drawing In */}
      <VerticalLine className="left-12 md:left-24" delayClass="sketch-line-delay-1" />
      <VerticalLine className="right-12 md:right-24" delayClass="sketch-line-delay-2" />
      <HorizontalLine className="top-20" delayClass="sketch-line-delay-1" />
      <HorizontalLine className="bottom-20" delayClass="sketch-line-delay-3" />

      {/* Cross Nodes */}
      <CrossNode className="top-20 left-12 md:left-24" />
      <CrossNode className="top-20 right-12 md:right-24" />
      <CrossNode className="bottom-20 left-12 md:left-24" />
      <CrossNode className="bottom-20 right-12 md:right-24" />

      {/* Top OS Header */}
      <header className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-12 md:px-24">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">SYS.ONLINE</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest">
          <a href="#projects" className="text-white/50 hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="text-white/50 hover:text-white transition-colors">Experience</a>
          <a href="#contact" className="text-white/50 hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center px-12 md:px-24 z-10">
        <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-6">
            // Operating System for Digital Experiences
          </p>
          <h1 className="text-[4rem] md:text-[7rem] lg:text-[9rem] leading-[0.9] font-bold tracking-tighter mb-8 uppercase">
            Emmanuel<br />Okantah
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mt-16 pt-8 border-t border-white/10">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-2">Role</p>
              <p className="text-sm text-white/80 leading-relaxed font-mono">
                Lead Frontend Engineer & UI/UX Designer crafting high-performance, scalable interfaces.
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-2">Location</p>
              <p className="text-sm text-white/80 leading-relaxed font-mono">
                Global / Remote<br />
                {time}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Area */}
      <footer className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-between px-12 md:px-24">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
          V. 2.0.26
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
          SCROLL TO EXPLORE ↓
        </div>
      </footer>

    </section>
  );
}
