import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardCheck,
  MessageCircle,
  ReceiptText,
  Sparkles,
  UserRoundCheck,
  WalletCards,
} from "lucide-react";
import {
  AgendaPreview,
  ConfirmationPreview,
  ConversationPreview,
  ProductDisclaimer,
} from "@/components/home/product-previews";
import { InstitutionalFilm } from "@/components/marketing/institutional-film";

const operatingSteps = [
  {
    icon: MessageCircle,
    label: "Entrada",
    title: "O cliente chama no WhatsApp",
    description: "Sem instalar aplicativo e sem procurar um link de agenda.",
  },
  {
    icon: Sparkles,
    label: "Decisão",
    title: "A IA entende o pedido",
    description: "Serviço, preferência e intenção viram uma consulta objetiva.",
  },
  {
    icon: CalendarDays,
    label: "Disponibilidade",
    title: "A agenda valida o horário",
    description: "Dias, serviços e horários podem ser diferentes por profissional.",
  },
  {
    icon: UserRoundCheck,
    label: "Resultado",
    title: "O horário fica confirmado",
    description: "Cliente recebe a resposta e a equipe acompanha no painel.",
  },
] as const;

const deliveryLayers = [
  {
    label: "Núcleo do produto",
    detail: "Incluído nos planos",
    tone: "on-ink",
    items: [
      "IA no WhatsApp",
      "Agenda por profissional",
      "Comandas e histórico",
    ],
  },
  {
    label: "Sob escolha da barbearia",
    detail: "Ativação opcional",
    tone: "bg-surface",
    items: ["Pagamentos integrados", "Cashback configurável"],
  },
  {
    label: "Conforme plano e operação",
    detail: "Escopo controlado",
    tone: "bg-surface-2",
    items: ["Comissões no Empresarial", "Fiscal com ativação assistida"],
  },
] as const;

function WindowControls() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ef6a5b]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#e9b94f]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#5bbf74]" />
    </div>
  );
}

