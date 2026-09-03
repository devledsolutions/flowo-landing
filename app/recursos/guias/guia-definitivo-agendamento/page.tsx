import { Bell, Calendar, CalendarCheck, Clock, CreditCard } from "lucide-react";
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
import { GuideHonesty, GuideScreenshot } from "@/app/recursos/_components/guide-media";
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/guia-definitivo-agendamento");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "base", label: "Monte a base da agenda" },
  { id: "horarios", label: "Horário da barbearia e de cada barbeiro" },
  { id: "lembretes", label: "Confirmação e lembrete" },
  { id: "nao-confirmou", label: "Quando o cliente não responde" },
  { id: "pagamento", label: "Receba depois do corte" },
];

export default function SchedulingGuidePage() {
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
              { label: "Agendamento", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Guia de agendamento para barbearias"
            lead="Cadastre o que a barbearia atende de verdade, evite horário duplicado e use a confirmação sem prometer cancelamento automático."
            updatedAt="3 de setembro de 2026"
          />

          <GuideAvailability
            items={[
              {
                label: "Agenda",
                value: "Painel e app",
                description: "Criar, remarcar, marcar presença e falta funcionam nos dois.",
              },
              {
                label: "Horários",
                value: "Da barbearia e de cada barbeiro",
                description: "O horário da barbearia é o limite. Cada barbeiro pode ter dias e faixas próprias.",
              },
              {
                label: "Mensagens",
                value: "Depois de conectar o WhatsApp",
                description: "Lembrete e confirmação precisam de número conectado e telefone válido do cliente.",
              },
              {
                label: "Pagamento",
                value: "Só depois do serviço",
                description: "A Flowo não cobra sinal nem exige pagamento para reservar.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="base" icon={Calendar} title="Monte a base da agenda">
              <p>
                Antes de abrir horários, cadastre os serviços com duração e preço. Depois, os
                barbeiros que atendem e o que cada um faz. A agenda nasce dessa combinação.
              </p>
              <GuideChecklist
                items={[
                  "Serviço ativo, com a duração real do atendimento",
                  "Barbeiro ativo e marcado como agendável",
                  "Serviço ligado ao barbeiro certo",
                  "Horário da barbearia e de cada barbeiro revisados",
                  "Folgas registradas antes de abrir a agenda",
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Serviços → Equipe → Horários",
                    action: "cadastre nessa ordem: catálogo, equipe e funcionamento.",
                  },
                  {
                    surface: "App",
                    path: "Mais → Serviços / Equipe / Horários",
                    action: "as mesmas telas, no celular.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="horarios" icon={Clock} title="Horário da barbearia e de cada barbeiro">
              <p>
                O horário da barbearia diz quando ela abre. Um barbeiro sem horário próprio
                herda esse padrão. Quando a rotina é diferente, salve dias e faixas individuais.
              </p>
              <GuideScreenshot
                src="/images/product/dashboard-agenda.png"
                alt="Tela Agenda da Flowo: uma coluna por barbeiro no dia, com horários ocupados, um vago não preenchido e o total previsto"
              />
              <GuideCards
                items={[
                  {
                    title: "Exemplo: barbearia",
                    description: "Terça a sábado, das 9h às 19h. Ninguém recebe horário fora disso.",
                  },
                  {
                    title: "Exemplo: barbeiro A",
                    description: "Terça a sexta, das 9h às 18h. A agenda não oferece 18h30 para ele.",
                  },
                  {
                    title: "Exemplo: barbeiro B",
                    description: "Quinta a sábado, das 11h às 19h, com folga no próximo sábado.",
                  },
                ]}
              />
              <GuideScopeNote title="O conflito é checado na hora da reserva">
                A agenda olha duração, barbeiro, horário, folga e o que já está marcado. Se duas
                pessoas tentarem o mesmo horário, a segunda recebe a resposta de que ele já foi.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="lembretes" icon={Bell} title="Confirmação e lembrete">
              <p>
                Com o WhatsApp conectado, a Flowo manda um pedido de confirmação antes do
                atendimento e um lembrete perto da hora. Com a confirmação ligada, ela substitui
                o lembrete de 24 horas. O de 2 horas continua.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Confirmação",
                    description: "O prazo é ajustável. O padrão é 24 horas antes do horário.",
                  },
                  {
                    title: "Lembrete final",
                    description: "Sai 2 horas antes, se o horário ainda vale e a opção está ligada.",
                  },
                ]}
              />
              <GuideScopeNote status="conditional" title="O envio depende do número e do cliente">
                Sem WhatsApp conectado, sem telefone válido ou com pedido para não receber
                mensagens, nada é enviado. A agenda continua funcionando no painel.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="nao-confirmou" icon={CalendarCheck} title="Quando o cliente não responde">
              <p>
                Um “sim” marca o horário como confirmado. Mas{" "}
                <strong>o silêncio não cancela nem libera a cadeira</strong>. O horário fica na
                agenda até alguém cancelar, remarcar ou mudar o status.
              </p>
              <GuideCallout title="Não prometa cadeira liberada por falta de resposta">
                A Flowo chama a lista de espera quando um horário é cancelado ou vira falta.
                Isso é diferente de cancelar um cliente porque ele não respondeu.
              </GuideCallout>
            </GuideSection>

            <GuideSection id="pagamento" icon={CreditCard} title="Receba depois do corte">
              <p>
                No fim do atendimento, feche a comanda e registre dinheiro, maquininha, PIX ou
                cartão. Para PIX e cartão pela Flowo, o cliente recebe uma cobrança ligada à
                comanda.
              </p>
              <GuideScopeNote title="Agendar nunca depende de pagar">
                Não há sinal, depósito nem cobrança antecipada. O pagamento é do fechamento do
                serviço, não da reserva.
              </GuideScopeNote>
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Comandas",
                    action: "confira os itens, feche e escolha como receber.",
                  },
                  {
                    surface: "App",
                    path: "Comandas",
                    action: "feche, gere PIX ou cartão, ou registre dinheiro.",
                  },
                ]}
              />
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "Agendar, remarcar e cancelar pelo WhatsApp com a agenda mudando junto: testado em produção com números de teste da própria Flowo, em 26 de julho de 2026.",
              "Prazos de 24 horas e 2 horas e a regra de não cancelar por silêncio: conferidos no produto em 3 de setembro de 2026.",
            ]}
            notMeasured={[
              "Quantos horários duplicados a agenda evita numa barbearia real.",
              "Tempo economizado pela equipe.",
            ]}
          />

          <GuideCta
            title="Quer uma agenda que respeite a rotina da equipe?"
            description="Cadastre serviços, barbeiros e horários reais antes de abrir a agenda para os clientes."
          />

          <GuidePrevNext
            currentPath={guide.path}
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
