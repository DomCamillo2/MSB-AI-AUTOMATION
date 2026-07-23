import {
  CONSEQUENCE_OPTIONS,
  EFFORT_OPTIONS,
  FREQUENCY_OPTIONS,
  HUMAN_DECISION_OPTIONS,
  INPUT_OPTIONS,
  PROBLEM_OPTIONS,
  STANDARDIZATION_OPTIONS,
  VOLUME_OPTIONS,
  getAreaConfig,
  optionLabel
} from './automation-check-config.ts';
import type { AutomationAssessment, CheckAnswers, WorkflowNode } from './automation-check-types.ts';

type PdfFont = 'regular' | 'bold' | 'italic' | 'boldItalic';
type PdfColor = readonly [number, number, number];

type EmbeddedJpeg = {
  data: Uint8Array;
  width: number;
  height: number;
};

type PdfBuildOptions = {
  createdAt?: Date;
  brandImage?: EmbeddedJpeg | null;
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_MARGIN = 43;
const FOOTER_TOP = 802;

const NAVY = [7, 27, 58] as const;
const NAVY_SOFT = [18, 49, 82] as const;
const TEAL = [0, 132, 137] as const;
const TEAL_BRIGHT = [96, 206, 207] as const;
const INK = [43, 53, 58] as const;
const MUTED = [91, 105, 111] as const;
const BORDER = [204, 216, 216] as const;
const PAPER = [250, 249, 245] as const;
const MIST = [237, 245, 244] as const;
const WHITE = [255, 255, 255] as const;
const CAUTION = [191, 113, 41] as const;

const FONT_RESOURCE: Record<PdfFont, string> = {
  regular: 'F1',
  bold: 'F2',
  italic: 'F3',
  boldItalic: 'F4'
};

const textReplacements: Record<string, string> = {
  '\u2010': '-',
  '\u2011': '-',
  '\u2012': '-',
  '\u2013': '-',
  '\u2014': '-',
  '\u2018': "'",
  '\u2019': "'",
  '\u201a': ',',
  '\u201c': '"',
  '\u201d': '"',
  '\u2022': '-',
  '\u2026': '...',
  '\u2192': '>',
  '\u00a0': ' ',
  '\u202f': ' '
};

function number(value: number) {
  return Number(value.toFixed(3)).toString();
}

function pdfColor(color: PdfColor) {
  return color.map((channel) => number(channel / 255)).join(' ');
}

function normalizePdfText(value: string) {
  return Array.from(value.replace(/\r/g, '')).map((character) => {
    if (textReplacements[character]) return textReplacements[character];
    const code = character.charCodeAt(0);
    if (code >= 32 && code <= 255) return character;
    const decomposed = character.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    return Array.from(decomposed).filter((part) => {
      const partCode = part.charCodeAt(0);
      return partCode >= 32 && partCode <= 255;
    }).join('') || '?';
  }).join('');
}

function pdfString(value: string) {
  const normalized = normalizePdfText(value);
  let result = '';

  for (const character of normalized) {
    const code = character.charCodeAt(0);
    if (character === '\\' || character === '(' || character === ')') {
      result += `\\${character}`;
    } else if (code < 32 || code > 126) {
      result += `\\${code.toString(8).padStart(3, '0')}`;
    } else {
      result += character;
    }
  }

  return `(${result})`;
}

function characterWidth(character: string, font: PdfFont) {
  if (character === ' ') return 0.28;
  if ('ilI.,:;!|\'`'.includes(character)) return 0.27;
  if ('mwMW@%&'.includes(character)) return 0.84;
  if ('frt()[]{}'.includes(character)) return 0.37;
  if (/[A-ZÄÖÜ0-9]/.test(character)) return 0.62;
  const base = 0.51;
  return font === 'bold' || font === 'boldItalic' ? base * 1.04 : base;
}

function measureText(value: string, size: number, font: PdfFont) {
  return Array.from(normalizePdfText(value)).reduce((sum, character) => sum + characterWidth(character, font), 0) * size;
}

function splitLongWord(word: string, maxWidth: number, size: number, font: PdfFont) {
  const chunks: string[] = [];
  let chunk = '';

  for (const character of word) {
    const next = `${chunk}${character}`;
    if (chunk && measureText(next, size, font) > maxWidth) {
      chunks.push(chunk);
      chunk = character;
    } else {
      chunk = next;
    }
  }

  if (chunk) chunks.push(chunk);
  return chunks;
}

function wrapText(value: string, maxWidth: number, size: number, font: PdfFont) {
  const lines: string[] = [];
  const paragraphs = normalizePdfText(value).split('\n');

  paragraphs.forEach((paragraph, paragraphIndex) => {
    const words = paragraph.trim().split(/\s+/).filter(Boolean).flatMap((word) => (
      measureText(word, size, font) > maxWidth ? splitLongWord(word, maxWidth, size, font) : [word]
    ));
    let line = '';

    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && measureText(candidate, size, font) > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }

    if (line || !paragraph.trim()) lines.push(line);
    if (paragraphIndex < paragraphs.length - 1 && paragraph.trim()) lines.push('');
  });

  return lines.length ? lines : [''];
}

