"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { ShieldAlert, LogOut, Loader2 } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthorized, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If auth state resolution is complete and user is not authenticated, redirect to login
    if (!loading && !user) {
      const redirectParam = pathname ? `?redirect=${encodeURIComponent(pathname)}` : "";
      router.replace(`/admin/login${redirectParam}`);
    }
  }, [loading, user, pathname, router]);

  // 1. LOADING: Minimal existing-style loading state while Firebase determines auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            Checking administrative access...
          </p>
        </div>
      </div>
    );
  }

  // 2. UNAUTHENTICATED: Minimal loader while router redirect executes
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-400 text-xs">
        <Loader2 className="w-4 h-4 animate-spin mr-2 text-sky-400" />
        Redirecting to Admin Login...
      </div>
    );
  }

  // 3. AUTHENTICATED + UNAUTHORIZED: Show exact Access Restricted state without exposing admin data
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6 text-red-400" />
          </div>

          <h1 className="text-xl font-bold text-slate-100">
            Access Restricted
          </h1>

          <p className="text-sm text-slate-400 mt-2 mb-6">
            You don&apos;t have permission to access the Admin Panel.
          </p>

          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 mb-6 text-xs text-slate-400">
            Signed in as:{" "}
            <span className="font-mono text-slate-200 font-medium break-all">
              {user.email || "Unknown Account"}
            </span>
          </div>

          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-red-600/20 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // 4. AUTHENTICATED + AUTHORIZED: Render the existing Admin Panel
  return <>{children}</>;
}
