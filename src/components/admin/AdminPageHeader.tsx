"use client";

import React from "react";

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function AdminPageHeader({
  title,
  subtitle,
  children,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-outline-variant/30">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface font-manrope tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-on-surface-variant text-sm mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
