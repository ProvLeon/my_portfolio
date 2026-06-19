"use client";

import { navigationLinks } from "@/constants";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black text-white px-12 md:px-24 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-8">
        
        {/* Brand & Socials */}
        <div className="space-y-8">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
            Emmanuel Okantah Lomotey
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 max-w-sm">
            Innovating one project at a time to transform the world through cutting-edge technology and creative solutions.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/ProvLeon" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <AiFillGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/emmanuellomotey" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <AiFillLinkedin className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/lomoteyokantah" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <AiFillInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 font-mono text-[10px] uppercase tracking-widest">
          {navigationLinks.map((link) => (
            <div key={link.path}>
              <a href={link.path} className="text-white/40 hover:text-white transition-colors">
                [ {link.name} ]
              </a>
            </div>
          ))}
        </div>

      </div>

      <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-white/40">
        <p>
          © {currentYear} Emmanuel Okantah Lomotey. All rights reserved.
        </p>
        <a href="#top" className="hover:text-white transition-colors">
          [ Back to Top ↑ ]
        </a>
      </div>
    </footer>
  );
}
