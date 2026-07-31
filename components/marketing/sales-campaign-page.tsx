import Image from "next/image";
import Link from "next/link";
import {
  BadgePercent,
  Banknote,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileText,
  MessageCircle,
  ReceiptText,
  Scissors,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import {
  AgendaPreview,
  ConversationPreview,
  PaymentPreview,
  ProductDisclaimer,
} from "@/components/home/product-previews";
import { InstitutionalFilmPlayer } from "@/components/marketing/institutional-film-player";
import {
  SalesCampaignCta,
  SalesCampaignMobileCta,
} from "@/components/marketing/sales-campaign-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PLANS, formatBRL } from "@/data/pricing-data";
import { INSTITUTIONAL_FILM } from "@/lib/institutional-film";

const productSignals = [
  "Cliente agenda pelo WhatsApp",
  "Cada barbeiro com seu horário",
  "Equipe pode assumir a conversa",
] as const;

const operatingSteps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "O cliente chama",
    description:
      "Ele continua no WhatsApp da barbearia e explica o que precisa.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "A IA entende",
    description:
      "Corte, barba, barbeiro de preferência e melhor horário entram na busca.",
  },
  {
    icon: CalendarDays,
    number: "03",
    title: "A agenda responde",
    description:
      "A Flowo confere serviço, barbeiro, dia, horário e disponibilidade.",
  },
  {
    icon: CheckCircle2,
    number: "04",
    title: "O horário fica registrado",
    description:
      "Cliente recebe a confirmação e a equipe acompanha tudo no painel.",
  },
] as const;

const coreCapabilities = [
  {
    icon: MessageCircle,
    title: "Recepção com IA no WhatsApp",
    description:
      "Responde preço e horário, consulta a agenda e faz o que a barbearia autorizou.",
  },
  {
    icon: CalendarDays,
    title: "Agenda de cada barbeiro",
    description:
      "Cada barbeiro pode ter seus próprios dias, horários, serviços e folgas.",
  },
  {
    icon: ClipboardCheck,
    title: "Comanda e histórico",
    description:
      "O corte agendado acompanha o cliente até o fechamento da comanda.",
  },
  {
    icon: Users,
    title: "Equipe e permissões",
    description:
      "Defina o que barbeiros, gerente e financeiro podem ver e fazer.",
  },
  {
    icon: FileText,
    title: "Campanhas e relacionamento",
    description:
      "Crie campanhas para sua base usando as mensagens incluídas no plano.",
  },
  {
    icon: Smartphone,
    title: "Aplicativo para a equipe",
    description:
      "A experiência móvel para barbeiros e gestores está em preparação.",
  },
] as const;

const optionalCapabilities = [
  {
    icon: WalletCards,
    label: "Opcional",
    title: "PIX e cartão integrados",
    description:
      "Ative se quiser. Dinheiro e maquininha própria continuam válidos.",
  },
  {
    icon: BadgePercent,
    label: "Configurável",
    title: "Cashback",
    description:
      "Se fizer sentido para a casa, defina percentual, validade e regras.",
  },
  {
    icon: ReceiptText,
    label: "Ativação assistida",
    title: "Nota fiscal",
    description:
      "Ativação depende do município, dos dados fiscais e da homologação.",
  },
  {
    icon: Sparkles,
    label: "Adicional em beta",
    title: "Flowo Recupera",
    description:
      "Mostra quem pode estar na hora de voltar e prepara a ação para o responsável revisar.",
  },
] as const;

const objections = [
  {
    question: "Vou precisar trocar o jeito que meus clientes falam comigo?",
    answer:
      "Não muda o canal principal: o cliente continua chamando no WhatsApp. Durante a configuração, definimos como o número será conectado e o que a IA poderá fazer.",
  },
  {
    question: "Cada barbeiro pode ter horários diferentes?",
    answer:
      "Sim. Nos planos com equipe, cada profissional pode ter dias, turnos, folgas, serviços e duração próprios. A IA consulta essa disponibilidade antes de oferecer um horário.",
  },
  {
    question: "Sou obrigado a receber dinheiro pela Flowo?",
    answer:
      "Não. Pagamentos integrados são opcionais e acontecem depois do atendimento. Você pode continuar recebendo em dinheiro ou na sua maquininha e apenas registrar a forma de pagamento na comanda.",
  },
  {
    question: "Tem teste grátis ou fidelidade?",
    answer:
      "Não há período de teste. A assinatura começa no primeiro dia, com configuração acompanhada pela equipe Flowo, e não tem fidelidade. Você pode cancelar sem multa e usar até o fim do período já pago.",
  },
  {
    question: "A IA trabalha sem supervisão?",
    answer:
      "A IA atua dentro das regras configuradas. A equipe acompanha a agenda, pode assumir qualquer conversa e continua responsável por decisões que exigem avaliação humana.",
  },
] as const;

