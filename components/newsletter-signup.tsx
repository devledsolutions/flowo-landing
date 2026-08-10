"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { useSegment } from "@/providers/segment-provider";
import { useLeadRemarketing } from "@/hooks/use-lead-remarketing";

export function NewsletterSignup() {
  const trackLeadRemarketing = useLeadRemarketing();
  const {
    track,
    identify,
    getAnonymousId,
    getAcquisitionContext,
  } = useSegment();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent || !name.trim() || !email.trim()) return;

    setStatus("loading");
    track("Newsletter Form Submitted", {
      placement: "site_footer",
      newsletter: "a_semana_da_barbearia",
    });

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: "newsletter:site-footer",
          consent: true,
          emailMarketingConsent: true,
          smsMarketingConsent: false,
          company,
          turnstileToken,
          segmentAnonymousId: getAnonymousId(),
          ...getAcquisitionContext(),
        }),
      });

      const data = (await response.json()) as {
        metaEventId?: string;
      };
      if (!response.ok) throw new Error("newsletter_capture_failed");

      trackLeadRemarketing({
        eventId: data.metaEventId,
        source: "newsletter:site-footer",
        resource: "a_semana_da_barbearia",
        kind: "newsletter",
      });

      identify(undefined, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        newsletter: "a_semana_da_barbearia",
        email_marketing_opt_in: true,
      });
      track("Newsletter Subscribed", {
        placement: "site_footer",
        newsletter: "a_semana_da_barbearia",
        email_marketing_opt_in: true,
      });
      setStatus("success");
      setName("");
      setEmail("");
      setConsent(false);
      setTurnstileToken("");
    } catch {
      setStatus("error");
      track("Newsletter Subscription Failed", {
        placement: "site_footer",
        newsletter: "a_semana_da_barbearia",
      });
    }
  };

  if (status === "success") {
    return (
      <section
        className="rounded-[1.75rem] border border-black/15 bg-[#f6f3ed] px-6 py-7 text-[#171715] md:px-8"
        aria-live="polite"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#171715] text-[#f6f3ed]">
            <Check className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-label font-semibold uppercase tracking-[0.18em] text-[#62635f]">
              Inscrição confirmada
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              A próxima edição chega no seu e-mail.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#62635f]">
              Conteúdo prático para agenda, atendimento e gestão da barbearia.
              Sem mensagem todo dia.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[1.75rem] border border-black/15 bg-[#f6f3ed] px-6 py-7 text-[#171715] md:px-8 md:py-8">
      <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-12">
        <div>
          <p className="text-label font-semibold uppercase tracking-[0.18em] text-[#62635f]">
            A Semana da Barbearia
          </p>
          <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Uma ideia útil por vez, direto para a rotina da barbearia.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#62635f] md:text-base">
            Agenda, equipe, atendimento e números explicados sem enrolação.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-3" noValidate>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="sr-only" htmlFor="newsletter-name">
              Seu nome
            </label>
            <input
              id="newsletter-name"
              name="name"
              autoComplete="given-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              minLength={2}
              maxLength={120}
              required
              className="min-h-12 rounded-full border border-black/15 bg-white px-5 text-sm text-[#171715] outline-none transition focus:border-[#171715] focus:ring-2 focus:ring-black/10"
            />
            <label className="sr-only" htmlFor="newsletter-email">
              Seu melhor e-mail
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Seu melhor e-mail"
              maxLength={255}
              required
              className="min-h-12 rounded-full border border-black/15 bg-white px-5 text-sm text-[#171715] outline-none transition focus:border-[#171715] focus:ring-2 focus:ring-black/10"
            />
          </div>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="newsletter-company">Empresa</label>
            <input
              id="newsletter-company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#62635f]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 accent-[#171715]"
            />
            <span>
              Quero receber A Semana da Barbearia e conteúdos da Flowo por
              e-mail. Posso cancelar quando quiser. Consulte a{" "}
              <Link href="/privacidade" className="underline underline-offset-2">
                Política de Privacidade
              </Link>
              .
            </span>
          </label>
          <TurnstileWidget
            action="lead_capture"
            onTokenChange={setTurnstileToken}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#62635f]">
              Sem lista comprada. Sem mensagem todo dia.
            </p>
            <button
              type="submit"
              disabled={status === "loading" || !consent}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#171715] px-6 text-sm font-semibold text-[#f6f3ed] transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? "Inscrevendo…" : "Quero receber"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          {status === "error" ? (
            <p className="text-sm text-red-700" role="alert">
              Não foi possível concluir agora. Tente novamente em instantes.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
