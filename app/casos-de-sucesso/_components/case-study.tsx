import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { LeadCaptureModal } from "@/components/lead-capture-modal";

/**
 * Shared shell for the illustrative case pages under /casos-de-sucesso/*.
 * Every case is explicitly framed as an illustrative scenario (no fabricated
 * customer metrics, no invented quotes). The honesty rule lives here, in
 * one place.
 */

export function CaseStudyPage({
  crumbLabel,
  industry,
  title,
  lead,
  children,
}: {
  crumbLabel: string;
  industry: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <section className="pt-32 pb-section-normal">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Casos de Uso", href: "/casos-de-sucesso" },
              { label: crumbLabel, href: "#" },
            ]}
          />

          <header className="mt-10 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-line px-3 py-1 text-caption font-medium text-muted-ink">
                {industry}
              </span>
              <span className="rounded-full bg-surface-2 px-3 py-1 text-caption font-medium text-muted-ink">
                Exemplo ilustrativo
              </span>
            </div>
            <h1 className="mt-5 text-h2 font-bold leading-tight text-ink">
              {title}
            </h1>
            <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
              {lead}
            </p>
          </header>

          <IllustrativeNote />

          {children}

          <CaseCta />

          <div className="mt-12 border-t border-line pt-8">
            <Link
              href="/casos-de-sucesso"
              className="inline-flex items-center gap-2 text-label font-medium text-muted-ink transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Ver todos os casos de uso
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IllustrativeNote() {
  return (
    <aside className="mb-12 flex items-start gap-3 rounded-lg border border-line bg-surface p-5">
      <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-ink" aria-hidden="true" />
      <p className="text-label text-muted-ink">
        Este é um cenário ilustrativo, criado para mostrar como o Flowo
        funciona neste tipo de negócio. Não descreve um cliente real nem
        resultados medidos.
      </p>
    </aside>
  );
}

export function CaseSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-h3 font-bold text-ink">{title}</h2>
      <div className="mt-4 space-y-5 text-body leading-relaxed text-muted-ink [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

export function CaseChecklist({ items }: { items: string[] }) {
  return (
    <ul className="my-6 space-y-3">
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

export function BeforeAfter({
  items,
}: {
  items: { before: string; after: string }[];
}) {
  return (
    <div className="my-8 overflow-hidden rounded-lg border border-line">
      <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-line bg-surface-2 px-5 py-3 sm:grid">
        <p className="text-caption font-semibold uppercase tracking-wide text-muted-ink">
          Antes
        </p>
        <span aria-hidden="true" className="w-4" />
        <p className="text-caption font-semibold uppercase tracking-wide text-ink">
          Com o Flowo
        </p>
      </div>
      <ul className="divide-y divide-line bg-surface">
        {items.map((item) => (
          <li
            key={item.before}
            className="grid gap-2 px-5 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4"
          >
            <p className="text-label text-muted-ink">
              <span className="mr-2 font-semibold uppercase text-faint-ink sm:hidden">
                Antes:
              </span>
              {item.before}
            </p>
            <ArrowRight
              className="hidden h-4 w-4 text-faint-ink sm:block"
              aria-hidden="true"
            />
            <p className="text-label font-medium text-ink">
              <span className="mr-2 font-semibold uppercase text-faint-ink sm:hidden">
                Depois:
              </span>
              {item.after}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseCta() {
  return (
    <div className="on-ink mt-16 rounded-lg p-8 sm:p-10">
      <h2 className="text-h3 font-bold">Quer ver como fica no seu negócio?</h2>
      <p className="mt-3 max-w-measure text-muted-ink">
        Configure seus serviços e horários em poucos minutos e deixe a IA
        atender no WhatsApp.
      </p>
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
