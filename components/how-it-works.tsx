"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Home,
  MessageCircle,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    title: "O cliente chama no WhatsApp",
    description:
      "A IA responde na hora, em linguagem natural. Mostra os serviços com preço e oferece só horários realmente livres na agenda.",
  },
  {
    title: "Escolhe serviço, barbeiro e horário",
    description:
      "O agendamento entra direto na agenda da barbearia e sincroniza com Google, Apple e Outlook. Sem conflito de horário.",
  },
  {
    title: "Confirmação automática contra faltas",
    description:
      "Lembrete 24h e 2h antes, pelo próprio WhatsApp. O cliente confirma, remarca ou cancela na mesma conversa, sem te ligar.",
  },
  {
    title: "Você só atende",
    description:
      "O dia aparece organizado no painel. Se quiser, o cliente paga o atendimento por PIX ou cartão na hora.",
  },
];

const timeline = [
  {
    id: 1,
    title: "Novo agendamento",
    message: "João S. · Corte + Barba · sexta 14h",
    time: "agora",
    icon: CalendarDays,
    confirmed: false,
  },
  {
    id: 2,
    title: "Lembrete enviado",
    message: "24h antes · João S. avisado no WhatsApp",
    time: "automático",
    icon: Bell,
    confirmed: false,
  },
  {
    id: 3,
    title: "Cliente respondeu",
    message: "Confirmado, até amanhã!",
    time: "agora",
    icon: MessageCircle,
    confirmed: false,
  },
  {
    id: 4,
    title: "Presença confirmada",
    message: "João S. · sexta 14h · confirmado",
    time: "agora",
    icon: CheckCircle2,
    confirmed: true,
  },
];

const sampleAgenda = [
  { time: "09:00", client: "Marcos A.", service: "Corte", status: "Confirmado" },
  { time: "10:00", client: "Felipe R.", service: "Corte + Barba", status: "Confirmado" },
  { time: "11:30", client: "Diego M.", service: "Barba", status: "A confirmar" },
];

