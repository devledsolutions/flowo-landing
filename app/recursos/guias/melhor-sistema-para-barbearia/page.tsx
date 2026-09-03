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
  GuideCta,
  GuideHeader,
  GuidePage,
  GuidePrevNext,
  GuideScopeNote,
  GuideSection,
  GuideContent,
} from "@/components/resources/guide-shell";
import { GuideStructuredData } from "@/components/resources/resource-structured-data";
import { bookingConversation } from "@/components/home/whatsapp-chat";
import { GuideHonesty, GuideWhatsApp } from "@/app/recursos/_components/guide-media";
import { getGuide } from "@/data/guides";
import { formatBRL, getPlan } from "@/data/pricing-data";
import { buildGuideMetadata } from "@/lib/seo";

const guide = getGuide("/recursos/guias/melhor-sistema-para-barbearia");
const soloPrice = formatBRL(getPlan("solo").monthly);
const equipePrice = formatBRL(getPlan("equipe").monthly);

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "resposta", label: "Qual é o melhor sistema" },
  { id: "criterios", label: "Os 7 critérios que importam" },
  { id: "canais", label: "WhatsApp, link ou aplicativo" },
  { id: "equipe", label: "Agenda por barbeiro" },
  { id: "preco", label: "Preço real do pacote" },
  { id: "comparar", label: "Compare as opções" },
  { id: "teste", label: "Teste antes de decidir" },
];

