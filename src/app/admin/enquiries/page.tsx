"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, Calendar, Trash2, Eye, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminLoadingState from "@/components/admin/AdminLoadingState";
import { EnquiryRecord, EnquiryStatus } from "@/types";
import {
  subscribeEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "@/lib/firebase/enquiries";
import { formatFirestoreDate } from "@/lib/utils";

const ENQUIRY_STATUSES: { value: EnquiryStatus; label: string; color: string }[] = [
  { value: "new", label: "New Lead", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "contacted", label: "Contacted", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "in-progress", label: "In Progress", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "converted", label: "Converted", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { value: "closed", label: "Closed", color: "bg-gray-100 text-gray-700 border-gray-300" },
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedToDelete, setSelectedToDelete] = useState<EnquiryRecord | null>(null);
  const [selectedToView, setSelectedToView] = useState<EnquiryRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setFetchError(null);

    const unsubscribe = subscribeEnquiries(
      (data) => {
        setEnquiries(data);
        setIsLoading(false);
      },
      (err) => {
        console.error("Enquiries subscription error:", err);
        setFetchError("Unable to load enquiries from Firestore. Check permissions or network.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    setIsUpdatingStatus(true);
    try {
      await updateEnquiryStatus(id, newStatus);
      if (selectedToView && selectedToView.id === id) {
        setSelectedToView((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedToDelete) return;
    setIsDeleting(true);
    try {
      await deleteEnquiry(selectedToDelete.id);
      setSelectedToDelete(null);
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<EnquiryRecord>[] = [
    {
      header: "Lead Contact",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">
            {item.firstName} {item.lastName}
          </div>
          <div className="text-[11px] text-on-surface-variant flex flex-wrap items-center gap-2 mt-0.5">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-primary" />
              {item.email}
            </span>
            {item.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-primary" />
                {item.phone}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: (item) => (
        <span className="uppercase px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold text-[10px]">
          {item.inquiryType}
        </span>
      ),
    },
    {
      header: "Submitted Message",
      accessor: (item) => (
        <p className="line-clamp-2 text-xs text-on-surface-variant max-w-sm">
          {item.message}
        </p>
      ),
    },
    {
      header: "Date",
      accessor: (item) => (
        <div className="flex items-center gap-1 text-[11px] text-on-surface-variant whitespace-nowrap">
          <Calendar className="w-3 h-3 text-on-surface-variant/70" />
          <span>{formatFirestoreDate(item.createdAt)}</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (item) => {
        const currentStatusConfig =
          ENQUIRY_STATUSES.find((s) => s.value === item.status) || ENQUIRY_STATUSES[0];

        return (
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(item.id, e.target.value as EnquiryStatus)}
            disabled={isUpdatingStatus}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${currentStatusConfig.color}`}
          >
            {ENQUIRY_STATUSES.map((statusOpt) => (
              <option key={statusOpt.value} value={statusOpt.value}>
                {statusOpt.label}
              </option>
            ))}
          </select>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "Leads" }, { label: "Enquiries" }]} />

      <AdminPageHeader
        title="Consultation Inquiries &amp; Leads"
        subtitle="Real-time client consultation tickets, facility AMC inquiries, and partnership requests from Firestore."
      />

      {fetchError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-error/20 text-error text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{fetchError}</span>
        </div>
      )}

      {isLoading ? (
        <AdminLoadingState message="Connecting to Firestore &amp; fetching live inquiries..." />
      ) : (
        <AdminDataTable<EnquiryRecord>
          columns={columns}
          data={enquiries}
          keyExtractor={(e) => e.id}
          searchPlaceholder="Search leads by name, email, phone, or message..."
          searchKeys={["firstName", "lastName", "email", "phone", "message", "inquiryType"]}
          emptyTitle="No enquiries yet"
          emptyDescription="When prospective enterprise clients submit the Consultation Form, leads will automatically populate here in real-time."
          actions={(item) => (
            <>
              <button
                onClick={() => setSelectedToView(item)}
                className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                title="View Full Details"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSelectedToDelete(item)}
                className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-red-50 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                title="Delete Inquiry"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        />
      )}

      {/* View Lead Detail Modal */}
      {selectedToView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-outline-variant/30 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <h3 className="font-extrabold text-lg text-on-surface font-manrope">
                Consultation Ticket Details
              </h3>
              <button
                onClick={() => setSelectedToView(null)}
                className="text-xs font-bold text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-0.5">
                    Client Name
                  </span>
                  <p className="font-bold text-sm text-on-surface">
                    {selectedToView.firstName} {selectedToView.lastName}
                  </p>
                </div>
                <div>
                  <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-0.5">
                    Submitted Date
                  </span>
                  <p className="text-on-surface font-medium">
                    {formatFirestoreDate(selectedToView.createdAt)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-0.5">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedToView.email}`}
                    className="text-primary font-semibold hover:underline block truncate"
                  >
                    {selectedToView.email}
                  </a>
                </div>
                <div>
                  <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-0.5">
                    Phone Number
                  </span>
                  {selectedToView.phone ? (
                    <a
                      href={`tel:${selectedToView.phone}`}
                      className="text-primary font-semibold hover:underline block"
                    >
                      {selectedToView.phone}
                    </a>
                  ) : (
                    <span className="text-on-surface-variant/60">Not provided</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-0.5">
                    Inquiry Type
                  </span>
                  <span className="uppercase font-bold text-primary px-2.5 py-0.5 bg-primary/10 rounded-full text-[10px] inline-block border border-primary/20">
                    {selectedToView.inquiryType}
                  </span>
                </div>
                <div>
                  <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-1">
                    Update Status
                  </span>
                  <select
                    value={selectedToView.status}
                    onChange={(e) =>
                      handleStatusChange(selectedToView.id, e.target.value as EnquiryStatus)
                    }
                    className="w-full p-2 bg-surface-container-low border border-outline-variant/40 rounded-xl text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    {ENQUIRY_STATUSES.map((statusOpt) => (
                      <option key={statusOpt.value} value={statusOpt.value}>
                        {statusOpt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-1">
                  Project Requirements &amp; Scope
                </span>
                <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface leading-relaxed text-xs max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {selectedToView.message}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedToDelete(selectedToView);
                  setSelectedToView(null);
                }}
                className="text-error hover:underline text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Ticket</span>
              </button>
              <button
                onClick={() => setSelectedToView(null)}
                className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AdminConfirmDialog
        isOpen={Boolean(selectedToDelete)}
        title="Delete Consultation Inquiry"
        message={`Are you sure you want to permanently delete the inquiry from "${selectedToDelete?.firstName} ${selectedToDelete?.lastName}"? This action cannot be undone.`}
        confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
        onConfirm={handleDelete}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
