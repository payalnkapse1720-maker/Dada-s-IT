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
} from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import { subscribeEnquiries } from "@/lib/firebase/enquiries";
import { subscribeQuotes } from "@/lib/firebase/quotes";
import { EnquiryRecord, QuoteRecord } from "@/types";
import { formatFirestoreDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let loadedEnquiries = false;
    let loadedQuotes = false;

    const checkLoading = () => {
      if (loadedEnquiries && loadedQuotes) {
        setIsLoading(false);
      }
    };

    const unsubEnquiries = subscribeEnquiries(
      (data) => {
        setEnquiries(data);
        loadedEnquiries = true;
        checkLoading();
      },
      () => {
        loadedEnquiries = true;
        checkLoading();
      }
    );

    const unsubQuotes = subscribeQuotes(
      (data) => {
        setQuotes(data);
        loadedQuotes = true;
        checkLoading();
      },
      () => {
        loadedQuotes = true;
        checkLoading();
      }
    );

    return () => {
      unsubEnquiries();
      unsubQuotes();
    };
  }, []);

  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;
  const pendingQuotesCount = quotes.filter((q) => q.status === "new").length;

  const statCards = [
    {
      title: "Total Products",
      value: 0,
      description: "0 Active catalog items in Firestore",
      icon: Package,
      badge: "Catalog",
      badgeType: "info" as const,
      href: "/admin/products",
    },
    {
      title: "Total Services",
      value: 0,
      description: "0 Service packages in Firestore",
      icon: Wrench,
      badge: "Business",
      badgeType: "default" as const,
      href: "/admin/services",
    },
    {
      title: "Total Projects",
      value: 0,
      description: "0 Deployed case studies",
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
      title: "Blog / Insights",
      value: 0,
      description: "0 Published technical articles",
      icon: BookOpen,
      badge: "Content",
      badgeType: "default" as const,
      href: "/admin/blog",
    },
  ];

  // Combine and sort recent leads from both enquiries and quotes
  const combinedRecent = [
    ...enquiries.map((e) => ({
      id: e.id,
      type: "enquiry" as const,
      title: `${e.firstName} ${e.lastName}`,
      subtitle: `${e.inquiryType.toUpperCase()} — ${e.email}`,
      date: e.createdAt,
      status: e.status,
      href: "/admin/enquiries",
    })),
    ...quotes.map((q) => ({
      id: q.id,
      type: "quote" as const,
      title: q.fullName,
      subtitle: `${q.productName} (${q.quantity} units)`,
      date: q.createdAt,
      status: q.status,
      href: "/admin/quotes",
    })),
  ].slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header with Quick Actions */}
      <AdminPageHeader
        title="Control Center Overview"
        subtitle="Real-time operational dashboard and enterprise lead management."
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
                    <Link
                      href={item.href}
                      className="p-1 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-primary transition-colors"
                      title="View record"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System & Architecture Summary */}
        <div className="lg:col-span-4 surface-card p-6 rounded-3xl border border-outline-variant/30 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-outline-variant/20">
              <ShieldAlert className="w-4 h-4 text-primary" />
              <h3 className="font-extrabold text-base text-on-surface font-manrope">
                System Integration
              </h3>
            </div>
            <div className="mt-4 space-y-3.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <span className="font-semibold text-on-surface">Firebase Auth</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <span className="font-semibold text-on-surface">Firestore DB</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Connected &amp; Syncing
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <span className="font-semibold text-on-surface">Public Website</span>
                <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                  Live Firestore Writes
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/20">
            <Link
              href="/admin/settings"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-outline-variant/40 hover:bg-surface-container text-xs font-bold font-manrope text-on-surface transition-colors cursor-pointer"
            >
              <span>View System Settings</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
