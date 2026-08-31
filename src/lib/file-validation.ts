/**
 * Dosya yuklemeleri icin guvenlik duvarlari: hard boyut limitleri ve
 * hata yiginlari. Tum on yuz donusturuculeri burdaki yardimcilari kullanir;
 * boylece kurallar tek bir yerde tanimlanir.
 *
 * Limiter:
 *  - Resimler (JPG, PNG, WebP, HEIC, SVG, ICO vb.): 20 MB hard-limit
 *  - Belgeler (PDF, Excel, JSON, CSV, XML...):       50 MB hard-limit
 */

/** Resim formatlari icin hard boyut limiti (byte). */
export const IMAGE_SIZE_LIMIT_MB = 20;
/** Belge formatlari icin hard boyut limiti (byte). */
export const DOCUMENT_SIZE_LIMIT_MB = 50;
/** Medya (video/audio) formatlari icin hard boyut limiti (byte). */
export const MEDIA_SIZE_LIMIT_MB = 100;

export const FILE_SIZE_LIMITS = {
  image: IMAGE_SIZE_LIMIT_MB * 1024 * 1024,
  document: DOCUMENT_SIZE_LIMIT_MB * 1024 * 1024,
} as const;

export type FileCategory = keyof typeof FILE_SIZE_LIMITS;

/** Dosyayı tum yaygin uzanti tipi kalibre sinifina atar. */
const IMAGE_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'heic',
  'heif',
  'avif',
  'gif',
  'bmp',
  'tif',
  'tiff',
  'svg',
  'ico',
];
const IMAGE_MIME_PREFIXES = ['image/'];

function extensionOf(file: File): string {
  const dot = file.name.lastIndexOf('.');
  return dot === -1 ? '' : file.name.slice(dot + 1).toLowerCase();
}

/**
 * Dosyayi ya imag'a ya da belge kategorisine yerlestirir.
 * Kabul edilemez bulunursa null doner.
 */
export function categorizeFile(file: File): FileCategory | null {
  const ext = extensionOf(file);
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image';
  if (IMAGE_MIME_PREFIXES.some((p) => file.type.startsWith(p))) return 'image';
  return 'document';
}

const LIMIT_LABEL: Record<FileCategory, string> = {
  image: `${IMAGE_SIZE_LIMIT_MB}MB`,
  document: `${DOCUMENT_SIZE_LIMIT_MB}MB`,
};

/**
 * Izin verilen giris formatlari. `mimes` onceliklidir (file.type otoritesi);
 * `extensions` yalnizca tarayici/OS dosyanin MIME'ini bos biraktiginda yedek
 * olarak kullanilir.
 */
export type AllowedFormat = {
  mimes: string[];
  extensions?: string[];
};

/**
 * Siki MIME dogrulamasi: dosyanin file.type (MIME) ozniteligi otoritedir.
 *  - MIME doluysa ve izin verilen listeyle eslesmezse -> 'Gecersiz dosya formatı' hata.
 *  - MIME bossa, uzanti yedegine dusulur (gorsel zarari onler).
 * Yedeklerde de eslesen yoksa ayni hata firlatilir.
 */
export function assertValidFormat(file: File, allowed: AllowedFormat): void {
  const matchMime = (m: string) =>
    m.endsWith('/') ? file.type.startsWith(m) : file.type === m;

  // MIME doluysa birinci inceleme yontemi odur; uyumsuz dosya aninda reddedilir.
  if (file.type) {
    if (allowed.mimes.some(matchMime)) return;
    throw new Error('Geçersiz dosya formatı');
  }

  // Bazi tarayicilar/OS dosyanin MIME'ini bos birakabilir: uzanti yedegi
  const dot = file.name.lastIndexOf('.');
  const ext = dot === -1 ? '' : file.name.slice(dot + 1).toLowerCase();
  if (allowed.extensions?.includes(ext)) return;
  throw new Error('Geçersiz dosya formatı');
}

/**
 * assertValidFormat'in bolern (predicate) varyanti: format eslesmezse hata
 * firlatmak yerine false doner. Config tabanli dogrulayicilarda kullanilir.
 */
export function matchesValidFormat(file: File, allowed: AllowedFormat): boolean {
  try {
    assertValidFormat(file, allowed);
    return true;
  } catch {
    return false;
  }
}

/**
 * Yuklenen dosyanin boyut limitini asip asmadigini denetler.
 * Asarsa kullanici dostu bir mesajla hata firlatir.
 */
export function assertFileWithinLimit(file: File) {
  const category = categorizeFile(file);
  if (!category) return; // taninmayan tipte dosyalar boyut denetimine tabi degil

  const limit = FILE_SIZE_LIMITS[category];
  if (file.size > limit) {
    const label = LIMIT_LABEL[category];
    throw new Error(
      `Dosya boyutu çok büyük. ${category === 'image' ? 'Resimler' : 'Belgeler'} için sınır ${label}.`
    );
  }
}

/**
 * Cagriyanin kendi verdigi MB cinsinden limite karsi denetler.
 * Medya tipi surekli degisebilen araclar icin (video/audio) kullanilir.
 */
export function assertWithinLimit(file: File, limitMb: number) {
  if (file.size > limitMb * 1024 * 1024) {
    throw new Error(`Dosya boyutu çok büyük. Sınır ${limitMb}MB.`);
  }
}
