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
  type Accent,
} from './ConverterShell';
import { cn } from '@/lib/utils';

const ROSE_ACCENT: Accent = {
  dropzone:
    'border-rose-300 bg-rose-50 hover:border-rose-400 dark:border-rose-900/50 dark:bg-rose-950/10 dark:hover:border-rose-700/50',
  iconBox:
    'border-rose-200 bg-rose-100 text-rose-600 dark:border-rose-800/50 dark:bg-rose-900/40 dark:text-rose-400',
  button: 'bg-rose-600 text-white hover:bg-rose-500',
  resultCard: 'border-rose-200 bg-rose-50 dark:border-rose-900/30 dark:bg-rose-950/30',
  pill: 'bg-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]',
};

const isSupportedImage = (file: File) =>
  matchesValidFormat(file, {
    mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'],
    extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'],
  });

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Görsel okunamadı.'));
    img.src = url;
  });
}

function rgbToHex(r: number, g: number, b: number): string {
  const to2 = (v: number) => Math.round(v).toString(16).padStart(2, '0');
  return `#${to2(r)}${to2(g)}${to2(b)}`;
}

/** Renkleri kucuk canvas'a cizip en baskın renkleri sayimla cikarir. */
function extractDominantColors(image: HTMLImageElement, count: number): string[] {
  const canvas = document.createElement('canvas');
  const size = 120;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  ctx.drawImage(image, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  // Renk kovası: her kanali 4'er basamaga yuvarlayarak benzer renkleri gruplar.
  const buckets = new Map<number, number>();
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 125) continue; // saydam pikselleri atla

    const r = Math.round(data[i] / 16);
    const g = Math.round(data[i + 1] / 16);
    const b = Math.round(data[i + 2] / 16);
    const key = (r << 8) | (g << 4) | b;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  const sorted = Array.from(buckets.entries()).sort((a, b) => b[1] - a[1]);

  return sorted.slice(0, count).map(([key]) => {
    const r = ((key >> 8) & 0xf) * 16 + 8;
    const g = ((key >> 4) & 0xf) * 16 + 8;
    const b = (key & 0xf) * 16 + 8;
    return rgbToHex(r, g, b);
  });
}

export default function ColorPaletteExtractor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
    setPalette([]);
    setErrorMsg(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));

    setIsAnalyzing(true);
    try {
      const img = await loadImage(URL.createObjectURL(file));
      const colors = extractDominantColors(img, 12);
      setPalette(colors);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Renk analizi başarısız.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyColor = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      /* pano erişimi reddedilebilir */
    }
  };

  const exportCSS = () => {
    const vars = palette
      .map((hex, i) => `  --color-${i + 1}: ${hex};`)
      .join('\n');
    return `:root {\n${vars}\n}`;
  };

  const downloadCSS = () => {
    const blob = new Blob([exportCSS()], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ConverterShell from="Image" to="Palette">
      <ConverterHeading
        title="Color Palette Extractor"
        description="Analyze the dominant colors in your image and get a beautiful palette with HEX codes — entirely in your browser."
      />

      <Dropzone
        accept=".jpg,.jpeg,.png,.webp,.gif,.bmp,image/jpeg,image/png,image/webp,image/gif,image/bmp"
        inputLabel="Image"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={ROSE_ACCENT}
        maxSizeMb={IMAGE_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !palette.length && !errorMsg && isAnalyzing && (
        <p className="font-mono text-sm text-zinc-500">Analyzing colors...</p>
      )}

      {palette.length > 0 && (
        <div className="w-full space-y-5">
          {/* Original preview */}
          <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl!}
              alt="Source"
              className="mx-auto max-h-48 w-auto object-contain"
            />
          </div>

          {/* Palette swatches */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {palette.map((hex, i) => (
              <button
                key={hex}
                type="button"
                onClick={() => copyColor(hex)}
                className="group overflow-hidden rounded-xl border border-zinc-200 text-left transition-transform hover:scale-[1.02] dark:border-zinc-800"
              >
                <div className="flex h-20 w-full items-end justify-end p-2" style={{ backgroundColor: hex }}>
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 font-mono text-[10px]',
                      i === 0 && 'bg-zinc-900/70 text-white'
                    )}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.85)',
                      color: '#111',
                    }}
                  >
                    #{i + 1}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-zinc-50 px-3 py-2 dark:bg-zinc-900/60">
                  <span className="font-mono text-xs uppercase text-zinc-800 dark:text-zinc-200">
                    {hex}
                  </span>
                  <span className="text-[10px] text-zinc-400 group-hover:text-rose-500">
                    {copied === hex ? 'Copied ✓' : 'Copy'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Export CSS */}
          <div className="space-y-3">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <p className="mb-2 font-mono text-[11px] text-zinc-400">CSS Variables</p>
              <pre className="overflow-x-auto whitespace-pre rounded-lg bg-zinc-100 p-3 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {exportCSS()}
              </pre>
            </div>
            <ConvertButton onClick={downloadCSS} accent={ROSE_ACCENT}>
              Download CSS
            </ConvertButton>
          </div>
        </div>
      )}
    </ConverterShell>
  );
}
