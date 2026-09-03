import { Camera, ChevronLeft, Mic, Phone, Plus, Video } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A WhatsApp conversation drawn the way the iPhone app draws it: status bar,
 * header with the business avatar and "conta comercial", the paper wallpaper,
 * bubbles with tails, timestamps and blue ticks, and the message bar. Real
 * markup, so it stays sharp and selectable; no WhatsApp mark is reproduced.
 *
 * It is laid out at the phone's own logical width (390pt) and scaled to the
 * frame it sits in, so type and spacing keep the proportions of a real screen
 * instead of a chat blown up to fit a small box.
 *
 * The customer is on this phone, so their messages are the green outgoing
 * ones on the right and Flowo's answers arrive on the left.
 */
export type ChatMessage =
  | { from: "cliente" | "flowo" | "equipe"; text: string; at: string }
  | { day: string };
type Msg = ChatMessage;

const LOGICAL_WIDTH = 390;
const LOGICAL_HEIGHT = 844;

export const bookingConversation: Msg[] = [
  { from: "cliente", text: "Oi! Tem horário amanhã depois das 18h com o João?", at: "09:37" },
  {
    from: "flowo",
    text: "Tenho três horários com o João amanhã: 18:00, 18:30 e 19:00. Qual fica melhor pra você?",
    at: "09:37",
  },
  { from: "cliente", text: "18:30", at: "09:38" },
  {
    from: "flowo",
    text: "Agendado. Corte masculino amanhã às 18:30 com o João, 40 min, R$ 55. Se precisar remarcar, é só me chamar aqui.",
    at: "09:38",
  },
];

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" className="ml-1 inline-block h-[11px] w-4 text-[#53BDEB]" aria-hidden="true">
      <path
        d="M11.07.65 5.5 6.9 3.2 4.6l-1 1.05 3.3 3.4L12.1 1.7zM14.8.65 9.25 6.9l-.6-.65-1 1.06 1.6 1.7L15.85 1.7z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsAppChat({
  width = 248,
  className,
  messages = bookingConversation,
  logicalHeight = LOGICAL_HEIGHT,
}: {
  /** Rendered width in CSS px; the screen scales from 390pt to this. */
  width?: number;
  className?: string;
  /** The thread to draw; defaults to the booking from the home hero. */
  messages?: Msg[];
  /** Screen height in logical px; raise it to show a longer thread whole. */
  logicalHeight?: number;
}) {
  const scale = width / LOGICAL_WIDTH;
  const conversation = messages;
  return (
    <div
      role="img"
      aria-label="Conversa no WhatsApp com a Barbearia Central. O cliente pergunta se tem horário amanhã depois das 18h com o João, a Flowo oferece 18:00, 18:30 e 19:00, o cliente escolhe 18:30 e o corte fica agendado."
      className={cn("relative overflow-hidden", className)}
      style={{ width, height: Math.round(logicalHeight * scale) }}
    >
      <div
        className="absolute left-0 top-0 flex origin-top-left flex-col bg-[#EFEAE2] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',sans-serif] text-[#111B21]"
        style={{ width: LOGICAL_WIDTH, height: logicalHeight, transform: `scale(${scale})` }}
      >
        <div className="bg-[#F6F6F6]/95 pb-2">
          <div className="flex h-12 items-end justify-between px-7 pb-1 text-[16px] font-semibold">
            <span>9:41</span>
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span className="flex items-end gap-[2px]">
                <i className="block h-1.5 w-[3px] rounded-sm bg-current" />
                <i className="block h-2 w-[3px] rounded-sm bg-current" />
                <i className="block h-2.5 w-[3px] rounded-sm bg-current" />
                <i className="block h-3 w-[3px] rounded-sm bg-current" />
              </span>
              <span className="relative block h-[12px] w-[26px] rounded-[3px] border border-current">
                <i className="absolute inset-[2px] rounded-[1px] bg-current" />
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 px-2 pt-1">
            <ChevronLeft className="h-7 w-7 text-[#007AFF]" aria-hidden="true" />
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-[14px] font-semibold text-cream">
              BC
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[17px] font-semibold">Barbearia Central</p>
              <p className="text-[13px] text-[#667781]">conta comercial</p>
            </div>
            <Video className="h-6 w-6 text-[#007AFF]" aria-hidden="true" />
            <Phone className="mr-2 h-5 w-5 text-[#007AFF]" aria-hidden="true" />
          </div>
        </div>

        <div className="relative flex-1 space-y-2 px-3 pb-3 pt-3 [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.045)_1px,transparent_0)] [background-size:14px_14px]">
          {!conversation.some((m) => "day" in m) && (
            <p className="mx-auto mb-3 w-fit rounded-md bg-white/90 px-2.5 py-1 text-[12px] font-medium uppercase tracking-wide text-[#54656F] shadow-sm">
              Hoje
            </p>
          )}
          {conversation.map((m, i) => {
            if ("day" in m) {
              return (
                <p key={i} className="mx-auto my-3 w-fit rounded-md bg-white/90 px-2.5 py-1 text-[12px] font-medium uppercase tracking-wide text-[#54656F] shadow-sm">
                  {m.day}
                </p>
              );
            }
            const mine = m.from === "cliente";
            return (
              <div key={i} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "relative max-w-[78%] rounded-[10px] px-3 pb-1.5 pt-2 text-[16px] leading-[21px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]",
                    mine ? "rounded-tr-none bg-[#D9FDD3]" : "rounded-tl-none bg-white"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-0 h-0 w-0 border-t-[10px]",
                      mine ? "-right-[8px] border-l-[9px] border-l-[#D9FDD3]" : "-left-[8px] border-r-[9px] border-r-white"
                    )}
                    style={{ borderTopColor: mine ? "#D9FDD3" : "#fff" }}
                  />
                  {m.text}
                  <span className="float-right ml-2 mt-2 flex items-center text-[12px] leading-none text-[#667781]">
                    {m.at}
                    {mine && <Ticks />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5 bg-[#F6F6F6] px-3 pb-7 pt-2">
          <Plus className="h-7 w-7 text-[#007AFF]" aria-hidden="true" />
          <div className="flex h-10 flex-1 items-center rounded-full border border-[#D1D7DB] bg-white px-3.5 text-[16px] text-[#8696A0]">
            Mensagem
          </div>
          <Camera className="h-7 w-7 text-[#007AFF]" aria-hidden="true" />
          <Mic className="h-7 w-7 text-[#007AFF]" aria-hidden="true" />
        </div>
        <div className="flex justify-center bg-[#F6F6F6] pb-2" aria-hidden="true">
          <span className="h-[5px] w-36 rounded-full bg-[#111B21]" />
        </div>
      </div>
    </div>
  );
}
