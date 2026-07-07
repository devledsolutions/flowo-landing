import type { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  title: string;
  breadcrumbLabel: string;
  path: string;
  /** Static, human-set date. Never derived from the build clock. */
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
}

/**
 * Shared shell for legal documents (termos, privacidade): one h1, a sticky
 * summary nav on desktop, numbered sections with anchor ids, monochrome
 * ink-on-cream typography with a 68ch measure.
 */
export function LegalPage({
  title,
  breadcrumbLabel,
  path,
  updatedAt,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream">
        <section className="section-normal pt-32 md:pt-36">
          <div className="container-page">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: breadcrumbLabel, href: path },
              ]}
            />

            <div className="mt-10 max-w-measure">
              <p className="text-caption text-muted-ink">
                Última atualização: {updatedAt}
              </p>
              <h1 className="mt-3 text-h2 font-semibold text-ink">{title}</h1>
              <p className="mt-5 text-lead text-muted-ink">{intro}</p>
            </div>

            <div className="mt-14 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
              <nav aria-label="Sumário" className="hidden lg:block">
                <div className="sticky top-28 border-l border-line pl-5">
                  <p className="text-caption font-medium text-muted-ink">
                    Sumário
                  </p>
                  <ol className="mt-4 space-y-2.5">
                    {sections.map((section, index) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block text-label leading-snug text-muted-ink transition-colors duration-150 ease-out-quint hover:text-ink"
                        >
                          <span className="tabular-nums">{index + 1}.</span>{" "}
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>

              <article className="max-w-measure text-body text-muted-ink [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul>li]:mt-2">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    aria-labelledby={section.id}
                    className="border-t border-line py-9 first:border-t-0 first:pt-0"
                  >
                    <h2
                      id={section.id}
                      className="scroll-mt-28 text-h3 font-semibold text-ink"
                    >
                      {index + 1}. {section.title}
                    </h2>
                    <div className="mt-4 space-y-4">{section.content}</div>
                  </section>
                ))}
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
