import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import { LEGAL_ENTITY } from "@/lib/legal-identity";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SIGNUP_URL } from "@/components/cta-links";
import { cn } from "@/lib/utils";
const APP_URL = "https://barber.flowo.com.br";

const produtoLinks = [
  { href: "/recepcionista-ia-barbearia", label: "Recepcionista com IA" },
  { href: "/recursos", label: "Recursos" },
  { href: "/aplicativo-para-barbeiros", label: "Aplicativo para a equipe" },
  { href: "/precos", label: "Preços" },
  { href: "/sobre", label: "Sobre nós" },
  {
    href: "/demonstracao-agendamento-whatsapp",
    label: "Demonstração",
  },
  { href: "/casos-de-validacao", label: "Flowo em ação" },
];

const barbeariasLinks = [
  { href: "/sistema-agendamento-barbearia", label: "Sistema de agendamento" },
  { href: "/software-para-barbearia", label: "Software para barbearia" },
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

const compactProductLinks = [
  { href: "/sistema-agendamento-barbearia", label: "Como funciona" },
  { href: "/demonstracao-agendamento-whatsapp", label: "Demonstração" },
  { href: "/precos", label: "Planos e preços" },
];

const compactFlowoLinks = [
  { href: "/recursos", label: "Recursos" },
  { href: "/comparar", label: "Comparar sistemas" },
  { href: "/sobre", label: "Sobre a Flowo" },
];

const compactContaLinks = [
  { href: APP_URL, label: "Entrar" },
  { href: SIGNUP_URL, label: "Criar minha conta" },
];

const LINK =
  "flex min-h-11 items-center rounded-sm text-sm text-muted-ink outline-none transition-colors duration-200 ease-out-quint hover:text-ink focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

function FooterLinkList({
  links,
  compact = false,
}: {
  links: { href: string; label: string }[];
  compact?: boolean;
}) {
  return (
    <ul className={cn("mt-3", compact && "mt-6 space-y-4 lg:space-y-0")}>
      {links.map((link) => {
        const external = link.href.startsWith("http");
        const className = cn(LINK, compact && "min-h-0 justify-center text-[14px] leading-[21px] lg:h-[37px] lg:justify-start");
        return (
          <li key={link.href}>
            {external ? (
              <a href={link.href} className={className}>
                {link.label}
              </a>
            ) : (
              <Link href={link.href} prefetch={false} className={className}>
                {link.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * `compact` is the home footer, composed the way fora.so composes its own:
 * on a desk, the brand and its contact on the left, three link columns on the
 * right at x 752 / 941 / 1151 of a 1080 container, a hairline, then the legal
 * line. On a phone everything stacks and centres. The closing section's hills
 * run 64px over the top edge, so the first 64px hold nothing but the mark.
 */
export default function Footer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="on-ink relative z-0">
        <div className="mx-auto w-full max-w-[1080px] px-6 pb-[48px] pt-[103px] lg:px-0 lg:pb-[44px] lg:pt-[50px]">
          <div className="grid gap-16 text-center lg:grid-cols-[minmax(0,1fr)_189px_210px_109px] lg:gap-0 lg:text-left">
            <div className="lg:pr-12">
              <Image
                src="/flowo-logo.svg"
                alt="Flowo"
                width={82}
                height={40}
                className="mx-auto brightness-0 invert lg:mx-0"
              />
              <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-muted-ink lg:mx-0">
                Atendimento no WhatsApp conectado à agenda da barbearia.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center justify-center gap-3 text-sm text-muted-ink lg:justify-start">
                  <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                  Curitiba, PR, Brasil
                </li>
                <li className="flex items-center justify-center gap-3 text-sm lg:justify-start">
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-ink" />
                  <a href={`mailto:${LEGAL_ENTITY.contactEmail}`} className={cn(LINK, "min-h-0")}>
                    {LEGAL_ENTITY.contactEmail}
                  </a>
                </li>
              </ul>
            </div>

            <nav aria-label="Produto" className="lg:pt-4">
              <h3 className="text-[14px] font-medium text-ink">Produto</h3>
              <FooterLinkList links={compactProductLinks} compact />
            </nav>
            <nav aria-label="Flowo" className="lg:pt-4">
              <h3 className="text-[14px] font-medium text-ink">Flowo</h3>
              <FooterLinkList links={compactFlowoLinks} compact />
            </nav>
            <nav aria-label="Conta" className="lg:pt-4">
              <h3 className="text-[14px] font-medium text-ink">Conta</h3>
              <FooterLinkList links={compactContaLinks} compact />
            </nav>
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 border-t border-line pt-7 text-center lg:mt-[56px] lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-2xl text-caption leading-relaxed text-muted-ink">
              <p>© {new Date().getFullYear()} Flowo. Todos os direitos reservados.</p>
              <p className="mt-1">
                {LEGAL_ENTITY.name} · CNPJ {LEGAL_ENTITY.taxId} · {LEGAL_ENTITY.address}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 text-caption">
              <Link href="/privacidade" prefetch={false} className={cn(LINK, "text-caption")}>
                Política de Privacidade
              </Link>
              <Link href="/termos" prefetch={false} className={cn(LINK, "text-caption")}>
                Termos de Uso
              </Link>
              <Link href="/exclusao-de-dados" prefetch={false} className={cn(LINK, "text-caption")}>
                Exclusão de Dados
              </Link>
              <CookiePreferencesButton />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="on-ink border-t border-line">
      <div className="container-page section-tight">
        <div className="mb-14">
          <NewsletterSignup />
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1.15fr_1fr_0.9fr] lg:gap-8 xl:gap-12">
          <div>
            <Image src="/flowo-logo.svg" alt="Flowo" width={104} height={51} className="brightness-0 invert" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-ink">
              Atendimento no WhatsApp conectado à agenda da barbearia.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-ink">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                Curitiba, PR, Brasil
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-ink" />
                <a href={`mailto:${LEGAL_ENTITY.contactEmail}`} className={LINK}>
                  {LEGAL_ENTITY.contactEmail}
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
                <a href={APP_URL} className={LINK}>
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
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl text-caption leading-relaxed text-muted-ink">
            <p>© {new Date().getFullYear()} Flowo. Todos os direitos reservados.</p>
            <p className="mt-2">
              {LEGAL_ENTITY.name} · CNPJ {LEGAL_ENTITY.taxId} · {LEGAL_ENTITY.address}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 text-caption">
            <Link href="/privacidade" prefetch={false} className={cn(LINK, "text-caption")}>
              Política de Privacidade
            </Link>
            <Link href="/termos" prefetch={false} className={cn(LINK, "text-caption")}>
              Termos de Uso
            </Link>
            <Link href="/exclusao-de-dados" prefetch={false} className={cn(LINK, "text-caption")}>
              Exclusão de Dados
            </Link>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
