import Link from "next/link";
import {
  BadgeDollarSign,
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  Scale,
  Search,
  Smartphone,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  GuideCallout,
  GuideCards,
  GuideChecklist,
  GuideContent,
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideScopeNote,
  GuideSection,
} from "@/components/resources/guide-shell";
import { GuideStructuredData } from "@/components/resources/resource-structured-data";
import { getGuide } from "@/data/guides";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/melhor-sistema-para-barbearia");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "resposta", label: "Qual é o melhor sistema" },
  { id: "criterios", label: "Os 7 critérios que importam" },
  { id: "canais", label: "WhatsApp, link ou aplicativo" },
  { id: "equipe", label: "Agenda por profissional" },
  { id: "preco", label: "Preço real do pacote" },
  { id: "comparar", label: "Compare as opções" },
  { id: "teste", label: "Teste antes de decidir" },
];

const decisionRows = [
  {
    need: "Atender e agendar no WhatsApp",
    inspect: "Se a conversa consulta a agenda real ou apenas envia um link.",
  },
  {
    need: "Equipe com horários diferentes",
    inspect: "Dias, turnos, folgas, serviços e duração por profissional.",
  },
  {
    need: "Aplicativo com a marca da barbearia",
    inspect: "Publicação nas lojas, prazo, manutenção e custo do app próprio.",
  },
  {
    need: "Clube de assinaturas",
    inspect: "Cobrança recorrente, inadimplência, limites e repasse.",
  },
  {
    need: "Financeiro e comissão",
    inspect: "O que é automático, o que exige revisão e quais módulos são extras.",
  },
  {
    need: "Implantação rápida",
    inspect: "Migração de clientes, configuração do canal e suporte após a venda.",
  },
];

