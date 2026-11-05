"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  ShieldCheck,
  Package,
  Wrench,
  FolderGit2,
  Inbox,
  ArrowRight,
  Database,
  Cloud,
  CheckCircle2,
  Server,
} from "lucide-react";
import { productsData } from "@/data/products";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const metrics = [
    {
      title: "Catalog Products",
      count: productsData.length,
      description: "Hardware, CCTV, and servers listed",
      icon: Package,
      href: "/admin/products",
      color: "from-sky-500/20 to-sky-500/5",
      border: "border-sky-500/30",
      iconColor: "text-sky-400",
    },
    {
      title: "Core Services",
      count: servicesData.length,
      description: "Infrastructure & AMC enterprise offerings",
      icon: Wrench,
      href: "/admin/services",
      color: "from-cyan-500/20 to-cyan-500/5",
      border: "border-cyan-500/30",
      iconColor: "text-cyan-400",
    },
    {
      title: "Completed Projects",
      count: projectsData.length,
      description: "Verified client case studies",
      icon: FolderGit2,
      href: "/admin/projects",
      color: "from-indigo-500/20 to-indigo-500/5",
      border: "border-indigo-500/30",
      iconColor: "text-indigo-400",
    },
    {
      title: "Quote Requests",
      count: "Active",
      description: "Customer quote inquiries & leads",
      icon: Inbox,
      href: "/admin/orders",
      color: "from-emerald-500/20 to-emerald-500/5",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400",
    },
  ];

  const systemStatus = [
    { name: "Firebase App", status: "Connected", detail: "dada-s-it-service", icon: Server },
    { name: "Authentication", status: "Active (Verified Session)", detail: user?.email, icon: ShieldCheck },
    { name: "Cloud Firestore", status: "Ready for Schema", detail: "Protected by Rules", icon: Database },
    { name: "Cloud Storage", status: "Bucket Configured", detail: "dada-s-it-service.firebasestorage.app", icon: Cloud },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-sky-950/30 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              Administrative Overview
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Welcome back, Administrator
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Authorized Session:{" "}
              <span className="font-mono text-slate-200 font-medium">{user?.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Session Authorized
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Link
              key={metric.title}
              href={metric.href}
              className={`group relative overflow-hidden bg-gradient-to-b ${metric.color} bg-slate-900/80 border ${metric.border} rounded-2xl p-5 hover:border-sky-500/50 transition-all shadow-lg hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${metric.iconColor}`} />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-2xl font-bold text-slate-100 tracking-tight">
                {metric.count}
              </div>
              <div className="text-xs font-semibold text-slate-300 mt-1">
                {metric.title}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {metric.description}
              </div>
            </Link>
          );
        })}
      </div>

      {/* System & Firebase Status */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-400" />
          Infrastructure & Database Security
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {systemStatus.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">{item.name}</div>
                    <div className="text-slate-400 text-[11px] font-mono truncate max-w-[220px]">
                      {item.detail}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
