"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface AdminLoadingStateProps {
  message?: string;
  rows?: number;
}

export default function AdminLoadingState({
  message = "Loading data...",
  rows = 4,
}: AdminLoadingStateProps) {
  return (
    <div className="surface-card p-6 rounded-2xl border border-outline-variant/30 space-y-4">
      <div className="flex items-center gap-3 text-primary text-sm font-semibold mb-6">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>{message}</span>
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="h-12 bg-surface-container/60 rounded-xl animate-pulse w-full"
          />
        ))}
      </div>
    </div>
  );
}
