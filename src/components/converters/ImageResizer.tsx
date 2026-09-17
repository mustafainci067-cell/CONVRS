'use client';

import { useEffect, useRef, useState } from 'react';
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

const BLUE_ACCENT: Accent = {
  dropzone:
    'border-blue-300 bg-blue-50 hover:border-blue-400 dark:border-blue-900/50 dark:bg-blue-950/10 dark:hover:border-blue-700/50',
  iconBox:
    'border-blue-200 bg-blue-100 text-blue-600 dark:border-blue-800/50 dark:bg-blue-900/40 dark:text-blue-400',
  button: 'bg-blue-600 text-white hover:bg-blue-500',
  resultCard: 'border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-950/30',
  pill: 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]',
};

const isSupportedImage = (file: File) =>
  matchesValidFormat(file, {
    mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  });

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Görsel okunamadı.'));
    img.src = url;
  });
}

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [origWidth, setOrigWidth] = useState(0);
  const [origHeight, setOrigHeight] = useState(0);
  const [newWidth, setNewWidth] = useState(0);
  const [newHeight, setNewHeight] = useState(0);
  const [unit, setUnit] = useState<'px' | '%'>('px');
  const [lockRatio, setLockRatio] = useState(true);
  const ratioRef = useRef(1);

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

    const url = URL.createObjectURL(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);

    try {
      const img = await loadImage(url);
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setOrigWidth(w);
      setOrigHeight(h);
      setNewWidth(w);
      setNewHeight(h);
      ratioRef.current = w / h;
    } catch {
      setErrorMsg('Görsel boyutları okunamadı.');
    }
  };

  const handleWidthChange = (val: number) => {
    setNewWidth(val);
    if (lockRatio && ratioRef.current) {
      setNewHeight(Math.round(val / ratioRef.current));
    }
  };

  const handleHeightChange = (val: number) => {
    setNewHeight(val);
    if (lockRatio && ratioRef.current) {
      setNewWidth(Math.round(val * ratioRef.current));
    }
  };

  const getPixelDimensions = () => {
    if (unit === '%') {
      return {
        w: Math.round((origWidth * newWidth) / 100),
        h: Math.round((origHeight * newHeight) / 100),
      };
    }
    return { w: newWidth, h: newHeight };
  };

  const handleConvert = async () => {
    if (!selectedFile || !previewUrl) return;
    setIsConverting(true);
    setErrorMsg(null);
    try {
      const img = await loadImage(previewUrl);
      const { w, h } = getPixelDimensions();
      if (w < 1 || h < 1) throw new Error('Boyutlar geçersiz.');

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D bağlamı oluşturulamadı.');
      ctx.drawImage(img, 0, 0, w, h);

      const mime = selectedFile.type || 'image/jpeg';
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, mime, 0.92)
      );
      if (!blob) throw new Error('Canvas çıktısı üretilemedi.');
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Yeniden boyutlandırma hatası.');
    } finally {
      setIsConverting(false);
    }
  };

  const ext = selectedFile?.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)?.[1]?.toLowerCase() || 'jpg';
  const downloadName = `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'image'}-resized.${ext}`;
  const { w: outputW, h: outputH } = getPixelDimensions();

  return (
    <ConverterShell from="Image" to="Resized">
      <ConverterHeading
        title="Image Resizer"
        description="Resize images by width and height in pixels or percentage. Lock aspect ratio to keep proportions, or unlock for freeform resizing — all client-side."
      />

      <Dropzone
        accept=".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif"
        inputLabel="Image"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={BLUE_ACCENT}
        maxSizeMb={IMAGE_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <div className="w-full space-y-5">
          {previewUrl && (
            <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto max-h-64 w-auto object-contain"
              />
            </div>
          )}

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 space-y-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            {/* Unit Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Birim:</span>
              <button
                type="button"
                onClick={() => setUnit('px')}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-colors ${
                  unit === 'px'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                }`}
              >
                px
              </button>
              <button
                type="button"
                onClick={() => {
                  setUnit('%');
                  setNewWidth(100);
                  setNewHeight(100);
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-colors ${
                  unit === '%'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                }`}
              >
                %
              </button>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Genişlik ({unit})
                </label>
                <input
                  type="number"
                  min={1}
                  max={unit === '%' ? 500 : 10000}
                  value={newWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-mono text-zinc-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Yükseklik ({unit})
                </label>
                <input
                  type="number"
                  min={1}
                  max={unit === '%' ? 500 : 10000}
                  value={newHeight}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-mono text-zinc-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            </div>

            {/* Lock Ratio */}
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <input
                type="checkbox"
                checked={lockRatio}
                onChange={(e) => setLockRatio(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
              />
              En-boy oranını koru (Aspect Ratio)
            </label>

            {/* Info */}
            <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              <span>Orijinal: {origWidth} × {origHeight}</span>
              <span>→</span>
              <span className="text-blue-600 dark:text-blue-400">
                {unit === '%' ? `${newWidth}% × ${newHeight}%` : `${outputW} × ${outputH}`}
              </span>
            </div>
          </div>

          <ConvertButton onClick={handleConvert} disabled={isConverting} accent={BLUE_ACCENT}>
            {isConverting ? 'Resizing...' : 'Resize Image'}
          </ConvertButton>
        </div>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={BLUE_ACCENT}
          href={convertedUrl}
          downloadName={downloadName}
          label="Download Resized Image"
        />
      )}
    </ConverterShell>
  );
}
