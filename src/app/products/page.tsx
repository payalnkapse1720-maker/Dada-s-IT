"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Package, Search, Filter, ShieldCheck, Check, Send, Sparkles, Star, Loader2 } from "lucide-react";
import { productsData, productCategories } from "@/data/products";
import { Product } from "@/types";
import ProductQuoteModal from "@/components/forms/ProductQuoteModal";
import CTASection from "@/components/sections/CTASection";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (categoryParam && productCategories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else if (!categoryParam) {
      setSelectedCategory("All Categories");
    }
  }, [categoryParam]);

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

  const breadcrumbItems = useMemo(() => {
    if (selectedCategory !== "All Categories") {
      return [
        { label: "Products", href: "/products" },
        { label: selectedCategory },
      ];
    }
    return [{ label: "Hardware Products" }];
  }, [selectedCategory]);

  return (
    <div className="pt-24 pb-16 bg-background">
      {/* Breadcrumb Navigation with Back Button */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-6">
        <PageBreadcrumb
          items={breadcrumbItems}
          backLabel={selectedCategory !== "All Categories" ? "All Products" : "Back"}
          backHref={selectedCategory !== "All Categories" ? "/products" : undefined}
        />
      </div>

      {/* Header */}
      <section className="py-12 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto text-center">
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
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto mb-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30">
            <Package className="w-12 h-12 text-on-surface-variant mx-auto mb-4 opacity-40" />
            <h3 className="text-xl font-bold text-on-surface font-manrope">No Products Found</h3>
            <p className="text-on-surface-variant text-sm mt-1 max-w-md mx-auto">
              No equipment matching &quot;{searchQuery}&quot; in {selectedCategory}. Try adjusting your search query or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSearchQuery("");
              }}
              className="mt-6 px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="surface-card rounded-3xl overflow-hidden border border-outline-variant/30 flex flex-col justify-between hover-lift group"
              >
                <div>
                  {/* Image & Badge Area */}
                  <div className="relative h-64 w-full bg-surface-container overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-bold text-primary border border-primary/20 shadow-sm font-manrope">
                        {product.brand}
                      </span>
                      {product.badge && (
                        <span className="px-3 py-1 bg-primary text-white rounded-full text-[11px] font-bold shadow-sm font-manrope">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-bold text-on-surface flex items-center gap-1 shadow-sm">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{product.rating}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary font-manrope">
                      {product.category}
                    </div>
                    <h3 className="font-extrabold text-xl text-on-surface font-manrope leading-snug group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-on-surface-variant text-xs line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Specs Box */}
                    <div className="bg-surface-container-low rounded-2xl p-4 space-y-2 border border-outline-variant/20 text-xs">
                      {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-[11px]">
                          <span className="text-on-surface-variant font-medium">{key}:</span>
                          <span className="font-bold text-on-surface text-right truncate max-w-[160px]">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 md:p-8 pt-0 border-t border-outline-variant/10 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant block">
                      Procurement Price
                    </span>
                    <span className="font-bold text-sm text-on-surface font-manrope">
                      {product.price || "Custom Quote"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenQuote(product)}
                    className="px-5 py-2.5 bg-primary text-white rounded-full text-xs font-bold font-manrope hover:bg-primary/90 transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Quote</span>
                    <Send className="w-3 h-3" />
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
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProductForQuote(null);
        }}
      />

      <CTASection />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
