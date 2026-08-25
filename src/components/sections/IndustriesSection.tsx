"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, Building2, HeartPulse, Building, Briefcase, CheckCircle2 } from "lucide-react";
import { industriesData } from "@/data/industries";

export default function IndustriesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Factory,
    Building2,
    HeartPulse,
    Building,
    Briefcase,
  };

  const currentIndustry = industriesData[activeTab];
  const Icon = iconMap[currentIndustry.icon] || Factory;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto bg-background">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3 font-manrope">
          <span>Tailored Deployments</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface font-manrope tracking-tight">
          Engineered for Every <span className="gradient-text">Industry</span>
        </h2>
        <p className="text-on-surface-variant text-base md:text-lg mt-2">
          Specialized infrastructure architectures tailored to stringent regulatory compliance and sector-specific requirements.
        </p>
      </div>

      {/* Industry Tabs */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
        {industriesData.map((ind, idx) => {
          const TabIcon = iconMap[ind.icon] || Factory;
          const isActive = activeTab === idx;

          return (
            <button
              key={ind.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold font-manrope transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-md -translate-y-0.5"
                  : "bg-surface-card border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{ind.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Showcase Card */}
      <div className="surface-card rounded-3xl p-8 md:p-12 border border-outline-variant/30 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-container/25 text-primary flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-secondary font-manrope">
                  Industry Focus
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-on-surface font-manrope">
                  {currentIndustry.name}
                </h3>
              </div>
            </div>

            <h4 className="text-lg font-bold text-primary font-manrope">
              {currentIndustry.headline}
            </h4>

            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              {currentIndustry.description}
            </p>

            {/* Key Benefits */}
            <div className="space-y-2.5 pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-on-surface font-manrope">
                Key Architecture Deliverables:
              </h5>
              {currentIndustry.keyBenefits.map((benefit, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-on-surface-variant">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-xs font-bold font-manrope hover:bg-primary/90 transition-all hover:shadow-md"
              >
                <span>Consult on {currentIndustry.name} Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Media Illustration */}
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-surface-container">
            <Image
              src={currentIndustry.image}
              alt={currentIndustry.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg">
                <div className="text-xs font-bold text-on-surface font-manrope">
                  Turnkey Infrastructure Package
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {currentIndustry.solutionsProvided.map((sol, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold"
                    >
                      {sol}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
