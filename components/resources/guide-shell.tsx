import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Info,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/components/cta-links";
import { GUIDE_BY_PATH } from "@/data/guides";
import { GuideTocNav } from "./guide-toc";

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
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </section>
  );
}

export function GuideHeader({
  crumbs,
  readTime,
  title,
  lead,
  updatedAt = "3 de setembro de 2026",
}: {
  crumbs: Crumb[];
  readTime: string;
  title: ReactNode;
  lead: string;
  updatedAt?: string;
}) {
  return (
    <header className="mb-10 max-w-3xl sm:mb-12">
      <Breadcrumb items={crumbs} />
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-label text-muted-ink">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {readTime} de leitura
        </span>
        <span className="text-caption text-faint-ink">
          Revisado em {updatedAt}
        </span>
      </div>
      <h1 className="mt-5 font-serif text-[clamp(2.1rem,1.6rem+1.6vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink-strong">{title}</h1>
      <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
        {lead}
      </p>
    </header>
  );
}

export function GuideToc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <>
      <details className="group mb-10 rounded-lg border border-line bg-surface sm:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-semibold text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">
          Neste guia
          <span className="text-caption font-normal text-muted-ink group-open:hidden">
            {items.length} tópicos
          </span>
          <span className="hidden text-caption font-normal text-muted-ink group-open:inline">
            Fechar
          </span>
        </summary>
        <GuideTocNav items={items} className="border-t border-line px-5 py-4" />
      </details>
      <GuideTocNav
        items={items}
        className="mb-12 hidden max-h-[calc(100vh-9rem)] overflow-y-auto sm:block"
      />
    </>
  );
}

export function GuideContent({
  items,
  children,
}: {
  items: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
      <article className="min-w-0 lg:col-start-1 lg:row-start-1">
        {children}
      </article>
      <div className="order-first lg:order-none lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28">
        <GuideToc items={items} />
      </div>
    </div>
  );
}

export function GuideAvailability({
  items,
}: {
  items: { label: string; value: string; description?: string }[];
}) {
  return (
    <aside
      aria-label="Disponibilidade na Flowo"
      className="mb-10 max-w-3xl rounded-lg border border-line bg-surface p-5 sm:mb-12 sm:p-6"
    >
      <p className="text-label font-semibold text-ink">Como isso existe na Flowo</p>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={`${item.label}-${item.value}`}>
            <dt className="text-caption font-medium uppercase tracking-[0.08em] text-faint-ink">
              {item.label}
            </dt>
            <dd className="mt-1 font-semibold text-ink">{item.value}</dd>
            {item.description ? (
              <dd className="mt-1 text-label leading-relaxed text-muted-ink">
                {item.description}
              </dd>
            ) : null}
          </div>
        ))}
      </dl>
    </aside>
  );
}

