import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { WHATSAPP_URL } from "@/components/cta-links";
import { LEGAL_ENTITY } from "@/lib/legal-identity";
import {
  OFFICIAL_SOCIAL_PROFILES,
  absoluteUrl,
  buildMetadata,
} from "@/lib/seo";
import {
  Building2,
  Brain,
  Clock,
  Heart,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "Sobre a Flowo: Tecnologia para Barbearias",
  description:
    "Conheça a empresa, os princípios e a validação técnica da Flowo, plataforma brasileira de IA no WhatsApp e gestão para barbearias.",
  path: "/sobre",
});

const values = [
  {
    icon: Zap,
    title: "Produto antes da promessa",
    description:
      "Mostramos o que já funciona, o que depende de ativação e o que ainda está em desenvolvimento.",
  },
  {
    icon: Heart,
    title: "Rotina antes do jargão",
    description:
      "Falamos de horário, cadeira, encaixe, comanda e acerto — situações que a equipe reconhece.",
  },
  {
    icon: Shield,
    title: "Controle da barbearia",
    description:
      "A equipe pode acompanhar a conversa, assumir o atendimento e escolher como receber.",
  },
  {
    icon: Brain,
    title: "Evidência com limite claro",
    description:
      "Testes técnicos não viram depoimentos, e estimativas não são apresentadas como receita realizada.",
  },
];

