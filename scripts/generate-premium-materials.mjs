import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOWNLOADS = path.join(ROOT, "public", "downloads");
const LEAD_MAGNETS = path.join(DOWNLOADS, "lead-magnets");

const COLORS = {
  cream: "F4F0E5",
  paper: "FBF9F3",
  ink: "171810",
  muted: "6D6A61",
  line: "D9D3C6",
  accent: "C52663",
  input: "F8E9EF",
  inputInk: "7A173F",
  success: "1F7A50",
  successSoft: "E7F3EC",
  warning: "A45D13",
  warningSoft: "FAEEDB",
  danger: "A23030",
  dangerSoft: "F8E5E5",
  white: "FFFFFF",
};

const DISCLAIMER =
  "Material educativo. Adapte à realidade da sua barbearia e valide decisões contábeis, fiscais, trabalhistas e jurídicas com profissionais habilitados.";
const WHATSAPP_NOTICE =
  "Mande ofertas somente para quem autorizou esse tipo de contato. Se a pessoa responder SAIR ou PARAR, interrompa as divulgações. CANCELAR trata apenas do agendamento informado.";

const GENERATED_WORKBOOKS = [];

function excelDate(year, monthIndex, day) {
  return Math.floor(Date.UTC(year, monthIndex, day) / 86_400_000) + 25_569;
}

fs.mkdirSync(LEAD_MAGNETS, { recursive: true });

function cellStyle({ fill, color = COLORS.ink, bold = false, size = 11, align = "left", border = false } = {}) {
  return {
    font: { name: "Arial", sz: size, bold, color: { rgb: color } },
    fill: fill ? { patternType: "solid", fgColor: { rgb: fill } } : undefined,
    alignment: { vertical: "center", horizontal: align, wrapText: true },
    border: border
      ? {
          top: { style: "thin", color: { rgb: COLORS.line } },
          bottom: { style: "thin", color: { rgb: COLORS.line } },
          left: { style: "thin", color: { rgb: COLORS.line } },
          right: { style: "thin", color: { rgb: COLORS.line } },
        }
      : undefined,
  };
}

function styleRange(sheet, range, style) {
  const decoded = XLSX.utils.decode_range(range);
  for (let row = decoded.s.r; row <= decoded.e.r; row += 1) {
    for (let col = decoded.s.c; col <= decoded.e.c; col += 1) {
      const ref = XLSX.utils.encode_cell({ r: row, c: col });
      if (!sheet[ref]) sheet[ref] = { t: "s", v: "" };
      sheet[ref].s = style;
    }
  }
}

function styleSqref(sheet, sqref, style) {
  for (const range of String(sqref).trim().split(/\s+/).filter(Boolean)) {
    styleRange(sheet, range, style);
  }
}

function markInputRange(sheet, sqref) {
  styleSqref(sheet, sqref, cellStyle({
    fill: COLORS.input,
    color: COLORS.inputInk,
    border: true,
  }));
}

function addConditionalFormatting(sheet, sqref, rules) {
  sheet["!flowoConditionalFormattings"] = sheet["!flowoConditionalFormattings"] || [];
  sheet["!flowoConditionalFormattings"].push({ sqref, rules });
}

function finalizeSheet(sheet, { widths = [], freezeRow = 0, autoFilter, rowHeights = {} } = {}) {
  if (widths.length) sheet["!cols"] = widths.map((wch) => ({ wch }));
  sheet["!rows"] = [];
  Object.entries(rowHeights).forEach(([row, hpt]) => {
    sheet["!rows"][Number(row)] = { hpt };
  });
  if (freezeRow) {
    sheet["!freeze"] = { xSplit: 0, ySplit: freezeRow, topLeftCell: `A${freezeRow + 1}`, activePane: "bottomLeft", state: "frozen" };
  }
  if (autoFilter) sheet["!autofilter"] = { ref: autoFilter };
  sheet["!sheetViews"] = [{ showGridLines: false }];
  return sheet;
}

function addDataValidation(sheet, sqref, {
  type = "list",
  operator,
  formula1,
  formula2,
  allowBlank = true,
  errorTitle = "Valor inválido",
  error = "Revise o valor informado.",
  promptTitle,
  prompt,
} = {}) {
  sheet["!flowoDataValidations"] = sheet["!flowoDataValidations"] || [];
  sheet["!flowoDataValidations"].push({
    sqref,
    type,
    operator,
    formula1,
    formula2,
    allowBlank,
    errorTitle,
    error,
    promptTitle,
    prompt,
  });
  styleSqref(sheet, sqref, cellStyle({
    fill: COLORS.input,
    color: COLORS.inputInk,
    border: true,
  }));
}

function addTitleBlock(sheet, title, subtitle, lastColumn, { eyebrow = "MATERIAL PRÁTICO FLOWO" } = {}) {
  sheet.A1 = { t: "s", v: eyebrow };
  sheet.A2 = { t: "s", v: title };
  sheet.A3 = { t: "s", v: subtitle };
  sheet.A4 = { t: "s", v: "flowo.com.br" };
  sheet["!merges"] = sheet["!merges"] || [];
  for (const row of [1, 2, 3, 4]) {
    sheet["!merges"].push(XLSX.utils.decode_range(`A${row}:${lastColumn}${row}`));
  }
  styleRange(sheet, `A1:${lastColumn}1`, cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, size: 10 }));
  styleRange(sheet, `A2:${lastColumn}2`, cellStyle({ fill: COLORS.cream, bold: true, size: 20 }));
  styleRange(sheet, `A3:${lastColumn}3`, cellStyle({ fill: COLORS.cream, color: COLORS.muted, size: 11 }));
  styleRange(sheet, `A4:${lastColumn}4`, cellStyle({ fill: COLORS.cream, color: COLORS.accent, bold: true, size: 10 }));
}

function addReadme(wb, { title, purpose, steps, notes = [], whatsapp = false, disclaimer = DISCLAIMER }) {
  const shortSteps = steps.slice(0, 3);
  const rows = [
    ["FLOWO · MATERIAL PRÁTICO", "", "", "", "", ""],
    [title, "", "", "", "", ""],
    [purpose, "", "", "", "", ""],
    ["Veja o resumo na próxima aba. Depois, preencha somente as células rosadas e volte ao resumo para decidir o que fazer.", "", "", "", "", ""],
    [],
    ["01", "", "02", "", "03", ""],
    [shortSteps[0] || "Preencha os dados da rotina.", "", shortSteps[1] || "Confira o resultado.", "", shortSteps[2] || "Escolha a próxima ação.", ""],
    [],
    ["LEGENDA RÁPIDA", "", "", "", "", ""],
    ["DIGITE AQUI", "", "RESULTADO", "", "ATENÇÃO", ""],
    ["Células rosadas", "", "Células verdes", "", "Células amarelas", ""],
    [],
    ...(whatsapp ? [["WHATSAPP COM RESPONSABILIDADE", "", "", "", "", ""], [WHATSAPP_NOTICE, "", "", "", "", ""], []] : []),
    ...(notes.length ? [["ANTES DE COMEÇAR", "", "", "", "", ""], ...notes.map((note) => [`• ${note}`, "", "", "", "", ""]), []] : []),
    ["AVISO IMPORTANTE", "", "", "", "", ""],
    [disclaimer, "", "", "", "", ""],
    ["flowo.com.br/recursos/materiais", "", "", "", "", ""],
  ];
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  sheet["!merges"] = [];
  for (const row of [1, 2, 3, 4, 9]) {
    sheet["!merges"].push(XLSX.utils.decode_range(`A${row}:F${row}`));
  }
  for (const row of [6, 7, 10, 11]) {
    for (const start of ["A", "C", "E"]) {
      const end = String.fromCharCode(start.charCodeAt(0) + 1);
      sheet["!merges"].push(XLSX.utils.decode_range(`${start}${row}:${end}${row}`));
    }
  }
  for (let row = 13; row <= rows.length; row += 1) {
    sheet["!merges"].push(XLSX.utils.decode_range(`A${row}:F${row}`));
  }

  styleRange(sheet, "A1:F1", cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, size: 10 }));
  styleRange(sheet, "A2:F2", cellStyle({ fill: COLORS.cream, bold: true, size: 22 }));
  styleRange(sheet, "A3:F3", cellStyle({ fill: COLORS.cream, color: COLORS.muted, size: 12 }));
  styleRange(sheet, "A4:F4", cellStyle({ fill: COLORS.paper, color: COLORS.ink, bold: true, size: 11, border: true }));
  for (const start of ["A", "C", "E"]) {
    const end = String.fromCharCode(start.charCodeAt(0) + 1);
    styleRange(sheet, `${start}6:${end}6`, cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, size: 11 }));
    styleRange(sheet, `${start}7:${end}7`, cellStyle({ fill: COLORS.paper, color: COLORS.ink, size: 11, border: true }));
  }
  styleRange(sheet, "A9:F9", cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, size: 10 }));
  styleRange(sheet, "A10:B11", cellStyle({ fill: COLORS.input, color: COLORS.inputInk, bold: true, border: true }));
  styleRange(sheet, "C10:D11", cellStyle({ fill: COLORS.successSoft, color: COLORS.success, bold: true, border: true }));
  styleRange(sheet, "E10:F11", cellStyle({ fill: COLORS.warningSoft, color: COLORS.warning, bold: true, border: true }));

  for (let row = 13; row <= rows.length; row += 1) {
    const value = String(sheet[`A${row}`]?.v || "");
    if (["WHATSAPP COM RESPONSABILIDADE", "ANTES DE COMEÇAR", "AVISO IMPORTANTE"].includes(value)) {
      styleRange(sheet, `A${row}:F${row}`, cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, size: 10 }));
    } else if (value === "flowo.com.br/recursos/materiais") {
      styleRange(sheet, `A${row}:F${row}`, cellStyle({ fill: COLORS.cream, color: COLORS.accent, bold: true, size: 10 }));
    } else if (value) {
      styleRange(sheet, `A${row}:F${row}`, cellStyle({ fill: COLORS.paper, color: value.startsWith("•") ? COLORS.muted : COLORS.ink, size: 10 }));
    }
  }

  const rowHeights = Object.fromEntries(rows.map((row, index) => {
    const text = String(row[0] || "");
    if (index === 0) return [index, 24];
    if (index === 1) return [index, 40];
    if (index === 2) return [index, 42];
    if (index === 3) return [index, 34];
    if ([5, 9].includes(index)) return [index, 24];
    if ([6, 10].includes(index)) return [index, 48];
    if (!text) return [index, 8];
    return [index, Math.min(54, 22 + Math.ceil(text.length / 120) * 12)];
  }));
  finalizeSheet(sheet, { widths: [18, 18, 18, 18, 18, 18], rowHeights });
  XLSX.utils.book_append_sheet(wb, sheet, "Comece aqui");
}

function addQuickPanel(wb, {
  title,
  question,
  metrics,
  nextAction,
  name = "Painel rápido",
}) {
  const rows = Array.from({ length: 18 }, () => Array.from({ length: 9 }, () => ""));
  rows[0][0] = "FLOWO · RESUMO SIMPLES";
  rows[1][0] = title;
  rows[2][0] = question;
  rows[4][0] = metrics[0]?.label || "Indicador";
  rows[4][3] = metrics[1]?.label || "Indicador";
  rows[4][6] = metrics[2]?.label || "Indicador";
  rows[5][0] = metrics[0]?.formula ? { f: metrics[0].formula } : metrics[0]?.value ?? "—";
  rows[5][3] = metrics[1]?.formula ? { f: metrics[1].formula } : metrics[1]?.value ?? "—";
  rows[5][6] = metrics[2]?.formula ? { f: metrics[2].formula } : metrics[2]?.value ?? "—";
  rows[6][0] = metrics[0]?.description || "";
  rows[6][3] = metrics[1]?.description || "";
  rows[6][6] = metrics[2]?.description || "";
  rows[9][0] = "PRÓXIMA AÇÃO";
  rows[10][0] = nextAction;
  rows[13][0] = "COMO LER";
  rows[14][0] = "1. Preencha as células rosadas nas outras abas.";
  rows[15][0] = "2. Volte aqui para conferir os números principais.";
  rows[16][0] = "3. Resolva primeiro o que estiver pendente ou bloqueado.";

  const sheet = XLSX.utils.aoa_to_sheet(rows);
  sheet["!merges"] = [];
  for (const row of [1, 2, 3, 10, 11, 14, 15, 16, 17]) {
    sheet["!merges"].push(XLSX.utils.decode_range(`A${row}:I${row}`));
  }
  for (const start of ["A", "D", "G"]) {
    const startCode = start.charCodeAt(0);
    const end = String.fromCharCode(startCode + 2);
    for (const row of [5, 6, 7]) {
      sheet["!merges"].push(XLSX.utils.decode_range(`${start}${row}:${end}${row}`));
    }
  }
  styleRange(sheet, "A1:I1", cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, size: 10 }));
  styleRange(sheet, "A2:I2", cellStyle({ fill: COLORS.cream, color: COLORS.ink, bold: true, size: 22 }));
  styleRange(sheet, "A3:I3", cellStyle({ fill: COLORS.cream, color: COLORS.muted, size: 11 }));
  for (const start of ["A", "D", "G"]) {
    const end = String.fromCharCode(start.charCodeAt(0) + 2);
    styleRange(sheet, `${start}5:${end}5`, cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, size: 10 }));
    styleRange(sheet, `${start}6:${end}6`, cellStyle({ fill: COLORS.successSoft, color: COLORS.success, bold: true, size: 22, align: "center", border: true }));
    styleRange(sheet, `${start}7:${end}7`, cellStyle({ fill: COLORS.paper, color: COLORS.muted, size: 10, align: "center", border: true }));
  }
  for (let index = 0; index < 3; index += 1) {
    const cell = sheet[["A6", "D6", "G6"][index]];
    if (cell && metrics[index]?.format) cell.z = metrics[index].format;
  }
  styleRange(sheet, "A10:I10", cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, size: 10 }));
  styleRange(sheet, "A11:I11", cellStyle({ fill: COLORS.warningSoft, color: COLORS.warning, bold: true, size: 12, border: true }));
  styleRange(sheet, "A14:I14", cellStyle({ fill: COLORS.cream, color: COLORS.ink, bold: true, size: 10 }));
  styleRange(sheet, "A15:I17", cellStyle({ fill: COLORS.paper, color: COLORS.muted, size: 10 }));
  finalizeSheet(sheet, {
    widths: Array.from({ length: 9 }, () => 14),
    rowHeights: { 0: 24, 1: 40, 2: 34, 4: 26, 5: 44, 6: 34, 9: 26, 10: 42, 13: 24, 14: 24, 15: 24, 16: 24 },
  });
  XLSX.utils.book_append_sheet(wb, sheet, name);
  wb.SheetNames = ["Comece aqui", name, ...wb.SheetNames.filter((sheetName) => !["Comece aqui", name].includes(sheetName))];
}

function decorateTable(sheet, { headerRow, lastColumn, lastRow, widths, freezeRow = headerRow, autoFilter = true }) {
  styleRange(sheet, `A${headerRow}:${lastColumn}${headerRow}`, cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, border: true }));
  if (lastRow > headerRow) {
    styleRange(sheet, `A${headerRow + 1}:${lastColumn}${lastRow}`, cellStyle({ fill: COLORS.paper, border: true }));
    for (let row = headerRow + 1; row <= lastRow; row += 2) {
      styleRange(sheet, `A${row}:${lastColumn}${row}`, cellStyle({ fill: COLORS.cream, border: true }));
    }
  }
  const rowHeights = { 0: 28, 1: 40, 2: 34, 3: 24, [headerRow - 1]: 30 };
  for (let row = headerRow; row < lastRow; row += 1) rowHeights[row] = 34;
  finalizeSheet(sheet, {
    widths,
    freezeRow,
    autoFilter: autoFilter ? `A${headerRow}:${lastColumn}${lastRow}` : undefined,
    rowHeights,
  });
  for (let col = 0; col <= XLSX.utils.decode_col(lastColumn); col += 1) {
    const ref = XLSX.utils.encode_cell({ r: headerRow - 1, c: col });
    const header = String(sheet[ref]?.v || "");
    const bodyRange = `${XLSX.utils.encode_col(col)}${headerRow + 1}:${XLSX.utils.encode_col(col)}${lastRow}`;
    if (header === "Status") {
      addConditionalFormatting(sheet, bodyRange, [
        { text: "Concluído", style: "success" },
        { text: "Publicado", style: "success" },
        { text: "Pronto", style: "success" },
        { text: "Pendente", style: "warning" },
        { text: "Em andamento", style: "warning" },
        { text: "Revisar", style: "warning" },
        { text: "Bloqueado", style: "danger" },
        { text: "Cancelado", style: "danger" },
        { text: "Estornado", style: "danger" },
      ]);
    }
    if (header === "Validação") {
      addConditionalFormatting(sheet, bodyRange, [
        { text: "Elegível", style: "success" },
        { text: "Excluído", style: "warning" },
        { text: "ERRO", style: "danger" },
      ]);
    }
    if (["SAIR/PARAR", "Pedido de saída"].includes(header)) {
      addConditionalFormatting(sheet, bodyRange, [{ text: "Sim", style: "danger" }]);
    }
  }
}

