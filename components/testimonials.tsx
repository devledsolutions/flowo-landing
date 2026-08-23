import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  MessageSquareText,
  Users,
} from "lucide-react";

const situations = [
  {
    icon: MessageSquareText,
    moment: "Durante o atendimento",
    title: "A tesoura fica na mão. A conversa fica com a Flowo.",
    description:
      "A IA responde dúvidas, apresenta serviços e oferece horários disponíveis sem interromper quem está atendendo.",
    href: "/agenda-barbearia-whatsapp",
    linkLabel: "Ver agenda no WhatsApp",
  },
  {
    icon: Users,
    moment: "Quando há mais de um profissional",
    title: "Cada barbeiro trabalha na própria disponibilidade.",
    description:
      "Nos planos com equipe, dias e horários podem ser diferentes por profissional. O cliente vê apenas opções realmente livres.",
    href: "/sistema-agendamento-barbearia",
    linkLabel: "Ver agenda da equipe",
  },
  {
    icon: CalendarClock,
    moment: "Antes do horário",
    title: "A confirmação não depende de alguém lembrar.",
    description:
      "O cliente recebe o lembrete e pode confirmar ou cancelar no WhatsApp. No Equipe e Empresarial, também pode remarcar.",
    href: "/recursos/guias/reduzindo-faltas",
    linkLabel: "Ver processo de confirmação",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="rotinas-title"
      className="section-normal bg-cream"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="text-label font-medium text-faint-ink">
              Produto no dia a dia
            </p>
            <h2 id="rotinas-title" className="mt-4 text-h2 font-semibold text-ink">
              Três momentos em que a barbearia não pode parar
            </h2>
            <p className="mt-4 max-w-measure text-lead text-muted-ink">
              Veja a rotina concreta que o Flowo executa, sem transformar
              exemplo em promessa de resultado.
            </p>
          </div>

          <ol className="divide-y divide-line border-y border-line">
            {situations.map((situation) => (
              <li
                key={situation.moment}
                className="py-7 first:pt-0 lg:first:pt-7"
              >
                <div className="grid gap-4 sm:grid-cols-[3rem_1fr]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface">
                    <situation.icon
                      aria-hidden
                      className="h-5 w-5 text-ink"
                    />
                  </span>
                  <div>
                    <p className="text-caption font-medium text-faint-ink">
                      {situation.moment}
                    </p>
                    <h3 className="mt-1 text-body font-semibold text-ink">
                      {situation.title}
                    </h3>
                    <p className="mt-2 max-w-measure text-sm leading-relaxed text-muted-ink">
                      {situation.description}
                    </p>
                    <Link
                      href={situation.href}
                      className="group mt-4 inline-flex items-center gap-2 text-label font-medium text-ink underline-offset-4 hover:underline"
                    >
                      {situation.linkLabel}
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
