"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  badge?: string;
  badgeType?: "default" | "success" | "warning" | "info";
  href?: string;
}

export default function AdminStatCard({
  title,
  value,
  description,
  icon: Icon,
  badge,
  badgeType = "default",
  href,
}: AdminStatCardProps) {
  const badgeStyles = {
    default: "bg-surface-container text-on-surface-variant",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    info: "bg-primary/10 text-primary border border-primary/20",
  };

  const content = (
    <div className="surface-card p-6 rounded-2xl border border-outline-variant/30 flex flex-col justify-between hover-lift transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
        {badge && (
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full font-manrope ${badgeStyles[badgeType]}`}>
            {badge}
          </span>
        )}
      </div>
      <div>
        <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider font-manrope">
          {title}
        </h4>
        <div className="text-3xl font-extrabold text-on-surface mt-1 font-manrope">
          {value}
        </div>
        {description && (
          <p className="text-xs text-on-surface-variant mt-1.5 font-medium">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    );
  }

  return content;
}
