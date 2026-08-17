const CANONICAL_ORIGIN = "https://www.flowo.com.br";
const base = (process.argv[2] || process.env.SEO_AUDIT_BASE_URL || CANONICAL_ORIGIN)
  .replace(/\/$/, "");

const errors = [];
const warnings = [];

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [
      match[1],
      decodeHtml(match[2]),
    ]),
  );
}

function findMeta(html, key, value) {
  for (const match of html.matchAll(/<meta\s+[^>]*>/g)) {
    const attrs = attributes(match[0]);
    if (attrs[key] === value) return attrs.content;
  }
  return undefined;
}

function findLink(html, rel) {
  for (const match of html.matchAll(/<link\s+[^>]*>/g)) {
    const attrs = attributes(match[0]);
    if (attrs.rel === rel) return attrs.href;
  }
  return undefined;
}

function localUrl(url) {
  const parsed = new URL(url, CANONICAL_ORIGIN);
  return `${base}${parsed.pathname}${parsed.search}`;
}

function normalizedCanonical(url) {
  return url === `${CANONICAL_ORIGIN}/` ? CANONICAL_ORIGIN : url.replace(/\/$/, "");
}

async function fetchText(url, label) {
  const response = await fetch(url, {
    headers: { "user-agent": "Flowo SEO Audit/1.0" },
    redirect: "manual",
  });
  if (response.status !== 200) {
    errors.push(`${label}: HTTP ${response.status}`);
    return "";
  }
  return response.text();
}

const sitemap = await fetchText(`${base}/sitemap.xml`, "sitemap.xml");
const canonicalUrls = [
  ...sitemap.matchAll(/<loc>(https:\/\/www\.flowo\.com\.br[^<]*)<\/loc>/g),
].map((match) => decodeHtml(match[1]));

if (canonicalUrls.length === 0) {
  errors.push("sitemap.xml: nenhuma URL canônica encontrada");
}

const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();
const socialImages = new Set();

for (const canonicalUrl of canonicalUrls) {
  const pathname = new URL(canonicalUrl).pathname;
  const html = await fetchText(localUrl(canonicalUrl), pathname);
  if (!html) continue;

  const title = decodeHtml(html.match(/<title>([^<]*)<\/title>/)?.[1] || "");
  const description = findMeta(html, "name", "description") || "";
  const canonical = findLink(html, "canonical");
  const robots = findMeta(html, "name", "robots") || "";
  const ogTitle = findMeta(html, "property", "og:title");
  const ogDescription = findMeta(html, "property", "og:description");
  const ogUrl = findMeta(html, "property", "og:url");
  const ogImage = findMeta(html, "property", "og:image");
  const twitterCard = findMeta(html, "name", "twitter:card");
  const twitterTitle = findMeta(html, "name", "twitter:title");
  const twitterDescription = findMeta(html, "name", "twitter:description");
  const twitterImage = findMeta(html, "name", "twitter:image");
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  const jsonLdBlocks = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ];

  if (!html.includes('<html lang="pt-BR"')) errors.push(`${pathname}: lang pt-BR ausente`);
  if (!/<main[^>]*id="main-content"/.test(html)) {
    errors.push(`${pathname}: destino #main-content ausente no HTML inicial`);
  }
  if (h1Count !== 1) errors.push(`${pathname}: esperado 1 H1, encontrado ${h1Count}`);
  if (!title) errors.push(`${pathname}: title ausente`);
  if (!description) errors.push(`${pathname}: meta description ausente`);
  if (normalizedCanonical(canonical || "") !== normalizedCanonical(canonicalUrl)) {
    errors.push(`${pathname}: canonical '${canonical || "ausente"}' não corresponde a '${canonicalUrl}'`);
  }
  if (/noindex/i.test(robots)) errors.push(`${pathname}: URL do sitemap contém noindex`);
  if (
    !ogTitle ||
    !ogDescription ||
    normalizedCanonical(ogUrl || "") !== normalizedCanonical(canonicalUrl) ||
    !ogImage
  ) {
    errors.push(`${pathname}: conjunto Open Graph incompleto ou og:url incorreto`);
  }
  if (!twitterCard || !twitterTitle || !twitterDescription || !twitterImage) {
    errors.push(`${pathname}: conjunto Twitter Card incompleto`);
  }

  if (title.length < 25 || title.length > 65) {
    warnings.push(`${pathname}: title com ${title.length} caracteres`);
  }
  if (description.length < 70 || description.length > 180) {
    warnings.push(`${pathname}: description com ${description.length} caracteres`);
  }

  if (titles.has(title)) {
    errors.push(`${pathname}: title duplicado com ${titles.get(title)}`);
  } else {
    titles.set(title, pathname);
  }
  if (descriptions.has(description)) {
    errors.push(`${pathname}: description duplicada com ${descriptions.get(description)}`);
  } else {
    descriptions.set(description, pathname);
  }

  for (const [index, match] of jsonLdBlocks.entries()) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${pathname}: JSON-LD ${index + 1} inválido (${error.message})`);
    }
  }

  for (const anchor of html.matchAll(/<a\s+[^>]*>/g)) {
    const href = attributes(anchor[0]).href;
    if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/.test(href)) continue;
    const url = new URL(href, canonicalUrl);
    if (url.origin === CANONICAL_ORIGIN) {
      // Cloudflare Email Address Obfuscation rewrites mailto links after the
      // application response. The managed route only works with its hash and
      // is not an internal page that should be crawled or checked with HEAD.
      if (url.pathname === "/cdn-cgi/l/email-protection") continue;
      url.hash = "";
      internalLinks.add(url.toString());
    }
  }

  if (ogImage) socialImages.add(ogImage);
  if (twitterImage) socialImages.add(twitterImage);
}

for (const url of internalLinks) {
  const response = await fetch(localUrl(url), {
    method: "HEAD",
    redirect: "manual",
    headers: { "user-agent": "Flowo SEO Audit/1.0" },
  });
  if (response.status >= 400) {
    errors.push(`link interno quebrado: ${url} (HTTP ${response.status})`);
  }
}

for (const url of socialImages) {
  const response = await fetch(localUrl(url), {
    method: "HEAD",
    redirect: "manual",
    headers: { "user-agent": "Flowo SEO Audit/1.0" },
  });
  if (response.status !== 200) {
    errors.push(`imagem social indisponível: ${url} (HTTP ${response.status})`);
  }
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    errors.push(`imagem social com Content-Type incorreto: ${url} (${contentType || "ausente"})`);
  }
}

console.log(`SEO audit: ${canonicalUrls.length} páginas, ${internalLinks.size} links internos, ${socialImages.size} imagens sociais.`);
for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`ERRO ${error}`);

if (errors.length > 0) {
  console.error(`Falha: ${errors.length} erro(s), ${warnings.length} aviso(s).`);
  process.exit(1);
}

console.log(`Aprovado: 0 erros, ${warnings.length} aviso(s).`);
