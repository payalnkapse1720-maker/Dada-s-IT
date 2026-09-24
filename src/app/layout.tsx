import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
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
    "AMC Services India",
    "Pan-India IT Infrastructure",
    "Enterprise CCTV Surveillance India",
    "IP Surveillance Systems",
    "Video Door Phones",
    "Web Development Solutions"
  ],
  authors: [{ name: "DADA'S I.T Services & Security Solutions" }],
  creator: "DADA'S I.T",
  publisher: "DADA'S I.T",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "DADA'S I.T Services & Security Solutions",
    description:
      "Enterprise IT Infrastructure, Advanced CCTV Surveillance, Biometrics, Server Management & Facility AMC.",
    url: "https://dadasit.com",
    siteName: "DADA'S I.T Services & Security Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DADA'S I.T Services & Security Solutions",
    description:
      "Securing futures through intelligent IT infrastructure, 4K CCTV surveillance, and proactive facility management.",
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
        "@id": "https://dadasit.com/#organization",
        name: "DADA'S I.T Services & Security Solutions",
        url: "https://dadasit.com",
        logo: "https://dadasit.com/logo.png",
        founder: {
          "@type": "Person",
          name: "Mr. Dada",
          jobTitle: "Founder & CEO",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9876543210",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Marathi"],
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://dadasit.com/#localbusiness",
        name: "DADA'S I.T Services & Security Solutions",
        image: "https://dadasit.com/og-image.jpg",
        telephone: "+91-9876543210",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "18.5204",
          longitude: "73.8567",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
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
