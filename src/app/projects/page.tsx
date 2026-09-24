import React from "react";
import { Metadata } from "next";
import { FolderGit2 } from "lucide-react";
import ProjectsMasonry from "@/components/sections/ProjectsMasonry";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Client Case Studies & Projects | DADA'S I.T Services & Security Solutions",
  description:
    "Explore verified deployments and case studies for Ador Welding, MCA Mumbai, Godrej Lawkim, EMH Tools, Group Inteltek, and B.G. Shirke Construction.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-16 bg-background">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-6">
        <PageBreadcrumb
          items={[{ label: "Projects & Case Studies" }]}
          backLabel="Back to Home"
          backHref="/"
        />
      </div>

      {/* Hero */}
      <section className="py-12 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Client Portfolio</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface font-manrope tracking-tight max-w-4xl mx-auto leading-tight">
          Proven Engineering <span className="gradient-text">Deployments</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed">
          Deep-dive case studies showcasing how we solved complex structural cabling, high-density 4K CCTV surveillance, and server virtualization challenges for leading enterprises.
        </p>
      </section>

      {/* Masonry Grid with all filters */}
      <ProjectsMasonry showFilter={true} />

      {/* Stats */}
      <div className="mt-12">
        <StatsSection />
      </div>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
