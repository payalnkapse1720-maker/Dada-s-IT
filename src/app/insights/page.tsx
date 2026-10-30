import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, Clock, User, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { insightsData } from "@/data/insights";
import CTASection from "@/components/sections/CTASection";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

export const metadata: Metadata = {
  title: "Insights & Technical Resources | DADA'S I.T Services & Security Solutions",
  description:
    "Whitepapers, technical guides, and architectural best practices on Zero Trust networking, AI edge surveillance, and enterprise facility management.",
};

export default function InsightsPage() {
  const featuredArticle = insightsData[0];
  const regularArticles = insightsData.slice(1);

  return (
    <div className="pt-24 pb-16 bg-background">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-6">
        <PageBreadcrumb
          items={[{ label: "Insights & Whitepapers" }]}
          backLabel="Back to Home"
          backHref="/"
        />
      </div>

      {/* Header */}
      <section className="py-12 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Engineering Thought Leadership</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface font-manrope tracking-tight max-w-4xl mx-auto leading-tight">
          Insights &amp; Technical <span className="gradient-text">Whitepapers</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed">
          Deep-dive perspectives on network micro-segmentation, AI threat detection, surveillance compliance, and proactive IT asset lifecycle management.
        </p>
      </section>

      {/* Featured Hero Article */}
      {featuredArticle && (
        <section className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mb-16">
          <div className="surface-card rounded-3xl overflow-hidden border border-outline-variant/30 hover-lift group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 p-8 md:p-12 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider font-manrope">
                    Featured Whitepaper
                  </span>
                  <span className="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-extrabold text-on-surface font-manrope leading-tight group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                    <Image
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface font-manrope">
                      {featuredArticle.author.name}
                    </div>
                    <div className="text-[11px] text-on-surface-variant">
                      {featuredArticle.publishDate}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative h-72 md:h-96 w-full bg-surface-container overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of other articles */}
      <section className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mb-16">
        <h3 className="text-xl font-bold text-on-surface font-manrope mb-8">
          Latest Architecture Briefs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article) => (
            <div
              key={article.id}
              className="surface-card rounded-3xl overflow-hidden border border-outline-variant/30 flex flex-col justify-between hover-lift group"
            >
              <div>
                <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary font-manrope shadow-sm">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.publishDate}</span>
                  </div>

                  <h4 className="text-lg font-bold text-on-surface font-manrope mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>

                  <p className="text-xs md:text-sm text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {article.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-semibold text-on-surface-variant"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
