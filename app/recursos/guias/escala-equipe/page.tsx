import { CalendarClock, CalendarOff, ListChecks, Users } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideAvailability,
  GuideCallout,
  GuideCards,
  GuideChecklist,
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideProductPath,
  GuideScopeNote,
  GuideSection,
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Escala de Equipe para Barbearia",
  description:
    "Configure horários individuais, serviços e folgas da equipe no Flowo sem prometer distribuição automática de clientes.",
  path: "/recursos/guias/escala-equipe",
});

const tableOfContents = [
  { id: "camadas", label: "Entenda as camadas da disponibilidade" },
  { id: "configurar", label: "Configure cada profissional" },
  { id: "folgas", label: "Registre folgas e exceções" },
  { id: "revisar", label: "Revise capacidade sem inventar rodízio" },
];

export default function EscalaEquipeGuidePage() {
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
              { label: "Escala de Equipe", href: "#" },
            ]}
            readTime="8 min"
            title="Escala de equipe sem conflito de horários"
            lead="Use o horário geral como limite e configure a rotina de cada profissional. O Flowo aplica a escala à disponibilidade, mas não cria sozinho um rodízio comercial entre barbeiros."
          />

          <GuideAvailability
            items={[
              {
                label: "Planos",
                value: "Equipe e Empresarial",
                description:
                  "Múltiplos profissionais ativos exigem capacidade de equipe.",
              },
              {
                label: "Configuração",
                value: "Painel web e app móvel",
                description:
                  "Horário geral, agenda individual e folgas estão disponíveis nas duas experiências.",
              },
              {
                label: "Disponibilidade",
                value: "Calculada por profissional",
                description:
                  "Serviço permitido, horário, folga e conflito são verificados antes de mostrar um slot.",
              },
              {
                label: "Distribuição",
                value: "Sem round-robin automático",
                description:
                  "“Qualquer profissional” encontra alguém elegível e livre; não equilibra metas ou faturamento.",
              },
            ]}
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="camadas"
              icon={ListChecks}
              title="Entenda as camadas da disponibilidade"
            >
              <GuideCards
                items={[
                  {
                    title: "1. Horário da barbearia",
                    description:
                      "É a janela máxima de funcionamento. Nenhum profissional recebe horário fora dela.",
                  },
                  {
                    title: "2. Horário do profissional",
                    description:
                      "Pode herdar o geral ou restringir dias e faixas específicas.",
                  },
                  {
                    title: "3. Serviços atribuídos",
                    description:
                      "A pessoa só aparece para os serviços que realiza.",
                  },
                  {
                    title: "4. Folgas e conflitos",
                    description:
                      "Ausências e agendamentos existentes retiram os slots da oferta.",
                  },
                ]}
              />
              <GuideScopeNote title="A agenda usa essas mesmas regras">
                O painel, o agendamento público e a IA consultam a
                disponibilidade por profissional antes de reservar.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="configurar"
              icon={CalendarClock}
              title="Configure cada profissional"
            >
              <GuideChecklist
                items={[
                  "Marque quem realmente atende e recebe agendamentos",
                  "Atribua apenas os serviços que a pessoa realiza",
                  "Escolha se ela herda o horário geral ou usa escala própria",
                  "Revise início e fim de cada dia de trabalho",
                  "Salve e teste um horário pela agenda antes de divulgar",
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Equipe → Horários do profissional",
                    action:
                      "defina dias, início, fim e abra o gerenciamento de folgas.",
                  },
                  {
                    surface: "App móvel",
                    path: "Mais → Equipe → profissional → Horários",
                    action:
                      "revise ou altere a mesma escala individual.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="folgas"
              icon={CalendarOff}
              title="Registre folgas e exceções"
            >
              <p>
                Use folga para uma ausência pontual e horário individual para a
                rotina recorrente. Assim você não precisa editar toda a semana
                por causa de férias, consulta ou compromisso isolado.
              </p>
              <GuideCallout title="Exemplo">
                Pedro trabalha de terça a sábado, das 10h às 19h. Para uma folga
                na próxima sexta, mantenha a escala semanal e bloqueie apenas o
                intervalo da ausência.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="revisar"
              icon={Users}
              title="Revise capacidade sem inventar rodízio"
            >
              <p>
                Consulte agenda e horários de pico para decidir quando precisa de
                reforço. Se o cliente escolher “qualquer profissional”, o Flowo
                reserva alguém elegível e livre.
              </p>
              <GuideScopeNote
                status="practice"
                title="Distribuição justa exige uma regra de gestão"
              >
                Hoje o produto não distribui automaticamente por fila, meta,
                comissão ou menor número de clientes. Se essa regra for
                importante, defina-a com a equipe e acompanhe a agenda.
              </GuideScopeNote>
              <GuideChecklist
                items={[
                  "Compare demanda por dia e hora",
                  "Confira folgas antes de abrir horários extras",
                  "Evite anunciar capacidade que ainda não foi salva",
                  "Revise a escala após férias, contratação ou mudança de serviço",
                ]}
              />
            </GuideSection>
          </article>

          <GuideCta
            title="Cada profissional tem uma rotina diferente?"
            description="Use um plano com equipe e configure a disponibilidade individual no painel web ou app móvel."
          />

          <GuidePrevNext
            next={{
              href: "/recursos/guias/controle-financeiro-barbearia",
              label: "Controle Financeiro",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
