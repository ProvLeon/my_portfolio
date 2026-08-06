"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CountUp from "react-countup";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

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

    // --- Columns Stagger Reveal ---
    const columns = [col1Ref.current, col2Ref.current, col3Ref.current].filter(Boolean);
    
    gsap.fromTo(
      columns,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32 bg-background w-full px-6 sm:px-12 md:px-24 relative overflow-hidden">
      
      {/* Narrative Thread Segment 2 */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 1000" preserveAspectRatio="none">
          <clipPath id="about-clip">
            <rect x="0" y="0" width="1440" height="0" ref={clipRectRef} />
          </clipPath>
          <path
            d="M 720 0 C 720 333, 960 333, 960 500 C 960 666, 720 666, 720 1000"
            stroke="#FF4500"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            clipPath="url(#about-clip)"
            style={{ filter: "drop-shadow(0px 0px 8px rgba(255,69,0,0.5))" }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Title & Intro */}
          <div ref={col1Ref} className="lg:col-span-5 flex flex-col gap-6 relative opacity-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
              About Me
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed font-light">
              I specialize in turning complex architectural problems into elegant, scalable solutions. My approach blends deep engineering expertise with strategic product thinking to deliver digital experiences that not only look incredible but perform flawlessly under pressure.
            </p>
            <p className="text-muted text-base sm:text-lg leading-relaxed font-light mt-2">
              Ready to architect your next platform?
            </p>
          </div>

          {/* Middle Column: Stat Card */}
          <div ref={col2Ref} className="lg:col-span-3 flex justify-center lg:justify-start opacity-0">
            <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-sm border border-border flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-6 text-foreground">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
              </div>
              <h3 className="text-5xl font-medium text-[#FF4500] mb-3">
                <CountUp start={0} end={99.9} duration={2} decimals={1} enableScrollSpy scrollSpyOnce />%
              </h3>
              <p className="text-sm text-muted mb-8 leading-relaxed">
                Average system uptime across all production platforms I've architected in the past 4 years.
              </p>
              
              <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden mt-auto">
                <Image 
                  src="/profile-pic2.png" 
                  alt="Portrait" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Value Props */}
          <div ref={col3Ref} className="lg:col-span-4 flex flex-col justify-center gap-12 lg:pl-8 opacity-0">
            
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-[#FF4500]/10 text-[#FF4500] flex-shrink-0 flex items-center justify-center mt-1">
                <FiPlus className="w-4 h-4" />
              </div>
              <p className="text-muted text-sm sm:text-base leading-relaxed font-light">
                With 4+ years of production experience, I specialize in creating robust, highly-scalable architectures that solve real-world business problems and deliver seamless user experiences.
              </p>
            </div>

            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-[#FF4500]/10 text-[#FF4500] flex-shrink-0 flex items-center justify-center mt-1">
                <FiPlus className="w-4 h-4" />
              </div>
              <p className="text-muted text-sm sm:text-base leading-relaxed font-light">
                I thrive on working closely with stakeholders, blending engineering rigor with product strategy to bring their vision to life through thoughtful, performant technical solutions.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
