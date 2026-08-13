"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  Check,
  ClipboardList,
  RotateCcw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { AgendaPreview, ProductDisclaimer } from "@/components/home/product-previews";
import { LeadMagnetForm } from "@/components/marketing/lead-magnet-form";
import { useSegment } from "@/providers/segment-provider";

type DiagnosticOption = {
  label: string;
  score: 0 | 1 | 2;
};

type DiagnosticQuestion = {
  id: string;
  question: string;
  context: string;
  weakPoint: string;
  options: readonly DiagnosticOption[];
};

const questions: readonly DiagnosticQuestion[] = [
  {
    id: "whatsapp_owner",
    question: "Quem responde o WhatsApp enquanto a equipe está atendendo?",
    context: "Pense principalmente nos horários de maior movimento.",
    weakPoint:
      "Quem responde o WhatsApp — hoje a recepção divide a mão com o corte.",
    options: [
      { label: "Ninguém. A gente vê quando sobra tempo.", score: 0 },
      { label: "Um barbeiro responde entre um corte e outro.", score: 1 },
      { label: "Há uma pessoa ou rotina dedicada à recepção.", score: 2 },
    ],
  },
  {
    id: "availability_discovery",
    question: "Como o cliente descobre quais horários estão livres?",
    context: "Considere o caminho mais comum, não a exceção.",
    weakPoint:
      "Como o cliente descobre horário — ele precisa de você para saber o que está livre.",
    options: [
      { label: "Pergunta no WhatsApp e alguém confere.", score: 0 },
      { label: "Parte consulta sozinha; parte ainda pergunta.", score: 1 },
      { label: "Consulta a disponibilidade sem depender da equipe.", score: 2 },
    ],
  },
  {
    id: "no_show_rule",
    question: "O que acontece antes de um horário que pode virar falta?",
    context: "Escolha o processo que realmente acontece hoje.",
    weakPoint:
      "O que acontece na falta — sem confirmação, o horário vazio não volta para a grade.",
    options: [
      { label: "Nada. Só descobrimos quando o cliente não vem.", score: 0 },
      { label: "A equipe confirma quando lembra ou quando dá tempo.", score: 1 },
      { label: "Existe confirmação com antecedência e regra definida.", score: 2 },
    ],
  },
  {
    id: "schedule_rules",
    question: "Onde ficam folgas, almoço e bloqueios de cada barbeiro?",
    context: "Vale o lugar usado para decidir se um horário pode ser oferecido.",
    weakPoint:
      "Onde ficam folgas e bloqueios — informação que não está no sistema não pode virar regra.",
    options: [
      { label: "Na cabeça da equipe.", score: 0 },
      { label: "Em papel, planilha ou grupo de mensagens.", score: 1 },
      { label: "Na agenda, separados por profissional.", score: 2 },
    ],
  },
  {
    id: "fit_in_rule",
    question: "Quem decide um encaixe de última hora?",
    context: "Pense no que acontece quando o sábado já está cheio.",
    weakPoint:
      "Quem decide o encaixe — cada exceção volta para a sua mesa.",
    options: [
      { label: "Quem vê a mensagem primeiro.", score: 0 },
      { label: "O dono ou gerente precisa aprovar.", score: 1 },
      { label: "A equipe segue uma regra combinada.", score: 2 },
    ],
  },
] as const;

const scoreBands = [
  {
    max: 40,
    name: "Agenda reativa",
    diagnosis:
      "Quase todo horário é decidido na hora, por conversa. Funciona no movimento baixo e desmonta quando a agenda aperta.",
    action:
      "Escreva a regra de uma coisa só: o prazo de confirmação. Não tente reorganizar tudo na mesma semana.",
  },
  {
    max: 70,
    name: "Organizada por pessoas",
    diagnosis:
      "Existe processo, mas ele mora na cabeça de alguém. Se essa pessoa falta, a agenda volta a depender de improviso.",
    action:
      "Tire a regra da cabeça e coloque no sistema: horário, almoço e folga por barbeiro.",
  },
  {
    max: 100,
    name: "Agenda com regra",
    diagnosis:
      "A regra está escrita e vale sem você. É a condição para automatizar a recepção sem perder controle.",
    action:
      "Automatize a pergunta mais repetida e meça uma semana comparável antes de ampliar.",
  },
] as const;

const scoreInputs = [
  {
    icon: Users,
    title: "Quem segura a recepção",
    description: "Se o WhatsApp ainda interrompe o atendimento ou já tem dono.",
  },
  {
    icon: CalendarCheck2,
    title: "Onde vivem as regras",
    description: "Como horários, folgas, confirmações e encaixes são decididos.",
  },
  {
    icon: ClipboardList,
    title: "Quanto depende de memória",
    description: "O que acontece quando o dono ou a pessoa-chave não está.",
  },
] as const;

const emptyAnswers = (): Array<number | null> => questions.map(() => null);

