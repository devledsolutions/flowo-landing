"use client";

import { useId, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FAQSectionProps } from "@/types/faq";

export function FAQSection({
  title = "Perguntas frequentes",
  description,
  items,
  className,
  showSearch = true,
}: FAQSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchId = useId();

  const query = searchTerm.trim().toLowerCase();
  const filteredItems = query
    ? items.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      )
    : items;

  return (
    <div className={cn("w-full", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-h2 font-semibold text-ink">{title}</h2>
        {description && (
          <p className="mt-4 text-lead text-muted-ink">{description}</p>
        )}
      </div>

      {showSearch && (
        <div className="relative mx-auto mt-8 max-w-xl">
          <label htmlFor={searchId} className="sr-only">
            Pesquisar perguntas
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-ink"
          />
          <Input
            id={searchId}
            type="search"
            placeholder="Pesquisar perguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 rounded-full border-line bg-surface pl-11 pr-4 text-body text-ink placeholder:text-muted-ink"
          />
        </div>
      )}

      <div className="mx-auto mt-10 max-w-3xl">
        {filteredItems.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredItems.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="border-line"
              >
                <AccordionTrigger className="gap-4 py-5 text-left text-body font-medium text-ink">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-measure pb-6 text-body leading-relaxed text-muted-ink">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p role="status" className="mt-4 text-center text-body text-muted-ink">
            Nenhuma pergunta encontrada para &ldquo;{searchTerm}&rdquo;. Tente
            outra palavra.
          </p>
        )}
        <p aria-live="polite" className="sr-only">
          {query
            ? `${filteredItems.length} ${
                filteredItems.length === 1
                  ? "pergunta encontrada"
                  : "perguntas encontradas"
              }`
            : ""}
        </p>
      </div>
    </div>
  );
}
