import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GuidesHero } from "@/components/resources/guides-hero";
import { GuideGrid } from "@/components/resources/guide-grid";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guias para Barbearias",
  description:
    "Guias práticos de agendamento, WhatsApp com IA, equipe, pagamentos e financeiro para organizar sua barbearia com o Flowo.",
  path: "/recursos/guias",
});

const strategicLinks = [
  {
    title: "Sistema de Agendamento para Barbearia",
    description: "Página comercial focada em operação e recorrência.",
    href: "/sistema-agendamento-barbearia",
  },
  {
    title: "Agenda da Barbearia no WhatsApp",
    description: "Captação e confirmação de clientes no canal principal.",
    href: "/agenda-barbearia-whatsapp",
  },
  {
    title: "Pagamentos PIX no Atendimento",
    description: "Cobrança do atendimento por PIX ou cartão pelo WhatsApp.",
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
      <Navbar />
      <main className="min-h-screen">
        <GuidesHero />
        <GuideGrid />
        <section className="pb-section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
                <h2 className="text-h3 font-bold text-ink">
                  Para continuar sua jornada
                </h2>
                <p className="mt-2 max-w-measure text-muted-ink">
                  Estas páginas conectam o conteúdo dos guias com a decisão
                  comercial, sem dispersão.
                </p>
                <ul className="mt-6 grid gap-3">
                  {strategicLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-background p-4 transition-colors duration-200 ease-out-quint hover:border-ink/40"
                      >
                        <div>
                          <p className="font-semibold text-ink">{item.title}</p>
                          <p className="text-label text-muted-ink">
                            {item.description}
                          </p>
                        </div>
                        <ArrowUpRight
                          className="h-4 w-4 flex-shrink-0 text-faint-ink transition-colors group-hover:text-ink"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
