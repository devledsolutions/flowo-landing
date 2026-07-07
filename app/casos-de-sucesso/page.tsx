import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Dumbbell,
  Heart,
  Info,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { LeadCaptureModal } from "@/components/lead-capture-modal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Casos de Uso",
  description:
    "Exemplos ilustrativos de como o agendamento com confirmação automática pelo WhatsApp funciona em academias, clínicas e estúdios de beleza.",
  path: "/casos-de-sucesso",
});

const useCases = [
  {
    slug: "academia-corpo-em-forma",
    title: "Academia Corpo em Forma",
    industry: "Fitness e Bem-estar",
    icon: Dumbbell,
    description:
      "Como uma academia usaria o Flowo para confirmar presença nas aulas, liberar vagas de quem não confirma e acompanhar a frequência dos alunos.",
    highlights: [
      "Confirmação de presença por WhatsApp",
      "Vagas liberadas automaticamente",
      "Histórico de frequência",
    ],
  },
  {
    slug: "estudio-beleza-radiante",
    title: "Estúdio Beleza Radiante",
    industry: "Beleza e Estética",
    icon: Sparkles,
    description:
      "Como um estúdio usaria agenda por profissional, lembretes automáticos e reativação de clientes sumidos para manter a agenda cheia.",
    highlights: [
      "Agenda por profissional",
      "Lembretes 24h e 2h antes",
      "Reativação pelo WhatsApp",
    ],
  },
  {
    slug: "clinica-saude-total",
    title: "Clínica Saúde Total",
    industry: "Saúde e Bem-estar",
    icon: Heart,
    description:
      "Como uma clínica usaria confirmação automática de consultas e agenda centralizada de vários profissionais para reduzir buracos no dia.",
    highlights: [
      "Confirmação automática de consultas",
      "Vários profissionais, uma agenda",
      "Remarcação sem telefone",
    ],
  },
];

export default function UseCasesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-4xl">
              <Breadcrumb
                items={[
                  { label: "Início", href: "/" },
                  { label: "Casos de Uso", href: "/casos-de-sucesso" },
                ]}
              />

              {/* Hero */}
              <div className="mt-10 mb-10 grid items-center gap-10 md:grid-cols-[1fr_240px]">
                <div>
                  <h1 className="text-h2 font-bold leading-tight text-ink">
                    O mesmo cuidado da barbearia, em qualquer{" "}
                    <em className="font-serif font-medium italic">agenda</em>
                  </h1>
                  <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
                    O Flowo nasceu para barbearias. Os cenários abaixo mostram,
                    de forma ilustrativa, como o agendamento com confirmação
                    automática pelo WhatsApp se aplica a outros negócios de
                    agenda.
                  </p>
                </div>
                <div className="hidden overflow-hidden rounded-lg md:block">
                  <Image
                    src="https://images.unsplash.com/photo-1621645582931-d1d3e6564943?auto=format&fit=crop&w=1000&q=80"
                    alt="Cadeira de barbeiro preta e cromada, retrato de objeto"
                    width={480}
                    height={600}
                    className="img-duotone h-auto w-full object-cover"
                    sizes="240px"
                  />
                </div>
              </div>

              {/* Illustrative disclosure */}
              <aside className="mb-12 flex items-start gap-3 rounded-lg border border-line bg-surface p-5">
                <Info
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-ink"
                  aria-hidden="true"
                />
                <p className="text-label text-muted-ink">
                  Os casos a seguir são cenários ilustrativos, criados para
                  mostrar como o produto funciona em cada tipo de negócio. Não
                  descrevem clientes reais nem resultados medidos.
                </p>
              </aside>

              {/* Use cases */}
              <ul className="grid gap-6">
                {useCases.map((useCase) => (
                  <li key={useCase.slug}>
                    <Link
                      href={`/casos-de-sucesso/${useCase.slug}`}
                      className="group block rounded-lg border border-line bg-surface p-6 transition-colors duration-200 ease-out-quint hover:border-ink/40 md:p-8"
                    >
                      <div className="flex flex-col gap-6 md:flex-row md:items-start">
                        <div className="w-fit rounded-lg bg-surface-2 p-4">
                          <useCase.icon
                            className="h-7 w-7 text-ink"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-line px-2.5 py-0.5 text-caption font-medium text-muted-ink">
                              {useCase.industry}
                            </span>
                            <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-caption font-medium text-muted-ink">
                              Exemplo ilustrativo
                            </span>
                          </div>
                          <h2 className="text-h3 font-bold text-ink">
                            {useCase.title}
                          </h2>
                          <p className="mt-2 text-muted-ink">
                            {useCase.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {useCase.highlights.map((highlight) => (
                              <span
                                key={highlight}
                                className="rounded-full bg-surface-2 px-2.5 py-1 text-caption text-muted-ink"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="hidden items-center self-center md:flex">
                          <ArrowRight
                            className="h-6 w-6 text-faint-ink transition-transform duration-200 ease-out-quint group-hover:translate-x-1 group-hover:text-ink"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="on-ink mt-16 rounded-lg p-8 text-center sm:p-10">
                <h2 className="text-h3 font-bold">
                  Quer ver como fica no seu negócio?
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-ink">
                  Configure seus serviços e horários em poucos minutos e deixe a
                  IA atender no WhatsApp.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
