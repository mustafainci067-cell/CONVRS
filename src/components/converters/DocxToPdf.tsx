'use client';

import { useEffect, useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
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

const SLATE_ACCENT: Accent = {
  dropzone:
    'border-slate-300 bg-slate-50 hover:border-slate-400 dark:border-slate-900/50 dark:bg-slate-950/10 dark:hover:border-slate-700/50',
  iconBox:
    'border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-800/50 dark:bg-slate-900/40 dark:text-slate-400',
  button: 'bg-slate-700 text-white hover:bg-slate-600',
  resultCard: 'border-slate-200 bg-slate-50 dark:border-slate-900/30 dark:bg-slate-950/30',
  pill: 'bg-slate-700 text-white shadow-[0_0_15px_rgba(71,85,105,0.4)]',
};

const isDocx = (file: File) =>
  matchesValidFormat(file, {
    mimes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    extensions: ['docx'],
  });

const PAGE = { width: 612, height: 792 };
const MARGIN = 55;
const FONT_SIZE = 11;
const LINE_HEIGHT = 15;

/** mammoth ile DOCX metnini cikarir, pdf-lib ile sayfalara dizerek PDF basar. */
async function docxToPdf(file: File): Promise<Blob> {
  const mammoth = await import('mammoth');
  const { value: text } = await mammoth.extractRawText({
    arrayBuffer: await file.arrayBuffer(),
  });
  if (!text.trim()) {
    throw new Error('Belge boş görünüyor; yazdırılacak metin bulunamadı.');
  }

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const usableWidth = PAGE.width - MARGIN * 2;

  let page = pdfDoc.addPage([PAGE.width, PAGE.height]);
  let y = PAGE.height - MARGIN;

  const drawLine = (line: string) => {
    if (y < MARGIN) {
      page = pdfDoc.addPage([PAGE.width, PAGE.height]);
      y = PAGE.height - MARGIN;
    }
    if (line) {
      page.drawText(line, { x: MARGIN, y, size: FONT_SIZE, font, color: rgb(0, 0, 0) });
    }
    y -= LINE_HEIGHT;
  };

  // Satirlari kenar bosluklari icinde sar
  const paragraphs = text.split(/\r?\n/);
  for (const para of paragraphs) {
    const words = para.split(/\s+/).filter(Boolean);
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && font.widthOfTextAtSize(candidate, FONT_SIZE) > usableWidth) {
        drawLine(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) drawLine(line);
    drawLine(''); // paragraf arasi bos satir
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
}

export default function DocxToPdf() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [convertedUrl]);

  const processFile = (file: File) => {
    if (!isDocx(file)) {
      setErrorMsg('Geçersiz dosya formatı');
      return;
    }
    // Belge oldugu icin 50MB hard-limit; asilirsa islemi aninda durdur
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

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsConverting(true);
    setErrorMsg(null);
    try {
      const blob = await docxToPdf(selectedFile);
      setConvertedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : 'Dönüştürme sırasında bir hata oluştu. Dosya bozuk ya da şifreli olabilir.'
      );
    } finally {
      setIsConverting(false);
    }
  };

  const baseName = selectedFile?.name.replace(/\.[^/.]+$/, '') || 'document';

  return (
    <ConverterShell from="DOCX" to="PDF">
      <ConverterHeading
        title="DOCX to PDF Converter"
        description="Upload a Word (.docx) document and download its content as a PDF — the text is read by mammoth and typeset with pdf-lib, entirely in your browser."
      />

      <Dropzone
        accept=".docx,.DOCX,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        inputLabel="DOCX"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={SLATE_ACCENT}
        maxSizeMb={DOCUMENT_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !convertedUrl && (
        <ConvertButton onClick={handleConvert} disabled={isConverting} accent={SLATE_ACCENT}>
          {isConverting ? 'Rendering PDF...' : 'Convert DOCX to PDF'}
        </ConvertButton>
      )}

      {convertedUrl && (
        <ResultPanel
          accent={SLATE_ACCENT}
          href={convertedUrl}
          downloadName={`${baseName}.pdf`}
          label="Download PDF Document"
        />
      )}
    </ConverterShell>
  );
}
