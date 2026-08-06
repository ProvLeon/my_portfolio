"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FiArrowUpRight, FiCommand } from "react-icons/fi";

const navItems = [
  { name: "About", path: "#about" },
  { name: "Journey", path: "#journey" },
  { name: "Portfolio", path: "#projects" },
  { name: "Contact", path: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-6 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 px-4 py-2 rounded-full bg-background/70 backdrop-blur-xl border border-border hover:border-foreground/20 hover:bg-background/90 transition-all duration-500 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)]"
        >
          <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-xs font-bold text-foreground border border-border group-hover:scale-105 transition-transform duration-500">
            <FiCommand className="w-3.5 h-3.5 text-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-widest uppercase text-foreground transition-colors">
              Emmanuel Lomotey
            </span>
            <span className="text-[10px] text-muted font-mono tracking-tight flex items-center gap-1">
              Lead Product Designer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Pill */}
        <nav className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-background/70 backdrop-blur-xl border border-border shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)]">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-muted hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground/90 backdrop-blur-xl text-background font-semibold text-xs uppercase tracking-widest hover:bg-primary hover:text-white hover:scale-105 transition-all duration-500 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)]"
          >
            <span>Book A Call</span>
            <FiArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-3 rounded-full bg-background/80 backdrop-blur-md border border-border text-foreground shadow-sm"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 mx-4 p-6 rounded-2xl bg-background/95 backdrop-blur-xl border border-border flex flex-col gap-4 pointer-events-auto shadow-xl"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm tracking-widest uppercase font-medium text-muted hover:text-foreground transition-colors py-3 border-b border-border/50"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 py-4 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-widest"
            >
              <span>Book A Call</span>
              <FiArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


