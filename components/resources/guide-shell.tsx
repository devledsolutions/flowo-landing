import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, type LucideIcon } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { LeadCaptureModal } from "@/components/lead-capture-modal";

/**
 * Shared shell for every guia em /recursos/guias/*.
 * Monochrome ink+cream by design: the only place the article
 * pattern (header, TOC, section heading, callout, CTA, prev/next)
 * is defined. Pages only pass content.
 */

interface Crumb {
  label: string;
  href: string;
}

export function GuidePage({ children }: { children: ReactNode }) {
  return (
    <section className="pt-32 pb-section-normal">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
    </section>
  );
}

export function GuideHeader({
  crumbs,
  readTime,
  title,
  lead,
}: {
  crumbs: Crumb[];
  readTime: string;
  title: ReactNode;
  lead: string;
}) {
  return (
    <header className="mb-12">
      <Breadcrumb items={crumbs} />
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-label text-muted-ink">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {readTime} de leitura
        </span>
      </div>
      <h1 className="mt-5 text-h2 font-bold leading-tight text-ink">{title}</h1>
      <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
        {lead}
      </p>
    </header>
  );
}

export function GuideToc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="Neste guia"
      className="mb-12 rounded-lg border border-line bg-surface p-6"
    >
      <h2 className="mb-4 text-label font-semibold text-ink">Neste guia</h2>
      <ol className="space-y-1">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-baseline gap-3 rounded py-1 text-muted-ink transition-colors hover:text-ink"
            >
              <span className="text-caption tabular-nums text-faint-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GuideSection({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-28 first:mt-0">
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-lg border border-line bg-surface p-2">
          <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
        </span>
        <h2 className="text-h3 font-bold text-ink">{title}</h2>
      </div>
      <div className="space-y-5 text-body leading-relaxed text-muted-ink [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

export function GuideCallout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-8 rounded-lg border border-line bg-surface p-6">
      {title ? <p className="mb-2 font-semibold text-ink">{title}</p> : null}
      <div className="text-body text-muted-ink">{children}</div>
    </aside>
  );
}

export function GuideCards({
  items,
  columns = 1,
}: {
  items: { title: string; description: string }[];
  columns?: 1 | 2;
}) {
  return (
    <div
      className={`my-8 grid gap-4 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
    >
      {items.map((item) => (
        <div key={item.title} className="rounded-lg border border-line bg-surface p-5">
          <h3 className="font-semibold text-ink">{item.title}</h3>
          <p className="mt-1 text-[0.95rem] text-muted-ink">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function GuideSteps({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <ol className="my-8 space-y-4">
      {items.map((item, index) => (
        <li
          key={item.title}
          className="flex items-start gap-4 rounded-lg border border-line bg-surface p-5"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-background"
          >
            {index + 1}
          </span>
          <div>
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-[0.95rem] text-muted-ink">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function GuideChecklist({ items }: { items: string[] }) {
  return (
    <ul className="my-8 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4 text-muted-ink"
        >
          <span
            aria-hidden="true"
            className="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Sample WhatsApp exchange. Kept neutral: it illustrates tone, not results. */
export function GuideChatSample({
  customer,
  reply,
}: {
  customer: string;
  reply: string;
}) {
  return (
    <figure className="my-8 rounded-lg border border-line bg-surface p-6">
      <figcaption className="mb-3 text-caption text-faint-ink">
        Exemplo de conversa
      </figcaption>
      <div className="space-y-3">
        <p className="max-w-[85%] rounded-lg rounded-bl-sm bg-surface-2 p-3 text-[0.95rem] text-ink">
          {customer}
        </p>
        <p className="ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-ink p-3 text-[0.95rem] text-background">
          {reply}
        </p>
      </div>
    </figure>
  );
}

export function GuideCta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="on-ink mt-16 rounded-lg p-8 sm:p-10">
      <h2 className="text-h3 font-bold">{title}</h2>
      <p className="mt-3 max-w-measure text-muted-ink">{description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <LeadCaptureModal>
          <Button size="lg" className="rounded-full px-7">
            Começar agora
          </Button>
        </LeadCaptureModal>
        <Link
          href="/precos"
          className="text-label font-medium underline-offset-4 hover:underline"
        >
          Ver planos e preços
        </Link>
      </div>
    </div>
  );
}

export function GuidePrevNext({
  prev,
  next,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
      <Link
        href={prev?.href ?? "/recursos/guias"}
        className="inline-flex items-center gap-2 rounded-full text-label font-medium text-muted-ink transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {prev?.label ?? "Voltar aos guias"}
      </Link>
      {next ? (
        <Link
          href={next.href}
          className="inline-flex items-center gap-2 rounded-full text-label font-medium text-ink transition-colors hover:text-muted-ink"
        >
          {next.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
