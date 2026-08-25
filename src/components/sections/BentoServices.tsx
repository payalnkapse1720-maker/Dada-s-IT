"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Router, Video, Fingerprint, Headphones, Globe, Wrench, Shield, Check } from "lucide-react";
import { servicesData } from "@/data/services";

export default function BentoServices() {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Router,
    Video,
    Fingerprint,
    Headphones,
    Globe,
    Server: Router,
    Wrench,
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto bg-background">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
            <Shield className="w-3.5 h-3.5" />
            <span>Enterprise Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface font-manrope tracking-tight leading-tight">
            Precision-Engineered <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg mt-3 leading-relaxed">
            Modular, high-availability IT infrastructure, next-generation security, and proactive facility management engineered for zero-failure environments.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-primary font-manrope font-bold text-sm hover:translate-x-1 transition-transform group shrink-0"
        >
          <span>Explore All 12+ Solutions</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {servicesData.map((service, index) => {
          const IconComponent = iconMap[service.icon] || Router;
          const isLarge = index === 0;

          return (
            <div
              key={service.id}
              className={`surface-card p-8 rounded-3xl flex flex-col justify-between hover-lift relative overflow-hidden group ${
                isLarge ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white via-white to-surface-container-low/40" : ""
              }`}
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

              <div>
                {/* Header Icon + Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 bg-surface-container text-on-surface-variant rounded-full border border-outline-variant/20">
                    {service.sla}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-on-surface font-manrope mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Key Features bullet list */}
                <div className="space-y-2 mb-8">
                  {service.features.slice(0, isLarge ? 4 : 3).map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-on-surface-variant font-medium">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-manrope text-xs font-extrabold hover:underline"
                >
                  <span>Technical Specifications &amp; Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
