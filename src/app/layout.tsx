import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { businessInfo } from "@/data/business-info";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(businessInfo.websiteUrl),
  alternates: {
    canonical: "/",
  },
  title: "DADA'S I.T Services & Security Solutions | Enterprise Infrastructure & CCTV",
  description:
    "Leading enterprise IT infrastructure, structural cabling, AI CCTV surveillance, biometric access control, server sales, ITFMS, and Annual Maintenance Contracts (AMC). Serving Ador Welding, MCA Mumbai, Godrej Lawkim and 200+ corporations.",
  keywords: [
    "DADA'S I.T",
    "Enterprise IT Services",
    "Structural Cabling",
    "CCTV Installation",
    "Biometric Access Control",
    "Server Sales and Services",
    "IT Facility Management",
    "Annual Maintenance Contract",
    "AMC Services Pune Mumbai",
    "IP Surveillance Systems",
    "Video Door Phones",
    "Web Development Solutions"
  ],
  authors: [{ name: "DADA'S I.T Services & Security Solutions" }],
  creator: "DADA'S I.T",
  publisher: "DADA'S I.T",
  icons: {
    icon: businessInfo.logoPath,
    shortcut: businessInfo.logoPath,
    apple: businessInfo.logoPath,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "DADA'S I.T Services & Security Solutions",
    description:
      "Enterprise IT Infrastructure, Advanced CCTV Surveillance, Biometrics, Server Management & Facility AMC.",
    url: businessInfo.websiteUrl,
    siteName: "DADA'S I.T Services & Security Solutions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${businessInfo.websiteUrl}${businessInfo.logoPath}`,
        width: 1600,
        height: 1600,
        alt: "DADA'S I.T Services & Security Solutions Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DADA'S I.T Services & Security Solutions",
    description:
      "Securing futures through intelligent IT infrastructure, 4K CCTV surveillance, and proactive facility management.",
    images: [`${businessInfo.websiteUrl}${businessInfo.logoPath}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${businessInfo.websiteUrl}/#organization`,
        name: businessInfo.name,
        url: businessInfo.websiteUrl,
        logo: `${businessInfo.websiteUrl}${businessInfo.logoPath}`,
        email: businessInfo.email,
        founder: {
          "@type": "Person",
          name: "Mr. Dada",
          jobTitle: "Founder & CEO",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: businessInfo.phone,
          email: businessInfo.email,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Marathi"],
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${businessInfo.websiteUrl}/#localbusiness`,
        name: businessInfo.name,
        url: businessInfo.websiteUrl,
        image: `${businessInfo.websiteUrl}${businessInfo.logoPath}`,
        telephone: businessInfo.phone,
        email: businessInfo.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: businessInfo.address,
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "411041",
          addressCountry: "IN",
        },
      },
    ],
  };

  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-manrope bg-background text-on-background">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
