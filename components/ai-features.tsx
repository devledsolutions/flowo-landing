import Image from "next/image";
import { Ear, ShieldCheck, UserCheck, UserRound } from "lucide-react";

const points = [
  {
    icon: Ear,
    title: "Linguagem natural de verdade",
    description:
      "Entende \"amanhã de tarde\", áudio e texto corrido. Responde como atendente, não como robô de menu.",
  },
  {
    icon: UserRound,
    title: "Conhece o cliente",
    description:
      "Lembra o histórico e as preferências de quem escreve e sugere o corte de sempre.",
  },
  {
    icon: ShieldCheck,
    title: "Só confirma o que aconteceu",
    description:
      "A IA nunca diz \"agendado\" sem o horário ter entrado de verdade na agenda. Nada de promessa furada.",
  },
  {
    icon: UserCheck,
    title: "Você assume quando quiser",
    description:
      "Pegue qualquer conversa a qualquer momento. A IA para, espera e não atropela seu atendimento.",
  },
];

export default function AIFeatures() {
  return (
    <section aria-labelledby="ai-features-title" className="section-normal bg-cream">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="relative order-last aspect-[4/5] overflow-hidden rounded-xl lg:order-first">
            <Image
              src="https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=1200&q=80"
              alt="Barbeiro de avental fazendo o acabamento do corte de um cliente na cadeira"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="img-duotone object-cover"
            />
          </div>

          <div>
            <h2 id="ai-features-title" className="text-h2 font-semibold text-ink">
              Atende como{" "}
              <em className="font-serif font-medium italic tracking-[-0.008em]">
                gente
              </em>
              , trabalha como máquina
            </h2>
            <p className="mt-4 max-w-measure text-lead text-muted-ink">
              A diferença do Flowo não é responder mensagem. É atender bem: com
              contexto, com memória e sem inventar.
            </p>

            <ul className="mt-8 divide-y divide-line border-y border-line">
              {points.map((point) => (
                <li key={point.title} className="flex gap-4 py-5">
                  <point.icon aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-ink" />
                  <div>
                    <h3 className="font-semibold text-ink">{point.title}</h3>
                    <p className="mt-1 max-w-measure text-muted-ink">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
