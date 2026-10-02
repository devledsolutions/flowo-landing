export const COMMISSION_RATE_MAX = 100;

export const COMMISSION_NOTE =
  "Simulação operacional. A regra real deve estar escrita e conferida com orientação contábil e trabalhista adequada à relação da sua equipe.";

export type CommissionInput = {
  /** Closed services in reais. */
  services: number;
  /** Percentage from 0 to 100. */
  serviceRate: number;
  /** Products sold in reais. */
  products: number;
  /** Percentage from 0 to 100. */
  productRate: number;
  /** Discounts or refunds that reduce the service base, in reais. */
  adjustments: number;
};

export type CommissionResult = {
  serviceBase: number;
  serviceRate: number;
  productRate: number;
  serviceCommission: number;
  productCommission: number;
  total: number;
};

function positive(value: number): number {
  return Math.max(Number.isFinite(value) ? value : 0, 0);
}

function rate(value: number): number {
  return Math.min(positive(value), COMMISSION_RATE_MAX);
}

export function calculateCommission({
  services,
  serviceRate,
  products,
  productRate,
  adjustments,
}: CommissionInput): CommissionResult {
  const serviceBase = positive(positive(services) - positive(adjustments));
  const cappedServiceRate = rate(serviceRate);
  const cappedProductRate = rate(productRate);
  const serviceCommission = serviceBase * (cappedServiceRate / 100);
  const productCommission = positive(products) * (cappedProductRate / 100);
  return {
    serviceBase,
    serviceRate: cappedServiceRate,
    productRate: cappedProductRate,
    serviceCommission,
    productCommission,
    total: serviceCommission + productCommission,
  };
}
