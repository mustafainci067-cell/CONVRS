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

const LIME_ACCENT: Accent = {
  dropzone:
    'border-lime-300 bg-lime-50 hover:border-lime-400 dark:border-lime-900/50 dark:bg-lime-950/10 dark:hover:border-lime-700/50',
  iconBox:
    'border-lime-200 bg-lime-100 text-lime-700 dark:border-lime-800/50 dark:bg-lime-900/40 dark:text-lime-400',
  button: 'bg-lime-600 text-white hover:bg-lime-500',
  resultCard: 'border-lime-200 bg-lime-50 dark:border-lime-900/30 dark:bg-lime-950/30',
  pill: 'bg-lime-600 text-white shadow-[0_0_15px_rgba(132,204,22,0.4)]',
};

const isSupportedImage = (file: File) =>
  matchesValidFormat(file, {
    mimes: ['image/jpeg', 'image/png', 'image/webp'],
    extensions: ['jpg', 'jpeg', 'png', 'webp'],
  });

export default function RemoveBackground() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleRemove = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      // Model (~40MB) yalnizca ilk kullanimda tarayicida indirilir.
      const { removeBackground } = await import('@imgly/background-removal');
      const blob = await removeBackground(selectedFile, {
        output: { format: 'image/png', quality: 0.9 },
      });
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setErrorMsg(
        'Arka plan kaldırılırken bir hata oluştu. Görüntü modeli yüklenememiş ya da dosya bozuk olabilir.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const baseName = selectedFile?.name.replace(/\.[^/.]+$/, '') || 'image';

  return (
    <ConverterShell from="Image" to="PNG">
      <ConverterHeading
        title="Remove Background"
        description="Upload a JPG, PNG or WebP and get a transparent-background PNG — the subject is segmented in your browser by an on-device AI model."
      />

      <Dropzone
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        inputLabel="Image"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={LIME_ACCENT}
        maxSizeMb={IMAGE_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <ConvertButton onClick={handleRemove} disabled={isProcessing} accent={LIME_ACCENT}>
          {isProcessing
            ? 'Removing Background... (first run loads the model)'
            : 'Remove Background'}
        </ConvertButton>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={LIME_ACCENT}
          href={convertedUrl}
          downloadName={`${baseName}-no-bg.png`}
          label="Download Transparent PNG"
        />
      )}
    </ConverterShell>
  );
}
