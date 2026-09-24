"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, Loader2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    client: "",
    location: "",
    industry: "Manufacturing & Industrial",
    tag: "Manufacturing",
    description: "",
    challenge: "",
    solution: "",
    image: "",
  });

  const [services, setServices] = useState<string[]>(["Structural Networking"]);
  const [metrics, setMetrics] = useState<{ label: string; value: string }[]>([
    { label: "Uptime SLA", value: "99.98%" },
  ]);

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, title, slug }));
  };

  const handleAddMetric = () => {
    setMetrics((prev) => [...prev, { label: "", value: "" }]);
  };

  const handleMetricChange = (index: number, field: "label" | "value", val: string) => {
    setMetrics((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: val } : m))
    );
  };

  const handleRemoveMetric = (index: number) => {
    setMetrics((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 600));
    setIsSubmitting(false);
    router.push("/admin/projects");
  };

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs
        items={[
          { label: "Business" },
          { label: "Projects", href: "/admin/projects" },
          { label: "New Case Study" },
        ]}
      />

      <AdminPageHeader
        title="Add Case Study"
        subtitle="Document client implementation details, technical metrics, and outcomes."
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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Enterprise Multi-Facility Network Modernization"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Slug (URL Identifier) *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="enterprise-network-modernization"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Client / Organization *
              </label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="e.g. Ador Welding Ltd."
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Pune & Mumbai Facilities"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Industry
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="Heavy Manufacturing / Healthcare / Banking"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Tag (Filter Badge)
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="Manufacturing / Enterprise / Government"
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Hero Image URL *
              </label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
              Executive Summary *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="High-level scope and engineering impact..."
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Engineering Challenge
              </label>
              <textarea
                rows={3}
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="Legacy bottlenecks, security gaps, EMI interference..."
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 font-manrope">
                Architectural Solution
              </label>
              <textarea
                rows={3}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="Armored 10G fiber, AI surveillance mesh, unified NMS..."
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Quantifiable Metrics */}
        <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-on-surface font-manrope">
                Quantifiable Outcomes &amp; Metrics
              </h3>
              <p className="text-xs text-on-surface-variant">
                Highlight statistics (e.g. 99.98% Uptime, 350+ Cameras)
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddMetric}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 hover:bg-surface-container text-xs font-bold text-primary font-manrope cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="space-y-3">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Metric Label (e.g. Uptime SLA)"
                  value={metric.label}
                  onChange={(e) => handleMetricChange(idx, "label", e.target.value)}
                  className="w-1/2 bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Metric Value (e.g. 99.99%)"
                  value={metric.value}
                  onChange={(e) => handleMetricChange(idx, "value", e.target.value)}
                  className="w-1/2 bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMetric(idx)}
                  className="p-2 text-on-surface-variant hover:text-error hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl border border-outline-variant/40 text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Case Study...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Case Study</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
