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
  ProductDisclaimer,
} from "@/components/home/product-previews";
import { InstitutionalFilmPlayer } from "@/components/marketing/institutional-film-player";
import { PhoneFrame } from "@/components/home/phone-frame";
import { WhatsAppChat, type ChatMessage } from "@/components/home/whatsapp-chat";
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
import { PLANS, formatBRL, getPlan, hasPublishedPrice } from "@/data/pricing-data";
import { INSTITUTIONAL_FILM } from "@/lib/institutional-film";

const productSignals = [
  "Atende no WhatsApp que a barbearia já usa",
  "Respeita horário, folga e duração por barbeiro",
  "A equipe assume qualquer conversa",
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
      "Se fizer sentido para a casa, defina percentual, prazo e regras.",
  },
  {
    icon: ReceiptText,
    label: "Ativação assistida",
    title: "Nota fiscal",
    description:
      "Ativação depende do município, dos dados fiscais e da liberação da prefeitura.",
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
      "Não há teste automático. Para clientes elegíveis dos planos Solo ou Equipe, a equipe pode liberar uma avaliação assistida de 14 dias, sem cartão, renovação ou cobrança automática. A assinatura não tem fidelidade.",
  },
  {
    question: "A IA trabalha sem supervisão?",
    answer:
      "A IA atua dentro das regras configuradas. A equipe acompanha a agenda, pode assumir qualquer conversa e continua responsável por decisões que exigem avaliação humana.",
  },
] as const;

const decisionLinks = [
  {
    href: "/demonstracao-agendamento-whatsapp",
    label: "Ver a demonstração",
    description:
      "Veja a conversa inteira: pedido, agenda, remarcação e cancelamento.",
  },
  {
    href: "/sistema-agendamento-barbearia",
    label: "Conhecer o sistema para barbearia",
    description:
      "Veja agenda, equipe, clientes, comandas e recebimentos dentro da mesma operação.",
  },
  {
    href: "/comparar",
    label: "Comparar com outras alternativas",
    description:
      "Consulte comparações datadas, fontes oficiais e situações em que cada escolha pode fazer mais sentido.",
  },
] as const;

