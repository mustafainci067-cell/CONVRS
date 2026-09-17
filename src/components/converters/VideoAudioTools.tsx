'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import { assertWithinLimit, matchesValidFormat, MEDIA_SIZE_LIMIT_MB } from '@/lib/file-validation';
import {
  ConvertButton,
  ConverterHeading,
  ConverterShell,
  Dropzone,
  ErrorBanner,
  ResultPanel,
  type Accent,
} from './ConverterShell';

const PURPLE_ACCENT: Accent = {
  dropzone:
    'border-purple-300 bg-purple-50 hover:border-purple-400 dark:border-purple-900/50 dark:bg-purple-950/10 dark:hover:border-purple-700/50',
  iconBox:
    'border-purple-200 bg-purple-100 text-purple-600 dark:border-purple-800/50 dark:bg-purple-900/40 dark:text-purple-400',
  button: 'bg-purple-600 text-white hover:bg-purple-500',
  resultCard: 'border-purple-200 bg-purple-50 dark:border-purple-900/30 dark:bg-purple-950/30',
  pill: 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]',
};

const FFMPEG_CORE_BASE = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

export type VideoAudioToolMode =
  | 'video-to-gif'
  | 'mute-video'
  | 'audio-trimmer'
  | 'volume-booster'
  | 'video-speed'
  | 'video-resizer';

type ToolConfig = {
  title: string;
  description: string;
  accept: string;
  inputLabel: string;
  outputLabel: string;
  outputExtension: string;
  outputMime: string;
  invalidMessage: string;
  isValidFile: (file: File) => boolean;
  /** ffmpeg gorevi: belirtilen adlara yazar ve ciktiyi okur */
  run: (ffmpeg: FFmpeg, file: File, options?: ToolOptions) => Promise<Blob>;
  /** Opsiyonel: araca ozel ek ayarlar */
  hasOptions?: boolean;
};

type ToolOptions = {
  fps?: number;
  startTime?: number;
  endTime?: number;
  volumeMultiplier?: number;
  /** Video hız çarpanı (0.5, 1.25, 1.5, 2) */
  speedMultiplier?: number;
  /** Video boyutlandırma/kırpma seçenekleri */
  width?: number;
  height?: number;
  scaleMode?: 'resize' | 'crop';
};

/** ffmpeg ciktisini okur ve Blob'a cevirir */
const readBlob = async (ffmpeg: FFmpeg, name: string, mime: string): Promise<Blob> => {
  const data = await ffmpeg.readFile(name);
  return new Blob([new Uint8Array(data as Uint8Array)], { type: mime });
};

