"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
} from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import {
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  MessageCircle,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TurnstileWidget,
  type TurnstileStatus,
} from "@/components/turnstile-widget";
import { buildWhatsAppUrl } from "@/components/cta-links";
import { useLeadRemarketing } from "@/hooks/use-lead-remarketing";
import countries from "@/lib/countries";
import { useSegment } from "@/providers/segment-provider";
import { FlagIcon, type FlagIconCode } from "react-flag-kit";

const formatPhoneNumber = (phone: string, dialCode: string) => {
  const cleaned = phone.replace(/\D/g, "");
  if (dialCode === "+55" && cleaned.length >= 10) {
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
  }
  return phone;
};

interface DownloadGateModalProps {
  children?: ReactElement;
  resourceTitle: string;
  resourceDescription: string;
  downloadUrl: string;
  resourceType?: "pdf" | "spreadsheet" | "template";
  requestedResource?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const RESOURCE_TYPE_LABEL: Record<
  NonNullable<DownloadGateModalProps["resourceType"]>,
  string
> = {
  pdf: "PDF",
  spreadsheet: "Planilha",
  template: "Modelo",
};

export function DownloadGateModal({
  children,
  resourceTitle,
  resourceDescription,
  downloadUrl,
  resourceType = "pdf",
  requestedResource,
  open: controlledOpen,
  onOpenChange,
}: DownloadGateModalProps) {
  const idPrefix = `download-${useId().replace(/:/g, "")}`;
  const trackLeadRemarketing = useLeadRemarketing();
  const { track, identify, getAnonymousId, getAcquisitionContext } = useSegment();
  const stableRequestedResource = requestedResource || resourceTitle;
  const turnstileRequired = Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  );
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileStatus, setTurnstileStatus] =
    useState<TurnstileStatus>("loading");
  const [emailMarketingConsent, setEmailMarketingConsent] = useState(false);
  const [whatsappMarketingConsent, setWhatsappMarketingConsent] = useState(false);
  const [smsMarketingConsent, setSmsMarketingConsent] = useState(false);
  const [countryCode, setCountryCode] = useState<FlagIconCode>("BR");
  const [dialCode, setDialCode] = useState("+55");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const requestGenerationRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const successTitleRef = useRef<HTMLHeadingElement | null>(null);
  const errorTitleRef = useRef<HTMLHeadingElement | null>(null);
  const shouldFocusFormRef = useRef(false);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      track("Lead Form Opened", {
        form: "resource_download",
        resource_title: resourceTitle,
        resource_type: resourceType,
        requested_resource: stableRequestedResource,
      });
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, resourceTitle, resourceType, stableRequestedResource, track]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const target = isSuccess
      ? successTitleRef.current
      : isError
        ? errorTitleRef.current
        : shouldFocusFormRef.current
          ? nameInputRef.current
          : null;

    if (!target) {
      return;
    }

    shouldFocusFormRef.current = false;
    const animationFrame = window.requestAnimationFrame(() => target.focus());
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isError, isOpen, isSuccess]);

  useEffect(
    () => () => {
      requestGenerationRef.current += 1;
      abortControllerRef.current?.abort();
    },
    [],
  );

  const resetForm = () => {
    setName("");
    setEmail("");
    setWhatsapp("");
    setCompany("");
    setTurnstileToken("");
    setTurnstileStatus("loading");
    setEmailMarketingConsent(false);
    setWhatsappMarketingConsent(false);
    setSmsMarketingConsent(false);
    setCountryCode("BR");
    setDialCode("+55");
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");
    shouldFocusFormRef.current = false;
  };

  const handleOpenChange = (open: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(open);
    }
    onOpenChange?.(open);
    if (!open) {
      requestGenerationRef.current += 1;
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
      setIsSubmitting(false);
      resetForm();
    }
  };

  const handleCountryChange = (value: string) => {
    const [code, dial] = value.split(":");
    setCountryCode(code as FlagIconCode);
    setDialCode(dial);
    if (code !== "BR") {
      setWhatsappMarketingConsent(false);
      setSmsMarketingConsent(false);
    }
  };

  const handleDownloadClick = () => {
    track("Resource Downloaded", {
      resource_name: resourceTitle,
      resource_type: resourceType,
      resource_url: downloadUrl,
      requested_resource: stableRequestedResource,
    });
    Sentry.addBreadcrumb({
      category: "download-gate-modal",
      message: "Resource download started by the lead",
      level: "info",
      data: { resourceTitle },
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    const requestGeneration = requestGenerationRef.current + 1;
    requestGenerationRef.current = requestGeneration;
    abortControllerRef.current = controller;
    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage("");
    track("Lead Form Submitted", {
      form: "resource_download",
      resource_title: resourceTitle,
      resource_type: resourceType,
      requested_resource: stableRequestedResource,
    });

    Sentry.addBreadcrumb({
      category: "download-gate-modal",
      message: "Form submission started",
      level: "info",
      data: {
        resourceTitle,
        hasName: Boolean(name),
        hasEmail: Boolean(email),
        hasWhatsapp: Boolean(whatsapp),
        countryCode,
      },
    });

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          whatsapp: whatsapp ? `${dialCode}${whatsapp}` : "",
          source: `download:${resourceTitle}`,
          requestedResource,
          company,
          consent: true,
          emailMarketingConsent,
          whatsappMarketingConsent:
            Boolean(whatsapp) &&
            countryCode === "BR" &&
            whatsappMarketingConsent,
          smsMarketingConsent:
            Boolean(whatsapp) && countryCode === "BR" && smsMarketingConsent,
          ...getAcquisitionContext(),
          segmentAnonymousId: getAnonymousId(),
          turnstileToken,
        }),
        signal: controller.signal,
      });

      const data = (await response.json()) as {
        message?: string;
        metaEventId?: string;
      };

      if (
        controller.signal.aborted ||
        requestGeneration !== requestGenerationRef.current
      ) {
        return;
      }

      if (!response.ok) {
        const responseMessage = data.message || "Ocorreu um erro. Tente novamente.";
        setIsError(true);
        setErrorMessage(responseMessage);
        track("Lead Form Failed", {
          form: "resource_download",
          resource_title: resourceTitle,
          resource_type: resourceType,
          requested_resource: stableRequestedResource,
          status_code: response.status,
        });
        Sentry.captureMessage("Download gate form submission failed", {
          level: "warning",
          tags: { component: "download-gate-modal", error_type: "api_error" },
          extra: {
            statusCode: response.status,
            errorMessage: responseMessage,
            hasName: Boolean(name),
            hasEmail: Boolean(email),
            resourceTitle,
          },
        });
        return;
      }

      setIsSuccess(true);
      trackLeadRemarketing({
        eventId: data.metaEventId,
        source: `download:${resourceTitle}`,
        resource: stableRequestedResource,
      });
      identify(undefined, {
        email,
        name,
        ...(whatsapp ? { phone: `${dialCode}${whatsapp}` } : {}),
        lead_source: `download:${resourceTitle}`,
        requested_resource: stableRequestedResource,
        email_marketing_opt_in: emailMarketingConsent,
        whatsapp_marketing_opt_in:
          Boolean(whatsapp) &&
          countryCode === "BR" &&
          whatsappMarketingConsent,
        sms_marketing_opt_in:
          Boolean(whatsapp) && countryCode === "BR" && smsMarketingConsent,
      });
      track("Lead Form Succeeded", {
        form: "resource_download",
        resource_title: resourceTitle,
        resource_type: resourceType,
        requested_resource: stableRequestedResource,
        email_marketing_opt_in: emailMarketingConsent,
        whatsapp_marketing_opt_in:
          Boolean(whatsapp) &&
          countryCode === "BR" &&
          whatsappMarketingConsent,
        sms_marketing_opt_in:
          Boolean(whatsapp) && countryCode === "BR" && smsMarketingConsent,
      });
    } catch (error) {
      if (
        controller.signal.aborted ||
        requestGeneration !== requestGenerationRef.current
      ) {
        return;
      }

      setIsError(true);
      setErrorMessage("Não foi possível conectar. Verifique sua internet e tente novamente.");
      track("Lead Form Failed", {
        form: "resource_download",
        resource_title: resourceTitle,
        resource_type: resourceType,
        requested_resource: stableRequestedResource,
        status_code: 0,
      });
      Sentry.captureException(error, {
        level: "error",
        tags: { component: "download-gate-modal", error_type: "network_error" },
        contexts: {
          form: {
            name: "Download Gate Form",
            data: {
              hasName: Boolean(name),
              hasEmail: Boolean(email),
              hasWhatsapp: Boolean(whatsapp),
              countryCode,
              dialCode,
              resourceTitle,
            },
          },
        },
        extra: {
          errorMessage: error instanceof Error ? error.message : "Unknown error",
        },
      });
    } finally {
      if (requestGeneration === requestGenerationRef.current) {
        abortControllerRef.current = null;
        setIsSubmitting(false);
      }
    }
  };

  const formDisabled =
    isSubmitting ||
    (turnstileRequired &&
      (!turnstileToken || turnstileStatus !== "verified"));

  const handleReturnToForm = () => {
    shouldFocusFormRef.current = true;
    setIsError(false);
    setErrorMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children ? <DialogTrigger asChild>{children}</DialogTrigger> : null}
      <DialogContent className="bottom-0 top-auto flex max-h-[92dvh] w-[calc(100%-0.75rem)] max-w-none -translate-y-0 flex-col gap-0 overflow-hidden rounded-t-xl border-line bg-background p-0 sm:bottom-auto sm:top-1/2 sm:max-h-[88dvh] sm:max-w-lg sm:-translate-y-1/2 sm:rounded-xl">
        {isSuccess ? (
          <div className="flex min-h-0 flex-col">
            <div className="overflow-y-auto px-6 pb-6 pt-8 text-center sm:px-8" role="status">
              <CheckCircle2 aria-hidden="true" className="mx-auto h-12 w-12 text-success" />
              <DialogHeader className="mt-5">
                <DialogTitle
                  ref={successTitleRef}
                  tabIndex={-1}
                  className="text-h3 font-semibold focus:outline-none sm:text-center"
                >
                  Seu material está pronto
                </DialogTitle>
                <DialogDescription className="mt-2 text-body leading-relaxed text-muted-ink sm:text-center">
                  Já solicitamos o envio deste link para o e-mail informado. Se
                  quiser, baixe &ldquo;{resourceTitle}&rdquo; agora pelo botão abaixo.
                </DialogDescription>
              </DialogHeader>
              <p className="mt-5 text-caption leading-relaxed text-faint-ink">
                Se o download não aparecer, este mesmo botão continua disponível
                enquanto a janela estiver aberta.
              </p>
            </div>
            <div className="shrink-0 border-t border-line bg-background px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-8">
              <Button asChild className="w-full rounded-full">
                <a href={downloadUrl} download onClick={handleDownloadClick}>
                  <Download aria-hidden="true" className="mr-2 h-4 w-4" />
                  Baixar {RESOURCE_TYPE_LABEL[resourceType]}
                </a>
              </Button>
              <a
                href={buildWhatsAppUrl(
                  "Olá! Baixei um material da Flowo e quero entender se o sistema faz sentido para a minha barbearia.",
                )}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track("Lead Magnet WhatsApp CTA Clicked", {
                    resource_id: stableRequestedResource,
                    requested_resource: stableRequestedResource,
                    placement: "download_success",
                  })
                }
                className="mt-3 flex min-h-10 items-center justify-center gap-2 text-caption font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Tirar uma dúvida no WhatsApp
              </a>
            </div>
          </div>
        ) : isError ? (
          <div className="flex min-h-0 flex-col">
            <div className="overflow-y-auto px-6 pb-6 pt-8 text-center sm:px-8" role="alert">
              <XCircle aria-hidden="true" className="mx-auto h-12 w-12 text-danger" />
              <DialogHeader className="mt-5">
                <DialogTitle
                  ref={errorTitleRef}
                  tabIndex={-1}
                  className="text-h3 font-semibold focus:outline-none sm:text-center"
                >
                  Não conseguimos liberar o arquivo
                </DialogTitle>
                <DialogDescription className="mt-2 text-body text-muted-ink sm:text-center">
                  {errorMessage || "Tente novamente em alguns instantes."}
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="shrink-0 border-t border-line bg-background px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-8">
              <Button onClick={handleReturnToForm} className="w-full rounded-full">
                Tentar novamente
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="shrink-0 border-b border-line px-6 pb-5 pt-6 pr-14 sm:px-8 sm:pt-7">
              <div className="flex items-start gap-3 text-left">
                <div className="mt-0.5 rounded-lg border border-line bg-surface-2 p-2.5">
                  <FileText aria-hidden="true" className="h-5 w-5 text-ink" />
                </div>
                <div className="min-w-0">
                  <p className="text-caption font-semibold uppercase tracking-[0.12em] text-faint-ink">
                    {RESOURCE_TYPE_LABEL[resourceType]} gratuito
                  </p>
                  <DialogTitle className="mt-1 text-xl font-semibold leading-tight">
                    {resourceTitle}
                  </DialogTitle>
                  <DialogDescription className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-ink">
                    {resourceDescription}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form
              onSubmit={handleSubmit}
              aria-busy={isSubmitting}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-5 sm:px-8">
                <p className="text-sm leading-relaxed text-muted-ink">
                  Informe nome e e-mail. O WhatsApp e as comunicações de marketing
                  são opcionais.
                </p>
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
                <div className="space-y-1.5">
                  <Label htmlFor={`${idPrefix}-name`}>Nome</Label>
                  <Input
                    ref={nameInputRef}
                    id={`${idPrefix}-name`}
                    value={name}
                    autoComplete="name"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`${idPrefix}-email`}>E-mail</Label>
                  <Input
                    id={`${idPrefix}-email`}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <p className="rounded-lg border border-line bg-surface px-3 py-2.5 text-xs leading-5 text-muted-ink">
                  Usaremos seu nome e e-mail somente para entregar este material e
                  atender esta solicitação. Saiba mais na{" "}
                  <Link className="underline underline-offset-2" href="/privacidade">
                    Política de Privacidade
                  </Link>{" "}
                  e nos{" "}
                  <Link className="underline underline-offset-2" href="/termos">
                    Termos de Uso
                  </Link>
                  .
                </p>

                <details className="group rounded-lg border border-line bg-surface">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink">
                    Receber novidades e falar pelo WhatsApp
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 text-muted-ink transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="space-y-4 border-t border-line px-4 py-4">
                    <div className="space-y-1.5">
                      <Label htmlFor={`${idPrefix}-whatsapp`}>
                        WhatsApp{" "}
                        <span className="font-normal text-muted-ink">(opcional)</span>
                      </Label>
                      <div className="flex">
                        <Select
                          onValueChange={handleCountryChange}
                          value={`${countryCode}:${dialCode}`}
                        >
                          <SelectTrigger
                            className="w-[112px]"
                            aria-label={`País: ${
                              countries.find((country) => country.code === countryCode)
                                ?.name ?? countryCode
                            }`}
                          >
                            <SelectValue>
                              <span className="flex items-center">
                                <FlagIcon code={countryCode} size={24} className="mr-2" />
                                {dialCode}
                              </span>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem
                                key={country.code}
                                value={`${country.code}:${country.dialCode}`}
                              >
                                <span className="flex w-full items-center gap-2">
                                  <FlagIcon
                                    code={country.code as FlagIconCode}
                                    size={24}
                                  />
                                  <span>{country.name}</span>
                                  <span className="ml-auto text-muted-ink">
                                    {country.dialCode}
                                  </span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id={`${idPrefix}-whatsapp`}
                          type="tel"
                          autoComplete="tel-national"
                          value={formatPhoneNumber(whatsapp, dialCode)}
                          onChange={(event) =>
                            setWhatsapp(event.target.value.replace(/\D/g, ""))
                          }
                          placeholder="(11) 98765-4321"
                          className="ml-2 flex-1"
                        />
                      </div>
                    </div>

                    <label
                      htmlFor={`${idPrefix}-email-marketing`}
                      className="flex items-start gap-2 text-xs leading-5 text-muted-ink"
                    >
                      <input
                        id={`${idPrefix}-email-marketing`}
                        type="checkbox"
                        checked={emailMarketingConsent}
                        onChange={(event) =>
                          setEmailMarketingConsent(event.target.checked)
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                      />
                      <span>
                        Quero receber por e-mail conteúdos, novidades e ofertas.
                        Posso cancelar quando quiser.
                      </span>
                    </label>

                    {countryCode === "BR" && whatsapp ? (
                      <>
                        <label
                          htmlFor={`${idPrefix}-whatsapp-marketing`}
                          className="flex items-start gap-2 text-xs leading-5 text-muted-ink"
                        >
                          <input
                            id={`${idPrefix}-whatsapp-marketing`}
                            type="checkbox"
                            checked={whatsappMarketingConsent}
                            onChange={(event) =>
                              setWhatsappMarketingConsent(event.target.checked)
                            }
                            className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                          />
                          <span>
                            Quero receber dicas e convites pelo WhatsApp. Posso
                            responder SAIR quando quiser.
                          </span>
                        </label>
                        <label
                          htmlFor={`${idPrefix}-sms-marketing`}
                          className="flex items-start gap-2 text-xs leading-5 text-muted-ink"
                        >
                          <input
                            id={`${idPrefix}-sms-marketing`}
                            type="checkbox"
                            checked={smsMarketingConsent}
                            onChange={(event) =>
                              setSmsMarketingConsent(event.target.checked)
                            }
                            className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                          />
                          <span>
                            Quero receber novidades por SMS. Posso responder SAIR
                            quando quiser.
                          </span>
                        </label>
                      </>
                    ) : null}
                  </div>
                </details>

                <TurnstileWidget
                  action="lead_capture"
                  onTokenChange={setTurnstileToken}
                  onStatusChange={setTurnstileStatus}
                  className="mx-auto"
                />
              </div>

              <div className="shrink-0 border-t border-line bg-background px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-8">
                <Button
                  type="submit"
                  className="w-full rounded-full font-semibold"
                  disabled={formDisabled}
                >
                  {isSubmitting ? (
                    "Liberando material..."
                  ) : (
                    <>
                      <Download aria-hidden="true" className="mr-2 h-4 w-4" />
                      Liberar material
                    </>
                  )}
                </Button>
                <p className="mt-2 text-center text-caption text-muted-ink">
                  Sem aceitar marketing, você ainda recebe o arquivo normalmente.
                </p>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