function truncateLine(value: string, maxWidth: number, size: number, font: PdfFont) {
  const suffix = '...';
  let result = value;
  while (result && measureText(`${result}${suffix}`, size, font) > maxWidth) {
    result = result.slice(0, -1).trimEnd();
  }
  return `${result}${suffix}`;
}

class PdfPageCanvas {
  private commands: string[] = [];

  get content() {
    return this.commands.join('\n');
  }

  save() {
    this.commands.push('q');
  }

  restore() {
    this.commands.push('Q');
  }

  rect(x: number, top: number, width: number, height: number, fill?: PdfColor, stroke?: PdfColor, lineWidth = 1) {
    this.save();
    if (fill) this.commands.push(`${pdfColor(fill)} rg`);
    if (stroke) this.commands.push(`${pdfColor(stroke)} RG`, `${number(lineWidth)} w`);
    this.commands.push(`${number(x)} ${number(PAGE_HEIGHT - top - height)} ${number(width)} ${number(height)} re`);
    this.commands.push(fill && stroke ? 'B' : fill ? 'f' : 'S');
    this.restore();
  }

  roundRect(x: number, top: number, width: number, height: number, radius: number, fill?: PdfColor, stroke?: PdfColor, lineWidth = 1) {
    const bottom = PAGE_HEIGHT - top - height;
    const right = x + width;
    const upper = bottom + height;
    const r = Math.min(radius, width / 2, height / 2);
    const k = r * 0.5522847498;

    this.save();
    if (fill) this.commands.push(`${pdfColor(fill)} rg`);
    if (stroke) this.commands.push(`${pdfColor(stroke)} RG`, `${number(lineWidth)} w`);
    this.commands.push(
      `${number(x + r)} ${number(bottom)} m`,
      `${number(right - r)} ${number(bottom)} l`,
      `${number(right - r + k)} ${number(bottom)} ${number(right)} ${number(bottom + r - k)} ${number(right)} ${number(bottom + r)} c`,
      `${number(right)} ${number(upper - r)} l`,
      `${number(right)} ${number(upper - r + k)} ${number(right - r + k)} ${number(upper)} ${number(right - r)} ${number(upper)} c`,
      `${number(x + r)} ${number(upper)} l`,
      `${number(x + r - k)} ${number(upper)} ${number(x)} ${number(upper - r + k)} ${number(x)} ${number(upper - r)} c`,
      `${number(x)} ${number(bottom + r)} l`,
      `${number(x)} ${number(bottom + r - k)} ${number(x + r - k)} ${number(bottom)} ${number(x + r)} ${number(bottom)} c`,
      'h',
      fill && stroke ? 'B' : fill ? 'f' : 'S'
    );
    this.restore();
  }

  circle(centerX: number, centerTop: number, radius: number, fill?: PdfColor, stroke?: PdfColor, lineWidth = 1) {
    const centerY = PAGE_HEIGHT - centerTop;
    const k = radius * 0.5522847498;

    this.save();
    if (fill) this.commands.push(`${pdfColor(fill)} rg`);
    if (stroke) this.commands.push(`${pdfColor(stroke)} RG`, `${number(lineWidth)} w`);
    this.commands.push(
      `${number(centerX + radius)} ${number(centerY)} m`,
      `${number(centerX + radius)} ${number(centerY + k)} ${number(centerX + k)} ${number(centerY + radius)} ${number(centerX)} ${number(centerY + radius)} c`,
      `${number(centerX - k)} ${number(centerY + radius)} ${number(centerX - radius)} ${number(centerY + k)} ${number(centerX - radius)} ${number(centerY)} c`,
      `${number(centerX - radius)} ${number(centerY - k)} ${number(centerX - k)} ${number(centerY - radius)} ${number(centerX)} ${number(centerY - radius)} c`,
      `${number(centerX + k)} ${number(centerY - radius)} ${number(centerX + radius)} ${number(centerY - k)} ${number(centerX + radius)} ${number(centerY)} c`,
      'h',
      fill && stroke ? 'B' : fill ? 'f' : 'S'
    );
    this.restore();
  }

