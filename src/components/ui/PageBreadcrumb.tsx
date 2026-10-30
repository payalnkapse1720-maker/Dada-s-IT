"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
  backLabel?: string;
  backHref?: string;
  className?: string;
}

export default function PageBreadcrumb({
  items,
  backLabel = "Back",
  backHref,
  className = "",
}: PageBreadcrumbProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 py-3 px-4 sm:px-6 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md mb-8 ${className}`}
      aria-label="Breadcrumb and page navigation"
    >
      {/* Back Button */}
      <button
        onClick={handleBack}
        type="button"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white text-on-surface hover:text-primary hover:bg-primary/10 border border-outline-variant/30 text-xs font-bold font-manrope transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
        aria-label="Navigate back to previous page"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>{backLabel}</span>
      </button>

      {/* Path Trail */}
      <nav className="flex items-center flex-wrap gap-1 text-xs font-manrope font-medium text-on-surface-variant">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-primary transition-colors text-on-surface-variant"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">Home</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-outline-variant/60 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors truncate max-w-[150px] sm:max-w-[200px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? "text-primary font-bold truncate max-w-[180px] sm:max-w-[280px]"
                      : "text-on-surface-variant truncate max-w-[150px]"
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}
