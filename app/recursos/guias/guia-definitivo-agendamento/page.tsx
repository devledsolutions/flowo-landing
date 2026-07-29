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
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guia de Agendamento para Barbearias",
  description:
    "Configure horários gerais e individuais, agenda, confirmação e pagamento pós-atendimento no Flowo.",
  path: "/recursos/guias/guia-definitivo-agendamento",
});

const tableOfContents = [
  { id: "base", label: "Monte a base da agenda" },
  { id: "horarios", label: "Configure barbearia e profissionais" },
  { id: "lembretes", label: "Entenda lembretes e confirmação" },
  { id: "nao-confirmou", label: "O que acontece quando não há resposta" },
  { id: "pagamento", label: "Feche e receba depois do serviço" },
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
            title="Guia de agendamento para barbearias"
            lead="Cadastre a capacidade real da barbearia, evite conflitos e use confirmações sem prometer cancelamentos automáticos que o produto não faz."
          />

          <GuideAvailability
            items={[
              {
                label: "Agenda",
                value: "Painel web e app móvel",
                description:
                  "Criação, remarcação, status, presença e no-show têm fluxos equivalentes para a operação.",
              },
              {
                label: "Horários",
                value: "Geral + individual",
                description:
                  "O horário da barbearia é o limite; cada profissional pode ter dias e faixas próprias.",
              },
              {
                label: "Mensagens",
                value: "Após conectar o WhatsApp",
                description:
                  "Lembretes, confirmação e respostas dependem de um canal ativo e de um telefone válido do cliente.",
              },
              {
                label: "Pagamento",
                value: "Somente pós-serviço",
                description:
                  "O Flowo não cobra sinal nem exige pagamento para reservar um horário.",
              },
            ]}
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection id="base" icon={Calendar} title="Monte a base da agenda">
              <p>
                Antes de abrir horários, cadastre os serviços com duração e
                preço, os profissionais que realmente atendem e quais serviços
                cada um realiza. A disponibilidade nasce dessa combinação.
              </p>
              <GuideChecklist
                items={[
                  "Serviço ativo, com duração compatível com o atendimento real",
                  "Profissional ativo e marcado como agendável",
                  "Serviço atribuído ao profissional correto",
                  "Horário geral e horário individual revisados",
                  "Folgas e ausências registradas antes de abrir a agenda",
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Serviços → Equipe → Horários",
                    action:
                      "cadastre catálogo, profissionais e funcionamento nessa ordem.",
                  },
                  {
                    surface: "App móvel",
                    path: "Mais → Serviços / Equipe / Horários",
                    action:
                      "acesse as rotas equivalentes para configurar e revisar.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="horarios"
              icon={Clock}
              title="Configure barbearia e profissionais"
            >
              <p>
                O horário geral define quando o negócio está aberto. Se um
                profissional não tiver uma configuração própria, ele herda esse
                padrão. Quando a rotina for diferente, salve dias e faixas
                individuais.
              </p>
              <GuideCards
                items={[
                  {
                    title: "Exemplo: barbearia",
                    description:
                      "Terça a sábado, das 9h às 19h. Essa é a janela máxima de atendimento.",
                  },
                  {
                    title: "Exemplo: profissional A",
                    description:
                      "Terça a sexta, das 9h às 18h. A agenda não oferece 18h30 para essa pessoa.",
                  },
                  {
                    title: "Exemplo: profissional B",
                    description:
                      "Quinta a sábado, das 11h às 19h, com uma folga registrada no próximo sábado.",
                  },
                ]}
              />
              <GuideScopeNote title="Conflitos são verificados no momento da reserva">
                A agenda consulta duração, profissional, horário, folga e
                compromissos existentes. Se duas pessoas tentarem o mesmo slot,
                a segunda recebe a informação de que ele não está mais
                disponível.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="lembretes"
              icon={Bell}
              title="Entenda lembretes e confirmação"
            >
              <p>
                Com o WhatsApp conectado, o Flowo agenda uma mensagem de
                confirmação antes do atendimento e um lembrete próximo ao
                horário. Quando a confirmação está ativada, ela substitui o
                lembrete simples de 24 horas; o lembrete de 2 horas continua.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Confirmação antecipada",
                    description:
                      "O prazo é configurável. O padrão é 24 horas antes do agendamento.",
                  },
                  {
                    title: "Lembrete final",
                    description:
                      "É programado para 2 horas antes, se o horário ainda estiver válido e a opção estiver habilitada.",
                  },
                ]}
              />
              <GuideScopeNote
                status="conditional"
                title="O envio depende do canal e do cliente"
              >
                Sem WhatsApp conectado, sem telefone válido, com opt-out ou em
                dados de teste, a mensagem não é enviada. A agenda continua
                funcionando no painel.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="nao-confirmou"
              icon={CalendarCheck}
              title="O que acontece quando não há resposta"
            >
              <p>
                Uma resposta curta como “sim” pode marcar o agendamento como
                confirmado. Porém, <strong>o silêncio não cancela nem libera o
                horário automaticamente</strong>. O compromisso permanece na
                agenda até uma ação válida de cancelamento, remarcação ou mudança
                de status.
              </p>
              <GuideCallout title="Não prometa liberação automática por falta de resposta">
                O Flowo pode acionar a lista de espera quando um horário é
                efetivamente liberado por cancelamento ou no-show. Isso é
                diferente de cancelar um cliente apenas porque ele não respondeu
                à confirmação.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="pagamento"
              icon={CreditCard}
              title="Feche e receba depois do serviço"
            >
              <p>
                Depois do atendimento, abra ou feche a comanda e registre dinheiro,
                PIX, cartão ou uma combinação permitida. Para PIX e cartão, o
                cliente pode receber um checkout vinculado à comanda já realizada.
              </p>
              <GuideScopeNote title="Agendar nunca depende de pagar">
                Não há sinal, depósito ou cobrança antecipada no Flowo. O
                pagamento pertence ao fechamento do serviço, não à reserva do
                horário.
              </GuideScopeNote>
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "Comandas",
                    action:
                      "confira os itens, feche o atendimento e escolha a forma de pagamento.",
                  },
                  {
                    surface: "App móvel",
                    path: "Comandas",
                    action:
                      "faça o fechamento, gere PIX/cartão ou registre dinheiro.",
                  },
                ]}
              />
            </GuideSection>
          </article>

          <GuideCta
            title="Quer uma agenda que respeite a rotina da equipe?"
            description="Configure serviços, profissionais e horários reais antes de abrir o agendamento aos clientes."
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
