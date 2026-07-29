import Link from "next/link";
import {
  CalendarCheck2,
  Check,
  Clock3,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  CommercialCta,
  CommercialHero,
  RelatedSolutions,
} from "@/components/marketing/commercial-page";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { PLANS } from "@/data/pricing-data";

const PATH = "/sistema-agendamento-barbearia";

export const metadata = buildMetadata({
  title: "Sistema de Agendamento para Barbearia",
  description:
    "Sistema de agendamento para barbearia com IA no WhatsApp: agenda por profissional, confirmação, comandas e pagamentos integrados opcionais.",
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
      name: "Sistema de Agendamento para Barbearia",
      item: absoluteUrl(PATH),
    },
  ],
};

const benefits = [
  {
    icon: MessageCircle,
    title: "Agendamento pelo WhatsApp",
    description:
      "O cliente marca no canal que já usa todos os dias, sem baixar aplicativo. A IA da Flowo responde, agenda e confirma na própria conversa.",
  },
  {
    icon: CalendarCheck2,
    title: "Agenda centralizada",
    description:
      "Nos planos com equipe, cada barbeiro pode ter seus próprios dias e horários. Tudo fica no mesmo painel e sincronizado com o que a IA marca no WhatsApp.",
  },
  {
    icon: Clock3,
    title: "Confirmação automática",
    description:
      "Lembrete antes do atendimento com confirmação pelo WhatsApp. Quem vai faltar avisa antes, e o horário volta para a agenda.",
  },
];

const fitCases = [
  "Barbeiro solo que perde tempo respondendo mensagem o dia todo.",
  "Equipe com mais de um barbeiro que precisa organizar horários e disponibilidade.",
  "Barbearia em crescimento que quer padronizar o atendimento no WhatsApp.",
];

export default function SchedulingSystemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main>
        <CommercialHero
          current="Sistema de Agendamento para Barbearia"
          eyebrow="Agenda por profissional, atendimento pelo WhatsApp"
          title="Sistema de agendamento para barbearia com a rotina no lugar"
          description="O Flowo centraliza os horários da equipe e coloca uma IA para atender, agendar e confirmar seus clientes pelo WhatsApp. Menos conversa repetitiva, mais clareza para quem está na cadeira."
          preview="agenda"
        />

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">
              O que muda na prática com o Flowo
            </h2>
            <div className="mt-8 divide-y divide-line">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 py-7 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10"
                >
                  <div className="flex items-start gap-3">
                    <item.icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <h3 className="text-body font-semibold text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="max-w-measure text-body text-muted-ink">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-h3 font-semibold text-ink">
                Para quem é este sistema de agendamento
              </h2>
              <ul className="mt-8 space-y-5">
                {fitCases.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <span className="max-w-measure text-body text-muted-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-body text-muted-ink">
                Quer reduzir faltas com lembrete e confirmação? Veja o guia{" "}
                <Link
                  href="/recursos/guias/reduzindo-faltas"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  reduzindo faltas na barbearia
                </Link>
                . Em dúvida entre manter o processo manual ou migrar? Compare
                em{" "}
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
              href: "/agenda-barbearia-whatsapp",
              label: "Agendamento no WhatsApp",
              description:
                "Entenda a conversa do primeiro pedido até a confirmação.",
            },
            {
              href: "/recursos/guias/escala-equipe",
              label: "Escala da equipe",
              description:
                "Monte disponibilidade diferente para cada profissional.",
            },
            {
              href: "/software-barbearia-com-pix",
              label: "Recebimento no atendimento",
              description:
                "Registre dinheiro ou maquininha própria e, se quiser, ative PIX e cartão Flowo.",
            },
          ]}
        />
        <CommercialCta
          title="Agenda organizada é atendimento que rende."
          description="Deixe a rotina de marcar, confirmar e lembrar com a Flowo. Sua equipe cuida do corte."
          price={PLANS[0].monthly}
        />
      </main>
      <Footer />
    </>
  );
}
