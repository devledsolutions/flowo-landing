import type { MetadataRoute } from "next";
import {
  COMPARISON_LAST_VERIFIED,
  COMPETITOR_COMPARISONS,
} from "@/data/competitor-comparisons";
import { GUIDES } from "@/data/guides";
import { SITE_URL } from "@/lib/seo";

const COMPETITOR_ROUTES = COMPETITOR_COMPARISONS.map(
  (comparison) => comparison.path,
);

const CONTENT_DATES = {
  commercial: new Date("2026-08-23T00:00:00.000Z"),
  product: new Date("2026-08-17T00:00:00.000Z"),
  resources: new Date("2026-08-23T00:00:00.000Z"),
  validation: new Date("2026-08-17T00:00:00.000Z"),
  comparisons: new Date(`${COMPARISON_LAST_VERIFIED}T00:00:00.000Z`),
  legal: new Date("2026-08-14T00:00:00.000Z"),
} as const;

const CORE_ROUTES = [
  "/",
  "/precos",
  "/recepcionista-ia-barbearia",
  "/sistema-agendamento-barbearia",
  "/agenda-barbearia-whatsapp",
  "/demonstracao-agendamento-whatsapp",
  "/casos-de-validacao",
  "/casos-de-validacao/linha-onze-sao-paulo",
  "/casos-de-validacao/quatro-tempos-curitiba",
  "/software-barbearia-com-pix",
  "/aplicativo-para-barbeiros",
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
  "/parcerias",
  "/sobre",
  "/privacidade",
  "/termos",
  "/exclusao-de-dados",
] as const;

type CoreRoute = (typeof CORE_ROUTES)[number];

function routeContentClass(route: CoreRoute): keyof typeof CONTENT_DATES {
  if (
    route === "/comparar" ||
    route === "/flowo-vs-planilha" ||
    route === "/flowo-vs-agenda-manual" ||
    COMPETITOR_ROUTES.includes(route)
  ) {
    return "comparisons";
  }
  if (
    route.startsWith("/recursos") ||
    route === "/calculadora-tempo-whatsapp-barbearia" ||
    route === "/calculadora-comissao-barbeiro" ||
    route === "/mensagens-retorno-clientes-barbearia"
  ) {
    return "resources";
  }
  if (
    route === "/demonstracao-agendamento-whatsapp" ||
    route.startsWith("/casos-de-validacao")
  ) {
    return "validation";
  }
  if (
    route === "/privacidade" ||
    route === "/termos" ||
    route === "/exclusao-de-dados"
  ) {
    return "legal";
  }
  if (route === "/" || route === "/precos") return "commercial";
  return "product";
}

function routeChangeFrequency(
  route: CoreRoute,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  const contentClass = routeContentClass(route);
  if (contentClass === "legal") return "yearly";
  if (contentClass === "comparisons" || contentClass === "validation") {
    return "monthly";
  }
  return "weekly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const coreEntries: MetadataRoute.Sitemap = CORE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: CONTENT_DATES[routeContentClass(route)],
    changeFrequency: routeChangeFrequency(route),
    priority:
      route === "/"
        ? 1
        : route === "/recepcionista-ia-barbearia" ||
            route === "/sistema-agendamento-barbearia" ||
            route === "/agenda-barbearia-whatsapp" ||
            route === "/demonstracao-agendamento-whatsapp" ||
            route === "/casos-de-validacao" ||
            route.startsWith("/casos-de-validacao/") ||
            route === "/software-barbearia-com-pix" ||
            route === "/aplicativo-para-barbeiros" ||
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
