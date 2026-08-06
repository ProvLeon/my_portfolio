"use client";

import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const experiences = [
  {
    role: "Senior Full-Stack Architect",
    company: "Okantah.com",
    location: "Accra, Ghana",
    date: "February 2023 - Present",
    description: "Innovated designs and engineered robust digital solutions for global clients.",
    tags: ["UI/UX", "Architecture", "Next.js"],
  },
  {
    role: "Lead Product Developer",
    company: "Freelance",
    location: "Remote Worldwide",
    date: "January 2021 - January 2023",
    description: "Led development of scalable web applications and high-end e-commerce platforms.",
    tags: ["React", "TypeScript", "E-Commerce"],
  },
  {
    role: "Frontend Engineer",
    company: "Tech Startups",
    location: "Remote",
    date: "March 2020 - December 2020",
    description: "Crafted tomorrow's experiences through performant, accessible UI components.",
    tags: ["Frontend", "Design Systems"],
  }
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !maskPathRef.current || !ballRef.current) return;

    const maskPath = maskPathRef.current;
    const length = maskPath.getTotalLength();
    
    gsap.set(maskPath, { strokeDasharray: length, strokeDashoffset: length });

    const proxy = { progress: 0 };
    
    const updatePath = () => {
      if (!maskPathRef.current || !ballRef.current) return;
      
      const p = proxy.progress;
      const currentLen = p * length;
      
      gsap.set(maskPath, { strokeDashoffset: length - currentLen });
      
      let ballOpacity = 1;
      if (p <= 0.02) ballOpacity = p / 0.02;
      else if (p >= 0.98) ballOpacity = (1 - p) / 0.02;

      const point = maskPath.getPointAtLength(currentLen);
      gsap.set(ballRef.current, { 
        left: `${(point.x / 1440) * 100}%`, 
        top: `${(point.y / 1000) * 100}%`,
        opacity: ballOpacity
      });
    };

    updatePath();

    gsap.to(proxy, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1,
      },
      onUpdate: updatePath
    });

    // Header reveal
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Intro text reveal
    gsap.fromTo(
      introRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    // Timeline staggered reveal
    gsap.fromTo(
      timelineRef.current?.children ? Array.from(timelineRef.current.children) : [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="journey" className="py-24 bg-background w-full px-6 sm:px-12 md:px-24 border-t border-border/50 relative">
      
      {/* Narrative Thread Segment 3 */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden lg:block z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 1000" preserveAspectRatio="none" style={{ overflow: "visible" }}>
          <defs>
            <mask id="journey-mask">
              <path
                ref={maskPathRef}
                d="M -160 0 C -160 500, 140 500, 140 1000"
                stroke="white"
                strokeWidth="40"
                fill="none"
              />
            </mask>
          </defs>
          <path
            d="M -160 0 C -160 500, 140 500, 140 1000"
            stroke="#FF4500"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            mask="url(#journey-mask)"
            style={{ filter: "drop-shadow(0px 0px 8px rgba(255,69,0,0.5))" }}
          />
        </svg>

        {/* Glowing Ball at the Tip */}
        <div 
          ref={ballRef}
          className="absolute w-2.5 h-2.5 bg-primary rounded-full z-10"
          style={{ 
            transform: "translate(-50%, -50%)", 
            boxShadow: "0 0 12px 3px rgba(255,69,0,0.6)" 
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Left Column: Title */}
        <div ref={headerRef} className="lg:col-span-4 flex flex-col gap-6 opacity-0">
          <div className="flex items-center gap-3 text-foreground font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF4500] shadow-[0_0_8px_rgba(255,69,0,0.5)]"></span>
            Experiences
          </div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Explore My Design &amp; Engineering Journey
          </h2>
        </div>

        {/* Right Column: Timeline & Call to Action */}
        <div className="lg:col-span-8 flex flex-col">
          
          {/* Top Intro text & CTA */}
          <div ref={introRef} className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16 pb-8 border-b border-border/50 opacity-0">
            <p className="text-muted text-sm sm:text-base leading-relaxed max-w-md font-light">
              Over the past 4+ years, I've had the opportunity to work on a wide range of highly technical projects, collaborating with diverse teams to bring creative visions to life through scalable code.
            </p>
            <a href="#contact" className="group flex items-center gap-2 text-sm font-medium text-foreground hover:text-[#FF4500] transition-colors whitespace-nowrap">
              Book A Call <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Timeline Items */}
          <div ref={timelineRef} className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-12 border-b border-border/30 last:border-0 last:pb-0 opacity-0">
                
                {/* Role & Date */}
                <div className="md:col-span-5 flex flex-col">
                  <h3 className="text-xl font-medium text-foreground mb-1">
                    {exp.role}, {exp.company}
                  </h3>
                  <span className="text-xs text-muted tracking-widest uppercase">
                    <span className="text-[#FF4500] font-bold">&bull;</span> {exp.date}
                  </span>
                </div>

                {/* Description */}
                <div className="md:col-span-4 text-sm text-muted font-light leading-relaxed">
                  {exp.description}
                </div>

                {/* Tags */}
                <div className="md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                  {exp.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-muted/10 text-foreground text-[10px] tracking-widest uppercase font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
