"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Depth planes driven by the page scroll, the way fora.so stages its hero:
 * a plane with `rate` 1 travels with the page, a plane with `rate` 0.7 keeps
 * only 70% of that travel and so reads as further away. Everything in front
 * of a slower plane appears to climb over it as the reader scrolls.
 *
 * Transform only, one rAF per scroll event, and off entirely on phones and
 * under reduced motion: there the planes are a static stack.
 */
export function ParallaxPlanes({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const planes = [...el.querySelectorAll<HTMLElement>("[data-plane-rate]")];
    const media = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    let raf = 0;

    const paint = () => {
      raf = 0;
      const top = el.getBoundingClientRect().top + window.scrollY;
      // Travel is measured from the top of the stage, and capped at its own
      // height: past that the hero is off screen and there is nothing to lag.
      const travel = Math.min(Math.max(window.scrollY - top, 0), el.offsetHeight);
      for (const plane of planes) {
        const rate = parseFloat(plane.dataset.planeRate ?? "1");
        plane.style.transform = `translate3d(0, ${(travel * (1 - rate)).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(paint);
    };
    const reset = () => {
      for (const plane of planes) plane.style.transform = "";
    };
    const arm = () => {
      if (media.matches) {
        paint();
        window.addEventListener("scroll", onScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", onScroll);
        reset();
      }
    };

    arm();
    media.addEventListener("change", arm);
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      media.removeEventListener("change", arm);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      reset();
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
