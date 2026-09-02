const reassuranceRows = [
  {
    subject: "WhatsApp",
    unchanged: "O cliente chama a barbearia no canal que já conhece.",
    flowo: (
      <>
        <strong className="font-semibold text-ink">A Flowo responde</strong>{" "}
        e conduz o pedido sem alguém precisar parar o atendimento.
      </>
    ),
  },
  {
    subject: "Agenda",
    unchanged: "Cada profissional mantém seus horários, folgas e serviços.",
    flowo: (
      <>
        <strong className="font-semibold text-ink">
          Consulta a disponibilidade individual
        </strong>{" "}
        antes de oferecer um horário.
      </>
    ),
  },
  {
    subject: "Equipe",
    unchanged: "Uma pessoa pode assumir a conversa quando quiser.",
    flowo: (
      <>
        <strong className="font-semibold text-ink">
          Organiza a conversa e o histórico
        </strong>{" "}
        para ninguém começar do zero.
      </>
    ),
  },
  {
    subject: "Recebimento",
    unchanged: "Dinheiro e maquininha própria continuam válidos.",
    flowo: (
      <>
        <strong className="font-semibold text-ink">Registra na comanda</strong>;
        pagamentos integrados são opcionais.
      </>
    ),
  },
] as const;

export default function SwitchingReassurance() {
  return (
    <section
      id="mudanca-sem-atrito"
      aria-labelledby="switching-reassurance-title"
      className="section-normal border-b border-line bg-cream"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <header>
          <p className="inline-flex min-h-8 items-center rounded-full border border-line bg-surface px-3 text-caption font-semibold text-ink">
            O WhatsApp não muda
          </p>
          <h2
            id="switching-reassurance-title"
            className="mt-7 max-w-[13ch] text-h2 font-semibold leading-[1.08] tracking-[-0.025em] text-ink-strong"
          >
            Para o cliente, continua sendo a barbearia.
          </h2>
          <p className="mt-5 max-w-[34rem] text-lead text-muted-ink">
            Ele chama no mesmo número e fala do jeito de sempre. A diferença é
            que não precisa esperar alguém terminar o atendimento para saber se
            tem horário.
          </p>
        </header>

        <dl className="border-t border-ink">
          <div
            className="hidden min-h-14 grid-cols-[8rem_1fr_1fr] items-end gap-6 border-b border-ink pb-3 text-caption font-semibold text-ink sm:grid"
            aria-hidden="true"
          >
            <span />
            <span>Como já funciona</span>
            <span>Com a Flowo</span>
          </div>

          {reassuranceRows.map((row) => (
            <div
              key={row.subject}
              className="grid gap-3 border-b border-line py-5 sm:min-h-28 sm:grid-cols-[8rem_1fr_1fr] sm:items-center sm:gap-6"
            >
              <dt className="text-sm font-semibold text-ink">{row.subject}</dt>
              <dd className="grid grid-cols-[6.25rem_1fr] gap-3 text-sm leading-relaxed text-muted-ink sm:block">
                <span className="text-caption font-semibold text-ink sm:hidden">
                  Continua
                </span>
                <span>{row.unchanged}</span>
              </dd>
              <dd className="grid grid-cols-[6.25rem_1fr] gap-3 text-sm leading-relaxed text-muted-ink sm:block">
                <span className="text-caption font-semibold text-ink sm:hidden">
                  Flowo
                </span>
                <span>{row.flowo}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
