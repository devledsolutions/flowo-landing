import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  ChevronRight,
  Clock3,
  MessageSquareText,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { PLANS } from "@/data/pricing-data";

const PATH = "/agenda-barbearia-whatsapp";
const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";

export const metadata = buildMetadata({
  title: "Agenda de Barbearia no WhatsApp com IA",
  description:
    "A IA da Flowo atende no WhatsApp, agenda e confirma os clientes da sua barbearia. Agenda organizada por barbeiro e lembretes automáticos contra faltas.",
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
      name: "Agenda de Barbearia no WhatsApp",
      item: absoluteUrl(PATH),
    },
  ],
};

const flowSteps = [
  {
    title: "Cliente chama no WhatsApp",
    description:
      "A IA entende serviço, dia e horário desejado e responde na hora, a qualquer hora. Ninguém da equipe precisa parar para digitar.",
  },
  {
    title: "A IA agenda e confirma no mesmo chat",
    description:
      "O horário entra na agenda do barbeiro certo e o cliente recebe a confirmação na própria conversa.",
  },
  {
    title: "Lembrete automático antes do horário",
    description:
      "O cliente confirma presença pelo WhatsApp. Quem vai desmarcar, desmarca antes, e o horário volta para a agenda.",
  },
];

const teamBenefits = [
  {
    icon: MessageSquareText,
    title: "Atendimento consistente",
    description:
      "Resposta imediata e padronizada, mesmo com a barbearia cheia. O cliente nunca fica no vácuo.",
  },
  {
    icon: CalendarCheck2,
    title: "Agenda por barbeiro",
    description:
      "Cada profissional tem a própria agenda, e a IA marca no horário livre do barbeiro certo.",
  },
  {
    icon: Clock3,
    title: "Menos tempo no celular",
    description:
      "A conversa repetitiva de marcar, remarcar e confirmar sai da mão da equipe e vira rotina automática.",
  },
];

export default function WhatsappAgendaPage() {
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
            <Crumbs current="Agenda de Barbearia no WhatsApp" />
            <div className="mt-10 max-w-3xl">
              <h1 className="text-h2 font-semibold text-ink-strong">
                A agenda da sua barbearia no WhatsApp, atendida por uma IA que
                conversa <em className="font-serif italic">como gente</em>
              </h1>
              <p className="mt-6 max-w-measure text-lead text-muted-ink">
                Com o Flowo, o cliente marca, remarca e confirma pelo WhatsApp
                em uma conversa normal. Sua equipe para de responder mensagem o
                dia todo e volta a focar no atendimento.
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
              Como funciona a agenda pelo WhatsApp
            </h2>
            <ol className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
              {flowSteps.map((step, index) => (
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
          <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg lg:aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=80"
                alt="Close do barbeiro aparando a barba na tesoura, luz baixa e quente"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="img-duotone object-cover"
              />
            </div>
            <div>
              <h2 className="text-h3 font-semibold text-ink">
                O barbeiro corta. A IA atende.
              </h2>
              <div className="mt-8 divide-y divide-line">
                {teamBenefits.map((item) => (
                  <div key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                    <item.icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <div>
                      <h3 className="text-body font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 max-w-measure text-body text-muted-ink">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-body text-muted-ink">
                Quer roteiros e processos prontos para WhatsApp? Veja os{" "}
                <Link
                  href="/recursos/guias"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  guias práticos da Flowo
                </Link>{" "}
                ou compare com a rotina atual em{" "}
                <Link
                  href="/flowo-vs-agenda-manual"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  Flowo vs agenda manual
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
            Enquanto você corta, a Flowo atende.
          </h2>
          <p className="mt-4 max-w-measure text-lead text-muted-ink">
            Coloque sua agenda para rodar no WhatsApp com confirmação
            automática e a equipe focada na cadeira, não no celular.
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
          <p className="mt-5 flex items-center gap-2 text-caption text-muted-ink">
            <BellRing aria-hidden className="h-4 w-4" />A partir de R${" "}
            {PLANS[0].monthly}/mês no plano Solo.
          </p>
        </div>
      </div>
    </section>
  );
}
