"use client";

import { useCallback } from "react";
import { useMetaRemarketing } from "@/providers/meta-remarketing-provider";

export function useLeadRemarketing() {
  const { track } = useMetaRemarketing();

  return useCallback(
    ({
      eventId,
      source,
      resource,
      kind = "lead",
    }: {
      eventId?: string;
      source: string;
      resource?: string;
      kind?: "lead" | "newsletter" | "waitlist";
    }) => {
      if (!eventId) return;
      track(
        "Lead",
        {
          content_name: resource || source,
          content_category: kind,
          lead_source: source,
        },
        eventId
      );
    },
    [track]
  );
}