export function SalesCampaignPage() {
  return (
    <div className="min-h-screen bg-cream pb-20 md:pb-0">
      <CampaignHeader />

      <main id="main-content">
        <section className="relative isolate overflow-hidden pt-24 sm:pt-28 lg:pt-32">
          <div className="container-page pb-16 pt-10 sm:pb-20 lg:pb-28">
            <div className="grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-caption font-semibold text-muted-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                  Para barbearias com equipe
                </p>
                <h1 className="mt-6 max-w-[24ch] text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.035em] sm:text-[2.6rem] lg:text-[2.5rem] text-ink-strong">
                  Pare de responder “tem horário?” no meio do corte.
                </h1>
                <p className="mt-6 max-w-xl text-lead text-muted-ink">
                  A Flowo atende no WhatsApp, olha a agenda de cada barbeiro e
                  confirma. Você assume quando quiser.
                </p>
                <div className="mt-8">
                  <SalesCampaignCta
                    placement="hero"
                    label="Ver a Flowo na minha agenda"
                  />
                </div>
                <div className="mt-4 max-w-lg space-y-1 text-caption leading-relaxed text-muted-ink">
                  <p>Uma conversa curta · sem cartão · sem instalação</p>
                  <p>
                    Planos a partir de {formatBRL(getPlan("solo").monthly)}/mês · sem
                    fidelidade · pagamentos integrados opcionais
                  </p>
                </div>
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
                <Image
                  src="/images/product/dashboard-agenda.png"
                  alt="Agenda da Flowo com os horários de cada barbeiro"
                  width={1920}
                  height={1041}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="w-full rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-24px_rgba(23,24,16,0.35)]"
                />
                <ProductDisclaimer className="mt-4" label="Telas do app com dados ilustrativos" />
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
                <Image
                  src="/images/product/dashboard-comandas.png"
                  alt="Comanda da Flowo com serviços, produtos e forma de pagamento"
                  width={1920}
                  height={1041}
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="w-full rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-24px_rgba(23,24,16,0.35)]"
                />
                <ProductDisclaimer className="mt-4" label="Telas do app com dados ilustrativos" />
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
                    <span className="text-[clamp(2.35rem,4vw,3.35rem)] font-semibold leading-none tracking-[-0.045em]">
                      {hasPublishedPrice(plan)
                        ? formatBRL(plan.monthly)
                        : plan.consultationLabel}
                    </span>
                    {hasPublishedPrice(plan) ? (
                      <span className="text-label text-muted-ink">/mês</span>
                    ) : null}
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
              Mensal ou anual · 2 meses grátis no anual · sem fidelidade ·
              avaliação assistida para clientes elegíveis
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

        <section className="section-tight bg-cream" aria-labelledby="continue-decidindo">
          <div className="container-page grid gap-10 lg:grid-cols-[0.58fr_1fr] lg:gap-20">
            <div>
              <h2
                id="continue-decidindo"
                className="max-w-[15ch] text-h3 font-semibold text-ink-strong"
              >
                Continue decidindo com o produto e os fatos à vista.
              </h2>
            </div>
            <nav aria-label="Próximas páginas para conhecer a Flowo">
              <ul className="divide-y divide-line border-y border-line">
                {decisionLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group grid min-h-24 gap-2 py-5 outline-none sm:grid-cols-[minmax(0,1fr)_2rem] sm:items-center focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
                    >
                      <span>
                        <span className="font-semibold text-ink group-hover:underline group-hover:underline-offset-4">
                          {item.label}
                        </span>
                        <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-muted-ink">
                          {item.description}
                        </span>
                      </span>
                      <ChevronRight
                        className="hidden h-5 w-5 text-faint-ink transition-transform duration-200 ease-out-quint group-hover:translate-x-1 sm:block"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <section className="border-t border-line bg-surface py-8 md:py-10">
          <div className="container-page">
            <p className="max-w-measure text-label text-muted-ink">
              <strong className="font-semibold text-ink">O que já foi testado.</strong> Este atendimento
              (resposta, agendamento, remarcação, cancelamento e a passagem para a equipe) foi testado pela
              Flowo no WhatsApp em 26 de julho de 2026, com números de teste da própria Flowo. Ainda não
              medimos resultado em barbearias clientes. Cada barbearia começa com a configuração acompanhada
              pela equipe Flowo.
            </p>
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
            Para barbearias · planos desde {formatBRL(getPlan("solo").monthly)}/mês
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

const heroConversation: ChatMessage[] = [
  { from: "cliente", text: "Oi! Tem horário hoje pra corte com o Rafael?", at: "11:02" },
  { from: "flowo", text: "Oi! O Rafael tem hoje às 14:00, 15:30 e 17:00. Qual fica melhor?", at: "11:02" },
  { from: "cliente", text: "15:30", at: "11:03" },
  {
    from: "flowo",
    text: "Marcado. Corte hoje às 15:30 com o Rafael, 40 min, R$ 55. Se precisar mudar, é só me chamar aqui.",
    at: "11:03",
  },
];

function CampaignProductHero() {
  return (
    <div>
    <div className="relative pb-16 pr-6 sm:pb-20 sm:pr-20">
      <Image
        src="/images/product/dashboard-agenda.png"
        alt="Agenda da Flowo com os horários de cada barbeiro"
        width={1920}
        height={1041}
        sizes="(min-width: 1024px) 720px, 100vw"
        priority
        className="w-full rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-24px_rgba(23,24,16,0.35)]"
      />
      <PhoneFrame className="absolute bottom-0 right-0 rotate-[1.5deg] sm:hidden">
        <WhatsAppChat width={150} logicalHeight={620} messages={heroConversation} />
      </PhoneFrame>
      <PhoneFrame className="absolute bottom-0 right-2 hidden rotate-[1.5deg] sm:block">
        <WhatsAppChat width={200} logicalHeight={620} messages={heroConversation} />
      </PhoneFrame>
    </div>
    <ProductDisclaimer className="mt-3" label="Telas do app com dados ilustrativos" />
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
