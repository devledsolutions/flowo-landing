import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  esbuild: { jsx: "automatic" },
  test: {
    environment: "node",
    include: ["**/__tests__/**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "worktrees/**", "tmp/**"],
    env: {
      // The Vercel build runs the suite with NODE_ENV=production, which loads
      // React's production build and breaks act() in the DOM tests.
      NODE_ENV: "test",
      NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT: "development",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3001",
      NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      NEXT_PUBLIC_WHATSAPP_NUMBER: "5511999999999",
      NEXT_PUBLIC_CONSENT_COOKIE_NAME: "cookieConsent",
      NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN: "host-only",
      // Brazil is west of UTC: date helpers must not drift after 21:00.
      TZ: "America/Sao_Paulo",
    },
  },
});
