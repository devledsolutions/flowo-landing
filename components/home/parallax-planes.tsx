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
    const planes = [...el.querySelectorAll<HTMLElement>("[data-plane-rate],[data-plane-origin]")];
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let raf = 0;

    const paint = () => {
      raf = 0;
      const top = el.getBoundingClientRect().top + window.scrollY;
      // Two clocks. "top": travel counted from the moment the stage top
      // reaches the viewport top (the hero). "enter": travel counted from the
      // moment the stage enters the viewport at the bottom, for a plane that
      // settles into place as its section arrives (the closing landscape).
      const fromTop = Math.min(Math.max(window.scrollY - top, 0), el.offsetHeight);
      const fromEnter = Math.max(window.scrollY + window.innerHeight - top, 0);
      for (const plane of planes) {
        // A plane may carry a second tuning for wide viewports (`-lg`), since the
        // reference tunes the closing band differently on a phone and a desk.
        const lg = window.innerWidth >= 1024;
        const rate = parseFloat((lg && plane.dataset.planeRateLg) || plane.dataset.planeRate || "1");
        const base = parseFloat((lg && plane.dataset.planeBaseLg) || plane.dataset.planeBase || "0");
        let y;
        if (plane.dataset.planeOrigin === "settle") {
          // Starts `base` px low and settles to 0 between `start` and `end` px of
          // entry travel, easing in the way the reference band does: slow at
          // first, most of the move in the last stretch.
          const start = parseFloat((lg && plane.dataset.planeStartLg) || plane.dataset.planeStart || "0");
          const end = parseFloat((lg && plane.dataset.planeEndLg) || plane.dataset.planeEnd || "1");
          const t = Math.min(Math.max((fromEnter - start) / (end - start), 0), 1);
          y = base * (1 - t * t * t * t);
        } else {
          const travel = plane.dataset.planeOrigin === "enter" ? fromEnter : fromTop;
          y = base + travel * (1 - rate);
        }
        plane.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
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
