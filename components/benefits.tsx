import Image from "next/image";
import {
  Bell,
  CalendarDays,
  CreditCard,
  MessageCircle,
  Smartphone,
} from "lucide-react";

const benefits = [
  {
    icon: MessageCircle,
    text: "A IA atende o WhatsApp a qualquer hora, até com a barbearia cheia.",
  },
  {
    icon: Bell,
    text: "Confirmação automática antes de cada horário, contra faltas.",
  },
  {
    icon: CalendarDays,
    text: "Agenda sincronizada com Google, Apple e Outlook.",
  },
  {
    icon: CreditCard,
    text: "Pagamento do atendimento por PIX ou cartão, se você quiser oferecer.",
  },
  {
    icon: Smartphone,
    text: "Nada para o cliente instalar: tudo acontece no WhatsApp dele.",
  },
];

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="section-tight bg-cream">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-14">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1621645582931-d1d3e6564943?auto=format&fit=crop&w=1000&q=80"
              alt="Cadeira de barbeiro preta e cromada, retrato de objeto"
              fill
              sizes="(min-width: 1024px) 35vw, (min-width: 640px) 24rem, 100vw"
              className="img-duotone object-cover"
            />
          </div>

          <div>
            <h2 id="benefits-title" className="text-h2 font-semibold text-ink">
              Por que barbearias escolhem o Flowo
            </h2>
            <ul className="mt-8 space-y-5">
              {benefits.map((benefit) => (
                <li key={benefit.text} className="flex items-start gap-4">
                  <benefit.icon
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-ink"
                  />
                  <span className="max-w-measure text-muted-ink">{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
