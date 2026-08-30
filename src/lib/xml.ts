/**
 * XML'i tarayicinin native DOMParser API'si ile parse edip
 * kolayca JSON.stringify edilebilir bir JS nesnesine donusturur.
 * Harici paket yok — tamamen client-side.
 *
 * Ornek kisaltma:
 *   <a><b>x</b><c n="1"/><c n="2"/></a>
 *   -> { "a": { "b": "x", "c": [{ "@n": "1" }, { "@n": "2" }] } }
 *
 * Not: Bazi tarayicilar parse hatasini ayni DOMParser dokumani icinde
 * <parsererror> elemani olarak bildirir; bu yuzden onu ozellikle denetleriz.
 */

/** Bir elementin cozumlenmis hali (attr'ler @ ile on ekli, metin #text) */
type XmlNode = Record<string, unknown>;

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