const TOOL_CONFIGS: Record<VideoAudioToolMode, ToolConfig> = {
  'video-to-gif': {
    title: 'Video to GIF',
    description:
      'Convert your short videos into animated GIFs instantly. Adjust FPS and quality settings for optimal results.',
    accept: '.mp4,.webm,.mov,.avi,.mkv,.MP4,.WEBM,.MOV,.AVI,.MKV,video/*',
    inputLabel: 'Video',
    outputLabel: 'GIF',
    outputExtension: 'gif',
    outputMime: 'image/gif',
    invalidMessage: 'Geçersiz dosya formatı',
    isValidFile: (file) =>
      matchesValidFormat(file, {
        mimes: ['video/'],
        extensions: ['mp4', 'webm', 'mov', 'avi', 'mkv'],
      }),
    hasOptions: true,
    run: async (ffmpeg, file, options) => {
      const { fetchFile } = await import('@ffmpeg/util');
      const dot = file.name.lastIndexOf('.');
      const ext = dot === -1 ? 'mp4' : file.name.slice(dot + 1).toLowerCase() || 'mp4';
      await ffmpeg.writeFile(`input.${ext}`, await fetchFile(file));

      const fps = options?.fps || 15;
      const palettegen = `palettegen=max_colors=128:stats_mode=diff`;
      const palette = `paletteuse=dither=bayer:bayer_scale=3`;

      // Generate palette for better quality
      await ffmpeg.exec([
        '-i', `input.${ext}`,
        '-vf', `fps=${fps},${palettegen}`,
        '-y', 'palette.png'
      ]);

      // Generate GIF using palette
      await ffmpeg.exec([
        '-i', `input.${ext}`,
        '-i', 'palette.png',
        '-lavfi', `fps=${fps};${palette}`,
        '-y', 'output.gif'
      ]);

      return readBlob(ffmpeg, 'output.gif', 'image/gif');
    },
  },
  'mute-video': {
    title: 'Mute Video',
    description:
      'Remove the audio track from your video completely. Export a silent video in the same format.',
    accept: '.mp4,.webm,.mov,.avi,.mkv,.MP4,.WEBM,.MOV,.AVI,.MKV,video/*',
    inputLabel: 'Video',
    outputLabel: 'Video (Muted)',
    outputExtension: 'mp4',
    outputMime: 'video/mp4',
    invalidMessage: 'Geçersiz dosya formatı',
    isValidFile: (file) =>
      matchesValidFormat(file, {
        mimes: ['video/'],
        extensions: ['mp4', 'webm', 'mov', 'avi', 'mkv'],
      }),
    run: async (ffmpeg, file) => {
      const { fetchFile } = await import('@ffmpeg/util');
      const dot = file.name.lastIndexOf('.');
      const ext = dot === -1 ? 'mp4' : file.name.slice(dot + 1).toLowerCase() || 'mp4';
      await ffmpeg.writeFile(`input.${ext}`, await fetchFile(file));

      // Remove audio stream (-an flag)
      await ffmpeg.exec([
        '-i', `input.${ext}`,
        '-an',           // Remove audio
        '-c:v', 'copy', // Copy video codec without re-encoding
        '-y', 'output.mp4'
      ]);

      return readBlob(ffmpeg, 'output.mp4', 'video/mp4');
    },
  },
  'audio-trimmer': {
    title: 'Audio Trimmer',
    description:
      'Trim your audio files (MP3/WAV) by specifying start and end times. Extract only the part you need.',
    accept: '.mp3,.wav,.MP3,.WAV,audio/*',
    inputLabel: 'Audio (MP3/WAV)',
    outputLabel: 'Trimmed Audio',
    outputExtension: 'mp3',
    outputMime: 'audio/mpeg',
    invalidMessage: 'Geçersiz ses dosyası formatı',
    isValidFile: (file) =>
      matchesValidFormat(file, {
        mimes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/wave', 'audio/x-wav'],
        extensions: ['mp3', 'wav'],
      }),
    hasOptions: true,
    run: async (ffmpeg, file, options) => {
      const { fetchFile } = await import('@ffmpeg/util');
      const dot = file.name.lastIndexOf('.');
      const ext = dot === -1 ? 'mp3' : file.name.slice(dot + 1).toLowerCase() || 'mp3';
      await ffmpeg.writeFile(`input.${ext}`, await fetchFile(file));

      const startTime = options?.startTime || 0;
      const endTime = options?.endTime || 0;

      // Build ffmpeg command with trim options
      const args: string[] = ['-i', `input.${ext}`];

      if (startTime > 0) {
        args.push('-ss', startTime.toString());
      }

      if (endTime > 0) {
        args.push('-to', endTime.toString());
      }

      args.push('-acodec', 'libmp3lame', '-b:a', '192k', '-y', 'output.mp3');

      await ffmpeg.exec(args);

      return readBlob(ffmpeg, 'output.mp3', 'audio/mpeg');
    },
  },
  'volume-booster': {
    title: 'Volume Booster',
    description:
      'Boost the volume of quiet audio files by 1.5x, 2x, or 3x. Supports MP3 and WAV formats.',
    accept: '.mp3,.wav,.MP3,.WAV,audio/*',
    inputLabel: 'Audio (MP3/WAV)',
    outputLabel: 'Boosted Audio',
    outputExtension: 'mp3',
    outputMime: 'audio/mpeg',
    invalidMessage: 'Geçersiz ses dosyası formatı',
    isValidFile: (file) =>
      matchesValidFormat(file, {
        mimes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/wave', 'audio/x-wav'],
        extensions: ['mp3', 'wav'],
      }),
    hasOptions: true,
    run: async (ffmpeg, file, options) => {
      const { fetchFile } = await import('@ffmpeg/util');
      const dot = file.name.lastIndexOf('.');
      const ext = dot === -1 ? 'mp3' : file.name.slice(dot + 1).toLowerCase() || 'mp3';
      await ffmpeg.writeFile(`input.${ext}`, await fetchFile(file));

      const multiplier = options?.volumeMultiplier || 2;

      // Use volume filter to boost audio
      await ffmpeg.exec([
        '-i', `input.${ext}`,
        '-af', `volume=${multiplier}`,
        '-acodec', 'libmp3lame',
        '-b:a', '192k',
        '-y', 'output.mp3'
      ]);

      return readBlob(ffmpeg, 'output.mp3', 'audio/mpeg');
    },
  },
  'video-speed': {
    title: 'Video Speed Changer',
    description:
      'Adjust the playback speed of your video — 0.5x slow motion, 1.25x, 1.5x, or 2x fast motion. Export as a new video with FFmpeg in your browser.',
    accept: '.mp4,.webm,.mov,.avi,.mkv,.MP4,.WEBM,.MOV,.AVI,.MKV,video/*',
    inputLabel: 'Video',
    outputLabel: 'Video',
    outputExtension: 'mp4',
    outputMime: 'video/mp4',
    invalidMessage: 'Geçersiz dosya formatı',
    isValidFile: (file) =>
      matchesValidFormat(file, {
        mimes: ['video/'],
        extensions: ['mp4', 'webm', 'mov', 'avi', 'mkv'],
      }),
    hasOptions: true,
    run: async (ffmpeg, file, options) => {
      const { fetchFile } = await import('@ffmpeg/util');
      const dot = file.name.lastIndexOf('.');
      const ext = dot === -1 ? 'mp4' : file.name.slice(dot + 1).toLowerCase() || 'mp4';
      await ffmpeg.writeFile(`input.${ext}`, await fetchFile(file));

      const speed = options?.speedMultiplier || 1.5;

      // setpts video zamanlamasini olcekler; atempo sesi bozmadan hizini ayarlar
      const videoFilter = `setpts=${1 / speed}*PTS`;
      const audioFilter = `atempo=${speed}`;

      try {
        // Ses + video birlikte (filmin ses kanali varsa)
        await ffmpeg.exec([
          '-i', `input.${ext}`,
          '-filter_complex',
          `[0:v]${videoFilter}[v];[0:a]${audioFilter}[a]`,
          '-map', '[v]',
          '-map', '[a]',
          '-c:v', 'libx264',
          '-preset', 'fast',
          '-c:a', 'aac',
          '-movflags', '+faststart',
          '-y', 'output.mp4'
        ]);
      } catch {
        // Sessiz video (ses kanali yok): yalnizca video filtresiyle tekrar dene
        await ffmpeg.exec([
          '-i', `input.${ext}`,
          '-vf', videoFilter,
          '-an',
          '-c:v', 'libx264',
          '-preset', 'fast',
          '-movflags', '+faststart',
          '-y', 'output.mp4'
        ]);
      }

      return readBlob(ffmpeg, 'output.mp4', 'video/mp4');
    },
  },
  'video-resizer': {
    title: 'Video Resizer / Cropper',
    description:
      'Resize or crop your video for social media. Convert horizontal (16:9) video to vertical (9:16), or enter custom pixel dimensions.',
    accept: '.mp4,.webm,.mov,.avi,.mkv,.MP4,.WEBM,.MOV,.AVI,.MKV,video/*',
    inputLabel: 'Video',
    outputLabel: 'Video',
    outputExtension: 'mp4',
    outputMime: 'video/mp4',
    invalidMessage: 'Geçersiz dosya formatı',
    isValidFile: (file) =>
      matchesValidFormat(file, {
        mimes: ['video/'],
        extensions: ['mp4', 'webm', 'mov', 'avi', 'mkv'],
      }),
    hasOptions: true,
    run: async (ffmpeg, file, options) => {
      const { fetchFile } = await import('@ffmpeg/util');
      const dot = file.name.lastIndexOf('.');
      const ext = dot === -1 ? 'mp4' : file.name.slice(dot + 1).toLowerCase() || 'mp4';
      await ffmpeg.writeFile(`input.${ext}`, await fetchFile(file));

      const scaleMode = options?.scaleMode || 'crop';
      const width = options?.width || 720;
      const height = options?.height || 1280;

      // 'crop': orani koruyup ortadan kirsarak hedef boyuta getir (9:16 secimi vb.)
      // 'resize': dogrudan hedef piksel boyutuna olcekler (cast/uzatma)
      const filter =
        scaleMode === 'crop'
          ? `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}`
          : `scale=${width}:${height}`;

      await ffmpeg.exec([
        '-i', `input.${ext}`,
        '-vf', filter,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-c:a', 'aac',
        '-movflags', '+faststart',
        '-y', 'output.mp4'
      ]);

      return readBlob(ffmpeg, 'output.mp4', 'video/mp4');
    },
  },
};

