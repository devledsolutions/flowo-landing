import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const restrictedPaths = ["/api/", "/monitoring", "/_next/"];

  return {
    rules: [
      {
        userAgent: [
          "OAI-SearchBot",
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "CCBot",
          "Google-Extended",
          "PerplexityBot",
        ],
        allow: "/",
        disallow: restrictedPaths,
        crawlDelay: 2,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: restrictedPaths,
      },
      // Block known high-noise crawler that has low relevance for our distribution goals.
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
