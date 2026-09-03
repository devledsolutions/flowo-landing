import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  CreditCard,
  ReceiptText,
  RotateCcw,
  Users,
} from "lucide-react";

const optionalCapabilities = [
  {
    icon: CreditCard,
    status: "Opcional",
    title: "Pagamentos integrados",
    description:
      "Ative PIX e cartão Flowo se fizer sentido. Dinheiro e maquininha própria continuam disponíveis.",
    href: "/software-barbearia-com-pix",
  },
  {
    icon: BadgePercent,
    status: "Configurável",
    title: "Cashback",
    description:
      "Percentual, prazo e limites definidos pela barbearia. Consulte disponibilidade.",
    href: "/recursos/cashback-barbearia",
  },
  {
    icon: Users,
    status: "Empresarial",
    title: "Comissões",
    description:
      "Cálculo após comandas pagas e repasse por PIX iniciado pelo gestor.",
    href: "/recursos/comissoes-barbeiros",
  },
  {
    icon: ReceiptText,
    status: "Piloto",
    title: "Nota fiscal",
    description:
      "Ativação assistida e sujeita a município, dados fiscais e liberação da prefeitura.",
    href: "/recursos/nota-fiscal-barbearia",
  },
  {
    icon: RotateCcw,
    status: "Add-on · beta",
    title: "Flowo Recupera",
    description:
      "Contratação separada para revisar oportunidades e comprovar o resultado realizado.",
    href: "/flowo-recupera",
  },
] as const;

export function OptionalCapabilities() {
  return (
    <section aria-labelledby="optional-capabilities-title" className="section-normal">
      <div className="container-page">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
              Escolhas adicionais
            </p>
            <h2
              id="optional-capabilities-title"
              className="mt-4 text-h2 font-semibold text-ink-strong"
            >
              Recursos não viram obrigação só porque aparecem no produto.
            </h2>
          </div>
          <p className="text-lead text-muted-ink">
            Cada recurso abaixo informa se depende de ativação, plano,
            liberação da prefeitura ou disponibilidade. Nenhum deles muda o preço-base sem
            uma decisão comercial explícita.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {optionalCapabilities.map(({ icon: Icon, ...item }) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-72 flex-col bg-surface p-6 transition-colors hover:bg-surface-2"
            >
              <div className="flex items-center justify-between gap-3">
                <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-medium text-muted-ink">
                  {item.status}
                </span>
              </div>
              <h3 className="mt-8 font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-label text-muted-ink">{item.description}</p>
              <span className="mt-auto flex items-center gap-2 pt-8 text-label font-semibold text-ink">
                Ver condições
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
