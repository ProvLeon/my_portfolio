"use client";

import { achievements } from "@/constants";

export default function Accomplishments() {
  return (
    <section className="py-32 relative text-white px-12 md:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-white/50 mb-24">
          Milestones
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {achievements.map((item, index) => (
            <div key={index} className="flex flex-col group cursor-none">
              <span className="text-5xl md:text-7xl font-light tracking-tight mb-4 group-hover:-translate-y-2 transition-transform duration-500 ease-out text-white/80">
                {item.number}
              </span>
              <span className="text-xs tracking-widest uppercase text-white/40 group-hover:text-white/60 transition-colors duration-500">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
