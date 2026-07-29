import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Banknote,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Landmark,
  LockKeyhole,
  ReceiptText,
  Settings2,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";
import { SIGNUP_URL } from "@/components/cta-links";
import type {
  ProductCapability,
  ProductCapabilityId,
} from "@/data/product-capabilities";

const previewLabels: Record<ProductCapabilityId, string> = {
  payments:
    "Comanda do Flowo mostrando dinheiro, maquininha própria, PIX Flowo e cartão Flowo como escolhas equivalentes.",
  cashback:
    "Configuração ilustrativa de cashback com percentual, validade, mínimo de resgate e limite por comanda.",
  commissions:
    "Painel ilustrativo de comissões com saldo por profissional e repasse iniciado pelo gestor.",
  fiscal:
    "Painel ilustrativo de ativação fiscal assistida, com verificação do município e homologação.",
};

function BrowserFrame({
  path,
  children,
  label,
}: {
  path: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="preview-light overflow-hidden rounded-[14px] border border-ink/15 bg-surface [box-shadow:0_2px_3px_-2px_rgb(23_24_16_/_0.14),0_30px_70px_-38px_rgb(23_24_16_/_0.45)]"
    >
      <div className="grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-line bg-surface-2 px-3 sm:px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex min-h-7 w-full max-w-60 items-center justify-center gap-1.5 rounded-md border border-ink/[0.08] bg-surface px-3 text-[10px] text-muted-ink">
          <LockKeyhole className="h-2.5 w-2.5" aria-hidden="true" />
          <span className="truncate">barber.flowo.com.br/{path}</span>
        </div>
        <span className="hidden text-[10px] font-semibold tracking-[0.16em] text-ink sm:inline">
          FLOWO
        </span>
      </div>
      {children}
    </div>
  );
}

