import { ArrowRight, CalendarDays, Check, CreditCard, MessageCircle } from "lucide-react";
import {
  AgendaPreview,
  ConfirmationPreview,
  ConversationPreview,
  JourneyConnector,
  PaymentPreview,
  ProductDisclaimer,
} from "./product-previews";

const planFit = [
  ["Solo", "1 profissional"],
  ["Equipe", "Até 5 profissionais"],
  ["Empresarial", "Várias unidades"],
] as const;

const paymentSteps = [
  { icon: CalendarDays, label: "Agendado" },
  { icon: Check, label: "Atendido" },
  { icon: CreditCard, label: "Pago" },
] as const;

export default function ProductStory() {
  return (
    <>
      <section
        id="produto-em-acao"
        aria-labelledby="product-proof-title"
        className="section-normal scroll-mt-24 border-t border-line bg-surface"
      >
        <div className="container-page">
          <header className="max-w-3xl">
            <h2
              id="product-proof-title"
              className="text-h2 font-semibold leading-tight tracking-[-0.025em] text-ink-strong"
            >
              Da mensagem à cadeira,{" "}
              <em className="font-serif font-medium italic">sem perder o controle.</em>
            </h2>
            <p className="mt-4 text-lead text-muted-ink">
              A mesma informação acompanha cada etapa.
            </p>
          </header>

          <div className="mt-12 grid items-center gap-8 md:grid-cols-[0.7fr_0.15fr_1.45fr_0.15fr_0.7fr] md:gap-3">
            <div>
              <p className="mb-3 text-label font-semibold text-ink">1 · Mensagem</p>
              <ConversationPreview />
            </div>
            <JourneyConnector />
            <div>
              <p className="mb-3 text-label font-semibold text-ink">2 · Agenda</p>
              <AgendaPreview detailed />
            </div>
            <JourneyConnector />
            <div>
              <p className="mb-3 text-label font-semibold text-ink">3 · Confirmação</p>
              <ConfirmationPreview />
            </div>
          </div>
          <ProductDisclaimer className="mt-7" />
        </div>
      </section>

      <section
        id="como-funciona"
        aria-labelledby="team-schedules-title"
        className="section-normal scroll-mt-24 overflow-hidden bg-cream"
      >
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <AgendaPreview detailed className="lg:-ml-24 lg:w-[calc(100%+6rem)]" />
            <ProductDisclaimer className="mt-4" />
          </div>

          <div className="order-1 lg:order-2">
            <h2
              id="team-schedules-title"
              className="text-h2 font-semibold leading-tight tracking-[-0.025em] text-ink-strong"
            >
              Cada profissional no seu horário. Tudo sob{" "}
              <em className="font-serif font-medium italic">controle.</em>
            </h2>
            <p className="mt-5 text-lead text-muted-ink">
              Dias, serviços e disponibilidade podem ser diferentes para cada
              barbeiro.
            </p>
            <dl className="mt-9 divide-y divide-line border-y border-line">
              {planFit.map(([plan, fit]) => (
                <div key={plan} className="flex items-center justify-between gap-5 py-4">
                  <dt className="text-label font-semibold uppercase tracking-[0.08em] text-ink">
                    {plan}
                  </dt>
                  <dd className="text-right text-label text-muted-ink">{fit}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="payment-proof-title"
        className="on-ink overflow-hidden"
      >
        <div className="container-page section-normal grid items-center gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <h2
              id="payment-proof-title"
              className="text-h2 font-semibold leading-tight tracking-[-0.025em] text-ink-strong"
            >
              Atendimento concluído. Caixa{" "}
              <em className="font-serif font-medium italic">atualizado.</em>
            </h2>
            <p className="mt-5 text-lead text-muted-ink">
              O pagamento acontece depois do serviço — nunca para reservar o
              horário.
            </p>

            <ol className="mt-9 flex items-center gap-3" aria-label="Etapas do atendimento">
              {paymentSteps.map(({ icon: Icon, label }, index) => (
                <li key={label} className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="min-w-0 text-center">
                    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
                      <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                    </span>
                    <p className="mt-2 truncate text-[11px] text-ink">{label}</p>
                  </div>
                  {index < 2 && <ArrowRight className="h-4 w-4 shrink-0 text-faint-ink" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <PaymentPreview />
            <ProductDisclaimer className="mt-4" />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-8">
        <div className="container-page flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
            <p className="max-w-2xl text-body text-muted-ink">
              A IA atende no WhatsApp da barbearia. Sua equipe acompanha a agenda
              e pode assumir qualquer conversa.
            </p>
          </div>
          <a
            href="#precos"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-line px-5 text-label font-semibold text-ink transition-colors hover:bg-surface-2"
          >
            Ver planos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
