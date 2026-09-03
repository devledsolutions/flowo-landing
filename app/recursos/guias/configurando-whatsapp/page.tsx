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
  GuideSteps,
  GuideContent,
} from "@/components/resources/guide-shell";
import { GuideStructuredData } from "@/components/resources/resource-structured-data";
import type { ChatMessage } from "@/components/home/whatsapp-chat";
import { GuideHonesty, GuideScreenshot, GuideWhatsApp } from "@/app/recursos/_components/guide-media";
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/configurando-whatsapp");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "antes", label: "O que preparar antes de ligar" },
  { id: "ativacao", label: "Como ligar o WhatsApp" },
  { id: "nome-publico", label: "Nome público e aprovação" },
  { id: "ia", label: "O que a Flowo faz no seu WhatsApp" },
  { id: "controle", label: "Tom de voz e quando você assume" },
];

const conversation: ChatMessage[] = [
  { from: "cliente", text: "Quero corte amanhã depois das 15h, pode ser com qualquer barbeiro", at: "11:20" },
  {
    from: "flowo",
    text: "Tenho amanhã às 15:30 com o Rafael, 16:00 com o Luiz e 17:00 com o Rafael. Qual fica melhor?",
    at: "11:20",
  },
  { from: "cliente", text: "16:00", at: "11:21" },
  {
    from: "flowo",
    text: "Agendado. Corte amanhã às 16:00 com o Luiz, 30 min, R$ 35. Se precisar remarcar, é só me chamar aqui.",
    at: "11:21",
  },
];