function createWorkbook(title) {
  const wb = XLSX.utils.book_new();
  wb.Props = {
    Title: title,
    Subject: "Material educativo para gestão de barbearias",
    Author: "Flowo",
    Company: "Flowo",
    Comments: "Gerado por scripts/generate-premium-materials.mjs",
    CreatedDate: new Date("2026-08-23T12:00:00Z"),
  };
  return wb;
}

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function appendStyleEntries(xml, tagName, entries) {
  if (!entries.length) return xml;
  const pattern = new RegExp(`<${tagName} count="(\\d+)">([\\s\\S]*?)</${tagName}>`);
  const match = xml.match(pattern);
  if (!match) throw new Error(`OOXML inválido: seção ${tagName} não encontrada`);
  const count = Number(match[1]);
  return xml.replace(
    pattern,
    `<${tagName} count="${count + entries.length}">${match[2]}${entries.join("")}</${tagName}>`,
  );
}

function addPrintSetup(sheetXml, { readme }) {
  const pageSetUpPr = '<pageSetUpPr fitToPage="1" autoPageBreaks="0"/>';
  if (/<sheetPr\b/.test(sheetXml)) {
    sheetXml = sheetXml.replace(/<sheetPr\b([^>]*)\/>/, `<sheetPr$1>${pageSetUpPr}</sheetPr>`);
    if (!/<pageSetUpPr\b/.test(sheetXml)) {
      sheetXml = sheetXml.replace(/<\/sheetPr>/, `${pageSetUpPr}</sheetPr>`);
    }
  } else {
    sheetXml = sheetXml.replace(/(<worksheet\b[^>]*>)/, `$1<sheetPr>${pageSetUpPr}</sheetPr>`);
  }

  sheetXml = sheetXml
    .replace(/<pageMargins\b[^>]*\/>/g, "")
    .replace(/<pageSetup\b[^>]*\/>/g, "")
    .replace(/<printOptions\b[^>]*\/>/g, "");
  const printXml = [
    '<printOptions horizontalCentered="1" verticalCentered="0" headings="0" gridLines="0"/>',
    '<pageMargins left="0.25" right="0.25" top="0.35" bottom="0.35" header="0.15" footer="0.15"/>',
    `<pageSetup paperSize="9" orientation="${readme ? "portrait" : "landscape"}" fitToWidth="1" fitToHeight="${readme ? 1 : 0}" horizontalDpi="300" verticalDpi="300"/>`,
  ].join("");
  return /<ignoredErrors\b/.test(sheetXml)
    ? sheetXml.replace(/<ignoredErrors\b/, `${printXml}<ignoredErrors`)
    : sheetXml.replace(/<\/worksheet>/, `${printXml}</worksheet>`);
}

function addDataValidations(sheetXml, validations = []) {
  if (!validations.length) return sheetXml;
  const entries = validations.map((validation) => {
    const attributes = [
      `type="${xmlEscape(validation.type)}"`,
      validation.operator ? `operator="${xmlEscape(validation.operator)}"` : "",
      `allowBlank="${validation.allowBlank ? 1 : 0}"`,
      'showErrorMessage="1"',
      'errorStyle="stop"',
      validation.prompt ? 'showInputMessage="1"' : "",
      `errorTitle="${xmlEscape(validation.errorTitle)}"`,
      `error="${xmlEscape(validation.error)}"`,
      validation.promptTitle ? `promptTitle="${xmlEscape(validation.promptTitle)}"` : "",
      validation.prompt ? `prompt="${xmlEscape(validation.prompt)}"` : "",
      `sqref="${xmlEscape(validation.sqref)}"`,
    ].filter(Boolean).join(" ");
    const formulas = [
      validation.formula1 != null ? `<formula1>${xmlEscape(validation.formula1)}</formula1>` : "",
      validation.formula2 != null ? `<formula2>${xmlEscape(validation.formula2)}</formula2>` : "",
    ].join("");
    return `<dataValidation ${attributes}>${formulas}</dataValidation>`;
  }).join("");
  const block = `<dataValidations count="${validations.length}">${entries}</dataValidations>`;
  const anchor = sheetXml.match(/<(?:hyperlinks|printOptions|pageMargins|pageSetup)\b/)?.[0];
  return anchor
    ? sheetXml.replace(anchor, `${block}${anchor}`)
    : sheetXml.replace(/<\/worksheet>/, `${block}</worksheet>`);
}

function addConditionalFormattings(sheetXml, groups = [], dxfIds = {}) {
  if (!groups.length) return sheetXml;
  let priority = 1;
  const blocks = groups.map(({ sqref, rules }) => {
    const firstRange = String(sqref).trim().split(/\s+/)[0];
    const firstCell = firstRange.split(":")[0];
    const entries = rules.map((rule) => {
      const text = xmlEscape(rule.text);
      const dxfId = dxfIds[rule.style];
      if (dxfId == null) throw new Error(`Estilo condicional ausente: ${rule.style}`);
      const formula = `ISNUMBER(SEARCH(&quot;${text}&quot;,${firstCell}))`;
      return `<cfRule type="expression" dxfId="${dxfId}" priority="${priority++}"><formula>${formula}</formula></cfRule>`;
    }).join("");
    return `<conditionalFormatting sqref="${xmlEscape(sqref)}">${entries}</conditionalFormatting>`;
  }).join("");
  const anchor = sheetXml.match(/<(?:dataValidations|hyperlinks|printOptions|pageMargins|pageSetup)\b/)?.[0];
  return anchor
    ? sheetXml.replace(anchor, `${blocks}${anchor}`)
    : sheetXml.replace(/<\/worksheet>/, `${blocks}</worksheet>`);
}

function appendOrCreateDxfs(stylesXml, entries) {
  if (!entries.length) return stylesXml;
  if (/<dxfs count="\d+">/.test(stylesXml)) {
    return appendStyleEntries(stylesXml, "dxfs", entries);
  }
  return stylesXml.replace(/<\/styleSheet>/, `<dxfs count="${entries.length}">${entries.join("")}</dxfs></styleSheet>`);
}

function absoluteRange(ref) {
  const decoded = XLSX.utils.decode_range(ref);
  const start = XLSX.utils.encode_cell(decoded.s).replace(/^([A-Z]+)(\d+)$/, "$$$1$$$2");
  const end = XLSX.utils.encode_cell(decoded.e).replace(/^([A-Z]+)(\d+)$/, "$$$1$$$2");
  return `${start}:${end}`;
}

function addWorkbookPrintAreas(workbookXml, wb) {
  const printAreas = wb.SheetNames.map((sheetName, index) => {
    const sheet = wb.Sheets[sheetName];
    const ref = sheetName === "Comece aqui"
      ? `A1:F${XLSX.utils.decode_range(sheet["!ref"]).e.r + 1}`
      : sheet["!ref"];
    const escapedName = xmlEscape(sheetName.replaceAll("'", "''"));
    return `<definedName name="_xlnm.Print_Area" localSheetId="${index}">&apos;${escapedName}&apos;!${absoluteRange(ref)}</definedName>`;
  }).join("");

  workbookXml = workbookXml.replace(/<definedName name="_xlnm\.Print_Area"[\s\S]*?<\/definedName>/g, "");
  if (/<definedNames>/.test(workbookXml)) {
    workbookXml = workbookXml.replace(/<\/definedNames>/, `${printAreas}</definedNames>`);
  } else {
    workbookXml = workbookXml.replace(/<\/sheets>/, `</sheets><definedNames>${printAreas}</definedNames>`);
  }
  if (!/<calcPr\b/.test(workbookXml)) {
    workbookXml = workbookXml.replace(
      /<\/workbook>/,
      '<calcPr calcId="0" calcMode="auto" fullCalcOnLoad="1" forceFullCalc="1"/></workbook>',
    );
  }
  return workbookXml;
}

function styleWorkbookOoxml(target, wb) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "flowo-xlsx-style-"));
  const styledTarget = `${target}.styled.xlsx`;
  try {
    const unzip = spawnSync("/usr/bin/unzip", ["-q", target, "-d", tempDir], {
      encoding: "utf8",
    });
    if (unzip.status !== 0) throw new Error(`Falha ao abrir XLSX: ${unzip.stderr}`);

    const stylesPath = path.join(tempDir, "xl", "styles.xml");
    let stylesXml = fs.readFileSync(stylesPath, "utf8");
    const fontsMatch = stylesXml.match(/<fonts count="(\d+)">/);
    const fillsMatch = stylesXml.match(/<fills count="(\d+)">/);
    const bordersMatch = stylesXml.match(/<borders count="(\d+)">/);
    const cellXfsMatch = stylesXml.match(/<cellXfs count="(\d+)">([\s\S]*?)<\/cellXfs>/);
    if (!fontsMatch || !fillsMatch || !bordersMatch || !cellXfsMatch) {
      throw new Error("OOXML inválido: estilos base ausentes");
    }

    const baseFontCount = Number(fontsMatch[1]);
    const baseFillCount = Number(fillsMatch[1]);
    const baseBorderCount = Number(bordersMatch[1]);
    const baseXfs = cellXfsMatch[2].match(/<xf\b[^>]*(?:\/>|>[\s\S]*?<\/xf>)/g) || [];
    const baseXfCount = Number(cellXfsMatch[1]);
    const baseNumFmtIds = baseXfs.map((xf) => Number(xf.match(/numFmtId="(\d+)"/)?.[1] || 0));
    const baseDxfCount = Number(stylesXml.match(/<dxfs count="(\d+)">/)?.[1] || 0);
    const dxfEntries = [
      `<dxf><font><b/><color rgb="FF${COLORS.success}"/></font><fill><patternFill patternType="solid"><fgColor rgb="FF${COLORS.successSoft}"/><bgColor indexed="64"/></patternFill></fill></dxf>`,
      `<dxf><font><b/><color rgb="FF${COLORS.warning}"/></font><fill><patternFill patternType="solid"><fgColor rgb="FF${COLORS.warningSoft}"/><bgColor indexed="64"/></patternFill></fill></dxf>`,
      `<dxf><font><b/><color rgb="FF${COLORS.danger}"/></font><fill><patternFill patternType="solid"><fgColor rgb="FF${COLORS.dangerSoft}"/><bgColor indexed="64"/></patternFill></fill></dxf>`,
    ];
    const dxfIds = {
      success: baseDxfCount,
      warning: baseDxfCount + 1,
      danger: baseDxfCount + 2,
    };

    const fontEntries = [];
    const fillEntries = [];
    const borderEntries = [];
    const xfEntries = [];
    const styleIndices = new Map();

    const allocateStyle = (style, numFmtId) => {
      const descriptor = {
        fill: style?.fill?.fgColor?.rgb || null,
        color: style?.font?.color?.rgb || COLORS.ink,
        bold: Boolean(style?.font?.bold),
        size: style?.font?.sz || 11,
        align: style?.alignment?.horizontal || "left",
        border: Boolean(style?.border),
        numFmtId,
      };
      const key = JSON.stringify(descriptor);
      if (styleIndices.has(key)) return styleIndices.get(key);

      const fontId = baseFontCount + fontEntries.length;
      const fillId = descriptor.fill ? baseFillCount + fillEntries.length : 0;
      const borderId = descriptor.border ? baseBorderCount + borderEntries.length : 0;
      fontEntries.push(
        `<font><name val="Arial"/><sz val="${descriptor.size}"/>${descriptor.bold ? "<b/>" : ""}<color rgb="FF${xmlEscape(descriptor.color)}"/><family val="2"/></font>`,
      );
      if (descriptor.fill) {
        fillEntries.push(
          `<fill><patternFill patternType="solid"><fgColor rgb="FF${xmlEscape(descriptor.fill)}"/><bgColor indexed="64"/></patternFill></fill>`,
        );
      }
      if (descriptor.border) {
        borderEntries.push(
          `<border><left style="thin"><color rgb="FF${COLORS.line}"/></left><right style="thin"><color rgb="FF${COLORS.line}"/></right><top style="thin"><color rgb="FF${COLORS.line}"/></top><bottom style="thin"><color rgb="FF${COLORS.line}"/></bottom><diagonal/></border>`,
        );
      }
      xfEntries.push(
        `<xf numFmtId="${numFmtId}" fontId="${fontId}" fillId="${fillId}" borderId="${borderId}" xfId="0" applyFont="1" applyFill="${descriptor.fill ? 1 : 0}" applyBorder="${descriptor.border ? 1 : 0}" applyAlignment="1" applyNumberFormat="${numFmtId ? 1 : 0}"><alignment horizontal="${xmlEscape(descriptor.align)}" vertical="center" wrapText="1"/></xf>`,
      );
      const index = baseXfCount + xfEntries.length - 1;
      styleIndices.set(key, index);
      return index;
    };

    wb.SheetNames.forEach((sheetName, sheetIndex) => {
      const sheet = wb.Sheets[sheetName];
      const plan = new Map(
        Object.entries(sheet)
          .filter(([ref, cell]) => !ref.startsWith("!") && cell?.s)
          .map(([ref, cell]) => [ref, cell.s]),
      );
      const validations = sheet["!flowoDataValidations"] || [];
      const conditionalFormattings = sheet["!flowoConditionalFormattings"] || [];
      if (!plan.size && !validations.length && !conditionalFormattings.length) return;
      const sheetPath = path.join(tempDir, "xl", "worksheets", `sheet${sheetIndex + 1}.xml`);
      let sheetXml = fs.readFileSync(sheetPath, "utf8");
      sheetXml = sheetXml.replace(/<c\b[^>]*\br="([^"]+)"[^>]*>/g, (tag, ref) => {
        const style = plan.get(ref);
        if (!style) return tag;
        const currentStyle = Number(tag.match(/\bs="(\d+)"/)?.[1] || 0);
        const numFmtId = baseNumFmtIds[currentStyle] || 0;
        const nextStyle = allocateStyle(style, numFmtId);
        return /\bs="\d+"/.test(tag)
          ? tag.replace(/\bs="\d+"/, `s="${nextStyle}"`)
          : tag.replace(/>$/, ` s="${nextStyle}">`);
      });
      sheetXml = addPrintSetup(sheetXml, { readme: sheetName === "Comece aqui" });
      sheetXml = addDataValidations(sheetXml, validations);
      sheetXml = addConditionalFormattings(sheetXml, conditionalFormattings, dxfIds);
      fs.writeFileSync(sheetPath, sheetXml, "utf8");
    });

    const workbookPath = path.join(tempDir, "xl", "workbook.xml");
    const workbookXml = addWorkbookPrintAreas(fs.readFileSync(workbookPath, "utf8"), wb);
    fs.writeFileSync(workbookPath, workbookXml, "utf8");

    stylesXml = appendStyleEntries(stylesXml, "fonts", fontEntries);
    stylesXml = appendStyleEntries(stylesXml, "fills", fillEntries);
    stylesXml = appendStyleEntries(stylesXml, "borders", borderEntries);
    stylesXml = appendOrCreateDxfs(stylesXml, dxfEntries);
    stylesXml = stylesXml.replace(
      /<cellXfs count="\d+">([\s\S]*?)<\/cellXfs>/,
      `<cellXfs count="${baseXfCount + xfEntries.length}">$1${xfEntries.join("")}</cellXfs>`,
    );
    fs.writeFileSync(stylesPath, stylesXml, "utf8");

    const zip = spawnSync("/usr/bin/zip", ["-q", "-r", styledTarget, "."], {
      cwd: tempDir,
      encoding: "utf8",
    });
    if (zip.status !== 0) throw new Error(`Falha ao finalizar XLSX: ${zip.stderr}`);
    fs.renameSync(styledTarget, target);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
    if (fs.existsSync(styledTarget)) fs.rmSync(styledTarget, { force: true });
  }
}

