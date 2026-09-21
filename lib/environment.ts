export type FlowoDeploymentEnvironment = "development" | "qa" | "production";

type PublicEnvironmentInput = {
  appUrl?: string;
  consentCookieName?: string;
  cookieDomain?: string;
  deploymentEnvironment?: string;
  siteUrl?: string;
  whatsappNumber?: string;
};

const COOKIE_NAME_PATTERN = /^[A-Za-z0-9_-]+$/;
const COOKIE_DOMAIN_PATTERN = /^\.[A-Za-z0-9.-]+$/;

function isLoopbackHostname(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]"
  );
}

function exactOrigin(value: string | undefined, name: string): string {
  if (!value?.trim()) throw new Error(`${name} is required`);

  let parsed: URL;
  try {
    parsed = new URL(value.trim());
  } catch {
    throw new Error(`${name} must be an absolute HTTP(S) origin`);
  }

  const localHttp =
    parsed.protocol === "http:" && isLoopbackHostname(parsed.hostname);
  if (parsed.protocol !== "https:" && !localHttp) {
    throw new Error(`${name} must use HTTPS outside local development`);
  }
  if (
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash
  ) {
    throw new Error(`${name} must be an exact origin without path or credentials`);
  }
  return parsed.origin;
}

export function createPublicEnvironment(input: PublicEnvironmentInput) {
  const deploymentEnvironment = input.deploymentEnvironment?.trim();
  if (
    deploymentEnvironment !== "development" &&
    deploymentEnvironment !== "qa" &&
    deploymentEnvironment !== "production"
  ) {
    throw new Error(
      "NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT must be development, qa, or production",
    );
  }

  const siteOrigin = exactOrigin(input.siteUrl, "NEXT_PUBLIC_SITE_URL");
  const appOrigin = exactOrigin(input.appUrl, "NEXT_PUBLIC_APP_URL");
  if (siteOrigin === appOrigin) {
    throw new Error("NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_APP_URL must differ");
  }
  if (deploymentEnvironment !== "development") {
    for (const [name, origin] of [
      ["NEXT_PUBLIC_SITE_URL", siteOrigin],
      ["NEXT_PUBLIC_APP_URL", appOrigin],
    ] as const) {
      const parsed = new URL(origin);
      if (isLoopbackHostname(parsed.hostname) || parsed.port) {
        throw new Error(`${name} must be a hosted HTTPS origin`);
      }
    }
  }

  const whatsappNumber = input.whatsappNumber?.replace(/\D/g, "");
  if (!whatsappNumber || !/^55\d{10,11}$/.test(whatsappNumber)) {
    throw new Error(
      "NEXT_PUBLIC_WHATSAPP_NUMBER must be an explicit Brazilian E.164 number",
    );
  }

  const consentCookieName = input.consentCookieName?.trim();
  if (!consentCookieName || !COOKIE_NAME_PATTERN.test(consentCookieName)) {
    throw new Error(
      "NEXT_PUBLIC_CONSENT_COOKIE_NAME must be an explicit safe cookie name",
    );
  }

  const configuredCookieDomain = input.cookieDomain?.trim();
  if (!configuredCookieDomain) {
    throw new Error("NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN is required");
  }
  if (
    configuredCookieDomain !== "host-only" &&
    !COOKIE_DOMAIN_PATTERN.test(configuredCookieDomain)
  ) {
    throw new Error(
      "NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN must be host-only or an explicit domain",
    );
  }
  if (deploymentEnvironment === "qa" && configuredCookieDomain !== "host-only") {
    throw new Error("QA consent and analytics cookies must remain host-only");
  }
  if (
    deploymentEnvironment === "production" &&
    configuredCookieDomain !== ".flowo.com.br"
  ) {
    throw new Error("Production cookie domain must be .flowo.com.br");
  }

  return {
    appHostname: new URL(appOrigin).hostname,
    appOrigin,
    consentCookieDateName: `${consentCookieName}Date`,
    consentCookieName,
    cookieDomain:
      configuredCookieDomain === "host-only"
        ? undefined
        : configuredCookieDomain,
    deploymentEnvironment: deploymentEnvironment as FlowoDeploymentEnvironment,
    isPublicProduction: deploymentEnvironment === "production",
    siteOrigin,
    whatsappNumber,
  } as const;
}

export const PUBLIC_ENVIRONMENT = createPublicEnvironment({
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  consentCookieName: process.env.NEXT_PUBLIC_CONSENT_COOKIE_NAME,
  cookieDomain: process.env.NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN,
  deploymentEnvironment: process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
});

export function cookieDomainAttribute(): string {
  return PUBLIC_ENVIRONMENT.cookieDomain
    ? `; Domain=${PUBLIC_ENVIRONMENT.cookieDomain}`
    : "";
}

export function environmentSiteUrl(value?: string): string {
  if (!value) return PUBLIC_ENVIRONMENT.siteOrigin;
  try {
    const url = new URL(value, `${PUBLIC_ENVIRONMENT.siteOrigin}/`);
    return url.origin === PUBLIC_ENVIRONMENT.siteOrigin
      ? url.toString()
      : PUBLIC_ENVIRONMENT.siteOrigin;
  } catch {
    return PUBLIC_ENVIRONMENT.siteOrigin;
  }
}
