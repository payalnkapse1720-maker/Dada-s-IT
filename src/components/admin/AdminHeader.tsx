"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { businessInfo } from "@/data/business-info";
import {
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Package,
  Wrench,
  FolderGit2,
  Inbox,
  ExternalLink,
  Loader2,
} from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      router.replace("/admin/login");
    } finally {
      setSigningOut(false);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Services", href: "/admin/services", icon: Wrench },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { label: "Orders & Quotes", href: "/admin/orders", icon: Inbox },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1 group-hover:border-sky-500/60 transition-colors">
                <Image
                  src={businessInfo.logoPath}
                  alt="DADA'S I.T Services & Security Solutions Official Logo"
                  width={32}
                  height={32}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-100 tracking-tight leading-none">
                  DADA&apos;S I.T
                </span>
                <span className="text-[10px] uppercase font-semibold text-sky-400 tracking-wider mt-0.5">
                  Admin Panel
                </span>
              </div>
            </Link>

            {/* Authenticated Admin Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Admin: <span className="font-mono text-emerald-300">{user?.email}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isActive
                      ? "bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm shadow-sky-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions: Public Site Link & Sign Out */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800 transition-colors"
              title="View Public Website"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-colors cursor-pointer disabled:opacity-50"
            >
              {signingOut ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <LogOut className="w-3.5 h-3.5" />
              )}
              <span>{signingOut ? "Signing Out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto py-2 border-t border-slate-900 -mx-2 px-2 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium shrink-0 transition-colors ${isActive
                    ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                    : "text-slate-400 hover:text-slate-200"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
