'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

const VIOLET_ACCENT: Accent = {
  dropzone:
    'border-violet-300 bg-violet-50 hover:border-violet-400 dark:border-violet-900/50 dark:bg-violet-950/10 dark:hover:border-violet-700/50',
  iconBox:
    'border-violet-200 bg-violet-100 text-violet-600 dark:border-violet-800/50 dark:bg-violet-900/40 dark:text-violet-400',
  button: 'bg-violet-600 text-white hover:bg-violet-500',
  resultCard: 'border-violet-200 bg-violet-50 dark:border-violet-900/30 dark:bg-violet-950/30',
  pill: 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]',
};

const PRESETS: { label: string; ratio: number | null }[] = [
  { label: 'Serbest', ratio: null },
  { label: '1:1', ratio: 1 },
  { label: '4:3', ratio: 4 / 3 },
  { label: '16:9', ratio: 16 / 9 },
  { label: '3:2', ratio: 3 / 2 },
  { label: '9:16', ratio: 9 / 16 },
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

type CropRect = { x: number; y: number; w: number; h: number };

export default function ImageCropper() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [activePreset, setActivePreset] = useState(0);
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [previewUrl, convertedUrl]);

  const processFile = async (file: File) => {
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
    setActivePreset(0);

    const url = URL.createObjectURL(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);

    try {
      const img = await loadImage(url);
      const natW = img.naturalWidth;
      const natH = img.naturalHeight;
      const maxW = 600;
      const ratio = Math.min(1, maxW / natW);
      const dispW = Math.round(natW * ratio);
      const dispH = Math.round(natH * ratio);
      setNaturalSize({ w: natW, h: natH });
      setDisplaySize({ w: dispW, h: dispH });
      setCrop({
        x: Math.round(dispW * 0.1),
        y: Math.round(dispH * 0.1),
        w: Math.round(dispW * 0.8),
        h: Math.round(dispH * 0.8),
      });
    } catch {
      setErrorMsg('Görsel boyutları okunamadı.');
    }
  };

  const updateCropForPreset = useCallback(
    (presetIdx: number) => {
      setActivePreset(presetIdx);
      const ratio = PRESETS[presetIdx].ratio;
      const dw = displaySize.w;
      const dh = displaySize.h;
      if (!ratio) {
        setCrop({ x: Math.round(dw * 0.1), y: Math.round(dh * 0.1), w: Math.round(dw * 0.8), h: Math.round(dh * 0.8) });
        return;
      }
      let w = dw * 0.8;
      let h = w / ratio;
      if (h > dh * 0.8) {
        h = dh * 0.8;
        w = h * ratio;
      }
      setCrop({
        x: Math.round((dw - w) / 2),
        y: Math.round((dh - h) / 2),
        w: Math.round(w),
        h: Math.round(h),
      });
    },
    [displaySize]
  );

  const getDisplayCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.max(0, Math.min(clientX - rect.left, displaySize.w)),
      y: Math.max(0, Math.min(clientY - rect.top, displaySize.h)),
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getDisplayCoords(e);
    setIsDragging(true);
    setDragStart(pos);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !dragStart) return;
    const pos = getDisplayCoords(e);
    const ratio = PRESETS[activePreset].ratio;

    const x = Math.min(dragStart.x, pos.x);
    const y = Math.min(dragStart.y, pos.y);
    let w = Math.abs(pos.x - dragStart.x);
    let h = Math.abs(pos.y - dragStart.y);

    if (ratio && w > 0) {
      h = w / ratio;
      if (y + h > displaySize.h) {
        h = displaySize.h - y;
        w = h * ratio;
      }
    }

    setCrop({
      x: Math.max(0, Math.round(x)),
      y: Math.max(0, Math.round(y)),
      w: Math.min(Math.round(w), displaySize.w),
      h: Math.min(Math.round(h), displaySize.h),
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleConvert = async () => {
    if (!selectedFile || !previewUrl) return;
    setIsConverting(true);
    setErrorMsg(null);
    try {
      const img = await loadImage(previewUrl);
      const scaleX = img.naturalWidth / displaySize.w;
      const scaleY = img.naturalHeight / displaySize.h;

      const sx = Math.round(crop.x * scaleX);
      const sy = Math.round(crop.y * scaleY);
      const sw = Math.round(crop.w * scaleX);
      const sh = Math.round(crop.h * scaleY);

      if (sw < 1 || sh < 1) throw new Error('Kırpma alanı çok küçük.');

      const canvas = document.createElement('canvas');
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D bağlamı oluşturulamadı.');
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

      const mime = selectedFile.type || 'image/jpeg';
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, mime, 0.92)
      );
      if (!blob) throw new Error('Canvas çıktısı üretilemedi.');
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Kırpma hatası.');
    } finally {
      setIsConverting(false);
    }
  };

  const ext = selectedFile?.name.match(/\.(jpg|jpeg|png|webp)$/i)?.[1]?.toLowerCase() || 'jpg';
  const downloadName = `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'image'}-cropped.${ext}`;

  return (
    <ConverterShell from="Image" to="Cropped">
      <ConverterHeading
        title="Image Cropper"
        description="Select a crop area on your image by dragging, or pick a preset ratio like 1:1, 16:9, and more. Crop entirely in your browser."
      />

      <Dropzone
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        inputLabel="Image"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={VIOLET_ACCENT}
        maxSizeMb={IMAGE_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <div className="w-full space-y-5">
          {/* Presets */}
          <div className="flex flex-wrap items-center gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => updateCropForPreset(i)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-mono transition-colors',
                  activePreset === i
                    ? 'bg-violet-600 text-white'
                    : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Crop Canvas */}
          <div
            ref={containerRef}
            className="relative mx-auto overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
            style={{ width: displaySize.w || '100%', height: displaySize.h || 300 }}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl!}
              alt="Crop preview"
              className="pointer-events-none block h-full w-full object-contain select-none"
              draggable={false}
            />

            {/* Dimmed overlay outside crop */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(to right,
                  rgba(0,0,0,0.55) ${crop.x}px,
                  transparent ${crop.x}px,
                  transparent ${crop.x + crop.w}px,
                  rgba(0,0,0,0.55) ${crop.x + crop.w}px)`,
              }}
            />
            <div
              className="pointer-events-none absolute left-0 right-0"
              style={{
                top: 0,
                height: crop.y,
                background: 'rgba(0,0,0,0.55)',
              }}
            />
            <div
              className="pointer-events-none absolute left-0 right-0"
              style={{
                top: crop.y + crop.h,
                bottom: 0,
                background: 'rgba(0,0,0,0.55)',
              }}
            />

            {/* Crop border */}
            <div
              className="pointer-events-none absolute border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.3)]"
              style={{
                left: crop.x,
                top: crop.y,
                width: crop.w,
                height: crop.h,
              }}
            />

            {/* Corner handles */}
            {[
              { left: crop.x - 4, top: crop.y - 4 },
              { left: crop.x + crop.w - 4, top: crop.y - 4 },
              { left: crop.x - 4, top: crop.y + crop.h - 4 },
              { left: crop.x + crop.w - 4, top: crop.y + crop.h - 4 },
            ].map((pos, i) => (
              <div
                key={i}
                className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-white shadow-lg"
                style={{ left: pos.left, top: pos.top }}
              />
            ))}
          </div>

          {/* Dimensions info */}
          <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            <span>
              Kırpma: {Math.round(crop.w * (naturalSize.w / displaySize.w))} ×{' '}
              {Math.round(crop.h * (naturalSize.h / displaySize.h))} px
            </span>
            <span>Orijinal: {naturalSize.w} × {naturalSize.h}</span>
          </div>

          <ConvertButton onClick={handleConvert} disabled={isConverting} accent={VIOLET_ACCENT}>
            {isConverting ? 'Cropping...' : 'Crop Image'}
          </ConvertButton>
        </div>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={VIOLET_ACCENT}
          href={convertedUrl}
          downloadName={downloadName}
          label="Download Cropped Image"
        />
      )}
    </ConverterShell>
  );
}
