import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  BeforeAfter,
  CaseChecklist,
  CaseSection,
  CaseStudyPage,
} from "@/app/casos-de-sucesso/_components/case-study";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Caso de Uso: Estúdio de Beleza (Exemplo Ilustrativo)",
  description:
    "Cenário ilustrativo de como um estúdio de beleza usaria o Flowo: agenda por profissional, lembretes automáticos e reativação de clientes pelo WhatsApp.",
  path: "/casos-de-sucesso/estudio-beleza-radiante",
});

const beforeAfterItems = [
  {
    before: "Horários ociosos entre um atendimento e outro",
    after: "Agenda visível por profissional, com encaixes oferecidos pela IA",
  },
  {
    before: "Agendamento manual pelo telefone e por mensagem",
    after: "Cliente agenda sozinho pelo WhatsApp, a qualquer hora",
  },
  {
    before: "Cliente some e ninguém percebe",
    after: "Reativação segmentada para quem está sumido há mais de 45 dias",
  },
  {
    before: "Cobrança na correria da recepção",
    after: "Pagamento do atendimento por PIX ou cartão, pela conversa",
  },
];

export default function EstudioBelezaRadiantePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CaseStudyPage
          crumbLabel="Estúdio de Beleza"
          industry="Beleza e Estética"
          title="Estúdio Beleza Radiante"
          lead="Um cenário ilustrativo: como um estúdio com várias profissionais usaria o Flowo para preencher horários ociosos e manter as clientes voltando."
        >
          <CaseSection title="O desafio típico">
            <p>
              Estúdios de beleza vivem de recorrência: a cliente que volta todo
              mês vale mais que a novidade da semana. Mas sem sistema, os
              horários vagos entre atendimentos se acumulam, o telefone não
              para e ninguém tem tempo de chamar quem sumiu.
            </p>
          </CaseSection>

          <CaseSection title="Como o Flowo entraria">
            <CaseChecklist
              items={[
                "Cada profissional tem a própria agenda, com serviços e tempos diferentes",
                "A cliente agenda pelo WhatsApp e escolhe com quem quer ser atendida",
                "Lembretes 24h e 2h antes reduzem esquecimento, com confirmação automática",
                "Clientes sem retorno há mais de 45 dias entram num fluxo de reativação com contexto",
                "O pagamento do atendimento pode ser feito por PIX ou cartão na própria conversa",
              ]}
            />
          </CaseSection>

          <CaseSection title="Antes e depois, no dia a dia">
            <BeforeAfter items={beforeAfterItems} />
            <p>
              A lógica é a mesma da barbearia:{" "}
              <strong>
                agenda organizada, confirmação automática e relacionamento
                contínuo
              </strong>{" "}
              pelo canal onde a cliente já está.
            </p>
          </CaseSection>
        </CaseStudyPage>
      </main>
      <Footer />
    </>
  );
}
