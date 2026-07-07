"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SIGNUP_URL } from "./cta-links";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 480);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-40 transition-all duration-200 ease-out-quint ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-hidden={!isVisible}
    >
      <a
        href={SIGNUP_URL}
        tabIndex={isVisible ? 0 : -1}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-label font-semibold text-cream shadow-card transition-colors duration-200 hover:bg-ink/90"
      >
        Começar agora
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
