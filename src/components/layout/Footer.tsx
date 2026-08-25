"use client";

import React from "react";
import Link from "next/link";
import { Shield, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-[#1F3246] text-white font-manrope w-full border-t border-outline-variant/30 relative overflow-hidden"
      role="contentinfo"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  DADA&apos;S I.T
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary-container">
                  Services &amp; Security Solutions
                </span>
              </div>
            </Link>
            <p className="text-surface-variant text-sm max-w-md leading-relaxed">
              Securing futures through intelligent infrastructure, high-definition AI surveillance, mission-critical server management, and uncompromising technical excellence.
            </p>
            <div className="space-y-2 pt-2 text-sm text-surface-variant">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary-container shrink-0" />
                <span>Pune &amp; Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-container shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 (0) 20 2500 XXXX / +91 98XXX XXXXX
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-container shrink-0" />
                <a href="mailto:contact@dadasit.com" className="hover:text-white transition-colors">
                  contact@dadasit.com
                </a>
              </div>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4">
              Services &amp; Solutions
            </h3>
            <ul className="space-y-2.5 text-sm text-surface-variant">
              <li>
                <Link href="/services/it-infrastructure" className="hover:text-primary-container transition-colors">
                  IT Infrastructure &amp; Cabling
                </Link>
              </li>
              <li>
                <Link href="/services/cctv-security" className="hover:text-primary-container transition-colors">
                  Advanced CCTV Surveillance
                </Link>
              </li>
              <li>
                <Link href="/services/access-control" className="hover:text-primary-container transition-colors">
                  Biometric Access Control
                </Link>
              </li>
              <li>
                <Link href="/services/managed-it-amc" className="hover:text-primary-container transition-colors">
                  Managed IT &amp; AMC Plans
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-digital" className="hover:text-primary-container transition-colors">
                  Web Development &amp; Cloud
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-primary-container font-semibold inline-flex items-center gap-1 hover:underline pt-1">
                  <span>View All 12+ Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-surface-variant">
              <li>
                <Link href="/about" className="hover:text-primary-container transition-colors">
                  About Our Legacy
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary-container transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary-container transition-colors">
                  Product Catalogue
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-primary-container transition-colors">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-primary-container transition-colors">
                  Insights &amp; Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-container transition-colors">
                  Contact &amp; Emergency Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Standards */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4">
              Trust &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-sm text-surface-variant">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary-container transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-container transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <span className="text-xs text-outline-variant block pt-2">
                  ISO &amp; TIA/EIA Standards Compliant Cabling &amp; Tier-4 Security Deployments.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-surface-variant">
          <p>© {new Date().getFullYear()} DADA&apos;S I.T Services &amp; Security Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>High-Tech Minimalist Architecture</span>
            <span>•</span>
            <span>Enterprise-Grade Reliability</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