function PhoneMockup() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [activeToast, setActiveToast] = useState(timeline.length - 1);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let index = 0;
    setActiveToast(0);
    const interval = setInterval(() => {
      index = (index + 1) % timeline.length;
      setActiveToast(index);
    }, 2600);
    return () => clearInterval(interval);
  }, [reduceMotion, inView]);

  const toast = timeline[activeToast];
  const ToastIcon = toast.icon;

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Prévia do painel do Flowo no celular: um agendamento chega pelo WhatsApp, o lembrete sai sozinho e a presença é confirmada. Dados de exemplo."
      className="relative mx-auto w-full max-w-[320px]"
    >
      <div aria-hidden="true">
        {/* Device bezel (literal device, radius exempt) */}
        <div className="rounded-[2.5rem] bg-ink p-2.5 shadow-card">
          <div className="relative overflow-hidden rounded-[2rem] bg-cream">
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pb-1 pt-4 text-[11px] font-medium text-ink">
              <span>9:41</span>
              <span className="h-2 w-16 rounded-full bg-ink/90" />
            </div>

            {/* App header */}
            <div className="flex items-center justify-between px-5 pb-1 pt-2">
              <Image src="/flowo-logo.svg" alt="" width={56} height={14} />
              <span className="relative inline-flex">
                <Bell className="h-4 w-4 text-muted-ink" />
                <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-ink text-[7px] font-semibold text-cream">
                  2
                </span>
              </span>
            </div>

            {/* Greeting */}
            <div className="px-5 pb-3 pt-1">
              <p className="text-sm font-semibold text-ink">Olá, Gustavo</p>
              <p className="text-[10px] text-muted-ink">Sexta-feira · agenda de hoje</p>
            </div>

            {/* Notification slot: in-flow so it never covers the cards below */}
            <div className="relative h-[4.25rem] px-4 pb-3">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={toast.id}
                  initial={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="flex items-start gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5"
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      toast.confirmed ? "bg-success/15" : "bg-surface-2"
                    }`}
                  >
                    <ToastIcon
                      className="h-4 w-4"
                      style={{ color: toast.confirmed ? "var(--success)" : "var(--ink)" }}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-[11px] font-semibold text-ink">{toast.title}</span>
                      <span className="shrink-0 text-[9px] text-muted-ink">{toast.time}</span>
                    </span>
                    <span className="block truncate text-[10px] leading-snug text-muted-ink">
                      {toast.message}
                    </span>
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Day summary, neutral sample numbers */}
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between rounded-xl bg-surface px-4 py-3 shadow-card">
                <div>
                  <p className="text-[10px] text-muted-ink">Hoje</p>
                  <p className="text-xs font-semibold text-ink">8 agendamentos</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-ink">A confirmar</p>
                  <p className="text-xs font-semibold text-ink">1</p>
                </div>
              </div>
            </div>

            {/* Agenda list */}
            <div className="space-y-2 px-4 pb-4">
              {sampleAgenda.map((item) => (
                <div
                  key={item.time}
                  className="flex items-center gap-3 rounded-xl bg-surface px-4 py-2.5 shadow-card"
                >
                  <span className="text-[11px] font-semibold tabular-nums text-ink">
                    {item.time}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-medium text-ink">
                      {item.client}
                    </span>
                    <span className="block text-[10px] text-muted-ink">{item.service}</span>
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${
                      item.status === "Confirmado"
                        ? "bg-ink text-cream"
                        : "bg-surface-2 text-muted-ink"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom nav */}
            <div className="border-t border-line bg-surface px-3 pb-5 pt-2">
              <div className="flex justify-around">
                {[
                  { icon: Home, label: "Início", active: true },
                  { icon: CalendarDays, label: "Agenda", active: false },
                  { icon: MessageCircle, label: "Conversas", active: false },
                  { icon: Users, label: "Clientes", active: false },
                ].map((item) => (
                  <span key={item.label} className="flex flex-col items-center gap-1">
                    <item.icon
                      className={`h-4 w-4 ${item.active ? "text-ink" : "text-faint-ink"}`}
                    />
                    <span
                      className={`text-[8px] ${
                        item.active ? "font-medium text-ink" : "text-faint-ink"
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-caption text-muted-ink">Dados de exemplo</p>
    </div>
  );
}

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="bg-cream">
      {/* Atmospheric full-bleed band: the one earned scroll reveal here */}
      <div className="relative h-44 overflow-hidden sm:h-60">
        <motion.div
          className="absolute inset-0"
          initial={false}
          whileInView={reduceMotion ? undefined : { scale: [1.05, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        >
          <Image
            src="https://images.unsplash.com/photo-1536520002442-39764a41e987?auto=format&fit=crop&w=1600&q=80"
            alt="Fileira de cadeiras clássicas sob luminárias industriais numa barbearia de piso de madeira"
            fill
            sizes="100vw"
            className="img-duotone object-cover"
          />
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[oklch(0.185_0.01_110/0.38)]"
        />
      </div>

      <div className="container-page section-normal">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="como-funciona-title"
              className="text-h2 font-semibold text-ink"
            >
              Como funciona
            </h2>
            <p className="mt-4 max-w-measure text-lead text-muted-ink">
              Do primeiro oi no WhatsApp ao cliente na cadeira, sem você pegar
              no celular.
            </p>

            <ol className="mt-10 space-y-8">
              {steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  className="flex gap-5"
                  initial={false}
                  whileInView={
                    reduceMotion ? undefined : { opacity: [0, 1], y: [14, 0] }
                  }
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    ease: EASE_OUT_EXPO,
                    delay: index * 0.09,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full border border-line text-label font-semibold text-ink"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1.5 max-w-measure text-muted-ink">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="mt-4 lg:mt-0">
            <PhoneMockup />
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-10 text-center md:mt-20">
          <h3 className="mx-auto max-w-2xl text-h3 font-semibold text-ink">
            Menos WhatsApp na sua mão, mais gente na cadeira.
          </h3>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-medium"
            >
              <a href="https://barber.flowo.com.br/sign-up">Começar agora</a>
            </Button>
            <Link
              href="/precos"
              className="text-label font-medium text-muted-ink underline-offset-4 transition-colors duration-200 ease-out-quint hover:text-ink hover:underline"
            >
              Ver planos e preços
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
