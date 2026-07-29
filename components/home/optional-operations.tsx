import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Banknote,
  CreditCard,
  ReceiptText,
  Smartphone,
  Users,
} from "lucide-react";
import { ProductCapabilityPreview } from "@/components/marketing/product-capability-page";

const paymentChoices = [
  {
    icon: Banknote,
    title: "Dinheiro",
    description: "Registre a forma de pagamento na comanda.",
  },
  {
    icon: Smartphone,
    title: "Maquininha própria",
    description: "Continue usando o equipamento da barbearia.",
  },
  {
    icon: CreditCard,
    title: "PIX ou cartão Flowo",
    description: "Ative pagamentos integrados somente se fizer sentido.",
  },
] as const;

const capabilities = [
  {
    icon: CreditCard,
    label: "Opcional",
    title: "Pagamentos integrados",
    description:
      "Receba por PIX ou cartão no pós-atendimento, sem abandonar dinheiro ou maquininha própria.",
    href: "/software-barbearia-com-pix",
  },
  {
    icon: Users,
    label: "Empresarial",
    title: "Comissões",
    description:
      "Calcule depois da comanda paga; o gestor confere e inicia o repasse.",
    href: "/recursos/comissoes-barbeiros",
  },
  {
    icon: BadgePercent,
    label: "Configurável",
    title: "Cashback",
    description:
      "Defina percentual, validade e limite de uso antes de ativar o benefício.",
    href: "/recursos/cashback-barbearia",
  },
  {
    icon: ReceiptText,
    label: "Ativação assistida",
    title: "Nota fiscal",
    description:
      "Valide município, dados fiscais e homologação antes de emitir pela comanda.",
    href: "/recursos/nota-fiscal-barbearia",
  },
] as const;

export default function OptionalOperations() {
  return (
    <section
      id="recebimentos-e-operacao"
      aria-labelledby="optional-operations-title"
      className="section-normal bg-cream"
    >
      <div className="container-page">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
              Depois do atendimento
            </p>
            <h2
              id="optional-operations-title"
              className="mt-4 max-w-[18ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong"
            >
              Você decide como recebe. O Flowo organiza o resto.
            </h2>
          </div>
          <p className="max-w-measure text-lead text-muted-ink">
            O pagamento integrado é uma escolha, não uma condição para usar o
            produto. A comanda pode registrar dinheiro, maquininha própria ou
            uma opção Flowo ativada pela barbearia.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.64fr_1.36fr] lg:items-center lg:gap-16">
          <ol className="divide-y divide-line border-y border-line">
            {paymentChoices.map(({ icon: Icon, ...item }, index) => (
              <li key={item.title} className="grid grid-cols-[auto_1fr] gap-4 py-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
                  <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-caption tabular-nums text-faint-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                  </div>
                  <p className="mt-1 text-label text-muted-ink">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <ProductCapabilityPreview kind="payments" />
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, ...item }) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-72 flex-col bg-surface p-6 transition-colors hover:bg-surface-2"
            >
              <div className="flex items-center justify-between gap-3">
                <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-medium text-muted-ink">
                  {item.label}
                </span>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-label text-muted-ink">{item.description}</p>
              <span className="mt-auto flex items-center gap-2 pt-8 text-label font-semibold text-ink">
                Entender o recurso
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
