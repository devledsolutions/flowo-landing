"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { LOGIN_URL, SIGNUP_URL, WHATSAPP_URL } from "./cta-links";

const navItems = [
  { name: "Como funciona", href: "/#como-funciona" },
  { name: "Produto", href: "/sistema-agendamento-barbearia" },
  { name: "Recursos", href: "/recursos" },
  { name: "Preços", href: "/precos" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Principal"
        className="mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-4xl md:mt-4"
      >
        <div className="flex h-14 items-center justify-between rounded-full border border-line bg-cream/85 pl-5 pr-2.5 backdrop-blur-md">
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
              width={88}
              height={24}
              priority
              fetchPriority="high"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                className="text-label font-medium text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-label font-medium text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink lg:inline"
            >
              Tirar dúvidas
            </a>
            <a
              href={LOGIN_URL}
              className="text-label font-medium text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
            >
              Entrar
            </a>
            <a
              href={SIGNUP_URL}
              className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-label font-semibold text-cream transition-colors duration-200 ease-out-quint hover:bg-ink/90"
            >
              Começar agora
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface-2 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile full-height cream sheet */}
      {isMenuOpen && (
          <div
            id="mobile-menu"
            className="fixed inset-0 -z-10 flex h-[100dvh] animate-in flex-col overflow-y-auto bg-cream px-6 pb-8 pt-24 fade-in duration-200 md:hidden"
          >
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
              <a
                href={SIGNUP_URL}
                className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-label font-semibold text-cream transition-colors duration-200 hover:bg-ink/90"
                onClick={closeMenu}
              >
                Começar agora
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-label font-medium text-ink transition-colors duration-200 hover:bg-surface"
                onClick={closeMenu}
              >
                Tirar dúvidas no WhatsApp
              </a>
            </div>
          </div>
      )}
    </header>
  );
}
