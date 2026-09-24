"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, Edit3, Trash2, CheckCircle2, XCircle, Star, Package } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { Product } from "@/types";

export default function AdminProductsPage() {
  // Products state - starts empty for Firestore integration, supports future CRUD
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedProductToDelete) return;
    setIsDeleting(true);
    // Prepared for Firestore deleteDoc() in future phase
    setProducts((prev) => prev.filter((p) => p.id !== selectedProductToDelete.id));
    setIsDeleting(false);
    setSelectedProductToDelete(null);
  };

  const columns: Column<Product>[] = [
    {
      header: "Product Name",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">{item.name}</div>
          <div className="text-[11px] text-on-surface-variant font-mono">{item.slug}</div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      className: "font-medium",
    },
    {
      header: "Brand",
      accessor: "brand",
    },
    {
      header: "Stock",
      accessor: (item) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
            item.inStock
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-error border border-error/20"
          }`}
        >
          {item.inStock ? (
            <>
              <CheckCircle2 className="w-3 h-3" />
              <span>In Stock</span>
            </>
          ) : (
            <>
              <XCircle className="w-3 h-3" />
              <span>Out of Stock</span>
            </>
          )}
        </span>
      ),
    },
    {
      header: "Featured",
      accessor: (item) =>
        item.featured ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>Featured</span>
          </span>
        ) : (
          <span className="text-on-surface-variant/50 text-[11px]">—</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Catalog" }, { label: "Products" }]} />

      <AdminPageHeader
        title="Products Management"
        subtitle="Manage hardware catalog, inventory status, and e-commerce product listings."
      >
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </AdminPageHeader>

      <AdminDataTable<Product>
        columns={columns}
        data={products}
        keyExtractor={(p) => p.id}
        searchPlaceholder="Search products by title, category, or brand..."
        searchKeys={["name", "category", "brand", "slug"]}
        emptyTitle="No products in Firestore yet"
        emptyDescription="Your cloud Firestore products collection is ready. Click 'Add Product' to create your first listing."
        emptyActionLabel="Create First Product"
        emptyActionHref="/admin/products/new"
        actions={(item) => (
          <>
            <Link
              href={`/admin/products/${item.id}/edit`}
              className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
              title="Edit Product"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setSelectedProductToDelete(item)}
              className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-red-50 text-on-surface-variant hover:text-error transition-colors"
              title="Delete Product"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      />

      <AdminConfirmDialog
        isOpen={Boolean(selectedProductToDelete)}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProductToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete Product"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setSelectedProductToDelete(null)}
      />
    </div>
  );
}