export function AgendaReadinessDiagnostic() {
  const { track } = useSegment();
  const [answers, setAnswers] = useState<Array<number | null>>(emptyAnswers);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completed, setCompleted] = useState(false);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    track("Agenda Diagnostic Viewed", {
      diagnostic_id: "agenda_readiness_v1",
      question_count: questions.length,
    });
  }, [track]);

  const answeredCount = answers.filter((answer) => answer !== null).length;
  const selectedOption = answers[currentQuestion];
  const score = useMemo(() => {
    const earned = answers.reduce<number>(
      (total, answer) => total + (answer === null ? 0 : answer),
      0,
    );
    return Math.round((earned / (questions.length * 2)) * 100);
  }, [answers]);
  const band = scoreBands.find((item) => score <= item.max) ?? scoreBands[2];
  const weakestQuestionIndex = useMemo(() => {
    const lowestScore = Math.min(...answers.map((answer) => answer ?? 2));
    return answers.findIndex((answer) => answer === lowestScore);
  }, [answers]);
  const weakestQuestion = questions[Math.max(0, weakestQuestionIndex)];

  const focusQuestion = () => {
    window.requestAnimationFrame(() => questionHeadingRef.current?.focus());
  };

  const handleAnswer = (optionIndex: number, option: DiagnosticOption) => {
    setAnswers((current) => {
      const next = [...current];
      next[currentQuestion] = option.score;
      return next;
    });
    track("Agenda Diagnostic Answered", {
      diagnostic_id: "agenda_readiness_v1",
      question_id: questions[currentQuestion].id,
      option_index: optionIndex,
      option_score: option.score,
      answered_count: answers[currentQuestion] === null ? answeredCount + 1 : answeredCount,
    });
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((current) => current + 1);
      focusQuestion();
      return;
    }

    setCompleted(true);
    track("Agenda Diagnostic Completed", {
      diagnostic_id: "agenda_readiness_v1",
      score,
      band: band.name,
      weakest_question: weakestQuestion.id,
    });
    window.requestAnimationFrame(() => resultHeadingRef.current?.focus());
  };

  const handleBack = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion((current) => current - 1);
    focusQuestion();
  };

  const handleReset = () => {
    setAnswers(emptyAnswers());
    setCurrentQuestion(0);
    setCompleted(false);
    track("Agenda Diagnostic Reset", {
      diagnostic_id: "agenda_readiness_v1",
      previous_score: score,
    });
    focusQuestion();
  };

  return (
    <>
      <section className="border-b border-line bg-cream pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-28">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="lg:sticky lg:top-32">
            <p className="text-label font-semibold text-muted-ink">
              Diagnóstico gratuito · 5 perguntas · resultado imediato
            </p>
            <h1 className="mt-6 max-w-[13ch] text-[clamp(2.7rem,1.9rem+3vw,4.6rem)] font-semibold leading-[1.01] tracking-[-0.045em] text-ink-strong">
              Você ainda para o corte para responder o WhatsApp?
            </h1>
            <p className="mt-6 max-w-xl text-lead text-muted-ink">
              Responda 5 perguntas e descubra qual parte da rotina ainda
              depende de resposta manual. Veja o resultado na hora, sem
              cadastro.
            </p>
            <ul className="mt-8 hidden divide-y divide-line border-y border-line sm:block">
              {[
                "Pontuação de 0 a 100",
                "Um gargalo prioritário",
                "Uma ação prática para esta semana",
              ].map((item) => (
                <li
                  key={item}
                  className="flex min-h-12 items-center gap-3 py-2 text-sm font-medium text-ink"
                >
                  <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-ink/20 bg-surface shadow-[0_30px_80px_-58px_oklch(0.17_0.012_110/0.8)]">
            {completed ? (
              <DiagnosticResult
                score={score}
                band={band}
                weakPoint={
                  score === 100
                    ? "Próximo ponto de evolução — automatizar uma rotina por vez e acompanhar o resultado."
                    : weakestQuestion.weakPoint
                }
                headingRef={resultHeadingRef}
                onReset={handleReset}
              />
            ) : (
              <div>
                <div className="border-b border-line bg-surface-2 px-5 py-4 sm:px-8">
                  <div className="flex items-center justify-between gap-4 text-caption font-medium text-muted-ink">
                    <span>
                      Pergunta {currentQuestion + 1} de {questions.length}
                    </span>
                    <span>{answeredCount} respondidas</span>
                  </div>
                  <div
                    className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10"
                    role="progressbar"
                    aria-label="Progresso do diagnóstico"
                    aria-valuemin={1}
                    aria-valuemax={questions.length}
                    aria-valuenow={currentQuestion + 1}
                  >
                    <div
                      className="h-full rounded-full bg-ink transition-[width] duration-300 ease-out-quint"
                      style={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <fieldset className="p-5 sm:p-8 lg:p-10">
                  <legend className="sr-only">
                    {questions[currentQuestion].question}
                  </legend>
                  <h2
                    ref={questionHeadingRef}
                    tabIndex={-1}
                    className="max-w-[22ch] text-[clamp(1.65rem,1.4rem+1vw,2.35rem)] font-semibold leading-tight tracking-[-0.025em] text-ink-strong outline-none"
                  >
                    {questions[currentQuestion].question}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-ink">
                    {questions[currentQuestion].context}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {questions[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedOption === option.score;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => handleAnswer(index, option)}
                          className={`group flex min-h-16 w-full items-center gap-4 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ease-out-quint sm:px-5 ${
                            isSelected
                              ? "border-ink bg-ink text-cream"
                              : "border-line bg-cream text-ink hover:border-ink/40 hover:bg-surface-2"
                          }`}
                        >
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-caption ${
                              isSelected
                                ? "border-cream/30 bg-cream text-ink"
                                : "border-line bg-surface text-muted-ink"
                            }`}
                            aria-hidden="true"
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="flex items-center justify-between gap-4 border-t border-line bg-surface-2 px-5 py-4 sm:px-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentQuestion === 0}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-muted-ink transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-cream transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {currentQuestion === questions.length - 1
                      ? "Ver meu diagnóstico"
                      : "Próxima pergunta"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-tight border-b border-line bg-surface">
        <div className="container-page">
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {scoreInputs.map(({ icon: Icon, ...item }) => (
              <article key={item.title} className="min-h-48 bg-surface p-6 sm:p-7">
                <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                <h2 className="mt-7 text-lg font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-ink">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-normal bg-cream">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div>
            <p className="text-label font-semibold text-muted-ink">
              Do diagnóstico para a rotina
            </p>
            <h2 className="mt-5 max-w-[15ch] text-h2 font-semibold tracking-[-0.03em] text-ink-strong">
              Regra boa é a que a agenda consegue aplicar sem adivinhar.
            </h2>
            <p className="mt-5 max-w-xl text-lead text-muted-ink">
              Na Flowo, dias, turnos, folgas, serviços e durações ficam
              separados por profissional. A recepção com IA consulta essa
              disponibilidade antes de oferecer um horário.
            </p>
            <Link
              href="/recepcionista-ia-barbearia"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-cream transition-colors hover:bg-ink/90"
            >
              Ver como a Flowo aplica as regras
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div>
            <AgendaPreview detailed />
            <ProductDisclaimer className="mt-4" />
          </div>
        </div>
      </section>
    </>
  );
}

function DiagnosticResult({
  score,
  band,
  weakPoint,
  headingRef,
  onReset,
}: {
  score: number;
  band: (typeof scoreBands)[number];
  weakPoint: string;
  headingRef: RefObject<HTMLHeadingElement>;
  onReset: () => void;
}) {
  return (
    <div aria-live="polite">
      <div className="on-ink p-6 sm:p-9 lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-caption font-semibold text-faint-ink">
              Seu resultado
            </p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="mt-3 text-[clamp(2rem,1.6rem+2vw,3.4rem)] font-semibold tracking-[-0.04em] text-ink-strong outline-none"
            >
              {band.name}
            </h2>
          </div>
          <div className="text-right">
            <span className="block text-[clamp(3.2rem,7vw,5.8rem)] font-semibold leading-none tracking-[-0.06em] tabular-nums text-ink-strong">
              {score}
            </span>
            <span className="text-caption text-faint-ink">de 100</span>
          </div>
        </div>
        <p className="mt-8 max-w-2xl text-lead text-muted-ink">
          {band.diagnosis}
        </p>
      </div>

      <div className="grid gap-px bg-line sm:grid-cols-2">
        <div className="bg-surface p-6 sm:p-8">
          <p className="text-caption font-semibold text-muted-ink">
            Primeiro ajuste
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink">{band.action}</p>
        </div>
        <div className="bg-surface p-6 sm:p-8">
          <p className="text-caption font-semibold text-muted-ink">
            {score === 100 ? "Próxima evolução" : "Ponto mais frágil"}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink">{weakPoint}</p>
        </div>
      </div>

      <div className="border-t border-line bg-surface-2 p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-h3 font-semibold tracking-[-0.025em] text-ink-strong">
              Leve o resultado para a rotina.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-ink">
              O PDF complementar aprofunda o diagnóstico com 12 perguntas e um
              plano de ação. Nome e e-mail liberam o material; WhatsApp e
              marketing continuam opcionais.
            </p>
            <button
              type="button"
              onClick={onReset}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold text-muted-ink transition-colors hover:text-ink"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Refazer diagnóstico
            </button>
          </div>
          <div className="[--review-ink:var(--ink)] [--review-line:var(--line)] [--review-muted:var(--muted-ink)] [--review-paper:var(--surface)]">
            <LeadMagnetForm />
          </div>
        </div>
      </div>
    </div>
  );
}
