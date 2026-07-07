import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  ChevronRight,
  Clock3,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { PLANS } from "@/data/pricing-data";

const PATH = "/sistema-agendamento-barbearia";
const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";

export const metadata = buildMetadata({
  title: "Sistema de Agendamento para Barbearia",
  description:
    "Sistema de agendamento para barbearia com IA no WhatsApp: agenda por barbeiro, confirmação automática contra faltas e pagamento do atendimento por PIX ou cartão.",
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
      name: "Sistema de Agendamento para Barbearia",
      item: absoluteUrl(PATH),
    },
  ],
};

const benefits = [
  {
    icon: MessageCircle,
    title: "Agendamento pelo WhatsApp",
    description:
      "O cliente marca no canal que já usa todos os dias, sem baixar aplicativo. A IA da Flowo responde, agenda e confirma na própria conversa.",
  },
  {
    icon: CalendarCheck2,
    title: "Agenda centralizada",
    description:
      "Horários por barbeiro e por serviço em um único painel, sincronizados com o que a IA marca no WhatsApp.",
  },
  {
    icon: Clock3,
    title: "Confirmação automática",
    description:
      "Lembrete antes do atendimento com confirmação pelo WhatsApp. Quem vai faltar avisa antes, e o horário volta para a agenda.",
  },
];

const fitCases = [
  "Barbeiro solo que perde tempo respondendo mensagem o dia todo.",
  "Equipe de 2 a 10 barbeiros que precisa organizar agenda e escala.",
  "Barbearia em crescimento que quer padronizar o atendimento no WhatsApp.",
];

export default function SchedulingSystemPage() {
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
            <Crumbs current="Sistema de Agendamento para Barbearia" />
            <div className="mt-10 max-w-3xl">
              <h1 className="text-h2 font-semibold text-ink-strong">
                Sistema de agendamento para barbearia que{" "}
                <em className="font-serif italic">atende sozinho</em> no
                WhatsApp
              </h1>
              <p className="mt-6 max-w-measure text-lead text-muted-ink">
                O Flowo centraliza os horários da equipe e coloca uma IA para
                atender, agendar e confirmar seus clientes pelo WhatsApp. Menos
                conversa repetitiva, mais gente na cadeira.
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
              O que muda na prática com o Flowo
            </h2>
            <div className="mt-8 divide-y divide-line">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 py-7 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10"
                >
                  <div className="flex items-start gap-3">
                    <item.icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <h3 className="text-body font-semibold text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="max-w-measure text-body text-muted-ink">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-normal border-t border-line">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <h2 className="text-h3 font-semibold text-ink">
                Para quem é este sistema de agendamento
              </h2>
              <ul className="mt-8 space-y-5">
                {fitCases.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <span className="max-w-measure text-body text-muted-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-body text-muted-ink">
                Quer reduzir faltas com lembrete e confirmação? Veja o guia{" "}
                <Link
                  href="/recursos/guias/reduzindo-faltas"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  reduzindo faltas na barbearia
                </Link>
                . Em dúvida entre manter o processo manual ou migrar? Compare
                em{" "}
                <Link
                  href="/flowo-vs-agenda-manual"
                  className="font-medium text-ink underline underline-offset-4 transition-colors duration-200 hover:text-ink-strong"
                >
                  Flowo vs agenda manual
                </Link>
                .
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg lg:aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1536520002442-39764a41e987?auto=format&fit=crop&w=1400&q=80"
                alt="Fileira de cadeiras clássicas sob luminárias industriais numa barbearia de piso de madeira"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="img-duotone object-cover"
              />
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
            Agenda organizada é atendimento que rende.
          </h2>
          <p className="mt-4 max-w-measure text-lead text-muted-ink">
            Deixe a rotina de marcar, confirmar e lembrar com a Flowo. Sua
            equipe cuida do corte.
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
