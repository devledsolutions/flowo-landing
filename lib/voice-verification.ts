/**
 * Pedido de ligação: o telefone precisa ser provado antes de qualquer discagem.
 *
 * O formulário desta landing é público e sem login. Sem prova de posse, bastaria
 * enviar o telefone de um terceiro com a caixa marcada para a Flowo ligar para
 * alguém que nunca pediu nada. O código fecha essa porta, e é a única coisa que
 * concede permissão de ligação no backend.
 */

/**
 * A versão do texto que a pessoa realmente leu na tela. O backend recusa
 * qualquer outra, e revalida na hora de discar: trocar o texto sem trocar a
 * versão significaria ligar amparado por uma frase que ninguém viu.
 */
export const VOICE_CONTACT_CONSENT_VERSION = "voice-sales-contact-v1";

/** O que aparece ao lado da caixa. Muda junto com a versão acima, sempre. */
export const VOICE_CONTACT_CONSENT_TEXT =
  "Autorizo a Flowo a me ligar sobre o produto, de segunda a sexta, das 9h às 18h. Posso pedir para parar a qualquer momento.";

export const VOICE_CODE_LENGTH = 6;

/** Segundos entre um reenvio e outro, espelhando o limite do backend. */
export const VOICE_CODE_RESEND_SECONDS = 60;
