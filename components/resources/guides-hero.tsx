import { Breadcrumb } from "@/components/breadcrumb";
import { ResourceNav } from "@/components/resources/resource-nav";
import { GUIDES } from "@/data/guides";

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
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-faint-ink">
              {GUIDES.length} guias práticos
            </p>
            <h1 className="mt-3 font-serif text-[clamp(2.1rem,1.6rem+1.6vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink-strong">
              Um processo claro para cada parte da operação
            </h1>
            <p className="mt-4 max-w-measure text-lead leading-relaxed text-muted-ink">
              Aprenda a organizar horários por profissional, confirmar clientes,
              fechar o atendimento e interpretar os relatórios. Cada guia explica
              o que depende de plano, canal ou ativação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
