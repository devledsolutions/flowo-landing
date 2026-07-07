import { CalendarCheck2, Check } from "lucide-react";

const conversation = [
  {
    from: "cliente",
    text: <>Oi! Tem horário pra corte amanhã de tarde?</>,
  },
  {
    from: "bia",
    text: (
      <>
        Oi, João! Amanhã à tarde tenho <strong>15h com o Rafa</strong> ou{" "}
        <strong>16h30 com o Pedro</strong>. Qual prefere?
      </>
    ),
  },
  {
    from: "cliente",
    text: <>16h30 com o Pedro</>,
  },
  {
    from: "bia",
    text: (
      <>
        Fechado! <strong>Corte com o Pedro amanhã às 16h30</strong>. Amanhã eu
        te lembro por aqui.
      </>
    ),
  },
];

function DoubleCheck() {
  return (
    <span aria-hidden="true" className="relative inline-block h-3 w-4">
      <Check className="absolute left-0 top-0 h-3 w-3" style={{ color: "#53bdeb" }} />
      <Check className="absolute left-1 top-0 h-3 w-3" style={{ color: "#53bdeb" }} />
    </span>
  );
}

export default function Demo() {
  return (
    <section aria-labelledby="demo-title" className="section-normal bg-cream">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="demo-title" className="text-h2 font-semibold text-ink">
            Veja a Bia atendendo
          </h2>
          <p className="mx-auto mt-4 max-w-measure text-lead text-muted-ink">
            Assim uma conversa vira um horário confirmado na sua agenda.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-12">
          {/* WhatsApp chat mock: green + blue ticks are literal product chrome */}
          <div
            role="img"
            aria-label="Conversa de exemplo no WhatsApp: o cliente pede um corte para amanhã à tarde, a IA oferece dois horários livres e confirma o corte com o Pedro às 16h30."
            className="mx-auto w-full max-w-md"
          >
            <div aria-hidden="true" className="overflow-hidden rounded-xl bg-surface shadow-card">
              <div className="flex items-center gap-3 bg-ink px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream font-serif text-sm font-semibold text-ink">
                  B
                </span>
                <span>
                  <span className="block text-sm font-medium text-cream">
                    Barbearia do Rafa
                  </span>
                  <span className="block text-[11px] text-cream/70">online</span>
                </span>
              </div>
              <div className="space-y-2.5 bg-surface-2 px-4 py-5">
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.from === "cliente" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed text-[#111b21] shadow-[0_1px_1px_oklch(0.205_0.012_110/0.1)] ${
                        message.from === "cliente"
                          ? "rounded-br-sm bg-[#d9fdd3]"
                          : "rounded-bl-sm bg-white"
                      }`}
                    >
                      {message.text}
                      {message.from === "cliente" && (
                        <span className="ml-1.5 inline-flex align-baseline">
                          <DoubleCheck />
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-center text-caption text-muted-ink">
              Conversa de exemplo
            </p>
          </div>

          {/* What lands on the barber's side */}
          <div className="mx-auto w-full max-w-md lg:mt-6">
            <h3 className="text-label font-medium text-faint-ink">
              O que aparece no seu painel
            </h3>
            <div className="mt-4 rounded-xl border border-line bg-surface p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2">
                  <CalendarCheck2 aria-hidden="true" className="h-5 w-5 text-ink" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink">Corte · João S.</p>
                  <p className="mt-0.5 text-sm text-muted-ink">
                    Amanhã às 16h30 · com Pedro
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium text-cream">
                    <Check aria-hidden="true" className="h-3 w-3" />
                    Lembrete automático programado
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-measure text-sm text-muted-ink">
              O horário entra na agenda, sincroniza com seu calendário e o
              lembrete de confirmação sai sozinho antes do atendimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
