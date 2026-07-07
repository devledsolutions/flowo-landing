import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface SuccessStoryLayoutProps {
  children: React.ReactNode;
  title: string;
  industry: string;
  result: string;
}

/**
 * Layout dos estudos de caso. Todos os casos publicados hoje são cenários
 * demonstrativos: o selo "Exemplo ilustrativo" e a nota abaixo do título são
 * obrigatórios enquanto não houver caso real auditável.
 */
export default function SuccessStoryLayout({
  children,
  title,
  industry,
  result,
}: SuccessStoryLayoutProps) {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pb-20 pt-28 md:pt-32">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-label font-medium text-muted-ink transition-colors duration-200 ease-out-quint hover:text-ink"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Voltar para a página inicial
            </Link>

            <header className="mt-10">
              <p className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-line bg-surface px-3.5 py-1 text-caption font-medium text-muted-ink">
                  Exemplo ilustrativo
                </span>
                <span className="text-label text-muted-ink">{industry}</span>
              </p>
              <h1 className="mt-5 text-h2 font-semibold leading-[1.1] text-ink-strong">
                {title}
              </h1>
              <p className="mt-5 font-serif text-h3 font-medium leading-snug tracking-[-0.008em] text-ink">
                {result}
              </p>
              <p
                role="note"
                className="mt-5 max-w-measure text-caption leading-relaxed text-muted-ink"
              >
                Cenário demonstrativo de como o Flowo funciona nesse tipo de
                operação. Não é um caso real de cliente nem promessa de
                resultado.
              </p>
            </header>

            <article className="mt-10 rounded-xl border border-line bg-surface p-6 md:p-10">
              {children}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
