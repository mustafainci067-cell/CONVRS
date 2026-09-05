/**
 * JSON <-> CSV donusumu. Saf JavaScript, sifir bagimlilik, sifir ag istegi.
 * RFC 4180'e uygun tirnak/kacis kurallari uygulanir.
 */

const NEEDS_QUOTING = /[",\r\n]/;

/**
 * Spreadsheet formül enjeksiyonunu (CSV Injection) onler: hucre degeri bir
 * formül operatoruyle (= + - @) basliyorsa basina koruyucu tek tirnak ekler.
 * Boylece Excel/LibreOffice acildiginda deger formül olarak calistirilmaz.
 * Oncesindeki bosluk/sekme da dikkate alinir (Excel import sirasinda boşlugu
 * sıyırıp formül haline getirebilir).
 */
const FORMULA_LEAD = /^[ \t]*[=+\-@]/;

export function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  const raw = typeof value === 'object' ? JSON.stringify(value) : String(value);
  return raw && FORMULA_LEAD.test(raw) ? `'${raw}` : raw;
}

function escapeCsvValue(value: unknown): string {
  const raw = sanitizeCsvCell(value);

  return NEEDS_QUOTING.test(raw) ? `"${raw.replaceAll('"', '""')}"` : raw;
}

export function jsonToCsv(input: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error('Geçersiz JSON. Dosyanın sözdizimini kontrol edin.');
  }

  // Tek bir nesne de tek satirlik CSV olarak kabul edilir
  const rows = Array.isArray(parsed) ? parsed : [parsed];
  if (rows.length === 0) {
    throw new Error('JSON dizisi boş, dönüştürülecek satır yok.');
  }

  // Ilkel degerlerden olusan dizi -> tek sutunlu CSV
  const allPrimitive = rows.every((row) => row === null || typeof row !== 'object');
  if (allPrimitive) {
    return ['value', ...rows.map((row) => escapeCsvValue(row))].join('\r\n');
  }

  if (rows.some((row) => row === null || typeof row !== 'object' || Array.isArray(row))) {
    throw new Error('CSV için JSON, nesnelerden oluşan düz bir dizi olmalıdır.');
  }

  // Basliklar: tum satirlarda gorulen anahtarlarin ilk gorunme sirasindaki birlesimi
  const headers: string[] = [];
  for (const row of rows as Record<string, unknown>[]) {
    for (const key of Object.keys(row)) {
      if (!headers.includes(key)) headers.push(key);
    }
  }
  if (headers.length === 0) {
    throw new Error('JSON nesnelerinde hiç alan bulunamadı.');
  }

  const lines = [headers.map(escapeCsvValue).join(',')];
  for (const row of rows as Record<string, unknown>[]) {
    lines.push(headers.map((header) => escapeCsvValue(row[header])).join(','));
  }
  return lines.join('\r\n');
}

/** Tirnakli alanlari, kacisli tirnaklari ve alan icindeki satir sonlarini destekler */
export function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let fieldWasQuoted = false;

  const endField = () => {
    row.push(field);
    field = '';
    fieldWasQuoted = false;
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };

  const text = input.charCodeAt(0) === 0xfeff ? input.slice(1) : input; // BOM

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"' && field === '') {
      inQuotes = true;
      fieldWasQuoted = true;
    } else if (char === ',') {
      endField();
    } else if (char === '\r') {
      if (text[i + 1] === '\n') i++;
      endRow();
    } else if (char === '\n') {
      endRow();
    } else {
      field += char;
    }
  }

  // Son satiri yalnizca icerik varsa ekle (dosya sonundaki newline yutulur)
  if (field !== '' || fieldWasQuoted || row.length > 0) {
    endRow();
  }

  return rows.filter((r) => r.length > 1 || r[0] !== '');
}

/**
 * Deger tipini yalnizca kayipsiz oldugunda daraltir:
 * "007" veya "1e999" gibi degerler string kalir.
 */
function coerce(value: string): string | number | boolean | null {
  if (value === '') return '';
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;

  const num = Number(value);
  if (Number.isFinite(num) && String(num) === value.trim()) return num;

  return value;
}

export function csvToJson(input: string): string {
  const rows = parseCsv(input);
  if (rows.length === 0) {
    throw new Error('CSV dosyası boş görünüyor.');
  }

  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((header, index) => header.trim() || `column_${index + 1}`);

  const records = dataRows.map((cells) => {
    const record: Record<string, string | number | boolean | null> = {};
    headers.forEach((header, index) => {
      record[header] = coerce(cells[index] ?? '');
    });
    return record;
  });

  return JSON.stringify(records, null, 2);
}
