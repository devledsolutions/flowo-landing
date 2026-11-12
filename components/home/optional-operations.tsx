import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Banknote,
  CreditCard,
  ReceiptText,
  Smartphone,
  Users,
} from "@/components/icons/flowo-icons";
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
      "Receba por Pix ou cartão depois do serviço, se quiser usar essa opção.",
    cta: "Ver pagamentos",
    href: "/software-barbearia-com-pix",
  },
  {
    icon: Users,
    label: "Equipe",
    title: "Comissões",
    description:
      "Confira as comissões no extrato e registre o acerto com cada profissional.",
    cta: "Ver comissões",
    href: "/recursos/comissoes-barbeiros",
  },
  {
    icon: BadgePercent,
    label: "Configurável",
    title: "Cashback",
    description:
      "Ofereça um saldo para o cliente usar na próxima visita, com as regras que você definir.",
    cta: "Ver cashback",
    href: "/recursos/cashback-barbearia",
  },
  {
    icon: ReceiptText,
    label: "Ativação assistida",
    title: "Nota fiscal",
    description:
      "Emita pela comanda após configurar os dados fiscais e a autorização da prefeitura.",
    cta: "Ver nota fiscal",
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
              Recebimentos
            </p>
            <h2
              id="optional-operations-title"
              className="mt-4 max-w-[18ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong"
            >
              Do atendimento à comanda, com tudo registrado.
            </h2>
          </div>
          <p className="max-w-measure text-lead text-muted-ink">
            Registre dinheiro e maquininha própria. Se ativar os pagamentos Flowo,
            também pode receber por Pix e cartão depois do serviço.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.64fr_1.36fr] lg:items-center lg:gap-16">
          <ol className="divide-y divide-line border-y border-line">
            {paymentChoices.map(({ icon: Icon, ...item }) => (
              <li key={item.title} className="grid grid-cols-[auto_1fr] gap-4 py-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
                  <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-label text-muted-ink">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <ProductCapabilityPreview kind="payments" />
        </div>

        <div className="mt-14 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
          {capabilities.map(({ icon: Icon, ...item }) => (
            <Link
              key={item.href}
              href={item.href}
              className="group grid grid-cols-[auto_1fr] gap-x-4 border-b border-line py-6 transition-colors hover:bg-surface-2"
            >
              <div className="flex flex-col items-start gap-3">
                <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
              </div>
              <div><h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-label text-muted-ink">{item.description}</p>
              <span className="mt-4 flex items-center gap-2 text-label font-semibold text-ink">
                {item.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
