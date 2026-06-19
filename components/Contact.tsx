"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { contactInfo } from "@/constants";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 relative border-t border-white/10 bg-black text-white px-12 md:px-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">Connect</h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-4">
            // Init Connection Sequence
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
        
        {/* Info Column */}
        <div className="bg-black p-8 md:p-16 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-12 border-b border-white/10 pb-4">
              [ Comm_Channels ]
            </h3>
            
            <div className="space-y-8 font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-white/70">
              <div className="flex flex-col gap-1">
                <span className="text-white/40">Email_</span>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">{contactInfo.email}</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40">Phone_</span>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">{contactInfo.phone}</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40">WhatsApp_</span>
                <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Open Chat</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40">Location_</span>
                <span>{contactInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-black p-8 md:p-16">
          <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-12 border-b border-white/10 pb-4">
              [ Transmit_Message ]
            </h3>

            <div className="space-y-8 flex-grow">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="NAME_"
                required
                className="w-full bg-transparent border-b border-white/20 pb-4 outline-none font-mono text-[12px] uppercase tracking-widest text-white placeholder-white/30 focus:border-white transition-colors"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="EMAIL_"
                required
                className="w-full bg-transparent border-b border-white/20 pb-4 outline-none font-mono text-[12px] uppercase tracking-widest text-white placeholder-white/30 focus:border-white transition-colors"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="MESSAGE_"
                required
                rows={4}
                className="w-full bg-transparent border-b border-white/20 pb-4 outline-none font-mono text-[12px] uppercase tracking-widest text-white placeholder-white/30 focus:border-white transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-12 w-full border border-white/20 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Transmitting..." : status === "success" ? "Transmission Successful" : status === "error" ? "Transmission Failed" : "Initialize Transfer"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
