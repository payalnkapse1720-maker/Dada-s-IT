"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFAB from "./WhatsAppFAB";
import SearchModal from "../ui/SearchModal";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <main className="flex-1 w-full" id="main-content">
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
