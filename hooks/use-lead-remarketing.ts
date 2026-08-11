"use client";

import { useCallback } from "react";
import { useMetaRemarketing } from "@/providers/meta-remarketing-provider";
import { usePaidMedia } from "@/providers/paid-media-provider";

export function useLeadRemarketing() {
  const { track } = useMetaRemarketing();
  const { trackLead } = usePaidMedia();

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
      if (eventId) {
        track(
          "Lead",
          {
            content_name: resource || source,
            content_category: kind,
            lead_source: source,
          },
          eventId
        );
      }
      trackLead({ source, resource, kind });
    },
    [track, trackLead]
  );
}
