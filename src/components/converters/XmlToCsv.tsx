'use client';

import { useEffect, useState } from 'react';
import { xmlToCsv, csvToXml } from '@/lib/xml-csv';
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

const INDIGO_ACCENT: Accent = {
  dropzone:
    'border-indigo-300 bg-indigo-50 hover:border-indigo-400 dark:border-indigo-900/50 dark:bg-indigo-950/10 dark:hover:border-indigo-700/50',
  iconBox:
    'border-indigo-200 bg-indigo-100 text-indigo-600 dark:border-indigo-800/50 dark:bg-indigo-900/40 dark:text-indigo-400',
  button: 'bg-indigo-600 text-white hover:bg-indigo-500',
  resultCard: 'border-indigo-200 bg-indigo-50 dark:border-indigo-900/30 dark:bg-indigo-950/30',
  pill: 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]',
};

type Mode = 'xml-to-csv' | 'csv-to-xml';

const PREVIEW_LIMIT = 1800;

export default function XmlToCsv() {
  const [activeMode, setActiveMode] = useState<Mode>('xml-to-csv');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isXmlToCsv = activeMode === 'xml-to-csv';

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
    setActiveMode(isXmlToCsv ? 'csv-to-xml' : 'xml-to-csv');
    resetSelection();
  };

  const isValidFile = (file: File) => {
    if (isXmlToCsv) {
      return matchesValidFormat(file, {
        mimes: ['text/xml', 'application/xml'],
        extensions: ['xml'],
      });
    }
    return matchesValidFormat(file, { mimes: ['text/csv'], extensions: ['csv'] });
  };

  const processFile = (file: File) => {
    if (!isValidFile(file)) {
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
      const output = isXmlToCsv ? xmlToCsv(text) : csvToXml(text);
      setPreview(output.slice(0, PREVIEW_LIMIT));
      setConvertedUrl(
        URL.createObjectURL(
          new Blob([output], { type: isXmlToCsv ? 'text/csv;charset=utf-8' : 'application/xml' })
        )
      );
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dönüştürme sırasında hata oluştu.');
    } finally {
      setIsConverting(false);
    }
  };

  const from = isXmlToCsv ? 'XML' : 'CSV';
  const to = isXmlToCsv ? 'CSV' : 'XML';
  const baseName = (selectedFile?.name.replace(/\.[^/.]+$/, '') || 'converted') || 'converted';

  return (
    <ConverterShell from={from} to={to}>
      <DirectionToggle from={from} to={to} onSwap={handleSwap} accent={INDIGO_ACCENT} />

      <ConverterHeading
        title={isXmlToCsv ? 'XML to CSV Converter' : 'CSV to XML Converter'}
        description={
          isXmlToCsv
            ? 'Drop an XML file and flatten its repeated records into a spreadsheet-ready CSV table. Parsed entirely in your browser.'
            : 'Drop a CSV file and wrap every row into clean, well-formed XML with proper escaping.'
        }
      />

      <Dropzone
        accept={isXmlToCsv ? '.xml,text/xml,application/xml' : '.csv,.CSV,text/csv'}
        inputLabel={from}
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={INDIGO_ACCENT}
        maxSizeMb={DOCUMENT_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <ConvertButton onClick={handleConvert} disabled={isConverting} accent={INDIGO_ACCENT}>
          {isConverting ? `Converting to ${to}...` : `Convert to ${to} Now`}
        </ConvertButton>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={INDIGO_ACCENT}
          href={convertedUrl}
          downloadName={`${baseName}.${isXmlToCsv ? 'csv' : 'xml'}`}
          label={`Download ${to} File`}
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