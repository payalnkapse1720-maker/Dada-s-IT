"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminAuthGuard from "./AdminAuthGuard";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-surface-container-low">{children}</div>;
  }

  return (
    <AdminAuthGuard>
      <div className="flex h-screen overflow-hidden bg-surface-container-low font-manrope">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block h-full shrink-0">
          <AdminSidebar />
        </div>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-on-background/50 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="w-64 h-full bg-surface-container-lowest"
              onClick={(e) => e.stopPropagation()}
            >
              <AdminSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <AdminHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