function writeWorkbook(filename, wb) {
  const target = path.join(filename.includes(path.sep) ? ROOT : DOWNLOADS, filename);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  wb.Workbook = wb.Workbook || {};
  wb.Workbook.CalcPr = {
    calcMode: "auto",
    fullCalcOnLoad: "1",
    forceFullCalc: "1",
  };
  for (const sheetName of wb.SheetNames) {
    const sheet = wb.Sheets[sheetName];
    for (const [ref, cell] of Object.entries(sheet)) {
      if (ref.startsWith("!") || !cell?.f || cell.v != null) continue;
      // SheetJS omits formula-only stubs on a default read. A numeric cache keeps
      // the formula discoverable to audits; Excel/Calc recalculates on open.
      cell.t = "n";
      cell.v = 0;
    }
  }
  XLSX.writeFile(wb, target, { compression: true, cellStyles: true });
  styleWorkbookOoxml(target, wb);
  GENERATED_WORKBOOKS.push(target);
  return target;
}

function findLibreOffice() {
  const candidates = [
    process.env.LIBREOFFICE_BIN,
    "/Applications/LibreOffice.app/Contents/MacOS/soffice",
    "/usr/local/bin/soffice",
    "/opt/homebrew/bin/soffice",
    "soffice",
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (candidate === "soffice") {
      const probe = spawnSync("/usr/bin/env", ["which", candidate], { encoding: "utf8" });
      if (probe.status === 0 && probe.stdout.trim()) return probe.stdout.trim();
      continue;
    }
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function recalculateWorkbooksWithLibreOffice(targets) {
  const soffice = findLibreOffice();
  if (!soffice) {
    console.warn("LibreOffice não encontrado; fórmulas permanecem com recálculo automático ao abrir.");
    return { recalculated: 0, skipped: targets.length };
  }
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "flowo-xlsx-recalc-"));
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "flowo-libreoffice-profile-"));
  try {
    const profileUrl = `file://${profileDir}`;
    const conversion = spawnSync(soffice, [
      `-env:UserInstallation=${profileUrl}`,
      "--headless",
      "--convert-to",
      "xlsx",
      "--outdir",
      tempDir,
      ...targets,
    ], { encoding: "utf8", timeout: 120_000 });
    if (conversion.status !== 0) {
      throw new Error(`LibreOffice não recalculou os XLSX: ${conversion.stderr || conversion.stdout}`);
    }
    for (const target of targets) {
      const recalculated = path.join(tempDir, path.basename(target));
      if (!fs.existsSync(recalculated)) throw new Error(`LibreOffice não gerou ${path.basename(target)}`);
      fs.copyFileSync(recalculated, target);
    }
    return { recalculated: targets.length, skipped: 0 };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.rmSync(profileDir, { recursive: true, force: true });
  }
}

function inspectWorksheetXml(target) {
  const listing = spawnSync("/usr/bin/unzip", ["-Z1", target], { encoding: "utf8" });
  if (listing.status !== 0) throw new Error(`Falha ao listar ${target}`);
  const worksheetPaths = listing.stdout.split("\n").filter((entry) => /^xl\/worksheets\/sheet\d+\.xml$/.test(entry));
  return worksheetPaths.map((worksheetPath) => {
    const xml = spawnSync("/usr/bin/unzip", ["-p", target, worksheetPath], { encoding: "utf8" });
    if (xml.status !== 0) throw new Error(`Falha ao ler ${worksheetPath} em ${target}`);
    return xml.stdout;
  });
}

function auditGeneratedWorkbooks(targets) {
  const rows = targets.map((target) => {
    const workbook = XLSX.readFile(target, { cellFormula: true, cellDates: true });
    let formulas = 0;
    let cachedValues = 0;
    let numericCaches = 0;
    let nonZeroCaches = 0;
    let formulaErrors = 0;
    if (workbook.SheetNames[0] !== "Comece aqui" || workbook.SheetNames[1] !== "Painel rápido") {
      throw new Error(`${path.basename(target)} deve abrir em Comece aqui e Painel rápido`);
    }
    for (const sheetName of workbook.SheetNames) {
      for (const [ref, cell] of Object.entries(workbook.Sheets[sheetName])) {
        if (ref.startsWith("!") || !cell?.f) continue;
        formulas += 1;
        if (cell.v != null) cachedValues += 1;
        if (cell.t === "e" || (typeof cell.v === "string" && cell.v.startsWith("#"))) {
          formulaErrors += 1;
        }
        if (typeof cell.v === "number" && Number.isFinite(cell.v)) {
          numericCaches += 1;
          if (Math.abs(cell.v) > 1e-9) nonZeroCaches += 1;
        }
      }
    }
    const worksheetXml = inspectWorksheetXml(target);
    const validations = worksheetXml.reduce(
      (total, xml) => total + (xml.match(/<dataValidation\b/g)?.length || 0),
      0,
    );
    if (validations === 0) throw new Error(`${path.basename(target)} não contém validação de dados`);
    if (formulas > 0 && cachedValues === 0) {
      throw new Error(`${path.basename(target)} não preservou os resultados calculados das fórmulas`);
    }
    if (formulaErrors > 0) {
      throw new Error(`${path.basename(target)} contém ${formulaErrors} fórmula(s) com erro`);
    }
    return {
      arquivo: path.basename(target),
      abas: workbook.SheetNames.length,
      formulas,
      cachesPersistidos: cachedValues,
      cachesNumericos: numericCaches,
      cachesNaoZero: nonZeroCaches,
      errosDeFormula: formulaErrors,
      validacoes: validations,
    };
  });
  console.table(rows);
  return rows;
}

function auditBusinessRules() {
  const read = (relativePath) => XLSX.readFile(path.join(DOWNLOADS, relativePath), {
    cellFormula: true,
    cellDates: false,
  });

  const commissions = read("planilha-comissoes-barbearia.xlsx");
  const attendance = commissions.Sheets.Atendimentos;
  const commissionSummary = commissions.Sheets.Resumo;
  assert.equal(attendance.F5.v, 0, "Atendimento cancelado não pode gerar comissão");
  assert.equal(attendance.F6.v, 0, "Atendimento estornado não pode gerar comissão");
  assert.equal(attendance.F7.v, 0, "Atendimento não elegível não pode gerar comissão");
  assert.equal(commissionSummary.B2.v, 1, "Resumo deve contar somente atendimentos concluídos");
  assert.match(
    attendance.F2.f,
    /COUNTIF\('?Configuração'?\!\$A\$2:\$A\$13,B2\)=0/,
    "Comissão deve zerar nomes que não estejam no cadastro",
  );
  assert.match(attendance.I2.f, /profissional não cadastrado/i);

  const pricing = read("planilha-precificacao-barbearia.xlsx");
  const costs = pricing.Sheets.Custos;
  const prices = pricing.Sheets["Precificação"];
  assert.equal(costs.B10.v, costs.B8.v / (costs.B9.v * 60));
  assert.equal(prices.D2.v / prices.D3.v, prices.B2.v / prices.B3.v);

  const cashFlow = read("lead-magnets/fluxo-caixa-semanal-barbearia.xlsx");
  const cashConfig = cashFlow.Sheets["Configuração"];
  const cashSummary = cashFlow.Sheets["Resumo semanal"];
  assert.equal(Number.isInteger(cashConfig.B2.v), true, "Data inicial deve ser um serial inteiro, sem hora");
  assert.equal(cashSummary.A13.v, cashConfig.B2.v + 11 * 7);
  assert.equal(cashSummary.A14.v, "", "Janela configurada não deve exibir semanas adicionais");

  const goals = read("lead-magnets/plano-metas-faturamento.xlsx");
  const goalConfig = goals.Sheets.Meta;
  const goalTracking = goals.Sheets["Acompanhamento diário"];
  assert.equal(goalTracking.A2.w, "01/08/2026");
  assert.equal(goalTracking.A32.w, "31/08/2026");
  assert.equal(goalTracking.B3.v, "Não", "Dia fechado deve ficar fora da meta");
  assert.equal(goalTracking.D3.v, 0, "Dia fechado não pode receber meta diária");
  assert.equal(goalConfig.B4.v, 26, "Agosto/2026 deve considerar somente os 26 dias abertos do exemplo");

  const combos = read("lead-magnets/planilha-combos-ticket-medio.xlsx").Sheets.Combos;
  assert.match(combos.J22.f, /SUMPRODUCT\(F2:F21,H2:H21\)/);
  assert.equal(combos.J22.v, 2749);
  assert.equal(combos.G22.v, combos.J22.v / combos.I22.v);

  const guideSource = fs.readFileSync(path.join(ROOT, "data", "guides.ts"), "utf8");
  const validRoutes = new Set([
    "/recursos",
    "/recursos/materiais",
    ...Array.from(guideSource.matchAll(/path:\s*"([^"]+)"/g), (match) => match[1]),
  ]);
  const invalidRoutes = reels.map((row) => row[6]).filter((route) => !validRoutes.has(route));
  assert.deepEqual(invalidRoutes, []);

  return {
    comissoes: "cancelados, estornados e não elegíveis excluídos; resumo somente concluídos",
    precificacao: "custo fixo rateado por minuto produtivo e duração do serviço",
    caixa: "datas inteiras e janela semanal configurável",
    metas: "mês completo; dias fechados e folgas sem meta",
    combos: "margem projetada calculada por SUMPRODUCT",
    rotasReels: `${new Set(reels.map((row) => row[6])).size} rotas internas válidas`,
  };
}

