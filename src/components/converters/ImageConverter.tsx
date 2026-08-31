'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import {
  convertPngToIco,
  convertPngToSvg,
  convertWithCanvas,
  resolveSvgSize,
  type CanvasTarget,
} from '@/lib/canvas-convert';
import { assertFileWithinLimit, IMAGE_SIZE_LIMIT_MB } from '@/lib/file-validation';
import {
  ConvertButton,
  ConverterHeading,
  ConverterShell,
  DirectionToggle,
  Dropzone,
  ErrorBanner,
  ResultPanel,
  type Accent,
} from './ConverterShell';

export type ConverterMode =
  | 'heic-to-jpg'
  | 'jpg-to-webp'
  | 'png-to-jpg'
  | 'jpg-to-png'
  | 'svg-to-png'
  | 'png-to-svg'
  | 'webp-to-png'
  | 'ico-to-png'
  | 'png-to-ico'
  | 'webp-to-jpg'
  | 'png-to-webp';

type ConverterConfig = {
  title: string;
  description: string;
  /** Girdi formati kabul filtresi (input[accept]) */
  accept: string;
  inputLabel: string;
  outputLabel: string;
  outputExtension: string;
  /** heic2any ve canvas tarayicida calisir, ffmpeg WebAssembly cekirdegini indirir */
  engine: 'heic2any' | 'ffmpeg' | 'canvas' | 'svg' | 'ico';
  /** engine === 'canvas' icin cikti ayarlari */
  canvas?: CanvasTarget;
  /** SVG gibi ictrinsik boyutu olmayabilen vektor kaynaklar */
  vector?: boolean;
  /** Cift yonlu araclarda ters yondeki mod */
  swapWith?: ConverterMode;
  invalidMessage: string;
  isValidFile: (file: File) => boolean;
  accent: Accent;
};

const ZINC_ACCENT: Accent = {
  dropzone:
    'border-zinc-300 bg-zinc-100/60 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:border-zinc-700',
  iconBox:
    'border-zinc-300 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300',
  button:
    'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200',
  resultCard: 'border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900',
  pill: 'bg-zinc-900 text-zinc-50 shadow-md dark:bg-zinc-100 dark:text-zinc-900',
};

const BLUE_ACCENT: Accent = {
  dropzone:
    'border-blue-300 bg-blue-50 hover:border-blue-400 dark:border-blue-900/50 dark:bg-blue-950/10 dark:hover:border-blue-700/50',
  iconBox:
    'border-blue-200 bg-blue-100 text-blue-600 dark:border-blue-800/50 dark:bg-blue-900/40 dark:text-blue-400',
  button: 'bg-blue-600 text-white hover:bg-blue-500',
  resultCard: 'border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-950/30',
  pill: 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]',
};

const AMBER_ACCENT: Accent = {
  dropzone:
    'border-amber-300 bg-amber-50 hover:border-amber-400 dark:border-amber-900/50 dark:bg-amber-950/10 dark:hover:border-amber-700/50',
  iconBox:
    'border-amber-200 bg-amber-100 text-amber-600 dark:border-amber-800/50 dark:bg-amber-900/40 dark:text-amber-400',
  button: 'bg-amber-600 text-white hover:bg-amber-500',
  resultCard: 'border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-950/30',
  pill: 'bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.4)]',
};

const VIOLET_ACCENT: Accent = {
  dropzone:
    'border-violet-300 bg-violet-50 hover:border-violet-400 dark:border-violet-900/50 dark:bg-violet-950/10 dark:hover:border-violet-700/50',
  iconBox:
    'border-violet-200 bg-violet-100 text-violet-600 dark:border-violet-800/50 dark:bg-violet-900/40 dark:text-violet-400',
  button: 'bg-violet-600 text-white hover:bg-violet-500',
  resultCard: 'border-violet-200 bg-violet-50 dark:border-violet-900/30 dark:bg-violet-950/30',
  pill: 'bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]',
};

const ROSE_ACCENT: Accent = {
  dropzone:
    'border-rose-300 bg-rose-50 hover:border-rose-400 dark:border-rose-900/50 dark:bg-rose-950/10 dark:hover:border-rose-700/50',
  iconBox:
    'border-rose-200 bg-rose-100 text-rose-600 dark:border-rose-800/50 dark:bg-rose-900/40 dark:text-rose-400',
  button: 'bg-rose-600 text-white hover:bg-rose-500',
  resultCard: 'border-rose-200 bg-rose-50 dark:border-rose-900/30 dark:bg-rose-950/30',
  pill: 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]',
};

