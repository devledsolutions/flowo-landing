import { PricingHeaderHome } from "./pricing/pricing-header-home";
import { PricingSection } from "./pricing/pricing-section";

/**
 * Pricing block for the home page. Renders content only — the page owns the
 * wrapping <section id="precos">, so no nested sections or duplicate ids.
 */
export default function HomePricingSection() {
  return (
    <div>
      <PricingHeaderHome />
      <div className="mt-12">
        <PricingSection showTrustSignals />
      </div>
    </div>
  );
}
