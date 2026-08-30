import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contractPath = path.join(root, "data", "flowo-product-contract.json");
const pricingPath = path.join(root, "data", "pricing-data.ts");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const pricing = fs.readFileSync(pricingPath, "utf8");

const errors = [];
const expect = (condition, message) => {
  if (!condition) errors.push(message);
};

expect(contract.version === "2026-08-29.1", "contract version is stale");
expect(contract.positioning.headline.includes("tem horário hoje?"), "positioning headline drifted");
expect(contract.trial.durationDays === 14, "trial duration must remain 14 days");
expect(contract.trial.requiresCard === false, "assisted trial must not require a card");
expect(contract.trial.autoRenew === false, "assisted trial must not auto-renew");
expect(contract.onboarding.paymentsRequiredForOnboarding === false, "payments must stay optional during onboarding");
expect(contract.cancellation.web === "manage_in_flowo", "web cancellation authority drifted");
expect(contract.cancellation.appStore === "manage_in_store", "App Store cancellation authority drifted");
expect(contract.cancellation.playStore === "manage_in_store", "Google Play cancellation authority drifted");
expect(contract.cancellation.accessUntilPaidPeriodEnd === true, "paid-period access policy drifted");
expect(contract.cancellation.whatsapp.managedSeparately === true, "WhatsApp cancellation boundary drifted");
expect(contract.cancellation.whatsapp.disconnectOnPeriodEndCancellation === false, "period-end cancellation must not disconnect WhatsApp");
expect(contract.nativeStoreCatalog.plans.solo.monthlyPriceCents === 44900, "native Solo monthly price drifted");
expect(contract.nativeStoreCatalog.plans.solo.yearlyPriceCents === 449000, "native Solo annual price drifted");
expect(contract.nativeStoreCatalog.plans.equipe.monthlyPriceCents === 92900, "native Equipe monthly price drifted");
expect(contract.nativeStoreCatalog.plans.equipe.yearlyPriceCents === 929000, "native Equipe annual price drifted");

const expected = {
  solo: ["monthly: 379", "annualTotal: 3790", "annualPerMonth: 316"],
  equipe: ["monthly: 789", "annualTotal: 7890", "annualPerMonth: 658"],
};
for (const [plan, values] of Object.entries(expected)) {
  const block = pricing.match(new RegExp(`id: '${plan}',[\\s\\S]*?(?=\\n  },|\\n    id:|\\n\\] as const)`))?.[0] ?? "";
  for (const value of values) expect(block.includes(value), `${plan} pricing drifted: ${value}`);
}
expect(!pricing.includes("monthly: 249") && !pricing.includes("monthly: 549"), "old public prices remain in pricing data");
expect(pricing.includes("Pagamentos integrados opcionais"), "optional payment capability disappeared");
const pricingSection = fs.readFileSync(path.join(root, "components", "home-pricing-section.tsx"), "utf8");
expect(pricingSection.includes("14 dias"), "assisted trial copy disappeared");

if (errors.length) {
  console.error(["Product contract check failed:", ...errors.map((error) => `- ${error}`)].join("\n"));
  process.exit(1);
}

console.log(`Product contract ${contract.version} matches site pricing, trial, cancellation and onboarding policy.`);
