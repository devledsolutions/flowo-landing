import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { VALIDATION_CASES } from "@/data/validation-cases";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Casos de Validação do Agendamento pelo WhatsApp",
  description:
    "Veja como os fluxos validados da Flowo se aplicam a uma barbearia solo e a uma operação com equipe, da conversa no WhatsApp à agenda.",
  path: "/casos-de-validacao",
  type: "article",
  publishedTime: "2026-07-31",
  modifiedTime: "2026-07-31",
});

export default function ValidationCasesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="pb-section-normal pt-32 md:pt-36">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Casos de validação", href: "/casos-de-validacao" },
              ]}
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end lg:gap-20">
              <div>
                <h1 className="max-w-[16ch] text-display font-semibold leading-[1.04] tracking-[-0.035em] text-ink-strong">
                  Dois perfis. Um fluxo que chega à agenda.
                </h1>
              </div>
              <p className="max-w-[40rem] text-lead leading-relaxed text-muted-ink">
                Casos completos para entender como a validação técnica da Flowo
                se aplica à rotina de quem trabalha sozinho e de quem coordena
                uma equipe.
              </p>
            </div>

            <aside className="mt-10 grid gap-4 border-y border-line py-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-6">
              <CheckCircle2 className="h-6 w-6 text-ink" aria-hidden="true" />
              <p className="max-w-[76ch] text-label leading-relaxed text-muted-ink">
                O funcionamento descrito foi validado em produção em 26 de
                julho de 2026, com ativos próprios. Nomes e logos são fictícios
                e identificam perfis de uso, não clientes ou depoimentos.
              </p>
            </aside>
          </div>
        </section>

        <section className="border-y border-line bg-surface">
          <div className="container-page divide-y divide-line">
            {VALIDATION_CASES.map((validationCase) => (
              <article
                key={validationCase.slug}
                className="grid gap-7 py-9 lg:grid-cols-[8rem_minmax(14rem,0.62fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-9"
              >
                <Image
                  src={validationCase.logo}
                  alt={`Logo fictício da ${validationCase.name}`}
                  width={128}
                  height={128}
                  className="h-28 w-28 rounded-xl object-contain"
                />
                <div>
                  <p className="text-caption font-medium text-muted-ink">
                    {validationCase.location} · {validationCase.profile}
                  </p>
                  <h2 className="mt-2 text-h3 font-semibold text-ink">
                    {validationCase.name}
                  </h2>
                </div>
                <div>
                  <p className="font-semibold leading-relaxed text-ink">
                    {validationCase.headline}
                  </p>
                  <p className="mt-2 max-w-[62ch] text-label leading-relaxed text-muted-ink">
                    {validationCase.validatedOutcome}
                  </p>
                </div>
                <Link
                  href={`/casos-de-validacao/${validationCase.slug}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink px-6 font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
                >
                  Ver caso completo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <h2 className="max-w-[18ch] text-h2 font-semibold leading-tight text-ink-strong">
                Quer aplicar o mesmo fluxo à sua rotina?
              </h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                O Raio-X mostra onde o WhatsApp, a escala e a agenda deixam
                trabalho manual para sua equipe.
              </p>
            </div>
            <Link
              href="/recursos/diagnostico-agenda-barbearia"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-semibold text-cream"
            >
              Fazer o Raio-X da agenda
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
