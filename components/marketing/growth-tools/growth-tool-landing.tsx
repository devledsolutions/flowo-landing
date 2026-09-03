import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import Footer from "@/components/footer";
import {
  LeadMagnetForm,
  type LeadMagnetConfig,
} from "@/components/marketing/lead-magnet-form";
import styles from "./growth-tool-landing.module.css";

export type GrowthToolKind =
  | "time"
  | "commission"
  | "return"
  | "money"
  | "occupancy"
  | "plan"
  | "diagnostic";

type GrowthToolContent = {
  kind: GrowthToolKind;
  campaign?: boolean;
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
  const materialFormat = content.formConfig.resourceFormat ?? "PDF";
  const isCampaign = content.campaign === true;

  return (
    <div
      className={styles.page}
      data-tool={content.kind}
      data-campaign={isCampaign ? "true" : undefined}
    >
      <header className={styles.navWrap}>
        <div className={styles.nav}>
          {isCampaign ? (
            <a href="#ferramenta" aria-label="Voltar ao início da oferta">
              <Image
                className={styles.logo}
                src="/flowo-logo.svg"
                alt="Flowo"
                width={152}
                height={75}
                priority
              />
            </a>
          ) : (
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
          )}
          {isCampaign ? (
            <p className={styles.campaignLabel}>
              {materialFormat} gratuito · Flowo
            </p>
          ) : null}
          {!isCampaign ? (
            <nav className={styles.navLinks} aria-label="Nesta página">
              <a href="#ferramenta">Ferramenta</a>
              <a href="#como-usar">Como usar</a>
              <a href="#duvidas">Dúvidas</a>
            </nav>
          ) : null}
          <a
            className={styles.navCta}
            data-lead-magnet-cta="true"
            href={isCampaign ? "#calculadora" : "#material"}
          >
            {isCampaign ? "Começar agora" : content.navCta}
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
              {isCampaign ? "Começar sem cadastro" : "Usar a ferramenta gratuita"}
            </a>
            <span>{isCampaign ? "Grátis · resultado na tela" : "Resultado na tela · sem cadastro"}</span>
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

        {isCampaign ? (
          <section className={styles.campaignProof} aria-labelledby="campaign-proof-title">
            <div className={styles.campaignProofHeader}>
              <small>COMO FUNCIONA ESTA OFERTA</small>
              <h2 id="campaign-proof-title">Uma página. Uma decisão. Um próximo passo possível.</h2>
              <p>
                Você começa pela rotina real, vê o resultado explicado e decide se quer levar o material para a equipe.
              </p>
            </div>
            <div className={styles.campaignProofGrid}>
              <article className={styles.campaignProofCard}>
                <span>01</span>
                <h3>Use sem preencher formulário</h3>
                <p>O resultado aparece na tela. Seus dados só entram se você escolher receber o material.</p>
              </article>
              <article className={styles.campaignProofCard}>
                <span>02</span>
                <h3>Leve uma referência prática</h3>
                <p>Checklist, painel ou guia em linguagem de barbearia, sem teoria que fica na gaveta.</p>
              </article>
              <article className={styles.campaignProofCard}>
                <span>03</span>
                <h3>Continue só se fizer sentido</h3>
                <p>A Flowo aparece como próximo passo opcional, depois que você entende a própria rotina.</p>
              </article>
            </div>
          </section>
        ) : null}

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

        {isCampaign ? (
          <section
            className={styles.trialSection}
            id="avaliacao-assistida"
            aria-labelledby="trial-title"
          >
            <div className={styles.trialIntro}>
              <p>SE QUISER IR ALÉM DO MATERIAL</p>
              <h2 id="trial-title">Veja a Flowo na rotina antes de decidir.</h2>
            </div>
            <div className={styles.trialBody}>
              <p>
                Depois de usar o material, barbearias elegíveis dos planos Solo
                ou Equipe podem solicitar uma avaliação assistida de 14 dias.
                A equipe ajuda na configuração inicial e confirma se o período
                faz sentido para a sua operação.
              </p>
              <ul>
                <li>Concessão manual, após uma conversa com a equipe.</li>
                <li>Sem cartão, renovação ou cobrança automática.</li>
                <li>Você decide se quer seguir depois da avaliação.</li>
              </ul>
              <a
                className={styles.trialCta}
                data-lead-magnet-cta="true"
                href="#material"
              >
                Receber o material e indicar meu interesse
              </a>
            </div>
          </section>
        ) : null}

        <section className={styles.formSection} id="material">
        <div className={styles.formCopy}>
          <small>{materialFormat} GRATUITO · ENTREGA IMEDIATA</small>
          <h2>{content.formTitle}</h2>
          <p>{content.formCopy}</p>
          {isCampaign ? (
            <p className={styles.formBrandNote}>
              Material da Flowo, feito para aplicar na rotina, e não só salvar
              no celular.
            </p>
          ) : null}
          <ul>
            {content.formNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
        <LeadMagnetForm
          config={
            isCampaign
              ? { ...content.formConfig, showTrialInterest: true }
              : content.formConfig
          }
        />
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
      {isCampaign ? <CampaignFooter /> : <Footer />}
      {isCampaign ? (
        <div className={styles.mobileCta}>
          <a href="#material" aria-label="Receber material gratuito da Flowo">
            Receber material gratuito
          </a>
        </div>
      ) : null}
    </div>
  );
}

function CampaignFooter() {
  return (
    <footer className={styles.campaignFooter}>
      <div>
        <span>Flowo · uma operação da Devled Tecnologia e Consultoria LTDA</span>
        <nav aria-label="Informações legais">
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos</Link>
          <CookiePreferencesButton />
        </nav>
      </div>
    </footer>
  );
}
