import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  LockKeyhole,
  MessageCircle,
  Scissors,
} from "lucide-react";
import { SIGNUP_URL } from "@/components/cta-links";

type PreviewKind = "agenda" | "whatsapp" | "pagamento" | "comparacao";

export function CommercialHero({
  current,
  eyebrow,
  title,
  description,
  preview,
}: {
  current: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  preview: PreviewKind;
}) {
  return (
    <section className="pt-32 pb-section-tight md:pt-40">
      <div className="container-page">
        <CommercialBreadcrumb current={current} />
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.82fr)] lg:gap-16">
          <div>
            <p className="text-label font-medium text-faint-ink">{eyebrow}</p>
            <h1 className="mt-4 max-w-[16ch] text-h2 font-semibold text-ink-strong">
              {title}
            </h1>
            <p className="mt-6 max-w-measure text-lead text-muted-ink">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-label font-semibold text-cream transition-opacity duration-200 ease-out-quint hover:opacity-90"
              >
                Ver demonstração
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link
                href="/precos"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-7 py-3 text-label font-medium text-ink transition-colors duration-200 ease-out-quint hover:bg-surface-2"
              >
                Comparar planos
              </Link>
            </div>
            <p className="mt-4 text-caption text-muted-ink">
              Já decidiu?{" "}
              <a
                href={SIGNUP_URL}
                className="font-semibold text-ink underline underline-offset-4"
              >
                Começar agora
              </a>
              .
            </p>
          </div>
          <ProductPreview kind={preview} />
        </div>
      </div>
    </section>
  );
}

function CommercialBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-caption text-muted-ink">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-ink"
          >
            Início
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <span aria-current="page" className="text-ink">
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function ProductPreview({ kind }: { kind: PreviewKind }) {
  return (
    <div
      role="img"
      aria-label={previewLabels[kind]}
      className="relative isolate px-1 pb-1 pt-5 sm:px-5 sm:pb-3 sm:pt-8"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[9%] top-[12%] -z-10 h-[72%] rounded-full bg-ink/[0.065] blur-3xl"
      />
      <div aria-hidden="true" className="relative">
        <div className="overflow-hidden rounded-[14px] border border-ink/[0.12] bg-surface [box-shadow:0_2px_3px_-2px_rgb(23_24_16_/_0.14),0_18px_44px_-24px_rgb(23_24_16_/_0.32)]">
          <div className="grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-line bg-surface-2 px-3 sm:px-4">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex min-h-7 w-full max-w-52 items-center justify-center gap-1.5 rounded-md border border-ink/[0.08] bg-surface px-3 text-[10px] text-muted-ink sm:max-w-60">
              <LockKeyhole className="h-2.5 w-2.5" />
              <span className="truncate">barber.flowo.com.br</span>
            </div>
            <span className="hidden text-[10px] font-semibold tracking-[0.16em] text-ink sm:inline">
              FLOWO
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-cream">
                <Scissors className="h-3.5 w-3.5" />
              </span>
              <span>
                <span className="block text-[11px] font-semibold leading-none text-ink">
                  Flowo
                </span>
                <span className="mt-1 block text-[9px] leading-none text-muted-ink">
                  Gestão da barbearia
                </span>
              </span>
            </div>
            <span className="rounded-full border border-line px-2 py-1 text-[9px] font-medium text-muted-ink">
              Ambiente seguro
            </span>
          </div>
          <div className="p-4 pb-8 sm:p-6 sm:pb-10">
            {kind === "agenda" && <AgendaPreview />}
            {kind === "whatsapp" && <WhatsappPreview />}
            {kind === "pagamento" && <PaymentPreview />}
            {kind === "comparacao" && <ComparisonPreview />}
          </div>
        </div>
        <PreviewSignal kind={kind} />
      </div>
      <p className="mt-4 text-center text-[11px] text-muted-ink">
        Demonstração ilustrativa do produto
      </p>
    </div>
  );
}

const previewSignals: Record<
  PreviewKind,
  { eyebrow: string; title: string; meta: string }
