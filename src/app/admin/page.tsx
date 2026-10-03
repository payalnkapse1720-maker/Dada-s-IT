"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Wrench,
  FolderGit2,
  Mail,
  Receipt,
  BookOpen,
  PlusCircle,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  Clock,
  Inbox,
  User,
  Calendar,
  Layers,
} from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import { subscribeEnquiries } from "@/lib/firebase/enquiries";
import { subscribeQuotes } from "@/lib/firebase/quotes";
import { subscribeProducts } from "@/lib/firebase/products";
import { subscribeServices } from "@/lib/firebase/services";
import { subscribeProjects } from "@/lib/firebase/projects";
import { subscribeCategories } from "@/lib/firebase/categories";
import { EnquiryDoc, QuoteDoc, ProductDoc, ServiceDoc, ProjectDoc, CategoryDoc } from "@/types";
import { formatFirestoreDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<EnquiryDoc[]>([]);
  const [quotes, setQuotes] = useState<QuoteDoc[]>([]);
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [services, setServices] = useState<ServiceDoc[]>([]);
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubs: (() => void)[] = [];

    const unsubEnq = subscribeEnquiries((data) => setEnquiries(data));
    const unsubQuot = subscribeQuotes((data) => setQuotes(data));
    const unsubProd = subscribeProducts((data) => setProducts(data));
    const unsubServ = subscribeServices((data) => setServices(data));
    const unsubProj = subscribeProjects((data) => setProjects(data));
    const unsubCat = subscribeCategories((data) => setCategories(data));

    unsubs = [unsubEnq, unsubQuot, unsubProd, unsubServ, unsubProj, unsubCat];
    setIsLoading(false);

    return () => {
      unsubs.forEach((u) => u());
    };
  }, []);

  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;
  const pendingQuotesCount = quotes.filter((q) => q.status === "new" || q.status === "pending").length;

  const statCards = [
    {
      title: "Total Products",
      value: products.length,
      description: `${products.length} Active catalog items in Firestore`,
      icon: Package,
      badge: "Catalog",
      badgeType: "info" as const,
      href: "/admin/products",
    },
    {
      title: "Total Services",
      value: services.length,
      description: `${services.length} Service packages in Firestore`,
      icon: Wrench,
      badge: "Business",
      badgeType: "default" as const,
      href: "/admin/services",
    },
    {
      title: "Total Projects",
      value: projects.length,
      description: `${projects.length} Deployed case studies`,
      icon: FolderGit2,
      badge: "Portfolio",
      badgeType: "default" as const,
      href: "/admin/projects",
    },
    {
      title: "New Enquiries",
      value: enquiries.length,
      description: `${newEnquiriesCount} New unread leads`,
      icon: Mail,
      badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} New` : "Leads",
      badgeType: "warning" as const,
      href: "/admin/enquiries",
    },
    {
      title: "Product Quotes",
      value: quotes.length,
      description: `${pendingQuotesCount} Pending quotation RFPs`,
      icon: Receipt,
      badge: pendingQuotesCount > 0 ? `${pendingQuotesCount} New` : "Sales",
      badgeType: "success" as const,
      href: "/admin/quotes",
    },
    {
      title: "Categories",
      value: categories.length,
      description: `${categories.length} Catalog taxonomies`,
      icon: Layers,
      badge: "Structure",
      badgeType: "default" as const,
      href: "/admin/categories",
    },
  ];

  // Combine and sort recent leads from both enquiries and quotes
  const combinedRecent = [
    ...enquiries.map((e) => ({
      id: e.enquiryId || e.id || "enq",
      type: "enquiry" as const,
      title: e.name || `${e.firstName || ""} ${e.lastName || ""}`.trim() || "Visitor",
      subtitle: `${(e.type || e.inquiryType || "General").toUpperCase()} — ${e.email}`,
      date: e.createdAt,
      status: e.status,
      href: "/admin/enquiries",
    })),
    ...quotes.map((q) => ({
      id: q.quoteId || q.id || "quote",
      type: "quote" as const,
      title: q.name || q.fullName || "Customer",
      subtitle: `${q.productName || "Product"} (${q.quantity || 1} units)`,
      date: q.createdAt,
      status: q.status,
      href: "/admin/quotes",
    })),
  ].slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Page Header with Quick Actions */}
      <AdminPageHeader
        title="Control Center Overview"
        subtitle="Real-time operational dashboard and enterprise lead management powered by Cloud Firestore."
      >
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline-variant/40 text-on-surface font-bold text-xs rounded-xl hover:bg-surface-container-high transition-all font-manrope cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Service</span>
        </Link>
      </AdminPageHeader>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => (
          <AdminStatCard key={idx} {...card} />
        ))}
      </div>

      {/* Grid: Recent Leads & System Integration Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries / Quotes Feed */}
        <div className="lg:col-span-8 surface-card p-6 rounded-3xl border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
            <div>
              <h3 className="font-extrabold text-base text-on-surface font-manrope">
                Recent Inquiries &amp; Quotations
              </h3>
              <p className="text-xs text-on-surface-variant">
                Live submissions received from the enterprise consultation and quotation forms
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 font-manrope"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {combinedRecent.length === 0 ? (
            <div className="p-10 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant mb-3">
                <Inbox className="w-7 h-7 opacity-60" />
              </div>
              <h4 className="font-bold text-sm text-on-surface mb-1">
                No live inquiries received yet
              </h4>
              <p className="text-xs text-on-surface-variant max-w-sm">
                When prospective clients submit consultation requests or quotation forms, they will automatically appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/20">
              {combinedRecent.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {item.type === "enquiry" ? (
                        <Mail className="w-4 h-4" />
                      ) : (
                        <Receipt className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-on-surface truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-on-surface-variant truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] text-on-surface-variant/80 hidden sm:inline">
                      {formatFirestoreDate(item.date)}
                    </span>
                    <span className="uppercase text-[9px] font-bold px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant/30">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Database & Cloud Architecture Status */}
        <div className="lg:col-span-4 surface-card p-6 rounded-3xl border border-outline-variant/30 space-y-4">
          <div className="pb-3 border-b border-outline-variant/20">
            <h3 className="font-extrabold text-base text-on-surface font-manrope">
              Firestore Status
            </h3>
            <p className="text-xs text-on-surface-variant">
              8 Collections Architecture
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/10">
              <span className="text-on-surface-variant font-mono">admins</span>
              <span className="font-bold text-emerald-700">Protected</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/10">
              <span className="text-on-surface-variant font-mono">categories</span>
              <span className="font-bold text-on-surface">{categories.length} Taxonomies</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/10">
              <span className="text-on-surface-variant font-mono">products</span>
              <span className="font-bold text-on-surface">{products.length} Items</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/10">
              <span className="text-on-surface-variant font-mono">services</span>
              <span className="font-bold text-on-surface">{services.length} Packages</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/10">
              <span className="text-on-surface-variant font-mono">projects</span>
              <span className="font-bold text-on-surface">{projects.length} Case Studies</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/10">
              <span className="text-on-surface-variant font-mono">enquiries</span>
              <span className="font-bold text-primary">{enquiries.length} Inquiries</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/10">
              <span className="text-on-surface-variant font-mono">quotes</span>
              <span className="font-bold text-emerald-700">{quotes.length} Requests</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-on-surface-variant font-mono">websiteContent</span>
              <span className="font-bold text-on-surface">3 Sections</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/settings"
              className="w-full py-2 px-3 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors font-manrope"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Database Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
