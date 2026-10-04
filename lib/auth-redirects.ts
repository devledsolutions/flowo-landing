/**
 * Clerk resolves its sign-in and sign-up paths against the marketing domain
 * (flowo.com.br), while the product runs on the app origin. These redirects
 * send anyone who lands on the marketing domain's auth paths to the app's own
 * pt-BR pages, keeping the query string (Next.js forwards it automatically).
 */
export type AuthRedirect = {
  source: string;
  destination: string;
  permanent: false;
};

export function authRedirects(appUrl: string | undefined): AuthRedirect[] {
  const raw = appUrl?.trim();
  if (!raw) return [];

  let origin: string;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
      return [];
    }
    origin = parsed.origin;
  } catch {
    return [];
  }

  return ["sign-in", "sign-up"].flatMap((path) => [
    { source: `/${path}`, destination: `${origin}/${path}`, permanent: false },
    {
      source: `/${path}/:rest*`,
      destination: `${origin}/${path}/:rest*`,
      permanent: false,
    },
  ]);
}
