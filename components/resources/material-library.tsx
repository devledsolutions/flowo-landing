"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Calculator,
  Clock3,
  DollarSign,
  Download,
  FileSpreadsheet,
  FileText,
  MessageCircle,
  RotateCcw,
  Search,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { DownloadGateModal } from "@/components/download-gate-modal";
import { cn } from "@/lib/utils";
import { useSegment } from "@/providers/segment-provider";
import type {
  ResourceMaterial,
  ResourceMaterialIcon,
} from "@/data/resource-materials";

const ICONS: Record<ResourceMaterialIcon, LucideIcon> = {
  calendar: Calendar,
  calculator: Calculator,
  clock: Clock3,
  dollar: DollarSign,
  file: FileText,
  message: MessageCircle,
  refresh: RotateCcw,
  sheet: FileSpreadsheet,
  users: Users,
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function MaterialPreview({ material }: { material: ResourceMaterial }) {
  const Icon = ICONS[material.icon];

  if (material.previewImage) {
    return (
      <div
        aria-hidden="true"
        className="relative h-32 overflow-hidden border-b border-line bg-surface-2 sm:h-36"
      >
        <div className="absolute inset-x-9 top-4 h-36 -rotate-2 rounded-md border border-ink/20 bg-cream" />
        <div className="absolute inset-x-11 top-3 h-36 rotate-2 overflow-hidden rounded-md border border-ink/25 bg-surface shadow-[7px_8px_0_rgba(23,24,16,0.07)]">
          <Image
            src={material.previewImage}
            alt=""
            fill
            sizes="(max-width: 640px) 75vw, 320px"
            className="object-cover object-top"
          />
        </div>
      </div>
    );
  }

  if (material.format === "XLSX") {
    return (
      <div
        aria-hidden="true"
        className="relative h-32 overflow-hidden border-b border-line bg-surface-2 sm:h-36"
      >
        <div className="absolute inset-x-5 top-5 overflow-hidden rounded-lg border border-ink/25 bg-surface shadow-[7px_8px_0_rgba(23,24,16,0.07)]">
          <div className="flex h-8 items-center justify-between border-b border-line bg-cream px-3">
            <span className="flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-faint-ink">
              <Icon className="h-3.5 w-3.5 text-ink" />
              Flowo
            </span>
            <span className="text-[0.55rem] font-semibold text-faint-ink">XLSX</span>
          </div>
          <div className="grid grid-cols-[1.25fr_0.75fr_0.75fr] text-[0.55rem] text-muted-ink">
            <span className="border-b border-r border-line bg-surface-2 px-2 py-1.5 font-semibold text-ink">
              Item
            </span>
            <span className="border-b border-r border-line bg-surface-2 px-2 py-1.5 font-semibold text-ink">
              Status
            </span>
            <span className="border-b border-line bg-surface-2 px-2 py-1.5 font-semibold text-ink">
              Total
            </span>
            {["Semana 1", "Em revisão", "R$ —", "Semana 2", "Pronto", "R$ —"].map(
              (cell, index) => (
                <span
                  key={`${cell}-${index}`}
                  className={cn(
                    "border-b border-line px-2 py-1.5",
                    index % 3 !== 2 && "border-r",
                  )}
                >
                  {cell}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative h-32 overflow-hidden border-b border-line bg-surface-2 sm:h-36"
    >
      <div className="absolute left-8 top-7 h-24 w-[42%] -rotate-3 rounded-md border border-ink/20 bg-cream" />
      <div className="absolute inset-x-10 top-4 flex h-28 rotate-2 flex-col rounded-md border border-ink/30 bg-surface p-4 shadow-[7px_8px_0_rgba(23,24,16,0.07)]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-faint-ink">
            <Icon className="h-3.5 w-3.5 text-ink" />
            Flowo
          </span>
          <span className="text-[0.55rem] font-semibold text-faint-ink">PDF</span>
        </div>
        <span className="mt-3 max-w-[14rem] font-serif text-sm leading-tight text-ink">
          {material.title}
        </span>
        <span className="mt-auto h-px w-full bg-ink/25" />
      </div>
    </div>
  );
}

export function MaterialLibrary({ materials }: { materials: ResourceMaterial[] }) {
  const [query, setQuery] = useState("");
  const [problem, setProblem] = useState("Todos");
  const [selectedMaterial, setSelectedMaterial] =
    useState<ResourceMaterial | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastTrackedQueryRef = useRef("");
  const { track } = useSegment();

  const problems = useMemo(
    () => ["Todos", ...Array.from(new Set(materials.map((item) => item.problem)))],
    [materials],
  );

  const filteredMaterials = useMemo(() => {
    const queryTerms = normalize(query.trim()).split(/\s+/).filter(Boolean);

    return materials.filter((item) => {
      const matchesProblem = problem === "Todos" || item.problem === problem;
      const haystack = normalize(
        [
          item.title,
          item.description,
          item.category,
          item.problem,
          item.outcome,
          ...item.tags,
        ].join(" "),
      );
      const matchesQuery = queryTerms.every((term) => haystack.includes(term));
      return matchesProblem && matchesQuery;
    });
  }, [materials, problem, query]);

  const focusSearch = () => {
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const clearSearch = () => {
    setQuery("");
    focusSearch();
  };

  const clearFilters = () => {
    setQuery("");
    setProblem("Todos");
    focusSearch();
  };

  const trackSearch = () => {
    const normalizedQuery = normalize(query.trim());
    if (normalizedQuery.length < 2 || normalizedQuery === lastTrackedQueryRef.current) {
      return;
    }
    lastTrackedQueryRef.current = normalizedQuery;
    track("Resource Library Searched", {
      query: normalizedQuery,
      result_count: filteredMaterials.length,
    });
  };

  const selectProblem = (nextProblem: string) => {
    setProblem(nextProblem);
    track("Resource Library Filtered", {
      problem: nextProblem,
      query: normalize(query.trim()) || undefined,
    });
  };

  return (
    <section aria-labelledby="materials-title">
      <div className="border-b border-line pb-5">
        <p className="text-caption font-semibold uppercase tracking-[0.14em] text-faint-ink">
          Biblioteca prática
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="materials-title" className="text-h3 font-bold text-ink">
              Encontre o material para o problema de hoje
            </h2>
            <p className="mt-2 max-w-2xl text-label leading-relaxed text-muted-ink">
              Cada arquivo informa o que contém, quanto tempo leva para aplicar e
              qual decisão ele ajuda a tomar.
            </p>
          </div>
          <p aria-live="polite" className="shrink-0 text-caption text-faint-ink">
            {filteredMaterials.length} de {materials.length} materiais
          </p>
        </div>
      </div>

      <div className="sticky top-[4.7rem] z-20 -mx-4 border-b border-line bg-background/95 px-4 py-4 backdrop-blur-sm sm:static sm:mx-0 sm:border-b-0 sm:bg-transparent sm:px-0 sm:py-6 sm:backdrop-blur-none">
        <label className="relative block" htmlFor="material-search">
          <span className="sr-only">Buscar material</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint-ink"
          />
          <input
            ref={searchInputRef}
            id="material-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onBlur={trackSearch}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                trackSearch();
              }
            }}
            aria-controls="material-results"
            placeholder="Busque por agenda, comissão, caixa..."
            className="h-12 w-full rounded-full border border-input bg-surface pl-11 pr-11 text-base text-ink outline-none transition-colors placeholder:text-faint-ink hover:border-ink focus:border-ink focus:ring-2 focus:ring-ink/10 sm:text-label"
          />
          {query ? (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-muted-ink hover:bg-surface-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              aria-label="Limpar busca"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : null}
        </label>

        <div
          className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          aria-label="Filtrar por problema"
          role="group"
        >
          {problems.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={problem === item}
              onClick={() => selectProblem(item)}
              className={cn(
                "min-h-10 shrink-0 rounded-full border px-4 text-caption font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
                problem === item
                  ? "border-ink bg-ink text-background"
                  : "border-input bg-surface text-muted-ink hover:border-ink hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredMaterials.length ? (
        <div id="material-results" className="grid gap-4 sm:grid-cols-2">
          {filteredMaterials.map((material) => (
            <article
              id={material.id}
              key={material.id}
              className="flex scroll-mt-40 flex-col overflow-hidden rounded-xl border border-line bg-surface"
            >
              <MaterialPreview material={material} />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-line px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-faint-ink">
                    {material.format}
                  </span>
                  <span className="text-caption text-muted-ink">{material.detail}</span>
                  {material.featured ? (
                    <span className="ml-auto text-caption font-semibold text-ink">
                      Recomendado
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-xl font-semibold leading-tight text-ink">
                  {material.title}
                </h3>
                <p className="mt-2 text-label leading-relaxed text-muted-ink">
                  {material.description}
                </p>

                <div className="mt-5 border-l border-ink/30 pl-3">
                  <p className="text-caption font-semibold uppercase tracking-[0.1em] text-faint-ink">
                    Você termina com
                  </p>
                  <p className="mt-1 text-label leading-relaxed text-ink">
                    {material.outcome}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="mb-3 flex items-center justify-between gap-3 text-caption text-muted-ink">
                    <span>{material.applicationTime}</span>
                    <span>{material.category}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedMaterial(material)}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-label font-semibold text-background transition-colors hover:bg-ink/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                  >
                    <Download aria-hidden="true" className="h-4 w-4" />
                    {material.cta}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div
          id="material-results"
          className="rounded-xl border border-dashed border-line px-6 py-14 text-center"
        >
          <FileText aria-hidden="true" className="mx-auto h-7 w-7 text-faint-ink" />
          <h3 className="mt-4 font-semibold text-ink">Nenhum material encontrado</h3>
          <p className="mt-2 text-label text-muted-ink">
            Tente outra palavra ou limpe os filtros para ver a biblioteca inteira.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 min-h-11 rounded-full border border-input px-5 text-label font-semibold text-ink hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {selectedMaterial ? (
        <DownloadGateModal
          open
          onOpenChange={(open) => {
            if (!open) setSelectedMaterial(null);
          }}
          resourceTitle={selectedMaterial.title}
          resourceDescription={selectedMaterial.description}
          downloadUrl={selectedMaterial.downloadUrl}
          resourceType={selectedMaterial.resourceType}
          requestedResource={selectedMaterial.requestedResource}
        />
      ) : null}
    </section>
  );
}
