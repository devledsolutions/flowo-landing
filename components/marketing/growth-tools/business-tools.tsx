"use client";

import { useMemo, useState } from "react";
import { BarChart3, Calculator, MessageCircle } from "lucide-react";
import { useSegment } from "@/providers/segment-provider";
import {
  AGENDA_OCCUPANCY_NOTE,
  calculateAgendaOccupancy,
} from "@/lib/calculators/agenda-occupancy";
import {
  MANAGEMENT_DIAGNOSTIC_NOTE,
  MANAGEMENT_DIAGNOSTIC_VERSION,
  MANAGEMENT_QUESTIONS,
  scoreManagementDiagnostic,
  type ManagementAnswers,
} from "@/lib/calculators/management-diagnostic";
import {
  calculateWhatsAppOpportunity,
  WHATSAPP_OPPORTUNITY_NOTE,
} from "@/lib/calculators/whatsapp-opportunity";
import { growthToolStyles as styles, ToolWindow } from "./tool-window";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function formatPercent(value: number) {
  return `${value.toFixed(0).replace(".", ",")}%`;
}

export function WhatsAppOpportunityCalculator() {
  const { track } = useSegment();
  const [messagesPerDay, setMessagesPerDay] = useState(18);
  const [daysPerWeek, setDaysPerWeek] = useState(6);
  const [unansweredRate, setUnansweredRate] = useState(25);
  const [averageTicket, setAverageTicket] = useState(60);
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(
    () => calculateWhatsAppOpportunity({ messagesPerDay, daysPerWeek, unansweredRate, averageTicket }),
    [averageTicket, daysPerWeek, messagesPerDay, unansweredRate],
  );

  const calculate = () => {
    setCalculated(true);
    track("Growth Tool Calculated", {
      tool_id: "whatsapp_opportunity",
      messages_per_day: messagesPerDay,
      unanswered_rate: unansweredRate,
      average_ticket: averageTicket,
    });
  };

  return (
    <ToolWindow label="CENÁRIO DE OPORTUNIDADE" title="Veja o que vale investigar no WhatsApp." badge="Sem promessa">
      <div className={styles.inputGrid}>
        <label>
          Perguntas de horário por dia
          <input type="number" min="0" max="300" inputMode="numeric" value={messagesPerDay} onChange={(event) => setMessagesPerDay(Number(event.target.value))} />
        </label>
        <label>
          Dias abertos por semana
          <input type="number" min="1" max="7" inputMode="numeric" value={daysPerWeek} onChange={(event) => setDaysPerWeek(Number(event.target.value))} />
        </label>
        <label>
          Conversas que ficam sem resposta (%)*
          <input type="number" min="0" max="100" inputMode="decimal" value={unansweredRate} onChange={(event) => setUnansweredRate(Number(event.target.value))} />
        </label>
        <label>
          Ticket médio (R$)
          <input type="number" min="0" max="2000" step="5" inputMode="decimal" value={averageTicket} onChange={(event) => setAverageTicket(Number(event.target.value))} />
        </label>
      </div>
      <button className={styles.calculateButton} onClick={calculate} type="button">
        <MessageCircle aria-hidden="true" size={17} />
        Calcular o cenário
      </button>
      <div className={styles.resultPanel} aria-live="polite">
        <span className={styles.resultLabel}>{calculated ? "O QUE CONFERIR PRIMEIRO" : "PRÉVIA COM OS VALORES ACIMA"}</span>
        <div className={styles.resultPrimary}>
          <strong>{result.conversationsToReview.toFixed(0)}</strong>
          <span>conversas por mês para revisar</span>
        </div>
        <div className={styles.resultGrid}>
          <div>
            <small>Mensagens estimadas</small>
            <strong>{result.monthlyMessages.toFixed(0)} / mês</strong>
          </div>
          <div>
            <small>Valor de referência</small>
            <strong>{brl.format(result.scenarioValue)}</strong>
          </div>
        </div>
        <p className={styles.resultNote}>
          *{WHATSAPP_OPPORTUNITY_NOTE}
        </p>
      </div>
    </ToolWindow>
  );
}

