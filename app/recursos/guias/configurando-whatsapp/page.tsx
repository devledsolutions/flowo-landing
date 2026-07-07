import {
  AlertTriangle,
  Bot,
  MessageCircle,
  Settings,
  Smartphone,
  Zap,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideCallout,
  GuideCards,
  GuideChatSample,
  GuideChecklist,
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideSection,
  GuideSteps,
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Configurando o WhatsApp com IA",
  description:
    "Conecte seu número ao Flowo e deixe a IA responder clientes, verificar horários e agendar pelo WhatsApp, a qualquer hora do dia.",
  path: "/recursos/guias/configurando-whatsapp",
});

const tableOfContents = [
  { id: "por-que-whatsapp", label: "Por que integrar com WhatsApp" },
  { id: "conectando", label: "Conectando seu número" },
  { id: "o-que-ia-faz", label: "O que a IA faz automaticamente" },
  { id: "personalizando", label: "Personalizando respostas" },
  { id: "dicas-sucesso", label: "Dicas para melhor resultado" },
];

export default function WhatsAppSetupGuidePage() {
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
              { label: "Configurando WhatsApp", href: "#" },
            ]}
            readTime="8 min"
            title={
              <>
                Configurando o WhatsApp com{" "}
                <em className="font-serif font-medium italic">IA</em>
              </>
            }
            lead="Transforme seu WhatsApp em um assistente que responde clientes, agenda e confirma, mesmo quando você está de tesoura na mão."
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="por-que-whatsapp"
              icon={MessageCircle}
              title="Por que integrar com WhatsApp"
            >
              <p>
                Seus clientes já estão no WhatsApp. É onde eles se sentem
                confortáveis para conversar, pedir informações e agendar. O
                problema? Você não pode ficar respondendo mensagem o dia todo.
              </p>
              <p>
                Com a IA do Flowo, as mensagens são respondidas na hora, de dia
                ou de madrugada, enquanto você atende o cliente da cadeira. A
                barbearia para de perder agendamento por demora na resposta.
              </p>
            </GuideSection>

            <GuideSection
              id="conectando"
              icon={Smartphone}
              title="Conectando seu número"
            >
              <p>
                A conexão usa a API oficial do WhatsApp Business e é guiada
                dentro do Flowo:
              </p>
              <GuideSteps
                items={[
                  {
                    title: "Acesse Configurações no Flowo",
                    description: "Vá em Integrações e escolha WhatsApp.",
                  },
                  {
                    title: "Siga a ativação guiada",
                    description:
                      "Você conecta o número da barbearia pela integração oficial do WhatsApp Business, passo a passo.",
                  },
                  {
                    title: "Pronto! IA conectada",
                    description:
                      "A IA começa a responder e agendar pelos seus horários cadastrados.",
                  },
                ]}
              />
              <GuideCallout>
                <span className="flex items-start gap-3">
                  <AlertTriangle
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-ink"
                    aria-hidden="true"
                  />
                  <span>
                    <strong>Use um número dedicado para a barbearia.</strong>{" "}
                    Recomendamos um número exclusivo do negócio, não o seu
                    número pessoal.
                  </span>
                </span>
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="o-que-ia-faz"
              icon={Bot}
              title="O que a IA faz automaticamente"
            >
              <p>
                A IA do Flowo foi treinada para barbearias e sabe lidar com as
                situações mais comuns:
              </p>
              <GuideCards
                items={[
                  {
                    title: "Responde perguntas sobre serviços e preços",
                    description:
                      "Quanto custa o corte? Tem barboterapia? A IA responde com base nos seus serviços cadastrados.",
                  },
                  {
                    title: "Verifica disponibilidade de horários",
                    description:
                      "Consulta a agenda em tempo real e mostra os horários livres para o cliente.",
                  },
                  {
                    title: "Agenda automaticamente",
                    description:
                      "Quando o cliente escolhe um horário, a IA reserva e confirma.",
                  },
                  {
                    title: "Envia lembretes automáticos",
                    description:
                      "Lembra o cliente 24h e 2h antes do horário marcado.",
                  },
                  {
                    title: "Processa cancelamentos e reagendamentos",
                    description:
                      "O cliente pode cancelar ou remarcar direto pelo WhatsApp.",
                  },
                ]}
              />
              <GuideChatSample
                customer="Opa, quero marcar um corte pra amanhã"
                reply="Opa! Vou ver os horários de amanhã pra você. Qual barbeiro você prefere: João, Pedro ou qualquer um que tiver disponível?"
              />
            </GuideSection>

            <GuideSection
              id="personalizando"
              icon={Settings}
              title="Personalizando as respostas"
            >
              <p>A IA se adapta ao estilo da sua barbearia. Você configura:</p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Tom da conversa",
                    description:
                      "Mais formal ou descontraído, com o jeito de falar da sua região.",
                  },
                  {
                    title: "Informações da casa",
                    description:
                      "Promoções, novidades e regras específicas da sua barbearia.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="dicas-sucesso"
              icon={Zap}
              title="Dicas para melhor resultado"
            >
              <GuideChecklist
                items={[
                  "Mantenha seus serviços e preços sempre atualizados no Flowo",
                  "Configure os horários de funcionamento corretos",
                  "Responda manualmente só os casos complexos: a IA avisa quando não consegue resolver",
                  "Avise seus clientes que agora eles podem agendar pelo WhatsApp a qualquer hora",
                ]}
              />
            </GuideSection>
          </article>

          <GuideCta
            title="Experimente a IA do Flowo no WhatsApp"
            description="Configure em poucos minutos e deixe a IA cuidar das mensagens enquanto você cuida do corte."
          />

          <GuidePrevNext
            prev={{
              href: "/recursos/guias/pagamentos-pix",
              label: "Pagamentos PIX",
            }}
            next={{
              href: "/recursos/guias/reduzindo-faltas",
              label: "Reduzindo Faltas",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
