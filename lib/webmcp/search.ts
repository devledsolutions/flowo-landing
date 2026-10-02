/**
 * Small accent-insensitive search over the site's own data files. Two words
 * match when they share their first five letters ("comissoes" and "comissao",
 * "remarcar" and "remarcacao"); shorter words must be equal.
 */

const STOPWORDS = new Set([
  "aos", "com", "como", "das", "dos", "ela", "ele", "essa", "esse", "esta",
  "este", "flowo", "isso", "mais", "meu", "minha", "nas", "nos", "numa", "num",
  "onde", "para", "pela", "pelo", "por", "qual", "quais", "que", "sao", "ser",
  "sem", "seu", "sua", "tem", "ter", "uma", "umas", "uns", "voce", "vou",
]);

const SYNONYMS: Record<string, readonly string[]> = {
  preco: ["custa", "valor", "plano"],
  teste: ["gratis", "avaliacao"],
  cancelar: ["fidelidade", "cancele"],
};

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length >= 3 && !STOPWORDS.has(token));
}

export function wordsMatch(a: string, b: string): boolean {
  if (a.length >= 5 && b.length >= 5) return a.slice(0, 5) === b.slice(0, 5);
  return a === b;
}

export type SearchField = { text: string; weight: number };

function queryTerms(query: string): string[][] {
  return Array.from(new Set(tokenize(query))).map((token) => {
    const synonyms = Object.entries(SYNONYMS).find(([key]) => wordsMatch(key, token))?.[1] ?? [];
    return [token, ...synonyms];
  });
}

/**
 * Each query word (or one of its synonyms) adds the weight of every field it
 * appears in. Returns items with a positive score, best first; ties keep the
 * data order.
 */
export function rankByQuery<T>(
  items: readonly T[],
  query: string,
  fields: (item: T) => SearchField[],
): T[] {
  const terms = queryTerms(query);
  if (terms.length === 0) return [];
  return items
    .map((item, index) => {
      const itemFields = fields(item).map((field) => ({
        weight: field.weight,
        tokens: tokenize(field.text),
      }));
      let score = 0;
      for (const alternatives of terms) {
        for (const field of itemFields) {
          if (field.tokens.some((token) => alternatives.some((term) => wordsMatch(term, token)))) {
            score += field.weight;
          }
        }
      }
      return { item, index, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((entry) => entry.item);
}
