"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, Edit3, Trash2, Wrench, Shield } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { Service } from "@/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<Service | null>(null);

  const columns: Column<Service>[] = [
    {
      header: "Service Title",
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
        <span className="capitalize px-2.5 py-0.5 rounded-full bg-surface-container font-semibold text-[11px]">
          {item.category}
        </span>
      ),
    },
    {
      header: "SLA Commitment",
      accessor: (item) => (
        <span className="font-medium text-primary text-xs">{item.sla}</span>
      ),
    },
    {
      header: "Features",
      accessor: (item) => `${item.features?.length || 0} items`,
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Business" }, { label: "Services" }]} />

      <AdminPageHeader
        title="Services Management"
        subtitle="Configure infrastructure, security, and facility AMC service offerings."
      >
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Service</span>
        </Link>
      </AdminPageHeader>

      <AdminDataTable<Service>
        columns={columns}
        data={services}
        keyExtractor={(s) => s.id}
        searchPlaceholder="Search services by title, category, or slug..."
        searchKeys={["title", "category", "slug", "shortDescription"]}
        emptyTitle="No services in Firestore yet"
        emptyDescription="Create your first enterprise service offering or package."
        emptyActionLabel="Add Service Package"
        emptyActionHref="/admin/services/new"
        actions={(item) => (
          <>
            <Link
              href={`/admin/services/${item.id}/edit`}
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
        title="Delete Service"
        message={`Are you sure you want to delete service "${selectedToDelete?.title}"?`}
        onConfirm={() => {
          setServices((prev) => prev.filter((s) => s.id !== selectedToDelete?.id));
          setSelectedToDelete(null);
        }}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
