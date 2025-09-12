"use client";
// components/Header.tsx

import Link from "next/link";
import { motion } from "framer-motion";
import { logo, navigationLinks, socialLinks } from "@/constants";
import { useEffect, useState } from "react";
import { IconType } from "react-icons"; // Add this import
import { SocialLink } from "@/types";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add this state

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-30 backdrop-blur-md transition-all duration-200 ${
        scrolled ? "bg-background/80 shadow-lg" : "bg-background/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link
              href="/"
              className="relative group"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 relative">
                  {/* Logo background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 group-hover:opacity-30 transition-opacity" />

                  {/* Logo text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">
                      {logo}
                    </span>
                  </div>
                </div>

                {/* Optional: Full text version for larger screens */}
                {
                  /* <div className="hidden ml-3 lg:block">
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                          Emmanuel Lomotey
                        </span>
                      </div> */
                }
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map(({ name, path }) => (
              <motion.div
                key={name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={path}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                >
                  {name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Social Links - Desktop Only */}
          <div className="flex items-center space-x-4">
            {socialLinks.map(({ platform, url, icon: Icon }: SocialLink) => (
              <motion.a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label={platform}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-300 hover:text-white p-2 cursor-pointer"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen
              ? <HiX className="w-6 h-6" />
              : <HiMenu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {isMenuOpen
        ? (
          <motion.div
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
            variants={menuVariants}
            className="md:hidden fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg border-t border-gray-800 z-50"
          >
            <div className="flex flex-col p-4">
              {navigationLinks.map(({ name, path }) => (
                <motion.div key={name} variants={itemVariants}>
                  <Link
                    href={path}
                    className="text-gray-300 hover:text-white transition-colors block py-3 px-4 rounded-lg hover:bg-gray-800/50"
                    onClick={() =>
                      setIsMenuOpen(false)}
                  >
                    {name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
        : <></>}
      {/* Mobile Navigation Menu */}
    </motion.header>
  );
}

// Separate MobileNav component
// function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {

//   return (

//   );
// }
