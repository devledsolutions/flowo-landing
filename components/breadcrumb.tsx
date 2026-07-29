import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Navegação estrutural">
      <ol className="flex flex-wrap items-center gap-x-1 text-sm text-muted-ink">
        {items.map((item, index) => (
          <li key={`${item.href}-${item.label}`} className="flex items-center">
            {index > 0 ? (
              <ChevronRight className="mx-1 h-4 w-4" aria-hidden="true" />
            ) : null}
            {index === items.length - 1 ? (
              <span className="inline-flex min-h-11 items-center" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center rounded outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
