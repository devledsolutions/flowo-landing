import { FAQSection } from "@/components/faq-section";
import { faqItems } from "@/data/faq-items";

export default function FAQ() {
  return (
    <section aria-label="Perguntas frequentes" className="section-normal">
      <div className="container-page">
        <FAQSection
          title="Perguntas frequentes"
          description="Tire suas dúvidas sobre o Flowo"
          items={faqItems}
        />
      </div>
    </section>
  );
}
