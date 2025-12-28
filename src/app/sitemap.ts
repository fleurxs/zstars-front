import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zstars.app";
const normalizedSiteUrl = siteUrl.replace(/\/+$/, "");

const basePaths = ["", "/about", "/contacts", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = Array.from(
    new Set([...BLOG_POSTS.ru, ...BLOG_POSTS.en].map((post) => post.slug)),
  );
  const lastModified = new Date().toISOString();

  const staticEntries = basePaths.map((path) => ({
    url: path ? `${normalizedSiteUrl}${path}` : normalizedSiteUrl,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const blogEntries = blogSlugs.map((slug) => ({
    url: `${normalizedSiteUrl}/blog/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}

