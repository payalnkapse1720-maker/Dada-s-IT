"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, Loader2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminLoadingState from "@/components/admin/AdminLoadingState";
import { getProjectById, updateProject } from "@/lib/firebase/projects";

export default function AdminEditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: id,
    clientName: "",
    location: "",
    category: "",
    description: "",
    image: "",
    year: "",
    isFeatured: false,
    isActive: true,
  });

  const [servicesList, setServicesList] = useState<string[]>([]);
  const [techList, setTechList] = useState<string[]>([]);

  useEffect(() => {
    async function loadProject() {
      try {
        const proj = await getProjectById(id);
        if (proj) {
          setFormData({
            title: proj.title || "",
            slug: proj.slug || id,
            clientName: proj.clientName || "",
            location: proj.location || "",
            category: proj.category || "",
            description: proj.description || "",
            image: (proj.images && proj.images[0]) || "",
            year: proj.year || "",
            isFeatured: Boolean(proj.isFeatured),
            isActive: proj.isActive ?? true,
          });
          setServicesList(proj.services || []);
          setTechList(proj.technologies || []);
        }
      } catch (err) {
        console.error("Failed to load project from Firestore:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [id]);

  const handleAddService = () => setServicesList((prev) => [...prev, ""]);
  const handleServiceChange = (idx: number, val: string) =>
    setServicesList((prev) => prev.map((s, i) => (i === idx ? val : s)));
  const handleRemoveService = (idx: number) =>
    setServicesList((prev) => prev.filter((_, i) => i !== idx));

  const handleAddTech = () => setTechList((prev) => [...prev, ""]);
  const handleTechChange = (idx: number, val: string) =>
    setTechList((prev) => prev.map((t, i) => (i === idx ? val : t)));
  const handleRemoveTech = (idx: number) =>
    setTechList((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      await updateProject(id, {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        clientName: formData.clientName.trim(),
        location: formData.location.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        services: servicesList.filter(Boolean),
        images: formData.image.trim() ? [formData.image.trim()] : [],
        technologies: techList.filter(Boolean),
        year: formData.year.trim(),
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
      });

      router.push("/admin/projects");
    } catch (err) {
      console.error("Failed to update project in Firestore:", err);
      alert("Error updating project in Firestore. Check permissions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <AdminLoadingState message="Fetching case study from Cloud Firestore..." />;
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs
        items={[
          { label: "Business" },
          { label: "Projects", href: "/admin/projects" },
          { label: `Edit: ${id}` },
        ]}
      />

      <AdminPageHeader
        title="Edit Case Study"
        subtitle={`Editing deployment record ID: ${id}`}
      >
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-4 py-2 border border-outline-variant/40 bg-surface-container rounded-xl text-xs font-bold font-manrope text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
      </AdminPageHeader>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6">
          <h3 className="text-base font-extrabold text-on-surface font-manrope border-b border-outline-variant/20 pb-3">
            Case Study Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Client Organization Name
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Deployment Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Industry Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Deployment Year
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
              Full Project Description &amp; Scope
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/40"
              />
              <span className="text-xs font-bold text-on-surface font-manrope">
                Featured Case Study on Homepage
              </span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/40"
              />
              <span className="text-xs font-bold text-on-surface font-manrope">
                Active in Portfolio
              </span>
            </label>
          </div>
        </div>

        {/* Services & Tech list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="surface-card p-6 rounded-3xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-on-surface font-manrope">Services Rendered</h4>
              <button
                type="button"
                onClick={handleAddService}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Service
              </button>
            </div>
            {servicesList.map((srv, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={srv}
                  onChange={(e) => handleServiceChange(idx, e.target.value)}
                  className="flex-1 bg-white border border-outline-variant/40 rounded-xl px-3 py-1.5 text-xs text-on-surface"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveService(idx)}
                  className="p-1.5 text-error hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="surface-card p-6 rounded-3xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-on-surface font-manrope">Technologies Deployed</h4>
              <button
                type="button"
                onClick={handleAddTech}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Tech
              </button>
            </div>
            {techList.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => handleTechChange(idx, e.target.value)}
                  className="flex-1 bg-white border border-outline-variant/40 rounded-xl px-3 py-1.5 text-xs text-on-surface"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTech(idx)}
                  className="p-1.5 text-error hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/projects"
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
                <span>Update Case Study</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
