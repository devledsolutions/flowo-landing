import Image from "next/image";
import { PhoneFrame } from "@/components/home/phone-frame";
import { WhatsAppChat, type ChatMessage } from "@/components/home/whatsapp-chat";
import { ProductDisclaimer } from "@/components/home/product-previews";

/**
 * Media blocks shared by the guias em /recursos/guias/*. The guide shell
 * (components/resources/guide-shell.tsx) owns text patterns; this file owns
 * the three ways a guide shows the product: a WhatsApp conversation inside a
 * phone, a dashboard screenshot, and an app screen inside a phone. Plus the
 * single honesty block every guide ends with.
 */

export function GuideWhatsApp({
  messages,
  logicalHeight = 844,
  caption = "Conversa ilustrativa, com o fluxo testado em produção",
}: {
  messages: ChatMessage[];
  logicalHeight?: number;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="mx-auto w-[340px] max-w-full sm:hidden">
        <PhoneFrame className="border-ink/30">
          <WhatsAppChat width={340} logicalHeight={logicalHeight} messages={messages} />
        </PhoneFrame>
      </div>
      <div className="mx-auto hidden w-[384px] max-w-full sm:block">
        <PhoneFrame className="border-ink/30">
          <WhatsAppChat width={384} logicalHeight={logicalHeight} messages={messages} />
        </PhoneFrame>
      </div>
      <figcaption className="mt-4 flex justify-center">
        <ProductDisclaimer label={caption} />
      </figcaption>
    </figure>
  );
}

export function GuideScreenshot({
  src,
  alt,
  caption = "Tela do app com dados ilustrativos",
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1041}
        sizes="(min-width: 1024px) 720px, 100vw"
        className="w-full rounded-xl border border-line bg-surface shadow-[0_24px_48px_-24px_rgba(23,24,16,0.35)]"
      />
      <figcaption className="mt-3">
        <ProductDisclaimer label={caption} />
      </figcaption>
    </figure>
  );
}

export function GuideAppScreen({
  src,
  alt,
  caption = "Tela do app com dados ilustrativos",
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="mx-auto w-[300px] max-w-full">
        <PhoneFrame src={src} alt={alt} width={720} height={1564} sizes="300px" className="border-ink/30" />
      </div>
      <figcaption className="mt-4 flex justify-center">
        <ProductDisclaimer label={caption} />
      </figcaption>
    </figure>
  );
}

export function GuideHonesty({
  tested,
  notMeasured,
}: {
  tested: string[];
  notMeasured: string[];
}) {
  return (
    <aside
      aria-labelledby="guide-honesty-title"
      className="mt-14 max-w-3xl rounded-lg border border-line bg-surface p-6 sm:p-8"
    >
      <h2 id="guide-honesty-title" className="text-h3 font-bold text-ink">
        O que foi testado e o que ainda não medimos
      </h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-caption font-medium uppercase tracking-[0.08em] text-faint-ink">Testado</p>
          <ul className="mt-2 space-y-2 text-label leading-relaxed text-muted-ink">
            {tested.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-caption font-medium uppercase tracking-[0.08em] text-faint-ink">Ainda não medimos</p>
          <ul className="mt-2 space-y-2 text-label leading-relaxed text-muted-ink">
            {notMeasured.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
