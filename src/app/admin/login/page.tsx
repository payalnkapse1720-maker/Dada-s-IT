"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth/AuthContext";
import { businessInfo } from "@/data/business-info";
import { ShieldCheck, Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";

  const { user, loading: authLoading, isAuthorized, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already authenticated and authorized, automatically redirect to admin dashboard
  useEffect(() => {
    if (!authLoading && user && isAuthorized) {
      router.replace(redirectUrl);
    }
  }, [authLoading, user, isAuthorized, router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      router.replace(redirectUrl);
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setErrorMessage("Invalid credentials. Please verify your email and password.");
          break;
        case "auth/too-many-requests":
          setErrorMessage("Too many attempts. Access is temporarily restricted. Please try again later.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Please enter a valid email address format.");
          break;
        case "auth/network-request-failed":
          setErrorMessage("Network error. Please verify your internet connection.");
          break;
        default:
          setErrorMessage(error.message || "Failed to authenticate. Please try again.");
          break;
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-center p-2 mb-3 shadow-lg shadow-sky-500/5">
          <Image
            src={businessInfo.logoPath}
            alt="DADA'S I.T Services & Security Solutions Official Logo"
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
          Admin Authentication
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          DADA&apos;S I.T Services & Security Solutions
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-5 flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Administrator Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              required
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              required
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || authLoading}
          className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-600/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In to Admin Panel</span>
          )}
        </button>
      </form>

      {/* Security Note */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Protected administrative portal. Authentication is processed directly through official Firebase Authentication.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 text-slate-100">
      <div className="max-w-md w-full">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to public website</span>
        </Link>

        {/* Suspense boundary for useSearchParams */}
        <Suspense
          fallback={
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-sky-400" />
              <p className="text-xs text-slate-400">Loading authentication portal...</p>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