  line(x1: number, top1: number, x2: number, top2: number, color: PdfColor, lineWidth = 1) {
    this.save();
    this.commands.push(
      `${pdfColor(color)} RG`,
      `${number(lineWidth)} w`,
      `${number(x1)} ${number(PAGE_HEIGHT - top1)} m`,
      `${number(x2)} ${number(PAGE_HEIGHT - top2)} l`,
      'S'
    );
    this.restore();
  }

  text(value: string, x: number, top: number, size: number, font: PdfFont, color: PdfColor, options?: { align?: 'left' | 'right' | 'center'; width?: number }) {
    const width = options?.width ?? 0;
    const textWidth = measureText(value, size, font);
    const adjustedX = options?.align === 'right'
      ? x + width - textWidth
      : options?.align === 'center'
        ? x + (width - textWidth) / 2
        : x;
    const baseline = PAGE_HEIGHT - top - size * 0.82;

    this.commands.push(
      'BT',
      `/${FONT_RESOURCE[font]} ${number(size)} Tf`,
      `${pdfColor(color)} rg`,
      `1 0 0 1 ${number(adjustedX)} ${number(baseline)} Tm`,
      `${pdfString(value)} Tj`,
      'ET'
    );
  }

  textBlock(value: string, x: number, top: number, width: number, options: {
    size: number;
    lineHeight?: number;
    font?: PdfFont;
    color?: PdfColor;
    maxLines?: number;
  }) {
    const font = options.font ?? 'regular';
    const color = options.color ?? INK;
    const lineHeight = options.lineHeight ?? options.size * 1.35;
    let lines = wrapText(value, width, options.size, font);

    if (options.maxLines && lines.length > options.maxLines) {
      lines = lines.slice(0, options.maxLines);
      lines[lines.length - 1] = truncateLine(lines[lines.length - 1], width, options.size, font);
    }

    lines.forEach((line, index) => {
      if (line) this.text(line, x, top + index * lineHeight, options.size, font, color);
    });

    return lines.length * lineHeight;
  }

  image(name: string, x: number, top: number, width: number, height: number) {
    this.save();
    this.commands.push(
      `${number(width)} 0 0 ${number(height)} ${number(x)} ${number(PAGE_HEIGHT - top - height)} cm`,
      `/${name} Do`
    );
    this.restore();
  }
}

function asciiBytes(value: string) {
  const bytes = new Uint8Array(value.length);
  for (let index = 0; index < value.length; index += 1) bytes[index] = value.charCodeAt(index) & 0xff;
  return bytes;
}

function concatBytes(chunks: Uint8Array[]) {
  const length = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  chunks.forEach((chunk) => {
    result.set(chunk, offset);
    offset += chunk.length;
  });
  return result;
}

class PdfDocumentBuilder {
  private objects: Uint8Array[] = [];

  reserveObject() {
    this.objects.push(new Uint8Array());
    return this.objects.length;
  }

  addObject(content: string | Uint8Array) {
    this.objects.push(typeof content === 'string' ? asciiBytes(content) : content);
    return this.objects.length;
  }

  setObject(id: number, content: string | Uint8Array) {
    this.objects[id - 1] = typeof content === 'string' ? asciiBytes(content) : content;
  }

  addStream(content: Uint8Array, dictionary = '') {
    const header = asciiBytes(`<< /Length ${content.length}${dictionary ? ` ${dictionary}` : ''} >>\nstream\n`);
    const footer = asciiBytes('\nendstream');
    return this.addObject(concatBytes([header, content, footer]));
  }

  build(rootId: number, infoId: number) {
    const header = asciiBytes('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n');
    const chunks: Uint8Array[] = [header];
    const offsets = [0];
    let offset = header.length;

    this.objects.forEach((object, index) => {
      offsets.push(offset);
      const prefix = asciiBytes(`${index + 1} 0 obj\n`);
      const suffix = asciiBytes('\nendobj\n');
      chunks.push(prefix, object, suffix);
      offset += prefix.length + object.length + suffix.length;
    });

    const xrefOffset = offset;
    const xrefLines = [
      'xref',
      `0 ${this.objects.length + 1}`,
      '0000000000 65535 f '
    ];
    offsets.slice(1).forEach((objectOffset) => {
      xrefLines.push(`${objectOffset.toString().padStart(10, '0')} 00000 n `);
    });
    const trailer = [
      ...xrefLines,
      'trailer',
      `<< /Size ${this.objects.length + 1} /Root ${rootId} 0 R /Info ${infoId} 0 R >>`,
      'startxref',
      xrefOffset.toString(),
      '%%EOF',
      ''
    ].join('\n');
    chunks.push(asciiBytes(trailer));
    return concatBytes(chunks);
  }
}

