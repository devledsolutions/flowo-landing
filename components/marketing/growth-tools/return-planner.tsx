"use client";

import { useMemo, useState } from "react";
import { CalendarCheck2 } from "lucide-react";
import { useSegment } from "@/providers/segment-provider";
import {
  growthToolStyles as styles,
  ToolWindow,
} from "./tool-window";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function toIsoInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function ReturnPlanner() {
  const { track } = useSegment();
  const [lastVisit, setLastVisit] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 24);
    return toIsoInput(date);
  });
  const [interval, setInterval] = useState(30);
  const [advance, setAdvance] = useState(3);
  const [service, setService] = useState("corte");
  const [tone, setTone] = useState<"direto" | "proximo">("proximo");
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    const parsed = new Date(`${lastVisit}T12:00:00`);
    const base = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
    const target = addDays(base, Math.max(interval, 1));
    const contact = addDays(target, -Math.max(advance, 0));
    const message =
      tone === "direto"
        ? `Olá! Aqui é da [nome da barbearia]. Pela data do seu último ${service}, pode estar chegando a hora de cuidar do visual de novo. Quer que eu consulte os horários? Se não quiser receber este tipo de lembrete, é só avisar.`
        : `Oi! Tudo bem? Aqui é da [nome da barbearia]. Lembramos do seu último ${service} e queríamos saber se faz sentido ver um próximo horário. Posso consultar a agenda para você? Se preferir não receber lembretes, é só falar.`;
    return { target, contact, message };
  }, [advance, interval, lastVisit, service, tone]);

  const calculate = () => {
    setCalculated(true);
    track("Growth Tool Calculated", {
      tool_id: "customer_return_planner",
      service,
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
          <select value={service} onChange={(event) => setService(event.target.value)}>
            <option value="corte">Corte</option>
            <option value="barba">Barba</option>
            <option value="corte e barba">Corte e barba</option>
            <option value="procedimento">Outro procedimento</option>
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
              setTone(event.target.value as "direto" | "proximo")
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
          <strong>{dateFormatter.format(result.contact)}</strong>
          <span>data sugerida para revisar o contato</span>
        </div>
        <div className={styles.resultGrid}>
          <div>
            <small>Retorno estimado</small>
            <strong>{dateFormatter.format(result.target)}</strong>
          </div>
          <div>
            <small>Intervalo usado</small>
            <strong>{interval} dias</strong>
          </div>
        </div>
        <div className={styles.messagePreview}>{result.message}</div>
        <p className={styles.resultNote}>
          Revise consentimento, agendamento futuro e conversas abertas antes de
          enviar. O intervalo é uma referência informada por você, não uma regra
          para todos os clientes.
        </p>
      </div>
    </ToolWindow>
  );
}
