"use client";

import React from "react";
import { LucideIcon, Inbox } from "lucide-react";
import Link from "next/link";

interface AdminEmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function AdminEmptyState({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  actionHref,
  onAction,
}: AdminEmptyStateProps) {
  return (
    <div className="surface-card p-12 rounded-3xl border border-outline-variant/30 flex flex-col items-center justify-center text-center my-6">
      <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant mb-4">
        <Icon className="w-8 h-8 opacity-70" />
      </div>
      <h3 className="text-lg font-bold text-on-surface font-manrope mb-1">
        {title}
      </h3>
      <p className="text-sm text-on-surface-variant max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all font-manrope shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
