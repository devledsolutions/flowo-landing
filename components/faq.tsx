import { FAQSection } from "@/components/faq-section";
import { faqItems, homeFaqItems } from "@/data/faq-items";

export default function FAQ({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Perguntas frequentes" className="section-normal">
      <div className="container-page">
        <FAQSection
          title="Perguntas frequentes"
          description="Tire suas dúvidas sobre o Flowo"
          items={compact ? homeFaqItems : faqItems}
          showSearch={!compact}
        />
      </div>
    </section>
  );
}
