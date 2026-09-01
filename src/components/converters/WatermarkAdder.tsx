'use client';

import { useEffect, useState } from 'react';
import {
  assertFileWithinLimit,
  IMAGE_SIZE_LIMIT_MB,
  matchesValidFormat,
} from '@/lib/file-validation';
import {
  ConvertButton,
  ConverterHeading,
  ConverterShell,
  Dropzone,
  ErrorBanner,
  ResultPanel,
  type Accent,
} from './ConverterShell';
import { cn } from '@/lib/utils';

const AMBER_ACCENT: Accent = {
  dropzone:
    'border-amber-300 bg-amber-50 hover:border-amber-400 dark:border-amber-900/50 dark:bg-amber-950/10 dark:hover:border-amber-700/50',
  iconBox:
    'border-amber-200 bg-amber-100 text-amber-600 dark:border-amber-800/50 dark:bg-amber-900/40 dark:text-amber-400',
  button: 'bg-amber-600 text-white hover:bg-amber-500',
  resultCard: 'border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-950/30',
  pill: 'bg-amber-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]',
};

type Position = 'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right';

const POSITIONS: { value: Position; label: string }[] = [
  { value: 'top-left', label: 'Sol Üst' },
  { value: 'top-center', label: 'Üst Orta' },
  { value: 'top-right', label: 'Sağ Üst' },
  { value: 'center', label: 'Orta' },
  { value: 'bottom-left', label: 'Sol Alt' },
  { value: 'bottom-center', label: 'Alt Orta' },
  { value: 'bottom-right', label: 'Sağ Alt' },
];

const isSupportedImage = (file: File) =>
  matchesValidFormat(file, {
    mimes: ['image/jpeg', 'image/png', 'image/webp'],
    extensions: ['jpg', 'jpeg', 'png', 'webp'],
  });

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Görsel okunamadı.'));
    img.src = url;
  });
}

function getPositionCoords(
  pos: Position,
  canvasW: number,
  canvasH: number,
  textW: number,
  textH: number,
  padding: number
): { x: number; y: number } {
  const map: Record<Position, () => { x: number; y: number }> = {
    'top-left': () => ({ x: padding, y: padding + textH }),
    'top-center': () => ({ x: (canvasW - textW) / 2, y: padding + textH }),
    'top-right': () => ({ x: canvasW - textW - padding, y: padding + textH }),
    center: () => ({ x: (canvasW - textW) / 2, y: (canvasH + textH) / 2 }),
    'bottom-left': () => ({ x: padding, y: canvasH - padding }),
    'bottom-center': () => ({ x: (canvasW - textW) / 2, y: canvasH - padding }),
    'bottom-right': () => ({ x: canvasW - textW - padding, y: canvasH - padding }),
  };
  return map[pos]();
}

