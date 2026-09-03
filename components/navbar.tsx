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
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Como funciona", href: "/sistema-agendamento-barbearia" },
  { name: "Demonstração", href: "/demonstracao-agendamento-whatsapp" },
  { name: "Preços", href: "/precos" },
];

export default function Navbar({ overInk = false }: { overInk?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  // Over the dark hero the bar is transparent with cream type, the way the
  // reference sits its nav on the sky; it turns into the cream bar once the
  // hero has scrolled out.
  useEffect(() => {
    if (!overInk) return;
    const hero = document.getElementById("hero");
    const onScroll = () => setPastHero(window.scrollY > (hero?.offsetHeight ?? 0) - 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overInk]);
  const ink = overInk && !pastHero && !isMenuOpen;
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        ink ? "border-transparent bg-transparent" : "border-line bg-cream"
      )}
    >
      <nav
        aria-label="Principal"
        className="container-page"
      >
        <div className="flex h-[4.5rem] items-center justify-between">
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
              className={cn(ink && "brightness-0 invert")}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                className={cn(
                  "inline-flex min-h-11 items-center text-label font-medium transition-colors duration-200 ease-out-quint",
                  ink ? "text-white/80 hover:text-white" : "text-muted-ink hover:text-ink"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={LOGIN_URL}
              className={cn(
                "inline-flex min-h-11 items-center text-label font-medium transition-colors duration-200 ease-out-quint",
                ink ? "text-white/80 hover:text-white" : "text-muted-ink hover:text-ink"
              )}
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
              className={cn(
                "inline-flex h-11 items-center rounded-full px-5 text-label font-semibold transition-colors duration-200 ease-out-quint active:translate-y-px",
                ink ? "bg-white/80 text-[rgb(1,16,29)] hover:bg-white" : "bg-ink text-cream hover:bg-ink/90"
              )}
            >
              Criar minha conta
            </TrackedLink>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 lg:hidden",
              ink ? "text-white hover:bg-white/10" : "text-ink hover:bg-surface-2"
            )}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-hidden={isMenuOpen}
            tabIndex={isMenuOpen ? -1 : 0}
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
        <div className="flex min-h-[100dvh] flex-col px-6 pb-8">
          <div className="flex h-[4.5rem] items-center justify-between border-b border-line">
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
                Criar minha conta
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
                Falar com a Flowo no WhatsApp
              </TrackedLink>
            </div>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
