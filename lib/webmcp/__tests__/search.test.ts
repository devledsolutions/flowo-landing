import { describe, expect, it } from "vitest";
import { normalizeText, rankByQuery, tokenize, wordsMatch } from "../search";

describe("search helpers", () => {
  it("normalizes accents, case and punctuation", () => {
    expect(normalizeText("Remarcação, PREÇO e Comissões!")).toBe("remarcacao preco e comissoes");
  });

  it("drops short words and stopwords", () => {
    expect(tokenize("Qual é o preço da Flowo para barbearia?")).toEqual(["preco", "barbearia"]);
  });

  it("matches words that share the first five letters", () => {
    expect(wordsMatch("comissoes", "comissao")).toBe(true);
    expect(wordsMatch("remarcar", "remarcacao")).toBe(true);
    expect(wordsMatch("custa", "custo")).toBe(false);
    expect(wordsMatch("pix", "pix")).toBe(true);
    expect(wordsMatch("pix", "pixel")).toBe(false);
  });

  it("weights title above body and keeps data order on ties", () => {
    const items = [
      { title: "Outra coisa", body: "fala de agenda" },
      { title: "Agenda", body: "texto" },
      { title: "Mais uma", body: "agenda também" },
    ];
    const ranked = rankByQuery(items, "agenda", (item) => [
      { text: item.title, weight: 3 },
      { text: item.body, weight: 1 },
    ]);
    expect(ranked.map((item) => item.title)).toEqual(["Agenda", "Outra coisa", "Mais uma"]);
  });
});
