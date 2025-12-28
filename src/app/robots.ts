import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zstars.app";
const normalizedSiteUrl = siteUrl.replace(/\/+$/, "");
const host = new URL(normalizedSiteUrl).host;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${normalizedSiteUrl}/sitemap.xml`,
    host,
  };
}

