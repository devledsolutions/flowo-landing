import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhoneFrame } from "@/components/home/phone-frame";
import { ProductDisclaimer } from "@/components/home/product-previews";
import { StoreBadges } from "@/components/store-badges";

export default function AppBand() {
  return (
    <section
      id="app-para-a-equipe"
      aria-labelledby="app-band-title"
      className="section-normal border-y border-line bg-surface-2"
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <p className="text-label font-semibold uppercase tracking-[0.12em] text-faint-ink">
            App para a equipe
          </p>
          <h2
            id="app-band-title"
            className="mt-4 max-w-[18ch] text-h2 font-semibold tracking-[-0.025em] text-ink-strong"
          >
            A agenda também no celular do barbeiro.
          </h2>
          <p className="mt-5 max-w-measure text-lead text-muted-ink">
            Agenda, comandas e conversas no app da Flowo, com a mesma conta do painel. Cada barbeiro vê só o
            que é dele. O cliente não precisa baixar nada.
          </p>
          <StoreBadges page="/" placement="home_app_band" className="mt-8" />
          <Link
            href="/aplicativo-para-barbeiros"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-label font-semibold text-ink"
          >
            Conhecer o app
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div>
          <PhoneFrame
            src="/images/product/app-agenda.png"
            alt="Agenda do app da Flowo: a semana, os barbeiros e os horários livres de cada um."
            width={720}
            height={1564}
            sizes="(min-width: 1024px) 18rem, 60vw"
            className="mx-auto h-[30rem] w-[60%] max-w-[18rem] border-ink/30"
          />
          <ProductDisclaimer label="Tela do app com dados ilustrativos" className="mt-6 justify-center" />
        </div>
      </div>
    </section>
  );
}
