import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import Footer from "@/components/footer";
import {
  LeadMagnetForm,
  type LeadMagnetConfig,
} from "@/components/marketing/lead-magnet-form";
import styles from "./growth-tool-landing.module.css";

export type GrowthToolKind = "time" | "commission" | "return";

type GrowthToolContent = {
  kind: GrowthToolKind;
  navCta: string;
  kicker: string;
  title: ReactNode;
  lead: string;
  trust: string[];
  tool: ReactNode;
  problemLabel: string;
  problemTitle: string;
  problemCopy: string;
  sectionLabel: string;
  sectionTitle: string;
  sectionCopy: string;
  steps: Array<{ title: string; copy: string }>;
  materialTitle: string;
  materialSubtitle: string;
  materialItems: string[];
  formTitle: string;
  formCopy: string;
  formNotes: string[];
  formConfig: LeadMagnetConfig;
  faqs: Array<{ question: string; answer: string }>;
};

export function GrowthToolLanding({ content }: { content: GrowthToolContent }) {
  return (
    <div className={styles.page} data-tool={content.kind}>
      <header className={styles.navWrap}>
        <div className={styles.nav}>
          <Link href="/" aria-label="Flowo, página inicial">
            <Image
              className={styles.logo}
              src="/flowo-logo.svg"
              alt="Flowo"
              width={152}
              height={75}
              priority
            />
          </Link>
          <nav className={styles.navLinks} aria-label="Nesta página">
            <a href="#ferramenta">Ferramenta</a>
            <a href="#como-usar">Como usar</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <a
            className={styles.navCta}
            data-lead-magnet-cta="true"
            href="#material"
          >
            {content.navCta}
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className={styles.hero} id="ferramenta">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{content.kicker}</p>
          <h1>{content.title}</h1>
          <p className={styles.heroLead}>{content.lead}</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryCta} href="#calculadora">
              Usar a ferramenta gratuita
            </a>
            <span>Resultado na tela · sem cadastro</span>
          </div>
          <ul className={styles.trustLine}>
            {content.trust.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.toolStage} id="calculadora">
          {content.tool}
        </div>
        </section>

        <section className={styles.problemBand}>
          <div>
            <p>{content.problemLabel}</p>
            <h2>{content.problemTitle}</h2>
            <span>{content.problemCopy}</span>
          </div>
        </section>

        <section className={styles.section} id="como-usar">
        <div className={styles.sectionHeader}>
          <small>{content.sectionLabel}</small>
          <div>
            <h2>{content.sectionTitle}</h2>
            <p>{content.sectionCopy}</p>
          </div>
        </div>
        <div className={styles.steps}>
          {content.steps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>

        <div className={styles.materialStrip}>
          <div className={styles.materialCover} aria-hidden="true">
            <small>FLOWO · MATERIAL PRÁTICO</small>
            <strong>{content.materialTitle}</strong>
            <span>{content.materialSubtitle}</span>
          </div>
          <div className={styles.materialCopy}>
            <h3>Leve o resultado para a rotina da barbearia.</h3>
            <ul>
              {content.materialItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        </section>

        <section className={styles.formSection} id="material">
        <div className={styles.formCopy}>
          <small>PDF GRATUITO · ENTREGA IMEDIATA</small>
          <h2>{content.formTitle}</h2>
          <p>{content.formCopy}</p>
          <ul>
            {content.formNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
        <LeadMagnetForm config={content.formConfig} />
        </section>

        <section className={styles.faq} id="duvidas">
          <h2>Dúvidas antes de usar na sua barbearia.</h2>
          {content.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
