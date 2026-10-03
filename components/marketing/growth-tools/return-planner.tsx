"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCheck2 } from "lucide-react";
import { useSegment } from "@/providers/segment-provider";
import {
  isValidIsoDate,
  localIsoDate,
  planReturn,
  returnMessage,
  RETURN_PLANNER_NOTE,
  RETURN_SERVICES,
  type ReturnService,
  type ReturnTone,
} from "@/lib/calculators/return-planner";
import {
  growthToolStyles as styles,
  ToolWindow,
} from "./tool-window";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatIsoDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

export function ReturnPlanner() {
  const { track } = useSegment();
  // The default date depends on the visitor's time zone, so it is filled in
  // after hydration instead of on the server.
  const [lastVisit, setLastVisit] = useState("");
  const [interval, setInterval] = useState(30);
  const [advance, setAdvance] = useState(3);
  const [service, setService] = useState<ReturnService>("corte");
  const [tone, setTone] = useState<ReturnTone>("proximo");
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    setLastVisit((current) => current || localIsoDate(new Date(), 24));
  }, []);

  const plan = useMemo(
    () =>
      isValidIsoDate(lastVisit)
        ? planReturn({
            lastVisit,
            intervalDays: interval,
            advanceDays: advance,
            service,
            tone,
          })
        : null,
    [advance, interval, lastVisit, service, tone],
  );
  const message = plan?.message ?? returnMessage(service, tone);

  const calculate = () => {
    setCalculated(true);
    track("Growth Tool Calculated", {
      tool_id: "customer_return_planner",
      service: RETURN_SERVICES[service],
      typical_interval_days: interval,
      contact_advance_days: advance,
      message_tone: tone,
    });
  };

  return (
    <ToolWindow
      label="JANELA DE RETORNO"
      title="Planeje quando e como chamar."
      badge="Sem spam"
    >
      <div className={styles.inputGrid}>
        <label>
          Última visita
          <input
            type="date"
            value={lastVisit}
            onChange={(event) => setLastVisit(event.target.value)}
          />
        </label>
        <label>
          Intervalo comum do serviço
          <select
            value={interval}
            onChange={(event) => setInterval(Number(event.target.value))}
          >
            <option value="15">15 dias</option>
            <option value="21">21 dias</option>
            <option value="30">30 dias</option>
            <option value="45">45 dias</option>
            <option value="60">60 dias</option>
          </select>
        </label>
        <label>
          Serviço
          <select
            value={service}
            onChange={(event) => setService(event.target.value as ReturnService)}
          >
            <option value="corte">Corte</option>
            <option value="barba">Barba</option>
            <option value="corte_e_barba">Corte e barba</option>
            <option value="outro">Outro procedimento</option>
          </select>
        </label>
        <label>
          Avisar antes da data estimada
          <select
            value={advance}
            onChange={(event) => setAdvance(Number(event.target.value))}
          >
            <option value="0">No mesmo dia</option>
            <option value="2">2 dias antes</option>
            <option value="3">3 dias antes</option>
            <option value="5">5 dias antes</option>
            <option value="7">7 dias antes</option>
          </select>
        </label>
        <label className={styles.fullInput}>
          Tom da mensagem
          <select
            value={tone}
            onChange={(event) =>
              setTone(event.target.value as ReturnTone)
            }
          >
            <option value="proximo">Próximo e cuidadoso</option>
            <option value="direto">Direto e objetivo</option>
          </select>
        </label>
      </div>
      <button className={styles.calculateButton} onClick={calculate} type="button">
        <CalendarCheck2 aria-hidden="true" size={17} />
        Montar meu plano de retorno
      </button>
      <div className={styles.resultPanel} aria-live="polite">
        <span className={styles.resultLabel}>
          {calculated ? "PLANO SUGERIDO" : "PRÉVIA DO PLANEJAMENTO"}
        </span>
        <div className={styles.resultPrimary}>
          <strong>{plan ? formatIsoDate(plan.contactDate) : "…"}</strong>
          <span>data sugerida para revisar o contato</span>
        </div>
        <div className={styles.resultGrid}>
          <div>
            <small>Retorno estimado</small>
            <strong>{plan ? formatIsoDate(plan.returnDate) : "…"}</strong>
          </div>
          <div>
            <small>Intervalo usado</small>
            <strong>{interval} dias</strong>
          </div>
        </div>
        <div className={styles.messagePreview}>{message}</div>
        <p className={styles.resultNote}>{RETURN_PLANNER_NOTE}</p>
      </div>
    </ToolWindow>
  );
}
