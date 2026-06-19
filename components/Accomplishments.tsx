"use client";

import { achievements as data } from "@/constants";

export default function Accomplishments() {
  return (
    <section id="accomplishments" className="py-32 relative border-t border-white/10 bg-black text-white px-12 md:px-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">Accomplishments</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-4">
            // Technical Milestones & Impact
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
        {data.map((card, index) => (
          <div key={index} className="bg-black p-8 md:p-12 hover:bg-white/5 transition-colors duration-500 flex flex-col items-start justify-between min-h-[200px]">
            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white">
              {card.number}+
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-4">
              [ {card.text} ]
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
