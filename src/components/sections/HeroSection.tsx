"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ShieldCheck, Activity, Cpu, Server, Lock } from "lucide-react";
import { motion } from "framer-motion";

// Dynamically import Three.js canvas with SSR disabled for optimal performance
const NetworkCanvas = dynamic(
  () => import("@/components/three/NetworkCanvas"),
  { ssr: false }
);

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-28 pb-20 px-6 md:px-12 lg:px-16 overflow-hidden bg-background">
      {/* Interactive 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <NetworkCanvas />
      </div>

      {/* Atmospheric Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-tertiary-container/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-primary-container/40 shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary font-manrope">
              Enterprise Grade Infrastructure &amp; Security
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-on-surface font-manrope leading-[1.08]"
          >
            Securing Futures Through{" "}
            <span className="gradient-text">Intelligent Infrastructure</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-on-surface-variant font-normal max-w-2xl leading-relaxed"
          >
            From high-throughput structural cabling and military-grade surveillance to AI-driven facility management, we architect resilient digital backbones for leading enterprises.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-manrope font-bold text-sm hover:bg-primary/90 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5 shadow-md"
            >
              <span>Request Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 text-on-surface font-manrope font-bold text-sm border border-outline-variant/50 hover:bg-white hover:border-primary transition-all hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Explore Verified Projects</span>
            </Link>
          </motion.div>

          {/* Floating Metric Badges / Live System Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-10 w-full"
          >
            <div className="surface-card p-4.5 rounded-2xl flex items-center gap-3.5 text-left backdrop-blur-lg bg-white/80 hover-lift">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-on-surface font-manrope">99.99%</div>
                <div className="text-xs text-on-surface-variant font-medium">Uptime Guarantee</div>
              </div>
            </div>

            <div className="surface-card p-4.5 rounded-2xl flex items-center gap-3.5 text-left backdrop-blur-lg bg-white/80 hover-lift">
              <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-on-surface font-manrope">200+</div>
                <div className="text-xs text-on-surface-variant font-medium">Enterprise Sites</div>
              </div>
            </div>

            <div className="surface-card p-4.5 rounded-2xl flex items-center gap-3.5 text-left backdrop-blur-lg bg-white/80 hover-lift">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/25 text-secondary flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-on-surface font-manrope">5+ Years</div>
                <div className="text-xs text-on-surface-variant font-medium">Engineering Legacy</div>
              </div>
            </div>

            <div className="surface-card p-4.5 rounded-2xl flex items-center gap-3.5 text-left backdrop-blur-lg bg-white/80 hover-lift">
              <div className="w-10 h-10 rounded-xl bg-primary-container/25 text-primary flex items-center justify-center shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-on-surface font-manrope">24/7 SLA</div>
                <div className="text-xs text-on-surface-variant font-medium">Technical Assurance</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
