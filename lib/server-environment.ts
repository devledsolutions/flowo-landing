import { PUBLIC_ENVIRONMENT } from "@/lib/environment";

function isLoopbackHostname(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

function normalizeConvexUrl(value: string | undefined, name: string): string {
  if (!value?.trim()) throw new Error(`${name} is required`);
  const parsed = new URL(value.trim());
  const local = parsed.protocol === "http:" && isLoopbackHostname(parsed.hostname);
  const hosted =
    parsed.protocol === "https:" && parsed.hostname.endsWith(".convex.cloud");
  if ((!local && !hosted) || parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new Error(`${name} must be a Convex deployment origin`);
  }
  return parsed.origin;
}

export function requireConvexUrl(): string {
  const server = normalizeConvexUrl(process.env.CONVEX_URL, "CONVEX_URL");
  const browser = normalizeConvexUrl(
    process.env.NEXT_PUBLIC_CONVEX_URL,
    "NEXT_PUBLIC_CONVEX_URL",
  );
  if (server !== browser) {
    throw new Error("CONVEX_URL and NEXT_PUBLIC_CONVEX_URL must match");
  }
  if (
    PUBLIC_ENVIRONMENT.deploymentEnvironment !== "development" &&
    !server.startsWith("https://")
  ) {
    throw new Error("Hosted environments must use a hosted Convex deployment");
  }
  return server;
}

export function resolveConvexUrl(): string | undefined {
  try {
    return requireConvexUrl();
  } catch {
    return undefined;
  }
}
