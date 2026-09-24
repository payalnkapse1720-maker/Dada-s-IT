import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Shield, Award, Users, Target, Compass, Sparkles, CheckCircle2, ArrowRight, Quote } from "lucide-react";
import { timelineData } from "@/data/timeline";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

export const metadata: Metadata = {
  title: "About Our Legacy | DADA'S I.T Services & Security Solutions",
  description:
    "Learn about DADA'S I.T, our founder Mr. Dada, our journey from 2019 to becoming a premier enterprise IT infrastructure and security engineering partner.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-background">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-6">
        <PageBreadcrumb
          items={[{ label: "About Us" }]}
          backLabel="Back to Home"
          backHref="/"
        />
      </div>

      {/* Hero Header */}
      <section className="py-12 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
          <Shield className="w-3.5 h-3.5" />
          <span>Our Legacy &amp; Ethos</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface font-manrope tracking-tight max-w-4xl mx-auto leading-tight">
          Architecting High-Performance Resilience Since <span className="gradient-text">2019</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed">
          Founded on the principles of zero-compromise precision, military-grade security, and rapid technical execution for mission-critical operations.
        </p>
      </section>

      {/* Founder's Message Section */}
      <section className="py-12 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <div className="surface-card rounded-3xl p-8 md:p-14 border border-outline-variant/30 overflow-hidden relative bg-gradient-to-br from-white via-white to-primary-container/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Founder Avatar Card */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-4 bg-surface-container">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-KovNFV7mew9LmCVVJJZTDJat-UJs8za3pvdWkP-9ungLqajldrZ1EcO5wdRqh8DkkE7TCthJ1HopEc92EW9qHKknL2gp_vNUFwtO7mAQjBxrEKG5VuONa2YVW0ACMVYt9fURn7TluWUISHpl5dvyyfCeEYvXaXbaxZIP7KyWIAYgaOy6lpCIOA8hcDwar8O6EmQq-SkikJ06v9cdH_RiFXOdy2PYFgVr6Fhp2p2HsYj2glhxqd8HiQ"
                  alt="Mr. Dada - Founder & CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-on-surface font-manrope">
                Mr. Dada
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Founder &amp; Chief Executive Officer
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                DADA&apos;S I.T Services &amp; Security Solutions
              </p>
            </div>

            {/* Founder Quote Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Quote className="w-5 h-5" />
              </div>
              <blockquote className="text-lg md:text-2xl font-bold text-on-surface font-manrope leading-relaxed italic">
                &ldquo;When an enterprise entrusts their network cabling, data servers, and surveillance to us, they are entrusting the operational lifeblood of their business. We treat every packet, every camera feed, and every circuit with absolute mathematical precision.&rdquo;
              </blockquote>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                From our very first industrial project in 2019 to maintaining complex multi-site networks for corporations like Ador Welding, MCA Mumbai, and Godrej Lawkim, our mandate has remained unchanged: deliver robust, future-proof engineering that empowers leaders to operate with total peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="surface-card p-8 rounded-3xl border border-outline-variant/30 hover-lift flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface font-manrope mb-3">
                Our Mission
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                To design, deploy, and maintain zero-failure IT infrastructure and intelligent surveillance systems that enable enterprises to scale securely and efficiently.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/20 text-xs font-bold text-primary">
              Continuous Operational Uptime
            </div>
          </div>

          <div className="surface-card p-8 rounded-3xl border border-outline-variant/30 hover-lift flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/30 text-secondary flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface font-manrope mb-3">
                Our Vision
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                To be the most trusted technology infrastructure partner across India, recognized for engineering integrity, rapid incident resolution, and continuous technological innovation.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/20 text-xs font-bold text-secondary">
              National Enterprise Benchmark
            </div>
          </div>

          <div className="surface-card p-8 rounded-3xl border border-outline-variant/30 hover-lift flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-tertiary-container/30 text-tertiary flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface font-manrope mb-3">
                Our Core Values
              </h3>
              <ul className="text-xs space-y-2 text-on-surface-variant leading-relaxed">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Precision Engineering:</strong> No shortcuts or loose ends.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>SLA Accountability:</strong> Transparent guaranteed response times.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>Long-Term Partnership:</strong> Sustained lifecycle support.</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/20 text-xs font-bold text-tertiary">
              Uncompromising Integrity
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Interactive Evolution Timeline (2019 - Present) */}
      <section className="py-24 px-6 md:px-12 lg:px-16 max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3 font-manrope">
            <span>Milestones &amp; Growth</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface font-manrope tracking-tight">
            Our Evolution <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg mt-2">
            A journey defined by relentless execution, technical mastery, and trusted client partnerships.
          </p>
        </div>

        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
          {timelineData.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Year Marker on Left for desktop */}
              <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
                <span className={`text-xl font-extrabold font-manrope ${
                  item.isCurrent ? "text-primary" : "text-on-surface-variant"
                }`}>
                  {item.year}
                </span>
              </div>

              {/* Node Dot */}
              <div
                className={`absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-125 ${
                  item.isCurrent ? "bg-primary ring-4 ring-primary/20 animate-pulse" : "bg-primary"
                }`}
              />

              {/* Content Card */}
              <div className="surface-card p-6 rounded-2xl border border-outline-variant/30 hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <div className="md:hidden text-xs font-bold text-primary font-manrope">
                    {item.year}
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 bg-primary/10 text-primary rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-on-surface font-manrope mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certified Engineers & Culture */}
      <section className="py-16 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <div className="surface-card rounded-3xl p-8 md:p-12 border border-outline-variant/30 bg-surface-container-low/40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
                <Users className="w-3.5 h-3.5" />
                <span>Our Technical Corps</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-on-surface font-manrope tracking-tight">
                OEM-Certified Engineers &amp; Rapid Field Technicians
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base mt-4 leading-relaxed">
                Our infrastructure and surveillance teams hold active industry certifications (Cisco CCNA/CCNP, VMware VCP, Hikvision HCSA/HCIE, Microsoft Azure, and Fluke Networks Cabling Specialists).
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-white border border-outline-variant/20">
                  <div className="font-extrabold text-xl text-primary font-manrope">100%</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">Certified Field Staff</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-outline-variant/20">
                  <div className="font-extrabold text-xl text-primary font-manrope">Fluke Calibrated</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">Physical Line Certification</div>
                </div>
              </div>
            </div>

            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg bg-surface-container">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDews7LI5yuukkIYeIlta2sF8I8BEvvUDh0C38GemiGk7LEmlwmUaZA27J9gn55dg03bwFXe3kphbdSwm3sS2Laws8f5iSToefDDF2Mvz9-GVYZNmxk-60GjrHZpXVQ-5OUUXelOCwin_nB54upWsU_YT2plN_BOOzkdUYq6BDrfczX7MhaRoZW395zAc5uZuZ37PniuqobC-Oqbv-npePtBNin71vveGwh6erq4oQQySUKGEXnFWF9qw"
                alt="DADA'S I.T Certified Engineering Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection />
    </div>
  );
}
