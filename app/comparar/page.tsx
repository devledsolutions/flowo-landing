import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Compare o Flowo com Agenda Manual e Planilhas",
  description:
    "Compare a rotina do Flowo com agenda manual, planilhas e atendimento espalhado. Veja critérios de agenda, WhatsApp, equipe, comandas e controle.",
  path: "/comparar",
});

const criteria = [
  {
    label: "Atendimento no WhatsApp",
    manual: "A equipe responde e confere horários",
    flowo: "A IA conversa e consulta a agenda",
  },
  {
    label: "Horários por profissional",
    manual: "Regras separadas e conferência manual",
    flowo: "Disponibilidade individual na mesma agenda",
  },
  {
    label: "Confirmação",
    manual: "Lembretes enviados um a um",
    flowo: "Lembretes e confirmação no fluxo",
  },
  {
    label: "Comanda e caixa",
    manual: "Anotações e planilhas separadas",
    flowo: "Atendimento, comanda e registro conectados",
  },
] as const;

const comparisons = [
  {
    icon: CalendarDays,
    title: "Flowo vs agenda manual",
    description:
      "Para quem ainda cruza caderno, calendário e mensagens antes de confirmar cada horário.",
    href: "/flowo-vs-agenda-manual",
    cta: "Comparar a agenda",
  },
  {
    icon: ClipboardList,
    title: "Flowo vs planilha",
    description:
      "Para quem registra dados depois do trabalho, mas ainda executa a rotina fora da planilha.",
    href: "/flowo-vs-planilha",
    cta: "Comparar o controle",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp conectado à operação",
    description:
      "Para entender a diferença entre apenas conversar e usar a agenda como fonte da resposta.",
    href: "/agenda-barbearia-whatsapp",
    cta: "Ver a agenda no WhatsApp",
  },
] as const;

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="pt-32 pb-section-tight md:pt-40">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Comparar", href: "/comparar" },
              ]}
            />
            <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                  Compare pela rotina
                </p>
                <h1 className="mt-4 max-w-[15ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  Menos ferramentas soltas. Mais operação conectada.
                </h1>
              </div>
              <p className="max-w-measure text-lead text-muted-ink">
                O Flowo não é apenas uma agenda mais bonita. A diferença aparece
                quando WhatsApp, disponibilidade, equipe e comanda usam a mesma
                informação.
              </p>
            </div>
          </div>
        </section>

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="overflow-x-auto rounded-xl border border-line bg-cream [contain:paint]">
              <table className="w-full min-w-[44rem] border-collapse">
                <caption className="sr-only">
                  Comparação entre rotina manual e rotina conectada pelo Flowo
                </caption>
                <thead>
                  <tr className="border-b border-line">
                    <th className="w-[28%] px-6 py-5 text-left text-label font-medium text-muted-ink">
                      Critério
                    </th>
                    <th className="px-6 py-5 text-left text-label font-semibold text-ink">
                      Rotina espalhada
                    </th>
                    <th className="bg-ink px-6 py-5 text-left text-label font-semibold text-cream">
                      Com Flowo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-b-0">
                      <th scope="row" className="px-6 py-5 text-left text-sm font-semibold text-ink">
                        {row.label}
                      </th>
                      <td className="px-6 py-5 text-sm text-muted-ink">{row.manual}</td>
                      <td className="bg-ink px-6 py-5 text-sm text-cream">
                        <span className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                          {row.flowo}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 flex items-start gap-2 text-caption text-muted-ink">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              A comparação descreve o fluxo do produto. A disponibilidade de
              recursos varia por plano e ativação.
            </p>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="text-h2 font-semibold text-ink-strong">
                Escolha o ponto que mais trava sua barbearia.
              </h2>
              <p className="mt-4 text-lead text-muted-ink">
                Cada comparação aprofunda um problema sem inventar vantagem ou
                esconder condição do produto.
              </p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
              {comparisons.map(({ icon: Icon, ...item }, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-72 flex-col bg-surface p-7 transition-colors hover:bg-surface-2"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                    <span className="text-caption tabular-nums text-faint-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-body text-muted-ink">{item.description}</p>
                  <span className="mt-auto flex items-center gap-2 pt-8 text-label font-semibold text-ink">
                    {item.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
