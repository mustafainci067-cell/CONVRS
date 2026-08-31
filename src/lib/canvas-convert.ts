/**
 * HTML5 Canvas tabanli goruntu donusumu. Tamami tarayicida calisir,
 * hicbir veri cihazdan disari cikmaz.
 */

import DOMPurify from 'dompurify';

/** Kaynak dosyanin SVG olup olmadigini (MIME oncelikli) belirler. */
const isSvgFile = (file: File) =>
  file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');

/**
 * SVG icerigini DOMPurify ile temizler: gomulu <script>, on* event
 * handler, javascript: URL vb. zararli icerik kaldirilir. Temizlenmis
 * icerik yeni bir File'a aktarilir; rasterizasyon akisi degismez.
 */
async function sanitizeSvg(file: File): Promise<File> {
  const raw = await file.text();
  const clean = DOMPurify.sanitize(raw, { USE_PROFILES: { svg: true, svgFilters: true } });
  return new File([clean], file.name, { type: 'image/svg+xml' });
}

export type CanvasTarget = {
  /** Cikti MIME turu, orn. 'image/jpeg' */
  mime: string;
  /** 0-1 arasi kalite (yalnizca kayipli formatlarda gecerli) */
  quality?: number;
  /** JPEG gibi saydamlik desteklemeyen formatlar icin zemin rengi */
  background?: string;
  /** Vektor kaynaklar icin cizim olcegi */
  scale?: number;
};

const MAX_DIMENSION = 4096;

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Görsel okunamadı. Dosya bozuk olabilir.'));
    img.src = url;
  });
}

/**
 * SVG'nin cizim boyutunu belirler: once width/height, yoksa viewBox,
 * o da yoksa makul bir varsayilan kullanilir.
 */
export async function resolveSvgSize(file: File): Promise<{ width: number; height: number }> {
  const fallback = { width: 1024, height: 1024 };
  try {
    const source = isSvgFile(file) ? await sanitizeSvg(file) : file;
    const svg = new DOMParser()
      .parseFromString(await source.text(), 'image/svg+xml')
      .querySelector('svg');
    if (!svg) return fallback;

    const readLength = (name: string) => {
      const raw = svg.getAttribute(name);
      if (!raw || raw.trim().endsWith('%')) return 0;
      const value = Number.parseFloat(raw);
      return Number.isFinite(value) && value > 0 ? value : 0;
    };

    const width = readLength('width');
    const height = readLength('height');
    if (width && height) return { width, height };

    const viewBox = (svg.getAttribute('viewBox') ?? '').split(/[\s,]+/).map(Number);
    if (viewBox.length === 4 && viewBox[2] > 0 && viewBox[3] > 0) {
      return { width: viewBox[2], height: viewBox[3] };
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export async function convertWithCanvas(
  file: File,
  target: CanvasTarget,
  size?: { width: number; height: number }
): Promise<Blob> {
  // SVG girdisini render oncesi temizle; XSS iceren dosyalar betik calistiramaz
  const source = isSvgFile(file) ? await sanitizeSvg(file) : file;
  const objectUrl = URL.createObjectURL(source);

  try {
    const img = await loadImage(objectUrl);
    const scale = target.scale ?? 1;

    const baseWidth = size?.width || img.naturalWidth || img.width;
    const baseHeight = size?.height || img.naturalHeight || img.height;
    if (!baseWidth || !baseHeight) {
      throw new Error('Görselin boyutları belirlenemedi.');
    }

    const ratio = Math.min(
      scale,
      MAX_DIMENSION / baseWidth,
      MAX_DIMENSION / baseHeight
    );
    const width = Math.max(1, Math.round(baseWidth * ratio));
    const height = Math.max(1, Math.round(baseHeight * ratio));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D bağlamı oluşturulamadı.');

    if (target.background) {
      ctx.fillStyle = target.background;
      ctx.fillRect(0, 0, width, height);
    }
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, target.mime, target.quality)
    );
    if (!blob) throw new Error('Canvas çıktısı üretilemedi.');
    return blob;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

/**
 * Raster PNG'yi base64 gomulu bir SVG'ye cevirir. Gorsel piksel verisini
 * korur; ortalama bir SVG editöründe acilabilir ve olceklendirilebilir.
 */
export async function convertPngToSvg(file: File): Promise<Blob> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImage(objectUrl);
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;
    if (!width || !height) throw new Error('Görselin boyutları belirlenemedi.');

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D bağlamı oluşturulamadı.');
    ctx.drawImage(img, 0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/png');
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" ` +
      `viewBox="0 0 ${width} ${height}"><image width="${width}" height="${height}" ` +
      `href="${dataUrl}"/></svg>`;
    return new Blob([svg], { type: 'image/svg+xml' });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

/**
 * Raster PNG'yi tek boyutlu (kare) bir ICO dosyasina cevirir. ICO formatinda
 * gorsel PNG olarak gomulebilir; bu da goruntu kalitesini ve saydamligi korur.
 */
export async function convertPngToIco(file: File): Promise<Blob> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImage(objectUrl);
    const srcW = img.naturalWidth || img.width;
    const srcH = img.naturalHeight || img.height;
    // ICO en buyuk desteklenen kare boyu 256px; kucuk gorseller kendi boyutunda kalir
    const size = Math.max(1, Math.min(srcW, srcH, 256));

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D bağlamı oluşturulamadı.');
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);

    const pngBlob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png')
    );
    if (!pngBlob) throw new Error('PNG çıktısı üretilemedi.');
    const png = new Uint8Array(await pngBlob.arrayBuffer());

    // ICONDIR (6 bayt) + tek ICONDIRENTRY (16 bayt) + PNG verisi
    const header = new DataView(new ArrayBuffer(22));
    header.setUint16(0, 0, true); // reserved
    header.setUint16(2, 1, true); // type: icon
    header.setUint16(4, 1, true); // image count
    header.setUint8(6, size === 256 ? 0 : size); // width (0 => 256)
    header.setUint8(7, size === 256 ? 0 : size); // height (0 => 256)
    header.setUint8(8, 0); // color palette
    header.setUint8(9, 0); // reserved
    header.setUint16(10, 1, true); // color planes
    header.setUint16(12, 32, true); // bits per pixel
    header.setUint32(14, png.length, true); // resource bytes
    header.setUint32(18, 22, true); // offset to image data

    const ico = new Uint8Array(22 + png.length);
    ico.set(new Uint8Array(header.buffer), 0);
    ico.set(png, 22);
    return new Blob([ico], { type: 'image/x-icon' });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
