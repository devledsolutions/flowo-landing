import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  MessageCircle,
  Scissors,
} from "lucide-react";

const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";

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
              <a
                href={SIGNUP_URL}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-label font-semibold text-cream transition-opacity duration-200 ease-out-quint hover:opacity-90"
              >
                Começar agora
                <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
              <Link
                href="/precos"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-7 py-3 text-label font-medium text-ink transition-colors duration-200 ease-out-quint hover:bg-surface-2"
              >
                Comparar planos
              </Link>
            </div>
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
      className="relative overflow-hidden rounded-xl border border-line bg-surface"
    >
      <div aria-hidden="true">
        <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <span className="text-[11px] font-medium text-muted-ink">
            Exemplo no Flowo
          </span>
        </div>
        <div className="p-5 sm:p-6">
          {kind === "agenda" && <AgendaPreview />}
          {kind === "whatsapp" && <WhatsappPreview />}
          {kind === "pagamento" && <PaymentPreview />}
          {kind === "comparacao" && <ComparisonPreview />}
        </div>
      </div>
      <p className="border-t border-line px-5 py-3 text-center text-caption text-muted-ink">
        Dados ilustrativos da interface
      </p>
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
