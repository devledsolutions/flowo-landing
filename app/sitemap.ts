import type { MetadataRoute } from "next";
import { COMPETITOR_COMPARISONS } from "@/data/competitor-comparisons";
import { GUIDES } from "@/data/guides";
import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = new Date("2026-08-24T00:00:00.000Z");
const COMPETITOR_ROUTES = COMPETITOR_COMPARISONS.map(
  (comparison) => comparison.path,
);

const CORE_ROUTES = [
  "/",
  "/precos",
  "/recepcionista-ia-barbearia",
  "/sistema-agendamento-barbearia",
  "/software-para-barbearia",
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
  "/calculadora-dinheiro-perdido-whatsapp-barbearia",
  "/calculadora-ocupacao-agenda-barbearia",
  "/mensagens-retorno-clientes-barbearia",
  "/qual-plano-flowo",
  "/raio-x-gestao-barbearia",
  "/recursos/guias",
  "/parcerias",
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
            route === "/software-para-barbearia" ||
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
            || route === "/calculadora-dinheiro-perdido-whatsapp-barbearia"
            || route === "/calculadora-ocupacao-agenda-barbearia"
            || route === "/mensagens-retorno-clientes-barbearia"
            || route === "/qual-plano-flowo"
            || route === "/raio-x-gestao-barbearia"
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
