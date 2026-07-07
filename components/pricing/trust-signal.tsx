import { type LucideIcon } from "lucide-react";

interface TrustSignalProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function TrustSignal({ icon: Icon, title, description }: TrustSignalProps) {
  return (
    <div className="border-t border-line pt-5">
      <Icon className="h-5 w-5 text-ink" aria-hidden />
      <h3 className="mt-3 text-label text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted-ink">{description}</p>
    </div>
  );
}
