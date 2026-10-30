"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2, ShieldCheck } from "lucide-react";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If we finished loading and there is no authenticated user, and we're not already on login
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-container-low flex flex-col items-center justify-center p-6 text-on-surface">
        <div className="surface-card p-8 rounded-3xl shadow-xl flex flex-col items-center max-w-sm w-full text-center border border-outline-variant/30 animate-pulse">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg font-manrope mb-2">Verifying Security Access</h3>
          <p className="text-on-surface-variant text-xs mb-4">
            Validating administrator credentials and active session...
          </p>
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // If unauthenticated and on a protected admin route, keep screen blank while redirect happens
  if (!user && pathname !== "/admin/login") {
    return null;
  }

  return <>{children}</>;
}
