'use client';

import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
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

const ORANGE_ACCENT: Accent = {
  dropzone:
    'border-orange-300 bg-orange-50 hover:border-orange-400 dark:border-orange-900/50 dark:bg-orange-950/10 dark:hover:border-orange-700/50',
  iconBox:
    'border-orange-200 bg-orange-100 text-orange-600 dark:border-orange-800/50 dark:bg-orange-900/40 dark:text-orange-400',
  button: 'bg-orange-600 text-white hover:bg-orange-500',
  resultCard: 'border-orange-200 bg-orange-50 dark:border-orange-900/30 dark:bg-orange-950/30',
  pill: 'bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]',
};

type Mode = 'xlsx-to-json' | 'json-to-xlsx';

const PREVIEW_LIMIT = 1800;

const isXlsx = (file: File) =>
  matchesValidFormat(file, {
    mimes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    extensions: ['xlsx'],
  });

const isJson = (file: File) =>
  matchesValidFormat(file, { mimes: ['application/json', 'text/json'], extensions: ['json'] });

export default function XlsxToJson() {
  const [activeMode, setActiveMode] = useState<Mode>('xlsx-to-json');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isXlsxToJson = activeMode === 'xlsx-to-json';

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
    setActiveMode(isXlsxToJson ? 'json-to-xlsx' : 'xlsx-to-json');
    resetSelection();
  };

  const processFile = (file: File) => {
    if (isXlsxToJson ? !isXlsx(file) : !isJson(file)) {
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
      if (isXlsxToJson) {
        const buffer = await selectedFile.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) throw new Error('Excel dosyasında sayfa bulunamadı.');

        // header:true ilk satiri nesne anahtarlari yapar; defval bos hucreyi "" yapar
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
          defval: '',
        }) as unknown[][];

        const headerRow = (rows[0] ?? []) as unknown[];
        const headers: string[] = headerRow.map((h, i) =>
          String(h ?? '').trim() ? String(h).trim() : `column_${i + 1}`
        );
        const records = rows.slice(1).map((row) => {
          const record: Record<string, unknown> = {};
          headers.forEach((header, i) => {
            record[header] = row[i] ?? '';
          });
          return record;
        });

        const json = JSON.stringify(records, null, 2);
        setPreview(json.slice(0, PREVIEW_LIMIT));
        setConvertedUrl(
          URL.createObjectURL(new Blob([json], { type: 'application/json;charset=utf-8' }))
        );
      } else {
        const text = await selectedFile.text();
        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          throw new Error('Geçersiz JSON. Sözdizimini kontrol edin.');
        }
        const rows = Array.isArray(parsed) ? parsed : [parsed];
        if (rows.length === 0) throw new Error('JSON dizisi boş.');

        const worksheet = XLSX.utils.json_to_sheet(rows as Record<string, unknown>[]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const array = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });

        setPreview(null);
        setConvertedUrl(
          URL.createObjectURL(
            new Blob([array], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
          )
        );
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dönüştürme sırasında hata oluştu.');
    } finally {
      setIsConverting(false);
    }
  };

  const from = isXlsxToJson ? 'XLSX' : 'JSON';
  const to = isXlsxToJson ? 'JSON' : 'XLSX';
  const baseName = (selectedFile?.name.replace(/\.[^/.]+$/, '') || 'converted') || 'converted';

  return (
    <ConverterShell from={from} to={to}>
      <DirectionToggle from={from} to={to} onSwap={handleSwap} accent={ORANGE_ACCENT} />

      <ConverterHeading
        title={isXlsxToJson ? 'XLSX to JSON Converter' : 'JSON to XLSX Converter'}
        description={
          isXlsxToJson
            ? 'Drop an Excel file and download its first sheet as pretty, indented JSON records. Parsed entirely in your browser with SheetJS.'
            : 'Drop a JSON file (array of objects) and download it as an .xlsx workbook you can open in Excel or Sheets.'
        }
      />

      <Dropzone
        accept={
          isXlsxToJson
            ? '.xlsx,.XLSX,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            : '.json,.JSON,application/json,text/json'
        }
        inputLabel={from}
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={ORANGE_ACCENT}
        maxSizeMb={DOCUMENT_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <ConvertButton onClick={handleConvert} disabled={isConverting} accent={ORANGE_ACCENT}>
          {isConverting ? `Converting to ${to}...` : `Convert to ${to} Now`}
        </ConvertButton>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={ORANGE_ACCENT}
          href={convertedUrl}
          downloadName={`${baseName}.${isXlsxToJson ? 'json' : 'xlsx'}`}
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