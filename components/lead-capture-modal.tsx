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
import { CheckCircle2, XCircle } from "lucide-react";
import { TurnstileWidget } from "@/components/turnstile-widget";

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

export function LeadCaptureModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [countryCode, setCountryCode] = useState<FlagIconCode>("BR");
  const [dialCode, setDialCode] = useState("+55");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

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
          company,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Ocorreu um erro. Tente novamente.";
        setIsError(true);

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

      Sentry.addBreadcrumb({
        category: "lead-capture-modal",
        message: "Form submitted successfully",
        level: "info",
      });
    } catch (err) {
      setIsError(true);

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
    setCompany("");
    setTurnstileToken("");
    setCountryCode("BR");
    setDialCode("+55");
    setIsSuccess(false);
    setIsError(false);
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
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="rounded-xl">
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
                  Obrigado, {name.split(" ")[0]}! Nossa equipe vai te chamar no
                  WhatsApp em breve para mostrar o Flowo funcionando.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-3">
                <p className="text-sm text-muted-ink">
                  Fique de olho no WhatsApp:{" "}
                  <span className="font-semibold text-ink">
                    {dialCode} {formatPhoneNumber(whatsapp, dialCode)}
                  </span>
                </p>
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
                  Não conseguimos processar sua solicitação no momento. Nossa
                  equipe foi notificada e está trabalhando para resolver o
                  problema.
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
                  Fale com a gente
                </DialogTitle>
                <DialogDescription className="text-body text-muted-ink">
                  Deixe seu contato e nossa equipe te chama no WhatsApp para
                  mostrar o Flowo funcionando na sua barbearia.
                </DialogDescription>
              </DialogHeader>
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
                  <Label htmlFor="lead-name">Nome</Label>
                  <Input
                    id="lead-name"
                    value={name}
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                  Seus dados estão seguros. Não compartilhamos com terceiros.
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
