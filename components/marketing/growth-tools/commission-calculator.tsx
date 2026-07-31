"use client";

import { useMemo, useState } from "react";
import { ReceiptText } from "lucide-react";
import { useSegment } from "@/providers/segment-provider";
import {
  growthToolStyles as styles,
  ToolWindow,
} from "./tool-window";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function positive(value: number) {
  return Math.max(Number.isFinite(value) ? value : 0, 0);
}

export function CommissionCalculator() {
  const { track } = useSegment();
  const [services, setServices] = useState(8200);
  const [serviceRate, setServiceRate] = useState(45);
  const [products, setProducts] = useState(650);
  const [productRate, setProductRate] = useState(10);
  const [adjustments, setAdjustments] = useState(120);
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    const serviceCommission =
      positive(services - adjustments) * (positive(serviceRate) / 100);
    const productCommission =
      positive(products) * (positive(productRate) / 100);
    return {
      serviceCommission,
      productCommission,
      total: serviceCommission + productCommission,
      serviceBase: positive(services - adjustments),
    };
  }, [adjustments, productRate, products, serviceRate, services]);

  const calculate = () => {
    setCalculated(true);
    track("Growth Tool Calculated", {
      tool_id: "commission_closing",
      service_rate: serviceRate,
      product_rate: productRate,
      has_adjustments: adjustments > 0,
    });
  };

  return (
    <ToolWindow
      label="MEMÓRIA DE CÁLCULO"
      title="Simule o acerto de um barbeiro."
      badge="Sem planilha"
    >
      <div className={styles.inputGrid}>
        <label>
          Serviços fechados (R$)
          <input
            type="number"
            min="0"
            step="50"
            inputMode="decimal"
            value={services}
            onChange={(event) => setServices(Number(event.target.value))}
          />
        </label>
        <label>
          Comissão em serviços (%)
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            inputMode="decimal"
            value={serviceRate}
            onChange={(event) => setServiceRate(Number(event.target.value))}
          />
        </label>
        <label>
          Produtos vendidos (R$)
          <input
            type="number"
            min="0"
            step="10"
            inputMode="decimal"
            value={products}
            onChange={(event) => setProducts(Number(event.target.value))}
          />
        </label>
        <label>
          Comissão em produtos (%)
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            inputMode="decimal"
            value={productRate}
            onChange={(event) => setProductRate(Number(event.target.value))}
          />
        </label>
        <label className={styles.fullInput}>
          Descontos ou estornos que reduzem a base (R$)
          <input
            type="number"
            min="0"
            step="10"
            inputMode="decimal"
            value={adjustments}
            onChange={(event) => setAdjustments(Number(event.target.value))}
          />
        </label>
      </div>
      <button className={styles.calculateButton} onClick={calculate} type="button">
        <ReceiptText aria-hidden="true" size={17} />
        Conferir memória de cálculo
      </button>
      <div className={styles.resultPanel} aria-live="polite">
        <span className={styles.resultLabel}>
          {calculated ? "TOTAL SIMULADO" : "PRÉVIA DO ACERTO"}
        </span>
        <div className={styles.resultPrimary}>
          <strong>{brl.format(result.total)}</strong>
          <span>de comissão no período</span>
        </div>
        <div className={styles.resultGrid}>
          <div>
            <small>Serviços · base {brl.format(result.serviceBase)}</small>
            <strong>{brl.format(result.serviceCommission)}</strong>
          </div>
          <div>
            <small>Produtos</small>
            <strong>{brl.format(result.productCommission)}</strong>
          </div>
        </div>
        <p className={styles.resultNote}>
          Simulação operacional. A regra real deve estar escrita e validada com
          orientação contábil e trabalhista adequada à relação da sua equipe.
        </p>
      </div>
    </ToolWindow>
  );
}