function selectedLabels(options: Array<{ id: string; label: string }>, values: string[]) {
  return values.map((value) => optionLabel(options, value) ?? value).join(', ') || 'Keine Angabe';
}

function answerValue<T extends string>(options: Array<{ id: T; label: string }>, value?: T) {
  return optionLabel(options, value) ?? 'Keine Angabe';
}

function documentId(answers: CheckAnswers, createdAt: Date) {
  const input = JSON.stringify(answers);
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  const date = createdAt.toISOString().slice(0, 10).replace(/-/g, '');
  return `MSB-AC-${date}-${(hash >>> 0).toString(36).toUpperCase().slice(0, 5).padStart(5, '0')}`;
}

function drawBrand(page: PdfPageCanvas, image: EmbeddedJpeg | null | undefined, options: { x: number; top: number; inverse?: boolean; compact?: boolean }) {
  const compact = options.compact ?? false;
  const capsuleWidth = compact ? 76 : 106;
  const capsuleHeight = compact ? 28 : 40;

  if (image) {
    page.roundRect(options.x, options.top, capsuleWidth, capsuleHeight, 5, WHITE);
    const imageWidth = capsuleWidth - (compact ? 12 : 16);
    const imageHeight = imageWidth * image.height / image.width;
    page.image('Im1', options.x + (capsuleWidth - imageWidth) / 2, options.top + (capsuleHeight - imageHeight) / 2, imageWidth, imageHeight);
  } else {
    page.text('MSB', options.x, options.top + (compact ? 2 : 1), compact ? 19 : 28, 'boldItalic', options.inverse ? WHITE : NAVY);
  }
}

function drawStandardHeader(page: PdfPageCanvas, image: EmbeddedJpeg | null | undefined, section: string) {
  drawBrand(page, image, { x: PAGE_MARGIN, top: 19, compact: true });
  page.text('AI & AUTOMATION', PAGE_MARGIN + 88, 25, 8.3, 'bold', NAVY);
  page.text('AUTOMATION CHECK / AUSWERTUNG', 330, 25, 7.5, 'bold', MUTED, { align: 'right', width: PAGE_WIDTH - 330 - PAGE_MARGIN });
  page.text(section.toUpperCase(), 330, 38, 7.1, 'regular', TEAL, { align: 'right', width: PAGE_WIDTH - 330 - PAGE_MARGIN });
  page.line(PAGE_MARGIN, 62, PAGE_WIDTH - PAGE_MARGIN, 62, BORDER, 0.8);
}

function drawFooter(page: PdfPageCanvas, pageNumber: number, totalPages: number, id: string) {
  page.line(PAGE_MARGIN, FOOTER_TOP, PAGE_WIDTH - PAGE_MARGIN, FOOTER_TOP, BORDER, 0.7);
  page.text('MSB AI & Automation  |  www.msb-ai.de  |  kontakt@msb-ai.de', PAGE_MARGIN, FOOTER_TOP + 12, 7.2, 'regular', MUTED);
  page.text(`${id}  |  ${pageNumber} / ${totalPages}`, 370, FOOTER_TOP + 12, 7.2, 'regular', MUTED, {
    align: 'right',
    width: PAGE_WIDTH - 370 - PAGE_MARGIN
  });
}

function drawCoverHeader(page: PdfPageCanvas, image: EmbeddedJpeg | null | undefined, createdAt: Date, id: string) {
  page.rect(0, 0, PAGE_WIDTH, 102, NAVY);
  drawBrand(page, image, { x: PAGE_MARGIN, top: 27, inverse: true });
  page.text('AUTOMATION CHECK', 340, 29, 8.2, 'bold', TEAL_BRIGHT, { align: 'right', width: PAGE_WIDTH - 340 - PAGE_MARGIN });
  page.text('PROFESSIONELLE ERSTEINSCHÄTZUNG', 280, 44, 7.5, 'bold', WHITE, { align: 'right', width: PAGE_WIDTH - 280 - PAGE_MARGIN });
  page.text(createdAt.toLocaleDateString('de-DE'), 365, 63, 7.2, 'regular', WHITE, { align: 'right', width: PAGE_WIDTH - 365 - PAGE_MARGIN });
  page.text(id, 300, 76, 6.8, 'regular', TEAL_BRIGHT, { align: 'right', width: PAGE_WIDTH - 300 - PAGE_MARGIN });
  page.rect(PAGE_MARGIN, 102, PAGE_WIDTH - 2 * PAGE_MARGIN, 3, TEAL);
}

