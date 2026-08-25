import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-16 px-6 bg-background">
      <div className="surface-card rounded-3xl p-10 md:p-16 border border-outline-variant/30 text-center max-w-xl mx-auto shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-error/10 text-error flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-error">
          Error 404 • Resource Not Found
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface font-manrope mt-2 mb-4">
          Route Unreachable
        </h1>

        <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
          The requested network node or page does not exist or has been relocated. Please check the URL or return to our central portal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-full text-xs font-bold font-manrope hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Global Hub</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 bg-surface-container text-on-surface rounded-full text-xs font-bold font-manrope hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
