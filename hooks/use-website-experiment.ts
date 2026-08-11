"use client";

import { useEffect, useState } from "react";
import { useSegment } from "@/providers/segment-provider";

export function useWebsiteExperiment(experimentKey: string) {
  const { hasConsent, getAnonymousId, track } = useSegment();
  const [variantKey, setVariantKey] = useState<string | null>(null);

  useEffect(() => {
    if (!hasConsent) return;
    const segmentAnonymousId = getAnonymousId();
    if (!segmentAnonymousId) return;
    let active = true;
    void fetch("/api/growth-experiment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ experimentKey, segmentAnonymousId }),
    })
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as { variantKey?: string | null };
      })
      .then((result) => {
        if (!active || !result?.variantKey) return;
        setVariantKey(result.variantKey);
        track("Experiment Viewed", {
          experiment_key: experimentKey,
          variant_key: result.variantKey,
        });
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [experimentKey, getAnonymousId, hasConsent, track]);

  return variantKey;
}
