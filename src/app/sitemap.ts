import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  if (!url) return []; // Never invent a public domain. Vercel supplies one automatically.
  return ["pt", "en"].map(locale => ({ url: `${url}/${locale}`, changeFrequency: "monthly", priority: locale === "pt" ? 1 : 0.9, alternates: { languages: { "pt-BR": `${url}/pt`, en: `${url}/en` } } }));
}
