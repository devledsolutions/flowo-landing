import { Breadcrumb } from "@/components/breadcrumb";
import { ResourceNav } from "@/components/resources/resource-nav";

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
          <ResourceNav current="/recursos/guias" />
          <div className="mt-8">
            <p className="text-label font-semibold uppercase tracking-[0.14em] text-faint-ink">
              10 guias práticos
            </p>
            <h1 className="mt-3 text-h2 font-bold leading-tight text-ink">
              Um processo claro para cada parte da operação
            </h1>
            <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
              Aprenda a organizar horários por barbeiro, confirmar clientes no
              WhatsApp, acompanhar o caixa e decidir o próximo ajuste da equipe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
