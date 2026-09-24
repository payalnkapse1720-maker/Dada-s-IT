"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { Shield, Lock, Mail, AlertCircle, Loader2, KeyRound } from "lucide-react";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const { user, loading: authLoading, login } = useAuth();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/admin");
    }
  }, [user, authLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      router.push("/admin");
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      console.error("Login failed:", error);
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setAuthError("Invalid email or password. Please verify your credentials.");
      } else if (error.code === "auth/too-many-requests") {
        setAuthError("Access temporarily locked due to many failed attempts. Try again later.");
      } else {
        setAuthError(error.message || "Failed to sign in. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-surface-container-low font-manrope">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
            DADA&apos;S TECHHUB
          </h1>
          <p className="text-xs uppercase tracking-widest text-primary font-bold mt-1">
            Enterprise Admin Control Center
          </p>
        </div>

        {/* Login Card */}
        <div className="surface-card p-8 rounded-3xl border border-outline-variant/30 shadow-xl bg-white">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-outline-variant/20">
            <KeyRound className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-on-surface">
              Administrator Authentication
            </h2>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-error/20 text-error flex items-start gap-3 text-xs leading-relaxed font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5"
              >
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@dadasit.com"
                  autoComplete="email"
                  {...register("email")}
                  className={`w-full bg-surface-container-low border rounded-xl pl-10 pr-4 py-3 text-sm text-on-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.email ? "border-error focus:ring-error" : "border-outline-variant/40"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-error text-xs mt-1 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5"
              >
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                  className={`w-full bg-surface-container-low border rounded-xl pl-10 pr-4 py-3 text-sm text-on-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.password ? "border-error focus:ring-error" : "border-outline-variant/40"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-error text-xs mt-1 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Admin Portal</span>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-4 border-t border-outline-variant/20 text-center">
            <p className="text-[11px] text-on-surface-variant/80">
              Restricted enterprise system. Access is monitored and logged. Admin accounts are provisioned via the secure cloud directory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
