"use client";

import React from "react";
import { Shield, Clock, Award, Building, CheckCircle } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "5+",
      unit: "Years",
      label: "Operational Excellence",
      description: "Delivering continuous enterprise technology innovation since 2019.",
      icon: Award,
    },
    {
      value: "200+",
      unit: "Projects",
      label: "Enterprise Deployments",
      description: "Across manufacturing plants, stadiums, corporate parks & smart townships.",
      icon: Building,
    },
    {
      value: "99.99%",
      unit: "Uptime",
      label: "SLA Infrastructure Standard",
      description: "Engineered with dual-redundant failovers and zero single points of failure.",
      icon: Shield,
    },
    {
      value: "15 min",
      unit: "Response",
      label: "Rapid Incident Turnaround",
      description: "Guaranteed 24/7 technical helpdesk and on-site resident engineer dispatch.",
      icon: Clock,
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-16 bg-surface-container-low/60 border-y border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3 font-manrope">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface font-manrope tracking-tight">
            Impact, Scale &amp; Engineering <span className="gradient-text">Assurance</span>
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mt-2">
            Metrics that demonstrate our unwavering commitment to enterprise reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="surface-card p-8 rounded-3xl text-center flex flex-col items-center justify-between hover-lift"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-container/20 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-baseline justify-center gap-1.5 font-extrabold text-4xl lg:text-5xl text-primary font-manrope tracking-tight">
                    <span>{stat.value}</span>
                    <span className="text-base text-secondary font-bold">{stat.unit}</span>
                  </div>
                  <h3 className="font-bold text-base text-on-surface font-manrope mt-2">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
