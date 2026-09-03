"use client";

import { useMemo, useState } from "react";
import { BarChart3, Calculator, Compass, MessageCircle } from "lucide-react";
import { useSegment } from "@/providers/segment-provider";
import { growthToolStyles as styles, ToolWindow } from "./tool-window";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function numberValue(value: number, min: number, max: number) {
  return Math.min(Math.max(Number.isFinite(value) ? value : min, min), max);
}

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

  const result = useMemo(() => {
    const monthlyMessages = numberValue(messagesPerDay, 0, 300) * numberValue(daysPerWeek, 1, 7) * 4.33;
    const conversationsToReview = monthlyMessages * (numberValue(unansweredRate, 0, 100) / 100);
    return {
      monthlyMessages,
      conversationsToReview,
      scenarioValue: conversationsToReview * numberValue(averageTicket, 0, 2_000),
    };
  }, [averageTicket, daysPerWeek, messagesPerDay, unansweredRate]);

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
          *É um cenário para priorizar uma revisão, não uma promessa de faturamento perdido. Confirme quantas conversas realmente viram atendimento.
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

  const result = useMemo(() => {
    const weeklyCapacity = numberValue(professionals, 1, 50) * numberValue(hoursPerDay, 1, 16) * 60 * numberValue(daysPerWeek, 1, 7) / numberValue(serviceMinutes, 10, 240);
    const occupancy = weeklyCapacity ? (numberValue(bookedPerWeek, 0, 10_000) / weeklyCapacity) * 100 : 0;
    return {
      weeklyCapacity,
      occupancy: Math.min(100, Math.max(0, occupancy)),
      openSlots: Math.max(0, weeklyCapacity - numberValue(bookedPerWeek, 0, 10_000)),
    };
  }, [bookedPerWeek, daysPerWeek, hoursPerDay, professionals, serviceMinutes]);

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
        <p className={styles.resultNote}>A conta não conhece folgas, encaixes, intervalos ou duração diferente por serviço. Use-a como ponto de conversa para organizar a agenda.</p>
      </div>
    </ToolWindow>
  );
}

export function PlanSelector() {
  const { track } = useSegment();
  const [professionals, setProfessionals] = useState(2);
  const [organization, setOrganization] = useState("um_numero");
  const [priority, setPriority] = useState("agenda");
  const [selected, setSelected] = useState(false);

  const plan = professionals <= 1 ? "Solo" : professionals <= 5 ? "Equipe" : "Empresarial";
  const planSlug = plan.toLowerCase();
  const summary = plan === "Solo"
    ? "Para quem atende sozinho e quer parar de largar o celular para responder horário."
    : plan === "Equipe"
      ? "Para uma equipe de até cinco profissionais, com agenda e operação no mesmo lugar."
      : "Para operações com mais profissionais, unidades ou regras comerciais próprias.";

  const select = () => {
    setSelected(true);
    track("Plan Selected", { plan: planSlug, professionals, organization, priority });
  };

  return (
    <ToolWindow label="ESCOLHA GUIADA" title="Qual plano combina com a sua rotina?" badge="2 minutos">
      <div className={styles.inputGrid}>
        <label>
          Quantas pessoas atendem hoje?
          <input type="number" min="1" max="500" inputMode="numeric" value={professionals} onChange={(event) => setProfessionals(Number(event.target.value))} />
        </label>
        <label>
          Como chegam as mensagens?
          <select value={organization} onChange={(event) => setOrganization(event.target.value)}>
            <option value="um_numero">Um número</option>
            <option value="varios_numeros">Mais de um número</option>
            <option value="a_definir">Ainda estamos decidindo</option>
          </select>
        </label>
        <label className={styles.fullInput}>
          O que mais quer resolver primeiro?
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="agenda">Responder e marcar horários</option>
            <option value="equipe">Organizar equipe e comissões</option>
            <option value="financeiro">Acompanhar caixa e recebimentos</option>
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
          <strong>{plan}</strong>
          <span>plano para começar</span>
        </div>
        <div className={styles.messagePreview}>{summary}</div>
        <div className={styles.resultGrid}>
          <div><small>Prioridade informada</small><strong>{priority === "agenda" ? "Agenda e WhatsApp" : priority === "equipe" ? "Equipe" : "Financeiro"}</strong></div>
          <div><small>Próximo passo</small><strong><a href={`/precos?plan=${planSlug}`} className="underline underline-offset-4">Ver detalhes</a></strong></div>
        </div>
        <p className={styles.resultNote}>A recomendação é um ponto de partida. O time pode ajustar o plano quando entender unidades, profissionais e regras da operação.</p>
      </div>
    </ToolWindow>
  );
}

const diagnosticQuestions = [
  { id: "whatsapp", label: "Quando chega um pedido de horário durante um corte, alguém precisa parar?", yes: "O WhatsApp ainda depende de uma pessoa" },
  { id: "agenda", label: "Cada profissional tem horários, folgas ou intervalos diferentes?", yes: "A agenda precisa de regras por profissional" },
  { id: "finance", label: "Você confere comandas, recebimentos e comissões em lugares diferentes?", yes: "O fechamento pede uma fonte única" },
  { id: "return", label: "Existe uma rotina clara para lembrar clientes de voltar?", yes: "O retorno ainda depende da memória" },
  { id: "numbers", label: "A equipe sabe qual número usar e quem assume uma conversa fora do padrão?", yes: "A passagem para a equipe precisa ficar explícita" },
] as const;

export function ManagementDiagnostic() {
  const { track } = useSegment();
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);
  const yesCount = diagnosticQuestions.filter((question) => answers[question.id]).length;
  const result = yesCount >= 3 ? "Conectar atendimento e operação" : yesCount > 0 ? "Escolher uma rotina para padronizar" : "Manter o que funciona e medir uma semana";

  const complete = () => {
    setCompleted(true);
    track("Growth Tool Calculated", { tool_id: "management_diagnostic", yes_count: yesCount });
  };

  return (
    <ToolWindow label="RAIO-X DA GESTÃO" title="Em três minutos, encontre o gargalo de hoje." badge="5 perguntas">
      <div className="space-y-3">
        {diagnosticQuestions.map((question, index) => (
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
      <button className={styles.calculateButton} onClick={complete} type="button" disabled={Object.keys(answers).length < diagnosticQuestions.length}>
        <Calculator aria-hidden="true" size={17} />
        Ver meu ponto de partida
      </button>
      <div className={styles.resultPanel} aria-live="polite">
        <span className={styles.resultLabel}>{completed ? "SEU PONTO DE PARTIDA" : "COMPLETE AS PERGUNTAS"}</span>
        <div className={styles.resultPrimary}>
          <strong>{completed ? yesCount : "…"}</strong>
          <span>rotinas para olhar com cuidado</span>
        </div>
        <div className={styles.messagePreview}>{completed ? result : "O resultado aparece aqui, sem pedir cadastro."}</div>
        <p className={styles.resultNote}>{completed ? "O Raio-X não substitui uma análise da operação. Ele ajuda a escolher a primeira conversa da equipe." : "Responda as cinco perguntas para liberar um primeiro diagnóstico."}</p>
      </div>
    </ToolWindow>
  );
}
