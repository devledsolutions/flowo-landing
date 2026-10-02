import { describe, expect, it } from "vitest";
import { calculateCommission } from "../commission";

const defaults = {
  services: 8200,
  serviceRate: 45,
  products: 650,
  productRate: 10,
  adjustments: 120,
};

describe("calculateCommission", () => {
  it("matches the page defaults", () => {
    const result = calculateCommission(defaults);
    expect(result.serviceBase).toBe(8080);
    expect(result.serviceCommission).toBeCloseTo(3636, 5);
    expect(result.productCommission).toBeCloseTo(65, 5);
    expect(result.total).toBeCloseTo(3701, 5);
  });

  it("gives a zero base when adjustments exceed services", () => {
    const result = calculateCommission({ ...defaults, adjustments: 9000 });
    expect(result.serviceBase).toBe(0);
    expect(result.serviceCommission).toBe(0);
  });

  it("caps commission rates at 100%", () => {
    const result = calculateCommission({ ...defaults, serviceRate: 150, productRate: 400 });
    expect(result.serviceRate).toBe(100);
    expect(result.productRate).toBe(100);
    expect(result.serviceCommission).toBe(8080);
    expect(result.productCommission).toBe(650);
    expect(result.total).toBe(8730);
  });

  it("treats negative or missing values as zero", () => {
    const result = calculateCommission({
      services: Number.NaN,
      serviceRate: -10,
      products: -5,
      productRate: Number.NaN,
      adjustments: -300,
    });
    expect(result.total).toBe(0);
  });
});
