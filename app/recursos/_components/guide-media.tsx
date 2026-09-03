import Image from "next/image";
import { Check } from "lucide-react";
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
  caption = "Conversa ilustrativa, com dados de teste",
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
  width = 1920,
  height = 1041,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
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
      className="mt-14 max-w-3xl border-y border-line py-8"
    >
      <h2
        id="guide-honesty-title"
        className="font-serif text-[1.5rem] font-medium leading-[1.2] tracking-[-0.015em] text-ink-strong"
      >
        Conferido no produto
      </h2>
      <ul className="mt-5 divide-y divide-line border-t border-line">
        {tested.map((item) => (
          <li key={item} className="flex items-baseline gap-3 py-3">
            <Check
              className="h-4 w-4 shrink-0 translate-y-0.5 text-ink"
              aria-hidden="true"
            />
            <span className="text-label leading-relaxed text-muted-ink">
              {item}
            </span>
          </li>
        ))}
      </ul>
      {notMeasured.length > 0 ? (
        <p className="mt-5 text-caption leading-relaxed text-faint-ink">
          <span className="font-medium">Ainda vamos publicar:</span>{" "}
          {notMeasured.join(" ")}
        </p>
      ) : null}
    </aside>
  );
}
