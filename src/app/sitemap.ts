import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { routes } from "@/config/brand";
import { archetypes } from "@/content/archetypes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number }[] = [
    { path: routes.home, priority: 1 },
    { path: routes.howItWorks, priority: 0.9 },
    { path: routes.product, priority: 0.9 },
    { path: routes.buildMyBusiness, priority: 0.9 },
    { path: routes.website, priority: 0.8 },
    { path: routes.buildAndRun, priority: 0.8 },
    { path: routes.businesses, priority: 0.8 },
    { path: routes.pricing, priority: 0.8 },
    { path: routes.trust, priority: 0.7 },
    { path: routes.about, priority: 0.5 },
    { path: routes.start, priority: 0.9 },
  ];

  return [
    ...pages.map((p) => ({
      url: new URL(p.path, siteUrl).toString(),
      lastModified: now,
      priority: p.priority,
    })),
    ...archetypes.map((a) => ({
      url: new URL(`${routes.businesses}/${a.slug}`, siteUrl).toString(),
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
