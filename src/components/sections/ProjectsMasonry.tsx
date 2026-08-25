"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FolderGit2, CheckCircle2, Building, ExternalLink } from "lucide-react";
import { projectsData } from "@/data/projects";

interface ProjectsMasonryProps {
  showFilter?: boolean;
  limit?: number;
}

export default function ProjectsMasonry({ showFilter = true, limit }: ProjectsMasonryProps) {
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", "Manufacturing", "Public Infrastructure", "Engineering", "Corporate", "Residential", "Construction"];

  const filteredProjects = projectsData.filter((p) => {
    if (selectedTag === "All") return true;
    return p.tag === selectedTag;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3 font-manrope">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Proven Deployments</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface font-manrope tracking-tight">
            Featured <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg mt-2 max-w-xl">
            Real-world enterprise installations engineered for durability, zero downtime, and mission-critical performance.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-primary font-manrope font-bold text-sm hover:translate-x-1 transition-transform group shrink-0"
        >
          <span>View All Client Engagements</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter Tabs */}
      {showFilter && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-manrope transition-all whitespace-nowrap cursor-pointer ${
                selectedTag === tag
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Masonry / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project) => (
          <div
            key={project.id}
            className="surface-card rounded-3xl overflow-hidden flex flex-col justify-between hover-lift group border border-outline-variant/30"
          >
            <div>
              {/* Image Container */}
              <div className="relative h-56 w-full bg-surface-container overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent" />
                
                {/* Client Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-bold text-primary font-manrope shadow-sm">
                    {project.client}
                  </span>
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-semibold text-white">
                    {project.location}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-secondary mb-2">
                  <Building className="w-3.5 h-3.5" />
                  <span>{project.industry}</span>
                </div>

                <h3 className="text-xl font-bold text-on-surface font-manrope mb-3 leading-snug group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-on-surface-variant text-sm line-clamp-3 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics Highlight */}
                <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 mb-6">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <div className="text-xs font-extrabold text-primary font-manrope">
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-on-surface-variant truncate">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 md:px-8 pb-6 pt-0">
              <Link
                href="/projects"
                className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface text-xs font-bold font-manrope transition-colors flex items-center justify-center gap-2 group/btn"
              >
                <span>Read Full Case Study</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
