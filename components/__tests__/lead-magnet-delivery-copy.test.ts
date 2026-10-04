import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("lead magnet async delivery copy", () => {
  it("offers the download without claiming a queued email has already been sent", () => {
    const source = readFileSync("components/marketing/lead-magnet-form.tsx", "utf8");
    expect(source).toContain("O download está disponível agora.");
    expect(source).toContain("a entrega ainda será processada");
    expect(source).not.toContain("Também enviamos uma cópia");
  });
});
