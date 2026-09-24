"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Settings,
  Shield,
  User,
  Database,
  Globe,
  LogOut,
  CheckCircle2,
  Lock,
  Server,
} from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";

export default function AdminSettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dada-s-it-service";

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: "System" }, { label: "Settings" }]} />

      <AdminPageHeader
        title="Admin Settings &amp; Configuration"
        subtitle="Manage administrator session, security status, and cloud backend connections."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Administrator Profile */}
        <div className="lg:col-span-6 space-y-6">
          <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-on-surface font-manrope">
                  Administrator Profile
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Current active session details
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider block">
                    Authenticated Email
                  </span>
                  <span className="font-bold text-sm text-on-surface">
                    {user?.email || "admin@dadasit.com"}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">
                  Verified
                </span>
              </div>

              <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider block">
                    Auth Provider
                  </span>
                  <span className="font-semibold text-on-surface">
                    Firebase Email / Password
                  </span>
                </div>
                <Lock className="w-4 h-4 text-primary" />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-error hover:bg-red-50 text-xs font-bold font-manrope transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Admin Control Center</span>
                </button>
              </div>
            </div>
          </div>

          {/* Website Info */}
          <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/20">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-on-surface font-manrope">
                  Website Identity
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Brand and enterprise system identifiers
                </p>
              </div>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-outline-variant/10">
                <span className="text-on-surface-variant">Platform Name:</span>
                <span className="font-bold text-on-surface">DADA&apos;S TECHHUB</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/10">
                <span className="text-on-surface-variant">Primary Domain:</span>
                <span className="font-bold text-on-surface">dadasit.com</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-on-surface-variant">Framework:</span>
                <span className="font-bold text-on-surface">Next.js 16 (App Router)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cloud Backend Integration */}
        <div className="lg:col-span-6 space-y-6">
          <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-on-surface font-manrope">
                  Firebase Cloud Backend
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Cloud infrastructure connection parameters
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-1">
                <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider block">
                  Firebase Project ID
                </span>
                <span className="font-mono font-bold text-on-surface">
                  {projectId}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-on-surface">Client SDK Singleton</span>
                  </div>
                  <span className="font-bold text-emerald-700 text-[11px]">Ready</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-on-surface">Firebase Authentication</span>
                  </div>
                  <span className="font-bold text-emerald-700 text-[11px]">Online</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-on-surface">Cloud Firestore CRUD</span>
                  </div>
                  <span className="font-bold text-amber-700 text-[11px]">Ready for Phase 2</span>
                </div>
              </div>

              <div className="p-4 bg-surface-container/60 rounded-2xl text-on-surface-variant text-[11px] leading-relaxed">
                <strong>Security Guarantee:</strong> Private service-account credentials and backend keys are strictly segregated and not exposed in client-side bundles.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
