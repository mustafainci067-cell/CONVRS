/**
 * CSV <-> SQL donusumu. Saf JavaScript — tamamen client-side.
 *
 * csvToSql: CSV tablosunu (tablo adi kullanici secimine bagli olarak) esit
 *           INSERT INTO ... VALUES (...) sorgularina cevirir. String degerler
 *           guvenli sekilde kacislanir, null degerler NULL olarak yazilir.
 * sqlToCsv: INSERT deyimlerini geri CSV'ye cevirir. Tekli satirlik INSERT
 *           yapilarinin yani sira cok satirli VALUES bloklarini da destekler.
 */

import { parseCsv } from './data-convert';

/** Tek bir CSV hucresini SQL string literali olarak kaçışlar. */
function sqlEscape(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

/** CSV degerini SQL literal'ina donusturur (bosluk NULL, sayilar sayi). */
function valueToSqlLiteral(raw: string): string {
  if (raw === '') return 'NULL';
  const num = Number(raw);
  if (Number.isFinite(num) && String(num) === raw.trim()) return String(num);
  return sqlEscape(raw);
}

/**
 * CSV -> SQL INSERT sorgulari. `tableName` kullanicinin girdigi tablo adidir;
 * guvenlik icin yalnizca alfanumerik ve alt cizgi kabul edilir (backtick yok).
 * `batchSize` satir basina yazilan VALUES kumesi miktarini sinirlar.
 */
export function csvToSql(
  input: string,
  tableName: string,
  batchSize = 50
): string {
  if (!/^[\w$]+$/.test(tableName)) {
    throw new Error('Geçersiz tablo adı. Yalnızca harf, rakam veya alt çizgi kullanın.');
  }
  if (batchSize < 1) batchSize = 1;

  const rows = parseCsv(input);
  if (rows.length === 0) {
    throw new Error('CSV dosyası boş, satır yok.');
  }

  const [headerRow, ...dataRows] = rows;
  if (dataRows.length === 0) {
    throw new Error('CSV yalnızca başlık satırı içeriyor; veri satırı yok.');
  }

  const columns = headerRow.map((h) => h.trim() || `column_${headerRow.indexOf(h)}`);
  const colList = `(${columns.join(', ')})`;

  const chunks: string[] = [];
  for (let start = 0; start < dataRows.length; start += batchSize) {
    const batch = dataRows.slice(start, start + batchSize);
    const values = batch
      .map((row) => {
        const cells =
          row.length < columns.length
            ? [...row, ...Array(columns.length - row.length).fill('')]
            : row.slice(0, columns.length);
        return `(${cells.map(valueToSqlLiteral).join(', ')})`;
      })
      .join(',\n    ');
    chunks.push(`INSERT INTO ${tableName} ${colList}\nVALUES\n  ${values};`);
  }

  return chunks.join('\n\n');
}

/**
 * INSERT deyimi kumesini CSV'ye cevirir.
 * Tum INSERT dosyalarina uygulanmaz; girisin "veri INSERT'leri" oldugunu
 * varsayar ve satirci (row-wise) analizle yukaridakinden bagimsiz calisir.
 */
export function sqlToCsv(input: string): string {
  const lines = input.split(/\r?\n/);
  const statments = splitStatements(lines);
  if (statments.length === 0) {
    throw new Error('SQL içinde INSERT deyimi bulunamadı.');
  }

  const allRows: string[][] = [];
  let columns: string[] | null = null;

  for (const stmt of statments) {
    if (!/^\s*INSERT\s+INTO/i.test(stmt)) continue;

    // Sutun adlarini ilk INSERT'ten cikar
    if (!columns) {
      const m = stmt.match(/\(([^)]+)\)\s*VALUES/i);
      if (m) {
        columns = m[1]
          .split(',')
          .map((c) => c.trim().replace(/^`|`$/g, '').replace(/^"|"$/g, ''));
      }
    }

    // VALUES (...) bloklarini topla
    for (const row of extractValueRows(stmt)) {
      allRows.push(row);
    }
  }

  if (!columns || allRows.length === 0) {
    throw new Error('INSERT deyimlerinden sütun bilgisi çözümlenemedi.');
  }

  const escapeCell = (cell: string) => {
    if (/[",\r\n]/.test(cell)) return `"${cell.replaceAll('"', '""')}"`;
    return cell;
  };

  const linesOut = [columns.map(escapeCell).join(',')];
  for (const row of allRows) {
    linesOut.push(row.map(escapeCell).join(','));
  }
  return linesOut.join('\r\n');
}

function splitStatements(lines: string[]): string[] {
  const stmts: string[] = [];
  let current = '';
  let depth = 0;
  let inString = false;
  for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inString) {
        current += c;
        if (c === "'") {
          if (line[i + 1] === "'") {
            current += "'";
            i++;
          } else {
            inString = false;
          }
        }
        continue;
      }
      if (c === "'") {
        inString = true;
        current += c;
        continue;
      }
      if (c === '(') depth++;
      if (c === ')') depth--;
      if (c === ';' && depth === 0) {
        stmts.push(current + ';');
        current = '';
        continue;
      }
      current += c;
    }
    current += '\n';
  }
  if (current.trim()) stmts.push(current.trim());
  return stmts;
}

function extractValueRows(stmt: string): string[][] {
  // VALUES anahtar kelimesinden sonraki (...) bloklarini ayir
  const valuesIdx = stmt.search(/VALUES\s*/i);
  if (valuesIdx === -1) return [];
  const tail = stmt.slice(valuesIdx + 6);

  const blocks: string[] = [];
  let depth = 0;
  let inString = false;
  let cur = '';
  for (let i = 0; i < tail.length; i++) {
    const c = tail[i];
    if (inString) {
      cur += c;
      if (c === "'") {
        if (tail[i + 1] === "'") {
          cur += "'";
          i++;
        } else {
          inString = false;
        }
      }
      continue;
    }
    if (c === "'") {
      inString = true;
      cur += c;
      continue;
    }
    if (c === '(') depth++;
    if (c === ')') {
      depth--;
      if (depth === 0) {
        blocks.push(cur);
        cur = '';
        continue;
      }
    }
    cur += c;
  }
  if (cur.trim() && depth === 0) blocks.push(cur);

  return blocks.map((block) => parseValueBlock(block));
}

/** "(1, 'a,b', NULL)" gibi bir values blogunu hucrelere ayirir. */
function parseValueBlock(block: string): string[] {
  const cells: string[] = [];
  let field = '';
  let inString = false;
  for (let i = 0; i < block.length; i++) {
    const c = block[i];
    if (inString) {
      field += c;
      if (c === "'") {
        if (block[i + 1] === "'") {
          field += "'";
          i++;
        } else {
          inString = false;
        }
      }
      continue;
    }
    if (c === "'") {
      inString = true;
      field += c;
      continue;
    }
    if (c === ',') {
      cells.push(field.trim());
      field = '';
      continue;
    }
    field += c;
  }
  cells.push(field.trim());
  return cells.map(sqlLiteralToCsv);
}

function sqlLiteralToCsv(literal: string): string {
  const v = literal.trim();
  if (v === 'NULL' || v === '' || v === 'null') return '';
  if (/^[-+]?\d+(\.\d+)?$/.test(v)) return v;
  if (v.startsWith("'") && v.endsWith("'")) {
    return v.slice(1, -1).replaceAll("''", "'");
  }
  return v.replace(/^"|"$/g, '');
}