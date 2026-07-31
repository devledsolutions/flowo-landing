"use client";

import { useMemo, useState } from "react";
import { Clock3 } from "lucide-react";
import { useSegment } from "@/providers/segment-provider";
import {
  growthToolStyles as styles,
  ToolWindow,
} from "./tool-window";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);
}

export function WhatsAppTimeCalculator() {
  const { track } = useSegment();
  const [messages, setMessages] = useState(28);
  const [minutes, setMinutes] = useState(2.5);
  const [days, setDays] = useState(6);
  const [serviceMinutes, setServiceMinutes] = useState(45);
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    const dailyMinutes = clamp(messages, 0, 300) * clamp(minutes, 0.5, 15);
    const weeklyHours = (dailyMinutes * clamp(days, 1, 7)) / 60;
    const monthlyHours = weeklyHours * 4.33;
    const serviceSlots = Math.floor(
      (monthlyHours * 60) / clamp(serviceMinutes, 10, 240),
    );
    return { weeklyHours, monthlyHours, serviceSlots };
  }, [days, messages, minutes, serviceMinutes]);

  const calculate = () => {
    setCalculated(true);
    track("Growth Tool Calculated", {
      tool_id: "whatsapp_time",
      messages_per_day: messages,
      minutes_per_message: minutes,
      days_per_week: days,
      estimated_hours_per_month: Number(result.monthlyHours.toFixed(1)),
    });
  };

  return (
    <ToolWindow
      label="TEMPO DE RECEPÇÃO"
      title="Quanto o WhatsApp interrompe sua semana?"
      badge="Estimativa"
    >
      <div className={styles.inputGrid}>
        <label>
          Mensagens sobre horários por dia
          <input
            type="number"
            min="0"
            max="300"
            inputMode="numeric"
            value={messages}
            onChange={(event) => setMessages(Number(event.target.value))}
          />
        </label>
        <label>
          Minutos por conversa
          <input
            type="number"
            min="0.5"
            max="15"
            step="0.5"
            inputMode="decimal"
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
          />
        </label>
        <label>
          Dias abertos por semana
          <input
            type="number"
            min="1"
            max="7"
            inputMode="numeric"
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
          />
        </label>
        <label>
          Duração média do serviço
          <input
            type="number"
            min="10"
            max="240"
            step="5"
            inputMode="numeric"
            value={serviceMinutes}
            onChange={(event) => setServiceMinutes(Number(event.target.value))}
          />
        </label>
      </div>
      <button className={styles.calculateButton} onClick={calculate} type="button">
        <Clock3 aria-hidden="true" size={17} />
        Calcular tempo de interrupção
      </button>
      <div className={styles.resultPanel} aria-live="polite">
        <span className={styles.resultLabel}>
          {calculated ? "SUA ESTIMATIVA" : "PRÉVIA COM OS VALORES ACIMA"}
        </span>
        <div className={styles.resultPrimary}>
          <strong>{result.monthlyHours.toFixed(1).replace(".", ",")} h</strong>
          <span>por mês em conversas sobre horário</span>
        </div>
        <div className={styles.resultGrid}>
          <div>
            <small>Por semana</small>
            <strong>{result.weeklyHours.toFixed(1).replace(".", ",")} horas</strong>
          </div>
          <div>
            <small>Tempo equivalente</small>
            <strong>{result.serviceSlots} serviços de {serviceMinutes} min</strong>
          </div>
        </div>
        <p className={styles.resultNote}>
          Estimativa baseada somente nos dados informados. Ela mede tempo, não
          faturamento nem horários efetivamente perdidos.
        </p>
      </div>
    </ToolWindow>
  );
}