function PaymentsPreview() {
  const methods = [
    { icon: Banknote, label: "Dinheiro", meta: "Registrar" },
    { icon: Smartphone, label: "Maquininha própria", meta: "Registrar" },
    { icon: CircleDollarSign, label: "PIX Flowo", meta: "Opcional" },
    { icon: CreditCard, label: "Cartão Flowo", meta: "Opcional" },
  ] as const;

  return (
    <BrowserFrame
      path="comandas/10428"
      label={previewLabels.payments}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="text-caption text-muted-ink">Comanda #10428</p>
            <p className="mt-1 text-lg font-semibold text-ink">Atendimento concluído</p>
            <p className="mt-1 text-xs text-muted-ink">Corte + barba · Rafael</p>
          </div>
          <p className="text-2xl font-semibold tabular-nums text-ink">R$ 75,00</p>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-faint-ink">
          Como o cliente pagou?
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {methods.map(({ icon: Icon, label, meta }) => (
            <div key={label} className="rounded-lg border border-line bg-surface p-3">
              <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
              <p className="mt-3 text-[11px] font-semibold leading-tight text-ink">{label}</p>
              <p className="mt-1 text-[9px] text-muted-ink">{meta}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-surface-2 p-3 text-[10px] leading-relaxed text-muted-ink">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" aria-hidden="true" />
          Pagamentos Flowo só aparecem quando a barbearia decide ativá-los.
        </div>
      </div>
    </BrowserFrame>
  );
}

function CashbackPreview() {
  const settings = [
    ["Cashback", "5%"],
    ["Validade", "60 dias"],
    ["Mínimo para usar", "R$ 20"],
    ["Limite por comanda", "30%"],
  ] as const;

  return (
    <BrowserFrame path="fidelidade/cashback" label={previewLabels.cashback}>
      <div className="grid gap-5 p-4 sm:grid-cols-[1fr_0.8fr] sm:p-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2">
              <BadgePercent className="h-5 w-5 text-ink" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Regra de cashback</p>
              <p className="text-[10px] text-muted-ink">Configuração da barbearia</p>
            </div>
          </div>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {settings.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 py-3">
                <dt className="text-[10px] text-muted-ink">{label}</dt>
                <dd className="text-xs font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-xl bg-ink p-5 text-cream">
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cream/55">
            Exemplo de saldo
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">R$ 18,75</p>
          <p className="mt-1 text-[10px] text-cream/60">válido até 27/09</p>
          <div className="mt-6 border-t border-cream/15 pt-4">
            <p className="text-xs font-semibold">Controle da margem</p>
            <p className="mt-1 text-[9px] leading-relaxed text-cream/60">
              O limite de uso é aplicado antes de fechar a próxima comanda.
            </p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function CommissionsPreview() {
  const professionals = [
    ["Rafael", "8 comandas", "R$ 640"],
    ["Pedro", "6 comandas", "R$ 480"],
    ["Júlia", "2 comandas", "R$ 160"],
  ] as const;

  return (
    <BrowserFrame path="financeiro/comissoes" label={previewLabels.commissions}>
      <div className="p-4 sm:p-6">
        <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="text-caption text-muted-ink">Comissões disponíveis</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">R$ 1.280</p>
          </div>
          <span className="rounded-full border border-line px-3 py-1 text-[9px] font-medium text-muted-ink">
            Aguardando revisão
          </span>
        </div>
        <ul className="divide-y divide-line">
          {professionals.map(([name, count, value]) => (
            <li key={name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2">
                <Users className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold text-ink">{name}</span>
                <span className="block text-[9px] text-muted-ink">{count}</span>
              </span>
              <span className="text-xs font-semibold tabular-nums text-ink">{value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center justify-between gap-4 rounded-lg bg-surface-2 p-3">
          <p className="text-[10px] text-muted-ink">
            O gestor confere antes de iniciar o PIX.
          </p>
          <span className="rounded-full bg-ink px-4 py-2 text-[9px] font-semibold text-cream">
            Revisar repasse
          </span>
        </div>
      </div>
    </BrowserFrame>
  );
}

function FiscalPreview() {
  const checks = [
    ["Município", "Verificar"],
    ["Dados fiscais", "Aguardando"],
    ["Homologação", "Aguardando"],
  ] as const;

  return (
    <BrowserFrame path="configuracoes/fiscal" label={previewLabels.fiscal}>
      <div className="grid gap-5 p-4 sm:grid-cols-[0.85fr_1.15fr] sm:p-6">
        <div className="rounded-xl bg-ink p-5 text-cream">
          <ReceiptText className="h-5 w-5" aria-hidden="true" />
          <p className="mt-5 text-lg font-semibold">Ativação fiscal</p>
          <p className="mt-2 text-[10px] leading-relaxed text-cream/60">
            A disponibilidade é verificada antes de qualquer emissão.
          </p>
          <span className="mt-6 inline-flex rounded-full border border-cream/20 px-3 py-1 text-[9px]">
            Acompanhada pela Flowo
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-ink">Etapas de elegibilidade</p>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {checks.map(([label, status], index) => (
              <li key={label} className="flex items-center gap-3 py-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-[10px] font-semibold text-ink">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 text-[11px] font-medium text-ink">{label}</span>
                <span className="text-[9px] text-muted-ink">{status}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 text-[9px] text-muted-ink">
            <Landmark className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
            Regras fiscais variam por município e documento.
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function ProductCapabilityPreview({
  kind,
}: {
  kind: ProductCapabilityId;
}) {
  if (kind === "payments") return <PaymentsPreview />;
  if (kind === "cashback") return <CashbackPreview />;
  if (kind === "commissions") return <CommissionsPreview />;
  return <FiscalPreview />;
}

export function ProductCapabilityPage({
  capability,
}: {
  capability: ProductCapability;
}) {
  return (
    <>
      <section className="pt-32 pb-section-tight md:pt-40">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="text-caption text-muted-ink">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Início
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>
                <Link href="/recursos" className="transition-colors hover:text-ink">
                  Recursos
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li aria-current="page" className="text-ink">{capability.breadcrumb}</li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(26rem,1.1fr)] lg:gap-16">
            <div>
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                {capability.eyebrow}
              </p>
              <h1 className="mt-4 max-w-[15ch] text-h2 font-semibold leading-tight tracking-[-0.025em] text-ink-strong">
                {capability.title}
              </h1>
              <p className="mt-6 max-w-measure text-lead text-muted-ink">
                {capability.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={SIGNUP_URL}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-label font-semibold text-cream transition-opacity hover:opacity-90"
                >
                  Começar agora
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/precos"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-7 py-3 text-label font-medium text-ink transition-colors hover:bg-surface-2"
                >
                  Ver planos e disponibilidade
                </Link>
              </div>
            </div>
            <div>
              <ProductCapabilityPreview kind={capability.id} />
              <p className="mt-4 flex items-center justify-center gap-1.5 text-caption text-faint-ink">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Demonstração ilustrativa do produto
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page grid gap-4 py-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-label font-semibold text-ink">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {capability.statusLabel}
          </span>
          <p className="max-w-3xl text-body text-muted-ink">
            {capability.statusDetail}
          </p>
        </div>
      </section>

      <section className="section-normal">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <header>
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Como funciona
              </p>
              <h2 className="mt-4 text-h3 font-semibold text-ink-strong">
                {capability.proofTitle}
              </h2>
              <p className="mt-4 text-body text-muted-ink">
                {capability.proofDescription}
              </p>
            </header>
            <ol className="divide-y divide-line border-y border-line">
              {capability.steps.map((step, index) => (
                <li key={step.title} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr] sm:gap-5">
                  <span className="text-caption tabular-nums text-faint-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-body text-muted-ink">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="on-ink section-normal">
        <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Settings2 className="h-6 w-6 text-ink" aria-hidden="true" />
            <h2 className="mt-5 text-h3 font-semibold text-ink-strong">
              Sem esconder as condições.
            </h2>
            <p className="mt-4 max-w-measure text-body text-muted-ink">
              Disponibilidade, ativação e responsabilidade aparecem antes da decisão.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {capability.safeguards.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-surface p-5 text-body text-ink">
                <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-normal border-b border-line">
        <div className="container-page">
          <h2 className="text-h3 font-semibold text-ink-strong">Continue por aqui</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {capability.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-surface p-6 transition-colors hover:bg-surface-2"
              >
                <p className="font-semibold text-ink">{item.label}</p>
                <p className="mt-2 text-label text-muted-ink">{item.description}</p>
                <ArrowRight className="mt-6 h-4 w-4 text-faint-ink transition-transform group-hover:translate-x-1 group-hover:text-ink" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
