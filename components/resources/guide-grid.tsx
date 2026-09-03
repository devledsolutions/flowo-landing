import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/components/cta-links";
import { GUIDES, GUIDE_GROUPS } from "@/data/guides";
import { LEGAL_ENTITY } from "@/lib/legal-identity";

/**
 * Lista dos guias, no mesmo desenho das páginas de guia: grupo à esquerda,
 * linhas divididas à direita. Cartão com ícone, selo e etiquetas dava a dez
 * guias o mesmo peso visual e não deixava nenhum sobressair.
 */
export function GuideGrid() {
  return (
    <section className="pb-section-tight pt-10">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-16">
            {GUIDE_GROUPS.map((group, groupIndex) => {
              const groupGuides = GUIDES.filter(
                (guide) => guide.group === group.id,
              );

              return (
                <section
                  key={group.id}
                  aria-labelledby={`guide-group-${group.id}`}
                  className="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10"
                >
                  <div className="lg:pt-1">
                    <p className="text-caption tabular-nums text-faint-ink">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </p>
                    <h2
                      id={`guide-group-${group.id}`}
                      className="mt-2 font-serif text-[1.5rem] font-medium leading-[1.2] tracking-[-0.015em] text-ink-strong"
                    >
                      {group.title}
                    </h2>
                    <p className="mt-3 text-label leading-relaxed text-muted-ink">
                      {group.description}
                    </p>
                  </div>

                  <ul className="divide-y divide-line border-y border-line">
                    {groupGuides.map((guide) => (
                      <li key={guide.path}>
                        <Link
                          href={guide.path}
                          className="group grid gap-x-8 gap-y-2 py-6 outline-none transition-colors duration-200 ease-out-quint focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 sm:grid-cols-[minmax(0,1fr)_auto]"
                        >
                          <div>
                            <h3 className="font-serif text-[1.3rem] font-medium leading-[1.25] tracking-[-0.01em] text-ink-strong">
                              {guide.title}
                            </h3>
                            <p className="mt-2 leading-relaxed text-muted-ink">
                              {guide.description}
                            </p>
                            <p className="mt-2 text-caption leading-relaxed text-faint-ink">
                              {guide.topics.join(" · ")}
                            </p>
                          </div>
                          <span className="flex items-center gap-2 text-caption tabular-nums text-faint-ink sm:justify-end sm:pt-1">
                            {guide.readTime}
                            <ArrowRight
                              className="h-4 w-4 transition-transform duration-200 ease-out-quint group-hover:translate-x-1 group-hover:text-ink"
                              aria-hidden="true"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          <div className="on-ink mx-auto mt-16 max-w-3xl rounded-lg p-8 text-center sm:p-10">
            <h2 className="text-h3 font-bold">Quer ver a Flowo na prática?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-ink">
              Configure sua barbearia e aplique o que você leu, dentro do seu
              plano.
            </p>
            <div className="mt-6">
              <Button size="lg" className="rounded-full px-7" asChild>
                <a href={SIGNUP_URL}>Criar minha conta</a>
              </Button>
            </div>
          </div>

          <p className="mt-12 text-center text-label text-muted-ink">
            Mais guias em breve. Tem uma dúvida específica?{" "}
            <a
              href={`mailto:${LEGAL_ENTITY.contactEmail}`}
              className="font-medium text-ink underline underline-offset-4"
            >
              Fale conosco
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
