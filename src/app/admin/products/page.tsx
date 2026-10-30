"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Edit3, Trash2, CheckCircle2, XCircle, Star, Package } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminLoadingState from "@/components/admin/AdminLoadingState";
import { ProductDoc } from "@/types";
import { subscribeProducts, deleteProduct } from "@/lib/firebase/products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState<ProductDoc | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeProducts(
      (data) => {
        setProducts(data);
        setIsLoading(false);
      },
      (err) => {
        console.error("Failed to load products from Firestore:", err);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    if (!selectedProductToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProduct(selectedProductToDelete.productId);
      setSelectedProductToDelete(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<ProductDoc>[] = [
    {
      header: "Product & Model",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">{item.name}</div>
          <div className="text-[11px] text-on-surface-variant font-mono">{item.productId} • {item.slug}</div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (item) => (
        <span className="font-medium text-xs text-on-surface-variant">
          {item.categoryName || item.categoryId}
        </span>
      ),
    },
    {
      header: "Brand",
      accessor: (item) => item.brand || "—",
    },
    {
      header: "Availability",
      accessor: (item) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
            item.availability === "in_stock" || (item.stockQuantity && item.stockQuantity > 0)
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-error border border-error/20"
          }`}
        >
          {item.availability === "in_stock" || (item.stockQuantity && item.stockQuantity > 0) ? (
            <>
              <CheckCircle2 className="w-3 h-3" />
              <span>In Stock ({item.stockQuantity || 0})</span>
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
        item.isFeatured ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>Featured</span>
          </span>
        ) : (
          <span className="text-on-surface-variant/50 text-[11px]">—</span>
        ),
    },
  ];

  if (isLoading) {
    return <AdminLoadingState message="Loading product catalogue from Firestore..." />;
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Catalog" }, { label: "Products" }]} />

      <AdminPageHeader
        title="Products Management"
        subtitle="Manage hardware catalog, inventory status, and e-commerce product listings in Cloud Firestore."
      >
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </AdminPageHeader>

      <AdminDataTable<ProductDoc>
        columns={columns}
        data={products}
        keyExtractor={(p) => p.productId}
        searchPlaceholder="Search products by model, brand, category or ID..."
        searchKeys={["name", "categoryName", "brand", "slug", "productId"]}
        emptyTitle="No products found in Firestore"
        emptyDescription="Add enterprise networking, CCTV, or server products to your catalog."
        emptyActionLabel="Add First Product"
        emptyActionHref="/admin/products/new"
        actions={(item) => (
          <>
            <Link
              href={`/admin/products/${item.productId}/edit`}
              className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setSelectedProductToDelete(item)}
              className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-red-50 text-on-surface-variant hover:text-error transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      />

      <AdminConfirmDialog
        isOpen={Boolean(selectedProductToDelete)}
        title="Delete Product"
        message={`Are you sure you want to delete product "${selectedProductToDelete?.name}" (${selectedProductToDelete?.productId})? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setSelectedProductToDelete(null)}
      />
    </div>
  );
}
