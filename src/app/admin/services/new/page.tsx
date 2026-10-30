"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, Loader2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import { createService } from "@/lib/firebase/services";

export default function AdminNewServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "laptop",
    image: "",
    order: 1,
    isActive: true,
  });

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, name, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      await createService({
        name: formData.name.trim(),
        slug: formData.slug.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: formData.description.trim(),
        icon: formData.icon.trim() || "laptop",
        image: formData.image.trim(),
        order: Number(formData.order) || 1,
        isActive: formData.isActive,
      });

      router.push("/admin/services");
    } catch (err) {
      console.error("Failed to create service in Firestore:", err);
      alert("Error saving service to Firestore. Check permissions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs
        items={[
          { label: "Business" },
          { label: "Services", href: "/admin/services" },
          { label: "New Service" },
        ]}
      />

      <AdminPageHeader
        title="Create Service Package"
        subtitle="Define new IT, security, AMC or consulting service offering in Cloud Firestore."
      >
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 px-4 py-2 border border-outline-variant/40 bg-surface-container rounded-xl text-xs font-bold font-manrope text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Services</span>
        </Link>
      </AdminPageHeader>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6">
          <h3 className="text-base font-extrabold text-on-surface font-manrope border-b border-outline-variant/20 pb-3">
            Service Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Service Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Computer Repair & Maintenance"
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="computer-repair-maintenance"
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Lucide Icon Identifier
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                placeholder="e.g. laptop, video, network, cpu, headphones"
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Display Order Priority (Integer)
              </label>
              <input
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData((prev) => ({ ...prev, order: Number(e.target.value) }))}
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
              Cover Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
              placeholder="https://dada-s-it.vercel.app/images/services/computer-repair.jpg"
              className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
              Full Service Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe scope, features, deliverables, and service commitments..."
              className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/40"
              />
              <span className="text-xs font-bold text-on-surface font-manrope">
                Active in Services Catalog
              </span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/services"
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
                <span>Saving to Firestore...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Service Offering</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