function csvEscape(value) {
  const text = value == null ? "" : String(value);
  return /[;"\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filename, rows) {
  const content = `\uFEFF${rows.map((row) => row.map(csvEscape).join(";")).join("\n")}\n`;
  fs.writeFileSync(path.join(LEAD_MAGNETS, filename), content, "utf8");
}

function buildInstagramCalendar() {
  const wb = createWorkbook("Calendário de conteúdo para Instagram");
  addReadme(wb, {
    title: "Calendário de conteúdo — 30 dias",
    purpose: "Um mês de pauta para mostrar o trabalho da barbearia sem depender de ideias de última hora.",
    steps: [
      "Troque os exemplos por fotos, cortes e histórias reais da sua barbearia.",
      "Escolha uma pessoa responsável por gravar, revisar e publicar.",
      "Registre o resultado de cada publicação e repita os formatos que gerarem conversas e agendamentos.",
    ],
    notes: ["Não use imagens de clientes sem autorização.", "Horário sugerido é ponto de partida, não garantia de alcance."],
  });
  const topics = [
    [1, "Reels", "Antes e depois", "Mostre a transformação em 3 cortes rápidos.", "Qual detalhe você mais curtiu?", "Gravar", "Visualizações e mensagens"],
    [2, "Stories", "Agenda do dia", "Mostre os primeiros horários e a rotina abrindo.", "Chame no WhatsApp para consultar horários.", "Gravar", "Respostas"],
    [3, "Carrossel", "Cuidados com a barba", "Três hábitos simples para manter a barba alinhada.", "Salve para usar depois.", "Criar", "Salvamentos"],
    [4, "Reels", "Bastidor do corte", "Mostre preparação, técnica e acabamento.", "Quer um resultado assim?", "Gravar", "Mensagens"],
    [5, "Foto", "Profissional da equipe", "Apresente especialidade e estilo de atendimento.", "Qual corte você faria com ele?", "Fotografar", "Comentários"],
    [6, "Stories", "Enquete", "Degradê baixo ou médio?", "Vote e mande sua referência.", "Criar", "Votos"],
    [7, "Reels", "Dúvida comum", "Explique quanto tempo dura um serviço popular.", "Envie para quem sempre pergunta.", "Gravar", "Compartilhamentos"],
    [8, "Carrossel", "Como escolher o corte", "Rosto, rotina e frequência de manutenção.", "Salve antes do próximo corte.", "Criar", "Salvamentos"],
    [9, "Stories", "Horários livres", "Mostre apenas horários realmente disponíveis.", "Responda este story para consultar.", "Publicar", "Respostas"],
    [10, "Reels", "Erro em casa", "Mostre um cuidado que prejudica o acabamento.", "Você já fez isso?", "Gravar", "Comentários"],
    [11, "Foto", "Ambiente", "Mostre um detalhe que traduz a experiência da casa.", "Marca alguém que viria com você.", "Fotografar", "Marcações"],
    [12, "Stories", "Caixa de perguntas", "Abra dúvidas sobre cabelo e barba.", "Manda sua dúvida aqui.", "Criar", "Perguntas"],
    [13, "Reels", "Transformação expressa", "Comece pelo resultado e revele o antes.", "Quer reservar seu horário?", "Gravar", "Mensagens"],
    [14, "Carrossel", "Serviços da casa", "Explique para quem cada serviço faz sentido.", "Qual você quer conhecer?", "Criar", "Cliques no perfil"],
    [15, "Stories", "Rotina da equipe", "Mostre organização entre um atendimento e outro.", "Acompanhe os bastidores.", "Gravar", "Retenção"],
    [16, "Reels", "Produto sem empurrar", "Demonstre como usar um produto vendido na barbearia.", "Quer saber qual combina com seu cabelo?", "Gravar", "Perguntas"],
    [17, "Foto", "Cliente recorrente", "Conte uma história real com autorização.", "Obrigado pela confiança.", "Fotografar", "Compartilhamentos"],
    [18, "Stories", "Quiz", "Teste uma curiosidade simples sobre barba.", "Responda e veja o resultado.", "Criar", "Interações"],
    [19, "Reels", "Acabamento", "Close no acabamento final e na reação do cliente.", "Esse acabamento é sua cara?", "Gravar", "Mensagens"],
    [20, "Carrossel", "Frequência de manutenção", "Compare intervalos por estilo de corte.", "Salve para planejar o retorno.", "Criar", "Salvamentos"],
    [21, "Stories", "Agenda da semana", "Mostre dias com horários, sem criar falsa urgência.", "Consulte um horário por mensagem.", "Publicar", "Conversas"],
    [22, "Reels", "Mito ou verdade", "Responda uma crença comum do cliente.", "Qual mito você já ouviu?", "Gravar", "Comentários"],
    [23, "Foto", "Ferramentas", "Mostre cuidado com higiene e organização.", "Qual detalhe passa confiança para você?", "Fotografar", "Comentários"],
    [24, "Stories", "Avaliação", "Compartilhe uma avaliação verdadeira com autorização.", "Conte como foi sua experiência.", "Publicar", "Respostas"],
    [25, "Reels", "Um dia em 15 segundos", "Abra, atenda, finalize e encerre o dia.", "Quer ver mais bastidores?", "Gravar", "Retenção"],
    [26, "Carrossel", "Corte e estilo", "Mostre três variações do mesmo estilo.", "Qual é a sua?", "Criar", "Comentários"],
    [27, "Stories", "Preferência do público", "Pergunte sobre serviço, horário ou conteúdo.", "Sua resposta ajuda a melhorar a casa.", "Criar", "Respostas"],
    [28, "Reels", "Atendimento", "Mostre uma pergunta bem feita antes do corte.", "Bom atendimento começa ouvindo.", "Gravar", "Compartilhamentos"],
    [29, "Foto", "Resultado da semana", "Reúna três trabalhos fortes em uma publicação.", "Qual entra na próxima semana?", "Criar", "Comentários"],
    [30, "Reels", "Convite direto", "Mostre equipe, ambiente e um resultado em sequência.", "Consulte seu horário pelo WhatsApp.", "Gravar", "Conversas iniciadas"],
  ];
  const rows = [["Dia", "Formato", "Pauta", "Roteiro", "Chamada", "Status", "Métrica principal"], ...topics];
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  decorateTable(sheet, { headerRow: 1, lastColumn: "G", lastRow: rows.length, widths: [8, 14, 24, 54, 34, 14, 22] });
  addDataValidation(sheet, "A2:A31", {
    type: "whole",
    operator: "between",
    formula1: "1",
    formula2: "31",
    error: "Informe um dia entre 1 e 31.",
  });
  addDataValidation(sheet, "B2:B31", {
    formula1: '"Reels,Stories,Carrossel,Foto"',
    error: "Escolha Reels, Stories, Carrossel ou Foto.",
  });
  addDataValidation(sheet, "F2:F31", {
    formula1: '"Planejar,Gravar,Criar,Fotografar,Revisar,Publicar,Publicado"',
    error: "Escolha uma etapa válida da produção.",
  });
  markInputRange(sheet, "F2:F31");
  XLSX.utils.book_append_sheet(wb, sheet, "Calendário 30 dias");
  addQuickPanel(wb, {
    title: "Seu conteúdo do mês em um olhar",
    question: "Quantas publicações já saíram e o que precisa ser produzido agora?",
    metrics: [
      { label: "PUBLICADOS", formula: `COUNTIF('Calendário 30 dias'!$F$2:$F$31,"Publicado")`, description: "conteúdos que já foram ao ar", format: "0" },
      { label: "EM PRODUÇÃO", formula: `COUNTIF('Calendário 30 dias'!$F$2:$F$31,"Gravar")+COUNTIF('Calendário 30 dias'!$F$2:$F$31,"Criar")+COUNTIF('Calendário 30 dias'!$F$2:$F$31,"Fotografar")+COUNTIF('Calendário 30 dias'!$F$2:$F$31,"Revisar")`, description: "conteúdos com próxima etapa", format: "0" },
      { label: "FALTAM PUBLICAR", formula: `30-COUNTIF('Calendário 30 dias'!$F$2:$F$31,"Publicado")`, description: "ideias ainda disponíveis", format: "0" },
    ],
    nextAction: "Escolha apenas o conteúdo de amanhã, mude o status e defina quem vai gravar ou criar.",
  });
  writeWorkbook("calendario-conteudo-instagram.xlsx", wb);
}

function buildOpeningChecklist() {
  const wb = createWorkbook("Checklist de abertura de barbearia");
  addReadme(wb, {
    title: "Checklist de abertura de barbearia",
    purpose: "Organize decisões, documentos e responsáveis antes de abrir as portas.",
    steps: ["Defina quem vai cuidar e até quando.", "Use a coluna Comprovante ou link para guardar documento, contato ou endereço.", "Revise o que falta uma vez por semana até a abertura."],
    notes: ["Licenças e obrigações variam conforme município, atividade e modelo de contratação.", "Consulte contador, prefeitura, vigilância sanitária e profissionais jurídicos quando aplicável."],
  });
  const items = [
    ["Planejamento", "Definir público e posicionamento", "Pendente", "", "", "", ""],
    ["Planejamento", "Mapear concorrentes e faixa de preço local", "Pendente", "", "", "", ""],
    ["Planejamento", "Projetar investimento e capital de giro", "Pendente", "", "", "", ""],
    ["Legal e fiscal", "Definir natureza jurídica e atividades com contador", "Pendente", "", "", "", ""],
    ["Legal e fiscal", "Confirmar alvarás e licenças municipais aplicáveis", "Pendente", "", "", "", ""],
    ["Legal e fiscal", "Validar exigências sanitárias e de segurança", "Pendente", "", "", "", ""],
    ["Imóvel", "Validar contrato, zoneamento e capacidade elétrica/hidráulica", "Pendente", "", "", "", ""],
    ["Imóvel", "Planejar acessibilidade, circulação e conforto", "Pendente", "", "", "", ""],
    ["Operação", "Definir serviços, duração e preço", "Pendente", "", "", "", ""],
    ["Operação", "Definir agenda, intervalo e política de atendimento", "Pendente", "", "", "", ""],
    ["Operação", "Cadastrar fornecedores e estoque mínimo", "Pendente", "", "", "", ""],
    ["Equipe", "Definir modelo de contratação e regras de comissão", "Pendente", "", "", "", ""],
    ["Equipe", "Documentar responsabilidades e rotina de abertura/fechamento", "Pendente", "", "", "", ""],
    ["Atendimento", "Configurar número oficial e mensagens de WhatsApp", "Pendente", "", "", "", ""],
    ["Atendimento", "Preparar agenda e horários de cada profissional", "Pendente", "", "", "", ""],
    ["Financeiro", "Separar conta pessoal e conta da empresa", "Pendente", "", "", "", ""],
    ["Financeiro", "Definir como receber e como conferir o dinheiro que entrou", "Pendente", "", "", "", ""],
    ["Marketing", "Criar identidade e perfis oficiais", "Pendente", "", "", "", ""],
    ["Marketing", "Planejar divulgação de abertura sem promessas enganosas", "Pendente", "", "", "", ""],
    ["Abertura", "Executar atendimento-piloto e revisar o fluxo", "Pendente", "", "", "", ""],
  ];
  const rows = [["Área", "Tarefa", "Status", "Quem cuida", "Prazo", "Comprovante ou link", "Observações"], ...items];
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  decorateTable(sheet, { headerRow: 1, lastColumn: "G", lastRow: rows.length, widths: [20, 52, 16, 22, 14, 30, 38] });
  addDataValidation(sheet, `C2:C${rows.length}`, {
    formula1: '"Pendente,Em andamento,Concluído,Bloqueado"',
    error: "Escolha um status da lista.",
  });
  addDataValidation(sheet, `E2:E${rows.length}`, {
    type: "date",
    operator: "between",
    formula1: "DATE(2020,1,1)",
    formula2: "DATE(2100,12,31)",
    error: "Informe uma data válida.",
  });
  markInputRange(sheet, `D2:G${rows.length}`);
  XLSX.utils.book_append_sheet(wb, sheet, "Checklist");
  addQuickPanel(wb, {
    title: "O que falta para abrir com segurança",
    question: "Resolva primeiro o que está bloqueado; depois avance no que já começou.",
    metrics: [
      { label: "CONCLUÍDOS", formula: `COUNTIF(Checklist!$C$2:$C$${rows.length},"Concluído")`, description: `de ${items.length} itens`, format: "0" },
      { label: "EM ANDAMENTO", formula: `COUNTIF(Checklist!$C$2:$C$${rows.length},"Em andamento")`, description: "itens já iniciados", format: "0" },
      { label: "BLOQUEADOS", formula: `COUNTIF(Checklist!$C$2:$C$${rows.length},"Bloqueado")`, description: "itens que pedem ajuda", format: "0" },
    ],
    nextAction: "Abra o Checklist, filtre por Bloqueado e registre quem cuida, prazo e comprovante no primeiro item.",
  });
  writeWorkbook("checklist-abertura-barbearia.xlsx", wb);
}

function buildLoyaltyGuide() {
  const wb = createWorkbook("Guia prático de fidelização");
  addReadme(wb, {
    title: "Guia prático de fidelização",
    purpose: "Transforme bom atendimento em retorno planejado, sem pressionar nem enviar mensagem fora de contexto.",
    steps: ["Escolha uma ação simples para cada momento do cliente.", "Peça permissão antes de enviar ofertas pelo WhatsApp.", "Acompanhe resposta, retorno e pedido para parar."],
    whatsapp: true,
    notes: ["Não existe percentual universal de retorno ou frequência ideal.", "Benefícios, cashback e promoções precisam de regras claras e prazo informado."],
  });
  const plan = [
    ["Após o atendimento", "Agradecer e orientar cuidados", "Serviço", "No mesmo dia", "Equipe", "Satisfação registrada", "Não incluir oferta sem permissão"],
    ["Próximo retorno", "Sugerir período de manutenção conforme o serviço", "Atendimento", "No fechamento", "Profissional", "Previsão registrada", "Evitar pressão"],
    ["Cliente autorizou contato", "Enviar conteúdo ou convite relevante", "Marketing", "Conforme preferência", "Responsável comercial", "Resposta/retorno", "Incluir opção SAIR"],
    ["Cliente inativo", "Perguntar se ainda deseja receber novidades", "Marketing", "Uma tentativa", "Responsável comercial", "Permissão renovada ou saída", "Não insistir sem resposta"],
    ["Cliente voltou", "Reconhecer o retorno e atualizar preferências", "Atendimento", "Na visita", "Equipe", "Preferência atualizada", "Não presumir interesse futuro"],
    ["Pedido de saída", "Parar campanhas e registrar a solicitação", "Governança", "Imediato", "Responsável pelo canal", "Contato suprimido", "Confirmar de forma curta"],
  ];
  const sheet = XLSX.utils.aoa_to_sheet([["Momento", "Ação", "Tipo", "Quando", "Responsável", "Resultado esperado", "Cuidado"], ...plan]);
  decorateTable(sheet, { headerRow: 1, lastColumn: "G", lastRow: plan.length + 1, widths: [24, 46, 18, 20, 24, 30, 40] });
  XLSX.utils.book_append_sheet(wb, sheet, "Plano de fidelização");
  const logHeaders = ["Data", "Cliente/identificador", "Permissão para mensagem", "Canal", "Ação", "Responsável", "Resultado", "Pedido para parar", "Próximo passo"];
  const log = XLSX.utils.aoa_to_sheet([logHeaders, ...Array.from({ length: 30 }, () => ["", "", "Não confirmado", "", "", "", "", "Não", ""])]);
  decorateTable(log, { headerRow: 1, lastColumn: "I", lastRow: 31, widths: [14, 26, 20, 16, 34, 24, 26, 18, 30] });
  addDataValidation(log, "A2:A31", {
    type: "date",
    operator: "between",
    formula1: "DATE(2020,1,1)",
    formula2: "DATE(2100,12,31)",
    error: "Informe uma data válida.",
  });
  addDataValidation(log, "C2:C31", {
    formula1: '"Não confirmado,Confirmado,Revogado"',
    error: "Escolha se a pessoa deu permissão, não deu ou pediu para parar.",
  });
  addDataValidation(log, "D2:D31", {
    formula1: '"WhatsApp,E-mail,Telefone,Presencial"',
    error: "Escolha um canal válido.",
  });
  addDataValidation(log, "H2:H31", {
    formula1: '"Não,Sim"',
    error: "Escolha Sim ou Não.",
  });
  markInputRange(log, "B2:B31 E2:G31 I2:I31");
  XLSX.utils.book_append_sheet(wb, log, "Acompanhamento");
  addQuickPanel(wb, {
    title: "Fidelização sem perder o controle",
    question: "Veja quantos contatos têm permissão, quantos pediram saída e quanto já foi registrado.",
    metrics: [
      { label: "PERMISSÃO OK", formula: `COUNTIF(Acompanhamento!$C$2:$C$31,"Confirmado")`, description: "contatos liberados", format: "0" },
      { label: "PEDIRAM SAÍDA", formula: `COUNTIF(Acompanhamento!$H$2:$H$31,"Sim")`, description: "não devem receber divulgação", format: "0" },
      { label: "AÇÕES REGISTRADAS", formula: `COUNTA(Acompanhamento!$A$2:$A$31)`, description: "linhas preenchidas", format: "0" },
    ],
    nextAction: "Antes de mandar qualquer divulgação, filtre Permissão para mensagem e retire todos os pedidos para parar.",
  });
  writeWorkbook("guia-fidelizacao-clientes.xlsx", wb);
}

function buildCommissions() {
  const wb = createWorkbook("Planilha de comissões da barbearia");
  addReadme(wb, {
    title: "Planilha de comissões por profissional",
    purpose: "Registre atendimentos e calcule comissões conforme regras definidas pela barbearia.",
    steps: ["Cadastre profissionais e percentuais na aba Configuração.", "Registre cada atendimento e marque o status correto.", "Confira no Resumo somente atendimentos concluídos antes de pagar."],
    notes: ["Cancelados, estornados e não elegíveis ficam fora de faturamento e comissão.", "Percentuais, vínculo, impostos, descontos e verbas devem seguir contrato e orientação contábil/trabalhista."],
  });
  const configRows = [["Profissional", "% comissão", "Fixo no período (R$)", "Regra/contrato", "Vigência", "Observações"]];
  for (let index = 0; index < 12; index += 1) {
    configRows.push(index < 3
      ? [`Profissional ${index + 1}`, [0.5, 0.45, 0.4][index], 0, "Preencher", "2026", ""]
      : ["", "", "", "", "", ""]);
  }
  const config = XLSX.utils.aoa_to_sheet(configRows);
  decorateTable(config, { headerRow: 1, lastColumn: "F", lastRow: configRows.length, widths: [24, 16, 24, 28, 14, 38] });
  for (let row = 2; row <= configRows.length; row += 1) {
    config[`B${row}`].z = "0.0%";
    config[`C${row}`].z = 'R$ #,##0.00';
  }
  addDataValidation(config, "A2:A13", {
    type: "custom",
    formula1: 'OR(A2="",COUNTIF($A$2:$A$13,A2)=1)',
    error: "Cada profissional deve aparecer apenas uma vez.",
  });
  addDataValidation(config, "B2:B13", {
    type: "decimal",
    operator: "between",
    formula1: "0",
    formula2: "1",
    error: "Informe um percentual entre 0% e 100%.",
  });
  addDataValidation(config, "C2:C13", {
    type: "decimal",
    operator: "greaterThanOrEqual",
    formula1: "0",
    error: "O valor fixo não pode ser negativo.",
  });
  markInputRange(config, "D2:F13");
  XLSX.utils.book_append_sheet(wb, config, "Configuração");
  wb.Workbook = wb.Workbook || {};
  wb.Workbook.Names = [
    ...(wb.Workbook.Names || []),
    { Name: "ListaProfissionais", Ref: "'Configuração'!$A$2:$A$13" },
  ];

  const attendanceRows = [["Data", "Profissional", "Serviço", "Valor (R$)", "% comissão", "Comissão elegível (R$)", "Status", "Observações", "Validação"]];
  const samples = [
    ["Profissional 1", "Corte", 60, "Concluído"],
    ["Profissional 2", "Corte + barba", 95, "Concluído"],
    ["Profissional 3", "Barba", 45, "Concluído"],
    ["Profissional 1", "Acabamento", 25, "Cancelado"],
    ["Profissional 2", "Tratamento", 70, "Estornado"],
    ["Profissional 3", "Atendimento não elegível", 30, "Não elegível"],
  ];
  for (let index = 0; index < 100; index += 1) {
    const row = index + 2;
    const sample = samples[index];
    attendanceRows.push([
      sample ? excelDate(2026, 7, index + 1) : "",
      sample?.[0] || "",
      sample?.[1] || "",
      sample?.[2] || "",
      { f: `IF(B${row}="","",IFERROR(VLOOKUP(B${row},'Configuração'!$A$2:$C$13,2,FALSE),""))` },
      { f: `IF(OR(B${row}="",G${row}<>"Concluído",COUNTIF('Configuração'!$A$2:$A$13,B${row})=0,NOT(ISNUMBER(E${row}))),0,D${row}*E${row})` },
      sample?.[3] || "",
      "",
      { f: `IF(B${row}="","",IF(COUNTIF('Configuração'!$A$2:$A$13,B${row})=0,"ERRO: profissional não cadastrado",IF(G${row}="Concluído","Elegível","Excluído do cálculo")))` },
    ]);
  }
  const attendance = XLSX.utils.aoa_to_sheet(attendanceRows);
  decorateTable(attendance, { headerRow: 1, lastColumn: "I", lastRow: attendanceRows.length, widths: [14, 24, 28, 16, 16, 22, 18, 30, 34] });
  for (let row = 2; row <= attendanceRows.length; row += 1) {
    attendance[`A${row}`].z = "dd/mm/yyyy";
    attendance[`D${row}`].z = 'R$ #,##0.00';
    attendance[`E${row}`].z = "0.0%";
    attendance[`F${row}`].z = 'R$ #,##0.00';
  }
  addDataValidation(attendance, "A2:A101", {
    type: "date",
    operator: "between",
    formula1: "DATE(2020,1,1)",
    formula2: "DATE(2100,12,31)",
    error: "Informe uma data válida.",
  });
  addDataValidation(attendance, "B2:B101", {
    formula1: "ListaProfissionais",
    errorTitle: "Profissional não cadastrado",
    error: "Escolha um profissional cadastrado na aba Configuração.",
    promptTitle: "Profissional",
    prompt: "Use a lista da aba Configuração.",
  });
  addDataValidation(attendance, "D2:D101", {
    type: "decimal",
    operator: "greaterThanOrEqual",
    formula1: "0",
    error: "O valor não pode ser negativo.",
  });
  addDataValidation(attendance, "G2:G101", {
    formula1: '"Concluído,Cancelado,Estornado,Não elegível"',
    error: "Escolha Concluído, Cancelado, Estornado ou Não elegível.",
  });
  markInputRange(attendance, "C2:C101 H2:H101");
  XLSX.utils.book_append_sheet(wb, attendance, "Atendimentos");

  const summaryRows = [["Profissional", "Atendimentos", "Faturamento (R$)", "Comissão variável (R$)", "Fixo (R$)", "Total a pagar (R$)"]];
  for (let index = 0; index < 12; index += 1) {
    const row = index + 2;
    summaryRows.push([
      { f: `IF('Configuração'!A${row}="","",'Configuração'!A${row})` },
      { f: `IF(A${row}="","",COUNTIFS('Atendimentos'!$B$2:$B$101,A${row},'Atendimentos'!$G$2:$G$101,"Concluído"))` },
      { f: `IF(A${row}="","",SUMIFS('Atendimentos'!$D$2:$D$101,'Atendimentos'!$B$2:$B$101,A${row},'Atendimentos'!$G$2:$G$101,"Concluído"))` },
      { f: `IF(A${row}="","",SUMIFS('Atendimentos'!$F$2:$F$101,'Atendimentos'!$B$2:$B$101,A${row},'Atendimentos'!$G$2:$G$101,"Concluído"))` },
      { f: `IF(A${row}="","",IFERROR(VLOOKUP(A${row},'Configuração'!$A$2:$C$13,3,FALSE),0))` },
      { f: `IF(A${row}="","",D${row}+E${row})` },
    ]);
  }
  summaryRows.push(["TOTAL", { f: "SUM(B2:B13)" }, { f: "SUM(C2:C13)" }, { f: "SUM(D2:D13)" }, { f: "SUM(E2:E13)" }, { f: "SUM(F2:F13)" }]);
  const summary = XLSX.utils.aoa_to_sheet(summaryRows);
  decorateTable(summary, { headerRow: 1, lastColumn: "F", lastRow: summaryRows.length, widths: [24, 18, 22, 26, 18, 22] });
  for (let row = 2; row <= summaryRows.length; row += 1) for (const col of ["C", "D", "E", "F"]) summary[`${col}${row}`].z = 'R$ #,##0.00';
  styleRange(summary, `A${summaryRows.length}:F${summaryRows.length}`, cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, border: true }));
  XLSX.utils.book_append_sheet(wb, summary, "Resumo");
  addQuickPanel(wb, {
    title: "Fechamento da equipe sem conta solta",
    question: "Confira o que foi concluído, quanto entrou e quanto deve ser pago.",
    metrics: [
      { label: "ATENDIMENTOS", formula: `Resumo!$B$${summaryRows.length}`, description: "concluídos no período", format: "0" },
      { label: "FATURAMENTO", formula: `Resumo!$C$${summaryRows.length}`, description: "somente atendimentos concluídos", format: "R$ #,##0.00" },
      { label: "TOTAL A PAGAR", formula: `Resumo!$F$${summaryRows.length}`, description: "variável + fixo", format: "R$ #,##0.00" },
    ],
    nextAction: "Confira os atendimentos excluídos e valide a linha TOTAL do Resumo antes de pagar.",
  });
  writeWorkbook("planilha-comissoes-barbearia.xlsx", wb);
}

