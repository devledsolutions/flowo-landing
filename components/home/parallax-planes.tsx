"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Depth planes driven by the page scroll, the way fora.so stages its hero:
 * a plane with `rate` 1 travels with the page, a plane with `rate` 0.69 keeps
 * only 69% of that travel and so reads as further away. Everything in front
 * of a slower plane appears to climb over it as the reader scrolls.
 *
 * Transform only, one rAF per scroll event, on every viewport (the reference
 * keeps it on phones too), and off under reduced motion, where the planes
 * are a still stack.
 */
export function ParallaxPlanes({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const planes = [...el.querySelectorAll<HTMLElement>("[data-plane-rate]")];
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let raf = 0;

    const paint = () => {
      raf = 0;
      const top = el.getBoundingClientRect().top + window.scrollY;
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
    <section ref={root} id={id} className={className}>
      {children}
    </section>
  );
}
