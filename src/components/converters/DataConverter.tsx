'use client';

import { useEffect, useState } from 'react';
import { csvToJson, jsonToCsv } from '@/lib/data-convert';
import { assertFileWithinLimit, DOCUMENT_SIZE_LIMIT_MB } from '@/lib/file-validation';
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

type DataMode = 'json-to-csv' | 'csv-to-json';

const TEAL_ACCENT: Accent = {
  dropzone:
    'border-teal-300 bg-teal-50 hover:border-teal-400 dark:border-teal-900/50 dark:bg-teal-950/10 dark:hover:border-teal-700/50',
  iconBox:
    'border-teal-200 bg-teal-100 text-teal-600 dark:border-teal-800/50 dark:bg-teal-900/40 dark:text-teal-400',
  button: 'bg-teal-600 text-white hover:bg-teal-500',
  resultCard: 'border-teal-200 bg-teal-50 dark:border-teal-900/30 dark:bg-teal-950/30',
  pill: 'bg-teal-600 text-white shadow-[0_0_15px_rgba(13,148,136,0.4)]',
};

const CONFIGS: Record<
  DataMode,
  {
    title: string;
    description: string;
    accept: string;
    inputLabel: string;
    outputLabel: string;
    outputExtension: string;
    outputMime: string;
    swapWith: DataMode;
    invalidMessage: string;
    isValidFile: (file: File) => boolean;
    convert: (input: string) => string;
  }
> = {
  'json-to-csv': {
    title: 'JSON to CSV Converter',
    description:
      'Turn an array of JSON objects into a spreadsheet-ready CSV table. Parsed and written entirely in your browser.',
    accept: '.json,.JSON,application/json,text/json',
    inputLabel: 'JSON',
    outputLabel: 'CSV',
    outputExtension: 'csv',
    outputMime: 'text/csv;charset=utf-8',
    swapWith: 'csv-to-json',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece JSON dosyası yükleyin.',
    isValidFile: (file) =>
      file.name.toLowerCase().endsWith('.json') || file.type.includes('json'),
    convert: jsonToCsv,
  },
  'csv-to-json': {
    title: 'CSV to JSON Converter',
    description:
      'Parse CSV — including quoted fields and embedded line breaks — into clean, indented JSON records.',
    accept: '.csv,.CSV,text/csv',
    inputLabel: 'CSV',
    outputLabel: 'JSON',
    outputExtension: 'json',
    outputMime: 'application/json;charset=utf-8',
    swapWith: 'json-to-csv',
    invalidMessage: 'Desteklenmeyen dosya formatı! Lütfen sadece CSV dosyası yükleyin.',
    isValidFile: (file) => file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv',
    convert: csvToJson,
  },
};

const PREVIEW_LIMIT = 1200;

export default function DataConverter({ mode }: { mode: DataMode }) {
  const [activeMode, setActiveMode] = useState<DataMode>(mode);
  const config = CONFIGS[activeMode];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    setActiveMode(config.swapWith);
    resetSelection();
  };

  const processFile = (file: File) => {
    if (!config.isValidFile(file)) {
      setErrorMsg(config.invalidMessage);
      return;
    }
    // JSON/CSV belge oldugu icin 50MB hard-limit; asilirsa islemi durdur
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
      const output = config.convert(text);

      setPreview(output.slice(0, PREVIEW_LIMIT));
      setConvertedUrl(URL.createObjectURL(new Blob([output], { type: config.outputMime })));
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : 'Dönüştürme sırasında bir hata oluştu. Lütfen dosya içeriğini kontrol edin.'
      );
    } finally {
      setIsConverting(false);
    }
  };

  const downloadName = `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'converted'}.${config.outputExtension}`;

  return (
    <ConverterShell from={config.inputLabel} to={config.outputLabel}>
      <DirectionToggle
        from={config.inputLabel}
        to={config.outputLabel}
        onSwap={handleSwap}
        accent={TEAL_ACCENT}
      />

      <ConverterHeading title={config.title} description={config.description} />

      <Dropzone
        accept={config.accept}
        inputLabel={config.inputLabel}
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={TEAL_ACCENT}
        maxSizeMb={DOCUMENT_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <ConvertButton onClick={handleConvert} disabled={isConverting} accent={TEAL_ACCENT}>
          {isConverting ? 'Processing in Browser...' : `Convert to ${config.outputLabel} Now`}
        </ConvertButton>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={TEAL_ACCENT}
          href={convertedUrl}
          downloadName={downloadName}
          label={`Download ${config.outputLabel} File`}
        >
          {preview && (
            <pre className="max-h-56 w-full overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-[11px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
              {preview}
              {preview.length === PREVIEW_LIMIT ? '\n…' : ''}
            </pre>
          )}
        </ResultPanel>
      )}
    </ConverterShell>
  );
}
