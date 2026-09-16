import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const url = getSiteUrl();
  return { rules: { userAgent: "*", allow: "/" }, ...(url ? { sitemap: `${url}/sitemap.xml` } : {}) };
}
