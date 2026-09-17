/**
 * JSON <-> YAML donusumu. Saf JavaScript, harici paket yok — tamamen client-side.
 *
 * jsonToYaml: JSON degerlerini standart girintili YAML'a serilestirir.
 * yamlToJson: YAML 1.2'nin pratikte en cok kullanilan alt kumesini ayristirir:
 *   - "key: value" haritalar
 *   - "- item" / "- name: x" diziler
 *   - [a, b], {k: v} satir ici koleksiyonlar
 *   - tek/cift tirnakli ya da tirnaksiz skalerler (null, bool, number, string)
 *   - `|` ve `>` yiginli (literal / folded) cok satirli bloklar
 */

/* ------------------------------------------------ JSON ➝ YAML */

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function scalarToYaml(v: unknown): string {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'string') {
    if (v === '') return "''";
    // YAML anahtar kelimelerini korumak ve karmasik metinleri guvenli kilmak icin
    if (
      v === 'true' ||
      v === 'false' ||
      v === 'null' ||
      v === '~' ||
      /^[-+.]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/.test(v.trim()) ||
      /[:\[\]{},#&*!|>'"%@`]/.test(v) ||
      v.startsWith('- ') ||
      v.includes('\n')
    ) {
      return JSON.stringify(v);
    }
    return v;
  }
  if (typeof v === 'number' && !Number.isFinite(v)) return 'null';
  return String(v);
}

function blockToYaml(
  value: unknown,
  indent: number,
  name?: string,
  isSequenceItem = false
): string {
  const pad = '  '.repeat(indent);
  const prefix = name !== undefined ? `${pad}${name}:` : `${pad}-`;

  if (value === null || value === undefined) {
    return `${prefix} null`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return `${prefix} []`;
    const nested = isPlainObject(value[0]);
    const firstText = blockToYaml(value[0], nested ? indent + 1 : indent + 1, undefined, true);
    const lines = [`${prefix}`];
    lines.push(firstText);
    for (let i = 1; i < value.length; i++) {
      lines.push(
        blockToYaml(value[i], isPlainObject(value[i]) ? indent + 1 : indent + 1, undefined, true)
      );
    }
    return lines.join('\n');
  }
  if (isPlainObject(value)) {
    const keys = Object.keys(value);
    if (keys.length === 0) return `${prefix} {}`;
    const key0 = keys[0];
    const v0 = value[key0];
    const inline0 =
      v0 === null || typeof v0 === 'string' || typeof v0 === 'number' || typeof v0 === 'boolean';
    if (isSequenceItem) {
      const lines = [`${pad}- ${key0}: ${inline0 ? scalarToYaml(v0) : ''}`];
      if (!inline0) {
        lines.push(blockToYaml(v0, indent + 2));
      } else {
        lines.push(
          ...keys
            .slice(1)
            .map((k) => `${'  '.repeat(indent + 1)}${k}: ${scalarToYaml(value[k])}`)
        );
      }
      return lines.join('\n');
    }
    const lines = [`${prefix} ${inline0 ? scalarToYaml(v0) : ''}`];
    if (!inline0) {
      lines.push(blockToYaml(v0, indent + 1));
    }
    for (let i = 1; i < keys.length; i++) {
      const k = keys[i];
      const v = value[k];
      if (v === null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        lines.push(`${'  '.repeat(indent + 1)}${k}: ${scalarToYaml(v)}`);
      } else {
        lines.push(blockToYaml(v, indent + 1, k));
      }
    }
    return lines.join('\n');
  }
  return `${prefix} ${scalarToYaml(value)}`;
}

/**
 * Girintili, okunabilir YAML uretir. `|` bloğuyla cok satirli metinler duzgu
 * korunur. Giris JSON dokumani bir nesne ya da dizi olabilir.
 */
