"use client";

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      onClick={(event) => {
        const target =
          document.getElementById("main-content") ??
          document.querySelector("main");
        if (target instanceof HTMLElement) {
          event.preventDefault();
          target.setAttribute("tabindex", "-1");
          target.focus();
          target.scrollIntoView();
        }
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-label focus:font-medium focus:text-cream"
    >
      Pular para o conteúdo principal
    </a>
  );
}
