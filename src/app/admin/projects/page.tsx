"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, Edit3, Trash2, FolderGit2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { Project } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<Project | null>(null);

  const columns: Column<Project>[] = [
    {
      header: "Project Title",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">{item.title}</div>
          <div className="text-[11px] text-on-surface-variant font-mono">{item.slug}</div>
        </div>
      ),
    },
    {
      header: "Client",
      accessor: "client",
      className: "font-semibold",
    },
    {
      header: "Industry",
      accessor: "industry",
    },
    {
      header: "Location",
      accessor: "location",
    },
    {
      header: "Tag",
      accessor: (item) => (
        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold text-[11px]">
          {item.tag}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Business" }, { label: "Projects" }]} />

      <AdminPageHeader
        title="Portfolio &amp; Case Studies"
        subtitle="Manage client case studies, engineering deployments, and proven track record."
      >
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Project</span>
        </Link>
      </AdminPageHeader>

      <AdminDataTable<Project>
        columns={columns}
        data={projects}
        keyExtractor={(p) => p.id}
        searchPlaceholder="Search case studies by client, title, industry..."
        searchKeys={["title", "client", "industry", "location", "tag"]}
        emptyTitle="No case studies in Firestore yet"
        emptyDescription="Add enterprise deployments to showcase verified engineering success."
        emptyActionLabel="Add First Case Study"
        emptyActionHref="/admin/projects/new"
        actions={(item) => (
          <>
            <Link
              href={`/admin/projects/${item.id}/edit`}
              className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setSelectedToDelete(item)}
              className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-red-50 text-on-surface-variant hover:text-error transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      />

      <AdminConfirmDialog
        isOpen={Boolean(selectedToDelete)}
        title="Delete Case Study"
        message={`Are you sure you want to delete case study "${selectedToDelete?.title}"?`}
        onConfirm={() => {
          setProjects((prev) => prev.filter((p) => p.id !== selectedToDelete?.id));
          setSelectedToDelete(null);
        }}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
