import Image from "next/image";
import {
  Bell,
  CalendarDays,
  CreditCard,
  Globe,
  History,
  LineChart,
  Megaphone,
  RefreshCw,
  Users,
} from "lucide-react";

const featureGroups = [
  {
    title: "Agenda",
    items: [
      {
        icon: CalendarDays,
        title: "Sincronização de calendários",
        description:
          "Google, Apple e Outlook sempre em dia. O agendamento aparece no seu celular na hora.",
      },
      {
        icon: Bell,
        title: "Lembretes 24h e 2h antes",
        description:
          "Por WhatsApp e e-mail, com pedido de confirmação. O cliente responde na própria conversa.",
      },
      {
        icon: RefreshCw,
        title: "Remarcação pelo WhatsApp",
        description:
          "Remarcar ou cancelar é uma mensagem, não uma ligação. A agenda se ajusta sozinha.",
      },
    ],
  },
  {
    title: "Equipe e clientes",
    items: [
      {
        icon: Users,
        title: "Agenda por barbeiro",
        description:
          "Cada barbeiro com seus serviços, preços e horários. O cliente escolhe com quem cortar.",
      },
      {
        icon: History,
        title: "Histórico de cada cliente",
        description:
          "Último corte, preferências e frequência guardados. A IA usa isso na conversa.",
      },
      {
        icon: LineChart,
        title: "Relatórios de faturamento",
        description:
          "O que entrou, por serviço e por barbeiro, direto no painel financeiro.",
      },
    ],
  },
  {
    title: "Pagamentos e alcance",
    items: [
      {
        icon: CreditCard,
        title: "Pagamento no atendimento",
        description:
          "PIX ou cartão na hora do serviço, se você quiser oferecer. Sem maquininha extra.",
      },
      {
        icon: Megaphone,
        title: "Campanhas pelo WhatsApp",
        description:
          "Mensagens para sua base dentro do limite mensal do seu plano, sem planilha.",
      },
      {
        icon: Globe,
        title: "Página de agendamento online",
        description:
          "Um link da sua barbearia para quem prefere agendar sem conversar.",
      },
    ],
  },
];

const aiPoints = [
  "Responde de madrugada, no domingo e com a barbearia cheia",
  "Oferece só horários realmente livres na agenda",
  "Remarca e cancela na mesma conversa",
  "Passa a conversa para você quando precisar",
];

export default function Features() {
  return (
    <section id="recursos" aria-labelledby="recursos-title" className="section-normal bg-cream">
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 id="recursos-title" className="text-h2 font-semibold text-ink">
            Tudo que a barbearia precisa
          </h2>
          <p className="mt-4 max-w-measure text-lead text-muted-ink">
            A IA cuida do atendimento. O resto do dia a dia da barbearia vem
            junto, no mesmo painel.
          </p>
        </div>

        {/* AI lede: the real differentiator gets the wide row */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <h3 className="text-h3 font-semibold text-ink">
              A IA que atende, agenda e confirma
            </h3>
            <p className="mt-4 max-w-measure text-muted-ink">
              O cliente manda &quot;quero marcar um corte&quot; e recebe
              resposta em segundos, em linguagem natural: serviços com preço,
              horários livres de verdade e confirmação na hora. E a IA só diz
              que agendou quando o horário entrou mesmo na agenda.
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {aiPoints.map((point) => (
                <li key={point} className="flex items-baseline gap-3 py-3">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-ink"
                  />
                  <span className="text-muted-ink">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=80"
              alt="Close do barbeiro aparando a barba na tesoura, luz baixa e quente"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="img-duotone object-cover transition-[filter] duration-500 ease-out-expo group-hover:[filter:grayscale(1)_contrast(1.06)_brightness(0.98)_sepia(0.32)]"
            />
          </div>
        </div>

        {/* Themed groups, editorial columns instead of 8 clone cards */}
        <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-8">
          {featureGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-label font-medium text-faint-ink">{group.title}</h3>
              <ul className="mt-4 space-y-6">
                {group.items.map((item) => (
                  <li key={item.title} className="flex gap-3.5">
                    <item.icon aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <div>
                      <h4 className="font-semibold text-ink">{item.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-ink">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