function buildPricing() {
  const wb = createWorkbook("Planilha de precificação da barbearia");
  addReadme(wb, {
    title: "Planilha de precificação de serviços",
    purpose: "Organize custos, capacidade e margem para tomar decisões de preço com mais clareza.",
    steps: ["Troque os custos e as horas de atendimento pelos números da barbearia.", "Revise material usado e tempo de cada serviço.", "Compare o preço calculado com o preço praticado na sua região."],
    notes: ["A planilha não substitui análise contábil, tributária ou de mercado.", "Preço final deve considerar impostos, capacidade, posicionamento e realidade local."],
  });
  const costRows = [
    ["CUSTOS FIXOS MENSAIS", "Valor (R$)", "Observações"],
    ["Aluguel e condomínio", 3200, "Exemplo — substitua"],
    ["Energia, água e internet", 800, "Exemplo — substitua"],
    ["Sistemas e serviços", 500, "Exemplo — substitua"],
    ["Folha, pró-labore e encargos", 12000, "Exemplo — valide com contador"],
    ["Marketing", 700, "Exemplo — substitua"],
    ["Outros custos fixos", 800, "Exemplo — substitua"],
    ["TOTAL FIXO", { f: "SUM(B2:B7)" }, ""],
    ["Horas produtivas previstas/mês", 320, "Some as horas disponíveis da equipe; evite zero"],
    ["CUSTO FIXO POR MINUTO PRODUTIVO", { f: "IFERROR(B8/(B9*60),0)" }, "Rateio proporcional ao tempo de cada serviço"],
  ];
  const costs = XLSX.utils.aoa_to_sheet(costRows);
  decorateTable(costs, { headerRow: 1, lastColumn: "C", lastRow: costRows.length, widths: [36, 20, 42], autoFilter: false });
  for (let row = 2; row <= costRows.length; row += 1) costs[`B${row}`].z = 'R$ #,##0.00';
  costs.B9.z = "0.0";
  addDataValidation(costs, "B2:B7", {
    type: "decimal",
    operator: "greaterThanOrEqual",
    formula1: "0",
    error: "O custo não pode ser negativo.",
  });
  addDataValidation(costs, "B9", {
    type: "decimal",
    operator: "greaterThan",
    formula1: "0",
    error: "Informe uma capacidade mensal maior que zero.",
  });
  markInputRange(costs, "B2:B7 B9");
  styleRange(costs, "A8:C8", cellStyle({ fill: COLORS.cream, bold: true, border: true }));
  styleRange(costs, "A10:C10", cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, border: true }));
  XLSX.utils.book_append_sheet(wb, costs, "Custos");

  const priceRows = [["Serviço", "Tempo (min)", "Material usado (R$)", "Parte dos custos fixos", "Custo total", "Margem desejada", "Preço calculado", "Preço final", "Observações"]];
  const defaults = [["Corte", 40], ["Barba", 30], ["Corte + barba", 65], ["Acabamento", 20], ["Outro serviço", 30]];
  for (let index = 0; index < 20; index += 1) {
    const row = index + 2;
    priceRows.push([
      defaults[index]?.[0] || "",
      defaults[index]?.[1] || "",
      0,
      { f: `IF(OR(A${row}="",B${row}=""),"",'Custos'!$B$10*B${row})` },
      { f: `IF(A${row}="","",C${row}+D${row})` },
      index < defaults.length ? 0.5 : "",
      { f: `IFERROR(E${row}/(1-F${row}),0)` },
      "",
      "",
    ]);
  }
  const prices = XLSX.utils.aoa_to_sheet(priceRows);
  decorateTable(prices, { headerRow: 1, lastColumn: "I", lastRow: priceRows.length, widths: [28, 16, 18, 22, 18, 20, 20, 18, 36] });
  for (let row = 2; row <= priceRows.length; row += 1) {
    for (const col of ["C", "D", "E", "G", "H"]) prices[`${col}${row}`].z = 'R$ #,##0.00';
    prices[`F${row}`].z = "0.0%";
  }
  addDataValidation(prices, "B2:B21", {
    type: "whole",
    operator: "between",
    formula1: "1",
    formula2: "480",
    error: "Informe uma duração entre 1 e 480 minutos.",
  });
  addDataValidation(prices, "C2:C21 H2:H21", {
    type: "decimal",
    operator: "greaterThanOrEqual",
    formula1: "0",
    error: "O valor não pode ser negativo.",
  });
  addDataValidation(prices, "F2:F21", {
    type: "decimal",
    operator: "between",
    formula1: "0",
    formula2: "0.95",
    error: "Informe uma margem entre 0% e 95%.",
  });
  markInputRange(prices, "A2:C21 F2:F21 H2:I21");
  styleSqref(prices, "D2:E21 G2:G21", cellStyle({ fill: COLORS.successSoft, color: COLORS.ink, border: true }));
  XLSX.utils.book_append_sheet(wb, prices, "Precificação");
  addQuickPanel(wb, {
    title: "Seu preço precisa caber na rotina",
    question: "Use o cálculo como referência e compare com mercado, posicionamento e capacidade.",
    metrics: [
      { label: "SERVIÇOS PREENCHIDOS", formula: `COUNTIF(Precificação!$A$2:$A$21,"<>")`, description: "serviços com nome", format: "0" },
      { label: "PREÇO CALCULADO MÉDIO", formula: `IFERROR(AVERAGEIF(Precificação!$G$2:$G$21,">0"),0)`, description: "referência dos serviços cadastrados", format: "R$ #,##0.00" },
      { label: "PREÇOS FINAIS DEFINIDOS", formula: `COUNTIF(Precificação!$H$2:$H$21,">0")`, description: "decisões já registradas", format: "0" },
    ],
    nextAction: "Comece por um único serviço: preencha tempo, material usado e margem; depois registre o preço final que faz sentido.",
  });
  writeWorkbook("planilha-precificacao-barbearia.xlsx", wb);
}

function buildSchedulingChecklist() {
  const wb = createWorkbook("Checklist de agendamento pelo WhatsApp");
  addReadme(wb, {
    title: "Checklist de agendamento pelo WhatsApp",
    purpose: "Organize o atendimento para responder, oferecer horários e registrar o agendamento sem perder contexto.",
    steps: ["Defina quem responde e qual agenda vale de verdade.", "Teste agendamento, remarcação, cancelamento e pedido de ajuda.", "Registre separado quem permitiu receber ofertas."],
    whatsapp: true,
  });
  const items = [
    ["Base", "Definir o número oficial da barbearia", "Pendente", "", "", "", ""],
    ["Base", "Definir a agenda usada por cada profissional", "Pendente", "", "", "", ""],
    ["Base", "Cadastrar serviços, duração e intervalos", "Pendente", "", "", "", ""],
    ["Atendimento", "Escrever uma apresentação curta e humana", "Pendente", "", "", "", ""],
    ["Atendimento", "Perguntar serviço, profissional e dia quando necessário", "Pendente", "", "", "", ""],
    ["Atendimento", "Oferecer apenas horários realmente livres", "Pendente", "", "", "", ""],
    ["Atendimento", "Confirmar todos os detalhes antes de registrar", "Pendente", "", "", "", ""],
    ["Exceções", "Definir quando chamar uma pessoa da equipe", "Pendente", "", "", "", ""],
    ["Exceções", "Testar remarcação e cancelamento", "Pendente", "", "", "", ""],
    ["Exceções", "Testar cliente sem cadastro ou com pedido incompleto", "Pendente", "", "", "", ""],
    ["Privacidade", "Separar mensagens de serviço de campanhas", "Pendente", "", "", "", ""],
    ["Privacidade", "Registrar quem permitiu receber ofertas", "Pendente", "", "", "", ""],
    ["Privacidade", "Testar SAIR/PARAR e interromper somente divulgações", "Pendente", "", "", "", ""],
    ["Exceções", "Testar CANCELAR como pedido do agendamento, sem mexer na permissão de ofertas", "Pendente", "", "", "", ""],
    ["Qualidade", "Revisar conversa do início ao fim", "Pendente", "", "", "", ""],
    ["Qualidade", "Medir respostas, agendamentos e falhas", "Pendente", "", "", "", ""],
  ];
  const rows = [["Área", "Verificação", "Status", "Responsável", "Data", "Resultado", "Observações"], ...items];
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  decorateTable(sheet, { headerRow: 1, lastColumn: "G", lastRow: rows.length, widths: [18, 52, 16, 24, 14, 28, 38] });
  addDataValidation(sheet, `C2:C${rows.length}`, {
    formula1: '"Pendente,Em andamento,Concluído,Bloqueado"',
    error: "Escolha um status da lista.",
  });
  addDataValidation(sheet, `E2:E${rows.length}`, {
    type: "date",
    operator: "between",
    formula1: "DATE(2020,1,1)",
    formula2: "DATE(2100,12,31)",
    error: "Informe uma data válida.",
  });
  markInputRange(sheet, `D2:G${rows.length}`);
  XLSX.utils.book_append_sheet(wb, sheet, "Checklist");
  addQuickPanel(wb, {
    title: "Agendamento pronto para um dia real",
    question: "O fluxo só está pronto quando agenda, equipe e exceções funcionam juntos.",
    metrics: [
      { label: "CONCLUÍDOS", formula: `COUNTIF(Checklist!$C$2:$C$${rows.length},"Concluído")`, description: `de ${items.length} verificações`, format: "0" },
      { label: "EM ANDAMENTO", formula: `COUNTIF(Checklist!$C$2:$C$${rows.length},"Em andamento")`, description: "testes em execução", format: "0" },
      { label: "BLOQUEADOS", formula: `COUNTIF(Checklist!$C$2:$C$${rows.length},"Bloqueado")`, description: "falhas para resolver", format: "0" },
    ],
    nextAction: "Teste uma conversa completa no WhatsApp e anote no Checklist o primeiro ponto que exigiu ajuda humana.",
  });
  writeWorkbook("public/downloads/lead-magnets/checklist-agendamento-whatsapp.xlsx", wb);
  writeCsv("checklist-agendamento-whatsapp.csv", rows);
}

function buildConfirmationScripts() {
  const wb = createWorkbook("Scripts de confirmação pelo WhatsApp");
  addReadme(wb, {
    title: "Scripts de confirmação pelo WhatsApp",
    purpose: "Modelos curtos para confirmar, lembrar, remarcar e retomar um atendimento sem parecer mensagem genérica.",
    steps: ["Troque os campos entre colchetes pelos dados reais.", "Confirme horário e profissional com clareza.", "Mande ofertas somente para quem autorizou."],
    whatsapp: true,
    notes: ["Confirmação de um agendamento existente é mensagem de serviço; oferta e reativação são marketing.", "Não diga que o horário será cancelado automaticamente se essa regra não existir e não tiver sido informada."],
  });
  const templates = [
    ["Confirmação", "Serviço", "Oi, [nome]. Seu [serviço] está marcado para [dia], às [hora], com [profissional]. Está tudo certo para você?", "Resposta do cliente", "Não exige opt-in de marketing", "Equipe de atendimento"],
    ["Lembrete", "Serviço", "Oi, [nome]. Passando para lembrar do seu horário hoje, às [hora], com [profissional]. Se precisar mudar, me avise por aqui.", "Resposta do cliente", "Não exige opt-in de marketing", "Equipe de atendimento"],
    ["Remarcação", "Serviço", "Claro. Para [serviço], tenho [opção 1], [opção 2] ou [opção 3]. Qual funciona melhor?", "Novo horário escolhido", "Não exige opt-in de marketing", "Equipe de atendimento"],
    ["Cancelamento", "Serviço", "Certo, [nome]. O horário de [dia], às [hora], foi cancelado. Quando quiser remarcar, pode chamar por aqui.", "Cancelamento confirmado", "Não exige opt-in de marketing", "Equipe de atendimento"],
    ["Atraso da barbearia", "Serviço", "Oi, [nome]. Tivemos um atraso e seu atendimento deve começar por volta de [hora]. Desculpa pelo imprevisto. Esse novo horário funciona para você?", "Aceite ou remarcação", "Não exige opt-in de marketing", "Responsável do turno"],
    ["Ausência do cliente", "Serviço", "Oi, [nome]. Seu horário de hoje, às [hora], ficou registrado como não comparecimento. Está tudo bem? Se quiser, posso consultar novas opções.", "Resposta ou encerramento", "Não transformar em campanha", "Equipe de atendimento"],
    ["Pós-atendimento", "Serviço", "Oi, [nome]. Obrigado pela visita de hoje. Se precisar de qualquer ajuste, responde por aqui que a equipe te ajuda.", "Satisfação", "Evitar oferta sem permissão", "Equipe de atendimento"],
    ["Novidade autorizada", "Marketing", "Oi, [nome]. Você pediu para receber novidades da [barbearia]. [mensagem relevante]. Se não quiser mais receber, responda SAIR.", "Clique, resposta ou SAIR", "Precisa de permissão", "Responsável por marketing"],
  ];
  const rows = [["Situação", "Tipo", "Mensagem", "Resultado esperado", "Permissão para mensagem", "Responsável"], ...templates];
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  decorateTable(sheet, { headerRow: 1, lastColumn: "F", lastRow: rows.length, widths: [24, 16, 80, 28, 30, 28] });
  XLSX.utils.book_append_sheet(wb, sheet, "Scripts");
  const logRows = [["Data", "Cliente/identificador", "Mensagem", "Permissão para mensagem", "Responsável", "Resultado", "SAIR/PARAR", "Próximo passo"], ...Array.from({ length: 30 }, () => ["", "", "", "", "", "", "Não", ""])];
  const log = XLSX.utils.aoa_to_sheet(logRows);
  decorateTable(log, { headerRow: 1, lastColumn: "H", lastRow: logRows.length, widths: [14, 26, 24, 22, 24, 26, 18, 30] });
  addDataValidation(log, "A2:A31", {
    type: "date",
    operator: "between",
    formula1: "DATE(2020,1,1)",
    formula2: "DATE(2100,12,31)",
    error: "Informe uma data válida.",
  });
  addDataValidation(log, "D2:D31", {
    formula1: '"Não confirmado,Confirmado,Não se aplica,Revogado"',
    error: "Escolha se a pessoa deu permissão, não deu ou pediu para parar.",
  });
  addDataValidation(log, "G2:G31", {
    formula1: '"Não,Sim"',
    error: "Escolha Sim ou Não.",
  });
  markInputRange(log, "B2:C31 E2:F31 H2:H31");
  XLSX.utils.book_append_sheet(wb, log, "Registro de uso");
  addQuickPanel(wb, {
    title: "Mensagens que ajudam — e não confundem",
    question: "Registre o uso para saber o que foi enviado, respondido ou interrompido.",
    metrics: [
      { label: "USOS REGISTRADOS", formula: `COUNTA('Registro de uso'!$A$2:$A$31)`, description: "mensagens acompanhadas", format: "0" },
      { label: "PERMISSÃO OK", formula: `COUNTIF('Registro de uso'!$D$2:$D$31,"Confirmado")`, description: "quando a mensagem exige permissão", format: "0" },
      { label: "PEDIRAM SAÍDA", formula: `COUNTIF('Registro de uso'!$G$2:$G$31,"Sim")`, description: "pare divulgações imediatamente", format: "0" },
    ],
    nextAction: "Escolha o script pelo motivo real da conversa e registre o resultado antes de mandar outra mensagem.",
  });
  writeWorkbook("public/downloads/lead-magnets/script-confirmacao-whatsapp.xlsx", wb);
  writeCsv("script-confirmacao-whatsapp.csv", rows);
}

