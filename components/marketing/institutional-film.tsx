import Link from "next/link";
import { ArrowRight, Download, Film, Volume2 } from "lucide-react";
import { absoluteUrl } from "@/lib/seo";

export const INSTITUTIONAL_FILM_TRANSCRIPT =
  "Enquanto sua equipe cuida de cada cliente, novas mensagens continuam chegando. A inteligência artificial da Flowo atende no WhatsApp, entende o serviço e consulta a disponibilidade real de cada profissional. O cliente escolhe um horário válido. A agenda é atualizada. E a confirmação acontece na mesma conversa. O gestor acompanha tudo em um só lugar, e a equipe pode assumir o atendimento quando quiser. Comandas, histórico e rotina conectados. Pagamentos integrados, cashback e recursos financeiros são opcionais. Você ativa quando fizer sentido. Flowo. Sua barbearia trabalhando. Sua recepção, sempre pronta.";

export function InstitutionalFilmSchema({ pagePath }: { pagePath: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Flowo: sua recepção sempre pronta",
    description:
      "Veja como a inteligência artificial da Flowo atende no WhatsApp, consulta a agenda individual da equipe e confirma horários.",
    thumbnailUrl: absoluteUrl("/videos/flowo-institucional-poster.jpg"),
    uploadDate: "2026-07-29",
    duration: "PT46S",
    contentUrl: absoluteUrl("/videos/flowo-institucional.mp4"),
    embedUrl: `${absoluteUrl(pagePath)}#video-flowo`,
    inLanguage: "pt-BR",
    transcript: INSTITUTIONAL_FILM_TRANSCRIPT,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function InstitutionalFilm({
  compact = false,
  showTranscript = true,
}: {
  compact?: boolean;
  showTranscript?: boolean;
}) {
  return (
    <section
      id="video-flowo"
      className={compact ? "border-t border-line py-12 md:py-16" : "section-normal on-ink"}
    >
      <div className="container-page">
        <div
          className={
            compact
              ? "grid items-end gap-6 lg:grid-cols-[0.72fr_1fr] lg:gap-14"
              : "grid items-end gap-8 lg:grid-cols-[0.75fr_1fr] lg:gap-20"
          }
        >
          <div>
            <p className="flex items-center gap-2 text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
              <Film className="h-4 w-4" aria-hidden="true" />
              Filme de produto · 46 segundos
            </p>
            <h2
              className={`${compact ? "mt-3 text-h3" : "mt-4 text-h2"} max-w-[18ch] font-semibold tracking-[-0.025em] text-ink-strong`}
            >
              Veja a conversa virar horário confirmado.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-body text-muted-ink">
              Do primeiro “tem horário?” à visão da equipe: uma demonstração
              curta do que o Flowo conecta — com pagamentos integrados sempre
              opcionais.
            </p>
            {!compact && (
              <p className="mt-4 flex items-center gap-2 text-caption text-faint-ink">
                <Volume2 className="h-4 w-4" aria-hidden="true" />
                Narração em pt-BR, trilha original e legendas disponíveis.
              </p>
            )}
          </div>
        </div>

        <div
          className={`mt-8 overflow-hidden rounded-xl border ${
            compact ? "border-line bg-ink" : "border-white/15 bg-black"
          } shadow-[0_28px_90px_rgba(0,0,0,0.28)]`}
        >
          <video
            className="aspect-video w-full bg-black object-cover"
            controls
            playsInline
            preload="metadata"
            poster="/videos/flowo-institucional-poster.jpg"
            aria-label="Filme institucional da Flowo mostrando atendimento por inteligência artificial no WhatsApp e agenda por profissional"
          >
            <source src="/videos/flowo-institucional.mp4" type="video/mp4" />
            <track
              kind="captions"
              src="/videos/flowo-institucional.vtt"
              srcLang="pt-BR"
              label="Português"
            />
            Seu navegador não consegue reproduzir este vídeo.{" "}
            <Link href="/videos/flowo-institucional.mp4">
              Baixe o arquivo em MP4.
            </Link>
          </video>
        </div>

        <div className="mt-5 flex flex-col gap-3 text-caption text-faint-ink sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/videos/flowo-institucional-vertical.mp4"
            className="inline-flex items-center gap-2 font-semibold text-ink transition-opacity hover:opacity-70"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Baixar versão vertical para celular
          </Link>
          <Link
            href="/sistema-agendamento-barbearia"
            className="inline-flex items-center gap-2 font-semibold text-ink transition-opacity hover:opacity-70"
          >
            Explorar o produto
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {showTranscript && (
          <details className="mt-6 rounded-lg border border-line bg-surface p-5 text-ink">
            <summary className="cursor-pointer text-sm font-semibold">
              Ler a transcrição completa
            </summary>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-ink">
              {INSTITUTIONAL_FILM_TRANSCRIPT}
            </p>
          </details>
        )}
      </div>
    </section>
  );
}
