import { Bell, Calendar, CalendarCheck, Clock, CreditCard } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideCallout,
  GuideCards,
  GuideChecklist,
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideSection,
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guia Definitivo de Agendamento para Barbearias",
  description:
    "Configure horários, lembretes e confirmação automática pelo WhatsApp para organizar a agenda da sua barbearia e reduzir faltas.",
  path: "/recursos/guias/guia-definitivo-agendamento",
});

const tableOfContents = [
  { id: "por-que-faltas", label: "Por que faltas são um problema" },
  { id: "configurando-horarios", label: "Configurando seus horários" },
  { id: "lembretes-automaticos", label: "Lembretes automáticos" },
  { id: "confirmacao-automatica", label: "Confirmação automática" },
  { id: "pagamento-atendimento", label: "Pagamento do atendimento" },
];

export default function SchedulingGuidePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <GuidePage>
          <GuideHeader
            crumbs={[
              { label: "Início", href: "/" },
              { label: "Recursos", href: "/recursos" },
              { label: "Guias", href: "/recursos/guias" },
              { label: "Agendamento", href: "#" },
            ]}
            readTime="10 min"
            title="Guia definitivo de agendamento para barbearias"
            lead="Aprenda a configurar o Flowo para organizar sua agenda e reduzir faltas. Menos telefone, mais clientes na cadeira."
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="por-que-faltas"
              icon={Calendar}
              title="Por que faltas são um problema"
            >
              <p>
                Faltas custam caro. Cada horário vago é dinheiro perdido que
                não volta. Pior: você recusou outros clientes para reservar
                aquele horário.
              </p>
              <GuideCallout>
                A arma contra faltas não é cobrar sinal, é{" "}
                <strong>confirmação automática pelo WhatsApp</strong>: lembrete
                na véspera, confirmação perto do horário e liberação do slot
                quando o cliente não confirma.
              </GuideCallout>
              <p>
                Sem um sistema, você fica no telefone o dia todo coordenando
                horários, lembrando clientes e lidando com cancelamentos de
                última hora. O Flowo automatiza tudo isso.
              </p>
            </GuideSection>

            <GuideSection
              id="configurando-horarios"
              icon={Clock}
              title="Configurando seus horários"
            >
              <p>
                No Flowo, você define os horários de funcionamento da barbearia
                e de cada barbeiro individualmente. Isso permite:
              </p>
              <GuideCards
                items={[
                  {
                    title: "Agendas individuais",
                    description:
                      "Cada barbeiro tem sua própria agenda, com folgas e horários diferentes.",
                  },
                  {
                    title: "Escolha do cliente",
                    description:
                      "Clientes escolhem o barbeiro preferido ao agendar pelo WhatsApp.",
                  },
                  {
                    title: "Sem conflitos",
                    description:
                      "O sistema evita conflitos de horário automaticamente.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="lembretes-automaticos"
              icon={Bell}
              title="Lembretes automáticos"
            >
              <p>
                O Flowo envia lembretes automáticos via WhatsApp em dois
                momentos estratégicos:
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "24h antes",
                    description:
                      "Tempo suficiente para o cliente remarcar se precisar, liberando o horário para outra pessoa.",
                  },
                  {
                    title: "2h antes",
                    description:
                      "Lembrete final para garantir que o cliente não esqueça.",
                  },
                ]}
              />
              <p>
                O cliente pode confirmar, remarcar ou cancelar direto pelo
                WhatsApp, sem precisar ligar. A IA do Flowo entende e processa
                tudo automaticamente.
              </p>
            </GuideSection>

            <GuideSection
              id="confirmacao-automatica"
              icon={CalendarCheck}
              title="Confirmação automática e liberação de horários"
            >
              <p>
                Junto com o lembrete, o Flowo pede a confirmação do cliente. Se
                ele não confirmar em tempo hábil, o sistema pode liberar o
                horário automaticamente para outros clientes. Assim você não
                perde o slot.
              </p>
              <p>
                Essa funcionalidade é opcional e você define as regras: quantas
                horas de antecedência, quantas tentativas de contato, e o que
                fazer com o horário liberado.
              </p>
              <GuideChecklist
                items={[
                  "Peça a confirmação junto do lembrete de véspera",
                  "Defina o prazo limite para o cliente responder",
                  "Deixe o sistema reoferecer o horário liberado",
                  "Comunique a política de cancelamento com clareza desde o agendamento",
                ]}
              />
            </GuideSection>

            <GuideSection
              id="pagamento-atendimento"
              icon={CreditCard}
              title="Pagamento do atendimento (PIX ou cartão)"
            >
              <p>
                Depois que o horário está combinado, o cliente pode pagar o
                atendimento por PIX ou cartão direto pelo WhatsApp, ou na hora,
                como preferir. O pagamento é uma comodidade do atendimento,
                nunca uma condição para agendar.
              </p>
              <p>
                Isso agiliza o caixa no fim do dia e evita fila na frente do
                espelho. Você acompanha tudo no painel do Flowo.
              </p>
            </GuideSection>
          </article>

          <GuideCta
            title="Pronto para organizar sua agenda?"
            description="Configure sua barbearia em poucos minutos e deixe a confirmação automática trabalhar por você."
          />

          <GuidePrevNext
            next={{
              href: "/recursos/guias/gerenciamento-equipe",
              label: "Gerenciamento de Equipe",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