const EMERALD_ACCENT: Accent = {
  dropzone:
    'border-emerald-300 bg-emerald-50 hover:border-emerald-400 dark:border-emerald-900/50 dark:bg-emerald-950/10 dark:hover:border-emerald-700/50',
  iconBox:
    'border-emerald-200 bg-emerald-100 text-emerald-600 dark:border-emerald-800/50 dark:bg-emerald-900/40 dark:text-emerald-400',
  button: 'bg-emerald-600 text-white hover:bg-emerald-500',
  resultCard: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-950/30',
  pill: 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]',
};

const isPng = (file: File) =>
  file.name.toLowerCase().endsWith('.png') || file.type === 'image/png';

const isJpg = (file: File) => {
  const name = file.name.toLowerCase();
  return name.endsWith('.jpg') || name.endsWith('.jpeg') || file.type === 'image/jpeg';
};

const isWebp = (file: File) =>
  file.name.toLowerCase().endsWith('.webp') || file.type === 'image/webp';

const isIco = (file: File) =>
  file.name.toLowerCase().endsWith('.ico') ||
  file.type === 'image/x-icon' ||
  file.type === 'image/vnd.microsoft.icon';

const CONVERTERS: Record<ConverterMode, ConverterConfig> = {
  'heic-to-jpg': {
    title: 'HEIC to JPG Converter',
    description:
      'Transform Apple high-efficiency images into universal JPG format instantly. Absolute privacy.',
    accept: '.heic,.HEIC,.heif,image/heic,image/heif',
    inputLabel: 'HEIC',
    outputLabel: 'JPG',
    outputExtension: 'jpg',
    engine: 'heic2any',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece HEIC dosyası yükleyin.',
    isValidFile: (file) => {
      const name = file.name.toLowerCase();
      return (
        name.endsWith('.heic') ||
        name.endsWith('.heif') ||
        file.type === 'image/heic' ||
        file.type === 'image/heif'
      );
    },
    accent: ZINC_ACCENT,
  },
  'jpg-to-webp': {
    title: 'JPG to WebP Converter',
    description:
      "Convert standard JPG files into Google's ultra-lightweight WebP format using WebAssembly.",
    accept: '.jpg,.jpeg,.JPG,.JPEG,image/jpeg',
    inputLabel: 'JPG',
    outputLabel: 'WebP',
    outputExtension: 'webp',
    engine: 'ffmpeg',
    swapWith: 'webp-to-jpg',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece JPG dosyası yükleyin.',
    isValidFile: isJpg,
    accent: BLUE_ACCENT,
  },
  'webp-to-jpg': {
    title: 'WebP to JPG Converter',
    description:
      'Convert WebP images back into universal JPG files, flattening transparency onto a white background — right in your browser with HTML5 Canvas.',
    accept: '.webp,.WEBP,image/webp',
    inputLabel: 'WebP',
    outputLabel: 'JPG',
    outputExtension: 'jpg',
    engine: 'canvas',
    canvas: { mime: 'image/jpeg', quality: 0.92, background: '#ffffff' },
    swapWith: 'jpg-to-webp',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece WebP dosyası yükleyin.',
    isValidFile: isWebp,
    accent: BLUE_ACCENT,
  },
  'png-to-jpg': {
    title: 'PNG to JPG Converter',
    description:
      'Flatten transparent PNG images onto a white background and export them as compact JPG files, rendered with HTML5 Canvas.',
    accept: '.png,.PNG,image/png',
    inputLabel: 'PNG',
    outputLabel: 'JPG',
    outputExtension: 'jpg',
    engine: 'canvas',
    canvas: { mime: 'image/jpeg', quality: 0.92, background: '#ffffff' },
    swapWith: 'jpg-to-png',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece PNG dosyası yükleyin.',
    isValidFile: isPng,
    accent: AMBER_ACCENT,
  },
  'jpg-to-png': {
    title: 'JPG to PNG Converter',
    description:
      'Re-encode JPG photos as lossless PNG images directly in your browser with HTML5 Canvas.',
    accept: '.jpg,.jpeg,.JPG,.JPEG,image/jpeg',
    inputLabel: 'JPG',
    outputLabel: 'PNG',
    outputExtension: 'png',
    engine: 'canvas',
    canvas: { mime: 'image/png' },
    swapWith: 'png-to-jpg',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece JPG dosyası yükleyin.',
    isValidFile: isJpg,
    accent: AMBER_ACCENT,
  },
  'svg-to-png': {
    title: 'SVG to PNG Converter',
    description:
      'Rasterize scalable vector graphics into crisp, transparent PNG bitmaps at 2× resolution — entirely on your device.',
    accept: '.svg,.SVG,image/svg+xml',
    inputLabel: 'SVG',
    outputLabel: 'PNG',
    outputExtension: 'png',
    engine: 'canvas',
    canvas: { mime: 'image/png', scale: 2 },
    vector: true,
    swapWith: 'png-to-svg',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece SVG dosyası yükleyin.',
    isValidFile: (file) =>
      file.name.toLowerCase().endsWith('.svg') || file.type === 'image/svg+xml',
    accent: VIOLET_ACCENT,
  },
  'png-to-svg': {
    title: 'PNG to SVG Converter',
    description:
      'Embed a PNG bitmap inside a scalable SVG file — keeping every pixel and its transparency — entirely in your browser.',
    accept: '.png,.PNG,image/png',
    inputLabel: 'PNG',
    outputLabel: 'SVG',
    outputExtension: 'svg',
    engine: 'svg',
    swapWith: 'svg-to-png',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece PNG dosyası yükleyin.',
    isValidFile: isPng,
    accent: VIOLET_ACCENT,
  },
  'webp-to-png': {
    title: 'WebP to PNG Converter',
    description:
      'Convert compact WebP images into lossless, transparent PNG bitmaps right in your browser with HTML5 Canvas.',
    accept: '.webp,.WEBP,image/webp',
    inputLabel: 'WebP',
    outputLabel: 'PNG',
    outputExtension: 'png',
    engine: 'canvas',
    canvas: { mime: 'image/png' },
    swapWith: 'png-to-webp',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece WebP dosyası yükleyin.',
    isValidFile: isWebp,
    accent: ROSE_ACCENT,
  },
  'png-to-webp': {
    title: 'PNG to WebP Converter',
    description:
      'Compress PNG images into compact WebP files with HTML5 Canvas — the lossy result keeps your PNG transparency.',
    accept: '.png,.PNG,image/png',
    inputLabel: 'PNG',
    outputLabel: 'WebP',
    outputExtension: 'webp',
    engine: 'canvas',
    canvas: { mime: 'image/webp', quality: 0.92 },
    swapWith: 'webp-to-png',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece PNG dosyası yükleyin.',
    isValidFile: isPng,
    accent: ROSE_ACCENT,
  },
  'ico-to-png': {
    title: 'ICO to PNG Converter',
    description:
      'Turn ICO icon files into crisp, transparent PNG images with the browser native Image API — no upload.',
    accept: '.ico,.ICO,image/x-icon,image/vnd.microsoft.icon',
    inputLabel: 'ICO',
    outputLabel: 'PNG',
    outputExtension: 'png',
    engine: 'canvas',
    canvas: { mime: 'image/png' },
    swapWith: 'png-to-ico',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece ICO dosyası yükleyin.',
    isValidFile: isIco,
    accent: EMERALD_ACCENT,
  },
  'png-to-ico': {
    title: 'PNG to ICO Converter',
    description:
      'Turn a square PNG image into a single-size Windows ICO icon — with PNG-compressed data for full quality and transparency — in your browser.',
    accept: '.png,.PNG,image/png',
    inputLabel: 'PNG',
    outputLabel: 'ICO',
    outputExtension: 'ico',
    engine: 'ico',
    swapWith: 'ico-to-png',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece PNG dosyası yükleyin.',
    isValidFile: isPng,
    accent: EMERALD_ACCENT,
  },
};

