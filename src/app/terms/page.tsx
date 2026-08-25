import React from "react";
import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | DADA'S I.T Services & Security Solutions",
  description: "Terms of service and engineering contract conditions for DADA'S I.T Services & Security Solutions.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal &amp; Contracts</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface font-manrope tracking-tight mb-8">
          Terms &amp; Conditions
        </h1>

        <div className="surface-card rounded-3xl p-8 md:p-12 border border-outline-variant/30 space-y-6 text-sm text-on-surface-variant leading-relaxed">
          <p>
            <strong>Last Updated:</strong> August 2024
          </p>

          <h2 className="text-xl font-bold text-on-surface font-manrope pt-2">
            1. Engagement Scope
          </h2>
          <p>
            All hardware supplies, installation services, and Annual Maintenance Contracts (AMC) executed by DADA&apos;S I.T Services &amp; Security Solutions are governed by agreed Purchase Orders (PO) and Service Level Agreements (SLA).
          </p>

          <h2 className="text-xl font-bold text-on-surface font-manrope pt-2">
            2. Warranty &amp; OEM Standards
          </h2>
          <p>
            All networking switches, IP cameras, biometric controllers, servers, and storage units are backed by their respective manufacturer OEM warranties in addition to DADA&apos;S I.T onsite installation and workmanship warranties.
          </p>

          <h2 className="text-xl font-bold text-on-surface font-manrope pt-2">
            3. Service Level Agreements (SLAs)
          </h2>
          <p>
            Response turnaround times for AMC contracts (ranging from 15-minute remote diagnostic callbacks to 4-hour physical engineer dispatches) apply strictly during contracted operating windows as defined in each client agreement.
          </p>
        </div>
      </div>
    </div>
  );
}
