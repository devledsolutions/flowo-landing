/** Page header for /precos — owns the route's single h1. */
export function PricingHeader() {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <h1 className="text-display font-semibold text-ink-strong">
        Um plano{" "}
        <em className="font-serif font-medium italic tracking-[-0.008em]">
          simples
        </em>{" "}
        para a sua barbearia
      </h1>
      <p className="mx-auto mt-5 max-w-measure text-lead text-muted-ink">
        Todos os planos vêm com a IA atendendo no WhatsApp, lembretes com
        confirmação automática e pagamento do atendimento por PIX ou cartão.
        Sem fidelidade.
      </p>
    </header>
  );
}
