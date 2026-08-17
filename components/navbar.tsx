"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import {
  buildSignupUrl,
  LOGIN_URL,
  WHATSAPP_URL,
} from "./cta-links";
import { TrackedLink } from "@/components/analytics/tracked-link";

const navItems = [
  { name: "Produto", href: "/sistema-agendamento-barbearia" },
  { name: "Demonstração", href: "/demonstracao-agendamento-whatsapp" },
  { name: "App", href: "/aplicativo-para-barbeiros" },
  { name: "Recursos", href: "/recursos" },
  { name: "Preços", href: "/precos" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!isMenuOpen) {
      if (dialog?.open) dialog.close();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (dialog && !dialog.open) dialog.showModal();
    const focusFrame = window.requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const navbarSignupUrl = buildSignupUrl({
    campaign: "homepage",
    content: isMenuOpen ? "navbar_mobile" : "navbar_desktop",
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Principal"
        className="mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-4xl md:mt-4"
      >
        <div className="flex h-14 items-center justify-between rounded-full border border-line bg-cream pl-5 pr-2.5 shadow-[0_4px_8px_oklch(0.17_0.012_110/0.08)]">
          <Link
            href="/"
            prefetch={false}
            className="flex h-11 shrink-0 items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            aria-label="Flowo, página inicial"
            onClick={closeMenu}
          >
            <Image
              src="/flowo-logo.svg"
              alt="Flowo"
              width={82}
              height={40}
              priority
              fetchPriority="high"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-5 lg:flex lg:gap-7">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                className="inline-flex min-h-11 items-center text-label font-medium text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <TrackedLink
              href={WHATSAPP_URL}
              event="CTA Clicked"
              properties={{
                page: "navigation",
                placement: "navbar_desktop",
                destination: "whatsapp_sales",
                intent: "ask_question",
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 items-center text-label font-medium text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink xl:inline-flex"
            >
              Tirar dúvidas
            </TrackedLink>
            <a
              href={LOGIN_URL}
              className="inline-flex min-h-11 items-center text-label font-medium text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
            >
              Entrar
            </a>
            <TrackedLink
              href={navbarSignupUrl}
              event="CTA Clicked"
              properties={{
                page: "navigation",
                placement: "navbar_desktop",
                destination: "dashboard_signup",
                intent: "start_now",
              }}
              className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-label font-semibold text-cream transition-colors duration-200 ease-out-quint hover:bg-ink/90"
            >
              Começar agora
            </TrackedLink>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface-2 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menu principal"
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto bg-cream p-0 text-ink backdrop:bg-ink/25 lg:hidden"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          setIsMenuOpen(false);
          toggleRef.current?.focus();
        }}
      >
        <div className="flex min-h-[100dvh] flex-col px-6 pb-8 pt-3">
          <div className="flex h-14 items-center justify-between rounded-full border border-line bg-cream pl-5 pr-2.5 shadow-[0_4px_8px_oklch(0.17_0.012_110/0.08)]">
            <Link
              href="/"
              prefetch={false}
              className="flex h-11 items-center rounded-sm"
              aria-label="Flowo, página inicial"
              onClick={closeMenu}
            >
              <Image src="/flowo-logo.svg" alt="Flowo" width={82} height={40} />
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface-2"
              onClick={closeMenu}
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Navegação móvel" className="mt-8 flex flex-1 flex-col">
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {navItems.map((item, index) => (
                <li key={item.name}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    prefetch={false}
                    className="block py-5 text-h3 font-semibold text-ink"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={LOGIN_URL}
                  className="block py-5 text-h3 font-semibold text-ink"
                  onClick={closeMenu}
                >
                  Entrar
                </a>
              </li>
            </ul>

            <div className="flex flex-col gap-3 pt-10">
              <TrackedLink
                href={navbarSignupUrl}
                event="CTA Clicked"
                properties={{
                  page: "navigation",
                  placement: "navbar_mobile",
                  destination: "dashboard_signup",
                  intent: "start_now",
                }}
                className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-label font-semibold text-cream transition-colors duration-200 hover:bg-ink/90"
                onClick={closeMenu}
              >
                Começar agora
              </TrackedLink>
              <TrackedLink
                href={WHATSAPP_URL}
                event="CTA Clicked"
                properties={{
                  page: "navigation",
                  placement: "navbar_mobile",
                  destination: "whatsapp_sales",
                  intent: "ask_question",
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-label font-medium text-ink transition-colors duration-200 hover:bg-surface"
                onClick={closeMenu}
              >
                Tirar dúvidas no WhatsApp
              </TrackedLink>
            </div>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
