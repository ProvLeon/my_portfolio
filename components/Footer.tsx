"use client";

import { navigationLinks } from "@/constants";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import ThemeToggle from "@/components/ThemeToggle";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 sm:px-12 md:px-24 border-t border-white/10 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="text-xs font-mono text-[#a3a3a3] flex items-center gap-1.5">
          <span>&copy; {currentYear} Emmanuel Okantah Lomotey.</span>
          <span className="hidden sm:inline">Architected with Next.js 16 &amp; Three.js</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono tracking-wider uppercase">
          {navigationLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.path}
              className="text-[#a3a3a3] hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <ThemeToggle />
          <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
          <a href="https://github.com/ProvLeon" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[#a3a3a3] hover:text-white transition-colors" aria-label="GitHub">
            <AiFillGithub size={18} />
          </a>
          <a href="https://linkedin.com/in/emmanuellomotey" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[#a3a3a3] hover:text-white transition-colors" aria-label="LinkedIn">
            <AiFillLinkedin size={18} />
          </a>
          <a href="https://instagram.com/lomoteyokantah" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[#a3a3a3] hover:text-white transition-colors" aria-label="Instagram">
            <AiFillInstagram size={18} />
          </a>
        </div>

      </div>
    </footer>
  );
}