export function OccupancyCalculator() {
  const { track } = useSegment();
  const [professionals, setProfessionals] = useState(3);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerWeek, setDaysPerWeek] = useState(6);
  const [serviceMinutes, setServiceMinutes] = useState(45);
  const [bookedPerWeek, setBookedPerWeek] = useState(72);
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(
    () => calculateAgendaOccupancy({ professionals, hoursPerDay, daysPerWeek, serviceMinutes, bookedPerWeek }),
    [bookedPerWeek, daysPerWeek, hoursPerDay, professionals, serviceMinutes],
  );

  const calculate = () => {
    setCalculated(true);
    track("Growth Tool Calculated", {
      tool_id: "agenda_occupancy",
      professionals,
      occupancy: Number(result.occupancy.toFixed(1)),
    });
  };

  return (
    <ToolWindow label="CAPACIDADE DA AGENDA" title="Entenda se a equipe está cheia ou mal distribuída." badge="Visão semanal">
      <div className={styles.inputGrid}>
        <label>
          Profissionais atendendo
          <input type="number" min="1" max="50" inputMode="numeric" value={professionals} onChange={(event) => setProfessionals(Number(event.target.value))} />
        </label>
        <label>
          Horas por profissional / dia
          <input type="number" min="1" max="16" step="0.5" inputMode="decimal" value={hoursPerDay} onChange={(event) => setHoursPerDay(Number(event.target.value))} />
        </label>
        <label>
          Dias abertos por semana
          <input type="number" min="1" max="7" inputMode="numeric" value={daysPerWeek} onChange={(event) => setDaysPerWeek(Number(event.target.value))} />
        </label>
        <label>
          Duração média do serviço (min)
          <input type="number" min="10" max="240" step="5" inputMode="numeric" value={serviceMinutes} onChange={(event) => setServiceMinutes(Number(event.target.value))} />
        </label>
        <label className={styles.fullInput}>
          Atendimentos marcados na semana
          <input type="number" min="0" max="10000" inputMode="numeric" value={bookedPerWeek} onChange={(event) => setBookedPerWeek(Number(event.target.value))} />
        </label>
      </div>
      <button className={styles.calculateButton} onClick={calculate} type="button">
        <BarChart3 aria-hidden="true" size={17} />
        Ver ocupação da agenda
      </button>
      <div className={styles.resultPanel} aria-live="polite">
        <span className={styles.resultLabel}>{calculated ? "LEITURA DA SEMANA" : "PRÉVIA COM OS VALORES ACIMA"}</span>
        <div className={styles.resultPrimary}>
          <strong>{formatPercent(result.occupancy)}</strong>
          <span>da capacidade calculada</span>
        </div>
        <div className={styles.resultGrid}>
          <div>
            <small>Capacidade estimada</small>
            <strong>{result.weeklyCapacity.toFixed(0)} atendimentos</strong>
          </div>
          <div>
            <small>Espaço calculado</small>
            <strong>{result.openSlots.toFixed(0)} horários</strong>
          </div>
        </div>
        <p className={styles.resultNote}>{AGENDA_OCCUPANCY_NOTE}</p>
      </div>
    </ToolWindow>
  );
}

export function ManagementDiagnostic() {
  const { track } = useSegment();
  const [answers, setAnswers] = useState<ManagementAnswers>({});
  const [completed, setCompleted] = useState(false);
  const diagnostic = scoreManagementDiagnostic(answers);

  const complete = () => {
    setCompleted(true);
    track("Growth Tool Calculated", {
      tool_id: "management_diagnostic",
      attention_count: diagnostic.attentionCount,
      diagnostic_version: MANAGEMENT_DIAGNOSTIC_VERSION,
    });
  };

  return (
    <ToolWindow label="RAIO-X DA GESTÃO" title="Em três minutos, encontre o gargalo de hoje." badge="5 perguntas">
      <div className="space-y-3">
        {MANAGEMENT_QUESTIONS.map((question, index) => (
          <fieldset key={question.id} className="rounded-lg border border-[var(--tool-line)] p-3">
            <legend className="px-1 text-[0.72rem] font-semibold text-[var(--tool-muted)]">{String(index + 1).padStart(2, "0")}</legend>
            <p className="text-[0.82rem] leading-relaxed text-[var(--tool-ink)]">{question.label}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {([[true, "Sim"], [false, "Ainda não"]] as const).map(([value, label]) => (
                <label key={String(value)} className={`flex min-h-10 cursor-pointer items-center justify-center rounded-md border text-[0.72rem] font-semibold transition-colors ${answers[question.id] === value ? "border-[var(--tool-ink)] bg-[var(--tool-ink)] text-white" : "border-[var(--tool-line)] bg-white text-[var(--tool-muted)]"}`}>
                  <input type="radio" name={question.id} checked={answers[question.id] === value} onChange={() => setAnswers((current) => ({ ...current, [question.id]: value }))} className="sr-only" />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <button className={styles.calculateButton} onClick={complete} type="button" disabled={!diagnostic.complete}>
        <Calculator aria-hidden="true" size={17} />
        Ver meu ponto de partida
      </button>
      <div className={styles.resultPanel} aria-live="polite">
        <span className={styles.resultLabel}>{completed ? "SEU PONTO DE PARTIDA" : "COMPLETE AS PERGUNTAS"}</span>
        <div className={styles.resultPrimary}>
          <strong>{completed ? diagnostic.attentionCount : "…"}</strong>
          <span>rotinas para olhar com cuidado</span>
        </div>
        <div className={styles.messagePreview}>
          {completed ? diagnostic.result : "O resultado aparece aqui, sem pedir cadastro."}
          {completed && diagnostic.findings.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {diagnostic.findings.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <p className={styles.resultNote}>{completed ? MANAGEMENT_DIAGNOSTIC_NOTE : "Responda as cinco perguntas para liberar um primeiro diagnóstico."}</p>
      </div>
    </ToolWindow>
  );
}