const decisionRows = [
  {
    need: "Atender e agendar no WhatsApp",
    inspect: "Se a conversa olha a agenda de verdade ou só manda um link.",
  },
  {
    need: "Equipe com horários diferentes",
    inspect: "Dias, turnos, folgas, serviços e duração por barbeiro.",
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
    inspect: "O que é automático, o que pede revisão e o que é módulo extra.",
  },
  {
    need: "Começar rápido",
    inspect: "Migração de clientes, configuração do WhatsApp e suporte depois da venda.",
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
            title="Melhor sistema para barbearia: como escolher"
            lead="Não existe o melhor para toda barbearia. Existe o que resolve o seu gargalo, respeita a rotina da equipe e cabe no custo total."
            updatedAt="3 de setembro de 2026"
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="resposta" icon={Scale} title="Qual é o melhor sistema para barbearia?">
              <p>
                Depende de onde o atendimento começa. Se os clientes já pedem horário pelo
                WhatsApp, uma recepção ligada à agenda tira a consulta manual do seu dia. Se a
                meta é um aplicativo com a sua marca, um sistema centrado em app pode servir
                melhor. Se preço é o único critério, há opções gratuitas e planos menores.
              </p>
              <GuideCallout title="Comece pelo gargalo, não pelo logotipo">
                Anote as três tarefas que mais tomam tempo ou dão erro hoje. Depois faça essas
                tarefas do começo ao fim em cada sistema. Uma lista de cinquenta recursos não
                prova que o fluxo principal funciona.
              </GuideCallout>
            </GuideSection>

            <GuideSection id="criterios" icon={Search} title="Os 7 critérios que mudam a decisão">
              <GuideChecklist
                items={[
                  "Canal: WhatsApp, link, aplicativo ou uma combinação clara",
                  "Agenda: horário livre de verdade por barbeiro e por serviço",
                  "Equipe: permissões, comissão, folgas e acesso no celular",
                  "Operação: comanda, clientes, caixa, estoque e relatórios",
                  "Relacionamento: confirmação, lembrete, retorno e permissão do cliente",
                  "Implantação: migração, configuração, treino e suporte",
                  "Custo total: plano, usuários, módulos, mensagens, pagamentos e equipamentos",
                ]}
              />
              <GuideScopeNote status="practice" title="Dê peso diferente a cada critério">
                Uma barbearia de uma cadeira não precisa avaliar rede de unidades. Uma rede não
                deve escolher só pelo plano mais barato. Defina o que é obrigatório, desejável e
                dispensável antes da demonstração.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="canais" icon={MessageCircle} title="WhatsApp, link ou aplicativo: o canal muda tudo">
              <GuideCards
                items={[
                  {
                    title: "WhatsApp ligado à agenda",
                    description: "O cliente fala no canal que já usa. Confira se o sistema entende o pedido, olha o horário livre e conclui o agendamento sem mandar outro link.",
                  },
                  {
                    title: "Página de agendamento",
                    description: "Fácil de compartilhar, sem instalar nada. Teste velocidade, clareza dos horários e quantas etapas tem no celular.",
                  },
                  {
                    title: "Aplicativo próprio",
                    description: "Reforça a marca e pode juntar assinatura, pagamento e notificação. Pese download, login, prazo de publicação e manutenção.",
                  },
                ]}
              />
              <p>
                A Flowo escolhe o primeiro caminho: ela atende e agenda no WhatsApp. AppBarber e
                BestBarbers dão mais peso ao aplicativo próprio. Trinks junta agenda online,
                aplicativo e um ecossistema mais amplo. Nenhum canal é melhor sozinho. Ele precisa
                combinar com o jeito dos seus clientes.
              </p>
              <GuideWhatsApp messages={bookingConversation} />
            </GuideSection>

            <GuideSection id="equipe" icon={Users} title="Barbeiros diferentes precisam de agendas diferentes">
              <p>
                Não basta cadastrar o horário da loja. Pergunte se cada barbeiro pode ter dias,
                turnos, folgas, serviços e duração próprios. Depois simule dois clientes
                tentando o mesmo horário e veja como o sistema evita o choque.
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "Barbearia pequena",
                    description: "Priorize configuração simples, visão do dia e acesso rápido pelo celular.",
                  },
                  {
                    title: "Equipe e rede",
                    description: "Exija permissões, relatório por barbeiro, visão geral e regra clara de comissão.",
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

            <GuideSection id="preco" icon={BadgeDollarSign} title="Quanto custa um sistema para barbearia?">
              <p>
                O preço publicado pode ser gratuito, por barbeiro, por unidade ou por pacote.
                Compare a configuração que você vai usar de verdade: número de barbeiros,
                WhatsApp, atendimento automático, mensagens, nota fiscal, pagamentos, app
                próprio, implantação e suporte.
              </p>
              <GuideCallout title="Plano básico não é custo total">
                Um plano barato com módulos separados pode sair mais caro quando WhatsApp,
                atendimento automático e equipe entram. Um plano caro também pode ser
                desperdício se traz o que você não usa. Peça o valor mensal final por escrito.
              </GuideCallout>
              <p>
                A Flowo publica os planos Solo por {soloPrice} e Equipe por {equipePrice} por
                mês. O Empresarial é sob consulta. Não há fidelidade. Não há teste automático:
                uma avaliação assistida de 14 dias pode ser liberada para clientes elegíveis de
                Solo ou Equipe. O atendimento no WhatsApp está incluído. Pagamentos pela Flowo são
                opcionais e acontecem depois do corte. As páginas comparativas registram os
                preços públicos dos concorrentes e a data da consulta.
              </p>
            </GuideSection>

            <GuideSection id="comparar" icon={Smartphone} title="Compare pela proposta central">
              <div className="my-8 overflow-x-auto rounded-lg border border-line bg-surface">
                <table className="w-full min-w-[42rem] border-collapse">
                  <caption className="sr-only">
                    O que a barbearia precisa e o que conferir em cada sistema
                  </caption>
                  <thead>
                    <tr className="border-b border-line bg-background">
                      <th className="px-5 py-4 text-left text-label font-semibold text-ink">
                        Se você precisa de
                      </th>
                      <th className="px-5 py-4 text-left text-label font-semibold text-ink">
                        Confira na demonstração
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

            <GuideSection id="teste" icon={CalendarDays} title="Teste o fluxo inteiro antes de decidir">
              <GuideChecklist
                items={[
                  "Crie dois barbeiros com horários e serviços diferentes",
                  "Agende como cliente pelo celular",
                  "Tente reservar um horário já ocupado",
                  "Remarque, cancele e confirme o mesmo atendimento",
                  "Abra e feche a comanda sem ligar pagamento pela Flowo",
                  "Confira comissão, histórico e permissões da equipe",
                  "Peça ajuda e veja o tempo e a qualidade da resposta",
                ]}
              />
              <GuideScopeNote title="A Flowo publica a própria demonstração">
                A conversa completa, do pedido ao cancelamento, está numa página só, com a
                agenda mudando a cada passo e o que ainda não foi medido dito no fim.
              </GuideScopeNote>
              <Link
                href="/demonstracao-agendamento-whatsapp"
                className="inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4"
              >
                Ver a demonstração da Flowo
              </Link>
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "A conversa mostrada acima, com agendamento, remarcação e cancelamento entrando na agenda: testada em produção com números de teste da própria Flowo, em 26 de julho de 2026.",
              "Preços dos concorrentes: os públicos, com a data da consulta anotada em cada página comparativa.",
            ]}
            notMeasured={[
              "Resultado comercial de barbearias que trocaram de sistema para a Flowo.",
              "Comparação de tempo de implantação entre os sistemas.",
            ]}
          />

          <GuideCta
            title="Quer comparar usando a rotina da sua barbearia?"
            description="Traga número de barbeiros, horários, serviços e o canal por onde os clientes pedem horário. A demonstração tem que responder ao seu caso."
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
