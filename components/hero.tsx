import type { CSSProperties } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Smile,
  Video,
} from "lucide-react";
import { SIGNUP_URL, WHATSAPP_URL } from "./cta-links";

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1635273051937-a0ddef9573b6?auto=format&fit=crop&w=1600&q=80";

const features = [
  {
    title: "IA no WhatsApp 24h",
    description: "Responde, agenda e confirma sozinha",
  },
  {
    title: "Confirmação automática",
    description: "Cliente confirma pelo WhatsApp ou o horário volta pra agenda",
  },
  {
    title: "Pagamento no atendimento",
    description: "PIX ou cartão direto na conversa, se o cliente quiser",
  },
  {
    title: "Sync com seus calendários",
    description: "Google, Apple e Outlook em tempo real",
  },
];

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

const bubbleAt = (seconds: number): CSSProperties => ({
  animationDelay: `${seconds}s`,
});

function BlueTicks() {
  return (
    <svg
      className="w-4 h-4 text-[#53bdeb]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-cream">
      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: none; }
        }
        .hero-rise {
          animation: hero-rise 0.7s var(--ease-out-expo) both;
          animation-delay: calc(var(--i, 0) * 70ms);
        }
        @keyframes hero-bubble {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        .hero-bubble {
          animation: hero-bubble 0.5s var(--ease-out-expo) both;
        }
      `}</style>

      {/* Full-bleed barbershop photo, ink duotone, under a cream scrim on the text side */}
      <div className="absolute inset-x-0 bottom-0 top-[40%] -z-10 md:top-0" aria-hidden="true">
        <Image
          src={HERO_PHOTO}
          alt=""
          fill
          priority
          sizes="100vw"
          className="img-duotone object-cover object-[70%_30%]"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-cream from-[42%] via-cream/85 via-[62%] to-cream/10 md:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/75 to-cream/25 md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-cream" />
      </div>

      <div className="container-page grid items-center gap-14 pb-16 pt-28 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
        {/* Copy column */}
        <div>
          {/* Display cut of the fluid scale, ceiling tuned so each line holds in the split column */}
          <h1 className="font-bold leading-[1.06] tracking-[-0.025em] text-ink-strong [font-size:clamp(2.35rem,1.5rem+3.2vw,4.3rem)]">
            <span className="hero-rise block" style={stagger(0)}>
              A IA que atende
            </span>
            <span className="hero-rise block" style={stagger(1)}>
              sua barbearia
            </span>
            <span className="hero-rise block" style={stagger(2)}>
              <em className="font-serif font-semibold italic tracking-[-0.008em]">
                como gente
              </em>
              .
            </span>
          </h1>

          <p
            className="hero-rise mt-6 max-w-[46ch] text-lead text-muted-ink"
            style={stagger(3)}
          >
            Agendamento pelo WhatsApp: a Bia responde na hora, marca o horário
            e confirma presença. Você cuida do corte, ela cuida da agenda.
          </p>

          <div
            className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row"
            style={stagger(4)}
          >
            <a
              href={SIGNUP_URL}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-label font-semibold text-cream transition-colors duration-200 ease-out-quint hover:bg-ink/90"
            >
              Começar agora
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-cream/80 px-7 text-label font-medium text-ink transition-colors duration-200 ease-out-quint hover:bg-surface"
            >
              Falar no WhatsApp
            </a>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {features.map((feature, index) => (
              <li
                key={feature.title}
                className="hero-rise flex items-start gap-3"
                style={stagger(5 + index)}
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-label font-semibold text-ink">
                    {feature.title}
                  </p>
                  <p className="text-caption text-muted-ink">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Product hero: the WhatsApp/Bia chat mock */}
        <div className="flex justify-center lg:justify-end">
          <div
            role="img"
            aria-label="Demonstração de uma conversa no WhatsApp: a Bia oferece horários, agenda o corte, avisa que vai confirmar por lembrete e envia um PIX opcional para quem quiser deixar pago"
            className="hero-rise relative"
            style={stagger(2)}
          >
            {/* Phone frame (literal device: bezel radius exempt from the shape lock) */}
            <div className="w-[300px] rounded-[2.5rem] bg-black p-[10px] shadow-[0_25px_50px_-12px_oklch(0.205_0.012_110/0.5)] ring-1 ring-black/40 md:w-[340px]">
              <div className="absolute left-1/2 top-[18px] z-20 h-[28px] w-[90px] -translate-x-1/2 rounded-full bg-black" />
              <div className="absolute -left-[3px] top-[120px] h-[30px] w-[3px] rounded-l-lg bg-gray-700" />
              <div className="absolute -left-[3px] top-[160px] h-[30px] w-[3px] rounded-l-lg bg-gray-700" />
              <div className="absolute -right-[3px] top-[140px] h-[40px] w-[3px] rounded-r-lg bg-gray-700" />

              <div className="overflow-hidden rounded-[2rem] bg-black">
                {/* Status bar */}
                <div className="flex items-center justify-between bg-[#075e54] px-6 pb-1 pt-3 text-xs text-white">
                  <span className="font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71s.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.73v3.1c0 .4.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71s-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z" />
                    </svg>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 22h20V2z" opacity="0.3" />
                      <path d="M17 4h3v16h-3V4zm-4 4h3v12h-3V8zm-4 4h3v8H9v-8zm-4 4h3v4H5v-4z" />
                    </svg>
                    <div className="flex items-center">
                      <div className="relative h-3 w-6 rounded-sm border border-white">
                        <div className="absolute inset-[2px] right-[3px] rounded-[1px] bg-white" />
                      </div>
                      <div className="ml-[1px] h-[6px] w-[2px] rounded-r-sm bg-white" />
                    </div>
                  </div>
                </div>

                {/* WhatsApp header */}
                <div className="flex items-center gap-2 bg-[#075e54] px-2 py-2 text-white">
                  <ChevronLeft className="h-6 w-6 opacity-90" />
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-400 text-xs font-bold text-gray-700 ring-2 ring-white/20">
                    BC
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold">
                      Barbearia Central
                    </p>
                    <p className="text-[11px] text-green-200">online</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Video className="h-5 w-5 opacity-90" />
                    <Phone className="h-5 w-5 opacity-90" />
                    <MoreVertical className="h-5 w-5 opacity-90" />
                  </div>
                </div>

                {/* Chat background */}
                <div
                  className="relative min-h-[480px] md:min-h-[520px]"
                  style={{
                    backgroundColor: "#efeae2",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cfc4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                >
                  <div className="flex justify-center py-2">
                    <span className="rounded-lg bg-white/80 px-3 py-1 text-[11px] text-gray-600 shadow-sm">
                      HOJE
                    </span>
                  </div>

                  <div className="space-y-1 px-3 pb-16">
                    {/* Customer */}
                    <div className="hero-bubble flex justify-end" style={bubbleAt(0.7)}>
                      <div className="relative max-w-[80%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-2.5 py-1.5 shadow-sm">
                        <p className="pr-12 text-[13px] text-gray-800">
                          Oi, quero marcar um corte pra amanhã
                        </p>
                        <span className="absolute bottom-1 right-2 flex items-center gap-0.5 text-[10px] text-gray-500">
                          14:32
                          <BlueTicks />
                        </span>
                      </div>
                    </div>

                    {/* Bia: real slots */}
                    <div className="hero-bubble flex justify-start" style={bubbleAt(1.15)}>
                      <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-2.5 py-1.5 shadow-sm">
                        <p className="text-[13px] text-gray-800">
                          Fala, Marcos! Amanhã tenho esses horários:
                        </p>
                        <div className="mb-1 mt-1.5 flex flex-wrap gap-1.5">
                          {["09:00", "10:30", "14:00", "16:30"].map((time) => (
                            <span
                              key={time}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-[12px] font-medium text-gray-700"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                        <p className="text-[13px] text-gray-800">
                          Qual fica melhor pra você?
                        </p>
                        <p className="mt-0.5 text-right text-[10px] text-gray-500">
                          14:32
                        </p>
                      </div>
                    </div>

                    {/* Customer picks */}
                    <div className="hero-bubble flex justify-end" style={bubbleAt(1.6)}>
                      <div className="relative max-w-[80%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-2.5 py-1.5 shadow-sm">
                        <p className="pr-12 text-[13px] text-gray-800">
                          10:30 com o Rafael
                        </p>
                        <span className="absolute bottom-1 right-2 flex items-center gap-0.5 text-[10px] text-gray-500">
                          14:33
                          <BlueTicks />
                        </span>
                      </div>
                    </div>

                    {/* Bia: confirmation + optional payment (never a booking gate) */}
                    <div className="hero-bubble flex justify-start" style={bubbleAt(2.05)}>
                      <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-2.5 py-1.5 shadow-sm">
                        <div className="text-[13px] text-gray-800">
                          <p>Fechado com o Rafael! 🤙</p>
                          <p className="mt-2">
                            <span className="font-semibold">Corte degradê</span>
                          </p>
                          <p>📅 Amanhã (terça), 10:30</p>
                          <p>💰 R$ 45,00</p>
                          <p className="mt-2">
                            Amanhã cedo te mando um lembrete pra confirmar. Se
                            quiser, já deixa pago por aqui 👇
                          </p>
                        </div>
                        <p className="mt-0.5 text-right text-[10px] text-gray-500">
                          14:33
                        </p>
                      </div>
                    </div>

                    {/* PIX card (payment for the atendimento, optional) */}
                    <div className="hero-bubble flex justify-start" style={bubbleAt(2.4)}>
                      <div className="max-w-[75%] rounded-lg rounded-tl-none bg-white p-1.5 shadow-sm">
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                          <div className="flex items-center gap-2 bg-[#32bcad] px-3 py-2 text-white">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M15.45 16.52l-3.01-3.01c-.11-.11-.24-.13-.31-.13s-.2.02-.31.13L8.8 16.52c-.34.34-.87.34-1.21 0l-.71-.71c-.34-.34-.34-.87 0-1.21l3.01-3.01c.11-.11.13-.24.13-.31s-.02-.2-.13-.31L6.88 7.96c-.34-.34-.34-.87 0-1.21l.71-.71c.34-.34.87-.34 1.21 0l3.01 3.01c.11.11.24.13.31.13s.2-.02.31-.13l3.01-3.01c.34-.34.87-.34 1.21 0l.71.71c.34.34.34.87 0 1.21l-3.01 3.01c-.11.11-.13.24-.13.31s.02.2.13.31l3.01 3.01c.34.34.34.87 0 1.21l-.71.71c-.34.34-.87.34-1.21 0z" />
                            </svg>
                            <span className="text-[12px] font-semibold">PIX</span>
                          </div>

                          <div className="flex justify-center bg-white p-3">
                            <div className="h-24 w-24 bg-white p-1">
                              <Image
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 29 29'%3E%3Crect width='29' height='29' fill='white'/%3E%3Cpath d='M0 0h7v7H0zM8 0h1v1H8zM10 0h3v1h-3zM14 0h1v2h-1zM16 0h2v1h-2zM19 0h3v1h-3zM22 0h7v7h-7zM1 1v5h5V1zM23 1v5h5V1zM2 2h3v3H2zM24 2h3v3h-3zM8 2h1v1H8zM10 2h1v2h-1zM12 2h1v1h-1zM15 2h1v1h-1zM17 2h1v1h-1zM19 2h2v1h-2zM8 4h2v1H8zM12 4h3v1h-3zM16 4h1v3h-1zM18 4h1v1h-1zM20 4h1v2h-1zM9 5h1v1H9zM11 5h1v1h-1zM14 5h1v2h-1zM17 5h1v1h-1zM8 6h1v1H8zM10 6h1v2h-1zM12 6h2v1h-2zM18 6h2v1h-2zM0 8h1v1H0zM2 8h1v1H2zM4 8h2v1H4zM8 8h1v1H8zM13 8h1v2h-1zM15 8h1v1h-1zM17 8h4v1h-4zM22 8h1v1h-1zM24 8h2v1h-2zM27 8h2v1h-2zM1 9h1v1H1zM3 9h3v1H3zM9 9h1v1H9zM11 9h1v1h-1zM14 9h1v1h-1zM16 9h1v1h-1zM21 9h1v1h-1zM23 9h1v1h-1zM28 9h1v1h-1zM0 10h1v2H0zM2 10h2v1H2zM5 10h1v1H5zM8 10h2v1H8zM12 10h1v1h-1zM17 10h2v1h-2zM20 10h1v2h-1zM22 10h2v1h-2zM25 10h1v1h-1zM27 10h1v1h-1zM1 11h1v1H1zM4 11h1v1H4zM6 11h2v1H6zM10 11h3v1h-3zM14 11h2v1h-2zM18 11h1v1h-1zM21 11h1v1h-1zM23 11h1v2h-1zM26 11h1v1h-1zM28 11h1v1h-1zM2 12h1v1H2zM5 12h1v1H5zM8 12h1v1H8zM11 12h1v1h-1zM13 12h1v1h-1zM15 12h2v1h-2zM18 12h2v1h-2zM24 12h2v1h-2zM27 12h2v1h-2zM0 13h2v1H0zM3 13h2v1H3zM6 13h3v1H6zM10 13h1v1h-1zM12 13h1v2h-1zM14 13h3v1h-3zM19 13h1v1h-1zM22 13h1v1h-1zM25 13h1v1h-1zM1 14h1v1H1zM4 14h1v1H4zM8 14h3v1H8zM13 14h1v1h-1zM17 14h1v1h-1zM20 14h2v1h-2zM23 14h1v1h-1zM26 14h1v1h-1zM28 14h1v1h-1zM0 15h1v1H0zM2 15h1v1H2zM5 15h2v1H5zM9 15h2v1H9zM14 15h2v1h-2zM18 15h1v1h-1zM21 15h1v1h-1zM24 15h1v1h-1zM27 15h1v1h-1zM1 16h1v1H1zM3 16h1v1H3zM6 16h1v1H6zM8 16h1v1H8zM10 16h3v1h-3zM15 16h1v1h-1zM19 16h1v1h-1zM22 16h2v1h-2zM25 16h3v1h-3zM0 17h2v1H0zM4 17h1v1H4zM7 17h1v1H7zM11 17h1v1h-1zM14 17h1v1h-1zM17 17h1v1h-1zM20 17h1v1h-1zM23 17h1v1h-1zM26 17h1v1h-1zM28 17h1v1h-1zM2 18h1v1H2zM5 18h1v1H5zM8 18h2v1H8zM12 18h2v1h-2zM16 18h1v1h-1zM18 18h2v1h-2zM21 18h1v1h-1zM24 18h2v1h-2zM1 19h1v1H1zM3 19h2v1H3zM6 19h1v2H6zM9 19h1v1H9zM11 19h1v1h-1zM14 19h1v1h-1zM17 19h1v1h-1zM19 19h1v1h-1zM22 19h1v1h-1zM25 19h1v1h-1zM27 19h2v1h-2zM0 20h1v1H0zM4 20h1v1H4zM8 20h1v1H8zM10 20h1v1h-1zM13 20h2v1h-2zM16 20h2v1h-2zM20 20h1v1h-1zM23 20h1v1h-1zM26 20h1v1h-1zM28 20h1v1h-1zM8 21h2v1H8zM11 21h1v1h-1zM14 21h1v1h-1zM18 21h1v1h-1zM21 21h1v1h-1zM24 21h2v1h-2zM0 22h7v7H0zM9 22h1v1H9zM12 22h2v1h-2zM15 22h2v1h-2zM19 22h1v1h-1zM22 22h1v1h-1zM25 22h1v1h-1zM27 22h1v1h-1zM1 23v5h5v-5zM8 23h1v1H8zM11 23h1v1h-1zM14 23h1v1h-1zM17 23h1v1h-1zM20 23h1v2h-1zM23 23h1v1h-1zM26 23h2v1h-2zM2 24h3v3H2zM9 24h2v1H9zM13 24h1v1h-1zM16 24h1v1h-1zM18 24h1v1h-1zM21 24h2v1h-2zM24 24h1v1h-1zM28 24h1v1h-1zM8 25h1v1H8zM11 25h1v1h-1zM14 25h1v1h-1zM17 25h1v1h-1zM22 25h1v2h-1zM25 25h1v1h-1zM27 25h1v1h-1zM9 26h1v1H9zM12 26h2v1h-2zM15 26h1v1h-1zM19 26h2v1h-2zM24 26h1v1h-1zM26 26h1v1h-1zM28 26h1v1h-1zM8 27h2v1H8zM11 27h1v1h-1zM14 27h1v1h-1zM17 27h1v1h-1zM20 27h1v1h-1zM23 27h1v1h-1zM25 27h3v1h-3zM9 28h1v1H9zM12 28h1v1h-1zM16 28h2v1h-2zM21 28h1v1h-1zM24 28h1v1h-1zM27 28h1v1h-1z' fill='black'/%3E%3C/svg%3E"
                                alt=""
                                width={96}
                                height={96}
                                className="h-full w-full"
                              />
                            </div>
                          </div>

                          <div className="border-t border-gray-200 py-2 text-center">
                            <p className="text-[10px] text-gray-500">Valor</p>
                            <p className="text-[16px] font-bold text-gray-900">
                              R$ 45,00
                            </p>
                          </div>

                          <div className="border-t border-gray-200 bg-gray-100 p-2">
                            <p className="mb-1 text-[9px] text-gray-500">
                              Copia e Cola:
                            </p>
                            <p className="break-all font-mono text-[8px] leading-tight text-gray-600">
                              00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890
                            </p>
                          </div>
                        </div>
                        <p className="mt-1 text-right text-[10px] text-gray-500">
                          14:33
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-[#f0f0f0] px-2 py-2">
                    <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2">
                      <Smile className="h-5 w-5 text-gray-500" />
                      <span className="flex-1 text-[14px] text-gray-400">
                        Mensagem
                      </span>
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00a884]">
                      <Mic className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
