/** Shared by the browser tools and the consent-free usage counter route. */
export const TOOL_NAMES = [
  "ver_planos",
  "buscar_perguntas_frequentes",
  "comparar_concorrente",
  "buscar_materiais",
  "calcular_tempo_whatsapp",
  "calcular_oportunidade_whatsapp",
  "calcular_ocupacao_agenda",
  "calcular_comissao",
  "planejar_retorno_cliente",
  "recomendar_plano",
  "diagnosticar_gestao",
  "diagnosticar_agenda",
  "falar_com_vendas",
  "receber_material",
] as const;

export type ToolName = (typeof TOOL_NAMES)[number];

export const ERROR_CODES = [
  "entrada_invalida",
  "verificacao_pendente",
  "verificacao_falhou",
  "cancelado_pela_pessoa",
  "cancelado_pelo_assistente",
  "limite_de_tentativas",
  "indisponivel",
  "erro_interno",
] as const;

export type ErroCodigo = (typeof ERROR_CODES)[number];

export const OUTCOMES = ["ok", ...ERROR_CODES] as const;

export type ToolOutcome = (typeof OUTCOMES)[number];

/** Session flag set by smoke tests so their calls can be excluded from the counter. */
export const WEBMCP_TEST_SESSION_KEY = "flowo:webmcp-teste";
