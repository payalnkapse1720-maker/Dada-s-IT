"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Edit3, Trash2, Wrench, Shield } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminLoadingState from "@/components/admin/AdminLoadingState";
import { ServiceDoc } from "@/types";
import { subscribeServices, deleteService } from "@/lib/firebase/services";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedToDelete, setSelectedToDelete] = useState<ServiceDoc | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeServices(
      (data) => {
        setServices(data);
        setIsLoading(false);
      },
      (err) => {
        console.error("Failed to load services from Firestore:", err);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    if (!selectedToDelete) return;
    setIsDeleting(true);
    try {
      await deleteService(selectedToDelete.serviceId);
      setSelectedToDelete(null);
    } catch (err) {
      console.error("Failed to delete service:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<ServiceDoc>[] = [
    {
      header: "Service ID & Name",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">{item.name}</div>
          <div className="text-[11px] text-on-surface-variant font-mono">{item.serviceId} • {item.slug}</div>
        </div>
      ),
    },
    {
      header: "Icon",
      accessor: (item) => (
        <span className="capitalize px-2.5 py-0.5 rounded-full bg-surface-container font-semibold text-[11px]">
          {item.icon || "laptop"}
        </span>
      ),
    },
    {
      header: "Order",
      accessor: (item) => (
        <span className="font-mono text-xs text-on-surface-variant">#{item.order}</span>
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
    return <AdminLoadingState message="Loading services offerings from Cloud Firestore..." />;
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Business" }, { label: "Services" }]} />

      <AdminPageHeader
        title="Services Management"
        subtitle="Configure IT repair, CCTV, networking, AMC and consulting service offerings in Cloud Firestore."
      >
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Service</span>
        </Link>
      </AdminPageHeader>

      <AdminDataTable<ServiceDoc>
        columns={columns}
        data={services}
        keyExtractor={(s) => s.serviceId}
        searchPlaceholder="Search services by title, slug, or ID..."
        searchKeys={["name", "slug", "serviceId", "description"]}
        emptyTitle="No services in Firestore yet"
        emptyDescription="Create your first enterprise service offering or package."
        emptyActionLabel="Add Service Package"
        emptyActionHref="/admin/services/new"
        actions={(item) => (
          <>
            <Link
              href={`/admin/services/${item.serviceId}/edit`}
              className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setSelectedToDelete(item)}
              className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-red-50 text-on-surface-variant hover:text-error transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      />

      <AdminConfirmDialog
        isOpen={Boolean(selectedToDelete)}
        title="Delete Service"
        message={`Are you sure you want to delete service "${selectedToDelete?.name}" (${selectedToDelete?.serviceId})?`}
        onConfirm={handleDelete}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