function buildReactivation() {
  const wb = createWorkbook("Roteiro para chamar clientes de volta");
  addReadme(wb, {
    title: "Roteiro para chamar clientes de volta",
    purpose: "Reabra conversas com clientes que autorizaram contato, com contexto e sem insistência.",
    steps: ["Selecione apenas quem permitiu receber ofertas.", "Mande uma mensagem ligada ao histórico real da pessoa.", "Registre resposta, falta de resposta e pedido para parar."],
    whatsapp: true,
    notes: ["Não use urgência falsa nem benefício que não exista.", "Uma ausência de resposta não autoriza sequência indefinida."],
  });
  const templates = [
    ["Retorno previsto", "Cliente autorizou novidades e já está no período habitual de retorno", "Oi, [nome]. Aqui é a [pessoa] da [barbearia]. Faz um tempo desde seu último [serviço]. Quer que eu veja os horários desta semana? Se não quiser mais receber mensagens, responda SAIR.", "Permissão registrada", "Resposta, agendamento ou SAIR", "Responsável comercial"],
    ["Cliente pediu para lembrar", "Cliente solicitou contato em uma data", "Oi, [nome]. Você pediu para eu te chamar nesta época para ver um novo horário. Quer que eu consulte as opções? Se preferir parar as mensagens, responda SAIR.", "Pedido do cliente", "Resposta, agendamento ou SAIR", "Responsável comercial"],
    ["Novidade relevante", "Serviço ou profissional realmente relacionado ao histórico", "Oi, [nome]. Aqui é a [pessoa] da [barbearia]. Temos [novidade] e lembrei de você por causa do seu último [serviço]. Quer saber os detalhes? Para não receber mais, responda SAIR.", "Permissão registrada", "Interesse, sem interesse ou SAIR", "Responsável comercial"],
    ["Sem resposta", "Uma única tentativa curta após a primeira mensagem", "Oi, [nome]. Só confirmando se ainda faz sentido eu te enviar opções. Se não for o momento, tudo bem. Para parar as mensagens, responda SAIR.", "Permissão registrada", "Resposta ou encerramento", "Responsável comercial"],
    ["Pedido de saída", "Cliente respondeu SAIR, PARAR ou equivalente", "Tudo certo. Você não receberá mais mensagens de divulgação da [barbearia].", "Pedido de saída", "Contato suprimido", "Responsável pelo canal"],
  ];
  const rows = [["Situação", "Quando usar", "Mensagem", "Por que pode enviar", "Resultado esperado", "Quem cuida"], ...templates];
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  decorateTable(sheet, { headerRow: 1, lastColumn: "F", lastRow: rows.length, widths: [24, 44, 90, 28, 30, 26] });
  XLSX.utils.book_append_sheet(wb, sheet, "Roteiros");
  const logRows = [["Data", "Cliente/identificador", "Permissão conferida", "Roteiro", "Responsável", "Resultado", "SAIR/PARAR", "Próxima ação"], ...Array.from({ length: 40 }, () => ["", "", "Não", "", "", "", "Não", ""])];
  const log = XLSX.utils.aoa_to_sheet(logRows);
  decorateTable(log, { headerRow: 1, lastColumn: "H", lastRow: logRows.length, widths: [14, 26, 24, 22, 24, 26, 18, 28] });
  addDataValidation(log, "A2:A41", {
    type: "date",
    operator: "between",
    formula1: "DATE(2020,1,1)",
    formula2: "DATE(2100,12,31)",
    error: "Informe uma data válida.",
  });
  addDataValidation(log, "C2:C41 G2:G41", {
    formula1: '"Não,Sim"',
    error: "Escolha Sim ou Não.",
  });
  markInputRange(log, "B2:B41 D2:F41 H2:H41");
  XLSX.utils.book_append_sheet(wb, log, "Acompanhamento");
  addQuickPanel(wb, {
    title: "Chame clientes de volta sem insistir",
    question: "Só avance com permissão registrada e pare quando a pessoa pedir ou não houver resposta.",
    metrics: [
      { label: "CONTATOS REGISTRADOS", formula: `COUNTA(Acompanhamento!$A$2:$A$41)`, description: "tentativas acompanhadas", format: "0" },
      { label: "PERMISSÃO CONFERIDA", formula: `COUNTIF(Acompanhamento!$C$2:$C$41,"Sim")`, description: "contatos liberados", format: "0" },
      { label: "PEDIRAM SAÍDA", formula: `COUNTIF(Acompanhamento!$G$2:$G$41,"Sim")`, description: "não contatar novamente", format: "0" },
    ],
    nextAction: "Escolha até cinco clientes que permitiram contato. Faça uma tentativa e registre a resposta.",
  });
  writeWorkbook("public/downloads/lead-magnets/roteiro-reativacao-clientes.xlsx", wb);
  writeCsv("roteiro-reativacao-clientes.csv", rows);
}

function buildLoyalty30Days() {
  const wb = createWorkbook("Checklist de fidelização em 30 dias");
  addReadme(wb, {
    title: "Checklist de fidelização — 30 dias",
    purpose: "Um ciclo simples para cuidar da experiência, planejar o retorno e aprender com as respostas dos clientes.",
    steps: ["Defina uma ação útil por semana.", "Separe mensagens de serviço de campanhas.", "Registre quem executou, o resultado e pedidos de saída."],
    whatsapp: true,
  });
  const actions = [
    [1, "Pós-atendimento", "Agradecer e abrir canal para ajuste", "Serviço", "Não", "Equipe", "Satisfação registrada", ""],
    [3, "Qualidade", "Revisar feedbacks e ajustes pendentes", "Interno", "Não", "Responsável da loja", "Pendências resolvidas", ""],
    [7, "Relacionamento", "Publicar dica útil baseada em dúvidas reais", "Conteúdo", "Não para envio individual", "Marketing", "Interações", ""],
    [10, "Preferências", "Atualizar serviço e profissional preferido", "Atendimento", "Não", "Equipe", "Cadastro atualizado", ""],
    [14, "Retorno", "Revisar clientes no período habitual de manutenção", "Interno", "Não", "Responsável comercial", "Lista revisada", ""],
    [15, "Contato autorizado", "Oferecer horários a quem permitiu receber mensagens", "Marketing", "Sim", "Responsável comercial", "Resposta/agendamento/SAIR", "Incluir SAIR"],
    [21, "Experiência", "Revisar tempo de espera e dúvidas recorrentes", "Interno", "Não", "Responsável da loja", "Melhoria definida", ""],
    [25, "Avaliação", "Pedir avaliação somente após experiência real", "Serviço", "Conforme contexto", "Equipe", "Avaliação ou feedback", "Sem recompensa condicionada"],
    [28, "Inativos", "Fazer uma única tentativa com quem permitiu contato", "Marketing", "Sim", "Responsável comercial", "Resposta ou encerramento", "Não insistir"],
    [30, "Fechamento", "Comparar ações, respostas, retornos e saídas", "Interno", "Não", "Gestor", "Próximo ciclo definido", ""],
  ];
  const rows = [["Dia", "Etapa", "Ação", "Tipo", "Permissão para mensagem", "Responsável", "Resultado", "Cuidado", "Status"], ...actions.map((row) => [...row, "Pendente"])];
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  decorateTable(sheet, { headerRow: 1, lastColumn: "I", lastRow: rows.length, widths: [8, 22, 48, 18, 20, 24, 28, 34, 16] });
  addDataValidation(sheet, `A2:A${rows.length}`, {
    type: "whole",
    operator: "between",
    formula1: "1",
    formula2: "30",
    error: "Informe um dia entre 1 e 30.",
  });
  addDataValidation(sheet, `E2:E${rows.length}`, {
    formula1: '"Não,Sim,Conforme contexto,Não para envio individual"',
    error: "Escolha uma condição de permissão válida.",
  });
  addDataValidation(sheet, `I2:I${rows.length}`, {
    formula1: '"Pendente,Em andamento,Concluído,Bloqueado"',
    error: "Escolha um status da lista.",
  });
  markInputRange(sheet, `F2:I${rows.length}`);
  XLSX.utils.book_append_sheet(wb, sheet, "Plano 30 dias");
  addQuickPanel(wb, {
    title: "Fidelização em passos que cabem no mês",
    question: "Não tente fazer tudo de uma vez: conclua a próxima ação e registre o resultado.",
    metrics: [
      { label: "CONCLUÍDOS", formula: `COUNTIF('Plano 30 dias'!$I$2:$I$${rows.length},"Concluído")`, description: `de ${actions.length} ações`, format: "0" },
      { label: "EM ANDAMENTO", formula: `COUNTIF('Plano 30 dias'!$I$2:$I$${rows.length},"Em andamento")`, description: "ações que já começaram", format: "0" },
      { label: "BLOQUEADOS", formula: `COUNTIF('Plano 30 dias'!$I$2:$I$${rows.length},"Bloqueado")`, description: "ações que precisam de ajuda", format: "0" },
    ],
    nextAction: "Abra o Plano 30 dias e escolha somente a primeira ação Pendente que faz sentido para esta semana.",
  });
  writeWorkbook("public/downloads/lead-magnets/checklist-fidelizacao-30-dias.xlsx", wb);
  writeCsv("checklist-fidelizacao-30-dias.csv", rows);
}

function buildCashFlow() {
  const wb = createWorkbook("Fluxo de caixa semanal");
  addReadme(wb, {
    title: "Fluxo de caixa semanal",
    purpose: "Registre entradas e saídas e acompanhe o saldo da barbearia por semana.",
    steps: ["Defina a data inicial, a quantidade de semanas e o saldo inicial na aba Configuração.", "Registre cada movimento com data sem horário e selecione Entrada ou Saída.", "Confira o resumo semanal e concilie com conta, caixa e meios de recebimento."],
    notes: ["Saldo de caixa não é lucro.", "Confira categorias, impostos e valores recebidos com seu contador."],
  });
  const configRows = [
    ["Configuração", "Valor", "Orientação"],
    ["Data inicial da primeira semana", excelDate(2026, 7, 3), "Use somente a data, sem horário"],
    ["Quantidade de semanas", 12, "Escolha de 1 a 52"],
    ["Saldo inicial (R$)", 0, "Saldo antes da primeira semana"],
  ];
  const config = XLSX.utils.aoa_to_sheet(configRows);
  decorateTable(config, { headerRow: 1, lastColumn: "C", lastRow: configRows.length, widths: [38, 22, 42], autoFilter: false });
  config.B2.z = "dd/mm/yyyy";
  config.B4.z = 'R$ #,##0.00';
  addDataValidation(config, "B2", {
    type: "date",
    operator: "between",
    formula1: "DATE(2020,1,1)",
    formula2: "DATE(2100,12,31)",
    error: "Informe uma data válida, sem horário.",
  });
  addDataValidation(config, "B3", {
    type: "whole",
    operator: "between",
    formula1: "1",
    formula2: "52",
    error: "Escolha de 1 a 52 semanas.",
  });
  addDataValidation(config, "B4", {
    type: "decimal",
    operator: "between",
    formula1: "-100000000",
    formula2: "100000000",
    error: "Informe um saldo inicial numérico.",
  });
  markInputRange(config, "B2:B4");
  XLSX.utils.book_append_sheet(wb, config, "Configuração");

  const movementRows = [["Data", "Descrição", "Categoria", "Tipo", "Forma", "Valor (R$)", "Responsável", "Comprovante/observação"]];
  for (let index = 0; index < 120; index += 1) {
    movementRows.push(index < 4
      ? [[excelDate(2026, 7, 3), "Atendimentos", "Serviços", "Entrada", "Pix", 1200, "Gestor", ""], [excelDate(2026, 7, 4), "Produtos", "Estoque", "Saída", "Pix", 280, "Gestor", ""], [excelDate(2026, 7, 5), "Atendimentos", "Serviços", "Entrada", "Cartão", 980, "Gestor", ""], [excelDate(2026, 7, 6), "Energia", "Estrutura", "Saída", "Boleto", 190, "Gestor", ""]][index]
      : ["", "", "", "", "", "", "", ""]);
  }
  const movements = XLSX.utils.aoa_to_sheet(movementRows);
  decorateTable(movements, { headerRow: 1, lastColumn: "H", lastRow: movementRows.length, widths: [14, 34, 22, 14, 18, 18, 22, 38] });
  for (let row = 2; row <= movementRows.length; row += 1) {
    movements[`A${row}`].z = "dd/mm/yyyy";
    movements[`F${row}`].z = 'R$ #,##0.00';
  }
  addDataValidation(movements, "A2:A121", {
    type: "date",
    operator: "between",
    formula1: "DATE(2020,1,1)",
    formula2: "DATE(2100,12,31)",
    error: "Informe somente uma data válida, sem horário.",
  });
  addDataValidation(movements, "C2:C121", {
    formula1: '"Serviços,Produtos,Estoque,Estrutura,Equipe,Marketing,Impostos,Outros"',
    error: "Escolha uma categoria da lista.",
  });
  addDataValidation(movements, "D2:D121", {
    formula1: '"Entrada,Saída"',
    allowBlank: false,
    error: "Escolha Entrada ou Saída.",
  });
  addDataValidation(movements, "E2:E121", {
    formula1: '"Pix,Cartão,Dinheiro,Boleto,Transferência,Outro"',
    error: "Escolha uma forma de pagamento da lista.",
  });
  addDataValidation(movements, "F2:F121", {
    type: "decimal",
    operator: "greaterThan",
    formula1: "0",
    error: "Use um valor positivo e classifique como Entrada ou Saída.",
  });
  markInputRange(movements, "B2:B121 G2:H121");
  XLSX.utils.book_append_sheet(wb, movements, "Lançamentos");

  const summaryRows = [["Semana iniciada em", "Entradas (R$)", "Saídas (R$)", "Saldo da semana", "Saldo acumulado"]];
  for (let index = 0; index < 52; index += 1) {
    const row = index + 2;
    summaryRows.push([
      { f: `IF(ROW()-1<='Configuração'!$B$3,'Configuração'!$B$2+(ROW()-2)*7,"")` },
      { f: `IF(A${row}="","",SUMIFS('Lançamentos'!$F$2:$F$121,'Lançamentos'!$D$2:$D$121,"Entrada",'Lançamentos'!$A$2:$A$121,">="&A${row},'Lançamentos'!$A$2:$A$121,"<"&A${row}+7))` },
      { f: `IF(A${row}="","",SUMIFS('Lançamentos'!$F$2:$F$121,'Lançamentos'!$D$2:$D$121,"Saída",'Lançamentos'!$A$2:$A$121,">="&A${row},'Lançamentos'!$A$2:$A$121,"<"&A${row}+7))` },
      { f: `IF(A${row}="","",B${row}-C${row})` },
      { f: row === 2
        ? `IF(A${row}="","",'Configuração'!$B$4+D${row})`
        : `IF(A${row}="","",E${row - 1}+D${row})` },
    ]);
  }
  const summary = XLSX.utils.aoa_to_sheet(summaryRows);
  decorateTable(summary, { headerRow: 1, lastColumn: "E", lastRow: summaryRows.length, widths: [22, 20, 20, 22, 22] });
  for (let row = 2; row <= summaryRows.length; row += 1) for (const col of ["B", "C", "D", "E"]) summary[`${col}${row}`].z = 'R$ #,##0.00';
  for (let row = 2; row <= summaryRows.length; row += 1) summary[`A${row}`].z = "dd/mm/yyyy";
  styleRange(summary, `A2:E${summaryRows.length}`, cellStyle({ fill: COLORS.successSoft, color: COLORS.ink, border: true }));
  styleRange(summary, "A1:E1", cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, border: true }));
  XLSX.utils.book_append_sheet(wb, summary, "Resumo semanal");
  addQuickPanel(wb, {
    title: "Seu caixa da semana sem conta de cabeça",
    question: "Registre cada movimento e confira se o saldo acumulado combina com o caixa real.",
    metrics: [
      { label: "LANÇAMENTOS", formula: `COUNTA(Lançamentos!$A$2:$A$121)`, description: "entradas e saídas registradas", format: "0" },
      { label: "ENTRADAS NO PERÍODO", formula: `SUM('Resumo semanal'!$B$2:$B$53)`, description: "soma das semanas configuradas", format: "R$ #,##0.00" },
      { label: "SALDO ACUMULADO", formula: `INDEX('Resumo semanal'!$E$2:$E$53,Configuração!$B$3)`, description: "saldo ao fim da última semana", format: "R$ #,##0.00" },
    ],
    nextAction: "Compare o saldo acumulado com banco, Pix, cartão e dinheiro. Se não bater, confira a semana mais recente.",
  });
  writeWorkbook("public/downloads/lead-magnets/fluxo-caixa-semanal-barbearia.xlsx", wb);
  writeCsv("fluxo-caixa-semanal-barbearia.csv", [
    ["Semana iniciada em (configure no XLSX)", "Entradas (R$)", "Saídas (R$)", "Saldo da semana", "Observações"],
    ...Array.from({ length: 12 }, (_, index) => [new Date(Date.UTC(2026, 7, 3 + index * 7)).toISOString().slice(0, 10), "", "", "", "Preencha no XLSX para usar as fórmulas"]),
  ]);
}

