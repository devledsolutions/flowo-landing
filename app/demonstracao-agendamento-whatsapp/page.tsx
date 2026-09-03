import { ArrowRight, CalendarCheck2, CalendarX2, Check, MessageCircle, Repeat2, UserRoundCheck } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { PhoneFrame } from "@/components/home/phone-frame";
import { WhatsAppChat, type ChatMessage } from "@/components/home/whatsapp-chat";
import { ProductDisclaimer } from "@/components/home/product-previews";
import {
  InstitutionalFilm,
  InstitutionalFilmSchema,
} from "@/components/marketing/institutional-film";
import { SIGNUP_URL, WHATSAPP_URL } from "@/components/cta-links";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const PATH = "/demonstracao-agendamento-whatsapp";

export const metadata = buildMetadata({
  title: "Demonstração: a Flowo atendendo no WhatsApp",
  description:
    "Uma conversa completa: o cliente pede horário, a Flowo olha a agenda e confirma. Depois remarca, cancela e passa a conversa para a equipe quando precisa.",
  path: PATH,
});

/**
 * The whole conversation the home hero promises, and what happened in the
 * agenda at each step. Illustrative names and prices, the same ones the app
 * screenshots use; the flow is the one exercised in the production test.
 */
const conversation: ChatMessage[] = [
  { day: "Quinta" },
  { from: "cliente", text: "Oi! Tem horário amanhã depois das 18h com o João?", at: "09:37" },
  {
    from: "flowo",
    text: "Tenho três horários com o João amanhã: 18:00, 18:30 e 19:00. Qual fica melhor pra você?",
    at: "09:37",
  },
  { from: "cliente", text: "18:30", at: "09:38" },
  {
    from: "flowo",
    text: "Agendado. Corte masculino amanhã às 18:30 com o João, 40 min, R$ 55. Se precisar remarcar, é só me chamar aqui.",
    at: "09:38",
  },
  { day: "Sexta" },
  { from: "cliente", text: "Consigo passar pras 19:00?", at: "14:02" },
  { from: "flowo", text: "Consigo. Mudei seu corte com o João para hoje às 19:00. Te espero!", at: "14:02" },
  { from: "cliente", text: "Vixe, surgiu um imprevisto. Preciso cancelar, desculpa.", at: "16:40" },
  {
    from: "flowo",
    text: "Sem problema, cancelei o horário das 19:00. Quando quiser marcar de novo, é só me chamar.",
    at: "16:40",
  },
  { from: "cliente", text: "Vocês fazem barba também? Quanto fica corte e barba?", at: "16:41" },
  {
    from: "equipe",
    text: "Fala! Aqui é o João. Fazemos sim, corte e barba fica R$ 85 e leva uns 60 min. Quer que eu já deixe sábado às 10:00 reservado pra você?",
    at: "16:44",
  },
];

const agendaSteps = [
  {
    icon: CalendarCheck2,
    title: "Sexta, 18:30 · Corte com João",
    detail: "Horário criado na agenda do João, 40 min, R$ 55.",
    tone: "ok",
  },
  {
    icon: Repeat2,
    title: "Remarcado para 19:00",
    detail: "O horário das 18:30 foi liberado e o das 19:00 ocupado, sem ninguém digitar nada.",
    tone: "ok",
  },
  {
    icon: CalendarX2,
    title: "Cancelado",
    detail: "A vaga das 19:00 voltou a ficar livre na agenda do João na hora.",
    tone: "muted",
  },
  {
    icon: UserRoundCheck,
    title: "João assumiu a conversa",
    detail: "A pergunta sobre barba foi para a equipe. O histórico ficou visível e a Flowo volta quando ele devolver.",
    tone: "ok",
  },
] as const;

const whatFlowoDoes = [
  {
    icon: MessageCircle,
    title: "Responde no seu número do WhatsApp",
    description: "O cliente escreve no mesmo número de sempre. A Flowo responde em segundos, olhando a agenda de verdade.",
  },
  {
    icon: CalendarCheck2,
    title: "Marca na agenda do barbeiro certo",
    description: "Cada profissional tem seus dias e horários. A Flowo só oferece o que está livre naquela agenda.",
  },
  {
    icon: Repeat2,
    title: "Remarca e cancela",
    description: "Quando o cliente muda de ideia, a agenda muda junto. A vaga volta a ficar livre sem ninguém precisar apagar.",
  },
  {
    icon: UserRoundCheck,
    title: "Sua equipe assume quando quiser",
    description: "Uma pergunta que a Flowo não deve responder vai para vocês, com o histórico inteiro. Depois ela retoma.",
  },
] as const;

