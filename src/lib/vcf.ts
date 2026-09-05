/**
 * VCF (vCard) <-> CSV donusumu. Saf JavaScript — tamamen client-side.
 *
 * vcfToCsv: vCard'in yaygin alt kumesini (v2.1 / 3.0 / 4.0) ayristirir;
 *           N, FN, TEL, EMAIL, ORG, TITLE, ADR, NOTE, CATEGORIES alanlarini
 *           bir satira haritalar. Ayni tip icin birden fazla deger (ornegin
 *           2 telefon) ";" ile birlestirilir.
 * csvToVcf: CSV satirlarini vCard 3.0 dosyasina cevirir; baslik adlarini
 *           vCard alan adlarina esler (Buyuk/kucuk duyarsiz).
 */

import { csvToJson, sanitizeCsvCell } from './data-convert';

const CRLF = '\r\n';

/* ------------------------------------------------ VCF ➝ CSV */

const FIELDS: { column: string; keys: string[] }[] = [
  { column: 'Ad Soyad (FN)', keys: ['fn'] },
  { column: 'Ad (N)', keys: ['n'] },
  { column: 'Telefon (TEL)', keys: ['tel'] },
  { column: 'E-posta (EMAIL)', keys: ['email'] },
  { column: 'Kurum (ORG)', keys: ['org'] },
  { column: 'Ünvan (TITLE)', keys: ['title'] },
  { column: 'Adres (ADR)', keys: ['adr'] },
  { column: 'Not (NOTE)', keys: ['note'] },
  { column: 'Etiketler (CATEGORIES)', keys: ['categories'] },
];

/** vCard icerigini satirlara bolerken satir sonundaki `=` (folded line) birlestir. */
function unfoldVcf(text: string): string {
  return text.replace(/\r?\n[ \t]/g, '');
}

/** `KEY[:];TYPE=..:value` yapisindaki bir alani deger ve anahtar haline cevirir. */
function parseLine(line: string): { key: string; value: string } | null {
  const sep = line.indexOf(':');
  if (sep === -1) return null;
  const head = line.slice(0, sep);
  const value = line.slice(sep + 1);
  const key = head.split(';')[0].trim().toLowerCase();
  if (!key) return null;
  return { key, value };
}

/** vCard alemek (chapirdirim) kacislarini cozer; virgulle ayrilmis alt degerleri istege bagli dizer. */
function decodeVcfValue(value: string, joinAlt = false): string {
  let out = value.replace(/\\n/gi, ' ').replace(/\\;/g, ';').replace(/\\,/g, ',').replace(/\\\\/g, '\\');
  if (joinAlt) out = out.split(',').map((s) => s.trim()).join(' ');
  return out.trim();
}

export function vcfToCsv(vcf: string): string {
  const text = unfoldVcf(vcf);
  const records: Record<string, string>[] = [];
  let current: Record<string, string> | null = null;

  const commit = () => {
    if (current && (Object.values(current).some((v) => v !== ''))) {
      records.push(current);
    }
    current = null;
  };

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.toUpperCase() === 'BEGIN:VCARD') {
      commit();
      current = {};
      continue;
    }
    if (line.toUpperCase() === 'END:VCARD') {
      commit();
      continue;
    }
    if (!current) continue;

    const parsed = parseLine(line);
    if (!parsed) continue;

    const { key, value } = parsed;

    switch (key) {
      case 'fn':
        current['fn'] = decodeVcfValue(value);
        break;
      case 'n': {
        // N: Soyad;Ad;Ikinci;OnEk;SonEk
        const parts = value.split(';').map((s) => s.trim());
        const surname = parts[0] ?? '';
        const given = parts[1] ?? '';
        current['n'] = [given, surname].filter(Boolean).join(' ');
        break;
      }
      case 'tel':
        current['tel'] = appendField(current['tel'], decodeVcfValue(value));
        break;
      case 'email':
        current['email'] = appendField(current['email'], decodeVcfValue(value));
        break;
      case 'org':
        current['org'] = appendField(current['org'], decodeVcfValue(value, true));
        break;
      case 'title':
        current['title'] = appendField(current['title'], decodeVcfValue(value));
        break;
      case 'adr': {
        // ADR: Posta;Sehir;Bolge;Ilce;Sokak;Ulke;Zip
        const parts = value.split(';').map((s) => s.trim().replace(/\\n/gi, ' '));
        const constructed = [parts[5], parts[4], parts[2], parts[1]].filter(Boolean).join(', ');
        current['adr'] = appendField(current['adr'], constructed);
        break;
      }
      case 'note':
        current['note'] = appendField(current['note'], decodeVcfValue(value));
        break;
      case 'categories':
        current['categories'] = appendField(
          current['categories'],
          value.split(',').map((s) => s.trim()).join('; ')
        );
        break;
      case 'version':
      case 'begin':
      case 'end':
        break;
      default:
        break;
    }
  }
  commit();

  if (records.length === 0) {
    throw new Error('Dosyada geçerli bir vCard kaydı bulunamadı.');
  }

  const headers = FIELDS.map((f) => f.column);
  const escapeCell = (cell?: string) => {
    if (!cell) return '';
    const safe = sanitizeCsvCell(cell);
    return /[",\r\n]/.test(safe) ? `"${safe.replaceAll('"', '""')}"` : safe;
  };

  const lines = [headers.join(',')];
  for (const rec of records) {
    lines.push(
      FIELDS.map((f) => {
        const val = f.keys.map((k) => rec[k]).filter(Boolean).join('; ');
        return escapeCell(val);
      }).join(',')
    );
  }
  return lines.join('\r\n');
}

