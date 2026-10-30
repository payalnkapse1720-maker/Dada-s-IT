import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Shield, Router, Video, Fingerprint, Headphones, Globe, Server, CheckCircle2 } from "lucide-react";
import { servicesData } from "@/data/services";
import CTASection from "@/components/sections/CTASection";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Enterprise Solutions & Services | DADA'S I.T Services & Security Solutions",
  description:
    "Explore our complete 12+ enterprise service catalog: Structural Cabling, 4K CCTV, Biometric Access Control, ITFMS, Server Sales, and AMC Maintenance.",
};

export default function ServicesPage() {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Router,
    Video,
    Fingerprint,
    Headphones,
    Globe,
    Server,
  };

  return (
    <div className="pt-24 pb-16 bg-background">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-6">
        <PageBreadcrumb
          items={[{ label: "Services" }]}
          backLabel="Back to Home"
          backHref="/"
        />
      </div>

      {/* Header */}
      <section className="py-12 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
          <Shield className="w-3.5 h-3.5" />
          <span>Full Solutions Portfolio</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface font-manrope tracking-tight max-w-4xl mx-auto leading-tight">
          Comprehensive Enterprise <span className="gradient-text">IT &amp; Security Services</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed">
          From physical cabling and smart surveillance to cloud architecture and dedicated on-premises resident engineers.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-8 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] || Router;

            return (
              <div
                key={service.id}
                className="surface-card p-8 rounded-3xl border border-outline-variant/30 flex flex-col justify-between hover-lift group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-3 py-1 bg-surface-container text-on-surface-variant rounded-full">
                      {service.sla}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-on-surface font-manrope mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>

                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    {service.fullDescription}
                  </p>

                  <div className="space-y-2 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface block font-manrope">
                      Core Deliverables:
                    </span>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant/20">
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full py-3 bg-surface-container hover:bg-primary hover:text-white text-primary text-xs font-bold font-manrope rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>View Specifications &amp; Case Studies</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Consultation CTA */}
      <CTASection />
    </div>
  );
}
