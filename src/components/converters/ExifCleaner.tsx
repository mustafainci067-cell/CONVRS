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
import { coordToDecimal, gpsToDMS, parseExif, type ExifData } from '@/lib/exif';

const CYAN_ACCENT: Accent = {
  dropzone:
    'border-cyan-300 bg-cyan-50 hover:border-cyan-400 dark:border-cyan-900/50 dark:bg-cyan-950/10 dark:hover:border-cyan-700/50',
  iconBox:
    'border-cyan-200 bg-cyan-100 text-cyan-600 dark:border-cyan-800/50 dark:bg-cyan-900/40 dark:text-cyan-400',
  button: 'bg-cyan-600 text-white hover:bg-cyan-500',
  resultCard: 'border-cyan-200 bg-cyan-50 dark:border-cyan-900/30 dark:bg-cyan-950/30',
  pill: 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]',
};

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

export default function ExifCleaner() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [exif, setExif] = useState<ExifData | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [previewUrl, convertedUrl]);

  const processFile = async (file: File) => {
    if (!isSupportedImage(file)) {
      setErrorMsg('Geçersiz dosya formatı. Yalnızca JPG/PNG/WebP desteklenir.');
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
    setExif(null);

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));

    // JPEG ise EXIF'i cikar (PNG/WebP'de standart EXIF yoktur)
    if (file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg')) {
      const buffer = await file.arrayBuffer();
      const parsed = parseExif(buffer);
      setExif(parsed);
    } else {
      setExif({ valid: false });
    }
  };

  const handleConvert = async () => {
    if (!selectedFile || !previewUrl) return;
    setIsConverting(true);
    setErrorMsg(null);
    try {
      const img = await loadImage(previewUrl);

      // Canvas uzerinden yeniden cizim, tum meta verileri (EXIF dahil) atar.
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D bağlamı oluşturulamadı.');
      ctx.drawImage(img, 0, 0);

      const mime = selectedFile.type || 'image/jpeg';
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, mime, 0.92)
      );
      if (!blob) throw new Error('Canvas çıktısı üretilemedi.');
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Meta veri temizleme hatası.');
    } finally {
      setIsConverting(false);
    }
  };

  const ext = selectedFile?.name.match(/\.(jpg|jpeg|png|webp)$/i)?.[1]?.toLowerCase() || 'jpg';
  const downloadName = `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'image'}-clean.${ext}`;

  const rows: { label: string; value: string | undefined; sensitive: boolean }[] = exif
    ? [
        { label: 'Cihaz Markası', value: exif.make, sensitive: false },
        { label: 'Model', value: exif.model, sensitive: false },
        { label: 'Çekim Tarihi', value: exif.dateTime, sensitive: false },
        { label: 'Yazılım', value: exif.software, sensitive: false },
        { label: 'Açıklama', value: exif.imageDescription, sensitive: false },
        {
          label: 'Enlem',
          value: exif.latitude
            ? `${gpsToDMS(exif.latitude)} (${coordToDecimal(exif.latitude).toFixed(5)})`
            : undefined,
          sensitive: true,
        },
        {
          label: 'Boylam',
          value: exif.longitude
            ? `${gpsToDMS(exif.longitude)} (${coordToDecimal(exif.longitude).toFixed(5)})`
            : undefined,
          sensitive: true,
        },
        { label: 'ISO', value: exif.iso ? String(exif.iso) : undefined, sensitive: false },
        {
          label: 'Diyafram (F)',
          value: exif.fNumber ? `ƒ/${exif.fNumber}` : undefined,
          sensitive: false,
        },
        {
          label: 'Pozlama',
          value: exif.exposureTime ? `1/${Math.round(1 / exif.exposureTime)}s` : undefined,
          sensitive: false,
        },
        {
          label: 'Odak Uzaklığı',
          value: exif.focalLength ? `${exif.focalLength}mm` : undefined,
          sensitive: false,
        },
        { label: 'Yön', value: exif.orientation ? `${exif.orientation}` : undefined, sensitive: false },
      ]
    : [];

  const detectedCount = rows.filter((r) => r.value).length;

  return (
    <ConverterShell from="Image" to="Clean">
      <ConverterHeading
        title="EXIF Metadata Cleaner"
        description="Inspect hidden EXIF metadata like location, device and date embedded in your photos, then strip it to protect your privacy — entirely in your browser."
      />

      <Dropzone
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        inputLabel="Image"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={CYAN_ACCENT}
        maxSizeMb={IMAGE_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {/* EXIF scanner result */}
      {exif && !convertedUrl && (
        <div className="w-full space-y-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl!}
            alt="Source"
            className="mx-auto max-h-48 w-auto rounded-xl border border-zinc-200 object-contain dark:border-zinc-800"
          />

          <div className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                EXIF Taraması
              </p>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                  detectedCount > 0
                    ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                }`}
              >
                {detectedCount > 0 ? `${detectedCount} alan bulundu` : 'Meta veri yok'}
              </span>
            </div>

            {detectedCount === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Bu görselde tespit edilebilir EXIF verisi yok. Görüntü zaten temiz.
              </p>
            ) : (
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {rows
                  .filter((r) => r.value)
                  .map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {r.sensitive && <span className="mr-1 text-cyan-500">📍</span>}
                        {r.label}
                      </span>
                      <span
                        className={`font-mono text-xs ${
                          r.sensitive
                            ? 'text-cyan-600 dark:text-cyan-400'
                            : 'text-zinc-800 dark:text-zinc-200'
                        }`}
                      >
                        {r.value}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {detectedCount > 0 && (
            <ConvertButton onClick={handleConvert} disabled={isConverting} accent={CYAN_ACCENT}>
              {isConverting ? 'Cleaning Metadata...' : 'Remove Metadata & Download'}
            </ConvertButton>
          )}

          {detectedCount === 0 && (
            <ConvertButton onClick={handleConvert} disabled={isConverting} accent={CYAN_ACCENT}>
              {isConverting ? 'Processing...' : 'Download Clean Image'}
            </ConvertButton>
          )}
        </div>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={CYAN_ACCENT}
          href={convertedUrl}
          downloadName={downloadName}
          label="Download Clean Image"
        >
          <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-center text-xs text-cyan-700 dark:border-cyan-900/40 dark:bg-cyan-950/30 dark:text-cyan-300">
            Tüm EXIF meta verileri (konum, cihaz, tarih) başarıyla temizlendi.
          </div>
        </ResultPanel>
      )}
    </ConverterShell>
  );
}
