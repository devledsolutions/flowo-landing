import Stats from "./stats";

/**
 * Variante em banda de tinta da faixa de fatos do produto. A antiga grade
 * ("10.000+ usuários", "1M+ agendamentos", "4,9/5") era fabricada e foi
 * removida; nenhum número agregado de clientes pode aparecer aqui sem fonte.
 */
export default function StatsSection() {
  return <Stats onInk />;
}
