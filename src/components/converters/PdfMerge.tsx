'use client';

import { useCallback, useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  assertFileWithinLimit,
  DOCUMENT_SIZE_LIMIT_MB,
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

const INDIGO_ACCENT: Accent = {
  dropzone:
    'border-indigo-300 bg-indigo-50 hover:border-indigo-400 dark:border-indigo-900/50 dark:bg-indigo-950/10 dark:hover:border-indigo-700/50',
  iconBox:
    'border-indigo-200 bg-indigo-100 text-indigo-600 dark:border-indigo-800/50 dark:bg-indigo-900/40 dark:text-indigo-400',
  button: 'bg-indigo-600 text-white hover:bg-indigo-500',
  resultCard: 'border-indigo-200 bg-indigo-50 dark:border-indigo-900/30 dark:bg-indigo-950/30',
  pill: 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]',
};

const isPdf = (file: File) =>
  matchesValidFormat(file, { mimes: ['application/pdf'], extensions: ['pdf'] });

export default function PdfMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [convertedUrl]);

  const processFiles = (incoming: File[]) => {
    // Her PDF belge oldugu icin 50MB hard-limit; tek bir asim tum grubu reddeder
    try {
      incoming.forEach(assertFileWithinLimit);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dosya boyutu çok büyük.');
      return;
    }
    if (incoming.some((f) => !isPdf(f))) {
      setErrorMsg('Geçersiz dosya formatı');
      return;
    }
    setFiles((prev) => [...prev, ...incoming]);
    setConvertedUrl(null);
    setErrorMsg(null);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /** pdf-lib ile tum PDF'leri tek bir dokumanda birlestirir. */
  const handleMerge = useCallback(async () => {
    setIsConverting(true);
    setErrorMsg(null);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const source = await PDFDocument.load(await file.arrayBuffer());
        const pages = await merged.copyPages(source, source.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setErrorMsg(
        'Birleştirme sırasında bir hata oluştu. Lütfen dosyalarınızın bozuk veya şifreli olmadığından emin olun.'
      );
    } finally {
      setIsConverting(false);
    }
  }, [files]);

  return (
    <ConverterShell from="PDF" to="PDF">
      <ConverterHeading
        title="PDF Merge"
        description="Upload multiple PDF documents and combine them into a single PDF — merged entirely in your browser with pdf-lib."
      />

      <Dropzone
        accept=".pdf,application/pdf"
        inputLabel="PDF"
        fileName={files.length ? `${files.length} PDF${files.length > 1 ? 's' : ''} selected` : undefined}
        onFiles={processFiles}
        multiple
        accent={INDIGO_ACCENT}
        maxSizeMb={DOCUMENT_SIZE_LIMIT_MB}
      />

      {files.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 dark:border-indigo-900/30 dark:bg-indigo-950/30"
            >
              <span className="flex-1 truncate font-mono text-xs text-zinc-700 dark:text-zinc-300">
                {file.name}
                <span className="ml-2 text-zinc-400 dark:text-zinc-500">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-zinc-50 transition-opacity"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {files.length > 0 && !convertedUrl && (
        <ConvertButton onClick={handleMerge} disabled={isConverting} accent={INDIGO_ACCENT}>
          {isConverting ? 'Merging PDFs...' : `Merge ${files.length} PDF${files.length > 1 ? 's' : ''}`}
        </ConvertButton>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={INDIGO_ACCENT}
          href={convertedUrl}
          downloadName="merged.pdf"
          label="Download Merged PDF"
        >
          <p className="w-full rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-center font-mono text-xs text-indigo-600 dark:border-indigo-900/30 dark:bg-indigo-950/30 dark:text-indigo-400">
            {files.length} PDF{files.length === 1 ? '' : 's'} merged into a single document
          </p>
        </ResultPanel>
      )}
    </ConverterShell>
  );
}
