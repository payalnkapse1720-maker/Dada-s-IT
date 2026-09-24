"use client";

import React, { useState } from "react";
import { PlusCircle, MessageSquareQuote, Star, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";

interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  designation: string;
  feedback: string;
  rating: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<TestimonialItem | null>(null);

  const columns: Column<TestimonialItem>[] = [
    {
      header: "Client & Company",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">{item.clientName}</div>
          <div className="text-[11px] text-on-surface-variant font-medium">
            {item.designation}, {item.company}
          </div>
        </div>
      ),
    },
    {
      header: "Feedback",
      accessor: (item) => (
        <p className="line-clamp-2 text-xs text-on-surface-variant italic max-w-md">
          &ldquo;{item.feedback}&rdquo;
        </p>
      ),
    },
    {
      header: "Rating",
      accessor: (item) => (
        <div className="flex items-center gap-1 text-amber-500">
          <Star className="w-3.5 h-3.5 fill-amber-500" />
          <span className="font-bold text-xs text-on-surface">{item.rating}.0</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Content" }, { label: "Testimonials" }]} />

      <AdminPageHeader
        title="Client Testimonials &amp; Reviews"
        subtitle="Manage verified customer endorsements, SLA satisfaction reviews, and executive quotes."
      />

      <AdminDataTable<TestimonialItem>
        columns={columns}
        data={testimonials}
        keyExtractor={(t) => t.id}
        searchPlaceholder="Search testimonials..."
        searchKeys={["clientName", "company", "feedback"]}
        emptyTitle="No testimonials in Firestore yet"
        emptyDescription="Client reviews and executive testimonials will be managed here once connected to Firestore."
        emptyActionLabel="Add Testimonial"
        onAction={() => alert("Testimonial modal will connect in Firestore phase.")}
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
        title="Delete Testimonial"
        message={`Are you sure you want to delete testimonial from "${selectedToDelete?.clientName}"?`}
        onConfirm={() => {
          setTestimonials((prev) => prev.filter((t) => t.id !== selectedToDelete?.id));
          setSelectedToDelete(null);
        }}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
