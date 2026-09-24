"use client";

import React, { useState } from "react";
import { PlusCircle, Edit3, Trash2, Layers } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<CategoryItem | null>(null);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: newCategoryName.trim(),
      slug: newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      productCount: 0,
    };
    setCategories((prev) => [...prev, newCat]);
    setNewCategoryName("");
    setIsAdding(false);
  };

  const columns: Column<CategoryItem>[] = [
    {
      header: "Category Name",
      accessor: (item) => (
        <div className="font-bold text-on-surface">{item.name}</div>
      ),
    },
    {
      header: "Slug",
      accessor: (item) => <span className="font-mono text-on-surface-variant">{item.slug}</span>,
    },
    {
      header: "Active Products",
      accessor: (item) => (
        <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-bold text-on-surface text-[11px]">
          {item.productCount} Products
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Catalog" }, { label: "Categories" }]} />

      <AdminPageHeader
        title="Product Categories"
        subtitle="Organize product catalog into hierarchical taxonomies and filter tags."
      >
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </AdminPageHeader>

      {isAdding && (
        <form
          onSubmit={handleAddCategory}
          className="surface-card p-6 rounded-2xl border border-primary/40 bg-primary/5 space-y-4"
        >
          <h4 className="text-sm font-bold text-primary font-manrope">
            Add New Product Category
          </h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              autoFocus
              placeholder="e.g. Fiber Optic Accessories"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1 bg-white border border-outline-variant/40 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 font-manrope cursor-pointer"
              >
                Save Category
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-outline-variant/40 text-xs font-bold rounded-xl hover:bg-surface-container font-manrope cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <AdminDataTable<CategoryItem>
        columns={columns}
        data={categories}
        keyExtractor={(c) => c.id}
        searchPlaceholder="Search categories..."
        searchKeys={["name", "slug"]}
        emptyTitle="No categories created yet"
        emptyDescription="Create categories to organize your hardware products for client navigation."
        emptyActionLabel="Create Category"
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
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedToDelete?.name}"?`}
        onConfirm={() => {
          setCategories((prev) => prev.filter((c) => c.id !== selectedToDelete?.id));
          setSelectedToDelete(null);
        }}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
