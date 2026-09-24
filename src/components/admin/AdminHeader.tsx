"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu, ExternalLink, UserCircle, LogOut } from "lucide-react";

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
}

export default function AdminHeader({ onOpenMobileMenu }: AdminHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant/30 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-on-surface-variant/80 font-manrope">
          Enterprise Control Center
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* View Public Website */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/40 text-xs font-bold font-manrope text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Live Website</span>
        </Link>

        {/* User Info Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
          <UserCircle className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-on-surface font-manrope max-w-[150px] sm:max-w-[200px] truncate">
            {user?.email || "Administrator"}
          </span>
        </div>

        {/* Quick Logout button */}
        <button
          onClick={() => logout()}
          title="Sign Out"
          className="p-2 rounded-xl text-on-surface-variant hover:text-error hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
