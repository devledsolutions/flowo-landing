import type { MetadataRoute } from "next";
import { GUIDES } from "@/data/guides";
import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = new Date("2026-07-29T00:00:00.000Z");

const CORE_ROUTES = [
  "/",
  "/precos",
  "/sistema-agendamento-barbearia",
  "/agenda-barbearia-whatsapp",
  "/software-barbearia-com-pix",
  "/recursos/comissoes-barbeiros",
  "/recursos/cashback-barbearia",
  "/recursos/nota-fiscal-barbearia",
  "/comparar",
  "/flowo-vs-planilha",
  "/flowo-vs-agenda-manual",
  "/recursos",
  "/recursos/videos",
  "/recursos/materiais",
  "/recursos/guias",
  "/casos-de-sucesso",
  "/casos-de-sucesso/academia-corpo-em-forma",
  "/casos-de-sucesso/clinica-saude-total",
  "/casos-de-sucesso/estudio-beleza-radiante",
  "/sobre",
  "/privacidade",
  "/termos",
  "/exclusao-de-dados",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const coreEntries: MetadataRoute.Sitemap = CORE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority:
      route === "/"
        ? 1
        : route === "/sistema-agendamento-barbearia" ||
            route === "/agenda-barbearia-whatsapp" ||
            route === "/software-barbearia-com-pix" ||
            route === "/recursos/comissoes-barbeiros" ||
            route === "/recursos/cashback-barbearia" ||
            route === "/recursos/nota-fiscal-barbearia"
          ? 0.9
          : route === "/comparar" ||
              route === "/flowo-vs-planilha" ||
              route === "/flowo-vs-agenda-manual"
            ? 0.85
            : 0.7,
  }));

  const guideEntries: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${SITE_URL}${guide.path}`,
    lastModified: new Date(guide.modifiedTime),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...coreEntries, ...guideEntries];
}
