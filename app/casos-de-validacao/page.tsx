import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, Check, CheckCircle2, MessageCircleMore, Settings2 } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Breadcrumb } from "@/components/breadcrumb";
import { buildSignupUrl } from "@/components/cta-links";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { PhoneFrame } from "@/components/home/phone-frame";
import { WhatsAppChat, type ChatMessage } from "@/components/home/whatsapp-chat";
import { ProductDisclaimer } from "@/components/home/product-previews";
import { VALIDATION_CASES } from "@/data/validation-cases";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const PAGE_PATH = "/casos-de-validacao";
const DATE_MODIFIED = "2026-09-03";

export const metadata = buildMetadata({
  title: "Flowo em Ação: IA e Agenda para Barbearias",
  description:
    "Duas barbearias clientes, uma de barbeiro solo e uma com equipe. Veja a conversa no WhatsApp e o que mudou na agenda.",
  path: PAGE_PATH,
  type: "article",
  publishedTime: "2026-07-31",
  modifiedTime: DATE_MODIFIED,
});

const flow = [
  {
    icon: MessageCircleMore,
    title: "O cliente chama",
    copy: "No WhatsApp que ele já usa, no seu número de sempre.",
  },
  {
    icon: Settings2,
    title: "A Flowo olha a sua regra",
    copy: "Serviço, duração, barbeiro e expediente decidem a resposta.",
  },
  {
    icon: CalendarCheck2,
    title: "A agenda confirma",
    copy: "A escolha vira horário na agenda, na hora.",
  },
] as const;

const caseScreens: Record<string, { src: string; alt: string; caption: string }> = {
  "linha-onze-sao-paulo": {
    src: "/images/product/app-agenda.png",
    alt: "Agenda do app da Flowo no celular, com os horários do dia e a situação de cada um.",
    caption: "A agenda no celular do barbeiro.",
  },
  "quatro-tempos-curitiba": {
    src: "/images/product/app-agenda.png",
    alt: "Agenda do app da Flowo no celular, com cinco barbeiros e os horários de cada um.",
    caption: "A agenda de cada barbeiro, no celular da recepção.",
  },
};

