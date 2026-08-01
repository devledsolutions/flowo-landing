"use client";

import { ArrowRight } from "lucide-react";
import { LeadCaptureModal } from "@/components/lead-capture-modal";
import { cn } from "@/lib/utils";

export function SalesCampaignCta({
  placement,
  label = "Ver a Flowo na minha barbearia",
  className,
}: {
  placement: string;
  label?: string;
  className?: string;
}) {
  return (
    <LeadCaptureModal source={`sales-campaign:${placement}`}>
      <button
        type="button"
        className={cn(
          "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-label font-semibold text-cream transition-colors duration-200 ease-out-quint hover:bg-ink/90 sm:w-auto",
          className,
        )}
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </LeadCaptureModal>
  );
}

export function SalesCampaignMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <SalesCampaignCta
        placement="mobile_sticky"
        label="Ver a Flowo na minha agenda"
        className="w-full"
      />
    </div>
  );
}
