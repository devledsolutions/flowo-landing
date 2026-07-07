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
  title: "Controle Financeiro de Barbearia",
  description:
    "Guia de controle financeiro para barbearias com fluxo de caixa, metas semanais e indicadores de margem.",
  path: "/recursos/guias/controle-financeiro-barbearia",
});

const steps = [
  {
    title: "1. Separe faturamento de lucro",
    body: "Faturar mais não garante margem. Controle o custo variável por serviço (produtos, comissão, taxas) para saber o lucro real.",
  },
  {
    title: "2. Defina meta semanal de caixa",
    body: "Metas curtas ajudam na reação rápida. Exemplo: meta de caixa por dia e por barbeiro para corrigir a rota ainda na semana.",
  },
  {
    title: "3. Monitore ticket médio e ocupação juntos",
    body: "Ticket alto com agenda vazia não sustenta o negócio. Equilibre preço, ocupação e recorrência para estabilidade.",
  },
  {
    title: "4. Planeje a sazonalidade",
    body: "Meses mais fracos exigem ação antecipada (campanha, pacote, reativação). Não espere o caixa apertar para agir.",
  },
];

const related = [
  {
    href: "/software-barbearia-com-pix",
    label: "Pagamentos PIX no atendimento e previsibilidade de caixa",
  },
  {
    href: "/flowo-vs-planilha",
    label: "Flowo vs planilha para gestão financeira da operação",
  },
];

export default function ControleFinanceiroGuidePage() {
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
              { label: "Controle Financeiro", href: "#" },
            ]}
            readTime="12 min"
            title="Controle financeiro para barbearia: o que acompanhar toda semana"
            lead="A barbearia pode estar cheia e mesmo assim sobrar pouco dinheiro. Sem gestão financeira simples e constante, crescimento vira risco."
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
            title="Tenha visão financeira sem planilha caótica"
            description="Com o Flowo, agenda e financeiro andam juntos: cada atendimento pago entra no relatório sozinho."
          />

          <GuidePrevNext
            next={{
              href: "/recursos/guias/escala-equipe",
              label: "Escala de Equipe",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
