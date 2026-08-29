/**
 * HTML5 Canvas tabanli goruntu donusumu. Tamami tarayicida calisir,
 * hicbir veri cihazdan disari cikmaz.
 */

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
    const svg = new DOMParser()
      .parseFromString(await file.text(), 'image/svg+xml')
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
  const objectUrl = URL.createObjectURL(file);

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
