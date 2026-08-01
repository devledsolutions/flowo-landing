import Image from "next/image";
import type { ValidationCaseMedia } from "@/data/validation-cases";

interface ValidationProductMediaProps {
  media: ValidationCaseMedia;
  priority?: boolean;
  dark?: boolean;
  compact?: boolean;
}

export function ValidationProductMedia({
  media,
  priority = false,
  dark = false,
  compact = false,
}: ValidationProductMediaProps) {
  return (
    <figure
      className={`overflow-hidden rounded-xl ${
        dark ? "bg-[#11130d] text-[#f8f6f2]" : "bg-surface-2 text-ink"
      }`}
    >
      <div
        className={`relative flex items-start justify-center overflow-hidden px-5 pt-7 sm:px-8 sm:pt-9 ${
          compact ? "h-[28rem]" : "h-[34rem] sm:h-[38rem]"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-x-8 top-8 h-px ${
            dark ? "bg-white/15" : "bg-black/10"
          }`}
        />
        <div className="relative w-full max-w-[18rem] overflow-hidden rounded-[2.4rem] border-[9px] border-[#11130d] bg-[#f7f7f4] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          <Image
            src={media.src}
            alt={media.alt}
            width={1206}
            height={2622}
            sizes="(max-width: 640px) 72vw, 288px"
            priority={priority}
            className="h-auto w-full"
          />
        </div>
      </div>
      <figcaption
        className={`border-t px-6 py-5 sm:px-8 ${
          dark ? "border-white/15" : "border-line"
        }`}
      >
        <p className="font-semibold">{media.label}</p>
        <p
          className={`mt-2 text-label leading-relaxed ${
            dark ? "text-[#c8c8bd]" : "text-muted-ink"
          }`}
        >
          {media.caption}
        </p>
        <p
          className={`mt-3 text-[0.72rem] leading-relaxed ${
            dark ? "text-[#a9aa9f]" : "text-faint-ink"
          }`}
        >
          Interface da Flowo.
        </p>
      </figcaption>
    </figure>
  );
}
