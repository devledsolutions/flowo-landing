import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SIGNUP_URL = "https://barber.flowo.com.br/sign-up";

interface CTAContextualProps {
  title: string;
  description: string;
  ctaLabel?: string;
}

export function CTAContextual({
  title,
  description,
  ctaLabel = "Começar agora",
}: CTAContextualProps) {
  return (
    <div className="on-ink mt-12 rounded-xl p-8 sm:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-h3 font-semibold tracking-[-0.01em] text-ink">
            {title}
          </h2>
          <p className="mt-3 text-body text-muted-ink">{description}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Button
            asChild
            size="lg"
            className="rounded-full px-7 font-semibold"
          >
            <a href={SIGNUP_URL}>{ctaLabel}</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-line bg-transparent px-7 text-ink hover:bg-surface hover:text-ink"
          >
            <Link href="/precos" prefetch={false}>
              Ver planos <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
