"use client";

import { useState } from "react";
import { Compass } from "lucide-react";
import { useSegment } from "@/providers/segment-provider";
import { LeadCaptureModal } from "@/components/lead-capture-modal";
import { buildSignupUrl } from "@/components/cta-links";
import {
  PLAN_NAMES,
  PLAN_PRIORITIES,
  PLAN_RECOMMENDATION_NOTE,
  PLAN_SUMMARIES,
  PROFESSIONALS_LIMITS,
  recommendPlan,
  UNITS_LIMITS,
  type PlanPriority,
} from "@/lib/calculators/plan-recommendation";
import { growthToolStyles as styles, ToolWindow } from "./tool-window";

const hintClassName = "text-[0.66rem] font-normal leading-snug";

export function PlanSelector() {
  const { track } = useSegment();
  const [professionals, setProfessionals] = useState(2);
  const [units, setUnits] = useState(1);
  const [priority, setPriority] = useState<PlanPriority>("agenda");
  const [selected, setSelected] = useState(false);

  const plan = recommendPlan(professionals, units);
  const planName = PLAN_NAMES[plan];

  const select = () => {
    setSelected(true);
    track("Plan Selected", { plan, professionals, units, priority });
  };

  return (
    <ToolWindow label="ESCOLHA GUIADA" title="Qual plano combina com a sua rotina?" badge="2 minutos">
      <div className={styles.inputGrid}>
        <label>
          Quantos profissionais atendem na agenda?
          <input
            type="number"
            min={PROFESSIONALS_LIMITS.min}
            max={PROFESSIONALS_LIMITS.max}
            inputMode="numeric"
            aria-describedby="plan-selector-professionals-hint"
            value={professionals}
            onChange={(event) => setProfessionals(Number(event.target.value))}
          />
          <span id="plan-selector-professionals-hint" className={hintClassName}>
            Conte só quem atende cliente com horário marcado.
          </span>
        </label>
        <label>
          Quantas unidades a barbearia tem?
          <input
            type="number"
            min={UNITS_LIMITS.min}
            max={UNITS_LIMITS.max}
            inputMode="numeric"
            aria-describedby="plan-selector-units-hint"
            value={units}
            onChange={(event) => setUnits(Number(event.target.value))}
          />
          <span id="plan-selector-units-hint" className={hintClassName}>
            Unidade é cada endereço com atendimento.
          </span>
        </label>
        <label className={styles.fullInput}>
          O que mais quer resolver primeiro?
          <select value={priority} onChange={(event) => setPriority(event.target.value as PlanPriority)}>
            {(Object.keys(PLAN_PRIORITIES) as PlanPriority[]).map((id) => (
              <option key={id} value={id}>
                {PLAN_PRIORITIES[id].option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button className={styles.calculateButton} onClick={select} type="button">
        <Compass aria-hidden="true" size={17} />
        Ver recomendação
      </button>
      <div className={styles.resultPanel} aria-live="polite">
        <span className={styles.resultLabel}>{selected ? "RECOMENDAÇÃO DA FLOWO" : "PRÉVIA DA RECOMENDAÇÃO"}</span>
        <div className={styles.resultPrimary}>
          <strong>{planName}</strong>
          <span>plano para começar</span>
        </div>
        <div className={styles.messagePreview}>{PLAN_SUMMARIES[plan]}</div>
        <div className={styles.resultGrid}>
          <div>
            <small>Prioridade informada</small>
            <strong>{PLAN_PRIORITIES[priority].label}</strong>
          </div>
          <div>
            <small>Próximo passo</small>
            {plan === "empresarial" ? (
              <LeadCaptureModal intent="enterprise" source="enterprise_plan_selector">
                <button type="button" className="min-h-11 text-left text-[0.9rem] font-semibold underline underline-offset-4">
                  Falar com um especialista
                </button>
              </LeadCaptureModal>
            ) : (
              <strong>
                <a
                  href={buildSignupUrl({ plan, campaign: "qual_plano", content: "plan_selector" })}
                  className="underline underline-offset-4"
                >
                  Começar no {planName}
                </a>
              </strong>
            )}
            <a href="/precos" className="mt-1 block text-[0.72rem] underline underline-offset-4">
              Ver detalhes
            </a>
          </div>
        </div>
        <p className={styles.resultNote}>{PLAN_RECOMMENDATION_NOTE}</p>
      </div>
    </ToolWindow>
  );
}
