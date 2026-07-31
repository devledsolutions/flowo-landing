import type { Metadata } from "next";
import { ImplementationLanding } from "@/components/design-review/lead-offer-landing";

export const metadata: Metadata = {
  title: "Mockup — Recepção sem Interrupção",
  robots: { index: false, follow: false },
};

export default function ImplementationOfferReviewPage() {
  return <ImplementationLanding />;
}
