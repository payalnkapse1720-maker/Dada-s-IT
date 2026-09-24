"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, BookOpen, Trash2, Edit3, Calendar } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { InsightArticle } from "@/types";

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<InsightArticle[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<InsightArticle | null>(null);

  const columns: Column<InsightArticle>[] = [
    {
      header: "Article Title",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">{item.title}</div>
          <div className="text-[11px] text-on-surface-variant font-mono">{item.slug}</div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (item) => (
        <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-semibold text-[11px]">
          {item.category}
        </span>
      ),
    },
    {
      header: "Author",
      accessor: (item) => item.author?.name || "Dada Editorial",
    },
    {
      header: "Publish Date",
      accessor: (item) => (
        <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px]">
          <Calendar className="w-3 h-3" />
          <span>{item.publishDate || "Draft"}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Content" }, { label: "Blog & Insights" }]} />

      <AdminPageHeader
        title="Technical Insights &amp; Articles"
        subtitle="Publish engineering whitepapers, cybersecurity best practices, and IT guides."
      >
        <button
          onClick={() => alert("Article creation editor will connect in Firestore phase.")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </AdminPageHeader>

      <AdminDataTable<InsightArticle>
        columns={columns}
        data={articles}
        keyExtractor={(a) => a.id}
        searchPlaceholder="Search articles..."
        searchKeys={["title", "slug", "category", "excerpt"]}
        emptyTitle="No published articles in Firestore yet"
        emptyDescription="Create thought leadership articles to boost SEO and educate enterprise clients."
        emptyActionLabel="Write First Article"
        onAction={() => alert("Article editor will connect in Firestore phase.")}
        actions={(item) => (
          <button
            onClick={() => setSelectedToDelete(item)}
            className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-red-50 text-on-surface-variant hover:text-error transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      />

      <AdminConfirmDialog
        isOpen={Boolean(selectedToDelete)}
        title="Delete Article"
        message={`Are you sure you want to delete "${selectedToDelete?.title}"?`}
        onConfirm={() => {
          setArticles((prev) => prev.filter((a) => a.id !== selectedToDelete?.id));
          setSelectedToDelete(null);
        }}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
