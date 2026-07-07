import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = new Date("2026-07-06T00:00:00.000Z");

const ROUTES = [
  "/",
  "/precos",
  "/sistema-agendamento-barbearia",
  "/agenda-barbearia-whatsapp",
  "/software-barbearia-com-pix",
  "/flowo-vs-planilha",
  "/flowo-vs-agenda-manual",
  "/recursos",
  "/recursos/videos",
  "/recursos/materiais",
  "/llms.txt",
  "/recursos/guias",
  "/recursos/guias/guia-definitivo-agendamento",
  "/recursos/guias/gerenciamento-equipe",
  "/recursos/guias/reduzindo-faltas",
  "/recursos/guias/pagamentos-pix",
  "/recursos/guias/relatorios-metricas",
  "/recursos/guias/configurando-whatsapp",
  "/recursos/guias/aumentar-ticket-medio",
  "/recursos/guias/escala-equipe",
  "/recursos/guias/fidelizacao-clientes",
  "/recursos/guias/controle-financeiro-barbearia",
  "/casos-de-sucesso",
  "/casos-de-sucesso/academia-corpo-em-forma",
  "/casos-de-sucesso/clinica-saude-total",
  "/casos-de-sucesso/estudio-beleza-radiante",
  "/sobre",
  "/privacidade",
  "/termos",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority:
      route === "/"
        ? 1
        : route === "/sistema-agendamento-barbearia" ||
            route === "/agenda-barbearia-whatsapp" ||
            route === "/software-barbearia-com-pix"
          ? 0.9
          : route === "/flowo-vs-planilha" || route === "/flowo-vs-agenda-manual"
            ? 0.85
          : route.startsWith("/recursos/guias/")
            ? 0.8
            : route === "/llms.txt"
              ? 0.6
            : 0.7,
  }));
}
