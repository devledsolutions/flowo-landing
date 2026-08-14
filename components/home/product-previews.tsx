import { CalendarDays, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const professionals = [
  {
    name: "Rafael",
    hours: "08:00 - 17:00",
    appointments: [
      { time: "09:00", name: "Bruno", service: "Corte" },
      { time: "10:30", name: "Marcos", service: "Corte", highlighted: true },
      { time: "14:00", name: "Lucas", service: "Barba" },
    ],
  },
  {
    name: "Pedro",
    hours: "09:00 - 18:30",
    appointments: [
      { time: "09:30", name: "Felipe", service: "Corte + barba" },
      { time: "11:00", name: "Gustavo", service: "Corte" },
      { time: "15:00", name: "André", service: "Corte" },
    ],
  },
  {
    name: "Júlia",
    hours: "10:00 - 19:00",
    appointments: [
      { time: "10:00", name: "Camila", service: "Escova" },
      { time: "13:30", name: "Larissa", service: "Corte" },
      { time: "16:30", name: "Beatriz", service: "Escova" },
    ],
  },
] as const;

function BrowserBar({ path }: { path: string }) {
  return (
    <div className="flex h-7 items-center gap-2 border-b border-line bg-surface-2 px-3 sm:h-9">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-[#ef6a5b]" />
        <span className="h-2 w-2 rounded-full bg-[#e9b94f]" />
        <span className="h-2 w-2 rounded-full bg-[#5bbf74]" />
      </div>
      <div className="mx-auto flex h-4 w-[58%] items-center justify-center rounded-md border border-line bg-surface px-2 text-[6px] text-muted-ink sm:h-5 sm:text-[8px]">
        barber.flowo.com.br/{path}
      </div>
      <span className="w-7" aria-hidden="true" />
    </div>
  );
}

export function AgendaPreview({
  className,
  detailed = false,
}: {
  className?: string;
  detailed?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label="Agenda do Flowo com horários separados para Rafael, Pedro e Júlia. O corte de Marcos com Rafael, às dez e meia, está confirmado."
      className={cn(
        "overflow-hidden rounded-xl border border-ink/20 bg-surface shadow-[0_28px_70px_-45px_oklch(0.17_0.012_110/0.65)]",
        className
      )}
    >
      <BrowserBar path="agenda" />
      <div className="flex items-center justify-between border-b border-line px-3 py-2 sm:px-5 sm:py-3">
        <div>
          <p className="text-[10px] font-semibold leading-none text-ink sm:text-sm">
            Agenda
          </p>
          <p className="mt-1 hidden text-[7px] text-muted-ink sm:block sm:text-[9px]">
            Quarta-feira, 29 de julho
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md border border-line px-2 py-1 text-[6px] font-medium text-ink sm:text-[8px]">
            Dia
          </span>
          <span className="rounded-md bg-ink px-2 py-1 text-[6px] font-medium text-cream sm:text-[8px]">
            + Novo agendamento
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-line">
        {professionals.map((professional) => (
          <div key={professional.name} className="min-w-0">
            <div className="border-b border-line px-2 py-2 sm:px-3">
              <p className="truncate text-[7px] font-semibold text-ink sm:text-[10px]">
                {professional.name}
              </p>
              <p className="mt-0.5 truncate text-[5px] text-muted-ink sm:text-[7px]">
                {professional.hours}
              </p>
            </div>
            <div className={cn("space-y-1.5 p-1.5 sm:p-2.5", detailed ? "min-h-52 sm:min-h-72" : "min-h-40 sm:min-h-56")}>
              {professional.appointments.map((appointment) => (
                <div
                  key={`${professional.name}-${appointment.time}`}
                  className={cn(
                    "rounded-md border px-1.5 py-1.5 sm:px-2 sm:py-2",
                    "highlighted" in appointment && appointment.highlighted
                      ? "border-[oklch(0.58_0.11_150)] bg-[oklch(0.95_0.035_145)]"
                      : "border-line bg-surface"
                  )}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <p className="text-[6px] font-medium text-ink sm:text-[8px]">
                        {appointment.time}
                      </p>
                      <p className="truncate text-[6px] font-semibold text-ink sm:text-[9px]">
                        {appointment.name}
                      </p>
                      <p className="truncate text-[5px] text-muted-ink sm:text-[7px]">
                        {appointment.service}
                      </p>
                    </div>
                    {detailed && (
                      <span className="hidden text-[6px] font-medium text-[oklch(0.45_0.09_150)] lg:block">
                        Confirmado
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConversationPreview({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Conversa no WhatsApp da Barbearia Central. A inteligência artificial oferece horários e confirma o corte de Marcos com Rafael às dez e meia."
      className={cn(
        "overflow-hidden rounded-xl border border-ink/20 bg-[#efeae2] shadow-[0_24px_55px_-35px_oklch(0.17_0.012_110/0.75)]",
        className
      )}
    >
      <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2 text-white">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-[9px] font-semibold">
          BC
        </div>
        <div className="min-w-0">
          <p className="truncate text-[9px] font-semibold sm:text-[11px]">
            Barbearia Central
          </p>
          <p className="text-[7px] text-green-100 sm:text-[8px]">
            atendimento com IA
          </p>
        </div>
      </div>
      <div className="space-y-2 p-2.5 sm:p-3">
        <div className="mr-5 rounded-lg rounded-tl-sm bg-white px-2.5 py-2 text-[8px] leading-relaxed text-gray-800 shadow-sm sm:text-[10px]">
          Oi! Queria agendar um corte amanhã. Você tem horário?
        </div>
        <div className="ml-4 rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-2 text-[8px] leading-relaxed text-gray-800 shadow-sm sm:text-[10px]">
          Tenho, sim. Amanhã estão livres 9:00, 10:30, 14:00 e 16:30.
        </div>
        <div className="mr-8 rounded-lg rounded-tl-sm bg-white px-2.5 py-2 text-[8px] leading-relaxed text-gray-800 shadow-sm sm:text-[10px]">
          10:30 com o Rafael, por favor.
        </div>
        <div className="ml-5 rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-2 text-[8px] leading-relaxed text-gray-800 shadow-sm sm:text-[10px]">
          Agendado. Corte com Rafael às 10:30. ✓
        </div>
      </div>
    </div>
  );
}

export function ConfirmationPreview({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Agendamento de Marcos confirmado para dez e meia com Rafael, com histórico da conversa e opção para a equipe assumir o atendimento."
      className={cn(
        "rounded-xl border border-line bg-surface p-4 shadow-[0_22px_55px_-40px_oklch(0.17_0.012_110/0.5)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[oklch(0.93_0.05_150)] text-[oklch(0.45_0.1_150)]">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold text-ink">Agendamento confirmado</p>
            <p className="mt-0.5 text-[9px] text-muted-ink">
              Marcos · 10:30 · Rafael
            </p>
          </div>
        </div>
        <MessageCircle className="h-4 w-4 text-[oklch(0.48_0.11_150)]" aria-hidden="true" />
      </div>
      <div className="mt-4 border-t border-line pt-3">
        <p className="text-[9px] font-semibold text-ink">Histórico</p>
        <ol className="mt-2 space-y-1.5 text-[8px] text-muted-ink">
          <li>09:41 · Marcos pediu um corte</li>
          <li>09:41 · A IA mostrou os horários</li>
          <li>09:42 · Marcos escolheu Rafael</li>
          <li>09:42 · Horário confirmado</li>
        </ol>
      </div>
      <div
        aria-hidden="true"
        className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-ink px-4 text-[10px] font-semibold text-cream"
      >
        Assumir conversa
      </div>
    </div>
  );
}

export function PaymentPreview({ className }: { className?: string }) {
  const methods = [
    ["Dinheiro", "Registrar"],
    ["Maquininha própria", "Registrar"],
    ["PIX Flowo", "Opcional"],
    ["Cartão Flowo", "Opcional"],
  ] as const;

  return (
    <div
      role="img"
      aria-label="Comanda do corte de Marcos no valor de quarenta e cinco reais. Depois do atendimento, a equipe pode registrar dinheiro, maquininha própria, PIX Flowo ou cartão Flowo."
      className={cn(
        "preview-light overflow-hidden rounded-xl border border-ink/20 bg-surface shadow-[0_28px_70px_-45px_oklch(0.17_0.012_110/0.7)]",
        className
      )}
    >
      <BrowserBar path="atendimentos/89271" />
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <p className="text-caption text-muted-ink">Comanda #89271</p>
            <p className="mt-1 text-lg font-semibold text-ink sm:text-xl">Marcos</p>
            <p className="text-[10px] text-muted-ink">Corte · Rafael</p>
          </div>
          <p className="text-xl font-semibold tabular-nums text-ink sm:text-2xl">
            R$ 45,00
          </p>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-[oklch(0.72_0.08_150)] bg-[oklch(0.96_0.025_150)] p-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[oklch(0.5_0.1_150)] text-[oklch(0.45_0.1_150)]">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-ink">Atendimento concluído</p>
            <p className="text-[9px] text-muted-ink">
              Cobrança liberada depois do serviço
            </p>
          </div>
        </div>
        <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.1em] text-faint-ink">
          Como o cliente pagou?
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {methods.map(([method, status]) => (
            <div key={method} className="rounded-lg border border-line px-3 py-2.5">
              <p className="text-[10px] font-medium text-ink">{method}</p>
              <p className="mt-0.5 text-[8px] text-muted-ink">{status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductDisclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-center gap-1.5 text-[10px] text-faint-ink sm:text-caption", className)}>
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
      Demonstração com dados ilustrativos
    </p>
  );
}

export function JourneyConnector() {
  return (
    <div className="hidden flex-1 items-center md:flex" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <span className="mx-2 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface">
        <CalendarDays className="h-3.5 w-3.5 text-muted-ink" />
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
