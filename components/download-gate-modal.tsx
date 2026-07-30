"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import countries from "@/lib/countries";
import { FlagIcon, FlagIconCode } from "react-flag-kit";
import { CheckCircle2, XCircle, Download, FileText } from "lucide-react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { useSegment } from "@/providers/segment-provider";
import Link from "next/link";

const formatPhoneNumber = (phone: string, dialCode: string) => {
  const cleaned = phone.replace(/\D/g, "");
  if (dialCode === "+55" && cleaned.length >= 10) {
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
  }
  return phone;
};

const RESOURCE_TYPE_LABEL: Record<
  NonNullable<DownloadGateModalProps["resourceType"]>,
  string
> = {
  pdf: "PDF",
  spreadsheet: "Planilha",
  template: "Modelo",
};

interface DownloadGateModalProps {
  children: React.ReactNode;
  resourceTitle: string;
  resourceDescription: string;
  downloadUrl: string;
  resourceType?: "pdf" | "spreadsheet" | "template";
}

export function DownloadGateModal({
  children,
  resourceTitle,
  resourceDescription,
  downloadUrl,
  resourceType = "pdf",
}: DownloadGateModalProps) {
  const {
    track,
    identify,
    getAnonymousId,
    getAcquisitionContext,
  } = useSegment();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [countryCode, setCountryCode] = useState<FlagIconCode>("BR");
  const [dialCode, setDialCode] = useState("+55");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage("");
    track("Lead Form Submitted", {
      form: "resource_download",
      resource_title: resourceTitle,
      resource_type: resourceType,
    });

    Sentry.addBreadcrumb({
      category: "download-gate-modal",
      message: "Form submission started",
      level: "info",
      data: {
        resourceTitle,
        hasName: !!name,
        hasEmail: !!email,
        hasWhatsapp: !!whatsapp,
        countryCode,
      },
    });

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          whatsapp: `${dialCode}${whatsapp}`,
          source: `download:${resourceTitle}`,
          company,
          consent: true,
          marketingConsent,
          ...getAcquisitionContext(),
          segmentAnonymousId: getAnonymousId(),
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Ocorreu um erro. Tente novamente.";
        setIsError(true);
        setErrorMessage(errorMessage);
        track("Lead Form Failed", {
          form: "resource_download",
          resource_title: resourceTitle,
          status_code: response.status,
        });

        Sentry.captureMessage("Download gate form submission failed", {
          level: "warning",
          tags: {
            component: "download-gate-modal",
            error_type: "api_error",
          },
          extra: {
            statusCode: response.status,
            errorMessage,
            name,
            hasEmail: !!email,
            resourceTitle,
          },
        });

        return;
      }

      setIsSuccess(true);
      identify(undefined, {
        email,
        name,
        phone: `${dialCode}${whatsapp}`,
        lead_source: `download:${resourceTitle}`,
        email_marketing_opt_in: marketingConsent,
      });
      track("Lead Form Succeeded", {
        form: "resource_download",
        resource_title: resourceTitle,
        resource_type: resourceType,
        marketing_opt_in: marketingConsent,
      });
      track("Resource Downloaded", {
        resource_name: resourceTitle,
        resource_type: resourceType,
        resource_url: downloadUrl,
      });

      Sentry.addBreadcrumb({
        category: "download-gate-modal",
        message: "Form submitted successfully, initiating download",
        level: "info",
        data: { resourceTitle },
      });

      setTimeout(() => {
        window.open(downloadUrl, "_blank");
      }, 1500);
    } catch (err) {
      setIsError(true);
      setErrorMessage("Não foi possível conectar. Verifique sua internet e tente novamente.");
      track("Lead Form Failed", {
        form: "resource_download",
        resource_title: resourceTitle,
        status_code: 0,
      });

      Sentry.captureException(err, {
        level: "error",
        tags: {
          component: "download-gate-modal",
          error_type: "network_error",
        },
        contexts: {
          form: {
            name: "Download Gate Form",
            data: {
              hasName: !!name,
              hasEmail: !!email,
              hasWhatsapp: !!whatsapp,
              countryCode,
              dialCode,
              resourceTitle,
            },
          },
        },
        extra: {
          errorMessage: err instanceof Error ? err.message : "Unknown error",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setWhatsapp("");
    setCompany("");
    setTurnstileToken("");
    setMarketingConsent(false);
    setCountryCode("BR");
    setDialCode("+55");
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleCountryChange = (value: string) => {
    const [code, dial] = value.split(":");
    setCountryCode(code as FlagIconCode);
    setDialCode(dial);
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    setWhatsapp(input);
  };

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
          track("Lead Form Opened", {
            form: "resource_download",
            resource_title: resourceTitle,
            resource_type: resourceType,
          });
        }}
        className="cursor-pointer"
      >
        {children}
      </div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md rounded-xl">
          {isSuccess ? (
            <div className="py-6 text-center" role="status">
              <div className="mb-4 flex justify-center">
                <CheckCircle2 aria-hidden="true" className="h-16 w-16 text-success" />
              </div>
              <DialogHeader>
                <DialogTitle className="mb-2 text-h3 font-semibold sm:text-center">
                  Download iniciado!
                </DialogTitle>
                <DialogDescription className="text-body text-muted-ink sm:text-center">
                  O download de &ldquo;{resourceTitle}&rdquo; vai começar
                  automaticamente. Se não iniciar, clique no botão abaixo.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-3">
                <Button
                  onClick={() => window.open(downloadUrl, "_blank")}
                  className="w-full rounded-full"
                >
                  <Download aria-hidden="true" className="mr-2 h-4 w-4" />
                  Baixar novamente
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  className="w-full rounded-full"
                >
                  Fechar
                </Button>
              </div>
            </div>
          ) : isError ? (
            <div className="py-6 text-center" role="alert">
              <div className="mb-4 flex justify-center">
                <XCircle aria-hidden="true" className="h-16 w-16 text-danger" />
              </div>
              <DialogHeader>
                <DialogTitle className="mb-2 text-h3 font-semibold sm:text-center">
                  Algo deu errado
                </DialogTitle>
                <DialogDescription className="text-body text-muted-ink sm:text-center">
                  {errorMessage ||
                    "Não conseguimos processar sua solicitação no momento."}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-3">
                <Button
                  onClick={() => setIsError(false)}
                  className="w-full rounded-full"
                >
                  Tentar novamente
                </Button>
                <Button
                  onClick={() => handleOpenChange(false)}
                  variant="outline"
                  className="w-full rounded-full"
                >
                  Fechar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-lg bg-secondary p-3">
                    <FileText aria-hidden="true" className="h-7 w-7 text-ink" />
                  </div>
                  <div className="text-left">
                    <p className="text-caption font-medium uppercase tracking-wide text-muted-ink">
                      {RESOURCE_TYPE_LABEL[resourceType]} gratuito
                    </p>
                    <DialogTitle className="mt-0.5 text-xl font-semibold">
                      {resourceTitle}
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-sm text-muted-ink">
                      {resourceDescription}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="mt-2">
                <p className="mb-4 text-sm text-muted-ink">
                  Preencha seus dados para baixar gratuitamente:
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <div className="space-y-1.5">
                    <Label htmlFor="download-name">Nome</Label>
                    <Input
                      id="download-name"
                      value={name}
                      autoComplete="name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="download-email">E-mail</Label>
                    <Input
                      id="download-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="download-whatsapp">WhatsApp</Label>
                    <div className="flex">
                      <Select
                        onValueChange={handleCountryChange}
                        defaultValue={`BR:+55`}
                      >
                        <SelectTrigger
                          className="w-[100px]"
                          aria-label="Código do país"
                        >
                          <SelectValue>
                            <div className="flex items-center">
                              <FlagIcon
                                code={countryCode}
                                size={24}
                                className="mr-2"
                              />
                              {dialCode}
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem
                              key={country.code}
                              value={`${country.code}:${country.dialCode}`}
                            >
                              <div className="flex items-center">
                                <FlagIcon
                                  code={country.code as FlagIconCode}
                                  size={24}
                                  className="mr-2"
                                />
                                {country.dialCode}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="download-whatsapp"
                        type="tel"
                        autoComplete="tel-national"
                        value={formatPhoneNumber(whatsapp, dialCode)}
                        onChange={handleWhatsAppChange}
                        placeholder="(11) 98765-4321"
                        className="ml-2 flex-1"
                        required
                      />
                    </div>
                  </div>
                  <TurnstileWidget
                    action="lead_capture"
                    onTokenChange={setTurnstileToken}
                    className="mx-auto"
                  />
                  <label className="flex items-start gap-2 text-xs leading-5 text-muted-ink">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                    />
                    <span>
                      Autorizo o envio deste material e o contato necessário
                      para atender esta solicitação, conforme a{" "}
                      <Link className="underline underline-offset-2" href="/privacidade">
                        Política de Privacidade
                      </Link>{" "}
                      e os{" "}
                      <Link className="underline underline-offset-2" href="/termos">
                        Termos de Uso
                      </Link>
                      .
                    </span>
                  </label>
                  <label className="flex items-start gap-2 text-xs leading-5 text-muted-ink">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(event) => setMarketingConsent(event.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                    />
                    <span>
                      Quero receber por e-mail conteúdos, novidades e ofertas da
                      Flowo. Posso cancelar quando quiser.
                    </span>
                  </label>
                  <Button
                    type="submit"
                    className="w-full rounded-full font-semibold"
                    disabled={
                      isSubmitting ||
                      (Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) &&
                        !turnstileToken)
                    }
                  >
                    {isSubmitting ? (
                      "Processando..."
                    ) : (
                      <>
                        <Download aria-hidden="true" className="mr-2 h-4 w-4" />
                        Baixar material
                      </>
                    )}
                  </Button>
                  <p className="text-center text-caption text-muted-ink">
                    Sem spam. Você pode cancelar comunicações a qualquer momento.
                  </p>
                </form>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