const FFMPEG_CORE_BASE = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

export default function ImageConverter({ mode }: { mode: ConverterMode }) {
  const [activeMode, setActiveMode] = useState<ConverterMode>(mode);
  const config = CONVERTERS[activeMode];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isWasmLoading, setIsWasmLoading] = useState(false);
  const [wasmReady, setWasmReady] = useState(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  // Onceki onizleme URL'ini sizdirmadan serbest birak
  useEffect(() => {
    return () => {
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [convertedUrl]);

  // WebAssembly cekirdegi (~30MB) yalnizca gerektiginde, kullanici etkilesimiyle indirilir.
  // Hata durumunda mesaji burada set eder ve null doner.
  const ensureWasmEngine = useCallback(async (): Promise<FFmpeg | null> => {
    if (ffmpegRef.current?.loaded) return ffmpegRef.current;
    setIsWasmLoading(true);
    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { toBlobURL } = await import('@ffmpeg/util');

      if (!ffmpegRef.current) {
        ffmpegRef.current = new FFmpeg();
      }

      await ffmpegRef.current.load({
        coreURL: await toBlobURL(`${FFMPEG_CORE_BASE}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${FFMPEG_CORE_BASE}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      setWasmReady(true);
      return ffmpegRef.current;
    } catch (error) {
      console.error('WASM Error:', error);
      setErrorMsg('Dönüştürme motoru yüklenemedi. Lütfen sayfayı yenileyin.');
      return null;
    } finally {
      setIsWasmLoading(false);
    }
  }, []);

  const resetSelection = () => {
    setSelectedFile(null);
    setConvertedUrl(null);
    setErrorMsg(null);
  };

  const handleSwap = () => {
    if (!config.swapWith) return;
    setActiveMode(config.swapWith);
    resetSelection();
  };

  const processFile = (file: File) => {
    if (!config.isValidFile(file)) {
      setErrorMsg(config.invalidMessage);
      return;
    }
    // Resimler icin 20MB hard-limit; asarsa islemi aninda durdur
    try {
      assertFileWithinLimit(file);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dosya boyutu çok büyük.');
      return;
    }
    setSelectedFile(file);
    setConvertedUrl(null);
    setErrorMsg(null);

    // Dosya secilir secilmez motoru arka planda hazirla
    if (config.engine === 'ffmpeg') {
      void ensureWasmEngine();
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsConverting(true);
    setErrorMsg(null);

    try {
      let blob: Blob;

      if (config.engine === 'heic2any') {
        // heic2any window'a bagimli: yalnizca tarayicida, tiklama aninda yuklenir
        const heic2any = (await import('heic2any')).default;
        const result = await heic2any({
          blob: selectedFile,
          toType: 'image/jpeg',
          quality: 0.9,
        });
        blob = Array.isArray(result) ? result[0] : result;
      } else if (config.engine === 'canvas') {
        if (!config.canvas) throw new Error('Canvas hedefi tanımlı değil.');
        const size = config.vector ? await resolveSvgSize(selectedFile) : undefined;
        blob = await convertWithCanvas(selectedFile, config.canvas, size);
      } else if (config.engine === 'svg') {
        blob = await convertPngToSvg(selectedFile);
      } else if (config.engine === 'ico') {
        blob = await convertPngToIco(selectedFile);
      } else {
        const ffmpeg = await ensureWasmEngine();
        if (!ffmpeg) return; // hata mesaji ensureWasmEngine icinde set edildi

        const { fetchFile } = await import('@ffmpeg/util');
        await ffmpeg.writeFile('input.jpg', await fetchFile(selectedFile));
        await ffmpeg.exec(['-i', 'input.jpg', 'output.webp']);

        const data = await ffmpeg.readFile('output.webp');
        blob = new Blob([new Uint8Array(data as Uint8Array)], { type: 'image/webp' });
      }

      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      // Canvas motorunun hatalari kullaniciya donuk yazilmistir; digerleri teknik
      // oldugu icin genel mesaja dusuruluyor.
      setErrorMsg(
        config.engine === 'canvas' && err instanceof Error && err.message
          ? err.message
          : 'Dönüştürme sırasında bir hata oluştu. Lütfen dosyanızın bozuk olmadığından emin olun.'
      );
    } finally {
      setIsConverting(false);
    }
  };

  const engineBlocked = config.engine === 'ffmpeg' && !wasmReady && isWasmLoading;
  const downloadName = `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'converted'}.${config.outputExtension}`;

  return (
    <ConverterShell
      from={config.inputLabel}
      to={config.outputLabel}
      badge={
        isWasmLoading ? (
          <span className="animate-pulse rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 font-mono text-xs text-blue-600 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400">
            Loading Engine...
          </span>
        ) : undefined
      }
    >
      {config.swapWith && (
        <DirectionToggle
          from={config.inputLabel}
          to={config.outputLabel}
          onSwap={handleSwap}
          accent={config.accent}
        />
      )}

      <ConverterHeading title={config.title} description={config.description} />

      <Dropzone
        accept={config.accept}
        inputLabel={config.inputLabel}
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={config.accent}
        maxSizeMb={IMAGE_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <ConvertButton
          onClick={handleConvert}
          disabled={isConverting || engineBlocked}
          accent={config.accent}
        >
          {isConverting
            ? 'Processing in Browser...'
            : engineBlocked
              ? 'Loading Engine...'
              : `Convert to ${config.outputLabel} Now`}
        </ConvertButton>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={config.accent}
          href={convertedUrl}
          downloadName={downloadName}
          label={`Download ${config.outputLabel} Image`}
        />
      )}
    </ConverterShell>
  );
}
