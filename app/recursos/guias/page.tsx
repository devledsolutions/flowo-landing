import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GuidesHero } from "@/components/resources/guides-hero";
import { GuideGrid } from "@/components/resources/guide-grid";
import { ResourceCollectionStructuredData } from "@/components/resources/resource-structured-data";
import { GUIDES } from "@/data/guides";
import { buildMetadata } from "@/lib/seo";

const PAGE_TITLE = "Guias para Barbearias";
const PAGE_DESCRIPTION =
  "Guias práticos de agendamento, WhatsApp com IA, equipe, pagamentos e financeiro para organizar sua barbearia com a Flowo.";

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/recursos/guias",
});

const strategicLinks = [
  {
    title: "Software para Barbearia",
    description: "Visão geral do produto, agenda, WhatsApp e gestão.",
    href: "/software-para-barbearia",
  },
  {
    title: "Sistema de Agendamento para Barbearia",
    description: "Agenda por barbeiro, confirmação e comanda.",
    href: "/sistema-agendamento-barbearia",
  },
  {
    title: "Agenda da Barbearia no WhatsApp",
    description: "Como a Flowo atende e confirma no WhatsApp.",
    href: "/agenda-barbearia-whatsapp",
  },
  {
    title: "Pagamentos PIX no Atendimento",
    description: "Receba depois do corte com PIX, cartão ou dinheiro.",
    href: "/software-barbearia-com-pix",
  },
  {
    title: "Flowo vs Planilha",
    description: "Comparativo para quem ainda opera no manual.",
    href: "/flowo-vs-planilha",
  },
  {
    title: "Flowo vs Agenda Manual",
    description: "Comparativo para equipe em crescimento.",
    href: "/flowo-vs-agenda-manual",
  },
];

export default function GuidesPage() {
  return (
    <>
      <ResourceCollectionStructuredData
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        path="/recursos/guias"
        breadcrumbLabel="Guias"
        items={GUIDES.map((guide) => ({
          name: guide.title,
          path: guide.path,
          description: guide.description,
        }))}
      />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <GuidesHero />
        <GuideGrid />
        <section className="pb-section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-[1.5rem] font-medium leading-[1.2] tracking-[-0.015em] text-ink-strong">
                Veja o produto aplicado ao problema
              </h2>
              <p className="mt-3 max-w-measure leading-relaxed text-muted-ink">
                Estas páginas mostram como agenda, WhatsApp, pagamentos e equipe
                funcionam hoje na Flowo, e o que depende de plano.
              </p>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {strategicLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between gap-6 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                    >
                      <span>
                        <span className="block font-medium text-ink">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-label leading-relaxed text-muted-ink">
                          {item.description}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 translate-y-1 text-faint-ink transition-colors group-hover:text-ink"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
