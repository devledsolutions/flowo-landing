import Link from "next/link";
import {
  CalendarCheck2,
  Clock3,
  MessageSquareText,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  CommercialCta,
  CommercialHero,
  RelatedSolutions,
} from "@/components/marketing/commercial-page";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { getPlan } from "@/data/pricing-data";

const PATH = "/agenda-barbearia-whatsapp";

export const metadata = buildMetadata({
  title: "Agenda de Barbearia no WhatsApp com IA",
  description:
    "A IA da Flowo atende no WhatsApp, agenda e confirma os clientes da sua barbearia. Agenda organizada por barbeiro e lembretes automáticos contra faltas.",
  path: PATH,
});

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
    {
      "@type": "ListItem",
      position: 2,
      name: "Agenda de Barbearia no WhatsApp",
      item: absoluteUrl(PATH),
    },
  ],
};

const flowSteps = [
  {
    title: "Cliente chama no WhatsApp",
    description:
      "A IA entende serviço, dia e horário desejado e responde na hora, a qualquer hora. Ninguém da equipe precisa parar para digitar.",
  },
  {
    title: "A IA agenda e confirma no mesmo chat",
    description:
      "O horário entra na agenda do barbeiro certo e o cliente recebe a confirmação na própria conversa.",
  },
  {
    title: "Lembrete automático antes do horário",
    description:
      "O cliente confirma presença pelo WhatsApp. Quem vai desmarcar, desmarca antes, e o horário volta para a agenda.",
  },
];

const teamBenefits = [
  {
    icon: MessageSquareText,
    title: "Atendimento consistente",
    description:
      "Resposta imediata e padronizada, mesmo com a barbearia cheia. O cliente nunca fica no vácuo.",
  },
  {
    icon: CalendarCheck2,
    title: "Agenda por barbeiro",
    description:
      "Nos planos com equipe, cada profissional pode ter seus próprios dias e horários. A IA oferece apenas o que estiver disponível para o barbeiro escolhido.",
  },
  {
    icon: Clock3,
    title: "Menos tempo no celular",
    description:
      "Marcação e confirmação saem da mão da equipe. Nos planos Equipe e Empresarial, a remarcação também acontece no WhatsApp.",
  },
];

export default function WhatsappAgendaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main id="main-content">
        <CommercialHero
          current="Agenda de Barbearia no WhatsApp"
          eyebrow="Atendimento e agenda no mesmo fluxo"
          title="Atenda, agende e confirme clientes no WhatsApp da barbearia"
          description="Com a Flowo, o cliente marca e confirma pelo WhatsApp; no Equipe e Empresarial, também pode remarcar. A equipe acompanha e assume quando precisar."
          preview="whatsapp"
        />

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">
              Como funciona a agenda pelo WhatsApp
            </h2>
            <ol className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
              {flowSteps.map((step, index) => (
                <li key={step.title} className="flex flex-col">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-label font-semibold text-ink"
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-body font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-measure text-body text-muted-ink">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-h3 font-semibold text-ink">
                O barbeiro corta. A IA atende.
              </h2>
              <div className="mt-8 divide-y divide-line">
                {teamBenefits.map((item) => (
                  <div key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                    <item.icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <div>
                      <h3 className="text-body font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 max-w-measure text-body text-muted-ink">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-body text-muted-ink">
                Quer roteiros e processos prontos para WhatsApp? Veja os{" "}
                <Link
                  href="/recursos/guias"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  guias práticos da Flowo
                </Link>{" "}
                ou compare com a rotina atual em{" "}
                <Link
                  href="/flowo-vs-agenda-manual"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  Flowo vs agenda manual
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <RelatedSolutions
          items={[
            {
              href: "/sistema-agendamento-barbearia",
              label: "Agenda da equipe",
              description:
                "Organize dias e horários diferentes para cada profissional.",
            },
            {
              href: "/recursos/guias/configurando-whatsapp",
              label: "Guia do WhatsApp",
              description:
                "Prepare o canal, a equipe e as regras antes de automatizar.",
            },
            {
              href: "/flowo-vs-agenda-manual",
              label: "Comparar com agenda manual",
              description:
                "Veja o que muda quando a rotina deixa de depender do caderno.",
            },
          ]}
        />
        <CommercialCta
          title="Enquanto você corta, a Flowo atende."
          description="Coloque sua agenda para rodar no WhatsApp com confirmação automática e a equipe focada na cadeira."
          price={getPlan("solo").monthly}
        />
      </main>
      <Footer />
    </>
  );
}
