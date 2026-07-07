import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { buildMetadata } from "@/lib/seo";
import {
  Building2,
  Brain,
  Clock,
  Heart,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "Sobre o Flowo: Sistema de Agendamento para Barbearia com IA",
  description:
    "Conheça o Flowo: a plataforma brasileira de agendamento via WhatsApp com IA para barbearias e negócios de serviços.",
  path: "/sobre",
});

const values = [
  {
    icon: Zap,
    title: "Simplicidade",
    description:
      "Tecnologia poderosa que qualquer pessoa consegue usar. Sem complicação.",
  },
  {
    icon: Heart,
    title: "Foco no cliente",
    description:
      "Seu sucesso é o nosso sucesso. Estamos aqui para o seu negócio crescer.",
  },
  {
    icon: Shield,
    title: "Confiança",
    description:
      "Seus dados e os dos seus clientes são tratados com máxima segurança.",
  },
  {
    icon: Brain,
    title: "Inovação",
    description:
      "IA de verdade, que atende e agenda de fato. Não promessa de demo.",
  },
];

const differentials = [
  {
    icon: MessageCircle,
    title: "WhatsApp nativo",
    description:
      "Funciona no número de WhatsApp da sua barbearia. Seus clientes não precisam baixar nada novo.",
  },
  {
    icon: Brain,
    title: "IA que entende",
    description:
      "A IA entende linguagem natural e agenda automaticamente, 24 horas por dia.",
  },
  {
    icon: Clock,
    title: "Lembretes automáticos",
    description:
      "Lembretes e confirmação automática antes do horário ajudam a reduzir faltas.",
  },
  {
    icon: Building2,
    title: "Feito no Brasil",
    description:
      "Desenvolvido para a realidade brasileira, com suporte em português.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream">
        {/* Header */}
        <section className="section-normal pt-32 md:pt-36">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Sobre", href: "/sobre" },
              ]}
            />
            <div className="mt-10 max-w-3xl">
              <h1 className="text-h2 font-semibold text-ink">
                Simplificando o agendamento para quem faz acontecer
              </h1>
              <p className="mt-6 max-w-measure text-lead text-muted-ink">
                O Flowo nasceu de uma frustração real: donos de barbearia
                perdendo horas respondendo WhatsApp, clientes que não aparecem
                e dinheiro deixado na mesa. Criamos a solução que gostaríamos
                de ter.
              </p>
            </div>
          </div>
        </section>

        {/* História + photo */}
        <section className="section-tight">
          <div className="container-page">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-20">
              <div>
                <h2 className="text-h3 font-semibold text-ink">
                  Nossa história
                </h2>
                <div className="mt-6 max-w-measure space-y-5 text-body text-muted-ink">
                  <p>
                    Tudo começou observando o dia a dia de uma barbearia. O
                    barbeiro parava no meio do corte para responder WhatsApp.
                    Clientes ligavam para remarcar. Outros simplesmente não
                    apareciam. No fim do mês, a conta não fechava como deveria.
                  </p>
                  <p>
                    Percebemos que o problema não era falta de clientes, era
                    falta de organização. E que a solução não podia ser um app
                    complicado que ninguém ia usar. Tinha que funcionar onde os
                    clientes já estão: no WhatsApp.
                  </p>
                  <p>
                    Assim nasceu o Flowo: uma IA que responde pelo WhatsApp,
                    agenda automaticamente, envia lembretes e confirma cada
                    horário. Simples assim, para a barbearia cuidar do corte
                    enquanto a agenda cuida de si mesma.
                  </p>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=1200&q=80"
                  alt="Barbeiro de avental fazendo o acabamento do corte de um cliente na cadeira"
                  fill
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="img-duotone object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Missão: the page's single serif statement, on ink */}
        <section className="on-ink section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-caption text-muted-ink">Nossa missão</p>
              <p className="mt-6 font-serif text-h2 font-medium leading-tight text-ink [letter-spacing:-0.008em]">
                Quem trabalha com as mãos merece tecnologia que trabalha por
                elas.
              </p>
              <p className="mx-auto mt-8 max-w-measure text-body text-muted-ink">
                Dar a todo profissional de serviços as mesmas ferramentas de
                agendamento e automação que as grandes redes têm, de forma
                simples e acessível.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="section-normal">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">Nossos valores</h2>
            <div className="mt-10 grid gap-x-16 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="border-t border-line py-8"
                >
                  <value.icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="h-6 w-6 text-ink"
                  />
                  <h3 className="mt-4 text-body font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-body text-muted-ink">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Por que o Flowo */}
        <section className="section-tight">
          <div className="container-page">
            <h2 className="text-h3 font-semibold text-ink">
              Por que o Flowo?
            </h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {differentials.map((diff) => (
                <div key={diff.title} className="flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface">
                    <diff.icon
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="h-5 w-5 text-ink"
                    />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-ink">
                      {diff.title}
                    </h3>
                    <p className="mt-1.5 text-body text-muted-ink">
                      {diff.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="on-ink section-normal">
          <div className="container-page text-center">
            <h2 className="mx-auto max-w-2xl text-h2 font-semibold text-ink">
              Pronto para simplificar seu agendamento?
            </h2>
            <p className="mx-auto mt-5 max-w-measure text-lead text-muted-ink">
              Assine o Flowo e deixe a IA atender, agendar e confirmar seus
              clientes no WhatsApp.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://barber.flowo.com.br/sign-up"
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-label font-medium text-cream transition-colors duration-200 ease-out-quint hover:bg-ink-strong"
              >
                Começar agora
              </a>
              <a
                href="mailto:contato@flowo.com.br"
                className="inline-flex items-center justify-center rounded-full border border-line px-8 py-3.5 text-label font-medium text-ink transition-colors duration-200 ease-out-quint hover:bg-surface"
              >
                Tirar dúvidas
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
