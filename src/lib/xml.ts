/**
 * XML ile JSON arasinda cift yonlu donusum.
 * XML'i tarayicinin native DOMParser API'si ile parse edip JS nesnesine ceviren,
 * ters yonde ise JS nesnelerini yeniden XML'e serilestiren yardimcilar.
 * Harici paket yok — tamamen client-side.
 *
 * Ornek kisaltma:
 *   <a><b>x</b><c n="1"/><c n="2"/></a>
 *   -> { "a": { "b": "x", "c": [{ "@n": "1" }, { "@n": "2" }] } }
 *
 * Not: Bazi tarayicilar parse hatasini ayni DOMParser dokumani icinde
 * <parsererror> elemani olarak bildirir; bu yuzden onu ozellikle denetleriz.
 */

type XmlNode = Record<string, unknown>;

/* ------------------------------------------------ XML ➝ JSON */

function elementToJson(el: Element): unknown {
  const result: XmlNode = {};

  // Nitelikler -> "@name": deger
  for (const attr of Array.from(el.attributes)) {
    result[`@${attr.name}`] = attr.value;
  }

  const childElements = Array.from(el.children);

  // Yaprak dugum: metin icerik
  if (childElements.length === 0) {
    const text = (el.textContent ?? '').trim();
    if (Object.keys(result).length > 0) {
      if (text) result['#text'] = text;
      return result;
    }
    return text;
  }

  // Alt elementler; ayni ad tekrarlanirsa diziye cevrilir
  for (const child of childElements) {
    const key = child.tagName;
    const value = elementToJson(child);
    if (key in result) {
      const existing = result[key];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        result[key] = [existing, value];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function xmlToJson(xml: string): unknown {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');

  const parseError = doc.getElementsByTagName('parsererror')[0];
  if (parseError) {
    const detail = (parseError.textContent ?? '').replace(/\s+/g, ' ').trim();
    throw new Error(detail || 'XML ayrıştırma hatası');
  }

  const root = doc.documentElement;
  if (!root) {
    throw new Error('XML kök eleman bulunamadı');
  }

  return { [root.tagName]: elementToJson(root) };
}

/* ------------------------------------------------ JSON ➝ XML */

const ESCAPE_TEXT: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
const ESCAPE_ATTR: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

function escapeText(value: string): string {
  return value.replace(/[&<>]/g, (c) => ESCAPE_TEXT[c] ?? c);
}

function escapeAttr(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ESCAPE_ATTR[c] ?? c);
}

/** Tek bir JSON degerini <key>...</key> XML karmasina donusturur */
function nodeToXml(key: string, value: unknown): string {
  if (value === null || value === undefined) {
    return `<${key}/>`;
  }

  if (Array.isArray(value)) {
    return value.map((item) => nodeToXml(key, item)).join('');
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const attrKeys = Object.keys(record).filter((k) => k.startsWith('@'));
    const childKeys = Object.keys(record).filter((k) => !k.startsWith('@'));
    const attrs = attrKeys.map((k) => ` ${k.slice(1)}="${escapeAttr(String(record[k]))}"`).join('');

    // Metin dolu yaprak (niteliklerle birlikte "#text" kullanilir)
    if (childKeys.includes('#text')) {
      const text = escapeText(String(record['#text']));
      return text ? `<${key}${attrs}>${text}</${key}>` : `<${key}${attrs}/>`;
    }

    if (childKeys.length === 0) {
      return `<${key}${attrs}/>`;
    }

    const inner = childKeys.map((k) => nodeToXml(k, record[k])).join('');
    return `<${key}${attrs}>${inner}</${key}>`;
  }

  const text = escapeText(String(value));
  return text ? `<${key}>${text}</${key}>` : `<${key}/>`;
}

/** Cozumlenmis XML dokumanini satir satir girintili olarak yazdirir */
function prettyPrintXml(el: Element): string {
  const lines: string[] = [];
  const pad = '  ';

  const build = (node: Element, depth: number) => {
    const indent = pad.repeat(depth);
    const attrs = Array.from(node.attributes)
      .map((a) => ` ${a.name}="${escapeAttr(a.value)}"`)
      .join('');
    const open = `<${node.tagName}${attrs}`;
    const childNodes = Array.from(node.childNodes);
    const elementChildren = childNodes.filter((ch) => ch.nodeType === Node.ELEMENT_NODE);
    const textChildren = childNodes.filter(
      (ch) =>
        (ch.nodeType === Node.TEXT_NODE || ch.nodeType === Node.CDATA_SECTION_NODE) &&
        !!(ch.textContent ?? '').trim()
    );

    if (elementChildren.length === 0 && textChildren.length === 0) {
      lines.push(`${indent}${open}/>`);
      return;
    }

    // Yalnizca metin iceren yapraklar tek satirda yazdirilir
    if (elementChildren.length === 0 && textChildren.length === 1 && textChildren[0].nodeType === Node.TEXT_NODE) {
      lines.push(
        `${indent}${open}>${escapeText((textChildren[0].textContent ?? '').trim())}</${node.tagName}>`
      );
      return;
    }

    lines.push(`${indent}${open}>`);
    for (const ch of childNodes) {
      if (ch.nodeType === Node.ELEMENT_NODE) {
        build(ch as Element, depth + 1);
      } else if (ch.nodeType === Node.CDATA_SECTION_NODE) {
        lines.push(`${indent}${pad}<![CDATA[${ch.textContent ?? ''}]]>`);
      } else if (ch.nodeType === Node.TEXT_NODE && (ch.textContent ?? '').trim()) {
        lines.push(`${indent}${pad}${escapeText((ch.textContent ?? '').trim())}`);
      }
    }
    lines.push(`${indent}</${node.tagName}>`);
  };

  build(el, 0);
  return lines.join('\n');
}

export function jsonToXml(json: string): string {
  const parsed: unknown = JSON.parse(json); // soz dizimi hatasi arayana yayilir

  let compact: string;

  if (parsed === null || typeof parsed !== 'object') {
    throw new Error('JSON kökü bir nesne olmalı (örn: { "root": ... })');
  }

  if (Array.isArray(parsed)) {
    compact = `<root>${parsed.map((item) => nodeToXml('item', item)).join('')}</root>`;
  } else {
    const record = parsed as Record<string, unknown>;
    const elementKeys = Object.keys(record).filter((k) => !k.startsWith('@'));

    if (elementKeys.length === 1) {
      const key = elementKeys[0];
      const value = record[key];
      // Tek anahtar ama deger dizi: root'u koru, elemanlari <item> altinda tut
      compact = Array.isArray(value)
        ? `<${key}>${value.map((item) => nodeToXml('item', item)).join('')}</${key}>`
        : nodeToXml(key, value);
    } else {
      // Birden fazla anahtar: <root> altinda grupla (XML tek kok ister)
      compact = nodeToXml('root', record);
    }
  }

  // Uretilen XML'i dogrula ve girintili bicimde yazdir
  const doc = new DOMParser().parseFromString(compact, 'application/xml');
  if (doc.getElementsByTagName('parsererror')[0] || !doc.documentElement) {
    throw new Error('JSON anahtarları geçerli XML etiket adları olmalıdır');
  }

  return prettyPrintXml(doc.documentElement);
}