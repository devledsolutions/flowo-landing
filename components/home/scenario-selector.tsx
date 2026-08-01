"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck2,
  MessageCircleMore,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { useSegment } from "@/providers/segment-provider";

const validationCases = [
  {
    id: "solo",
    logo: "/images/validation-cases/linha-onze-professional-v2.png",
    name: "Linha Onze Barbearia",
    location: "São Paulo · operação solo",
    routine:
      "O barbeiro está com as mãos ocupadas quando chega mais um pedido de horário no WhatsApp.",
    evidence:
      "A IA responde, consulta a disponibilidade e leva o pedido até um agendamento confirmado na agenda.",
    result: "WhatsApp → disponibilidade → horário confirmado",
    resultIcon: CalendarCheck2,
    detailHref: "/casos-de-validacao/linha-onze-sao-paulo",
    plan: "Solo",
    planAnchor: "#plano-solo",
  },
  {
    id: "equipe",
    logo: "/images/validation-cases/quatro-tempos-professional-v2.png",
    name: "Quatro Tempos Barbearia",
    location: "Curitiba · operação com equipe",
    routine:
      "A recepção precisa manter conversa e agenda alinhadas quando o cliente muda de ideia ou a equipe assume o atendimento.",
    evidence:
      "A Flowo consulta, remarca e cancela o horário, além de pausar a IA quando a equipe assume o atendimento.",
    result: "Agenda atualizada → equipe no controle → IA retomada",
    resultIcon: MessageCircleMore,
    detailHref: "/casos-de-validacao/quatro-tempos-curitiba",
    plan: "Equipe",
    planAnchor: "#plano-equipe",
  },
] as const;

export default function ScenarioSelector() {
  const { track } = useSegment();

  useEffect(() => {
    track("Validation Profiles Viewed", {
      page: "/",
      placement: "homepage_before_pricing",
      profile_count: validationCases.length,
      proof_origin: "controlled_production_validation",
      validated_at: "2026-07-26",
    });
  }, [track]);

  return (
    <section
      id="casos-de-validacao"
      aria-labelledby="validation-cases-title"
      className="section-normal scroll-mt-28 on-ink"
    >
      <div className="container-page">
        <header className="grid gap-6 lg:grid-cols-[1fr_0.62fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-caption font-semibold text-muted-ink">
              Flowo em ação
            </p>
            <h2
              id="validation-cases-title"
              className="mt-3 max-w-[16ch] text-h2 font-semibold leading-[1.08] tracking-[-0.025em] text-ink-strong"
            >
              A rotina muda. O fluxo continua chegando à agenda.
            </h2>
          </div>
          <p className="max-w-[35rem] text-body text-muted-ink">
            Do barbeiro solo à equipe com horários diferentes: veja como a IA
            atende, consulta a disponibilidade e mantém cada compromisso na
            agenda certa.
          </p>
        </header>

        <div className="mt-9 border-t border-current">
          {validationCases.map((validationCase) => (
            <article
              key={validationCase.id}
              className="grid gap-6 border-b border-line py-8 lg:grid-cols-[6.5rem_minmax(13rem,0.72fr)_minmax(20rem,1.28fr)_auto] lg:items-center lg:gap-8"
            >
              <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-current bg-[#f4f0e5] p-1 text-ink">
                <Image
                  src={validationCase.logo}
                  alt=""
                  width={96}
                  height={96}
                  className="h-full w-full object-contain"
                />
              </span>

              <div>
                <h3 className="text-xl font-semibold leading-snug text-ink">
                  {validationCase.name}
                </h3>
                <p className="mt-2 text-caption font-medium text-muted-ink">
                  {validationCase.location}
                </p>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-muted-ink">
                <p>{validationCase.routine}</p>
                <p className="font-semibold text-ink">
                  {validationCase.evidence}
                </p>
                <p className="flex items-start gap-2 border-t border-line pt-3 text-caption font-medium text-ink">
                  <validationCase.resultIcon
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {validationCase.result}
                </p>
              </div>

              <div className="flex w-full flex-col items-stretch gap-2 lg:w-auto lg:items-center">
                <TrackedLink
                  href={validationCase.detailHref}
                  event="Validation Case Opened"
                  properties={{
                    page: "/",
                    placement: "homepage_before_pricing",
                    profile: validationCase.id,
                    proof_origin: "controlled_production_validation",
                  }}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-current px-5 text-label font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-[#171810] lg:w-auto"
                >
                  Ver a Flowo neste cenário
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href={validationCase.planAnchor}
                  event="Validation Profile Selected"
                  properties={{
                    page: "/",
                    placement: "homepage_before_pricing",
                    profile: validationCase.id,
                    recommended_plan: validationCase.plan.toLocaleLowerCase("pt-BR"),
                    proof_origin: "controlled_production_validation",
                  }}
                  className="inline-flex min-h-11 items-center justify-center text-caption font-semibold text-muted-ink underline underline-offset-4"
                >
                  Ver plano {validationCase.plan}
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>

        <TrackedLink
          href="/demonstracao-agendamento-whatsapp"
          event="CTA Clicked"
          properties={{
            page: "/",
            placement: "homepage_validation_methodology",
            destination: "booking_validation_demo",
            intent: "see_product_in_action",
          }}
          className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline underline-offset-4"
        >
          Ver o atendimento completo, do WhatsApp à agenda
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </TrackedLink>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-ink">
            Sua barbearia funciona de outro jeito?
          </p>
          <TrackedLink
            href="/recursos/diagnostico-agenda-barbearia?utm_source=homepage&utm_medium=validation_profiles&utm_campaign=custom_operation"
            event="Lead Magnet CTA Clicked"
            properties={{
              page: "/",
              placement: "homepage_validation_fallback",
              lead_magnet: "diagnostico_agenda_barbearia",
            }}
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline underline-offset-4"
          >
            Faça o Raio-X gratuito da sua agenda
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
