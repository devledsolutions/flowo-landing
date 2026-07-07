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
  title: "Caso de Uso: Clínica (Exemplo Ilustrativo)",
  description:
    "Cenário ilustrativo de como uma clínica usaria o Flowo: confirmação automática de consultas pelo WhatsApp e agenda centralizada de vários profissionais.",
  path: "/casos-de-sucesso/clinica-saude-total",
});

const beforeAfterItems = [
  {
    before: "Pacientes faltam à consulta sem avisar",
    after: "Confirmação automática na véspera, pelo WhatsApp",
  },
  {
    before: "Horário de quem cancelou fica vazio",
    after: "O sistema libera o horário e oferece para a fila de espera",
  },
  {
    before: "Cada profissional com uma agenda diferente",
    after: "Todas as agendas centralizadas em um painel só",
  },
  {
    before: "Recepção ligando para lembrar consulta",
    after: "Lembretes automáticos, sem trabalho manual",
  },
];

export default function ClinicaSaudeTotalPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CaseStudyPage
          crumbLabel="Clínica"
          industry="Saúde e Bem-estar"
          title="Clínica Saúde Total"
          lead="Um cenário ilustrativo: como uma clínica com vários profissionais usaria o Flowo para confirmar consultas e manter a agenda do dia sem buracos."
        >
          <CaseSection title="O desafio típico">
            <p>
              Em clínicas, cada consulta perdida desorganiza o dia inteiro: o
              profissional fica parado, o paciente que precisava do horário não
              conseguiu, e a recepção gasta a manhã ligando para confirmar as
              consultas da tarde.
            </p>
          </CaseSection>

          <CaseSection title="Como o Flowo entraria">
            <CaseChecklist
              items={[
                "O paciente agenda, remarca e cancela pela conversa no WhatsApp",
                "Confirmação automática na véspera, sem ninguém ao telefone",
                "Consulta não confirmada pode ser liberada e reoferecida",
                "Agenda de todos os profissionais em um painel central",
                "Histórico de faltas por paciente, para a equipe agir com contexto",
              ]}
            />
          </CaseSection>

          <CaseSection title="Antes e depois, no dia a dia">
            <BeforeAfter items={beforeAfterItems} />
            <p>
              O ganho não vem de cobrar antecipado, e sim de{" "}
              <strong>
                confirmação automática e reaproveitamento dos horários
              </strong>
              , com a recepção fora do telefone.
            </p>
          </CaseSection>
        </CaseStudyPage>
      </main>
      <Footer />
    </>
  );
}
