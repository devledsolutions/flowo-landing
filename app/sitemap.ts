import type { MetadataRoute } from "next";
import { COMPETITOR_COMPARISONS } from "@/data/competitor-comparisons";
import { GUIDES } from "@/data/guides";
import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = new Date("2026-07-31T00:00:00.000Z");
const COMPETITOR_ROUTES = COMPETITOR_COMPARISONS.map(
  (comparison) => comparison.path,
);

const CORE_ROUTES = [
  "/",
  "/precos",
  "/recepcionista-ia-barbearia",
  "/sistema-agendamento-barbearia",
  "/agenda-barbearia-whatsapp",
  "/software-barbearia-com-pix",
  "/aplicativo-para-barbeiros",
  "/flowo-recupera",
  "/recursos/comissoes-barbeiros",
  "/recursos/cashback-barbearia",
  "/recursos/nota-fiscal-barbearia",
  "/comparar",
  "/flowo-vs-planilha",
  "/flowo-vs-agenda-manual",
  ...COMPETITOR_ROUTES,
  "/recursos",
  "/recursos/videos",
  "/recursos/materiais",
  "/recursos/diagnostico-agenda-barbearia",
  "/calculadora-tempo-whatsapp-barbearia",
  "/calculadora-comissao-barbeiro",
  "/mensagens-retorno-clientes-barbearia",
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
        : route === "/recepcionista-ia-barbearia" ||
            route === "/sistema-agendamento-barbearia" ||
            route === "/agenda-barbearia-whatsapp" ||
            route === "/software-barbearia-com-pix" ||
            route === "/aplicativo-para-barbeiros" ||
            route === "/flowo-recupera" ||
            route === "/recursos/comissoes-barbeiros" ||
            route === "/recursos/cashback-barbearia" ||
            route === "/recursos/nota-fiscal-barbearia"
            || route === "/recursos/diagnostico-agenda-barbearia"
            || route === "/calculadora-tempo-whatsapp-barbearia"
            || route === "/calculadora-comissao-barbeiro"
            || route === "/mensagens-retorno-clientes-barbearia"
          ? 0.9
          : route === "/comparar" ||
              route === "/flowo-vs-planilha" ||
              route === "/flowo-vs-agenda-manual" ||
              COMPETITOR_ROUTES.includes(route)
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
