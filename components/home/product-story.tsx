import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons/flowo-icons";
import { ConversationPreview, ConfirmationPreview, ProductDisclaimer } from "./product-previews";

const agendaDetails = [
  "Foto ou iniciais para encontrar cada profissional.",
  "Horários, serviços e folgas por pessoa.",
  "A mesma agenda no computador e no app.",
];

export default function ProductStory() {
  return (
    <>
      <section id="como-funciona" aria-labelledby="team-schedules-title" className="section-normal scroll-mt-24 overflow-hidden border-t border-line bg-surface">
        <div className="container-page">
          <header className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-caption font-semibold text-muted-ink">Agenda da equipe</p>
              <h2 id="team-schedules-title" className="mt-3 max-w-[19ch] text-h2 font-semibold leading-tight tracking-[-0.025em] text-ink-strong">
                Cada profissional tem seu lugar na agenda.
              </h2>
            </div>
            <div>
              <p className="max-w-measure text-lead text-muted-ink">Veja quem atende, o que está marcado e onde ainda cabe um cliente.</p>
              <ul className="mt-5 space-y-2.5">
                {agendaDetails.map((detail) => <li key={detail} className="flex items-start gap-2.5 text-label text-muted-ink"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ink" />{detail}</li>)}
              </ul>
            </div>
          </header>
          <div className="relative mt-10 pb-6 sm:pb-10 lg:mt-12">
            <div className="overflow-hidden rounded-xl border border-ink/15 bg-cream shadow-[0_24px_64px_-40px_oklch(0.17_0.012_110/0.45)] hidden sm:block lg:mr-40">
              <Image src="/images/product/agenda-equipe-web-20261112.png" alt="Agenda web da Flowo, com foto ou iniciais acima do nome de cada profissional e os atendimentos em colunas." width={1440} height={850} sizes="(min-width: 1024px) 1000px, 100vw" className="h-auto w-full" />
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-line bg-cream p-2 shadow-[0_18px_50px_-20px_oklch(0.17_0.012_110/0.35)] sm:absolute sm:-bottom-1 sm:right-0 sm:mt-0 sm:w-[25%] sm:max-w-[280px]">
              <p className="px-2 pb-2 pt-1 text-caption font-semibold text-ink">No app</p>
              <Image src="/images/product/agenda-equipe-app-20261112.png" alt="Detalhe real da Agenda no app Flowo: iniciais acima dos profissionais e os agendamentos do dia." width={975} height={1061} sizes="(min-width: 640px) 280px, 100vw" className="h-auto w-full rounded-lg" />
            </div>
          </div>
          <ProductDisclaimer label="Capturas do Flowo com dados de demonstração" className="mt-4" />
        </div>
      </section>

      <section id="produto-em-acao" aria-labelledby="product-proof-title" className="section-normal scroll-mt-24 bg-cream">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-caption font-semibold text-muted-ink">Atendimento no WhatsApp</p>
            <h2 id="product-proof-title" className="mt-3 max-w-[19ch] text-h2 font-semibold leading-tight tracking-[-0.025em] text-ink-strong">O cliente pede um horário. A Bia consulta a agenda.</h2>
            <p className="mt-5 text-lead text-muted-ink">Ela oferece os horários disponíveis e registra a escolha do cliente. Sua equipe acompanha a conversa e assume quando precisar.</p>
            <Link href="/demonstracao-agendamento-whatsapp" className="mt-7 inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink underline underline-offset-4 hover:text-muted-ink">Ver uma conversa completa<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <div>
            <div className="grid items-center gap-5 sm:grid-cols-[1.1fr_0.9fr]">
              <ConversationPreview />
              <ConfirmationPreview />
            </div>
            <ProductDisclaimer label="Exemplo de conversa e confirmação" className="mt-5" />
          </div>
        </div>
      </section>
    </>
  );
}
