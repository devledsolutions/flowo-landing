import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A real screenshot in a phone-shaped frame, cropped from the top so the
 * screen's own header stays visible. One frame for every phone on the page,
 * so the radius, edge and shadow cannot drift between the hero and the close.
 */
export function PhoneFrame({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  /** Sets the visible height; the screenshot is cropped from the top. */
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] border border-ink/25 bg-surface shadow-[0_36px_80px_-44px_oklch(0.08_0.01_110/0.9)]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="w-full object-cover object-top"
      />
    </div>
  );
}
