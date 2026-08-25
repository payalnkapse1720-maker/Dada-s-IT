import React from "react";
import { Metadata } from "next";
import { Factory, Building2, HeartPulse, Building, Briefcase, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { industriesData } from "@/data/industries";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Industries Served | DADA'S I.T Services & Security Solutions",
  description:
    "Tailored enterprise infrastructure and security architectures for Manufacturing, Banking, Healthcare, Real Estate, and Corporate IT Parks.",
};

export default function IndustriesPage() {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Factory,
    Building2,
    HeartPulse,
    Building,
    Briefcase,
  };

  return (
    <div className="pt-24 pb-16 bg-background">
      {/* Header */}
      <section className="py-16 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
          <Building2 className="w-3.5 h-3.5" />
          <span>Sector-Specific Capabilities</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface font-manrope tracking-tight max-w-4xl mx-auto leading-tight">
          Specialized Architectures For Every <span className="gradient-text">Industry</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed">
          From EMI-immune industrial fiber backbones to RBI-compliant banking data rooms and smart township intercom networks.
        </p>
      </section>

      {/* Industries Detailed List */}
      <section className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto space-y-12">
        {industriesData.map((ind, idx) => {
          const Icon = iconMap[ind.icon] || Factory;
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={ind.id}
              className="surface-card rounded-3xl p-8 md:p-12 border border-outline-variant/30 overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center ${
                isReversed ? "lg:flex-row-reverse" : ""
              }`}>
                {/* Content */}
                <div className={`space-y-6 ${isReversed ? "lg:col-span-7 lg:order-2" : "lg:col-span-7"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                        Industry Vertical
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface font-manrope">
                        {ind.name}
                      </h2>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-primary font-manrope">
                    {ind.headline}
                  </h3>

                  <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                    {ind.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface block font-manrope">
                      Core Compliance &amp; Engineering Solutions:
                    </span>
                    {ind.keyBenefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs md:text-sm text-on-surface-variant">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-xs font-bold font-manrope hover:bg-primary/90 transition-all shadow-xs"
                    >
                      <span>Request {ind.name} Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className={`relative h-72 md:h-96 rounded-2xl overflow-hidden bg-surface-container ${
                  isReversed ? "lg:col-span-5 lg:order-1" : "lg:col-span-5"
                }`}>
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
