"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { useSegment } from "@/providers/segment-provider";
import { useLeadRemarketing } from "@/hooks/use-lead-remarketing";

function formatBrazilianPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function MobileAppWaitlistForm() {
  const trackLeadRemarketing = useLeadRemarketing();
  const {
    track,
    identify,
    getAnonymousId,
    getAcquisitionContext,
  } = useSegment();
  const startedRef = useRef(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [emailMarketingConsent, setEmailMarketingConsent] = useState(false);
  const [smsMarketingConsent, setSmsMarketingConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    track("App Waitlist Viewed", {
      page: "/aplicativo-para-barbeiros",
      surface: "launch_interest_form",
    });
  }, [track]);

  const handleTokenChange = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("App Waitlist Started", {
      page: "/aplicativo-para-barbeiros",
      surface: "launch_interest_form",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          whatsapp: `+55${whatsapp.replace(/\D/g, "")}`,
          company,
          source: "app-mobile-waitlist",
          consent: true,
          emailMarketingConsent,
          smsMarketingConsent,
          ...getAcquisitionContext(),
          segmentAnonymousId: getAnonymousId(),
          turnstileToken,
        }),
      });
      const data = (await response.json()) as {
        message?: string;
        metaEventId?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || "Não foi possível registrar seu interesse.");
        track("App Waitlist Failed", {
          page: "/aplicativo-para-barbeiros",
          status_code: response.status,
        });
        return;
      }

      setStatus("success");
      trackLeadRemarketing({
        eventId: data.metaEventId,
        source: "app-mobile-waitlist",
        kind: "waitlist",
      });
      identify(undefined, {
        email,
        name,
        phone: `+55${whatsapp.replace(/\D/g, "")}`,
        lead_source: "app-mobile-waitlist",
        email_marketing_opt_in: emailMarketingConsent,
        sms_marketing_opt_in: smsMarketingConsent,
      });
      track("App Waitlist Submitted", {
        page: "/aplicativo-para-barbeiros",
        surface: "launch_interest_form",
        email_marketing_opt_in: emailMarketingConsent,
        sms_marketing_opt_in: smsMarketingConsent,
      });
    } catch {
      setStatus("error");
      setMessage("Não foi possível conectar agora. Tente novamente em instantes.");
      track("App Waitlist Failed", {
        page: "/aplicativo-para-barbeiros",
        status_code: 0,
      });
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex min-h-[23rem] flex-col justify-center rounded-xl border border-line bg-surface p-7 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
        <h2 className="mt-6 text-h3 font-semibold text-ink">
          Você está na lista.
        </h2>
        <p className="mt-3 max-w-lg text-body text-muted-ink">
          Vamos avisar quando a próxima etapa do aplicativo estiver disponível.
          Enquanto isso, o painel web da Flowo continua pronto para a operação
          da barbearia.
        </p>
        <Link
          href="/sistema-agendamento-barbearia"
          className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-ink px-6 text-label font-semibold text-cream transition-colors hover:bg-ink/90"
        >
          Conhecer o painel web
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={handleStart}
      className="rounded-xl border border-line bg-surface p-6 sm:p-8"
      aria-describedby="app-waitlist-help"
    >
      <input
        type="text"
        name="company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="app-waitlist-name" className="text-label font-semibold text-ink">
            Seu nome
          </label>
          <input
            id="app-waitlist-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            className="mt-2 min-h-12 w-full rounded-lg border border-line bg-background px-4 text-body text-ink outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          />
        </div>

        <div>
          <label htmlFor="app-waitlist-email" className="text-label font-semibold text-ink">
            E-mail
          </label>
          <input
            id="app-waitlist-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="mt-2 min-h-12 w-full rounded-lg border border-line bg-background px-4 text-body text-ink outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          />
        </div>

        <div>
          <label
            htmlFor="app-waitlist-whatsapp"
            className="text-label font-semibold text-ink"
          >
            WhatsApp
          </label>
          <div className="mt-2 flex min-h-12 rounded-lg border border-line bg-background focus-within:ring-2 focus-within:ring-ink focus-within:ring-offset-2">
            <span
              className="flex items-center border-r border-line px-3 text-label text-muted-ink"
              aria-hidden="true"
            >
              +55
            </span>
            <input
              id="app-waitlist-whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="tel"
              value={formatBrazilianPhone(whatsapp)}
              onChange={(event) => setWhatsapp(event.target.value)}
              autoComplete="tel-national"
              placeholder="(11) 98765-4321"
              required
              pattern=".*\d.*"
              minLength={14}
              className="min-w-0 flex-1 rounded-r-lg bg-transparent px-3 text-body text-ink outline-none"
            />
          </div>
        </div>
      </div>

      <TurnstileWidget
        action="lead_capture"
        onTokenChange={handleTokenChange}
        className="mt-5"
      />

      <label className="mt-5 flex max-w-2xl items-start gap-2 text-caption leading-5 text-muted-ink">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
        />
        <span>
          Autorizo a Flowo a usar estes dados para registrar meu interesse e
          avisar sobre a disponibilidade do aplicativo, conforme a{" "}
          <Link href="/privacidade" className="underline underline-offset-4 hover:text-ink">
            Política de Privacidade
          </Link>{" "}
          e os{" "}
          <Link href="/termos" className="underline underline-offset-4 hover:text-ink">
            Termos de Uso
          </Link>
          .
        </span>
      </label>
      <label className="mt-3 flex max-w-2xl items-start gap-2 text-caption leading-5 text-muted-ink">
        <input
          type="checkbox"
          checked={emailMarketingConsent}
          onChange={(event) =>
            setEmailMarketingConsent(event.target.checked)
          }
          className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
        />
        <span>
          Quero receber por e-mail conteúdos, novidades e ofertas da Flowo.
          Posso cancelar quando quiser.
        </span>
      </label>
      <label className="mt-3 flex max-w-2xl items-start gap-2 text-caption leading-5 text-muted-ink">
        <input
          type="checkbox"
          checked={smsMarketingConsent}
          onChange={(event) => setSmsMarketingConsent(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
        />
        <span>
          Quero receber por SMS novidades e convites da Flowo. A frequência é
          limitada e posso responder SAIR a qualquer momento.
        </span>
      </label>

      {status === "error" && (
        <p className="mt-5 text-sm font-medium text-danger" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={
          status === "submitting" ||
          (Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) && !turnstileToken)
        }
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-label font-semibold text-cream transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Registrando..." : "Avise-me no lançamento"}
        {status !== "submitting" && (
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      <p id="app-waitlist-help" className="mt-4 max-w-2xl text-caption text-muted-ink">
        Sem spam. Você pode cancelar as comunicações ou pedir a exclusão dos
        dados a qualquer momento.
      </p>
    </form>
  );
}
