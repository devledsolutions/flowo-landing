"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bell, CalendarCheck2, MessageCircle, Scissors } from "lucide-react";

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    icon: MessageCircle,
    title: "Contato no WhatsApp",
    description: "O cliente chama a qualquer hora e a IA responde em segundos.",
    detail:
      "Sem app novo, sem cadastro. O cliente escreve no WhatsApp que já usa todo dia e é atendido na hora, em linguagem natural.",
  },
  {
    icon: CalendarCheck2,
    title: "A IA agenda",
    description: "Serviços com preço e só horários realmente livres.",
    detail:
      "A IA consulta a agenda de verdade antes de oferecer qualquer horário e só confirma quando o agendamento entrou de fato na agenda.",
  },
  {
    icon: Bell,
    title: "Confirmação automática",
    description: "Lembrete 24h e 2h antes, com pedido de confirmação.",
    detail:
      "O cliente confirma, remarca ou cancela respondendo a própria mensagem. É assim que o Flowo combate as faltas, sem cobrar sinal.",
  },
  {
    icon: Scissors,
    title: "Cliente na cadeira",
    description: "O dia aparece organizado no painel e você só atende.",
    detail:
      "A agenda sincroniza com Google, Apple e Outlook. Se você quiser, o cliente paga o atendimento por PIX ou cartão na hora.",
  },
];

export default function FlowDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || paused || !inView) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reduceMotion, paused, inView]);

  const active = steps[currentStep];

  return (
    <div
      ref={rootRef}
      className="mx-auto w-full max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative">
        {/* Progress rail */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-7 hidden h-px w-full overflow-hidden bg-line sm:block"
        >
          <motion.div
            className="h-full bg-ink"
            initial={false}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: EASE_OUT_QUINT }
            }
          />
        </div>

        <ol className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-6 sm:flex sm:justify-between sm:gap-0">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isReached = index <= currentStep;
            return (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Passo ${index + 1}: ${step.title}`}
                  className="group flex w-full flex-col items-center gap-3 rounded-lg p-1 sm:w-32"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-200 ease-out-quint ${
                      isActive
                        ? "border-ink bg-ink text-cream"
                        : isReached
                          ? "border-ink bg-surface text-ink"
                          : "border-line bg-surface text-faint-ink group-hover:border-ink group-hover:text-ink"
                    }`}
                  >
                    <step.icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <span
                    className={`text-center text-sm font-medium leading-snug ${
                      isReached ? "text-ink" : "text-muted-ink"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div aria-live="polite" className="mt-10 text-center">
        <motion.div
          key={currentStep}
          initial={false}
          animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 1], y: [10, 0] }}
          transition={{ duration: 0.4, ease: EASE_OUT_QUINT }}
        >
          <h3 className="text-h3 font-semibold text-ink">{active.title}</h3>
          <p className="mx-auto mt-3 max-w-measure text-lead text-muted-ink">
            {active.description}
          </p>
          <p className="mx-auto mt-3 max-w-measure text-muted-ink">{active.detail}</p>
        </motion.div>
      </div>
    </div>
  );
}