function buildRevenueGoals() {
  const wb = createWorkbook("Plano de metas de faturamento");
  addReadme(wb, {
    title: "Plano de metas de faturamento",
    purpose: "Acompanhe um mês completo e distribua a meta somente pelos dias em que a barbearia atende.",
    steps: ["Defina a meta, o mês de referência e o número de profissionais.", "Na aba Acompanhamento, marque Sim apenas nos dias de atendimento; dias fechados e folgas não recebem meta.", "Registre o faturamento realizado e revise o ritmo sem confundir faturamento com lucro."],
    notes: ["Ao trocar o mês, revise a coluna Dia de atendimento?; domingos vêm marcados como Não apenas como ponto de partida.", "Metas precisam considerar custos, capacidade, folgas e sazonalidade."],
  });
  const configRows = [
    ["Indicador", "Valor", "Observação"],
    ["Meta mensal (R$)", 20000, "Preencha"],
    ["Mês de referência", excelDate(2026, 7, 1), "Use qualquer data do mês desejado"],
    ["Dias de atendimento no mês", { f: `COUNTIFS('Acompanhamento diário'!$A$2:$A$32,"<>",'Acompanhamento diário'!$B$2:$B$32,"Sim")` }, "Calculado; dias fechados e folgas ficam fora"],
    ["Profissionais ativos", 2, "Preencha"],
    ["Meta por dia de atendimento (R$)", { f: "IFERROR(B2/B4,0)" }, "Calculada apenas sobre dias abertos"],
    ["Meta diária por profissional (R$)", { f: "IFERROR(B6/B5,0)" }, "Referência; ajuste por escala e capacidade"],
  ];
  const config = XLSX.utils.aoa_to_sheet(configRows);
  decorateTable(config, { headerRow: 1, lastColumn: "C", lastRow: configRows.length, widths: [38, 22, 34], autoFilter: false });
  for (const row of [2, 6, 7]) config[`B${row}`].z = 'R$ #,##0.00';
  config.B3.z = "mm/yyyy";
  addDataValidation(config, "B2", {
    type: "decimal",
    operator: "greaterThan",
    formula1: "0",
    error: "Informe uma meta mensal maior que zero.",
  });
  addDataValidation(config, "B3", {
    type: "date",
    operator: "between",
    formula1: "DATE(2020,1,1)",
    formula2: "DATE(2100,12,31)",
    error: "Informe uma data válida para o mês de referência.",
  });
  addDataValidation(config, "B5", {
    type: "whole",
    operator: "between",
    formula1: "1",
    formula2: "100",
    error: "Informe de 1 a 100 profissionais ativos.",
  });
  markInputRange(config, "B2:B3 B5");
  styleSqref(config, "B4 B6:B7", cellStyle({ fill: COLORS.successSoft, color: COLORS.success, bold: true, border: true }));
  XLSX.utils.book_append_sheet(wb, config, "Meta");

  const trackingRows = [["Data", "Dia de atendimento?", "Faturamento realizado (R$)", "Meta do dia (R$)", "Diferença", "% da meta", "Observações"]];
  for (let index = 0; index < 31; index += 1) {
    const row = index + 2;
    trackingRows.push([
      { f: `IF(ROW()-1<=DAY(EOMONTH('Meta'!$B$3,0)),DATE(YEAR('Meta'!$B$3),MONTH('Meta'!$B$3),ROW()-1),"")` },
      { f: `IF(A${row}="","",IF(WEEKDAY(A${row},2)=7,"Não","Sim"))` },
      "",
      { f: `IF(OR(A${row}="",B${row}<>"Sim"),0,'Meta'!$B$6)` },
      { f: `IF(OR(A${row}="",B${row}<>"Sim",C${row}=""),"",C${row}-D${row})` },
      { f: `IF(OR(D${row}=0,C${row}=""),"",C${row}/D${row})` },
      "",
    ]);
  }
  trackingRows.push(["TOTAL", "", { f: "SUM(C2:C32)" }, { f: "'Meta'!$B$2" }, { f: "C33-D33" }, { f: "IFERROR(C33/D33,0)" }, ""]);
  const tracking = XLSX.utils.aoa_to_sheet(trackingRows);
  decorateTable(tracking, { headerRow: 1, lastColumn: "G", lastRow: trackingRows.length, widths: [16, 22, 26, 22, 20, 16, 38] });
  for (let row = 2; row <= trackingRows.length; row += 1) {
    if (row < trackingRows.length) tracking[`A${row}`].z = "dd/mm/yyyy";
    for (const col of ["C", "D", "E"]) tracking[`${col}${row}`].z = 'R$ #,##0.00';
    tracking[`F${row}`].z = "0.0%";
  }
  addDataValidation(tracking, "B2:B32", {
    formula1: '"Sim,Não"',
    error: "Escolha Sim para dias de atendimento e Não para dias fechados ou folgas.",
    promptTitle: "Dia de atendimento",
    prompt: "Dias marcados como Não não reduzem o resultado da meta diária.",
  });
  addDataValidation(tracking, "C2:C32", {
    type: "decimal",
    operator: "greaterThanOrEqual",
    formula1: "0",
    error: "O faturamento não pode ser negativo.",
  });
  markInputRange(tracking, "G2:G32");
  XLSX.utils.book_append_sheet(wb, tracking, "Acompanhamento diário");
  styleRange(tracking, `A${trackingRows.length}:G${trackingRows.length}`, cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, border: true }));
  addQuickPanel(wb, {
    title: "A meta do mês sem pressão cega",
    question: "Compare o realizado com a meta somente nos dias em que a barbearia atende.",
    metrics: [
      { label: "FATURAMENTO REALIZADO", formula: `'Acompanhamento diário'!$C$33`, description: "registrado até agora", format: "R$ #,##0.00" },
      { label: "META DO MÊS", formula: `Meta!$B$2`, description: "valor definido por você", format: "R$ #,##0.00" },
      { label: "% DA META", formula: `'Acompanhamento diário'!$F$33`, description: "ritmo do mês", format: "0%" },
    ],
    nextAction: "Preencha apenas o faturamento dos dias já fechados e use a diferença para escolher uma ação desta semana.",
  });
  writeWorkbook("public/downloads/lead-magnets/plano-metas-faturamento.xlsx", wb);
  writeCsv("plano-metas-faturamento.csv", [["Meta mensal (R$)", "Mês de referência", "Dias de atendimento no mês", "Profissionais", "Meta por dia aberto"], [20000, "2026-08", "Configure Sim/Não no XLSX", 2, "Use o XLSX para calcular"]]);
}

function buildCombos() {
  const wb = createWorkbook("Planilha de combos e ticket médio");
  addReadme(wb, {
    title: "Planilha de combos e ticket médio",
    purpose: "Compare preço individual, desconto, custo e margem antes de lançar um combo.",
    steps: ["Cadastre serviços e preços individuais.", "Informe preço, custo e vendas previstas do combo.", "Confira desconto, margem e faturamento projetado antes de decidir."],
    notes: ["Não prometa economia se o preço individual não for real.", "Valide margem, impostos e capacidade antes de divulgar."],
  });
  const rows = [["Combo", "Soma individual (R$)", "Preço do combo (R$)", "Desconto", "Custo unitário estimado (R$)", "Margem unitária (R$)", "Margem unitária (%)", "Vendas previstas", "Faturamento projetado (R$)", "Margem projetada (R$)", "Status"]];
  const examples = [["Corte + barba", 105, 95, 30, 20], ["Corte + acabamento", 80, 75, 20, 15], ["Barba + tratamento", 85, 78, 26, 12]];
  for (let index = 0; index < 20; index += 1) {
    const row = index + 2;
    rows.push([
      examples[index]?.[0] || "",
      examples[index]?.[1] || "",
      examples[index]?.[2] || "",
      { f: `IFERROR(1-C${row}/B${row},0)` },
      examples[index]?.[3] || "",
      { f: `IF(A${row}="","",C${row}-E${row})` },
      { f: `IFERROR(F${row}/C${row},0)` },
      examples[index]?.[4] || "",
      { f: `IF(A${row}="","",C${row}*H${row})` },
      { f: `IF(A${row}="","",F${row}*H${row})` },
      { f: `IF(A${row}="","",IF(AND(C${row}>0,F${row}>0,H${row}>0),"Pronto para testar","Revisar preço, custo ou volume"))` },
    ]);
  }
  rows.push(["TOTAL PROJETADO", "", "", "", "", "", { f: "IFERROR(J22/I22,0)" }, { f: "SUM(H2:H21)" }, { f: "SUM(I2:I21)" }, { f: "SUMPRODUCT(F2:F21,H2:H21)" }, ""]);
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  decorateTable(sheet, { headerRow: 1, lastColumn: "K", lastRow: rows.length, widths: [28, 22, 22, 16, 24, 22, 18, 20, 26, 26, 30] });
  for (let row = 2; row <= rows.length; row += 1) {
    for (const col of ["B", "C", "E", "F", "I", "J"]) sheet[`${col}${row}`].z = 'R$ #,##0.00';
    for (const col of ["D", "G"]) sheet[`${col}${row}`].z = "0.0%";
  }
  addDataValidation(sheet, "B2:C21 E2:E21", {
    type: "decimal",
    operator: "greaterThanOrEqual",
    formula1: "0",
    error: "O valor não pode ser negativo.",
  });
  addDataValidation(sheet, "H2:H21", {
    type: "whole",
    operator: "greaterThanOrEqual",
    formula1: "0",
    error: "Informe uma quantidade inteira igual ou maior que zero.",
  });
  markInputRange(sheet, "A2:C21 E2:E21 H2:H21");
  styleSqref(sheet, "D2:D21 F2:G21 I2:K21", cellStyle({ fill: COLORS.successSoft, color: COLORS.ink, border: true }));
  styleRange(sheet, `A${rows.length}:K${rows.length}`, cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, border: true }));
  XLSX.utils.book_append_sheet(wb, sheet, "Combos");
  addQuickPanel(wb, {
    title: "Combos que vendem sem comer sua margem",
    question: "Compare desconto, custo e volume antes de divulgar qualquer oferta.",
    metrics: [
      { label: "PRONTOS PARA TESTAR", formula: `COUNTIF(Combos!$K$2:$K$21,"Pronto para testar")`, description: "combos com preço, custo e volume", format: "0" },
      { label: "FATURAMENTO PROJETADO", formula: `Combos!$I$${rows.length}`, description: "se o volume previsto acontecer", format: "R$ #,##0.00" },
      { label: "MARGEM PROJETADA", formula: `Combos!$J$${rows.length}`, description: "antes de impostos e outros custos", format: "R$ #,##0.00" },
    ],
    nextAction: "Teste um único combo por vez. Se o status pedir revisão, ajuste preço, custo ou quantidade antes de divulgar.",
  });
  writeWorkbook("public/downloads/lead-magnets/planilha-combos-ticket-medio.xlsx", wb);
  writeCsv("planilha-combos-ticket-medio.csv", [["Combo", "Soma individual (R$)", "Preço do combo (R$)", "Custo estimado (R$)", "Vendas previstas", "Observações"], ...examples.map(([combo, individual, comboPrice, cost, sales]) => [combo, individual, comboPrice, cost, sales, "Use o XLSX para calcular desconto e margem"])]);
}

