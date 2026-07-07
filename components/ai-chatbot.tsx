"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";
import { formatBRL, getPlan } from "@/data/pricing-data";

interface HelpEntry {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const solo = getPlan("solo");
const equipe = getPlan("equipe");
const empresarial = getPlan("empresarial");

const helpEntries: HelpEntry[] = [
  {
    id: "preco",
    question: "Quanto custa?",
    answer: (
      <>
        Solo {formatBRL(solo.monthly)}/mês, Equipe {formatBRL(equipe.monthly)}
        /mês e Empresarial {formatBRL(empresarial.monthly)}/mês. No plano anual
        você paga o equivalente a 10 meses, 2 meses grátis.{" "}
        <Link
          href="/precos"
          className="font-medium text-ink underline underline-offset-2"
        >
          Ver planos
        </Link>
      </>
    ),
  },
  {
    id: "como-funciona",
    question: "Como funciona?",
    answer: (
      <>
        A IA atende o WhatsApp da barbearia: mostra os horários livres, agenda,
        lembra o cliente antes do horário e pede a confirmação de presença.
        Você acompanha tudo no painel.{" "}
        <Link
          href="/#como-funciona"
          className="font-medium text-ink underline underline-offset-2"
        >
          Ver o passo a passo
        </Link>
      </>
    ),
  },
  {
    id: "instalar",
    question: "Preciso instalar algo?",
    answer: (
      <>
        Não. Seu cliente usa o WhatsApp que já tem, e você acessa o painel pelo
        navegador, em barber.flowo.com.br.
      </>
    ),
  },
  {
    id: "comecar",
    question: "Como eu começo?",
    answer: (
      <>
        Crie sua conta, escolha um plano e conecte o WhatsApp da barbearia.{" "}
        <a
          href="https://barber.flowo.com.br/sign-up"
          className="font-medium text-ink underline underline-offset-2"
        >
          Começar agora
        </a>
      </>
    ),
  },
];

interface Message {
  key: string;
  role: "user" | "bot";
  content: React.ReactNode;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [asked, setAsked] = useState<string[]>([]);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  const close = useCallback(() => {
    setIsOpen(false);
    launcherRef.current?.focus();
  }, []);

  const ask = (entry: HelpEntry) => {
    if (asked.includes(entry.id)) return;
    setAsked((prev) => [...prev, entry.id]);
    setMessages((prev) => [
      ...prev,
      { key: `${entry.id}-q`, role: "user", content: entry.question },
      { key: `${entry.id}-a`, role: "bot", content: entry.answer },
    ]);
  };

  const remaining = helpEntries.filter((entry) => !asked.includes(entry.id));

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="flowo-help-title"
          id="flowo-help-panel"
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
          className="mb-3 flex max-h-[min(70vh,28rem)] w-[min(20.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-line bg-surface"
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 id="flowo-help-title" className="text-sm font-semibold text-ink">
              Dúvidas rápidas
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Fechar ajuda"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-ink transition-colors duration-150 ease-out-quint hover:bg-surface-2 hover:text-ink"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={logRef}
            aria-live="polite"
            className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-4 py-4"
          >
            <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5 text-sm leading-relaxed text-ink">
              Oi! Sou do time Flowo. Toque em uma pergunta que eu já respondo
              por aqui.
            </div>
            {messages.map((message) => (
              <div
                key={message.key}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-xl rounded-br-sm bg-ink text-cream"
                      : "rounded-xl rounded-bl-sm bg-surface-2 text-ink"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {remaining.length > 0 && (
            <div className="border-t border-line px-4 py-3">
              <p className="sr-only">Perguntas disponíveis</p>
              <div className="flex flex-wrap gap-2">
                {remaining.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => ask(entry)}
                    className="rounded-full border border-line px-3 py-1.5 text-caption font-medium text-ink transition-colors duration-150 ease-out-quint hover:border-ink"
                  >
                    {entry.question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        aria-expanded={isOpen}
        aria-controls="flowo-help-panel"
        aria-label={isOpen ? "Fechar ajuda rápida" : "Abrir ajuda rápida"}
        className="ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream shadow-card transition-transform duration-150 ease-out-quint hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        {isOpen ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