export default function WhatsAppSetupGuidePage() {
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
              { label: "Configurando WhatsApp", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Como ligar a Flowo no WhatsApp da barbearia"
            lead="A Flowo usa o WhatsApp Business oficial. Ela só começa a responder depois que o número aparece como conectado no painel."
            updatedAt="3 de setembro de 2026"
          />

          <GuideAvailability
            items={[
              {
                label: "Onde configurar",
                value: "Painel e app",
                description: "Algumas etapas abrem numa tela do próprio WhatsApp e voltam para a Flowo no fim.",
              },
              {
                label: "Aprovação",
                value: "Depende do WhatsApp",
                description: "Número, conta e nome público podem ficar em análise antes de receber mensagens.",
              },
              {
                label: "Atendimento",
                value: "Só com o número conectado",
                description: "A Flowo responde com os serviços, a equipe e os horários que você cadastrou.",
              },
              {
                label: "Controle",
                value: "Você assume quando quiser",
                description: "Enquanto alguém da equipe está na conversa, a Flowo fica em espera.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="antes" icon={Smartphone} title="O que preparar antes de ligar">
              <p>
                O WhatsApp exige uma empresa real por trás do número. Separe o número que vai
                atender e confira se o nome da barbearia aparece em algum lugar público.
              </p>
              <GuideChecklist
                items={[
                  "Número da barbearia, com o chip em mãos para receber o código",
                  "Nome da barbearia visível na fachada, no Instagram ou no site",
                  "Serviços, preços, equipe e horários revisados na Flowo",
                  "Uma pessoa autorizada para concluir a conta comercial",
                ]}
              />
              <GuideCallout>
                <span className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-ink" aria-hidden="true" />
                  <span>
                    <strong>Nome interno não é nome público.</strong> O nome que você usa por
                    dentro, ou de um número de teste, não deve ir para a revisão do WhatsApp.
                  </span>
                </span>
              </GuideCallout>
            </GuideSection>

            <GuideSection id="ativacao" icon={MessageCircle} title="Como ligar o WhatsApp">
              <GuideSteps
                items={[
                  {
                    title: "Abra WhatsApp na Flowo",
                    description: "No painel, entre em WhatsApp. No app, vá em Mais → WhatsApp.",
                  },
                  {
                    title: "Conclua as etapas do WhatsApp",
                    description: "Autorize a conta comercial, escolha o número e confirme os dados pedidos.",
                  },
                  {
                    title: "Espere aparecer “conectado”",
                    description: "“Em análise” ou “pendente” ainda não recebe nem envia mensagem.",
                  },
                  {
                    title: "Mande uma mensagem de teste",
                    description: "Quando conectar, escreva de outro celular e veja a conversa aparecer na Flowo.",
                  },
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "WhatsApp",
                    action: "veja se está conectado, ligue o atendimento e os lembretes.",
                  },
                  {
                    surface: "App",
                    path: "Mais → WhatsApp",
                    action: "acompanhe o estado e conclua a ativação.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="nome-publico" icon={Settings} title="Nome público e aprovação">
              <p>
                O nome que aparece para o cliente passa por uma revisão separada. Ele precisa
                ser o nome que o cliente reconhece.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Bom exemplo",
                    description: "O mesmo nome do site, do Instagram, da fachada e do atendimento.",
                  },
                  {
                    title: "Evite",
                    description: "“Teste”, “demo”, apelidos internos ou qualquer nome que não aparece em lugar público.",
                  },
                ]}
              />
              <GuideScopeNote status="conditional" title="Nome recusado não derruba o resto">
                Corrija o nome com base em algo público (site, fachada ou CNPJ) e envie de novo.
                Não mude o nome interno da barbearia só para passar na revisão.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="ia" icon={Bot} title="O que a Flowo faz no seu WhatsApp">
              <GuideCards
                items={[
                  {
                    title: "Responde serviço, preço e horário",
                    description: "Usa o que você cadastrou: serviços, equipe e horários livres.",
                  },
                  {
                    title: "Agenda, remarca e cancela",
                    description: "Só diz “agendado” depois que o horário entrou na agenda de verdade.",
                  },
                  {
                    title: "Entende o “sim” da confirmação",
                    description: "Uma resposta curta à mensagem de confirmação já atualiza o horário.",
                  },
                  {
                    title: "Passa para a equipe",
                    description: "O que ela não deve decidir, como desconto, vai para vocês com o histórico.",
                  },
                ]}
              />
              <GuideWhatsApp messages={conversation} />
              <GuideScopeNote status="conditional" title="Lembretes também dependem da conexão">
                Sem número conectado, sem telefone válido do cliente ou com pedido para não
                receber mensagens, nada é enviado.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="controle" icon={Zap} title="Tom de voz e quando você assume">
              <p>
                Em Configurações, ajuste o tom de voz e mantenha os dados da barbearia em dia. A
                Flowo responde com base no catálogo, na agenda e nas suas regras.
              </p>
              <GuideScreenshot
                src="/images/product/dashboard-conversas.png"
                alt="Tela Conversas da Flowo: lista de conversas do WhatsApp, uma delas transferida para a equipe, com o botão Assumir conversa"
              />
              <GuideChecklist
                items={[
                  "Escolha um tom parecido com o da barbearia",
                  "Revise preço e duração sempre que o catálogo mudar",
                  "Mantenha horários e folgas de cada barbeiro em dia",
                  "Assuma a conversa quando o caso pedir uma decisão sua",
                  "Devolva para a Flowo só depois de terminar o atendimento",
                ]}
              />
              <GuideScopeNote title="Quando você está na conversa, a Flowo espera">
                Ela não responde por cima da equipe. Voltar para o atendimento automático é uma
                escolha sua.
              </GuideScopeNote>
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "Atender, agendar, remarcar e cancelar pelo WhatsApp: testado em produção com números de teste da própria Flowo, em 26 de julho de 2026.",
              "A equipe assumir a conversa e a Flowo esperar: mesmo teste.",
            ]}
            notMeasured={[
              "Tempo que a equipe deixa de gastar no WhatsApp.",
              "Quantos clientes a mais agendam por conta do atendimento automático.",
            ]}
          />

          <GuideCta
            title="Ligue o WhatsApp e veja a Flowo responder"
            description="Cadastre a barbearia, conecte o número e faça uma conversa de teste antes de divulgar."
          />

          <GuidePrevNext
            currentPath={guide.path}
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
