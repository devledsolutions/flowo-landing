"use client"

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TurnstileWidget } from "@/components/turnstile-widget"
import { useSegment } from "@/providers/segment-provider"

export default function ContactForm() {
  const { track, identify, getAnonymousId, getAcquisitionContext } = useSegment()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contactChannel, setContactChannel] = useState<'email' | 'whatsapp'>('email')
  const [submittedChannel, setSubmittedChannel] = useState<'email' | 'whatsapp'>('email')
  const [message, setMessage] = useState('')
  const [company, setCompany] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [emailMarketingConsent, setEmailMarketingConsent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)
    track('Lead Form Submitted', {
      form: 'contact',
      source: 'contact:site',
      response_channel: contactChannel,
    })

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          contactChannel,
          message,
          company,
          consent: true,
          emailMarketingConsent,
          ...getAcquisitionContext(),
          segmentAnonymousId: getAnonymousId(),
          turnstileToken,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ message: "" }))
        throw new Error(data.message || 'Não conseguimos enviar sua mensagem.')
      }

      setSuccess(true)
      setSubmittedChannel(contactChannel)
      identify(undefined, {
        email,
        name,
        ...(contactChannel === 'whatsapp' && phone ? { phone } : {}),
        lead_source: 'contact:site',
        email_marketing_opt_in: emailMarketingConsent,
      })
      track('Lead Form Succeeded', {
        form: 'contact',
        source: 'contact:site',
        response_channel: contactChannel,
        email_marketing_opt_in: emailMarketingConsent,
      })
      setName('')
      setEmail('')
      setPhone('')
      setContactChannel('email')
      setMessage('')
      setCompany('')
      setTurnstileToken('')
      setEmailMarketingConsent(false)
    } catch (err) {
      track('Lead Form Failed', {
        form: 'contact',
        source: 'contact:site',
      })
      setError(err instanceof Error ? err.message : 'Ocorreu um erro. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="contato-title" className="section-normal">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="contato-title" className="text-h2 font-semibold text-ink">
            Entre em contato
          </h2>
          <p className="mt-4 text-lead text-muted-ink">
            Escreva pra gente e a equipe Flowo responde rapidinho.
          </p>
        </div>

        {success ? (
          <div role="status" className="mx-auto mt-10 max-w-lg text-center">
            <CheckCircle2 aria-hidden="true" className="mx-auto h-12 w-12 text-success" />
            <p className="mt-4 text-body font-medium text-ink">
              Sua mensagem foi enviada com sucesso!
            </p>
            <p className="mt-2 text-sm text-muted-ink">
              {submittedChannel === 'whatsapp'
                ? 'A equipe responde pelo WhatsApp informado.'
                : 'Respondemos pelo e-mail que você informou.'}
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-full"
              onClick={() => setSuccess(false)}
            >
              Enviar outra mensagem
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-lg space-y-5">
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
              <Label htmlFor="contact-name">Nome</Label>
              <Input
                id="contact-name"
                value={name}
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">E-mail</Label>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-ink">
                Como prefere receber a resposta?
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {([
                  ['email', 'E-mail'],
                  ['whatsapp', 'WhatsApp'],
                ] as const).map(([value, label]) => (
                  <label
                    key={value}
                    className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm transition-colors ${
                      contactChannel === value
                        ? 'border-ink bg-ink text-background'
                        : 'border-input bg-surface text-muted-ink hover:border-ink'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contact-channel"
                      value={value}
                      checked={contactChannel === value}
                      onChange={() => setContactChannel(value)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`h-3 w-3 rounded-full border ${
                        contactChannel === value
                          ? 'border-background bg-background'
                          : 'border-muted-ink'
                      }`}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            {contactChannel === 'whatsapp' ? (
              <div className="space-y-1.5">
                <Label htmlFor="contact-phone">WhatsApp</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <p className="text-xs leading-5 text-muted-ink">
                  Usaremos este número somente para responder seu pedido. Você não
                  entra em uma campanha de mensagens por escolher o WhatsApp.
                </p>
              </div>
            ) : null}
            <div className="space-y-1.5">
              <Label htmlFor="contact-message">Mensagem</Label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />
            </div>
            <TurnstileWidget action="contact_form" onTokenChange={setTurnstileToken} className="mx-auto" />
            <label className="flex items-start gap-2 text-xs leading-5 text-muted-ink">
              <input
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
              />
              <span>
                Autorizo a Flowo a usar estes dados para responder minha
                mensagem, conforme a{' '}
                <Link className="underline underline-offset-2" href="/privacidade">
                  Política de Privacidade
                </Link>{' '}
                e os{' '}
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
                onChange={(event) => setEmailMarketingConsent(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
              />
              <span>
                Também quero receber conteúdos, novidades e ofertas da Flowo
                por e-mail. Posso cancelar quando quiser.
              </span>
            </label>
            {error && (
              <p role="alert" className="text-sm font-medium text-danger">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full rounded-full font-semibold"
              disabled={isSubmitting || (Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) && !turnstileToken)}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