const faqItems = [
  {
    question: "Essa conversa é com um cliente de verdade?",
    answer:
      "Não. Os nomes e valores são ilustrativos. O fluxo é o mesmo que a Flowo executou em produção com números de teste da própria Flowo, em 26 de julho de 2026.",
  },
  {
    question: "O horário aparece mesmo na agenda?",
    answer:
      "Sim. No teste, o agendamento foi criado, remarcado e cancelado, e a agenda mudou junto em cada passo.",
  },
  {
    question: "Minha equipe pode assumir a conversa?",
    answer: "Sim. Quem assume vê o histórico, a Flowo fica em espera e volta quando a pessoa devolver a conversa.",
  },
  {
    question: "Isso garante mais faturamento?",
    answer:
      "Não prometemos isso. O que a demonstração mostra é o atendimento e a agenda funcionando. Tempo economizado e faturamento serão medidos com os primeiros clientes.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(PATH)}#webpage`,
      url: absoluteUrl(PATH),
      name: "Demonstração: a Flowo atendendo no WhatsApp",
      description:
        "Uma conversa completa entre cliente e barbearia com a Flowo respondendo, marcando, remarcando e cancelando na agenda.",
      inLanguage: "pt-BR",
      dateModified: "2026-09-03",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Demonstração", item: absoluteUrl(PATH) },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function DemonstracaoAgendamentoWhatsappPage() {
  return (
    <>
      <InstitutionalFilmSchema pagePath={PATH} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main-content">
        <section className="border-b border-line bg-cream pb-16 pt-32 md:pt-40 lg:pb-24">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Demonstração", href: PATH },
              ]}
            />

            <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
              <div className="lg:sticky lg:top-28">
                <p className="text-caption font-medium text-muted-ink">Uma conversa completa</p>
                <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,1.8rem+1.3vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink-strong">
                  <em className="font-serif font-medium italic">“Tem horário amanhã?”</em>
                  <span className="block">Do pedido ao cancelamento, sem ninguém parar de cortar.</span>
                </h1>
                <p className="mt-6 max-w-[30rem] text-lead text-muted-ink">
                  A Flowo responde no seu WhatsApp, olha a agenda e confirma. Se o cliente remarcar ou
                  cancelar, a agenda muda junto. Sua equipe entra na conversa quando quiser.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <TrackedLink
                    href={SIGNUP_URL}
                    event="CTA Clicked"
                    properties={{ page: PATH, placement: "demo_hero", destination: "dashboard_signup", intent: "start_now" }}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
                  >
                    Criar minha conta
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                  <TrackedLink
                    href={WHATSAPP_URL}
                    event="CTA Clicked"
                    properties={{ page: PATH, placement: "demo_hero", destination: "whatsapp_sales", intent: "ask_question" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-control-border px-7 text-label font-semibold text-ink transition-colors hover:bg-surface"
                  >
                    Falar com a Flowo
                  </TrackedLink>
                </div>

                <h2 className="mt-14 text-caption font-semibold uppercase tracking-[0.1em] text-faint-ink">
                  O que aconteceu na agenda
                </h2>
                <ol className="mt-4 divide-y divide-line border-y border-line">
                  {agendaSteps.map(({ icon: Icon, title, detail, tone }) => (
                    <li key={title} className="flex items-start gap-4 py-4">
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                          tone === "ok"
                            ? "bg-[oklch(0.91_0.08_150)] text-[oklch(0.43_0.11_150)]"
                            : "bg-surface-2 text-muted-ink"
                        )}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{title}</p>
                        <p className="mt-0.5 text-caption text-muted-ink">{detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mx-auto w-[340px] max-w-full lg:w-full lg:max-w-[24rem] lg:justify-self-end">
                <PhoneFrame className="border-ink/30 shadow-[0_44px_90px_-40px_oklch(0.08_0.01_110/0.95)] lg:hidden">
                  <WhatsAppChat width={340} logicalHeight={1190} messages={conversation} />
                </PhoneFrame>
                <PhoneFrame className="hidden border-ink/30 shadow-[0_44px_90px_-40px_oklch(0.08_0.01_110/0.95)] lg:block">
                  <WhatsAppChat width={384} logicalHeight={1190} messages={conversation} />
                </PhoneFrame>
                <ProductDisclaimer label="Conversa ilustrativa, com o fluxo testado em produção" className="mt-4" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-normal border-b border-line bg-surface">
          <div className="container-page">
            <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
              <div>
                <h2 className="text-h2 font-semibold leading-tight text-ink-strong">O que a Flowo faz na sua barbearia</h2>
                <p className="mt-5 max-w-measure text-body text-muted-ink">
                  Tudo o que a conversa ao lado mostra, no seu número, com a sua agenda.
                </p>
              </div>
              <ol className="divide-y divide-line border-y border-line">
                {whatFlowoDoes.map(({ icon: Icon, title, description }, index) => (
                  <li key={title} className="grid grid-cols-[2rem_auto_1fr] gap-4 py-6">
                    <span className="pt-1 text-caption font-semibold tabular-nums text-faint-ink">{index + 1}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
                      <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{title}</h3>
                      <p className="mt-1 max-w-measure text-label text-muted-ink">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <InstitutionalFilm />

        <section className="section-normal border-b border-line bg-cream">
          <div className="container-page grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
            <div>
              <h2 className="text-h2 font-semibold leading-tight text-ink-strong">Dúvidas sobre a demonstração</h2>
              <p className="mt-5 flex items-start gap-3 text-body text-muted-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                Testado em produção com números de teste da própria Flowo, em 26 de julho de 2026. Não usamos
                cliente real na demonstração, e não publicamos número de resultado antes de medir com clientes.
              </p>
            </div>
            <dl className="divide-y divide-line border-y border-line">
              {faqItems.map((item) => (
                <div key={item.question} className="py-5">
                  <dt className="font-semibold text-ink">{item.question}</dt>
                  <dd className="mt-2 max-w-measure text-label text-muted-ink">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="on-ink">
          <div className="container-page section-normal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-caption font-medium text-muted-ink">Próximo passo</p>
              <h2 className="mt-3 max-w-[18ch] text-h2 font-semibold leading-tight text-ink-strong">
                Veja a mesma conversa com os seus serviços e horários.
              </h2>
              <p className="mt-4 max-w-[34rem] text-body text-muted-ink">
                Conte como sua equipe trabalha e a gente monta a demonstração com a sua barbearia dentro da
                conversa.
              </p>
            </div>
            <TrackedLink
              href={WHATSAPP_URL}
              event="CTA Clicked"
              properties={{ page: PATH, placement: "demo_closing", destination: "whatsapp_sales", intent: "request_demo" }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
            >
              Pedir uma demonstração
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
