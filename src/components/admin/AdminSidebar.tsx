"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Package,
  Layers,
  Wrench,
  FolderGit2,
  Building2,
  Award,
  MessageSquareQuote,
  BookOpen,
  HelpCircle,
  Mail,
  Receipt,
  Settings,
  LogOut,
  X,
  Shield,
} from "lucide-react";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

interface NavSection {
  title?: string;
  items: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const navSections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Catalog",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Categories", href: "/admin/categories", icon: Layers },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Services", href: "/admin/services", icon: Wrench },
      { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
      { label: "Industries", href: "/admin/industries", icon: Building2 },
      { label: "Brands / Partners", href: "/admin/brands", icon: Award },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
      { label: "Blog / Insights", href: "/admin/blog", icon: BookOpen },
      { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    ],
  },
  {
    title: "Leads",
    items: [
      { label: "Enquiries", href: "/admin/enquiries", icon: Mail },
      { label: "Product Quotes", href: "/admin/quotes", icon: Receipt },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col h-full overflow-hidden text-on-surface">
      {/* Brand Header */}
      <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-extrabold shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight font-manrope block leading-tight text-on-surface">
              DADA&apos;S TECHHUB
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Admin Portal
            </span>
          </div>
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
        {navSections.map((section, sIdx) => (
          <div key={sIdx}>
            {section.title && (
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 font-manrope">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold font-manrope transition-all ${
                        active
                          ? "bg-primary text-white shadow-sm"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? "text-white" : "text-on-surface-variant"}`} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom User / Logout Area */}
      <div className="p-3 border-t border-outline-variant/30 bg-surface-container-low/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-error hover:bg-red-50 transition-colors font-manrope"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
