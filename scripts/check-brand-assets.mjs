import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const currentFile = fileURLToPath(import.meta.url);
const retiredAssets = [
  "public/logo.png",
  "public/logo.svg",
  "public/logo-2.svg",
];
const sourceRoots = [
  "app",
  "components",
  "lib",
  "remotion",
  "scripts",
  "next.config.ts",
];
const searchableExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
]);
const retiredReferences = [
  /(?:https:\/\/www\.flowo\.com\.br)?\/logo\.png\b/g,
  /(?:https:\/\/www\.flowo\.com\.br)?\/logo\.svg\b/g,
  /(?:https:\/\/www\.flowo\.com\.br)?\/logo-2\.svg\b/g,
];

function collectFiles(path) {
  if (!existsSync(path)) {
    return [];
  }

  if (!statSync(path).isDirectory()) {
    return [path];
  }

  return readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
    collectFiles(join(path, entry.name)),
  );
}

const failures = [];

for (const asset of retiredAssets) {
  if (existsSync(join(root, asset))) {
    failures.push(`asset aposentado ainda existe: ${asset}`);
  }
}

for (const sourceRoot of sourceRoots) {
  for (const file of collectFiles(join(root, sourceRoot))) {
    if (file === currentFile) {
      continue;
    }

    if (!searchableExtensions.has(extname(file))) {
      continue;
    }

    const content = readFileSync(file, "utf8");
    for (const pattern of retiredReferences) {
      pattern.lastIndex = 0;
      if (pattern.test(content)) {
        failures.push(
          `referência ao logo aposentado em ${relative(root, file)}: ${pattern.source}`,
        );
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Falha na identidade visual da Flowo:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Identidade visual validada: somente o logo canônico está ativo.");
