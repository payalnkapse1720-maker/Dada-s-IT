"use client";

import React from "react";
import { clientsAndPartners } from "@/data/partners";

export default function MarqueeSection() {
  return (
    <section className="py-12 bg-white border-y border-outline-variant/30 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 mb-6 text-center">
        <p className="text-xs uppercase font-extrabold tracking-widest text-on-surface-variant">
          Trusted by Industry Leaders &amp; Global Technology Partners
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex">
        {/* Left and right fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee track repeated for infinite scroll */}
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {[...clientsAndPartners, ...clientsAndPartners].map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-colors shadow-xs"
            >
              <div className="w-2 h-2 rounded-full bg-primary/60" />
              <span className="font-manrope font-bold text-sm text-on-surface tracking-tight">
                {partner.name}
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-white text-on-surface-variant/70 border border-outline-variant/20">
                {partner.category === "client" ? "Verified Client" : "OEM Partner"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