function drawMetadataCard(page: PdfPageCanvas, x: number, top: number, width: number, label: string, value: string) {
  page.roundRect(x, top, width, 71, 6, MIST, BORDER, 0.6);
  page.text(label.toUpperCase(), x + 12, top + 12, 6.6, 'bold', TEAL);
  page.textBlock(value, x + 12, top + 31, width - 24, {
    size: 10.2,
    lineHeight: 12.5,
    font: 'bold',
    color: NAVY,
    maxLines: 2
  });
}

function drawSignalList(page: PdfPageCanvas, reasons: AutomationAssessment['reasons'], top: number) {
  const height = Math.max(104, 22 + reasons.length * 37);
  page.roundRect(PAGE_MARGIN, top, PAGE_WIDTH - 2 * PAGE_MARGIN, height, 7, PAPER, BORDER, 0.7);

  reasons.forEach((reason, index) => {
    const rowTop = top + 14 + index * 37;
    if (index > 0) page.line(PAGE_MARGIN + 16, rowTop - 5, PAGE_WIDTH - PAGE_MARGIN - 16, rowTop - 5, BORDER, 0.45);
    const toneColor = reason.tone === 'positive' ? TEAL : CAUTION;
    page.circle(PAGE_MARGIN + 23, rowTop + 8, 7, toneColor);
    page.text(reason.tone === 'positive' ? '+' : '!', PAGE_MARGIN + 17, rowTop + 2.7, 8.5, 'bold', WHITE, { align: 'center', width: 12 });
    page.textBlock(reason.text, PAGE_MARGIN + 40, rowTop + 1, PAGE_WIDTH - 2 * PAGE_MARGIN - 58, {
      size: 9.3,
      lineHeight: 12,
      color: INK,
      maxLines: 2
    });
  });

  return height;
}

function drawProfileCard(page: PdfPageCanvas, x: number, top: number, width: number, label: string, value: string, maxLines = 2) {
  page.roundRect(x, top, width, 68, 5, PAPER, BORDER, 0.55);
  page.text(label.toUpperCase(), x + 12, top + 10, 6.4, 'bold', TEAL);
  page.textBlock(value || 'Keine Angabe', x + 12, top + 27, width - 24, {
    size: 8.9,
    lineHeight: 11.4,
    font: 'bold',
    color: NAVY,
    maxLines
  });
}

function nodeTone(kind: WorkflowNode['kind']) {
  if (kind === 'automation') return { fill: TEAL, text: WHITE };
  if (kind === 'human') return { fill: NAVY_SOFT, text: WHITE };
  if (kind === 'manual') return { fill: [247, 238, 226] as const, text: NAVY };
  return { fill: MIST, text: NAVY };
}

function drawWorkflowCard(page: PdfPageCanvas, x: number, top: number, width: number, title: string, kicker: string, nodes: WorkflowNode[]) {
  const height = 342;
  page.roundRect(x, top, width, height, 7, PAPER, BORDER, 0.7);
  page.rect(x, top, width, 4, title === 'Eine mögliche Richtung' ? TEAL : NAVY);
  page.text(kicker.toUpperCase(), x + 16, top + 18, 6.4, 'bold', TEAL);
  page.textBlock(title, x + 16, top + 34, width - 32, { size: 12.2, lineHeight: 14.5, font: 'bold', color: NAVY, maxLines: 2 });
  page.line(x + 16, top + 70, x + width - 16, top + 70, BORDER, 0.55);

  const maxNodes = 7;
  const visibleNodes = nodes.slice(0, maxNodes);
  const startTop = top + 86;
  const step = visibleNodes.length > 6 ? 35 : 40;
  const nodeHeight = 27;

  visibleNodes.forEach((node, index) => {
    const rowTop = startTop + index * step;
    const tone = nodeTone(node.kind);
    if (index < visibleNodes.length - 1) {
      page.line(x + 15, rowTop + nodeHeight, x + 15, rowTop + step, TEAL, 1.2);
    }
    page.circle(x + 15, rowTop + nodeHeight / 2, 7.3, tone.fill);
    page.text(`${index + 1}`, x + 9.5, rowTop + 7.9, 7.1, 'bold', tone.text, { align: 'center', width: 11 });
    page.roundRect(x + 29, rowTop, width - 45, nodeHeight, 4, tone.fill);
    page.textBlock(node.label, x + 39, rowTop + 7, width - 65, {
      size: 7.7,
      lineHeight: 9.2,
      font: 'bold',
      color: tone.text,
      maxLines: 2
    });
  });

  return height;
}