> = {
  agenda: {
    eyebrow: "Novo horário",
    title: "Agendamento confirmado",
    meta: "Rafa · amanhã, 11h30",
  },
  whatsapp: {
    eyebrow: "WhatsApp",
    title: "Agendamento concluído",
    meta: "Corte · amanhã, 11h30",
  },
  pagamento: {
    eyebrow: "Caixa atualizado",
    title: "Pagamento aprovado",
    meta: "PIX · R$ 75,00",
  },
  comparacao: {
    eyebrow: "Rotina organizada",
    title: "3 etapas automatizadas",
    meta: "Do atendimento à confirmação",
  },
};

function PreviewSignal({ kind }: { kind: PreviewKind }) {
  const signal = previewSignals[kind];

  return (
    <div className="relative -mt-6 ml-auto mr-3 flex w-[min(17rem,82%)] items-center gap-3 rounded-xl border border-ink/[0.1] bg-surface px-3.5 py-3 [box-shadow:0_16px_38px_-22px_rgb(23_24_16_/_0.4)] sm:-mt-7 sm:mr-5 sm:w-72">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-cream">
        <CheckCircle2 className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-faint-ink">
          {signal.eyebrow}
        </span>
        <span className="mt-0.5 block truncate text-xs font-semibold text-ink">
          {signal.title}
        </span>
        <span className="block truncate text-[10px] text-muted-ink">
          {signal.meta}
        </span>
      </span>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--success)]" />
    </div>
  );
}

const previewLabels: Record<PreviewKind, string> = {
  agenda:
    "Exemplo da agenda do Flowo com horários, profissionais diferentes e status de confirmação.",
  whatsapp:
    "Exemplo de conversa no WhatsApp em que a IA oferece horários livres e confirma o agendamento.",
  pagamento:
    "Exemplo do fluxo de pagamento do atendimento por PIX ou cartão, com registro no caixa.",
  comparacao:
    "Comparação ilustrativa entre uma rotina manual e uma rotina organizada no Flowo.",
};

const previewAgenda = [
  ["09:00", "Corte", "Rafa", "Confirmado"],
  ["10:30", "Barba", "Pedro", "Confirmado"],
  ["14:00", "Corte + barba", "Rafa", "A confirmar"],
];

