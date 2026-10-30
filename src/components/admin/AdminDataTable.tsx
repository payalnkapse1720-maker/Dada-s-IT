"use client";

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import AdminEmptyState from "./AdminEmptyState";

export interface Column<T> {
  header: string;
  accessor?: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface AdminDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  emptyActionHref?: string;
  onAction?: () => void;
  actions?: (item: T) => React.ReactNode;
  headerActions?: React.ReactNode;
  pageSize?: number;
}

export default function AdminDataTable<T>({
  columns,
  data,
  keyExtractor,
  searchPlaceholder = "Search records...",
  searchKeys = [],
  emptyTitle = "No records found",
  emptyDescription = "Get started by adding your first record.",
  emptyActionLabel,
  emptyActionHref,
  onAction,
  actions,
  headerActions,
  pageSize = 10,
}: AdminDataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) => {
    if (!query.trim() || searchKeys.length === 0) return true;
    const lowerQuery = query.toLowerCase();
    return searchKeys.some((k) => {
      const val = item[k];
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(lowerQuery);
    });
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="surface-card rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
      {/* Top Toolbar */}
      <div className="p-4 md:p-6 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-surface-container-lowest">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl pl-10 pr-4 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-on-surface-variant/60"
          />
        </div>
        {headerActions && (
          <div className="flex items-center gap-2">{headerActions}</div>
        )}
      </div>

      {/* Table Area */}
      {filteredData.length === 0 ? (
        <AdminEmptyState
          title={emptyTitle}
          description={query ? "No matching records found for your search query." : emptyDescription}
          actionLabel={!query ? emptyActionLabel : undefined}
          actionHref={!query ? emptyActionHref : undefined}
          onAction={!query ? onAction : undefined}
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-container-low/50 text-on-surface-variant font-bold uppercase tracking-wider font-manrope">
                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      className={`py-3.5 px-4 md:px-6 ${col.className || ""}`}
                    >
                      {col.header}
                    </th>
                  ))}
                  {actions && (
                    <th className="py-3.5 px-4 md:px-6 text-right font-bold uppercase tracking-wider font-manrope">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-on-surface">
                {paginatedData.map((item) => {
                  const key = keyExtractor(item);
                  return (
                    <tr
                      key={key}
                      className="hover:bg-surface-container-low/60 transition-colors"
                    >
                      {columns.map((col, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-3.5 px-4 md:px-6 ${col.className || ""}`}
                        >
                          {typeof col.accessor === "function"
                            ? col.accessor(item)
                            : col.accessor
                            ? (item[col.accessor] as unknown as React.ReactNode)
                            : null}
                        </td>
                      ))}
                      {actions && (
                        <td className="py-3.5 px-4 md:px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {actions(item)}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-outline-variant/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-on-surface-variant bg-surface-container-lowest">
            <div>
              Showing{" "}
              <span className="font-bold text-on-surface">
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-on-surface">
                {Math.min(currentPage * pageSize, filteredData.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-on-surface">
                {filteredData.length}
              </span>{" "}
              records
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 font-medium">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
