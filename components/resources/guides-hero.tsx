import { Breadcrumb } from "@/components/breadcrumb";

export function GuidesHero() {
  return (
    <section className="pt-32 pb-4">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Recursos", href: "/recursos" },
              { label: "Guias", href: "/recursos/guias" },
            ]}
          />
          <div className="mt-8">
            <h1 className="text-h2 font-bold leading-tight text-ink">
              Guias para barbearias que levam a{" "}
              <em className="font-serif font-medium italic">agenda</em> a sério
            </h1>
            <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
              Como usar o Flowo para organizar horários, confirmar clientes pelo
              WhatsApp e acompanhar o que importa. Prático, direto ao ponto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
