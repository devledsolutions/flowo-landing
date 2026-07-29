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
  GuideChatSample,
  GuideChecklist,
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideProductPath,
  GuideScopeNote,
  GuideSection,
  GuideSteps,
  GuideToc,
} from "@/components/resources/guide-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Configurando o WhatsApp com IA",
  description:
    "Entenda a ativação oficial do WhatsApp no Flowo, o nome público, os estados de conexão e o que a IA faz depois da aprovação.",
  path: "/recursos/guias/configurando-whatsapp",
});

const tableOfContents = [
  { id: "antes", label: "O que preparar antes da ativação" },
  { id: "ativacao", label: "Como funciona a ativação" },
  { id: "nome-publico", label: "Nome público e aprovação" },
  { id: "ia", label: "O que a IA faz quando o canal está ativo" },
  { id: "controle", label: "Personalização e controle humano" },
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
            readTime="9 min"
            title="Configurando o WhatsApp com IA"
            lead="A integração usa o canal oficial do WhatsApp Business. A IA só começa a atender depois que o número aparece como conectado e pronto no Flowo."
          />

          <GuideAvailability
            items={[
              {
                label: "Configuração",
                value: "Painel web e app móvel",
                description:
                  "O app inicia os handoffs seguros e reflete o estado; etapas hospedadas pelo WhatsApp podem abrir fora do app.",
              },
              {
                label: "Ativação",
                value: "Sujeita à aprovação do WhatsApp",
                description:
                  "Número, conta e nome público podem permanecer em análise antes de receber mensagens reais.",
              },
              {
                label: "IA",
                value: "Somente com canal conectado",
                description:
                  "Agenda, remarcação, cancelamento e respostas usam os dados do negócio já cadastrados.",
              },
              {
                label: "Controle",
                value: "Pausa e atendimento humano",
                description:
                  "A equipe pode assumir uma conversa; enquanto a IA estiver pausada, ela não responde.",
              },
            ]}
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="antes"
              icon={Smartphone}
              title="O que preparar antes da ativação"
            >
              <p>
                A integração precisa representar uma empresa real. Separe o
                número que será usado no atendimento e confirme que o nome
                público pode ser comprovado fora do Flowo.
              </p>
              <GuideChecklist
                items={[
                  "Número sob controle da barbearia e apto a receber a verificação",
                  "Nome comercial visível em site, perfil social, fachada ou documento",
                  "Serviços, preços, profissionais e horários revisados no Flowo",
                  "Responsável autorizado para concluir as etapas da conta comercial",
                ]}
              />
              <GuideCallout>
                <span className="flex items-start gap-3">
                  <AlertTriangle
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-ink"
                    aria-hidden="true"
                  />
                  <span>
                    <strong>Nome interno não é nome público.</strong> O nome do
                    tenant ou de um ambiente de teste não deve ser enviado
                    automaticamente para revisão no WhatsApp.
                  </span>
                </span>
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="ativacao"
              icon={MessageCircle}
              title="Como funciona a ativação"
            >
              <GuideSteps
                items={[
                  {
                    title: "Abra WhatsApp no Flowo",
                    description:
                      "No painel web, use a área WhatsApp. No app móvel, acesse Mais → WhatsApp.",
                  },
                  {
                    title: "Conclua as etapas oficiais",
                    description:
                      "Autorize a conta comercial, escolha o número e confirme as informações solicitadas no fluxo seguro.",
                  },
                  {
                    title: "Aguarde o estado conectado",
                    description:
                      "“Em análise” ou “pendente” ainda não significa que a IA pode receber e enviar mensagens reais.",
                  },
                  {
                    title: "Faça um teste controlado",
                    description:
                      "Quando estiver conectado, envie uma mensagem de um telefone autorizado e confira a conversa no Flowo.",
                  },
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel web",
                    path: "WhatsApp",
                    action:
                      "veja conexão, qualidade, automação e controles de lembrete.",
                  },
                  {
                    surface: "App móvel",
                    path: "Mais → WhatsApp",
                    action:
                      "acompanhe o estado e use o handoff seguro de ativação.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection
              id="nome-publico"
              icon={Settings}
              title="Nome público e aprovação"
            >
              <p>
                O nome exibido no WhatsApp é revisado separadamente. Ele deve
                identificar a empresa que o cliente reconhece e ser coerente com
                a presença pública da marca.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Bom exemplo",
                    description:
                      "O nome comercial usado no site, Instagram, fachada e atendimento.",
                  },
                  {
                    title: "Evite",
                    description:
                      "“Teste”, “validação”, nomes de fornecedores, descrições do ambiente ou termos que não aparecem publicamente.",
                  },
                ]}
              />
              <GuideScopeNote
                status="conditional"
                title="Rejeição de nome não derruba o restante do cadastro"
              >
                Corrija o nome com evidência pública e reenvie. Não altere o nome
                interno da barbearia apenas para tentar contornar a revisão.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="ia"
              icon={Bot}
              title="O que a IA faz quando o canal está ativo"
            >
              <GuideCards
                items={[
                  {
                    title: "Responde serviços, preços e horários",
                    description:
                      "Usa o catálogo, a equipe e a disponibilidade cadastrados no Flowo.",
                  },
                  {
                    title: "Agenda, remarca e cancela",
                    description:
                      "Executa a ação no sistema e só confirma sucesso quando a gravação realmente ocorreu.",
                  },
                  {
                    title: "Entende confirmações",
                    description:
                      "Uma resposta curta à mensagem de confirmação pode atualizar o agendamento sem depender da IA.",
                  },
                  {
                    title: "Encaminha para a equipe",
                    description:
                      "Casos que pedem intervenção humana podem ser assumidos na caixa de conversas.",
                  },
                ]}
              />
              <GuideChatSample
                customer="Quero corte amanhã depois das 15h, pode ser com qualquer profissional"
                reply="Tenho estes horários disponíveis amanhã: 15h30, 16h e 17h. Qual fica melhor para você?"
              />
              <GuideScopeNote
                status="conditional"
                title="Lembretes e mensagens também dependem da conexão"
              >
                A lógica pode estar configurada, mas nenhum envio pelo WhatsApp
                ocorre se o canal estiver desconectado, o cliente não tiver
                telefone válido ou tiver optado por não receber mensagens.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="controle"
              icon={Zap}
              title="Personalização e controle humano"
            >
              <p>
                Em Configurações, ajuste o tom de voz e mantenha os dados do
                negócio atualizados. A personalização não substitui catálogo,
                agenda ou políticas: a IA responde com base nessas fontes.
              </p>
              <GuideChecklist
                items={[
                  "Escolha um tom coerente com a barbearia",
                  "Revise preços e duração sempre que o catálogo mudar",
                  "Mantenha horários individuais e folgas atualizados",
                  "Assuma a conversa quando o caso exigir decisão humana",
                  "Retome a IA somente depois de concluir o atendimento manual",
                ]}
              />
              <GuideScopeNote title="A pausa humana é respeitada">
                Quando a equipe assume uma conversa, a IA não deve competir com
                a resposta humana. O retorno à automação é uma decisão explícita.
              </GuideScopeNote>
            </GuideSection>
          </article>

          <GuideCta
            title="Prepare seu WhatsApp para operar com dados reais"
            description="Cadastre a barbearia, conecte o número oficial e só então valide a IA com uma conversa controlada."
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