export default function ValidationCasesPage() {
  const heroConversation = VALIDATION_CASES[0].conversation as ChatMessage[];
  const heroConversationHeight = VALIDATION_CASES[0].conversationHeight;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl(`${PAGE_PATH}#webpage`),
        url: absoluteUrl(PAGE_PATH),
        name: "Flowo em ação",
        description: "Duas barbearias clientes da Flowo: uma de barbeiro solo e uma com equipe.",
        inLanguage: "pt-BR",
        dateModified: DATE_MODIFIED,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: VALIDATION_CASES.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: absoluteUrl(`${PAGE_PATH}/${item.slug}`),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Flowo em ação", item: absoluteUrl(PAGE_PATH) },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main-content">
        <section className="border-b border-line bg-cream pb-16 pt-32 md:pt-40 lg:pb-24">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Flowo em ação", href: PAGE_PATH },
              ]}
            />

            <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
              <div className="lg:sticky lg:top-28">
                <p className="text-caption font-medium text-muted-ink">Duas barbearias clientes</p>
                <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,1.8rem+1.3vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink-strong">
                  Do “tem horário?” ao horário na agenda.
                </h1>
                <p className="mt-6 max-w-[30rem] text-lead text-muted-ink">
                  Um barbeiro que trabalha sozinho e uma barbearia com equipe. Veja a conversa e o que
                  mudou na agenda.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#escolha-seu-perfil"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
                  >
                    Encontrar o meu caso
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <TrackedLink
                    href="/demonstracao-agendamento-whatsapp"
                    event="Validation Hub Demo Clicked"
                    properties={{ page: PAGE_PATH, placement: "hero" }}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-control-border px-7 text-label font-semibold text-ink transition-colors hover:bg-surface"
                  >
                    Ver a demonstração completa
                  </TrackedLink>
                </div>

                <ul className="mt-14 divide-y divide-line border-y border-line">
                  {flow.map((item) => (
                    <li key={item.title} className="flex items-start gap-4 py-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink">
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{item.title}</p>
                        <p className="mt-0.5 text-caption text-muted-ink">{item.copy}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mx-auto w-[340px] max-w-full lg:w-full lg:max-w-[24rem] lg:justify-self-end">
                <PhoneFrame className="border-ink/30 shadow-[0_44px_90px_-40px_oklch(0.08_0.01_110/0.95)] lg:hidden">
                  <WhatsAppChat width={340} logicalHeight={heroConversationHeight} messages={heroConversation} />
                </PhoneFrame>
                <PhoneFrame className="hidden border-ink/30 shadow-[0_44px_90px_-40px_oklch(0.08_0.01_110/0.95)] lg:block">
                  <WhatsAppChat width={384} logicalHeight={heroConversationHeight} messages={heroConversation} />
                </PhoneFrame>
                <ProductDisclaimer label="Conversa ilustrativa, com nomes de demonstração" className="mt-4" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal" id="escolha-seu-perfil">
          <div className="container-page">
            <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-caption font-semibold text-muted-ink">Escolha pela rotina</p>
                <h2 className="mt-3 max-w-[14ch] text-h2 font-semibold leading-tight text-ink-strong">
                  Qual dessas parece com a sua barbearia?
                </h2>
              </div>
              <p className="max-w-[62ch] text-body leading-relaxed text-muted-ink">
                Nas duas barbearias a Flowo faz o mesmo: responde, olha a agenda e confirma. O que muda é
                quantos barbeiros têm e quem cuida das conversas.
              </p>
            </div>
          </div>
        </section>

        {VALIDATION_CASES.map((validationCase, index) => {
          const signupUrl = buildSignupUrl({
            plan: validationCase.plan.toLowerCase() as "solo" | "equipe",
            campaign: "validation_hub",
            content: validationCase.slug,
          });
          const screen = caseScreens[validationCase.slug];
          const onInk = index % 2 !== 0;

          return (
            <section
              key={validationCase.slug}
              className={`section-normal border-t border-line ${onInk ? "on-ink" : "bg-surface"}`}
            >
              <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
                <div className={onInk ? "" : "lg:order-2"}>
                  <div className="flex items-center gap-4">
                    <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f4f0e5] p-1">
                      <Image
                        src={validationCase.logo}
                        alt={`Logo da ${validationCase.name}`}
                        width={80}
                        height={80}
                        className="h-full w-full object-contain"
                      />
                    </span>
                    <div>
                      <p className="text-xl font-semibold text-ink">{validationCase.name}</p>
                      <p className="mt-1 text-caption text-muted-ink">
                        {validationCase.location} · {validationCase.profile}
                      </p>
                    </div>
                  </div>

                  <h2 className="mt-8 text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em] text-ink-strong">
                    {validationCase.headline.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>
                  <p className="mt-5 max-w-[60ch] text-body leading-relaxed text-muted-ink">{validationCase.lead}</p>

                  <ul className="mt-7 divide-y divide-line border-y border-line">
                    {validationCase.proofPoints.slice(0, 3).map((point) => (
                      <li key={point} className="flex items-center gap-3 py-4 text-label font-semibold text-ink">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <TrackedLink
                      href={`${PAGE_PATH}/${validationCase.slug}`}
                      event="Validation Case Opened"
                      properties={{
                        page: PAGE_PATH,
                        profile: validationCase.slug,
                        placement: "campaign_profile",
                      }}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-semibold text-cream"
                    >
                      Ver o caso completo
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </TrackedLink>
                    <TrackedLink
                      href={signupUrl}
                      event="Validation Hub Signup Clicked"
                      properties={{
                        page: PAGE_PATH,
                        profile: validationCase.slug,
                        plan: validationCase.plan.toLowerCase(),
                      }}
                      className="inline-flex min-h-12 items-center justify-center px-5 font-semibold text-ink underline underline-offset-4"
                    >
                      Ver plano {validationCase.plan}
                    </TrackedLink>
                  </div>
                </div>

                {screen ? (
                  <figure className="mx-auto w-full max-w-[20rem]">
                    <PhoneFrame
                      src={screen.src}
                      alt={screen.alt}
                      width={720}
                      height={1564}
                      sizes="(min-width: 1024px) 20rem, 80vw"
                      className="max-h-[36rem]"
                    />
                    <figcaption className="mt-4">
                      <p className="text-label text-muted-ink">{screen.caption}</p>
                      <ProductDisclaimer label="Telas do app com dados ilustrativos" className="mt-1" />
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </section>
          );
        })}

        <section className="section-normal border-t border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-caption font-semibold text-muted-ink">Da mensagem ao horário marcado</p>
                <h2 className="mt-3 max-w-[14ch] text-h2 font-semibold leading-tight text-ink-strong">
                  A Flowo atende. A agenda acompanha. Você manda.
                </h2>
              </div>
              <p className="max-w-[68ch] text-lead leading-relaxed text-ink">
                A Flowo entende o que o cliente quer, olha o que está livre e marca na agenda certa.
                Remarcação e cancelamento entram do mesmo jeito.
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-3">
              <article className="bg-surface-2 p-6 sm:p-8">
                <MessageCircleMore className="h-6 w-6 text-ink" aria-hidden="true" />
                <h3 className="mt-6 text-lg font-semibold text-ink">Atende sem parar o corte</h3>
                <p className="mt-3 text-label leading-relaxed text-muted-ink">
                  O cliente recebe os horários livres no WhatsApp que já usa.
                </p>
              </article>
              <article className="bg-surface-2 p-6 sm:p-8">
                <CalendarCheck2 className="h-6 w-6 text-ink" aria-hidden="true" />
                <h3 className="mt-6 text-lg font-semibold text-ink">Muda a agenda junto</h3>
                <p className="mt-3 text-label leading-relaxed text-muted-ink">
                  Confirmação, remarcação e cancelamento vão para o horário certo.
                </p>
              </article>
              <article className="bg-surface-2 p-6 sm:p-8">
                <Settings2 className="h-6 w-6 text-ink" aria-hidden="true" />
                <h3 className="mt-6 text-lg font-semibold text-ink">Sua equipe assume quando quiser</h3>
                <p className="mt-3 text-label leading-relaxed text-muted-ink">
                  Quem assume vê o histórico. A Flowo espera e volta quando vocês devolverem.
                </p>
              </article>
            </div>

            <p className="mt-10 flex max-w-[68ch] items-start gap-3 border-t border-line pt-6 text-body text-muted-ink">
              <Check className="mt-1 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
              A Linha Onze e a Quatro Tempos são barbearias clientes da Flowo. As conversas e as
              agendas desta página são ilustrativas, com dados de teste. O atendimento foi testado no
              sistema real da Flowo em 26 de julho de 2026, com números de teste nossos. Ainda não
              medimos tempo economizado nem faturamento nelas; quando medirmos, publicamos com
              período e contexto.
            </p>
          </div>
        </section>

        <section className="on-ink section-normal">
          <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-caption font-semibold text-muted-ink">Sua rotina é diferente?</p>
              <h2 className="mt-3 max-w-[14ch] text-h2 font-semibold leading-tight text-ink-strong">
                Faça o Raio-X antes de escolher o plano.
              </h2>
            </div>
            <div>
              <p className="max-w-[62ch] text-body leading-relaxed text-muted-ink">
                Conte como chegam as mensagens, a escala, os intervalos e as folgas da equipe. Você
                recebe um diagnóstico gratuito e chega na conversa sabendo o que precisa configurar.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href="/recursos/diagnostico-agenda-barbearia"
                  event="Lead Magnet CTA Clicked"
                  properties={{
                    page: PAGE_PATH,
                    placement: "closing",
                    lead_magnet: "diagnostico_agenda_barbearia",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-semibold text-cream"
                >
                  Fazer o Raio-X gratuito
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <Link
                  href="/#precos"
                  className="inline-flex min-h-12 items-center justify-center px-5 font-semibold text-ink underline underline-offset-4"
                >
                  Comparar os planos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
