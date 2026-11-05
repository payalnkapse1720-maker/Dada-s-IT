import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle2, Headphones } from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { businessInfo } from "@/data/business-info";

export const metadata: Metadata = {
  title: "Consult an Expert & Contact | DADA'S I.T Services & Security Solutions",
  description:
    "Schedule a confidential enterprise consultation, request on-site IT audits, or reach our 24/7 technical emergency support team.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 bg-background">
      {/* Header */}
      <section className="py-16 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
          <Headphones className="w-3.5 h-3.5" />
          <span>Direct Engineering Access</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface font-manrope tracking-tight max-w-4xl mx-auto leading-tight">
          Consult an <span className="gradient-text">Infrastructure Expert</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed">
          Whether you require a multi-acre industrial cabling audit, 4K CCTV design, or 24/7 AMC resident engineers, our team is ready to assist.
        </p>
      </section>

      {/* Split Section: Details & Form */}
      <section className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: HQ Details, Response Promise, Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="surface-card p-8 rounded-3xl border border-outline-variant/30 space-y-6">
              <div className="flex items-center gap-3.5 pb-2 border-b border-outline-variant/20">
                <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
                  <Image
                    src={businessInfo.logoPath}
                    alt="DADA'S I.T Services & Security Solutions Official Logo"
                    width={48}
                    height={48}
                    priority
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-on-surface font-manrope leading-tight">
                    Operations &amp; Headquarters
                  </h2>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-primary font-manrope">
                    Official Corporate Office
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-on-surface-variant">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-on-surface font-manrope">Registered Office Address</div>
                    <a
                      href={businessInfo.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-on-surface-variant hover:text-primary transition-colors mt-0.5 leading-relaxed block"
                    >
                      {businessInfo.address}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-on-surface font-manrope">Direct Phone Inquiries</div>
                    <a href={businessInfo.phoneLink} className="text-xs text-primary font-bold hover:underline block mt-0.5">
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-on-surface font-manrope">Official Email Communications</div>
                    <a href={businessInfo.emailLink} className="text-xs text-primary font-bold hover:underline block mt-0.5">
                      {businessInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-on-surface font-manrope">Support Availability</div>
                    <p className="text-xs mt-0.5">
                      24/7/365 Emergency NOC &amp; Helpdesk for Active AMC Clients
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Guarantee Card */}
            <div className="surface-card p-6 rounded-3xl border border-primary-container/40 bg-gradient-to-br from-primary-container/10 via-white to-white">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <h3 className="text-base font-bold text-on-surface font-manrope">
                  Our Response Commitment
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Initial technical callback within 15 minutes for AMC clients.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>On-site physical site survey arranged within 24 hours.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Itemized CAD &amp; BoQ proposal prepared in 48 business hours.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: React Hook Form */}
          <div className="lg:col-span-7">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
