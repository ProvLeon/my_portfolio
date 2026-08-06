"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import Image from "next/image";
import AnimatedNumber from "../AnimatedNumber";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current || !clipRectRef.current) return;

    gsap.fromTo(clipRectRef.current,
      { attr: { height: 0 } },
      {
        attr: { height: 1000 },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 70%", 
          scrub: 1,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex flex-col justify-center pt-32 pb-20 px-6 sm:px-12 md:px-24">
      
      {/* Narrative Thread Segment 1 */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 1000" preserveAspectRatio="none">
          <clipPath id="hero-clip">
            <rect x="0" y="0" width="1440" height="0" ref={clipRectRef} />
          </clipPath>
          <path
            d="M 200 300 C 400 300, 960 400, 960 600 C 960 800, 720 800, 720 1000"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            clipPath="url(#hero-clip)"
            style={{ filter: "drop-shadow(0px 0px 8px rgba(255,69,0,0.5))" }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Typography & Stats */}
        <div className="flex flex-col">
          
          {/* Top Stats - Editorial Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-12 mb-12"
          >
            <div>
              <span className="block text-4xl font-light text-foreground mb-1">
                +<AnimatedNumber value={11} duration={2} delay={0.5} />
              </span>
              <span className="text-xs uppercase tracking-widest text-muted">Platforms Shipped</span>
            </div>
            <div>
              <span className="block text-4xl font-light text-foreground mb-1">
                +<AnimatedNumber value={130} duration={2.5} delay={0.6} />
              </span>
              <span className="text-xs uppercase tracking-widest text-muted">Engineers Mentored</span>
            </div>
          </motion.div>

          {/* Huge Editorial "Hello" / Greeting */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl sm:text-8xl md:text-9xl font-normal leading-[0.9] tracking-tighter mb-8"
          >
            Hello<span className="text-primary">.</span>
          </motion.h1>

          {/* Subtitle / Role */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 text-base md:text-lg text-foreground font-medium"
          >
            <span className="w-8 h-[1px] bg-primary"></span>
            <p>
              It's Emmanuel (LEO)<span className="text-primary">.</span> a <br/> Lead Product Designer &amp; Engineer
            </p>
          </motion.div>

        </div>

        {/* Right Column: Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={mounted ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-auto lg:h-[700px] rounded-3xl overflow-hidden bg-foreground/5"
        >
          {/* We assume profile-pic2.png is the user's portrait. If it's a cutout, the grey bg looks good. */}
          <Image 
            src="/profile-pic1.jpg" 
            alt="Emmanuel Okantah Lomotey" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill 
            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
            priority
            fetchPriority="high"
          />
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-6 sm:left-12 flex items-center gap-3 text-xs uppercase tracking-widest text-muted"
      >
        <span>Scroll down</span>
        <FiArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>

      {/* Vertical Year Tag */}
      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-xs tracking-widest text-muted/40 font-mono hidden md:block">
        2024 &mdash; PRESENT
      </div>

    </section>
  );
}


