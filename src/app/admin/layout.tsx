"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/lib/auth/AuthContext";
import AdminGuard from "@/components/auth/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";

function AdminContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <AdminHeader />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminContentWrapper>{children}</AdminContentWrapper>
    </AuthProvider>
  );
}
