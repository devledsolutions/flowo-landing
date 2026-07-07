import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  ChevronRight,
  MessageCircle,
  QrCode,
  ReceiptText,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { PLANS } from "@/data/pricing-data";

const PATH = "/software-barbearia-com-pix";
const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";

export const metadata = buildMetadata({
  title: "Software para Barbearia com Pagamento por PIX",
  description:
    "O cliente paga o atendimento por PIX ou cartão direto no WhatsApp. Comanda fechada na hora, caixa organizado e confirmação automática contra faltas.",
  path: PATH,
});

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
    {
      "@type": "ListItem",
      position: 2,
      name: "Software para Barbearia com PIX",
      item: absoluteUrl(PATH),
    },
  ],
};

const paymentSteps = [
  {
    icon: ReceiptText,
    title: "O atendimento termina, a comanda fecha",
    description:
      "Corte, barba e produtos entram na comanda do cliente dentro do Flowo, sem papelzinho nem conta de cabeça.",
  },
  {
    icon: QrCode,
    title: "A cobrança chega no WhatsApp",
    description:
      "O cliente recebe o link de pagamento na própria conversa e paga por PIX ou cartão em segundos, sem baixar aplicativo.",
  },
  {
    icon: MessageCircle,
    title: "O caixa registra sozinho",
    description:
      "O pagamento entra no financeiro da barbearia na hora, com o histórico do cliente atualizado.",
  },
];

export default function PixSoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <main>
        <section className="pt-32 pb-section-tight md:pt-40">
          <div className="container-page">
            <Crumbs current="Software para Barbearia com PIX" />
            <div className="mt-10 max-w-3xl">
              <h1 className="text-h2 font-semibold text-ink-strong">
                Software para barbearia com PIX:{" "}
                <em className="font-serif italic">fechou o corte, fechou a conta</em>
              </h1>
              <p className="mt-6 max-w-measure text-lead text-muted-ink">
                No Flowo, o pagamento acontece no atendimento: a barbearia
                envia a cobrança pelo WhatsApp e o cliente paga por PIX ou
                cartão na mesma conversa em que agendou.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={SIGNUP_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-label font-medium text-cream transition-opacity duration-200 ease-out-quint hover:opacity-90"
                >
                  Começar agora
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <Link
                  href="/precos"
                  className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 text-label font-medium text-ink transition-colors duration-200 ease-out-quint hover:bg-surface-2"
                >
                  Ver planos
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">
              Como funciona o pagamento no Flowo
            </h2>
            <ol className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
              {paymentSteps.map((step, index) => (
                <li key={step.title} className="flex flex-col">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-label font-semibold text-ink"
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-body font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-measure text-body text-muted-ink">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?auto=format&fit=crop&w=1000&q=80"
                alt="Máquina de cortar cabelo em close sobre a bancada"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="img-duotone object-cover"
              />
            </div>
            <div>
              <h2 className="text-h3 font-semibold text-ink">
                Sem sinal, sem pagamento antecipado
              </h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                O Flowo não cobra sinal para agendar: pedir dinheiro antes do
                corte espanta cliente. Contra faltas, o que funciona é a{" "}
                <Link
                  href="/recursos/guias/reduzindo-faltas"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  confirmação automática pelo WhatsApp
                </Link>{" "}
                antes do horário. O pagamento fica para o atendimento, do jeito
                que o cliente espera.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-lg bg-surface-2 p-5">
                <BellRing aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                <p className="max-w-measure text-body text-muted-ink">
                  A IA lembra o cliente e pede a confirmação de presença antes
                  do horário. Quem não vai avisa com antecedência, e o horário
                  volta para a agenda.
                </p>
              </div>
              <p className="mt-6 text-body text-muted-ink">
                Quer entender o PIX na prática? Veja o guia de{" "}
                <Link
                  href="/recursos/guias/pagamentos-pix"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  pagamentos com PIX
                </Link>
                . Se o financeiro ainda vive em planilha, compare em{" "}
                <Link
                  href="/flowo-vs-planilha"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  Flowo vs planilha
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

function Crumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-caption text-muted-ink">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-ink"
          >
            Início
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <span aria-current="page" className="text-ink">
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function CtaBand() {
  return (
    <section className="on-ink relative isolate overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1600&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[oklch(0.185_0.01_110/0.75)] via-[oklch(0.185_0.01_110/0.62)] to-[oklch(0.185_0.01_110/0.85)]"
      />
      <div className="container-page section-normal relative">
        <div className="max-w-2xl">
          <h2 className="font-serif text-h2 font-medium text-ink-strong">
            Agenda no WhatsApp, pagamento no WhatsApp.
          </h2>
          <p className="mt-4 max-w-measure text-lead text-muted-ink">
            A mesma conversa que marca o corte fecha a conta. PIX ou cartão,
            sem maquininha na fila.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-label font-medium text-cream transition-opacity duration-200 ease-out-quint hover:opacity-90"
            >
              Começar agora
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 text-label font-medium text-ink transition-colors duration-200 ease-out-quint hover:bg-surface"
            >
              Ver planos
            </Link>
          </div>
          <p className="mt-5 text-caption text-muted-ink">
            A partir de R$ {PLANS[0].monthly}/mês no plano Solo.
          </p>
        </div>
      </div>
    </section>
  );
}
