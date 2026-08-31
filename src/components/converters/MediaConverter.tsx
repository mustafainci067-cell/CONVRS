'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import { assertWithinLimit, matchesValidFormat, MEDIA_SIZE_LIMIT_MB } from '@/lib/file-validation';
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

const PINK_ACCENT: Accent = {
  dropzone:
    'border-pink-300 bg-pink-50 hover:border-pink-400 dark:border-pink-900/50 dark:bg-pink-950/10 dark:hover:border-pink-700/50',
  iconBox:
    'border-pink-200 bg-pink-100 text-pink-600 dark:border-pink-800/50 dark:bg-pink-900/40 dark:text-pink-400',
  button: 'bg-pink-600 text-white hover:bg-pink-500',
  resultCard: 'border-pink-200 bg-pink-50 dark:border-pink-900/30 dark:bg-pink-950/30',
  pill: 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]',
};

const FFMPEG_CORE_BASE = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

export type MediaMode =
  | 'mp4-to-webm'
  | 'webm-to-mp4'
  | 'wav-to-mp3'
  | 'mp3-to-wav'
  | 'video-to-mp3';

type MediaConfig = {
  title: string;
  description: string;
  accept: string;
  inputLabel: string;
  outputLabel: string;
  outputExtension: string;
  outputMime: string;
  swapWith?: MediaMode;
  invalidMessage: string;
  isValidFile: (file: File) => boolean;
  /** ffmpeg gorevi: belirtilen adlara yazar ve ciktiyi okur */
  run: (ffmpeg: FFmpeg, file: File) => Promise<Blob>;
};

/** ffmpeg ciktisini okur ve Blob'a cevirir */
const readBlob = async (ffmpeg: FFmpeg, name: string, mime: string): Promise<Blob> => {
  const data = await ffmpeg.readFile(name);
  return new Blob([new Uint8Array(data as Uint8Array)], { type: mime });
};

const MEDIA_CONVERTERS: Record<MediaMode, MediaConfig> = {
  'mp4-to-webm': {
    title: 'MP4 to WebM Converter',
    description:
      'Convert MP4 video into the web-friendly WebM container (VP9 + Opus) with WebAssembly ffmpeg — entirely in your browser.',
    accept: '.mp4,.MP4,video/mp4',
    inputLabel: 'MP4',
    outputLabel: 'WebM',
    outputExtension: 'webm',
    outputMime: 'video/webm',
    swapWith: 'webm-to-mp4',
    invalidMessage: 'Geçersiz dosya formatı',
    isValidFile: (file) => matchesValidFormat(file, { mimes: ['video/mp4'], extensions: ['mp4'] }),
    run: async (ffmpeg, file) => {
      const { fetchFile } = await import('@ffmpeg/util');
      await ffmpeg.writeFile('input.mp4', await fetchFile(file));
      await ffmpeg.exec(['-i', 'input.mp4', '-c:v', 'libvpx-vp9', '-c:a', 'libopus', 'output.webm']);
      return readBlob(ffmpeg, 'output.webm', 'video/webm');
    },
  },
  'webm-to-mp4': {
    title: 'WebM to MP4 Converter',
    description:
      'Convert WebM video back into the broadly compatible MP4 container (H.264 + AAC) with ffmpeg running in your browser.',
    accept: '.webm,.WEBM,video/webm',
    inputLabel: 'WebM',
    outputLabel: 'MP4',
    outputExtension: 'mp4',
    outputMime: 'video/mp4',
    swapWith: 'mp4-to-webm',
    invalidMessage: 'Geçersiz dosya formatı',
    isValidFile: (file) => matchesValidFormat(file, { mimes: ['video/webm'], extensions: ['webm'] }),
    run: async (ffmpeg, file) => {
      const { fetchFile } = await import('@ffmpeg/util');
      await ffmpeg.writeFile('input.webm', await fetchFile(file));
      await ffmpeg.exec([
        '-i',
        'input.webm',
        '-c:v',
        'libx264',
        '-preset',
        'fast',
        '-c:a',
        'aac',
        'output.mp4',
      ]);
      return readBlob(ffmpeg, 'output.mp4', 'video/mp4');
    },
  },
  'wav-to-mp3': {
    title: 'WAV to MP3 Converter',
    description:
      'Convert lossless WAV audio into a compact MP3 (192 kbps) with ffmpeg running in your browser.',
    accept: '.wav,.WAV,audio/wav,audio/x-wav',
    inputLabel: 'WAV',
    outputLabel: 'MP3',
    outputExtension: 'mp3',
    outputMime: 'audio/mpeg',
    swapWith: 'mp3-to-wav',
    invalidMessage: 'Geçersiz dosya formatı',
    isValidFile: (file) =>
      matchesValidFormat(file, {
        mimes: ['audio/wav', 'audio/wave', 'audio/x-wav', 'audio/vnd.wave'],
        extensions: ['wav'],
      }),
    run: async (ffmpeg, file) => {
      const { fetchFile } = await import('@ffmpeg/util');
      await ffmpeg.writeFile('input.wav', await fetchFile(file));
      await ffmpeg.exec(['-i', 'input.wav', '-codec:a', 'libmp3lame', '-b:a', '192k', 'output.mp3']);
      return readBlob(ffmpeg, 'output.mp3', 'audio/mpeg');
    },
  },
  'mp3-to-wav': {
    title: 'MP3 to WAV Converter',
    description:
      'Convert MP3 audio back into a lossless WAV file with ffmpeg running in your browser.',
    accept: '.mp3,.MP3,audio/mpeg,audio/mp3',
    inputLabel: 'MP3',
    outputLabel: 'WAV',
    outputExtension: 'wav',
    outputMime: 'audio/wav',
    swapWith: 'wav-to-mp3',
    invalidMessage: 'Geçersiz dosya formatı',
    isValidFile: (file) =>
      matchesValidFormat(file, { mimes: ['audio/mpeg', 'audio/mp3'], extensions: ['mp3'] }),
    run: async (ffmpeg, file) => {
      const { fetchFile } = await import('@ffmpeg/util');
      await ffmpeg.writeFile('input.mp3', await fetchFile(file));
      await ffmpeg.exec(['-i', 'input.mp3', 'output.wav']);
      return readBlob(ffmpeg, 'output.wav', 'audio/wav');
    },
  },
  'video-to-mp3': {
    title: 'Video to MP3 Converter',
    description:
      'Extract the audio track from a video (MP4, WebM, MOV, MKV, AVI…) and download it as an MP3 — decoded with ffmpeg in your browser.',
    accept: '.mp4,.webm,.mov,.mkv,.avi,.MP4,.WEBM,.MOV,.MKV,.AVI,video/*',
    inputLabel: 'Video',
    outputLabel: 'MP3',
    outputExtension: 'mp3',
    outputMime: 'audio/mpeg',
    invalidMessage: 'Geçersiz dosya formatı',
    isValidFile: (file) =>
      matchesValidFormat(file, {
        mimes: ['video/'],
        extensions: ['mp4', 'webm', 'mov', 'mkv', 'avi'],
      }),
    run: async (ffmpeg, file) => {
      const { fetchFile } = await import('@ffmpeg/util');
      const dot = file.name.lastIndexOf('.');
      const ext = dot === -1 ? 'mp4' : file.name.slice(dot + 1).toLowerCase() || 'mp4';
      await ffmpeg.writeFile(`input.${ext}`, await fetchFile(file));
      await ffmpeg.exec(['-i', `input.${ext}`, '-vn', '-acodec', 'libmp3lame', '-b:a', '192k', 'output.mp3']);
      return readBlob(ffmpeg, 'output.mp3', 'audio/mpeg');
    },
  },
};