export default function BestBarbershopSystemGuidePage() {
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
              { label: "Como escolher", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Melhor sistema para barbearia: como escolher sem cair na lista de recursos"
            lead="Não existe uma plataforma melhor para toda barbearia. Existe a que resolve o seu gargalo, respeita a rotina da equipe e cabe no custo total que você pretende assumir."
            updatedAt="31 de julho de 2026"
          />

          <GuideContent items={tableOfContents}>
            <GuideSection
              id="resposta"
              icon={Scale}
              title="Qual é o melhor sistema para barbearia?"
            >
              <p>
                A resposta depende de onde o atendimento começa e de como a
                barbearia opera. Se os clientes já pedem horário pelo WhatsApp,
                uma recepção conectada à agenda pode eliminar a consulta manual.
                Se o objetivo é oferecer um aplicativo com a própria marca, uma
                plataforma centrada em app pode ser mais adequada. Se preço é a
                prioridade absoluta, há opções gratuitas e planos-base menores.
              </p>
              <GuideCallout title="Comece pelo gargalo, não pelo logotipo">
                Anote as três tarefas que mais tomam tempo ou geram erro hoje.
                Depois avalie cada sistema executando essas tarefas do início ao
                fim. Uma lista com cinquenta recursos não prova que o fluxo
                principal funciona bem.
              </GuideCallout>
            </GuideSection>

            <GuideSection
              id="criterios"
              icon={Search}
              title="Os 7 critérios que realmente mudam a decisão"
            >
              <GuideChecklist
                items={[
                  "Canal: WhatsApp, link, aplicativo ou uma combinação clara",
                  "Agenda: disponibilidade real por profissional e por serviço",
                  "Equipe: permissões, comissão, folgas e acesso no celular",
                  "Operação: comanda, clientes, caixa, estoque e relatórios necessários",
                  "Relacionamento: confirmação, lembrete, retorno e consentimento",
                  "Implantação: migração, configuração, treinamento e suporte",
                  "Custo total: plano, usuários, módulos, mensagens, pagamentos e equipamentos",
                ]}
              />
              <GuideScopeNote status="practice" title="Dê peso diferente a cada critério">
                Uma barbearia de uma cadeira não deve avaliar multi-unidades com o
                mesmo peso de agenda e preço. Uma rede não deve escolher somente
                pelo menor plano inicial. Defina o que é obrigatório, desejável e
                dispensável antes da demonstração.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection
              id="canais"
              icon={MessageCircle}
              title="WhatsApp, link ou aplicativo: o canal muda a conversão"
            >
              <GuideCards
                items={[
                  {
                    title: "WhatsApp com agenda conectada",
                    description:
                      "O cliente conversa no canal que já usa. Confirme se a automação entende o pedido, consulta disponibilidade e conclui o agendamento sem apenas entregar outro link.",
                  },
                  {
                    title: "Página de agendamento",
                    description:
                      "É simples de compartilhar e não exige instalação. Teste velocidade, clareza dos horários e quantidade de etapas no celular.",
                  },
                  {
                    title: "Aplicativo próprio",
                    description:
                      "Fortalece a marca e pode concentrar assinatura, pagamento e push. Considere download, login, prazo de publicação e manutenção.",
                  },
                ]}
              />
              <p>
                O Flowo escolhe o primeiro caminho: a IA atende e agenda pelo
                WhatsApp. AppBarber e BestBarbers dão mais peso à experiência em
                aplicativo. Trinks combina agenda online, aplicativo e um
                ecossistema mais amplo. Nenhum canal é automaticamente melhor;
                ele precisa combinar com o comportamento dos seus clientes.
              </p>
            </GuideSection>

            <GuideSection
              id="equipe"
              icon={Users}
              title="Diferentes barbeiros precisam de diferentes agendas"
            >
              <p>
                Não basta cadastrar o horário da loja. Pergunte se cada
                profissional pode ter dias, turnos, folgas, serviços e duração
                próprios. Em seguida, simule dois clientes tentando reservar o
                mesmo horário e confirme como o sistema evita o conflito.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Barbearia pequena",
                    description:
                      "Priorize configuração simples, visão do dia e acesso rápido pelo celular.",
                  },
                  {
                    title: "Equipe e rede",
                    description:
                      "Exija permissões, relatórios por profissional, visão consolidada e regras claras de comissão.",
                  },
                ]}
              />
              <Link
                href="/recursos/guias/gerenciamento-equipe"
                className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4"
              >
                Ver o guia de horários e equipe
              </Link>
            </GuideSection>

            <GuideSection
              id="preco"
              icon={BadgeDollarSign}
              title="Quanto custa um sistema para barbearia?"
            >
              <p>
                O valor publicado pode ser gratuito, por profissional, por
                unidade ou por pacote. Compare a configuração que você realmente
                usará: número de barbeiros, WhatsApp, IA, mensagens, fiscal,
                pagamentos, app próprio, implantação e suporte.
              </p>
              <GuideCallout title="Plano-base não é custo total">
                Um plano barato com módulos separados pode custar mais quando o
                WhatsApp, a IA e a equipe entram. Um plano mais caro também pode
                ser desperdício se inclui uma operação que a barbearia não
                precisa. Peça o valor mensal final por escrito.
              </GuideCallout>
              <p>
                O Flowo publica os planos Solo por R$ 379 e Equipe por R$ 789
                por mês. O Empresarial é sob consulta e a assinatura não tem
                fidelidade. Não há teste automático; uma avaliação assistida
                de 14 dias pode ser concedida a clientes elegíveis de Solo ou
                Equipe. A recepção com IA no WhatsApp está incluída;
                pagamentos integrados são opcionais e acontecem depois do
                atendimento. As páginas comparativas registram os preços
                públicos dos concorrentes e a data da consulta.
              </p>
            </GuideSection>

            <GuideSection
              id="comparar"
              icon={Smartphone}
              title="Compare as opções pela proposta central"
            >
              <div className="my-8 overflow-x-auto rounded-lg border border-line bg-surface">
                <table className="w-full min-w-[42rem] border-collapse">
                  <caption className="sr-only">
                    Necessidades da barbearia e o que verificar em cada sistema
                  </caption>
                  <thead>
                    <tr className="border-b border-line bg-background">
                      <th className="px-5 py-4 text-left text-label font-semibold text-ink">
                        Se você precisa de
                      </th>
                      <th className="px-5 py-4 text-left text-label font-semibold text-ink">
                        Verifique isto na demonstração
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {decisionRows.map((row) => (
                      <tr key={row.need} className="border-b border-line last:border-0">
                        <th scope="row" className="px-5 py-4 text-left align-top text-sm font-semibold text-ink">
                          {row.need}
                        </th>
                        <td className="px-5 py-4 text-sm leading-relaxed text-muted-ink">
                          {row.inspect}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Flowo vs AppBarber", "/flowo-vs-appbarber"],
                  ["Flowo vs Trinks", "/flowo-vs-trinks"],
                  ["Flowo vs BestBarbers", "/flowo-vs-bestbarbers"],
                  ["Flowo vs Barbeiro.app", "/flowo-vs-barbeiro-app"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex min-h-12 items-center gap-3 rounded-lg border border-line bg-surface px-4 font-semibold text-ink transition-colors hover:bg-surface-2"
                  >
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </Link>
                ))}
              </div>
              <Link
                href="/comparar"
                className="mt-5 inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4"
              >
                Ver todos os comparativos e as fontes
              </Link>
            </GuideSection>

            <GuideSection
              id="teste"
              icon={CalendarDays}
              title="Teste o fluxo inteiro antes de decidir"
            >
              <GuideChecklist
                items={[
                  "Crie dois profissionais com horários e serviços diferentes",
                  "Faça um agendamento como cliente pelo celular",
                  "Tente reservar um horário já ocupado",
                  "Remarque, cancele e confirme o mesmo atendimento",
                  "Abra e feche a comanda sem ativar pagamento integrado",
                  "Confira comissão, histórico e permissões da equipe",
                  "Peça ajuda e avalie o tempo e a qualidade da resposta",
                ]}
              />
              <GuideScopeNote title="A Flowo publica uma demonstração técnica do fluxo">
                O teste documenta mensagem, consulta de disponibilidade,
                agendamento, remarcação, cancelamento e confirmação em ambiente
                controlado. Ele prova funcionamento técnico, não resultado
                comercial de cliente.
              </GuideScopeNote>
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4"
              >
                Ver a demonstração e seus limites
              </Link>
            </GuideSection>
          </GuideContent>

          <GuideCta
            title="Quer comparar usando a rotina da sua barbearia?"
            description="Traga número de profissionais, horários, serviços e o canal por onde os clientes pedem agendamento. A demonstração deve responder ao seu cenário real."
          />

          <GuidePrevNext
            currentPath={guide.path}
            prev={{
              href: "/recursos/guias/relatorios-metricas",
              label: "Relatórios e métricas",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
