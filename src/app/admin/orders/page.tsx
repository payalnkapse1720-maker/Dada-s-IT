"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Inbox,
  ArrowLeft,
  RefreshCw,
  Clock,
  Loader2,
  Mail,
  Phone,
  Building,
  Package,
  MessageSquare,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { getInquiries, getQuotes } from "@/lib/firebase";
import type { InquiryRecord, QuoteRecord } from "@/types";

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState<"inquiries" | "quotes">("inquiries");
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setRefreshing(true);
    setErrorMessage(null);

    try {
      const [inquiriesRes, quotesRes] = await Promise.all([
        getInquiries(50),
        getQuotes(50),
      ]);
      setInquiries(inquiriesRes);
      setQuotes(quotesRes);
    } catch {
      setErrorMessage(
        "Failed to load customer leads from Cloud Firestore. Please verify your internet connection or admin permissions."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadInitialLeads() {
      try {
        const [inquiriesRes, quotesRes] = await Promise.all([
          getInquiries(50),
          getQuotes(50),
        ]);
        if (!ignore) {
          setInquiries(inquiriesRes);
          setQuotes(quotesRes);
        }
      } catch {
        if (!ignore) {
          setErrorMessage(
            "Failed to load customer leads from Cloud Firestore. Please verify your internet connection or admin permissions."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadInitialLeads();

    return () => {
      ignore = true;
    };
  }, []);

  const formatDate = (createdAt: unknown): string => {
    if (!createdAt) return "Just now";
    try {
      if (typeof createdAt === "object" && createdAt !== null && "toDate" in createdAt) {
        return (createdAt as { toDate: () => Date }).toDate().toLocaleString();
      }
      if (createdAt instanceof Date) {
        return createdAt.toLocaleString();
      }
      if (typeof createdAt === "string" || typeof createdAt === "number") {
        return new Date(createdAt).toLocaleString();
      }
    } catch {
      return "Recent";
    }
    return "Recent";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Inbox className="w-6 h-6 text-emerald-400" />
            Orders &amp; Customer Inquiries
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time customer submissions stored in Cloud Firestore (<span className="font-mono text-emerald-400">inquiries</span> &amp; <span className="font-mono text-emerald-400">quotes</span>).
          </p>
        </div>

        <button
          onClick={() => fetchLeads()}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-emerald-400" : ""}`} />
          <span>{refreshing ? "Refreshing..." : "Refresh Leads"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "inquiries"
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Consultation Inquiries ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("quotes")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "quotes"
              ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Product Quotes ({quotes.length})</span>
        </button>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => fetchLeads()}
            className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold text-[11px]"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <p className="text-xs text-slate-400">Loading leads from Cloud Firestore...</p>
        </div>
      ) : activeTab === "inquiries" ? (
        /* INQUIRIES TAB */
        inquiries.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-100">No Inquiries Submitted Yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Submissions through the website consultation form will stream directly into Firestore and display here.
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-5 py-3.5">Customer</th>
                    <th className="px-5 py-3.5">Contact</th>
                    <th className="px-5 py-3.5">Inquiry Type</th>
                    <th className="px-5 py-3.5">Message / Requirements</th>
                    <th className="px-5 py-3.5">Received</th>
                    <th className="px-5 py-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-100">{inq.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">ID: {inq.id?.slice(0, 8)}...</div>
                      </td>
                      <td className="px-5 py-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                          <a href={`mailto:${inq.email}`} className="hover:underline text-sky-400">
                            {inq.email}
                          </a>
                        </div>
                        {inq.phone && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                            <a href={`tel:${inq.phone}`} className="hover:underline">
                              {inq.phone}
                            </a>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px] uppercase">
                          {inq.inquiryType}
                        </span>
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                          {inq.message}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-[11px] whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{formatDate(inq.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {inq.status || "new"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        /* QUOTES TAB */
        quotes.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-100">No Product Quotes Submitted Yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Submissions through the product quotation modal will stream directly into Firestore and display here.
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-5 py-3.5">Customer / Company</th>
                    <th className="px-5 py-3.5">Contact</th>
                    <th className="px-5 py-3.5">Product</th>
                    <th className="px-5 py-3.5">Quantity</th>
                    <th className="px-5 py-3.5">Notes</th>
                    <th className="px-5 py-3.5">Received</th>
                    <th className="px-5 py-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-100">{q.fullName}</div>
                        {q.companyName && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                            <Building className="w-3 h-3 text-slate-500" />
                            <span>{q.companyName}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                          <a href={`mailto:${q.email}`} className="hover:underline text-sky-400">
                            {q.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                          <a href={`tel:${q.phone}`} className="hover:underline">
                            {q.phone}
                          </a>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-200">{q.productName}</div>
                      </td>
                      <td className="px-5 py-4 font-mono text-slate-300">
                        {q.quantity} unit(s)
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        <p className="text-slate-400 text-xs line-clamp-2">
                          {q.notes || "None"}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-[11px] whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{formatDate(q.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                          {q.status || "pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
}
