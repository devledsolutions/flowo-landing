import { PUBLIC_ENVIRONMENT } from "@/lib/environment";

export function getSiteUrl(): string {
  return PUBLIC_ENVIRONMENT.siteOrigin;
}
