'use client';

import { useEffect, useState } from 'react';
import { csvToVcf, vcfToCsv } from '@/lib/vcf';
import {
  assertFileWithinLimit,
  DOCUMENT_SIZE_LIMIT_MB,
  matchesValidFormat,
} from '@/lib/file-validation';
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

const FUCHSIA_ACCENT: Accent = {
  dropzone:
    'border-fuchsia-300 bg-fuchsia-50 hover:border-fuchsia-400 dark:border-fuchsia-900/50 dark:bg-fuchsia-950/10 dark:hover:border-fuchsia-700/50',
  iconBox:
    'border-fuchsia-200 bg-fuchsia-100 text-fuchsia-600 dark:border-fuchsia-800/50 dark:bg-fuchsia-900/40 dark:text-fuchsia-400',
  button: 'bg-fuchsia-600 text-white hover:bg-fuchsia-500',
  resultCard: 'border-fuchsia-200 bg-fuchsia-50 dark:border-fuchsia-900/30 dark:bg-fuchsia-950/30',
  pill: 'bg-fuchsia-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]',
};

type Mode = 'vcf-to-csv' | 'csv-to-vcf';

const PREVIEW_LIMIT = 1800;

const isVcf = (file: File) =>
  matchesValidFormat(file, {
    mimes: ['text/vcard', 'text/x-vcard', 'text/directory'],
    extensions: ['vcf', 'vcard'],
  });

const isCsv = (file: File) =>
  matchesValidFormat(file, { mimes: ['text/csv'], extensions: ['csv'] });

export default function VcfToCsv() {
  const [activeMode, setActiveMode] = useState<Mode>('vcf-to-csv');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isVcfToCsv = activeMode === 'vcf-to-csv';

  useEffect(() => {
    return () => {
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [convertedUrl]);

  const resetSelection = () => {
    setSelectedFile(null);
    setConvertedUrl(null);
    setPreview(null);
    setErrorMsg(null);
  };

  const handleSwap = () => {
    setActiveMode(isVcfToCsv ? 'csv-to-vcf' : 'vcf-to-csv');
    resetSelection();
  };

  const processFile = (file: File) => {
    if (isVcfToCsv ? !isVcf(file) : !isCsv(file)) {
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
    setPreview(null);
    setErrorMsg(null);
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsConverting(true);
    setErrorMsg(null);
    try {
      const text = await selectedFile.text();
      const output = isVcfToCsv ? vcfToCsv(text) : csvToVcf(text);
      setPreview(output.slice(0, PREVIEW_LIMIT));
      setConvertedUrl(
        URL.createObjectURL(
          new Blob([output], {
            type: isVcfToCsv ? 'text/csv;charset=utf-8' : 'text/vcard;charset=utf-8',
          })
        )
      );
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dönüştürme sırasında hata oluştu.');
    } finally {
      setIsConverting(false);
    }
  };

  const from = isVcfToCsv ? 'VCF' : 'CSV';
  const to = isVcfToCsv ? 'CSV' : 'VCF';
  const baseName = (selectedFile?.name.replace(/\.[^/.]+$/, '') || 'contacts') || 'contacts';

  return (
    <ConverterShell from={from} to={to}>
      <DirectionToggle from={from} to={to} onSwap={handleSwap} accent={FUCHSIA_ACCENT} />

      <ConverterHeading
        title={isVcfToCsv ? 'VCF (vCard) to CSV Converter' : 'CSV to VCF (vCard) Converter'}
        description={
          isVcfToCsv
            ? 'Drop a phone book export (.vcf) and download it as an Excel-ready CSV table — names, phones, emails, and more. All in your browser.'
            : 'Drop a CSV contact list and get a .vcf file you can import straight into your phone book.'
        }
      />

      <Dropzone
        accept={isVcfToCsv ? '.vcf,.vcard,text/vcard,text/x-vcard,text/directory' : '.csv,.CSV,text/csv'}
        inputLabel={from}
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={FUCHSIA_ACCENT}
        maxSizeMb={DOCUMENT_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <ConvertButton onClick={handleConvert} disabled={isConverting} accent={FUCHSIA_ACCENT}>
          {isConverting ? `Converting to ${to}...` : `Convert to ${to} Now`}
        </ConvertButton>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={FUCHSIA_ACCENT}
          href={convertedUrl}
          downloadName={`${baseName}.${isVcfToCsv ? 'csv' : 'vcf'}`}
          label={`Download ${to} File`}
        >
          {preview && (
            <pre className="max-h-56 w-full overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-[11px] leading-relaxed whitespace-pre text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
              {preview}
              {preview.length === PREVIEW_LIMIT ? '\n…' : ''}
            </pre>
          )}
        </ResultPanel>
      )}
    </ConverterShell>
  );
}