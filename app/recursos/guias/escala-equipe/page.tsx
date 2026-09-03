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
  GuideContent,
} from "@/components/resources/guide-shell";
import { GuideStructuredData } from "@/components/resources/resource-structured-data";
import { GuideAppScreen, GuideHonesty } from "@/app/recursos/_components/guide-media";
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/escala-equipe");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "camadas", label: "As quatro camadas do horário livre" },
  { id: "configurar", label: "Configure cada barbeiro" },
  { id: "folgas", label: "Registre folgas e exceções" },
  { id: "revisar", label: "Revise a capacidade sem inventar rodízio" },
];

export default function TeamScheduleGuidePage() {
  return (
    <>
      <GuideStructuredData guide={guide} />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <GuidePage>
          <GuideHeader
            crumbs={[
              { label: "Início", href: "/" },
              { label: "Recursos", href: "/recursos" },
              { label: "Guias", href: "/recursos/guias" },
              { label: "Escala de Equipe", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Escala de equipe sem horário duplicado"
            lead="O horário da barbearia é o limite. Cada barbeiro tem a própria rotina. A Flowo aplica isso na agenda, mas não cria rodízio sozinha."
            updatedAt="3 de setembro de 2026"
          />

          <GuideAvailability
            items={[
              {
                label: "Planos",
                value: "Equipe e Empresarial",
                description: "Mais de um barbeiro ativo pede um plano de equipe.",
              },
              {
                label: "Onde configurar",
                value: "Painel e app",
                description: "Horário da barbearia, escala de cada barbeiro e folgas nos dois.",
              },
              {
                label: "Horário livre",
                value: "Calculado por barbeiro",
                description: "Serviço, horário, folga e conflito são checados antes de mostrar uma vaga.",
              },
              {
                label: "Distribuição",
                value: "Sem rodízio automático",
                description: "“Qualquer barbeiro” acha alguém apto e livre. Não equilibra meta ou faturamento.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="camadas" icon={ListChecks} title="As quatro camadas do horário livre">
              <GuideCards
                items={[
                  {
                    title: "1. Horário da barbearia",
                    description: "A janela máxima. Ninguém recebe horário fora dela.",
                  },
                  {
                    title: "2. Horário do barbeiro",
                    description: "Herda o da barbearia ou limita dias e faixas próprias.",
                  },
                  {
                    title: "3. Serviços que ele faz",
                    description: "O barbeiro só aparece para os serviços dele.",
                  },
                  {
                    title: "4. Folgas e conflitos",
                    description: "Ausências e horários já marcados saem da oferta.",
                  },
                ]}
              />
              <GuideAppScreen
                src="/images/product/app-agenda.png"
                alt="Agenda do app da Flowo no celular, com uma coluna por barbeiro e os espaços livres de cada um"
              />
              <GuideScopeNote title="A agenda inteira usa as mesmas regras">
                Painel, página de agendamento e a Flowo no WhatsApp consultam o horário livre de
                cada barbeiro antes de reservar.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="configurar" icon={CalendarClock} title="Configure cada barbeiro">
              <GuideChecklist
                items={[
                  "Marque quem atende e recebe agendamento",
                  "Ligue só os serviços que a pessoa faz",
                  "Escolha se ela herda o horário da barbearia ou tem escala própria",
                  "Revise início e fim de cada dia",
                  "Salve e teste um horário na agenda antes de divulgar",
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Equipe → Horários do barbeiro",
                    action: "defina dias, início e fim, e abra as folgas.",
                  },
                  {
                    surface: "App",
                    path: "Mais → Equipe → barbeiro → Horários",
                    action: "a mesma escala, no celular.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="folgas" icon={CalendarOff} title="Registre folgas e exceções">
              <p>
                Folga é para ausência pontual. Horário próprio é para a rotina. Assim você não
                edita a semana inteira por causa de férias, consulta ou compromisso.
              </p>
              <GuideCallout title="Exemplo">
                Pedro trabalha de terça a sábado, das 10h às 19h. Para uma folga na próxima
                sexta, mantenha a escala e bloqueie só aquele dia.
              </GuideCallout>
            </GuideSection>

            <GuideSection id="revisar" icon={Users} title="Revise a capacidade sem inventar rodízio">
              <p>
                Olhe a agenda e os horários de pico para decidir quando precisa de reforço. Se o
                cliente escolher “qualquer barbeiro”, a Flowo reserva com alguém apto e livre.
              </p>
              <GuideScopeNote status="practice" title="Distribuição justa é regra de gestão">
                Hoje a Flowo não distribui por fila, meta, comissão ou menos clientes. Se essa
                regra importa, combine com a equipe e acompanhe pela agenda.
              </GuideScopeNote>
              <GuideChecklist
                items={[
                  "Compare a procura por dia e hora",
                  "Confira folgas antes de abrir horário extra",
                  "Não anuncie horário que ainda não foi salvo",
                  "Revise a escala depois de férias, contratação ou serviço novo",
                ]}
              />
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "A Flowo oferecer no WhatsApp só os horários livres do barbeiro pedido: testado em produção com números de teste da própria Flowo, em 26 de julho de 2026.",
              "Horário por barbeiro, folgas e escolha de “qualquer barbeiro”: conferidos no produto em 3 de setembro de 2026.",
            ]}
            notMeasured={["Quanto a escala na Flowo reduz conflito de horário em barbearias reais."]}
          />

          <GuideCta
            title="Cada barbeiro tem uma rotina diferente?"
            description="Use um plano com equipe e configure o horário de cada um no painel ou no app."
          />

          <GuidePrevNext
            currentPath={guide.path}
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
