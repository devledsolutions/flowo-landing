interface ShowcaseRow {
  size: string;
  scale: string;
  pain: string;
  fix: string;
}

/**
 * Antiga vitrine com métricas fabricadas (+45%, +63%, +127%, 3,8 -> 4,8).
 * Agora é uma leitura editorial dor -> resposta, só com capacidades
 * verificáveis e sem nenhum número de resultado.
 */
const rows: readonly ShowcaseRow[] = [
  {
    size: "Barbeiro solo",
    scale: "Uma cadeira, um celular",
    pain: "Responder mensagem entre um corte e outro, e perder cliente quando não dá tempo.",
    fix: "A IA responde na hora, agenda e confirma pelo WhatsApp. O celular fica no bolso.",
  },
  {
    size: "Barbearia com equipe",
    scale: "Vários barbeiros, uma agenda",
    pain: "Controles separados, conflito de horário e cliente marcado em cima de outro.",
    fix: "Agenda de todos em um lugar, sincronizada com Google, Apple e Outlook. Cada um vê a sua.",
  },
  {
    size: "Rede de barbearias",
    scale: "Várias unidades, um padrão",
    pain: "Cada unidade com um sistema diferente e nenhuma visão do conjunto.",
    fix: "Unidades no mesmo padrão de atendimento, com relatórios de faturamento para acompanhar o todo.",
  },
];

export default function IndustryShowcase() {
  return (
    <section className="section-normal bg-cream">
      <div className="container-page">
        <h2 className="max-w-3xl text-h2 font-semibold text-ink-strong">
          O problema muda com o tamanho. A resposta é a mesma.
        </h2>

        <div className="mt-12 border-t border-line">
          {rows.map((row) => (
            <div
              key={row.size}
              className="grid gap-x-10 gap-y-4 border-b border-line py-9 md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,5fr)]"
            >
              <div>
                <h3 className="text-h3 font-semibold leading-tight text-ink">
                  {row.size}
                </h3>
                <p className="mt-1 text-label text-muted-ink">{row.scale}</p>
              </div>
              <div>
                <p className="text-caption font-medium text-muted-ink">Hoje</p>
                <p className="mt-1.5 leading-relaxed text-muted-ink">
                  {row.pain}
                </p>
              </div>
              <div>
                <p className="text-caption font-medium text-muted-ink">
                  Com o Flowo
                </p>
                <p className="mt-1.5 leading-relaxed text-ink">{row.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
