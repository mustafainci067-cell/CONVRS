'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
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

const RED_ACCENT: Accent = {
  dropzone:
    'border-red-300 bg-red-50 hover:border-red-400 dark:border-red-900/50 dark:bg-red-950/10 dark:hover:border-red-700/50',
  iconBox:
    'border-red-200 bg-red-100 text-red-600 dark:border-red-800/50 dark:bg-red-900/40 dark:text-red-400',
  button: 'bg-red-600 text-white hover:bg-red-500',
  resultCard: 'border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-950/30',
  pill: 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]',
};

type Mode = 'pdf-to-image' | 'image-to-pdf';

const PDF_LABEL = 'PDF';
const IMAGE_LABEL = 'Image';

const isPdf = (file: File) =>
  file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';

/** pdfjs-dist'i ve worker'unu yalnizca ilk dönüsüm aninda, tarayicida yukler. */
async function loadPdfJs() {
  const pdfjs = await import('pdfjs-dist');
  // ESM cekirdeginin worker'i bundler tarafindan ayri bir asset olarak uretilir.
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
  return pdfjs;
}

export default function PdfToJpgConverter() {
  const [activeMode, setActiveMode] = useState<Mode>('pdf-to-image');

  // PDF -> Image: tek PDF dosyasi
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Image -> PDF: birden cok resim
  const [images, setImages] = useState<File[]>([]);

  const [isConverting, setIsConverting] = useState(false);
  const [converted, setConverted] = useState<{
    mode: Mode;
    url?: string;
    downloadName?: string;
    pages?: { dataUrl: string; name: string }[];
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Yarattigimiz URL'i sizdirmadan serbest birak
  useEffect(() => {
    return () => {
      if (converted?.url) URL.revokeObjectURL(converted.url);
    };
  }, [converted]);

  const resetSelection = () => {
    setSelectedFile(null);
    setImages([]);
    setConverted(null);
    setErrorMsg(null);
  };

  const handleSwap = () => {
    setActiveMode((m) => (m === 'pdf-to-image' ? 'image-to-pdf' : 'pdf-to-image'));
    resetSelection();
  };

  const processPdf = (file: File) => {
    if (!isPdf(file)) {
      setErrorMsg('Desteklenmeyen dosya formatı! Lütfen sadece PDF dosyası yükleyin.');
      return;
    }
    setSelectedFile(file);
    setConverted(null);
    setErrorMsg(null);
  };

  const processImages = (files: File[]) => {
    setImages((prev) => [...prev, ...files]);
    setConverted(null);
    setErrorMsg(null);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /** PDF'in tum sayfalarini canvas ile JPG'ye cikarir. */
  const convertPdfToImages = async (file: File) => {
    const canvas = (canvasRef.current ??= document.createElement('canvas'));
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Canvas desteklenmiyor.');

    let pdf: PDFDocumentProxy | null = null;
    try {
      const { getDocument } = await loadPdfJs();
      pdf = await getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;

      const base = file.name.replace(/\.pdf$/i, '') || 'converted';
      const pages: { dataUrl: string; name: string }[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({
          canvas,
          canvasContext: ctx,
          viewport,
          // Arka plani beyaz yap, yoksa jpeg siyah zemine monte edilebilir
          background: '#ffffff',
        }).promise;
        page.cleanup();

        pages.push({
          dataUrl: canvas.toDataURL('image/jpeg', 0.92),
          name: `${base}-page-${i}.jpg`,
        });
      }

      // Birden cok sayfa icin tek zip dosyasi uret
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      pages.forEach((page) => zip.file(page.name, page.dataUrl.split(',')[1], { base64: true }));
      const blob = await zip.generateAsync({ type: 'blob' });

      return {
        mode: 'pdf-to-image' as const,
        url: URL.createObjectURL(blob),
        downloadName: `${base}-pages.zip`,
        pages,
      };
    } finally {
      if (pdf) await pdf.destroy().catch(() => {});
    }
  };

  /** Secilen resimleri pdf-lib ile tek bir PDF'te birlestirir. */
  const convertImagesToPdf = async (files: File[]) => {
    const { PDFDocument } = await import('pdf-lib');
    const pdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
      const img = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
      const page = pdf.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    const bytes = await pdf.save();
    const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
    return {
      mode: 'image-to-pdf' as const,
      url: URL.createObjectURL(blob),
      downloadName: 'combined.pdf',
    };
  };

  const handleConvert = useCallback(async () => {
    setIsConverting(true);
    setErrorMsg(null);
    try {
      const result =
        activeMode === 'pdf-to-image' && selectedFile
          ? await convertPdfToImages(selectedFile)
          : activeMode === 'image-to-pdf' && images.length
            ? await convertImagesToPdf(images)
            : null;
      if (!result) return;
      setConverted(result);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        'Dönüştürme sırasında bir hata oluştu. Lütfen dosyalarınızın bozuk olmadığından emin olun.'
      );
    } finally {
      setIsConverting(false);
    }
  }, [activeMode, selectedFile, images]);

  const fromLabel = activeMode === 'pdf-to-image' ? PDF_LABEL : IMAGE_LABEL;
  const toLabel = activeMode === 'pdf-to-image' ? IMAGE_LABEL : PDF_LABEL;
  const ready =
    (activeMode === 'pdf-to-image' && selectedFile) || (activeMode === 'image-to-pdf' && images.length > 0);

  return (
    <ConverterShell from={fromLabel} to={toLabel}>
      <DirectionToggle
        from={fromLabel}
        to={toLabel}
        onSwap={handleSwap}
        accent={RED_ACCENT}
      />

      {activeMode === 'pdf-to-image' ? (
        <>
          <ConverterHeading
            title="PDF to Image Converter"
            description="Upload a PDF and download every page as a high-resolution JPG — the pages are rendered entirely in your browser with pdf.js."
          />

          <Dropzone
            accept=".pdf,application/pdf"
            inputLabel="PDF"
            fileName={selectedFile?.name}
            onFile={processPdf}
            accent={RED_ACCENT}
          />
        </>
      ) : (
        <>
          <ConverterHeading
            title="Image to PDF Converter"
            description="Upload one or more JPG/PNG images and combine them into a single PDF document — built in your browser with pdf-lib."
          />

          <Dropzone
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            inputLabel="Image"
            fileName={images.length ? `${images.length} image${images.length > 1 ? 's' : ''} selected` : undefined}
            onFiles={processImages}
            multiple
            accent={RED_ACCENT}
          />

          {images.length > 0 && (
            <div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-4">
              {images.map((img, i) => (
                <div
                  key={`${img.name}-${i}`}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-red-200 bg-white dark:border-red-900/40 dark:bg-zinc-900"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- yerel onizleme, optimize edilemez */}
                  <img
                    src={URL.createObjectURL(img)}
                    alt={img.name}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    aria-label={`Remove ${img.name}`}
                    className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-zinc-50 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {ready && !converted && (
        <ConvertButton onClick={handleConvert} disabled={isConverting} accent={RED_ACCENT}>
          {isConverting
            ? activeMode === 'pdf-to-image'
              ? 'Rendering Pages...'
              : 'Building PDF...'
            : `Convert ${fromLabel} to ${toLabel} Now`}
        </ConvertButton>
      )}

      {converted && activeMode === 'pdf-to-image' && (
        <ResultPanel
          accent={RED_ACCENT}
          href={converted.url!}
          downloadName={converted.downloadName!}
          label={`Download All (${converted.pages?.length ?? 1} JPG${converted.pages?.length === 1 ? '' : 's'})`}
        >
          <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
            {converted.pages?.map((page) => (
              <div
                key={page.name}
                className="relative aspect-square overflow-hidden rounded-lg border border-red-200 bg-white dark:border-red-900/40 dark:bg-zinc-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- data URL onizleme */}
                <img src={page.dataUrl} alt={page.name} className="h-full w-full object-contain" />
              </div>
            ))}
          </div>
        </ResultPanel>
      )}

      {converted && activeMode === 'image-to-pdf' && (
        <ResultPanel
          accent={RED_ACCENT}
          href={converted.url!}
          downloadName={converted.downloadName!}
          label="Download PDF Document"
        >
          <p className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center font-mono text-xs text-red-600 dark:border-red-900/30 dark:bg-red-950/30 dark:text-red-400">
            {images.length} page{images.length === 1 ? '' : 's'} combined into a single PDF
          </p>
        </ResultPanel>
      )}
    </ConverterShell>
  );
}
