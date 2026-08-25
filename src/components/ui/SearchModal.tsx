"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Shield, Package, FolderGit2, BookOpen } from "lucide-react";
import { servicesData } from "@/data/services";
import { productsData } from "@/data/products";
import { projectsData } from "@/data/projects";
import { insightsData } from "@/data/insights";
import { motion, AnimatePresence } from "framer-motion";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    const services = servicesData
      .filter((s) => s.title.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q))
      .map((s) => ({
        type: "Service",
        icon: Shield,
        title: s.title,
        description: s.shortDescription,
        href: `/services/${s.slug}`,
      }));

    const products = productsData
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .map((p) => ({
        type: "Product",
        icon: Package,
        title: p.name,
        description: `${p.brand} - ${p.category}`,
        href: `/products`,
      }));

    const projects = projectsData
      .filter((p) => p.title.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.industry.toLowerCase().includes(q))
      .map((p) => ({
        type: "Case Study",
        icon: FolderGit2,
        title: p.title,
        description: `Client: ${p.client} (${p.industry})`,
        href: `/projects`,
      }));

    const insights = insightsData
      .filter((i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q))
      .map((i) => ({
        type: "Insight",
        icon: BookOpen,
        title: i.title,
        description: `${i.category} • ${i.readTime}`,
        href: `/insights`,
      }));

    return [...services, ...products, ...projects, ...insights].slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-on-background/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-outline-variant/30 overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center px-5 border-b border-outline-variant/20">
            <Search className="w-5 h-5 text-primary shrink-0" />
            <input
              type="text"
              placeholder="Search services, products, clients, or technologies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full px-4 py-4.5 text-base text-on-surface focus:outline-none font-manrope placeholder:text-on-surface-variant/60"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1.5 text-on-surface-variant hover:text-primary mr-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs font-bold uppercase text-on-surface-variant px-2.5 py-1 bg-surface-container rounded-lg hover:bg-surface-container-high"
            >
              ESC
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-96 overflow-y-auto p-4">
            {query.trim() === "" ? (
              <div className="py-8 text-center text-on-surface-variant text-sm">
                <p className="font-medium">Quick suggestions:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {["CCTV", "Structured Cabling", "Ador Welding", "Servers", "Biometric Access", "AMC"].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1 bg-surface-container rounded-full text-xs font-semibold hover:bg-primary hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-10 text-center text-on-surface-variant text-sm">
                No matching results found for &ldquo;{query}&rdquo;. Try another keyword.
              </div>
            ) : (
              <div className="space-y-2">
                {searchResults.map((result, idx) => {
                  const Icon = result.icon;
                  return (
                    <Link
                      key={idx}
                      href={result.href}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                              {result.type}
                            </span>
                            <span className="text-sm font-bold text-on-surface truncate group-hover:text-primary font-manrope">
                              {result.title}
                            </span>
                          </div>
                          <p className="text-xs text-on-surface-variant truncate mt-0.5">
                            {result.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-on-surface-variant/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
