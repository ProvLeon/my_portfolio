"use client";

import { navigationLinks } from "@/constants";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-12 md:px-24 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="text-xs uppercase tracking-widest text-white/40">
          &copy; {currentYear} Emmanuel Okantah Lomotey. All Rights Reserved.
        </div>

        <nav className="flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase">
          {navigationLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.path}
              className="text-white/40 hover:text-white transition-colors duration-500 cursor-none"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a href="#" className="text-white/40 hover:text-white transition-colors duration-500 cursor-none" aria-label="GitHub">
            <AiFillGithub size={20} />
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors duration-500 cursor-none" aria-label="LinkedIn">
            <AiFillLinkedin size={20} />
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors duration-500 cursor-none" aria-label="Instagram">
            <AiFillInstagram size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
}