export default function WatermarkAdder() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [text, setText] = useState('© Convrs');
  const [color, setColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(50);
  const [fontSize, setFontSize] = useState(32);
  const [position, setPosition] = useState<Position>('bottom-right');

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [previewUrl, convertedUrl]);

  const processFile = (file: File) => {
    if (!isSupportedImage(file)) {
      setErrorMsg('Geçersiz dosya formatı');
      return;
    }
    try {
      assertFileWithinLimit(file);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dosya boyutu çok büyük.');
      return;
    }
    setSelectedFile(file);
    setConvertedUrl(null);
    setErrorMsg(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleConvert = async () => {
    if (!selectedFile || !previewUrl || !text.trim()) return;
    setIsConverting(true);
    setErrorMsg(null);
    try {
      const img = await loadImage(previewUrl);
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D bağlamı oluşturulamadı.');

      ctx.drawImage(img, 0, 0, w, h);

      const scale = Math.max(w, h) / 1000;
      const actualFontSize = Math.round(fontSize * scale);
      const padding = Math.round(20 * scale);

      ctx.font = `bold ${actualFontSize}px sans-serif`;
      ctx.textBaseline = 'top';
      const metrics = ctx.measureText(text);
      const textW = metrics.width;
      const textH = actualFontSize;

      const { x, y } = getPositionCoords(position, w, h, textW, textH, padding);

      // Semi-transparent background pill
      ctx.globalAlpha = (opacity / 100) * 0.3;
      ctx.fillStyle = '#000000';
      const bgPad = Math.round(8 * scale);
      const radius = Math.round(6 * scale);
      const bgX = x - bgPad;
      const bgY = y - bgPad;
      const bgW = textW + bgPad * 2;
      const bgH = textH + bgPad * 2;
      ctx.beginPath();
      ctx.roundRect(bgX, bgY, bgW, bgH, radius);
      ctx.fill();

      // Text
      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);

      ctx.globalAlpha = 1;

      const mime = selectedFile.type || 'image/jpeg';
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, mime, 0.92)
      );
      if (!blob) throw new Error('Canvas çıktısı üretilemedi.');
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Filigran ekleme hatası.');
    } finally {
      setIsConverting(false);
    }
  };

  const ext = selectedFile?.name.match(/\.(jpg|jpeg|png|webp)$/i)?.[1]?.toLowerCase() || 'jpg';
  const downloadName = `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'image'}-watermarked.${ext}`;

  // Önizlemede filigran konumunu CSS yüzde değerlerine çevirir.
  const previewPos: Record<string, string | number> = (() => {
    const map: Record<Position, { alignItems: string; justifyContent: string }> = {
      'top-left': { alignItems: 'flex-start', justifyContent: 'flex-start' },
      'top-center': { alignItems: 'flex-start', justifyContent: 'center' },
      'top-right': { alignItems: 'flex-start', justifyContent: 'flex-end' },
      center: { alignItems: 'center', justifyContent: 'center' },
      'bottom-left': { alignItems: 'flex-end', justifyContent: 'flex-start' },
      'bottom-center': { alignItems: 'flex-end', justifyContent: 'center' },
      'bottom-right': { alignItems: 'flex-end', justifyContent: 'flex-end' },
    };
    return map[position];
  })();

  return (
    <ConverterShell from="Image" to="Watermarked">
      <ConverterHeading
        title="Watermark Adder"
        description="Add a text watermark to your image with custom color, opacity, font size and position — entirely in your browser."
      />

      <Dropzone
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        inputLabel="Image"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={AMBER_ACCENT}
        maxSizeMb={IMAGE_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <div className="w-full space-y-5">
          {/* Live Preview */}
          <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl!}
              alt="Watermark preview"
              className="mx-auto max-h-72 w-auto object-contain"
            />
            {/* Watermark overlay preview */}
            {text.trim() && (
              <div
                className="pointer-events-none absolute inset-0 flex select-none"
                style={previewPos}
              >
                <span
                  className="font-bold"
                  style={{
                    color,
                    opacity: opacity / 100,
                    fontSize: `${Math.min(fontSize, 24)}px`,
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {text}
                </span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 space-y-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            {/* Text */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Filigran Metni
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="© Convrs"
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            {/* Color & Font Size */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Renk
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-9 w-9 cursor-pointer rounded-lg border border-zinc-300 dark:border-zinc-700"
                  />
                  <span className="font-mono text-xs text-zinc-400">{color}</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Yazı Boyutu
                </label>
                <input
                  type="number"
                  min={8}
                  max={200}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-mono text-zinc-900 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            </div>

            {/* Opacity */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Saydamlık
                </label>
                <span className="font-mono text-xs text-zinc-400">%{opacity}</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Position */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Konum
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {POSITIONS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPosition(p.value)}
                    className={cn(
                      'rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors',
                      position === p.value
                        ? 'bg-amber-600 text-white'
                        : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ConvertButton onClick={handleConvert} disabled={isConverting} accent={AMBER_ACCENT}>
            {isConverting ? 'Adding Watermark...' : 'Add Watermark & Download'}
          </ConvertButton>
        </div>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={AMBER_ACCENT}
          href={convertedUrl}
          downloadName={downloadName}
          label="Download Watermarked Image"
        />
      )}
    </ConverterShell>
  );
}
