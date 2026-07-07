"use client"

import { useId, useState } from 'react'
import { Mail, MessageCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { LeadCaptureModal } from "@/components/lead-capture-modal"

export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <section
          id={panelId}
          aria-label="Fale com a gente"
          className="mb-3 w-72 rounded-xl bg-surface p-5 shadow-[0_4px_8px_-2px_oklch(0.205_0.012_110/0.22)]"
        >
          <h2 className="text-body font-semibold text-ink">Fale com a gente</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-ink">
            Tem alguma dúvida? Deixe seu contato e nossa equipe te chama no
            WhatsApp.
          </p>
          <div className="mt-4 space-y-2">
            <LeadCaptureModal>
              <Button className="w-full rounded-full font-semibold">
                Deixar meu contato
              </Button>
            </LeadCaptureModal>
            <Button
              asChild
              variant="outline"
              className="w-full rounded-full"
            >
              <a href="mailto:contato@flowo.com.br">
                <Mail aria-hidden="true" className="h-4 w-4" />
                contato@flowo.com.br
              </a>
            </Button>
          </div>
        </section>
      )}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        aria-label={isOpen ? "Fechar contato" : "Falar com a equipe Flowo"}
        className="flex h-12 w-12 items-center justify-center rounded-full shadow-[0_4px_8px_-2px_oklch(0.205_0.012_110/0.3)]"
      >
        {isOpen ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
      </Button>
    </div>
  )
}
