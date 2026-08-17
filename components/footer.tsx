import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import { LEGAL_ENTITY } from "@/lib/legal-identity";
import { NewsletterSignup } from "@/components/newsletter-signup";

const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";
const APP_URL = "https://barber.flowo.com.br";

const produtoLinks = [
  { href: "/recepcionista-ia-barbearia", label: "Recepcionista com IA" },
  { href: "/recursos", label: "Recursos" },
  { href: "/aplicativo-para-barbeiros", label: "Aplicativo para a equipe" },
  { href: "/precos", label: "Preços" },
  { href: "/sobre", label: "Sobre nós" },
  {
    href: "/demonstracao-agendamento-whatsapp",
    label: "Demonstração validada",
  },
  { href: "/casos-de-validacao", label: "Flowo em ação" },
];

const barbeariasLinks = [
  { href: "/sistema-agendamento-barbearia", label: "Sistema de agendamento" },
  { href: "/agenda-barbearia-whatsapp", label: "Agenda no WhatsApp" },
  { href: "/software-barbearia-com-pix", label: "Pagamentos opcionais" },
  { href: "/recursos/comissoes-barbeiros", label: "Comissões de barbeiros" },
  { href: "/recursos/cashback-barbearia", label: "Cashback para barbearias" },
  { href: "/recursos/nota-fiscal-barbearia", label: "Nota fiscal assistida" },
  { href: "/flowo-vs-planilha", label: "Flowo vs planilha" },
  { href: "/flowo-vs-agenda-manual", label: "Flowo vs agenda manual" },
];

const aprendaLinks = [
  { href: "/recursos/guias", label: "Guias" },
  { href: "/recursos/materiais", label: "Materiais gratuitos" },
  {
    href: "/calculadora-tempo-whatsapp-barbearia",
    label: "Calculadora de tempo no WhatsApp",
  },
  {
    href: "/calculadora-comissao-barbeiro",
    label: "Calculadora de comissão",
  },
  {
    href: "/mensagens-retorno-clientes-barbearia",
    label: "Planejador de retorno",
  },
  {
    href: "/recursos/diagnostico-agenda-barbearia",
    label: "Diagnóstico de agenda",
  },
  { href: "/parcerias", label: "Parcerias e imprensa" },
];

const compararLinks = [
  { href: "/comparar", label: "Comparar sistemas" },
  { href: "/flowo-vs-opero", label: "Flowo vs Opero" },
  { href: "/flowo-vs-barva", label: "Flowo vs Barva" },
  { href: "/flowo-vs-appbarber", label: "Flowo vs AppBarber" },
  { href: "/flowo-vs-trinks", label: "Flowo vs Trinks" },
  { href: "/flowo-vs-bestbarbers", label: "Flowo vs BestBarbers" },
  { href: "/flowo-vs-barbeiro-app", label: "Flowo vs Barbeiro.app" },
];

const compactLinks = [
  { href: "/sistema-agendamento-barbearia", label: "Conhecer o produto" },
  { href: "/precos", label: "Planos e preços" },
  { href: "/comparar", label: "Comparar sistemas" },
  { href: "/recursos", label: "Recursos gratuitos" },
  { href: "/sobre", label: "Sobre a Flowo" },
  { href: APP_URL, label: "Entrar" },
] as const;

function FooterLinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="mt-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            prefetch={false}
            className="flex min-h-11 items-center rounded-sm text-sm text-muted-ink outline-none transition-colors duration-200 ease-out-quint hover:text-ink focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer className="on-ink border-t border-line">
      <div className="container-page section-tight">
        <div className="mb-14">
          <NewsletterSignup />
        </div>
        <div
          className={
            compact
              ? "grid grid-cols-1 gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20"
              : "grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1.15fr_1fr_0.9fr] lg:gap-8 xl:gap-12"
          }
        >
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
                Curitiba, PR, Brasil
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-ink" />
                <a
                  href={`mailto:${LEGAL_ENTITY.contactEmail}`}
                  className="flex min-h-11 items-center rounded-sm text-muted-ink outline-none transition-colors duration-200 ease-out-quint hover:text-ink focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {LEGAL_ENTITY.contactEmail}
                </a>
              </li>
            </ul>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-muted-ink">
              Flowo é um produto operado pela {LEGAL_ENTITY.name}
              <br />
              CNPJ {LEGAL_ENTITY.taxId}
              <br />
              {LEGAL_ENTITY.address}
            </p>
          </div>

          {compact ? (
            <nav aria-label="Atalhos da Flowo">
              <h3 className="text-label font-medium text-ink">
                Continue por onde fizer sentido
              </h3>
              <ul className="mt-5 grid border-y border-line sm:grid-cols-2 sm:divide-x sm:divide-line">
                {compactLinks.map((link, index) => (
                  <li
                    key={link.href}
                    className={`border-b border-line last:border-b-0 sm:px-5 ${
                      index >= compactLinks.length - 2 ? "sm:border-b-0" : ""
                    }`}
                  >
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        className="flex min-h-14 items-center justify-between gap-4 text-sm font-medium text-muted-ink transition-colors hover:text-ink"
                      >
                        {link.label}
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="flex min-h-14 items-center justify-between gap-4 text-sm font-medium text-muted-ink transition-colors hover:text-ink"
                      >
                        {link.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <a
                href={SIGNUP_URL}
                className="mt-7 inline-flex min-h-11 items-center rounded-full bg-surface px-5 text-sm font-semibold text-ink-strong transition-colors hover:bg-cream"
              >
                Começar agora
              </a>
            </nav>
          ) : (
            <>
              <nav aria-label="Produto">
                <h3 className="text-label font-medium text-ink">Produto</h3>
                <FooterLinkList links={produtoLinks} />
              </nav>

              <nav aria-label="Para barbearias">
                <h3 className="text-label font-medium text-ink">Para barbearias</h3>
                <FooterLinkList links={barbeariasLinks} />
              </nav>

              <nav aria-label="Comparar sistemas">
                <h3 className="text-label font-medium text-ink">Comparar sistemas</h3>
                <FooterLinkList links={compararLinks} />
              </nav>

              <nav aria-label="Conta e aprendizado">
                <h3 className="text-label font-medium text-ink">Aprenda</h3>
                <FooterLinkList links={aprendaLinks} />
                <h3 className="mt-8 text-label font-medium text-ink">Conta</h3>
                <ul className="mt-3">
                  <li>
                    <a
                      href={APP_URL}
                      className="flex min-h-11 items-center rounded-sm text-sm text-muted-ink outline-none transition-colors duration-200 ease-out-quint hover:text-ink focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                      Entrar
                    </a>
                  </li>
                  <li>
                    <a
                      href={SIGNUP_URL}
                      className="flex min-h-11 items-center rounded-sm text-sm font-medium text-ink underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                      Começar agora
                    </a>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-caption text-muted-ink">
            © {new Date().getFullYear()} Flowo. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 text-caption">
            <Link
              href="/privacidade"
              prefetch={false}
              className="flex min-h-11 items-center rounded-sm text-muted-ink outline-none transition-colors duration-200 ease-out-quint hover:text-ink focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos"
              prefetch={false}
              className="flex min-h-11 items-center rounded-sm text-muted-ink outline-none transition-colors duration-200 ease-out-quint hover:text-ink focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Termos de Uso
            </Link>
            <Link
              href="/exclusao-de-dados"
              prefetch={false}
              className="flex min-h-11 items-center rounded-sm text-muted-ink outline-none transition-colors duration-200 ease-out-quint hover:text-ink focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Exclusão de Dados
            </Link>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