function OperatingFlow() {
  return (
    <div
      role="img"
      aria-label="Fluxo do Flowo: o cliente chama no WhatsApp, a inteligência artificial entende o pedido, consulta a disponibilidade individual e confirma o horário para a equipe acompanhar."
      className="overflow-hidden rounded-xl border border-line bg-surface"
    >
      <div className="flex min-h-11 items-center justify-between border-b border-line bg-surface-2 px-4">
        <WindowControls />
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-ink">
          Flowo · fluxo operacional
        </p>
        <span className="w-[3.25rem]" aria-hidden="true" />
      </div>

      <ol className="grid divide-y divide-line lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {operatingSteps.map(({ icon: Icon, ...step }, index) => (
          <li key={step.label} className="relative min-w-0 p-5 md:p-6">
            <div className="flex items-start gap-4 lg:block">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-cream">
                <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
              </span>
              <div className="min-w-0 lg:mt-8">
                <p className="text-caption font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  {String(index + 1).padStart(2, "0")} · {step.label}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                  {step.description}
                </p>
              </div>
            </div>
            {index < operatingSteps.length - 1 && (
              <>
                <ArrowDown
                  className="absolute -bottom-2.5 left-7 z-10 h-5 w-5 rounded-full border border-line bg-surface p-1 text-faint-ink lg:hidden"
                  aria-hidden="true"
                />
                <ArrowRight
                  className="absolute -right-2.5 top-7 z-10 hidden h-5 w-5 rounded-full border border-line bg-surface p-1 text-faint-ink lg:block"
                  aria-hidden="true"
                />
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ComparisonProductStage() {
  return (
    <div className="preview-light mt-6 overflow-hidden rounded-xl bg-surface">
      <div className="grid lg:min-h-[34rem] lg:grid-cols-[0.72fr_1.28fr]">
        <div className="relative isolate flex flex-col justify-between overflow-hidden bg-[oklch(0.22_0.018_112)] p-6 text-cream sm:p-8 lg:p-10">
          <div
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-cream/10"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-36 -left-24 h-80 w-80 rounded-full border border-cream/10"
            aria-hidden="true"
          />

          <div className="relative">
            <Image
              src="/flowo-logo.svg"
              alt="Flowo"
              width={124}
              height={61}
              className="h-auto w-24 brightness-0 invert sm:w-28"
            />
            <p className="mt-8 text-caption font-semibold uppercase tracking-[0.12em] text-cream/55">
              Uma operação conectada
            </p>
            <h3 className="mt-3 max-w-[12ch] text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-cream sm:text-4xl">
              A conversa já nasce dentro da agenda.
            </h3>
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-cream/70 sm:text-base">
              O cliente pede um horário, a IA consulta as regras de cada
              profissional e a equipe enxerga a confirmação no painel.
            </p>
          </div>

          <div className="relative mt-10 border-t border-cream/15 pt-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-xs font-semibold text-cream">
                01
              </span>
              <p className="text-sm font-medium text-cream">
                WhatsApp → disponibilidade → agenda
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[39rem] overflow-hidden bg-[oklch(0.94_0.014_90)] p-5 sm:min-h-[43rem] sm:p-8 lg:min-h-0 lg:p-10">
          <div
            className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,oklch(0.98_0.008_90),transparent)]"
            aria-hidden="true"
          />
          <p className="relative text-caption font-semibold uppercase tracking-[0.12em] text-muted-ink">
            Demonstração do fluxo · dados ilustrativos
          </p>

          <AgendaPreview className="absolute left-5 right-[-9rem] top-20 rotate-[1.2deg] sm:left-10 sm:right-[-3rem] sm:top-24 lg:left-12 lg:right-[-5rem]" />
          <ConversationPreview className="absolute bottom-7 left-5 w-[68%] max-w-[20rem] rotate-[-2deg] sm:bottom-10 sm:left-10 sm:w-[48%] lg:left-8 lg:w-[44%]" />
          <ConfirmationPreview className="absolute bottom-6 right-4 w-[48%] max-w-[16rem] rotate-[1.5deg] sm:bottom-12 sm:right-8 sm:w-[38%] lg:right-6" />
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <ProductDisclaimer />
        <p className="text-caption font-medium text-ink">
          Uma confirmação visível para o cliente e para a equipe.
        </p>
      </div>
    </div>
  );
}

export function FlowoProductProof({
  competitorName,
  includeFilm = true,
  compact = false,
}: {
  competitorName?: string;
  includeFilm?: boolean;
  compact?: boolean;
}) {
  return (
    <>
      <section className="section-normal on-ink overflow-hidden">
        <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
              Produto, não promessa
            </p>
            <h2 className="mt-4 max-w-[16ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
              A recepção conversa. A agenda decide. A equipe acompanha.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-lead text-muted-ink">
              {competitorName
                ? `Antes de comparar listas com ${competitorName}, veja a diferença estrutural: no Flowo, o WhatsApp não fica separado da agenda.`
                : "O valor do Flowo aparece na ligação entre a conversa do cliente e a rotina da barbearia, não em uma lista isolada de funções."}
            </p>
            <p className="mt-5 flex items-start gap-2 text-caption text-faint-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              A equipe pode assumir a conversa sempre que precisar.
            </p>
          </div>
        </div>

        <div className="preview-light mt-10">
          <OperatingFlow />
        </div>

        {compact ? (
          <ComparisonProductStage />
        ) : (
        <div className="preview-light mt-6 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative min-h-[25rem] overflow-hidden rounded-xl border border-line bg-surface-2 p-5 sm:p-7">
            <div className="max-w-[78%]">
              <p className="text-caption font-semibold uppercase tracking-[0.12em] text-muted-ink">
                Demonstração do fluxo · dados ilustrativos
              </p>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                O cliente pede. A IA oferece apenas horários válidos.
              </h3>
            </div>
            <ConversationPreview className="absolute -bottom-5 left-5 right-5 rotate-[-1.5deg] sm:left-9 sm:right-9" />
          </div>

          <div className="relative min-h-[25rem] overflow-hidden rounded-xl border border-line bg-surface-2 p-5 sm:p-7">
            <div className="max-w-xl">
              <p className="text-caption font-semibold uppercase tracking-[0.12em] text-muted-ink">
                Supervisão da equipe
              </p>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                Cada profissional com sua agenda. Uma operação para o gestor.
              </h3>
            </div>
            <AgendaPreview className="absolute -bottom-6 left-5 right-[-3rem] rotate-[1deg] sm:left-9 sm:right-[-1.5rem]" />
          </div>
        </div>
        )}
        </div>
      </section>
      {includeFilm && <InstitutionalFilm compact showTranscript={false} />}
    </>
  );
}

export function FlowoDeliveryMap() {
  return (
    <section className="section-normal border-y border-line bg-surface">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
              Mapa de entrega
            </p>
            <h2 className="mt-4 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
              O que é núcleo, opção ou ativação acompanhada.
            </h2>
          </div>
          <p className="text-lead text-muted-ink">
            Um quadro categórico é mais honesto que uma nota genérica. Ele
            separa o que sustenta a proposta Flowo do que depende da escolha,
            do plano ou da disponibilidade operacional.
          </p>
        </div>

        <div
          role="img"
          aria-label="Mapa de entrega do Flowo. No núcleo estão inteligência artificial no WhatsApp, agenda por profissional, comandas e histórico. Pagamentos e cashback dependem de escolha da barbearia. Comissões e fiscal dependem do plano e da operação."
          className="mt-10 overflow-hidden rounded-xl border border-line"
        >
          {deliveryLayers.map((layer, index) => (
            <div
              key={layer.label}
              className={`grid gap-6 border-b border-line p-6 last:border-b-0 md:grid-cols-[0.65fr_1.35fr] md:items-center md:p-8 ${layer.tone}`}
            >
              <div>
                <p className="text-caption font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Camada {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-ink">
                  {layer.label}
                </h3>
                <p className="mt-1 text-sm text-muted-ink">{layer.detail}</p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="flex min-h-12 items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm font-medium text-ink"
                  >
                    {index === 0 ? (
                      <ClipboardCheck
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                    ) : index === 1 ? (
                      <WalletCards
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <ReceiptText
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5 text-caption text-muted-ink">
          O pagamento integrado não é obrigatório para usar agenda, WhatsApp
          ou comandas. A cobertura fiscal precisa ser confirmada antes da
          ativação.
        </p>
      </div>
    </section>
  );
}
