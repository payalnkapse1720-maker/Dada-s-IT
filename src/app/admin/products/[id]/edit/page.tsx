"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, Loader2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminLoadingState from "@/components/admin/AdminLoadingState";
import { getProductById, updateProduct } from "@/lib/firebase/products";
import { getCategories } from "@/lib/firebase/categories";
import { CategoryDoc } from "@/types";

export default function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoriesList, setCategoriesList] = useState<CategoryDoc[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    categoryId: "cat_001",
    categoryName: "Computers & Laptops",
    brand: "",
    price: 0,
    mrp: 0,
    discount: 0,
    currency: "INR",
    sku: "",
    description: "",
    shortDescription: "",
    image: "",
    availability: "in_stock" as "in_stock" | "out_of_stock" | "on_order",
    stockQuantity: 0,
    condition: "new" as "new" | "refurbished",
    warranty: "",
    featured: false,
    isActive: true,
  });

  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, product] = await Promise.all([
          getCategories(),
          getProductById(id),
        ]);

        if (cats.length > 0) {
          setCategoriesList(cats);
        }

        if (product) {
          setFormData({
            name: product.name || "",
            slug: product.slug || id,
            categoryId: product.categoryId || "cat_001",
            categoryName: product.categoryName || "",
            brand: product.brand || "",
            price: product.price || 0,
            mrp: product.mrp || 0,
            discount: product.discount || 0,
            currency: product.currency || "INR",
            sku: product.sku || "",
            description: product.description || "",
            shortDescription: product.shortDescription || "",
            image: product.thumbnail || (product.images && product.images[0]) || "",
            availability: product.availability || "in_stock",
            stockQuantity: product.stockQuantity || 0,
            condition: product.condition || "new",
            warranty: product.warranty || "",
            featured: Boolean(product.isFeatured),
            isActive: product.isActive ?? true,
          });

          if (product.specifications) {
            const specEntries = Object.entries(product.specifications).map(([key, value]) => ({
              key,
              value: String(value),
            }));
            setSpecs(specEntries);
          }
        }
      } catch (err) {
        console.error("Failed to load product details from Firestore:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleCategoryChange = (categoryId: string) => {
    const found = categoriesList.find((c) => c.categoryId === categoryId);
    setFormData((prev) => ({
      ...prev,
      categoryId,
      categoryName: found ? found.name : prev.categoryName,
    }));
  };

  const handleAddSpec = () => {
    setSpecs((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    setSpecs((prev) =>
      prev.map((spec, idx) => (idx === index ? { ...spec, [field]: value } : spec))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      const specificationsMap: Record<string, string> = {};
      specs.forEach((s) => {
        if (s.key.trim()) specificationsMap[s.key.trim()] = s.value.trim();
      });

      await updateProduct(id, {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        brand: formData.brand.trim(),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim(),
        price: Number(formData.price) || 0,
        mrp: Number(formData.mrp) || 0,
        discount: Number(formData.discount) || 0,
        currency: formData.currency,
        sku: formData.sku.trim(),
        images: formData.image.trim() ? [formData.image.trim()] : [],
        thumbnail: formData.image.trim(),
        specifications: specificationsMap,
        availability: formData.availability,
        stockQuantity: Number(formData.stockQuantity) || 0,
        condition: formData.condition,
        warranty: formData.warranty.trim(),
        isFeatured: formData.featured,
        isActive: formData.isActive,
      });

      router.push("/admin/products");
    } catch (err) {
      console.error("Failed to update product in Firestore:", err);
      alert("Error updating product in Firestore. Check permissions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <AdminLoadingState message="Fetching product from Cloud Firestore..." />;
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs
        items={[
          { label: "Catalog" },
          { label: "Products", href: "/admin/products" },
          { label: `Edit: ${id}` },
        ]}
      />

      <AdminPageHeader
        title="Edit Product"
        subtitle={`Updating Cloud Firestore product document (${id})`}
      >
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 px-4 py-2 border border-outline-variant/40 bg-surface-container rounded-xl text-xs font-bold font-manrope text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
      </AdminPageHeader>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6">
          <h3 className="text-base font-extrabold text-on-surface font-manrope border-b border-outline-variant/20 pb-3">
            General Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                Product Title / Model Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                Category *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categoriesList.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name} ({cat.categoryId})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                OEM / Brand Manufacturer
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                SKU / Part Number
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData((prev) => ({ ...prev, sku: e.target.value }))}
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                Stock &amp; Availability
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData((prev) => ({ ...prev, stockQuantity: Number(e.target.value) }))}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value as any }))}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="on_order">On Order</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
              className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              Full Product Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/40"
              />
              <span className="text-xs font-bold text-on-surface font-manrope">
                Mark as Featured Product
              </span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/40"
              />
              <span className="text-xs font-bold text-on-surface font-manrope">
                Active in Catalog
              </span>
            </label>
          </div>
        </div>

        {/* Technical Specs Key-Value */}
        <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-on-surface font-manrope">
              Technical Specifications (Key-Value)
            </h3>
            <button
              type="button"
              onClick={handleAddSpec}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/40 bg-surface-container text-xs font-bold font-manrope text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-primary" />
              <span>Add Spec Row</span>
            </button>
          </div>

          <div className="space-y-3">
            {specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Key (e.g. Ports, Throughput)"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                  className="w-1/3 bg-white border border-outline-variant/40 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 48x GbE PoE+ 370W)"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                  className="flex-1 bg-white border border-outline-variant/40 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(index)}
                  className="p-2 rounded-xl text-on-surface-variant hover:text-error hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/products"
            className="px-6 py-2.5 border border-outline-variant/40 text-xs font-bold rounded-xl hover:bg-surface-container font-manrope"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 font-manrope shadow-md flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating in Firestore...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Update Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
