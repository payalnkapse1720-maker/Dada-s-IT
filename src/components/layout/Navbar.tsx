"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Router,
  Video,
  Fingerprint,
  Server,
  Laptop,
  Zap,
  Factory,
  Building2,
  HeartPulse,
  Building,
  BookOpen,
  User,
  Sparkles,
  Clock,
  ShieldCheck,
  Headphones,
  Award,
} from "lucide-react";

interface NavbarProps {
  onOpenSearch?: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpandedSection(null);
  }, [pathname]);

  const handleMouseEnter = (menuName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  // Product categories dropdown items with exact category query parameters
  const productDropdownItems = [
    {
      title: "Networking Equipment",
      desc: "Managed switches, fiber backbones & enterprise routers",
      href: "/products?category=Networking+Equipment",
      icon: Router,
    },
    {
      title: "4K CCTV & Surveillance",
      desc: "AI Starlight IP dome, bullet cameras & NVR systems",
      href: "/products?category=CCTV+%26+Surveillance",
      icon: Video,
    },
    {
      title: "Biometric & Access Control",
      desc: "Facial recognition, RFID turnstiles & time attendance",
      href: "/products?category=Biometric+%26+Access+Control",
      icon: Fingerprint,
    },
    {
      title: "Enterprise Servers & Storage",
      desc: "Rackmount servers, SAN/NAS arrays & virtualization",
      href: "/products?category=Servers+%26+Storage",
      icon: Server,
    },
    {
      title: "Laptops & Computing",
      desc: "Corporate laptops, CAD workstations & OEM components",
      href: "/products?category=Laptops+%26+Desktops",
      icon: Laptop,
    },
    {
      title: "Power & UPS Automation",
      desc: "Online industrial UPS, power backups & surge protection",
      href: "/products?category=Power+%26+UPS+Automation",
      icon: Zap,
    },
  ];

  // Service offerings dropdown items with dedicated subpages
  const serviceDropdownItems = [
    {
      title: "IT Infrastructure & Networking",
      desc: "Cat6A/Fiber optic cabling, core switching & rack dressing",
      href: "/services/it-infrastructure",
      icon: Router,
    },
    {
      title: "4K CCTV & AI Surveillance",
      desc: "Perimeter monitoring, central command & ANPR cameras",
      href: "/services/cctv-security",
      icon: Video,
    },
    {
      title: "Access Control & Biometrics",
      desc: "Multi-door controllers, turnstiles & ERP integration",
      href: "/services/access-control",
      icon: Fingerprint,
    },
    {
      title: "Managed IT & Facility AMC",
      desc: "On-site resident engineers, 24/7 SLAs & proactive repairs",
      href: "/services/managed-it-amc",
      icon: Headphones,
    },
    {
      title: "Cloud & Digital Solutions",
      desc: "Hybrid cloud migration, custom portals & server setups",
      href: "/services/cloud-digital",
      icon: Server,
    },
  ];

  // Solutions dropdown items
  const solutionDropdownItems = [
    {
      title: "Enterprise Fiber & LAN Backbone",
      desc: "Ultra-low latency 10G/40G backbones for multi-facility campuses",
      href: "/services/it-infrastructure",
      icon: Zap,
    },
    {
      title: "AI Security & Video Analytics",
      desc: "Automated intrusion detection, heatmaps & centralized VMS",
      href: "/services/cctv-security",
      icon: ShieldCheck,
    },
    {
      title: "Resident Engineer Support (ITFMS)",
      desc: "Dedicated on-site infrastructure engineers with 15-min SLA",
      href: "/services/managed-it-amc",
      icon: Clock,
    },
    {
      title: "Data Center & Virtualization",
      desc: "VMware/Hyper-V failover setups, backup & disaster recovery",
      href: "/services/cloud-digital",
      icon: Server,
    },
  ];

  // Industries dropdown items
  const industryDropdownItems = [
    {
      title: "Heavy Manufacturing & Industrial",
      desc: "EMI-immune fiber backbones, IP67 rugged cameras & plant IT",
      href: "/industries",
      icon: Factory,
    },
    {
      title: "Banking, Financial & Data Rooms",
      desc: "RBI-compliant access control, dual-redundant power & CCTV",
      href: "/industries",
      icon: Building2,
    },
    {
      title: "Hospitals & Healthcare Facilities",
      desc: "Zero-latency medical imaging networks & biometric security",
      href: "/industries",
      icon: HeartPulse,
    },
    {
      title: "Commercial Parks & Townships",
      desc: "Smart IP intercoms, boom barrier ANPR & campus WiFi",
      href: "/industries",
      icon: Building,
    },
  ];

  // Insights dropdown items
  const insightDropdownItems = [
    {
      title: "Zero Trust Architecture Guide",
      desc: "Micro-segmentation and identity security in hybrid enterprises",
      href: "/insights",
      icon: BookOpen,
    },
    {
      title: "AI Edge Surveillance in Manufacturing",
      desc: "How vision AI detects safety protocol breaches in real time",
      href: "/insights",
      icon: Video,
    },
    {
      title: "Comprehensive vs Non-Comprehensive AMC",
      desc: "Cost-benefit breakdown for enterprise IT asset management",
      href: "/insights",
      icon: Award,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 font-manrope select-none">
      {/* 1. TOP MICRO UTILITY BAR */}
      <div
        className={`bg-[#051422] border-b border-primary/20 text-white/80 transition-all duration-300 overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0 py-0" : "max-h-12 opacity-100 py-1.5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between text-[11px] font-medium">
          {/* Left: SLA & Location */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-primary-fixed-dim">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="font-bold tracking-wider uppercase text-[10px]">
                24/7 Emergency Dispatch SLA Active
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-white/60">
              <MapPin className="w-3 h-3 text-primary-fixed-dim" />
              <span>Pan-India Service &amp; Nationwide Delivery</span>
            </div>
          </div>

          {/* Right: Hotline & Admin */}
          <div className="flex items-center gap-5">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-primary-fixed-dim" />
              <span>+91-9876543210</span>
            </a>
            <a
              href="mailto:info@dadasit.com"
              className="hidden sm:flex items-center gap-1 hover:text-cyan-300 transition-colors"
            >
              <Mail className="w-3 h-3 text-primary-fixed-dim" />
              <span>info@dadasit.com</span>
            </a>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-white/50 hover:text-white transition-colors pl-2 border-l border-white/10"
              title="Administrator Portal"
            >
              <User className="w-3 h-3" />
              <span className="hidden lg:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div
        className={`relative transition-all duration-300 ${
          isScrolled
            ? "bg-white/92 backdrop-blur-2xl border-b border-primary/15 shadow-[0_10px_30px_-10px_rgba(0,101,144,0.08)]"
            : "bg-white/85 backdrop-blur-xl border-b border-primary/10"
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] relative h-18 transition-all"
        >
          {/* ============================================================
              DESKTOP: LEFT NAVIGATION (Balanced relative to Center Logo)
             ============================================================ */}
          <div className="hidden lg:flex items-center justify-start gap-1 xl:gap-2" role="menubar">
            {/* Home */}
            <Link
              href="/"
              role="menuitem"
              onClick={handleLinkClick}
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-tight transition-all relative ${
                pathname === "/"
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
              }`}
            >
              <span>Home</span>
              {pathname === "/" && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,101,144,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Products (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("products")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/products"
                role="menuitem"
                onClick={handleLinkClick}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-tight transition-all relative ${
                  pathname.startsWith("/products")
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "products" ? "rotate-180 text-primary" : "text-on-surface-variant/60"
                  }`}
                />
                {pathname.startsWith("/products") && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,101,144,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              {/* Products Dropdown Panel */}
              <AnimatePresence>
                {activeDropdown === "products" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 w-[520px] pt-3 z-50"
                  >
                    <div className="surface-card rounded-2xl border border-outline-variant/30 bg-white/98 shadow-2xl p-5 backdrop-blur-2xl">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-outline-variant/20">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-xs font-extrabold uppercase tracking-wider text-primary font-manrope">
                            Enterprise Hardware Catalog
                          </span>
                        </div>
                        <Link
                          href="/products"
                          onClick={handleLinkClick}
                          className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                        >
                          <span>All Products</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {productDropdownItems.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={handleLinkClick}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-container-low transition-all group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-[10px] text-on-surface-variant line-clamp-1 mt-0.5">
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                role="menuitem"
                onClick={handleLinkClick}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-tight transition-all relative ${
                  pathname.startsWith("/services")
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "services" ? "rotate-180 text-primary" : "text-on-surface-variant/60"
                  }`}
                />
                {pathname.startsWith("/services") && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,101,144,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              {/* Services Dropdown Panel */}
              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 w-[500px] pt-3 z-50"
                  >
                    <div className="surface-card rounded-2xl border border-outline-variant/30 bg-white/98 shadow-2xl p-5 backdrop-blur-2xl">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-outline-variant/20">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-primary font-manrope">
                          End-to-End IT &amp; Security Services
                        </span>
                        <Link
                          href="/services"
                          onClick={handleLinkClick}
                          className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                        >
                          <span>Full Scope</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="space-y-1.5">
                        {serviceDropdownItems.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={handleLinkClick}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-container-low transition-all group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-[10px] text-on-surface-variant truncate">
                                  {item.desc}
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-tight text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "solutions" ? "rotate-180 text-primary" : "text-on-surface-variant/60"
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "solutions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 w-[440px] pt-3 z-50"
                  >
                    <div className="surface-card rounded-2xl border border-outline-variant/30 bg-white/98 shadow-2xl p-4 backdrop-blur-2xl space-y-2">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-primary font-manrope pb-2 border-b border-outline-variant/20">
                        Turnkey Enterprise Architectures
                      </div>
                      {solutionDropdownItems.map((sol, idx) => {
                        const Icon = sol.icon;
                        return (
                          <Link
                            key={idx}
                            href={sol.href}
                            onClick={handleLinkClick}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-container-low transition-all group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                                {sol.title}
                              </div>
                              <div className="text-[10px] text-on-surface-variant mt-0.5 leading-tight">
                                {sol.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("industries")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/industries"
                role="menuitem"
                onClick={handleLinkClick}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-tight transition-all relative ${
                  pathname.startsWith("/industries")
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                }`}
              >
                <span>Industries</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "industries" ? "rotate-180 text-primary" : "text-on-surface-variant/60"
                  }`}
                />
                {pathname.startsWith("/industries") && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,101,144,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              <AnimatePresence>
                {activeDropdown === "industries" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 w-[420px] pt-3 z-50"
                  >
                    <div className="surface-card rounded-2xl border border-outline-variant/30 bg-white/98 shadow-2xl p-4 backdrop-blur-2xl space-y-2">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-primary font-manrope pb-2 border-b border-outline-variant/20">
                        Sector-Specific Specializations
                      </div>
                      {industryDropdownItems.map((ind, idx) => {
                        const Icon = ind.icon;
                        return (
                          <Link
                            key={idx}
                            href={ind.href}
                            onClick={handleLinkClick}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-container-low transition-all group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                                {ind.title}
                              </div>
                              <div className="text-[10px] text-on-surface-variant mt-0.5 leading-tight">
                                {ind.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ============================================================
              CENTER LOGO (THE MATHEMATICAL & VISUAL FOCAL POINT)
              Clean, Luxurious Frosted Glass Pill & Sapphire Gradient Emblem
             ============================================================ */}
          <div className="flex justify-center items-center relative z-20">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="group flex items-center justify-center relative p-1 focus:outline-none rounded-2xl transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              aria-label="DADA'S TECHHUB Home"
            >
              {/* Soft Subtle Primary Glow on Hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/15 via-primary-container/25 to-primary/15 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Clean White/Frosted Glass Badge Container */}
              <div className="relative flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 border border-primary/20 shadow-xs group-hover:shadow-[0_4px_20px_rgba(0,101,144,0.14)] group-hover:border-primary/40 transition-all duration-300">
                {/* Vibrant Shield Icon Badge */}
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-[#004c6e] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:rotate-3 transition-transform duration-200">
                  <Shield className="w-4 h-4 text-white" />
                </div>

                {/* Clear, High-Contrast Brand Typography */}
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight font-manrope leading-none text-on-surface flex items-center gap-1">
                    <span>DADA&apos;S</span>
                    <span className="text-primary font-black">TECHHUB</span>
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-on-surface-variant/80 leading-none mt-1">
                    IT &amp; Security Solutions
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* ============================================================
              DESKTOP: RIGHT NAVIGATION (Balanced relative to Center Logo)
             ============================================================ */}
          <div className="hidden lg:flex items-center justify-end gap-1 xl:gap-2" role="menubar">
            {/* Projects */}
            <Link
              href="/projects"
              role="menuitem"
              onClick={handleLinkClick}
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-tight transition-all relative ${
                pathname.startsWith("/projects")
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
              }`}
            >
              <span>Projects</span>
              {pathname.startsWith("/projects") && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,101,144,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Insights (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("insights")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/insights"
                role="menuitem"
                onClick={handleLinkClick}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-tight transition-all relative ${
                  pathname.startsWith("/insights")
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                }`}
              >
                <span>Insights</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "insights" ? "rotate-180 text-primary" : "text-on-surface-variant/60"
                  }`}
                />
                {pathname.startsWith("/insights") && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,101,144,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              <AnimatePresence>
                {activeDropdown === "insights" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full right-0 w-[420px] pt-3 z-50"
                  >
                    <div className="surface-card rounded-2xl border border-outline-variant/30 bg-white/98 shadow-2xl p-4 backdrop-blur-2xl space-y-2">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-primary font-manrope pb-2 border-b border-outline-variant/20">
                        Technical Whitepapers &amp; Perspectives
                      </div>
                      {insightDropdownItems.map((art, idx) => {
                        const Icon = art.icon;
                        return (
                          <Link
                            key={idx}
                            href={art.href}
                            onClick={handleLinkClick}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-container-low transition-all group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                                {art.title}
                              </div>
                              <div className="text-[10px] text-on-surface-variant mt-0.5 leading-tight">
                                {art.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About */}
            <Link
              href="/about"
              role="menuitem"
              onClick={handleLinkClick}
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-tight transition-all relative ${
                pathname.startsWith("/about")
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
              }`}
            >
              <span>About</span>
              {pathname.startsWith("/about") && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,101,144,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              role="menuitem"
              onClick={handleLinkClick}
              className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-tight transition-all relative ${
                pathname.startsWith("/contact")
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
              }`}
            >
              <span>Contact</span>
              {pathname.startsWith("/contact") && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(0,101,144,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Action Hub */}
            <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/30">
              {/* Search Button */}
              {onOpenSearch && (
                <button
                  onClick={onOpenSearch}
                  aria-label="Search catalog and services"
                  title="Search (Cmd + K)"
                  className="p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}

              {/* Consultation / Quote CTA */}
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-bold font-manrope shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>Get Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ============================================================
              MOBILE & TABLET CONTROLS
             ============================================================ */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search"
                className="p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              className="p-2 rounded-xl text-on-surface hover:text-primary hover:bg-surface-container transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Bottom Ambient Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* ============================================================
          3. RESPONSIVE MOBILE DRAWER
         ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-primary/20 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="p-5 space-y-4 max-w-lg mx-auto">
              {/* Emergency Banner in Mobile */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-primary/20 text-xs">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>24/7 SLA Hotline Active</span>
                </div>
                <a
                  href="tel:+919876543210"
                  className="px-2.5 py-1 rounded-lg bg-primary text-white font-bold text-[10px]"
                >
                  Call Now
                </a>
              </div>

              {/* Navigation Accordions */}
              <div className="space-y-1 text-sm font-semibold">
                <Link
                  href="/"
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    pathname === "/" ? "bg-primary/10 text-primary font-bold" : "hover:bg-surface-container"
                  }`}
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant/40" />
                </Link>

                {/* Products Accordion */}
                <div>
                  <button
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === "products" ? null : "products"
                      )
                    }
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container transition-colors text-left"
                  >
                    <span>Products &amp; Hardware</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedSection === "products" ? "rotate-180 text-primary" : "text-on-surface-variant/50"
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === "products" && (
                    <div className="pl-4 pr-2 py-2 space-y-1 bg-surface-container-low/50 rounded-xl my-1 border border-outline-variant/20">
                      {productDropdownItems.map((prod, idx) => (
                        <Link
                          key={idx}
                          href={prod.href}
                          onClick={handleLinkClick}
                          className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs hover:bg-surface-container font-medium text-on-surface"
                        >
                          <prod.icon className="w-3.5 h-3.5 text-primary" />
                          <span>{prod.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Services Accordion */}
                <div>
                  <button
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === "services" ? null : "services"
                      )
                    }
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container transition-colors text-left"
                  >
                    <span>Services &amp; AMC</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedSection === "services" ? "rotate-180 text-primary" : "text-on-surface-variant/50"
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === "services" && (
                    <div className="pl-4 pr-2 py-2 space-y-1 bg-surface-container-low/50 rounded-xl my-1 border border-outline-variant/20">
                      {serviceDropdownItems.map((srv, idx) => (
                        <Link
                          key={idx}
                          href={srv.href}
                          onClick={handleLinkClick}
                          className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs hover:bg-surface-container font-medium text-on-surface"
                        >
                          <srv.icon className="w-3.5 h-3.5 text-primary" />
                          <span>{srv.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/projects"
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    pathname.startsWith("/projects") ? "bg-primary/10 text-primary font-bold" : "hover:bg-surface-container"
                  }`}
                >
                  <span>Projects &amp; Case Studies</span>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant/40" />
                </Link>

                <Link
                  href="/industries"
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    pathname.startsWith("/industries") ? "bg-primary/10 text-primary font-bold" : "hover:bg-surface-container"
                  }`}
                >
                  <span>Industries Served</span>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant/40" />
                </Link>

                <Link
                  href="/insights"
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    pathname.startsWith("/insights") ? "bg-primary/10 text-primary font-bold" : "hover:bg-surface-container"
                  }`}
                >
                  <span>Insights &amp; Blog</span>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant/40" />
                </Link>

                <Link
                  href="/about"
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    pathname.startsWith("/about") ? "bg-primary/10 text-primary font-bold" : "hover:bg-surface-container"
                  }`}
                >
                  <span>About Our Legacy</span>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant/40" />
                </Link>

                <Link
                  href="/contact"
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    pathname.startsWith("/contact") ? "bg-primary/10 text-primary font-bold" : "hover:bg-surface-container"
                  }`}
                >
                  <span>Contact &amp; Support</span>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant/40" />
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-outline-variant/20 flex flex-col gap-2.5">
                <Link
                  href="/contact"
                  onClick={handleLinkClick}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white text-center font-bold text-xs rounded-xl shadow-md"
                >
                  Request Enterprise Consultation
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/919999999999?text=Hello%20DADA%27S%20TECHHUB%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 text-center bg-surface-container text-primary font-bold text-xs rounded-xl hover:bg-primary-container/20 transition-colors"
                  >
                    WhatsApp Chat
                  </a>
                  <Link
                    href="/admin/login"
                    onClick={handleLinkClick}
                    className="py-2.5 text-center border border-outline-variant/40 text-on-surface-variant font-bold text-xs rounded-xl hover:bg-surface-container transition-colors"
                  >
                    Admin Login
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
