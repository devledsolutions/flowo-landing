import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { SIGNUP_URL } from "@/components/cta-links";
import { formatBRL } from "@/data/pricing-data";
import { PhoneFrame } from "@/components/home/phone-frame";
import { WhatsAppChat } from "@/components/home/whatsapp-chat";
import { ProductDisclaimer } from "@/components/home/product-previews";
import Image from "next/image";

type PreviewKind =
  | "agenda"
  | "whatsapp"
  | "pagamento"
  | "comparacao"
  | "conversas"
  | "clientes";

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

const previewScreens: Record<Exclude<PreviewKind, "whatsapp">, { src: string; alt: string }> = {
  agenda: {
    src: "/images/product/dashboard-agenda.png",
    alt: "Agenda da Flowo com os horários de cada barbeiro",
  },
  pagamento: {
    src: "/images/product/dashboard-comandas.png",
    alt: "Comanda da Flowo com serviços, produtos e forma de pagamento",
  },
  comparacao: {
    src: "/images/product/dashboard-hoje.png",
    alt: "Tela Hoje da Flowo com os atendimentos do dia",
  },
  conversas: {
    src: "/images/product/dashboard-conversas.png",
    alt: "Conversas do WhatsApp da barbearia dentro da Flowo",
  },
  clientes: {
    src: "/images/product/dashboard-clientes.png",
    alt: "Tela Clientes da Flowo com histórico e contatos da barbearia",
  },
};

function ProductPreview({ kind }: { kind: PreviewKind }) {
  if (kind === "whatsapp") {
    return (
      <div className="flex flex-col items-center">
        <PhoneFrame>
          <WhatsAppChat width={300} logicalHeight={760} />
        </PhoneFrame>
        <ProductDisclaimer className="mt-4" label="Conversa com dados ilustrativos" />
      </div>
    );
  }
  const screen = previewScreens[kind];
  return (
    <div>
      <Image
        src={screen.src}
        alt={screen.alt}
        width={1920}
        height={1041}
        sizes="(min-width: 1024px) 640px, 100vw"
        priority
        className="w-full rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-24px_rgba(23,24,16,0.35)]"
      />
      <ProductDisclaimer className="mt-4" label="Telas do app com dados ilustrativos" />
    </div>
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
          A partir de {formatBRL(price)}/mês no plano Solo. Sem fidelidade.
        </p>
      </div>
    </section>
  );
}
