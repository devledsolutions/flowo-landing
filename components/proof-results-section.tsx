import { CalendarCheck2, Megaphone, MessageCircle } from "lucide-react";

interface ProofResultsSectionProps {
  title?: string;
  description?: string;
}

/**
 * Antiga "Prova de resultado em barbearias reais" com -70%/+32%/+24%
 * fabricados. Agora explica o mecanismo, sem inventar métrica: a honestidade
 * é a postura. Renderizada em 5 páginas de SEO.
 */
const mechanisms = [
  {
    icon: MessageCircle,
    title: "A IA responde e agenda",
    detail:
      "O cliente marca pelo WhatsApp a qualquer hora, sem a equipe largar a tesoura para responder.",
  },
  {
    icon: CalendarCheck2,
    title: "Confirmação automática",
    detail:
      "Lembrete antes do horário. O cliente confirma, remarca ou cancela respondendo a mensagem, e a agenda se ajusta sozinha.",
  },
  {
    icon: Megaphone,
    title: "Cliente sumido recebe convite",
    detail:
      "Campanhas pelo WhatsApp para chamar de volta quem faz tempo que não corta.",
  },
];

export function ProofResultsSection({
  title = "Como o Flowo segura a sua agenda",
  description = "Nenhum número inventado aqui. O Flowo ataca as causas da cadeira vazia: mensagem sem resposta, esquecimento e cliente que some. O resultado você acompanha na sua própria agenda.",
}: ProofResultsSectionProps) {
  return (
    <section className="mt-10 rounded-xl border border-line bg-surface p-6 md:p-8">
      <h2 className="text-h3 font-semibold text-ink-strong">{title}</h2>
      <p className="mt-3 max-w-measure leading-relaxed text-muted-ink">
        {description}
      </p>

      <ul className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
        {mechanisms.map((item) => (
          <li key={item.title}>
            <item.icon
              aria-hidden="true"
              strokeWidth={1.75}
              className="h-5 w-5 text-muted-ink"
            />
            <h3 className="mt-3 font-semibold text-ink">{item.title}</h3>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-ink">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
