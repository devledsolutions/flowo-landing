"use client";

import { useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  VOICE_CODE_LENGTH,
  VOICE_CODE_RESEND_SECONDS,
  VOICE_CONTACT_CONSENT_TEXT,
} from "@/lib/voice-verification";
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
import { CheckCircle2, XCircle } from "lucide-react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { useSegment } from "@/providers/segment-provider";
import { useLeadRemarketing } from "@/hooks/use-lead-remarketing";
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

export function LeadCaptureModal({
  children,
  initiallyOpen = false,
  source = "lead-capture-modal",
  intent = "general",
  experimentKey,
  experimentVariant,
}: {
  children: React.ReactNode;
  initiallyOpen?: boolean;
  source?: string;
  intent?: "general" | "enterprise";
  experimentKey?: string;
  experimentVariant?: string | null;
}) {
  const trackLeadRemarketing = useLeadRemarketing();
  const {
    track,
    identify,
    getAnonymousId,
    getAcquisitionContext,
  } = useSegment();
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [professionalsCount, setProfessionalsCount] = useState("");
  const [unitsCount, setUnitsCount] = useState("");
  const [purchaseTimeline, setPurchaseTimeline] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [emailMarketingConsent, setEmailMarketingConsent] = useState(false);
  const [smsMarketingConsent, setSmsMarketingConsent] = useState(false);
  const [whatsappMarketingConsent, setWhatsappMarketingConsent] = useState(false);
  const [countryCode, setCountryCode] = useState<FlagIconCode>("BR");
  const [dialCode, setDialCode] = useState("+55");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Pedido de ligação. `voiceConsent` é só a caixa marcada; a permissão de
  // verdade nasce do código conferido, no backend.
  const [voiceConsent, setVoiceConsent] = useState(false);
  const [voiceStep, setVoiceStep] = useState<"none" | "code" | "verified">("none");
  const [voiceCode, setVoiceCode] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [voiceBusy, setVoiceBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  const fullPhone = `${dialCode}${whatsapp.replace(/\D/g, "")}`;

  const requestVoiceCode = async (): Promise<void> => {
    setVoiceBusy(true);
    setVoiceError("");
    try {
      const response = await fetch("/api/voice-verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });
      if (!response.ok) {
        setVoiceError("Não foi possível enviar o código agora. Tente de novo.");
        return;
      }
      setVoiceStep("code");
      setResendIn(VOICE_CODE_RESEND_SECONDS);
    } catch {
      setVoiceError("Não foi possível enviar o código agora. Tente de novo.");
    } finally {
      setVoiceBusy(false);
    }
  };

  const confirmVoiceCode = async (): Promise<void> => {
    setVoiceBusy(true);
    setVoiceError("");
    try {
      const response = await fetch("/api/voice-verification/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, code: voiceCode }),
      });
      const data = (await response.json()) as {
        verified?: boolean;
        attemptsRemaining?: number;
        reason?: string;
      };
      if (data.verified) {
        setVoiceStep("verified");
        return;
      }
      // Cada motivo tem seu próprio texto. "Código inválido" para tudo obriga a
      // pessoa a adivinhar se errou, se demorou, ou se acabou.
      if (data.reason === "expired") {
        setVoiceError("Esse código venceu. Peça outro.");
      } else if (data.attemptsRemaining === 0) {
        setVoiceError("Tentativas esgotadas. Peça um código novo.");
      } else {
        setVoiceError(
          `Código incorreto. ${data.attemptsRemaining ?? 0} tentativa(s) restante(s).`
        );
      }
    } catch {
      setVoiceError("Não foi possível conferir agora. Tente de novo.");
    } finally {
      setVoiceBusy(false);
    }
  };

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage("");
    track("Lead Form Submitted", {
      form: "sales_contact",
      source,
      intent,
      experiment_key: experimentKey,
      experiment_variant: experimentVariant,
    });

    Sentry.addBreadcrumb({
      category: "lead-capture-modal",
      message: "Form submission started",
      level: "info",
      data: {
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
          company: honeypot,
          businessName: intent === "enterprise" ? businessName : undefined,
          professionalsCount:
            intent === "enterprise" ? Number(professionalsCount) : undefined,
          unitsCount: intent === "enterprise" ? Number(unitsCount) : undefined,
          purchaseTimeline:
            intent === "enterprise" ? purchaseTimeline : undefined,
          experimentKey,
          experimentVariant: experimentVariant || undefined,
          source,
          consent: true,
          salesContactRequestChannels: ["whatsapp"],
          voiceContactConsent: countryCode === "BR" && voiceConsent,
          emailMarketingConsent: Boolean(email) && emailMarketingConsent,
          smsMarketingConsent: countryCode === "BR" && smsMarketingConsent,
          whatsappMarketingConsent:
            countryCode === "BR" && whatsappMarketingConsent,
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
        const errorMessage = data.message || "Ocorreu um erro. Tente novamente.";
        setIsError(true);
        setErrorMessage(errorMessage);
        track("Lead Form Failed", {
          form: "sales_contact",
          source,
          status_code: response.status,
        });

        Sentry.captureMessage("Lead capture form submission failed", {
          level: "warning",
          tags: {
            component: "lead-capture-modal",
            error_type: "api_error",
          },
          extra: {
            statusCode: response.status,
            errorMessage,
            name,
            hasEmail: !!email,
          },
        });

        return;
      }

      setIsSuccess(true);
      // Quem pediu ligação ainda não pediu de verdade: o pedido fica pendente
      // até o código ser conferido. Disparamos o envio aqui para a pessoa não
      // ter de apertar mais um botão.
      if (countryCode === "BR" && voiceConsent) {
        void requestVoiceCode();
      }
      trackLeadRemarketing({
        eventId: data.metaEventId,
        source,
      });
      identify(undefined, {
        email: email || undefined,
        name,
        phone: `${dialCode}${whatsapp}`,
        lead_source: source,
        email_marketing_opt_in: Boolean(email) && emailMarketingConsent,
        sms_marketing_opt_in: countryCode === "BR" && smsMarketingConsent,
        whatsapp_marketing_opt_in:
          countryCode === "BR" && whatsappMarketingConsent,
      });
      track("Lead Form Succeeded", {
        form: "sales_contact",
        source,
        intent,
        experiment_key: experimentKey,
        experiment_variant: experimentVariant,
        response_channel: "whatsapp",
        email_marketing_opt_in: Boolean(email) && emailMarketingConsent,
        sms_marketing_opt_in: countryCode === "BR" && smsMarketingConsent,
        whatsapp_marketing_opt_in:
          countryCode === "BR" && whatsappMarketingConsent,
      });
      if (intent === "enterprise") {
        track("Enterprise Lead Submitted", {
          source,
          experiment_key: experimentKey,
          experiment_variant: experimentVariant,
          professionals_range: professionalsCount,
          units_range: unitsCount,
          purchase_timeline: purchaseTimeline,
        });
      }

      Sentry.addBreadcrumb({
        category: "lead-capture-modal",
        message: "Form submitted successfully",
        level: "info",
      });
    } catch (err) {
      setIsError(true);
      setErrorMessage("Não foi possível conectar. Verifique sua internet e tente novamente.");
      track("Lead Form Failed", {
        form: "sales_contact",
        source,
        status_code: 0,
      });

      Sentry.captureException(err, {
        level: "error",
        tags: {
          component: "lead-capture-modal",
          error_type: "network_error",
        },
        contexts: {
          form: {
            name: "Lead Capture Form",
            data: {
              hasName: !!name,
              hasEmail: !!email,
              hasWhatsapp: !!whatsapp,
              countryCode,
              dialCode,
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
    setHoneypot("");
    setBusinessName("");
    setProfessionalsCount("");
    setUnitsCount("");
    setPurchaseTimeline("");
    setTurnstileToken("");
    setEmailMarketingConsent(false);
    setSmsMarketingConsent(false);
    setWhatsappMarketingConsent(false);
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
    if (code !== "BR") {
      setSmsMarketingConsent(false);
      setWhatsappMarketingConsent(false);
    }
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
            form: "sales_contact",
            source,
            intent,
            experiment_key: experimentKey,
            experiment_variant: experimentVariant,
          });
          if (intent === "enterprise") {
            track("Enterprise CTA Clicked", {
              source,
              experiment_key: experimentKey,
              experiment_variant: experimentVariant,
            });
            track("Enterprise Form Started", {
              source,
              experiment_key: experimentKey,
              experiment_variant: experimentVariant,
            });
          }
        }}
      >
        {children}
      </div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl">
          {isSuccess ? (
            <div className="py-6 text-center" role="status">
              <div className="mb-4 flex justify-center">
                <CheckCircle2 aria-hidden="true" className="h-16 w-16 text-success" />
              </div>
              <DialogHeader>
                <DialogTitle className="mb-2 text-h3 font-semibold sm:text-center">
                  Recebemos seu contato!
                </DialogTitle>
                <DialogDescription className="text-body text-muted-ink sm:text-center">
                  {intent === "enterprise"
                    ? `Obrigado, ${name.split(" ")[0]}! Um especialista da Flowo vai analisar sua operação e entrar em contato em até um dia útil.`
                    : `Obrigado, ${name.split(" ")[0]}! Nossa equipe vai te chamar no WhatsApp para mostrar o Flowo funcionando.`}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-3">
                <p className="text-sm text-muted-ink">
                  Fique de olho no WhatsApp:{" "}
                  <span className="font-semibold text-ink">
                    {dialCode} {formatPhoneNumber(whatsapp, dialCode)}
                  </span>
                </p>

                {voiceConsent && voiceStep !== "verified" && (
                  <div className="rounded-xl border border-line bg-surface-2 p-4 text-left">
                    <Label htmlFor="voice-code" className="text-sm font-semibold text-ink">
                      Confirme seu número
                    </Label>
                    <p className="mt-1 text-xs leading-5 text-muted-ink">
                      Enviamos um código por SMS. Sem ele não ligamos, porque
                      precisamos ter certeza de que o número é seu.
                    </p>
                    <Input
                      id="voice-code"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={VOICE_CODE_LENGTH}
                      value={voiceCode}
                      onChange={(event) => {
                        setVoiceCode(event.target.value.replace(/\D/g, ""));
                        setVoiceError("");
                      }}
                      placeholder="000000"
                      className="mt-3 text-center text-lg tracking-[0.4em]"
                      aria-invalid={Boolean(voiceError)}
                      aria-describedby={voiceError ? "voice-code-error" : undefined}
                    />
                    {voiceError && (
                      <p
                        id="voice-code-error"
                        role="alert"
                        className="mt-2 text-xs text-danger"
                      >
                        {voiceError}
                      </p>
                    )}
                    <Button
                      type="button"
                      onClick={() => void confirmVoiceCode()}
                      disabled={voiceBusy || voiceCode.length < VOICE_CODE_LENGTH}
                      className="mt-3 w-full rounded-full"
                    >
                      {voiceBusy ? "Conferindo..." : "Confirmar código"}
                    </Button>
                    <button
                      type="button"
                      onClick={() => void requestVoiceCode()}
                      disabled={voiceBusy || resendIn > 0}
                      className="mt-2 w-full text-xs text-muted-ink underline-offset-2 hover:underline disabled:no-underline"
                    >
                      {resendIn > 0
                        ? `Reenviar em ${resendIn}s`
                        : "Não chegou? Reenviar código"}
                    </button>
                    <p className="mt-3 text-xs leading-5 text-muted-ink">
                      Ligamos de segunda a sexta, das 9h às 18h.
                    </p>
                  </div>
                )}

                {voiceStep === "verified" && (
                  <p className="rounded-xl border border-line bg-surface-2 p-4 text-left text-sm text-ink">
                    Número confirmado. Vamos te ligar de segunda a sexta, das 9h
                    às 18h.
                  </p>
                )}
                <Button
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
                <p className="text-sm text-muted-ink">
                  Por favor, tente novamente em alguns instantes.
                </p>
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
                <DialogTitle className="text-h3 font-semibold">
                  {intent === "enterprise" ? "Planeje sua operação com a Flowo" : "Fale com a gente"}
                </DialogTitle>
                <DialogDescription className="text-body text-muted-ink">
                  {intent === "enterprise"
                    ? "Conte o tamanho da sua operação. Nossa equipe prepara uma conversa sobre implantação, integrações e condições comerciais."
                    : "Deixe seu contato e nossa equipe te chama no WhatsApp para mostrar o Flowo funcionando na sua barbearia."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                {intent === "enterprise" ? (
                  <div className="space-y-1.5">
                    <Label htmlFor="lead-business-name">Empresa</Label>
                    <Input
                      id="lead-business-name"
                      value={businessName}
                      autoComplete="organization"
                      onChange={(event) => setBusinessName(event.target.value)}
                      placeholder="Nome da rede ou barbearia"
                      required
                    />
                  </div>
                ) : null}
                <div className="space-y-1.5">
                  <Label htmlFor="lead-name">Nome</Label>
                  <Input
                    id="lead-name"
                    value={name}
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                {intent === "enterprise" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="lead-professionals">Profissionais</Label>
                      <Select value={professionalsCount} onValueChange={setProfessionalsCount} required>
                        <SelectTrigger id="lead-professionals">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 a 10</SelectItem>
                          <SelectItem value="11">11 a 25</SelectItem>
                          <SelectItem value="26">26 a 50</SelectItem>
                          <SelectItem value="51">Mais de 50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lead-units">Unidades</Label>
                      <Select value={unitsCount} onValueChange={setUnitsCount} required>
                        <SelectTrigger id="lead-units">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 unidade, alto volume</SelectItem>
                          <SelectItem value="2">2 a 3</SelectItem>
                          <SelectItem value="4">4 a 10</SelectItem>
                          <SelectItem value="11">Mais de 10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="lead-timeline">Quando pretende começar?</Label>
                      <Select value={purchaseTimeline} onValueChange={setPurchaseTimeline} required>
                        <SelectTrigger id="lead-timeline">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">Agora</SelectItem>
                          <SelectItem value="quarter">Nos próximos 3 meses</SelectItem>
                          <SelectItem value="planning">Ainda estou planejando</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : null}
                <div className="space-y-1.5">
                  <Label htmlFor="lead-email">E-mail (opcional)</Label>
                  <Input
                    id="lead-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lead-whatsapp">WhatsApp</Label>
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
                      id="lead-whatsapp"
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
                    Autorizo a Flowo a usar estes dados para responder meu
                    contato, conforme a{" "}
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
                    checked={emailMarketingConsent}
                    disabled={!email}
                    onChange={(event) =>
                      setEmailMarketingConsent(event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 accent-ink disabled:opacity-50"
                  />
                  <span>
                    Quero receber por e-mail conteúdos, novidades e ofertas da
                    Flowo. Posso cancelar quando quiser.
                  </span>
                </label>
                {countryCode === "BR" && (
                  <label className="flex items-start gap-2 text-xs leading-5 text-muted-ink">
                    <input
                      type="checkbox"
                      checked={whatsappMarketingConsent}
                      onChange={(event) =>
                        setWhatsappMarketingConsent(event.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                    />
                    <span>
                      Quero receber pelo WhatsApp dicas práticas, novidades e
                      convites da Flowo. Posso responder SAIR quando quiser.
                    </span>
                  </label>
                )}
                {countryCode === "BR" && (
                  <label className="flex items-start gap-2 text-xs leading-5 text-muted-ink">
                    <input
                      type="checkbox"
                      checked={smsMarketingConsent}
                      onChange={(event) =>
                        setSmsMarketingConsent(event.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                    />
                    <span>
                      Quero receber por SMS novidades e convites da Flowo. A
                      frequência é limitada e posso responder SAIR a qualquer
                      momento.
                    </span>
                  </label>
                )}
                {countryCode === "BR" && (
                  <label className="flex items-start gap-2 text-xs leading-5 text-muted-ink">
                    <input
                      type="checkbox"
                      checked={voiceConsent}
                      onChange={(event) => setVoiceConsent(event.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                    />
                    <span>
                      {VOICE_CONTACT_CONSENT_TEXT} Enviamos um código para
                      confirmar o número antes de qualquer ligação.
                    </span>
                  </label>
                )}
                <Button
                  type="submit"
                  className="w-full rounded-full font-semibold"
                  disabled={
                    isSubmitting ||
                    (Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) &&
                      !turnstileToken)
                  }
                >
                  {isSubmitting ? "Enviando..." : "Quero receber contato"}
                </Button>
                <p className="text-center text-caption text-muted-ink">
                  Sem spam. Você pode pedir a exclusão dos dados a qualquer momento.
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
