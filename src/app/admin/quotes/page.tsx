"use client";

import React, { useState, useEffect } from "react";
import { Receipt, Mail, Phone, Building, Trash2, Eye, Package, Calendar, AlertCircle } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminDataTable, { Column } from "@/components/admin/AdminDataTable";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminLoadingState from "@/components/admin/AdminLoadingState";
import { QuoteRecord, QuoteStatus } from "@/types";
import {
  subscribeQuotes,
  updateQuoteStatus,
  deleteQuote,
} from "@/lib/firebase/quotes";
import { formatFirestoreDate } from "@/lib/utils";

const QUOTE_STATUSES: { value: QuoteStatus; label: string; color: string }[] = [
  { value: "new", label: "New Request", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "contacted", label: "Contacted", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "quoted", label: "Quote Sent", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "accepted", label: "Accepted", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { value: "rejected", label: "Rejected", color: "bg-rose-50 text-rose-700 border-rose-200" },
  { value: "closed", label: "Order Fulfilled", color: "bg-gray-100 text-gray-700 border-gray-300" },
];

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedToDelete, setSelectedToDelete] = useState<QuoteRecord | null>(null);
  const [selectedToView, setSelectedToView] = useState<QuoteRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setFetchError(null);

    const unsubscribe = subscribeQuotes(
      (data) => {
        setQuotes(data);
        setIsLoading(false);
      },
      (err) => {
        console.error("Quotes subscription error:", err);
        setFetchError("Unable to load quote requests from Firestore. Check permissions or network.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id: string, newStatus: QuoteStatus) => {
    setIsUpdatingStatus(true);
    try {
      await updateQuoteStatus(id, newStatus);
      if (selectedToView && selectedToView.id === id) {
        setSelectedToView((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error("Failed to update quote status:", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedToDelete) return;
    setIsDeleting(true);
    try {
      await deleteQuote(selectedToDelete.id);
      setSelectedToDelete(null);
    } catch (err) {
      console.error("Failed to delete quote:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<QuoteRecord>[] = [
    {
      header: "Customer",
      accessor: (item) => (
        <div>
          <div className="font-bold text-on-surface">{item.fullName}</div>
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
            {item.companyName && (
              <span className="text-on-surface-variant/80 font-medium">
                • {item.companyName}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Product Requested",
      accessor: (item) => (
        <div className="flex items-center gap-1.5 font-semibold text-on-surface">
          <Package className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate max-w-[200px]">{item.productName}</span>
        </div>
      ),
    },
    {
      header: "Quantity",
      accessor: (item) => (
        <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-bold text-on-surface text-[11px]">
          {item.quantity} {item.quantity === 1 ? "Unit" : "Units"}
        </span>
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
          QUOTE_STATUSES.find((s) => s.value === item.status) || QUOTE_STATUSES[0];

        return (
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(item.id, e.target.value as QuoteStatus)}
            disabled={isUpdatingStatus}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${currentStatusConfig.color}`}
          >
            {QUOTE_STATUSES.map((statusOpt) => (
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
      <AdminBreadcrumbs items={[{ label: "Leads" }, { label: "Product Quotes" }]} />

      <AdminPageHeader
        title="Product Quotation Requests"
        subtitle="Manage hardware procurement orders, bulk RFP inquiries, and quotation requests stored in Firestore."
      />

      {fetchError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-error/20 text-error text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{fetchError}</span>
        </div>
      )}

      {isLoading ? (
        <AdminLoadingState message="Connecting to Firestore &amp; loading quotation requests..." />
      ) : (
        <AdminDataTable<QuoteRecord>
          columns={columns}
          data={quotes}
          keyExtractor={(q) => q.id}
          searchPlaceholder="Search quotes by product, customer, phone, or company..."
          searchKeys={["fullName", "email", "phone", "companyName", "productName"]}
          emptyTitle="No quote requests yet"
          emptyDescription="When customers request price quotes on catalog products, inquiries will appear here in real-time."
          actions={(item) => (
            <>
              <button
                onClick={() => setSelectedToView(item)}
                className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                title="View Quote Details"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSelectedToDelete(item)}
                className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-red-50 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                title="Delete Quote"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        />
      )}

      {/* View Details Modal */}
      {selectedToView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-outline-variant/30 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <h3 className="font-extrabold text-lg text-on-surface font-manrope">
                Quotation Request Details
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
                    Customer Name
                  </span>
                  <p className="font-bold text-sm text-on-surface">
                    {selectedToView.fullName}
                  </p>
                </div>
                <div>
                  <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-0.5">
                    Date Requested
                  </span>
                  <p className="text-on-surface font-medium">
                    {formatFirestoreDate(selectedToView.createdAt)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-0.5">
                    Company / Entity
                  </span>
                  <p className="text-on-surface font-medium">
                    {selectedToView.companyName || "Individual / Not specified"}
                  </p>
                </div>
                <div>
                  <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-0.5">
                    Quantity Required
                  </span>
                  <p className="font-bold text-primary">
                    {selectedToView.quantity} {selectedToView.quantity === 1 ? "Unit" : "Units"}
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
                  <a
                    href={`tel:${selectedToView.phone}`}
                    className="text-primary font-semibold hover:underline block"
                  >
                    {selectedToView.phone}
                  </a>
                </div>
              </div>

              <div className="p-3.5 bg-primary-container/10 border border-primary-container/30 rounded-2xl">
                <span className="font-bold uppercase text-primary text-[10px] block mb-1">
                  Product Requested
                </span>
                <p className="font-extrabold text-sm text-on-surface">
                  {selectedToView.productName}
                </p>
              </div>

              <div>
                <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-1">
                  Update Quotation Status
                </span>
                <select
                  value={selectedToView.status}
                  onChange={(e) =>
                    handleStatusChange(selectedToView.id, e.target.value as QuoteStatus)
                  }
                  className="w-full p-2 bg-surface-container-low border border-outline-variant/40 rounded-xl text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {QUOTE_STATUSES.map((statusOpt) => (
                    <option key={statusOpt.value} value={statusOpt.value}>
                      {statusOpt.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedToView.notes && (
                <div>
                  <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-1">
                    Customer Project Notes &amp; Specifications
                  </span>
                  <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface leading-relaxed text-xs max-h-36 overflow-y-auto whitespace-pre-wrap">
                    {selectedToView.notes}
                  </div>
                </div>
              )}
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
                <span>Delete Quote</span>
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
        title="Delete Quote Request"
        message={`Are you sure you want to permanently delete the quotation request for "${selectedToDelete?.productName}" from "${selectedToDelete?.fullName}"?`}
        confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
        onConfirm={handleDelete}
        onCancel={() => setSelectedToDelete(null)}
      />
    </div>
  );
}