function drawNextSteps(page: PdfPageCanvas, top: number) {
  const steps = [
    ['01', 'Prozess verstehen'],
    ['02', 'Daten & Systeme prüfen'],
    ['03', 'Pilot definieren'],
    ['04', 'Nutzen messen'],
    ['05', 'Über Ausbau entscheiden']
  ];
  const gap = 7;
  const width = (PAGE_WIDTH - 2 * PAGE_MARGIN - gap * 4) / 5;

  steps.forEach(([numberLabel, label], index) => {
    const x = PAGE_MARGIN + index * (width + gap);
    page.roundRect(x, top, width, 58, 5, index === 0 ? MIST : PAPER, BORDER, 0.55);
    page.text(numberLabel, x + 9, top + 9, 7.2, 'bold', TEAL);
    page.textBlock(label, x + 9, top + 25, width - 18, {
      size: 7.2,
      lineHeight: 8.7,
      font: 'bold',
      color: NAVY,
      maxLines: 3
    });
  });
}

function createPages(answers: CheckAnswers, assessment: AutomationAssessment, options: Required<PdfBuildOptions>, id: string) {
  const area = getAreaConfig(answers.area);
  const problemOptions = answers.area ? PROBLEM_OPTIONS[answers.area] : [];
  const pages = [new PdfPageCanvas(), new PdfPageCanvas(), new PdfPageCanvas()];

  // Page 1: Executive summary
  const cover = pages[0];
  drawCoverHeader(cover, options.brandImage, options.createdAt, id);
  let y = 127;
  cover.text('EXECUTIVE SUMMARY', PAGE_MARGIN, y, 7.5, 'bold', TEAL);
  y += 22;
  const titleHeight = cover.textBlock(assessment.title, PAGE_MARGIN, y, PAGE_WIDTH - 2 * PAGE_MARGIN, {
    size: 27,
    lineHeight: 31,
    font: 'bold',
    color: NAVY,
    maxLines: 2
  });
  y += titleHeight + 8;
  const summaryHeight = cover.textBlock(assessment.summary, PAGE_MARGIN, y, PAGE_WIDTH - 2 * PAGE_MARGIN, {
    size: 11.2,
    lineHeight: 15.5,
    color: INK,
    maxLines: 4
  });
  y += summaryHeight + 9;
  cover.text('Erste Orientierung - keine vollständige Prozessanalyse und kein technisches Angebot.', PAGE_MARGIN, y, 7.3, 'italic', MUTED);
  y += 25;

  const metadataGap = 10;
  const metadataWidth = (PAGE_WIDTH - 2 * PAGE_MARGIN - metadataGap * 2) / 3;
  drawMetadataCard(cover, PAGE_MARGIN, y, metadataWidth, 'Bereich', area.label);
  drawMetadataCard(cover, PAGE_MARGIN + metadataWidth + metadataGap, y, metadataWidth, 'Häufigkeit', answerValue(FREQUENCY_OPTIONS, answers.frequency));
  drawMetadataCard(cover, PAGE_MARGIN + (metadataWidth + metadataGap) * 2, y, metadataWidth, 'Dokumentstatus', 'Lokal erstellt');
  y += 93;

  cover.text('DIE WICHTIGSTEN SIGNALE', PAGE_MARGIN, y, 7.4, 'bold', TEAL);
  y += 17;
  const signalHeight = drawSignalList(cover, assessment.reasons.length ? assessment.reasons : [{ tone: 'caution', text: 'Für eine belastbare Einordnung sind weitere Prozessdetails erforderlich.' }], y);
  y += signalHeight + 18;

  const recommendationHeight = Math.max(102, 48 + wrapText(assessment.recommendation, PAGE_WIDTH - 2 * PAGE_MARGIN - 36, 10.3, 'regular').slice(0, 5).length * 13.5);
  cover.roundRect(PAGE_MARGIN, y, PAGE_WIDTH - 2 * PAGE_MARGIN, recommendationHeight, 7, NAVY);
  cover.text('EMPFEHLUNG', PAGE_MARGIN + 18, y + 16, 7, 'bold', TEAL_BRIGHT);
  cover.textBlock(assessment.recommendation, PAGE_MARGIN + 18, y + 37, PAGE_WIDTH - 2 * PAGE_MARGIN - 36, {
    size: 10.3,
    lineHeight: 13.5,
    color: WHITE,
    maxLines: 5
  });
  drawFooter(cover, 1, pages.length, id);

  // Page 2: Detailed process profile
  const profile = pages[1];
  drawStandardHeader(profile, options.brandImage, 'Prozessprofil');
  profile.text('PROZESSPROFIL', PAGE_MARGIN, 86, 7.4, 'bold', TEAL);
  profile.text('Ihre Angaben auf einen Blick', PAGE_MARGIN, 105, 23, 'bold', NAVY);
  profile.textBlock('Diese Angaben bilden die Grundlage der Ersteinschätzung. Sie wurden nicht an MSB oder einen Drittanbieter übertragen.', PAGE_MARGIN, 139, PAGE_WIDTH - 2 * PAGE_MARGIN, {
    size: 9.2,
    lineHeight: 12.5,
    color: MUTED,
    maxLines: 2
  });

  const profileGap = 12;
  const profileWidth = (PAGE_WIDTH - 2 * PAGE_MARGIN - profileGap) / 2;
  const leftFields = [
    ['Bereich', area.label, 2],
    ['Tätigkeiten', selectedLabels(problemOptions, answers.problems), 3],
    ['Eingänge & Systeme', selectedLabels(INPUT_OPTIONS, answers.inputs), 3],
    ['Genanntes System', answers.systemName.trim() || 'Keine Angabe', 2],
    ['Zusätzlicher Kontext', answers.note.trim() || 'Keine Angabe', 3],
    ['Anzahl ausgewählter Routinen', `${answers.problems.length} Tätigkeiten`, 2]
  ] as const;
  const rightFields = [
    ['Häufigkeit', answerValue(FREQUENCY_OPTIONS, answers.frequency), 2],
    ['Vorgänge', answerValue(VOLUME_OPTIONS, answers.volume), 2],
    ['Aufwand je Vorgang', answerValue(EFFORT_OPTIONS, answers.effort), 2],
    ['Standardisierung', answerValue(STANDARDIZATION_OPTIONS, answers.standardization), 2],
    ['Menschliche Entscheidungen', answerValue(HUMAN_DECISION_OPTIONS, answers.humanDecision), 3],
    ['Fehlerfolgen', answerValue(CONSEQUENCE_OPTIONS, answers.consequence), 3]
  ] as const;

  leftFields.forEach(([label, value, maxLines], index) => {
    drawProfileCard(profile, PAGE_MARGIN, 180 + index * 78, profileWidth, label, value, maxLines);
  });
  rightFields.forEach(([label, value, maxLines], index) => {
    drawProfileCard(profile, PAGE_MARGIN + profileWidth + profileGap, 180 + index * 78, profileWidth, label, value, maxLines);
  });

  profile.roundRect(PAGE_MARGIN, 662, PAGE_WIDTH - 2 * PAGE_MARGIN, 105, 6, MIST);
  profile.text('METHODISCHER HINWEIS', PAGE_MARGIN + 15, 677, 6.7, 'bold', TEAL);
  profile.textBlock('Die Einordnung basiert auf Häufigkeit, Volumen, manuellem Aufwand, Standardisierung, Entscheidungsanteil, Fehlerfolgen und digitalen Eingängen. Sie ersetzt weder eine technische Machbarkeitsprüfung noch eine Datenschutz- oder Rechtsprüfung.', PAGE_MARGIN + 15, 698, PAGE_WIDTH - 2 * PAGE_MARGIN - 30, {
    size: 8.7,
    lineHeight: 12,
    color: INK,
    maxLines: 5
  });
  drawFooter(profile, 2, pages.length, id);

  // Page 3: Process picture and next steps
  const process = pages[2];
  drawStandardHeader(process, options.brandImage, 'Prozessbild & nächste Schritte');
  process.text('PROZESSBILD', PAGE_MARGIN, 86, 7.4, 'bold', TEAL);
  process.text('Heute und eine mögliche Richtung', PAGE_MARGIN, 105, 22, 'bold', NAVY);
  process.textBlock('Die Darstellung ist bewusst beispielhaft. Systemzugänge, Datenqualität, Ausnahmen und Verantwortlichkeiten werden erst in einer gemeinsamen Prüfung belastbar geklärt.', PAGE_MARGIN, 138, PAGE_WIDTH - 2 * PAGE_MARGIN, {
    size: 8.9,
    lineHeight: 12,
    color: MUTED,
    maxLines: 3
  });

  const workflowGap = 13;
  const workflowWidth = (PAGE_WIDTH - 2 * PAGE_MARGIN - workflowGap) / 2;
  drawWorkflowCard(process, PAGE_MARGIN, 178, workflowWidth, 'Der beschriebene Ablauf', 'Heute', assessment.currentWorkflow);
  drawWorkflowCard(process, PAGE_MARGIN + workflowWidth + workflowGap, 178, workflowWidth, 'Eine mögliche Richtung', 'Beispielhafter Ansatz', assessment.possibleWorkflow);

  process.roundRect(PAGE_MARGIN, 535, PAGE_WIDTH - 2 * PAGE_MARGIN, 87, 7, NAVY);
  process.text('WAS JETZT SINNVOLL WÄRE', PAGE_MARGIN + 16, 550, 6.8, 'bold', TEAL_BRIGHT);
  process.textBlock(assessment.recommendation, PAGE_MARGIN + 16, 571, PAGE_WIDTH - 2 * PAGE_MARGIN - 32, {
    size: 9.2,
    lineHeight: 12.2,
    color: WHITE,
    maxLines: 4
  });

  process.text('VOM PROZESSBILD ZUM BELASTBAREN PILOT', PAGE_MARGIN, 648, 7, 'bold', TEAL);
  drawNextSteps(process, 668);
  process.roundRect(PAGE_MARGIN, 742, PAGE_WIDTH - 2 * PAGE_MARGIN, 42, 6, MIST, BORDER, 0.5);
  process.text('NÄCHSTER SCHRITT', PAGE_MARGIN + 13, 753, 6.5, 'bold', TEAL);
  process.text('Ergebnis mit MSB einordnen: kontakt@msb-ai.de  |  www.msb-ai.de/kontakt', PAGE_MARGIN + 104, 751, 8.4, 'bold', NAVY);
  drawFooter(process, 3, pages.length, id);

  return pages;
}

