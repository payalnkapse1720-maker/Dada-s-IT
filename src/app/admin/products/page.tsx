"use client";

import React from "react";
import Link from "next/link";
import { Package, ArrowLeft, Plus, ExternalLink } from "lucide-react";
import { productsData } from "@/data/products";
import type { Product } from "@/types";

export default function AdminProductsPage() {
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
            <Package className="w-6 h-6 text-sky-400" />
            Products Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Active catalog items ({productsData.length} registered products).
          </p>
        </div>

        <button
          onClick={() => alert("Product schema migration to Firestore is scheduled for the next phase.")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-lg shadow-sky-600/20 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {productsData.map((prod: Product) => (
                <tr key={prod.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-100">{prod.name}</div>
                    <div className="text-slate-400 text-[11px] line-clamp-1">{prod.description}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">
                      {prod.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-200">
                    {prod.price || "Contact for Quote"}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active Catalog
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/products/${prod.slug || prod.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 text-xs font-medium"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
