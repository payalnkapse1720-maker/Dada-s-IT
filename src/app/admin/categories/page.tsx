"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Layers, Loader2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminLoadingState from "@/components/admin/AdminLoadingState";
import { CategoryDoc } from "@/types";
import {
  subscribeCategories,
  createCategory,
  deleteCategory,
} from "@/lib/firebase/categories";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<CategoryDoc | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeCategories(
      (data) => {
        setCategories(data);
        setIsLoading(false);
      },
      (err) => {
        console.error("Failed to load categories:", err);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setIsSaving(true);
    try {
      const generatedSlug = newCategoryName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      await createCategory({
        name: newCategoryName.trim(),
        slug: generatedSlug,
        description: newCategoryDesc.trim() || `${newCategoryName.trim()} products and solutions.`,
        image: "",
        icon: "package",
        isActive: true,
        order: categories.length + 1,
      });

      setNewCategoryName("");
      setNewCategoryDesc("");
      setIsAdding(false);
    } catch (err) {
      console.error("Failed to create category:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedToDelete) return;
    try {
      await deleteCategory(selectedToDelete.categoryId);
      setSelectedToDelete(null);
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  const columns: Column<CategoryDoc>[] = [
    {
      header: "Category ID & Name",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">{item.name}</div>
          <div className="text-[11px] text-on-surface-variant font-mono">{item.categoryId}</div>
        </div>
      ),
    },
    {
      header: "Slug",
      accessor: (item) => <span className="font-mono text-on-surface-variant text-xs">{item.slug}</span>,
    },
    {
      header: "Description",
      accessor: (item) => (
        <span className="text-xs text-on-surface-variant line-clamp-1 max-w-xs">
          {item.description || "—"}
        </span>
      ),
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
    return <AdminLoadingState message="Loading catalog categories from Firestore..." />;
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Catalog" }, { label: "Categories" }]} />

      <AdminPageHeader
        title="Product Categories"
        subtitle="Organize product catalog into hierarchical taxonomies and filter tags in Cloud Firestore."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              autoFocus
              placeholder="e.g. Fiber Optic Accessories"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Optional description..."
              value={newCategoryDesc}
              onChange={(e) => setNewCategoryDesc(e.target.value)}
              className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 font-manrope cursor-pointer flex items-center gap-1.5"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Save Category</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-outline-variant/40 text-xs font-bold rounded-xl hover:bg-surface-container font-manrope cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <AdminDataTable<CategoryDoc>
        columns={columns}
        data={categories}
        keyExtractor={(c) => c.categoryId}
        searchPlaceholder="Search categories..."
        searchKeys={["name", "slug", "description", "categoryId"]}
        emptyTitle="No categories found in Firestore"
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
        message={`Are you sure you want to delete "${selectedToDelete?.name}" (${selectedToDelete?.categoryId})?`}
        onConfirm={handleDelete}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
