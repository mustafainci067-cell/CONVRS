'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import {
  ConvertButton,
  ConverterHeading,
  ConverterShell,
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Yarattigimiz URL'i sizdirmadan serbest birak
  useEffect(() => {
    return () => {
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [convertedUrl]);

  const processFile = (file: File) => {
    if (!isPdf(file)) {
      setErrorMsg('Desteklenmeyen dosya formatı! Lütfen sadece PDF dosyası yükleyin.');
      return;
    }
    setSelectedFile(file);
    setConvertedUrl(null);
    setErrorMsg(null);
  };

  const handleConvert = useCallback(async () => {
    if (!selectedFile) return;
    setIsConverting(true);
    setErrorMsg(null);

    // Onizleme/resim icin DOM'da bir canvas guvence altina al
    const canvas = (canvasRef.current ??= document.createElement('canvas'));
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      setErrorMsg('Canvas desteklenmiyor.');
      setIsConverting(false);
      return;
    }

    let pdf: PDFDocumentProxy | null = null;
    try {
      const { getDocument } = await loadPdfJs();
      const data = new Uint8Array(await selectedFile.arrayBuffer());
      pdf = await getDocument({ data }).promise;

      // Yalnizca ilk sayfa cizilir (task geregi)
      const page = await pdf.getPage(1);
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

      // canvas -> JPG (data URL). Kucuk olcekli, aninda indirilebilir.
      setConvertedUrl(canvas.toDataURL('image/jpeg', 0.92));
    } catch (err) {
      console.error(err);
      setErrorMsg(
        'PDF işlenirken bir hata oluştu. Lütfen dosyanızın bozuk olmadığından emin olun.'
      );
    } finally {
      if (pdf) await pdf.destroy().catch(() => {});
      setIsConverting(false);
    }
  }, [selectedFile]);

  const downloadName = `${selectedFile?.name.replace(/\.pdf$/i, '') || 'converted'}-page-1.jpg`;

  return (
    <ConverterShell from="PDF" to="JPG">
      <ConverterHeading
        title="PDF to JPG Converter"
        description="Upload a PDF and download its first page as a high-resolution JPG image — rendered entirely in your browser with pdf.js."
      />

      <Dropzone
        accept=".pdf,application/pdf"
        inputLabel="PDF"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={RED_ACCENT}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <ConvertButton onClick={handleConvert} disabled={isConverting} accent={RED_ACCENT}>
          {isConverting ? 'Rendering Page 1...' : 'Convert to JPG Now'}
        </ConvertButton>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={RED_ACCENT}
          href={convertedUrl}
          downloadName={downloadName}
          label="Download JPG Image"
        >
          <img
            src={convertedUrl}
            alt="PDF first page preview"
            className="max-h-72 w-full rounded-xl border border-red-200 bg-white object-contain p-2 dark:border-red-900/40 dark:bg-zinc-900"
          />
        </ResultPanel>
      )}
    </ConverterShell>
  );
}
