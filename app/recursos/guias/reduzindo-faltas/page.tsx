import {
  Ban,
  Bell,
  CalendarCheck,
  TrendingDown,
  Users,
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
  title: "Reduzindo Faltas na Barbearia",
  description:
    "Como usar lembretes e confirmação automática pelo WhatsApp para reduzir no-shows, liberar horários e proteger a agenda da sua barbearia.",
  path: "/recursos/guias/reduzindo-faltas",
});

const tableOfContents = [
  { id: "custo-falta", label: "O custo real de uma falta" },
  { id: "lembretes", label: "Sistema de lembretes que funciona" },
  { id: "confirmacao", label: "Confirmação automática: a arma contra faltas" },
  { id: "politica-cancelamento", label: "Política de cancelamento" },
  { id: "clientes-reincidentes", label: "Lidando com clientes que faltam" },
];

export default function ReducingNoShowsGuidePage() {
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
              { label: "Reduzindo Faltas", href: "#" },
            ]}
            readTime="10 min"
            title="Reduzindo faltas na barbearia"
            lead="Lembretes no momento certo, confirmação automática pelo WhatsApp e uma política clara. É assim que se protege a agenda, sem cobrar sinal de ninguém."
          />

          <GuideToc items={tableOfContents} />

          <article>
            <GuideSection
              id="custo-falta"
              icon={TrendingDown}
              title="O custo real de uma falta"
            >
              <p>
                Uma falta não é só um horário vago. É dinheiro perdido, outro
                cliente que você poderia ter atendido e tempo desperdiçado.
                Faça a conta com os seus números:
              </p>
              <GuideCallout title="Exemplo hipotético, para você adaptar">
                Se cada barbeiro da sua equipe perde 1 horário por dia com
                falta e o seu ticket é de R$ 50, uma equipe de 3 deixa de
                faturar R$ 150 por dia. No mês, isso passa de R$ 3.000 em
                horários que ninguém ocupou. Troque pelos seus valores e veja o
                tamanho do problema na sua barbearia.
              </GuideCallout>
              <p>
                Por isso, reduzir faltas deveria ser prioridade. A boa notícia:
                a maior parte das faltas é esquecimento, e esquecimento se
                resolve com lembrete e confirmação.
              </p>
            </GuideSection>

            <GuideSection
              id="lembretes"
              icon={Bell}
              title="Sistema de lembretes que funciona"
            >
              <p>
                O Flowo envia lembretes automáticos em dois momentos
                estratégicos:
              </p>
              <GuideCards
                columns={2}
                items={[
                  {
                    title: "24h antes: lembrete de véspera",
                    description:
                      "Dá tempo do cliente cancelar se tiver problema, liberando o horário para outro.",
                  },
                  {
                    title: "2h antes: lembrete final",
                    description:
                      "Pega quem esqueceu e dá o empurrão final para não deixar pra lá.",
                  },
                ]}
              />
              <GuideChatSample
                customer="Beleza, tô confirmado sim!"
                reply="Fechado! Amanhã às 15h com o João. Qualquer coisa é só chamar aqui."
              />
            </GuideSection>

            <GuideSection
              id="confirmacao"
              icon={CalendarCheck}
              title="Confirmação automática: a arma contra faltas"
            >
              <p>
                O lembrete avisa; a confirmação protege. Junto com o lembrete
                de véspera, o Flowo pede que o cliente confirme o horário. Quem
                confirma, aparece. Quem não responde, você trata antes de
                perder o slot:
              </p>
              <GuideSteps
                items={[
                  {
                    title: "O cliente confirma no WhatsApp",
                    description:
                      "Um toque no botão e o compromisso está firmado. A agenda mostra quem confirmou.",
                  },
                  {
                    title: "Sem resposta? O horário pode ser liberado",
                    description:
                      "Você define o prazo. Passou, o Flowo libera o slot e pode reoferecer para outros clientes.",
                  },
                  {
                    title: "Cancelou? Outro cliente entra",
                    description:
                      "O cancelamento pelo WhatsApp libera o horário na hora, sem você tocar no telefone.",
                  },
                ]}
              />
              <p>
                O pagamento não entra nessa equação: PIX e cartão são opções
                para pagar o atendimento, nunca uma condição para agendar.
              </p>
            </GuideSection>

            <GuideSection
              id="politica-cancelamento"
              icon={Ban}
              title="Política de cancelamento clara"
            >
              <p>
                Ter uma política clara e comunicá-la desde o início evita
                atritos e educa o cliente sobre a importância de avisar:
              </p>
              <GuideChecklist
                items={[
                  "Cancelamento com mais de 24h: remarca sem burocracia",
                  "Cancelamento em cima da hora: o horário vai para a fila de espera",
                  "Falta sem aviso: fica registrada no histórico do cliente",
                ]}
              />
              <p>
                O Flowo deixa você configurar isso e comunica automaticamente
                para o cliente quando ele agenda. Sem surpresas para ninguém.
              </p>
            </GuideSection>

            <GuideSection
              id="clientes-reincidentes"
              icon={Users}
              title="Lidando com clientes que faltam"
            >
              <p>
                Alguns clientes têm padrão de faltar. Com o Flowo, você
                identifica e trata de forma diferente:
              </p>
              <GuideSteps
                items={[
                  {
                    title: "Identifique os reincidentes",
                    description:
                      "O Flowo mostra o histórico de cada cliente: faltas, cancelamentos em cima da hora, frequência.",
                  },
                  {
                    title: "Aperte a confirmação para esses clientes",
                    description:
                      "Peça confirmação com mais antecedência e libere o horário mais cedo se não houver resposta.",
                  },
                  {
                    title: "Considere limitar os piores casos",
                    description:
                      "Cliente que já faltou 3 vezes sem avisar? Ofereça só os horários de menor procura.",
                  },
                ]}
              />
              <GuideCallout title="Resumo: combinação vencedora">
                Lembretes 24h + 2h, confirmação automática com liberação de
                horário e política de cancelamento comunicada no agendamento.
              </GuideCallout>
            </GuideSection>
          </article>

          <GuideCta
            title="Pronto para proteger sua agenda?"
            description="Ative lembretes e confirmação automática no Flowo e pare de perder horário com no-show."
          />

          <GuidePrevNext
            prev={{
              href: "/recursos/guias/configurando-whatsapp",
              label: "Configurando WhatsApp",
            }}
            next={{
              href: "/recursos/guias/relatorios-metricas",
              label: "Relatórios e Métricas",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
