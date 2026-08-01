import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const proofItems = [
  "mensagem recebida e respondida pela IA",
  "agendamento criado e confirmado na agenda",
  "remarcação, cancelamento e controle humano testados",
] as const;

export function ValidatedProof() {
  return (
    <section
      aria-labelledby="validated-proof-title"
      className="border-y border-line bg-surface"
    >
      <div className="container-page py-8 md:py-10">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-14">
          <div>
            <p className="text-caption font-medium text-faint-ink">
              Fluxo validado ponta a ponta em ambiente controlado
            </p>
            <h2
              id="validated-proof-title"
              className="mt-2 max-w-[21ch] text-h3 font-semibold text-ink"
            >
              A conversa realmente chega até a agenda.
            </h2>
          </div>

          <div>
            <ul className="divide-y divide-line border-y border-line">
              {proofItems.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3.5 text-label text-muted-ink">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/demonstracao-agendamento-whatsapp"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink underline-offset-4 hover:underline"
            >
              Ver o que foi testado
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