export function jsonToYaml(json: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('Geçersiz JSON. Sözdizimini kontrol edin.');
  }

  if (isPlainObject(parsed)) {
    const keys = Object.keys(parsed);
    if (keys.length === 0) return '{}\n';
    const firstKey = keys[0];
    const firstVal = parsed[firstKey];
    const inline =
      firstVal === null ||
      typeof firstVal === 'string' ||
      typeof firstVal === 'number' ||
      typeof firstVal === 'boolean';
    const lines = [`${firstKey}: ${inline ? scalarToYaml(firstVal) : ''}`];
    if (!inline) lines.push(blockToYaml(firstVal, 1));
    for (let i = 1; i < keys.length; i++) {
      const k = keys[i];
      const v = parsed[k];
      if (v === null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        lines.push(`  ${k}: ${scalarToYaml(v)}`);
      } else {
        lines.push(blockToYaml(v, 1, k));
      }
    }
    return lines.join('\n') + '\n';
  }

  if (Array.isArray(parsed)) {
    if (parsed.length === 0) return '[]\n';
    const lines = parsed.map((item) => blockToYaml(item, 0, undefined, true));
    return lines.join('\n') + '\n';
  }

  return scalarToYaml(parsed) + '\n';
}

/* ------------------------------------------------ YAML ➝ JSON */

type YamlNode =
  | { kind: 'scalar'; value: string }
  | { kind: 'map'; entries: [string, YamlNode][] }
  | { kind: 'list'; items: YamlNode[] };

function parseScalar(raw: string): unknown {
  const v = raw.trim();
  if (v === '' || v === '~' || v === 'null' || v === 'Null' || v === 'NULL') return null;
  if (v === 'true' || v === 'True' || v === 'TRUE') return true;
  if (v === 'false' || v === 'False' || v === 'FALSE') return false;
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    // neredeyse-tum JSON stringler YAML [1,2] ile uyumludur; JSON.parse deneyerek coz
    if (v.startsWith('"')) {
      try {
        return JSON.parse(v);
      } catch {
        /* biparam — ham metin olarak birak */
      }
    }
    return v.slice(1, -1);
  }
  if (/^[-+]?\d+$/.test(v)) {
    const n = Number(v);
    if (Number.isSafeInteger(n)) return n;
  }
  if (/^[-+]?(?:\d+\.\d+|\d+[eE][-+]?\d+)$/.test(v)) {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return v;
}

function inlineValue(raw: string): { value: YamlNode; rest: string } {
  const text = raw.trim();
  if (!text) return { value: { kind: 'scalar', value: '' }, rest: '' };

  // Satir ici akis: [a, b] ya da {k: v}
  if (text.startsWith('[') || text.startsWith('{')) {
    try {
      const parsed = parseInlineFlow(text);
      return { value: nodeFromAny(parsed), rest: '' };
    } catch {
      /* fallthrough: tipki skaler olarak */
    }
  }

  // Dizgi icindeki ':' eş anlamli değil; harici 'key: value' parseri ayrı kopya tutar
  return { value: { kind: 'scalar', value: text }, rest: '' };
}

