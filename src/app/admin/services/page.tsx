"use client";

import React from "react";
import Link from "next/link";
import { Wrench, ArrowLeft, Plus, ExternalLink } from "lucide-react";
import { servicesData } from "@/data/services";
import type { Service } from "@/types";

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
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
            <Wrench className="w-6 h-6 text-cyan-400" />
            Services Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise infrastructure and AMC solutions ({servicesData.length} active services).
          </p>
        </div>

        <button
          onClick={() => alert("Service schema migration to Firestore is scheduled for the next phase.")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servicesData.map((srv: Service) => (
          <div
            key={srv.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100">{srv.title}</h3>
                <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wide">
                  ID: {srv.id}
                </span>
              </div>
              <Link
                href={`/services/${srv.slug || srv.id}`}
                target="_blank"
                className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 text-xs"
              >
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {srv.shortDescription}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>{srv.features?.length || 0} Features listed</span>
              <span className="text-emerald-400 font-medium">Published</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