function appendField(existing: string | undefined, value: string): string {
  if (!value) return existing ?? '';
  if (!existing) return value;
  return existing.split('; ').includes(value) ? existing : `${existing}; ${value}`;
}

/* ------------------------------------------------ CSV ➝ VCF */

const HEADER_ALIASES: Record<string, string> = {
  ad: 'fn',
  name: 'fn',
  fullname: 'fn',
  'ad soyad': 'fn',
  'isim': 'fn',
  'tam ad': 'fn',
  soyad: 'n',
  'first': 'n',
  'last': 'n',
  surname: 'n',
  givenname: 'n',
  familyname: 'n',
  telef: 'tel',
  telefon: 'tel',
  tel: 'tel',
  telefono: 'tel',
  phone: 'tel',
  mobile: 'tel',
  gsm: 'tel',
  cep: 'tel',
  email: 'email',
  eposta: 'email',
  'e-posta': 'email',
  mail: 'email',
  korporasyon: 'org',
  kurum: 'org',
  'şirket': 'org',
  organization: 'org',
  org: 'org',
  company: 'org',
  firma: 'org',
  'ünvan': 'title',
  title: 'title',
  jobtitle: 'title',
  pozisyon: 'title',
  role: 'title',
  adres: 'adr',
  address: 'adr',
  street: 'adr',
  not: 'note',
  note: 'note',
  nota: 'note',
  etiket: 'categories',
  categories: 'categories',
  category: 'categories',
  tags: 'categories',
};

function escapeVcf(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, ' ');
}

export function csvToVcf(csv: string): string {
  const json = JSON.parse(csvToJson(csv)) as Record<string, string | number | boolean | null>[];
  if (json.length === 0) {
    throw new Error('CSV dosyasında kayıt bulunamadı.');
  }

  const cards: string[] = [];
  let index = 0;

  for (const rec of json) {
    index++;
    const get = (aliasKey: string): string => {
      for (const [header, value] of Object.entries(rec)) {
        const norm = HEADER_ALIASES[header.trim().toLowerCase().replace(/\s+/g, ' ')];
        if (norm === aliasKey && value != null && String(value).trim() !== '') {
          return String(value).trim();
        }
      }
      return '';
    };

    let fn = get('fn');
    const full = get('n'); // ayrı soyad/ad kolonlari varsa
    if (!fn && full) fn = full;

    const tel = get('tel');
    const email = get('email');
    const org = get('org');
    const title = get('title');
    const adr = get('adr');
    const note = get('note');
    const categories = get('categories');

    const lines: string[] = [];
    lines.push('BEGIN:VCARD', 'VERSION:3.0');
    lines.push(`FN:${escapeVcf(fn || `Kişi ${index}`)}`);
    // N: Soyad;Ad;...
    const nameParts = (full || fn || `Kişi ${index}`).split(' ');
    lines.push(`N:${escapeVcf(nameParts[nameParts.length - 1] || '')};${escapeVcf(nameParts.slice(0, -1).join(' ') || '')};;;`);
    if (tel) lines.push(`TEL;TYPE=CELL:${escapeVcf(tel)}`);
    if (email) lines.push(`EMAIL:${escapeVcf(email)}`);
    if (org) lines.push(`ORG:${escapeVcf(org)}`);
    if (title) lines.push(`TITLE:${escapeVcf(title)}`);
    if (adr) lines.push(`ADR:;;${escapeVcf(adr)};;;;`);
    if (categories) lines.push(`CATEGORIES:${escapeVcf(categories)}`);
    if (note) lines.push(`NOTE:${escapeVcf(note)}`);
    lines.push('END:VCARD');
    cards.push(lines.join(CRLF));
  }

  return cards.join(CRLF + CRLF) + CRLF;
}