import {
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  Clock,
  CreditCard,
  MessageCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/components/cta-links";
import {
  GUIDES,
  GUIDE_GROUPS,
  type GuideIconKey,
} from "@/data/guides";
import { LEGAL_ENTITY } from "@/lib/legal-identity";

const guideIcons: Record<GuideIconKey, typeof Calendar> = {
  calendar: Calendar,
  users: Users,
  "credit-card": CreditCard,
  message: MessageCircle,
  bell: Bell,
  chart: BarChart3,
};

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
                  <div>
                    <p className="text-caption tabular-nums text-faint-ink">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </p>
                    <h2
                      id={`guide-group-${group.id}`}
                      className="mt-2 text-h3 font-bold leading-tight text-ink"
                    >
                      {group.title}
                    </h2>
                    <p className="mt-3 text-label leading-relaxed text-muted-ink">
                      {group.description}
                    </p>
                  </div>

                  <ul className="grid gap-4 md:grid-cols-2">
                    {groupGuides.map((guide) => {
                      const Icon = guideIcons[guide.icon];

                      return (
                        <li key={guide.path}>
                          <Link
                            href={guide.path}
                            className="group flex h-full min-h-72 flex-col rounded-lg border border-line bg-surface p-6 outline-none transition-colors duration-200 ease-out-quint hover:border-ink/40 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="rounded-lg bg-surface-2 p-3">
                                <Icon
                                  className="h-5 w-5 text-ink"
                                  aria-hidden="true"
                                />
                              </div>
                              <ArrowRight
                                className="h-5 w-5 text-faint-ink transition-transform duration-200 ease-out-quint group-hover:translate-x-1 group-hover:text-ink"
                                aria-hidden="true"
                              />
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                              <span className="rounded-full border border-line px-2.5 py-0.5 text-caption font-medium text-muted-ink">
                                {guide.category}
                              </span>
                              <span className="flex items-center gap-1 text-caption text-faint-ink">
                                <Clock
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                                {guide.readTime} de leitura
                              </span>
                            </div>

                            <h3 className="mt-3 text-h3 font-semibold leading-tight text-ink">
                              {guide.title}
                            </h3>
                            <p className="mt-2 leading-relaxed text-muted-ink">
                              {guide.description}
                            </p>

                            <div className="mt-auto flex flex-wrap gap-2 pt-5">
                              {guide.topics.map((topic) => (
                                <span
                                  key={topic}
                                  className="rounded-full bg-surface-2 px-2.5 py-1 text-caption text-muted-ink"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          <div className="on-ink mx-auto mt-16 max-w-3xl rounded-lg p-8 text-center sm:p-10">
            <h2 className="text-h3 font-bold">Quer ver o Flowo na prática?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-ink">
              Configure sua barbearia e aplique o que você leu respeitando os
              limites e a disponibilidade do seu plano.
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
