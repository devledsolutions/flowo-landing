import type { Metadata } from "next";
import { DiagnosisLanding } from "@/components/design-review/lead-offer-landing";

export const metadata: Metadata = {
  title: "Mockup — Raio-X da Agenda",
  robots: { index: false, follow: false },
};

export default function DiagnosisOfferReviewPage() {
  return <DiagnosisLanding />;
}
