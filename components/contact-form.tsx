"use client"

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TurnstileWidget } from "@/components/turnstile-widget"

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [company, setCompany] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, company, turnstileToken }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ message: "" }))
        throw new Error(data.message || 'Não conseguimos enviar sua mensagem.')
      }

      setSuccess(true)
      setName('')
      setEmail('')
      setMessage('')
      setCompany('')
      setTurnstileToken('')
    } catch (err) {
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
              Respondemos pelo e-mail que você informou.
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
