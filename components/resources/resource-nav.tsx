import Link from "next/link";
import { BookOpen, Clapperboard, Download, LayoutGrid } from "lucide-react";

const items = [
  { href: "/recursos", label: "Visão geral", icon: LayoutGrid },
  { href: "/recursos/guias", label: "Guias", icon: BookOpen },
  { href: "/recursos/materiais", label: "Materiais", icon: Download },
  { href: "/recursos/videos", label: "Roteiros", icon: Clapperboard },
] as const;

export function ResourceNav({ current }: { current: (typeof items)[number]["href"] }) {
  return (
    <nav aria-label="Seções de recursos" className="mt-8">
      <ul className="grid grid-cols-2 gap-2 sm:flex">
        {items.map((item) => {
          const isCurrent = item.href === current;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-label font-medium transition-colors duration-200 ease-out-quint sm:w-auto ${
                  isCurrent
                    ? "border-ink bg-ink text-cream"
                    : "border-line bg-surface text-muted-ink hover:border-ink/40 hover:text-ink"
                }`}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
