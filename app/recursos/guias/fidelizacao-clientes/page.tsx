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
  title: "Fidelização de Clientes na Barbearia",
  description:
    "Estratégias práticas para aumentar retenção e frequência dos clientes da sua barbearia com WhatsApp e automação.",
  path: "/recursos/guias/fidelizacao-clientes",
});

const steps = [
  {
    title: "1. Tenha cadência de contato pós-atendimento",
    body: "Mensagem de pós-serviço + sugestão de próximo agendamento melhora a lembrança de marca e aumenta a recorrência.",
  },
  {
    title: "2. Segmente por frequência",
    body: "Clientes que somem por 45+ dias precisam de um fluxo de reativação diferente de clientes recorrentes.",
  },
  {
    title: "3. Ofereça benefício por continuidade",
    body: "Clube, combo mensal ou benefício progressivo criam motivo para voltar e reduzem sensibilidade a preço.",
  },
  {
    title: "4. Reative com contexto, não spam",
    body: "Reativação funciona quando a mensagem é útil e personalizada. Evite disparo genérico para toda a base.",
  },
];

const related = [
  {
    href: "/agenda-barbearia-whatsapp",
    label: "Agenda da barbearia no WhatsApp com IA",
  },
  {
    href: "/sistema-agendamento-barbearia",
    label: "Sistema de agendamento para retenção e recorrência",
  },
];

export default function FidelizacaoGuidePage() {
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
              { label: "Fidelização de Clientes", href: "#" },
            ]}
            readTime="10 min"
            title="Fidelização de clientes na barbearia: como aumentar o retorno mensal"
            lead="Crescer não é só trazer cliente novo. A barbearia rentável tem rotina de retorno bem estruturada e relacionamento contínuo."
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
            title="Transforme cliente eventual em cliente recorrente"
            description="Com o Flowo, você automatiza reativação e pós-atendimento e mantém a agenda aquecida."
          />

          <GuidePrevNext
            next={{
              href: "/recursos/guias/aumentar-ticket-medio",
              label: "Aumentar Ticket Médio",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
