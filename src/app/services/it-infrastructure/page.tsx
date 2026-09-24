import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Router, ShieldCheck, Zap, Activity, CheckCircle2, ArrowRight, Shield, Layers } from "lucide-react";
import { servicesData } from "@/data/services";
import ConsultationForm from "@/components/forms/ConsultationForm";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Enterprise Networking & Structured Cabling | DADA'S I.T",
  description:
    "End-to-end network architecture, Cat6/Fiber optic cabling, core switching, next-gen firewalls, and server rack installations.",
};

export default function ITInfrastructurePage() {
  const service = servicesData.find((s) => s.id === "it-infrastructure")!;

  return (
    <div className="pt-24 pb-16 bg-background">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-6">
        <PageBreadcrumb
          items={[
            { label: "Services", href: "/services" },
            { label: "IT Infrastructure & Networking" },
          ]}
          backLabel="Back to Services"
          backHref="/services"
        />
      </div>

      {/* Header */}
      <section className="py-12 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider font-manrope">
              <Router className="w-3.5 h-3.5" />
              <span>Mission-Critical Networking</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface font-manrope tracking-tight leading-tight">
              Enterprise IT Infrastructure &amp; <span className="gradient-text">Structured Cabling</span>
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
              {service.fullDescription}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-on-surface bg-surface-container px-3.5 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>99.99% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-on-surface bg-surface-container px-3.5 py-2 rounded-xl">
                <Zap className="w-4 h-4 text-primary" />
                <span>10G/40G Fiber Backbone</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container">
            <Image
              src={service.image}
              alt="Enterprise IT Infrastructure"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Architecture Pillars & Technical Specs */}
      <section className="py-16 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {service.benefits.map((benefit, idx) => (
            <div key={idx} className="surface-card p-8 rounded-3xl border border-outline-variant/30 hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface font-manrope mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Specifications Table */}
        <div className="surface-card rounded-3xl p-8 md:p-12 border border-outline-variant/30 mb-16">
          <h2 className="text-2xl font-bold text-on-surface font-manrope mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <span>Technical Specifications &amp; Standards</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.specifications.map((spec, sIdx) => (
              <div key={sIdx} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex justify-between items-center">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider font-manrope">
                  {spec.label}
                </span>
                <span className="text-xs font-bold text-on-surface font-manrope text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Form Split Section */}
        <div className="max-w-3xl mx-auto">
          <ConsultationForm defaultService="Enterprise IT Infrastructure & Structured Cabling" />
        </div>
      </section>
    </div>
  );
}
