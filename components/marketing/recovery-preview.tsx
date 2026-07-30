import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock3,
  RotateCcw,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

const opportunities = [
  {
    icon: RotateCcw,
    label: "Reativação",
    title: "Clientes que podem estar prontos para voltar",
    meta: "Revisão humana antes do contato",
  },
  {
    icon: CalendarClock,
    label: "Horário vago",
    title: "Lista de espera compatível com um horário real",
    meta: "Somente com disponibilidade comprovada",
  },
  {
    icon: Star,
    label: "Recuperação",
    title: "Avaliação que precisa de acompanhamento",
    meta: "Contato autorizado e rastreável",
  },
] as const;

export function RecoveryBrandLockup({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className="inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-2"
      aria-label="Flowo Recupera, add-on em beta"
    >
      <span className="inline-flex items-center gap-3">
        <Image
          src="/flowo-logo.svg"
          alt=""
          width={compact ? 66 : 78}
          height={compact ? 18 : 22}
          aria-hidden="true"
        />
        <span className="h-6 w-px bg-line" aria-hidden="true" />
        <span
          className={
            compact
              ? "text-sm font-semibold tracking-[-0.02em] text-ink"
              : "text-lg font-semibold tracking-[-0.025em] text-ink"
          }
        >
          Recupera
        </span>
      </span>
      <span className="rounded-md bg-ink px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-cream">
        Add-on · beta
      </span>
    </div>
  );
}

export function RecoveryProductPreview() {
  return (
    <div
      role="img"
      aria-label="Mockup do Flowo Recupera com três oportunidades para revisão humana e proteções de consentimento, frequência e horário de envio."
      className="preview-light overflow-hidden rounded-[14px] border border-ink/15 bg-surface [box-shadow:0_2px_3px_-2px_rgb(23_24_16_/_0.14),0_30px_70px_-38px_rgb(23_24_16_/_0.48)]"
    >
      <div className="flex h-10 items-center gap-2 border-b border-line bg-surface-2 px-4">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[9px] text-muted-ink">barber.flowo.com.br/recupera</span>
      </div>
      <div className="grid gap-0 lg:grid-cols-[1fr_0.42fr]">
        <div className="p-4 sm:p-6">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Para revisar
              </p>
              <p className="mt-1 text-lg font-semibold text-ink">3 oportunidades</p>
            </div>
            <span className="rounded-full border border-line px-3 py-1 text-[9px] text-muted-ink">
              Beta acompanhada
            </span>
          </div>
          <ul className="divide-y divide-line">
            {opportunities.map(({ icon: Icon, ...item }) => (
              <li key={item.label} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2">
                  <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.08em] text-faint-ink">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-semibold leading-tight text-ink">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[9px] text-muted-ink">{item.meta}</span>
                </span>
                <span className="hidden rounded-full bg-ink px-3 py-2 text-[9px] font-semibold text-cream sm:inline-flex">
                  Revisar
                </span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="border-t border-line bg-surface-2 p-4 sm:p-6 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold text-ink">Proteções ativas</p>
          <ul className="mt-4 space-y-3">
            {[
              "Consentimento verificado",
              "Limite de frequência",
              "Horário de envio",
              "Opt-out no envio",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[10px] text-muted-ink">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--success)]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-line pt-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-ink">
              Evidência
            </p>
            <p className="mt-2 text-xs font-semibold text-ink">Contato → agenda → atendimento</p>
            <p className="mt-1 text-[9px] leading-relaxed text-muted-ink">
              Receita só pode ser chamada de realizada após a comanda fechada.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function RecoveryHomeSection() {
  return (
    <section className="section-normal border-y border-line bg-surface">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <RecoveryBrandLockup />
          <h2 className="mt-5 text-h2 font-semibold tracking-[-0.025em] text-ink-strong">
            A oportunidade aparece. Você decide antes do contato.
          </h2>
          <p className="mt-5 text-lead text-muted-ink">
            Um add-on da Flowo para transformar sinais de clientes inativos,
            lista de espera e recuperação de serviço em uma fila revisável, com
            consentimento e resultado comprovável.
          </p>
          <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
            <div className="bg-cream p-4">
              <dt className="text-caption text-faint-ink">Contratação</dt>
              <dd className="mt-1 text-label font-semibold text-ink">Separada do plano</dd>
            </div>
            <div className="bg-cream p-4">
              <dt className="text-caption text-faint-ink">Disponibilidade</dt>
              <dd className="mt-1 text-label font-semibold text-ink">Beta controlada</dd>
            </div>
          </dl>
          <ul className="mt-8 space-y-3">
            {[
              "Nenhum envio promocional autônomo na primeira versão",
              "Horário vago somente quando a disponibilidade for real",
              "Receita recuperada somente com comanda fechada",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-body text-muted-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/flowo-recupera"
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink underline-offset-4 hover:underline"
          >
            Conhecer o add-on
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div>
          <RecoveryProductPreview />
          <p className="mt-4 flex items-center justify-center gap-1.5 text-caption text-faint-ink">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Conceito de produto; não representa disponibilidade geral
          </p>
        </div>
      </div>
    </section>
  );
}

export function RecoveryEvidenceSteps() {
  const steps = [
    { icon: Users, label: "Cliente contatado", detail: "Entrega confirmada pelo provedor" },
    { icon: CalendarClock, label: "Agendamento gerado", detail: "Ligado à oportunidade" },
    { icon: CheckCircle2, label: "Atendimento concluído", detail: "Retorno efetivamente realizado" },
    { icon: Clock3, label: "Receita realizada", detail: "Somente com comanda fechada" },
  ] as const;

  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {steps.map(({ icon: Icon, label, detail }, index) => (
        <li key={label} className="bg-surface p-5">
          <div className="flex items-center justify-between">
            <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
            <span className="text-caption tabular-nums text-faint-ink">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-7 text-sm font-semibold text-ink">{label}</p>
          <p className="mt-1 text-caption text-muted-ink">{detail}</p>
        </li>
      ))}
    </ol>
  );
}