export default function VideoAudioTools({ mode }: { mode: VideoAudioToolMode }) {
  const config = TOOL_CONFIGS[mode];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isWasmLoading, setIsWasmLoading] = useState(false);
  const [wasmReady, setWasmReady] = useState(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  // Surden yukleme yarisi: dosya secimi (onceden yukle) ile "Process" tiklamasi
  // ayni anda ensureWasmEngine cagirabilir; ortak in-flight promise iki kez
  // load() calistirmayi onler.
  const wasmPromiseRef = useRef<Promise<FFmpeg | null> | null>(null);

  // Tool-specific options
  const [fps, setFps] = useState(15);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [volumeMultiplier, setVolumeMultiplier] = useState(2);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.5);
  const [resizeWidth, setResizeWidth] = useState(720);
  const [resizeHeight, setResizeHeight] = useState(1280);
  const [scaleMode, setScaleMode] = useState<'resize' | 'crop'>('crop');

  useEffect(() => {
    return () => {
      if (processedUrl) URL.revokeObjectURL(processedUrl);
    };
  }, [processedUrl]);

  const ensureWasmEngine = useCallback((): Promise<FFmpeg | null> => {
    if (ffmpegRef.current?.loaded) return Promise.resolve(ffmpegRef.current);
    if (wasmPromiseRef.current) return wasmPromiseRef.current;

    setIsWasmLoading(true);
    wasmPromiseRef.current = (async (): Promise<FFmpeg | null> => {
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
        wasmPromiseRef.current = null;
      }
    })();
    return wasmPromiseRef.current;
  }, []);

  const processFile = (file: File) => {
    if (!config.isValidFile(file)) {
      setErrorMsg(config.invalidMessage);
      return;
    }
    try {
      assertWithinLimit(file, MEDIA_SIZE_LIMIT_MB);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dosya boyutu çok büyük.');
      return;
    }
    setSelectedFile(file);
    setProcessedUrl(null);
    setErrorMsg(null);

    // Start loading WASM engine in background
    void ensureWasmEngine();
  };

  const handleProcess = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const ffmpeg = await ensureWasmEngine();
      if (!ffmpeg) return;

      const options: ToolOptions = {
        fps,
        startTime,
        endTime,
        volumeMultiplier,
        speedMultiplier,
        width: resizeWidth,
        height: resizeHeight,
        scaleMode,
      };

      const blob = await config.run(ffmpeg, selectedFile, options);
      setProcessedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : 'İşleme sırasında bir hata oluştu. Dosya bozuk veya şifreli olabilir.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const engineBlocked = !wasmReady && isWasmLoading;
  const downloadName = `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'output'}.${config.outputExtension}`;

  const renderOptions = () => {
    if (!config.hasOptions) return null;

    if (mode === 'video-to-gif') {
      return (
        <div className="w-full space-y-4 rounded-xl border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-900/30 dark:bg-purple-950/20">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              FPS (Frames Per Second)
            </label>
            <span className="font-mono text-sm text-purple-600 dark:text-purple-400">{fps}</span>
          </div>
          <input
            type="range"
            min="10"
            max="30"
            value={fps}
            onChange={(e) => setFps(Number(e.target.value))}
            className="w-full accent-purple-600"
          />
          <div className="flex justify-between text-xs text-zinc-500">
            <span>10 FPS (Küçük dosya)</span>
            <span>30 FPS (Yüksek kalite)</span>
          </div>
        </div>
      );
    }

    if (mode === 'audio-trimmer') {
      return (
        <div className="w-full space-y-4 rounded-xl border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-900/30 dark:bg-purple-950/20">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Başlangıç (saniye)
              </label>
              <input
                type="number"
                min="0"
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
                className="w-full rounded-lg border border-purple-200 bg-white px-3 py-2 font-mono text-sm dark:border-purple-800 dark:bg-zinc-900"
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Bitiş (saniye)
              </label>
              <input
                type="number"
                min="0"
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
                className="w-full rounded-lg border border-purple-200 bg-white px-3 py-2 font-mono text-sm dark:border-purple-800 dark:bg-zinc-900"
                placeholder="Süre"
              />
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            Boş bırakırsanız dosyanın başına veya sonuna kadar kırpılır.
          </p>
        </div>
      );
    }

    if (mode === 'volume-booster') {
      return (
        <div className="w-full space-y-4 rounded-xl border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-900/30 dark:bg-purple-950/20">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Ses Seviyesi Çarpımı
            </label>
            <span className="font-mono text-lg font-bold text-purple-600 dark:text-purple-400">
              x{volumeMultiplier}
            </span>
          </div>
          <div className="flex gap-2">
            {[1.5, 2, 2.5, 3].map((mult) => (
              <button
                key={mult}
                type="button"
                onClick={() => setVolumeMultiplier(mult)}
                className={`flex-1 rounded-lg py-2 font-mono text-sm font-medium transition-all ${
                  volumeMultiplier === mult
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'border border-purple-200 bg-white text-zinc-700 hover:border-purple-400 dark:border-purple-800 dark:bg-zinc-900 dark:text-zinc-300'
                }`}
              >
                x{mult}
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-500">
            Yüksek oranlarda dijital bozulma (distorsiyon) riski artabilir.
          </p>
        </div>
      );
    }

    if (mode === 'video-speed') {
      return (
        <div className="w-full space-y-4 rounded-xl border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-900/30 dark:bg-purple-950/20">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Video Hızı
            </label>
            <span className="font-mono text-lg font-bold text-purple-600 dark:text-purple-400">
              {speedMultiplier}x
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[0.5, 1.25, 1.5, 2].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => setSpeedMultiplier(speed)}
                className={`rounded-lg py-2.5 font-mono text-sm font-medium transition-all ${
                  speedMultiplier === speed
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'border border-purple-200 bg-white text-zinc-700 hover:border-purple-400 dark:border-purple-800 dark:bg-zinc-900 dark:text-zinc-300'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-500">
            {speedMultiplier < 1
              ? 'Yavaş çekim (slow motion) — video uzar, ses pesleşir.'
              : 'Hızlı çekim — video kısalır, ses tizleşir.'}
          </p>
        </div>
      );
    }

    if (mode === 'video-resizer') {
      return (
        <div className="w-full space-y-4 rounded-xl border border-purple-200 bg-purple-50/50 p-4 dark:border-purple-900/30 dark:bg-purple-950/20">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Dönüştürme Modu
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setScaleMode('crop')}
              className={`rounded-lg py-2.5 font-mono text-sm font-medium transition-all ${
                scaleMode === 'crop'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'border border-purple-200 bg-white text-zinc-700 hover:border-purple-400 dark:border-purple-800 dark:bg-zinc-900 dark:text-zinc-300'
              }`}
            >
              Center Crop (9:16)
            </button>
            <button
              type="button"
              onClick={() => setScaleMode('resize')}
              className={`rounded-lg py-2.5 font-mono text-sm font-medium transition-all ${
                scaleMode === 'resize'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'border border-purple-200 bg-white text-zinc-700 hover:border-purple-400 dark:border-purple-800 dark:bg-zinc-900 dark:text-zinc-300'
              }`}
            >
              Özel Boyut
            </button>
          </div>

          {/* Sosyal medya kisa yollari */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Hızlı Şablonlar
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: '9:16 (720×1280)', w: 720, h: 1280 },
                { label: '1:1 (1080×1080)', w: 1080, h: 1080 },
                { label: '4:5 (1080×1350)', w: 1080, h: 1350 },
                { label: '16:9 (1920×1080)', w: 1920, h: 1080 },
              ].map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => {
                    setResizeWidth(t.w);
                    setResizeHeight(t.h);
                    setScaleMode('crop');
                  }}
                  className={`rounded-lg py-2 text-xs font-medium transition-all ${
                    resizeWidth === t.w && resizeHeight === t.h
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'border border-purple-200 bg-white text-zinc-600 hover:border-purple-400 dark:border-purple-800 dark:bg-zinc-900 dark:text-zinc-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Genişlik (px)
              </label>
              <input
                type="number"
                min="16"
                max="4096"
                value={resizeWidth}
                onChange={(e) => setResizeWidth(Number(e.target.value))}
                className="w-full rounded-lg border border-purple-200 bg-white px-3 py-2 font-mono text-sm dark:border-purple-800 dark:bg-zinc-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Yükseklik (px)
              </label>
              <input
                type="number"
                min="16"
                max="4096"
                value={resizeHeight}
                onChange={(e) => setResizeHeight(Number(e.target.value))}
                className="w-full rounded-lg border border-purple-200 bg-white px-3 py-2 font-mono text-sm dark:border-purple-800 dark:bg-zinc-900"
              />
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            Center Crop modunda yatay (16:9) video ortadan kırpılarak hedef boyuta dikey hale getirilir.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ConverterShell
      from={config.inputLabel}
      to={config.outputLabel}
      badge={
        isWasmLoading ? (
          <span className="animate-pulse rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 font-mono text-xs text-purple-600 dark:border-purple-900/50 dark:bg-purple-900/20 dark:text-purple-400">
            Loading Engine...
          </span>
        ) : undefined
      }
    >
      <ConverterHeading title={config.title} description={config.description} />

      <Dropzone
        accept={config.accept}
        inputLabel={config.inputLabel}
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={PURPLE_ACCENT}
        maxSizeMb={MEDIA_SIZE_LIMIT_MB}
      />

      {selectedFile && renderOptions()}

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !processedUrl && (
        <ConvertButton
          onClick={handleProcess}
          disabled={isProcessing || engineBlocked}
          accent={PURPLE_ACCENT}
        >
          {isProcessing
            ? 'Processing in Browser...'
            : engineBlocked
              ? 'Loading Engine...'
              : `Process ${config.outputLabel}`}
        </ConvertButton>
      )}

      {processedUrl && (
        <ResultPanel
          accent={PURPLE_ACCENT}
          href={processedUrl}
          downloadName={downloadName}
          label={`Download ${config.outputLabel}`}
        />
      )}
    </ConverterShell>
  );
}
