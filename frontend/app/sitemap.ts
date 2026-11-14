import type { MetadataRoute } from "next";
import { categories, palmVarieties } from "../lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://badrpalm.com").replace(/\/$/, "");

  const staticRoutes = [
    { path: "", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/services", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/gallery", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const varietyRoutes = palmVarieties.map((v) => ({
    path: `/palm/${v.key}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const categoryRoutes = categories.map((c) => ({
    path: `/projects/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const allRoutes = [...staticRoutes, ...varietyRoutes, ...categoryRoutes];

  return allRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
