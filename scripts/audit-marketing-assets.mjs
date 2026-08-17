import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const materialsPath = path.join(root, "app/recursos/materiais/page.tsx");
const materialsSource = fs.readFileSync(materialsPath, "utf8");
const errors = [];
const warnings = [];

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

if (entries.length < 23) {
  errors.push(`Catálogo incompleto: somente ${entries.length} downloads encontrados.`);
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
}

const publicDownloads = path.join(root, "public/downloads");
const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });

for (const filePath of walk(publicDownloads)) {
  const relative = `/${path.relative(path.join(root, "public"), filePath)}`;
  if (/\.(pdf|xlsx|csv)$/i.test(filePath) && !urls.has(relative)) {
    warnings.push(`Arquivo público fora do catálogo: ${relative}`);
  }
}

const report = {
  downloads: entries.length + standaloneEntries.length,
  catalogDownloads: entries.length,
  standaloneDownloads: standaloneEntries.length,
  identifiedResources: ids.size,
  errors,
  warnings,
};

console.log(JSON.stringify(report, null, 2));
if (errors.length > 0) process.exit(1);
