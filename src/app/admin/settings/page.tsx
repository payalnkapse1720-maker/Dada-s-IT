"use client";

import React, { useState, useEffect } from "react";
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
  Sparkles,
  Loader2,
  RefreshCw,
  FileText,
  Save,
} from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import { seedFirestoreDatabase } from "@/lib/firebase/seed";
import {
  getHomepageContent,
  getContactContent,
  getAboutContent,
  setWebsiteContentSection,
} from "@/lib/firebase/websiteContent";
import { HomepageContentDoc, ContactContentDoc, AboutContentDoc } from "@/types";

export default function AdminSettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"system" | "content">("system");
  const [homepageData, setHomepageData] = useState<Partial<HomepageContentDoc>>({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    heroImage: "",
    ctaText: "",
    ctaLink: "",
  });
  const [contactData, setContactData] = useState<Partial<ContactContentDoc>>({
    address: "",
    phone: "",
    email: "",
    whatsapp: "",
  });
  const [aboutData, setAboutData] = useState<Partial<AboutContentDoc>>({
    title: "",
    description: "",
    image: "",
  });
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);

  useEffect(() => {
    async function loadWebsiteContent() {
      try {
        const [home, cont, abt] = await Promise.all([
          getHomepageContent(),
          getContactContent(),
          getAboutContent(),
        ]);
        if (home) setHomepageData(home);
        if (cont) setContactData(cont);
        if (abt) setAboutData(abt);
      } catch (err) {
        console.error("Failed to load website content from Firestore:", err);
      }
    }
    loadWebsiteContent();
  }, []);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setSeedResult(null);
    try {
      const res = await seedFirestoreDatabase({ overwriteExisting: false });
      setSeedResult(
        `Database successfully initialized! Seeded: ${res.seededCounts.categories} categories, ${res.seededCounts.services} services, ${res.seededCounts.products} products, ${res.seededCounts.projects} projects, ${res.seededCounts.admins} admins, ${res.seededCounts.websiteContent} content docs.`
      );
    } catch (err: any) {
      console.error("Seed error:", err);
      setSeedResult(`Seeding failed: ${err.message || err}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSaveWebsiteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingContent(true);
    setContentSaveSuccess(false);
    try {
      await Promise.all([
        setWebsiteContentSection("homepage", homepageData),
        setWebsiteContentSection("contact", contactData),
        setWebsiteContentSection("about", aboutData),
      ]);
      setContentSaveSuccess(true);
      setTimeout(() => setContentSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to save website content:", err);
      alert("Error saving website content to Firestore.");
    } finally {
      setIsSavingContent(false);
    }
  };

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
        subtitle="Manage administrator session, security status, website content, and Cloud Firestore database."
      />

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
        <button
          onClick={() => setActiveTab("system")}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-manrope transition-all cursor-pointer ${
            activeTab === "system"
              ? "bg-primary text-white shadow-sm"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          System &amp; Database Settings
        </button>
        <button
          onClick={() => setActiveTab("content")}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-manrope transition-all cursor-pointer ${
            activeTab === "content"
              ? "bg-primary text-white shadow-sm"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          Website Content (Firestore)
        </button>
      </div>

      {activeTab === "system" ? (
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

          {/* Cloud Backend Integration & Seeder */}
          <div className="lg:col-span-6 space-y-6">
            <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-on-surface font-manrope">
                    Cloud Firestore Database
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Backend collections and architecture status
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

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-on-surface">8 Collections Architecture</span>
                    </div>
                    <span className="font-bold text-emerald-700 text-[11px]">Ready</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-on-surface">Security Rules &amp; Indexes</span>
                    </div>
                    <span className="font-bold text-emerald-700 text-[11px]">Enforced</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-on-surface">Admin Password Safety</span>
                    </div>
                    <span className="font-bold text-emerald-700 text-[11px]">Auth Only</span>
                  </div>
                </div>

                {/* Database Initialization Action */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary font-manrope">
                      Initialize / Seed Firestore Data
                    </span>
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-on-surface-variant text-[11px] leading-relaxed">
                    Populates or syncs the 8 Cloud Firestore collections (admins, categories, services, products, projects, enquiries, quotes, websiteContent) with professional structure and realistic data.
                  </p>
                  <button
                    onClick={handleSeedDatabase}
                    disabled={isSeeding}
                    className="w-full py-2.5 px-4 bg-primary text-white rounded-xl text-xs font-bold font-manrope hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {isSeeding ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Seeding Cloud Firestore...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Seed Cloud Firestore Database</span>
                      </>
                    )}
                  </button>

                  {seedResult && (
                    <div className="p-3 bg-white border border-emerald-300 rounded-xl text-emerald-800 text-[11px] font-medium leading-relaxed">
                      {seedResult}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Website Content Tab */
        <form onSubmit={handleSaveWebsiteContent} className="space-y-6">
          {contentSaveSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Website content successfully updated in Cloud Firestore!</span>
            </div>
          )}

          {/* Homepage Section */}
          <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-5">
            <h3 className="text-base font-extrabold text-on-surface font-manrope pb-2 border-b border-outline-variant/20">
              1. Homepage Content (`websiteContent/homepage`)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-on-surface-variant mb-1">Hero Title</label>
                <input
                  type="text"
                  value={homepageData.heroTitle || ""}
                  onChange={(e) => setHomepageData({ ...homepageData, heroTitle: e.target.value })}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block font-bold text-on-surface-variant mb-1">Hero Subtitle</label>
                <input
                  type="text"
                  value={homepageData.heroSubtitle || ""}
                  onChange={(e) => setHomepageData({ ...homepageData, heroSubtitle: e.target.value })}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-bold text-on-surface-variant mb-1">Hero Description</label>
                <textarea
                  rows={3}
                  value={homepageData.heroDescription || ""}
                  onChange={(e) => setHomepageData({ ...homepageData, heroDescription: e.target.value })}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block font-bold text-on-surface-variant mb-1">CTA Text</label>
                <input
                  type="text"
                  value={homepageData.ctaText || ""}
                  onChange={(e) => setHomepageData({ ...homepageData, ctaText: e.target.value })}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block font-bold text-on-surface-variant mb-1">CTA Link</label>
                <input
                  type="text"
                  value={homepageData.ctaLink || ""}
                  onChange={(e) => setHomepageData({ ...homepageData, ctaLink: e.target.value })}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface font-mono"
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-5">
            <h3 className="text-base font-extrabold text-on-surface font-manrope pb-2 border-b border-outline-variant/20">
              2. Contact Information (`websiteContent/contact`)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2">
                <label className="block font-bold text-on-surface-variant mb-1">Headquarters Address</label>
                <input
                  type="text"
                  value={contactData.address || ""}
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block font-bold text-on-surface-variant mb-1">Phone Numbers</label>
                <input
                  type="text"
                  value={contactData.phone || ""}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block font-bold text-on-surface-variant mb-1">Email</label>
                <input
                  type="email"
                  value={contactData.email || ""}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="surface-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-5">
            <h3 className="text-base font-extrabold text-on-surface font-manrope pb-2 border-b border-outline-variant/20">
              3. About Section (`websiteContent/about`)
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-on-surface-variant mb-1">Section Title</label>
                <input
                  type="text"
                  value={aboutData.title || ""}
                  onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block font-bold text-on-surface-variant mb-1">About Description</label>
                <textarea
                  rows={4}
                  value={aboutData.description || ""}
                  onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isSavingContent}
              className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 font-manrope shadow-md flex items-center gap-2 cursor-pointer"
            >
              {isSavingContent ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Website Content...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Website Content to Firestore</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
