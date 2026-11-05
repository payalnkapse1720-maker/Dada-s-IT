import { MetadataRoute } from "next";
import { businessInfo } from "@/data/business-info";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${businessInfo.websiteUrl}/sitemap.xml`,
  };
}
