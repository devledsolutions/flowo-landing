/**
 * Versioned public paths prevent browsers and intermediary CDNs from replaying
 * an older render after the institutional film is replaced.
 */
export const INSTITUTIONAL_FILM = {
  video: "/videos/flowo-institucional-voz-natural-2026-07.mp4",
  verticalVideo:
    "/videos/flowo-institucional-voz-natural-2026-07-vertical.mp4",
  captions: "/videos/flowo-institucional-voz-natural-2026-07.vtt",
  poster: "/videos/flowo-institucional-poster.jpg",
} as const;

export const INSTITUTIONAL_FILM_TRANSCRIPT =
  "Sabe aquelas mensagens que chegam bem na hora do corte? A Flowo responde por você. A inteligência artificial conversa com o cliente pelo WhatsApp, entende o serviço e consulta os horários de cada profissional. O cliente escolhe. A agenda atualiza na hora. E a confirmação acontece ali mesmo, sem trocar de aplicativo. Você acompanha tudo pelo painel e, quando quiser, sua equipe assume a conversa. Agenda, comandas e histórico, no mesmo fluxo. E, se fizer sentido para a sua barbearia, você ainda pode ativar pagamentos integrados e cashback. Flowo. Sua barbearia trabalhando. Sua recepção, sempre pronta.";
