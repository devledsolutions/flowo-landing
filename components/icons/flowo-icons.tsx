import { forwardRef, type SVGProps } from "react";
import symbols from "./flowo-symbols.json";

export type FlowoIconName = keyof typeof symbols;
export type FlowoIconProps = Omit<SVGProps<SVGSVGElement>, "name" | "ref"> & {
  name: FlowoIconName;
  size?: number | string;
  /** Line colour. Defaults to the surrounding text colour. */
  color?: string;
  /** Detail colour. Brand symbols default to Flowo pink; functional symbols follow `color`. */
  accentColor?: string;
  /** Keeps the visual stroke width constant when the icon is resized. */
  absoluteStrokeWidth?: boolean;
};

export const FLOWO_BRAND_ACCENT = "var(--brand-pink, #E75F91)";

/** Brand symbols carry a pink detail; actions and states keep their semantic colour. */
export function hasBrandAccent(name: FlowoIconName): boolean {
  return symbols[name].accentRole === "brand";
}

/** Original Flowo paths, shared verbatim with the native app. */
export const FlowoIcon = forwardRef<SVGSVGElement, FlowoIconProps>(function FlowoIcon(
  { name, size = 24, color = "currentColor", accentColor, strokeWidth = 1.75, absoluteStrokeWidth = false, ...props },
  ref,
) {
  const symbol = symbols[name];
  const accent = accentColor ?? (symbol.accentRole === "brand" ? FLOWO_BRAND_ACCENT : color);
  const width = absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth;
  const labelled = Boolean(props["aria-label"] || props["aria-labelledby"]);
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="-1 -1 26 26"
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      data-flowo-icon={name}
      {...props}
    >
      {symbol.paths.map((d, i) => <path key={`p${i}`} d={d} />)}
      {symbol.accent.map((d, i) => <path key={`a${i}`} d={d} stroke={accent} />)}
      {symbol.dots.map((d, i) => <path key={`d${i}`} d={d} fill={accent} stroke="none" />)}
    </svg>
  );
});

type IconProps = Omit<FlowoIconProps, "name">;
const icon = (name: FlowoIconName, displayName: string) => {
  const ProductIcon = forwardRef<SVGSVGElement, IconProps>(function ProductIcon(props, ref) {
    return <FlowoIcon ref={ref} name={name} {...props} />;
  });
  ProductIcon.displayName = displayName;
  return ProductIcon;
};
export const ArrowRight = icon("arrow-right", "ArrowRight");
export const Check = icon("check", "Check");
export const CalendarDays = icon("calendar-days", "CalendarDays");
export const MessageCircle = icon("message-circle", "MessageCircle");
export const ShieldCheck = icon("shield-check", "ShieldCheck");
export const Banknote = icon("banknote", "Banknote");
export const Smartphone = icon("smartphone", "Smartphone");
export const CreditCard = icon("credit-card", "CreditCard");
export const Users = icon("customers", "Users");
export const BadgePercent = icon("percent", "BadgePercent");
export const ReceiptText = icon("receipt", "ReceiptText");
export const CheckCircle2 = icon("check-circle", "CheckCircle2");
export const CalendarCheck2 = icon("agenda", "CalendarCheck2");
export const MessageCircleMore = icon("message-text", "MessageCircleMore");