export default function MediaConverter({ mode }: { mode: MediaMode }) {
  const [activeMode, setActiveMode] = useState<MediaMode>(mode);
  const config = MEDIA_CONVERTERS[activeMode];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isWasmLoading, setIsWasmLoading] = useState(false);
  const [wasmReady, setWasmReady] = useState(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  useEffect(() => {
    return () => {
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [convertedUrl]);

  const ensureWasmEngine = useCallback(async (): Promise<FFmpeg | null> => {
    if (ffmpegRef.current?.loaded) return ffmpegRef.current;
    setIsWasmLoading(true);
    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { toBlobURL } = await import('@ffmpeg/util');
      if (!ffmpegRef.current) ffmpegRef.current = new FFmpeg();
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
    // Video/audio icin 100MB hard-limit; asilirsa islemi aninda durdur
    try {
      assertWithinLimit(file, MEDIA_SIZE_LIMIT_MB);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dosya boyutu çok büyük.');
      return;
    }
    setSelectedFile(file);
    setConvertedUrl(null);
    setErrorMsg(null);

    // Dosya secilir secilmez motoru arka planda hazirla
    void ensureWasmEngine();
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsConverting(true);
    setErrorMsg(null);
    try {
      const ffmpeg = await ensureWasmEngine();
      if (!ffmpeg) return; // hata mesaji ensureWasmEngine icinde set edildi
      const blob = await config.run(ffmpeg, selectedFile);
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : 'Dönüştürme sırasında bir hata oluştu. Dosya bozuk veya şifreli olabilir.'
      );
    } finally {
      setIsConverting(false);
    }
  };

  const engineBlocked = !wasmReady && isWasmLoading;
  const downloadName = `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'converted'}.${config.outputExtension}`;

  return (
    <ConverterShell
      from={config.inputLabel}
      to={config.outputLabel}
      badge={
        isWasmLoading ? (
          <span className="animate-pulse rounded-full border border-pink-200 bg-pink-50 px-2.5 py-1 font-mono text-xs text-pink-600 dark:border-pink-900/50 dark:bg-pink-900/20 dark:text-pink-400">
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
          accent={PINK_ACCENT}
        />
      )}

      <ConverterHeading title={config.title} description={config.description} />

      <Dropzone
        accept={config.accept}
        inputLabel={config.inputLabel}
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={PINK_ACCENT}
        maxSizeMb={MEDIA_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <ConvertButton
          onClick={handleConvert}
          disabled={isConverting || engineBlocked}
          accent={PINK_ACCENT}
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
          accent={PINK_ACCENT}
          href={convertedUrl}
          downloadName={downloadName}
          label={`Download ${config.outputLabel} File`}
        />
      )}
    </ConverterShell>
  );
}
