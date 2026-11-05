"use client";

import React from "react";
import Link from "next/link";
import { FolderGit2, ArrowLeft, Plus, ExternalLink } from "lucide-react";
import { projectsData } from "@/data/projects";
import type { Project } from "@/types";

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-indigo-400" />
            Projects & Case Studies
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise case studies ({projectsData.length} verified deployments).
          </p>
        </div>

        <button
          onClick={() => alert("Project schema migration to Firestore is scheduled for the next phase.")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectsData.map((proj: Project) => (
          <div
            key={proj.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold text-indigo-400 font-mono uppercase bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                  {proj.industry || proj.tag}
                </span>
                <Link
                  href={`/projects/${proj.slug || proj.id}`}
                  target="_blank"
                  className="text-slate-400 hover:text-slate-200 text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
              <h3 className="text-sm font-bold text-slate-100">{proj.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Client: <strong className="text-slate-300 font-normal">{proj.client}</strong></span>
              <span className="text-emerald-400 font-medium">Verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
