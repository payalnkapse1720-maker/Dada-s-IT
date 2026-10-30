import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Fingerprint, CheckCircle2, Lock, FileCheck, Layers } from "lucide-react";
import { servicesData } from "@/data/services";
import ConsultationForm from "@/components/forms/ConsultationForm";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Access Control & Biometric Attendance Systems | DADA'S I.T",
  description:
    "AI facial recognition, biometric fingerprint scanners, RFID smart cards, turnstiles, and video door phone integrations for corporate and residential facilities.",
};

export default function AccessControlPage() {
  const service = servicesData.find((s) => s.id === "access-control")!;

  return (
    <div className="pt-24 pb-16 bg-background">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-6">
        <PageBreadcrumb
          items={[
            { label: "Services", href: "/services" },
            { label: "Biometric & Access Control" },
          ]}
          backLabel="Back to Services"
          backHref="/services"
        />
      </div>

      <section className="py-12 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider font-manrope">
              <Fingerprint className="w-3.5 h-3.5" />
              <span>Biometrics &amp; Identity</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface font-manrope tracking-tight leading-tight">
              Access Control &amp; <span className="gradient-text">Biometric Systems</span>
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          <div className="lg:col-span-5 relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container">
            <Image
              src={service.image}
              alt="Access Control Systems"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {service.benefits.map((benefit, idx) => (
            <div key={idx} className="surface-card p-8 rounded-3xl border border-outline-variant/30 hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Lock className="w-6 h-6" />
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

        {/* Specifications */}
        <div className="surface-card rounded-3xl p-8 md:p-12 border border-outline-variant/30 mb-16">
          <h2 className="text-2xl font-bold text-on-surface font-manrope mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <span>Biometric Controller Specifications</span>
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

        <div className="max-w-3xl mx-auto">
          <ConsultationForm defaultService="Access Control & Biometric Systems" />
        </div>
      </section>
    </div>
  );
}