export function SalesCampaignPage() {
  return (
    <div className="min-h-screen bg-cream pb-20 md:pb-0">
      <CampaignHeader />

      <main id="main-content">
        <section className="relative isolate overflow-hidden pt-24 sm:pt-28 lg:pt-32">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_72%_28%,oklch(0.995_0.003_95),transparent_52%)]"
          />
          <div className="container-page pb-16 pt-10 sm:pb-20 lg:pb-28">
            <div className="grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-caption font-semibold text-muted-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                  Recepção com IA para barbearias
                </p>
                <h1 className="mt-6 max-w-[13ch] text-[clamp(2.7rem,1.75rem+4vw,5.35rem)] font-semibold leading-[1.01] tracking-[-0.045em] text-ink-strong">
                  O cliente chama. A Flowo agenda enquanto você trabalha.
                </h1>
                <p className="mt-6 max-w-xl text-lead text-muted-ink">
                  A IA atende no WhatsApp, consulta os horários reais da equipe
                  e registra o agendamento. Você acompanha tudo e assume quando
                  precisar.
                </p>
                <div className="mt-8">
                  <SalesCampaignCta placement="hero" />
                </div>
                <p className="mt-4 max-w-lg text-caption leading-relaxed text-muted-ink">
                  Planos a partir de {formatBRL(PLANS[0].monthly)}/mês · sem
                  fidelidade · assinatura desde o primeiro dia · pagamentos
                  integrados opcionais
                </p>
              </div>

              <CampaignProductHero />
            </div>

            <ul className="mt-12 grid border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-line lg:mt-16">
              {productSignals.map((signal) => (
                <li
                  key={signal}
                  className="flex min-h-16 items-center gap-3 border-b border-line py-4 text-sm font-medium text-ink last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0"
                >
                  <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="on-ink overflow-hidden">
          <div className="container-page section-normal">
            <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  O problema não é anotar
                </p>
                <h2 className="mt-4 max-w-[15ch] text-h2 font-semibold tracking-[-0.03em] text-ink-strong">
                  É precisar parar o atendimento para responder “tem horário?”.
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-lead text-muted-ink">
                  Quando a agenda não conversa com o WhatsApp, alguém precisa
                  conferir horários, responder, confirmar e copiar informação.
                  A Flowo faz essa consulta na hora, registra o pedido e deixa a
                  equipe entrar quando precisar.
                </p>
                <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
                  {[
                    ["Antes", "Mensagem esperando resposta"],
                    ["Durante", "Barbeiro interrompendo o corte"],
                    ["Depois", "Informação espalhada entre conversa e agenda"],
                  ].map(([label, text]) => (
                    <div key={label} className="bg-surface p-5">
                      <p className="text-caption font-semibold uppercase tracking-[0.1em] text-faint-ink">
                        {label}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/recursos/diagnostico-agenda-barbearia"
                  className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-ink transition-colors hover:border-white/45 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Fazer o Raio-X da Agenda
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal border-b border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Do pedido à confirmação
                </p>
                <h2 className="mt-4 max-w-[17ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  O cliente pergunta. A agenda responde. O horário fica registrado.
                </h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-ink">
                O cliente não precisa aprender uma nova ferramenta. A equipe
                não precisa copiar o pedido para outro lugar.
              </p>
            </div>

            <ol className="mt-12 grid overflow-hidden rounded-xl border border-line md:grid-cols-2 lg:grid-cols-4">
              {operatingSteps.map(({ icon: Icon, ...step }, index) => (
                <li
                  key={step.number}
                  className="relative border-b border-line p-6 last:border-b-0 md:border-r md:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-cream">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-caption tabular-nums text-faint-ink">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-8 font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                    {step.description}
                  </p>
                  {index < operatingSteps.length - 1 && (
                    <ChevronRight
                      className="absolute -right-2.5 top-10 z-10 hidden h-5 w-5 rounded-full border border-line bg-surface p-1 text-faint-ink lg:block"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="video" className="section-normal on-ink scroll-mt-24">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  46 segundos de produto
                </p>
                <h2 className="mt-4 max-w-[16ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  Veja a conversa virar horário confirmado.
                </h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-ink">
                Uma demonstração curta da recepção no WhatsApp conectada à
                agenda individual da equipe.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
              <InstitutionalFilmPlayer
                video={INSTITUTIONAL_FILM.video}
                captions={INSTITUTIONAL_FILM.captions}
                poster={INSTITUTIONAL_FILM.poster}
              />
            </div>
            <div className="mt-8 flex justify-center">
              <SalesCampaignCta
                placement="video"
                className="bg-cream text-ink hover:bg-cream/90"
              />
            </div>
          </div>
        </section>

        <section className="section-normal bg-cream">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Depois que o horário entra
                </p>
                <h2 className="mt-4 max-w-[17ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  O horário entra na agenda. Depois vira atendimento, comanda e histórico.
                </h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-ink">
                A equipe acompanha o cliente sem precisar copiar o mesmo dado do
                WhatsApp para a agenda e depois para a comanda.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {coreCapabilities.map(({ icon: Icon, ...capability }) => (
                <article
                  key={capability.title}
                  className="min-h-60 bg-surface p-6 sm:p-7"
                >
                  <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                  <h3 className="mt-8 text-lg font-semibold text-ink">
                    {capability.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-ink">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
              <div>
                <AgendaPreview detailed />
                <ProductDisclaimer className="mt-4" />
              </div>
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Equipe real
                </p>
                <h3 className="mt-4 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  Cada profissional trabalha de um jeito. A agenda respeita isso.
                </h3>
                <ul className="mt-8 divide-y divide-line border-y border-line">
                  {[
                    "Dias e turnos individuais",
                    "Serviços e durações por profissional",
                    "Folgas, bloqueios e calendários",
                    "Permissões conforme a função",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex min-h-14 items-center gap-3 py-3 text-sm font-medium text-ink"
                    >
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Você escolhe o que ativar
                </p>
                <h2 className="mt-4 max-w-[17ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  Ative só o que fizer sentido para sua barbearia.
                </h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-ink">
                Dinheiro e maquininha própria continuam valendo. PIX, cartão,
                cashback e nota fiscal têm ativação própria. O Flowo Recupera é
                contratado à parte.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {optionalCapabilities.map(({ icon: Icon, ...capability }) => (
                <article
                  key={capability.title}
                  className="flex min-h-72 flex-col bg-cream p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                    <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-medium text-muted-ink">
                      {capability.label}
                    </span>
                  </div>
                  <h3 className="mt-9 text-lg font-semibold text-ink">
                    {capability.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-ink">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Fechamento do atendimento
                </p>
                <h3 className="mt-4 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  Receba do seu jeito.
                </h3>
                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    [Banknote, "Dinheiro"],
                    [CreditCard, "Maquininha própria"],
                    [WalletCards, "PIX ou cartão Flowo, se ativados"],
                  ].map(([Icon, label]) => {
                    const PaymentIcon = Icon as typeof Banknote;
                    return (
                      <div
                        key={label as string}
                        className="flex min-h-14 items-center gap-3 rounded-lg border border-line bg-cream px-4 py-3 text-sm font-medium text-ink"
                      >
                        <PaymentIcon
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        {label as string}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <PaymentPreview />
                <ProductDisclaimer className="mt-4" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal bg-cream">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Planos transparentes
              </p>
              <h2 className="mt-4 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                Escolha pelo tamanho da equipe e da barbearia.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lead text-muted-ink">
                A recepção com IA no WhatsApp faz parte dos três planos.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-xl border border-line bg-surface md:grid-cols-3">
              {PLANS.map((plan) => (
                <article
                  key={plan.id}
                  className={`flex min-h-[27rem] flex-col border-b border-line p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-9 ${
                    plan.isPopular ? "on-ink" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-label font-semibold uppercase tracking-[0.1em] text-ink">
                      {plan.name}
                    </p>
                    {plan.isPopular && (
                      <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-medium text-muted-ink">
                        Para equipes
                      </span>
                    )}
                  </div>
                  <p className="mt-7 flex flex-wrap items-baseline gap-x-1.5 text-ink">
                    {plan.salesLed && (
                      <span className="w-full text-caption text-muted-ink">
                        A partir de
                      </span>
                    )}
                    <span className="text-[clamp(2.7rem,4vw,4rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                      {formatBRL(plan.monthly)}
                    </span>
                    <span className="text-label text-muted-ink">/mês</span>
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-muted-ink">
                    {plan.description}
                  </p>
                  <ul className="mt-6 divide-y divide-line border-y border-line">
                    {plan.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="py-3 text-sm text-ink">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <SalesCampaignCta
                      placement={`pricing_${plan.id}`}
                      label={`Quero entender o ${plan.name}`}
                      className={
                        plan.isPopular
                          ? "bg-cream text-ink hover:bg-cream/90"
                          : "w-full"
                      }
                    />
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center text-caption text-muted-ink">
              Mensal ou anual · 2 meses grátis no anual · sem fidelidade · sem
              período de teste
            </p>
          </div>
        </section>

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page grid gap-12 lg:grid-cols-[0.66fr_1fr] lg:gap-20">
            <div>
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Antes de decidir
              </p>
              <h2 className="mt-4 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                As perguntas que merecem resposta direta.
              </h2>
              <p className="mt-5 text-lead text-muted-ink">
                Sem esconder condições importantes no rodapé.
              </p>
            </div>
            <Accordion type="single" collapsible className="border-t border-line">
              {objections.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`}>
                  <AccordionTrigger className="min-h-16 py-4 text-left text-base font-semibold text-ink hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl pb-6 text-sm leading-relaxed text-muted-ink">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="on-ink overflow-hidden">
          <div className="container-page section-loose">
            <div className="mx-auto max-w-4xl text-center">
              <ShieldCheck
                className="mx-auto h-8 w-8 text-ink"
                aria-hidden="true"
              />
              <h2 className="mt-7 text-[clamp(2.5rem,1.9rem+3vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-strong">
                Sua próxima conversa pode entrar na agenda sem interromper o
                próximo corte.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lead text-muted-ink">
                Conte como sua barbearia trabalha. A equipe Flowo mostra o
                produto com seus serviços, seus horários e sua equipe.
              </p>
              <div className="mt-8 flex justify-center">
                <SalesCampaignCta
                  placement="final"
                  className="bg-cream text-ink hover:bg-cream/90"
                />
              </div>
              <p className="mt-5 text-caption text-faint-ink">
                Resposta pelo WhatsApp · seus dados não são vendidos ·
                autorizações de marketing são opcionais
              </p>
            </div>
          </div>
        </section>
      </main>

      <CampaignFooter />
      <SalesCampaignMobileCta />
    </div>
  );
}

function CampaignHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-11 items-center rounded-sm focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          aria-label="Flowo, página inicial"
        >
          <Image
            src="/flowo-logo.svg"
            alt="Flowo"
            width={90}
            height={44}
            priority
          />
        </Link>
        <div className="hidden items-center gap-5 md:flex">
          <p className="text-caption text-muted-ink">
            Para barbearias · planos desde {formatBRL(PLANS[0].monthly)}/mês
          </p>
          <SalesCampaignCta
            placement="header"
            label="Quero conhecer"
            className="min-h-10 px-5"
          />
        </div>
        <a
          href="#video"
          className="inline-flex min-h-11 items-center text-label font-semibold text-ink underline-offset-4 hover:underline md:hidden"
        >
          Ver em ação
        </a>
      </div>
    </header>
  );
}

function CampaignProductHero() {
  return (
    <div className="relative min-h-[28rem] sm:min-h-[35rem]">
      <div
        aria-hidden="true"
        className="absolute inset-[12%_8%_14%] rounded-full bg-ink/[0.075] blur-3xl"
      />
      <AgendaPreview
        detailed
        className="absolute inset-x-0 top-0 sm:inset-x-6"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[4.2rem] left-[10%] right-[10%] hidden h-3 rounded-b-[70%] bg-ink/90 shadow-[0_12px_24px_oklch(0.17_0.012_110/0.22)] sm:block"
      />
      <ConversationPreview className="absolute bottom-2 right-0 w-[53%] max-w-[17rem] rotate-[1.5deg] sm:right-2 sm:w-[38%]" />
      <div className="absolute bottom-8 left-0 w-[58%] max-w-72 rounded-xl border border-line bg-surface/95 p-4 shadow-[0_20px_50px_-34px_oklch(0.17_0.012_110/0.55)] backdrop-blur sm:left-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint-ink">
          Agenda atualizada
        </p>
        <p className="mt-2 text-sm font-semibold text-ink">
          Corte com Rafael · 10h30
        </p>
        <p className="mt-1 text-xs text-muted-ink">
          Confirmado a partir da conversa
        </p>
      </div>
      <ProductDisclaimer className="absolute -bottom-6 left-0 sm:left-8" />
    </div>
  );
}

function CampaignFooter() {
  return (
    <footer className="bg-cream">
      <div className="container-page flex flex-col gap-6 py-10 text-caption text-muted-ink sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Scissors className="h-4 w-4" aria-hidden="true" />
          <span>Flowo · produto da Devled Tecnologia e Consultoria LTDA</span>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/precos" className="hover:text-ink">
            Preços
          </Link>
          <Link href="/privacidade" className="hover:text-ink">
            Privacidade
          </Link>
          <Link href="/termos" className="hover:text-ink">
            Termos
          </Link>
        </nav>
      </div>
    </footer>
  );
}