const differentials = [
  {
    icon: MessageCircle,
    title: "WhatsApp nativo",
    description:
      "Funciona no número de WhatsApp da sua barbearia. Seus clientes não precisam baixar nada novo.",
  },
  {
    icon: Brain,
    title: "IA que entende",
    description:
      "A IA entende linguagem natural e agenda automaticamente, 24 horas por dia.",
  },
  {
    icon: Clock,
    title: "Lembretes automáticos",
    description:
      "Lembretes e confirmação automática antes do horário ajudam a reduzir faltas.",
  },
  {
    icon: Building2,
    title: "Feito no Brasil",
    description:
      "Desenvolvido para a realidade brasileira, com suporte em português.",
  },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": absoluteUrl("/sobre#webpage"),
      url: absoluteUrl("/sobre"),
      name: "Sobre a Flowo",
      description:
        "Empresa brasileira de tecnologia que desenvolve recepção com IA no WhatsApp e gestão para barbearias.",
      inLanguage: "pt-BR",
      mainEntity: { "@id": `${absoluteUrl("/")}#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: "Flowo",
      legalName: LEGAL_ENTITY.name,
      taxID: LEGAL_ENTITY.taxId,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/flowo-logo.svg"),
      sameAs: [...OFFICIAL_SOCIAL_PROFILES],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Carlos Augusto Cornelsen, 203, Loja 01",
        addressLocality: "Curitiba",
        addressRegion: "PR",
        postalCode: "80520-560",
        addressCountry: "BR",
      },
      areaServed: { "@type": "Country", name: "Brasil" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: LEGAL_ENTITY.supportEmail,
        availableLanguage: "Portuguese",
        areaServed: "BR",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Sobre",
          item: absoluteUrl("/sobre"),
        },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="main-content" className="bg-cream">
        {/* Header */}
        <section className="section-normal pt-32 md:pt-36">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Sobre", href: "/sobre" },
              ]}
            />
            <div className="mt-10 max-w-3xl">
              <h1 className="text-h2 font-semibold text-ink">
                Tecnologia brasileira para a rotina real da barbearia.
              </h1>
              <p className="mt-6 max-w-measure text-lead text-muted-ink">
                A Flowo conecta o atendimento no WhatsApp à agenda, à equipe e
                ao fechamento do serviço. Construímos o produto para reduzir a
                troca manual de informação sem tirar o controle do negócio.
              </p>
            </div>
          </div>
        </section>

        {/* História + photo */}
        <section className="section-tight">
          <div className="container-page">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-20">
              <div>
                <h2 className="text-h3 font-semibold text-ink">
                  Por que construímos assim
                </h2>
                <div className="mt-6 max-w-measure space-y-5 text-body text-muted-ink">
                  <p>
                    O problema é concreto: o cliente pergunta por um horário no
                    WhatsApp, a equipe consulta outra tela e alguém precisa
                    copiar a resposta de volta. Durante um corte, essa tarefa
                    disputa atenção com o atendimento na cadeira.
                  </p>
                  <p>
                    Por isso, o WhatsApp funciona como recepção e o painel como
                    central de supervisão. A disponibilidade considera dias,
                    turnos, folgas, serviços e duração de cada profissional nos
                    planos com equipe.
                  </p>
                  <p>
                    A empresa responsável é a {LEGAL_ENTITY.name}, inscrita no
                    CNPJ {LEGAL_ENTITY.taxId}, com sede em Curitiba. Produto,
                    privacidade, termos e canais de contato ficam públicos para
                    que a avaliação não dependa só da nossa mensagem comercial.
                  </p>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=1200&q=80"
                  alt="Barbeiro de avental fazendo o acabamento do corte de um cliente na cadeira"
                  fill
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="img-duotone object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-surface py-10 md:py-12">
          <div className="container-page grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Prova técnica
              </p>
              <h2 className="mt-3 text-h3 font-semibold text-ink-strong">
                O fluxo foi executado em produção.
              </h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                Em ambiente controlado, validamos mensagem, resposta da IA,
                consulta de disponibilidade, agendamento, remarcação,
                cancelamento, confirmação e atendimento humano.
              </p>
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="mt-5 inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4"
              >
                Ver escopo e limites do teste
              </Link>
            </div>
            <div>
              <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
                Transparência
              </p>
              <h2 className="mt-3 text-h3 font-semibold text-ink-strong">
                Sem cliente inventado. Sem número solto.
              </h2>
              <p className="mt-4 max-w-measure text-body text-muted-ink">
                O teste comprova funcionamento técnico, não aumento de receita.
                Quando houver resultados comerciais medidos com clientes, eles
                serão publicados com contexto, período e autorização.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <Link href="/privacidade" className="font-semibold text-ink underline underline-offset-4">
                  Privacidade
                </Link>
                <Link href="/termos" className="font-semibold text-ink underline underline-offset-4">
                  Termos de uso
                </Link>
                <a href={`mailto:${LEGAL_ENTITY.supportEmail}`} className="font-semibold text-ink underline underline-offset-4">
                  Suporte
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Missão: the page's single serif statement, on ink */}
        <section className="on-ink section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-caption text-muted-ink">Nossa missão</p>
              <p className="mt-6 font-serif text-h2 font-medium leading-tight text-ink [letter-spacing:-0.008em]">
                Quem trabalha com as mãos merece tecnologia que trabalha por
                elas.
              </p>
              <p className="mx-auto mt-8 max-w-measure text-body text-muted-ink">
                Dar a todo profissional de serviços as mesmas ferramentas de
                agendamento e automação que as grandes redes têm, de forma
                simples e acessível.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="section-normal">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">Nossos valores</h2>
            <div className="mt-10 grid gap-x-16 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="border-t border-line py-8"
                >
                  <value.icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="h-6 w-6 text-ink"
                  />
                  <h3 className="mt-4 text-body font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-body text-muted-ink">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Por que o Flowo */}
        <section className="section-tight">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">
              Por que o Flowo?
            </h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {differentials.map((diff) => (
                <div key={diff.title} className="flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface">
                    <diff.icon
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="h-5 w-5 text-ink"
                    />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-ink">
                      {diff.title}
                    </h3>
                    <p className="mt-1.5 text-body text-muted-ink">
                      {diff.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="on-ink section-normal">
          <div className="container-page text-center">
            <h2 className="mx-auto max-w-2xl text-h2 font-semibold text-ink">
              Quer ver o fluxo antes de decidir?
            </h2>
            <p className="mx-auto mt-5 max-w-measure text-lead text-muted-ink">
              Veja o que já foi validado ou converse com a equipe sobre a rotina
              da sua barbearia.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-label font-medium text-cream transition-colors duration-200 ease-out-quint hover:bg-ink-strong"
              >
                Ver demonstração
              </Link>
              <a
                href={WHATSAPP_URL}
                className="inline-flex items-center justify-center rounded-full border border-line px-8 py-3.5 text-label font-medium text-ink transition-colors duration-200 ease-out-quint hover:bg-surface"
              >
                Falar com a Flowo
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
