"use client";

import React, { useState } from "react";
import { PlusCircle, Building2, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { Industry } from "@/types";

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<Industry | null>(null);

  const columns: Column<Industry>[] = [
    {
      header: "Industry Sector",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">{item.name}</div>
          <div className="text-[11px] text-on-surface-variant font-mono">{item.slug}</div>
        </div>
      ),
    },
    {
      header: "Headline",
      accessor: "headline",
    },
    {
      header: "Benefits Count",
      accessor: (item) => `${item.keyBenefits?.length || 0} benefits`,
    },
    {
      header: "Solutions Provided",
      accessor: (item) => `${item.solutionsProvided?.length || 0} solutions`,
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Business" }, { label: "Industries" }]} />

      <AdminPageHeader
        title="Industries Management"
        subtitle="Manage targeted industry verticals, customized benefits, and domain solutions."
      />

      <AdminDataTable<Industry>
        columns={columns}
        data={industries}
        keyExtractor={(i) => i.id}
        searchPlaceholder="Search industries by name or headline..."
        searchKeys={["name", "slug", "headline", "description"]}
        emptyTitle="No industries configured in Firestore yet"
        emptyDescription="Add customized industry profiles (Manufacturing, Healthcare, Banking, Real Estate, etc.)."
        emptyActionLabel="Create Industry Vertical"
        onAction={() => alert("Industry creation form will connect in Firestore phase.")}
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
        title="Delete Industry Profile"
        message={`Are you sure you want to delete industry profile "${selectedToDelete?.name}"?`}
        onConfirm={() => {
          setIndustries((prev) => prev.filter((i) => i.id !== selectedToDelete?.id));
          setSelectedToDelete(null);
        }}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
