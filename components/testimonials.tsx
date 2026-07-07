const quotes = [
  {
    text: "Antes eu parava o corte toda hora pra responder WhatsApp. Agora a IA cuida disso e eu fico com a tesoura na mão. A agenda chega organizada.",
    author: "Rafael Souza",
    role: "Barbeiro, São Paulo",
    initial: "R",
  },
  {
    text: "Com vários barbeiros era impossível controlar a agenda pela conversa. Cada um tem a sua, e o cliente marca direto com quem quer.",
    author: "Leonardo Silva",
    role: "Barbearia com equipe, Rio de Janeiro",
    initial: "L",
  },
  {
    text: "O que mais mudou foi a confirmação automática. O cliente recebe o lembrete e responde ali mesmo. Cadeira vazia por esquecimento virou exceção.",
    author: "Thiago Barbosa",
    role: "Barbearia de bairro, Belo Horizonte",
    initial: "T",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="depoimentos-title"
      className="section-normal bg-cream"
    >
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 id="depoimentos-title" className="text-h2 font-semibold text-ink">
            Feito para o dia a dia de quem corta cabelo
          </h2>
          <p className="mt-4 max-w-measure text-lead text-muted-ink">
            A ideia é simples: a IA atende no WhatsApp para a equipe não largar a
            tesoura. É assim que a rotina de uma barbearia muda.
          </p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-8">
          {quotes.map((quote) => (
            <figure key={quote.author} className="flex flex-col">
              <blockquote className="font-serif text-h3 font-medium italic leading-snug tracking-[-0.008em] text-ink">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-serif text-base font-semibold text-ink"
                >
                  {quote.initial}
                </span>
                <span>
                  <span className="block font-semibold text-ink">
                    {quote.author}
                  </span>
                  <span className="block text-sm text-muted-ink">
                    {quote.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p role="note" className="mt-10 text-caption text-muted-ink">
          Falas ilustrativas de como o Flowo funciona no dia a dia da barbearia.
          Não são depoimentos de clientes identificados nem promessa de
          resultado.
        </p>
      </div>
    </section>
  );
}
