import { CalendarDays, MessageCircle, Users } from "lucide-react";

const agendaSample = [
  { time: "09:00", client: "Marcos A.", service: "Corte", barber: "Rafa", status: "Confirmado" },
  { time: "10:00", client: "Felipe R.", service: "Corte + Barba", barber: "Pedro", status: "Confirmado" },
  { time: "11:30", client: "Diego M.", service: "Barba", barber: "Rafa", status: "A confirmar" },
  { time: "14:00", client: "João S.", service: "Corte + Barba", barber: "Pedro", status: "Confirmado" },
];

const summarySample = [
  { icon: CalendarDays, label: "Agendamentos hoje", value: "12" },
  { icon: MessageCircle, label: "Conversas atendidas pela IA", value: "9" },
  { icon: Users, label: "Clientes novos na semana", value: "4" },
];

export default function ProductDemo() {
  return (
    <section aria-labelledby="product-demo-title" className="section-normal bg-cream">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="product-demo-title" className="text-h2 font-semibold text-ink">
            O dia inteiro em um painel só
          </h2>
          <p className="mx-auto mt-4 max-w-measure text-lead text-muted-ink">
            Enquanto a IA atende no WhatsApp, você acompanha agenda, conversas e
            clientes em barber.flowo.com.br.
          </p>
        </div>

        <div
          role="img"
          aria-label="Prévia do painel do Flowo no navegador: agenda do dia por barbeiro com status de confirmação e resumo de agendamentos. Dados de exemplo."
          className="mx-auto mt-12 max-w-4xl"
        >
          <div aria-hidden="true" className="overflow-hidden rounded-xl border border-line bg-surface">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
              </span>
              <span className="mx-auto rounded-full bg-surface px-4 py-1 text-[11px] text-muted-ink">
                barber.flowo.com.br
              </span>
            </div>

            <div className="grid gap-px bg-line md:grid-cols-[1.6fr_1fr]">
              {/* Agenda do dia */}
              <div className="bg-surface p-5">
                <p className="text-label font-medium text-faint-ink">Agenda de hoje</p>
                <ul className="mt-3 divide-y divide-line">
                  {agendaSample.map((item) => (
                    <li key={item.time} className="flex items-center gap-4 py-3">
                      <span className="w-12 text-sm font-semibold tabular-nums text-ink">
                        {item.time}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink">
                          {item.client}
                        </span>
                        <span className="block text-xs text-muted-ink">
                          {item.service} · {item.barber}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          item.status === "Confirmado"
                            ? "bg-ink text-cream"
                            : "bg-surface-2 text-muted-ink"
                        }`}
                      >
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resumo */}
              <div className="bg-surface p-5">
                <p className="text-label font-medium text-faint-ink">Resumo</p>
                <ul className="mt-3 space-y-4">
                  {summarySample.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2">
                        <item.icon className="h-4 w-4 text-ink" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-lg font-semibold tabular-nums text-ink">
                          {item.value}
                        </span>
                        <span className="block text-xs text-muted-ink">{item.label}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-caption text-muted-ink">Dados de exemplo</p>
        </div>
      </div>
    </section>
  );
}
