/**
 * Metin <-> Base64 donusumu. Tarayicinin native btoa/atob fonksiyonlari kullanilir.
 * UTF-8 karakterler (turkce harfler, emoji vb.) TextEncoder/TextDecoder ile bayt
 * duzeyine indirilir; boylece btoa/atob'un Latin1 sinirlamasi asilir.
 */

export function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export function decodeBase64(base64: string): string {
  let binary: string;
  try {
    binary = atob(base64.trim());
  } catch {
    throw new Error('Geçersiz Base64 metni. Girdinizi kontrol edin.');
  }

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error('Base64 çözüldü ancak geçerli bir metin oluşturmadı.');
  }
}
