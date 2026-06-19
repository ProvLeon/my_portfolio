"use client";

import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <section id="contact" className="py-48 relative text-white px-12 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-24">
        
        <div className="md:w-1/2">
          <h2 className="text-[4rem] md:text-[6rem] font-medium tracking-tight leading-[0.9] mb-8">
            Let's <br />
            <span className="text-white/50 italic font-light">Collaborate</span>
          </h2>
          <p className="text-lg text-white/50 font-light max-w-sm mb-12">
            Open for new opportunities, exciting projects, and creative collaborations.
          </p>
          <a href="mailto:hello@example.com" className="text-sm tracking-widest uppercase text-white/80 hover:text-white transition-colors duration-500 border-b border-white/20 pb-2 cursor-none">
            hello@okantah.com
          </a>
        </div>

        <div className="md:w-1/2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-12">
            <div className="group relative">
              <label htmlFor="name" className="text-xs tracking-widest uppercase text-white/40 absolute -top-6 left-0 transition-all duration-300 group-focus-within:text-white/80 group-focus-within:-translate-y-2">
                Name
              </label>
              <input 
                type="text" 
                id="name"
                required
                className="w-full bg-transparent border-b border-white/20 pb-4 text-xl font-light text-white outline-none focus:border-white/80 transition-colors duration-500 cursor-none" 
              />
            </div>
            
            <div className="group relative mt-6">
              <label htmlFor="email" className="text-xs tracking-widest uppercase text-white/40 absolute -top-6 left-0 transition-all duration-300 group-focus-within:text-white/80 group-focus-within:-translate-y-2">
                Email
              </label>
              <input 
                type="email" 
                id="email"
                required
                className="w-full bg-transparent border-b border-white/20 pb-4 text-xl font-light text-white outline-none focus:border-white/80 transition-colors duration-500 cursor-none" 
              />
            </div>

            <div className="group relative mt-6">
              <label htmlFor="message" className="text-xs tracking-widest uppercase text-white/40 absolute -top-6 left-0 transition-all duration-300 group-focus-within:text-white/80 group-focus-within:-translate-y-2">
                Message
              </label>
              <textarea 
                id="message"
                rows={4}
                required
                className="w-full bg-transparent border-b border-white/20 pb-4 text-xl font-light text-white outline-none focus:border-white/80 transition-colors duration-500 resize-none cursor-none" 
              />
            </div>

            <button 
              type="submit" 
              className="self-start mt-8 text-sm tracking-widest uppercase text-white/80 hover:text-white transition-colors duration-500 flex items-center gap-4 group cursor-none"
            >
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              <div className="w-12 h-[1px] bg-white/40 group-hover:bg-white transition-colors duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </div>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
