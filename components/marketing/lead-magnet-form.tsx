"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Download, LoaderCircle } from "lucide-react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { useSegment } from "@/providers/segment-provider";
import styles from "@/components/design-review/lead-offer-landing.module.css";

const RESOURCE_ID = "raio_x_agenda";
const RESOURCE_URL = "/downloads/raio-x-da-agenda-flowo.pdf";
const SOURCE = "download:raio-x-agenda";

function normalizeBrazilianPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  return `+55${digits}`;
}

function formatBrazilianPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function LeadMagnetForm() {
  const {
    track,
    identify,
    getAnonymousId,
    getAcquisitionContext,
  } = useSegment();
  const startedRef = useRef(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [deliveryConsent, setDeliveryConsent] = useState(false);
  const [emailMarketingConsent, setEmailMarketingConsent] = useState(false);
  const [smsMarketingConsent, setSmsMarketingConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    track("Lead Magnet Viewed", {
      resource_id: RESOURCE_ID,
      resource_type: "pdf",
    });

    const handleCtaClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("[data-lead-magnet-cta='true']")) return;
      track("Lead Magnet CTA Clicked", {
        resource_id: RESOURCE_ID,
      });
    };

    document.addEventListener("click", handleCtaClick, true);
    return () => document.removeEventListener("click", handleCtaClick, true);
  }, [track]);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("Lead Magnet Form Started", {
      resource_id: RESOURCE_ID,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const normalizedPhone = normalizeBrazilianPhone(phone);
    track("Lead Magnet Form Submitted", {
      resource_id: RESOURCE_ID,
      has_phone: Boolean(normalizedPhone),
      email_marketing_opt_in: emailMarketingConsent,
      sms_marketing_opt_in: Boolean(normalizedPhone) && smsMarketingConsent,
    });

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          whatsapp: normalizedPhone,
          source: SOURCE,
          requestedResource: RESOURCE_ID,
          company,
          consent: deliveryConsent,
          emailMarketingConsent,
          smsMarketingConsent: Boolean(normalizedPhone) && smsMarketingConsent,
          ...getAcquisitionContext(),
          segmentAnonymousId: getAnonymousId(),
          turnstileToken,
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data.message || "Não foi possível liberar o material agora."
        );
        track("Lead Magnet Form Failed", {
          resource_id: RESOURCE_ID,
          status_code: response.status,
        });
        return;
      }

      identify(undefined, {
        name,
        email,
        ...(normalizedPhone ? { phone: normalizedPhone } : {}),
        lead_source: SOURCE,
        requested_resource: RESOURCE_ID,
        email_marketing_opt_in: emailMarketingConsent,
        sms_marketing_opt_in: Boolean(normalizedPhone) && smsMarketingConsent,
      });
      track("Lead Magnet Delivered", {
        resource_id: RESOURCE_ID,
        delivery_method: "page_and_email",
      });
      if (emailMarketingConsent || (normalizedPhone && smsMarketingConsent)) {
        track("Lead Magnet Nurture Started", {
          resource_id: RESOURCE_ID,
          email_opt_in: emailMarketingConsent,
          sms_opt_in: Boolean(normalizedPhone) && smsMarketingConsent,
        });
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Não foi possível conectar. Verifique sua internet e tente novamente."
      );
      track("Lead Magnet Form Failed", {
        resource_id: RESOURCE_ID,
        status_code: 0,
      });
    }
  };

  if (status === "success") {
    return (
      <div className={`${styles.formCard} ${styles.formSuccess}`} role="status">
        <CheckCircle2 aria-hidden="true" />
        <div>
          <p className={styles.successEyebrow}>Material liberado</p>
          <h3>Seu Raio-X da Agenda está pronto.</h3>
          <p>
            O download está disponível agora. Também enviamos uma cópia do link
            para o e-mail informado.
          </p>
        </div>
        <a
          className={styles.downloadButton}
          href={RESOURCE_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            track("Lead Magnet Downloaded", {
              resource_id: RESOURCE_ID,
              placement: "success",
            })
          }
        >
          <Download aria-hidden="true" />
          Abrir o material
        </a>
        <Link
          className={styles.productLink}
          href="/recepcionista-ia-barbearia"
          onClick={() =>
            track("Lead Magnet Product CTA Clicked", {
              resource_id: RESOURCE_ID,
              placement: "success",
            })
          }
        >
          Conhecer a IA que responde “tem horário?”
        </Link>
      </div>
    );
  }

  return (
    <form
      className={styles.formCard}
      onFocusCapture={markStarted}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <label htmlFor="lead-magnet-name">
        Seu nome
        <input
          id="lead-magnet-name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          placeholder="Como podemos chamar você?"
          minLength={2}
          required
        />
      </label>
      <label htmlFor="lead-magnet-email">
        E-mail para receber o PDF
        <input
          id="lead-magnet-email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          autoComplete="email"
          placeholder="voce@barbearia.com.br"
          required
        />
      </label>
      <label htmlFor="lead-magnet-phone">
        WhatsApp <span>opcional</span>
        <input
          id="lead-magnet-phone"
          name="phone"
          value={formatBrazilianPhone(phone)}
          onChange={(event) =>
            setPhone(event.target.value.replace(/\D/g, "").slice(0, 11))
          }
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(00) 00000-0000"
        />
      </label>

      <TurnstileWidget
        action="lead_capture"
        onTokenChange={setTurnstileToken}
        className="mx-auto"
      />

      <label className={styles.consent}>
        <input
          checked={deliveryConsent}
          onChange={(event) => setDeliveryConsent(event.target.checked)}
          type="checkbox"
          required
        />
        <span>
          Autorizo o uso dos dados para entregar este material, conforme a{" "}
          <Link href="/privacidade">Política de Privacidade</Link> e os{" "}
          <Link href="/termos">Termos de Uso</Link>.
        </span>
      </label>
      <label className={styles.consent}>
        <input
          checked={emailMarketingConsent}
          onChange={(event) => setEmailMarketingConsent(event.target.checked)}
          type="checkbox"
        />
        <span>
          Quero receber por e-mail conteúdos, novidades e ofertas da Flowo.
        </span>
      </label>
      {phone ? (
        <label className={styles.consent}>
          <input
            checked={smsMarketingConsent}
            onChange={(event) => setSmsMarketingConsent(event.target.checked)}
            type="checkbox"
          />
          <span>
            Quero receber por SMS novidades e convites da Flowo. Posso responder
            SAIR quando quiser.
          </span>
        </label>
      ) : null}

      {status === "error" ? (
        <p className={styles.formError} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={
          status === "submitting" ||
          !deliveryConsent ||
          (Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) &&
            !turnstileToken)
        }
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle aria-hidden="true" className={styles.spinner} />
            Liberando material...
          </>
        ) : (
          "Baixar meu Raio-X da Agenda"
        )}
      </button>
      <p>
        Você recebe o PDF mesmo sem aceitar e-mail ou SMS de marketing. Se
        aceitar, pode cancelar quando quiser.
      </p>
    </form>
  );
}
