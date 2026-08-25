"use client";

import React from "react";
import { Search, Compass, Cpu, Headphones, Check } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Comprehensive Audit & Site Survey",
      description: "Our senior infrastructure engineers perform in-depth physical site surveys, bandwidth calculations, RF spectrum heatmaps, and security vulnerability scans.",
      icon: Search,
      deliverables: ["Topology Map", "RF Heatmap", "Threat Assessment"],
    },
    {
      number: "02",
      title: "Architecture Design & BoQ Formulation",
      description: "We formulate precise Bill of Quantities (BoQ), CAD cabling blueprints, RAID storage capacity designs, and failover network routing schematics.",
      icon: Compass,
      deliverables: ["AutoCAD Schematics", "Itemized BoQ", "SLA Definition"],
    },
    {
      number: "03",
      title: "Precision Execution & Commissioning",
      description: "Certified technicians install armored cabling, calibrate 4K AI cameras, configure VLAN/firewall policies, and execute thorough stress testing.",
      icon: Cpu,
      deliverables: ["Fluke Certified Testing", "Burn-in Verification", "User Handover"],
    },
    {
      number: "04",
      title: "24/7 Managed IT & AMC Assurance",
      description: "Post-commissioning, our dedicated resident engineers or 24/7 monitoring team oversee system health, automated backups, and instant hardware replacement.",
      icon: Headphones,
      deliverables: ["24/7 NOC Monitoring", "Monthly Health Audits", "15-Min Response"],
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto bg-background">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3 font-manrope">
          <span>Delivery Methodology</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface font-manrope tracking-tight">
          How We <span className="gradient-text">Deploy Excellence</span>
        </h2>
        <p className="text-on-surface-variant text-base md:text-lg mt-2">
          A disciplined, four-phase engineering framework ensuring zero disruption to live operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="surface-card p-8 rounded-3xl flex flex-col justify-between hover-lift relative overflow-hidden group border border-outline-variant/30"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-primary/30 font-manrope group-hover:text-primary transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-on-surface font-manrope mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-secondary block font-manrope">
                  Key Outputs:
                </span>
                {step.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-on-surface-variant font-medium">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
