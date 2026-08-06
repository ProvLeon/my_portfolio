"use client";

import { useState, useRef } from "react";
import { FiMail, FiPhone, FiMapPin, FiCopy, FiCheck, FiSend, FiMessageSquare } from "react-icons/fi";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { contactInfo } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<SVGPathElement>(null);
  const arrowheadRef = useRef<SVGCircleElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);

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
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            if (arrowheadRef.current) {
               gsap.set(arrowheadRef.current, { opacity: self.progress > 0.98 ? 1 : 0 });
            }
          }
        },
      }
    );

    // Header reveal
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Left Column (Details) reveal
    gsap.fromTo(
      detailsRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    // Right Column (Form) reveal
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

  }, { scope: sectionRef });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 bg-background w-full px-6 sm:px-12 md:px-24 relative overflow-hidden">
      
      {/* Narrative Thread Segment 5 */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block z-0">
        <svg width="100%" height="100%" viewBox="0 0 1440 1000" preserveAspectRatio="none">
          <clipPath id="contact-clip">
            <rect x="0" y="0" width="1440" height="0" ref={clipRectRef} />
          </clipPath>
          <path
            d="M 720 0 L 720 1000"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            clipPath="url(#contact-clip)"
            style={{ filter: "drop-shadow(0px 0px 8px rgba(255,69,0,0.5))" }}
          />
          <circle cx="720" cy="994" r="6" fill="var(--color-primary)" ref={arrowheadRef} className="opacity-0 drop-shadow-md" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Banner Title */}
        <div ref={headerRef} className="mb-16 md:mb-24 flex flex-col items-center text-center opacity-0">
          <div className="flex items-center gap-3 text-foreground font-medium text-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground"></span>
            Let's Collaborate
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tighter text-foreground leading-[1.1] mb-6 max-w-4xl">
            Ready to architect your next digital product?
          </h2>
          <p className="text-base sm:text-lg text-muted font-light max-w-2xl">
            Available for full-stack engineering contracts, strategic architecture reviews, and high-impact advisory roles worldwide.
          </p>
        </div>

        {/* Contact Form & Direct Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Direct Details */}
          <div ref={detailsRef} className="lg:col-span-5 flex flex-col justify-between space-y-8 opacity-0">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-8">Direct Channels</h3>
              
              {/* Email Box */}
              <div className="p-5 rounded-2xl bg-background border border-border mb-4 flex items-center justify-between shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">Email</span>
                    <a href={`mailto:${contactInfo.email}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-3 rounded-full bg-background hover:bg-primary/10 hover:text-primary text-foreground transition-colors border border-border"
                  aria-label="Copy Email"
                >
                  {copied ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone & WhatsApp */}
              <div className="p-5 rounded-2xl bg-background border border-border mb-4 flex items-center gap-4 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                  <FiMessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">WhatsApp / Phone</span>
                  <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-5 rounded-2xl bg-background border border-border flex items-center gap-4 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">Location</span>
                  <span className="text-sm font-medium text-foreground">{contactInfo.location}, Ghana</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-border/50">
              <span className="text-xs font-mono uppercase tracking-widest text-muted mb-4 block">Connect Elsewhere</span>
              <div className="flex gap-4">
                <a href="https://github.com/ProvLeon" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="p-3.5 rounded-full bg-background border border-border hover:bg-primary hover:border-primary hover:text-white text-foreground transition-colors shadow-sm">
                  <AiFillGithub className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/emmanuellomotey" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="p-3.5 rounded-full bg-background border border-border hover:bg-primary hover:border-primary hover:text-white text-foreground transition-colors shadow-sm">
                  <AiFillLinkedin className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/lomoteyokantah" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="p-3.5 rounded-full bg-background border border-border hover:bg-primary hover:border-primary hover:text-white text-foreground transition-colors shadow-sm">
                  <AiFillInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-7 opacity-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 sm:p-12 rounded-3xl bg-background border border-border shadow-sm">
              <h3 className="text-2xl font-medium text-foreground mb-4">Send an Inquiry</h3>
              <div>
                <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted mb-2 block">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="e.g. Sarah Connor"
                  className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors font-light text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted mb-2 block">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="e.g. sarah@company.com"
                  className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors font-light text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted mb-2 block">
                  Project Details
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors font-light text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex items-center justify-center gap-3 py-4 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:bg-primary hover:text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting Message...</span>
                ) : submitted ? (
                  <span className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4" /> Message Sent Successfully!
                  </span>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <FiSend className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

