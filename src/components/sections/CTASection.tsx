"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
      <div className="bg-gradient-to-br from-[#081D30] via-[#006590] to-[#00687B] rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden shadow-2xl border border-primary-container/30">
        {/* Background glow circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-tertiary-container/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-primary-container text-xs font-bold uppercase tracking-wider font-manrope">
            <ShieldCheck className="w-4 h-4" />
            <span>Direct Engineering Escalation</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold font-manrope tracking-tight leading-tight">
            Ready to Build a Resilient, High-Performance IT Infrastructure?
          </h2>

          <p className="text-surface-variant text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Schedule a confidential technical consultation with our senior architects to evaluate your networking, CCTV, and facility management requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white text-on-background font-manrope font-extrabold text-sm rounded-full hover:bg-primary-fixed transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Request Free Consultation</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
            <a
              href="https://wa.me/919999999999?text=Hello%20DADA%27S%20I.T%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white font-manrope font-bold text-sm rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-primary-container" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
