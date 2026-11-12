import Image from "next/image";
import { CalendarDays, Check, MessageCircle, ShieldCheck } from "@/components/icons/flowo-icons";
import { cn } from "@/lib/utils";
import { PUBLIC_ENVIRONMENT } from "@/lib/environment";

function BrowserBar({ path }: { path: string }) {
  return (
    <div className="flex h-7 items-center gap-2 border-b border-line bg-surface-2 px-3 sm:h-9">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-[#ef6a5b]" />
        <span className="h-2 w-2 rounded-full bg-[#e9b94f]" />
        <span className="h-2 w-2 rounded-full bg-[#5bbf74]" />
      </div>
      <div className="mx-auto flex h-4 w-[58%] items-center justify-center rounded-md border border-line bg-surface px-2 text-[6px] text-muted-ink sm:h-5 sm:text-[8px]">
        {PUBLIC_ENVIRONMENT.appHostname}/{path}
      </div>
      <span className="w-7" aria-hidden="true" />
    </div>
  );
}

export function AgendaPreview({ className, detailed = false, chrome = true }: { className?: string; detailed?: boolean; chrome?: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-ink/20 bg-surface", className)}>
      {chrome && <BrowserBar path="agenda" />}
      <Image src="/images/product/agenda-equipe-web-20261112.png" alt="Agenda da Flowo com profissionais identificados no cabeçalho e atendimentos organizados por horário." width={1440} height={850} sizes={detailed ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 600px, 100vw"} className="h-auto w-full" />
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
          <p className="truncate text-[13px] font-semibold sm:text-sm">
            Barbearia Central
          </p>
          <p className="text-[11px] text-green-100">
            atendimento com IA
          </p>
        </div>
      </div>
      <div className="space-y-2 p-2.5 sm:p-3">
        <div className="mr-5 rounded-lg rounded-tl-sm bg-white px-2.5 py-2 text-[13px] leading-relaxed text-gray-800 shadow-sm">
          Oi! Queria agendar um corte amanhã. Você tem horário?
        </div>
        <div className="ml-4 rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-2 text-[13px] leading-relaxed text-gray-800 shadow-sm">
          Tenho, sim. Amanhã estão livres 9:00, 10:30, 14:00 e 16:30.
        </div>
        <div className="mr-8 rounded-lg rounded-tl-sm bg-white px-2.5 py-2 text-[13px] leading-relaxed text-gray-800 shadow-sm">
          10:30 com o Rafael, por favor.
        </div>
        <div className="ml-5 rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-2 text-[13px] leading-relaxed text-gray-800 shadow-sm">
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
            <p className="mt-0.5 text-xs text-muted-ink">
              Marcos · 10:30 · Rafael
            </p>
          </div>
        </div>
        <MessageCircle className="h-4 w-4 text-[oklch(0.48_0.11_150)]" aria-hidden="true" />
      </div>
      <div className="mt-4 border-t border-line pt-3">
        <p className="text-xs font-semibold text-ink">Histórico</p>
        <ol className="mt-2 space-y-1.5 text-xs text-muted-ink">
          <li>09:41 · Marcos pediu um corte</li>
          <li>09:41 · A IA mostrou os horários</li>
          <li>09:42 · Marcos escolheu Rafael</li>
          <li>09:42 · Horário confirmado</li>
        </ol>
      </div>
      <div
        aria-hidden="true"
        className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-ink px-4 text-xs font-semibold text-cream"
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

export function ProductDisclaimer({
  className,
  label = "Demonstração com dados ilustrativos",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <p className={cn("flex items-center gap-1.5 text-[10px] text-faint-ink sm:text-caption", className)}>
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
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
