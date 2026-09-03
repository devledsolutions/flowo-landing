import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Mic2,
  PackageOpen,
  UsersRound,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { LEGAL_ENTITY } from "@/lib/legal-identity";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const PATH = "/parcerias";

export const metadata = buildMetadata({
  title: "Parcerias, Imprensa e Conteúdo para Barbearias",
  description:
    "Aulas, demonstrações e conteúdo com a Flowo para escolas, educadores, distribuidores, contadores, consultores e canais de barbearia.",
  path: PATH,
});

const partnerTypes = [
  {
    icon: GraduationCap,
    title: "Escolas e educadores",
    description:
      "Aula prática sobre agenda, atendimento no WhatsApp e números da cadeira, com demonstração transparente do produto.",
  },
  {
    icon: PackageOpen,
    title: "Distribuidores e fornecedores",
    description:
      "Guias e workshops que ajudam a base profissional a organizar atendimento, equipe, retorno e fechamento.",
  },
  {
    icon: UsersRound,
    title: "Contadores e consultores",
    description:
      "Materiais operacionais sobre comandas, comissões, caixa e nota fiscal, sem substituir orientação profissional.",
  },
  {
    icon: Mic2,
    title: "Podcasts, canais e imprensa",
    description:
      "Demonstração real, aprendizados dos pilotos e dados próprios com método e limitações disponíveis para pauta.",
  },
] as const;

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Parcerias", item: absoluteUrl(PATH) },
  ],
};

export default function ParceriasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="main-content">
        <section className="pb-section-normal pt-32 md:pt-40">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Parcerias", href: PATH },
              ]}
            />
            <div className="mt-10 max-w-4xl">
              <h1 className="max-w-[17ch] text-h2 font-semibold leading-tight text-ink-strong">
                Conteúdo útil para quem ajuda barbearias a crescer.
              </h1>
              <p className="mt-6 max-w-measure text-lead text-muted-ink">
                A Flowo colabora com escolas, educadores, distribuidores,
                contadores, consultores e canais do setor. Levamos demonstração,
                material prático e, quando houver amostra suficiente, dados
                próprios, sem exigir elogio, roteiro positivo ou link.
              </p>
            </div>
          </div>
        </section>

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page grid gap-12 lg:grid-cols-[0.58fr_1.42fr] lg:gap-20">
            <div>
              <h2 className="text-h3 font-semibold text-ink">Formas de colaborar</h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                Cada parceria começa por uma necessidade real da audiência, não
                por um publieditorial disfarçado.
              </p>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {partnerTypes.map((item) => (
                <div key={item.title} className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-background">
                    <item.icon aria-hidden="true" className="h-5 w-5 text-ink" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 max-w-measure text-body text-muted-ink">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-h3 font-semibold text-ink">Material para avaliar antes</h2>
              <ul className="mt-7 divide-y divide-line border-y border-line">
                <li>
                  <Link
                    href="/demonstracao-agendamento-whatsapp"
                    className="group flex min-h-16 items-center justify-between gap-4 py-4 font-semibold text-ink"
                  >
                    Demonstração do WhatsApp até a agenda
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recursos/guias"
                    className="group flex min-h-16 items-center justify-between gap-4 py-4 font-semibold text-ink"
                  >
                    Guias práticos para barbearias
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/comparar"
                    className="group flex min-h-16 items-center justify-between gap-4 py-4 font-semibold text-ink"
                  >
                    Comparações com fontes e data
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="on-ink rounded-xl p-7 sm:p-9">
              <p className="text-label text-muted-ink">Proponha uma pauta</p>
              <h2 className="mt-3 text-h3 font-semibold text-ink">
                Conte qual é a sua audiência e o que seria útil para ela.
              </h2>
              <p className="mt-4 text-body text-muted-ink">
                Respondemos com uma proposta objetiva de aula, entrevista,
                demonstração ou material. Relações comerciais e patrocínios são
                identificados com clareza.
              </p>
              <a
                href={`mailto:${LEGAL_ENTITY.contactEmail}?subject=Parceria%20com%20a%20Flowo`}
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-label font-semibold text-cream transition-opacity hover:opacity-90"
              >
                Falar sobre parceria
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