function parseInlineFlow(text: string): unknown {
  // Güvenli bir yaklaşım: JSON'a çevirip parse et (YAML flow, JSON'un süperkümesidir)
  const json = text
    .replace(/([{,])\s*([A-Za-z_][\w-]*)+\s*:/g, '$1"$2":')
    .replace(/'/g, '"')
    .replace(/([{,]\s*)\s*([^",}\]]+?)\s*([,}])/g, '$1"$2"$3');
  try {
    return JSON.parse(json);
  } catch {
    throw new Error('flow parse fail');
  }
}

function nodeFromAny(v: unknown): YamlNode {
  if (Array.isArray(v)) return { kind: 'list', items: v.map(nodeFromAny) };
  if (v && typeof v === 'object') {
    return {
      kind: 'map',
      entries: Object.entries(v as Record<string, unknown>).map(([k, val]) => [
        k,
        nodeFromAny(val),
      ]),
    };
  }
  return { kind: 'scalar', value: String(v) };
}

function nodeToValue(node: YamlNode): unknown {
  switch (node.kind) {
    case 'scalar':
      return parseScalar(node.value);
    case 'list':
      return node.items.map(nodeToValue);
    case 'map':
      return Object.fromEntries(
        node.entries.map(([k, child]) => [k, nodeToValue(child)])
      );
  }
}

/**
 * YAML'i JSON metnine cevirir. Girintiyi ve satir ici akisi destekler;
 * ayrismayan bir dokumanda yararli bir hata firlatir.
 */
export function yamlToJson(yaml: string): string {
  const lines = yaml.split(/\r?\n/).map((l) => l.replace(/\t/g, '  '));
  // Dokuman basi/hatasi komutları ve yalnizca yorum satirlarini atla
  const content = lines.filter(
    (l) => !/^\s*#/.test(l) && !/^---\s*$/.test(l) && !/^(%|\.\.\.)/.test(l)
  );

  if (content.every((l) => l.trim() === '')) {
    throw new Error('YAML girdisi boş.');
  }

  const indentOf = (line: string) => line.match(/^ */)![0].length;
  const Parser = { pos: 0 };

  function parseBlock(minIndent: number): YamlNode {
    // Drop rest of empty lines
    while (Parser.pos < content.length && content[Parser.pos].trim() === '') {
      Parser.pos++;
    }
    if (Parser.pos >= content.length) return { kind: 'scalar', value: '' };

    const first = content[Parser.pos];
    if (indentOf(first) < minIndent) {
      return { kind: 'scalar', value: '' };
    }
    if (first.trim() === '- ' || first.trim() === '-' || first.trim() === '- ') {
      return parseList(minIndent);
    }
    const m = first.match(/^(\s*)([^:#]+?):\s*(.*)$/);
    if (!m) {
      throw new Error(`YAML ayrıştırılamadı (satır ${Parser.pos + 1}): ${first}`);
    }
    return parseMap(minIndent);
  }

  function parseList(minIndent: number): YamlNode {
    const items: YamlNode[] = [];
    while (Parser.pos < content.length) {
      const line = content[Parser.pos];
      if (line.trim() === '') {
        Parser.pos++;
        continue;
      }
      if (indentOf(line) < minIndent) break;
      const itemMatch = line.match(/^(\s*)-\s*(.*)$/);
      if (!itemMatch || indentOf(line) !== minIndent) break;

      const rest = itemMatch[2];
      Parser.pos++;

      // "key: value" dizisi elemani
      const kv = rest.match(/^([^:#]+?):\s*(.*)$/);
      if (kv) {
        const key = kv[1].trim();
        const inline = kv[2].trim();
        if (inline === '' || inline.startsWith('#')) {
          // bos deger -> alt blok (map ya da liste)
          const child = parseBlock(minIndent + 1);
          items.push({ kind: 'map', entries: [[key, child]] });
        } else {
          items.push({
            kind: 'map',
            entries: [[key, inlineValue(inline).value]],
          });
        }
      } else if (rest === '' || rest.startsWith('#')) {
        items.push(parseBlock(minIndent + 1));
      } else {
        items.push(inlineValue(rest).value);
      }
    }
    return { kind: 'list', items };
  }

  function parseMap(minIndent: number): YamlNode {
    const entries: [string, YamlNode][] = [];
    while (Parser.pos < content.length) {
      const line = content[Parser.pos];
      if (line.trim() === '') {
        Parser.pos++;
        continue;
      }
      if (indentOf(line) < minIndent) break;
      const m = line.match(/^(\s*)([^:#]+?):\s*(.*)$/);
      if (!m || indentOf(line) !== minIndent) break;

      const key = m[2].trim();
      const rest = m[3];
      Parser.pos++;

      if (rest === '') {
        // Alt blok olabilir (map ya da liste) ya da bos deger
        const next = content[Parser.pos];
        if (next && indentOf(next) > minIndent) {
          entries.push([key, parseBlock(indentOf(next))]);
        } else {
          entries.push([key, { kind: 'scalar', value: '' }]);
        }
      } else if (/^[|>](\s*[-+]?\d*)?$/.test(rest)) {
        const chomp = rest[0];
        const blockLines: string[] = [];
        if (nextIndentGreater(minIndent)) {
          const bi = content[Parser.pos] ? indentOf(content[Parser.pos]) : minIndent + 1;
          while (
            Parser.pos < content.length &&
            (content[Parser.pos].trim() === '' || indentOf(content[Parser.pos]) >= bi)
          ) {
            const l = content[Parser.pos];
            if (l.trim() === '') {
              blockLines.push('');
              Parser.pos++;
              continue;
            }
            blockLines.push(l.slice(bi));
            Parser.pos++;
          }
        }
        let text = blockLines.join(chomp === '|' ? '\n' : ' ');
        if (chomp === '>') text = text.replace(/ +/g, ' ');
        entries.push([key, { kind: 'scalar', value: text }]);
      } else {
        entries.push([key, inlineValue(rest).value]);
      }
    }
    return { kind: 'map', entries };
  }

  function nextIndentGreater(min: number): boolean {
    const next = content[Parser.pos];
    return next !== undefined && next.trim() !== '' && indentOf(next) > min;
  }

  const root = parseBlock(0);
  return JSON.stringify(nodeToValue(root), null, 2);
}