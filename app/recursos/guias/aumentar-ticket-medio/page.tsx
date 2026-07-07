import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Como Aumentar o Ticket Médio na Barbearia",
  description:
    "Guia prático para aumentar o ticket médio da barbearia com combos, upgrades no momento certo e acompanhamento semanal.",
  path: "/recursos/guias/aumentar-ticket-medio",
});

const steps = [
  {
    title: "1. Crie pacotes com lógica de rotina",
    body: "Monte combos que fazem sentido para a frequência real dos clientes: corte + barba, corte + hidratação, manutenção mensal.",
  },
  {
    title: "2. Use upgrades no momento certo",
    body: "A sugestão deve acontecer no agendamento e na confirmação. Ex.: “Quer incluir alinhamento de sobrancelha hoje?”.",
  },
  {
    title: "3. Padronize a oferta por perfil",
    body: "Cliente novo, recorrente e premium pedem abordagens diferentes. Automatize esse fluxo no WhatsApp para consistência.",
  },
  {
    title: "4. Acompanhe a métrica semanal",
    body: "Sem medir ticket médio por barbeiro e serviço, você melhora no escuro. Defina meta semanal e revise a proposta comercial.",
  },
];

const related = [
  {
    href: "/software-barbearia-com-pix",
    label: "Pagamentos PIX no atendimento pelo WhatsApp",
  },
  {
    href: "/flowo-vs-planilha",
    label: "Flowo vs planilha: o custo oculto do manual",
  },
];

export default function TicketMedioGuidePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <GuidePage>
          <GuideHeader
            crumbs={[
              { label: "Início", href: "/" },
              { label: "Recursos", href: "/recursos" },
              { label: "Guias", href: "/recursos/guias" },
              { label: "Aumentar Ticket Médio", href: "#" },
            ]}
            readTime="9 min"
            title="Como aumentar o ticket médio na barbearia sem perder clientes"
            lead="Ticket médio cresce quando oferta e contexto estão alinhados. O segredo não é empurrar serviço, e sim estruturar a jornada com proposta de valor clara."
          />

          <article className="space-y-10">
            {steps.map((step) => (
              <section key={step.title}>
                <h2 className="text-h3 font-bold text-ink">{step.title}</h2>
                <p className="mt-3 max-w-measure text-body leading-relaxed text-muted-ink">
                  {step.body}
                </p>
              </section>
            ))}
          </article>

          <aside className="mt-12 rounded-lg border border-line bg-surface p-6">
            <p className="text-label font-semibold text-ink">Leitura relacionada</p>
            <ul className="mt-3 grid gap-2">
              {related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-label font-medium text-ink underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <GuideCta
            title="Quer aumentar o ticket médio com automação de agenda?"
            description="Use o Flowo para ofertar combos e upgrades no momento certo, direto no WhatsApp."
          />

          <GuidePrevNext
            next={{
              href: "/recursos/guias/fidelizacao-clientes",
              label: "Fidelização de Clientes",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
