import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const paidMedia = fs.readFileSync(
  path.join(root, "providers/paid-media-provider.tsx"),
  "utf8"
);
const segment = fs.readFileSync(
  path.join(root, "providers/segment-provider.tsx"),
  "utf8"
);
const layout = fs.readFileSync(path.join(root, "app/layout.tsx"), "utf8");

const errors = [];
const requireMatch = (source, pattern, message) => {
  if (!pattern.test(source)) errors.push(message);
};

requireMatch(
  layout,
  /tiktokPixelId=\{process\.env\.NEXT_PUBLIC_TIKTOK_PIXEL_ID\}/,
  "O Pixel do TikTok não está ligado à configuração pública de produção."
);
requireMatch(
  paidMedia,
  /marketingAllowed\s*&&\s*tiktokPixelId/,
  "O carregamento do TikTok não está condicionado ao consentimento de marketing."
);
requireMatch(
  paidMedia,
  /window\.ttq\?\.revokeConsent\(\)/,
  "A retirada de consentimento não revoga o TikTok Pixel."
);
requireMatch(
  paidMedia,
  /removeTikTokCookies\(\)/,
  "A retirada de consentimento não limpa os identificadores do TikTok."
);
requireMatch(
  paidMedia,
  /isTikTokReady\s*&&\s*hasMarketingConsent\s*&&\s*window\.ttq/,
  "Os eventos do TikTok não possuem guarda de consentimento em tempo de execução."
);

requireMatch(
  segment,
  /"TikTok Pixel": false[\s\S]*"TikTok Conversions": false[\s\S]*"TikTok Conversions API": false/,
  "O bootstrap do Segment não bloqueia explicitamente os destinos de publicidade do TikTok."
);

if (/ttq|analytics\.tiktok|"TikTok[^\"]+": true/i.test(segment)) {
  errors.push(
    "O provider analítico do Segment não pode carregar ou controlar destinos de publicidade do TikTok."
  );
}

if (/Segment owns TikTok/i.test(paidMedia)) {
  errors.push(
    "O site ainda delega o TikTok ao Segment e mistura consentimento analítico com publicidade."
  );
}

// WebMCP usage counter: runs without consent, so it must stay anonymous.
const webmcpUsageRoute = fs.readFileSync(
  path.join(root, "app/api/webmcp-usage/route.ts"),
  "utf8"
);
if (/cookie/i.test(webmcpUsageRoute)) {
  errors.push("O contador de uso do WebMCP não pode ler cookies.");
}
const posthogServer = fs.readFileSync(
  path.join(root, "lib/observability/posthog-server.ts"),
  "utf8"
);
const usageCapture =
  posthogServer.match(/export async function captureLandingUsage[\s\S]*?\n}\n/)?.[0] ?? "";
if (!usageCapture) {
  errors.push("captureLandingUsage não foi encontrado.");
} else {
  if (!/disableGeoip:\s*true/.test(usageCapture)) {
    errors.push("captureLandingUsage precisa enviar disableGeoip: true.");
  }
  if (!/\$process_person_profile:\s*false/.test(usageCapture)) {
    errors.push("captureLandingUsage precisa enviar $process_person_profile: false.");
  }
}

const listFiles = (dir) => {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return [];
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(relative);
    return /\.(ts|tsx)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [relative] : [];
  });
};
for (const file of [...listFiles("lib/webmcp"), ...listFiles("components/webmcp")]) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  if (/window\.analytics|\bfbq\b|\bttq\b|\bgtag\b/.test(source)) {
    errors.push(`${file} não pode chamar ferramentas de análise ou publicidade diretamente.`);
  }
}

console.log(
  JSON.stringify(
    {
      contract: "analytics separado de advertising",
      segment: "analytics only",
      meta: "marketing consent",
      googleAds: "marketing consent",
      tiktok: "marketing consent",
      errors,
    },
    null,
    2
  )
);

if (errors.length > 0) process.exit(1);
