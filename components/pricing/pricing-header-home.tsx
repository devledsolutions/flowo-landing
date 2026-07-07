/** Section header for the pricing block on the home page (h2, not h1). */
export function PricingHeaderHome() {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <h2 className="text-h2 font-semibold text-ink-strong">
        Escolha o plano da sua barbearia
      </h2>
      <p className="mx-auto mt-4 max-w-measure text-lead text-muted-ink">
        Do barbeiro solo à rede com várias unidades. Sem fidelidade: cancele
        quando quiser.
      </p>
    </header>
  );
}
