import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import BentoServices from "@/components/sections/BentoServices";
import StatsSection from "@/components/sections/StatsSection";
import ProjectsMasonry from "@/components/sections/ProjectsMasonry";
import IndustriesSection from "@/components/sections/IndustriesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <BentoServices />
      <StatsSection />
      <ProjectsMasonry limit={6} showFilter={false} />
      <IndustriesSection />
      <ProcessSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
