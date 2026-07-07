import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";
const APP_URL = "https://barber.flowo.com.br";

const produtoLinks = [
  { href: "/recursos", label: "Recursos" },
  { href: "/precos", label: "Preços" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/casos-de-sucesso", label: "Casos de sucesso" },
];

const barbeariasLinks = [
  { href: "/sistema-agendamento-barbearia", label: "Sistema de agendamento" },
  { href: "/agenda-barbearia-whatsapp", label: "Agenda no WhatsApp" },
  { href: "/software-barbearia-com-pix", label: "Pagamentos PIX no atendimento" },
  { href: "/flowo-vs-planilha", label: "Flowo vs planilha" },
  { href: "/flowo-vs-agenda-manual", label: "Flowo vs agenda manual" },
];

const aprendaLinks = [
  { href: "/recursos/guias", label: "Guias" },
  { href: "/recursos/materiais", label: "Materiais gratuitos" },
];

function FooterLinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            prefetch={false}
            className="text-sm text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="on-ink border-t border-line">
      <div className="container-page section-tight">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr]">
          <div>
            <Image
              src="/flowo-logo.svg"
              alt="Flowo"
              width={104}
              height={51}
              className="brightness-0 invert"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-ink">
              A recepção da sua barbearia no WhatsApp: a IA atende, agenda e
              confirma. Você cuida do corte.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-ink">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                São Paulo, SP, Brasil
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-ink" />
                <a
                  href="mailto:contato@flowo.com.br"
                  className="text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
                >
                  contato@flowo.com.br
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Produto">
            <h3 className="text-label font-medium text-ink">Produto</h3>
            <FooterLinkList links={produtoLinks} />
          </nav>

          <nav aria-label="Para barbearias">
            <h3 className="text-label font-medium text-ink">Para barbearias</h3>
            <FooterLinkList links={barbeariasLinks} />
          </nav>

          <nav aria-label="Conta e aprendizado">
            <h3 className="text-label font-medium text-ink">Aprenda</h3>
            <FooterLinkList links={aprendaLinks} />
            <h3 className="mt-8 text-label font-medium text-ink">Conta</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={APP_URL}
                  className="text-sm text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
                >
                  Entrar
                </a>
              </li>
              <li>
                <a
                  href={SIGNUP_URL}
                  className="text-sm font-medium text-ink underline-offset-4 hover:underline"
                >
                  Começar agora
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-caption text-muted-ink">
            © {new Date().getFullYear()} Flowo. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-caption">
            <Link
              href="/privacidade"
              prefetch={false}
              className="text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos"
              prefetch={false}
              className="text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
