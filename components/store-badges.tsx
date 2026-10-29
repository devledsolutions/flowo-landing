import Image from "next/image";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { cn } from "@/lib/utils";

export const APP_STORE_URL = "https://apps.apple.com/br/app/flowo/id6795006925";
export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=app.flowo.mobile";

/**
 * The official App Store and Google Play badges, at the same visible height.
 * The Google artwork was trimmed of its transparent padding so both line up.
 */
export function StoreBadges({
  page,
  placement,
  size = "default",
  className,
}: {
  page: string;
  placement: string;
  size?: "default" | "small";
  className?: string;
}) {
  const height = size === "small" ? "h-10" : "h-12";
  const stores = [
    {
      store: "app_store",
      href: APP_STORE_URL,
      label: "Baixar o app da Flowo na App Store",
      src: "/images/app-store-badge-pt-br.svg",
      width: 120,
      height: 40,
    },
    {
      store: "google_play",
      href: GOOGLE_PLAY_URL,
      label: "Baixar o app da Flowo no Google Play",
      src: "/images/google-play-badge-pt-br.png",
      width: 646,
      height: 192,
    },
  ] as const;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {stores.map((item) => (
        <TrackedLink
          key={item.store}
          href={item.href}
          event="CTA Clicked"
          properties={{ page, placement, destination: item.store, intent: "app_download" }}
          aria-label={item.label}
          className="inline-flex rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        >
          <Image
            src={item.src}
            alt=""
            width={item.width}
            height={item.height}
            className={cn(height, "w-auto")}
          />
        </TrackedLink>
      ))}
    </div>
  );
}
