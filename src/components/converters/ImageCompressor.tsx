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

const ORANGE_ACCENT: Accent = {
  dropzone:
    'border-orange-300 bg-orange-50 hover:border-orange-400 dark:border-orange-900/50 dark:bg-orange-950/10 dark:hover:border-orange-700/50',
  iconBox:
    'border-orange-200 bg-orange-100 text-orange-600 dark:border-orange-800/50 dark:bg-orange-900/40 dark:text-orange-400',
  button: 'bg-orange-600 text-white hover:bg-orange-500',
  resultCard: 'border-orange-200 bg-orange-50 dark:border-orange-900/30 dark:bg-orange-950/30',
  pill: 'bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]',
};

/** Kalite ayarı: lossy formatlar icin düsürülür. */
const COMPRESS_QUALITY = 0.6;
/** Çıktının en buyuk kenarı; daha buyukler bu değere indirilir. */
const MAX_OUTPUT_DIMENSION = 2048;

const isSupportedImage = (file: File) =>
  matchesValidFormat(file, {
    mimes: ['image/jpeg', 'image/png', 'image/webp'],
    extensions: ['jpg', 'jpeg', 'png', 'webp'],
  });

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Görsel okunamadı. Dosya bozuk olabilir.'));
    img.src = url;
  });
}

/**
 * Resmi HTML5 Canvas ile yeniden çizer: lossy formatlarda kaliteyi düşürür,
 * gerekirse en buyuk kenarı sinirlandirarak boyutu kucultur. Format korunur.
 */
async function compressImage(file: File): Promise<Blob> {
  const mime =
    file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')
      ? 'image/png'
      : file.type === 'image/webp' || file.name.toLowerCase().endsWith('.webp')
        ? 'image/webp'
        : 'image/jpeg';

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImage(objectUrl);
    const srcW = img.naturalWidth || img.width;
    const srcH = img.naturalHeight || img.height;
    const ratio = Math.min(1, MAX_OUTPUT_DIMENSION / Math.max(srcW, srcH));
    const width = Math.max(1, Math.round(srcW * ratio));
    const height = Math.max(1, Math.round(srcH * ratio));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D bağlamı oluşturulamadı.');
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(
        resolve,
        mime,
        mime === 'image/png' ? undefined : COMPRESS_QUALITY
      )
    );
    if (!blob) throw new Error('Canvas çıktısı üretilemedi.');
    return blob;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [convertedUrl]);

  const processFile = (file: File) => {
    if (!isSupportedImage(file)) {
      setErrorMsg('Geçersiz dosya formatı');
      return;
    }
    // Resim oldugu icin 20MB hard-limit; asilirsa islemi aninda durdur
    try {
      assertFileWithinLimit(file);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dosya boyutu çok büyük.');
      return;
    }
    setSelectedFile(file);
    setConvertedUrl(null);
    setErrorMsg(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsConverting(true);
    setErrorMsg(null);
    try {
      const blob = await compressImage(selectedFile);
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : 'Sıkıştırma sırasında bir hata oluştu. Dosya bozuk olabilir.'
      );
    } finally {
      setIsConverting(false);
    }
  };

  const ext =
    selectedFile?.name.match(/\.(jpg|jpeg|png|webp)$/i)?.[1]?.toLowerCase() || 'jpg';
  const downloadName = `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'image'}-compressed.${ext}`;

  return (
    <ConverterShell from="Image" to="Compressed">
      <ConverterHeading
        title="Image Compressor"
        description="Upload a JPG, PNG or WebP and download a smaller version — quality dropped and dimensions capped, re-encoded entirely in your browser with HTML5 Canvas."
      />

      <Dropzone
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        inputLabel="Image"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={ORANGE_ACCENT}
        maxSizeMb={IMAGE_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <ConvertButton onClick={handleConvert} disabled={isConverting} accent={ORANGE_ACCENT}>
          {isConverting ? 'Compressing...' : 'Compress Image'}
        </ConvertButton>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={ORANGE_ACCENT}
          href={convertedUrl}
          downloadName={downloadName}
          label="Download Compressed Image"
        />
      )}
    </ConverterShell>
  );
}
