/**
 * XML <-> CSV donusumu. XML'i once JSON'a, sonra CSV'ye duzler gibi tersi yonde
 * CSV'yi XML'e sarar. Her ikisi de mevcut yardimcilarin (xml.ts, data-convert.ts)
 * ustune kuruludur — harici paket yok, %100 client-side.
 *
 * xmlToCsv: Ayni turde tekrar eden alt elementleri (ornegin <person> listesi)
 *           satir olarak kabul eder. Icerikteki oznitelikler "@ad" basligina,
 *           metin degerler ise "#text" basligina mapredilir.
 * csvToXml: Baslik satirini satirlar icin tekrar eden bir kok element olarak
 *           sarar.
 */

import { xmlToJson } from './xml';
import { jsonToCsv, parseCsv } from './data-convert';

/* ------------------------------------------------ XML ➝ CSV */

function firstObject(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      const obj = firstObject(item);
      if (obj) return obj;
    }
  }
  return null;
}

/**
 * XMLi JSON dugumune donusturdukten sonra CSV'ye duzleştirir.
 * Kok element altinda tekrarlanan bir kayit tipi bulunur (dizi olarak gelir);
 * bulunamazsa kokun alt elementleri satir olarak yorumlanir.
 */
export function xmlToCsv(xml: string): string {
  const json = xmlToJson(xml);
  if (json === null || typeof json !== 'object') {
    throw new Error('XML kökü bir harita olmalı.');
  }

  const root = json as Record<string, unknown>;
  const rootKey = Object.keys(root)[0];
  if (!rootKey) throw new Error('XML boş görünüyor.');

  const rootValue = root[rootKey];
  if (rootValue === null || typeof rootValue !== 'object') {
    throw new Error('XML kökü kayıt içermiyor.');
  }
  const rv = rootValue as Record<string, unknown>;

  // Kok altinda tekrarlanan bir kayit tipi: <people><person>..</person><person>..</person></people>
  const recordKey = Object.keys(rv).find((k) => Array.isArray(rv[k]));
  const rowsSource = recordKey
    ? rv[recordKey]
    : Array.isArray(rootValue)
      ? rootValue
      : [rootValue];
  const rows = Array.isArray(rowsSource) ? rowsSource : [rowsSource];

  if (rows.length === 0) {
    throw new Error('XML içinde tekrar eden kayıt bulunamadı.');
  }

  // Satirlari kucuk JSON nesneleri olarak normalize et
  const objects: Record<string, unknown>[] = rows.map((row) => firstObject(row) ?? {});
  return jsonToCsv(JSON.stringify(objects));
}

/* ------------------------------------------------ CSV ➝ XML */

const ROOT_TAG = 'root';
const ROW_TAG = 'row';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function validTag(tag: string): string {
  const clean = tag.replace(/[^A-Za-z0-9_.-]/g, '_');
  if (/^[A-Za-z_]/.test(clean)) return clean;
  return `_${clean}`;
}

/**
 * CSV'yi XML'e cevirir: her satir <row>..</row> olarak sarilir. Karmasik
 * baslik karakterleri guvenli etiket adlarıyla eslestirilir.
 */
export function csvToXml(csv: string): string {
  const rows = parseCsv(csv);
  if (rows.length === 0) {
    throw new Error('CSV dosyası boş, satır yok.');
  }
  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((h) => validTag(h.trim() || 'column'));

  const lines: string[] = [];
  lines.push(`<?xml version="1.0" encoding="UTF-8"?>`);
  lines.push(`<${ROOT_TAG}>`);

  for (const row of dataRows) {
    const cells = [...row];
    lines.push(`  <${ROW_TAG}>`);
    headers.forEach((header, i) => {
      lines.push(`    <${header}>${escapeXml(cells[i] ?? '')}</${header}>`);
    });
    lines.push(`  </${ROW_TAG}>`);
  }

  lines.push(`</${ROOT_TAG}>`);
  return lines.join('\n');
}