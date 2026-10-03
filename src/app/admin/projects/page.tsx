"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Edit3, Trash2, FolderGit2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminLoadingState from "@/components/admin/AdminLoadingState";
import { ProjectDoc } from "@/types";
import { subscribeProjects, deleteProject } from "@/lib/firebase/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedToDelete, setSelectedToDelete] = useState<ProjectDoc | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeProjects(
      (data) => {
        setProjects(data);
        setIsLoading(false);
      },
      (err) => {
        console.error("Failed to load projects from Firestore:", err);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    if (!selectedToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProject(selectedToDelete.projectId);
      setSelectedToDelete(null);
    } catch (err) {
      console.error("Failed to delete project:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<ProjectDoc>[] = [
    {
      header: "Project & Client",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">{item.title}</div>
          <div className="text-[11px] text-on-surface-variant font-mono">
            {item.projectId} • {item.clientName || "—"}
          </div>
        </div>
      ),
    },
    {
      header: "Location",
      accessor: (item) => item.location || "—",
    },
    {
      header: "Category",
      accessor: (item) => (
        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold text-[11px]">
          {item.category || "Enterprise"}
        </span>
      ),
    },
    {
      header: "Year",
      accessor: (item) => item.year || "—",
    },
    {
      header: "Status",
      accessor: (item) => (
        <span
          className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
            item.isActive !== false
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.isActive !== false ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <AdminLoadingState message="Loading case studies from Cloud Firestore..." />;
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Business" }, { label: "Projects" }]} />

      <AdminPageHeader
        title="Portfolio &amp; Case Studies"
        subtitle="Manage client case studies, engineering deployments, and proven track record in Cloud Firestore."
      >
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Project</span>
        </Link>
      </AdminPageHeader>

      <AdminDataTable<ProjectDoc>
        columns={columns}
        data={projects}
        keyExtractor={(p) => p.projectId}
        searchPlaceholder="Search case studies by client, title, industry, or ID..."
        searchKeys={["title", "clientName", "category", "location", "projectId"]}
        emptyTitle="No case studies in Firestore yet"
        emptyDescription="Add enterprise deployments to showcase verified engineering success."
        emptyActionLabel="Add First Case Study"
        emptyActionHref="/admin/projects/new"
        actions={(item) => (
          <>
            <Link
              href={`/admin/projects/${item.projectId}/edit`}
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
        message={`Are you sure you want to delete case study "${selectedToDelete?.title}" (${selectedToDelete?.projectId})?`}
        onConfirm={handleDelete}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
