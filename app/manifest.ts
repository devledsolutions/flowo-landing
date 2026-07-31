import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Flowo — Gestão para Barbearias",
    short_name: "Flowo",
    description:
      "Recepção com IA no WhatsApp, agenda, comandas e gestão para barbearias brasileiras.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6f2",
    theme_color: "#171810",
    lang: "pt-BR",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/flowo-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
