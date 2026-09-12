"use client";

import { useEffect, useId, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { VOICE_CONTACT_CONSENT_TEXT } from "@/lib/voice-verification";

type MarketingChannel = "email" | "whatsapp" | "sms";
type MarketingPreferences = Record<MarketingChannel, boolean>;

export function LeadContactPreferences({
  emailAvailable,
  phoneAvailable,
  value,
  onChange,
  voiceConsent,
  onVoiceConsentChange,
}: {
  emailAvailable: boolean;
  phoneAvailable: boolean;
  value: MarketingPreferences;
  onChange: (value: MarketingPreferences) => void;
  voiceConsent: boolean;
  onVoiceConsentChange: (checked: boolean) => void;
}) {
  const descriptionId = useId();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const channels: { key: MarketingChannel; label: string; available: boolean }[] = [
    { key: "whatsapp", label: "WhatsApp", available: phoneAvailable },
    { key: "sms", label: "SMS", available: phoneAvailable },
    { key: "email", label: "e-mail", available: emailAvailable },
  ];
  const availableChannels = channels.filter((channel) => channel.available);
  const selectedChannels = availableChannels.filter((channel) => value[channel.key]);
  const allSelected = availableChannels.length > 0 &&
    selectedChannels.length === availableChannels.length;
  const partiallySelected = selectedChannels.length > 0 && !allSelected;
  const channelLabels = availableChannels.map((channel) => channel.label);
  const channelList = channelLabels.length > 1
    ? `${channelLabels.slice(0, -1).join(", ")} e ${channelLabels[channelLabels.length - 1]}`
    : channelLabels[0];

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = partiallySelected;
    }
  }, [partiallySelected]);

  return (
    <div className="space-y-1 text-xs leading-5 text-muted-ink">
      <label className="flex min-h-11 cursor-pointer items-start gap-2 py-1">
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={allSelected}
          disabled={availableChannels.length === 0}
          aria-describedby={descriptionId}
          onChange={(event) => {
            const checked = event.target.checked;
            onChange({
              email: checked && emailAvailable,
              whatsapp: checked && phoneAvailable,
              sms: checked && phoneAvailable,
            });
          }}
          className="mt-0.5 h-4 w-4 shrink-0 accent-ink disabled:opacity-50"
        />
        <span>
          Quero receber dicas, novidades e ofertas da Flowo
          {channelList ? ` por ${channelList}` : " por e-mail"}. (Opcional)
        </span>
      </label>
      <p id={descriptionId} className="pl-6">
        {availableChannels.length === 0
          ? "Informe um e-mail para receber novidades."
          : "Envios limitados. Cancele quando quiser" +
            (phoneAvailable ? " ou responda SAIR no WhatsApp e SMS." : ".")}
      </p>
      <details className="group">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 rounded-md pl-6 font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
          {phoneAvailable ? "Escolher canais e ligação" : "Escolher canais"}
          <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 group-open:rotate-180" />
        </summary>
        <div className="space-y-3 rounded-lg border border-line p-3">
          <fieldset aria-describedby={descriptionId}>
            <legend className="mb-1 font-medium text-ink">
              Onde quer receber novidades?
            </legend>
            <div className="flex flex-wrap gap-x-5">
              {channels.filter((channel) => channel.key === "email" || channel.available).map((channel) => (
                <label key={channel.key} className="flex min-h-11 cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={channel.available && value[channel.key]}
                    disabled={!channel.available}
                    onChange={(event) => onChange({ ...value, [channel.key]: event.target.checked })}
                    className="h-4 w-4 shrink-0 accent-ink disabled:opacity-50"
                  />
                  <span>{channel.key === "email" ? "E-mail" : channel.label}</span>
                </label>
              ))}
            </div>
            {!emailAvailable && (
              <p>Para incluir e-mail, preencha o campo acima.</p>
            )}
          </fieldset>
          {phoneAvailable && (
            <label className="flex min-h-11 cursor-pointer items-start gap-2 border-t border-line pt-3">
              <input
                type="checkbox"
                checked={voiceConsent}
                onChange={(event) => onVoiceConsentChange(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
              />
              <span>
                {VOICE_CONTACT_CONSENT_TEXT} Enviamos um código para confirmar o
                número antes de qualquer ligação.
              </span>
            </label>
          )}
        </div>
      </details>
    </div>
  );
}
