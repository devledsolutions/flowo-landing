import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
} from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { ValidationCase } from "@/data/validation-cases";

interface ValidationCasePageProps {
  validationCase: ValidationCase;
}

export function ValidationCasePage({
  validationCase,
}: ValidationCasePageProps) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="on-ink pb-section-normal pt-32 md:pt-36">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Casos de validação", href: "/casos-de-validacao" },
                {
                  label: validationCase.name,
                  href: `/casos-de-validacao/${validationCase.slug}`,
                },
              ]}
            />

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:gap-20">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-caption font-medium text-muted-ink">
                  <span>{validationCase.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{validationCase.profile}</span>
                </div>
                <h1 className="mt-5 max-w-[18ch] text-display font-semibold leading-[1.04] tracking-[-0.035em] text-ink-strong">
                  {validationCase.headline}
                </h1>
                <p className="mt-6 max-w-[62ch] text-lead leading-relaxed text-muted-ink">
                  {validationCase.summary}
                </p>
              </div>

              <div className="flex items-center gap-5 border-y border-line py-5 lg:block lg:border-y-0 lg:py-0">
                <Image
                  src={validationCase.logo}
                  alt={`Logo fictício da ${validationCase.name}`}
                  width={160}
                  height={160}
                  className="h-24 w-24 shrink-0 rounded-xl object-contain lg:h-40 lg:w-40"
                />
                <div className="lg:mt-5">
                  <p className="text-lg font-semibold text-ink">
                    {validationCase.name}
                  </p>
                  <p className="mt-1 text-caption leading-relaxed text-muted-ink">
                    Nome e identidade fictícios para representar o perfil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="container-page grid gap-5 py-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink">
              <CalendarCheck2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-ink">
                Fluxo validado em produção em 26 de julho de 2026
              </p>
              <p className="mt-1 max-w-[74ch] text-label leading-relaxed text-muted-ink">
                Evidência obtida com ativos próprios e ambiente controlado. O
                caso explica a aplicação do produto; não atribui resultados a
                um cliente ou uma operação comercial inexistente.
              </p>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">
                O problema na rotina
              </h2>
              <p className="mt-5 max-w-measure text-body leading-relaxed text-muted-ink">
                {validationCase.challenge}
              </p>
            </div>

            <div>
              <h2 className="text-h3 font-semibold text-ink">
                O que precisa estar configurado
              </h2>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {validationCase.setup.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-4 text-body text-muted-ink"
                  >
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0 text-ink"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
              <h2 className="max-w-[13ch] text-h2 font-semibold leading-tight text-ink-strong">
                Como o fluxo acontece
              </h2>
              <p className="max-w-measure text-body text-muted-ink">
                A sequência abaixo descreve ações exercitadas na validação, não
                uma promessa baseada em estimativa.
              </p>
            </div>

            <ol className="mt-10 divide-y divide-line border-y border-line">
              {validationCase.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-4 py-6 md:grid-cols-[3rem_minmax(13rem,0.65fr)_minmax(0,1fr)] md:items-start md:gap-8"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-label font-semibold text-ink">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="max-w-[66ch] text-body leading-relaxed text-muted-ink">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="text-h3 font-semibold text-ink">
                O que ficou comprovado
              </h2>
              <p className="mt-5 max-w-measure text-body leading-relaxed text-muted-ink">
                {validationCase.validatedOutcome}
              </p>
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline underline-offset-4"
              >
                Conferir o escopo completo da validação
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div>
              <h2 className="text-h3 font-semibold text-ink">
                Este perfil faz sentido para
              </h2>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {validationCase.suitedFor.map((item) => (
                  <li key={item} className="py-4 text-body text-muted-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="on-ink section-normal">
          <div className="container-page grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="max-w-2xl">
              <p className="text-label text-muted-ink">
                Plano indicado: {validationCase.plan}
              </p>
              <h2 className="mt-4 text-h2 font-semibold leading-tight text-ink">
                Veja como esse fluxo entra na sua barbearia.
              </h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                Compare o plano, os recursos incluídos e o que será configurado
                antes de colocar o atendimento na rotina.
              </p>
            </div>
            <Link
              href={`/${validationCase.planAnchor}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-semibold text-[#171810] transition-opacity hover:opacity-90"
            >
              Ver plano {validationCase.plan}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <div className="container-page py-8">
          <Link
            href="/casos-de-validacao"
            className="inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Ver os dois casos de validação
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