function buildTicketCalculator() {
  const wb = createWorkbook("Calculadora de ticket médio");
  addReadme(wb, {
    title: "Calculadora de ticket médio",
    purpose: "Entenda quanto cada atendimento gera em média e quais serviços formam o faturamento.",
    steps: ["Informe quantidade e preço médio por serviço.", "Informe o número total de atendimentos únicos do período.", "Compare ticket atual e meta sem confundir faturamento com lucro."],
    notes: ["Um mesmo cliente pode comprar mais de um serviço; use o total de atendimentos únicos no campo indicado.", "A planilha não projeta demanda futura."],
  });
  const rows = [["Serviço", "Quantidade", "Preço médio (R$)", "Faturamento (R$)", "% do faturamento"]];
  const examples = [["Corte", 80, 60], ["Barba", 30, 45], ["Corte + barba", 40, 95], ["Acabamento", 15, 25], ["Produtos", 12, 40]];
  for (let index = 0; index < 30; index += 1) {
    const row = index + 2;
    rows.push([
      examples[index]?.[0] || "",
      examples[index]?.[1] || "",
      examples[index]?.[2] || "",
      { f: `IF(A${row}="","",B${row}*C${row})` },
      { f: `IFERROR(D${row}/$D$32,0)` },
    ]);
  }
  rows.push(["TOTAL", { f: "SUM(B2:B31)" }, "", { f: "SUM(D2:D31)" }, 1]);
  rows.push(["Atendimentos únicos", 140, "", "", "Preencha"]);
  rows.push(["Ticket médio atual", "", "", { f: "IFERROR(D32/B33,0)" }, "Faturamento ÷ atendimentos únicos"]);
  rows.push(["Meta de ticket médio", "", "", 75, "Preencha"]);
  rows.push(["Diferença para a meta", "", "", { f: "D35-D34" }, "Valor por atendimento"]);
  rows.push(["Faturamento na meta", "", "", { f: "B33*D35" }, "Mantendo a quantidade de atendimentos"]);
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  decorateTable(sheet, { headerRow: 1, lastColumn: "E", lastRow: rows.length, widths: [30, 18, 22, 24, 38] });
  for (let row = 2; row <= rows.length; row += 1) {
    for (const col of ["C", "D"]) if (sheet[`${col}${row}`]) sheet[`${col}${row}`].z = 'R$ #,##0.00';
    if (row <= 32 && sheet[`E${row}`]) sheet[`E${row}`].z = "0.0%";
  }
  addDataValidation(sheet, "B2:B31 B33", {
    type: "whole",
    operator: "greaterThanOrEqual",
    formula1: "0",
    error: "Informe uma quantidade inteira igual ou maior que zero.",
  });
  addDataValidation(sheet, "C2:C31 D35", {
    type: "decimal",
    operator: "greaterThanOrEqual",
    formula1: "0",
    error: "Informe um valor igual ou maior que zero.",
  });
  markInputRange(sheet, "A2:C31 B33 D35");
  styleSqref(sheet, "D2:E34 D36:E37", cellStyle({ fill: COLORS.successSoft, color: COLORS.ink, border: true }));
  styleRange(sheet, "A32:E32", cellStyle({ fill: COLORS.ink, color: COLORS.cream, bold: true, border: true }));
  styleRange(sheet, "A34:E37", cellStyle({ fill: COLORS.cream, bold: true, border: true }));
  XLSX.utils.book_append_sheet(wb, sheet, "Calculadora");
  addQuickPanel(wb, {
    title: "Quanto cada atendimento deixa no caixa",
    question: "Veja o ticket atual, compare com a meta e escolha um serviço para trabalhar primeiro.",
    metrics: [
      { label: "TICKET ATUAL", formula: `Calculadora!$D$34`, description: "faturamento ÷ atendimentos", format: "R$ #,##0.00" },
      { label: "META DE TICKET", formula: `Calculadora!$D$35`, description: "valor definido por você", format: "R$ #,##0.00" },
      { label: "FALTA POR ATENDIMENTO", formula: `Calculadora!$D$36`, description: "diferença para a meta", format: "R$ #,##0.00" },
    ],
    nextAction: "Escolha um serviço complementar real e calcule quantos clientes precisam aceitá-lo para reduzir a diferença.",
  });
  writeWorkbook("public/downloads/lead-magnets/calculadora-ticket-medio.xlsx", wb);
  writeCsv("calculadora-ticket-medio.csv", [["Serviço", "Quantidade", "Preço médio (R$)", "Observações"], ...examples.map(([service, quantity, price]) => [service, quantity, price, "Use o XLSX para calcular faturamento e participação"])]);
}

const reels = [
  [1, "Reels", "Horário no meio do corte", "O cliente pergunta “tem horário hoje?” bem na hora que você está terminando um degradê.", "Mostre a tela chegando, continue o corte e explique como você organiza a resposta sem largar o cliente.", "Conta aqui: quem responde o WhatsApp na sua barbearia?", "/recursos/guias/guia-definitivo-agendamento", "Cena real do atendimento; sem encenar pressa."],
  [2, "Stories", "Agenda do dia", "Antes de abrir, olha o que precisa estar conferido.", "Mostre horários, profissionais e encaixes em três telas curtas.", "Salve este checklist.", "/recursos/materiais", "Use texto grande e uma ideia por story."],
  [3, "Reels", "Cliente sem resposta", "Quantos pedidos de horário ficam para depois quando a casa enche?", "Conte uma situação real e mostre o processo que evita esquecer a conversa.", "Manda para o sócio que vive com o celular na mão.", "/recursos/guias/guia-definitivo-agendamento", "Fale como conversa, sem prometer agenda cheia."],
  [4, "Carrossel", "Remarcação sem confusão", "Remarcar não precisa virar dez mensagens.", "Mostre: confirmar pedido, consultar opção, registrar novo horário.", "Baixe o script e adapte.", "/recursos/materiais", "Use prints anonimizados ou mockups da própria operação."],
  [5, "Reels", "Ticket médio", "Barbearia cheia e faturamento travado? Olhe o ticket antes de mexer no preço.", "Explique quantidade, preço médio e mix de serviços com um exemplo simples.", "Use a calculadora gratuita.", "/recursos/materiais", "Não apresente projeção como resultado garantido."],
  [6, "Stories", "Enquete de serviço", "O que seus clientes pedem junto com o corte?", "Abra enquete com duas opções reais e explique que a resposta ajuda a montar combos.", "Vote aqui.", "/recursos/guias/aumentar-ticket-medio", "Evite opção que a casa não oferece."],
  [7, "Reels", "Combo bem montado", "Desconto sozinho não faz um combo ser bom.", "Compare soma individual, preço do combo, custo e margem.", "Baixe a planilha antes de divulgar.", "/recursos/materiais", "Mostre números legíveis e realistas."],
  [8, "Carrossel", "Preço do serviço", "Seu preço cobre custo, tempo e margem?", "Separe custo fixo, material usado, horas disponíveis e posicionamento.", "Use a planilha de precificação.", "/recursos/materiais", "Inclua aviso para validar com contador."],
  [9, "Reels", "Faturamento não é lucro", "Entrou dinheiro no caixa. Isso não quer dizer que sobrou.", "Mostre entradas, saídas e saldo semanal em uma situação cotidiana.", "Baixe o fluxo de caixa.", "/recursos/guias/controle-financeiro-barbearia", "Não dê aconselhamento contábil individual."],
  [10, "Stories", "Fechamento semanal", "Três números para olhar antes de começar outra semana.", "Mostre faturamento, ticket e horários ociosos.", "Qual deles você já acompanha?", "/recursos/materiais", "Use dados anonimizados."],
  [11, "Reels", "Comissão", "Comissão anotada em papel vira discussão no fechamento.", "Mostre registro por atendimento, regra definida e resumo por profissional.", "Pegue a planilha gratuita.", "/recursos/guias/gerenciamento-equipe", "Não trate regra trabalhista como universal."],
  [12, "Carrossel", "Horário por profissional", "A barbearia abre no mesmo horário, mas cada barbeiro pode ter a própria agenda.", "Mostre escala geral, exceção individual e folga.", "Salve para revisar com a equipe.", "/recursos/guias/escala-equipe", "Use exemplos claros, não interface inventada."],
  [13, "Reels", "Atraso", "O atraso fica pior quando o cliente descobre só na cadeira.", "Mostre como avisar, oferecer opção e registrar a decisão.", "Baixe os scripts de atendimento.", "/recursos/materiais", "Priorize transparência, não culpa."],
  [14, "Stories", "Caixa de perguntas", "Qual parte da gestão mais toma seu tempo hoje?", "Abra caixa: agenda, equipe, caixa ou clientes.", "Responde aqui.", "/recursos", "Use as respostas para pautas futuras."],
  [15, "Reels", "Cliente que sumiu", "Reativar cliente não é mandar promoção para todo mundo.", "Explique permissão, contexto e uma tentativa relevante.", "Veja o roteiro responsável.", "/recursos/materiais", "Mostre a opção SAIR na tela."],
  [16, "Carrossel", "Fidelização", "Fidelização começa no atendimento, não no cupom.", "Mostre pós-atendimento, previsão de retorno e preferência registrada.", "Baixe o plano de 30 dias.", "/recursos/guias/fidelizacao-clientes", "Não use estatística sem fonte."],
  [17, "Reels", "No-show", "Silêncio no WhatsApp não é motivo para inventar cancelamento automático.", "Explique lembrete, resposta clara e registro de ausência.", "Use o fluxo de confirmação.", "/recursos/guias/reduzindo-faltas", "Não crie política que a barbearia não pratica."],
  [18, "Stories", "Bastidor da agenda", "O que acontece entre a mensagem e o horário marcado?", "Mostre consulta, escolha e confirmação em três partes.", "Quer ver o fluxo completo?", "/recursos/guias/guia-definitivo-agendamento", "Anonimize nomes e telefones."],
  [19, "Reels", "Um número ou vários", "Sua equipe atende no mesmo WhatsApp ou cada profissional usa o próprio número?", "Mostre os dois cenários e o custo de perder o histórico.", "Conta como funciona aí.", "/recursos/guias/gerenciamento-equipe", "Pergunta real, sem induzir resposta."],
  [20, "Carrossel", "Cadastro de clientes", "Nome e telefone não contam a história toda.", "Mostre preferência, último serviço, profissional e permissão de contato.", "Revise seu cadastro.", "/recursos/guias/fidelizacao-clientes", "Minimize dados e respeite privacidade."],
  [21, "Reels", "Meta mensal", "Meta que fica só no mês não ajuda a decidir hoje.", "Quebre em semana, dia e profissional; depois compare com capacidade.", "Baixe o plano de metas.", "/recursos/materiais", "Não prometa que a meta será atingida."],
  [22, "Stories", "Horário ocioso", "Qual período mais sobra na sua agenda?", "Use enquete manhã, tarde ou noite e explique como medir.", "Vote e confira sua agenda.", "/recursos/guias/reduzindo-faltas", "Evite falsa escassez."],
  [23, "Reels", "Atendimento solo", "Quando você atende sozinho, cada interrupção pesa.", "Mostre corte, mensagem chegando e a rotina organizada para responder depois ou automatizar com segurança.", "Baixe o checklist.", "/recursos/materiais", "Não diga que tecnologia substitui cuidado humano."],
  [24, "Carrossel", "Abertura de barbearia", "O letreiro não é o primeiro passo.", "Organize planejamento, licença, operação, equipe e caixa.", "Use o checklist de abertura.", "/recursos/materiais", "Reforce que regras variam por município."],
  [25, "Reels", "Avaliação", "Pedir avaliação funciona melhor quando a experiência está fresca.", "Mostre como pedir feedback real sem oferecer recompensa condicionada.", "Salve o roteiro.", "/recursos/guias/fidelizacao-clientes", "Use avaliações verdadeiras e autorizadas."],
  [26, "Stories", "Dúvida do cliente", "“Tem vaga com quem faz degradê?”", "Mostre como serviço, profissional e horário precisam conversar.", "Qual pergunta mais chega aí?", "/recursos/guias/guia-definitivo-agendamento", "Use pergunta comum da própria equipe."],
  [27, "Reels", "Relatório útil", "Relatório bonito não resolve nada se ninguém toma uma decisão.", "Escolha um número, mostre o que ele indica e uma ação possível.", "Qual decisão você precisa tomar esta semana?", "/recursos/guias/relatorios-metricas", "Não sobrecarregue a tela."],
  [28, "Carrossel", "Rotina da equipe", "Quem confirma, quem remarca e quem resolve exceção?", "Defina responsável por etapa e prazo de resposta.", "Faça esta revisão com a equipe.", "/recursos/guias/gerenciamento-equipe", "Deixe papéis claros, sem microgerenciar."],
  [29, "Reels", "Atendimento pelo WhatsApp", "O cliente não quer aprender seu processo. Ele só quer um horário claro.", "Mostre uma conversa curta: pedido, opções, escolha e confirmação.", "Veja o checklist completo.", "/recursos/materiais", "Use linguagem natural e uma pergunta por vez."],
  [30, "Reels", "Fechamento do mês", "Antes de correr atrás de mais cliente, entenda o mês que acabou.", "Compare atendimentos, faturamento, ticket, retorno e horários ociosos.", "Baixe o kit de gestão e escolha um ponto para melhorar.", "/recursos/materiais", "Feche com ação concreta, não com promessa genérica."],
];

function buildReels() {
  const wb = createWorkbook("Roteiros de Shorts e Reels para 30 dias");
  addReadme(wb, {
    title: "Roteiros de Shorts e Reels — 30 dias",
    purpose: "Trinta ideias completas para falar com donos de barbearia sem voz engessada, promessa vazia ou conteúdo genérico.",
    steps: ["Escolha a pauta que combina com uma situação real da sua barbearia.", "Grave o gancho em uma frase e mostre uma prova visual.", "Termine com uma ação simples: comentar, salvar, conversar ou baixar o material."],
    notes: ["Use clientes e dados somente com autorização.", "Não apresente exemplo, projeção ou simulação como resultado comprovado."],
  });
  const rows = [
    ["Dia", "Formato", "Tema", "Gancho", "Desenvolvimento", "CTA", "Página base", "Direção de gravação", "Meu status"],
    ...reels.map((row) => [...row, "Não comecei"]),
  ];
  const guideSource = fs.readFileSync(path.join(ROOT, "data", "guides.ts"), "utf8");
  const validRoutes = new Set([
    "/recursos",
    "/recursos/materiais",
    ...Array.from(guideSource.matchAll(/path:\s*"([^"]+)"/g), (match) => match[1]),
  ]);
  const invalidRoutes = reels.map((row) => row[6]).filter((route) => !validRoutes.has(route));
  if (invalidRoutes.length) throw new Error(`Rotas inexistentes nos roteiros: ${[...new Set(invalidRoutes)].join(", ")}`);
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  decorateTable(sheet, { headerRow: 1, lastColumn: "I", lastRow: rows.length, widths: [8, 14, 26, 60, 72, 38, 38, 48, 18] });
  addDataValidation(sheet, "A2:A31", {
    type: "whole",
    operator: "between",
    formula1: "1",
    formula2: "30",
    error: "Informe um dia entre 1 e 30.",
  });
  addDataValidation(sheet, "B2:B31", {
    formula1: '"Reels,Stories,Carrossel"',
    error: "Escolha Reels, Stories ou Carrossel.",
  });
  addDataValidation(sheet, "I2:I31", {
    formula1: '"Não comecei,Separado,Gravado,Publicado"',
    error: "Escolha Não comecei, Separado, Gravado ou Publicado.",
  });
  addConditionalFormatting(sheet, "I2:I31", [
    { text: "Publicado", style: "success" },
    { text: "Gravado", style: "success" },
    { text: "Separado", style: "warning" },
  ]);
  XLSX.utils.book_append_sheet(wb, sheet, "30 roteiros");
  addQuickPanel(wb, {
    title: "Trinta ideias, uma gravação por vez",
    question: "Escolha a pauta que combina com uma situação real desta semana.",
    metrics: [
      { label: "ROTEIROS PUBLICADOS", formula: `COUNTIF('30 roteiros'!$I$2:$I$31,"Publicado")`, description: "conteúdos que já foram ao ar", format: "0" },
      { label: "IDEIAS DE REELS", formula: `COUNTIF('30 roteiros'!$B$2:$B$31,"Reels")`, description: "vídeos curtos para gravar", format: "0" },
      { label: "PÁGINAS DE APOIO", formula: `COUNTA('30 roteiros'!$G$2:$G$31)`, description: "links para aprofundar o tema", format: "0" },
    ],
    nextAction: "Escolha uma cena que realmente aconteceu, grave o gancho em uma frase e mostre uma prova visual.",
  });
  writeWorkbook("public/downloads/lead-magnets/roteiros-shorts-reels-30-dias.xlsx", wb);
  writeCsv("roteiros-shorts-reels-30-dias.csv", rows);
}

const builders = [
  buildInstagramCalendar,
  buildOpeningChecklist,
  buildLoyaltyGuide,
  buildCommissions,
  buildPricing,
  buildSchedulingChecklist,
  buildConfirmationScripts,
  buildReactivation,
  buildLoyalty30Days,
  buildCashFlow,
  buildRevenueGoals,
  buildCombos,
  buildTicketCalculator,
  buildReels,
];

for (const build of builders) build();

const recalc = recalculateWorkbooksWithLibreOffice(GENERATED_WORKBOOKS);
const audit = auditGeneratedWorkbooks(GENERATED_WORKBOOKS);
const businessRules = auditBusinessRules();
console.log(`Materiais gerados: ${builders.length} XLSX e 9 exports CSV em ${DOWNLOADS}`);
console.log(`Recálculo LibreOffice: ${recalc.recalculated} recalculados; ${recalc.skipped} sem recálculo.`);
console.log(`Auditoria: ${audit.reduce((total, row) => total + row.formulas, 0)} fórmulas; ${audit.reduce((total, row) => total + row.validacoes, 0)} validações de dados.`);
console.log("Regras auditadas:", businessRules);
