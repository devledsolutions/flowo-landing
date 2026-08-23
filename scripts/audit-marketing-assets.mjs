import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const root = process.cwd();
const materialsPath = path.join(root, "data/resource-materials.ts");
const materialsSource = fs.readFileSync(materialsPath, "utf8");
const errors = [];
const warnings = [];
const compatibilityExports = [];
const bannedWorkbookClaims = [
  /R\$\s*197\b/i,
  /teste gr[áa]tis/i,
  /janeiro\/?2025/i,
  /custa\s+(?:de\s+)?5\s*[–-]\s*7x/i,
];
const formulaRequired = new Set([
  "/downloads/lead-magnets/calculadora-ticket-medio.xlsx",
  "/downloads/lead-magnets/fluxo-caixa-semanal-barbearia.xlsx",
  "/downloads/lead-magnets/planilha-combos-ticket-medio.xlsx",
  "/downloads/lead-magnets/plano-metas-faturamento.xlsx",
]);

const entryPattern = /downloadUrl:\s*"([^"]+)"([\s\S]*?)(?=\n\s*},)/g;
const entries = [...materialsSource.matchAll(entryPattern)].map((match) => ({
  downloadUrl: match[1],
  requestedResource:
    match[2].match(/requestedResource:\s*"([^"]+)"/)?.[1],
}));

const standaloneEntries = [
  {
    downloadUrl: "/downloads/raio-x-da-agenda-flowo.pdf",
    requestedResource: "raio_x_agenda",
    source: "components/marketing/lead-magnet-form.tsx",
  },
];

if (entries.length !== 23) {
  errors.push(`Catálogo deve ter 23 downloads; foram encontrados ${entries.length}.`);
}

const ids = new Set();
const urls = new Set();
for (const entry of [...entries, ...standaloneEntries]) {
  if (!entry.requestedResource) {
    errors.push(`requestedResource ausente para ${entry.downloadUrl}`);
  } else if (ids.has(entry.requestedResource)) {
    errors.push(`requestedResource duplicado: ${entry.requestedResource}`);
  } else {
    ids.add(entry.requestedResource);
  }

  if (urls.has(entry.downloadUrl)) {
    errors.push(`Download duplicado no catálogo: ${entry.downloadUrl}`);
  }
  urls.add(entry.downloadUrl);

  if (entry.downloadUrl.endsWith(".csv")) {
    errors.push(
      `Catálogo premium não deve apontar para CSV cru: ${entry.downloadUrl}`,
    );
  }

  if (entry.source) {
    const source = fs.readFileSync(path.join(root, entry.source), "utf8");
    if (!source.includes(entry.downloadUrl)) {
      errors.push(
        `Material independente sem referência em ${entry.source}: ${entry.downloadUrl}`,
      );
    }
  }

  const filePath = path.join(root, "public", entry.downloadUrl.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    errors.push(`Arquivo ausente: ${entry.downloadUrl}`);
    continue;
  }
  if (fs.statSync(filePath).size === 0) {
    errors.push(`Arquivo vazio: ${entry.downloadUrl}`);
  }

  if (entry.downloadUrl.endsWith(".xlsx")) {
    const workbook = XLSX.readFile(filePath, { cellFormula: true });
    if (workbook.SheetNames.length === 0) {
      errors.push(`Planilha sem abas: ${entry.downloadUrl}`);
      continue;
    }

    const cells = workbook.SheetNames.flatMap((sheetName) =>
      Object.entries(workbook.Sheets[sheetName]).filter(
        ([address]) => !address.startsWith("!"),
      ),
    );
    const searchableText = cells
      .map(([, cell]) => String(cell.v ?? ""))
      .join("\n");
    for (const claim of bannedWorkbookClaims) {
      if (claim.test(searchableText)) {
        errors.push(
          `Planilha contém claim comercial obsoleto (${claim}): ${entry.downloadUrl}`,
        );
      }
    }

    if (
      formulaRequired.has(entry.downloadUrl) &&
      !cells.some(([, cell]) => typeof cell.f === "string" && cell.f.length > 0)
    ) {
      errors.push(`Planilha anunciada como cálculo não possui fórmulas: ${entry.downloadUrl}`);
    }

    if (entry.downloadUrl.includes("roteiros-shorts-reels-30-dias")) {
      const hasThirtyScripts = workbook.SheetNames.some((sheetName) => {
        const range = XLSX.utils.decode_range(
          workbook.Sheets[sheetName]["!ref"] ?? "A1:A1",
        );
        return range.e.r - range.s.r >= 30;
      });
      if (!hasThirtyScripts) {
        errors.push(`Material promete 30 roteiros, mas nenhuma aba contém 30 linhas: ${entry.downloadUrl}`);
      }
    }
  }
}

const publicDownloads = path.join(root, "public/downloads");
const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });

for (const filePath of walk(publicDownloads)) {
  const relative = `/${path.relative(path.join(root, "public"), filePath)}`;
  if (filePath.endsWith(".csv")) {
    const xlsxEquivalent = filePath.replace(/\.csv$/i, ".xlsx");
    if (fs.existsSync(xlsxEquivalent) && urls.has(relative.replace(/\.csv$/i, ".xlsx"))) {
      compatibilityExports.push(relative);
      continue;
    }
  }
  if (/\.(pdf|xlsx|csv)$/i.test(filePath) && !urls.has(relative)) {
    warnings.push(`Arquivo público fora do catálogo: ${relative}`);
  }
}

const report = {
  downloads: entries.length + standaloneEntries.length,
  catalogDownloads: entries.length,
  standaloneDownloads: standaloneEntries.length,
  identifiedResources: ids.size,
  compatibilityExports: compatibilityExports.length,
  errors,
  warnings,
};

console.log(JSON.stringify(report, null, 2));
if (errors.length > 0) process.exit(1);
