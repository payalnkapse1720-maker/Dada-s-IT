import React from "react";
import { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export const metadata: Metadata = {
  title: "Admin Portal | DADA'S TECHHUB",
  description: "Secure Enterprise Management System for DADA'S TECHHUB",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
    </AuthProvider>
  );
}
