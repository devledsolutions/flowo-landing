"use client";

import { useEffect, useState } from "react";

/**
 * Índice do guia com a seção atual marcada e uma barra de progresso.
 *
 * Um guia tem cinco mil pixels de altura. Sem isso, quem está no meio da
 * leitura não sabe onde está nem quanto falta. A seção ativa vem de um
 * IntersectionObserver sobre os próprios títulos, então não há lista
 * duplicada para manter em dia.
 */
export function GuideTocNav({
  items,
  className,
}: {
  items: { id: string; label: string }[];
  className?: string;
}) {
  const [ativo, setAtivo] = useState<string | null>(items[0]?.id ?? null);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const alvos = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!alvos.length) return;

    // A faixa de leitura é o terço superior da tela: a seção "atual" é a que
    // acabou de passar por ali, não a que está entrando por baixo.
    const observer = new IntersectionObserver(
      (entries) => {
        const visiveis = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visiveis[0]) setAtivo(visiveis[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 }
    );
    for (const alvo of alvos) observer.observe(alvo);

    const artigo = alvos[0].closest("article");
    const onScroll = () => {
      if (!artigo) return;
      const caixa = artigo.getBoundingClientRect();
      const lido = -caixa.top + window.innerHeight * 0.35;
      setProgresso(Math.min(1, Math.max(0, lido / caixa.height)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="Neste guia" className={className}>
      <div className="flex items-baseline justify-between">
        <h2 className="text-caption font-semibold uppercase tracking-[0.1em] text-faint-ink">
          Neste guia
        </h2>
        <span className="text-caption tabular-nums text-faint-ink">
          {Math.round(progresso * 100)}%
        </span>
      </div>
      <div
        aria-hidden="true"
        className="mt-2 h-px w-full bg-line"
      >
        <div
          className="h-px bg-ink transition-[width] duration-150 ease-out"
          style={{ width: `${progresso * 100}%` }}
        />
      </div>
      <ol className="mt-4 space-y-0.5">
        {items.map((item, index) => {
          const atual = item.id === ativo;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={atual ? "true" : undefined}
                className={`flex min-h-9 items-baseline gap-3 py-1.5 text-label outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
                  atual ? "font-semibold text-ink" : "text-muted-ink hover:text-ink"
                }`}
              >
                <span className="w-5 shrink-0 tabular-nums text-caption text-faint-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="leading-snug">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
