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
  title: "Escala de Equipe para Barbearia",
  description:
    "Como organizar a escala da equipe da barbearia com previsibilidade de horários e melhor distribuição da agenda.",
  path: "/recursos/guias/escala-equipe",
});

const steps = [
  {
    title: "1. Defina blocos fixos por barbeiro",
    body: "Reserve horários de maior demanda para os profissionais mais experientes e distribua janelas de encaixe sem canibalizar a agenda.",
  },
  {
    title: "2. Crie regra de distribuição",
    body: "Sem regra, a carga concentra em poucos profissionais. Configure lógica de distribuição por especialidade e disponibilidade.",
  },
  {
    title: "3. Tenha visão de capacidade semanal",
    body: "Capacidade planejada evita “promessa” de horário que não existe. Trabalhe com ocupação alvo e limite por barbeiro.",
  },
  {
    title: "4. Faça revisão de escala toda semana",
    body: "Ajuste turnos com base em demanda real, não em percepção. Pico de sexta e sábado exige plano diferente de terça-feira.",
  },
];

const related = [
  {
    href: "/sistema-agendamento-barbearia",
    label: "Sistema de agendamento para barbearia",
  },
  {
    href: "/flowo-vs-agenda-manual",
    label: "Flowo vs agenda manual para barbearia",
  },
];

export default function EscalaEquipeGuidePage() {
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
              { label: "Escala de Equipe", href: "#" },
            ]}
            readTime="11 min"
            title="Escala de equipe para barbearia: como evitar caos nos horários"
            lead="Escala ruim gera atraso, sobrecarga e cliente insatisfeito. Com um processo simples e visível para todos, você melhora operação e experiência."
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
            title="Organize sua equipe com menos retrabalho"
            description="Use o Flowo para distribuir a agenda, reduzir conflito de horários e ganhar previsibilidade na operação."
          />

          <GuidePrevNext
            next={{
              href: "/recursos/guias/controle-financeiro-barbearia",
              label: "Controle Financeiro",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
