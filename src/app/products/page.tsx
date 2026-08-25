"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Package, Search, Filter, ShieldCheck, Check, Send, Sparkles, Star } from "lucide-react";
import { productsData, productCategories } from "@/data/products";
import { Product } from "@/types";
import ProductQuoteModal from "@/components/forms/ProductQuoteModal";
import CTASection from "@/components/sections/CTASection";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Categories" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenQuote = (product: Product) => {
    setSelectedProductForQuote(product);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-24 pb-16 bg-background">
      {/* Header */}
      <section className="py-16 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 font-manrope">
          <Package className="w-3.5 h-3.5" />
          <span>Procurement &amp; Supply</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface font-manrope tracking-tight max-w-4xl mx-auto leading-tight">
          Enterprise Hardware &amp; <span className="gradient-text">Product Catalogue</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed">
          Direct OEM-certified procurement for enterprise switches, 4K AI CCTV, biometric readers, servers, workstations, and high-density storage.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8 relative">
          <Search className="w-5 h-5 text-primary absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by model, brand, or component..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-outline-variant/40 rounded-full pl-12 pr-6 py-3.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>
      </section>

      {/* Categories & Filter Tabs */}
      <section className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {productCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-manrope transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-card border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Showing {filteredProducts.length} Enterprise Products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="surface-card rounded-3xl p-16 text-center max-w-lg mx-auto">
            <Package className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-on-surface font-manrope">
              No products found
            </h3>
            <p className="text-xs text-on-surface-variant mt-2">
              Try adjusting your search criteria or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2 bg-primary text-white rounded-full text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="surface-card rounded-3xl overflow-hidden flex flex-col justify-between hover-lift group border border-outline-variant/30"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-primary text-white rounded-full text-[10px] font-bold shadow-xs">
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-on-surface border border-outline-variant/20">
                      {product.brand}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-base font-bold text-on-surface font-manrope mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="space-y-1.5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 mb-4">
                      {Object.entries(product.specs).slice(0, 2).map(([key, value], sIdx) => (
                        <div key={sIdx} className="flex justify-between text-[11px]">
                          <span className="text-on-surface-variant font-medium">{key}:</span>
                          <span className="text-on-surface font-bold truncate max-w-[120px]">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleOpenQuote(product)}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-bold font-manrope hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Request Price Quote</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quote Modal */}
      <ProductQuoteModal
        product={selectedProductForQuote}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Consultation Banner */}
      <div className="mt-16">
        <CTASection />
      </div>
    </div>
  );
}