export function createAutomationCheckPdf(answers: CheckAnswers, assessment: AutomationAssessment, buildOptions: PdfBuildOptions = {}) {
  const options: Required<PdfBuildOptions> = {
    createdAt: buildOptions.createdAt ?? new Date(),
    brandImage: buildOptions.brandImage ?? null
  };
  const id = documentId(answers, options.createdAt);
  const pages = createPages(answers, assessment, options, id);
  const pdf = new PdfDocumentBuilder();
  const catalogId = pdf.reserveObject();
  const pagesId = pdf.reserveObject();
  const regularFontId = pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const boldFontId = pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  const italicFontId = pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');
  const boldItalicFontId = pdf.addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-BoldOblique /Encoding /WinAnsiEncoding >>');
  const imageId = options.brandImage
    ? pdf.addStream(
        options.brandImage.data,
        `/Type /XObject /Subtype /Image /Width ${options.brandImage.width} /Height ${options.brandImage.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode`
      )
    : null;

  const pageIds: number[] = [];
  pages.forEach((page) => {
    const contentId = pdf.addStream(asciiBytes(page.content));
    const resources = `<< /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R /F3 ${italicFontId} 0 R /F4 ${boldItalicFontId} 0 R >>${imageId ? ` /XObject << /Im1 ${imageId} 0 R >>` : ''} >>`;
    const pageId = pdf.addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${number(PAGE_WIDTH)} ${number(PAGE_HEIGHT)}] /Resources ${resources} /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  });

  const infoId = pdf.addObject(`<< /Title ${pdfString('MSB Automation Check - Auswertung')} /Author ${pdfString('MSB AI & Automation')} /Subject ${pdfString('Professionelle Ersteinschätzung eines Automatisierungsprozesses')} /Creator ${pdfString('MSB Automation Check')} >>`);
  pdf.setObject(pagesId, `<< /Type /Pages /Kids [${pageIds.map((pageId) => `${pageId} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
  pdf.setObject(catalogId, `<< /Type /Catalog /Pages ${pagesId} 0 R /PageLayout /SinglePage >>`);

  return pdf.build(catalogId, infoId);
}

async function loadBrandImage(): Promise<EmbeddedJpeg | null> {
  if (typeof document === 'undefined' || typeof Image === 'undefined') return null;

  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const width = 720;
        const height = Math.max(1, Math.round(width * image.naturalHeight / image.naturalWidth));
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        if (!context) {
          resolve(null);
          return;
        }
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(image, 0, 0, width, height);
        canvas.toBlob(async (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          resolve({ data: new Uint8Array(await blob.arrayBuffer()), width, height });
        }, 'image/jpeg', 0.9);
      } catch {
        resolve(null);
      }
    };
    image.onerror = () => resolve(null);
    image.src = '/msb-wordmark.png';
  });
}

export async function downloadAutomationCheckPdf(answers: CheckAnswers, assessment: AutomationAssessment) {
  const createdAt = new Date();
  const brandImage = await loadBrandImage();
  const bytes = createAutomationCheckPdf(answers, assessment, { createdAt, brandImage });
  const safeBuffer = new Uint8Array(bytes).buffer;
  const blob = new Blob([safeBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `MSB-Automation-Check-Auswertung-${createdAt.toISOString().slice(0, 10)}.pdf`;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
