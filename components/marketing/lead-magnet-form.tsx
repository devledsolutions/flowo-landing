"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Download, LoaderCircle } from "lucide-react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { useSegment } from "@/providers/segment-provider";
import styles from "@/components/design-review/lead-offer-landing.module.css";

export type LeadMagnetConfig = {
  resourceId: string;
  resourceUrl: string;
  source: string;
  submitLabel: string;
  successTitle: string;
  successDescription?: string;
  productCtaLabel?: string;
  productCtaHref?: string;
};

const DEFAULT_CONFIG: LeadMagnetConfig = {
  resourceId: "raio_x_agenda",
  resourceUrl: "/downloads/raio-x-da-agenda-flowo.pdf",
  source: "download:raio-x-agenda",
  submitLabel: "Baixar meu Raio-X da Agenda",
  successTitle: "Seu Raio-X da Agenda está pronto.",
  successDescription:
    "O download está disponível agora. Também enviamos uma cópia do link para o e-mail informado.",
  productCtaLabel: "Conhecer a IA que responde “tem horário?”",
  productCtaHref: "/recepcionista-ia-barbearia",
};

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

export function LeadMagnetForm({
  config = DEFAULT_CONFIG,
}: {
  config?: LeadMagnetConfig;
}) {
  const {
    resourceId,
    resourceUrl,
    source,
    submitLabel,
    successTitle,
    successDescription = DEFAULT_CONFIG.successDescription,
    productCtaLabel = DEFAULT_CONFIG.productCtaLabel,
    productCtaHref = DEFAULT_CONFIG.productCtaHref,
  } = config;
  const fieldPrefix = `lead-magnet-${resourceId.replaceAll("_", "-")}`;
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
      resource_id: resourceId,
      resource_type: "pdf",
    });

    const handleCtaClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("[data-lead-magnet-cta='true']")) return;
      track("Lead Magnet CTA Clicked", {
        resource_id: resourceId,
      });
    };

    document.addEventListener("click", handleCtaClick, true);
    return () => document.removeEventListener("click", handleCtaClick, true);
  }, [resourceId, track]);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("Lead Magnet Form Started", {
      resource_id: resourceId,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const normalizedPhone = normalizeBrazilianPhone(phone);
    track("Lead Magnet Form Submitted", {
      resource_id: resourceId,
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
          source,
          requestedResource: resourceId,
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
          resource_id: resourceId,
          status_code: response.status,
        });
        return;
      }

      identify(undefined, {
        name,
        email,
        ...(normalizedPhone ? { phone: normalizedPhone } : {}),
        lead_source: source,
        requested_resource: resourceId,
        email_marketing_opt_in: emailMarketingConsent,
        sms_marketing_opt_in: Boolean(normalizedPhone) && smsMarketingConsent,
      });
      track("Lead Magnet Delivered", {
        resource_id: resourceId,
        delivery_method: "page_and_email",
      });
      if (emailMarketingConsent || (normalizedPhone && smsMarketingConsent)) {
        track("Lead Magnet Nurture Started", {
          resource_id: resourceId,
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
        resource_id: resourceId,
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
          <h3>{successTitle}</h3>
          <p>{successDescription}</p>
        </div>
        <a
          className={styles.downloadButton}
          href={resourceUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            track("Lead Magnet Downloaded", {
              resource_id: resourceId,
              placement: "success",
            })
          }
        >
          <Download aria-hidden="true" />
          Abrir o material
        </a>
        {productCtaHref && productCtaLabel ? (
          <Link
            className={styles.productLink}
            href={productCtaHref}
            onClick={() =>
              track("Lead Magnet Product CTA Clicked", {
                resource_id: resourceId,
                placement: "success",
              })
            }
          >
            {productCtaLabel}
          </Link>
        ) : null}
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
      <label htmlFor={`${fieldPrefix}-name`}>
        Seu nome
        <input
          id={`${fieldPrefix}-name`}
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          placeholder="Como podemos chamar você?"
          minLength={2}
          required
        />
      </label>
      <label htmlFor={`${fieldPrefix}-email`}>
        E-mail para receber o PDF
        <input
          id={`${fieldPrefix}-email`}
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          autoComplete="email"
          placeholder="voce@barbearia.com.br"
          required
        />
      </label>
      <label htmlFor={`${fieldPrefix}-phone`}>
        WhatsApp <span>opcional</span>
        <input
          id={`${fieldPrefix}-phone`}
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
          submitLabel
        )}
      </button>
      <p>
        Você recebe o PDF mesmo sem aceitar e-mail ou SMS de marketing. Se
        aceitar, pode cancelar quando quiser.
      </p>
    </form>
  );
}
