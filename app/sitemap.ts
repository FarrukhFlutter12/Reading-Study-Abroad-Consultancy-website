import type { MetadataRoute } from "next";
import { countries } from "@/data/countries";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { site } from "@/data/site";

const STATIC_ROUTES: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/free-assessment", priority: 0.95, freq: "monthly" },
  { path: "/destinations", priority: 0.9, freq: "monthly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  { path: "/apply", priority: 0.85, freq: "monthly" },
  { path: "/contact", priority: 0.85, freq: "monthly" },
  { path: "/about", priority: 0.8, freq: "monthly" },
  { path: "/scholarships", priority: 0.8, freq: "monthly" },
  { path: "/test-preparation", priority: 0.8, freq: "monthly" },
  { path: "/universities", priority: 0.75, freq: "monthly" },
  { path: "/blog", priority: 0.75, freq: "weekly" },
  { path: "/faqs", priority: 0.75, freq: "monthly" },
  { path: "/success-stories", priority: 0.6, freq: "monthly" },
  { path: "/privacy-policy", priority: 0.3, freq: "yearly" },
  { path: "/terms", priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${site.url}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  const countryEntries = countries.map((c) => ({
    url: `${site.url}/destinations/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const serviceEntries = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postEntries = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.65,
  }));

  return [
    ...staticEntries,
    ...countryEntries,
    ...serviceEntries,
    ...postEntries,
  ];
}
