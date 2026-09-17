'use client';

import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  assertFileWithinLimit,
  DOCUMENT_SIZE_LIMIT_MB,
  matchesValidFormat,
} from '@/lib/file-validation';
import { sanitizeCsvCell } from '@/lib/data-convert';
import {
  ConverterHeading,
  ConverterShell,
  DirectionToggle,
  Dropzone,
  ErrorBanner,
  ResultPanel,
  type Accent,
} from './ConverterShell';

const TEAL_ACCENT: Accent = {
  dropzone:
    'border-teal-300 bg-teal-50 hover:border-teal-400 dark:border-teal-900/50 dark:bg-teal-950/10 dark:hover:border-teal-700/50',
  iconBox:
    'border-teal-200 bg-teal-100 text-teal-600 dark:border-teal-800/50 dark:bg-teal-900/40 dark:text-teal-400',
  button: 'bg-teal-600 text-white hover:bg-teal-500',
  resultCard: 'border-teal-200 bg-teal-50 dark:border-teal-900/30 dark:bg-teal-950/30',
  pill: 'bg-teal-600 text-white shadow-[0_0_15px_rgba(13,148,136,0.4)]',
};

type Direction = 'xlsx-to-csv' | 'csv-to-xlsx';

const isXlsx = (file: File) =>
  matchesValidFormat(file, {
    mimes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    extensions: ['xlsx'],
  });

const isCsv = (file: File) =>
  matchesValidFormat(file, {
    mimes: ['text/csv', 'application/vnd.ms-excel'],
    extensions: ['csv'],
  });

/**
 * Canli formül hucrelerini duz metne cevirir: hesaplanmis deger varsa onu
 * korur, yoksa formül metnini deger yapar. Boylece uretilen xlsx/csv icinde
 * harici formül yurutulmez ve (hesaplanmis degeri olmayan) hucreler veri
 * kaybına ugramaz.
 */
function neutralizeFormulaCells(sheet: XLSX.WorkSheet): void {
  const ref = sheet['!ref'];
  if (!ref) return;
  const range = XLSX.utils.decode_range(ref);
  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cell = sheet[XLSX.utils.encode_cell({ r: R, c: C })];
      if (!cell || cell.f === undefined) continue;

      if (cell.v !== undefined && cell.v !== null) {
        cell.t = typeof cell.v === 'number' ? 'n' : typeof cell.v === 'boolean' ? 'b' : 's';
      } else {
        cell.t = 's';
        cell.v = cell.f;
        cell.w = undefined;
      }
      delete cell.f;
      cell.F = undefined;
    }
  }
}

/**
 * CSV ciktisinda formül operatoruyle baslayan metin hucrelerini nötralize
 * eder. (CSV yeniden acildiginda Excel/LibreOffice bu degerleri formül
 * olarak yorumlayabilir; xlsx icinde string tip güvenli oldugu icin bu adim
 * yalnizca CSV yonunde uygulanir.)
 */
function neutralizeCsvOutput(sheet: XLSX.WorkSheet): void {
  const ref = sheet['!ref'];
  if (!ref) return;
  const range = XLSX.utils.decode_range(ref);
  for (let R = range.s.r; R <= range.e.r; R++) {
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cell = sheet[XLSX.utils.encode_cell({ r: R, c: C })];
      if (cell && typeof cell.v === 'string') {
        const safe = sanitizeCsvCell(cell.v);
        if (safe !== cell.v) {
          cell.v = safe;
          cell.w = undefined;
        }
      }
    }
  }
}

export default function XlsxToCsv() {
  const [direction, setDirection] = useState<Direction>('xlsx-to-csv');
  const [fileName, setFileName] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isXlsxToCsv = direction === 'xlsx-to-csv';

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const resetResult = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setPreview('');
    setErrorMsg(null);
  };

  const handleSwap = () => {
    setDirection(isXlsxToCsv ? 'csv-to-xlsx' : 'xlsx-to-csv');
    setFileName(null);
    resetResult();
  };

  const processFile = async (file: File) => {
    if (isXlsxToCsv) {
      if (!isXlsx(file)) {
        setErrorMsg('Geçersiz dosya formatı');
        return;
      }
    } else if (!isCsv(file)) {
      setErrorMsg('Geçersiz dosya formatı');
      return;
    }

    // Excel/CSV belge oldugu icin 50MB hard-limit; asilirsa islemi durdur
    try {
      assertFileWithinLimit(file);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dosya boyutu çok büyük.');
      return;
    }

    resetResult();

    try {
      const buffer = await file.arrayBuffer();

      if (isXlsxToCsv) {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          throw new Error('Excel dosyasında sayfa bulunamadı.');
        }

        neutralizeFormulaCells(workbook.Sheets[sheetName]);
        neutralizeCsvOutput(workbook.Sheets[sheetName]);
        const rawCsv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        // Excel'in UTF-8 CSV'yi dogru acmasi icin tek bir BOM garantile
        const csv = '﻿' + rawCsv.replace(/^﻿/, '');

        setFileName(file.name);
        setResultUrl(URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })));
        setPreview(rawCsv.slice(0, 2000).trimEnd());
      } else {
        // CSV'yi once calisma kitabi olarak oku, ilk sayfayi yeni xlsx'e tasi
        const source = XLSX.read(buffer, { type: 'array' });
        const sheetName = source.SheetNames[0];
        if (!sheetName) {
          throw new Error('CSV dosyasında veri bulunamadı.');
        }

        neutralizeFormulaCells(source.Sheets[sheetName]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, source.Sheets[sheetName], 'Sheet1');
        const arr = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });

        setFileName(file.name);
        setResultUrl(
          URL.createObjectURL(
            new Blob([arr], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
          )
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Dosya okunurken bir hata oluştu.'
      );
    }
  };

  const from = isXlsxToCsv ? 'XLSX' : 'CSV';
  const to = isXlsxToCsv ? 'CSV' : 'XLSX';
  const baseName = (fileName ?? 'converted').replace(/\.[^/.]+$/, '') || 'converted';

  return (
    <ConverterShell from={from} to={to}>
      <DirectionToggle from={from} to={to} onSwap={handleSwap} accent={TEAL_ACCENT} />

      <ConverterHeading
        title={isXlsxToCsv ? 'XLSX to CSV Converter' : 'CSV to XLSX Converter'}
        description={
          isXlsxToCsv
            ? 'Drop an Excel (.xlsx) file and download its first sheet as comma-separated values. Parsed entirely in your browser — nothing is uploaded.'
            : 'Drop a CSV file and download it as an Excel (.xlsx) workbook. Built entirely in your browser — nothing is uploaded.'
        }
      />

      <Dropzone
        accept={
          isXlsxToCsv
            ? '.xlsx,.XLSX,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            : '.csv,.CSV,text/csv,application/vnd.ms-excel,text/plain'
        }
        inputLabel={from}
        fileName={fileName ?? undefined}
        onFile={processFile}
        accent={TEAL_ACCENT}
        maxSizeMb={DOCUMENT_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {resultUrl && (
        <ResultPanel
          accent={TEAL_ACCENT}
          href={resultUrl}
          downloadName={`${baseName}.${isXlsxToCsv ? 'csv' : 'xlsx'}`}
          label={`Download ${to} File`}
        >
          {preview && (
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] lowercase tracking-wider text-zinc-500">
                Preview
              </span>
              <pre className="max-h-40 w-full overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-[11px] leading-relaxed whitespace-pre text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
                {preview}
              </pre>
            </div>
          )}
        </ResultPanel>
      )}
    </ConverterShell>
  );
}
