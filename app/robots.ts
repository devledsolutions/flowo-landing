import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { PUBLIC_ENVIRONMENT } from "@/lib/environment";

export default function robots(): MetadataRoute.Robots {
  if (!PUBLIC_ENVIRONMENT.isPublicProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      host: SITE_URL,
    };
  }

  // Search engines need the Next.js assets to render and evaluate the pages.
  const restrictedPaths = ["/api/", "/monitoring"];

  return {
    rules: [
      {
        userAgent: [
          "OAI-SearchBot",
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "CCBot",
          "Google-Extended",
          "PerplexityBot",
          "Perplexity-User",
          "Applebot",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: restrictedPaths,
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
