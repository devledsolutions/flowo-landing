import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  RecoveryBrandLockup,
  RecoveryEvidenceSteps,
  RecoveryProductPreview,
} from "@/components/marketing/recovery-preview";
import { SIGNUP_URL } from "@/components/cta-links";
import { buildMetadata } from "@/lib/seo";
import { LEGAL_ENTITY } from "@/lib/legal-identity";

export const metadata = buildMetadata({
  title: "Flowo Recupera: em fase de teste",
  description:
    "O Flowo Recupera sugere quem chamar de volta. Uma pessoa revisa antes de enviar. Só comanda fechada conta como dinheiro recuperado.",
  path: "/flowo-recupera",
  noIndex: true,
});

const ready = [
  "Fila de sugestões que você aprova, ajusta ou descarta",
  "Convite de volta para clientes que sumiram, sem exagero",
  "Lista de espera com registro dos horários recuperados",
  "Relatório de resultados com as comandas ligadas a cada contato",
] as const;

const building = [
  "Fila própria do Recupera no site e no aplicativo",
  "Ligação firme entre contato, agenda, atendimento e comanda",
  "Conferir a vaga real antes de sugerir um horário",
  "Contratação e limites próprios do módulo",
] as const;

export default function FlowoRecuperaPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="pt-32 pb-section-tight md:pt-40">
          <div className="container-page">
            <nav aria-label="Breadcrumb" className="text-caption text-muted-ink">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link href="/" className="hover:text-ink">Início</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
                <li aria-current="page" className="text-ink">Flowo Recupera</li>
              </ol>
            </nav>
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <RecoveryBrandLockup />
                <h1 className="mt-5 max-w-[14ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
                  Recupere oportunidades sem perder o controle da conversa.
                </h1>
                <p className="mt-6 max-w-measure text-lead text-muted-ink">
                  Módulo à parte. Junta clientes que sumiram, horários vagos de
                  verdade e atendimentos a resolver numa revisão semanal curta.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={SIGNUP_URL}
                    className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-7 py-3 text-label font-semibold text-cream hover:opacity-90"
                  >
                    Conhecer o Flowo
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={`mailto:${LEGAL_ENTITY.contactEmail}?subject=Interesse%20no%20Flowo%20Recupera`}
                    className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-line px-7 py-3 text-label font-medium text-ink hover:bg-surface-2"
                  >
                    Quero entrar no teste
                  </a>
                </div>
              </div>
              <div>
                <RecoveryProductPreview />
                <p className="mt-4 flex items-center justify-center gap-1.5 text-caption text-faint-ink">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Telas ilustrativas do que estamos construindo. Vagas limitadas no teste.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal border-y border-line bg-surface">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                O que a Flowo registra
              </p>
              <h2 className="mt-4 text-h2 font-semibold text-ink-strong">
                Potencial não é receita.
              </h2>
              <p className="mt-4 text-lead text-muted-ink">
                O Recupera mostra o caminho inteiro: contato, agenda,
                atendimento. Só comanda fechada conta como dinheiro recuperado.
              </p>
            </div>
            <div className="mt-10">
              <RecoveryEvidenceSteps />
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                O que já existe
              </p>
              <h2 className="mt-4 text-h3 font-semibold text-ink-strong">
                O que já funciona na Flowo hoje
              </h2>
              <ul className="mt-7 divide-y divide-line border-y border-line">
                {ready.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-4 text-body text-muted-ink">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Antes de abrir o teste
              </p>
              <h2 className="mt-4 text-h3 font-semibold text-ink-strong">
                O que ainda falta terminar
              </h2>
              <ul className="mt-7 divide-y divide-line border-y border-line">
                {building.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-4 text-body text-muted-ink">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-ink" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="on-ink section-normal">
          <div className="container-page max-w-4xl text-center">
            <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
              Como a primeira versão funciona
            </p>
            <h2 className="mt-5 text-h2 font-semibold text-ink-strong">
              A Flowo prepara. O responsável revisa. Só então a mensagem pode seguir.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-ink">
              Sem disparo automático de promoção. Sem sugerir horário que não
              existe. Sem chamar estimativa de dinheiro recuperado.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
