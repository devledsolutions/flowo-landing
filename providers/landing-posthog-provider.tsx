"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { captureLandingPageview, initializeLandingPostHog } from "@/lib/observability/posthog-client";

export function LandingPostHogProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    initializeLandingPostHog();
    captureLandingPageview();
  }, [pathname]);
  return children;
}
