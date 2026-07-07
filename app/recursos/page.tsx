import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Calendar,
  Clapperboard,
  Clock,
  CreditCard,
  Download,
  FileSpreadsheet,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { LeadCaptureModal } from "@/components/lead-capture-modal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Recursos e Guias para Barbearias",
  description:
    "Guias práticos, planilhas e roteiros gratuitos para organizar a agenda, confirmar clientes pelo WhatsApp e cuidar do financeiro da sua barbearia.",
  path: "/recursos",
});

const guides = [
  {
    title: "Guia Definitivo de Agendamento",
    description:
      "Configure horários, lembretes e confirmação automática pelo WhatsApp.",
    readTime: "10 min",
    href: "/recursos/guias/guia-definitivo-agendamento",
    icon: Calendar,
  },
  {
    title: "Pagamentos com PIX",
    description:
      "Receba o pagamento do atendimento por PIX ou cartão direto pelo WhatsApp.",
    readTime: "12 min",
    href: "/recursos/guias/pagamentos-pix",
    icon: CreditCard,
  },
  {
    title: "Configurando WhatsApp com IA",
    description:
      "Transforme seu WhatsApp em um assistente que responde e agenda a qualquer hora.",
    readTime: "8 min",
    href: "/recursos/guias/configurando-whatsapp",
    icon: MessageCircle,
  },
  {
    title: "Reduzindo Faltas",
    description:
      "Lembretes e confirmação automática pelo WhatsApp para proteger sua agenda.",
    readTime: "10 min",
    href: "/recursos/guias/reduzindo-faltas",
    icon: Bell,
  },
];

const downloads = [
  {
    title: "Planilha de Precificação",
    description: "Calcule o preço ideal dos seus serviços",
    icon: FileSpreadsheet,
  },
  {
    title: "Calendário de Conteúdo",
    description: "30 dias de ideias para Instagram",
    icon: Calendar,
  },
  {
    title: "Planilha de Comissões",
    description: "Controle pagamentos da equipe",
    icon: FileSpreadsheet,
  },
];

const TOTAL_GUIDES = 10;

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-section-normal">
          <div className="container-page">
            <div className="mx-auto max-w-4xl">
              <Breadcrumb
                items={[
                  { label: "Início", href: "/" },
                  { label: "Recursos", href: "/recursos" },
                ]}
              />

              {/* Hero */}
              <div className="mt-10 mb-16 grid items-center gap-10 md:grid-cols-[1fr_260px]">
                <div>
                  <h1 className="text-h2 font-bold leading-tight text-ink">
                    Aprenda a cuidar da sua barbearia como quem cuida do{" "}
                    <em className="font-serif font-medium italic">corte</em>
                  </h1>
                  <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
                    Guias práticos e materiais gratuitos para organizar a
                    agenda, confirmar clientes pelo WhatsApp e acompanhar o
                    financeiro.
                  </p>
                </div>
                <div className="hidden overflow-hidden rounded-lg md:block">
                  <Image
                    src="https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?auto=format&fit=crop&w=1000&q=80"
                    alt="Máquina de cortar cabelo em close sobre a bancada"
                    width={520}
                    height={640}
                    className="img-duotone h-auto w-full object-cover"
                    sizes="260px"
                  />
                </div>
              </div>

              {/* Guides */}
              <div className="mb-16">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <h2 className="text-h3 font-bold text-ink">Guias disponíveis</h2>
                  <Link
                    href="/recursos/guias"
                    className="flex items-center gap-1 text-label font-medium text-muted-ink transition-colors hover:text-ink"
                  >
                    Ver todos ({TOTAL_GUIDES})
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {guides.map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      className="group block rounded-lg border border-line bg-surface p-5 transition-colors duration-200 ease-out-quint hover:border-ink/40"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-surface-2 p-2.5">
                          <guide.icon
                            className="h-5 w-5 text-ink"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="flex items-center gap-1 text-caption text-faint-ink">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {guide.readTime}
                          </span>
                          <h3 className="mt-1 font-semibold text-ink">
                            {guide.title}
                          </h3>
                          <p className="mt-1 text-label text-muted-ink">
                            {guide.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Shorts/Reels */}
              <div className="mb-16 rounded-lg border border-line bg-surface p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-surface-2 p-2.5">
                      <Clapperboard className="h-5 w-5 text-ink" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-h3 font-bold text-ink">
                        Shorts e Reels prontos
                      </h2>
                      <p className="mt-1 text-muted-ink">
                        8 roteiros de vídeos curtos conectados aos guias, para
                        divulgar sua barbearia e gerar agendamentos.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-full sm:flex-shrink-0"
                  >
                    <Link href="/recursos/videos">Ver roteiros de vídeo</Link>
                  </Button>
                </div>
              </div>

              {/* Downloads */}
              <div className="mb-16">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-h3 font-bold text-ink">
                      Materiais gratuitos
                    </h2>
                    <p className="mt-1 text-label text-muted-ink">
                      Planilhas e templates para baixar
                    </p>
                  </div>
                  <Link
                    href="/recursos/materiais"
                    className="flex items-center gap-1 text-label font-medium text-muted-ink transition-colors hover:text-ink"
                  >
                    Ver todos
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {downloads.map((item) => (
                    <Link
                      key={item.title}
                      href="/recursos/materiais"
                      className="group block rounded-lg border border-line bg-surface p-5 transition-colors duration-200 ease-out-quint hover:border-ink/40"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="rounded-lg bg-surface-2 p-2">
                          <item.icon className="h-5 w-5 text-ink" aria-hidden="true" />
                        </div>
                        <Download
                          className="h-4 w-4 text-faint-ink transition-colors group-hover:text-ink"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-label font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-caption text-muted-ink">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="on-ink rounded-lg p-8 sm:p-10">
                <div className="max-w-2xl">
                  <h2 className="text-h3 font-bold">
                    Quer ver o Flowo na prática?
                  </h2>
                  <p className="mt-3 text-muted-ink">
                    Configure sua barbearia em poucos minutos e aplique tudo que
                    você leu nos guias.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <LeadCaptureModal>
                      <Button size="lg" className="rounded-full px-7">
                        Começar agora
                      </Button>
                    </LeadCaptureModal>
                    <Link
                      href="/precos"
                      className="text-label font-medium underline-offset-4 hover:underline"
                    >
                      Ver planos e preços
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-12 text-center text-label text-muted-ink">
                Mais guias e materiais em breve. Tem uma dúvida específica?{" "}
                <a
                  href="mailto:contato@flowo.com.br"
                  className="font-medium text-ink underline-offset-4 hover:underline"
                >
                  Fale conosco
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