function AgendaPreview() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption text-muted-ink">Agenda de hoje</p>
          <p className="mt-1 font-semibold text-ink">Quarta-feira, 29 de julho</p>
        </div>
        <CalendarDays className="h-5 w-5 text-ink" />
      </div>
      <ul className="mt-5 divide-y divide-line border-y border-line">
        {previewAgenda.map(([time, service, barber, status]) => (
          <li key={time} className="flex items-center gap-3 py-3">
            <span className="w-11 shrink-0 text-sm font-semibold tabular-nums text-ink">
              {time}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink">
                {service}
              </span>
              <span className="block text-xs text-muted-ink">{barber}</span>
            </span>
            <span
              className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${
                status === "Confirmado"
                  ? "bg-ink text-cream"
                  : "bg-surface-2 text-muted-ink"
              }`}
            >
              {status}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-muted-ink">
        Cada profissional pode trabalhar em dias e horários diferentes nos
        planos com equipe.
      </p>
    </>
  );
}

function WhatsappPreview() {
  return (
    <>
      <div className="flex items-center gap-3 border-b border-line pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2">
          <Scissors className="h-4 w-4 text-ink" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">Barbearia</span>
          <span className="block text-xs text-muted-ink">
            atendimento pelo Flowo
          </span>
        </span>
      </div>
      <div className="mt-5 space-y-3">
        <ChatBubble side="right">Quero corte amanhã com o Rafa.</ChatBubble>
        <ChatBubble side="left">
          O Rafa tem 9h, 11h30 ou 15h. Qual horário fica melhor?
        </ChatBubble>
        <ChatBubble side="right">11h30.</ChatBubble>
        <ChatBubble side="left">
          Pronto: corte com Rafa, amanhã às 11h30. Vou lembrar você antes.
        </ChatBubble>
      </div>
    </>
  );
}

function ChatBubble({
  side,
  children,
}: {
  side: "left" | "right";
  children: ReactNode;
}) {
  return (
    <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[86%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
          side === "right"
            ? "bg-ink text-cream"
            : "border border-line bg-surface-2 text-ink"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function PaymentPreview() {
  const steps = [
    ["Comanda", "Corte + barba", "R$ 75,00"],
    ["Forma de pagamento", "PIX ou cartão", "Escolhida pelo cliente"],
    ["Caixa", "Pagamento aprovado", "Registrado"],
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption text-muted-ink">Atendimento concluído</p>
          <p className="mt-1 font-semibold text-ink">Fechamento da comanda</p>
        </div>
        <CreditCard className="h-5 w-5 text-ink" />
      </div>
      <ol className="mt-5 divide-y divide-line border-y border-line">
        {steps.map(([label, title, meta], index) => (
          <li key={label} className="grid grid-cols-[2rem_1fr] gap-3 py-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-xs font-semibold text-ink">
              {index + 1}
            </span>
            <span>
              <span className="block text-xs text-muted-ink">{label}</span>
              <span className="mt-0.5 block text-sm font-medium text-ink">
                {title}
              </span>
              <span className="block text-xs text-muted-ink">{meta}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-muted-ink">
        O pagamento é do atendimento. O Flowo não exige sinal para reservar
        horário.
      </p>
    </>
  );
}

function ComparisonPreview() {
  const rows = [
    ["Responder cada mensagem", "Atendimento automático"],
    ["Conferir horário à mão", "Disponibilidade atualizada"],
    ["Lembrar o cliente", "Confirmação automática"],
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <p className="text-caption font-medium text-muted-ink">Rotina manual</p>
        <p className="text-caption font-medium text-ink">Com o Flowo</p>
      </div>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {rows.map(([before, after]) => (
          <li key={before} className="grid grid-cols-2 gap-3 py-3">
            <span className="text-sm text-muted-ink">{before}</span>
            <span className="flex gap-2 text-sm font-medium text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0" />
              {after}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center gap-3 rounded-lg bg-surface-2 p-4">
        <MessageCircle className="h-5 w-5 shrink-0 text-ink" />
        <p className="text-sm text-muted-ink">
          A diferença principal não é onde você anota: é quem executa a rotina.
        </p>
      </div>
    </>
  );
}

export function RelatedSolutions({
  title = "Continue pela necessidade da sua barbearia",
  items,
}: {
  title?: string;
  items: { href: string; label: string; description: string }[];
}) {
  return (
    <section
      aria-labelledby="related-solutions-title"
      className="section-tight border-t border-line"
    >
      <div className="container-page">
        <h2
          id="related-solutions-title"
          className="text-h3 font-semibold text-ink"
        >
          {title}
        </h2>
        <div className="mt-8 grid border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-40 flex-col justify-between border-b border-line px-0 py-6 transition-colors last:border-b-0 hover:bg-surface-2 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0"
            >
              <div>
                <h3 className="font-semibold text-ink">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                  {item.description}
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-label font-medium text-ink">
                Ver detalhes
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CommercialCta({
  title,
  description,
  price,
}: {
  title: string;
  description: string;
  price: number;
}) {
  return (
    <section className="on-ink section-normal">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-2xl">
            <p className="text-label font-medium text-muted-ink">
              Próximo passo
            </p>
            <h2 className="mt-4 text-h2 font-semibold text-ink">{title}</h2>
            <p className="mt-4 max-w-measure text-lead text-muted-ink">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a
              href={SIGNUP_URL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-label font-semibold text-cream transition-opacity duration-200 hover:opacity-90"
            >
              Começar agora
              <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
            <Link
              href="/precos"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-7 py-3 text-label font-medium text-ink transition-colors duration-200 hover:bg-surface"
            >
              Ver planos
            </Link>
          </div>
        </div>
        <p className="mt-8 border-t border-line pt-5 text-caption text-muted-ink">
          A partir de R$ {price}/mês no plano Solo. Sem fidelidade.
        </p>
      </div>
    </section>
  );
}
