import { PhoneFrame } from "@/components/home/phone-frame";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { WHATSAPP_URL } from "@/components/cta-links";
import { LEGAL_ENTITY } from "@/lib/legal-identity";
import { OFFICIAL_SOCIAL_PROFILES, absoluteUrl, buildMetadata } from "@/lib/seo";
import { Building2, Brain, Check, Clock, Heart, MessageCircle, Shield, Zap } from "lucide-react";

export const metadata = buildMetadata({
  title: "Sobre a Flowo: Tecnologia para Barbearias",
  description:
    "Quem faz a Flowo, por que ela funciona no WhatsApp e o que a gente promete (e o que não promete) para a sua barbearia.",
  path: "/sobre",
});

const values = [
  {
    icon: Zap,
    title: "Mostrar antes de prometer",
    description: "Dizemos o que já funciona, o que depende de ativação e o que ainda está sendo feito.",
  },
  {
    icon: Heart,
    title: "Falar a língua da barbearia",
    description: "Horário, cadeira, encaixe, comanda e acerto. Sem palavra de software no meio.",
  },
  {
    icon: Shield,
    title: "O dono no controle",
    description: "Você acompanha a conversa, assume quando quiser e escolhe como receber.",
  },
  {
    icon: Brain,
    title: "Número só com fonte",
    description: "Teste não vira depoimento. Estimativa não vira faturamento. Publicamos o que medimos.",
  },
];

const differentials = [
  {
    icon: MessageCircle,
    title: "No seu WhatsApp",
    description: "Funciona no número da sua barbearia. O cliente não baixa nada.",
  },
  {
    icon: Brain,
    title: "Entende como o cliente escreve",
    description: "Sem menu, sem número de opção. A Flowo lê a mensagem e agenda, 24 horas por dia.",
  },
  {
    icon: Clock,
    title: "Lembra o cliente por você",
    description: "Lembrete e pedido de confirmação antes do horário, para ter menos cadeira vazia.",
  },
  {
    icon: Building2,
    title: "Feita no Brasil",
    description: "Pensada para a barbearia daqui, com suporte em português.",
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
      description: "Empresa brasileira que faz a Flowo: recepção com IA no WhatsApp e gestão para barbearias.",
      inLanguage: "pt-BR",
      dateModified: "2026-09-03",
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
        { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Sobre", item: absoluteUrl("/sobre") },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main-content" className="bg-cream">
        <section className="section-normal pt-32 md:pt-36">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Sobre", href: "/sobre" },
              ]}
            />
            <div className="mt-10 max-w-3xl">
              <h1 className="max-w-[18ch] text-h2 font-semibold text-ink">
                Feita para a rotina real da barbearia.
              </h1>
              <p className="mt-6 max-w-measure text-lead text-muted-ink">
                A Flowo responde no seu WhatsApp, olha a agenda e confirma. Você continua cortando.
              </p>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container-page">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-20">
              <div>
                <h2 className="text-h3 font-semibold text-ink">Por que a Flowo é assim</h2>
                <div className="mt-6 max-w-measure space-y-5 text-body text-muted-ink">
                  <p>
                    O cliente pergunta por um horário no WhatsApp. Alguém para o corte, abre a agenda,
                    responde e depois precisa anotar. Isso acontece dezenas de vezes por dia e sempre
                    disputa atenção com quem está na cadeira.
                  </p>
                  <p>
                    Por isso a Flowo atende no WhatsApp e você acompanha tudo no painel. Ela respeita os
                    dias, turnos, folgas, serviços e duração de cada barbeiro. Se o cliente remarca ou
                    cancela, a agenda muda junto.
                  </p>
                  <p>
                    A empresa por trás é a {LEGAL_ENTITY.name}, CNPJ {LEGAL_ENTITY.taxId}, de Curitiba.
                    Privacidade, termos e contato ficam públicos. Você não precisa confiar só na nossa
                    conversa de venda.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <Link href="/privacidade" className="font-semibold text-ink underline underline-offset-4">
                    Privacidade
                  </Link>
                  <Link href="/termos" className="font-semibold text-ink underline underline-offset-4">
                    Termos de uso
                  </Link>
                  <a
                    href={`mailto:${LEGAL_ENTITY.supportEmail}`}
                    className="font-semibold text-ink underline underline-offset-4"
                  >
                    Suporte
                  </a>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <PhoneFrame
                  src="/images/product/app-home.png"
                  alt="Tela inicial do app da Flowo com os atendimentos do dia"
                  width={300}
                  height={650}
                  sizes="300px"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="on-ink section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-caption text-muted-ink">Nossa missão</p>
              <p className="mt-6 font-serif text-h2 font-medium leading-tight text-ink [letter-spacing:-0.008em]">
                Quem trabalha com as mãos merece tecnologia que trabalha por elas.
              </p>
              <p className="mx-auto mt-8 max-w-measure text-body text-muted-ink">
                Dar a todo barbeiro a mesma agenda e o mesmo atendimento que as grandes redes têm, de um
                jeito simples e que cabe no bolso.
              </p>
            </div>
          </div>
        </section>

        <section className="section-normal">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">No que a gente acredita</h2>
            <div className="mt-10 grid gap-x-16 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="border-t border-line py-8">
                  <value.icon aria-hidden="true" strokeWidth={1.75} className="h-6 w-6 text-ink" />
                  <h3 className="mt-4 text-body font-semibold text-ink">{value.title}</h3>
                  <p className="mt-2 text-body text-muted-ink">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">Por que a Flowo?</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {differentials.map((diff) => (
                <div key={diff.title} className="flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface">
                    <diff.icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 text-ink" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-ink">{diff.title}</h3>
                    <p className="mt-1.5 text-body text-muted-ink">{diff.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-surface py-10 md:py-12">
          <div className="container-page grid gap-8 md:grid-cols-[0.6fr_1.4fr] md:gap-12">
            <h2 className="text-h3 font-semibold text-ink-strong">O que já testamos e o que ainda não medimos</h2>
            <div>
              <p className="flex max-w-measure items-start gap-3 text-body text-muted-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                Em 26 de julho de 2026 testamos o atendimento no sistema real da Flowo, com números de
                teste nossos: mensagem, resposta, horários livres, agendamento, remarcação, cancelamento,
                confirmação e a equipe assumindo a conversa. O teste usou números nossos, não clientes. Ainda não
                medimos tempo economizado nem faturamento com barbearias clientes. Quando medirmos,
                publicamos com período, contexto e autorização.
              </p>
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="mt-5 inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4"
              >
                Ver a conversa testada
              </Link>
            </div>
          </div>
        </section>

        <section className="on-ink section-normal">
          <div className="container-page text-center">
            <h2 className="mx-auto max-w-2xl text-h2 font-semibold text-ink">Quer ver a Flowo antes de decidir?</h2>
            <p className="mx-auto mt-5 max-w-measure text-lead text-muted-ink">
              Veja a conversa inteira ou conte como é a rotina da sua barbearia.
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
