import React from "react";
import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | DADA'S I.T Services & Security Solutions",
  description: "Privacy policy and client data protection practices for DADA'S I.T Services & Security Solutions.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-16 bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal &amp; Compliance</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface font-manrope tracking-tight mb-8">
          Privacy Policy
        </h1>

        <div className="surface-card rounded-3xl p-8 md:p-12 border border-outline-variant/30 space-y-6 text-sm text-on-surface-variant leading-relaxed">
          <p>
            <strong>Last Updated:</strong> August 2024
          </p>

          <h2 className="text-xl font-bold text-on-surface font-manrope pt-2">
            1. Information Collection &amp; Purpose
          </h2>
          <p>
            DADA&apos;S I.T Services &amp; Security Solutions collects corporate contact information (such as name, work email, phone number, and project site requirements) solely to provide IT infrastructure consulting, hardware quotations, and technical support.
          </p>

          <h2 className="text-xl font-bold text-on-surface font-manrope pt-2">
            2. Confidentiality of Client Data
          </h2>
          <p>
            We strictly respect the confidential nature of enterprise network topologies, IP surveillance configurations, and facility schematics. We never sell, rent, or trade client telemetry or personal data to third parties.
          </p>

          <h2 className="text-xl font-bold text-on-surface font-manrope pt-2">
            3. Surveillance &amp; Biometric Data Handling
          </h2>
          <p>
            All physical biometric credentials and CCTV footage remain the sole exclusive property of the client. DADA&apos;S I.T does not store or mirror customer video feeds on public cloud servers without explicit written authorization and end-to-end encryption.
          </p>

          <h2 className="text-xl font-bold text-on-surface font-manrope pt-2">
            4. Contact Us
          </h2>
          <p>
            For privacy inquiries or data compliance audits, contact our compliance officer at{" "}
            <a href="mailto:privacy@dadasit.com" className="text-primary font-bold hover:underline">
              privacy@dadasit.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
