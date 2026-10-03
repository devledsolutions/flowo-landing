import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AgentConfirmationPanel from "@/components/webmcp/agent-confirmation-panel";
import type { ConfirmationView } from "@/lib/webmcp/confirmation";

const VIEW: NonNullable<ConfirmationView> = {
  step: "confirm",
  request: {
    titulo: "Pedido de contato com a equipe comercial",
    campos: [
      { rotulo: "Nome", valor: "Pessoa Teste" },
      { rotulo: "WhatsApp", valor: "+5511987654321" },
      { rotulo: "Barbearia", valor: "Barbearia <Teste>" },
    ],
    consentimento: "vendas",
  },
};

const noop = () => undefined;

function render(view = VIEW) {
  return renderToStaticMarkup(
    <AgentConfirmationPanel view={view} onApprove={noop} onCancel={noop} onToken={noop} />,
  );
}

function text(html: string) {
  return html.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

describe("agent confirmation panel", () => {
  it("shows every field that will be sent, escaped as text", () => {
    const html = render();
    expect(html).toContain('role="dialog"');
    for (const campo of VIEW.request.campos) {
      expect(text(html)).toContain(campo.rotulo);
      expect(text(html)).toContain(campo.valor);
    }
    expect(html).not.toContain("<Teste>");
  });

  it("shows the full consent sentence with the two documents", () => {
    const html = render();
    expect(text(html)).toContain(
      "Autorizo a Flowo a usar estes dados para responder meu contato, conforme a Política de Privacidade e os Termos de Uso.",
    );
    expect(html).toContain('href="/privacidade"');
    expect(html).toContain('href="/termos"');
    const material = render({ ...VIEW, request: { ...VIEW.request, consentimento: "material" } });
    expect(text(material)).toContain("Autorizo o uso dos dados para entregar este material, conforme a Política de Privacidade");
  });

  it("offers Cancelar first and Autorizar e enviar, enabled only before the check", () => {
    const html = render();
    expect(html.indexOf(">Cancelar<")).toBeGreaterThan(-1);
    expect(html.indexOf(">Cancelar<")).toBeLessThan(html.indexOf(">Autorizar e enviar<"));
    expect(html).not.toMatch(/disabled=""[^>]*>Autorizar e enviar/);
    const verifying = render({ ...VIEW, step: "verify" });
    expect(verifying).toMatch(/disabled=""[^>]*>Autorizar e enviar/);
    expect(text(verifying)).toContain("Autorizado. Fazendo uma verificação de segurança antes de enviar.");
  });
});
