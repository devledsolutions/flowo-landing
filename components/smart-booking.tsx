import Image from "next/image";
import { Bell, CalendarCheck2, RefreshCw, UserCheck } from "lucide-react";

const features = [
  {
    icon: CalendarCheck2,
    title: "Só horários que existem",
    description:
      "A IA oferece apenas horários realmente livres na agenda. Nada de encaixe duplicado nem cliente esperando em pé.",
  },
  {
    icon: Bell,
    title: "Lembretes e confirmação",
    description:
      "Lembrete 24h e 2h antes do horário, pelo WhatsApp. O cliente confirma, remarca ou cancela na própria conversa.",
  },
  {
    icon: RefreshCw,
    title: "Calendário sempre em dia",
    description:
      "Sincronização em tempo real com Google, Apple e Outlook. O que entra na agenda aparece no seu celular.",
  },
  {
    icon: UserCheck,
    title: "Você no controle",
    description:
      "Assuma qualquer conversa quando quiser. A IA para de responder e espera você terminar.",
  },
];

export default function SmartBooking() {
  return (
    <section aria-labelledby="smart-booking-title" className="section-normal bg-cream">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <h2 id="smart-booking-title" className="text-h2 font-semibold text-ink">
              Agenda no piloto automático
            </h2>
            <p className="mt-4 max-w-measure text-lead text-muted-ink">
              O agendamento acontece sozinho, do primeiro contato à confirmação
              de presença. Você fica com a tesoura, não com o celular.
            </p>

            <ul className="mt-8 divide-y divide-line border-y border-line">
              {features.map((feature) => (
                <li key={feature.title} className="flex gap-4 py-5">
                  <feature.icon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-ink"
                  />
                  <div>
                    <h3 className="font-semibold text-ink">{feature.title}</h3>
                    <p className="mt-1 max-w-measure text-muted-ink">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?auto=format&fit=crop&w=1000&q=80"
              alt="Máquina de cortar cabelo em close sobre a bancada"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="img-duotone object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
