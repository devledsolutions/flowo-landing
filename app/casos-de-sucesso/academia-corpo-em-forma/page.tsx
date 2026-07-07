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
  title: "Caso de Uso: Academia (Exemplo Ilustrativo)",
  description:
    "Cenário ilustrativo de como uma academia usaria o Flowo: confirmação de presença nas aulas pelo WhatsApp, vagas liberadas automaticamente e histórico de frequência.",
  path: "/casos-de-sucesso/academia-corpo-em-forma",
});

const beforeAfterItems = [
  {
    before: "Alunos esquecem a aula e a vaga fica vazia",
    after: "Lembrete e pedido de confirmação chegam no WhatsApp",
  },
  {
    before: "Vaga de quem desistiu se perde",
    after: "Sem confirmação, a vaga é liberada para a lista de espera",
  },
  {
    before: "Recepção presa ao telefone remarcando horários",
    after: "Aluno remarca sozinho, pela conversa",
  },
  {
    before: "Frequência controlada de cabeça",
    after: "Histórico de presença por aluno, no painel",
  },
];

export default function AcademiaCorpoEmFormaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CaseStudyPage
          crumbLabel="Academia"
          industry="Fitness e Bem-estar"
          title="Academia Corpo em Forma"
          lead="Um cenário ilustrativo: como uma academia de bairro usaria o Flowo para confirmar presença nas aulas e parar de perder vaga com falta."
        >
          <CaseSection title="O desafio típico">
            <p>
              Em academias com aulas de horário marcado, a falta é o vilão
              silencioso: o aluno esquece, a vaga fica vazia e outro aluno que
              queria treinar ficou de fora. A recepção passa o dia ao telefone
              coordenando remarcações.
            </p>
          </CaseSection>

          <CaseSection title="Como o Flowo entraria">
            <CaseChecklist
              items={[
                "O aluno agenda e remarca a aula direto pelo WhatsApp, conversando com a IA",
                "Lembrete automático na véspera e no dia, com pedido de confirmação",
                "Sem confirmação dentro do prazo, a vaga é liberada para a lista de espera",
                "O painel mostra a frequência de cada aluno, para o time agir com contexto",
              ]}
            />
          </CaseSection>

          <CaseSection title="Antes e depois, no dia a dia">
            <BeforeAfter items={beforeAfterItems} />
            <p>
              O mecanismo contra faltas é sempre o mesmo:{" "}
              <strong>lembrete + confirmação + liberação da vaga</strong>.
              Nenhum pagamento antecipado, nenhuma fricção para o aluno.
            </p>
          </CaseSection>
        </CaseStudyPage>
      </main>
      <Footer />
    </>
  );
}
