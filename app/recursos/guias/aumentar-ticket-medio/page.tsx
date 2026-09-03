import { BarChart3, PackageCheck, ReceiptText, Sparkles } from "lucide-react";
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

const guide = getGuide("/recursos/guias/aumentar-ticket-medio");

export const metadata = buildGuideMetadata(guide);

const tableOfContents = [
  { id: "medir", label: "Saiba seu ticket de hoje" },
  { id: "catalogo", label: "Organize serviços, combos e produtos" },
  { id: "oferta", label: "Ofereça na hora certa" },
  { id: "fechamento", label: "Registre tudo na comanda" },
];

export default function AverageTicketGuidePage() {
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
              { label: "Aumentar Ticket Médio", href: "#" },
            ]}
            readTime={guide.readTime}
            title="Como aumentar o ticket médio sem empurrar serviço"
            lead="Arrume o catálogo, ofereça na hora certa e registre tudo na comanda. A Flowo organiza. Quem oferece é a equipe."
            updatedAt="3 de setembro de 2026"
          />

          <GuideAvailability
            items={[
              {
                label: "Catálogo",
                value: "Serviços, combos e produtos",
                description: "Cadastre com o preço certo antes de oferecer qualquer adicional.",
              },
              {
                label: "Venda",
                value: "Na comanda, depois do serviço",
                description: "Serviço e produto entram na mesma comanda e formam o total.",
              },
              {
                label: "Números",
                value: "Receita por serviço",
                description: "Nos planos Equipe e Empresarial. O ticket médio você calcula com a conta abaixo.",
              },
              {
                label: "Limite de hoje",
                value: "Sem oferta automática",
                description: "A Flowo não oferece adicional sozinha na conversa nem na confirmação.",
              },
            ]}
          />

          <GuideContent items={tableOfContents}>
            <GuideSection id="medir" icon={BarChart3} title="Saiba seu ticket de hoje">
              <p>
                Use só atendimentos concluídos. Some a receita do período e divida pelo número de
                comandas fechadas. Compare períodos iguais e não conte horário futuro.
              </p>
              <GuideCallout>
                <strong>Ticket médio = receita concluída ÷ comandas pagas.</strong> Anote a data e
                o período. Um sábado cheio não substitui a comparação de um mês inteiro.
              </GuideCallout>
            </GuideSection>

            <GuideSection id="catalogo" icon={PackageCheck} title="Organize serviços, combos e produtos">
              <GuideCards
                items={[
                  {
                    title: "Combo de serviços",
                    description: "Junte o que já sai junto, como corte e barba, com preço e duração coerentes.",
                  },
                  {
                    title: "Produtos",
                    description: "Cadastre pomada, óleo e o que mais você vende para entrar na comanda.",
                  },
                  {
                    title: "Pacotes",
                    description: "Se usar pacote, acompanhe o saldo de usos e desconte só depois do serviço.",
                  },
                ]}
              />
              <GuideProductPath
                items={[
                  {
                    surface: "Painel",
                    path: "Serviços / Pacotes",
                    action: "cadastre catálogo, combos, produtos e saldos.",
                  },
                  {
                    surface: "App",
                    path: "Mais → Serviços / Produtos",
                    action: "mantenha os itens em dia.",
                  },
                ]}
              />
            </GuideSection>

            <GuideSection id="oferta" icon={Sparkles} title="Ofereça na hora certa">
              <p>
                Sugira algo ligado ao serviço e ao que você sabe do cliente. Não transforme
                lembrete ou confirmação em propaganda. O cliente precisa entender o que muda no
                corte e no preço.
              </p>
              <GuideScopeNote status="practice" title="A estratégia é da barbearia">
                A Flowo dá catálogo, histórico, conversas e campanhas. Ela não oferece adicional
                por perfil sozinha. Combine quando a equipe oferece e treine uma frase simples.
              </GuideScopeNote>
            </GuideSection>

            <GuideSection id="fechamento" icon={ReceiptText} title="Registre tudo na comanda">
              <GuideScreenshot
                src="/images/product/dashboard-comandas.png"
                alt="Tela Comandas da Flowo: comanda com corte e barba, botões para adicionar serviço, produto e desconto, e o total do atendimento"
              />
              <GuideChecklist
                items={[
                  "Inclua cada serviço e produto que saiu de verdade",
                  "Aplique desconto de forma visível",
                  "Ligue o barbeiro certo",
                  "Feche com a forma de pagamento recebida",
                  "Olhe a receita por serviço antes de mudar preço ou combo",
                ]}
              />
              <GuideScopeNote title="O relatório depende da comanda certa">
                O que foi oferecido e não vendido não entra. O que foi vendido fora da Flowo
                também não aparece sozinho.
              </GuideScopeNote>
            </GuideSection>
          </GuideContent>

          <GuideHonesty
            tested={[
              "Comanda com serviço, produto e desconto, e a receita por serviço em Métricas: conferidos no produto em 3 de setembro de 2026.",
            ]}
            notMeasured={[
              "Quanto o ticket médio sobe em barbearias que usam combos e produtos na Flowo.",
            ]}
          />

          <GuideCta
            title="Quer ligar catálogo, atendimento e receita?"
            description="Cadastre o que sua barbearia vende de verdade e feche cada atendimento na comanda."
          />

          <GuidePrevNext
            currentPath={guide.path}
            next={{
              href: "/recursos/guias/fidelizacao-clientes",
              label: "Fidelização de Clientes",
            }}
          />
        </GuidePage>
      </main>
      <Footer />
    </>
  );
}
