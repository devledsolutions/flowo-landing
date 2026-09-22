import type { NextConfig } from "next";

const blocksSearchIndexing =
  process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production";

const nextConfig: NextConfig = {
  reactStrictMode: false, // This is causing double rendering in development
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      ...(blocksSearchIndexing
        ? [
            {
              source: "/:path*",
              headers: [
                {
                  key: "X-Robots-Tag",
                  value: "noindex, nofollow, noarchive",
                },
              ],
            },
          ]
        : []),
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/84ee248de45965560524181d9e815895.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Keep downloadable assets out of search results so their explanatory
        // landing pages own the query and conversion path.
        source: "/downloads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, noarchive",
          },
        ],
      },
      {
        // Public image assets can also benefit from browser caching.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        // Non-versioned posters and captions must not stay stale for a full week.
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        // The filename changes whenever this render changes, so it is immutable.
        source: "/videos/flowo-institucional-voz-natural-2026-07.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Keep the vertical render on the same content-addressing policy.
        source:
          "/videos/flowo-institucional-voz-natural-2026-07-vertical.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Brand assets are stable most of the time.
        source: "/flowo-logo.svg",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
