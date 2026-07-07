"use client";

import { Button } from "@/components/ui/button";
import { LeadCaptureModal } from "./lead-capture-modal";
import { BookOpen, Headphones, MessagesSquare, Target } from "lucide-react";

const supportItems = [
  {
    icon: Target,
    title: "Onboarding personalizado",
    description:
      "Configuramos o sistema com você e treinamos a equipe para a barbearia começar a usar sem travar.",
  },
  {
    icon: MessagesSquare,
    title: "Atendimento por chat e e-mail",
    description:
      "Fala com gente de verdade quando precisar de ajuda, sem robô empurrando você de um lado para o outro.",
  },
  {
    icon: BookOpen,
    title: "Base de conhecimento",
    description:
      "Tutoriais, guias e boas práticas para tirar o máximo do Flowo no seu ritmo.",
  },
];

export default function SupportSection() {
  return (
    <section aria-labelledby="suporte-title" className="section-normal bg-cream">
      <div className="container-page">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 id="suporte-title" className="text-h2 font-semibold text-ink">
              A gente ajuda você a começar
            </h2>
            <p className="mt-4 max-w-measure text-lead text-muted-ink">
              O Flowo cuida do agendamento, da agenda e da automação. E se
              aparecer dúvida no caminho, tem gente pronta para responder.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface"
              >
                <Headphones className="h-5 w-5 text-ink" />
              </span>
              <div>
                <p className="font-semibold text-ink">
                  Nossa equipe está pronta para ajudar
                </p>
                <p className="text-muted-ink">
                  Suporte em português, no horário comercial.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
            <ul className="space-y-6">
              {supportItems.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-cream"
                  >
                    <item.icon className="h-5 w-5 text-ink" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-ink">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <LeadCaptureModal>
              <Button size="lg" className="mt-8 w-full">
                Agende uma demonstração
              </Button>
            </LeadCaptureModal>
          </div>
        </div>
      </div>
    </section>
  );
}
