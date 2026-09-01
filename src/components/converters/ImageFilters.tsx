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

const EMERALD_ACCENT: Accent = {
  dropzone:
    'border-emerald-300 bg-emerald-50 hover:border-emerald-400 dark:border-emerald-900/50 dark:bg-emerald-950/10 dark:hover:border-emerald-700/50',
  iconBox:
    'border-emerald-200 bg-emerald-100 text-emerald-600 dark:border-emerald-800/50 dark:bg-emerald-900/40 dark:text-emerald-400',
  button: 'bg-emerald-600 text-white hover:bg-emerald-500',
  resultCard: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-950/30',
  pill: 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]',
};

type FilterState = {
  grayscale: number;
  sepia: number;
  blur: number;
  brightness: number;
  contrast: number;
  saturate: number;
  hueRotate: number;
};

const DEFAULT_FILTERS: FilterState = {
  grayscale: 0,
  sepia: 0,
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturate: 100,
  hueRotate: 0,
};

const PRESETS: { label: string; filters: Partial<FilterState> }[] = [
  { label: 'Orijinal', filters: {} },
  { label: 'Gri Tonlama', filters: { grayscale: 100 } },
  { label: 'Sepia', filters: { sepia: 100 } },
  { label: 'Canlı', filters: { saturate: 150, contrast: 110 } },
  { label: 'Soluk', filters: { brightness: 120, saturate: 50 } },
  { label: 'Koyu', filters: { brightness: 70, contrast: 120 } },
  { label: 'Sıcak', filters: { sepia: 30, saturate: 130, hueRotate: -10 } },
  { label: 'Soğuk', filters: { hueRotate: 180, saturate: 70 } },
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

function filtersToCSS(f: FilterState): string {
  const parts = [
    `grayscale(${f.grayscale}%)`,
    `sepia(${f.sepia}%)`,
    `blur(${f.blur}px)`,
    `brightness(${f.brightness}%)`,
    `contrast(${f.contrast}%)`,
    `saturate(${f.saturate}%)`,
    `hue-rotate(${f.hueRotate}deg)`,
  ];
  return parts.join(' ');
}

export default function ImageFilters() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS });
  const [activePreset, setActivePreset] = useState(0);

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
    setFilters({ ...DEFAULT_FILTERS });
    setActivePreset(0);

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const applyPreset = (idx: number) => {
    setActivePreset(idx);
    setFilters({ ...DEFAULT_FILTERS, ...PRESETS[idx].filters });
  };

  const handleFilterChange = (key: keyof FilterState, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setActivePreset(-1);
  };

  const resetFilters = () => {
    setFilters({ ...DEFAULT_FILTERS });
    setActivePreset(0);
  };

  const handleConvert = async () => {
    if (!selectedFile || !previewUrl) return;
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

      ctx.filter = filtersToCSS(filters);
      ctx.drawImage(img, 0, 0, w, h);

      const mime = selectedFile.type || 'image/jpeg';
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, mime, 0.92)
      );
      if (!blob) throw new Error('Canvas çıktısı üretilemedi.');
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Filtre uygulama hatası.');
    } finally {
      setIsConverting(false);
    }
  };

  const ext = selectedFile?.name.match(/\.(jpg|jpeg|png|webp)$/i)?.[1]?.toLowerCase() || 'jpg';
  const downloadName = `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'image'}-filtered.${ext}`;

  const cssFilter = filtersToCSS(filters);

  const sliders: { key: keyof FilterState; label: string; min: number; max: number; unit: string }[] = [
    { key: 'grayscale', label: 'Gri Tonlama', min: 0, max: 100, unit: '%' },
    { key: 'sepia', label: 'Sepia', min: 0, max: 100, unit: '%' },
    { key: 'blur', label: 'Bulanıklık', min: 0, max: 20, unit: 'px' },
    { key: 'brightness', label: 'Parlaklık', min: 0, max: 200, unit: '%' },
    { key: 'contrast', label: 'Kontrast', min: 0, max: 200, unit: '%' },
    { key: 'saturate', label: 'Doygunluk', min: 0, max: 200, unit: '%' },
    { key: 'hueRotate', label: 'Renk Tonu', min: 0, max: 360, unit: '°' },
  ];

  return (
    <ConverterShell from="Image" to="Filtered">
      <ConverterHeading
        title="Image Filters"
        description="Apply Grayscale, Sepia, Blur, Brightness, Contrast and more to your images. Preview in real-time and download — all client-side."
      />

      <Dropzone
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        inputLabel="Image"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={EMERALD_ACCENT}
        maxSizeMb={IMAGE_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <div className="w-full space-y-5">
          {/* Live Preview */}
          <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl!}
              alt="Filter preview"
              className="mx-auto max-h-72 w-auto object-contain transition-[filter] duration-200"
              style={{ filter: cssFilter }}
            />
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(i)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  activePreset === i
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 space-y-3 dark:border-zinc-800 dark:bg-zinc-900/50">
            {sliders.map((s) => (
              <div key={s.key} className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {s.label}
                  </label>
                  <span className="font-mono text-xs text-zinc-400">
                    {filters[s.key]}{s.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={filters[s.key]}
                  onChange={(e) => handleFilterChange(s.key, Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-lg border border-zinc-300 bg-white py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            >
              Sıfırla
            </button>
          </div>

          <ConvertButton onClick={handleConvert} disabled={isConverting} accent={EMERALD_ACCENT}>
            {isConverting ? 'Applying Filters...' : 'Apply & Download'}
          </ConvertButton>
        </div>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={EMERALD_ACCENT}
          href={convertedUrl}
          downloadName={downloadName}
          label="Download Filtered Image"
        />
      )}
    </ConverterShell>
  );
}
