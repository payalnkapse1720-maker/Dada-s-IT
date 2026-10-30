"use client";

import React, { useState } from "react";
import { PlusCircle, Award, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";

interface PartnerItem {
  id: string;
  name: string;
  category: "client" | "tech";
}

export default function AdminBrandsPage() {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<PartnerItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<"client" | "tech">("tech");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setPartners((prev) => [
      ...prev,
      { id: `brand-${Date.now()}`, name: newName.trim(), category: newCategory },
    ]);
    setNewName("");
    setIsAdding(false);
  };

  const columns: Column<PartnerItem>[] = [
    {
      header: "Brand / Partner Name",
      accessor: (item) => <div className="font-bold text-on-surface">{item.name}</div>,
    },
    {
      header: "Type",
      accessor: (item) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
            item.category === "tech"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-purple-50 text-purple-700 border border-purple-200"
          }`}
        >
          {item.category === "tech" ? "Technology OEM" : "Enterprise Client"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Business" }, { label: "Brands & Partners" }]} />

      <AdminPageHeader
        title="Brands &amp; Strategic Partners"
        subtitle="Manage trusted technology OEM hardware manufacturers and enterprise clients."
      >
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Partner</span>
        </button>
      </AdminPageHeader>

      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="surface-card p-6 rounded-2xl border border-primary/40 bg-primary/5 space-y-4"
        >
          <h4 className="text-sm font-bold text-primary font-manrope">
            Add New Partner / Brand
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <input
              type="text"
              autoFocus
              placeholder="Brand Name (e.g. Ubiquiti Networks)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="sm:col-span-7 bg-white border border-outline-variant/40 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as "client" | "tech")}
              className="sm:col-span-3 bg-white border border-outline-variant/40 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-medium"
            >
              <option value="tech">Technology OEM</option>
              <option value="client">Enterprise Client</option>
            </select>
            <div className="sm:col-span-2 flex items-center gap-2">
              <button
                type="submit"
                className="w-full py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 font-manrope cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="py-2 px-3 border border-outline-variant/40 text-xs font-bold rounded-xl hover:bg-surface-container font-manrope cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <AdminDataTable<PartnerItem>
        columns={columns}
        data={partners}
        keyExtractor={(p) => p.id}
        searchPlaceholder="Search brands..."
        searchKeys={["name", "category"]}
        emptyTitle="No partners configured in Firestore yet"
        emptyDescription="Add OEM brands (Cisco, Hikvision, Dell) or corporate client logos."
        emptyActionLabel="Add First Brand"
        onAction={() => setIsAdding(true)}
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
        title="Delete Brand"
        message={`Are you sure you want to delete brand "${selectedToDelete?.name}"?`}
        onConfirm={() => {
          setPartners((prev) => prev.filter((p) => p.id !== selectedToDelete?.id));
          setSelectedToDelete(null);
        }}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