export function GuideProductPath({
  items,
}: {
  items: { surface: string; path: string; action: string }[];
}) {
  return (
    <aside className="my-8 rounded-lg border border-line bg-surface p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-ink" aria-hidden="true" />
        <p className="font-semibold text-ink">Onde fazer na Flowo</p>
      </div>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li
            key={`${item.surface}-${item.path}`}
            className="grid gap-1 border-t border-line pt-4 first:border-0 first:pt-0 sm:grid-cols-[8rem_1fr]"
          >
            <span className="text-label font-semibold text-ink">{item.surface}</span>
            <span className="text-label leading-relaxed text-muted-ink">
              <span className="font-medium text-ink">{item.path}</span>
              {" · "}
              {item.action}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function GuideScopeNote({
  title,
  children,
  status = "available",
}: {
  title: string;
  children: ReactNode;
  status?: "available" | "conditional" | "practice";
}) {
  const Icon = status === "available" ? Check : Info;
  const label =
    status === "available"
      ? "Disponível no produto"
      : status === "conditional"
        ? "Depende de ativação ou plano"
        : "Boa prática de gestão";

  return (
    <aside className="my-8 rounded-lg border border-line bg-background p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-full border border-line bg-surface p-1.5">
          <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
        </span>
        <div>
          <p className="text-caption font-medium uppercase tracking-[0.08em] text-faint-ink">
            {label}
          </p>
          <p className="mt-1 font-semibold text-ink">{title}</p>
          <div className="mt-2 text-label leading-relaxed text-muted-ink">
            {children}
          </div>
        </div>
      </div>
    </aside>
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
      <div className="mb-5 flex items-baseline gap-3 border-t border-line pt-8">
        <Icon className="h-5 w-5 shrink-0 translate-y-1 text-faint-ink" aria-hidden="true" />
        <h2 className="font-serif text-[1.75rem] font-medium leading-[1.2] tracking-[-0.015em] text-ink-strong sm:text-[2rem]">
          {title}
        </h2>
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
      className={
        columns === 2
          ? "my-8 grid gap-x-10 gap-y-0 border-y border-line sm:grid-cols-2"
          : "my-8 divide-y divide-line border-y border-line"
      }
    >
      {items.map((item) => (
        <div
          key={item.title}
          className={columns === 2 ? "border-b border-line py-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0" : "py-4"}
        >
          <h3 className="font-semibold text-ink">{item.title}</h3>
          <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-ink">{item.description}</p>
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
    <ol className="my-8 divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <li key={item.title} className="flex items-start gap-5 py-5">
          <span
            aria-hidden="true"
            className="w-7 shrink-0 font-serif text-[1.5rem] leading-none text-faint-ink"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-ink">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function GuideChecklist({ items }: { items: string[] }) {
  // Uma lista é uma lista. Cartão por item achata a página e some com a
  // hierarquia: o filete separa sem competir com os avisos de verdade.
  return (
    <ul className="my-8 divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 py-3.5 text-body text-muted-ink">
          <Check className="mt-1 h-4 w-4 shrink-0 text-faint-ink" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
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
    <div className="on-ink mt-16 max-w-3xl rounded-lg p-8 sm:p-10">
      <h2 className="text-h3 font-bold">{title}</h2>
      <p className="mt-3 max-w-measure text-muted-ink">{description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button size="lg" className="rounded-full px-7" asChild>
          <a
            href={SIGNUP_URL}
            className="outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Criar minha conta
          </a>
        </Button>
        <Link
          href="/precos"
          className="inline-flex min-h-11 items-center rounded text-label font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
  currentPath,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
  currentPath?: string;
}) {
  const relatedGuides = currentPath
    ? (GUIDE_BY_PATH[currentPath]?.relatedPaths.map(
        (path) => GUIDE_BY_PATH[path],
      ) ?? [])
    : [];

  return (
    <div className="mt-12 max-w-3xl">
      {relatedGuides.length > 0 ? (
        <section aria-labelledby="related-guides-title">
          <p className="text-caption font-semibold uppercase tracking-[0.12em] text-faint-ink">
            Próximo passo
          </p>
          <h2 id="related-guides-title" className="mt-2 text-h3 font-bold text-ink">
            Continue por um tema relacionado
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {relatedGuides.map((guide) => (
              <li key={guide.path}>
                <Link
                  href={guide.path}
                  className="group flex h-full min-h-28 flex-col justify-between rounded-lg border border-line bg-surface p-4 outline-none transition-colors hover:border-ink/40 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                >
                  <span className="text-label font-semibold leading-snug text-ink">
                    {guide.title}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-caption text-muted-ink">
                    {guide.readTime} de leitura
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <Link
          href={prev?.href ?? "/recursos/guias"}
          className="inline-flex min-h-11 items-center gap-2 rounded-full text-label font-medium text-muted-ink outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {prev?.label ?? "Voltar aos guias"}
        </Link>
        {next ? (
          <Link
            href={next.href}
            className="inline-flex min-h-11 items-center gap-2 rounded-full text-label font-medium text-ink outline-none transition-colors hover:text-muted-ink focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            {next.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
