'use client';

import { useEffect, useState } from 'react';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';
import {
  assertFileWithinLimit,
  DOCUMENT_SIZE_LIMIT_MB,
  matchesValidFormat,
} from '@/lib/file-validation';
import {
  ConverterHeading,
  ConverterShell,
  Dropzone,
  ErrorBanner,
  type Accent,
} from './ConverterShell';
import { cn } from '@/lib/utils';

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
  matchesValidFormat(file, { mimes: ['application/pdf'], extensions: ['pdf'] });

/** pdfjs-dist'i ve worker'unu yalnizca ilk cikarim aninda, tarayicida yukler. */
async function loadPdfJs() {
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
  return pdfjs;
}

export default function PdfToText() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [text, setText] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => {
      /* PDF bellek isleri otomatik temizlenir */
    };
  }, []);

  const processFile = (file: File) => {
    if (!isPdf(file)) {
      setErrorMsg('Geçersiz dosya formatı. Yalnızca PDF yükleyebilirsiniz.');
      return;
    }
    try {
      assertFileWithinLimit(file);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Dosya boyutu çok büyük.');
      return;
    }
    setSelectedFile(file);
    setText('');
    setPageCount(0);
    setErrorMsg(null);
  };

  const handleExtract = async () => {
    if (!selectedFile) return;
    setIsExtracting(true);
    setErrorMsg(null);
    setText('');
    try {
      const pdfjs = await loadPdfJs();
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buffer }).promise;
      setPageCount(pdf.numPages);

      const pages: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        // Satir basligi kucuk ~15px sectigimiz bir heuristikle satirlari ayir
        let line = '';
        let lastY: number | null = null;
        const out: string[] = [];
        for (const item of content.items) {
          const textItem = item as TextItem;
          const y = textItem.transform[5];
          if (lastY !== null && Math.abs(y - lastY) > 2 && line) {
            out.push(line);
            line = '';
          }
          // Metin parcalari arasindaki yatay boslugu boslukla birles
          if (line && /[^\s]$/.test(line) && textItem.str) line += ' ';
          line += textItem.str;
          lastY = y;
        }
        if (line.trim()) out.push(line);
        pages.push(out.join('\n'));
      }

      setText(pages.join('\n\n'));
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error
          ? `Metin çıkarılamadı: ${err.message}`
          : 'Metin çıkarılırken bir hata oluştu. PDF şifreli olabilir.'
      );
    } finally {
      setIsExtracting(false);
    }
  };

  const copyText = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* pano erisimi reddedilebilir */
    }
  };

  const downloadText = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const base = selectedFile?.name.replace(/\.pdf$/i, '') || 'document';
    a.download = `${base}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ConverterShell from="PDF" to="Text">
      <ConverterHeading
        title="PDF to Text Extractor"
        description="Drop a PDF and extract its raw text with pdf.js — runs 100% in your browser. Copy or download the result as a .txt file. Your document never leaves your device."
      />

      <Dropzone
        accept=".pdf,application/pdf"
        inputLabel="PDF"
        fileName={selectedFile?.name}
        onFile={processFile}
        accent={RED_ACCENT}
        maxSizeMb={DOCUMENT_SIZE_LIMIT_MB}
      />

      {errorMsg && <ErrorBanner message={errorMsg} />}

      {selectedFile && !text && (
        <button
          type="button"
          onClick={handleExtract}
          disabled={isExtracting}
          className="w-full rounded-xl bg-red-600 py-3.5 font-medium text-white shadow-lg transition-all hover:bg-red-500 active:scale-[0.99] disabled:opacity-50"
        >
          {isExtracting ? 'Extracting Text...' : 'Extract Text Now'}
        </button>
      )}

      {text && (
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
            <span className="font-mono text-[11px] text-zinc-500">
              {pageCount} sayfa · {text.length.toLocaleString()} karakter
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyText}
                className={cn(
                  'rounded-lg px-2.5 py-1 font-mono text-[11px] transition-colors',
                  'bg-zinc-200 text-zinc-600 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                )}
              >
                {copied ? 'Kopyalandı ✓' : 'Kopyala'}
              </button>
              <button
                type="button"
                onClick={downloadText}
                className="rounded-lg bg-red-600 px-2.5 py-1 font-mono text-[11px] text-white transition-colors hover:bg-red-500"
              >
                .txt İndir
              </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            className="min-h-72 w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100"
          />
        </div>
      )}
    </ConverterShell>
  );
}